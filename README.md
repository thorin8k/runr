# RunR (Rom Runner)

This web app bundles [emulatorjs](https://github.com/EmulatorJS/EmulatorJS) and [libretrojs](https://github.com/linuxserver/libretrojs) inside a simple web server to allow management systems like [RomM](https://github.com/zurdi15/romm) to play retro games without implementing all of its dependencies.

This project is powered by [Bun](https://bun.sh/)

## How to use it

Playing a game:

``` 
<url>/?rom=library/nes/mario.zip&core=nes
```

Forcing libretro:
 
```
<url>/?rom=library/nes/mario.zip&core=fceumm&type=libretro
```
> By default it plays all games using EmulatorJS.


### Parameters available

The system allows for several extra parameters to allow better customization:

- `rom`: Specifies the path to the rom file (required)
- `bios`: Specifies the path to the bios file (optional)
- `core`: Speficies the core needed to load the game. See bellow for more information
- `type`: Sets the type of the runtime to execute the rom (emu || emulatorjs)


# Development Setup

To install dependencies:

```bash
bun install
```

Setup dev environment

```bash
bun run prebuild
```

To Run:

``` bash
bun rub dev
```
