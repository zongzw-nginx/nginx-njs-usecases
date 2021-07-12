# nginx-njs-usecases

This is a project for demonstrating NGINX NJS usage and abilities.

In this code repository, there are several NJS usecase implementations.

All the usecases are in separate folders. 

* For installation from source, see `Dockerfile` for more details such as nginx version, modules, compiling process, etc. 

* For running usecases, see `docker-compose.yml` under each usecase folder.

## Dependencies

* docker
* docker-compose

Navigate to each use case folders for details.

## Run It

Navigate into each usecase folder and run `./compose.sh`
Refer the `README.md` and use your browser or curl command to see the effect.
Use `./uncompose.sh` to cleanup the containers.

## DevOps Model

![image](./devops-model.png)

