#!/bin/bash

export HOMEDIR=`cd $(dirname $0); pwd`
export AUTOINDEX_PREV=$HOMEDIR/autoindex_prev

docker-compose -f $HOMEDIR/docker-compose.yml up -d --force-recreate
