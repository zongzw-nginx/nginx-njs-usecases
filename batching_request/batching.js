function batching(r) {
    function getSubjects(res) {
        if (res.status != 200) {
            r.error(`Request to ${res.uri} failed.`);
            r.return(res.status, res.responseBody);
            return;
        }

        var subjects = [];

        var jd = JSON.parse(res.responseBody);
        jd.forEach(function (file) {
            var s = file.name.substr(0, file.name.indexOf('.json'));
            subjects.push(s);
        });

        return subjects;
    }

    var subjN = 0;
    var subjI = 0;
    var data = {};

    r.subrequest('/subjects/')
    .then(res => getSubjects(res))
    .then(subjs => {
        subjN = subjs.length;

        function done(resp) {
            subjI ++;
            if (resp.status != 200) {
                r.return(resp.status, resp.responseBody);
            }

            data[resp.uri] = JSON.parse(resp.responseBody);
            // r.log(`${resp.uri}, ${resp.responseBody}`);

            if (subjI == subjN) {
                var rlt = {}
                var uris = Object.keys(data);
                uris.forEach(uri => {
                    var subj = uri.substr(
                        uri.lastIndexOf('/')+1, 
                        uri.lastIndexOf('.json') - uri.lastIndexOf('/') - 1
                    );
                    // r.log(`subj: ${subj}`);
                    var values = data[uri];
                    
                    var names = Object.keys(values);
                    names.forEach(name => {
                        if(!rlt[name]) rlt[name] = {};
                        rlt[name][subj] = values[name];
                    });
                });
                r.headersOut['Content-Type'] = 'application/json';
                r.return(200, JSON.stringify(rlt));
            }
        }

        // r.log(`subjects: ${subjs}`);
        subjs.forEach(s => {
            // r.log(`subject: ${s}`);
            r.subrequest(`/subjects/${s}.json`, done);
        });
        
        // r.return(200, JSON.stringify(subjs));
        
    });

}
