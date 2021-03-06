# Using node modules with njs

"Often, a developer wants to use 3rd-party code, usually available as a library of some kind." (http://nginx.org/en/docs/njs/node_modules.html)

In this repo folder, We want to show how to use npm packages:

* crypto

  Just a demonstration of npm package usage here, because njs has already crypto as a buitin library: http://nginx.org/en/docs/njs/reference.html#crypto)
* os

  os package provides the APIs to get platform-specific information: https://nodejs.org/api/os.html, but in nginx/njs environemnt, this may act differently.

* protobuf

  The official example from http://nginx.org/en/docs for using protobuf: http://nginx.org/en/docs/njs/node_modules.html#protobuf

* uuid

  An example of using npm package uuid to get uuidv4 string.

## Docker based demonstration

The different usecases are using the common demonstration environment - docker-based.

See `docker-compose.yml` here, it starts a nodejs container `browserify_test`.

Most of the `*.sh` under subfolders should be run within that container.

To start the demonstration environment: 

1. Run `./compose.yml`
2. Go into the container: `docker exec -it browserify_test sh`
3. Navigate to /root/test folder.
4. cd the subfolder, such as: `cd crypto-browserify-test`
5. Run scripts `*.sh`, see the following section.

## Read from example folders

Each example is placed under a separate folder. Here, let take crypto as the example.

It is under `crypto-browserify-test` folder. 

In this folder, we can see steps are marked with the `<num>` prefix. The step files are either `.sh` or `.js` or '.conf'. They are the sources or shell scripts for going forward.

Let's still take `crypto-browserify-test` as the example:

* `0.install-crypto-browserify.sh`

  Install `crypto-browserify`, we need to install `crypto-browserify` because:

    https://github.com/browserify/browserify#compatibility

    Many npm modules that don't do IO will just work after being browserified. Others take more work.
    
    Many node built-in modules have been wrapped to work in the browser, but only when you explicitly require() or use their functionality.
    
    When you require() any of these modules, you will get **a browser-specific shim**.

  **A browser-specific shim** is: https://github.com/browserify/browserify/issues/1599

    `require` in browserify is meant to replicate `require` in node as closely as possible

    When you require `http`, `crypto`, `process`, `fs` or any of the other node core modules in node you'll get a dependency that would never work properly (or at all) in the browser.

    So in browserify, these dependencies get replaced with "browser-specific" shims that will actually work in your browser.

    For example: When you `require('http')` in the browser, you get this http shim(https://github.com/jhiesey/stream-http)

    If you `require('http')` in node, you get the core http module(https://nodejs.org/api/http.html) which isn't suited for a browser.

* `1.require-global.js`

  This is a simle js to set a global reference to `require('crypto')`.

  When we `require('crypto')`, it refers to `crypto` package provided by `crypto-browserify` we just installed in last step.

* `2.browserify.sh`

  Run `browserify` command to generate `3.bundle.js`. Thus we get a long .js file contains crypto package's reimplementation.

  `browserify`, like `webpack`, is a package bundler, to bundle all set of functions/variables into a single file for using i.e., in browser environment.

* `3.bundle.js`

  A generated file(not included in gitrepo file list).

* `4.njs-code.js`

  This is our main logic, telling njs how to reply the request, `r` is the request object containing many useful information.

  The implementation is pretty simple, just for demonstration:

  In the code, we use `global.cryptoa` which we created and referenced in `1.require-global.js` instead of `require('crypto')` -- the builtin njs package.

* `5.gen-njs-bundle.sh`

  A short generating script for combining `3.bundle.js` and `4.njs-code.js`.

* `6.njs-bundle.js`

  A manually generated file(not included in gitrepo file list).

  This file is generated through copying contents of both `3.bundle.js` and `4.njs-code.js` into one single file, Thus we get the njs competible file.

* `7.nginx.conf`

  The simple nginx configuration file. In this file we can see the common steps of using njs:
  
  1. `load_module modules/ngx_http_js_module.so;`
  2. `js_import njs_bundle.js;`
  3. `js_content njs_bundle.test;`

* `8.docker-compose.yml/9.compose.sh/9.uncompose.sh`

  Start/Stop nginx/njs within docker container, in the command, we use volumes to mount `6.njs-bundle.js` and `7.nginx.conf` into nginx container.

See actual effects in the subfolder.

---

Other folders are with similar layout and structures.