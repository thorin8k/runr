import { useEffect } from 'react';
import { CustomWindow } from '../types/window.type';
import { EmulatorProps } from '../types/emulator.type';
import { configureSystem, getPlatformFromPath } from '../common/utils';
import { EMULATORJS_PLATFORM_MAP } from '../constants/emu.constants';

declare let window: CustomWindow;

const styles = {
    body: { width: '100%', height: '100%' } as React.CSSProperties,
};

export default ({ rom, core, bios, platform, redirected }: EmulatorProps) => {

    useEffect(() => {
        let resolvedCore = configureSystem(rom, core, platform, EMULATORJS_PLATFORM_MAP);
        console.log({
            rom,
            core,
            platform,
            resolvedCore,
        });

        if (!resolvedCore && Boolean(Bun.env.AUTO_REDIRECT) == true && !redirected) {
            let url = new URL(window.location.href);
            url.searchParams.set('type', "libretro");
            url.searchParams.set('redirected', "true");
            window.location.replace(url.toString());
        }

        window.EJS_player = '#game';
        window.EJS_core = resolvedCore;
        //EJS_lightgun = false; // Lightgun
        window.EJS_biosUrl = bios ? Bun.env.LIBRARY_PATH + bios : '';
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
