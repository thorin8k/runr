import { useState } from 'react';
import { CustomWindow } from '../types/window.type';
import { LIBRETRO_SIMPLE_CORES, LIRETRO_MODERN_CORES, LIBRETRO_PLATFORM_MAP } from '../constants/libretro.constants';
import { EmulatorProps } from '../types/emulator.type';
import { getPlatformFromPath } from '../common/utils';

declare let window: CustomWindow;

const styles = {
    body: { width: '100%', height: '100%' } as React.CSSProperties,
    game: { textAlign: 'center' } as React.CSSProperties,
    button: { 
        position: "absolute",
        bottom: 65,
        left: "50%",
        transform: "translateX(-50%)",
        cursor: "pointer",
        boxSizing: "inherit",
        display: "flex",
        justifyContent: "center",
        textShadow: "0 1px 1px rgba(0,0,0,0.5)",
        fontSize: 20,
        lineHeight: 45,
        textTransform: "uppercase",
        fontWeight: "bolder",
        textDecoration: "none",
        width: "fit-content",
        paddingLeft: 40,
        paddingRight: 40,
        whiteSpace: "nowrap",
        height: 45,
        border: 0,
        color: "#fff !important",
        borderRadius: 35,
        textAlign: "center",
        backgroundColor: "#1AAAFF",
        boxShadow: "0 0 0 0 #222, 0 0 0 0 #111, inset 0 0 0 0 rgba(250,250,250,0.2), inset 0 0 0 0 rgba(0,0,0,0.5)"
    } as React.CSSProperties,
};

export default ({ rom, core, bios }: EmulatorProps) => {
    const [loaded, setLoaded] = useState<Boolean>(false);

    const load = () => {
        let resolvedCore = getPlatformFromPath(rom);
        console.log(resolvedCore)
        window.EJS_player = '#game';
        window.EJS_core = core || LIBRETRO_PLATFORM_MAP[resolvedCore];
        window.EJS_biosUrl = bios ? Bun.env.LIBRARY_PATH + bios : '';
        window.EJS_gameUrl = Bun.env.LIBRARY_PATH + rom;
        window.EJS_pathtodata = 'libretro/data/';

        const script = document.createElement('script');

        script.src = 'libretro/libretro.js';
        script.async = true;

        document.body.appendChild(script);
        createTouchpad();
        setLoaded(true);
    };

    const createTouchpad = () => {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            if (LIBRETRO_SIMPLE_CORES.includes(core)) {
                window.gamePadType = 'simple';
            } else if (LIRETRO_MODERN_CORES.includes(core)) {
                window.gamePadType = 'modern';
            }
            const script = document.createElement('script');

            script.src = 'lib/touchpad.js';
            script.async = true;

            document.head.appendChild(script);
        }
    };

    return (
        <div style={styles.body}>
            <div id="gamepad" />
            <div id="game" style={styles.game} />
            {!loaded && (
                <button onClick={load} style={styles.button}>
                    Load Game
                </button>
            )}
        </div>
    );
};
