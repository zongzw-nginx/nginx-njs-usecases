#!/bin/bash

export HOMEDIR=`cd $(dirname $0); pwd`
export AUTOINDEX_PREV=$HOMEDIR/autoindex_prev
export DATA_MASKING=$HOMEDIR/data_masking

docker-compose -f $HOMEDIR/docker-compose.yml up -d --force-recreate
