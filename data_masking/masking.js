function fnv32a(str) {
    var hval = 2166136261;
    for (var i = 0; i < str.length; ++i ) {
      hval ^= str.charCodeAt(i);
      hval += (hval << 1) + (hval << 4) + (hval << 7) 
                + (hval << 8) + (hval << 24);
    }
    return hval >>> 0;
  }
  
  function i2ipv4(i) {
      var octet1 = (i >> 24) & 255;
      var octet2 = (i >> 16) & 255;
      var octet3 = (i >> 8) & 255;
      var octet4 = i & 255;
      return octet1 + "." + octet2 + "." + octet3 + "." + octet4;
  }
  
  function maskRemoteAddress(req) {
      return i2ipv4(fnv32a(req.remoteAddress));
  }

  function maskRequestURI(req) {
    var query_string = req.variables.query_string;
    if (query_string.length) {                     // Proceed if we have query string
        var kvpairs = query_string.split('&');     // Convert to array of key=value
        for (var i = 0; i < kvpairs.length; i++) { // Iterate through each KV pair
            var kvpair = kvpairs[i].split('=');    // Split KV pair into new array
            if (kvpair[0] == "zip") {              // Mask zip
                 // Use first 5 digits of masked value
                kvpairs[i] = kvpair[0] + "=" + fnv32a(kvpair[1]).toString().substr(5);
            } else if (kvpair[0] == "email") {     // Mask email
                // Use hash as prefix for a single domain
                kvpairs[i] = kvpair[0] + "=" + fnv32a(kvpair[1]) + "@example.com";
            }
        }
        return req.uri + "?" + kvpairs.join('&');  // Construct masked URI
    }
    return req.uri; // No query string, return URI
}
