export const getPlatformFromPath = (romPath: string) => {

    const parts = romPath.split(/[\\\/]/);
    if (!parts.length) {
        return "";
    }

    if (parts[parts.length - 2] === "roms") {
        return parts[parts.length - 3];
    }
    return parts[parts.length - 2];
}


export const configureSystem = (romPath: string, core: string | undefined, platform: string, MAP: any) => {
    if (core) {
        return { core };
    }

    let resolvedPlatform = platform || getPlatformFromPath(romPath);

    if (resolvedPlatform) {
        return MAP[resolvedPlatform];
    }
    return null;
}