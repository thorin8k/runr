import { renderToReadableStream } from 'react-dom/server';
import ServerPage from './server-page.tsx';

const BASE_PATH = Bun.env.BASE_PATH;
const RELATIVE_PATH = Bun.env.RELATIVE_PATH;
const PORT = Bun.env.PORT || 3000;

console.log(`Server started at port: ${PORT}`);
Bun.serve({
    port: Number(PORT),

    async fetch(req) {
        const url = new URL(req.url);
        const path = RELATIVE_PATH ? url?.pathname.replace(RELATIVE_PATH, '') : url?.pathname;
        const file = Bun.file((BASE_PATH || '.') + decodeURI(path));

        console.log(
            `${new Date().toISOString()} - ${req.method}:: ${path} ${JSON.stringify(url.searchParams)}`
        );

        //File is forced to be in the specified BASE_PATH or in the current working directory.
        if (await file.exists()) {
            return new Response(file);
        }
        return new Response(
            await renderToReadableStream(<ServerPage {...(Object.fromEntries(url.searchParams) as any)} />)
        );
    },
});
