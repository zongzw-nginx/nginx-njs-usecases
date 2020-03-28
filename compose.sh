#!/bin/bash

export HOMEDIR=`cd $(dirname $0); pwd`
export AUTOINDEX_PREV=$HOMEDIR/autoindex_prev
export DATA_MASKING=$HOMEDIR/data_masking
export VIRTUAL_PATCHING=$HOMEDIR/virtual_patching
export FAST_RESPONSE=$HOMEDIR/fast_response
export JSON_LOGGING=$HOMEDIR/json_logging
export FILE_OPERA=$HOMEDIR/file_opera
export BATCHING_REQUEST=$HOMEDIR/batching_request
export AUDITTING_DEFACEMENT=$HOMEDIR/auditting_defacement
export VALIDATE_REQUEST=$HOMEDIR/validate_request

docker-compose -f $HOMEDIR/docker-compose.yml up -d --force-recreate
