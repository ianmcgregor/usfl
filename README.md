# js-lib

A collection of tested, reuasable JS modules and snippets.

### Setup:

To install dependencies:

```
$ npm install
$ bower install
```

To run tests:

```
$ npm install -g karma
$ npm install
$ karma start
```

### Usage:

Use individual modules from `src/lib/` or the bundle `dist/lib.js`.

To create your own custom bundle, edit `src/index.js` and run `gulp js-bundle-release`.

### Contents:

* array-utils
* asset-loader (batch loads images, audio and json files)
* audio-manager (detect support and fallback from WebAudio to Audio tag)
* console-patch (for old IE)
* css-utils (for old IE)
* device (userAgent things for when Modernizr isn't enough)
* event-utils (for old IE)
* facebook-utils
* facebook
* flash (wrapper for flash swfs)
* fps
* fullscreen
* html-audio (wrapper for Audio tag)
* input-coords (keeps track of user input position)
* keyboard (constants for keyCodes)
* linked-list
* math-utils
* modern (detect features that define a 'modern' browser in context of the specific project)
* object-pool (reuse objects for performance)
* page-visibility
* popup
* raf-polyfill (for requestAnimationFrame)
* ready (simple 'document.ready' replacement)
* resize (util for proportional resizing)
* share (various social media share options)
* storage-utils (local storage wrapper, including image to dataUrl)
* string-utils
* stub-objects (just for reference)
* track (Google Analytics wrapper)
* url-params (query string parameters to object)
* video-object (wrapper for HTML Video tag)
* viewport (manager for browser viewport)
* web-audio (wrapper for WebAudio API)
