function method_up(s) {
    var proxy_proto_header = '';
    var req = '';

    s.on('upload', function(data, flags) {
        var n;

	  req += data;
	  n = req.search('\n');

	  // Forward past PROXY Protocol header if present
	  if (n != -1 && req.startsWith('PROXY ')) {
		  proxy_proto_header = req.substr(0, n+1);
		  req = req.substr(n+1); 
		  n = req.search('\n');
	  }
	  if (n != -1) {
		  req = req.replace(/^(get)(\s\S+\sHTTP\/\d\.\d)/, function(m,method,uri_version) {
			  return method.toUpperCase() + uri_version;
		  });
		  s.send(proxy_proto_header + req, flags);
		  s.off('upload');
	   }
     });
}