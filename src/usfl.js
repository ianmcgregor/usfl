'use strict';

require('./lib/console-patch.js');
//require('./lib/legacy/raf-polyfill.js');

var usfl = {};

usfl.ArrayUtils = require('./lib/array-utils.js');
usfl.AssetLoader = require('./lib/asset-loader.js');
usfl.AudioManager = require('./lib/audio-manager.js');
//usfl.CssUtils = require('./lib/legacy/css-utils.js'); // for IE 9, Android 2
usfl.Device = require('./lib/device.js');
//usfl.EventUtils = require('./lib/legacy/event-utils.js'); // for IE 8
//usfl.FacebookUtils = require('./lib/facebook-utils.js');
//usfl.Facebook = require('./lib/facebook.js');
//usfl.Flash = require('./lib/flash.js');
usfl.FPS = require('./lib/fps.js');
usfl.Fullscreen = require('./lib/fullscreen.js');
usfl.HTMLAudio = require('./lib/html-audio.js');
usfl.InputCoords = require('./lib/input-coords.js');
usfl.Keyboard = require('./lib/keyboard.js');
usfl.LinkedList = require('./lib/linked-list.js');
usfl.MathUtils = require('./lib/math-utils.js');
usfl.ObjectPool = require('./lib/object-pool.js');
usfl.PageVisibility = require('./lib/page-visibility.js');
usfl.popup = require('./lib/popup.js');
usfl.ready = require('./lib/ready.js');
usfl.resize = require('./lib/resize.js');
usfl.Share = require('./lib/share.js');
usfl.StorageUtils = require('./lib/storage-utils.js');
usfl.StringUtils = require('./lib/string-utils.js');
usfl.UrlParams = require('./lib/url-params.js');
usfl.VideoObject = require('./lib/video-object.js');
usfl.Viewport = require('./lib/viewport.js');
usfl.WebAudio = require('./lib/web-audio.js');

module.exports = usfl;
