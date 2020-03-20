### Data Masking for User Privacy with the NGINX JavaScript Module

* IP Address Masking in Action

  ```
  $ curl http://localhost/
  127.0.0.1 -> 8.163.209.30
  $ sudo tail --lines=1 /var/log/nginx/access*.log
  ==> /var/log/nginx/access.log <==
  127.0.0.1 - - [16/Mar/2017:19:08:19 +0000] "GET / HTTP/1.1" 200 26 "-" "curl/7.47.0"

  ==> /var/log/nginx/access_masked.log <==
  8.163.209.30 - - [16/Mar/2017:19:08:19 +0000] "GET / HTTP/1.1" 200 26 "-" "curl/7.47.0"
  ```

* Masking Personal Data in the Query String

  ```
  $ curl "http://localhost/index.php?foo=bar&zip=90210&email=liam@nginx.com"
  127.0.0.1 -> 8.163.209.30
  $ sudo tail --lines=1 /var/log/nginx/access*.log
  ==> /var/log/nginx/access.log <==
  127.0.0.1 - - [16/Mar/2017:20:05:55 +0000] "GET /index.php?foo=bar&zip=90210&email=liam@nginx.com HTTP/1.1" 200 26 "-" "curl/7.47.0"

  ==> /var/log/nginx/access_masked.log <==
  8.163.209.30 - - [16/Mar/2017:20:05:55 +0000] "GET /index.php?foo=bar&zip=38643&email=2852675791@example.com HTTP/1.1" 200 26 "-" "curl/7.47.0"
  ```
