#!/bin/bash

export HOMEDIR=`cd $(dirname $0); pwd`

docker-compose -f $HOMEDIR/8.docker-compose.yml up -d \
    --force-recreate --remove-orphans
