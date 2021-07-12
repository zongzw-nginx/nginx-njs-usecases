#!/bin/bash

export HOMEDIR=`cd $(dirname $0); pwd`
export FTP_NPASV_ALG=$HOMEDIR/ftp_npasv_alg

# set as your physical IP for external access
export HOST_ADDRESS=127.0.0.1

export FTP_NPASV_PORT_START=20001
export FTP_NPASV_PORT_END=20010
export FTP_NPASV_PORTS="$FTP_NPASV_PORT_START-$FTP_NPASV_PORT_END"

docker-compose -f $HOMEDIR/docker-compose.yml down \
    --remove-orphans
