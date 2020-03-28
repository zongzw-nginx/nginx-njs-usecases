### Validate the Request Body Format

```
$ curl localhost:8100 -d '{"id": 24, "value": 3.1415}'
server 81 is responsing.

$ curl localhost:8100 -d '{"id": 83, "value": 0.99}'
Server 82 is responsing.

```