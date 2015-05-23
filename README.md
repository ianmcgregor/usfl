# usfl

[![NPM version](https://badge.fury.io/js/usfl.svg)](http://badge.fury.io/js/usfl) [![Bower version](https://badge.fury.io/bo/usfl.svg)](http://badge.fury.io/bo/usfl) [![Build Status](https://secure.travis-ci.org/ianmcgregor/usfl.png)](https://travis-ci.org/ianmcgregor/usfl)

A collection of tested, reusable JS utilities and snippets.

### Installation

* npm: ```npm install usfl --save-dev```
* bower: ```bower install usfl --save-dev```

### Usage

Use individual modules or the bundles `index.js`, `dist/usfl.js` or `dist/usfl.min.js`.

```javascript
// individual module
var device = require('usfl/device');

// entire bundle
var usfl = require('usfl');
var device = usfl.device;
```

### Api

[usfl/array](docs/README.md#array)

[usfl/AssetLoader](docs/README.md#assetloader)

[usfl/device](docs/README.md#device)

[usfl/Emitter](docs/README.md#emitter)

[usfl/Facebook](docs/README.md#facebook)

[usfl/Flash](docs/README.md#flash)

[usfl/Fps](docs/README.md#fps)

[usfl/fullscreen](docs/README.md#fullscreen)

[usfl/Graphics](docs/README.md#graphics)

[usfl/InputCoords](docs/README.md#inputcoords)

[usfl/keyboard](docs/README.md#keyboard)

[usfl/KeyInput](docs/README.md#keyinput)

[usfl/LinkedList](docs/README.md#linkedlist)

[usfl/math](docs/README.md#math)

[usfl/modern](docs/README.md#modern)

[usfl/MouseWheel](docs/README.md#mousewheel)

[usfl/ObjectPool](docs/README.md#objectpool)

[usfl/platform](docs/README.md#platform)

[usfl/popup](docs/README.md#popup)

[usfl/ready](docs/README.md#ready)

[usfl/resize](docs/README.md#resize)

[usfl/share](docs/README.md#share)

[usfl/storage](docs/README.md#storage)

[usfl/string](docs/README.md#string)

[usfl/track](docs/README.md#track)

[usfl/urlParams](docs/README.md#urlparams)

[usfl/VideoPlayer](docs/README.md#videoplayer)

[usfl/Viewport](docs/README.md#viewport)

[usfl/visibility](docs/README.md#visibility)

### polyfills

[usfl/polyfill-classList](docs/README.md#polyfills)

[usfl/polyfill-console](docs/README.md#polyfills)

[usfl/polyfill-raf](docs/README.md#polyfills)


### Dev setup

To install dependencies:

```
$ npm install
$ bower install
```

To run tests:

```
$ npm install -g karma-cli
$ karma start
```
