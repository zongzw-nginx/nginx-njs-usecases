function subrequest(r) {

   var uri = "/backend"+r.uri ;
   var header = r.headersIn.foo ;
   r.warn(uri);
   r.warn(header);

   r.subrequest('/subrequest/test.html', { method: 'POST', body: header })
   .then(reply => JSON.parse(reply.responseBody))
   .then(response => {
       if (!response['token']) {
           throw new Error("token is not available");
       }
       return response['token'];
   })
  .then(token => {
      r.subrequest(uri)
      .then(reply => r.return(reply.status, "token exists~~~~ "+reply.responseBody));
  })
  .catch(e => r.return(500, e));
}

export default {subrequest};
