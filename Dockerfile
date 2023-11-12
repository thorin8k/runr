FROM oven/bun:alpine as base
WORKDIR /app

RUN apk add curl

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM install AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .


# [optional] build
ENV NODE_ENV=production
ENV DEFAULT_RUNTIME=emu
ENV LIBRARY_PATH=/library
ENV BASE_PATH=./
ENV PORT=3000
RUN bun run setup
RUN bun run build


# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /app/dist/ .

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "./server" ]