### Virtual Patching with the NGINX JavaScript Module

To See the effect of the usecase, we will comment the following line first and then uncomment it to see the result comparation.

```
36        js_filter method_up;
```

If the line commented, 400 would be responsed.

    ```
    $ curl -v http://localhost:8093 -X get    # request with lowercase 'get'

    Note: Unnecessary use of -X or --request, GET is already inferred.
    * Rebuilt URL to: localhost:8093/
    *   Trying 127.0.0.1...
    * TCP_NODELAY set
    * Connected to localhost (127.0.0.1) port 8093 (#0)
    > get / HTTP/1.1
    > Host: localhost:8093
    > User-Agent: curl/7.54.0
    > Accept: */*
    >
    < HTTP/1.1 400 Bad Request                  <--- response with bad request
    < Server: nginx/1.17.9
    < Date: Fri, 20 Mar 2020 09:12:24 GMT
    < Content-Type: text/html
    < Content-Length: 157
    < Connection: close
    <
    <html>
    <head><title>400 Bad Request</title></head>
    <body>
    <center><h1>400 Bad Request</h1></center>
    <hr><center>nginx/1.17.9</center>
    </body>
    </html>
    * Closing connection 0
    ```

With the line uncommented, nginx response with 200.

    ```
    $ curl -v localhost:8093 -X get
    Note: Unnecessary use of -X or --request, GET is already inferred.
    * Rebuilt URL to: localhost:8093/
    *   Trying 127.0.0.1...
    * TCP_NODELAY set
    * Connected to localhost (127.0.0.1) port 8093 (#0)
    > get / HTTP/1.1
    > Host: localhost:8093
    > User-Agent: curl/7.54.0
    > Accept: */*
    >
    < HTTP/1.1 200 OK
    < Server: nginx/1.17.9
    < Date: Fri, 20 Mar 2020 09:18:00 GMT
    < Content-Type: text/plain
    < Content-Length: 12
    < Connection: keep-alive
    <
    * Connection #0 to host localhost left intact
    hello world.
    ```
