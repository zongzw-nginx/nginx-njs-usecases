#!/bin/bash

export HOMEDIR=`cd $(dirname $0); pwd`

docker-compose -f $HOMEDIR/8.docker-compose.yml down \
    --remove-orphans
