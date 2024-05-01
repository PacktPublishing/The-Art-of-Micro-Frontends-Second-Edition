#!/bin/bash

MFs=('balance' 'settings' 'tax')

for MF in "${MFs[@]}"
do
  cd $MF
  npm install
  npm run build
  cd ..
done

cd app-shell
npm install
npm start
cd ..
