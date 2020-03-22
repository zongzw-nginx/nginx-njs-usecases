function bookinfo(r) {

    function contentOf(subject) {
        var path = getFilePath(subject)
        if (!path) {
            var rlt = `No subject '${subject}' found.`;
            r.error(rlt);
            return undefined;
        }

        // .then not works..
        // var fsPromise = require('fs').promises;
        // return fsPromise.readFile(path, 'utf8').then(

        var fs = require('fs');
        var data = fs.readFileSync(path, 'utf8');
    
        try {
            var jd = JSON.parse(data);
            return jd;
        } catch (error) {
            r.error(`Read content of ${path} failed.`);
            r.return(500, `Read content of ${path} failed.`);
            return;
        }
    }

    function getFilePath(subject) {
        var fs = require('fs');
        var path = `/root/nginx/conf/data/${subject}.json`;

        try {
            fs.accessSync(path, fs.constants.R_OK);
            return path;
        } catch (error) {
            r.error(`Failed to access ${path}: ${error.message}`);
            r.return(500, `Failed to access ${path}: ${error.message}`);
            return;
        }
    }

    function contentTo(subject, name, content) {
        var jd = contentOf(subject);
        jd[name] = content;

        var fs = require('fs');

        var path = getFilePath(subject);
        fs.writeFileSync(path, JSON.stringify(jd), 'utf8');
        r.log(`written to file ${subject}`);
    }

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

    function get(res) {
        var subjects = getSubjects(res);
        var rlt = {};
        
        for (var i in subjects) {
            var s = subjects[i];
            var c = contentOf(s);
            if (!c) {
                r.return(500, `cannot get details of ${s}.`);
                return;
            }
            // the Object.entries returns: 
            //  k, v: |nginx_cookbook,Complete-NGINX-Cookbook-2019|4|
            // Object.entries(c).forEach( 

            var keys = Object.keys(c);
            for (var e in keys) {
                var k = keys[e];
                if (!rlt[k]) rlt[k] = {};
                rlt[k][s] = c[k];
            }

        }
        r.headersOut['Content-Type'] = 'application/json';
        
        r.return(200, JSON.stringify(rlt));
        return;
    }

    function post(res) {
        var subjects = getSubjects(res);

        try {
            var jd = JSON.parse(r.requestBody);
        } catch (error) {
            r.error(`Failed to parse request body: ${r.requestBody}: ${error.message}`);
            r.return(400, error.message);
            return;
        }
        var name_keys = Object.keys(jd);
        for(var i in name_keys) {
            var name_key = name_keys[i];
            var bk = jd[name_key];
            var bk_keys = Object.keys(bk);
            for (var j in bk_keys) {
                var bk_key = bk_keys[j];
                if (subjects.indexOf(bk_key) == -1) {
                    r.return(400, `${bk_key} not supported: ${JSON.stringify(subjects)}`);
                    return;
                }
                contentTo(bk_key, name_key, bk[bk_key]);
            }
        }
        r.return(201, r.requestBody);
        return;
    }

    // The subrequest is a asynchronizing function.
    // That means logic after r.subrequest may be execuated 
    // BEFORE r.subrequest finishes.
    if (r.method == 'GET')
        r.subrequest('/subjects/', get);
    else if(r.method == 'POST')
        r.subrequest('/subjects/', post);
}
