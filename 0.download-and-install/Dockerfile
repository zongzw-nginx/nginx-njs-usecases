# build with:
#   docker build -t nginx-njs:latest . 

FROM centos:7

ENV nginx_version=1.21.1
RUN yum install -y epel-release
RUN yum install -y curl vim wget file

WORKDIR /root
RUN wget http://nginx.org/download/nginx-${nginx_version}.tar.gz
RUN tar zxf nginx-${nginx_version}.tar.gz

RUN wget http://hg.nginx.org/njs/archive/tip.tar.gz -O njs.tar.gz
RUN tar zxf njs.tar.gz

RUN mv $(find /root -name "njs-[0-9a-f]*") njs
RUN wget https://github.com/libgd/libgd/releases/download/gd-2.2.5/libgd-2.2.5.tar.gz
RUN tar zxf libgd-2.2.5.tar.gz

RUN yum install -y gcc automake autoconf libtool make
RUN yum install  -y openssl-devel pcre-devel zlib-devel libpng-devel libjpeg-devel

WORKDIR /root/libgd-2.2.5
RUN ./configure --with-png --with-jpeg
RUN make
RUN make install
RUN echo /usr/local/lib > /etc/ld.so.conf.d/libgd.conf

WORKDIR /root/nginx-${nginx_version}
RUN ./configure \
    --prefix=/root/nginx \
    --with-http_ssl_module \
    --with-stream \
    --with-http_image_filter_module \
    --with-http_realip_module \
    --with-stream_ssl_module \
    --add-dynamic-module=/root/njs/nginx
RUN make
RUN make install

WORKDIR /root
ENV PATH=$PATH:/root/nginx/sbin

RUN ldconfig