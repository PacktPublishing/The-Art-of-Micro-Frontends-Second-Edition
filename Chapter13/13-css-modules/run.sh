#!/bin/bash

cd mf-blue
npm i
cd ..
cd mf-red
npm i
npx pilet debug ../mf-red/src/index.tsx ../mf-blue/src/index.tsx
