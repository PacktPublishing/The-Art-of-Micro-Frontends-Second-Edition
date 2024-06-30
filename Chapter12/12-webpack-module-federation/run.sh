#!/bin/bash

MFs=('app' 'blue' 'green' 'red')

for MF in "${MFs[@]}"
do
  cd $MF
  npm install
  cd ..
done

npx concurrently "npm --prefix app run start" "npm --prefix blue run start" "npm --prefix red run start" "npm --prefix green run start"
