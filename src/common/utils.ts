export const getPlatformFromPath = (romPath: string) => {

    const parts = romPath.split(/(\/|\\)/);
    if (!parts.length) {
        return "";
    }

    if (parts[parts.length - 1] === "roms") {
        return parts[parts.length - 2];
    }
    return parts[parts.length - 1];
}