import { useState } from 'react';
import { CustomWindow } from '../types/window.type';
import { LIBRETRO_SIMPLE_CORES, LIRETRO_MODERN_CORES, LIBRETRO_PLATFORM_MAP } from '../constants/libretro.constants';
import { EmulatorProps } from '../types/emulator.type';
import { getPlatformFromPath } from '../common/utils';

declare let window: CustomWindow;

const styles = {
    body: { width: '100%', height: '100%' } as React.CSSProperties,
    game: { textAlign: 'center' } as React.CSSProperties,
    button: { marginLeft: 'calc(50vw - 43px)' } as React.CSSProperties,
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
