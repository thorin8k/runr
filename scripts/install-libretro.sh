#! /bin/bash

mkdir -p ./tmp
if [ ! -f ./tmp/libretro-cores.tar.gz ]; then
    curl -o ./tmp/libretro-cores.tar.gz -L "https://github.com/linuxserver/libretro-cores/archive/master.tar.gz"
fi

if [ ! -f ./tmp/libretro.js ]; then
    curl -o ./tmp/libretro.js -L "https://raw.githubusercontent.com/linuxserver/emulatorjs/master/frontend/js/libretro.js"
fi

tar zxvf ./tmp/libretro-cores.tar.gz libretro-cores-master/data/

mv libretro-cores-master ./dist/libretro
mv ./tmp/libretro.js ./dist/libretro/libretro.js
