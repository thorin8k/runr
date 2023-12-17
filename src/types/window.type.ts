
export interface CustomWindow extends Window {
    RUNR: {
        type: string;
        rom: string;
        core: string;
        bios: string;
        platform: string;
        redirected: boolean;
    }
    EJS_player: string;
    EJS_core: string;
    EJS_biosUrl: string;
    EJS_gameUrl: string;
    EJS_pathtodata: string;
    gamePadType: string;
}