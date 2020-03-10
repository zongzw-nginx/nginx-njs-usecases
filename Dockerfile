# build with:
#   docker build -t zongzw/nginx-njs:latest . 

FROM centos:7

RUN yum install -y epel-release
RUN yum install -y curl vim wget file

workdir /root
RUN wget http://nginx.org/download/nginx-1.17.9.tar.gz
RUN tar zxf nginx-1.17.9.tar.gz

RUN wget http://hg.nginx.org/njs/archive/tip.tar.gz -O njs.tar.gz
RUN tar zxf njs.tar.gz

RUN wget https://github.com/libgd/libgd/releases/download/gd-2.2.5/libgd-2.2.5.tar.gz
RUN tar zxf libgd-2.2.5.tar.gz

RUN yum install -y gcc automake autoconf libtool make
RUN yum install  -y openssl-devel pcre-devel zlib-devel libpng-devel libjpeg-devel

workdir /root/libgd-2.2.5
RUN ./configure --with-png --with-jpeg
RUN make
RUN make install
RUN echo /usr/local/lib > /etc/ld.so.conf.d/libgd.conf

workdir /root/nginx-1.17.9
RUN ./configure \
    --prefix=/root/nginx \
    --with-http_ssl_module \
    --with-stream \
    --with-http_image_filter_module \
    --add-dynamic-module=/root/njs-cc5c687ebc1c/nginx
RUN make
RUN make install

workdir /root
ENV PATH=$PATH:/root/nginx/sbin

# CMD nginx
CMD ldconfig && while true; do sleep 10; done