async function greb(r) {
    if (!r.headersIn['Authorization']) {
        r.return(400, '{"error": "missing Authorization header."}')
        return
    }
    let headers = {
        Authorization: r.headersIn['Authorization'], 
        'Content-Type': 'application/json'
    }
    let options = {
        headers: headers, 
        method: 'GET',
        // verify: false
    }
    let url = `https://${r.args['host']}${r.args['uri']}`
    let queries = []
    if (r.args['partition']) {
        queries.push(`$filter=partition+eq+${r.args['partition']}`)
    }
    if (r.args['fields']) {
        queries.push(`$select=${r.args['fields']}`)
    }
    let query = queries.join('&')
    if (query != "" ) {
        url += `?${query}`
    }
    ngx.log(ngx.ERR, `url: ${url}`)
    ngx.log(ngx.ERR, `headers: ${JSON.stringify(headers)}`)
    await ngx.fetch(url, options).then(
            async reply => {
                try {
                    let body = await reply.json()
                    r.return(200, JSON.stringify(body, null, 2))
                } catch (error) {
                    r.return(400, error.toString())
                }
                
            }
        )
}

function debug(r) {
    let resp = {
        queries: r.args,
        headerIns: r.headersIn,
        version: r.httpVersion,
        method: r.method,
        remoteAddress: r.remoteAddress,
        requestBody: r.requestText
    }
    r.return(200, JSON.stringify(resp))
}
export default {greb, debug};