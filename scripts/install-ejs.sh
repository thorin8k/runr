#! /bin/bash

mkdir -p ./tmp

curl -o ./tmp/v4.0.8.tar.gz -L "https://github.com/EmulatorJS/EmulatorJS/archive/refs/tags/v4.0.8.tar.gz"

tar zxvf ./tmp/v4.0.8.tar.gz EmulatorJS-4.0.8/data/

mv EmulatorJS-4.0.8 ./dist/emulatorjs

rm ./tmp -R