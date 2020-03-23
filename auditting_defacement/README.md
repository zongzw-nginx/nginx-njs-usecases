### Defacement Detection/Auditting with Stream NJS Module

This is an example of using stream njs module.

The response body would be calculated sha1 hash, logged into error.log.

```
2020/03/23 12:30:25 [info] 47#0: *1 js: server sent fin, total pkgs: 2, \
    body hash: 0190e761bba7bf93fac099718ddb33fd9b3bea1f      <- echo -n 'hello world.' | shasum -a 1
```

There are 2 situations:

1) client close the connection:

```
$ curl http://localhost:8098 -v

* Rebuilt URL to: localhost:8098/
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8098 (#0)
> GET / HTTP/1.1
> Host: localhost:8098
> User-Agent: curl/7.54.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Server: nginx/1.17.9
< Date: Mon, 23 Mar 2020 12:30:50 GMT
< Content-Type: text/plain
< Content-Length: 12
< Connection: keep-alive
<
* Connection #0 to host localhost left intact
hello world.
```

In the log, it indicates `client disconnected`:

```
2020/03/23 12:41:00 [info] 114#0: *1 client 172.30.0.1:58108 connected to 0.0.0.0:80
2020/03/23 12:41:00 [info] 114#0: *1 proxy 127.0.0.1:44148 connected to 127.0.0.1:81
2020/03/23 12:41:00 [info] 114#0: *1 js: client sent fin, total pkgs: 1, body hash: 0190e761bba7bf93fac099718ddb33fd9b3bea1f
2020/03/23 12:41:00 [info] 114#0: *1 client disconnected, bytes from/to client:78/160, bytes from/to upstream:160/78
```

2) server close the connection:

```
$ curl localhost:8098 -v -0

* Rebuilt URL to: localhost:8098/
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8098 (#0)
> GET / HTTP/1.0
> Host: localhost:8098
> User-Agent: curl/7.54.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Server: nginx/1.17.9
< Date: Mon, 23 Mar 2020 12:42:18 GMT
< Content-Type: text/plain
< Content-Length: 12
< Connection: close
<
* Closing connection 0
hello world.
```

In the log, it indicates `upstream disconnected`:

```
2020/03/23 12:42:18 [info] 123#0: *1 client 172.30.0.1:58114 connected to 0.0.0.0:80
2020/03/23 12:42:18 [info] 123#0: *1 proxy 127.0.0.1:44154 connected to 127.0.0.1:81
2020/03/23 12:42:18 [info] 123#0: *1 js: server sent fin, total pkgs: 2, body hash: 0190e761bba7bf93fac099718ddb33fd9b3bea1f
2020/03/23 12:42:18 [info] 123#0: *1 upstream disconnected, bytes from/to client:78/155, bytes from/to upstream:155/78
```
