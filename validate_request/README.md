### Validate the Request Body Format

```
$ curl -X POST localhost:8099 -d 'item=85.0'
Invalid body format!

$ curl -X POST localhost:8099 -d '{"item": 85.0}'
hello NJS
```