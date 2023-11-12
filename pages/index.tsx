import Config from "./config";
import EmulatorJS from "./emulatorjs"
import Libretro from "./libretro";
declare global {
    interface Window {
        RUNR: {
            type: string;
            rom: string;
            core: string;
            bios: string;
        }
        
    }
}
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