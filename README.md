# RunR (Rom Runner)
<img src="https://github.com/thorin8k/runr/assets/50626175/6b224924-7f19-4066-830e-91114e4288d6" alt="runr" style="width:200px;"/>


This web app bundles [emulatorjs](https://github.com/EmulatorJS/EmulatorJS) and [libretrojs](https://github.com/linuxserver/libretrojs) inside a simple container to allow management systems like [RomM](https://github.com/zurdi15/romm) to play retro games without implementing all of its dependencies.

This project is powered by [Bun](https://bun.sh/)

## How to use it

Playing a game:

``` 
<url>/?rom=library/nes/game.zip&core=nes&type=emu
```

Forcing libretro:
 
```
<url>/?rom=library/nes/game.zip&core=fceumm&type=libretro
```


For example if you deploy it in the `3000` port: 
``` 
http://localhost:3000/?rom=library/nes/game.zip&core=nes&type=emu
```

### Available Query Parameters

The system allows for several extra parameters to allow better customization:

- `type`: Sets the type of the runtime to execute the rom (emu || libretro). Optional if DEFAULT_RUNTIME is configured.
- `rom`: Sets the path to the rom file (required)
- `platform`: Specifies the platform to emulate (optional, recommended). System will try to identify this based on the rom path.
- `core`: Sets the core needed to load the game. See bellow for more information. Force rom to execute with specific core
- `bios`: Sets the path to the bios file (optional but required in some platforms / cores)


## Roadmap

Features pending to be implemented:
- [x] Execute roms with EmulatorJS
- [x] Execute roms with LibretroJS
- [x] Automatically detect platform based on rom path
- [x] Automatically translate cores based on platforms
- [ ] Fully integrate with RomM
- [x] Partial RomM integration via Bookmarklet. See #
- [ ] Automatically resolve bios files if required. Based on configurations
- [ ] Automatically resolve platform compatibility to choose best emulation type
- [ ] Implement official libretro instead of linuxserver's
- [ ] Improve documentation
- [ ] Create testing environment
- [ ] Implement threaded cores
- [ ] Explore emulatorjs additional parameters (ej: nes lightgun)
- [ ] Support for 206 partial content requests for chd serving.

Nice to have in the future:
- [ ] Handle sessions across different browsers?
- [ ] Netplay? Maybe? 😅
- [ ] Check if [Nostalgist.js](https://github.com/arianrhodsandlot/nostalgist) can fit as executor

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

## Compatibility and Requirements

WIP compatibility table

- 3d0: BIOS required | **NOT WORKING**
- Colecovision: Only Libretro. BIOS required
- msx: Only Libretro. BIOS required
- odyssey2: Only Libretro. BIOS required
- segaCD: **NOT WORKING**
- PCE: **NOT WORKING**
- vectrex: Only Libretro


All chd+libretro combinations are currently bugged because of the 206 partial content requests. The systen doesn't support that yet so the rom stays loading forever.

## RomM Integration

The main goal of this project is to be able to play games directly from my personal [RomM](https://github.com/zurdi15/romm) library. 

Instead of including all of this implementation in the `RomM` codebase i've decided to extract and package this system as a separate container.

This maybe allows other systems to integrate it as well and improves the delivery of both projects as they wont strongly depend on each other.

> Disclaimer: I don't have any relationship with the developers of `RomM` and this is just a personal project that i've created in my spare time.

### Bookmarklet alternative

While i prepare everything to be directly integrated with RomM you can run your games using the following Bookmarklet code:
``` js
javascript:(async function(){    const RUNR_PATH = "<RUNR_URL>"; const url = new URL(window.location.href); if(!url.pathname.includes("platform")){ return alert("Website not supported"); } const parts = url.pathname.split("/"); const resp = await fetch(`${url.origin}/api/platforms/${parts[2]}/roms/${parts[3]}`); const data = await resp.json(); window.open(`${RUNR_PATH}/?rom=${data?.full_path}&platform=${data?.p_slug}`); })();
```

For 2.2.0+ (thanks @karl0ss)
``` js
javascript:(async function(){    const RUNR_PATH = "<RUNR_URL>"; const url = new URL(window.location.href); if(!url.pathname.includes("platform")){ return alert("Website not supported"); } const parts = url.pathname.split("/"); const resp = await fetch(`${url.origin}/api/roms/${parts[3]}`);const data = await resp.json();window.open(`${RUNR_PATH}/?rom=${data?.full_path}&platform=${data?.platform_slug.toLowerCase()}`);})();
```

For 3.+
``` js
javascript:(async function(){    const RUNR_PATH = "<RUNR_URL>"; const url = new URL(window.location.href); if(!url.pathname.includes("rom")){ return alert("Website not supported"); } const parts = url.pathname.split("/"); const resp = await fetch(`${url.origin}/api/roms/${parts[2]}`);const data = await resp.json();window.open(`${RUNR_PATH}/?rom=${data?.full_path}&platform=${data?.platform_slug.toLowerCase()}`);})();
```

To do this you just have to create a Bookmark, give it a name and paste the above code inside the URL.

> Important!! Change <RUNR_URL> to the URL of your running instance of RunR. Example: http://localhost:3000
 

### FUTURE -> How to configure `RomM`

**There is an open PR sent to the team to include the code required to run the games directly.** https://github.com/zurdi15/romm/pull/513

To use it you need to configure several things:

- RomM envinronment variables:
``` yaml
    ...
    - RUNR_ENABLED=true
    - RUNR_URL=http://localhost:3000/ # The final slash(/) is important
    - RUNR_ACTIVE_PLATFORMS=3do,arcade,atari2600,atari5200,atari7800,atari-jaguar-cd,lynx,nes,n64,nds,gba,gbc,gb,ps,snes,sg1000,sega32,segacd,gamegear,sms,genesis-slash-megadrive,saturn,vb,wonderswan,wonderswan-color,turbografx-16-slash-pc-engine-cd
```

- RunR library: The location of the library must match with the one configured in RomM. Example in docker-compose.yaml:
``` yaml

  romm:
    ...
    volumes:
      - /data/Roms:/romm/library
    ...
  runr:
    ...
    environment: 
      - LIBRARY_PATH=/library
    volumes:
      - /data/Roms:/library
    ...

```

# Installation

System is packaged as a docker container inside Github registry. For installing it the recommended method is using a `docker-compose` file like this:

```yaml
version: "3"
services:
  runr:
    image: ghcr.io/thorin8k/runr:latest
    container_name: runr
    environment:
      - DEFAULT_RUNTIME=emu
      - LIBRARY_PATH=/library/ # The trailing slash is important
    volumes:
      - "/mnt/main-disk/data/Roms:/app/library"
    ports:
      - 4023:3000
    restart: "unless-stopped"
    network_mode: "bridge"

```



Full romm + runnr example

``` yaml

version: "3"
services:
  romm:
    image: ghcr.io/zurdi15/romm:dev-latest
    container_name: romm
    environment:
      - ROMM_DB_DRIVER=sqlite # mariadb | sqlite (default: sqlite)
      # [Optional] Used to fetch metadata from IGDB
      #- IGDB_CLIENT_ID=xx
      #- IGDB_CLIENT_SECRET=xx
      # [Optional] Use SteamGridDB as a source for covers
      #- STEAMGRIDDB_API_KEY=xx
      # [Optional] Will enable user management and require authentication to access the interface (disabled by default)
      #- ROMM_AUTH_ENABLED=true # default: false
      #- ROMM_AUTH_SECRET_KEY=<secret key> # Generate a key with `openssl rand -hex 32`
      #- ROMM_AUTH_USERNAME=admin # default: admin
      #- ROMM_AUTH_PASSWORD=<admin password> # default: admin
      # [Optional] Only required if authentication is enabled
      #- ENABLE_EXPERIMENTAL_REDIS=true # default: false
      #- REDIS_HOST=redis # default: localhost
      #- REDIS_PORT=6379 # default: 6379
      #- REDIS_PASSWORD=<redis password> # [Optional] Support for secured redis
      # [Optional] Will enable asynchronous tasks (all disabled by default)
      - ENABLE_RESCAN_ON_FILESYSTEM_CHANGE=true # Runs a quick scan on the library when a file is added or removed
      - RESCAN_ON_FILESYSTEM_CHANGE_DELAY=15 # Delay in seconds before running the quick scan (default: 5)
      - ENABLE_SCHEDULED_RESCAN=true # Runs a quick scan on the library at a given time
      - SCHEDULED_RESCAN_CRON=0 3 * * * # Cron expression for the scheduled scan (default: 0 3 * * * - At 3:00 AM every day)
      - ENABLE_SCHEDULED_UPDATE_SWITCH_TITLEDB=true # Updates the Switch TitleDB database at a given time
      - SCHEDULED_UPDATE_SWITCH_TITLEDB_CRON=0 4 * * * # Cron expression for the scheduled update (default: 0 4 * * * - At 4:00 AM every day)
      - ENABLE_SCHEDULED_UPDATE_MAME_XML=true # Updates the MAME XML database at a given time
      - SCHEDULED_UPDATE_MAME_XML_CRON=0 5 * * * # Cron expression for the scheduled update (default: 0 5 * * * - At 5:00 AM every day)
      - RUNR_ENABLED=true
      - RUNR_URL=http://localhost:8081/
      - RUNR_ACTIVE_PLATFORMS=3do,arcade,atari2600,atari5200,atari7800,atari-jaguar-cd,lynx,nes,n64,nds,gba,gbc,gb,ps,snes,sg1000,sega32,segacd,gamegear,sms,genesis-slash-megadrive,saturn,vb,wonderswan,wonderswan-color,turbografx-16-slash-pc-engine-cd
    volumes:
      - "./Roms:/romm/library"
      - "./resources:/romm/resources" # [Optional] Path where roms metadata (covers) are stored
      - "./config.yml:/romm/config.yml" # [Optional] Path where config is stored
      - "./db:/romm/database" # [Optional] Only needed if ROMM_DB_DRIVER=sqlite or not set
      - "./logs:/romm/logs" # [Optional] Path where logs are stored
    ports:
      - 8080:8080
    restart: "unless-stopped"
    network_mode: "bridge"

  runr:
    image: ghcr.io/thorin8k/runr:latest
    container_name: runr
    environment:
      - DEFAULT_RUNTIME: emu
      - LIBRARY_PATH: /library/ # The trailing slash is important
    volumes:
      - "/mnt/main-disk/data/Roms:/app/library"
    ports:
      - 8081:3000
    restart: "unless-stopped"
    network_mode: "bridge"

```

## Environment variables available

``` yaml
BASE_PATH: undefined # Only set this if the proyect files will be loaded from a different folder than default
RELATIVE_PATH: undefined # Only set this if the deployment is done in a proxied subpath of another domain name. (Currently not working with romm)
LIBRARY_PATH: /library/ # Path used to search for roms. This is relative to the deployment directory (/app in case of docker deployment)
USE_THREADED: false # If the emulators should prefer threaded versions of the cores. This will improve systems like the NDS but requires to be deployed using https. This is a placeholder for the future, **not implemented yet**.
DEFAULT_RUNTIME: emu || libretro # Default runtime to be used. Ifnot specified the redirection should have a type parameter.
[WIP]
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
