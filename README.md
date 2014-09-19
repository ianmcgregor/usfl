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

[usfl.device](docs/README.md#device)

[usfl.fullscreen](docs/README.md#fullscreen)

[usfl.keyboard](docs/README.md#keyboard)

[usfl.math](docs/README.md#math)

[usfl.share](docs/README.md#share)

[usfl.storage](docs/README.md#storage)

[usfl.string](docs/README.md#string)

[usfl.track](docs/README.md#track)

[usfl.urlParams](docs/README.md#urlparams)

[usfl.visibility](docs/README.md#visibility)


#### Constructors

[usfl.AssetLoader](docs/README.md#assetloader)

[usfl.Boid](docs/README.md#boid)

[usfl.FPS](docs/README.md#fps)

[usfl.Graphics](docs/README.md#graphics)

[usfl.InputCoords](docs/README.md#inputcoords)

[usfl.KeyInput](docs/README.md#keyinput)

[usfl.LinkedList](docs/README.md#linkedlist)

[usfl.ObjectPool](docs/README.md#objectpool)

[usfl.Vec2](docs/README.md#vec2)

[usfl.VideoObject](docs/README.md#videoobject)

[usfl.Viewport](docs/README.md#viewport)


#### Functions

[usfl.popup](docs/README.md#popup)

[usfl.ready](docs/README.md#ready)

[usfl.resize](docs/README.md#resize)

[lib/raf-polyfill.js](docs/README.md#raf-polyfill) for iOS6 (prefix), ie9, iOS5, Android < 4.4


### Not included in bundle

[lib/facebook.js](docs/README.md#facebook) Login/Graph API wrapper

[lib/flash.js](docs/README.md#flash) Flash SWF wrapper

[lib/modern.js](docs/README.md#modern) Detect modern browser via feature detection


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
