# usfl

[![Build Status](https://secure.travis-ci.org/ianmcgregor/usfl.png)](https://travis-ci.org/ianmcgregor/usfl)

A collection of tested, reusable JS utilities and snippets.

### Installation

* npm: ```npm install usfl --save-dev```
* bower: ```bower install usfl --save```

### Usage

Use individual modules from `src/lib/` or the bundles `dist/usfl.js` or `dist/usfl.min.js`.

To create your own custom bundle, edit `src/usfl.js` and run `gulp js-bundle-release`.

### Api

#### Instances

[usfl.array](docs/README.md#array)

[usfl.css](docs/README.md#css) (for ie9, Android 2)

[usfl.device](docs/README.md#device)

[usfl.event](docs/README.md#event) (for ie8)

[usfl.fullscreen](docs/README.md#fullscreen)

[usfl.keyboard](docs/README.md#keyboard)

[usfl.math](docs/README.md#math)

[usfl.visibility](docs/README.md#visibility)

[usfl.share](docs/README.md#share)

[usfl.storage](docs/README.md#storage)

[usfl.string](docs/README.md#string)

[usfl.urlParams](docs/README.md#urlparams)


#### Constructors

[usfl.AssetLoader](docs/README.md#assetloader)

[usfl.AudioManager](docs/README.md#audiomanager)

[usfl.Boid](docs/README.md#boid)

[usfl.FPS](docs/README.md#fps)

[usfl.Graphics](docs/README.md#graphics)

[usfl.HTMLAudio](docs/README.md#htmlaudio)

[usfl.InputCoords](docs/README.md#inputcoords)

[usfl.LinkedList](docs/README.md#linkedlist)

[usfl.ObjectPool](docs/README.md#objectpool)

[usfl.Vec2](docs/README.md#vec2)

[usfl.VideoObject](docs/README.md#videoobject)

[usfl.Viewport](docs/README.md#viewport)

[usfl.WebAudio](docs/README.md#webaudio)


#### Functions

[usfl.popup](docs/README.md#popup)

[usfl.ready](docs/README.md#ready)

[usfl.resize](docs/README.md#resize)

[lib/legacy/console-patch.js](docs/README.md#console-patch) for IE 8

[lib/raf-polyfill.js](docs/README.md#raf-polyfill) for iOS6 (prefix), ie9, iOS5, Android < 4.4


### Not included in bundle

[lib/facebook.js](docs/README.md#facebook) Login/Graph API wrapper

[lib/flash.js](docs/README.md#flash) Flash SWF wrapper

[lib/modern.js](docs/README.md#modern) Detect modern browser via feature detection

[lib/stub-objects.js](docs/README.md#stub-objects) Reference

[lib/track.js](docs/README.md#track) Google Anaytics wrapper

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
