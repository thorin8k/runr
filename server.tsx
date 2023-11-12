import { renderToReadableStream } from 'react-dom/server';
import Page from './page.tsx';

const BASE_PATH = Bun.env.BASE_PATH;
const PORT = Bun.env.PORT || 3000;

console.log(`Server started at port: ${PORT}`);
Bun.serve({
    port: Number(PORT),

    async fetch(req) {
        const url = new URL(req.url);
        console.log(
            `${new Date().toISOString()} - ${req.method}:: ${url?.pathname} ${JSON.stringify(url.searchParams)}`
        );

        const file = Bun.file((BASE_PATH || '.') + url?.pathname);
        if (await file.exists()) {
            return new Response(file); //TODO filter for insecure files
        }
        return new Response(await renderToReadableStream(<Page {...(Object.fromEntries(url.searchParams) as any)} />));
    },
});
