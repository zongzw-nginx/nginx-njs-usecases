function response(r) {
    var n = 0;
    function done(res) {

        r.log(`res.parent: ${res.parent.uri}, res.uri: ${res.uri}`);
        if (++n == 1) {
            r.return(200, res.responseBody);
        }
    }

    r.subrequest('/r1', done);
    r.subrequest('/r2', done);
}

function response1(r) {
    r.return(200, 'response 1');
}

function response2(r) {
    r.return(200, 'response 2');
}

export default {
    response,
    response1,
    response2
};

// nginx: [emerg] SyntaxError: Non-default export is not supported in response.js
// export {response1};