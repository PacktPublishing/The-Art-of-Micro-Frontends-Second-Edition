#!/bin/bash
(trap 'kill 0' SIGINT; (cd mf-gw && npm start) & (cd mf-1 && npm start) & (cd mf-2 && npm start))