(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.usfl = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('./polyfill-classlist');
require('./polyfill-console');
require('./polyfill-raf');

var usfl = {};

usfl.array = require('./array');
usfl.AssetLoader = require('./AssetLoader');
usfl.CuepointsReader = require('./CuepointsReader');
usfl.device = require('./device');
usfl.Emitter = require('./Emitter');
usfl.Facebook = require('./Facebook');
usfl.Flash = require('./Flash');
usfl.FPS = require('./Fps');
usfl.fullscreen = require('./fullscreen');
usfl.Graphics = require('./Graphics');
usfl.InputCoords = require('./InputCoords');
usfl.keyboard = require('./keyboard');
usfl.KeyInput = require('./KeyInput');
usfl.LinkedList = require('./LinkedList');
usfl.math = require('./math');
usfl.modern = require('./modern');
usfl.MouseWheel = require('./MouseWheel');
usfl.ObjectPool = require('./ObjectPool');
usfl.platform = require('./platform');
usfl.popup = require('./popup');
usfl.ready = require('./ready');
usfl.resize = require('./resize');
usfl.share = require('./share');
usfl.storage = require('./storage');
usfl.string = require('./string');
usfl.track = require('./track');
usfl.urlParams = require('./urlParams');
usfl.VideoPlayer = require('./VideoPlayer');
usfl.Viewport = require('./viewport');
usfl.visibility = require('./visibility');

module.exports = usfl;

},{"./AssetLoader":2,"./CuepointsReader":3,"./Emitter":4,"./Facebook":5,"./Flash":6,"./Fps":7,"./Graphics":8,"./InputCoords":9,"./KeyInput":10,"./LinkedList":11,"./MouseWheel":12,"./ObjectPool":13,"./VideoPlayer":14,"./array":15,"./device":16,"./fullscreen":17,"./keyboard":18,"./math":19,"./modern":20,"./platform":22,"./polyfill-classlist":23,"./polyfill-console":24,"./polyfill-raf":25,"./popup":26,"./ready":27,"./resize":28,"./share":29,"./storage":30,"./string":31,"./track":32,"./urlParams":33,"./viewport":34,"./visibility":35}],2:[function(require,module,exports){
'use strict';

var Emitter = require('./Emitter');

var browserHasBlob = (function() {
  try {
    return !!new Blob();
  } catch (e) {
    return false;
  }
}());

/*
 * Group
 */

function AssetsLoader(config) {
  config = config || {};

  var crossOrigin = config.crossOrigin;
  var isTouchLocked = !!config.isTouchLocked;
  var blob = !!(config.blob && browserHasBlob);
  var webAudioContext = config.webAudioContext;

  var assetsLoader;
  var map = {};
  var files = [];
  var queue = [];
  var numLoaded = 0;
  var numTotal = 0;

  var add = function(options) {
    if (Array.isArray(options)) {
      options.forEach(function(item) {
        add(item);
      });
      return assetsLoader;
    }
    var loader = new AssetsLoader.Loader(configure(options));
    queue.push(loader);
    return assetsLoader;
  };

  var get = function(id) {
    return map[id];
  };

  var configure = function(options) {
    if (typeof options === 'string') {
      var url = options;
      options = {url: url};
    }

    if (options.isTouchLocked === undefined) { options.isTouchLocked = isTouchLocked; }
    if (options.blob === undefined) { options.blob = blob; }

    options.id = options.id || options.url;
    options.type = options.type || options.url.split('?')[0].split('.').pop().toLowerCase();
    options.crossOrigin = options.crossOrigin || crossOrigin;
    options.webAudioContext = options.webAudioContext || webAudioContext;

    return options;
  };

  var start = function() {
    numTotal = queue.length;

    queue.forEach(function(loader) {
      loader.on('progress', progressHandler);
      loader.once('complete', completeHandler);
      loader.once('error', errorHandler);
      loader.start();
    });

    return assetsLoader;
  };

  var progressHandler = function(progress) {
    var loaded = numLoaded + progress;
    assetsLoader.emit('progress', loaded / numTotal);
  };

  var completeHandler = function(key, file) {
    numLoaded++;
    assetsLoader.emit('progress', numLoaded / numTotal);
    map[key] = file;
    files.push(file);

    assetsLoader.emit('child', file);
    checkComplete();
  };

  var errorHandler = function(err) {
    numTotal--;
    if (assetsLoader.listeners('error').length) {
      assetsLoader.emit('error', err);
    } else {
      console.error(err);
    }
    checkComplete();
  };

  var checkComplete = function() {
    if (numLoaded >= numTotal) {
      assetsLoader.emit('complete', files, map);
    }
  };

  var destroy = function() {
    while (queue.length) {
      queue.pop().destroy();
    }
    assetsLoader.off('error');
    assetsLoader.off('progress');
    assetsLoader.off('complete');
    map = {};
    files = [];
    webAudioContext = null;
    numTotal = 0;
    numLoaded = 0;

    return assetsLoader;
  };

  assetsLoader = Object.create(Emitter.prototype, {
      _events: { value: {} },
      add: { value: add },
      start: { value: start },
      get: { value: get },
      destroy: { value: destroy }
  });

  if (Array.isArray(config.assets)) {
    add(config.assets);
  }

  return Object.freeze(assetsLoader);
}

/*
 * Loader
 */

AssetsLoader.Loader = function(options) {
  var id = options.id;
  var url = options.url;
  var type = options.type;
  var crossOrigin = options.crossOrigin;
  var isTouchLocked = options.isTouchLocked;
  var blob = options.blob && browserHasBlob;
  var webAudioContext = options.webAudioContext;

  var loader;
  var loadHandler;
  var request;
  var startTime;
  var timeout;

  var start = function() {
    startTime = Date.now();

    switch (type) {
      case 'json':
        loadJSON();
        break;
      case 'jpg':
      case 'png':
      case 'gif':
      case 'webp':
        loadImage();
        break;
      case 'mp3':
      case 'ogg':
      case 'opus':
      case 'wav':
      case 'm4a':
        loadAudio();
        break;
      case 'ogv':
      case 'mp4':
      case 'webm':
      case 'hls':
        loadVideo();
        break;
      case 'bin':
        loadXHR('arraybuffer');
        break;
      default:
        throw 'AssetsLoader ERROR: Unknown type for file with URL: ' + url + ' (' + type + ')';
    }
  };

  var dispatchComplete = function(file) {
    if (!file) { return; }
    loader.emit('progress', 1);
    loader.emit('complete', id, file);
    removeListeners();
  };

  var loadXHR = function(responseType, customLoadHandler) {
    loadHandler = customLoadHandler || completeHandler;

    request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = responseType;
    request.addEventListener('progress', progressHandler);
    request.addEventListener('load', loadHandler);
    request.addEventListener('error', errorHandler);
    request.send();
  };

  var progressHandler = function(event) {
    if (event.lengthComputable) {
      loader.emit('progress', event.loaded / event.total);
    }
  };

  var completeHandler = function() {
    if (success()) {
      dispatchComplete(request.response);
    }
  };

  var success = function() {
    if (request && request.status < 400) {
      AssetsLoader.stats.update(request, startTime, url);
      return true;
    }
    errorHandler(request && request.statusText);
    return false;
  };

  // json

  var loadJSON = function() {
    loadXHR('json', function() {
      if (success()) {
        var data = request.response;
        if (typeof data === 'string') {
          data = JSON.parse(data);
        }
        dispatchComplete(data);
      }
    });
  };

  // image

  var loadImage = function() {
    if (blob) {
      loadImageBlob();
    } else {
      loadImageElement();
    }
  };

  var loadImageElement = function() {
    request = new Image();
    if (crossOrigin) {
      request.crossOrigin = 'anonymous';
    }
    request.addEventListener('error', errorHandler, false);
    request.addEventListener('load', elementLoadHandler, false);
    request.src = url;
  };

  var elementLoadHandler = function() {
    window.clearTimeout(timeout);
    dispatchComplete(request);
  };

  var loadImageBlob = function() {
    loadXHR('blob', function() {
      if (success()) {
        var url = window.URL.createObjectURL(request.response);
        request = new Image();
        request.addEventListener('error', errorHandler, false);
        request.addEventListener('load', imageBlobHandler, false);
        request.src = url;
      }
    });
  };

  var imageBlobHandler = function() {
    window.URL.revokeObjectURL(url);
    dispatchComplete(request);
  };

  // audio

  var loadAudio = function(webAudioContext) {
    if (webAudioContext) {
      loadAudioBuffer();
    } else {
      loadMediaElement('audio');
    }
  };

  // video

  var loadVideo = function() {
    if (blob) {
      loadXHR('blob');
    } else {
      loadMediaElement('video');
    }
  };

  // audio buffer

  var loadAudioBuffer = function() {
    loadXHR('arraybuffer', function() {
      if (success()) {
        webAudioContext.decodeAudioData(
          request.response,
          function(buffer) {
            request = null;
            dispatchComplete(buffer);
          },
          function(e) {
            errorHandler(e);
          }
        );
      }
    });
  };

  // media element

  var loadMediaElement = function(tagName) {
    request = document.createElement(tagName);

    if (!isTouchLocked) {
      // timeout because sometimes canplaythrough doesn't fire
      window.clearTimeout(timeout);
      timeout = window.setTimeout(elementLoadHandler, 2000);
      request.addEventListener('canplaythrough', elementLoadHandler, false);
    }

    request.addEventListener('error', errorHandler, false);
    request.preload = 'auto';
    request.src = url;
    request.load();

    if (isTouchLocked) {
      dispatchComplete(request);
    }
  };

  // error

  var errorHandler = function(err) {
    window.clearTimeout(timeout);

    var message = err;

    if (request && request.tagName && request.error) {
      var ERROR_STATE = ['', 'ABORTED', 'NETWORK', 'DECODE', 'SRC_NOT_SUPPORTED'];
      message = 'MediaError: ' + ERROR_STATE[request.error.code] + ' ' + request.src;
    } else if (request && request.statusText) {
      message = request.statusText;
    } else if (err && err.message) {
      message = err.message;
    } else if (err && err.type) {
      message = err.type;
    }

    loader.emit('error', 'Error loading "' + url + '" ' + message);

    destroy();
  };

  // clean up

  var removeListeners = function() {
    loader.off('error');
    loader.off('progress');
    loader.off('complete');

    if (request) {
      request.removeEventListener('progress', progressHandler);
      request.removeEventListener('load', loadHandler);
      request.removeEventListener('error', errorHandler);
      request.removeEventListener('load', elementLoadHandler);
      request.removeEventListener('canplaythrough', elementLoadHandler);
      request.removeEventListener('load', imageBlobHandler);
    }
  };

  var destroy = function() {
    removeListeners();

    if (request && request.abort && request.readyState < 4) {
      request.abort();
    }

    request = null;
    webAudioContext = null;

    window.clearTimeout(timeout);
  };

  loader = Object.create(Emitter.prototype, {
      _events: { value: {} },
      start: { value: start },
      destroy: { value: destroy }
  });

  return Object.freeze(loader);
};

/*
 * Stats
 */

AssetsLoader.stats = {
  mbs: 0,
  secs: 0,
  update: function(request, startTime, url) {
    var length;
    var headers = request.getAllResponseHeaders();
    if (headers) {
      var match = headers.match(/content-length: (\d+)/i);
      if (match && match.length) {
        length = match[1];
      }
    }
    // var length = request.getResponseHeader('Content-Length');
    if (length) {
      length = parseInt(length, 10);
      var mbs = length / 1024 / 1024;
      var secs = (Date.now() - startTime) / 1000;
      this.secs += secs;
      this.mbs += mbs;
      this.log(url, mbs, secs);
    } else {
      console.warn.call(console, 'Can\'t get Content-Length:', url);
    }
  },
  log: function(url, mbs, secs) {
    console.log.call(console, url, mbs, secs);
    if (url) {
      var file = 'File loaded: ' +
                 url.substr(url.lastIndexOf('/') + 1) +
                 ' size:' + mbs.toFixed(2) + 'mb' +
                 ' time:' + secs.toFixed(2) + 's' +
                 ' speed:' + (mbs / secs).toFixed(2) + 'mbps';

      console.log.call(console, file);
    }
    var total = 'Total loaded: ' + this.mbs.toFixed(2) + 'mb' +
                ' time:' + this.secs.toFixed(2) + 's' +
                ' speed:' + this.getMbps().toFixed(2) + 'mbps';
    console.log.call(console, total);
  },
  getMbps: function() {
    return this.mbs / this.secs;
  }
};

module.exports = AssetsLoader;

},{"./Emitter":4}],3:[function(require,module,exports){
'use strict';

function CuepointsReader() {
  var cuepointsReader;
  var dispatch;
  var list = [];
  var currentPosition = 0;
  var lastPosition = -1;
  var tolerance = 0.2;

  var add = function(position, name, data) {
    list.push({
      position: position,
      name: name,
      data: data
    });

    list.sort(function(a, b) {
      return a.position - b.position;
    });

    return cuepointsReader;
  };

  var onCuepoint = function(fn, thisArg) {
    if (fn) {
      dispatch = thisArg ? fn.bind(thisArg) : fn;
    } else {
      dispatch = null;
    }
    return cuepointsReader;
  };

  var removeAll = function() {
    list.length = 0;
    return reset();
  };

  var reset = function() {
    currentPosition = 0;
    lastPosition = -1;
    return cuepointsReader;
  };

  var setTolerance = function(value) {
    tolerance = value;
    return cuepointsReader;
  };

  var update = function(position) {
    currentPosition = position;
    check(currentPosition, lastPosition);
    lastPosition = currentPosition;
    return cuepointsReader;
  };

  var check = function(currentPosition, lastPosition) {
    if (currentPosition <= lastPosition) { return; }
    if (typeof dispatch !== 'function') { return; }

    list.some(function(item) {
      if (inRange(item.position, currentPosition, lastPosition)) {
          dispatch(item);
          return true;
        }
    });
  };

  var inRange = function(cuepointPosition, currentPosition, lastPosition) {
    if (cuepointPosition > currentPosition) { return false; }
    if (cuepointPosition <= lastPosition) { return false; }

    var diff = cuepointPosition - currentPosition;
    if (diff < 0) { diff = -diff; }
    return diff <= tolerance;
  };

  cuepointsReader = Object.freeze({
    add: add,
    onCuepoint: onCuepoint,
    removeAll: removeAll,
    reset: reset,
    setTolerance: setTolerance,
    update: update
  });

  return cuepointsReader;
}

module.exports = CuepointsReader;

},{}],4:[function(require,module,exports){
'use strict';

var EventEmitter = require('events').EventEmitter;

function Emitter() {
    EventEmitter.call(this);
    this.setMaxListeners(20);
}

Emitter.prototype = Object.create(EventEmitter.prototype);
Emitter.prototype.constructor = Emitter;

Emitter.prototype.off = function(type, listener) {
    if (listener) {
        return this.removeListener(type, listener);
    }
    if (type) {
        return this.removeAllListeners(type);
    }
    return this.removeAllListeners();
};

module.exports = Emitter;

},{"events":21}],5:[function(require,module,exports){
'use strict';

var Emitter = require('./Emitter');

function Facebook(appId) {

    var loadScriptTimeout;

    // initialize FB app
    function init() {
        if (window.FB !== undefined) {
            /*FB.Event.subscribe('auth.statusChange', function(response) {
                console.log('auth.statusChange', response);
                if(response.status === 'connected') {
                }
            });*/
            FB.init({
                appId: appId,
                status: true,
                cookie: true,
                logging: true,
                xfbml: true
            });
            FB.getLoginStatus(function(response) {
                self.emit('init', response.status);
            });
            clearTimeout(loadScriptTimeout);
        } else {
            // called by FBs JS when finished loading
            window.fbAsyncInit = function() {
                init();
            };
        }
    }

    // login
    function login(callback, permissions) {
        FB.login(function() {
            callback();
        }, {
            'scope': (permissions || '')
        });
    }

    // check that user has granted required permissions and request if needed
    function checkPermissions(callback, permissions) {
        if (permissions === undefined || permissions === '') {
            callback();
        } else {
            FB.api('/me/permissions', function(response) {
                var hasPermission = true;
                var perms = permissions.split(',');
                for (var i = 0; i < perms.length; i++) {
                    hasPermission = !!response.data[0][perms[i]];
                    if (!hasPermission) {
                        break;
                    }
                }
                if (hasPermission) {
                    callback();
                } else {
                    login(callback, permissions);
                }
            });
        }
    }

    // check user login and permission status
    function checkAuth(callback, permissions) {
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                checkPermissions(callback, permissions);
            } else {
                login(callback, permissions);
            }
        });
    }

    function getInfo(permissions, fields) {
        checkAuth(function() {
            FB.api('/me', {
                'fields': fields
            }, function(response) {
                if (!response || response.error) {
                    console.error(response);
                    self.emit('info', null);
                } else {
                    self.emit('info', response);
                }
            });
        }, permissions);
    }

    // create FB container and load script
    function loadScript() {
        if (window.FB !== undefined) {
            return;
        }
        var fbroot = document.getElementById('fb-root');
        if (!fbroot) {
            fbroot = document.createElement('div');
            fbroot.setAttribute('id', 'fb-root');
            document.body.appendChild(fbroot);
        }
        var fb = document.createElement('script');
        fb.type = 'text/javascript';
        fb.async = true;
        fb.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
        fbroot.appendChild(fb);

        loadScriptTimeout = setTimeout(loadScript, 6000);
    }

    loadScript();

    // public
    var self = Object.create(Emitter.prototype, {
        _events: {
            value: {}
        },
        init: {
            value: init
        },
        login: {
            value: login
        },
        utils: {
            value: utils
        },
        getInfo: {
            value: getInfo
        }
    });

    return self;
}

var utils = {
    getProfileImageUrl: function(id, width, height) {
        return document.location.protocol + '//graph.facebook.com/' + id + '/picture?width=' + width + '&height=' + height;
    },
    resizeCanvas: function(height) {
        FB.Canvas.setSize({
            'height': height
        });
        setTimeout(function() {
            FB.Canvas.setSize({
                'height': height
            });
        }, 1000);
    },
    scrollToTop: function() {
        FB.Canvas.scrollTo(0, 0);
    },
    logout: function() {
        FB.Event.subscribe('auth.logout', function(response) {
            var success = response && !response.error;
            console.log('onFacebookLogoutComplete', success);
        });
        FB.logout();
    },
    getFriends: function(limit) {
        FB.api('/me/friends', {
            limit: limit
        }, function(response) {
            if (!response || response.error) {
                console.log('getFriends ERROR');
            } else {
                console.log(response.data);
            }
        });
    },
    sortFriendsByMutual: function(userData) {
        var friends = userData.friends.data.sort(function(a, b) {
            var x = a.mutualfriends ? a.mutualfriends.data.length : 0;
            var y = b.mutualfriends ? b.mutualfriends.data.length : 0;
            return y - x;
        });
        return friends;
    },
    /* publish status message to feed. requires publish_stream permission */
    statusPublish: function(message) {
        FB.api('/me/feed', 'post', {
            message: message
        }, function(response) {
            if (!response || response.error) {
                console.log('onFacebookStatusPublish ERROR');
            } else {
                console.log('onFacebookStatusPublish SUCCESS');
            }
        });
    },
    /* Send a message */
    sendDialog: function(_link, _name, _description, _picture, _to) {
        FB.ui({
                method: 'send',
                to: _to,
                name: _name,
                picture: _picture,
                link: _link,
                display: 'popup',
                description: _description
            },
            function(response) {
                console.log('facebook.sendDialog', response);
                if (response.success) {
                    console.log('onFacebookSendDialogComplete', true);
                } else {
                    console.log('onFacebookSendDialogComplete', false);
                }
            });
    },
    /* Publish action. requires publish_actions permission */
    /*publishAction: function(appId, namespace, action, target_id, repeaterUrl, object, url, image) {
        var objectParams = 'fb:app_id=' + appId + '&og:type=' + namespace + ':' + object + '&url' = url;
        var params = {
            'tags': target_id,
            'image[0][url]': image
        };
        params[object] = repeaterUrl + (repeaterUrl.indexOf('?') < 0 ? '?' : '&') + objectParams;

        FB.api('/me/' + namespace + ':' + action + '?' + $.param(params), 'post', function(response) {
            console.log(response);
            if (!response || response.error) {
                console.log( 'onFacebookPublishActionComplete', false );
            } else {
                console.log( 'onFacebookPublishActionComplete', true );
            }
        });
    },*/
    /* stream publish with confirmation and user input. rquires publish_stream permission */
    streamPublish: function(message, attachment, action_links, user_message_prompt, target_id) {
        var publish = {
            method: 'stream.publish',
            message: message,
            attachment: attachment,
            action_links: action_links,
            user_message_prompt: user_message_prompt,
            target_id: target_id
        };
        FB.ui(publish, function(response) {
            if (!response || response.error) {
                console.log('onFacebookStreamPublishComplete', false);
            } else {
                console.log('onFacebookStreamPublishComplete', true);
            }
        });
    },
    test_streamPublish: function() {
        var message = 'message';
        var attachment = {
            name: 'name',
            caption: 'caption',
            description: 'description',
            href: 'http://example.com/'
        };
        var action_links = [{
            text: 'action_link',
            href: 'http://example.com/'
        }];
        var user_message_prompt = 'user_message_prompt';
        this.streamPublish(message, attachment, action_links, user_message_prompt);
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = Facebook;
}

},{"./Emitter":4}],6:[function(require,module,exports){
'use strict';

var Emitter = require('./Emitter'),
    swfobject = window.swfobject;

function Flash(element, url, embedvars, flashvars) {

    this.emitter = new Emitter();
    this.elementId = element.getAttribute('id');
    this.flashId = 'flash-' + this.elementId;
    this.url = url;
    this.embedvars = embedvars || {};
    this.flashvars = flashvars || {};

    this.isReady = false;
    this.queuedCalls = [];
}

Flash.prototype = {
    /*
     * Embed main flash app
     */
    embed: function() {
        // Querystring vars
        this._getFlashvarsFromQueryString(this.flashvars);
        // Check path format
        this._formatPaths(this.flashvars);
        // check flash version
        var flashVersion = swfobject.getFlashPlayerVersion();
        var minVersionArr = ( this.embedvars.version || '10.2.0' ).split('.');
        var minMajor = parseInt(minVersionArr[0], 10);
        var minMinor = parseInt(minVersionArr[1], 10);

        var result;

        // Detect / Embed
        if (flashVersion.major === 0) {
            // No Flash
            //document.getElementById('flash-site').innerHTML = embedvars.noFlashHTML || '<div class="error"><h1>Error</h1><p><a href="http://get.adobe.com/flashplayer/" target="_blank">Flashplayer ' + (embedvars.version || '') + '</a> is required.</p></div>';
            result = -1;
        }
        else if(flashVersion.major < minMajor || (flashVersion.major === minMajor && flashVersion.minor < minMinor)) {
            // Update Flash
            //document.getElementById('flash-site').innerHTML = embedvars.updateFlashHTML || '<div class="error"><h1>Error</h1><p><a href="http://get.adobe.com/flashplayer/" target="_blank">Flashplayer ' + (embedvars.version || '') + '</a> is required.</p></div>';
            result = 0;
        }
        else {
            var params = {
                'menu': false,
                'quality': 'high',
                'bgcolor': (this.embedvars.bgColor || '#ffffff'),
                'allowFullScreen': true,
                'allowFullScreenInteractive': true,
                'allowScriptAccess': 'always',
                'wmode': (this.embedvars.wmode || undefined)
            };

            var attributes = {
                'id': this.flashId,
                'name': this.flashId
            };

            swfobject.embedSWF(this.url, this.elementId, (this.embedvars.width || '100%'), (this.embedvars.height || '100%'), (this.embedvars.version || '10.2.0'), this.flashvars.assetsPath + 'swf/expressInstall.swf', this.flashvars, params, attributes);

            result = 1;
        }

        this.emitter.emit('embed', result);
    },
    /*
     * Get ref to Flash object
     */
    getFlashObject: function() {
        return swfobject.getObjectById(this.flashId);
    },
    /*
     * Flash must call 'flash.ready' when loaded and ready to receive JS calls
     */
    ready: function() {
        if( this.isReady ) {
            return;
        }
        this.isReady = true;
        console.log('flash.ready called');
        this._applyQueuedCalls();
        this.emitter.emit('ready');
    },
    /*
     * Call methods in flash
     *
     * E.g.
     * flash.call( "onSomeJSActionComplete", response ); - calls the ExternalInterface call back 'onSomeJSActionComplete' in Flash
     * flash.call("onFlashDispatcher", "Hello", "World", {testObj:true}, false); - can send multiple arguments - max 4 at moment!
     *
     */
    call: function( functionName ) {
        try {
            console.log('flash.call: ', functionName, 'arguments:', (Array.prototype.slice.call(arguments).slice(1)));

            var flashObject = this.getFlashObject();
            console.log('flash ready:', this.isReady, flashObject);
            if(this.isReady && flashObject && flashObject[ functionName ]){
                // TODO: figure out how to do this in a clever way!
                if(arguments.length > 4){
                    return flashObject[ functionName ]( arguments[1], arguments[2], arguments[3], arguments[4] );
                } else if(arguments.length > 3){
                    return flashObject[ functionName ]( arguments[1], arguments[2], arguments[3] );
                } else if(arguments.length > 2){
                    return flashObject[ functionName ]( arguments[1], arguments[2] );
                } else if(arguments.length > 1){
                    return flashObject[ functionName ]( arguments[1] );
                } else {
                    return flashObject[ functionName ]();
                }
            }
            else {
                console.log('flash.queuedCalls.push:', arguments);
                this.queuedCalls.push(arguments);
            }
        } catch(error) {
            console.log('flash.call ERROR:', error);
        }
        return false;
    },
    /*
     * Any JS methods called before Flash loaded will be queued and called when this method is called.
     */
    _applyQueuedCalls: function() {
        console.log('flash._applyQueuedCalls', this.queuedCalls.length);
        var queuedCalls = this.queuedCalls;
        var l = queuedCalls.length;
        var i = 0;
        while(i < l) {
            this.call.apply(this, queuedCalls[i]);
            i++;
        }
        this.queuedCalls = [];
    },
    /*
     * Check Querystring for Flashvar values
     */
    _getFlashvarsFromQueryString: function(flashvars) {
        // Set Flashvars from Query String params
        function setFlashvarFromQueryString(param) {
            if (swfobject.getQueryParamValue(param)) {
                flashvars[param] = swfobject.getQueryParamValue(param);
                console.log('flash Set flashvar \'' + param + '\' to \'' + flashvars[param] + '\'');
            }
        }
        // QueryString params to overwrite default Flashvars
        function queryParamsToFlashvars(flashvars) {
            for(var param in flashvars) {
                if (flashvars.hasOwnProperty(param)) {
                    setFlashvarFromQueryString(param);
                }
            }
        }
        queryParamsToFlashvars(flashvars);
        // Look for locale and debug params if they haven't already been defined
        if(!flashvars.locale) {
            setFlashvarFromQueryString('locale');
        }
        if(!flashvars.debug) {
            setFlashvarFromQueryString('debug');
        }
        if(!flashvars.bw) {
            setFlashvarFromQueryString('bw');
        }
    },
    /*
     * Check paths for correct formatting
     */
    _formatPaths: function(flashvars) {
        // Make sure paths start with protocol and end with '/'
        function formatPath(input) {
            if(input && input.lastIndexOf('/') !== input.length - 1) {
                input = input + '/';
            }
            if(input && input.substr(0,2) === '//') {
                input = document.location.protocol + input;
            }
        }
        formatPath(flashvars.assetsPath);
        formatPath(flashvars.videoPath);
        formatPath(flashvars.audioPath);
        formatPath(flashvars.appPath);
    }

};

if (typeof module === 'object' && module.exports) {
    module.exports = Flash;
}

},{"./Emitter":4}],7:[function(require,module,exports){
'use strict';

function FPS(el) {

    var time = 0,
        fps = 0,
        currentFps = 0,
        averageFps = 0,
        ticks = 0,
        totalFps = 0,
        lastFps = 0,
        lastAverage = 0;

    if (!el) {
        el = document.createElement('div');
        el.setAttribute('id', 'fps');
        el.style.position = 'absolute';
        el.style.top = '0px';
        el.style.right = '0px';
        el.style.padding = '2px 6px';
        el.style.zIndex = '99999';
        el.style.background = '#000';
        el.style.color = '#fff';
        el.style.fontSize = '10px';
        document.body.appendChild(el);
    }

    function report() {
        if (currentFps === lastFps && averageFps === lastAverage) {
          return;
        }
        lastFps = currentFps;
        lastAverage = averageFps;
        el.innerHTML = 'FPS: ' + currentFps + '<br />AVE: ' + averageFps;
    }

    function update(now) {
        if (now === undefined) {
            now = Date.now();
        }

        if (time === 0) {
            time = now;
        }

        if (now - 1000 > time) {
            time = now;
            currentFps = fps;
            fps = 0;

            if (currentFps > 1) {
                ticks ++;
                totalFps += currentFps;
                averageFps = Math.floor(totalFps / ticks);
            }
            report();
        }

        fps++;
    }

    function autoUpdate() {
        window.requestAnimationFrame(autoUpdate);

        update();
    }

    return {
        'autoUpdate': autoUpdate,
        'update': update
    };
}

if (typeof module === 'object' && module.exports) {
    module.exports = FPS;
}

},{}],8:[function(require,module,exports){
'use strict';

function Graphics(canvas) {
    this.init(canvas);
}

Graphics.prototype = {
    init: function(canvas) {
        if (canvas) {
            this.canvas = canvas;
            this.size(this.canvas.width, this.canvas.height);
        } else if (document.querySelector('canvas')) {
            this.canvas = document.querySelector('canvas');
            this.size(this.canvas.width, this.canvas.height);
        } else {
            this.canvas = document.createElement('canvas');
            document.body.appendChild(this.canvas);
            this.size();
        }
        this.context = this.canvas.getContext('2d');

        this._textFont = 'Times';
        this._textSize = 12;
        this.context.font = this._textSize + 'px ' + this._textFont;
    },
    size: function(width, height) {
        this.width = this.canvas.width = width || window.innerWidth;
        this.height = this.canvas.height = height || window.innerHeight;
    },
    clear: function(color) {
        if (color) {
            this.context.fillStyle = color;
            this.context.fillRect(0, 0, this.width, this.height);
        } else {
            this.context.clearRect(0, 0, this.width, this.height);
        }
    },
    background: function(r, g, b) {
        this.clear('rgb(' + r + ', ' + b + ', ' + g + ')');
    },
    fill: function(r, g, b, a) {
        if (typeof r === 'string') {
            this.context.fillStyle = r;
            return;
        }
        a = a === undefined ? 1 : a;
        this.context.fillStyle = 'rgba(' + r + ', ' + b + ', ' + g + ', ' + a + ')';
    },
    stroke: function(r, g, b, a) {
        a = a === undefined ? 1 : a;
        this.context.strokeStyle = 'rgba(' + r + ', ' + b + ', ' + g + ', ' + a + ')';
    },
    strokeWeight: function(w) {
        this.context.lineWidth = w;
    },
    move: function(x, y) {
        this.context.moveTo(x, y);
    },
    line: function(x1, y1, x2, y2) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    },
    rect: function(x, y, width, height, angle) {
        if (angle !== undefined && angle !== 0) {
            this.context.save();
            this.context.translate(x + width / 2, y + height / 2);
            this.context.rotate(angle);
            this.context.rect(-width / 2, -height / 2, width, height);
            this.context.fill();
            this.context.stroke();
            this.context.restore();
        } else {
            this.context.rect(x, y, width, height);
            this.context.fill();
            this.context.stroke();
        }
    },
    circle: function(x, y, radius) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, Math.PI * 2, false);
        this.context.fill();
        this.context.stroke();
    },
    triangle: function(x, y, width, height, angle) {
        if (angle !== undefined && angle !== 0) {
            this.context.save();
            this.context.translate(x, y);
            this.context.rotate(angle);
            this.context.beginPath();
            this.context.moveTo(0 - width / 2, 0 + height / 2);
            this.context.lineTo(0, 0 - height / 2);
            this.context.lineTo(0 + width / 2, 0 + height / 2);
            this.context.closePath();
            this.context.stroke();
            this.context.fill();
            this.context.restore();
        } else {
            this.context.beginPath();
            this.context.moveTo(x - width / 2, y + height / 2);
            this.context.lineTo(x, y - height / 2);
            this.context.lineTo(x + width / 2, y + height / 2);
            this.context.closePath();
            this.context.stroke();
            this.context.fill();
        }
    },
    triangleABC: function(x1, y1, x2, y2, x3, y3) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.lineTo(x3, y3);
        this.context.closePath();
        this.context.stroke();
        this.context.fill();
    },
    image: function(img, x, y, angle) {
        if (angle !== undefined && angle !== 0) {
            var offsetX = img.width / 2,
                offsetY = img.height / 2;
            this.context.save();
            this.context.translate(x + offsetX, y + offsetY);
            this.context.rotate(angle);
            this.context.drawImage(img, -offsetX, -offsetY);
            this.context.restore();
        } else {
            this.context.drawImage(img, x, y);
        }
    },
    cross: function(radius) {
        this.context.beginPath();
        this.context.moveTo(-radius, -radius);
        this.context.lineTo(radius, radius);
        this.context.moveTo(-radius, radius);
        this.context.lineTo(radius, -radius);
        this.context.stroke();
    },
    text: function(str, x, y) {
        this.context.fillText(str, x, y);
    },
    textFont: function(font) {
        this._textFont = font;
        this.context.font = this._textSize + 'px ' + font;
    },
    textSize: function(size) {
        this._textSize = size;
        this.context.font = size + 'px ' + this._textFont;
    },
    openImage: function() {
        var win = window.open('', 'Canvas Image'),
            src = this.canvas.toDataURL('image/png');
        win.document.write('<img src="' + src +
            '" width="' + this.width +
            '" height="' + this.height + '" />');
    },
    downloadImage: function() {
        var src = this.canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        window.location.href = src;
    },
    getImageData: function() {
        return this.context.getImageData(0, 0, this.width, this.height);
    },
    getPixel: function(x, y) {
        var imageData = this.getImageData();
        var i = (x + y * imageData.width) * 4;
        return Array.prototype.slice.call(imageData.data, i, i + 4);
    },
    setPixel: function(x, y, r, g, b, a) {
        var imageData = this.getImageData();
        var i = (x + y * imageData.width) * 4;
        imageData.data[i + 0] = r;
        imageData.data[i + 1] = g;
        imageData.data[i + 2] = b;
        imageData.data[i + 3] = a;
    },
    eachPixel: function(fn) {
        var imageData = this.getImageData();
        var pixels = imageData.data;
        var w = imageData.width;
        var h = imageData.height;

        var l = w * h;
        for (var i = 0; i < l; i++) {
            // get color of pixel
            var r = pixels[i * 4]; // Red
            var g = pixels[i * 4 + 1]; // Green
            var b = pixels[i * 4 + 2]; // Blue
            var a = pixels[i * 4 + 3]; // Alpha

            // get the position of pixel
            var y = Math.floor(i / w);
            var x = i - y * w;

            fn(r, g, b, a, x, y);
        }
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = Graphics;
}

},{}],9:[function(require,module,exports){
'use strict';

function InputCoords() {
	var self;
	var calculateCoords = (function(){
		var fn;
		if(typeof window.pageXOffset === 'number'){
			fn = function(e){
				var pX = (e.clientX || 0),
					pY = (e.clientY || 0),
					sX = window.pageXOffset,
					sY = window.pageYOffset;
				self.x = pX+sX;
				self.y = pY+sY;
				self.percentX = self.x / window.innerWidth;
				self.percentY = self.y / window.innerHeight;
			};
		}
		else {
			fn = function(e){
				e = (e && e.clientX) ? e : window.event;
				var pX = e.clientX,
					pY = e.clientY,
					d = document.documentElement,
					b = document.body,
					sX = Math.max(d.scrollLeft, b.scrollLeft),
					sY = Math.max(d.scrollTop, b.scrollTop);
				self.x = pX+sX;
				self.y = pY+sY;
				self.percentX = self.x / window.innerWidth;
				self.percentY = self.y / window.innerHeight;
			};
		}
		return fn;
	})();

	self = {
		x: 0,
		y: 0,
		percentX: 0,
		percentY: 0,
		isListening: false,

		on: function() {
			document.body.addEventListener('mousemove', calculateCoords);
			document.body.addEventListener('touchmove', calculateCoords);
			self.isListening = true;
			return this;
		},
		off: function() {
			document.body.removeEventListener('mousemove', calculateCoords);
			document.body.removeEventListener('touchmove', calculateCoords);
			self.isListening = false;
			return this;
		}
	};
	return self;
}

if (typeof module === 'object' && module.exports) {
    module.exports = InputCoords;
}

},{}],10:[function(require,module,exports){
'use strict';

var Keyboard = require('./keyboard');

function KeyInput() {
    var keys = [];

    for (var i = 0; i < 256; i++) {
        keys.push(false);
    }

    function onKeyDown(event) {
        event.preventDefault();
        keys[event.keyCode] = true;
    }

    function onKeyUp(event) {
        event.preventDefault();
        keys[event.keyCode] = false;
    }

    var self = {
        on: function() {
            document.addEventListener('keydown', onKeyDown, false);
            document.addEventListener('keyup', onKeyUp, false);
        },
        off: function() {
            document.removeEventListener('keydown', onKeyDown, false);
            document.removeEventListener('keyup', onKeyUp, false);
        },
        isDown: function(key) {
            return keys[key];
        },
        left: function() {
            return keys[Keyboard.LEFT] || keys[Keyboard.A];
        },
        right: function() {
            return keys[Keyboard.RIGHT] || keys[Keyboard.D];
        },
        up: function() {
            return keys[Keyboard.UP] || keys[Keyboard.W];
        },
        down: function() {
            return keys[Keyboard.DOWN] || keys[Keyboard.S];
        },
        space: function() {
            return keys[Keyboard.SPACEBAR];
        }
    };

    self.on();

    return self;
}

if (typeof module === 'object' && module.exports) {
    module.exports = KeyInput;
}

},{"./keyboard":18}],11:[function(require,module,exports){
'use strict';

function LinkedList() {

    var first,
        last;

    /*
        item = {
            'next': null,
            'prev': null
        }

        var item = linkedList.getFirst();
        while(item) {
            // do stuff
            item = item.next;
        }
    */
    function add(item) {
        if(!first) {
            first = last = item;
        }
        else {
            var i = first;
            while(i.next) {
                i = i.next;
            }
            insertAfter(item, i);
        }
        return item;
    }

    function remove(item) {
        if (item.next) {
            item.next.prev = item.prev;
        }
        if (item.prev) {
            item.prev.next = item.next;
        }
        if (item === first) {
            first = item.next;
        }
        if (item === last) {
            last = item.prev;
        }
        item.next = item.prev = null;

        return item;
    }

    function insertAfter(item, after) {
        remove(item);

        item.prev = after;
        item.next = after.next;
        
        if (!after.next) {
            last = item;
        }
        else {
            after.next.prev = item;
        }

        after.next = item;

        return item;
    }

    function insertBefore(item, before) {
        remove(item);

        item.prev = before.prev;
        item.next = before;

        if (!before.prev) {
            first = item;
        }
        else {
            before.prev.next = item;
        }

        before.prev = item;

        return item;
    }

    function forEach(callback, callbackContext) {
        if(!first) {
            return;
        }
        var args = Array.prototype.splice.call(arguments, 2);
        args.unshift(null); // make space for item

        var item = first;
        while(item) {
            args[0] = item;
            callback.apply(callbackContext, args);
            item = item.next;
        }
    }

    return {
        getFirst: function() {
            return first;
        },
        getLast: function() {
            return last;
        },
        getCount: function() {
            var count = 0;
            var i = first;
            while(i) {
                count ++;
                i = i.next;
            }
            return count;
        },
        'add': add,
        'remove': remove,
        'insertAfter': insertAfter,
        'insertBefore': insertBefore,
        'forEach': forEach
    };
}

if (typeof module === 'object' && module.exports) {
    module.exports = LinkedList;
}

},{}],12:[function(require,module,exports){
'use strict';

var Emitter = require('./Emitter');

function MouseWheel(speed) {
  speed = speed || 2;

  var mouseWheel;

  function add() {
    if ('onmousewheel' in window) {
      window.addEventListener('mousewheel', mouseWheelHandler, false);
    } else if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', mouseWheelHandler, false);
    }
  }

  function remove() {
    if ('onmousewheel' in window) {
      window.removeEventListener('mousewheel', mouseWheelHandler, false);
    } else if (window.removeEventListener) {
      window.removeEventListener('DOMMouseScroll', mouseWheelHandler, false);
    }
  }

  function mouseWheelHandler(event) {
    if (!event) { event = window.event; }
    // event.preventDefault();

    var direction = (event.detail < 0 || event.wheelDelta > 0) ? 1 : -1;
    var delta = direction * speed;

    if (direction > 0) {
      mouseWheel.emit('up', delta);
    } else {
      mouseWheel.emit('down', delta);
    }

    mouseWheel.emit('update', delta);
  }

  add();

  mouseWheel = Object.create(Emitter.prototype, {
      _events: { value: {} },
      add: { value: add },
      remove: { value: remove }
  });

  return Object.freeze(mouseWheel);
}

if (typeof module === 'object' && module.exports) {
  module.exports = MouseWheel;
}

},{"./Emitter":4}],13:[function(require,module,exports){
'use strict';

function ObjectPool(Type) {

    var pool = [];

    return {
        getPool: function() {
            return pool;
        },
        get: function() {
            if ( pool.length > 0 ) {
                return pool.pop();
            } else {
                return new Type();
            }
        },
        dispose: function(instance) {
            pool.push(instance);
        },
        fill: function(count) {
            while ( pool.length < count ) {
                pool[pool.length] = new Type();
            }
        },
        empty: function() {
            pool = [];
        }
    };
}

if (typeof module === 'object' && module.exports) {
    module.exports = ObjectPool;
}

},{}],14:[function(require,module,exports){
'use strict';

var Emitter = require('./Emitter');

function VideoObject(videoEl) {
  var el = videoEl || document.createElement('video');
  var player;

  var metadataHandler = function() {
    player.emit('metadata', {
      src: this.currentSrc,
      width: this.videoWidth,
      height: this.videoHeight,
      duration: this.duration
    });
  };

  var canplayHandler = function() {
    player.emit('ready');
  };

  var playHandler = function() {
    player.emit('play');
  };

  var endedHandler = function() {
    player.emit('ended');
  };

  var errorHandler = function() {
    player.emit('error', el.error);
  };

  var timeupdateHandler = function() {
    player.emit('timeupdate', el.currentTime);
  };

  var addEventListeners = function() {
    removeEventListeners();

    el.addEventListener('loadedmetadata', metadataHandler, false);
    el.addEventListener('canplaythrough', canplayHandler, false);
    el.addEventListener('play', playHandler, false);
    el.addEventListener('playing', playHandler, false);
    el.addEventListener('error', errorHandler, false);
    el.addEventListener('ended', endedHandler, false);
    el.addEventListener('timeupdate', timeupdateHandler, false);
  };

  var removeEventListeners = function() {
    el.removeEventListener('loadedmetadata', metadataHandler);
    el.removeEventListener('canplaythrough', canplayHandler);
    el.removeEventListener('play', playHandler);
    el.removeEventListener('playing', playHandler);
    el.removeEventListener('error', errorHandler);
    el.removeEventListener('ended', endedHandler);
    el.removeEventListener('timeupdate', timeupdateHandler);
  };

  var destroy = function() {
    player.off();
    el.pause();

    try {
      el.removeAttribute('src');
    } catch (e) {}

    removeEventListeners();

    if (el.parentElement) {
      el.parentElement.removeChild(el);
    }

    el = null;

    return player;
  };

  var load = function(url) {
    if(window.Blob && url instanceof window.Blob) {
      url = getBlobURL(url);
    }
    addEventListeners();

    el.crossOrigin = 'anonymous';
    el.preload = 'auto';
    el.src = url;
    el.load();

    return player;
  };

  var play = function() {
    el.play();

    return player;
  };

  var pause = function() {
    el.pause();

    return player;
  };

  var seek = function(time) {
    try {
      el.currentTime = time;
    } catch (e) {}

    return player;
  };

  var getBlobURL = function(url) {
    url = window.URL.createObjectURL(url);
    var revoke = function() {
      el.removeEventListener('canplaythrough', revoke);
      window.URL.revokeObjectURL(url);
    };
    el.addEventListener('canplaythrough', revoke);
    return url;
  };

  addEventListeners();

  player = Object.create(Emitter.prototype, {
      _events: { value: {} },
      destroy: { value: destroy },
      load: { value: load },
      pause: { value: pause },
      play: { value: play },
      seek: { value: seek },
      el: {
        get: function() {
          return el;
        }
      },
      currentTime: {
        get: function() {
          return el.currentTime;
        },
        set: function(value) {
          el.currentTime = value;
        }
      },
      duration: {
        get: function() {
          return el.duration;
        }
      },
      volume: {
        get: function() {
          return el.volume;
        },
        set: function(value) {
          el.volume = value;
        }
      }
  });

  return Object.freeze(player);
}

module.exports = VideoObject;

},{"./Emitter":4}],15:[function(require,module,exports){
'use strict';

var ArrayUtils = {
    clone: function(arr) {
        return arr.slice(0);
    },
    getRandom: function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },
    isArray: function(arr) {
        return Array.isArray ? Array.isArray(arr) : arr && arr instanceof Array;
    },
    nearest: function(value, arr) {
        var least = Number.MAX_VALUE, diff;
        return arr.reduce(function(index, item, i) {
            diff = Math.abs(item - value);
            if (diff < least) {
                least = diff;
                index = i;
            }
            return value;
        }, -1);
    },
    sortNumeric: function(arr) {
        return arr.sort(function(a,b){
            return a - b;
        });
    },
    sortRandom: function(arr) {
        return arr.sort(function(){
            return Math.random() > 0.5 ? -1 : 1;
        });
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = ArrayUtils;
}

},{}],16:[function(require,module,exports){
'use strict';

var ua = navigator.userAgent;

/* android */

function android() {
    return !!ua.match(/Android/i);
}

function androidOld() {
    return !!(android() && parseFloat(ua.slice(ua.indexOf('Android')+8)) < 4);
}

function androidStock() {
    if(!android()) {
        return false;
    }
    var regExAppleWebKit = new RegExp(/AppleWebKit\/([\d.]+)/);
    var resultAppleWebKitRegEx = regExAppleWebKit.exec(ua);
    var appleWebKitVersion = (resultAppleWebKitRegEx === null ? null : parseFloat(regExAppleWebKit.exec(ua)[1]));
    var isAndroidBrowser = appleWebKitVersion !== null && appleWebKitVersion < 537;
    return isAndroidBrowser;
}

/* dpr */

function dpr() {
    return window.devicePixelRatio !== undefined ? window.devicePixelRatio : 1;
}

/* ie */

function ie8down() {
    var div = document.createElement('div');
    div.innerHTML = '<!--[if lte IE 8]><i></i><![endif]-->';
    return (div.getElementsByTagName('i').length === 1);
}

function ie9down() {
    var div = document.createElement('div');
    div.innerHTML = '<!--[if IE]><i></i><![endif]-->';
    return (div.getElementsByTagName('i').length === 1);
}

function ieVersion() {
    var rv = -1,
        re,
        ua;
    if (navigator.appName === 'Microsoft Internet Explorer') {
        ua = ua;
        re  = new RegExp('MSIE ([0-9]{1,}[.0-9]{0,})');
        if (re.exec(ua) !== null) {
            rv = parseFloat( RegExp.$1 );
        }
    }
    else if (navigator.appName === 'Netscape')
    {
        ua = ua;
        re  = new RegExp('Trident/.*rv:([0-9]{1,}[.0-9]{0,})');
        if (re.exec(ua) !== null) {
            rv = parseFloat( RegExp.$1 );
        }
    }
    return rv;
}

/* ios */

function ios5() {
    return !!(ua.match(/OS 5(_\d)+ like Mac OS X/i));
}

function ipad() {
    return !!ua.match(/iPad/i);
}

function iphone() {
    return !!ua.match(/iPhone/i);
}

function ipod() {
    return !!ua.match(/iPod/i);
}

function ios() {
    return (ipad() || ipod() || iphone());
}

/* mobile */

function mobile() {
    return !!ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
}

// screen.width / screen.height is often wrong in Android

function screenHeight() {
    return Math.max(window.outerHeight, window.screen.height);
}

function screenWidth() {
    return Math.max(window.outerWidth, window.screen.width);
}

var Device = {
    'android': android(),
    'androidOld': androidOld(),
    'androidStock': androidStock(),
    'dpr': dpr(),
    'ie8down': ie8down(),
    'ie9down': ie9down(),
    'ieVersion': ieVersion(),
    'ios': ios(),
    'ios5': ios5(),
    'ipad': ipad(),
    'iphone': iphone(),
    'ipod': ipod(),
    'mobile': mobile(),
    'retina': (dpr() > 1),
    'screenHeight': screenHeight(),
    'screenWidth': screenWidth()
};

if (typeof module === 'object' && module.exports) {
    module.exports = Device;
}

},{}],17:[function(require,module,exports){
'use strict';

var Emitter = require('./Emitter');

var Fullscreen = (function() {

    var self,
        el = document.documentElement,
        isSupported = !!(el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen);

    function onFullscreenChange() {
        self.emit('change', self.isFullscreen());
    }

    if (isSupported) {
        document.addEventListener('fullscreenchange', onFullscreenChange);
        document.addEventListener('mozfullscreenchange', onFullscreenChange);
        document.addEventListener('webkitfullscreenchange', onFullscreenChange);
        //document.addEventListener('msfullscreenchange', onFullscreenChange);
    }

    self = Object.create(Emitter.prototype, {
        _events: {
            value: {}
        },
        isSupported: {
            value: isSupported
        },
        enter: {
            value: function(element) {
                element = element || document.documentElement;

                var method = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen; // || element.msRequestFullscreen;

                if (method) {
                    method.call(element);
                }
            }
        },
        exit: {
            value: function() {
                var method = document.exitFullscreen || document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen; // || document.msExitFullscreen;

                if (method) {
                    method.call(document);
                }
            }
        },
        toggle: {
            value: function(element) {
                if (this.isFullscreen()) {
                    this.exit();
                } else {
                    this.enter(element);
                }
            }
        },
        isFullscreen: {
            value: function() {
                return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen); // || document.msFullscreenElement );
            }
        }
    });

    return self;

}());

if (typeof module === 'object' && module.exports) {
    module.exports = Fullscreen;
}

},{"./Emitter":4}],18:[function(require,module,exports){
var Keyboard = {
	A: 'A'.charCodeAt(0),
	B: 'B'.charCodeAt(0),
	C: 'C'.charCodeAt(0),
	D: 'D'.charCodeAt(0),
	E: 'E'.charCodeAt(0),
	F: 'F'.charCodeAt(0),
	G: 'G'.charCodeAt(0),
	H: 'H'.charCodeAt(0),
	I: 'I'.charCodeAt(0),
	J: 'J'.charCodeAt(0),
	K: 'K'.charCodeAt(0),
	L: 'L'.charCodeAt(0),
	M: 'M'.charCodeAt(0),
	N: 'N'.charCodeAt(0),
	O: 'O'.charCodeAt(0),
	P: 'P'.charCodeAt(0),
	Q: 'Q'.charCodeAt(0),
	R: 'R'.charCodeAt(0),
	S: 'S'.charCodeAt(0),
	T: 'T'.charCodeAt(0),
	U: 'U'.charCodeAt(0),
	V: 'V'.charCodeAt(0),
	W: 'W'.charCodeAt(0),
	X: 'X'.charCodeAt(0),
	Y: 'Y'.charCodeAt(0),
	Z: 'Z'.charCodeAt(0),
	ZERO: '0'.charCodeAt(0),
	ONE: '1'.charCodeAt(0),
	TWO: '2'.charCodeAt(0),
	THREE: '3'.charCodeAt(0),
	FOUR: '4'.charCodeAt(0),
	FIVE: '5'.charCodeAt(0),
	SIX: '6'.charCodeAt(0),
	SEVEN: '7'.charCodeAt(0),
	EIGHT: '8'.charCodeAt(0),
	NINE: '9'.charCodeAt(0),
	NUMPAD_0: 96,
	NUMPAD_1: 97,
	NUMPAD_2: 98,
	NUMPAD_3: 99,
	NUMPAD_4: 100,
	NUMPAD_5: 101,
	NUMPAD_6: 102,
	NUMPAD_7: 103,
	NUMPAD_8: 104,
	NUMPAD_9: 105,
	NUMPAD_MULTIPLY: 106,
	NUMPAD_ADD: 107,
	NUMPAD_ENTER: 108,
	NUMPAD_SUBTRACT: 109,
	NUMPAD_DECIMAL: 110,
	NUMPAD_DIVIDE: 111,
	F1: 112,
	F2: 113,
	F3: 114,
	F4: 115,
	F5: 116,
	F6: 117,
	F7: 118,
	F8: 119,
	F9: 120,
	F10: 121,
	F11: 122,
	F12: 123,
	F13: 124,
	F14: 125,
	F15: 126,
	COLON: 186,
	EQUALS: 187,
	UNDERSCORE: 189,
	QUESTION_MARK: 191,
	TILDE: 192,
	OPEN_BRACKET: 219,
	BACKWARD_SLASH: 220,
	CLOSED_BRACKET: 221,
	QUOTES: 222,
	BACKSPACE: 8,
	TAB: 9,
	CLEAR: 12,
	ENTER: 13,
	SHIFT: 16,
	CONTROL: 17,
	ALT: 18,
	CAPS_LOCK: 20,
	ESC: 27,
	SPACEBAR: 32,
	PAGE_UP: 33,
	PAGE_DOWN: 34,
	END: 35,
	HOME: 36,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	INSERT: 45,
	DELETE: 46,
	HELP: 47,
	NUM_LOCK: 144
};

if (typeof module === 'object' && module.exports) {
    module.exports = Keyboard;
}

},{}],19:[function(require,module,exports){
'use strict';

var DEG = 180 / Math.PI;
var RAD = Math.PI / 180;

var MathUtils = {
    angle: function(x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        return Math.atan2(dy, dx);
    },
    clamp: function(value, min, max) {
        if(min > max) {
            var a = min;
            min = max;
            max = a;
        }
        if(value < min) {
            return min;
        }
        if(value > max) {
            return max;
        }
        return value;
    },
    coinToss: function() {
        return Math.random() > 0.5;
    },
    crossProduct: function(aX, aY, bX, bY) {
        /*
        The sign tells us if a is to the left (-) or the right (+) of b
        */
        return aX * bY - aY * bX;
    },
    degrees: function(radians) {
        return radians * DEG;
    },
    difference: function(a, b) {
        return Math.abs(a - b);
    },
    distance: function(x1, y1, x2, y2) {
        var sq = MathUtils.distanceSQ(x1, y1, x2, y2);
        return Math.sqrt(sq);
    },
    distanceSQ: function(x1, y1, x2, y2) {
        var dx = x1 - x2;
        var dy = y1 - y2;
        return dx * dx + dy * dy;
    },
    dotProduct: function(aX, aY, bX, bY) {
        /*
        - If A and B are perpendicular (at 90 degrees to each other), the result
          of the dot product will be zero, because cos(Θ) will be zero.
        - If the angle between A and B are less than 90 degrees, the dot product
          will be positive (greater than zero), as cos(Θ) will be positive, and
          the vector lengths are always positive values.
        - If the angle between A and B are greater than 90 degrees, the dot
          product will be negative (less than zero), as cos(Θ) will be negative,
          and the vector lengths are always positive values
        */
        return aX * bX + aY * bY;
    },
    getCirclePoints: function(originX, originY, radius, count, start, Class) {
        start = start === undefined ? -Math.PI/2 : start;
        var points = [],
            circ = Math.PI * 2,
            incr = circ / count,
            ob;
        for (var i = start; i < circ + start; i += incr) {
            ob = Class === undefined ? {} : new Class();
            ob.x = originX + radius * Math.cos(i);
            ob.y = originY + radius * Math.sin(i);
            points.push(ob);
        }
        return points;
    },
    getIntersectionArea: function(aX, aY, aW, aH, bX, bY, bW, bH) {
        var overlapX = Math.max(0, Math.min(aX + aW, bX + bW) - Math.max(aX, bX));
        var overlapY = Math.max(0, Math.min(aY + aH, bY + bH) - Math.max(aY, bY));
        return overlapX * overlapY;
    },
    getOverlapX: function(aX, aW, bX, bW) {
        return Math.max(0, Math.min(aX + aW, bX + bW) - Math.max(aX, bX));
    },
    getOverlapY: function(aY, aH, bY, bH) {
        return Math.max(0, Math.min(aY + aH, bY + bH) - Math.max(aY, bY));
    },
    lerp: function(from, to, percent) {
        return from + ( to - from ) * percent;
    },
    map: function(v, a, b, x, y) {
        // value, min expected, max expected, map min, map max
        // e.g. map some value between 0 to 100 to -50 to 50
        // map(50, 0, 100, -50, 50) // 0
        // map(25, 0, 100, -50, 50) // -25
        return (v === a) ? x : (v - a) * (y - x) / (b - a) + x;
    },
    radians: function(degrees) {
        return degrees * RAD;
    },
    random: function(min, max) {
        if ( isNaN(max) ) {
            max = min;
            min = 0;
        }
        return min + Math.random() * (max - min);
    },
    rotateToDEG: function(start, end) {
        var diff = (end - start) % 360;
        if (diff !== diff % 180) {
            diff = (diff < 0) ? diff + 360 : diff - 360;
        }
        return start + diff;
    },
    rotateToRAD: function(start, end) {
        var PI2 = Math.PI * 2;
        var diff = (end - start) % PI2;
        if (diff !== diff % Math.PI) {
            diff = diff < 0 ? diff + PI2 : diff - PI2;
        }
        return start + diff;
    },
    roundToNearest: function(value, unit) {
        return Math.round(value / unit) * unit;
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = MathUtils;
}

},{}],20:[function(require,module,exports){
'use strict';

var modern = (function() {

    var ios5 = (function() {
        return !!(navigator.userAgent.match(/OS 5(_\d)+ like Mac OS X/i));
    }());

    var androidOld = (function() {
        var ua = navigator.userAgent;
        return !!(ua.match(/Android/i) && parseFloat(ua.slice(ua.indexOf('Android')+8)) < 4);
    }());

    var androidStock = (function() {
        var ua = navigator.userAgent;
        var regExAppleWebKit = new RegExp(/AppleWebKit\/([\d.]+)/);
        var resultAppleWebKitRegEx = regExAppleWebKit.exec(ua);
        var appleWebKitVersion = (resultAppleWebKitRegEx === null ? null : parseFloat(regExAppleWebKit.exec(ua)[1]));
        var isAndroidBrowser = ua.match(/Android/i) && appleWebKitVersion !== null && appleWebKitVersion < 537;
        return isAndroidBrowser;
    }());

    var ie9Down = (function() {
        var div = document.createElement('div');
        div.innerHTML = '<!--[if IE]><i></i><![endif]-->';
        return (div.getElementsByTagName('i').length === 1);
    }());

    var es5 = (function() {
        try {
            Object.defineProperty({}, 'x', {});
            Object.create({});
        } catch(e) {
            return false;
        }
        return true;
    }());

    var canvas = (function() {
        var el = document.createElement('canvas');
        return !!(el.getContext && el.getContext('2d'));
    }());

    var smallViewport = (function() {
        return Math.max( window.screen.width, window.screen.height, window.outerWidth, window.outerHeight ) <= 480;
    }());

    return !!(canvas && es5 && !(ios5 || androidOld || androidStock || ie9Down || smallViewport));

}());

if(Modernizr) {
    Modernizr.addTest('modern', function() {
        return modern;
    });
}
else if (typeof module === 'object' && module.exports) {
    module.exports = modern;
}

},{}],21:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],22:[function(require,module,exports){
'use strict';

var ua = navigator.userAgent;

// os
var android = /Android/.test(ua);
var ios = /iP[ao]d|iPhone/i.test(ua);
var linux = /Linux/.test(ua);
var osx = !ios && /Mac OS/.test(ua);
var windowsPhone = /Windows Phone/i.test(ua);
var windows = !windowsPhone && /Windows/.test(ua);

// device
var ipad = /iPad/i.test(ua);
var ipod = /iPod/i.test(ua);
var iphone = /iPhone/i.test(ua);
var mobile = !!ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|SymbianOS/i);
var desktop = !mobile;

// version
var androidVersion = (function() {
    if (!android) {
        return -1;
    }
    return parseFloat(ua.slice(ua.indexOf('Android') + 8));
}());

var iosVersion = (function() {
    if (/iP[ao]d|iPhone/i.test(ua)) {
        var matches = ua.match(/OS (\d+)_(\d+)/i);
        if (matches && matches.length > 2) {
            return parseFloat(matches[1] + '.' + matches[2]);
        }
    }
    return -1;
}());

// browser
var androidStockBrowser = (function() {
    var matches = ua.match(/Android.*AppleWebKit\/([\d.]+)/);
    return !!matches && matches[1] < 537;
}());

var ieVersion = (function() {
    var v = -1;
    if (/MSIE (\d+\.\d+);/.test(ua)) {
        v = parseInt(RegExp.$1, 10);
    } else if (/Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/.test(ua)) {
        v = parseInt(RegExp.$3, 10);
    }
    return v;
}());

var chrome = /Chrome/.test(ua);
var firefox = /Firefox/.test(ua);
var firefoxVersion = (function() {
    if (!firefox) {
        return -1;
    }
    return parseFloat(ua.slice(ua.indexOf('Firefox') + 8));
}());
var ie = ieVersion > -1;
var opera = /Opera/.test(ua);
var safari = !androidStockBrowser && !chrome && /Safari/.test(ua);
var safariMobile = ios && /AppleWebKit/.test(ua);
var chromeiOS = ios && /CriOS/.test(ua);

// local
var local = /^(?:https?:\/\/)?(?:localhost|192\.168)/.test(window.location.href);

// export

var platform = Object.freeze({
    browser: {
        androidStockBrowser: androidStockBrowser,
        chrome: chrome,
        chromeiOS: chromeiOS,
        firefox: firefox,
        firefoxVersion: firefoxVersion,
        ie: ie,
        ieVersion: ieVersion,
        opera: opera,
        safari: safari,
        safariMobile: safariMobile
    },
    device: {
        desktop: desktop,
        ipad: ipad,
        iphone: iphone,
        ipod: ipod,
        mobile: mobile
    },
    os: {
        android: android,
        ios: ios,
        linux: linux,
        osx: osx,
        windows: windows,
        windowsPhone: windowsPhone,
        androidVersion: androidVersion,
        iosVersion: iosVersion
    },
    local: local
});

// console.log('-->', ua);
// console.log('-->', platform);

if (typeof module === 'object' && module.exports) {
    module.exports = platform;
}

},{}],23:[function(require,module,exports){
'use strict';

 /*
  * classList (ie10 and ie11 partial polyfill)
  * adapted from: https://github.com/eligrey/classList.js/blob/master/classList.js
  */

(function() {

  var testElement = document.createElement('_');

  testElement.classList.add('c1', 'c2');

  // Polyfill for IE 10/11 and Firefox <26, where classList.add and
  // classList.remove exist but support only one argument at a time.
  if (!testElement.classList.contains('c2')) {
    var createMethod = function(method) {
      var original = window.DOMTokenList.prototype[method];

      window.DOMTokenList.prototype[method] = function(token) {
        var i;
        var len = arguments.length;

        for (i = 0; i < len; i++) {
          token = arguments[i];
          original.call(this, token);
        }
      };
    };
    createMethod('add');
    createMethod('remove');
  }

  testElement.classList.toggle('c3', false);

  // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
  // support the second argument.
  if (testElement.classList.contains('c3')) {
    var _toggle = window.DOMTokenList.prototype.toggle;

    window.DOMTokenList.prototype.toggle = function(token, force) {
      force = !!force;
      if (arguments.length > 1 && this.contains(token) === force) {
        return force;
      } else {
        return _toggle.call(this, token);
      }
    };
  }

  testElement = null;
}());

},{}],24:[function(require,module,exports){
'use strict';

var fn = function() {};

if (console === undefined) {
  window.console = {};
}

console.log = console.log || fn;
console.debug = console.debug || console.log;
console.dir = console.dir || fn;
console.error = console.error || fn;
console.group = console.group || fn;
console.groupCollapsed = console.groupCollapsed || fn;
console.info = console.info || fn;
console.profile = console.profile || fn;
console.profileEnd = console.profileEnd || fn;
console.table = console.table || fn;
console.timeStamp = console.timeStamp || fn;
console.trace = console.trace || fn;
console.warn = console.warn || fn;

},{}],25:[function(require,module,exports){
'use strict';

(function() {
    // ios6, ie10, android < 4.4
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] ||
        window[vendors[x]+'CancelRequestAnimationFrame'];
    }
    // ie < 10
    if (!window.requestAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

},{}],26:[function(require,module,exports){
'use strict';

var popup = function (url, name, width, height) {
    var left = (screen.width - width) / 2;
    var top = (screen.height - height) / 2;
    var params = 'width=' + width + ', height=' + height +
    ', top=' + top + ', left=' + left +
    ', directories=no' +
    ', location=no' +
    ', menubar=no' +
    ', resizable=no' +
    ', scrollbars=no' +
    ', status=no' +
    ', toolbar=no';
    var newwin = window.open(url, name, params);
    if (newwin === null || typeof newwin === 'undefined') {
        return false;
    }
    if (window.focus) {
        newwin.focus();
    }
    return true;
};

if (typeof module === 'object' && module.exports) {
    module.exports = popup;
}

},{}],27:[function(require,module,exports){
'use strict';

var ready;
if (document.addEventListener) {
    ready = function(fn, context) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            fn.call(context || this);
        }
        else {
            document.addEventListener('DOMContentLoaded', function() {
                fn.call(context || this);
            });
        }
    };
}
else {
    ready = function(fn, context) {
        if (document.readyState === 'interactive') {
            fn.call(context || this);
        }
        document.attachEvent('onreadystatechange', function(){
            if (document.readyState === 'interactive') {
                fn.call(context || this);
            }
        });
    };
}

if (typeof module === 'object' && module.exports) {
    module.exports = ready;
}

},{}],28:[function(require,module,exports){
'use strict';

var resize = function (rect, areaWidth, areaHeight, autoCenter, method) {
    var width = rect.width,
        height = rect.height,
        scale;

    switch(method) {
        case 'fill':
            scale = Math.max(areaWidth / width, areaHeight / height);
            break;
        case 'fit':
            scale = Math.min(areaWidth / width, areaHeight / height);
            break;
        case 'fitWidth':
            scale = areaWidth / width;
            break;
        case 'fitHeight':
            scale = areaHeight / height;
            break;
        default:
            scale = Math.max(areaWidth / width, areaHeight / height);
            break;
    }

    rect.width = Math.ceil(width * scale);
    rect.height = Math.ceil(height * scale);

    if (autoCenter) {
        rect.x = Math.round((areaWidth - rect.width) * 0.5);
        rect.y = Math.round((areaHeight - rect.height) * 0.5);
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = resize;
}

},{}],29:[function(require,module,exports){
'use strict';

var popup = require('./popup');

// warnBadURL - helper to warn on relative URLs supplied for images etc
function warnBadURL(url) {
    if(url.substr(0,4) !== 'http') {
        console.warn('URL: ' + url + ' should start with http');
    }
}

var Share = {
    // Standard FB share (uses og tags)
    facebook: function(url) {
        console.log('share.facebook', url);
        return popup('http://www.facebook.com/share.php?u=' + encodeURIComponent(url), 'shareFacebook', 720, 480);
    },
    twitter: function(url, text, hashtags, related) {
        console.log('share.twitter', url, text, hashtags, related);
        return popup('https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text) + '&hashtags=' + encodeURIComponent(hashtags) + '&related=' + encodeURIComponent(related), 'shareTwitter', 550, 380);
    },
    googlePlus: function(url) {
        console.log('share.googlePlus', url);
        return popup('https://plus.google.com/share?url=' + encodeURIComponent(url), 'shareGooglePlus', 550, 380);
    },
    pinterest: function(url, picture, text) {
        warnBadURL(picture);
        console.log('share.pinterest', url, picture, text);
        return popup('http://pinterest.com/pin/create/button/?url='+ encodeURIComponent(url) + '&media='+ encodeURIComponent(picture) + '&description=' + encodeURIComponent(text), 'sharePinterest', 630, 280);
    },
    vkontakte: function(url, title, description, image) {
        console.log('share.vkontakte', url, title, description, image);
        return popup('http://vkontakte.ru/share.php?url=' + encodeURIComponent(url) + '&title=' + title + '&description=' + description + '&image=' + encodeURIComponent(image), 'shareVK', 550, 380);
    },
    renren: function(url, title) {
        console.log('share.renren', url, title);
        return popup('http://share.renren.com/share/buttonshare.do?link=' + encodeURIComponent(url) + '&title=' + title, 'shareRenRen', 900, 480);
    },
    weibo: function(url, title, image) {
        console.log('share.weibo', url, title, image);
        return popup('http://service.weibo.com/share/share.php?url=' + encodeURIComponent(url) + '&appkey=&title=' + title + '&pic=' + encodeURIComponent(image) + '&ralateUid=&language=zh_cn', 'shareWeibo', 640, 480);
    },
    // FB feed dialog share for sharing with customised text and images 
    // See http://developers.facebook.com/docs/reference/dialogs/feed/
    facebookFeedDialog: function(appId, title, link, picture, source, caption, description, redirectURL) {
        warnBadURL(picture);
        warnBadURL(redirectURL);
        console.log('share.facebookViaApp', appId, title, link, picture, source, caption, description, redirectURL);

        var url = 'http://www.facebook.com/dialog/feed?app_id=' + appId +
        '&picture=' + picture +
        ( source && source !== '' ? '&source=' + source : '' ) +
        '&name=' + encodeURIComponent(title) +
        '&link=' + link +
        '&caption=' + encodeURIComponent(caption) +
        '&description=' + encodeURIComponent(description) +
        '&display=popup' +
        '&show_error=true' +
        '&redirect_uri=' + redirectURL;

        return popup(url, 'shareFacebook', 550, 380);
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = Share;
}

},{"./popup":26}],30:[function(require,module,exports){
'use strict';

var StorageUtils = {
    saveJSON: function(key, object) {
        if(localStorage) {
            localStorage.setItem(key, JSON.stringify(object));
            return true;
        }
        return false;
    },
    loadJSON: function(key) {
        if(localStorage && localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key));
        }
        return null;
    },
    // convert image to localstorage friendly data URL string
    getImageDataURL: function(img, width, height) {
        if(!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d');
        }
        this.canvas.width = width || img.width;
        this.canvas.height = height || img.height;
        this.context.drawImage(img, 0, 0);
        var dataURL = this.canvas.toDataURL('image/png');
        this.context.clearRect(0, 0, width, height);
        return dataURL;
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = StorageUtils;
}

},{}],31:[function(require,module,exports){
'use strict';

/*
 * Helper
 */

// regex escape pattern
function escapePattern(pattern) {
    return pattern.replace(/(\]|\[|\{|\}|\(|\)|\*|\+|\?|\.|\\)/g, '\\$1');
}

/*
 * Format
 */

// remove whitespace from the front and end of str
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

// remove whitespace from the front of str
function trimLeft(str) {
    return str.replace(/^\s+/, '');
}

// remove whitespace from the end of str
function trimRight(str) {
    return str.replace(/\s+$/, '');
}

// pad str with substr from the left
function padLeft(str, substr, length) {
    while (str.length < length) { str = substr + str; }
    return str;
}

// pads str with substr from the right
function padRight(str, substr, length) {
    while (str.length < length) { str += substr; }
    return str;
}

// remove extra whitespace (extra spaces, tabs, line breaks, etc)
function removeExtraWhitespace(str) {
    var substr = trim(str);
    return substr.replace(/\s+/g, ' ');
}

// remove all instances of substr in str
function remove(str, substr, caseSensitive) {
    var escapedStr = escapePattern(substr);
    var flags = caseSensitive ? 'g' : 'ig';
    return str.replace(new RegExp(escapedStr, flags), '');
}

// truncate to length with suffix
function truncate(str, len, suffix) {
    if(suffix === undefined) {
        suffix = '...';
    }
    len -= suffix.length;
    var trunc = str;
    if (trunc.length > len) {
        trunc = trunc.substr(0, len);
        var r = /[^\s]/;
        if (r.test(str.charAt(len))) {
            trunc = trimRight(trunc.replace(/\w+$|\s+$/, ''));
        }
        trunc += suffix;
    }
    return trunc;
}

// Capitalize the first word in a string or all words
function capitalize(str, all) {
    var substr = trimLeft(str);
    if (all) {
        return substr.replace(/^.|\b./g, function(match) {
            return match.toUpperCase();
        });
    }
    else {
        return substr.replace(/(^\w)/, function(match) {
            return match.toUpperCase();
        });
    }
}

// proper case str in sentence format
function properCase(str) {
    var newStr = str.toLowerCase().replace(/\b([^.?;!]+)/, capitalize);
    return newStr.replace(/\b[i]\b/, 'I');
}

// reverse character order
function reverse(str) {
    return str.split('').reverse().join('');
}

// reverse word order
function reverseWords(str) {
    return str.split(' ').reverse().join(' ');
}

// remove all HTML tags from str
function stripTags(str) {
    return str.replace(/<\/?[^>]+>/igm, '');
}

// swaps the case of str
function swapCase(str) {
    return str.replace(/(\w)/, function(newStr) {
        var lower = newStr.toLowerCase();
        var upper = newStr.toUpperCase();
        switch (newStr) {
            case lower:
                return upper;
            case upper:
                return lower;
            default:
                return newStr;
        }
    });
}

// formats seconds into HH:MM:SS
function timeCode(seconds, delim) {
    if(delim === undefined) { delim = ':'; }
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor((seconds % 3600) % 60);
    var hr = (h === 0 ? '' : (h < 10 ? '0' + h + delim : h + delim));
    var mn = (m < 10 ? '0' + m : m) + delim;
    var sc = (s < 10 ? '0' + s : s);
    return hr + mn + sc;
}

/*
 * Query
 */

// whether str begins with substr
function beginsWith(str, substr) {
    return str.indexOf(substr) === 0;
}

// whether str contains any instances of substr
function contains(str, substr) {
    return str.indexOf(substr) !== -1;
}

// the number of times substr appears within str
function countOf(str, substr, caseSensitive) {
    var escapedStr = escapePattern(substr);
    var flags = (!caseSensitive) ? 'ig' : 'g';
    return str.match(new RegExp(escapedStr, flags)).length;
}

// whether str ends with substr
function endsWith(str, substr) {
    return str.lastIndexOf(substr) === str.length - substr.length;
}

// whether str contains any text
function hasText(str) {
    var substr = removeExtraWhitespace(str);
    return !!substr.length;
}

// whether str contains any characters
function isEmpty(str) {
    return !str.length;
}

// whether str is numeric
function isNumeric(str) {
    var regx = /^[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?$/;
    return regx.test(str);
}

// the number of words in a string
function wordCount(str) {
    return str.match(/\b\w+\b/g).length;
}

/*
 * Substring
 */

// everything after the first occurrence of substr in str
function afterFirst(str, substr) {
    var index = str.indexOf(substr);
    if (index === -1) { return ''; }
    index += substr.length;
    return str.substr(index);
}

// everything after the last occurence of substr in str
function afterLast(str, substr) {
    var index = str.lastIndexOf(substr);
    if (index === -1) { return ''; }
    index += substr.length;
    return str.substr(index);
}

// everything before the first occurrence of substr in str
function beforeFirst(str, substr) {
    var index = str.indexOf(substr);
    if (index === -1) { return ''; }
    return str.substr(0, index);
}

// everything before the last occurrence of substr in the string.
function beforeLast(str, substr) {
    var index = str.lastIndexOf(substr);
    if (index === -1) { return ''; }
    return str.substr(0, index);
}

// everything after the first occurance of start and before the first occurrence of end
function between(str, start, end) {
    var substr = '';
    var startIndex = str.indexOf(start);
    if (startIndex !== -1) {
        startIndex += start.length;
        var endIndex = str.indexOf(end, startIndex);
        if (endIndex !== -1) {
            substr = str.substr(startIndex, endIndex-startIndex);
        }
    }
    return substr;
}

/*
 * Utility
 */

// Utility method that intelligently breaks up your string,
// allowing you to create blocks of readable text.
// This method returns you the closest possible match to the delim paramater,
// while keeping the text length within the len paramter.
// If a match can't be found in your specified length an  '...' is added to that block,
// and the blocking continues untill all the text is broken apart.
function block(str, len, delim) {
    if(delim === undefined) { delim = '.'; }
    var arr = [];

    if (!str || !contains(str, delim)) { return arr; }
    if (delim === ' ') { str += delim; }

    var chrIndex = 0;
    var strLen = str.length;
    var replPatt = new RegExp('[^'+escapePattern(delim)+']+$');
    while (chrIndex <  strLen) {
        var subString = str.substr(chrIndex, len);
        if (!contains(subString, delim)){
            arr.push(truncate(subString, subString.length));
            chrIndex += subString.length;
        }
        subString = subString.replace(replPatt, '');
        arr.push(trim(subString));
        chrIndex += subString.length;
    }
    return arr;
}

// Levenshtein distance (editDistance) is a measure of the similarity between two strings,
// The distance is the number of deletions, insertions, or substitutions required to
// transform source into target.
function editDistance(source, target) {
    var i;

    if (source === null) { source = ''; }
    if (target === null) { target = ''; }

    if (source === target) { return 0; }

    var d = [];
    var cost;
    var n = source.length;
    var m = target.length;
    var j;

    if (n === 0) { return m; }
    if (m === 0) { return n; }

    for (i=0; i<=n; i++) { d[i] = []; }
    for (i=0; i<=n; i++) { d[i][0] = i; }
    for (j=0; j<=m; j++) { d[0][j] = j; }

    for (i=1; i<=n; i++) {

        var s_i = source.charAt(i-1);
        for (j=1; j<=m; j++) {

            var t_j = target.charAt(j-1);

            if (s_i === t_j) { cost = 0; }
            else { cost = 1; }

            d[i][j] = Math.min(d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1]+cost);
        }
    }
    return d[n][m];
}

// percentage of similiarity from 0 to 1
function similarity(a, b) {
    var e = editDistance(a, b);
    var m = Math.max(a.length, b.length);
    if (m === 0) { return 1; }
    else { return (1 - e/m); }
}


var StringUtils = {
    // helper:
    'escapePattern': escapePattern,

    // format:
    'trim': trim,
    'trimLeft': trimLeft,
    'trimRight': trimRight,
    'padLeft': padLeft,
    'padRight': padRight,
    'removeExtraWhitespace': removeExtraWhitespace,
    'remove': remove,
    'truncate': truncate,
    'capitalize': capitalize,
    'properCase': properCase,
    'reverse': reverse,
    'reverseWords': reverseWords,
    'stripTags': stripTags,
    'swapCase': swapCase,
    'timeCode': timeCode,

    // query:
    'beginsWith': beginsWith,
    'contains': contains,
    'countOf': countOf,
    'endsWith': endsWith,
    'hasText': hasText,
    'isEmpty': isEmpty,
    'isNumeric': isNumeric,
    'wordCount': wordCount,

    // substring:
    'afterFirst': afterFirst,
    'afterLast': afterLast,
    'beforeFirst': beforeFirst,
    'beforeLast': beforeLast,
    'between': between,

    // utility:
    'block': block,
    'editDistance': editDistance,
    'similarity': similarity
};

if (typeof module === 'object' && module.exports) {
    module.exports = StringUtils;
}

},{}],32:[function(require,module,exports){
'use strict';

var track = {
    init: function(gaAccount) {
        console.log('Initialize Google Analytics with account Id:', gaAccount);

        /* jshint ignore:start */
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        /* jshint ignore:end */

        ga('create', gaAccount, 'auto');
        ga('send', 'pageview');
    },
    page: function(value) {
        console.log('track.page:', value);
        ga('send', {
            'hitType': 'pageview',
            'page': value,
            'title': value
        });
    },
    event: function(category, action, label, value) {
        console.log('track.event:', category, action, label, value);
        if (label) {
            console.log('track with label:', category, action, label, value);
            ga('send', {
                'hitType': 'event',
                'eventCategory': category,
                'eventAction': action,
                'eventLabel': label,
                'eventValue': value
            });
        } else {
            console.log('track without label:', category, action);
            ga('send', {
                'hitType': 'event',
                'eventCategory': category,
                'eventAction': action
            });
        }
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = track;
}

},{}],33:[function(require,module,exports){
'use strict';

var urlParams = {};

(function () {
    var pl = /\+/g;  // Regex for replacing addition symbol with a space
    var search = /([^&=]+)=?([^&]*)/g;
    var decode = function(s) {
        return decodeURIComponent(s.replace(pl, ' '));
    };
    var query = window.location.search.substring(1);
    var match = search.exec(query);
    while (match) {
        urlParams[decode(match[1])] = decode(match[2]);
        match = search.exec(query);
    }
})();

if (typeof module === 'object' && module.exports) {
    module.exports = urlParams;
}

},{}],34:[function(require,module,exports){
'use strict';

var Emitter = require('./Emitter'),
    resizeUtil = require('./resize');

var ViewPort = {
    rect: {
        'x': 0,
        'y': 0,
        'width': 0,
        'height': 0,
        'stageWidth': 0,
        'stageHeight': 0,
        'scale': 1
    },
    originalWidth: 0,
    originalHeight: 0,

    init: function(width, height) {
        this.emitter = new Emitter();
        this.originalWidth = width;
        this.originalHeight = height;
        var self = this;
        window.onresize = window.onorientationchange = function() {
            self.resize();
        };
        this.resize();
    },
    resize: function() {
        // reset
        this.rect.x = 0;
        this.rect.y = 0;
        this.rect.width = this.originalWidth;
        this.rect.height = this.originalHeight;
        this.rect.stageWidth = this.getWindowWidth();
        this.rect.stageHeight = this.getWindowHeight();
        this.rect.scale = 1;
        // resize
        if(this.rect.stageWidth > this.rect.stageHeight) {
            resizeUtil(this.rect, this.rect.stageWidth, this.rect.stageHeight, true, 'fill');
        }
        else {
            resizeUtil(this.rect, this.rect.stageWidth, this.rect.stageHeight, true, 'fitWidth');
        }
        this.rect.scale = this.rect.width / this.originalWidth;
        // notify
        this.emitter.emit('resize');
    },
    mouseLeftWindow: function(fn, thisArg) {
        document.addEventListener('mouseout', function(e) {
            var from = e.relatedTarget || e.toElement;
            if (!from || from.nodeName === 'HTML') {
                fn.call(thisArg || this);
            }
        });
    },
    getWindowWidth: function() {
        // Get current browser viewpane heigtht
        return window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth || 0;
    },
    getWindowHeight: function() {
        // Get current browser viewpane heigtht
        return window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight || 0;
    },
    getScrollTop: function () {
        return document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset || 0;
    },
    getWindowScrollY: function() {
        // Get current absolute window scroll position
        return window.pageYOffset ||
            document.body.scrollTop ||
            document.documentElement.scrollTop || 0;
    },
    getDocHeight: function() {
        // Get current absolute document height
        return Math.max(
            document.body.scrollHeight || 0,
            document.documentElement.scrollHeight || 0,
            document.body.offsetHeight || 0,
            document.documentElement.offsetHeight || 0,
            document.body.clientHeight || 0,
            document.documentElement.clientHeight || 0
        );
    },
    getScrollPercentage: function() {
        // Get current vertical scroll percentage
        return ((this.getWindowScrollY() + this.getWindowHeight()) / this.getDocHeight()) * 100;
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = ViewPort;
}

},{"./Emitter":4,"./resize":28}],35:[function(require,module,exports){
'use strict';

var Emitter = require('./Emitter');

var visibility,
    hidden,
    visibilityChange;

function onVisibilityChange() {
    if (document[hidden]) {
        visibility.emit('hidden');
    } else {
        visibility.emit('shown');
    }
}

if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
} else if (typeof document.mozHidden !== 'undefined') {
    hidden = 'mozHidden';
    visibilityChange = 'mozvisibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
}

if(visibilityChange !== undefined) {
    document.addEventListener(visibilityChange, onVisibilityChange, false);
}

visibility = Object.create(Emitter.prototype, {
    _events: { value: {} }
});

if (typeof module === 'object' && module.exports) {
    module.exports = visibility;
}

},{"./Emitter":4}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIkFzc2V0TG9hZGVyLmpzIiwiQ3VlcG9pbnRzUmVhZGVyLmpzIiwiRW1pdHRlci5qcyIsIkZhY2Vib29rLmpzIiwiRmxhc2guanMiLCJGcHMuanMiLCJHcmFwaGljcy5qcyIsIklucHV0Q29vcmRzLmpzIiwiS2V5SW5wdXQuanMiLCJMaW5rZWRMaXN0LmpzIiwiTW91c2VXaGVlbC5qcyIsIk9iamVjdFBvb2wuanMiLCJWaWRlb1BsYXllci5qcyIsImFycmF5LmpzIiwiZGV2aWNlLmpzIiwiZnVsbHNjcmVlbi5qcyIsImtleWJvYXJkLmpzIiwibWF0aC5qcyIsIm1vZGVybi5qcyIsIm5vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwicGxhdGZvcm0uanMiLCJwb2x5ZmlsbC1jbGFzc2xpc3QuanMiLCJwb2x5ZmlsbC1jb25zb2xlLmpzIiwicG9seWZpbGwtcmFmLmpzIiwicG9wdXAuanMiLCJyZWFkeS5qcyIsInJlc2l6ZS5qcyIsInNoYXJlLmpzIiwic3RvcmFnZS5qcyIsInN0cmluZy5qcyIsInRyYWNrLmpzIiwidXJsUGFyYW1zLmpzIiwidmlld3BvcnQuanMiLCJ2aXNpYmlsaXR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25LQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxucmVxdWlyZSgnLi9wb2x5ZmlsbC1jbGFzc2xpc3QnKTtcclxucmVxdWlyZSgnLi9wb2x5ZmlsbC1jb25zb2xlJyk7XHJcbnJlcXVpcmUoJy4vcG9seWZpbGwtcmFmJyk7XHJcblxyXG52YXIgdXNmbCA9IHt9O1xyXG5cclxudXNmbC5hcnJheSA9IHJlcXVpcmUoJy4vYXJyYXknKTtcclxudXNmbC5Bc3NldExvYWRlciA9IHJlcXVpcmUoJy4vQXNzZXRMb2FkZXInKTtcclxudXNmbC5DdWVwb2ludHNSZWFkZXIgPSByZXF1aXJlKCcuL0N1ZXBvaW50c1JlYWRlcicpO1xyXG51c2ZsLmRldmljZSA9IHJlcXVpcmUoJy4vZGV2aWNlJyk7XHJcbnVzZmwuRW1pdHRlciA9IHJlcXVpcmUoJy4vRW1pdHRlcicpO1xyXG51c2ZsLkZhY2Vib29rID0gcmVxdWlyZSgnLi9GYWNlYm9vaycpO1xyXG51c2ZsLkZsYXNoID0gcmVxdWlyZSgnLi9GbGFzaCcpO1xyXG51c2ZsLkZQUyA9IHJlcXVpcmUoJy4vRnBzJyk7XHJcbnVzZmwuZnVsbHNjcmVlbiA9IHJlcXVpcmUoJy4vZnVsbHNjcmVlbicpO1xyXG51c2ZsLkdyYXBoaWNzID0gcmVxdWlyZSgnLi9HcmFwaGljcycpO1xyXG51c2ZsLklucHV0Q29vcmRzID0gcmVxdWlyZSgnLi9JbnB1dENvb3JkcycpO1xyXG51c2ZsLmtleWJvYXJkID0gcmVxdWlyZSgnLi9rZXlib2FyZCcpO1xyXG51c2ZsLktleUlucHV0ID0gcmVxdWlyZSgnLi9LZXlJbnB1dCcpO1xyXG51c2ZsLkxpbmtlZExpc3QgPSByZXF1aXJlKCcuL0xpbmtlZExpc3QnKTtcclxudXNmbC5tYXRoID0gcmVxdWlyZSgnLi9tYXRoJyk7XHJcbnVzZmwubW9kZXJuID0gcmVxdWlyZSgnLi9tb2Rlcm4nKTtcclxudXNmbC5Nb3VzZVdoZWVsID0gcmVxdWlyZSgnLi9Nb3VzZVdoZWVsJyk7XHJcbnVzZmwuT2JqZWN0UG9vbCA9IHJlcXVpcmUoJy4vT2JqZWN0UG9vbCcpO1xyXG51c2ZsLnBsYXRmb3JtID0gcmVxdWlyZSgnLi9wbGF0Zm9ybScpO1xyXG51c2ZsLnBvcHVwID0gcmVxdWlyZSgnLi9wb3B1cCcpO1xyXG51c2ZsLnJlYWR5ID0gcmVxdWlyZSgnLi9yZWFkeScpO1xyXG51c2ZsLnJlc2l6ZSA9IHJlcXVpcmUoJy4vcmVzaXplJyk7XHJcbnVzZmwuc2hhcmUgPSByZXF1aXJlKCcuL3NoYXJlJyk7XHJcbnVzZmwuc3RvcmFnZSA9IHJlcXVpcmUoJy4vc3RvcmFnZScpO1xyXG51c2ZsLnN0cmluZyA9IHJlcXVpcmUoJy4vc3RyaW5nJyk7XHJcbnVzZmwudHJhY2sgPSByZXF1aXJlKCcuL3RyYWNrJyk7XHJcbnVzZmwudXJsUGFyYW1zID0gcmVxdWlyZSgnLi91cmxQYXJhbXMnKTtcclxudXNmbC5WaWRlb1BsYXllciA9IHJlcXVpcmUoJy4vVmlkZW9QbGF5ZXInKTtcclxudXNmbC5WaWV3cG9ydCA9IHJlcXVpcmUoJy4vdmlld3BvcnQnKTtcclxudXNmbC52aXNpYmlsaXR5ID0gcmVxdWlyZSgnLi92aXNpYmlsaXR5Jyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHVzZmw7XHJcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCcuL0VtaXR0ZXInKTtcblxudmFyIGJyb3dzZXJIYXNCbG9iID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHJldHVybiAhIW5ldyBCbG9iKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0oKSk7XG5cbi8qXG4gKiBHcm91cFxuICovXG5cbmZ1bmN0aW9uIEFzc2V0c0xvYWRlcihjb25maWcpIHtcbiAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuXG4gIHZhciBjcm9zc09yaWdpbiA9IGNvbmZpZy5jcm9zc09yaWdpbjtcbiAgdmFyIGlzVG91Y2hMb2NrZWQgPSAhIWNvbmZpZy5pc1RvdWNoTG9ja2VkO1xuICB2YXIgYmxvYiA9ICEhKGNvbmZpZy5ibG9iICYmIGJyb3dzZXJIYXNCbG9iKTtcbiAgdmFyIHdlYkF1ZGlvQ29udGV4dCA9IGNvbmZpZy53ZWJBdWRpb0NvbnRleHQ7XG5cbiAgdmFyIGFzc2V0c0xvYWRlcjtcbiAgdmFyIG1hcCA9IHt9O1xuICB2YXIgZmlsZXMgPSBbXTtcbiAgdmFyIHF1ZXVlID0gW107XG4gIHZhciBudW1Mb2FkZWQgPSAwO1xuICB2YXIgbnVtVG90YWwgPSAwO1xuXG4gIHZhciBhZGQgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgIG9wdGlvbnMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGFkZChpdGVtKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGFzc2V0c0xvYWRlcjtcbiAgICB9XG4gICAgdmFyIGxvYWRlciA9IG5ldyBBc3NldHNMb2FkZXIuTG9hZGVyKGNvbmZpZ3VyZShvcHRpb25zKSk7XG4gICAgcXVldWUucHVzaChsb2FkZXIpO1xuICAgIHJldHVybiBhc3NldHNMb2FkZXI7XG4gIH07XG5cbiAgdmFyIGdldCA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgcmV0dXJuIG1hcFtpZF07XG4gIH07XG5cbiAgdmFyIGNvbmZpZ3VyZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgdXJsID0gb3B0aW9ucztcbiAgICAgIG9wdGlvbnMgPSB7dXJsOiB1cmx9O1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmlzVG91Y2hMb2NrZWQgPT09IHVuZGVmaW5lZCkgeyBvcHRpb25zLmlzVG91Y2hMb2NrZWQgPSBpc1RvdWNoTG9ja2VkOyB9XG4gICAgaWYgKG9wdGlvbnMuYmxvYiA9PT0gdW5kZWZpbmVkKSB7IG9wdGlvbnMuYmxvYiA9IGJsb2I7IH1cblxuICAgIG9wdGlvbnMuaWQgPSBvcHRpb25zLmlkIHx8IG9wdGlvbnMudXJsO1xuICAgIG9wdGlvbnMudHlwZSA9IG9wdGlvbnMudHlwZSB8fCBvcHRpb25zLnVybC5zcGxpdCgnPycpWzBdLnNwbGl0KCcuJykucG9wKCkudG9Mb3dlckNhc2UoKTtcbiAgICBvcHRpb25zLmNyb3NzT3JpZ2luID0gb3B0aW9ucy5jcm9zc09yaWdpbiB8fCBjcm9zc09yaWdpbjtcbiAgICBvcHRpb25zLndlYkF1ZGlvQ29udGV4dCA9IG9wdGlvbnMud2ViQXVkaW9Db250ZXh0IHx8IHdlYkF1ZGlvQ29udGV4dDtcblxuICAgIHJldHVybiBvcHRpb25zO1xuICB9O1xuXG4gIHZhciBzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIG51bVRvdGFsID0gcXVldWUubGVuZ3RoO1xuXG4gICAgcXVldWUuZm9yRWFjaChmdW5jdGlvbihsb2FkZXIpIHtcbiAgICAgIGxvYWRlci5vbigncHJvZ3Jlc3MnLCBwcm9ncmVzc0hhbmRsZXIpO1xuICAgICAgbG9hZGVyLm9uY2UoJ2NvbXBsZXRlJywgY29tcGxldGVIYW5kbGVyKTtcbiAgICAgIGxvYWRlci5vbmNlKCdlcnJvcicsIGVycm9ySGFuZGxlcik7XG4gICAgICBsb2FkZXIuc3RhcnQoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBhc3NldHNMb2FkZXI7XG4gIH07XG5cbiAgdmFyIHByb2dyZXNzSGFuZGxlciA9IGZ1bmN0aW9uKHByb2dyZXNzKSB7XG4gICAgdmFyIGxvYWRlZCA9IG51bUxvYWRlZCArIHByb2dyZXNzO1xuICAgIGFzc2V0c0xvYWRlci5lbWl0KCdwcm9ncmVzcycsIGxvYWRlZCAvIG51bVRvdGFsKTtcbiAgfTtcblxuICB2YXIgY29tcGxldGVIYW5kbGVyID0gZnVuY3Rpb24oa2V5LCBmaWxlKSB7XG4gICAgbnVtTG9hZGVkKys7XG4gICAgYXNzZXRzTG9hZGVyLmVtaXQoJ3Byb2dyZXNzJywgbnVtTG9hZGVkIC8gbnVtVG90YWwpO1xuICAgIG1hcFtrZXldID0gZmlsZTtcbiAgICBmaWxlcy5wdXNoKGZpbGUpO1xuXG4gICAgYXNzZXRzTG9hZGVyLmVtaXQoJ2NoaWxkJywgZmlsZSk7XG4gICAgY2hlY2tDb21wbGV0ZSgpO1xuICB9O1xuXG4gIHZhciBlcnJvckhhbmRsZXIgPSBmdW5jdGlvbihlcnIpIHtcbiAgICBudW1Ub3RhbC0tO1xuICAgIGlmIChhc3NldHNMb2FkZXIubGlzdGVuZXJzKCdlcnJvcicpLmxlbmd0aCkge1xuICAgICAgYXNzZXRzTG9hZGVyLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH1cbiAgICBjaGVja0NvbXBsZXRlKCk7XG4gIH07XG5cbiAgdmFyIGNoZWNrQ29tcGxldGUgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAobnVtTG9hZGVkID49IG51bVRvdGFsKSB7XG4gICAgICBhc3NldHNMb2FkZXIuZW1pdCgnY29tcGxldGUnLCBmaWxlcywgbWFwKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICB3aGlsZSAocXVldWUubGVuZ3RoKSB7XG4gICAgICBxdWV1ZS5wb3AoKS5kZXN0cm95KCk7XG4gICAgfVxuICAgIGFzc2V0c0xvYWRlci5vZmYoJ2Vycm9yJyk7XG4gICAgYXNzZXRzTG9hZGVyLm9mZigncHJvZ3Jlc3MnKTtcbiAgICBhc3NldHNMb2FkZXIub2ZmKCdjb21wbGV0ZScpO1xuICAgIG1hcCA9IHt9O1xuICAgIGZpbGVzID0gW107XG4gICAgd2ViQXVkaW9Db250ZXh0ID0gbnVsbDtcbiAgICBudW1Ub3RhbCA9IDA7XG4gICAgbnVtTG9hZGVkID0gMDtcblxuICAgIHJldHVybiBhc3NldHNMb2FkZXI7XG4gIH07XG5cbiAgYXNzZXRzTG9hZGVyID0gT2JqZWN0LmNyZWF0ZShFbWl0dGVyLnByb3RvdHlwZSwge1xuICAgICAgX2V2ZW50czogeyB2YWx1ZToge30gfSxcbiAgICAgIGFkZDogeyB2YWx1ZTogYWRkIH0sXG4gICAgICBzdGFydDogeyB2YWx1ZTogc3RhcnQgfSxcbiAgICAgIGdldDogeyB2YWx1ZTogZ2V0IH0sXG4gICAgICBkZXN0cm95OiB7IHZhbHVlOiBkZXN0cm95IH1cbiAgfSk7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlnLmFzc2V0cykpIHtcbiAgICBhZGQoY29uZmlnLmFzc2V0cyk7XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmZyZWV6ZShhc3NldHNMb2FkZXIpO1xufVxuXG4vKlxuICogTG9hZGVyXG4gKi9cblxuQXNzZXRzTG9hZGVyLkxvYWRlciA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgdmFyIGlkID0gb3B0aW9ucy5pZDtcbiAgdmFyIHVybCA9IG9wdGlvbnMudXJsO1xuICB2YXIgdHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgdmFyIGNyb3NzT3JpZ2luID0gb3B0aW9ucy5jcm9zc09yaWdpbjtcbiAgdmFyIGlzVG91Y2hMb2NrZWQgPSBvcHRpb25zLmlzVG91Y2hMb2NrZWQ7XG4gIHZhciBibG9iID0gb3B0aW9ucy5ibG9iICYmIGJyb3dzZXJIYXNCbG9iO1xuICB2YXIgd2ViQXVkaW9Db250ZXh0ID0gb3B0aW9ucy53ZWJBdWRpb0NvbnRleHQ7XG5cbiAgdmFyIGxvYWRlcjtcbiAgdmFyIGxvYWRIYW5kbGVyO1xuICB2YXIgcmVxdWVzdDtcbiAgdmFyIHN0YXJ0VGltZTtcbiAgdmFyIHRpbWVvdXQ7XG5cbiAgdmFyIHN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnanNvbic6XG4gICAgICAgIGxvYWRKU09OKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnanBnJzpcbiAgICAgIGNhc2UgJ3BuZyc6XG4gICAgICBjYXNlICdnaWYnOlxuICAgICAgY2FzZSAnd2VicCc6XG4gICAgICAgIGxvYWRJbWFnZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21wMyc6XG4gICAgICBjYXNlICdvZ2cnOlxuICAgICAgY2FzZSAnb3B1cyc6XG4gICAgICBjYXNlICd3YXYnOlxuICAgICAgY2FzZSAnbTRhJzpcbiAgICAgICAgbG9hZEF1ZGlvKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnb2d2JzpcbiAgICAgIGNhc2UgJ21wNCc6XG4gICAgICBjYXNlICd3ZWJtJzpcbiAgICAgIGNhc2UgJ2hscyc6XG4gICAgICAgIGxvYWRWaWRlbygpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Jpbic6XG4gICAgICAgIGxvYWRYSFIoJ2FycmF5YnVmZmVyJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgJ0Fzc2V0c0xvYWRlciBFUlJPUjogVW5rbm93biB0eXBlIGZvciBmaWxlIHdpdGggVVJMOiAnICsgdXJsICsgJyAoJyArIHR5cGUgKyAnKSc7XG4gICAgfVxuICB9O1xuXG4gIHZhciBkaXNwYXRjaENvbXBsZXRlID0gZnVuY3Rpb24oZmlsZSkge1xuICAgIGlmICghZmlsZSkgeyByZXR1cm47IH1cbiAgICBsb2FkZXIuZW1pdCgncHJvZ3Jlc3MnLCAxKTtcbiAgICBsb2FkZXIuZW1pdCgnY29tcGxldGUnLCBpZCwgZmlsZSk7XG4gICAgcmVtb3ZlTGlzdGVuZXJzKCk7XG4gIH07XG5cbiAgdmFyIGxvYWRYSFIgPSBmdW5jdGlvbihyZXNwb25zZVR5cGUsIGN1c3RvbUxvYWRIYW5kbGVyKSB7XG4gICAgbG9hZEhhbmRsZXIgPSBjdXN0b21Mb2FkSGFuZGxlciB8fCBjb21wbGV0ZUhhbmRsZXI7XG5cbiAgICByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgcmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlO1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBwcm9ncmVzc0hhbmRsZXIpO1xuICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGxvYWRIYW5kbGVyKTtcbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JIYW5kbGVyKTtcbiAgICByZXF1ZXN0LnNlbmQoKTtcbiAgfTtcblxuICB2YXIgcHJvZ3Jlc3NIYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQubGVuZ3RoQ29tcHV0YWJsZSkge1xuICAgICAgbG9hZGVyLmVtaXQoJ3Byb2dyZXNzJywgZXZlbnQubG9hZGVkIC8gZXZlbnQudG90YWwpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgY29tcGxldGVIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHN1Y2Nlc3MoKSkge1xuICAgICAgZGlzcGF0Y2hDb21wbGV0ZShyZXF1ZXN0LnJlc3BvbnNlKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIHN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAocmVxdWVzdCAmJiByZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xuICAgICAgQXNzZXRzTG9hZGVyLnN0YXRzLnVwZGF0ZShyZXF1ZXN0LCBzdGFydFRpbWUsIHVybCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZXJyb3JIYW5kbGVyKHJlcXVlc3QgJiYgcmVxdWVzdC5zdGF0dXNUZXh0KTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgLy8ganNvblxuXG4gIHZhciBsb2FkSlNPTiA9IGZ1bmN0aW9uKCkge1xuICAgIGxvYWRYSFIoJ2pzb24nLCBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChzdWNjZXNzKCkpIHtcbiAgICAgICAgdmFyIGRhdGEgPSByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZGlzcGF0Y2hDb21wbGV0ZShkYXRhKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICAvLyBpbWFnZVxuXG4gIHZhciBsb2FkSW1hZ2UgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoYmxvYikge1xuICAgICAgbG9hZEltYWdlQmxvYigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2FkSW1hZ2VFbGVtZW50KCk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBsb2FkSW1hZ2VFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgcmVxdWVzdCA9IG5ldyBJbWFnZSgpO1xuICAgIGlmIChjcm9zc09yaWdpbikge1xuICAgICAgcmVxdWVzdC5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xuICAgIH1cbiAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JIYW5kbGVyLCBmYWxzZSk7XG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZWxlbWVudExvYWRIYW5kbGVyLCBmYWxzZSk7XG4gICAgcmVxdWVzdC5zcmMgPSB1cmw7XG4gIH07XG5cbiAgdmFyIGVsZW1lbnRMb2FkSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgZGlzcGF0Y2hDb21wbGV0ZShyZXF1ZXN0KTtcbiAgfTtcblxuICB2YXIgbG9hZEltYWdlQmxvYiA9IGZ1bmN0aW9uKCkge1xuICAgIGxvYWRYSFIoJ2Jsb2InLCBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChzdWNjZXNzKCkpIHtcbiAgICAgICAgdmFyIHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKHJlcXVlc3QucmVzcG9uc2UpO1xuICAgICAgICByZXF1ZXN0ID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvckhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgaW1hZ2VCbG9iSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICByZXF1ZXN0LnNyYyA9IHVybDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICB2YXIgaW1hZ2VCbG9iSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgZGlzcGF0Y2hDb21wbGV0ZShyZXF1ZXN0KTtcbiAgfTtcblxuICAvLyBhdWRpb1xuXG4gIHZhciBsb2FkQXVkaW8gPSBmdW5jdGlvbih3ZWJBdWRpb0NvbnRleHQpIHtcbiAgICBpZiAod2ViQXVkaW9Db250ZXh0KSB7XG4gICAgICBsb2FkQXVkaW9CdWZmZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9hZE1lZGlhRWxlbWVudCgnYXVkaW8nKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gdmlkZW9cblxuICB2YXIgbG9hZFZpZGVvID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKGJsb2IpIHtcbiAgICAgIGxvYWRYSFIoJ2Jsb2InKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9hZE1lZGlhRWxlbWVudCgndmlkZW8nKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gYXVkaW8gYnVmZmVyXG5cbiAgdmFyIGxvYWRBdWRpb0J1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgIGxvYWRYSFIoJ2FycmF5YnVmZmVyJywgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoc3VjY2VzcygpKSB7XG4gICAgICAgIHdlYkF1ZGlvQ29udGV4dC5kZWNvZGVBdWRpb0RhdGEoXG4gICAgICAgICAgcmVxdWVzdC5yZXNwb25zZSxcbiAgICAgICAgICBmdW5jdGlvbihidWZmZXIpIHtcbiAgICAgICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgICAgICAgZGlzcGF0Y2hDb21wbGV0ZShidWZmZXIpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZXJyb3JIYW5kbGVyKGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICAvLyBtZWRpYSBlbGVtZW50XG5cbiAgdmFyIGxvYWRNZWRpYUVsZW1lbnQgPSBmdW5jdGlvbih0YWdOYW1lKSB7XG4gICAgcmVxdWVzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG5cbiAgICBpZiAoIWlzVG91Y2hMb2NrZWQpIHtcbiAgICAgIC8vIHRpbWVvdXQgYmVjYXVzZSBzb21ldGltZXMgY2FucGxheXRocm91Z2ggZG9lc24ndCBmaXJlXG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgdGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KGVsZW1lbnRMb2FkSGFuZGxlciwgMjAwMCk7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgZWxlbWVudExvYWRIYW5kbGVyLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9ySGFuZGxlciwgZmFsc2UpO1xuICAgIHJlcXVlc3QucHJlbG9hZCA9ICdhdXRvJztcbiAgICByZXF1ZXN0LnNyYyA9IHVybDtcbiAgICByZXF1ZXN0LmxvYWQoKTtcblxuICAgIGlmIChpc1RvdWNoTG9ja2VkKSB7XG4gICAgICBkaXNwYXRjaENvbXBsZXRlKHJlcXVlc3QpO1xuICAgIH1cbiAgfTtcblxuICAvLyBlcnJvclxuXG4gIHZhciBlcnJvckhhbmRsZXIgPSBmdW5jdGlvbihlcnIpIHtcbiAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgdmFyIG1lc3NhZ2UgPSBlcnI7XG5cbiAgICBpZiAocmVxdWVzdCAmJiByZXF1ZXN0LnRhZ05hbWUgJiYgcmVxdWVzdC5lcnJvcikge1xuICAgICAgdmFyIEVSUk9SX1NUQVRFID0gWycnLCAnQUJPUlRFRCcsICdORVRXT1JLJywgJ0RFQ09ERScsICdTUkNfTk9UX1NVUFBPUlRFRCddO1xuICAgICAgbWVzc2FnZSA9ICdNZWRpYUVycm9yOiAnICsgRVJST1JfU1RBVEVbcmVxdWVzdC5lcnJvci5jb2RlXSArICcgJyArIHJlcXVlc3Quc3JjO1xuICAgIH0gZWxzZSBpZiAocmVxdWVzdCAmJiByZXF1ZXN0LnN0YXR1c1RleHQpIHtcbiAgICAgIG1lc3NhZ2UgPSByZXF1ZXN0LnN0YXR1c1RleHQ7XG4gICAgfSBlbHNlIGlmIChlcnIgJiYgZXJyLm1lc3NhZ2UpIHtcbiAgICAgIG1lc3NhZ2UgPSBlcnIubWVzc2FnZTtcbiAgICB9IGVsc2UgaWYgKGVyciAmJiBlcnIudHlwZSkge1xuICAgICAgbWVzc2FnZSA9IGVyci50eXBlO1xuICAgIH1cblxuICAgIGxvYWRlci5lbWl0KCdlcnJvcicsICdFcnJvciBsb2FkaW5nIFwiJyArIHVybCArICdcIiAnICsgbWVzc2FnZSk7XG5cbiAgICBkZXN0cm95KCk7XG4gIH07XG5cbiAgLy8gY2xlYW4gdXBcblxuICB2YXIgcmVtb3ZlTGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgbG9hZGVyLm9mZignZXJyb3InKTtcbiAgICBsb2FkZXIub2ZmKCdwcm9ncmVzcycpO1xuICAgIGxvYWRlci5vZmYoJ2NvbXBsZXRlJyk7XG5cbiAgICBpZiAocmVxdWVzdCkge1xuICAgICAgcmVxdWVzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHByb2dyZXNzSGFuZGxlcik7XG4gICAgICByZXF1ZXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBsb2FkSGFuZGxlcik7XG4gICAgICByZXF1ZXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JIYW5kbGVyKTtcbiAgICAgIHJlcXVlc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIGVsZW1lbnRMb2FkSGFuZGxlcik7XG4gICAgICByZXF1ZXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgZWxlbWVudExvYWRIYW5kbGVyKTtcbiAgICAgIHJlcXVlc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIGltYWdlQmxvYkhhbmRsZXIpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgIHJlbW92ZUxpc3RlbmVycygpO1xuXG4gICAgaWYgKHJlcXVlc3QgJiYgcmVxdWVzdC5hYm9ydCAmJiByZXF1ZXN0LnJlYWR5U3RhdGUgPCA0KSB7XG4gICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdCA9IG51bGw7XG4gICAgd2ViQXVkaW9Db250ZXh0ID0gbnVsbDtcblxuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dCk7XG4gIH07XG5cbiAgbG9hZGVyID0gT2JqZWN0LmNyZWF0ZShFbWl0dGVyLnByb3RvdHlwZSwge1xuICAgICAgX2V2ZW50czogeyB2YWx1ZToge30gfSxcbiAgICAgIHN0YXJ0OiB7IHZhbHVlOiBzdGFydCB9LFxuICAgICAgZGVzdHJveTogeyB2YWx1ZTogZGVzdHJveSB9XG4gIH0pO1xuXG4gIHJldHVybiBPYmplY3QuZnJlZXplKGxvYWRlcik7XG59O1xuXG4vKlxuICogU3RhdHNcbiAqL1xuXG5Bc3NldHNMb2FkZXIuc3RhdHMgPSB7XG4gIG1iczogMCxcbiAgc2VjczogMCxcbiAgdXBkYXRlOiBmdW5jdGlvbihyZXF1ZXN0LCBzdGFydFRpbWUsIHVybCkge1xuICAgIHZhciBsZW5ndGg7XG4gICAgdmFyIGhlYWRlcnMgPSByZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpO1xuICAgIGlmIChoZWFkZXJzKSB7XG4gICAgICB2YXIgbWF0Y2ggPSBoZWFkZXJzLm1hdGNoKC9jb250ZW50LWxlbmd0aDogKFxcZCspL2kpO1xuICAgICAgaWYgKG1hdGNoICYmIG1hdGNoLmxlbmd0aCkge1xuICAgICAgICBsZW5ndGggPSBtYXRjaFsxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gdmFyIGxlbmd0aCA9IHJlcXVlc3QuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtTGVuZ3RoJyk7XG4gICAgaWYgKGxlbmd0aCkge1xuICAgICAgbGVuZ3RoID0gcGFyc2VJbnQobGVuZ3RoLCAxMCk7XG4gICAgICB2YXIgbWJzID0gbGVuZ3RoIC8gMTAyNCAvIDEwMjQ7XG4gICAgICB2YXIgc2VjcyA9IChEYXRlLm5vdygpIC0gc3RhcnRUaW1lKSAvIDEwMDA7XG4gICAgICB0aGlzLnNlY3MgKz0gc2VjcztcbiAgICAgIHRoaXMubWJzICs9IG1icztcbiAgICAgIHRoaXMubG9nKHVybCwgbWJzLCBzZWNzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuLmNhbGwoY29uc29sZSwgJ0NhblxcJ3QgZ2V0IENvbnRlbnQtTGVuZ3RoOicsIHVybCk7XG4gICAgfVxuICB9LFxuICBsb2c6IGZ1bmN0aW9uKHVybCwgbWJzLCBzZWNzKSB7XG4gICAgY29uc29sZS5sb2cuY2FsbChjb25zb2xlLCB1cmwsIG1icywgc2Vjcyk7XG4gICAgaWYgKHVybCkge1xuICAgICAgdmFyIGZpbGUgPSAnRmlsZSBsb2FkZWQ6ICcgK1xuICAgICAgICAgICAgICAgICB1cmwuc3Vic3RyKHVybC5sYXN0SW5kZXhPZignLycpICsgMSkgK1xuICAgICAgICAgICAgICAgICAnIHNpemU6JyArIG1icy50b0ZpeGVkKDIpICsgJ21iJyArXG4gICAgICAgICAgICAgICAgICcgdGltZTonICsgc2Vjcy50b0ZpeGVkKDIpICsgJ3MnICtcbiAgICAgICAgICAgICAgICAgJyBzcGVlZDonICsgKG1icyAvIHNlY3MpLnRvRml4ZWQoMikgKyAnbWJwcyc7XG5cbiAgICAgIGNvbnNvbGUubG9nLmNhbGwoY29uc29sZSwgZmlsZSk7XG4gICAgfVxuICAgIHZhciB0b3RhbCA9ICdUb3RhbCBsb2FkZWQ6ICcgKyB0aGlzLm1icy50b0ZpeGVkKDIpICsgJ21iJyArXG4gICAgICAgICAgICAgICAgJyB0aW1lOicgKyB0aGlzLnNlY3MudG9GaXhlZCgyKSArICdzJyArXG4gICAgICAgICAgICAgICAgJyBzcGVlZDonICsgdGhpcy5nZXRNYnBzKCkudG9GaXhlZCgyKSArICdtYnBzJztcbiAgICBjb25zb2xlLmxvZy5jYWxsKGNvbnNvbGUsIHRvdGFsKTtcbiAgfSxcbiAgZ2V0TWJwczogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMubWJzIC8gdGhpcy5zZWNzO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFzc2V0c0xvYWRlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gQ3VlcG9pbnRzUmVhZGVyKCkge1xuICB2YXIgY3VlcG9pbnRzUmVhZGVyO1xuICB2YXIgZGlzcGF0Y2g7XG4gIHZhciBsaXN0ID0gW107XG4gIHZhciBjdXJyZW50UG9zaXRpb24gPSAwO1xuICB2YXIgbGFzdFBvc2l0aW9uID0gLTE7XG4gIHZhciB0b2xlcmFuY2UgPSAwLjI7XG5cbiAgdmFyIGFkZCA9IGZ1bmN0aW9uKHBvc2l0aW9uLCBuYW1lLCBkYXRhKSB7XG4gICAgbGlzdC5wdXNoKHtcbiAgICAgIHBvc2l0aW9uOiBwb3NpdGlvbixcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSk7XG5cbiAgICBsaXN0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgcmV0dXJuIGEucG9zaXRpb24gLSBiLnBvc2l0aW9uO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGN1ZXBvaW50c1JlYWRlcjtcbiAgfTtcblxuICB2YXIgb25DdWVwb2ludCA9IGZ1bmN0aW9uKGZuLCB0aGlzQXJnKSB7XG4gICAgaWYgKGZuKSB7XG4gICAgICBkaXNwYXRjaCA9IHRoaXNBcmcgPyBmbi5iaW5kKHRoaXNBcmcpIDogZm47XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BhdGNoID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGN1ZXBvaW50c1JlYWRlcjtcbiAgfTtcblxuICB2YXIgcmVtb3ZlQWxsID0gZnVuY3Rpb24oKSB7XG4gICAgbGlzdC5sZW5ndGggPSAwO1xuICAgIHJldHVybiByZXNldCgpO1xuICB9O1xuXG4gIHZhciByZXNldCA9IGZ1bmN0aW9uKCkge1xuICAgIGN1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgbGFzdFBvc2l0aW9uID0gLTE7XG4gICAgcmV0dXJuIGN1ZXBvaW50c1JlYWRlcjtcbiAgfTtcblxuICB2YXIgc2V0VG9sZXJhbmNlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB0b2xlcmFuY2UgPSB2YWx1ZTtcbiAgICByZXR1cm4gY3VlcG9pbnRzUmVhZGVyO1xuICB9O1xuXG4gIHZhciB1cGRhdGUgPSBmdW5jdGlvbihwb3NpdGlvbikge1xuICAgIGN1cnJlbnRQb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIGNoZWNrKGN1cnJlbnRQb3NpdGlvbiwgbGFzdFBvc2l0aW9uKTtcbiAgICBsYXN0UG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgcmV0dXJuIGN1ZXBvaW50c1JlYWRlcjtcbiAgfTtcblxuICB2YXIgY2hlY2sgPSBmdW5jdGlvbihjdXJyZW50UG9zaXRpb24sIGxhc3RQb3NpdGlvbikge1xuICAgIGlmIChjdXJyZW50UG9zaXRpb24gPD0gbGFzdFBvc2l0aW9uKSB7IHJldHVybjsgfVxuICAgIGlmICh0eXBlb2YgZGlzcGF0Y2ggIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuOyB9XG5cbiAgICBsaXN0LnNvbWUoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgaWYgKGluUmFuZ2UoaXRlbS5wb3NpdGlvbiwgY3VycmVudFBvc2l0aW9uLCBsYXN0UG9zaXRpb24pKSB7XG4gICAgICAgICAgZGlzcGF0Y2goaXRlbSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICB2YXIgaW5SYW5nZSA9IGZ1bmN0aW9uKGN1ZXBvaW50UG9zaXRpb24sIGN1cnJlbnRQb3NpdGlvbiwgbGFzdFBvc2l0aW9uKSB7XG4gICAgaWYgKGN1ZXBvaW50UG9zaXRpb24gPiBjdXJyZW50UG9zaXRpb24pIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKGN1ZXBvaW50UG9zaXRpb24gPD0gbGFzdFBvc2l0aW9uKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgdmFyIGRpZmYgPSBjdWVwb2ludFBvc2l0aW9uIC0gY3VycmVudFBvc2l0aW9uO1xuICAgIGlmIChkaWZmIDwgMCkgeyBkaWZmID0gLWRpZmY7IH1cbiAgICByZXR1cm4gZGlmZiA8PSB0b2xlcmFuY2U7XG4gIH07XG5cbiAgY3VlcG9pbnRzUmVhZGVyID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgYWRkOiBhZGQsXG4gICAgb25DdWVwb2ludDogb25DdWVwb2ludCxcbiAgICByZW1vdmVBbGw6IHJlbW92ZUFsbCxcbiAgICByZXNldDogcmVzZXQsXG4gICAgc2V0VG9sZXJhbmNlOiBzZXRUb2xlcmFuY2UsXG4gICAgdXBkYXRlOiB1cGRhdGVcbiAgfSk7XG5cbiAgcmV0dXJuIGN1ZXBvaW50c1JlYWRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDdWVwb2ludHNSZWFkZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG5cbmZ1bmN0aW9uIEVtaXR0ZXIoKSB7XG4gICAgRXZlbnRFbWl0dGVyLmNhbGwodGhpcyk7XG4gICAgdGhpcy5zZXRNYXhMaXN0ZW5lcnMoMjApO1xufVxuXG5FbWl0dGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXZlbnRFbWl0dGVyLnByb3RvdHlwZSk7XG5FbWl0dGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVtaXR0ZXI7XG5cbkVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgaWYgKGxpc3RlbmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgaWYgKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRW1pdHRlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCcuL0VtaXR0ZXInKTtcblxuZnVuY3Rpb24gRmFjZWJvb2soYXBwSWQpIHtcblxuICAgIHZhciBsb2FkU2NyaXB0VGltZW91dDtcblxuICAgIC8vIGluaXRpYWxpemUgRkIgYXBwXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5GQiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvKkZCLkV2ZW50LnN1YnNjcmliZSgnYXV0aC5zdGF0dXNDaGFuZ2UnLCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhdXRoLnN0YXR1c0NoYW5nZScsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT09ICdjb25uZWN0ZWQnKSB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7Ki9cbiAgICAgICAgICAgIEZCLmluaXQoe1xuICAgICAgICAgICAgICAgIGFwcElkOiBhcHBJZCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXG4gICAgICAgICAgICAgICAgY29va2llOiB0cnVlLFxuICAgICAgICAgICAgICAgIGxvZ2dpbmc6IHRydWUsXG4gICAgICAgICAgICAgICAgeGZibWw6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgRkIuZ2V0TG9naW5TdGF0dXMoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ2luaXQnLCByZXNwb25zZS5zdGF0dXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQobG9hZFNjcmlwdFRpbWVvdXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY2FsbGVkIGJ5IEZCcyBKUyB3aGVuIGZpbmlzaGVkIGxvYWRpbmdcbiAgICAgICAgICAgIHdpbmRvdy5mYkFzeW5jSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGluaXQoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBsb2dpblxuICAgIGZ1bmN0aW9uIGxvZ2luKGNhbGxiYWNrLCBwZXJtaXNzaW9ucykge1xuICAgICAgICBGQi5sb2dpbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgICdzY29wZSc6IChwZXJtaXNzaW9ucyB8fCAnJylcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgdGhhdCB1c2VyIGhhcyBncmFudGVkIHJlcXVpcmVkIHBlcm1pc3Npb25zIGFuZCByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGZ1bmN0aW9uIGNoZWNrUGVybWlzc2lvbnMoY2FsbGJhY2ssIHBlcm1pc3Npb25zKSB7XG4gICAgICAgIGlmIChwZXJtaXNzaW9ucyA9PT0gdW5kZWZpbmVkIHx8IHBlcm1pc3Npb25zID09PSAnJykge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEZCLmFwaSgnL21lL3Blcm1pc3Npb25zJywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgaGFzUGVybWlzc2lvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHBlcm1zID0gcGVybWlzc2lvbnMuc3BsaXQoJywnKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBlcm1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc1Blcm1pc3Npb24gPSAhIXJlc3BvbnNlLmRhdGFbMF1bcGVybXNbaV1dO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWhhc1Blcm1pc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChoYXNQZXJtaXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbG9naW4oY2FsbGJhY2ssIHBlcm1pc3Npb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNoZWNrIHVzZXIgbG9naW4gYW5kIHBlcm1pc3Npb24gc3RhdHVzXG4gICAgZnVuY3Rpb24gY2hlY2tBdXRoKGNhbGxiYWNrLCBwZXJtaXNzaW9ucykge1xuICAgICAgICBGQi5nZXRMb2dpblN0YXR1cyhmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gJ2Nvbm5lY3RlZCcpIHtcbiAgICAgICAgICAgICAgICBjaGVja1Blcm1pc3Npb25zKGNhbGxiYWNrLCBwZXJtaXNzaW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ2luKGNhbGxiYWNrLCBwZXJtaXNzaW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEluZm8ocGVybWlzc2lvbnMsIGZpZWxkcykge1xuICAgICAgICBjaGVja0F1dGgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBGQi5hcGkoJy9tZScsIHtcbiAgICAgICAgICAgICAgICAnZmllbGRzJzogZmllbGRzXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgnaW5mbycsIG51bGwpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgnaW5mbycsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgcGVybWlzc2lvbnMpO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSBGQiBjb250YWluZXIgYW5kIGxvYWQgc2NyaXB0XG4gICAgZnVuY3Rpb24gbG9hZFNjcmlwdCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5GQiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZicm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmYi1yb290Jyk7XG4gICAgICAgIGlmICghZmJyb290KSB7XG4gICAgICAgICAgICBmYnJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGZicm9vdC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2ZiLXJvb3QnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZmJyb290KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZmIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgZmIudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICBmYi5hc3luYyA9IHRydWU7XG4gICAgICAgIGZiLnNyYyA9IGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sICsgJy8vY29ubmVjdC5mYWNlYm9vay5uZXQvZW5fVVMvYWxsLmpzJztcbiAgICAgICAgZmJyb290LmFwcGVuZENoaWxkKGZiKTtcblxuICAgICAgICBsb2FkU2NyaXB0VGltZW91dCA9IHNldFRpbWVvdXQobG9hZFNjcmlwdCwgNjAwMCk7XG4gICAgfVxuXG4gICAgbG9hZFNjcmlwdCgpO1xuXG4gICAgLy8gcHVibGljXG4gICAgdmFyIHNlbGYgPSBPYmplY3QuY3JlYXRlKEVtaXR0ZXIucHJvdG90eXBlLCB7XG4gICAgICAgIF9ldmVudHM6IHtcbiAgICAgICAgICAgIHZhbHVlOiB7fVxuICAgICAgICB9LFxuICAgICAgICBpbml0OiB7XG4gICAgICAgICAgICB2YWx1ZTogaW5pdFxuICAgICAgICB9LFxuICAgICAgICBsb2dpbjoge1xuICAgICAgICAgICAgdmFsdWU6IGxvZ2luXG4gICAgICAgIH0sXG4gICAgICAgIHV0aWxzOiB7XG4gICAgICAgICAgICB2YWx1ZTogdXRpbHNcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0SW5mbzoge1xuICAgICAgICAgICAgdmFsdWU6IGdldEluZm9cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNlbGY7XG59XG5cbnZhciB1dGlscyA9IHtcbiAgICBnZXRQcm9maWxlSW1hZ2VVcmw6IGZ1bmN0aW9uKGlkLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCArICcvL2dyYXBoLmZhY2Vib29rLmNvbS8nICsgaWQgKyAnL3BpY3R1cmU/d2lkdGg9JyArIHdpZHRoICsgJyZoZWlnaHQ9JyArIGhlaWdodDtcbiAgICB9LFxuICAgIHJlc2l6ZUNhbnZhczogZnVuY3Rpb24oaGVpZ2h0KSB7XG4gICAgICAgIEZCLkNhbnZhcy5zZXRTaXplKHtcbiAgICAgICAgICAgICdoZWlnaHQnOiBoZWlnaHRcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBGQi5DYW52YXMuc2V0U2l6ZSh7XG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6IGhlaWdodFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH0sXG4gICAgc2Nyb2xsVG9Ub3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICBGQi5DYW52YXMuc2Nyb2xsVG8oMCwgMCk7XG4gICAgfSxcbiAgICBsb2dvdXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBGQi5FdmVudC5zdWJzY3JpYmUoJ2F1dGgubG9nb3V0JywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHZhciBzdWNjZXNzID0gcmVzcG9uc2UgJiYgIXJlc3BvbnNlLmVycm9yO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ29uRmFjZWJvb2tMb2dvdXRDb21wbGV0ZScsIHN1Y2Nlc3MpO1xuICAgICAgICB9KTtcbiAgICAgICAgRkIubG9nb3V0KCk7XG4gICAgfSxcbiAgICBnZXRGcmllbmRzOiBmdW5jdGlvbihsaW1pdCkge1xuICAgICAgICBGQi5hcGkoJy9tZS9mcmllbmRzJywge1xuICAgICAgICAgICAgbGltaXQ6IGxpbWl0XG4gICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldEZyaWVuZHMgRVJST1InKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgc29ydEZyaWVuZHNCeU11dHVhbDogZnVuY3Rpb24odXNlckRhdGEpIHtcbiAgICAgICAgdmFyIGZyaWVuZHMgPSB1c2VyRGF0YS5mcmllbmRzLmRhdGEuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICB2YXIgeCA9IGEubXV0dWFsZnJpZW5kcyA/IGEubXV0dWFsZnJpZW5kcy5kYXRhLmxlbmd0aCA6IDA7XG4gICAgICAgICAgICB2YXIgeSA9IGIubXV0dWFsZnJpZW5kcyA/IGIubXV0dWFsZnJpZW5kcy5kYXRhLmxlbmd0aCA6IDA7XG4gICAgICAgICAgICByZXR1cm4geSAtIHg7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZnJpZW5kcztcbiAgICB9LFxuICAgIC8qIHB1Ymxpc2ggc3RhdHVzIG1lc3NhZ2UgdG8gZmVlZC4gcmVxdWlyZXMgcHVibGlzaF9zdHJlYW0gcGVybWlzc2lvbiAqL1xuICAgIHN0YXR1c1B1Ymxpc2g6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgRkIuYXBpKCcvbWUvZmVlZCcsICdwb3N0Jywge1xuICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxuICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZSB8fCByZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbkZhY2Vib29rU3RhdHVzUHVibGlzaCBFUlJPUicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb25GYWNlYm9va1N0YXR1c1B1Ymxpc2ggU1VDQ0VTUycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIC8qIFNlbmQgYSBtZXNzYWdlICovXG4gICAgc2VuZERpYWxvZzogZnVuY3Rpb24oX2xpbmssIF9uYW1lLCBfZGVzY3JpcHRpb24sIF9waWN0dXJlLCBfdG8pIHtcbiAgICAgICAgRkIudWkoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ3NlbmQnLFxuICAgICAgICAgICAgICAgIHRvOiBfdG8sXG4gICAgICAgICAgICAgICAgbmFtZTogX25hbWUsXG4gICAgICAgICAgICAgICAgcGljdHVyZTogX3BpY3R1cmUsXG4gICAgICAgICAgICAgICAgbGluazogX2xpbmssXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ3BvcHVwJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogX2Rlc2NyaXB0aW9uXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmFjZWJvb2suc2VuZERpYWxvZycsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb25GYWNlYm9va1NlbmREaWFsb2dDb21wbGV0ZScsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbkZhY2Vib29rU2VuZERpYWxvZ0NvbXBsZXRlJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH0sXG4gICAgLyogUHVibGlzaCBhY3Rpb24uIHJlcXVpcmVzIHB1Ymxpc2hfYWN0aW9ucyBwZXJtaXNzaW9uICovXG4gICAgLypwdWJsaXNoQWN0aW9uOiBmdW5jdGlvbihhcHBJZCwgbmFtZXNwYWNlLCBhY3Rpb24sIHRhcmdldF9pZCwgcmVwZWF0ZXJVcmwsIG9iamVjdCwgdXJsLCBpbWFnZSkge1xuICAgICAgICB2YXIgb2JqZWN0UGFyYW1zID0gJ2ZiOmFwcF9pZD0nICsgYXBwSWQgKyAnJm9nOnR5cGU9JyArIG5hbWVzcGFjZSArICc6JyArIG9iamVjdCArICcmdXJsJyA9IHVybDtcbiAgICAgICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICd0YWdzJzogdGFyZ2V0X2lkLFxuICAgICAgICAgICAgJ2ltYWdlWzBdW3VybF0nOiBpbWFnZVxuICAgICAgICB9O1xuICAgICAgICBwYXJhbXNbb2JqZWN0XSA9IHJlcGVhdGVyVXJsICsgKHJlcGVhdGVyVXJsLmluZGV4T2YoJz8nKSA8IDAgPyAnPycgOiAnJicpICsgb2JqZWN0UGFyYW1zO1xuXG4gICAgICAgIEZCLmFwaSgnL21lLycgKyBuYW1lc3BhY2UgKyAnOicgKyBhY3Rpb24gKyAnPycgKyAkLnBhcmFtKHBhcmFtcyksICdwb3N0JywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggJ29uRmFjZWJvb2tQdWJsaXNoQWN0aW9uQ29tcGxldGUnLCBmYWxzZSApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggJ29uRmFjZWJvb2tQdWJsaXNoQWN0aW9uQ29tcGxldGUnLCB0cnVlICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sKi9cbiAgICAvKiBzdHJlYW0gcHVibGlzaCB3aXRoIGNvbmZpcm1hdGlvbiBhbmQgdXNlciBpbnB1dC4gcnF1aXJlcyBwdWJsaXNoX3N0cmVhbSBwZXJtaXNzaW9uICovXG4gICAgc3RyZWFtUHVibGlzaDogZnVuY3Rpb24obWVzc2FnZSwgYXR0YWNobWVudCwgYWN0aW9uX2xpbmtzLCB1c2VyX21lc3NhZ2VfcHJvbXB0LCB0YXJnZXRfaWQpIHtcbiAgICAgICAgdmFyIHB1Ymxpc2ggPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdzdHJlYW0ucHVibGlzaCcsXG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgYXR0YWNobWVudDogYXR0YWNobWVudCxcbiAgICAgICAgICAgIGFjdGlvbl9saW5rczogYWN0aW9uX2xpbmtzLFxuICAgICAgICAgICAgdXNlcl9tZXNzYWdlX3Byb21wdDogdXNlcl9tZXNzYWdlX3Byb21wdCxcbiAgICAgICAgICAgIHRhcmdldF9pZDogdGFyZ2V0X2lkXG4gICAgICAgIH07XG4gICAgICAgIEZCLnVpKHB1Ymxpc2gsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29uRmFjZWJvb2tTdHJlYW1QdWJsaXNoQ29tcGxldGUnLCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbkZhY2Vib29rU3RyZWFtUHVibGlzaENvbXBsZXRlJywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdGVzdF9zdHJlYW1QdWJsaXNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSAnbWVzc2FnZSc7XG4gICAgICAgIHZhciBhdHRhY2htZW50ID0ge1xuICAgICAgICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgICAgICAgY2FwdGlvbjogJ2NhcHRpb24nLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICBocmVmOiAnaHR0cDovL2V4YW1wbGUuY29tLydcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGFjdGlvbl9saW5rcyA9IFt7XG4gICAgICAgICAgICB0ZXh0OiAnYWN0aW9uX2xpbmsnLFxuICAgICAgICAgICAgaHJlZjogJ2h0dHA6Ly9leGFtcGxlLmNvbS8nXG4gICAgICAgIH1dO1xuICAgICAgICB2YXIgdXNlcl9tZXNzYWdlX3Byb21wdCA9ICd1c2VyX21lc3NhZ2VfcHJvbXB0JztcbiAgICAgICAgdGhpcy5zdHJlYW1QdWJsaXNoKG1lc3NhZ2UsIGF0dGFjaG1lbnQsIGFjdGlvbl9saW5rcywgdXNlcl9tZXNzYWdlX3Byb21wdCk7XG4gICAgfVxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBGYWNlYm9vaztcbn1cbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnLi9FbWl0dGVyJyksXHJcbiAgICBzd2ZvYmplY3QgPSB3aW5kb3cuc3dmb2JqZWN0O1xyXG5cclxuZnVuY3Rpb24gRmxhc2goZWxlbWVudCwgdXJsLCBlbWJlZHZhcnMsIGZsYXNodmFycykge1xyXG5cclxuICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XHJcbiAgICB0aGlzLmVsZW1lbnRJZCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdpZCcpO1xyXG4gICAgdGhpcy5mbGFzaElkID0gJ2ZsYXNoLScgKyB0aGlzLmVsZW1lbnRJZDtcclxuICAgIHRoaXMudXJsID0gdXJsO1xyXG4gICAgdGhpcy5lbWJlZHZhcnMgPSBlbWJlZHZhcnMgfHwge307XHJcbiAgICB0aGlzLmZsYXNodmFycyA9IGZsYXNodmFycyB8fCB7fTtcclxuXHJcbiAgICB0aGlzLmlzUmVhZHkgPSBmYWxzZTtcclxuICAgIHRoaXMucXVldWVkQ2FsbHMgPSBbXTtcclxufVxyXG5cclxuRmxhc2gucHJvdG90eXBlID0ge1xyXG4gICAgLypcclxuICAgICAqIEVtYmVkIG1haW4gZmxhc2ggYXBwXHJcbiAgICAgKi9cclxuICAgIGVtYmVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBRdWVyeXN0cmluZyB2YXJzXHJcbiAgICAgICAgdGhpcy5fZ2V0Rmxhc2h2YXJzRnJvbVF1ZXJ5U3RyaW5nKHRoaXMuZmxhc2h2YXJzKTtcclxuICAgICAgICAvLyBDaGVjayBwYXRoIGZvcm1hdFxyXG4gICAgICAgIHRoaXMuX2Zvcm1hdFBhdGhzKHRoaXMuZmxhc2h2YXJzKTtcclxuICAgICAgICAvLyBjaGVjayBmbGFzaCB2ZXJzaW9uXHJcbiAgICAgICAgdmFyIGZsYXNoVmVyc2lvbiA9IHN3Zm9iamVjdC5nZXRGbGFzaFBsYXllclZlcnNpb24oKTtcclxuICAgICAgICB2YXIgbWluVmVyc2lvbkFyciA9ICggdGhpcy5lbWJlZHZhcnMudmVyc2lvbiB8fCAnMTAuMi4wJyApLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgdmFyIG1pbk1ham9yID0gcGFyc2VJbnQobWluVmVyc2lvbkFyclswXSwgMTApO1xyXG4gICAgICAgIHZhciBtaW5NaW5vciA9IHBhcnNlSW50KG1pblZlcnNpb25BcnJbMV0sIDEwKTtcclxuXHJcbiAgICAgICAgdmFyIHJlc3VsdDtcclxuXHJcbiAgICAgICAgLy8gRGV0ZWN0IC8gRW1iZWRcclxuICAgICAgICBpZiAoZmxhc2hWZXJzaW9uLm1ham9yID09PSAwKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIEZsYXNoXHJcbiAgICAgICAgICAgIC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZsYXNoLXNpdGUnKS5pbm5lckhUTUwgPSBlbWJlZHZhcnMubm9GbGFzaEhUTUwgfHwgJzxkaXYgY2xhc3M9XCJlcnJvclwiPjxoMT5FcnJvcjwvaDE+PHA+PGEgaHJlZj1cImh0dHA6Ly9nZXQuYWRvYmUuY29tL2ZsYXNocGxheWVyL1wiIHRhcmdldD1cIl9ibGFua1wiPkZsYXNocGxheWVyICcgKyAoZW1iZWR2YXJzLnZlcnNpb24gfHwgJycpICsgJzwvYT4gaXMgcmVxdWlyZWQuPC9wPjwvZGl2Pic7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGZsYXNoVmVyc2lvbi5tYWpvciA8IG1pbk1ham9yIHx8IChmbGFzaFZlcnNpb24ubWFqb3IgPT09IG1pbk1ham9yICYmIGZsYXNoVmVyc2lvbi5taW5vciA8IG1pbk1pbm9yKSkge1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgRmxhc2hcclxuICAgICAgICAgICAgLy9kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmxhc2gtc2l0ZScpLmlubmVySFRNTCA9IGVtYmVkdmFycy51cGRhdGVGbGFzaEhUTUwgfHwgJzxkaXYgY2xhc3M9XCJlcnJvclwiPjxoMT5FcnJvcjwvaDE+PHA+PGEgaHJlZj1cImh0dHA6Ly9nZXQuYWRvYmUuY29tL2ZsYXNocGxheWVyL1wiIHRhcmdldD1cIl9ibGFua1wiPkZsYXNocGxheWVyICcgKyAoZW1iZWR2YXJzLnZlcnNpb24gfHwgJycpICsgJzwvYT4gaXMgcmVxdWlyZWQuPC9wPjwvZGl2Pic7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgJ21lbnUnOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICdxdWFsaXR5JzogJ2hpZ2gnLFxyXG4gICAgICAgICAgICAgICAgJ2JnY29sb3InOiAodGhpcy5lbWJlZHZhcnMuYmdDb2xvciB8fCAnI2ZmZmZmZicpLFxyXG4gICAgICAgICAgICAgICAgJ2FsbG93RnVsbFNjcmVlbic6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAnYWxsb3dGdWxsU2NyZWVuSW50ZXJhY3RpdmUnOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgJ2FsbG93U2NyaXB0QWNjZXNzJzogJ2Fsd2F5cycsXHJcbiAgICAgICAgICAgICAgICAnd21vZGUnOiAodGhpcy5lbWJlZHZhcnMud21vZGUgfHwgdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiB0aGlzLmZsYXNoSWQsXHJcbiAgICAgICAgICAgICAgICAnbmFtZSc6IHRoaXMuZmxhc2hJZFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc3dmb2JqZWN0LmVtYmVkU1dGKHRoaXMudXJsLCB0aGlzLmVsZW1lbnRJZCwgKHRoaXMuZW1iZWR2YXJzLndpZHRoIHx8ICcxMDAlJyksICh0aGlzLmVtYmVkdmFycy5oZWlnaHQgfHwgJzEwMCUnKSwgKHRoaXMuZW1iZWR2YXJzLnZlcnNpb24gfHwgJzEwLjIuMCcpLCB0aGlzLmZsYXNodmFycy5hc3NldHNQYXRoICsgJ3N3Zi9leHByZXNzSW5zdGFsbC5zd2YnLCB0aGlzLmZsYXNodmFycywgcGFyYW1zLCBhdHRyaWJ1dGVzKTtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdCA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgnZW1iZWQnLCByZXN1bHQpO1xyXG4gICAgfSxcclxuICAgIC8qXHJcbiAgICAgKiBHZXQgcmVmIHRvIEZsYXNoIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBnZXRGbGFzaE9iamVjdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHN3Zm9iamVjdC5nZXRPYmplY3RCeUlkKHRoaXMuZmxhc2hJZCk7XHJcbiAgICB9LFxyXG4gICAgLypcclxuICAgICAqIEZsYXNoIG11c3QgY2FsbCAnZmxhc2gucmVhZHknIHdoZW4gbG9hZGVkIGFuZCByZWFkeSB0byByZWNlaXZlIEpTIGNhbGxzXHJcbiAgICAgKi9cclxuICAgIHJlYWR5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiggdGhpcy5pc1JlYWR5ICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2ZsYXNoLnJlYWR5IGNhbGxlZCcpO1xyXG4gICAgICAgIHRoaXMuX2FwcGx5UXVldWVkQ2FsbHMoKTtcclxuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgncmVhZHknKTtcclxuICAgIH0sXHJcbiAgICAvKlxyXG4gICAgICogQ2FsbCBtZXRob2RzIGluIGZsYXNoXHJcbiAgICAgKlxyXG4gICAgICogRS5nLlxyXG4gICAgICogZmxhc2guY2FsbCggXCJvblNvbWVKU0FjdGlvbkNvbXBsZXRlXCIsIHJlc3BvbnNlICk7IC0gY2FsbHMgdGhlIEV4dGVybmFsSW50ZXJmYWNlIGNhbGwgYmFjayAnb25Tb21lSlNBY3Rpb25Db21wbGV0ZScgaW4gRmxhc2hcclxuICAgICAqIGZsYXNoLmNhbGwoXCJvbkZsYXNoRGlzcGF0Y2hlclwiLCBcIkhlbGxvXCIsIFwiV29ybGRcIiwge3Rlc3RPYmo6dHJ1ZX0sIGZhbHNlKTsgLSBjYW4gc2VuZCBtdWx0aXBsZSBhcmd1bWVudHMgLSBtYXggNCBhdCBtb21lbnQhXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBjYWxsOiBmdW5jdGlvbiggZnVuY3Rpb25OYW1lICkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmbGFzaC5jYWxsOiAnLCBmdW5jdGlvbk5hbWUsICdhcmd1bWVudHM6JywgKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykuc2xpY2UoMSkpKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmbGFzaE9iamVjdCA9IHRoaXMuZ2V0Rmxhc2hPYmplY3QoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZsYXNoIHJlYWR5OicsIHRoaXMuaXNSZWFkeSwgZmxhc2hPYmplY3QpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzUmVhZHkgJiYgZmxhc2hPYmplY3QgJiYgZmxhc2hPYmplY3RbIGZ1bmN0aW9uTmFtZSBdKXtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IGZpZ3VyZSBvdXQgaG93IHRvIGRvIHRoaXMgaW4gYSBjbGV2ZXIgd2F5IVxyXG4gICAgICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmbGFzaE9iamVjdFsgZnVuY3Rpb25OYW1lIF0oIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10sIGFyZ3VtZW50c1s0XSApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPiAzKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmxhc2hPYmplY3RbIGZ1bmN0aW9uTmFtZSBdKCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSwgYXJndW1lbnRzWzNdICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmbGFzaE9iamVjdFsgZnVuY3Rpb25OYW1lIF0oIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmbGFzaE9iamVjdFsgZnVuY3Rpb25OYW1lIF0oIGFyZ3VtZW50c1sxXSApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmxhc2hPYmplY3RbIGZ1bmN0aW9uTmFtZSBdKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmxhc2gucXVldWVkQ2FsbHMucHVzaDonLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xdWV1ZWRDYWxscy5wdXNoKGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmbGFzaC5jYWxsIEVSUk9SOicsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuICAgIC8qXHJcbiAgICAgKiBBbnkgSlMgbWV0aG9kcyBjYWxsZWQgYmVmb3JlIEZsYXNoIGxvYWRlZCB3aWxsIGJlIHF1ZXVlZCBhbmQgY2FsbGVkIHdoZW4gdGhpcyBtZXRob2QgaXMgY2FsbGVkLlxyXG4gICAgICovXHJcbiAgICBfYXBwbHlRdWV1ZWRDYWxsczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2ZsYXNoLl9hcHBseVF1ZXVlZENhbGxzJywgdGhpcy5xdWV1ZWRDYWxscy5sZW5ndGgpO1xyXG4gICAgICAgIHZhciBxdWV1ZWRDYWxscyA9IHRoaXMucXVldWVkQ2FsbHM7XHJcbiAgICAgICAgdmFyIGwgPSBxdWV1ZWRDYWxscy5sZW5ndGg7XHJcbiAgICAgICAgdmFyIGkgPSAwO1xyXG4gICAgICAgIHdoaWxlKGkgPCBsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbC5hcHBseSh0aGlzLCBxdWV1ZWRDYWxsc1tpXSk7XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5xdWV1ZWRDYWxscyA9IFtdO1xyXG4gICAgfSxcclxuICAgIC8qXHJcbiAgICAgKiBDaGVjayBRdWVyeXN0cmluZyBmb3IgRmxhc2h2YXIgdmFsdWVzXHJcbiAgICAgKi9cclxuICAgIF9nZXRGbGFzaHZhcnNGcm9tUXVlcnlTdHJpbmc6IGZ1bmN0aW9uKGZsYXNodmFycykge1xyXG4gICAgICAgIC8vIFNldCBGbGFzaHZhcnMgZnJvbSBRdWVyeSBTdHJpbmcgcGFyYW1zXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0Rmxhc2h2YXJGcm9tUXVlcnlTdHJpbmcocGFyYW0pIHtcclxuICAgICAgICAgICAgaWYgKHN3Zm9iamVjdC5nZXRRdWVyeVBhcmFtVmFsdWUocGFyYW0pKSB7XHJcbiAgICAgICAgICAgICAgICBmbGFzaHZhcnNbcGFyYW1dID0gc3dmb2JqZWN0LmdldFF1ZXJ5UGFyYW1WYWx1ZShwYXJhbSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmxhc2ggU2V0IGZsYXNodmFyIFxcJycgKyBwYXJhbSArICdcXCcgdG8gXFwnJyArIGZsYXNodmFyc1twYXJhbV0gKyAnXFwnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUXVlcnlTdHJpbmcgcGFyYW1zIHRvIG92ZXJ3cml0ZSBkZWZhdWx0IEZsYXNodmFyc1xyXG4gICAgICAgIGZ1bmN0aW9uIHF1ZXJ5UGFyYW1zVG9GbGFzaHZhcnMoZmxhc2h2YXJzKSB7XHJcbiAgICAgICAgICAgIGZvcih2YXIgcGFyYW0gaW4gZmxhc2h2YXJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmxhc2h2YXJzLmhhc093blByb3BlcnR5KHBhcmFtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEZsYXNodmFyRnJvbVF1ZXJ5U3RyaW5nKHBhcmFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBxdWVyeVBhcmFtc1RvRmxhc2h2YXJzKGZsYXNodmFycyk7XHJcbiAgICAgICAgLy8gTG9vayBmb3IgbG9jYWxlIGFuZCBkZWJ1ZyBwYXJhbXMgaWYgdGhleSBoYXZlbid0IGFscmVhZHkgYmVlbiBkZWZpbmVkXHJcbiAgICAgICAgaWYoIWZsYXNodmFycy5sb2NhbGUpIHtcclxuICAgICAgICAgICAgc2V0Rmxhc2h2YXJGcm9tUXVlcnlTdHJpbmcoJ2xvY2FsZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighZmxhc2h2YXJzLmRlYnVnKSB7XHJcbiAgICAgICAgICAgIHNldEZsYXNodmFyRnJvbVF1ZXJ5U3RyaW5nKCdkZWJ1ZycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighZmxhc2h2YXJzLmJ3KSB7XHJcbiAgICAgICAgICAgIHNldEZsYXNodmFyRnJvbVF1ZXJ5U3RyaW5nKCdidycpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKlxyXG4gICAgICogQ2hlY2sgcGF0aHMgZm9yIGNvcnJlY3QgZm9ybWF0dGluZ1xyXG4gICAgICovXHJcbiAgICBfZm9ybWF0UGF0aHM6IGZ1bmN0aW9uKGZsYXNodmFycykge1xyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSBwYXRocyBzdGFydCB3aXRoIHByb3RvY29sIGFuZCBlbmQgd2l0aCAnLydcclxuICAgICAgICBmdW5jdGlvbiBmb3JtYXRQYXRoKGlucHV0KSB7XHJcbiAgICAgICAgICAgIGlmKGlucHV0ICYmIGlucHV0Lmxhc3RJbmRleE9mKCcvJykgIT09IGlucHV0Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gaW5wdXQgKyAnLyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoaW5wdXQgJiYgaW5wdXQuc3Vic3RyKDAsMikgPT09ICcvLycpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgKyBpbnB1dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3JtYXRQYXRoKGZsYXNodmFycy5hc3NldHNQYXRoKTtcclxuICAgICAgICBmb3JtYXRQYXRoKGZsYXNodmFycy52aWRlb1BhdGgpO1xyXG4gICAgICAgIGZvcm1hdFBhdGgoZmxhc2h2YXJzLmF1ZGlvUGF0aCk7XHJcbiAgICAgICAgZm9ybWF0UGF0aChmbGFzaHZhcnMuYXBwUGF0aCk7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEZsYXNoO1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmZ1bmN0aW9uIEZQUyhlbCkge1xyXG5cclxuICAgIHZhciB0aW1lID0gMCxcclxuICAgICAgICBmcHMgPSAwLFxyXG4gICAgICAgIGN1cnJlbnRGcHMgPSAwLFxyXG4gICAgICAgIGF2ZXJhZ2VGcHMgPSAwLFxyXG4gICAgICAgIHRpY2tzID0gMCxcclxuICAgICAgICB0b3RhbEZwcyA9IDAsXHJcbiAgICAgICAgbGFzdEZwcyA9IDAsXHJcbiAgICAgICAgbGFzdEF2ZXJhZ2UgPSAwO1xyXG5cclxuICAgIGlmICghZWwpIHtcclxuICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnaWQnLCAnZnBzJyk7XHJcbiAgICAgICAgZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgIGVsLnN0eWxlLnRvcCA9ICcwcHgnO1xyXG4gICAgICAgIGVsLnN0eWxlLnJpZ2h0ID0gJzBweCc7XHJcbiAgICAgICAgZWwuc3R5bGUucGFkZGluZyA9ICcycHggNnB4JztcclxuICAgICAgICBlbC5zdHlsZS56SW5kZXggPSAnOTk5OTknO1xyXG4gICAgICAgIGVsLnN0eWxlLmJhY2tncm91bmQgPSAnIzAwMCc7XHJcbiAgICAgICAgZWwuc3R5bGUuY29sb3IgPSAnI2ZmZic7XHJcbiAgICAgICAgZWwuc3R5bGUuZm9udFNpemUgPSAnMTBweCc7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVwb3J0KCkge1xyXG4gICAgICAgIGlmIChjdXJyZW50RnBzID09PSBsYXN0RnBzICYmIGF2ZXJhZ2VGcHMgPT09IGxhc3RBdmVyYWdlKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxhc3RGcHMgPSBjdXJyZW50RnBzO1xyXG4gICAgICAgIGxhc3RBdmVyYWdlID0gYXZlcmFnZUZwcztcclxuICAgICAgICBlbC5pbm5lckhUTUwgPSAnRlBTOiAnICsgY3VycmVudEZwcyArICc8YnIgLz5BVkU6ICcgKyBhdmVyYWdlRnBzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZShub3cpIHtcclxuICAgICAgICBpZiAobm93ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgbm93ID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aW1lID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRpbWUgPSBub3c7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobm93IC0gMTAwMCA+IHRpbWUpIHtcclxuICAgICAgICAgICAgdGltZSA9IG5vdztcclxuICAgICAgICAgICAgY3VycmVudEZwcyA9IGZwcztcclxuICAgICAgICAgICAgZnBzID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50RnBzID4gMSkge1xyXG4gICAgICAgICAgICAgICAgdGlja3MgKys7XHJcbiAgICAgICAgICAgICAgICB0b3RhbEZwcyArPSBjdXJyZW50RnBzO1xyXG4gICAgICAgICAgICAgICAgYXZlcmFnZUZwcyA9IE1hdGguZmxvb3IodG90YWxGcHMgLyB0aWNrcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVwb3J0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmcHMrKztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhdXRvVXBkYXRlKCkge1xyXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYXV0b1VwZGF0ZSk7XHJcblxyXG4gICAgICAgIHVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgJ2F1dG9VcGRhdGUnOiBhdXRvVXBkYXRlLFxyXG4gICAgICAgICd1cGRhdGUnOiB1cGRhdGVcclxuICAgIH07XHJcbn1cclxuXHJcbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBGUFM7XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBHcmFwaGljcyhjYW52YXMpIHtcbiAgICB0aGlzLmluaXQoY2FudmFzKTtcbn1cblxuR3JhcGhpY3MucHJvdG90eXBlID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uKGNhbnZhcykge1xuICAgICAgICBpZiAoY2FudmFzKSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgICAgIHRoaXMuc2l6ZSh0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKSkge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKTtcbiAgICAgICAgICAgIHRoaXMuc2l6ZSh0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKTtcbiAgICAgICAgICAgIHRoaXMuc2l6ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgdGhpcy5fdGV4dEZvbnQgPSAnVGltZXMnO1xuICAgICAgICB0aGlzLl90ZXh0U2l6ZSA9IDEyO1xuICAgICAgICB0aGlzLmNvbnRleHQuZm9udCA9IHRoaXMuX3RleHRTaXplICsgJ3B4ICcgKyB0aGlzLl90ZXh0Rm9udDtcbiAgICB9LFxuICAgIHNpemU6IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGggfHwgd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB9LFxuICAgIGNsZWFyOiBmdW5jdGlvbihjb2xvcikge1xuICAgICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYmFja2dyb3VuZDogZnVuY3Rpb24ociwgZywgYikge1xuICAgICAgICB0aGlzLmNsZWFyKCdyZ2IoJyArIHIgKyAnLCAnICsgYiArICcsICcgKyBnICsgJyknKTtcbiAgICB9LFxuICAgIGZpbGw6IGZ1bmN0aW9uKHIsIGcsIGIsIGEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHI7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYSA9IGEgPT09IHVuZGVmaW5lZCA/IDEgOiBhO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoJyArIHIgKyAnLCAnICsgYiArICcsICcgKyBnICsgJywgJyArIGEgKyAnKSc7XG4gICAgfSxcbiAgICBzdHJva2U6IGZ1bmN0aW9uKHIsIGcsIGIsIGEpIHtcbiAgICAgICAgYSA9IGEgPT09IHVuZGVmaW5lZCA/IDEgOiBhO1xuICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSAncmdiYSgnICsgciArICcsICcgKyBiICsgJywgJyArIGcgKyAnLCAnICsgYSArICcpJztcbiAgICB9LFxuICAgIHN0cm9rZVdlaWdodDogZnVuY3Rpb24odykge1xuICAgICAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gdztcbiAgICB9LFxuICAgIG1vdmU6IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbyh4LCB5KTtcbiAgICB9LFxuICAgIGxpbmU6IGZ1bmN0aW9uKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbyh4MSwgeTEpO1xuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHgyLCB5Mik7XG4gICAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICB9LFxuICAgIHJlY3Q6IGZ1bmN0aW9uKHgsIHksIHdpZHRoLCBoZWlnaHQsIGFuZ2xlKSB7XG4gICAgICAgIGlmIChhbmdsZSAhPT0gdW5kZWZpbmVkICYmIGFuZ2xlICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnRyYW5zbGF0ZSh4ICsgd2lkdGggLyAyLCB5ICsgaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucm90YXRlKGFuZ2xlKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5yZWN0KC13aWR0aCAvIDIsIC1oZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjaXJjbGU6IGZ1bmN0aW9uKHgsIHksIHJhZGl1cykge1xuICAgICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY29udGV4dC5hcmMoeCwgeSwgcmFkaXVzLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfSxcbiAgICB0cmlhbmdsZTogZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodCwgYW5nbGUpIHtcbiAgICAgICAgaWYgKGFuZ2xlICE9PSB1bmRlZmluZWQgJiYgYW5nbGUgIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQudHJhbnNsYXRlKHgsIHkpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnJvdGF0ZShhbmdsZSk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQubW92ZVRvKDAgLSB3aWR0aCAvIDIsIDAgKyBoZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oMCwgMCAtIGhlaWdodCAvIDIpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbygwICsgd2lkdGggLyAyLCAwICsgaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbCgpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oeCAtIHdpZHRoIC8gMiwgeSArIGhlaWdodCAvIDIpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh4LCB5IC0gaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHggKyB3aWR0aCAvIDIsIHkgKyBoZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRyaWFuZ2xlQUJDOiBmdW5jdGlvbih4MSwgeTEsIHgyLCB5MiwgeDMsIHkzKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbyh4MSwgeTEpO1xuICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHgyLCB5Mik7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oeDMsIHkzKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gICAgfSxcbiAgICBpbWFnZTogZnVuY3Rpb24oaW1nLCB4LCB5LCBhbmdsZSkge1xuICAgICAgICBpZiAoYW5nbGUgIT09IHVuZGVmaW5lZCAmJiBhbmdsZSAhPT0gMCkge1xuICAgICAgICAgICAgdmFyIG9mZnNldFggPSBpbWcud2lkdGggLyAyLFxuICAgICAgICAgICAgICAgIG9mZnNldFkgPSBpbWcuaGVpZ2h0IC8gMjtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQudHJhbnNsYXRlKHggKyBvZmZzZXRYLCB5ICsgb2Zmc2V0WSk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucm90YXRlKGFuZ2xlKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoaW1nLCAtb2Zmc2V0WCwgLW9mZnNldFkpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoaW1nLCB4LCB5KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY3Jvc3M6IGZ1bmN0aW9uKHJhZGl1cykge1xuICAgICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oLXJhZGl1cywgLXJhZGl1cyk7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8ocmFkaXVzLCByYWRpdXMpO1xuICAgICAgICB0aGlzLmNvbnRleHQubW92ZVRvKC1yYWRpdXMsIHJhZGl1cyk7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8ocmFkaXVzLCAtcmFkaXVzKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIH0sXG4gICAgdGV4dDogZnVuY3Rpb24oc3RyLCB4LCB5KSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dChzdHIsIHgsIHkpO1xuICAgIH0sXG4gICAgdGV4dEZvbnQ6IGZ1bmN0aW9uKGZvbnQpIHtcbiAgICAgICAgdGhpcy5fdGV4dEZvbnQgPSBmb250O1xuICAgICAgICB0aGlzLmNvbnRleHQuZm9udCA9IHRoaXMuX3RleHRTaXplICsgJ3B4ICcgKyBmb250O1xuICAgIH0sXG4gICAgdGV4dFNpemU6IGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgICAgdGhpcy5fdGV4dFNpemUgPSBzaXplO1xuICAgICAgICB0aGlzLmNvbnRleHQuZm9udCA9IHNpemUgKyAncHggJyArIHRoaXMuX3RleHRGb250O1xuICAgIH0sXG4gICAgb3BlbkltYWdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHdpbiA9IHdpbmRvdy5vcGVuKCcnLCAnQ2FudmFzIEltYWdlJyksXG4gICAgICAgICAgICBzcmMgPSB0aGlzLmNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpO1xuICAgICAgICB3aW4uZG9jdW1lbnQud3JpdGUoJzxpbWcgc3JjPVwiJyArIHNyYyArXG4gICAgICAgICAgICAnXCIgd2lkdGg9XCInICsgdGhpcy53aWR0aCArXG4gICAgICAgICAgICAnXCIgaGVpZ2h0PVwiJyArIHRoaXMuaGVpZ2h0ICsgJ1wiIC8+Jyk7XG4gICAgfSxcbiAgICBkb3dubG9hZEltYWdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNyYyA9IHRoaXMuY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJykucmVwbGFjZSgnaW1hZ2UvcG5nJywgJ2ltYWdlL29jdGV0LXN0cmVhbScpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHNyYztcbiAgICB9LFxuICAgIGdldEltYWdlRGF0YTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9LFxuICAgIGdldFBpeGVsOiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIHZhciBpbWFnZURhdGEgPSB0aGlzLmdldEltYWdlRGF0YSgpO1xuICAgICAgICB2YXIgaSA9ICh4ICsgeSAqIGltYWdlRGF0YS53aWR0aCkgKiA0O1xuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoaW1hZ2VEYXRhLmRhdGEsIGksIGkgKyA0KTtcbiAgICB9LFxuICAgIHNldFBpeGVsOiBmdW5jdGlvbih4LCB5LCByLCBnLCBiLCBhKSB7XG4gICAgICAgIHZhciBpbWFnZURhdGEgPSB0aGlzLmdldEltYWdlRGF0YSgpO1xuICAgICAgICB2YXIgaSA9ICh4ICsgeSAqIGltYWdlRGF0YS53aWR0aCkgKiA0O1xuICAgICAgICBpbWFnZURhdGEuZGF0YVtpICsgMF0gPSByO1xuICAgICAgICBpbWFnZURhdGEuZGF0YVtpICsgMV0gPSBnO1xuICAgICAgICBpbWFnZURhdGEuZGF0YVtpICsgMl0gPSBiO1xuICAgICAgICBpbWFnZURhdGEuZGF0YVtpICsgM10gPSBhO1xuICAgIH0sXG4gICAgZWFjaFBpeGVsOiBmdW5jdGlvbihmbikge1xuICAgICAgICB2YXIgaW1hZ2VEYXRhID0gdGhpcy5nZXRJbWFnZURhdGEoKTtcbiAgICAgICAgdmFyIHBpeGVscyA9IGltYWdlRGF0YS5kYXRhO1xuICAgICAgICB2YXIgdyA9IGltYWdlRGF0YS53aWR0aDtcbiAgICAgICAgdmFyIGggPSBpbWFnZURhdGEuaGVpZ2h0O1xuXG4gICAgICAgIHZhciBsID0gdyAqIGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBnZXQgY29sb3Igb2YgcGl4ZWxcbiAgICAgICAgICAgIHZhciByID0gcGl4ZWxzW2kgKiA0XTsgLy8gUmVkXG4gICAgICAgICAgICB2YXIgZyA9IHBpeGVsc1tpICogNCArIDFdOyAvLyBHcmVlblxuICAgICAgICAgICAgdmFyIGIgPSBwaXhlbHNbaSAqIDQgKyAyXTsgLy8gQmx1ZVxuICAgICAgICAgICAgdmFyIGEgPSBwaXhlbHNbaSAqIDQgKyAzXTsgLy8gQWxwaGFcblxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBwb3NpdGlvbiBvZiBwaXhlbFxuICAgICAgICAgICAgdmFyIHkgPSBNYXRoLmZsb29yKGkgLyB3KTtcbiAgICAgICAgICAgIHZhciB4ID0gaSAtIHkgKiB3O1xuXG4gICAgICAgICAgICBmbihyLCBnLCBiLCBhLCB4LCB5KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gR3JhcGhpY3M7XG59XG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5mdW5jdGlvbiBJbnB1dENvb3JkcygpIHtcclxuXHR2YXIgc2VsZjtcclxuXHR2YXIgY2FsY3VsYXRlQ29vcmRzID0gKGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgZm47XHJcblx0XHRpZih0eXBlb2Ygd2luZG93LnBhZ2VYT2Zmc2V0ID09PSAnbnVtYmVyJyl7XHJcblx0XHRcdGZuID0gZnVuY3Rpb24oZSl7XHJcblx0XHRcdFx0dmFyIHBYID0gKGUuY2xpZW50WCB8fCAwKSxcclxuXHRcdFx0XHRcdHBZID0gKGUuY2xpZW50WSB8fCAwKSxcclxuXHRcdFx0XHRcdHNYID0gd2luZG93LnBhZ2VYT2Zmc2V0LFxyXG5cdFx0XHRcdFx0c1kgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblx0XHRcdFx0c2VsZi54ID0gcFgrc1g7XHJcblx0XHRcdFx0c2VsZi55ID0gcFkrc1k7XHJcblx0XHRcdFx0c2VsZi5wZXJjZW50WCA9IHNlbGYueCAvIHdpbmRvdy5pbm5lcldpZHRoO1xyXG5cdFx0XHRcdHNlbGYucGVyY2VudFkgPSBzZWxmLnkgLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0Zm4gPSBmdW5jdGlvbihlKXtcclxuXHRcdFx0XHRlID0gKGUgJiYgZS5jbGllbnRYKSA/IGUgOiB3aW5kb3cuZXZlbnQ7XHJcblx0XHRcdFx0dmFyIHBYID0gZS5jbGllbnRYLFxyXG5cdFx0XHRcdFx0cFkgPSBlLmNsaWVudFksXHJcblx0XHRcdFx0XHRkID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxyXG5cdFx0XHRcdFx0YiA9IGRvY3VtZW50LmJvZHksXHJcblx0XHRcdFx0XHRzWCA9IE1hdGgubWF4KGQuc2Nyb2xsTGVmdCwgYi5zY3JvbGxMZWZ0KSxcclxuXHRcdFx0XHRcdHNZID0gTWF0aC5tYXgoZC5zY3JvbGxUb3AsIGIuc2Nyb2xsVG9wKTtcclxuXHRcdFx0XHRzZWxmLnggPSBwWCtzWDtcclxuXHRcdFx0XHRzZWxmLnkgPSBwWStzWTtcclxuXHRcdFx0XHRzZWxmLnBlcmNlbnRYID0gc2VsZi54IC8gd2luZG93LmlubmVyV2lkdGg7XHJcblx0XHRcdFx0c2VsZi5wZXJjZW50WSA9IHNlbGYueSAvIHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmbjtcclxuXHR9KSgpO1xyXG5cclxuXHRzZWxmID0ge1xyXG5cdFx0eDogMCxcclxuXHRcdHk6IDAsXHJcblx0XHRwZXJjZW50WDogMCxcclxuXHRcdHBlcmNlbnRZOiAwLFxyXG5cdFx0aXNMaXN0ZW5pbmc6IGZhbHNlLFxyXG5cclxuXHRcdG9uOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBjYWxjdWxhdGVDb29yZHMpO1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGNhbGN1bGF0ZUNvb3Jkcyk7XHJcblx0XHRcdHNlbGYuaXNMaXN0ZW5pbmcgPSB0cnVlO1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH0sXHJcblx0XHRvZmY6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGNhbGN1bGF0ZUNvb3Jkcyk7XHJcblx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgY2FsY3VsYXRlQ29vcmRzKTtcclxuXHRcdFx0c2VsZi5pc0xpc3RlbmluZyA9IGZhbHNlO1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBzZWxmO1xyXG59XHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICAgIG1vZHVsZS5leHBvcnRzID0gSW5wdXRDb29yZHM7XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgS2V5Ym9hcmQgPSByZXF1aXJlKCcuL2tleWJvYXJkJyk7XG5cbmZ1bmN0aW9uIEtleUlucHV0KCkge1xuICAgIHZhciBrZXlzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gICAgICAgIGtleXMucHVzaChmYWxzZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGtleXNbZXZlbnQua2V5Q29kZV0gPSB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uS2V5VXAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAga2V5c1tldmVudC5rZXlDb2RlXSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBzZWxmID0ge1xuICAgICAgICBvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duLCBmYWxzZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uS2V5VXAsIGZhbHNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb2ZmOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24sIGZhbHNlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25LZXlVcCwgZmFsc2UpO1xuICAgICAgICB9LFxuICAgICAgICBpc0Rvd246IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGtleXNba2V5XTtcbiAgICAgICAgfSxcbiAgICAgICAgbGVmdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5c1tLZXlib2FyZC5MRUZUXSB8fCBrZXlzW0tleWJvYXJkLkFdO1xuICAgICAgICB9LFxuICAgICAgICByaWdodDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5c1tLZXlib2FyZC5SSUdIVF0gfHwga2V5c1tLZXlib2FyZC5EXTtcbiAgICAgICAgfSxcbiAgICAgICAgdXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGtleXNbS2V5Ym9hcmQuVVBdIHx8IGtleXNbS2V5Ym9hcmQuV107XG4gICAgICAgIH0sXG4gICAgICAgIGRvd246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGtleXNbS2V5Ym9hcmQuRE9XTl0gfHwga2V5c1tLZXlib2FyZC5TXTtcbiAgICAgICAgfSxcbiAgICAgICAgc3BhY2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGtleXNbS2V5Ym9hcmQuU1BBQ0VCQVJdO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHNlbGYub24oKTtcblxuICAgIHJldHVybiBzZWxmO1xufVxuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEtleUlucHV0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZnVuY3Rpb24gTGlua2VkTGlzdCgpIHtcclxuXHJcbiAgICB2YXIgZmlyc3QsXHJcbiAgICAgICAgbGFzdDtcclxuXHJcbiAgICAvKlxyXG4gICAgICAgIGl0ZW0gPSB7XHJcbiAgICAgICAgICAgICduZXh0JzogbnVsbCxcclxuICAgICAgICAgICAgJ3ByZXYnOiBudWxsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgaXRlbSA9IGxpbmtlZExpc3QuZ2V0Rmlyc3QoKTtcclxuICAgICAgICB3aGlsZShpdGVtKSB7XHJcbiAgICAgICAgICAgIC8vIGRvIHN0dWZmXHJcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLm5leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgKi9cclxuICAgIGZ1bmN0aW9uIGFkZChpdGVtKSB7XHJcbiAgICAgICAgaWYoIWZpcnN0KSB7XHJcbiAgICAgICAgICAgIGZpcnN0ID0gbGFzdCA9IGl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgaSA9IGZpcnN0O1xyXG4gICAgICAgICAgICB3aGlsZShpLm5leHQpIHtcclxuICAgICAgICAgICAgICAgIGkgPSBpLm5leHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5zZXJ0QWZ0ZXIoaXRlbSwgaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZShpdGVtKSB7XHJcbiAgICAgICAgaWYgKGl0ZW0ubmV4dCkge1xyXG4gICAgICAgICAgICBpdGVtLm5leHQucHJldiA9IGl0ZW0ucHJldjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGl0ZW0ucHJldikge1xyXG4gICAgICAgICAgICBpdGVtLnByZXYubmV4dCA9IGl0ZW0ubmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGl0ZW0gPT09IGZpcnN0KSB7XHJcbiAgICAgICAgICAgIGZpcnN0ID0gaXRlbS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXRlbSA9PT0gbGFzdCkge1xyXG4gICAgICAgICAgICBsYXN0ID0gaXRlbS5wcmV2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLm5leHQgPSBpdGVtLnByZXYgPSBudWxsO1xyXG5cclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbnNlcnRBZnRlcihpdGVtLCBhZnRlcikge1xyXG4gICAgICAgIHJlbW92ZShpdGVtKTtcclxuXHJcbiAgICAgICAgaXRlbS5wcmV2ID0gYWZ0ZXI7XHJcbiAgICAgICAgaXRlbS5uZXh0ID0gYWZ0ZXIubmV4dDtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIWFmdGVyLm5leHQpIHtcclxuICAgICAgICAgICAgbGFzdCA9IGl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhZnRlci5uZXh0LnByZXYgPSBpdGVtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWZ0ZXIubmV4dCA9IGl0ZW07XHJcblxyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluc2VydEJlZm9yZShpdGVtLCBiZWZvcmUpIHtcclxuICAgICAgICByZW1vdmUoaXRlbSk7XHJcblxyXG4gICAgICAgIGl0ZW0ucHJldiA9IGJlZm9yZS5wcmV2O1xyXG4gICAgICAgIGl0ZW0ubmV4dCA9IGJlZm9yZTtcclxuXHJcbiAgICAgICAgaWYgKCFiZWZvcmUucHJldikge1xyXG4gICAgICAgICAgICBmaXJzdCA9IGl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBiZWZvcmUucHJldi5uZXh0ID0gaXRlbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJlZm9yZS5wcmV2ID0gaXRlbTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFjaywgY2FsbGJhY2tDb250ZXh0KSB7XHJcbiAgICAgICAgaWYoIWZpcnN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc3BsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcclxuICAgICAgICBhcmdzLnVuc2hpZnQobnVsbCk7IC8vIG1ha2Ugc3BhY2UgZm9yIGl0ZW1cclxuXHJcbiAgICAgICAgdmFyIGl0ZW0gPSBmaXJzdDtcclxuICAgICAgICB3aGlsZShpdGVtKSB7XHJcbiAgICAgICAgICAgIGFyZ3NbMF0gPSBpdGVtO1xyXG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseShjYWxsYmFja0NvbnRleHQsIGFyZ3MpO1xyXG4gICAgICAgICAgICBpdGVtID0gaXRlbS5uZXh0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEZpcnN0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZpcnN0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0TGFzdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsYXN0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0Q291bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgY291bnQgPSAwO1xyXG4gICAgICAgICAgICB2YXIgaSA9IGZpcnN0O1xyXG4gICAgICAgICAgICB3aGlsZShpKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCArKztcclxuICAgICAgICAgICAgICAgIGkgPSBpLm5leHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ2FkZCc6IGFkZCxcclxuICAgICAgICAncmVtb3ZlJzogcmVtb3ZlLFxyXG4gICAgICAgICdpbnNlcnRBZnRlcic6IGluc2VydEFmdGVyLFxyXG4gICAgICAgICdpbnNlcnRCZWZvcmUnOiBpbnNlcnRCZWZvcmUsXHJcbiAgICAgICAgJ2ZvckVhY2gnOiBmb3JFYWNoXHJcbiAgICB9O1xyXG59XHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICAgIG1vZHVsZS5leHBvcnRzID0gTGlua2VkTGlzdDtcclxufVxyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJy4vRW1pdHRlcicpO1xyXG5cclxuZnVuY3Rpb24gTW91c2VXaGVlbChzcGVlZCkge1xyXG4gIHNwZWVkID0gc3BlZWQgfHwgMjtcclxuXHJcbiAgdmFyIG1vdXNlV2hlZWw7XHJcblxyXG4gIGZ1bmN0aW9uIGFkZCgpIHtcclxuICAgIGlmICgnb25tb3VzZXdoZWVsJyBpbiB3aW5kb3cpIHtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCBtb3VzZVdoZWVsSGFuZGxlciwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBtb3VzZVdoZWVsSGFuZGxlciwgZmFsc2UpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlKCkge1xyXG4gICAgaWYgKCdvbm1vdXNld2hlZWwnIGluIHdpbmRvdykge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIG1vdXNlV2hlZWxIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIG1vdXNlV2hlZWxIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBtb3VzZVdoZWVsSGFuZGxlcihldmVudCkge1xyXG4gICAgaWYgKCFldmVudCkgeyBldmVudCA9IHdpbmRvdy5ldmVudDsgfVxyXG4gICAgLy8gZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICB2YXIgZGlyZWN0aW9uID0gKGV2ZW50LmRldGFpbCA8IDAgfHwgZXZlbnQud2hlZWxEZWx0YSA+IDApID8gMSA6IC0xO1xyXG4gICAgdmFyIGRlbHRhID0gZGlyZWN0aW9uICogc3BlZWQ7XHJcblxyXG4gICAgaWYgKGRpcmVjdGlvbiA+IDApIHtcclxuICAgICAgbW91c2VXaGVlbC5lbWl0KCd1cCcsIGRlbHRhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG1vdXNlV2hlZWwuZW1pdCgnZG93bicsIGRlbHRhKTtcclxuICAgIH1cclxuXHJcbiAgICBtb3VzZVdoZWVsLmVtaXQoJ3VwZGF0ZScsIGRlbHRhKTtcclxuICB9XHJcblxyXG4gIGFkZCgpO1xyXG5cclxuICBtb3VzZVdoZWVsID0gT2JqZWN0LmNyZWF0ZShFbWl0dGVyLnByb3RvdHlwZSwge1xyXG4gICAgICBfZXZlbnRzOiB7IHZhbHVlOiB7fSB9LFxyXG4gICAgICBhZGQ6IHsgdmFsdWU6IGFkZCB9LFxyXG4gICAgICByZW1vdmU6IHsgdmFsdWU6IHJlbW92ZSB9XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBPYmplY3QuZnJlZXplKG1vdXNlV2hlZWwpO1xyXG59XHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICBtb2R1bGUuZXhwb3J0cyA9IE1vdXNlV2hlZWw7XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuZnVuY3Rpb24gT2JqZWN0UG9vbChUeXBlKSB7XHJcblxyXG4gICAgdmFyIHBvb2wgPSBbXTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldFBvb2w6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcG9vbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICggcG9vbC5sZW5ndGggPiAwICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvb2wucG9wKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFR5cGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlzcG9zZTogZnVuY3Rpb24oaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgcG9vbC5wdXNoKGluc3RhbmNlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZpbGw6IGZ1bmN0aW9uKGNvdW50KSB7XHJcbiAgICAgICAgICAgIHdoaWxlICggcG9vbC5sZW5ndGggPCBjb3VudCApIHtcclxuICAgICAgICAgICAgICAgIHBvb2xbcG9vbC5sZW5ndGhdID0gbmV3IFR5cGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW1wdHk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwb29sID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IE9iamVjdFBvb2w7XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCcuL0VtaXR0ZXInKTtcclxuXHJcbmZ1bmN0aW9uIFZpZGVvT2JqZWN0KHZpZGVvRWwpIHtcclxuICB2YXIgZWwgPSB2aWRlb0VsIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgdmFyIHBsYXllcjtcclxuXHJcbiAgdmFyIG1ldGFkYXRhSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcGxheWVyLmVtaXQoJ21ldGFkYXRhJywge1xyXG4gICAgICBzcmM6IHRoaXMuY3VycmVudFNyYyxcclxuICAgICAgd2lkdGg6IHRoaXMudmlkZW9XaWR0aCxcclxuICAgICAgaGVpZ2h0OiB0aGlzLnZpZGVvSGVpZ2h0LFxyXG4gICAgICBkdXJhdGlvbjogdGhpcy5kdXJhdGlvblxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgdmFyIGNhbnBsYXlIYW5kbGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICBwbGF5ZXIuZW1pdCgncmVhZHknKTtcclxuICB9O1xyXG5cclxuICB2YXIgcGxheUhhbmRsZXIgPSBmdW5jdGlvbigpIHtcclxuICAgIHBsYXllci5lbWl0KCdwbGF5Jyk7XHJcbiAgfTtcclxuXHJcbiAgdmFyIGVuZGVkSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcGxheWVyLmVtaXQoJ2VuZGVkJyk7XHJcbiAgfTtcclxuXHJcbiAgdmFyIGVycm9ySGFuZGxlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcGxheWVyLmVtaXQoJ2Vycm9yJywgZWwuZXJyb3IpO1xyXG4gIH07XHJcblxyXG4gIHZhciB0aW1ldXBkYXRlSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcGxheWVyLmVtaXQoJ3RpbWV1cGRhdGUnLCBlbC5jdXJyZW50VGltZSk7XHJcbiAgfTtcclxuXHJcbiAgdmFyIGFkZEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZW1vdmVFdmVudExpc3RlbmVycygpO1xyXG5cclxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgbWV0YWRhdGFIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIGNhbnBsYXlIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgcGxheUhhbmRsZXIsIGZhbHNlKTtcclxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXlpbmcnLCBwbGF5SGFuZGxlciwgZmFsc2UpO1xyXG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvckhhbmRsZXIsIGZhbHNlKTtcclxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgZW5kZWRIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdGltZXVwZGF0ZUhhbmRsZXIsIGZhbHNlKTtcclxuICB9O1xyXG5cclxuICB2YXIgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcclxuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgbWV0YWRhdGFIYW5kbGVyKTtcclxuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgY2FucGxheUhhbmRsZXIpO1xyXG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigncGxheScsIHBsYXlIYW5kbGVyKTtcclxuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BsYXlpbmcnLCBwbGF5SGFuZGxlcik7XHJcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9ySGFuZGxlcik7XHJcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdlbmRlZCcsIGVuZGVkSGFuZGxlcik7XHJcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdGltZXVwZGF0ZUhhbmRsZXIpO1xyXG4gIH07XHJcblxyXG4gIHZhciBkZXN0cm95ID0gZnVuY3Rpb24oKSB7XHJcbiAgICBwbGF5ZXIub2ZmKCk7XHJcbiAgICBlbC5wYXVzZSgpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XHJcbiAgICB9IGNhdGNoIChlKSB7fVxyXG5cclxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG4gICAgaWYgKGVsLnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgZWwucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgZWwgPSBudWxsO1xyXG5cclxuICAgIHJldHVybiBwbGF5ZXI7XHJcbiAgfTtcclxuXHJcbiAgdmFyIGxvYWQgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgIGlmKHdpbmRvdy5CbG9iICYmIHVybCBpbnN0YW5jZW9mIHdpbmRvdy5CbG9iKSB7XHJcbiAgICAgIHVybCA9IGdldEJsb2JVUkwodXJsKTtcclxuICAgIH1cclxuICAgIGFkZEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG4gICAgZWwuY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJztcclxuICAgIGVsLnByZWxvYWQgPSAnYXV0byc7XHJcbiAgICBlbC5zcmMgPSB1cmw7XHJcbiAgICBlbC5sb2FkKCk7XHJcblxyXG4gICAgcmV0dXJuIHBsYXllcjtcclxuICB9O1xyXG5cclxuICB2YXIgcGxheSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgZWwucGxheSgpO1xyXG5cclxuICAgIHJldHVybiBwbGF5ZXI7XHJcbiAgfTtcclxuXHJcbiAgdmFyIHBhdXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICBlbC5wYXVzZSgpO1xyXG5cclxuICAgIHJldHVybiBwbGF5ZXI7XHJcbiAgfTtcclxuXHJcbiAgdmFyIHNlZWsgPSBmdW5jdGlvbih0aW1lKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBlbC5jdXJyZW50VGltZSA9IHRpbWU7XHJcbiAgICB9IGNhdGNoIChlKSB7fVxyXG5cclxuICAgIHJldHVybiBwbGF5ZXI7XHJcbiAgfTtcclxuXHJcbiAgdmFyIGdldEJsb2JVUkwgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgIHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKHVybCk7XHJcbiAgICB2YXIgcmV2b2tlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgcmV2b2tlKTtcclxuICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcclxuICAgIH07XHJcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIHJldm9rZSk7XHJcbiAgICByZXR1cm4gdXJsO1xyXG4gIH07XHJcblxyXG4gIGFkZEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG4gIHBsYXllciA9IE9iamVjdC5jcmVhdGUoRW1pdHRlci5wcm90b3R5cGUsIHtcclxuICAgICAgX2V2ZW50czogeyB2YWx1ZToge30gfSxcclxuICAgICAgZGVzdHJveTogeyB2YWx1ZTogZGVzdHJveSB9LFxyXG4gICAgICBsb2FkOiB7IHZhbHVlOiBsb2FkIH0sXHJcbiAgICAgIHBhdXNlOiB7IHZhbHVlOiBwYXVzZSB9LFxyXG4gICAgICBwbGF5OiB7IHZhbHVlOiBwbGF5IH0sXHJcbiAgICAgIHNlZWs6IHsgdmFsdWU6IHNlZWsgfSxcclxuICAgICAgZWw6IHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIGVsO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgY3VycmVudFRpbWU6IHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIGVsLmN1cnJlbnRUaW1lO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgZWwuY3VycmVudFRpbWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGR1cmF0aW9uOiB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiBlbC5kdXJhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIHZvbHVtZToge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gZWwudm9sdW1lO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgZWwudm9sdW1lID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBPYmplY3QuZnJlZXplKHBsYXllcik7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVmlkZW9PYmplY3Q7XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBBcnJheVV0aWxzID0ge1xyXG4gICAgY2xvbmU6IGZ1bmN0aW9uKGFycikge1xyXG4gICAgICAgIHJldHVybiBhcnIuc2xpY2UoMCk7XHJcbiAgICB9LFxyXG4gICAgZ2V0UmFuZG9tOiBmdW5jdGlvbihhcnIpIHtcclxuICAgICAgICByZXR1cm4gYXJyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpXTtcclxuICAgIH0sXHJcbiAgICBpc0FycmF5OiBmdW5jdGlvbihhcnIpIHtcclxuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSA/IEFycmF5LmlzQXJyYXkoYXJyKSA6IGFyciAmJiBhcnIgaW5zdGFuY2VvZiBBcnJheTtcclxuICAgIH0sXHJcbiAgICBuZWFyZXN0OiBmdW5jdGlvbih2YWx1ZSwgYXJyKSB7XHJcbiAgICAgICAgdmFyIGxlYXN0ID0gTnVtYmVyLk1BWF9WQUxVRSwgZGlmZjtcclxuICAgICAgICByZXR1cm4gYXJyLnJlZHVjZShmdW5jdGlvbihpbmRleCwgaXRlbSwgaSkge1xyXG4gICAgICAgICAgICBkaWZmID0gTWF0aC5hYnMoaXRlbSAtIHZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKGRpZmYgPCBsZWFzdCkge1xyXG4gICAgICAgICAgICAgICAgbGVhc3QgPSBkaWZmO1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9LCAtMSk7XHJcbiAgICB9LFxyXG4gICAgc29ydE51bWVyaWM6IGZ1bmN0aW9uKGFycikge1xyXG4gICAgICAgIHJldHVybiBhcnIuc29ydChmdW5jdGlvbihhLGIpe1xyXG4gICAgICAgICAgICByZXR1cm4gYSAtIGI7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc29ydFJhbmRvbTogZnVuY3Rpb24oYXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIGFyci5zb3J0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpID4gMC41ID8gLTEgOiAxO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEFycmF5VXRpbHM7XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcclxuXHJcbi8qIGFuZHJvaWQgKi9cclxuXHJcbmZ1bmN0aW9uIGFuZHJvaWQoKSB7XHJcbiAgICByZXR1cm4gISF1YS5tYXRjaCgvQW5kcm9pZC9pKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYW5kcm9pZE9sZCgpIHtcclxuICAgIHJldHVybiAhIShhbmRyb2lkKCkgJiYgcGFyc2VGbG9hdCh1YS5zbGljZSh1YS5pbmRleE9mKCdBbmRyb2lkJykrOCkpIDwgNCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFuZHJvaWRTdG9jaygpIHtcclxuICAgIGlmKCFhbmRyb2lkKCkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB2YXIgcmVnRXhBcHBsZVdlYktpdCA9IG5ldyBSZWdFeHAoL0FwcGxlV2ViS2l0XFwvKFtcXGQuXSspLyk7XHJcbiAgICB2YXIgcmVzdWx0QXBwbGVXZWJLaXRSZWdFeCA9IHJlZ0V4QXBwbGVXZWJLaXQuZXhlYyh1YSk7XHJcbiAgICB2YXIgYXBwbGVXZWJLaXRWZXJzaW9uID0gKHJlc3VsdEFwcGxlV2ViS2l0UmVnRXggPT09IG51bGwgPyBudWxsIDogcGFyc2VGbG9hdChyZWdFeEFwcGxlV2ViS2l0LmV4ZWModWEpWzFdKSk7XHJcbiAgICB2YXIgaXNBbmRyb2lkQnJvd3NlciA9IGFwcGxlV2ViS2l0VmVyc2lvbiAhPT0gbnVsbCAmJiBhcHBsZVdlYktpdFZlcnNpb24gPCA1Mzc7XHJcbiAgICByZXR1cm4gaXNBbmRyb2lkQnJvd3NlcjtcclxufVxyXG5cclxuLyogZHByICovXHJcblxyXG5mdW5jdGlvbiBkcHIoKSB7XHJcbiAgICByZXR1cm4gd2luZG93LmRldmljZVBpeGVsUmF0aW8gIT09IHVuZGVmaW5lZCA/IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIDogMTtcclxufVxyXG5cclxuLyogaWUgKi9cclxuXHJcbmZ1bmN0aW9uIGllOGRvd24oKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gJzwhLS1baWYgbHRlIElFIDhdPjxpPjwvaT48IVtlbmRpZl0tLT4nO1xyXG4gICAgcmV0dXJuIChkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2knKS5sZW5ndGggPT09IDEpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpZTlkb3duKCkge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9ICc8IS0tW2lmIElFXT48aT48L2k+PCFbZW5kaWZdLS0+JztcclxuICAgIHJldHVybiAoZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpJykubGVuZ3RoID09PSAxKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaWVWZXJzaW9uKCkge1xyXG4gICAgdmFyIHJ2ID0gLTEsXHJcbiAgICAgICAgcmUsXHJcbiAgICAgICAgdWE7XHJcbiAgICBpZiAobmF2aWdhdG9yLmFwcE5hbWUgPT09ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInKSB7XHJcbiAgICAgICAgdWEgPSB1YTtcclxuICAgICAgICByZSAgPSBuZXcgUmVnRXhwKCdNU0lFIChbMC05XXsxLH1bLjAtOV17MCx9KScpO1xyXG4gICAgICAgIGlmIChyZS5leGVjKHVhKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBydiA9IHBhcnNlRmxvYXQoIFJlZ0V4cC4kMSApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKG5hdmlnYXRvci5hcHBOYW1lID09PSAnTmV0c2NhcGUnKVxyXG4gICAge1xyXG4gICAgICAgIHVhID0gdWE7XHJcbiAgICAgICAgcmUgID0gbmV3IFJlZ0V4cCgnVHJpZGVudC8uKnJ2OihbMC05XXsxLH1bLjAtOV17MCx9KScpO1xyXG4gICAgICAgIGlmIChyZS5leGVjKHVhKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBydiA9IHBhcnNlRmxvYXQoIFJlZ0V4cC4kMSApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBydjtcclxufVxyXG5cclxuLyogaW9zICovXHJcblxyXG5mdW5jdGlvbiBpb3M1KCkge1xyXG4gICAgcmV0dXJuICEhKHVhLm1hdGNoKC9PUyA1KF9cXGQpKyBsaWtlIE1hYyBPUyBYL2kpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXBhZCgpIHtcclxuICAgIHJldHVybiAhIXVhLm1hdGNoKC9pUGFkL2kpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpcGhvbmUoKSB7XHJcbiAgICByZXR1cm4gISF1YS5tYXRjaCgvaVBob25lL2kpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpcG9kKCkge1xyXG4gICAgcmV0dXJuICEhdWEubWF0Y2goL2lQb2QvaSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlvcygpIHtcclxuICAgIHJldHVybiAoaXBhZCgpIHx8IGlwb2QoKSB8fCBpcGhvbmUoKSk7XHJcbn1cclxuXHJcbi8qIG1vYmlsZSAqL1xyXG5cclxuZnVuY3Rpb24gbW9iaWxlKCkge1xyXG4gICAgcmV0dXJuICEhdWEubWF0Y2goL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaSk7XHJcbn1cclxuXHJcbi8vIHNjcmVlbi53aWR0aCAvIHNjcmVlbi5oZWlnaHQgaXMgb2Z0ZW4gd3JvbmcgaW4gQW5kcm9pZFxyXG5cclxuZnVuY3Rpb24gc2NyZWVuSGVpZ2h0KCkge1xyXG4gICAgcmV0dXJuIE1hdGgubWF4KHdpbmRvdy5vdXRlckhlaWdodCwgd2luZG93LnNjcmVlbi5oZWlnaHQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzY3JlZW5XaWR0aCgpIHtcclxuICAgIHJldHVybiBNYXRoLm1heCh3aW5kb3cub3V0ZXJXaWR0aCwgd2luZG93LnNjcmVlbi53aWR0aCk7XHJcbn1cclxuXHJcbnZhciBEZXZpY2UgPSB7XHJcbiAgICAnYW5kcm9pZCc6IGFuZHJvaWQoKSxcclxuICAgICdhbmRyb2lkT2xkJzogYW5kcm9pZE9sZCgpLFxyXG4gICAgJ2FuZHJvaWRTdG9jayc6IGFuZHJvaWRTdG9jaygpLFxyXG4gICAgJ2Rwcic6IGRwcigpLFxyXG4gICAgJ2llOGRvd24nOiBpZThkb3duKCksXHJcbiAgICAnaWU5ZG93bic6IGllOWRvd24oKSxcclxuICAgICdpZVZlcnNpb24nOiBpZVZlcnNpb24oKSxcclxuICAgICdpb3MnOiBpb3MoKSxcclxuICAgICdpb3M1JzogaW9zNSgpLFxyXG4gICAgJ2lwYWQnOiBpcGFkKCksXHJcbiAgICAnaXBob25lJzogaXBob25lKCksXHJcbiAgICAnaXBvZCc6IGlwb2QoKSxcclxuICAgICdtb2JpbGUnOiBtb2JpbGUoKSxcclxuICAgICdyZXRpbmEnOiAoZHByKCkgPiAxKSxcclxuICAgICdzY3JlZW5IZWlnaHQnOiBzY3JlZW5IZWlnaHQoKSxcclxuICAgICdzY3JlZW5XaWR0aCc6IHNjcmVlbldpZHRoKClcclxufTtcclxuXHJcbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBEZXZpY2U7XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJy4vRW1pdHRlcicpO1xuXG52YXIgRnVsbHNjcmVlbiA9IChmdW5jdGlvbigpIHtcblxuICAgIHZhciBzZWxmLFxuICAgICAgICBlbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcbiAgICAgICAgaXNTdXBwb3J0ZWQgPSAhIShlbC5yZXF1ZXN0RnVsbFNjcmVlbiB8fCBlbC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbiB8fCBlbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbik7XG5cbiAgICBmdW5jdGlvbiBvbkZ1bGxzY3JlZW5DaGFuZ2UoKSB7XG4gICAgICAgIHNlbGYuZW1pdCgnY2hhbmdlJywgc2VsZi5pc0Z1bGxzY3JlZW4oKSk7XG4gICAgfVxuXG4gICAgaWYgKGlzU3VwcG9ydGVkKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBvbkZ1bGxzY3JlZW5DaGFuZ2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3pmdWxsc2NyZWVuY2hhbmdlJywgb25GdWxsc2NyZWVuQ2hhbmdlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsIG9uRnVsbHNjcmVlbkNoYW5nZSk7XG4gICAgICAgIC8vZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbXNmdWxsc2NyZWVuY2hhbmdlJywgb25GdWxsc2NyZWVuQ2hhbmdlKTtcbiAgICB9XG5cbiAgICBzZWxmID0gT2JqZWN0LmNyZWF0ZShFbWl0dGVyLnByb3RvdHlwZSwge1xuICAgICAgICBfZXZlbnRzOiB7XG4gICAgICAgICAgICB2YWx1ZToge31cbiAgICAgICAgfSxcbiAgICAgICAgaXNTdXBwb3J0ZWQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBpc1N1cHBvcnRlZFxuICAgICAgICB9LFxuICAgICAgICBlbnRlcjoge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICB2YXIgbWV0aG9kID0gZWxlbWVudC5yZXF1ZXN0RnVsbFNjcmVlbiB8fCBlbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuIHx8IGVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW47IC8vIHx8IGVsZW1lbnQubXNSZXF1ZXN0RnVsbHNjcmVlbjtcblxuICAgICAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmNhbGwoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBleGl0OiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1ldGhvZCA9IGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuIHx8IGRvY3VtZW50LmNhbmNlbEZ1bGxTY3JlZW4gfHwgZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlbiB8fCBkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuOyAvLyB8fCBkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2QuY2FsbChkb2N1bWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0b2dnbGU6IHtcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNGdWxsc2NyZWVuKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leGl0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRlcihlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRnVsbHNjcmVlbjoge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhIShkb2N1bWVudC5mdWxsU2NyZWVuIHx8IGRvY3VtZW50LndlYmtpdElzRnVsbFNjcmVlbiB8fCBkb2N1bWVudC5tb3pGdWxsU2NyZWVuKTsgLy8gfHwgZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudCApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2VsZjtcblxufSgpKTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBGdWxsc2NyZWVuO1xufVxuIiwidmFyIEtleWJvYXJkID0ge1xyXG5cdEE6ICdBJy5jaGFyQ29kZUF0KDApLFxyXG5cdEI6ICdCJy5jaGFyQ29kZUF0KDApLFxyXG5cdEM6ICdDJy5jaGFyQ29kZUF0KDApLFxyXG5cdEQ6ICdEJy5jaGFyQ29kZUF0KDApLFxyXG5cdEU6ICdFJy5jaGFyQ29kZUF0KDApLFxyXG5cdEY6ICdGJy5jaGFyQ29kZUF0KDApLFxyXG5cdEc6ICdHJy5jaGFyQ29kZUF0KDApLFxyXG5cdEg6ICdIJy5jaGFyQ29kZUF0KDApLFxyXG5cdEk6ICdJJy5jaGFyQ29kZUF0KDApLFxyXG5cdEo6ICdKJy5jaGFyQ29kZUF0KDApLFxyXG5cdEs6ICdLJy5jaGFyQ29kZUF0KDApLFxyXG5cdEw6ICdMJy5jaGFyQ29kZUF0KDApLFxyXG5cdE06ICdNJy5jaGFyQ29kZUF0KDApLFxyXG5cdE46ICdOJy5jaGFyQ29kZUF0KDApLFxyXG5cdE86ICdPJy5jaGFyQ29kZUF0KDApLFxyXG5cdFA6ICdQJy5jaGFyQ29kZUF0KDApLFxyXG5cdFE6ICdRJy5jaGFyQ29kZUF0KDApLFxyXG5cdFI6ICdSJy5jaGFyQ29kZUF0KDApLFxyXG5cdFM6ICdTJy5jaGFyQ29kZUF0KDApLFxyXG5cdFQ6ICdUJy5jaGFyQ29kZUF0KDApLFxyXG5cdFU6ICdVJy5jaGFyQ29kZUF0KDApLFxyXG5cdFY6ICdWJy5jaGFyQ29kZUF0KDApLFxyXG5cdFc6ICdXJy5jaGFyQ29kZUF0KDApLFxyXG5cdFg6ICdYJy5jaGFyQ29kZUF0KDApLFxyXG5cdFk6ICdZJy5jaGFyQ29kZUF0KDApLFxyXG5cdFo6ICdaJy5jaGFyQ29kZUF0KDApLFxyXG5cdFpFUk86ICcwJy5jaGFyQ29kZUF0KDApLFxyXG5cdE9ORTogJzEnLmNoYXJDb2RlQXQoMCksXHJcblx0VFdPOiAnMicuY2hhckNvZGVBdCgwKSxcclxuXHRUSFJFRTogJzMnLmNoYXJDb2RlQXQoMCksXHJcblx0Rk9VUjogJzQnLmNoYXJDb2RlQXQoMCksXHJcblx0RklWRTogJzUnLmNoYXJDb2RlQXQoMCksXHJcblx0U0lYOiAnNicuY2hhckNvZGVBdCgwKSxcclxuXHRTRVZFTjogJzcnLmNoYXJDb2RlQXQoMCksXHJcblx0RUlHSFQ6ICc4Jy5jaGFyQ29kZUF0KDApLFxyXG5cdE5JTkU6ICc5Jy5jaGFyQ29kZUF0KDApLFxyXG5cdE5VTVBBRF8wOiA5NixcclxuXHROVU1QQURfMTogOTcsXHJcblx0TlVNUEFEXzI6IDk4LFxyXG5cdE5VTVBBRF8zOiA5OSxcclxuXHROVU1QQURfNDogMTAwLFxyXG5cdE5VTVBBRF81OiAxMDEsXHJcblx0TlVNUEFEXzY6IDEwMixcclxuXHROVU1QQURfNzogMTAzLFxyXG5cdE5VTVBBRF84OiAxMDQsXHJcblx0TlVNUEFEXzk6IDEwNSxcclxuXHROVU1QQURfTVVMVElQTFk6IDEwNixcclxuXHROVU1QQURfQUREOiAxMDcsXHJcblx0TlVNUEFEX0VOVEVSOiAxMDgsXHJcblx0TlVNUEFEX1NVQlRSQUNUOiAxMDksXHJcblx0TlVNUEFEX0RFQ0lNQUw6IDExMCxcclxuXHROVU1QQURfRElWSURFOiAxMTEsXHJcblx0RjE6IDExMixcclxuXHRGMjogMTEzLFxyXG5cdEYzOiAxMTQsXHJcblx0RjQ6IDExNSxcclxuXHRGNTogMTE2LFxyXG5cdEY2OiAxMTcsXHJcblx0Rjc6IDExOCxcclxuXHRGODogMTE5LFxyXG5cdEY5OiAxMjAsXHJcblx0RjEwOiAxMjEsXHJcblx0RjExOiAxMjIsXHJcblx0RjEyOiAxMjMsXHJcblx0RjEzOiAxMjQsXHJcblx0RjE0OiAxMjUsXHJcblx0RjE1OiAxMjYsXHJcblx0Q09MT046IDE4NixcclxuXHRFUVVBTFM6IDE4NyxcclxuXHRVTkRFUlNDT1JFOiAxODksXHJcblx0UVVFU1RJT05fTUFSSzogMTkxLFxyXG5cdFRJTERFOiAxOTIsXHJcblx0T1BFTl9CUkFDS0VUOiAyMTksXHJcblx0QkFDS1dBUkRfU0xBU0g6IDIyMCxcclxuXHRDTE9TRURfQlJBQ0tFVDogMjIxLFxyXG5cdFFVT1RFUzogMjIyLFxyXG5cdEJBQ0tTUEFDRTogOCxcclxuXHRUQUI6IDksXHJcblx0Q0xFQVI6IDEyLFxyXG5cdEVOVEVSOiAxMyxcclxuXHRTSElGVDogMTYsXHJcblx0Q09OVFJPTDogMTcsXHJcblx0QUxUOiAxOCxcclxuXHRDQVBTX0xPQ0s6IDIwLFxyXG5cdEVTQzogMjcsXHJcblx0U1BBQ0VCQVI6IDMyLFxyXG5cdFBBR0VfVVA6IDMzLFxyXG5cdFBBR0VfRE9XTjogMzQsXHJcblx0RU5EOiAzNSxcclxuXHRIT01FOiAzNixcclxuXHRMRUZUOiAzNyxcclxuXHRVUDogMzgsXHJcblx0UklHSFQ6IDM5LFxyXG5cdERPV046IDQwLFxyXG5cdElOU0VSVDogNDUsXHJcblx0REVMRVRFOiA0NixcclxuXHRIRUxQOiA0NyxcclxuXHROVU1fTE9DSzogMTQ0XHJcbn07XHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICAgIG1vZHVsZS5leHBvcnRzID0gS2V5Ym9hcmQ7XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIERFRyA9IDE4MCAvIE1hdGguUEk7XHJcbnZhciBSQUQgPSBNYXRoLlBJIC8gMTgwO1xyXG5cclxudmFyIE1hdGhVdGlscyA9IHtcclxuICAgIGFuZ2xlOiBmdW5jdGlvbih4MSwgeTEsIHgyLCB5Mikge1xyXG4gICAgICAgIHZhciBkeCA9IHgyIC0geDE7XHJcbiAgICAgICAgdmFyIGR5ID0geTIgLSB5MTtcclxuICAgICAgICByZXR1cm4gTWF0aC5hdGFuMihkeSwgZHgpO1xyXG4gICAgfSxcclxuICAgIGNsYW1wOiBmdW5jdGlvbih2YWx1ZSwgbWluLCBtYXgpIHtcclxuICAgICAgICBpZihtaW4gPiBtYXgpIHtcclxuICAgICAgICAgICAgdmFyIGEgPSBtaW47XHJcbiAgICAgICAgICAgIG1pbiA9IG1heDtcclxuICAgICAgICAgICAgbWF4ID0gYTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodmFsdWUgPCBtaW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1pbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodmFsdWUgPiBtYXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1heDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSxcclxuICAgIGNvaW5Ub3NzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA+IDAuNTtcclxuICAgIH0sXHJcbiAgICBjcm9zc1Byb2R1Y3Q6IGZ1bmN0aW9uKGFYLCBhWSwgYlgsIGJZKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgICBUaGUgc2lnbiB0ZWxscyB1cyBpZiBhIGlzIHRvIHRoZSBsZWZ0ICgtKSBvciB0aGUgcmlnaHQgKCspIG9mIGJcclxuICAgICAgICAqL1xyXG4gICAgICAgIHJldHVybiBhWCAqIGJZIC0gYVkgKiBiWDtcclxuICAgIH0sXHJcbiAgICBkZWdyZWVzOiBmdW5jdGlvbihyYWRpYW5zKSB7XHJcbiAgICAgICAgcmV0dXJuIHJhZGlhbnMgKiBERUc7XHJcbiAgICB9LFxyXG4gICAgZGlmZmVyZW5jZTogZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmFicyhhIC0gYik7XHJcbiAgICB9LFxyXG4gICAgZGlzdGFuY2U6IGZ1bmN0aW9uKHgxLCB5MSwgeDIsIHkyKSB7XHJcbiAgICAgICAgdmFyIHNxID0gTWF0aFV0aWxzLmRpc3RhbmNlU1EoeDEsIHkxLCB4MiwgeTIpO1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoc3EpO1xyXG4gICAgfSxcclxuICAgIGRpc3RhbmNlU1E6IGZ1bmN0aW9uKHgxLCB5MSwgeDIsIHkyKSB7XHJcbiAgICAgICAgdmFyIGR4ID0geDEgLSB4MjtcclxuICAgICAgICB2YXIgZHkgPSB5MSAtIHkyO1xyXG4gICAgICAgIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcclxuICAgIH0sXHJcbiAgICBkb3RQcm9kdWN0OiBmdW5jdGlvbihhWCwgYVksIGJYLCBiWSkge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgLSBJZiBBIGFuZCBCIGFyZSBwZXJwZW5kaWN1bGFyIChhdCA5MCBkZWdyZWVzIHRvIGVhY2ggb3RoZXIpLCB0aGUgcmVzdWx0XHJcbiAgICAgICAgICBvZiB0aGUgZG90IHByb2R1Y3Qgd2lsbCBiZSB6ZXJvLCBiZWNhdXNlIGNvcyjOmCkgd2lsbCBiZSB6ZXJvLlxyXG4gICAgICAgIC0gSWYgdGhlIGFuZ2xlIGJldHdlZW4gQSBhbmQgQiBhcmUgbGVzcyB0aGFuIDkwIGRlZ3JlZXMsIHRoZSBkb3QgcHJvZHVjdFxyXG4gICAgICAgICAgd2lsbCBiZSBwb3NpdGl2ZSAoZ3JlYXRlciB0aGFuIHplcm8pLCBhcyBjb3MozpgpIHdpbGwgYmUgcG9zaXRpdmUsIGFuZFxyXG4gICAgICAgICAgdGhlIHZlY3RvciBsZW5ndGhzIGFyZSBhbHdheXMgcG9zaXRpdmUgdmFsdWVzLlxyXG4gICAgICAgIC0gSWYgdGhlIGFuZ2xlIGJldHdlZW4gQSBhbmQgQiBhcmUgZ3JlYXRlciB0aGFuIDkwIGRlZ3JlZXMsIHRoZSBkb3RcclxuICAgICAgICAgIHByb2R1Y3Qgd2lsbCBiZSBuZWdhdGl2ZSAobGVzcyB0aGFuIHplcm8pLCBhcyBjb3MozpgpIHdpbGwgYmUgbmVnYXRpdmUsXHJcbiAgICAgICAgICBhbmQgdGhlIHZlY3RvciBsZW5ndGhzIGFyZSBhbHdheXMgcG9zaXRpdmUgdmFsdWVzXHJcbiAgICAgICAgKi9cclxuICAgICAgICByZXR1cm4gYVggKiBiWCArIGFZICogYlk7XHJcbiAgICB9LFxyXG4gICAgZ2V0Q2lyY2xlUG9pbnRzOiBmdW5jdGlvbihvcmlnaW5YLCBvcmlnaW5ZLCByYWRpdXMsIGNvdW50LCBzdGFydCwgQ2xhc3MpIHtcclxuICAgICAgICBzdGFydCA9IHN0YXJ0ID09PSB1bmRlZmluZWQgPyAtTWF0aC5QSS8yIDogc3RhcnQ7XHJcbiAgICAgICAgdmFyIHBvaW50cyA9IFtdLFxyXG4gICAgICAgICAgICBjaXJjID0gTWF0aC5QSSAqIDIsXHJcbiAgICAgICAgICAgIGluY3IgPSBjaXJjIC8gY291bnQsXHJcbiAgICAgICAgICAgIG9iO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGNpcmMgKyBzdGFydDsgaSArPSBpbmNyKSB7XHJcbiAgICAgICAgICAgIG9iID0gQ2xhc3MgPT09IHVuZGVmaW5lZCA/IHt9IDogbmV3IENsYXNzKCk7XHJcbiAgICAgICAgICAgIG9iLnggPSBvcmlnaW5YICsgcmFkaXVzICogTWF0aC5jb3MoaSk7XHJcbiAgICAgICAgICAgIG9iLnkgPSBvcmlnaW5ZICsgcmFkaXVzICogTWF0aC5zaW4oaSk7XHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKG9iKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvaW50cztcclxuICAgIH0sXHJcbiAgICBnZXRJbnRlcnNlY3Rpb25BcmVhOiBmdW5jdGlvbihhWCwgYVksIGFXLCBhSCwgYlgsIGJZLCBiVywgYkgpIHtcclxuICAgICAgICB2YXIgb3ZlcmxhcFggPSBNYXRoLm1heCgwLCBNYXRoLm1pbihhWCArIGFXLCBiWCArIGJXKSAtIE1hdGgubWF4KGFYLCBiWCkpO1xyXG4gICAgICAgIHZhciBvdmVybGFwWSA9IE1hdGgubWF4KDAsIE1hdGgubWluKGFZICsgYUgsIGJZICsgYkgpIC0gTWF0aC5tYXgoYVksIGJZKSk7XHJcbiAgICAgICAgcmV0dXJuIG92ZXJsYXBYICogb3ZlcmxhcFk7XHJcbiAgICB9LFxyXG4gICAgZ2V0T3ZlcmxhcFg6IGZ1bmN0aW9uKGFYLCBhVywgYlgsIGJXKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKGFYICsgYVcsIGJYICsgYlcpIC0gTWF0aC5tYXgoYVgsIGJYKSk7XHJcbiAgICB9LFxyXG4gICAgZ2V0T3ZlcmxhcFk6IGZ1bmN0aW9uKGFZLCBhSCwgYlksIGJIKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKGFZICsgYUgsIGJZICsgYkgpIC0gTWF0aC5tYXgoYVksIGJZKSk7XHJcbiAgICB9LFxyXG4gICAgbGVycDogZnVuY3Rpb24oZnJvbSwgdG8sIHBlcmNlbnQpIHtcclxuICAgICAgICByZXR1cm4gZnJvbSArICggdG8gLSBmcm9tICkgKiBwZXJjZW50O1xyXG4gICAgfSxcclxuICAgIG1hcDogZnVuY3Rpb24odiwgYSwgYiwgeCwgeSkge1xyXG4gICAgICAgIC8vIHZhbHVlLCBtaW4gZXhwZWN0ZWQsIG1heCBleHBlY3RlZCwgbWFwIG1pbiwgbWFwIG1heFxyXG4gICAgICAgIC8vIGUuZy4gbWFwIHNvbWUgdmFsdWUgYmV0d2VlbiAwIHRvIDEwMCB0byAtNTAgdG8gNTBcclxuICAgICAgICAvLyBtYXAoNTAsIDAsIDEwMCwgLTUwLCA1MCkgLy8gMFxyXG4gICAgICAgIC8vIG1hcCgyNSwgMCwgMTAwLCAtNTAsIDUwKSAvLyAtMjVcclxuICAgICAgICByZXR1cm4gKHYgPT09IGEpID8geCA6ICh2IC0gYSkgKiAoeSAtIHgpIC8gKGIgLSBhKSArIHg7XHJcbiAgICB9LFxyXG4gICAgcmFkaWFuczogZnVuY3Rpb24oZGVncmVlcykge1xyXG4gICAgICAgIHJldHVybiBkZWdyZWVzICogUkFEO1xyXG4gICAgfSxcclxuICAgIHJhbmRvbTogZnVuY3Rpb24obWluLCBtYXgpIHtcclxuICAgICAgICBpZiAoIGlzTmFOKG1heCkgKSB7XHJcbiAgICAgICAgICAgIG1heCA9IG1pbjtcclxuICAgICAgICAgICAgbWluID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1pbiArIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKTtcclxuICAgIH0sXHJcbiAgICByb3RhdGVUb0RFRzogZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xyXG4gICAgICAgIHZhciBkaWZmID0gKGVuZCAtIHN0YXJ0KSAlIDM2MDtcclxuICAgICAgICBpZiAoZGlmZiAhPT0gZGlmZiAlIDE4MCkge1xyXG4gICAgICAgICAgICBkaWZmID0gKGRpZmYgPCAwKSA/IGRpZmYgKyAzNjAgOiBkaWZmIC0gMzYwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RhcnQgKyBkaWZmO1xyXG4gICAgfSxcclxuICAgIHJvdGF0ZVRvUkFEOiBmdW5jdGlvbihzdGFydCwgZW5kKSB7XHJcbiAgICAgICAgdmFyIFBJMiA9IE1hdGguUEkgKiAyO1xyXG4gICAgICAgIHZhciBkaWZmID0gKGVuZCAtIHN0YXJ0KSAlIFBJMjtcclxuICAgICAgICBpZiAoZGlmZiAhPT0gZGlmZiAlIE1hdGguUEkpIHtcclxuICAgICAgICAgICAgZGlmZiA9IGRpZmYgPCAwID8gZGlmZiArIFBJMiA6IGRpZmYgLSBQSTI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdGFydCArIGRpZmY7XHJcbiAgICB9LFxyXG4gICAgcm91bmRUb05lYXJlc3Q6IGZ1bmN0aW9uKHZhbHVlLCB1bml0KSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgLyB1bml0KSAqIHVuaXQ7XHJcbiAgICB9XHJcbn07XHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICAgIG1vZHVsZS5leHBvcnRzID0gTWF0aFV0aWxzO1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBtb2Rlcm4gPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGlvczUgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICEhKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL09TIDUoX1xcZCkrIGxpa2UgTWFjIE9TIFgvaSkpO1xyXG4gICAgfSgpKTtcclxuXHJcbiAgICB2YXIgYW5kcm9pZE9sZCA9IChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xyXG4gICAgICAgIHJldHVybiAhISh1YS5tYXRjaCgvQW5kcm9pZC9pKSAmJiBwYXJzZUZsb2F0KHVhLnNsaWNlKHVhLmluZGV4T2YoJ0FuZHJvaWQnKSs4KSkgPCA0KTtcclxuICAgIH0oKSk7XHJcblxyXG4gICAgdmFyIGFuZHJvaWRTdG9jayA9IChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xyXG4gICAgICAgIHZhciByZWdFeEFwcGxlV2ViS2l0ID0gbmV3IFJlZ0V4cCgvQXBwbGVXZWJLaXRcXC8oW1xcZC5dKykvKTtcclxuICAgICAgICB2YXIgcmVzdWx0QXBwbGVXZWJLaXRSZWdFeCA9IHJlZ0V4QXBwbGVXZWJLaXQuZXhlYyh1YSk7XHJcbiAgICAgICAgdmFyIGFwcGxlV2ViS2l0VmVyc2lvbiA9IChyZXN1bHRBcHBsZVdlYktpdFJlZ0V4ID09PSBudWxsID8gbnVsbCA6IHBhcnNlRmxvYXQocmVnRXhBcHBsZVdlYktpdC5leGVjKHVhKVsxXSkpO1xyXG4gICAgICAgIHZhciBpc0FuZHJvaWRCcm93c2VyID0gdWEubWF0Y2goL0FuZHJvaWQvaSkgJiYgYXBwbGVXZWJLaXRWZXJzaW9uICE9PSBudWxsICYmIGFwcGxlV2ViS2l0VmVyc2lvbiA8IDUzNztcclxuICAgICAgICByZXR1cm4gaXNBbmRyb2lkQnJvd3NlcjtcclxuICAgIH0oKSk7XHJcblxyXG4gICAgdmFyIGllOURvd24gPSAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGRpdi5pbm5lckhUTUwgPSAnPCEtLVtpZiBJRV0+PGk+PC9pPjwhW2VuZGlmXS0tPic7XHJcbiAgICAgICAgcmV0dXJuIChkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2knKS5sZW5ndGggPT09IDEpO1xyXG4gICAgfSgpKTtcclxuXHJcbiAgICB2YXIgZXM1ID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3gnLCB7fSk7XHJcbiAgICAgICAgICAgIE9iamVjdC5jcmVhdGUoe30pO1xyXG4gICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSgpKTtcclxuXHJcbiAgICB2YXIgY2FudmFzID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgICAgIHJldHVybiAhIShlbC5nZXRDb250ZXh0ICYmIGVsLmdldENvbnRleHQoJzJkJykpO1xyXG4gICAgfSgpKTtcclxuXHJcbiAgICB2YXIgc21hbGxWaWV3cG9ydCA9IChmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5tYXgoIHdpbmRvdy5zY3JlZW4ud2lkdGgsIHdpbmRvdy5zY3JlZW4uaGVpZ2h0LCB3aW5kb3cub3V0ZXJXaWR0aCwgd2luZG93Lm91dGVySGVpZ2h0ICkgPD0gNDgwO1xyXG4gICAgfSgpKTtcclxuXHJcbiAgICByZXR1cm4gISEoY2FudmFzICYmIGVzNSAmJiAhKGlvczUgfHwgYW5kcm9pZE9sZCB8fCBhbmRyb2lkU3RvY2sgfHwgaWU5RG93biB8fCBzbWFsbFZpZXdwb3J0KSk7XHJcblxyXG59KCkpO1xyXG5cclxuaWYoTW9kZXJuaXpyKSB7XHJcbiAgICBNb2Rlcm5penIuYWRkVGVzdCgnbW9kZXJuJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG1vZGVybjtcclxuICAgIH0pO1xyXG59XHJcbmVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IG1vZGVybjtcclxufVxyXG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfVxuICAgICAgdGhyb3cgVHlwZUVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LicpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICBhcmdzID0gbmV3IEFycmF5KGxlbiAtIDEpO1xuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgbGVuOyBpKyspXG4gICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiAtIDEpO1xuICAgIGZvciAoaSA9IDE7IGkgPCBsZW47IGkrKylcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuXG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgdmFyIG07XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCFlbWl0dGVyLl9ldmVudHMgfHwgIWVtaXR0ZXIuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSAwO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKGVtaXR0ZXIuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gMTtcbiAgZWxzZVxuICAgIHJldCA9IGVtaXR0ZXIuX2V2ZW50c1t0eXBlXS5sZW5ndGg7XG4gIHJldHVybiByZXQ7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cbi8vIG9zXG52YXIgYW5kcm9pZCA9IC9BbmRyb2lkLy50ZXN0KHVhKTtcbnZhciBpb3MgPSAvaVBbYW9dZHxpUGhvbmUvaS50ZXN0KHVhKTtcbnZhciBsaW51eCA9IC9MaW51eC8udGVzdCh1YSk7XG52YXIgb3N4ID0gIWlvcyAmJiAvTWFjIE9TLy50ZXN0KHVhKTtcbnZhciB3aW5kb3dzUGhvbmUgPSAvV2luZG93cyBQaG9uZS9pLnRlc3QodWEpO1xudmFyIHdpbmRvd3MgPSAhd2luZG93c1Bob25lICYmIC9XaW5kb3dzLy50ZXN0KHVhKTtcblxuLy8gZGV2aWNlXG52YXIgaXBhZCA9IC9pUGFkL2kudGVzdCh1YSk7XG52YXIgaXBvZCA9IC9pUG9kL2kudGVzdCh1YSk7XG52YXIgaXBob25lID0gL2lQaG9uZS9pLnRlc3QodWEpO1xudmFyIG1vYmlsZSA9ICEhdWEubWF0Y2goL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbml8V2luZG93cyBQaG9uZXxTeW1iaWFuT1MvaSk7XG52YXIgZGVza3RvcCA9ICFtb2JpbGU7XG5cbi8vIHZlcnNpb25cbnZhciBhbmRyb2lkVmVyc2lvbiA9IChmdW5jdGlvbigpIHtcbiAgICBpZiAoIWFuZHJvaWQpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2VGbG9hdCh1YS5zbGljZSh1YS5pbmRleE9mKCdBbmRyb2lkJykgKyA4KSk7XG59KCkpO1xuXG52YXIgaW9zVmVyc2lvbiA9IChmdW5jdGlvbigpIHtcbiAgICBpZiAoL2lQW2FvXWR8aVBob25lL2kudGVzdCh1YSkpIHtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSB1YS5tYXRjaCgvT1MgKFxcZCspXyhcXGQrKS9pKTtcbiAgICAgICAgaWYgKG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChtYXRjaGVzWzFdICsgJy4nICsgbWF0Y2hlc1syXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufSgpKTtcblxuLy8gYnJvd3NlclxudmFyIGFuZHJvaWRTdG9ja0Jyb3dzZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1hdGNoZXMgPSB1YS5tYXRjaCgvQW5kcm9pZC4qQXBwbGVXZWJLaXRcXC8oW1xcZC5dKykvKTtcbiAgICByZXR1cm4gISFtYXRjaGVzICYmIG1hdGNoZXNbMV0gPCA1Mzc7XG59KCkpO1xuXG52YXIgaWVWZXJzaW9uID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gLTE7XG4gICAgaWYgKC9NU0lFIChcXGQrXFwuXFxkKyk7Ly50ZXN0KHVhKSkge1xuICAgICAgICB2ID0gcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCk7XG4gICAgfSBlbHNlIGlmICgvVHJpZGVudFxcLyhcXGQrXFwuXFxkKykoLiopcnY6KFxcZCtcXC5cXGQrKS8udGVzdCh1YSkpIHtcbiAgICAgICAgdiA9IHBhcnNlSW50KFJlZ0V4cC4kMywgMTApO1xuICAgIH1cbiAgICByZXR1cm4gdjtcbn0oKSk7XG5cbnZhciBjaHJvbWUgPSAvQ2hyb21lLy50ZXN0KHVhKTtcbnZhciBmaXJlZm94ID0gL0ZpcmVmb3gvLnRlc3QodWEpO1xudmFyIGZpcmVmb3hWZXJzaW9uID0gKGZ1bmN0aW9uKCkge1xuICAgIGlmICghZmlyZWZveCkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIHJldHVybiBwYXJzZUZsb2F0KHVhLnNsaWNlKHVhLmluZGV4T2YoJ0ZpcmVmb3gnKSArIDgpKTtcbn0oKSk7XG52YXIgaWUgPSBpZVZlcnNpb24gPiAtMTtcbnZhciBvcGVyYSA9IC9PcGVyYS8udGVzdCh1YSk7XG52YXIgc2FmYXJpID0gIWFuZHJvaWRTdG9ja0Jyb3dzZXIgJiYgIWNocm9tZSAmJiAvU2FmYXJpLy50ZXN0KHVhKTtcbnZhciBzYWZhcmlNb2JpbGUgPSBpb3MgJiYgL0FwcGxlV2ViS2l0Ly50ZXN0KHVhKTtcbnZhciBjaHJvbWVpT1MgPSBpb3MgJiYgL0NyaU9TLy50ZXN0KHVhKTtcblxuLy8gbG9jYWxcbnZhciBsb2NhbCA9IC9eKD86aHR0cHM/OlxcL1xcLyk/KD86bG9jYWxob3N0fDE5MlxcLjE2OCkvLnRlc3Qod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4vLyBleHBvcnRcblxudmFyIHBsYXRmb3JtID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgYnJvd3Nlcjoge1xuICAgICAgICBhbmRyb2lkU3RvY2tCcm93c2VyOiBhbmRyb2lkU3RvY2tCcm93c2VyLFxuICAgICAgICBjaHJvbWU6IGNocm9tZSxcbiAgICAgICAgY2hyb21laU9TOiBjaHJvbWVpT1MsXG4gICAgICAgIGZpcmVmb3g6IGZpcmVmb3gsXG4gICAgICAgIGZpcmVmb3hWZXJzaW9uOiBmaXJlZm94VmVyc2lvbixcbiAgICAgICAgaWU6IGllLFxuICAgICAgICBpZVZlcnNpb246IGllVmVyc2lvbixcbiAgICAgICAgb3BlcmE6IG9wZXJhLFxuICAgICAgICBzYWZhcmk6IHNhZmFyaSxcbiAgICAgICAgc2FmYXJpTW9iaWxlOiBzYWZhcmlNb2JpbGVcbiAgICB9LFxuICAgIGRldmljZToge1xuICAgICAgICBkZXNrdG9wOiBkZXNrdG9wLFxuICAgICAgICBpcGFkOiBpcGFkLFxuICAgICAgICBpcGhvbmU6IGlwaG9uZSxcbiAgICAgICAgaXBvZDogaXBvZCxcbiAgICAgICAgbW9iaWxlOiBtb2JpbGVcbiAgICB9LFxuICAgIG9zOiB7XG4gICAgICAgIGFuZHJvaWQ6IGFuZHJvaWQsXG4gICAgICAgIGlvczogaW9zLFxuICAgICAgICBsaW51eDogbGludXgsXG4gICAgICAgIG9zeDogb3N4LFxuICAgICAgICB3aW5kb3dzOiB3aW5kb3dzLFxuICAgICAgICB3aW5kb3dzUGhvbmU6IHdpbmRvd3NQaG9uZSxcbiAgICAgICAgYW5kcm9pZFZlcnNpb246IGFuZHJvaWRWZXJzaW9uLFxuICAgICAgICBpb3NWZXJzaW9uOiBpb3NWZXJzaW9uXG4gICAgfSxcbiAgICBsb2NhbDogbG9jYWxcbn0pO1xuXG4vLyBjb25zb2xlLmxvZygnLS0+JywgdWEpO1xuLy8gY29uc29sZS5sb2coJy0tPicsIHBsYXRmb3JtKTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBwbGF0Zm9ybTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuIC8qXG4gICogY2xhc3NMaXN0IChpZTEwIGFuZCBpZTExIHBhcnRpYWwgcG9seWZpbGwpXG4gICogYWRhcHRlZCBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vZWxpZ3JleS9jbGFzc0xpc3QuanMvYmxvYi9tYXN0ZXIvY2xhc3NMaXN0LmpzXG4gICovXG5cbihmdW5jdGlvbigpIHtcblxuICB2YXIgdGVzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdfJyk7XG5cbiAgdGVzdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYzEnLCAnYzInKTtcblxuICAvLyBQb2x5ZmlsbCBmb3IgSUUgMTAvMTEgYW5kIEZpcmVmb3ggPDI2LCB3aGVyZSBjbGFzc0xpc3QuYWRkIGFuZFxuICAvLyBjbGFzc0xpc3QucmVtb3ZlIGV4aXN0IGJ1dCBzdXBwb3J0IG9ubHkgb25lIGFyZ3VtZW50IGF0IGEgdGltZS5cbiAgaWYgKCF0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2MyJykpIHtcbiAgICB2YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICB2YXIgb3JpZ2luYWwgPSB3aW5kb3cuRE9NVG9rZW5MaXN0LnByb3RvdHlwZVttZXRob2RdO1xuXG4gICAgICB3aW5kb3cuRE9NVG9rZW5MaXN0LnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIHRva2VuID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgIG9yaWdpbmFsLmNhbGwodGhpcywgdG9rZW4pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gICAgY3JlYXRlTWV0aG9kKCdhZGQnKTtcbiAgICBjcmVhdGVNZXRob2QoJ3JlbW92ZScpO1xuICB9XG5cbiAgdGVzdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnYzMnLCBmYWxzZSk7XG5cbiAgLy8gUG9seWZpbGwgZm9yIElFIDEwIGFuZCBGaXJlZm94IDwyNCwgd2hlcmUgY2xhc3NMaXN0LnRvZ2dsZSBkb2VzIG5vdFxuICAvLyBzdXBwb3J0IHRoZSBzZWNvbmQgYXJndW1lbnQuXG4gIGlmICh0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2MzJykpIHtcbiAgICB2YXIgX3RvZ2dsZSA9IHdpbmRvdy5ET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZTtcblxuICAgIHdpbmRvdy5ET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKHRva2VuLCBmb3JjZSkge1xuICAgICAgZm9yY2UgPSAhIWZvcmNlO1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIHRoaXMuY29udGFpbnModG9rZW4pID09PSBmb3JjZSkge1xuICAgICAgICByZXR1cm4gZm9yY2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gX3RvZ2dsZS5jYWxsKHRoaXMsIHRva2VuKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgdGVzdEVsZW1lbnQgPSBudWxsO1xufSgpKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZuID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKGNvbnNvbGUgPT09IHVuZGVmaW5lZCkge1xuICB3aW5kb3cuY29uc29sZSA9IHt9O1xufVxuXG5jb25zb2xlLmxvZyA9IGNvbnNvbGUubG9nIHx8IGZuO1xuY29uc29sZS5kZWJ1ZyA9IGNvbnNvbGUuZGVidWcgfHwgY29uc29sZS5sb2c7XG5jb25zb2xlLmRpciA9IGNvbnNvbGUuZGlyIHx8IGZuO1xuY29uc29sZS5lcnJvciA9IGNvbnNvbGUuZXJyb3IgfHwgZm47XG5jb25zb2xlLmdyb3VwID0gY29uc29sZS5ncm91cCB8fCBmbjtcbmNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQgPSBjb25zb2xlLmdyb3VwQ29sbGFwc2VkIHx8IGZuO1xuY29uc29sZS5pbmZvID0gY29uc29sZS5pbmZvIHx8IGZuO1xuY29uc29sZS5wcm9maWxlID0gY29uc29sZS5wcm9maWxlIHx8IGZuO1xuY29uc29sZS5wcm9maWxlRW5kID0gY29uc29sZS5wcm9maWxlRW5kIHx8IGZuO1xuY29uc29sZS50YWJsZSA9IGNvbnNvbGUudGFibGUgfHwgZm47XG5jb25zb2xlLnRpbWVTdGFtcCA9IGNvbnNvbGUudGltZVN0YW1wIHx8IGZuO1xuY29uc29sZS50cmFjZSA9IGNvbnNvbGUudHJhY2UgfHwgZm47XG5jb25zb2xlLndhcm4gPSBjb25zb2xlLndhcm4gfHwgZm47XG4iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbigpIHtcbiAgICAvLyBpb3M2LCBpZTEwLCBhbmRyb2lkIDwgNC40XG4gICAgdmFyIHZlbmRvcnMgPSBbJ21zJywgJ21veicsICd3ZWJraXQnLCAnbyddO1xuICAgIGZvcih2YXIgeCA9IDA7IHggPCB2ZW5kb3JzLmxlbmd0aCAmJiAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgKyt4KSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSsnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdKydDYW5jZWxBbmltYXRpb25GcmFtZSddIHx8XG4gICAgICAgIHdpbmRvd1t2ZW5kb3JzW3hdKydDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgICB9XG4gICAgLy8gaWUgPCAxMFxuICAgIGlmICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuICAgICAgICB2YXIgbGFzdFRpbWUgPSAwO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBjdXJyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgdmFyIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSk7XG4gICAgICAgICAgICB2YXIgaWQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhjdXJyVGltZSArIHRpbWVUb0NhbGwpO1xuICAgICAgICAgICAgfSwgdGltZVRvQ2FsbCk7XG4gICAgICAgICAgICBsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfTtcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChpZCk7XG4gICAgICAgIH07XG4gICAgfVxufSgpKTtcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBwb3B1cCA9IGZ1bmN0aW9uICh1cmwsIG5hbWUsIHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHZhciBsZWZ0ID0gKHNjcmVlbi53aWR0aCAtIHdpZHRoKSAvIDI7XHJcbiAgICB2YXIgdG9wID0gKHNjcmVlbi5oZWlnaHQgLSBoZWlnaHQpIC8gMjtcclxuICAgIHZhciBwYXJhbXMgPSAnd2lkdGg9JyArIHdpZHRoICsgJywgaGVpZ2h0PScgKyBoZWlnaHQgK1xyXG4gICAgJywgdG9wPScgKyB0b3AgKyAnLCBsZWZ0PScgKyBsZWZ0ICtcclxuICAgICcsIGRpcmVjdG9yaWVzPW5vJyArXHJcbiAgICAnLCBsb2NhdGlvbj1ubycgK1xyXG4gICAgJywgbWVudWJhcj1ubycgK1xyXG4gICAgJywgcmVzaXphYmxlPW5vJyArXHJcbiAgICAnLCBzY3JvbGxiYXJzPW5vJyArXHJcbiAgICAnLCBzdGF0dXM9bm8nICtcclxuICAgICcsIHRvb2xiYXI9bm8nO1xyXG4gICAgdmFyIG5ld3dpbiA9IHdpbmRvdy5vcGVuKHVybCwgbmFtZSwgcGFyYW1zKTtcclxuICAgIGlmIChuZXd3aW4gPT09IG51bGwgfHwgdHlwZW9mIG5ld3dpbiA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAod2luZG93LmZvY3VzKSB7XHJcbiAgICAgICAgbmV3d2luLmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBwb3B1cDtcclxufVxyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgcmVhZHk7XHJcbmlmIChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XHJcbiAgICByZWFkeSA9IGZ1bmN0aW9uKGZuLCBjb250ZXh0KSB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScgfHwgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2ludGVyYWN0aXZlJykge1xyXG4gICAgICAgICAgICBmbi5jYWxsKGNvbnRleHQgfHwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBmbi5jYWxsKGNvbnRleHQgfHwgdGhpcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuZWxzZSB7XHJcbiAgICByZWFkeSA9IGZ1bmN0aW9uKGZuLCBjb250ZXh0KSB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZScpIHtcclxuICAgICAgICAgICAgZm4uY2FsbChjb250ZXh0IHx8IHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5hdHRhY2hFdmVudCgnb25yZWFkeXN0YXRlY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZScpIHtcclxuICAgICAgICAgICAgICAgIGZuLmNhbGwoY29udGV4dCB8fCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxufVxyXG5cclxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJlYWR5O1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciByZXNpemUgPSBmdW5jdGlvbiAocmVjdCwgYXJlYVdpZHRoLCBhcmVhSGVpZ2h0LCBhdXRvQ2VudGVyLCBtZXRob2QpIHtcclxuICAgIHZhciB3aWR0aCA9IHJlY3Qud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0ID0gcmVjdC5oZWlnaHQsXHJcbiAgICAgICAgc2NhbGU7XHJcblxyXG4gICAgc3dpdGNoKG1ldGhvZCkge1xyXG4gICAgICAgIGNhc2UgJ2ZpbGwnOlxyXG4gICAgICAgICAgICBzY2FsZSA9IE1hdGgubWF4KGFyZWFXaWR0aCAvIHdpZHRoLCBhcmVhSGVpZ2h0IC8gaGVpZ2h0KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnZml0JzpcclxuICAgICAgICAgICAgc2NhbGUgPSBNYXRoLm1pbihhcmVhV2lkdGggLyB3aWR0aCwgYXJlYUhlaWdodCAvIGhlaWdodCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2ZpdFdpZHRoJzpcclxuICAgICAgICAgICAgc2NhbGUgPSBhcmVhV2lkdGggLyB3aWR0aDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnZml0SGVpZ2h0JzpcclxuICAgICAgICAgICAgc2NhbGUgPSBhcmVhSGVpZ2h0IC8gaGVpZ2h0O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBzY2FsZSA9IE1hdGgubWF4KGFyZWFXaWR0aCAvIHdpZHRoLCBhcmVhSGVpZ2h0IC8gaGVpZ2h0KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgcmVjdC53aWR0aCA9IE1hdGguY2VpbCh3aWR0aCAqIHNjYWxlKTtcclxuICAgIHJlY3QuaGVpZ2h0ID0gTWF0aC5jZWlsKGhlaWdodCAqIHNjYWxlKTtcclxuXHJcbiAgICBpZiAoYXV0b0NlbnRlcikge1xyXG4gICAgICAgIHJlY3QueCA9IE1hdGgucm91bmQoKGFyZWFXaWR0aCAtIHJlY3Qud2lkdGgpICogMC41KTtcclxuICAgICAgICByZWN0LnkgPSBNYXRoLnJvdW5kKChhcmVhSGVpZ2h0IC0gcmVjdC5oZWlnaHQpICogMC41KTtcclxuICAgIH1cclxufTtcclxuXHJcbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSByZXNpemU7XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHBvcHVwID0gcmVxdWlyZSgnLi9wb3B1cCcpO1xyXG5cclxuLy8gd2FybkJhZFVSTCAtIGhlbHBlciB0byB3YXJuIG9uIHJlbGF0aXZlIFVSTHMgc3VwcGxpZWQgZm9yIGltYWdlcyBldGNcclxuZnVuY3Rpb24gd2FybkJhZFVSTCh1cmwpIHtcclxuICAgIGlmKHVybC5zdWJzdHIoMCw0KSAhPT0gJ2h0dHAnKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdVUkw6ICcgKyB1cmwgKyAnIHNob3VsZCBzdGFydCB3aXRoIGh0dHAnKTtcclxuICAgIH1cclxufVxyXG5cclxudmFyIFNoYXJlID0ge1xyXG4gICAgLy8gU3RhbmRhcmQgRkIgc2hhcmUgKHVzZXMgb2cgdGFncylcclxuICAgIGZhY2Vib29rOiBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnc2hhcmUuZmFjZWJvb2snLCB1cmwpO1xyXG4gICAgICAgIHJldHVybiBwb3B1cCgnaHR0cDovL3d3dy5mYWNlYm9vay5jb20vc2hhcmUucGhwP3U9JyArIGVuY29kZVVSSUNvbXBvbmVudCh1cmwpLCAnc2hhcmVGYWNlYm9vaycsIDcyMCwgNDgwKTtcclxuICAgIH0sXHJcbiAgICB0d2l0dGVyOiBmdW5jdGlvbih1cmwsIHRleHQsIGhhc2h0YWdzLCByZWxhdGVkKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3NoYXJlLnR3aXR0ZXInLCB1cmwsIHRleHQsIGhhc2h0YWdzLCByZWxhdGVkKTtcclxuICAgICAgICByZXR1cm4gcG9wdXAoJ2h0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3VybD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVybCkgKyAnJnRleHQ9JyArIGVuY29kZVVSSUNvbXBvbmVudCh0ZXh0KSArICcmaGFzaHRhZ3M9JyArIGVuY29kZVVSSUNvbXBvbmVudChoYXNodGFncykgKyAnJnJlbGF0ZWQ9JyArIGVuY29kZVVSSUNvbXBvbmVudChyZWxhdGVkKSwgJ3NoYXJlVHdpdHRlcicsIDU1MCwgMzgwKTtcclxuICAgIH0sXHJcbiAgICBnb29nbGVQbHVzOiBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnc2hhcmUuZ29vZ2xlUGx1cycsIHVybCk7XHJcbiAgICAgICAgcmV0dXJuIHBvcHVwKCdodHRwczovL3BsdXMuZ29vZ2xlLmNvbS9zaGFyZT91cmw9JyArIGVuY29kZVVSSUNvbXBvbmVudCh1cmwpLCAnc2hhcmVHb29nbGVQbHVzJywgNTUwLCAzODApO1xyXG4gICAgfSxcclxuICAgIHBpbnRlcmVzdDogZnVuY3Rpb24odXJsLCBwaWN0dXJlLCB0ZXh0KSB7XHJcbiAgICAgICAgd2FybkJhZFVSTChwaWN0dXJlKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnc2hhcmUucGludGVyZXN0JywgdXJsLCBwaWN0dXJlLCB0ZXh0KTtcclxuICAgICAgICByZXR1cm4gcG9wdXAoJ2h0dHA6Ly9waW50ZXJlc3QuY29tL3Bpbi9jcmVhdGUvYnV0dG9uLz91cmw9JysgZW5jb2RlVVJJQ29tcG9uZW50KHVybCkgKyAnJm1lZGlhPScrIGVuY29kZVVSSUNvbXBvbmVudChwaWN0dXJlKSArICcmZGVzY3JpcHRpb249JyArIGVuY29kZVVSSUNvbXBvbmVudCh0ZXh0KSwgJ3NoYXJlUGludGVyZXN0JywgNjMwLCAyODApO1xyXG4gICAgfSxcclxuICAgIHZrb250YWt0ZTogZnVuY3Rpb24odXJsLCB0aXRsZSwgZGVzY3JpcHRpb24sIGltYWdlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3NoYXJlLnZrb250YWt0ZScsIHVybCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBpbWFnZSk7XHJcbiAgICAgICAgcmV0dXJuIHBvcHVwKCdodHRwOi8vdmtvbnRha3RlLnJ1L3NoYXJlLnBocD91cmw9JyArIGVuY29kZVVSSUNvbXBvbmVudCh1cmwpICsgJyZ0aXRsZT0nICsgdGl0bGUgKyAnJmRlc2NyaXB0aW9uPScgKyBkZXNjcmlwdGlvbiArICcmaW1hZ2U9JyArIGVuY29kZVVSSUNvbXBvbmVudChpbWFnZSksICdzaGFyZVZLJywgNTUwLCAzODApO1xyXG4gICAgfSxcclxuICAgIHJlbnJlbjogZnVuY3Rpb24odXJsLCB0aXRsZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdzaGFyZS5yZW5yZW4nLCB1cmwsIHRpdGxlKTtcclxuICAgICAgICByZXR1cm4gcG9wdXAoJ2h0dHA6Ly9zaGFyZS5yZW5yZW4uY29tL3NoYXJlL2J1dHRvbnNoYXJlLmRvP2xpbms9JyArIGVuY29kZVVSSUNvbXBvbmVudCh1cmwpICsgJyZ0aXRsZT0nICsgdGl0bGUsICdzaGFyZVJlblJlbicsIDkwMCwgNDgwKTtcclxuICAgIH0sXHJcbiAgICB3ZWlibzogZnVuY3Rpb24odXJsLCB0aXRsZSwgaW1hZ2UpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnc2hhcmUud2VpYm8nLCB1cmwsIHRpdGxlLCBpbWFnZSk7XHJcbiAgICAgICAgcmV0dXJuIHBvcHVwKCdodHRwOi8vc2VydmljZS53ZWliby5jb20vc2hhcmUvc2hhcmUucGhwP3VybD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVybCkgKyAnJmFwcGtleT0mdGl0bGU9JyArIHRpdGxlICsgJyZwaWM9JyArIGVuY29kZVVSSUNvbXBvbmVudChpbWFnZSkgKyAnJnJhbGF0ZVVpZD0mbGFuZ3VhZ2U9emhfY24nLCAnc2hhcmVXZWlibycsIDY0MCwgNDgwKTtcclxuICAgIH0sXHJcbiAgICAvLyBGQiBmZWVkIGRpYWxvZyBzaGFyZSBmb3Igc2hhcmluZyB3aXRoIGN1c3RvbWlzZWQgdGV4dCBhbmQgaW1hZ2VzIFxyXG4gICAgLy8gU2VlIGh0dHA6Ly9kZXZlbG9wZXJzLmZhY2Vib29rLmNvbS9kb2NzL3JlZmVyZW5jZS9kaWFsb2dzL2ZlZWQvXHJcbiAgICBmYWNlYm9va0ZlZWREaWFsb2c6IGZ1bmN0aW9uKGFwcElkLCB0aXRsZSwgbGluaywgcGljdHVyZSwgc291cmNlLCBjYXB0aW9uLCBkZXNjcmlwdGlvbiwgcmVkaXJlY3RVUkwpIHtcclxuICAgICAgICB3YXJuQmFkVVJMKHBpY3R1cmUpO1xyXG4gICAgICAgIHdhcm5CYWRVUkwocmVkaXJlY3RVUkwpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdzaGFyZS5mYWNlYm9va1ZpYUFwcCcsIGFwcElkLCB0aXRsZSwgbGluaywgcGljdHVyZSwgc291cmNlLCBjYXB0aW9uLCBkZXNjcmlwdGlvbiwgcmVkaXJlY3RVUkwpO1xyXG5cclxuICAgICAgICB2YXIgdXJsID0gJ2h0dHA6Ly93d3cuZmFjZWJvb2suY29tL2RpYWxvZy9mZWVkP2FwcF9pZD0nICsgYXBwSWQgK1xyXG4gICAgICAgICcmcGljdHVyZT0nICsgcGljdHVyZSArXHJcbiAgICAgICAgKCBzb3VyY2UgJiYgc291cmNlICE9PSAnJyA/ICcmc291cmNlPScgKyBzb3VyY2UgOiAnJyApICtcclxuICAgICAgICAnJm5hbWU9JyArIGVuY29kZVVSSUNvbXBvbmVudCh0aXRsZSkgK1xyXG4gICAgICAgICcmbGluaz0nICsgbGluayArXHJcbiAgICAgICAgJyZjYXB0aW9uPScgKyBlbmNvZGVVUklDb21wb25lbnQoY2FwdGlvbikgK1xyXG4gICAgICAgICcmZGVzY3JpcHRpb249JyArIGVuY29kZVVSSUNvbXBvbmVudChkZXNjcmlwdGlvbikgK1xyXG4gICAgICAgICcmZGlzcGxheT1wb3B1cCcgK1xyXG4gICAgICAgICcmc2hvd19lcnJvcj10cnVlJyArXHJcbiAgICAgICAgJyZyZWRpcmVjdF91cmk9JyArIHJlZGlyZWN0VVJMO1xyXG5cclxuICAgICAgICByZXR1cm4gcG9wdXAodXJsLCAnc2hhcmVGYWNlYm9vaycsIDU1MCwgMzgwKTtcclxuICAgIH1cclxufTtcclxuXHJcbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBTaGFyZTtcclxufVxyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgU3RvcmFnZVV0aWxzID0ge1xyXG4gICAgc2F2ZUpTT046IGZ1bmN0aW9uKGtleSwgb2JqZWN0KSB7XHJcbiAgICAgICAgaWYobG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkob2JqZWN0KSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgbG9hZEpTT046IGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZSAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0sXHJcbiAgICAvLyBjb252ZXJ0IGltYWdlIHRvIGxvY2Fsc3RvcmFnZSBmcmllbmRseSBkYXRhIFVSTCBzdHJpbmdcclxuICAgIGdldEltYWdlRGF0YVVSTDogZnVuY3Rpb24oaW1nLCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgaWYoIXRoaXMuY2FudmFzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGggfHwgaW1nLndpZHRoO1xyXG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodCB8fCBpbWcuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcclxuICAgICAgICB2YXIgZGF0YVVSTCA9IHRoaXMuY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICByZXR1cm4gZGF0YVVSTDtcclxuICAgIH1cclxufTtcclxuXHJcbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBTdG9yYWdlVXRpbHM7XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuLypcclxuICogSGVscGVyXHJcbiAqL1xyXG5cclxuLy8gcmVnZXggZXNjYXBlIHBhdHRlcm5cclxuZnVuY3Rpb24gZXNjYXBlUGF0dGVybihwYXR0ZXJuKSB7XHJcbiAgICByZXR1cm4gcGF0dGVybi5yZXBsYWNlKC8oXFxdfFxcW3xcXHt8XFx9fFxcKHxcXCl8XFwqfFxcK3xcXD98XFwufFxcXFwpL2csICdcXFxcJDEnKTtcclxufVxyXG5cclxuLypcclxuICogRm9ybWF0XHJcbiAqL1xyXG5cclxuLy8gcmVtb3ZlIHdoaXRlc3BhY2UgZnJvbSB0aGUgZnJvbnQgYW5kIGVuZCBvZiBzdHJcclxuZnVuY3Rpb24gdHJpbShzdHIpIHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xyXG59XHJcblxyXG4vLyByZW1vdmUgd2hpdGVzcGFjZSBmcm9tIHRoZSBmcm9udCBvZiBzdHJcclxuZnVuY3Rpb24gdHJpbUxlZnQoc3RyKSB7XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrLywgJycpO1xyXG59XHJcblxyXG4vLyByZW1vdmUgd2hpdGVzcGFjZSBmcm9tIHRoZSBlbmQgb2Ygc3RyXHJcbmZ1bmN0aW9uIHRyaW1SaWdodChzdHIpIHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFxzKyQvLCAnJyk7XHJcbn1cclxuXHJcbi8vIHBhZCBzdHIgd2l0aCBzdWJzdHIgZnJvbSB0aGUgbGVmdFxyXG5mdW5jdGlvbiBwYWRMZWZ0KHN0ciwgc3Vic3RyLCBsZW5ndGgpIHtcclxuICAgIHdoaWxlIChzdHIubGVuZ3RoIDwgbGVuZ3RoKSB7IHN0ciA9IHN1YnN0ciArIHN0cjsgfVxyXG4gICAgcmV0dXJuIHN0cjtcclxufVxyXG5cclxuLy8gcGFkcyBzdHIgd2l0aCBzdWJzdHIgZnJvbSB0aGUgcmlnaHRcclxuZnVuY3Rpb24gcGFkUmlnaHQoc3RyLCBzdWJzdHIsIGxlbmd0aCkge1xyXG4gICAgd2hpbGUgKHN0ci5sZW5ndGggPCBsZW5ndGgpIHsgc3RyICs9IHN1YnN0cjsgfVxyXG4gICAgcmV0dXJuIHN0cjtcclxufVxyXG5cclxuLy8gcmVtb3ZlIGV4dHJhIHdoaXRlc3BhY2UgKGV4dHJhIHNwYWNlcywgdGFicywgbGluZSBicmVha3MsIGV0YylcclxuZnVuY3Rpb24gcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlKHN0cikge1xyXG4gICAgdmFyIHN1YnN0ciA9IHRyaW0oc3RyKTtcclxuICAgIHJldHVybiBzdWJzdHIucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xyXG59XHJcblxyXG4vLyByZW1vdmUgYWxsIGluc3RhbmNlcyBvZiBzdWJzdHIgaW4gc3RyXHJcbmZ1bmN0aW9uIHJlbW92ZShzdHIsIHN1YnN0ciwgY2FzZVNlbnNpdGl2ZSkge1xyXG4gICAgdmFyIGVzY2FwZWRTdHIgPSBlc2NhcGVQYXR0ZXJuKHN1YnN0cik7XHJcbiAgICB2YXIgZmxhZ3MgPSBjYXNlU2Vuc2l0aXZlID8gJ2cnIDogJ2lnJztcclxuICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKGVzY2FwZWRTdHIsIGZsYWdzKSwgJycpO1xyXG59XHJcblxyXG4vLyB0cnVuY2F0ZSB0byBsZW5ndGggd2l0aCBzdWZmaXhcclxuZnVuY3Rpb24gdHJ1bmNhdGUoc3RyLCBsZW4sIHN1ZmZpeCkge1xyXG4gICAgaWYoc3VmZml4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzdWZmaXggPSAnLi4uJztcclxuICAgIH1cclxuICAgIGxlbiAtPSBzdWZmaXgubGVuZ3RoO1xyXG4gICAgdmFyIHRydW5jID0gc3RyO1xyXG4gICAgaWYgKHRydW5jLmxlbmd0aCA+IGxlbikge1xyXG4gICAgICAgIHRydW5jID0gdHJ1bmMuc3Vic3RyKDAsIGxlbik7XHJcbiAgICAgICAgdmFyIHIgPSAvW15cXHNdLztcclxuICAgICAgICBpZiAoci50ZXN0KHN0ci5jaGFyQXQobGVuKSkpIHtcclxuICAgICAgICAgICAgdHJ1bmMgPSB0cmltUmlnaHQodHJ1bmMucmVwbGFjZSgvXFx3KyR8XFxzKyQvLCAnJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnVuYyArPSBzdWZmaXg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1bmM7XHJcbn1cclxuXHJcbi8vIENhcGl0YWxpemUgdGhlIGZpcnN0IHdvcmQgaW4gYSBzdHJpbmcgb3IgYWxsIHdvcmRzXHJcbmZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyLCBhbGwpIHtcclxuICAgIHZhciBzdWJzdHIgPSB0cmltTGVmdChzdHIpO1xyXG4gICAgaWYgKGFsbCkge1xyXG4gICAgICAgIHJldHVybiBzdWJzdHIucmVwbGFjZSgvXi58XFxiLi9nLCBmdW5jdGlvbihtYXRjaCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2gudG9VcHBlckNhc2UoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBzdWJzdHIucmVwbGFjZSgvKF5cXHcpLywgZnVuY3Rpb24obWF0Y2gpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIHByb3BlciBjYXNlIHN0ciBpbiBzZW50ZW5jZSBmb3JtYXRcclxuZnVuY3Rpb24gcHJvcGVyQ2FzZShzdHIpIHtcclxuICAgIHZhciBuZXdTdHIgPSBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXGIoW14uPzshXSspLywgY2FwaXRhbGl6ZSk7XHJcbiAgICByZXR1cm4gbmV3U3RyLnJlcGxhY2UoL1xcYltpXVxcYi8sICdJJyk7XHJcbn1cclxuXHJcbi8vIHJldmVyc2UgY2hhcmFjdGVyIG9yZGVyXHJcbmZ1bmN0aW9uIHJldmVyc2Uoc3RyKSB7XHJcbiAgICByZXR1cm4gc3RyLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJyk7XHJcbn1cclxuXHJcbi8vIHJldmVyc2Ugd29yZCBvcmRlclxyXG5mdW5jdGlvbiByZXZlcnNlV29yZHMoc3RyKSB7XHJcbiAgICByZXR1cm4gc3RyLnNwbGl0KCcgJykucmV2ZXJzZSgpLmpvaW4oJyAnKTtcclxufVxyXG5cclxuLy8gcmVtb3ZlIGFsbCBIVE1MIHRhZ3MgZnJvbSBzdHJcclxuZnVuY3Rpb24gc3RyaXBUYWdzKHN0cikge1xyXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC88XFwvP1tePl0rPi9pZ20sICcnKTtcclxufVxyXG5cclxuLy8gc3dhcHMgdGhlIGNhc2Ugb2Ygc3RyXHJcbmZ1bmN0aW9uIHN3YXBDYXNlKHN0cikge1xyXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oXFx3KS8sIGZ1bmN0aW9uKG5ld1N0cikge1xyXG4gICAgICAgIHZhciBsb3dlciA9IG5ld1N0ci50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHZhciB1cHBlciA9IG5ld1N0ci50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIHN3aXRjaCAobmV3U3RyKSB7XHJcbiAgICAgICAgICAgIGNhc2UgbG93ZXI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdXBwZXI7XHJcbiAgICAgICAgICAgIGNhc2UgdXBwZXI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG93ZXI7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3U3RyO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyBmb3JtYXRzIHNlY29uZHMgaW50byBISDpNTTpTU1xyXG5mdW5jdGlvbiB0aW1lQ29kZShzZWNvbmRzLCBkZWxpbSkge1xyXG4gICAgaWYoZGVsaW0gPT09IHVuZGVmaW5lZCkgeyBkZWxpbSA9ICc6JzsgfVxyXG4gICAgdmFyIGggPSBNYXRoLmZsb29yKHNlY29uZHMgLyAzNjAwKTtcclxuICAgIHZhciBtID0gTWF0aC5mbG9vcigoc2Vjb25kcyAlIDM2MDApIC8gNjApO1xyXG4gICAgdmFyIHMgPSBNYXRoLmZsb29yKChzZWNvbmRzICUgMzYwMCkgJSA2MCk7XHJcbiAgICB2YXIgaHIgPSAoaCA9PT0gMCA/ICcnIDogKGggPCAxMCA/ICcwJyArIGggKyBkZWxpbSA6IGggKyBkZWxpbSkpO1xyXG4gICAgdmFyIG1uID0gKG0gPCAxMCA/ICcwJyArIG0gOiBtKSArIGRlbGltO1xyXG4gICAgdmFyIHNjID0gKHMgPCAxMCA/ICcwJyArIHMgOiBzKTtcclxuICAgIHJldHVybiBociArIG1uICsgc2M7XHJcbn1cclxuXHJcbi8qXHJcbiAqIFF1ZXJ5XHJcbiAqL1xyXG5cclxuLy8gd2hldGhlciBzdHIgYmVnaW5zIHdpdGggc3Vic3RyXHJcbmZ1bmN0aW9uIGJlZ2luc1dpdGgoc3RyLCBzdWJzdHIpIHtcclxuICAgIHJldHVybiBzdHIuaW5kZXhPZihzdWJzdHIpID09PSAwO1xyXG59XHJcblxyXG4vLyB3aGV0aGVyIHN0ciBjb250YWlucyBhbnkgaW5zdGFuY2VzIG9mIHN1YnN0clxyXG5mdW5jdGlvbiBjb250YWlucyhzdHIsIHN1YnN0cikge1xyXG4gICAgcmV0dXJuIHN0ci5pbmRleE9mKHN1YnN0cikgIT09IC0xO1xyXG59XHJcblxyXG4vLyB0aGUgbnVtYmVyIG9mIHRpbWVzIHN1YnN0ciBhcHBlYXJzIHdpdGhpbiBzdHJcclxuZnVuY3Rpb24gY291bnRPZihzdHIsIHN1YnN0ciwgY2FzZVNlbnNpdGl2ZSkge1xyXG4gICAgdmFyIGVzY2FwZWRTdHIgPSBlc2NhcGVQYXR0ZXJuKHN1YnN0cik7XHJcbiAgICB2YXIgZmxhZ3MgPSAoIWNhc2VTZW5zaXRpdmUpID8gJ2lnJyA6ICdnJztcclxuICAgIHJldHVybiBzdHIubWF0Y2gobmV3IFJlZ0V4cChlc2NhcGVkU3RyLCBmbGFncykpLmxlbmd0aDtcclxufVxyXG5cclxuLy8gd2hldGhlciBzdHIgZW5kcyB3aXRoIHN1YnN0clxyXG5mdW5jdGlvbiBlbmRzV2l0aChzdHIsIHN1YnN0cikge1xyXG4gICAgcmV0dXJuIHN0ci5sYXN0SW5kZXhPZihzdWJzdHIpID09PSBzdHIubGVuZ3RoIC0gc3Vic3RyLmxlbmd0aDtcclxufVxyXG5cclxuLy8gd2hldGhlciBzdHIgY29udGFpbnMgYW55IHRleHRcclxuZnVuY3Rpb24gaGFzVGV4dChzdHIpIHtcclxuICAgIHZhciBzdWJzdHIgPSByZW1vdmVFeHRyYVdoaXRlc3BhY2Uoc3RyKTtcclxuICAgIHJldHVybiAhIXN1YnN0ci5sZW5ndGg7XHJcbn1cclxuXHJcbi8vIHdoZXRoZXIgc3RyIGNvbnRhaW5zIGFueSBjaGFyYWN0ZXJzXHJcbmZ1bmN0aW9uIGlzRW1wdHkoc3RyKSB7XHJcbiAgICByZXR1cm4gIXN0ci5sZW5ndGg7XHJcbn1cclxuXHJcbi8vIHdoZXRoZXIgc3RyIGlzIG51bWVyaWNcclxuZnVuY3Rpb24gaXNOdW1lcmljKHN0cikge1xyXG4gICAgdmFyIHJlZ3ggPSAvXlstK10/XFxkKlxcLj9cXGQrKD86W2VFXVstK10/XFxkKyk/JC87XHJcbiAgICByZXR1cm4gcmVneC50ZXN0KHN0cik7XHJcbn1cclxuXHJcbi8vIHRoZSBudW1iZXIgb2Ygd29yZHMgaW4gYSBzdHJpbmdcclxuZnVuY3Rpb24gd29yZENvdW50KHN0cikge1xyXG4gICAgcmV0dXJuIHN0ci5tYXRjaCgvXFxiXFx3K1xcYi9nKS5sZW5ndGg7XHJcbn1cclxuXHJcbi8qXHJcbiAqIFN1YnN0cmluZ1xyXG4gKi9cclxuXHJcbi8vIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2Ygc3Vic3RyIGluIHN0clxyXG5mdW5jdGlvbiBhZnRlckZpcnN0KHN0ciwgc3Vic3RyKSB7XHJcbiAgICB2YXIgaW5kZXggPSBzdHIuaW5kZXhPZihzdWJzdHIpO1xyXG4gICAgaWYgKGluZGV4ID09PSAtMSkgeyByZXR1cm4gJyc7IH1cclxuICAgIGluZGV4ICs9IHN1YnN0ci5sZW5ndGg7XHJcbiAgICByZXR1cm4gc3RyLnN1YnN0cihpbmRleCk7XHJcbn1cclxuXHJcbi8vIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGxhc3Qgb2NjdXJlbmNlIG9mIHN1YnN0ciBpbiBzdHJcclxuZnVuY3Rpb24gYWZ0ZXJMYXN0KHN0ciwgc3Vic3RyKSB7XHJcbiAgICB2YXIgaW5kZXggPSBzdHIubGFzdEluZGV4T2Yoc3Vic3RyKTtcclxuICAgIGlmIChpbmRleCA9PT0gLTEpIHsgcmV0dXJuICcnOyB9XHJcbiAgICBpbmRleCArPSBzdWJzdHIubGVuZ3RoO1xyXG4gICAgcmV0dXJuIHN0ci5zdWJzdHIoaW5kZXgpO1xyXG59XHJcblxyXG4vLyBldmVyeXRoaW5nIGJlZm9yZSB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBzdWJzdHIgaW4gc3RyXHJcbmZ1bmN0aW9uIGJlZm9yZUZpcnN0KHN0ciwgc3Vic3RyKSB7XHJcbiAgICB2YXIgaW5kZXggPSBzdHIuaW5kZXhPZihzdWJzdHIpO1xyXG4gICAgaWYgKGluZGV4ID09PSAtMSkgeyByZXR1cm4gJyc7IH1cclxuICAgIHJldHVybiBzdHIuc3Vic3RyKDAsIGluZGV4KTtcclxufVxyXG5cclxuLy8gZXZlcnl0aGluZyBiZWZvcmUgdGhlIGxhc3Qgb2NjdXJyZW5jZSBvZiBzdWJzdHIgaW4gdGhlIHN0cmluZy5cclxuZnVuY3Rpb24gYmVmb3JlTGFzdChzdHIsIHN1YnN0cikge1xyXG4gICAgdmFyIGluZGV4ID0gc3RyLmxhc3RJbmRleE9mKHN1YnN0cik7XHJcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7IHJldHVybiAnJzsgfVxyXG4gICAgcmV0dXJuIHN0ci5zdWJzdHIoMCwgaW5kZXgpO1xyXG59XHJcblxyXG4vLyBldmVyeXRoaW5nIGFmdGVyIHRoZSBmaXJzdCBvY2N1cmFuY2Ugb2Ygc3RhcnQgYW5kIGJlZm9yZSB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBlbmRcclxuZnVuY3Rpb24gYmV0d2VlbihzdHIsIHN0YXJ0LCBlbmQpIHtcclxuICAgIHZhciBzdWJzdHIgPSAnJztcclxuICAgIHZhciBzdGFydEluZGV4ID0gc3RyLmluZGV4T2Yoc3RhcnQpO1xyXG4gICAgaWYgKHN0YXJ0SW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgc3RhcnRJbmRleCArPSBzdGFydC5sZW5ndGg7XHJcbiAgICAgICAgdmFyIGVuZEluZGV4ID0gc3RyLmluZGV4T2YoZW5kLCBzdGFydEluZGV4KTtcclxuICAgICAgICBpZiAoZW5kSW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHN1YnN0ciA9IHN0ci5zdWJzdHIoc3RhcnRJbmRleCwgZW5kSW5kZXgtc3RhcnRJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1YnN0cjtcclxufVxyXG5cclxuLypcclxuICogVXRpbGl0eVxyXG4gKi9cclxuXHJcbi8vIFV0aWxpdHkgbWV0aG9kIHRoYXQgaW50ZWxsaWdlbnRseSBicmVha3MgdXAgeW91ciBzdHJpbmcsXHJcbi8vIGFsbG93aW5nIHlvdSB0byBjcmVhdGUgYmxvY2tzIG9mIHJlYWRhYmxlIHRleHQuXHJcbi8vIFRoaXMgbWV0aG9kIHJldHVybnMgeW91IHRoZSBjbG9zZXN0IHBvc3NpYmxlIG1hdGNoIHRvIHRoZSBkZWxpbSBwYXJhbWF0ZXIsXHJcbi8vIHdoaWxlIGtlZXBpbmcgdGhlIHRleHQgbGVuZ3RoIHdpdGhpbiB0aGUgbGVuIHBhcmFtdGVyLlxyXG4vLyBJZiBhIG1hdGNoIGNhbid0IGJlIGZvdW5kIGluIHlvdXIgc3BlY2lmaWVkIGxlbmd0aCBhbiAgJy4uLicgaXMgYWRkZWQgdG8gdGhhdCBibG9jayxcclxuLy8gYW5kIHRoZSBibG9ja2luZyBjb250aW51ZXMgdW50aWxsIGFsbCB0aGUgdGV4dCBpcyBicm9rZW4gYXBhcnQuXHJcbmZ1bmN0aW9uIGJsb2NrKHN0ciwgbGVuLCBkZWxpbSkge1xyXG4gICAgaWYoZGVsaW0gPT09IHVuZGVmaW5lZCkgeyBkZWxpbSA9ICcuJzsgfVxyXG4gICAgdmFyIGFyciA9IFtdO1xyXG5cclxuICAgIGlmICghc3RyIHx8ICFjb250YWlucyhzdHIsIGRlbGltKSkgeyByZXR1cm4gYXJyOyB9XHJcbiAgICBpZiAoZGVsaW0gPT09ICcgJykgeyBzdHIgKz0gZGVsaW07IH1cclxuXHJcbiAgICB2YXIgY2hySW5kZXggPSAwO1xyXG4gICAgdmFyIHN0ckxlbiA9IHN0ci5sZW5ndGg7XHJcbiAgICB2YXIgcmVwbFBhdHQgPSBuZXcgUmVnRXhwKCdbXicrZXNjYXBlUGF0dGVybihkZWxpbSkrJ10rJCcpO1xyXG4gICAgd2hpbGUgKGNockluZGV4IDwgIHN0ckxlbikge1xyXG4gICAgICAgIHZhciBzdWJTdHJpbmcgPSBzdHIuc3Vic3RyKGNockluZGV4LCBsZW4pO1xyXG4gICAgICAgIGlmICghY29udGFpbnMoc3ViU3RyaW5nLCBkZWxpbSkpe1xyXG4gICAgICAgICAgICBhcnIucHVzaCh0cnVuY2F0ZShzdWJTdHJpbmcsIHN1YlN0cmluZy5sZW5ndGgpKTtcclxuICAgICAgICAgICAgY2hySW5kZXggKz0gc3ViU3RyaW5nLmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3ViU3RyaW5nID0gc3ViU3RyaW5nLnJlcGxhY2UocmVwbFBhdHQsICcnKTtcclxuICAgICAgICBhcnIucHVzaCh0cmltKHN1YlN0cmluZykpO1xyXG4gICAgICAgIGNockluZGV4ICs9IHN1YlN0cmluZy5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyO1xyXG59XHJcblxyXG4vLyBMZXZlbnNodGVpbiBkaXN0YW5jZSAoZWRpdERpc3RhbmNlKSBpcyBhIG1lYXN1cmUgb2YgdGhlIHNpbWlsYXJpdHkgYmV0d2VlbiB0d28gc3RyaW5ncyxcclxuLy8gVGhlIGRpc3RhbmNlIGlzIHRoZSBudW1iZXIgb2YgZGVsZXRpb25zLCBpbnNlcnRpb25zLCBvciBzdWJzdGl0dXRpb25zIHJlcXVpcmVkIHRvXHJcbi8vIHRyYW5zZm9ybSBzb3VyY2UgaW50byB0YXJnZXQuXHJcbmZ1bmN0aW9uIGVkaXREaXN0YW5jZShzb3VyY2UsIHRhcmdldCkge1xyXG4gICAgdmFyIGk7XHJcblxyXG4gICAgaWYgKHNvdXJjZSA9PT0gbnVsbCkgeyBzb3VyY2UgPSAnJzsgfVxyXG4gICAgaWYgKHRhcmdldCA9PT0gbnVsbCkgeyB0YXJnZXQgPSAnJzsgfVxyXG5cclxuICAgIGlmIChzb3VyY2UgPT09IHRhcmdldCkgeyByZXR1cm4gMDsgfVxyXG5cclxuICAgIHZhciBkID0gW107XHJcbiAgICB2YXIgY29zdDtcclxuICAgIHZhciBuID0gc291cmNlLmxlbmd0aDtcclxuICAgIHZhciBtID0gdGFyZ2V0Lmxlbmd0aDtcclxuICAgIHZhciBqO1xyXG5cclxuICAgIGlmIChuID09PSAwKSB7IHJldHVybiBtOyB9XHJcbiAgICBpZiAobSA9PT0gMCkgeyByZXR1cm4gbjsgfVxyXG5cclxuICAgIGZvciAoaT0wOyBpPD1uOyBpKyspIHsgZFtpXSA9IFtdOyB9XHJcbiAgICBmb3IgKGk9MDsgaTw9bjsgaSsrKSB7IGRbaV1bMF0gPSBpOyB9XHJcbiAgICBmb3IgKGo9MDsgajw9bTsgaisrKSB7IGRbMF1bal0gPSBqOyB9XHJcblxyXG4gICAgZm9yIChpPTE7IGk8PW47IGkrKykge1xyXG5cclxuICAgICAgICB2YXIgc19pID0gc291cmNlLmNoYXJBdChpLTEpO1xyXG4gICAgICAgIGZvciAoaj0xOyBqPD1tOyBqKyspIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0X2ogPSB0YXJnZXQuY2hhckF0KGotMSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc19pID09PSB0X2opIHsgY29zdCA9IDA7IH1cclxuICAgICAgICAgICAgZWxzZSB7IGNvc3QgPSAxOyB9XHJcblxyXG4gICAgICAgICAgICBkW2ldW2pdID0gTWF0aC5taW4oZFtpLTFdW2pdKzEsIGRbaV1bai0xXSsxLCBkW2ktMV1bai0xXStjb3N0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZFtuXVttXTtcclxufVxyXG5cclxuLy8gcGVyY2VudGFnZSBvZiBzaW1pbGlhcml0eSBmcm9tIDAgdG8gMVxyXG5mdW5jdGlvbiBzaW1pbGFyaXR5KGEsIGIpIHtcclxuICAgIHZhciBlID0gZWRpdERpc3RhbmNlKGEsIGIpO1xyXG4gICAgdmFyIG0gPSBNYXRoLm1heChhLmxlbmd0aCwgYi5sZW5ndGgpO1xyXG4gICAgaWYgKG0gPT09IDApIHsgcmV0dXJuIDE7IH1cclxuICAgIGVsc2UgeyByZXR1cm4gKDEgLSBlL20pOyB9XHJcbn1cclxuXHJcblxyXG52YXIgU3RyaW5nVXRpbHMgPSB7XHJcbiAgICAvLyBoZWxwZXI6XHJcbiAgICAnZXNjYXBlUGF0dGVybic6IGVzY2FwZVBhdHRlcm4sXHJcblxyXG4gICAgLy8gZm9ybWF0OlxyXG4gICAgJ3RyaW0nOiB0cmltLFxyXG4gICAgJ3RyaW1MZWZ0JzogdHJpbUxlZnQsXHJcbiAgICAndHJpbVJpZ2h0JzogdHJpbVJpZ2h0LFxyXG4gICAgJ3BhZExlZnQnOiBwYWRMZWZ0LFxyXG4gICAgJ3BhZFJpZ2h0JzogcGFkUmlnaHQsXHJcbiAgICAncmVtb3ZlRXh0cmFXaGl0ZXNwYWNlJzogcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlLFxyXG4gICAgJ3JlbW92ZSc6IHJlbW92ZSxcclxuICAgICd0cnVuY2F0ZSc6IHRydW5jYXRlLFxyXG4gICAgJ2NhcGl0YWxpemUnOiBjYXBpdGFsaXplLFxyXG4gICAgJ3Byb3BlckNhc2UnOiBwcm9wZXJDYXNlLFxyXG4gICAgJ3JldmVyc2UnOiByZXZlcnNlLFxyXG4gICAgJ3JldmVyc2VXb3Jkcyc6IHJldmVyc2VXb3JkcyxcclxuICAgICdzdHJpcFRhZ3MnOiBzdHJpcFRhZ3MsXHJcbiAgICAnc3dhcENhc2UnOiBzd2FwQ2FzZSxcclxuICAgICd0aW1lQ29kZSc6IHRpbWVDb2RlLFxyXG5cclxuICAgIC8vIHF1ZXJ5OlxyXG4gICAgJ2JlZ2luc1dpdGgnOiBiZWdpbnNXaXRoLFxyXG4gICAgJ2NvbnRhaW5zJzogY29udGFpbnMsXHJcbiAgICAnY291bnRPZic6IGNvdW50T2YsXHJcbiAgICAnZW5kc1dpdGgnOiBlbmRzV2l0aCxcclxuICAgICdoYXNUZXh0JzogaGFzVGV4dCxcclxuICAgICdpc0VtcHR5JzogaXNFbXB0eSxcclxuICAgICdpc051bWVyaWMnOiBpc051bWVyaWMsXHJcbiAgICAnd29yZENvdW50Jzogd29yZENvdW50LFxyXG5cclxuICAgIC8vIHN1YnN0cmluZzpcclxuICAgICdhZnRlckZpcnN0JzogYWZ0ZXJGaXJzdCxcclxuICAgICdhZnRlckxhc3QnOiBhZnRlckxhc3QsXHJcbiAgICAnYmVmb3JlRmlyc3QnOiBiZWZvcmVGaXJzdCxcclxuICAgICdiZWZvcmVMYXN0JzogYmVmb3JlTGFzdCxcclxuICAgICdiZXR3ZWVuJzogYmV0d2VlbixcclxuXHJcbiAgICAvLyB1dGlsaXR5OlxyXG4gICAgJ2Jsb2NrJzogYmxvY2ssXHJcbiAgICAnZWRpdERpc3RhbmNlJzogZWRpdERpc3RhbmNlLFxyXG4gICAgJ3NpbWlsYXJpdHknOiBzaW1pbGFyaXR5XHJcbn07XHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICAgIG1vZHVsZS5leHBvcnRzID0gU3RyaW5nVXRpbHM7XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHRyYWNrID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oZ2FBY2NvdW50KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpemUgR29vZ2xlIEFuYWx5dGljcyB3aXRoIGFjY291bnQgSWQ6JywgZ2FBY2NvdW50KTtcclxuXHJcbiAgICAgICAgLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xyXG4gICAgICAgIChmdW5jdGlvbihpLHMsbyxnLHIsYSxtKXtpWydHb29nbGVBbmFseXRpY3NPYmplY3QnXT1yO2lbcl09aVtyXXx8ZnVuY3Rpb24oKXtcclxuICAgICAgICAoaVtyXS5xPWlbcl0ucXx8W10pLnB1c2goYXJndW1lbnRzKTt9LGlbcl0ubD0xKm5ldyBEYXRlKCk7YT1zLmNyZWF0ZUVsZW1lbnQobyksXHJcbiAgICAgICAgbT1zLmdldEVsZW1lbnRzQnlUYWdOYW1lKG8pWzBdO2EuYXN5bmM9MTthLnNyYz1nO20ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYSxtKTtcclxuICAgICAgICB9KSh3aW5kb3csZG9jdW1lbnQsJ3NjcmlwdCcsJy8vd3d3Lmdvb2dsZS1hbmFseXRpY3MuY29tL2FuYWx5dGljcy5qcycsJ2dhJyk7XHJcbiAgICAgICAgLyoganNoaW50IGlnbm9yZTplbmQgKi9cclxuXHJcbiAgICAgICAgZ2EoJ2NyZWF0ZScsIGdhQWNjb3VudCwgJ2F1dG8nKTtcclxuICAgICAgICBnYSgnc2VuZCcsICdwYWdldmlldycpO1xyXG4gICAgfSxcclxuICAgIHBhZ2U6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3RyYWNrLnBhZ2U6JywgdmFsdWUpO1xyXG4gICAgICAgIGdhKCdzZW5kJywge1xyXG4gICAgICAgICAgICAnaGl0VHlwZSc6ICdwYWdldmlldycsXHJcbiAgICAgICAgICAgICdwYWdlJzogdmFsdWUsXHJcbiAgICAgICAgICAgICd0aXRsZSc6IHZhbHVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgZXZlbnQ6IGZ1bmN0aW9uKGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd0cmFjay5ldmVudDonLCBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpO1xyXG4gICAgICAgIGlmIChsYWJlbCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndHJhY2sgd2l0aCBsYWJlbDonLCBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpO1xyXG4gICAgICAgICAgICBnYSgnc2VuZCcsIHtcclxuICAgICAgICAgICAgICAgICdoaXRUeXBlJzogJ2V2ZW50JyxcclxuICAgICAgICAgICAgICAgICdldmVudENhdGVnb3J5JzogY2F0ZWdvcnksXHJcbiAgICAgICAgICAgICAgICAnZXZlbnRBY3Rpb24nOiBhY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAnZXZlbnRMYWJlbCc6IGxhYmVsLFxyXG4gICAgICAgICAgICAgICAgJ2V2ZW50VmFsdWUnOiB2YWx1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndHJhY2sgd2l0aG91dCBsYWJlbDonLCBjYXRlZ29yeSwgYWN0aW9uKTtcclxuICAgICAgICAgICAgZ2EoJ3NlbmQnLCB7XHJcbiAgICAgICAgICAgICAgICAnaGl0VHlwZSc6ICdldmVudCcsXHJcbiAgICAgICAgICAgICAgICAnZXZlbnRDYXRlZ29yeSc6IGNhdGVnb3J5LFxyXG4gICAgICAgICAgICAgICAgJ2V2ZW50QWN0aW9uJzogYWN0aW9uXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB0cmFjaztcclxufVxyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXJsUGFyYW1zID0ge307XHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHBsID0gL1xcKy9nOyAgLy8gUmVnZXggZm9yIHJlcGxhY2luZyBhZGRpdGlvbiBzeW1ib2wgd2l0aCBhIHNwYWNlXHJcbiAgICB2YXIgc2VhcmNoID0gLyhbXiY9XSspPT8oW14mXSopL2c7XHJcbiAgICB2YXIgZGVjb2RlID0gZnVuY3Rpb24ocykge1xyXG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocy5yZXBsYWNlKHBsLCAnICcpKTtcclxuICAgIH07XHJcbiAgICB2YXIgcXVlcnkgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTtcclxuICAgIHZhciBtYXRjaCA9IHNlYXJjaC5leGVjKHF1ZXJ5KTtcclxuICAgIHdoaWxlIChtYXRjaCkge1xyXG4gICAgICAgIHVybFBhcmFtc1tkZWNvZGUobWF0Y2hbMV0pXSA9IGRlY29kZShtYXRjaFsyXSk7XHJcbiAgICAgICAgbWF0Y2ggPSBzZWFyY2guZXhlYyhxdWVyeSk7XHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICAgIG1vZHVsZS5leHBvcnRzID0gdXJsUGFyYW1zO1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnLi9FbWl0dGVyJyksXHJcbiAgICByZXNpemVVdGlsID0gcmVxdWlyZSgnLi9yZXNpemUnKTtcclxuXHJcbnZhciBWaWV3UG9ydCA9IHtcclxuICAgIHJlY3Q6IHtcclxuICAgICAgICAneCc6IDAsXHJcbiAgICAgICAgJ3knOiAwLFxyXG4gICAgICAgICd3aWR0aCc6IDAsXHJcbiAgICAgICAgJ2hlaWdodCc6IDAsXHJcbiAgICAgICAgJ3N0YWdlV2lkdGgnOiAwLFxyXG4gICAgICAgICdzdGFnZUhlaWdodCc6IDAsXHJcbiAgICAgICAgJ3NjYWxlJzogMVxyXG4gICAgfSxcclxuICAgIG9yaWdpbmFsV2lkdGg6IDAsXHJcbiAgICBvcmlnaW5hbEhlaWdodDogMCxcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICAgICAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcclxuICAgICAgICB0aGlzLm9yaWdpbmFsV2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLm9yaWdpbmFsSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB3aW5kb3cub25yZXNpemUgPSB3aW5kb3cub25vcmllbnRhdGlvbmNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZWxmLnJlc2l6ZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5yZXNpemUoKTtcclxuICAgIH0sXHJcbiAgICByZXNpemU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIHJlc2V0XHJcbiAgICAgICAgdGhpcy5yZWN0LnggPSAwO1xyXG4gICAgICAgIHRoaXMucmVjdC55ID0gMDtcclxuICAgICAgICB0aGlzLnJlY3Qud2lkdGggPSB0aGlzLm9yaWdpbmFsV2lkdGg7XHJcbiAgICAgICAgdGhpcy5yZWN0LmhlaWdodCA9IHRoaXMub3JpZ2luYWxIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5yZWN0LnN0YWdlV2lkdGggPSB0aGlzLmdldFdpbmRvd1dpZHRoKCk7XHJcbiAgICAgICAgdGhpcy5yZWN0LnN0YWdlSGVpZ2h0ID0gdGhpcy5nZXRXaW5kb3dIZWlnaHQoKTtcclxuICAgICAgICB0aGlzLnJlY3Quc2NhbGUgPSAxO1xyXG4gICAgICAgIC8vIHJlc2l6ZVxyXG4gICAgICAgIGlmKHRoaXMucmVjdC5zdGFnZVdpZHRoID4gdGhpcy5yZWN0LnN0YWdlSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHJlc2l6ZVV0aWwodGhpcy5yZWN0LCB0aGlzLnJlY3Quc3RhZ2VXaWR0aCwgdGhpcy5yZWN0LnN0YWdlSGVpZ2h0LCB0cnVlLCAnZmlsbCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmVzaXplVXRpbCh0aGlzLnJlY3QsIHRoaXMucmVjdC5zdGFnZVdpZHRoLCB0aGlzLnJlY3Quc3RhZ2VIZWlnaHQsIHRydWUsICdmaXRXaWR0aCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlY3Quc2NhbGUgPSB0aGlzLnJlY3Qud2lkdGggLyB0aGlzLm9yaWdpbmFsV2lkdGg7XHJcbiAgICAgICAgLy8gbm90aWZ5XHJcbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ3Jlc2l6ZScpO1xyXG4gICAgfSxcclxuICAgIG1vdXNlTGVmdFdpbmRvdzogZnVuY3Rpb24oZm4sIHRoaXNBcmcpIHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdmFyIGZyb20gPSBlLnJlbGF0ZWRUYXJnZXQgfHwgZS50b0VsZW1lbnQ7XHJcbiAgICAgICAgICAgIGlmICghZnJvbSB8fCBmcm9tLm5vZGVOYW1lID09PSAnSFRNTCcpIHtcclxuICAgICAgICAgICAgICAgIGZuLmNhbGwodGhpc0FyZyB8fCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGdldFdpbmRvd1dpZHRoOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBHZXQgY3VycmVudCBicm93c2VyIHZpZXdwYW5lIGhlaWd0aHRcclxuICAgICAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggfHxcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggfHwgMDtcclxuICAgIH0sXHJcbiAgICBnZXRXaW5kb3dIZWlnaHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIEdldCBjdXJyZW50IGJyb3dzZXIgdmlld3BhbmUgaGVpZ3RodFxyXG4gICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQgfHxcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fFxyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCB8fCAwO1xyXG4gICAgfSxcclxuICAgIGdldFNjcm9sbFRvcDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IHdpbmRvdy5wYWdlWU9mZnNldCB8fCAwO1xyXG4gICAgfSxcclxuICAgIGdldFdpbmRvd1Njcm9sbFk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIEdldCBjdXJyZW50IGFic29sdXRlIHdpbmRvdyBzY3JvbGwgcG9zaXRpb25cclxuICAgICAgICByZXR1cm4gd2luZG93LnBhZ2VZT2Zmc2V0IHx8XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgMDtcclxuICAgIH0sXHJcbiAgICBnZXREb2NIZWlnaHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIEdldCBjdXJyZW50IGFic29sdXRlIGRvY3VtZW50IGhlaWdodFxyXG4gICAgICAgIHJldHVybiBNYXRoLm1heChcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQgfHwgMCxcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCB8fCAwLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCB8fCAwLFxyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0IHx8IDAsXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0IHx8IDAsXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHwgMFxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgZ2V0U2Nyb2xsUGVyY2VudGFnZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gR2V0IGN1cnJlbnQgdmVydGljYWwgc2Nyb2xsIHBlcmNlbnRhZ2VcclxuICAgICAgICByZXR1cm4gKCh0aGlzLmdldFdpbmRvd1Njcm9sbFkoKSArIHRoaXMuZ2V0V2luZG93SGVpZ2h0KCkpIC8gdGhpcy5nZXREb2NIZWlnaHQoKSkgKiAxMDA7XHJcbiAgICB9XHJcbn07XHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICAgIG1vZHVsZS5leHBvcnRzID0gVmlld1BvcnQ7XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCcuL0VtaXR0ZXInKTtcclxuXHJcbnZhciB2aXNpYmlsaXR5LFxyXG4gICAgaGlkZGVuLFxyXG4gICAgdmlzaWJpbGl0eUNoYW5nZTtcclxuXHJcbmZ1bmN0aW9uIG9uVmlzaWJpbGl0eUNoYW5nZSgpIHtcclxuICAgIGlmIChkb2N1bWVudFtoaWRkZW5dKSB7XHJcbiAgICAgICAgdmlzaWJpbGl0eS5lbWl0KCdoaWRkZW4nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmlzaWJpbGl0eS5lbWl0KCdzaG93bicpO1xyXG4gICAgfVxyXG59XHJcblxyXG5pZiAodHlwZW9mIGRvY3VtZW50LmhpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gT3BlcmEgMTIuMTAgYW5kIEZpcmVmb3ggMTggYW5kIGxhdGVyIHN1cHBvcnRcclxuICAgIGhpZGRlbiA9ICdoaWRkZW4nO1xyXG4gICAgdmlzaWJpbGl0eUNoYW5nZSA9ICd2aXNpYmlsaXR5Y2hhbmdlJztcclxufSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQubW96SGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgaGlkZGVuID0gJ21vekhpZGRlbic7XHJcbiAgICB2aXNpYmlsaXR5Q2hhbmdlID0gJ21venZpc2liaWxpdHljaGFuZ2UnO1xyXG59IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC5tc0hpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIGhpZGRlbiA9ICdtc0hpZGRlbic7XHJcbiAgICB2aXNpYmlsaXR5Q2hhbmdlID0gJ21zdmlzaWJpbGl0eWNoYW5nZSc7XHJcbn0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50LndlYmtpdEhpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIGhpZGRlbiA9ICd3ZWJraXRIaWRkZW4nO1xyXG4gICAgdmlzaWJpbGl0eUNoYW5nZSA9ICd3ZWJraXR2aXNpYmlsaXR5Y2hhbmdlJztcclxufVxyXG5cclxuaWYodmlzaWJpbGl0eUNoYW5nZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHZpc2liaWxpdHlDaGFuZ2UsIG9uVmlzaWJpbGl0eUNoYW5nZSwgZmFsc2UpO1xyXG59XHJcblxyXG52aXNpYmlsaXR5ID0gT2JqZWN0LmNyZWF0ZShFbWl0dGVyLnByb3RvdHlwZSwge1xyXG4gICAgX2V2ZW50czogeyB2YWx1ZToge30gfVxyXG59KTtcclxuXHJcbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB2aXNpYmlsaXR5O1xyXG59XHJcbiJdfQ==
