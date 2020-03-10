#!/bin/bash

export HOMEDIR=`cd $(dirname $0); pwd`

docker-compose -f $HOMEDIR/docker-compose.yml up -d --force-recreate
