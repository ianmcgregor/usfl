'use strict';

require('./lib/console-patch.js');
//require('./lib/legacy/raf-polyfill.js');

var Lib = {};

Lib.ArrayUtils = require('./lib/array-utils.js');
Lib.AssetLoader = require('./lib/asset-loader.js');
Lib.AudioManager = require('./lib/audio-manager.js');
//Lib.CssUtils = require('./lib/legacy/css-utils.js'); // for IE 9, Android 2
Lib.Device = require('./lib/device.js');
//Lib.EventUtils = require('./lib/legacy/event-utils.js'); // for IE 8
//Lib.FacebookUtils = require('./lib/facebook-utils.js');
//Lib.Facebook = require('./lib/facebook.js');
//Lib.Flash = require('./lib/flash.js');
Lib.FPS = require('./lib/fps.js');
Lib.Fullscreen = require('./lib/fullscreen.js');
Lib.HTMLAudio = require('./lib/html-audio.js');
Lib.InputCoords = require('./lib/input-coords.js');
Lib.Keyboard = require('./lib/keyboard.js');
Lib.LinkedList = require('./lib/linked-list.js');
Lib.MathUtils = require('./lib/math-utils.js');
Lib.ObjectPool = require('./lib/object-pool.js');
Lib.PageVisibility = require('./lib/page-visibility.js');
Lib.popup = require('./lib/popup.js');
Lib.ready = require('./lib/ready.js');
Lib.resize = require('./lib/resize.js');
Lib.Share = require('./lib/share.js');
Lib.StorageUtils = require('./lib/storage-utils.js');
Lib.StringUtils = require('./lib/string-utils.js');
Lib.UrlParams = require('./lib/url-params.js');
Lib.VideoObject = require('./lib/video-object.js');
Lib.Viewport = require('./lib/viewport.js');
Lib.WebAudio = require('./lib/web-audio.js');

if (typeof module === 'object' && module.exports) {
    module.exports = Lib;
} else if(typeof define === 'function' && define.amd) {
    define(function () { return Lib; });
} else {
	window.Lib = Lib;
}
