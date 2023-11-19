import { useEffect } from 'react';
import { CustomWindow } from '../types/window.type';
import { EmulatorProps } from '../types/emulator.type';
import { getPlatformFromPath } from '../common/utils';
import { EMULATORJS_PLATFORM_MAP } from '../constants/emu.constants';

declare let window: CustomWindow;

const styles = {
    body: { width: '100vw', height: '100vh' } as React.CSSProperties,
};

export default ({ rom, core, bios }: EmulatorProps) => {
    useEffect(() => {
        let resolvedCore = '';
        if (!core) {
            resolvedCore = getPlatformFromPath(rom);
        }
        window.EJS_player = '#game';
        window.EJS_core = core || EMULATORJS_PLATFORM_MAP[resolvedCore];
        //EJS_lightgun = false; // Lightgun
        window.EJS_biosUrl = bios || '';
        window.EJS_gameUrl = Bun.env.LIBRARY_PATH + rom;
        window.EJS_pathtodata = 'emulatorjs/data/';

        const script = document.createElement('script');

        script.src = 'emulatorjs/data/loader.js';
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div style={styles.body}>
            <div id="game" />
        </div>
    );
};
