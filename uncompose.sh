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
export PAYLOAD_PROXY=$HOMEDIR/payload_proxy
export FTP_1PASV_ALG=$HOMEDIR/ftp_1pasv_alg

export FTP_1PASV_PORT=20000 # ftp data transfering IP
export NGX_1PASV_PORT=20000  # nginx data transfering IP
# set as your physical IP for external access
export HOST_ADDRESS=127.0.0.1

docker-compose -f $HOMEDIR/docker-compose.yml down \
    --remove-orphans
