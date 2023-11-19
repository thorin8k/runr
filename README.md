# RunR (Rom Runner)

This web app bundles [emulatorjs](https://github.com/EmulatorJS/EmulatorJS) and [libretrojs](https://github.com/linuxserver/libretrojs) inside a simple web server to allow management systems like [RomM](https://github.com/zurdi15/romm) to play retro games without implementing all of its dependencies.

This project is powered by [Bun](https://bun.sh/)

## How to use it

Playing a game:

``` 
<url>/?rom=library/nes/game.zip&core=nes
```

Forcing libretro:
 
```
<url>/?rom=library/nes/game.zip&core=fceumm&type=libretro
```
> By default it plays all games using EmulatorJS.


For example if you deploy it in the `3000` port: 
``` 
http://localhost:3000/?rom=library/nes/game.zip&core=nes
```

### Available Query Parameters

The system allows for several extra parameters to allow better customization:

- `rom`: Sets the path to the rom file (required)
- `bios`: Sets the path to the bios file (optional)
- `core`: Sets the core needed to load the game. See bellow for more information
- `type`: Sets the type of the runtime to execute the rom (emu || emulatorjs)


## Emulator Runners

The system uses two different emulator runners:

- [EmulatorJS](https://github.com/EmulatorJS/EmulatorJS)

For this we currently use the latest version as it is by wrapping the execution of it with the parameters received.

> RunnR actually supports specifing the bios and core parameters mentioned before. We plan to add extra parameters like NES ligthgun in future releases.


Check EmulatorJS docs for more information: [https://github.com/EmulatorJS/EmulatorJS/tree/main/docs]


- [LibretroJS](https://github.com/linuxserver/libretrojs)

This implementation is a bit tricky as its a linuxserver custom wrapper with its own cores. This is currently used in the linuxserver/emulatorjs project and they released the cores and the library separately.

For this we made a couple of modifications to align with the EmulatorJS implementation by changing from where it can load the resources.

Here the implementation of this project is better than ours as they have its own filebrowser to load allow users to save localStorage sessions for later with authentication and so, but well... this is our first version 😅



## RomM Integration

One of the goals of this project is to be able to play [RomM](https://github.com/zurdi15/romm) games in my personal library directly. 

Instead of including all of this implementation in the `RomM` codebase i've decided to extract and package this sistem as a separate container.

This maybe allows other systems to integrate it ass well and improves the delivery of both projects as they wont depend on each other.

> Disclaimer: I don't have any relationship with the developers of `RomM` and this is just a personal project that i've created in my spare time.

## How to configure `RomM`:

There is an open PR sent to the team to include the code required to run the games directly.

To use it you need to configure several things:

- RomM envinronment variables:
``` yaml
    ...
    - RUNR_ENABLED: true
    - RUNR_URL: http://localhost:3000/ # The final slash(/) is important
```

- RunR library: The location of the library must match with the one configured in RomM. Example:
``` yaml

  romm:
    ...
    volumes:
      - /data/Roms:/romm/library
    ...
  runr:
    ...
    environment: 
      - RUNR_LIBRARY_PATH: /library
    volumes:
      - /data/Roms:/library
    ...

```

# Installation

System is packaged as a docker container inside Github registry. For installing it the recommended method is using a `docker-compose` file like this:

```yaml
WIP
```

## Environment variables available

``` yaml
RUNR_LIBRARY_PATH: /library # Path where system will use to search for roms
RUNR_USE_THREADED: false # If the emulators should prefer threaded versions of the cores. This will improve systems like the NDS but requires to be deployed using https
WIP
```

# Development Setup

To install dependencies:

```bash
bun install
```

Setup dev environment

```bash
bun run setup
```

To Run:

``` bash
bun dev
```
