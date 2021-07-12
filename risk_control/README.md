Sideband请求可以取到token时

This usecase just shows some useful javascript reference, not docker-based runnable.

[root@client ~]# curl 10.1.10.57/index.html -H "foo: 123"
token exists~~~~ server 2 is responding

Sideband请求无法取到token时

[root@client ~]# curl 10.1.10.57/index.html -H "bar: 456"
Error: token is not available
