#!/bin/bash

sed 's/const /var /g' 3.bundle.js | sed 's/let /var /g' > 5.updated-bundle.js
