
function audit(s) {
    var cr = require('crypto');
    var hash = cr.createHash('sha1');
    var seqID = 0;

    s.on('download', function(data, flags) {
        // s.log(`download data: ${data}`);
        if (!seqID) {
            var bodyPos = data.indexOf('\r\n\r\n') + 4;
            var bodyPart = data.substr(bodyPos);
            hash.update(bodyPart);
        } else {
            hash.update(data);
        }
        seqID ++;

        if(flags.last) {
            var hex = hash.digest('hex');
            s.log(`server sent fin, total pkgs: ${seqID}, body hash: ${hex}`);
        }

        s.send(data);
    });

    s.on('upload', function(data, flags){
        // s.log(`upload data: ${data}`);
        if (flags.last) {
            var hex = hash.digest('hex');
            s.log(`client sent fin, total pkgs: ${seqID}, body hash: ${hex}`);
        }

        s.send(data);
    });
}
