'use strict';

require('./lib/legacy/console-patch.js'); // ie8
require('./lib/raf-polyfill.js'); // iOS6 (prefix), ie9, iOS5, Android < 4.4

var usfl = {};

/*
 * instance
 */

usfl.array = require('./lib/array-utils.js');
usfl.css = require('./lib/legacy/css-utils.js'); // for ie9, Android 2
usfl.device = require('./lib/device.js');
usfl.event = require('./lib/legacy/event-utils.js'); // for ie8
usfl.fullscreen = require('./lib/fullscreen.js');
usfl.keyboard = require('./lib/keyboard.js');
usfl.math = require('./lib/math-utils.js');
usfl.share = require('./lib/share.js');
usfl.storage = require('./lib/storage-utils.js');
usfl.string = require('./lib/string-utils.js');
usfl.urlParams = require('./lib/url-params.js');
usfl.visibility = require('./lib/visibility.js');

/*
 * constructor
 */

usfl.AssetLoader = require('./lib/asset-loader.js');
usfl.AudioManager = require('./lib/audio-manager.js');
usfl.Boid = require('./lib/boid.js');
//usfl.Facebook = require('./lib/facebook.js');
//usfl.Flash = require('./lib/flash.js');
usfl.FPS = require('./lib/fps.js');
usfl.Graphics = require('./lib/graphics.js');
usfl.HTMLAudio = require('./lib/html-audio.js');
usfl.InputCoords = require('./lib/input-coords.js'); // should be instance?
usfl.KeyInput = require('./lib/key-input.js');
usfl.LinkedList = require('./lib/linked-list.js');
usfl.ObjectPool = require('./lib/object-pool.js');
usfl.StateMachine = require('./lib/state-machine.js');
usfl.Vec2 = require('./lib/vec2.js');
usfl.VideoObject = require('./lib/video-object.js');
usfl.Viewport = require('./lib/viewport.js');
usfl.WebAudio = require('./lib/web-audio.js');

/*
 * function
 */

usfl.popup = require('./lib/popup.js');
usfl.ready = require('./lib/ready.js');
usfl.resize = require('./lib/resize.js');

module.exports = usfl;
