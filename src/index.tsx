import Config from "./config";
import EmulatorJS from "./runtimes/emulatorjs"
import Libretro from "./runtimes/libretro";
import { CustomWindow } from "./types/window.type"

declare let window: CustomWindow;

export default () => {

    const type = window.RUNR.type;

    const rom = window.RUNR.rom;
    const core = window.RUNR.core;
    const bios = window.RUNR.bios;

    if (!rom || !core) {
        return <Config />
    }
    return (
        <>
            {type == "emu" && <EmulatorJS rom={rom} core={core} bios={bios} />}
            {type == "libretro" && <Libretro rom={rom} core={core} bios={bios} />}
        </>
    )
}