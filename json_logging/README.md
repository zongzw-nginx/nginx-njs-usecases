### Logging Customizing into JSON

The following logging sample is 'pretty formatted'(multi-line separated && aligned).
```
$ tail -1 /root/nginx/logs/access_json.log

{
    'remote_addr':      '172.30.0.1',
    'time_local':       '21/Mar/2020:10:46:22 +0000',
    'request':          'GET / HTTP/1.1',
    'status':           '200',
    'body_bytes_sent':  '10',
    'http_user_agent':  'curl/7.54.0',
    'headersIn': {
        'Host':         'localhost:8095',
        'User-Agent':   'curl/7.54.0',
        'Accept':       '*/*'
    },
    'headersOut': {
        'Server':       'nginx/1.17.9',
        'Date':         'Sat, 21 Mar 2020 10:46:22 GMT'
    }
}
```

We can integrate with ELK with `r.subrequest` to `POST` the json formated log entry to Elasticsearch. 

Of course, this is only one possible way for logging collecting, while another way is parsing from access.log with filebeat or so.

The following code convert `"` to `'`, because in /root/nginx/logs/acess_json.log, `"` would be urlencoded to `\x22`.

```
    while(logStr.indexOf('"') != -1) {
        logStr = logStr.replace('"', "'");
    }
```
