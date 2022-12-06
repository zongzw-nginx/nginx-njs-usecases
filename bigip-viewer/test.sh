#!/bin/bash

curl "http://localhost:8082/greb?host=10.250.18.105:8443&uri=/mgmt/tm/ltm/virtual/~Common~x&partition=Common&fields=name,partition" -v -H "Authorization: Basic YWRtaW46UEBzc3cwcmQxMjM="