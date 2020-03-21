function loggingJson(r) {
    // log_format combined '$remote_addr - $remote_user [$time_local] '
    // '"$request" $status $body_bytes_sent '
    // '"$http_referer" "$http_user_agent"';
    var log = {};
    var indexes = [
        'remote_addr', 'remote_user', 
        'time_local', 'request', 
        'status', 'body_bytes_sent',
        'http_referer', 'http_user_agent'
    ];
    for(var n in indexes) {
        var key = indexes[n];
        // r.log(`n: ${n}, r.variables[${key}]: ${r.variables[key]}`);
        log[key] = r.variables[key];
    }

    var headerTypes = ['headersIn', 'headersOut'];
    for (var m in headerTypes) {
        var type = headerTypes[m];
        log[type] = {};
        var headers = r[type];
        for (var n in headers) {
            r.log(`${n}: ${headers[n]}`);
            log[type][n] = headers[n];
        }
    }

    return JSON.stringify(log);
}