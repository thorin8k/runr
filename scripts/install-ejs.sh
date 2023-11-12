#! /bin/bash

mkdir -p ./tmp

if [ ! -f ./tmp/v4.0.8.tar.gz ]; then
    curl -o ./tmp/v4.0.8.tar.gz -L "https://github.com/EmulatorJS/EmulatorJS/archive/refs/tags/v4.0.8.tar.gz"
fi

tar zxvf ./tmp/v4.0.8.tar.gz EmulatorJS-4.0.8/data/

mv EmulatorJS-4.0.8 ./dist/emulatorjs
