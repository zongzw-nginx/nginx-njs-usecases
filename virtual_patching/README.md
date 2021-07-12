### Virtual Patching with the NGINX JavaScript Module

The Official usecase reference: https://www.nginx.com/blog/virtual-patching-with-nginx-javascript-module/

400 would be responsed if we use 'post'.

    ```
    $ curl -v http://localhost:8093 -X post
    *   Trying ::1...
    * TCP_NODELAY set
    * Connected to localhost (::1) port 8093 (#0)
    > post / HTTP/1.1
    > Host: localhost:8093
    > User-Agent: curl/7.64.1
    > Accept: */*
    > 
    < HTTP/1.1 400 Bad Request
    < Server: nginx/1.21.1
    < Date: Mon, 12 Jul 2021 14:31:43 GMT
    < Content-Type: text/html
    < Content-Length: 157
    < Connection: close
    < 
    <html>
    <head><title>400 Bad Request</title></head>
    <body>
    <center><h1>400 Bad Request</h1></center>
    <hr><center>nginx/1.21.1</center>
    </body>
    </html>
    * Closing connection 0
    ```

200 would be responsed if we use 'get'.

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

That's because in the patching.js, we virtual-patches the lower 'get' with 'GET', but no patching 'post'.

The lower 'get' and 'post' are not accepted by upstream.