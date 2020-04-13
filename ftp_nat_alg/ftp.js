
function get_data_port(s) {
    s.log(`[debug] FTP_PASV_PORT: ${process.env.FTP_PASV_PORT}`);
    return process.env.FTP_PASV_PORT;
}

function get_pasv_conn(s, ipaddr, port) {
    if(!ipaddr.match(/(\d+.){3}\d+/)) {
        s.error(`Invalid ipaddr ${ipaddr}`);
        return undefined;
    }
    if(!port.match(/\d+/)) {
        s.error(`Invalid port ${port}`);
        return undefined;
    }

    try {
        var p, p1, p2;

        p = Number(port);
        if(p < 1 || p > 65535) 
            throw new Error('Port should be 0 < port < 65536');

        p2 = p % 256;
        p1 = (p - p2) / 256;

        var ipaddr_s = ipaddr.split('.');
        ipaddr_s.forEach(d => {
            if (d < 0 || d > 255) 
                throw new Error(
                    `Invalid IP ${ipaddr} - ${d} should 0 <= n < 256`
                );
        });

        var conn = `${ipaddr_s.join(',')},${p1},${p2}`;
        s.log(`[debug] get pasv conn: ${ipaddr}, ${port} -> ${conn}`);
        return conn;
    } catch (error) {
        s.error("Errors when get pasv conn: " + error.message);
        s.deny();
        return undefined;
    }
}

function ftp_controller(s) {
    var dlen = 60;
    function handle_pasv(data, flags) {

        s.log(`[debug] <<<< data(${data.length}): ${data.substr(0, dlen)} ..`);

        var pasv_conn = get_pasv_conn(
            s, process.env.HOST_ADDRESS, process.env.NGX_DATA_PORT
        );

        var found = (data.search(/227 .*\(.*\)/) != -1);
        if (found) {
            var replaced = data;
            replaced = data.replace(/\(.*\)/, `(${pasv_conn})`);
            s.log("[debug] pasv resp:" + replaced);
            s.send(replaced);
        } else {
            s.send(data);
        }

        s.off('download');
    }

    s.on('upload', function(data, flags){
        s.log(`[debug] >>>> data(${data.length}): ${data.substr(0, dlen)} ..`);
        var found = (data.search(/^PASV/) != -1);
        if (found) {
            s.log(`[debug] client send PASV command.`);
            s.on('download', handle_pasv);
        }
        s.send(data);
    });
}
