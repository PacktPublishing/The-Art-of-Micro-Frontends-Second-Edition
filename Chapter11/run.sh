#!/bin/bash

trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT

cd 11-service-feed
npm install
npm start &
cd ..

MFs=('balance' 'settings' 'tax')

for MF in "${MFs[@]}"
do
  cd 11-frontend-$MF
  npm install
  npm run bundle
  npm run publish
  cd ..
done

cd 11-app-shell
npm install
npm start
cd ..
