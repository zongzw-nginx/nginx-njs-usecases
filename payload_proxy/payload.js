function payload(r) {
    try {
        r.log(`request method: ${r.method}, body: ${r.variables.request_body}`);
        var jd = JSON.parse(r.requestBody);
        if (!jd.id) {
            r.return(415, `Invalid payload: missing id`);
            return;
        }
    } catch (error) {
        r.return(415, "Cannot parse payload into JSON.");
        return;
    }
    
    var bkId = jd.id % r.variables.backend_number + 1;
    r.subrequest(
        `/id${bkId}`, {method: 'GET'}, 
        function (res) {
            r.return(res.status, res.responseBody);
        }
);
}
