import { useEffect } from "react";

interface EmulatorProps {
    rom: string;
    core: string;
    bios?: string;
}

declare global {
    interface Window {
        EJS_player: string;
        EJS_core: string;
        EJS_biosUrl: string;
        EJS_gameUrl: string;
        EJS_pathtodata: string;
    }
}

const styles = {
    body: { width: '100vw', height: '100vh' } as React.CSSProperties,
}

export default ({ rom, core, bios }: EmulatorProps) => {

    useEffect(() => {
        window.EJS_player = '#game';
        window.EJS_core = core;
        //EJS_lightgun = false; // Lightgun
        window.EJS_biosUrl = bios || "";
        window.EJS_gameUrl = Bun.env.LIBRARY_PATH+rom;
        window.EJS_pathtodata = 'emulatorjs/data/';

        const script = document.createElement('script');

        script.src = "emulatorjs/data/loader.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [])

    return (
        <div style={styles.body}>
            <div id='game' />
        </div>
    )
};