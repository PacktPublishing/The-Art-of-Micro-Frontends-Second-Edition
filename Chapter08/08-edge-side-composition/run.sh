#!/bin/bash

MFs=('blue' 'green' 'red')

for MF in "${MFs[@]}"
do
  cd $MF
  npm i
  cd ..
done

docker kill web
docker rm web

cd edge
docker build -t webserver .
cd ..

docker run -it --rm -d -p 1234:80 --name web webserver

(trap 'kill 0' SIGINT; (cd blue && npm start) & (cd green && npm start) & (cd red && npm start))
