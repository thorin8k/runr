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