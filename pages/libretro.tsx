import { useState } from "react";

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
    game: { textAlign: 'center' } as React.CSSProperties,
    button: { marginLeft: 'calc(50vw - 30px)' } as React.CSSProperties
}

export default ({ rom, core, bios }: EmulatorProps) => {
    const [loaded, setLoaded] = useState<Boolean>(false);

    const load = () => {
        window.EJS_player = '#game';
        window.EJS_core = core;
        window.EJS_biosUrl = bios || "";
        window.EJS_gameUrl = Bun.env.LIBRARY_PATH+rom;
        window.EJS_pathtodata = 'libretro/data/';

        const script = document.createElement('script');

        script.src = "libretro/libretro.js";
        script.async = true;

        document.body.appendChild(script);
        createTouchpad();
        setLoaded(true)
    }

    const createTouchpad = () => {
        const script = document.createElement('script');

        script.src = "lib/touchpad.js";
        script.async = true;

        document.head.appendChild(script);
    }

    return (
        <div style={styles.body}>
            <div id='gamepad' />
            <div id='game' style={styles.game} />
            {!loaded && <button onClick={load} style={styles.button}>Load Game</button>}
        </div>
    )
};