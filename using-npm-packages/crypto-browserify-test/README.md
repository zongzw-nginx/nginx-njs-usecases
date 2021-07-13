## crypto-browserify-test

This is an example of using npm package within njs. The npm package we demonstrate is `crypto`.

*NJS has built in `crypto` package: http://nginx.org/en/docs/njs/reference.html#crypto. However, we do use npm `crypto` package instead for demo.*

All the steps for demo have be indexed in order.

Run each `*.sh` to go forward step by step.

* `0.install_crypto-browserify.sh`:

  Install npm package `crypto-browserify`, learn more about `browserify` from:

  * https://browserify.org/
  * https://www.npmjs.com/package/browserify
  * https://www.npmjs.com/search?q=browserify

* `2.browserify.sh`:

  Use browserify to bundle referred modules into js bundle.

* `5.gen-njs-bundle.sh`:

  Combine njs code and browserified bundle as the final js output.

* `9.compose.sh/9.uncompose.sh`

  Run nginx container for njs verification. Run them outside the node container.

Final effect of this demo:

```
$ curl localhost:8900?raw=23423
hello njs: 1f060b0bd9e1adfaf2d4d57cae9bf7b6cdb73a3a

$ curl localhost:8900?raw=23423452452
hello njs: cd5b919827e9573f1999b7e0b4212d970dac25ff
```
