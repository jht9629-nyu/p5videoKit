#!/bin/bash
cd ${0%/*}

cd ../src

# ./node_modules/.bin/electron electron-main --full --restart_time 23:59:59 --screen 1 --s 0-color-line-1900
./node_modules/.bin/electron electron-main --edebug --restart_period 1:0:0 --screen 1 --s 0-color-line-1900
