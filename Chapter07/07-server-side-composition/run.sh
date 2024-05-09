#!/bin/bash
(trap 'kill 0' SIGINT; (cd red && npm start) & (cd blue && npm start) & (cd green && npm start) & (cd gateway && npm start))