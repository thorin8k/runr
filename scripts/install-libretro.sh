#! /bin/bash

mkdir -p ./tmp

curl -o ./tmp/libretro-cores.tar.gz -L "https://github.com/linuxserver/libretro-cores/archive/master.tar.gz"

curl -o ./tmp/libretro.js -L "https://raw.githubusercontent.com/linuxserver/emulatorjs/master/frontend/js/libretro.js"

tar zxvf ./tmp/libretro-cores.tar.gz libretro-cores-master/data/

mv libretro-cores-master ./dist/libretro

mv ./tmp/libretro.js ./dist/libretro/libretro.js

rm ./tmp -R
