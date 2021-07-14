#!/bin/bash

export HOMEDIR=`cd $(dirname $0); pwd`

docker-compose -f $HOMEDIR/9.docker-compose.yml down \
    --remove-orphans
