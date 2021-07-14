## os-browserify-test

This is an example of using npm package within njs. The npm package we demonstrate is `os`.

`os` package is a package very specific to platforms.

All the steps for demo have be indexed in order.

Run each `*.sh` to go forward step by step.

* `0.install_os-browserify.sh`:

  Install npm package `os-browserify`, learn more about `browserify` from:

  * https://browserify.org/
  * https://www.npmjs.com/package/browserify
  * https://www.npmjs.com/search?q=browserify

  `os-browserify` reimplement all functions/APIs related to platforms.

* `2.browserify.sh`:

  Use browserify to bundle referred modules into js bundle.

* `5.gen-njs-bundle.sh`:

  Combine njs code and browserified bundle as the final js output.

* `9.compose.sh/9.uncompose.sh`

  Run nginx container for njs verification. Run them outside the node container.

Final effect of this demo:

```
$ curl localhost:8902
uuidv4: 507e9494-8499-4860-b98f-027042cc9a93
$ curl localhost:8902
uuidv4: 2a454820-e1c7-493a-a6bc-840b26b23cad
```
