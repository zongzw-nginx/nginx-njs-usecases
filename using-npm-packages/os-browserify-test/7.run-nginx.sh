#!/bin/bash

cdir=`cd $(dirname $0); pwd`
docker run -it \
    -v $cdir/6.nginx.conf:/etc/nginx/nginx.conf \
    -v $cdir/5.njs-bundle.js:/etc/nginx/njs_bundle.js \
    -p 8080:80 \
    nginx:latest nginx
