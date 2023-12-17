import EmulatorJS from './runtimes/emulatorjs';
import Libretro from './runtimes/libretro';
import { CustomWindow } from './types/window.type';

declare let window: CustomWindow;

export default () => {
    const type = window.RUNR.type;
    const rom = window.RUNR.rom;
    const core = window.RUNR.core;
    const bios = window.RUNR.bios;
    const platform = window.RUNR.platform;

    if (!rom) {
        return <div>Rom and Core parameters required</div>;
    }
    return (
        <>
            {type == 'emu' && <EmulatorJS rom={rom} core={core} bios={bios} platform={platform} />}
            {type == 'libretro' && <Libretro rom={rom} core={core} bios={bios} platform={platform} />}
        </>
    );
};
