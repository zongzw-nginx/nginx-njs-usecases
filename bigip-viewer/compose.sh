#!/bin/bash

export HOMEDIR=`cd $(dirname $0); pwd`

docker-compose -f $HOMEDIR/docker-compose.yaml up -d \
    --force-recreate --remove-orphans

docker ps 