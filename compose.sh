#!/bin/bash

export HOMEDIR=`cd $(dirname $0); pwd`
export AUTOINDEX_PREV=$HOMEDIR/autoindex_prev
export DATA_MASKING=$HOMEDIR/data_masking
export VIRTUAL_PATCHING=$HOMEDIR/virtual_patching

docker-compose -f $HOMEDIR/docker-compose.yml up -d --force-recreate
