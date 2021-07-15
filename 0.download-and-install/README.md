### Install NJS from source in the container

This is the example of installing NGINX and NJS from source.

* Dockerfile

  See from `Dockerfile` we can see the docker image building process, includes downloading source code, installing dependencies and build with `./configure` and `make`.

  `libpng-devel` and `libjpeg-devel` are optional. However, we will need them to handle images in usecase `autoindex_prev`.

* docker-compose.yml

  It starts a container exposing 8090 port. Also in the container, `nginx.conf` and `http.js` are mounted as volumes correctly.

* nginx.conf and http.js

  These two files are from https://nginx.org/en/docs/njs/examples.html#helloword, which is the basic example.

* compose.sh/uncompose.sh

  Convenient scripts for start/stop this usecase.

