interface EmulatorProps {
    type: string;
    rom: string;
    core?: string;
    bios?: string;
}

export default ({ type, rom, bios, core }: EmulatorProps) => {
    const script = `
    window.Bun = {
        env: {
            "LIBRARY_PATH": ${JSON.stringify(Bun.env.LIBRARY_PATH)}
        }
    }
    window.RUNR = ${JSON.stringify({
        type: type || Bun.env.DEFAULT_RUNTIME,
        rom,
        bios,
        core,
    })}
    `;

    const style = `
        html, 
        body {
            height: 100%;
        }
    `

    return (
        <html>
            <head >
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <script dangerouslySetInnerHTML={{ __html: script }} />
                <style dangerouslySetInnerHTML={{ __html: style }} />
            </head>
            <body style={{ margin: 0, background: 'black', color: 'white' }}>
                <div id="root"></div>
                <script type="module" src="./index.js"></script>
            </body>
        </html>
    );
};
