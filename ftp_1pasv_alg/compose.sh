#!/bin/bash

export HOMEDIR=`cd $(dirname $0); pwd`
export FTP_1PASV_ALG=$HOMEDIR/ftp_1pasv_alg

export FTP_1PASV_PORT=20000 # ftp data transfering IP
export NGX_1PASV_PORT=20000  # nginx data transfering IP
# set as your physical IP for external access
export HOST_ADDRESS=127.0.0.1

docker-compose -f $HOMEDIR/docker-compose.yml up -d \
    --force-recreate --remove-orphans
