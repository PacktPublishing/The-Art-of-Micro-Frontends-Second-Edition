#!/bin/bash

trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

cd service-feed
npm install
npm start &
cd ..

MFs=('balance' 'settings' 'tax')

for MF in "${MFs[@]}"
do
  cd frontend-$MF
  npm install
  npm run bundle
  npm run publish
  cd ..
done

cd app-shell
npm install
npm start
cd ..
