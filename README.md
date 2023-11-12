# RunR (Rom Runner)

This web app bundles [emulatorjs](https://github.com/EmulatorJS/EmulatorJS) and [libretrojs](https://github.com/linuxserver/libretrojs) inside a simple web server to allow management systems like [RomM](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwip0r-29b6CAxVDVqQEHWzaDtwQFnoECBEQAQ&url=https%3A%2F%2Fgithub.com%2Fzurdi15%2Fromm&usg=AOvVaw1xusjurNj0BdClocTLF0N7&opi=89978449) to play retro games without implementing all of its dependencies.

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
