export interface EmulatorProps {
    rom: string;
    core?: string;
    bios?: string;
    platform: string;
    redirected?: boolean;
}