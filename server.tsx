import { renderToReadableStream } from 'react-dom/server';
import ServerPage from './server-page.tsx';

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

        const file = Bun.file((BASE_PATH || '.') + decodeURI(url?.pathname));
        
        //File is forced to be in the specified BASE_PATH or in the current working directory.
        if (await file.exists()) {
            return new Response(file);
        }
        return new Response(
            await renderToReadableStream(<ServerPage {...(Object.fromEntries(url.searchParams) as any)} />)
        );
    },
});
