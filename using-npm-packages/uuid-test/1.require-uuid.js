global.crypto = require('crypto');

// # https://github.com/uuidjs/uuid#getrandomvalues-not-supported
// # npm install --save react-native-get-random-values
// # npx pod-install # https://www.npmjs.com/package/pod-install?activeTab=readme

// 2021/06/02 03:30:41 [error] 31#31: *1 js exception: Error: crypto.getRandomValues() not supported. \
//          See https://github.com/uuidjs/uuid#getrandomvalues-not-supported
//     at rng (njs_bundle.js:394)
//     at v4 (njs_bundle.js:768)
//     at native (native)
//     at test (njs_bundle.js:848)
// , client: 172.17.0.1, server: , request: "GET / HTTP/1.1", host: "localhost:8080"
// 172.17.0.1 - - [02/Jun/2021:03:30:41 +0000] "GET / HTTP/1.1" 500 178 "-" "curl/7.54.0"

/*
https://github.com/kumavis/polyfill-crypto.getrandomvalues/blob/master/index.js

// var MersenneTwister = require('mersenne-twister')

// var twister = new MersenneTwister(Math.random()*Number.MAX_SAFE_INTEGER)

// module.exports = getRandomValues


// function getRandomValues (abv) {
//   var l = abv.length
//   while (l--) {
//     abv[l] = Math.floor(randomFloat() * 256)
//   }
//   return abv
// }

// function randomFloat() {
//   return twister.random()
// }
*/

global.crypto.getRandomValues = function(typeArray) {
    var i;
    for (i=0; i<typeArray.length; i++) {
        typeArray[i] = Math.floor(Math.random() * 256);
        // typeArray[i] = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    }
    ngx.log(ngx.ERR, `${typeArray}`);
    return typeArray;
}

global.uuid = require('uuid');