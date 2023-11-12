# Rom runner

This web app bundles emulatorjs and libretrojs inside a simple web server to allow management systems like `romm` to play retro games without implementing all of its dependencies.

## How to use it


> By default it plays all games using EmulatorJS.

Playing a game:

```
<url>/?rom=library/nes/mario.zip&core=nes
```

Forcing libretro:
 
```
<url>/?rom=sample-roms/nes/mario.zip&core=fceumm&type=libretro
```


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
