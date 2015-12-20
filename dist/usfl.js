(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.usfl = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
            options = {
                url: url
            };
        }

        if (options.isTouchLocked === undefined) {
            options.isTouchLocked = isTouchLocked;
        }
        if (options.blob === undefined) {
            options.blob = blob;
        }

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
        _events: {
            value: {}
        },
        add: {
            value: add
        },
        start: {
            value: start
        },
        get: {
            value: get
        },
        destroy: {
            value: destroy
        }
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
        if (!file) {
            return;
        }
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
                var src = window.URL.createObjectURL(request.response);
                request = new Image();
                request.addEventListener('error', errorHandler, false);
                request.addEventListener('load', imageBlobHandler, false);
                request.src = src;
            }
        });
    };

    var imageBlobHandler = function() {
        window.URL.revokeObjectURL(url);
        dispatchComplete(request);
    };

    // audio

    var loadAudio = function(context) {
        if (context) {
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
        _events: {
            value: {}
        },
        start: {
            value: start
        },
        destroy: {
            value: destroy
        }
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
            // this.log(url, mbs, secs);
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

},{"./Emitter":3}],2:[function(require,module,exports){
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

    var check = function(currentPos, lastPos) {
        if (currentPos <= lastPos) {
            return;
        }
        if (typeof dispatch !== 'function') {
            return;
        }

        list.some(function(item) {
            if (inRange(item.position, currentPos, lastPos)) {
                dispatch(item);
                return true;
            }
        });
    };

    var inRange = function(cuepointPos, currentPos, lastPos) {
        if (cuepointPos > currentPos) {
            return false;
        }
        if (cuepointPos <= lastPos) {
            return false;
        }

        var diff = cuepointPos - currentPos;
        if (diff < 0) {
            diff = -diff;
        }
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

},{}],3:[function(require,module,exports){
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

},{"events":23}],4:[function(require,module,exports){
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
            window.FB.init({
                appId: appId,
                status: true,
                cookie: true,
                logging: true,
                xfbml: true
            });
            window.FB.getLoginStatus(function(response) {
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
        window.FB.login(function() {
            callback();
        }, {
            'scope': (permissions || '')
        });
    }

    // check that user has granted required permissions and request if needed
    function checkPermissions(callback, permissions) {
        if (permissions === undefined || permissions === '') {
            return callback();
        }

        window.FB.api('/me/permissions', function(response) {
            var hasPermission = true;
            var perms = permissions.split(',');
            for (var i = 0; i < perms.length; i++) {
                hasPermission = !!response.data[0][perms[i]];
                if (!hasPermission) {
                    break;
                }
            }
            if (hasPermission) {
                return callback();
            }
            login(callback, permissions);
        });
    }

    // check user login and permission status
    function checkAuth(callback, permissions) {
        window.FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                checkPermissions(callback, permissions);
            } else {
                login(callback, permissions);
            }
        });
    }

    function getInfo(permissions, fields) {
        checkAuth(function() {
            window.FB.api('/me', {
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
        return document.location.protocol +
            '//graph.facebook.com/' + id +
            '/picture?width=' + width + '&height=' + height;
    },
    resizeCanvas: function(height) {
        window.FB.Canvas.setSize({
            'height': height
        });
        setTimeout(function() {
            window.FB.Canvas.setSize({
                'height': height
            });
        }, 1000);
    },
    scrollToTop: function() {
        window.FB.Canvas.scrollTo(0, 0);
    },
    logout: function() {
        window.FB.Event.subscribe('auth.logout', function(response) {
            var success = response && !response.error;
            console.log('onFacebookLogoutComplete', success);
        });
        window.FB.logout();
    },
    getFriends: function(limit) {
        window.FB.api('/me/friends', {
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
        window.FB.api('/me/feed', 'post', {
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
        window.FB.ui({
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
    streamPublish: function(message, attachment, actionLinks, userMessagePrompt, targetId) {
        var publish = {
            method: 'stream.publish',
            message: message,
            attachment: attachment,
            action_links: actionLinks,
            user_message_prompt: userMessagePrompt,
            target_id: targetId
        };
        window.FB.ui(publish, function(response) {
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
        var actionLinks = [{
            text: 'action_link',
            href: 'http://example.com/'
        }];
        var userMessagePrompt = 'user_message_prompt';
        this.streamPublish(message, attachment, actionLinks, userMessagePrompt);
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = Facebook;
}

},{"./Emitter":3}],5:[function(require,module,exports){
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
        var major = flashVersion.major;
        var minor = flashVersion.minor;
        var minVersionArr = (this.embedvars.version || '10.2.0').split('.');
        var minMajor = parseInt(minVersionArr[0], 10);
        var minMinor = parseInt(minVersionArr[1], 10);

        var result;

        // Detect / Embed
        if (flashVersion.major === 0) {
            // No Flash
            result = -1;
        } else if (major < minMajor || (major === minMajor && minor < minMinor)) {
            // Update Flash
            result = 0;
        } else {
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

            swfobject.embedSWF(
                this.url,
                this.elementId,
                (this.embedvars.width || '100%'),
                (this.embedvars.height || '100%'),
                (this.embedvars.version || '10.2.0'),
                this.flashvars.assetsPath + 'swf/expressInstall.swf',
                this.flashvars,
                params,
                attributes
            );

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
        if (this.isReady) {
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
     * flash.call( "onSomeJSActionComplete", response );
     * - calls the ExternalInterface call back 'onSomeJSActionComplete' in Flash
     * flash.call("onFlashDispatcher", "Hello", "World", {testObj:true}, false);
     * - can send multiple arguments - max 4 at moment!
     *
     */
    call: function(functionName) {
        try {
            console.log('flash.call: ', functionName, 'arguments:', (Array.prototype.slice.call(arguments).slice(1)));

            var flashObject = this.getFlashObject();
            console.log('flash ready:', this.isReady, flashObject);
            if (this.isReady && flashObject && flashObject[functionName]) {
                // TODO: figure out how to do this in a clever way!
                if (arguments.length > 4) {
                    return flashObject[functionName](arguments[1], arguments[2], arguments[3], arguments[4]);
                } else if (arguments.length > 3) {
                    return flashObject[functionName](arguments[1], arguments[2], arguments[3]);
                } else if (arguments.length > 2) {
                    return flashObject[functionName](arguments[1], arguments[2]);
                } else if (arguments.length > 1) {
                    return flashObject[functionName](arguments[1]);
                } else {
                    return flashObject[functionName]();
                }
            } else {
                console.log('flash.queuedCalls.push:', arguments);
                this.queuedCalls.push(arguments);
            }
        } catch (error) {
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
        while (i < l) {
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
        function queryParamsToFlashvars(vars) {
            for (var param in vars) {
                if (vars.hasOwnProperty(param)) {
                    setFlashvarFromQueryString(param);
                }
            }
        }
        queryParamsToFlashvars(flashvars);
        // Look for locale and debug params if they haven't already been defined
        if (!flashvars.locale) {
            setFlashvarFromQueryString('locale');
        }
        if (!flashvars.debug) {
            setFlashvarFromQueryString('debug');
        }
        if (!flashvars.bw) {
            setFlashvarFromQueryString('bw');
        }
    },
    /*
     * Check paths for correct formatting
     */
    _formatPaths: function(flashvars) {
        // Make sure paths start with protocol and end with '/'
        function formatPath(input) {
            if (input && input.lastIndexOf('/') !== input.length - 1) {
                input = input + '/';
            }
            if (input && input.substr(0, 2) === '//') {
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

},{"./Emitter":3}],6:[function(require,module,exports){
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
                ticks++;
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
'use strict';

function InputCoords() {
    var self;
    var calculateCoords = (function() {
        var fn;
        if (typeof window.pageXOffset === 'number') {
            fn = function(e) {
                var pX = (e.clientX || 0),
                    pY = (e.clientY || 0),
                    sX = window.pageXOffset,
                    sY = window.pageYOffset;
                self.x = pX + sX;
                self.y = pY + sY;
                self.percentX = self.x / window.innerWidth;
                self.percentY = self.y / window.innerHeight;
            };
        } else {
            fn = function(e) {
                e = (e && e.clientX) ? e : window.event;
                var pX = e.clientX,
                    pY = e.clientY,
                    d = document.documentElement,
                    b = document.body,
                    sX = Math.max(d.scrollLeft, b.scrollLeft),
                    sY = Math.max(d.scrollTop, b.scrollTop);
                self.x = pX + sX;
                self.y = pY + sY;
                self.percentX = self.x / window.innerWidth;
                self.percentY = self.y / window.innerHeight;
            };
        }
        return fn;
    }());

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

},{}],9:[function(require,module,exports){
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

},{"./keyboard":20}],10:[function(require,module,exports){
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
        if (!first) {
            first = last = item;
        } else {
            var i = first;
            while (i.next) {
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
        } else {
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
        } else {
            before.prev.next = item;
        }

        before.prev = item;

        return item;
    }

    function forEach(callback, callbackContext) {
        if (!first) {
            return;
        }
        var args = Array.prototype.splice.call(arguments, 2);
        args.unshift(null); // make space for item

        var item = first;
        while (item) {
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
            while (i) {
                count++;
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

},{}],11:[function(require,module,exports){
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
        if (!event) {
            event = window.event;
        }
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
        _events: {
            value: {}
        },
        add: {
            value: add
        },
        remove: {
            value: remove
        }
    });

    return Object.freeze(mouseWheel);
}

if (typeof module === 'object' && module.exports) {
    module.exports = MouseWheel;
}

},{"./Emitter":3}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
'use strict';

var EventEmitter = require('./emitter');

module.exports = function TouchInput(el, minSwipeDistance) {
    el = el || document.body;
    minSwipeDistance = minSwipeDistance || 10;

    var data = {
        start: [-1, -1],
        move: [-1, -1],
        end: [-1, -1],
        position: [-1, -1],
        distance: [0, 0],
        direction: ['none', 'none'],
        touching: false,
        originalEvent: null
    };

    var touchInput;

    function detectSwipe(i, a, b) {
        data.distance[i] = Math.abs(data.start[i] - data.end[i]);
        if (data.distance[i] >= minSwipeDistance) {
            data.direction[i] = data.start[i] > data.move[i] ? a : b;
            touchInput.emit('swipe', data.direction[i], data);
        }
    }

    function touchHandler(event) {
        if (!(event && event.touches)) {
            return;
        }
        data.originalEvent = event;
        var touch = event.touches[0];
        var x = touch && touch.pageX;
        var y = touch && touch.pageY;

        switch (event.type) {
            case 'touchstart':
                data.start[0] = data.move[0] = data.end[0] = data.position[0] = x;
                data.start[1] = data.move[1] = data.end[1] = data.position[1] = y;
                data.touching = true;
                break;
            case 'touchmove':
                data.move[0] = data.position[0] = x;
                data.move[1] = data.position[1] = y;
                break;
            case 'touchend':
                data.end[0] = data.position[0] = x;
                data.end[1] = data.position[1] = y;
                data.touching = false;
                if (touchInput.listenerCount('swipe')) {
                    detectSwipe(0, 'left', 'right');
                    detectSwipe(1, 'up', 'down');
                }
                break;
            default:
        }
    }

    function listen(elem) {
        el = elem || el;
        el.addEventListener('touchstart', touchHandler);
        el.addEventListener('touchmove', touchHandler);
        el.addEventListener('touchend', touchHandler);
        return touchInput;
    }

    function destroy() {
        touchInput.removeAllListeners();
        el.removeEventListener('touchstart', touchHandler);
        el.removeEventListener('touchmove', touchHandler);
        el.removeEventListener('touchend', touchHandler);
        el = null;
        return touchInput;
    }

    listen(el);

    touchInput = Object.create(EventEmitter.prototype, {
        _events: {
            value: {}
        },
        listen: {
            value: listen
        },
        isDown: {
            value: function() {
                return data.touching;
            }
        },
        getTouch: {
            value: function() {
                return data;
            }
        },
        destroy: {
            value: destroy
        }
    });

    return Object.freeze(touchInput);
};

},{"./emitter":17}],14:[function(require,module,exports){
'use strict';

var Emitter = require('./Emitter');

function VideoObject(videoEl) {
    var el = videoEl || document.createElement('video');
    var player;

    var metadataHandler = function() {
        player.emit('metadata', {
            src: el.currentSrc,
            width: el.videoWidth,
            height: el.videoHeight,
            duration: el.duration
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
        if (window.Blob && url instanceof window.Blob) {
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
        _events: {
            value: {}
        },
        destroy: {
            value: destroy
        },
        load: {
            value: load
        },
        pause: {
            value: pause
        },
        play: {
            value: play
        },
        seek: {
            value: seek
        },
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

},{"./Emitter":3}],15:[function(require,module,exports){
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
        return arr.sort(function(a, b) {
            return a - b;
        });
    },
    sortRandom: function(arr) {
        return arr.sort(function() {
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
    return !!(android() && parseFloat(ua.slice(ua.indexOf('Android') + 8)) < 4);
}

function androidStock() {
    if (!android()) {
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
        re;
    if (navigator.appName === 'Microsoft Internet Explorer') {
        re = new RegExp('MSIE ([0-9]{1,}[.0-9]{0,})');
        if (re.exec(ua) !== null) {
            rv = parseFloat( RegExp.$1 );
        }
    } else if (navigator.appName === 'Netscape') {
        re = new RegExp('Trident/.*rv:([0-9]{1,}[.0-9]{0,})');
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
arguments[4][3][0].apply(exports,arguments)
},{"dup":3,"events":23}],18:[function(require,module,exports){
'use strict';

var Emitter = require('./Emitter');

var Fullscreen = (function() {

    var self,
        docEl = document.documentElement,
        isSupported = !!(docEl.requestFullScreen ||
            docEl.webkitRequestFullScreen ||
            docEl.mozRequestFullScreen);

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
            value: function(el) {
                el = el || document.documentElement;

                var method = el.requestFullScreen ||
                    el.webkitRequestFullScreen ||
                    el.mozRequestFullScreen;

                if (method) {
                    method.call(el);
                }
            }
        },
        exit: {
            value: function() {
                var method = document.exitFullscreen ||
                    document.cancelFullScreen ||
                    document.webkitCancelFullScreen ||
                    document.mozCancelFullScreen;

                if (method) {
                    method.call(document);
                }
            }
        },
        toggle: {
            value: function(el) {
                if (this.isFullscreen()) {
                    this.exit();
                } else {
                    this.enter(el);
                }
            }
        },
        isFullscreen: {
            value: function() {
                return !!(document.fullScreen ||
                    document.webkitIsFullScreen ||
                    document.mozFullScreen);
            }
        }
    });

    return self;

}());

if (typeof module === 'object' && module.exports) {
    module.exports = Fullscreen;
}

},{"./Emitter":3}],19:[function(require,module,exports){
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
usfl.TouchInput = require('./TouchInput');
usfl.track = require('./track');
usfl.urlParams = require('./urlParams');
usfl.VideoPlayer = require('./VideoPlayer');
usfl.Viewport = require('./viewport');
usfl.visibility = require('./visibility');

module.exports = usfl;

},{"./AssetLoader":1,"./CuepointsReader":2,"./Emitter":3,"./Facebook":4,"./Flash":5,"./Fps":6,"./Graphics":7,"./InputCoords":8,"./KeyInput":9,"./LinkedList":10,"./MouseWheel":11,"./ObjectPool":12,"./TouchInput":13,"./VideoPlayer":14,"./array":15,"./device":16,"./fullscreen":18,"./keyboard":20,"./math":21,"./modern":22,"./platform":24,"./polyfill-classlist":25,"./polyfill-console":26,"./polyfill-raf":27,"./popup":28,"./ready":29,"./resize":30,"./share":31,"./storage":32,"./string":33,"./track":34,"./urlParams":35,"./viewport":36,"./visibility":37}],20:[function(require,module,exports){
'use strict';

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

},{}],21:[function(require,module,exports){
'use strict';

var DEG = 180 / Math.PI;
var RAD = Math.PI / 180;
var PI2 = Math.PI * 2;

var MathUtils = {
    angle: function(x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        return Math.atan2(dy, dx);
    },
    clamp: function(value, min, max) {
        if (min > max) {
            var a = min;
            min = max;
            max = a;
        }
        if (value < min) {
            return min;
        }
        if (value > max) {
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
        start = start === undefined ? -Math.PI / 2 : start;
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
        return from + (to - from) * percent;
    },
    map: function(v, a, b, x, y) {
        // value, min expected, max expected, map min, map max
        // e.g. map some value between 0 to 100 to -50 to 50
        // map(50, 0, 100, -50, 50) // 0
        // map(25, 0, 100, -50, 50) // -25
        return (v === a) ? x : (v - a) * (y - x) / (b - a) + x;
    },
    percentRemaining: function(value, total) {
        return (value % total) / total;
    },
    radians: function(degrees) {
        return degrees * RAD;
    },
    random: function(min, max) {
        if (isNaN(max)) {
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

},{}],22:[function(require,module,exports){
'use strict';

var modern = (function() {

    var ios5 = (function() {
        return !!(navigator.userAgent.match(/OS 5(_\d)+ like Mac OS X/i));
    }());

    var androidOld = (function() {
        var ua = navigator.userAgent;
        return !!(ua.match(/Android/i) && parseFloat(ua.slice(ua.indexOf('Android') + 8)) < 4);
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
        } catch (e) {
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

if (window.Modernizr) {
    window.Modernizr.addTest('modern', function() {
        return modern;
    });
} else if (typeof module === 'object' && module.exports) {
    module.exports = modern;
}

},{}],23:[function(require,module,exports){
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
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
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
  } else if (listeners) {
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

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
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

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
'use strict';

(function(fn) {
    window.console = window.console || {};
    var methods = [
        'assert',
        'clear',
        'count',
        'debug',
        'dir',
        'dirxml',
        'error',
        'group',
        'groupCollapsed',
        'groupEnd',
        'info',
        'log',
        'markTimeline',
        'memory',
        'profile',
        'profileEnd',
        'table',
        'time',
        'timeEnd',
        'timeStamp',
        'timeline',
        'timelineEnd',
        'trace',
        'warn'
    ];
    var methodName;
    for (var i = 0; i < methods.length; i++) {
        methodName = methods[i];
        window.console[methodName] = window.console[methodName] || fn;
    }
}(function() {}));

},{}],27:[function(require,module,exports){
'use strict';

(function() {
    // ios6, ie10, android < 4.4
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
        window[vendors[x] + 'CancelRequestAnimationFrame'];
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

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
'use strict';

var ready;
if (document.addEventListener) {
    ready = function(fn, context) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            fn.call(context);
        } else {
            document.addEventListener('DOMContentLoaded', function() {
                fn.call(context);
            });
        }
    };
} else {
    ready = function(fn, context) {
        if (document.readyState === 'interactive') {
            fn.call(context);
        }
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState === 'interactive') {
                fn.call(context);
            }
        });
    };
}

if (typeof module === 'object' && module.exports) {
    module.exports = ready;
}

},{}],30:[function(require,module,exports){
'use strict';

var resize = function (rect, areaWidth, areaHeight, autoCenter, method) {
    var width = rect.width,
        height = rect.height,
        scale;

    switch (method) {
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

},{}],31:[function(require,module,exports){
'use strict';

var popup = require('./popup');

// warnBadURL - helper to warn on relative URLs supplied for images etc
function warnBadURL(url) {
    if (url.substr(0, 4) !== 'http') {
        console.warn('URL: ' + url + ' should start with http');
    }
}

var Share = {
    // Standard FB share (uses og tags)
    facebook: function(url) {
        console.log('share.facebook', url);
        return popup('http://www.facebook.com/share.php?u=' +
            encodeURIComponent(url), 'shareFacebook', 720, 480);
    },
    twitter: function(url, text, hashtags, related) {
        console.log('share.twitter', url, text, hashtags, related);
        return popup('https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) +
            '&text=' + encodeURIComponent(text) +
            '&hashtags=' + encodeURIComponent(hashtags) +
            '&related=' + encodeURIComponent(related), 'shareTwitter', 550, 380);
    },
    googlePlus: function(url) {
        console.log('share.googlePlus', url);
        return popup('https://plus.google.com/share?url=' + encodeURIComponent(url), 'shareGooglePlus', 550, 380);
    },
    pinterest: function(url, picture, text) {
        warnBadURL(picture);
        console.log('share.pinterest', url, picture, text);
        return popup('http://pinterest.com/pin/create/button/?url=' + encodeURIComponent(url) +
            '&media=' + encodeURIComponent(picture) +
            '&description=' + encodeURIComponent(text), 'sharePinterest', 630, 280);
    },
    vkontakte: function(url, title, description, image) {
        console.log('share.vkontakte', url, title, description, image);
        return popup('http://vkontakte.ru/share.php?url=' + encodeURIComponent(url) +
            '&title=' + title + '&description=' + description +
            '&image=' + encodeURIComponent(image), 'shareVK', 550, 380);
    },
    renren: function(url, title) {
        console.log('share.renren', url, title);
        return popup('http://share.renren.com/share/buttonshare.do?link=' + encodeURIComponent(url) +
            '&title=' + title, 'shareRenRen', 900, 480);
    },
    weibo: function(url, title, image) {
        console.log('share.weibo', url, title, image);
        return popup('http://service.weibo.com/share/share.php?url=' + encodeURIComponent(url) +
            '&appkey=&title=' + title + '&pic=' + encodeURIComponent(image) +
            '&ralateUid=&language=zh_cn', 'shareWeibo', 640, 480);
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

},{"./popup":28}],32:[function(require,module,exports){
'use strict';

var StorageUtils = {
    saveJSON: function(key, object) {
        if (localStorage) {
            localStorage.setItem(key, JSON.stringify(object));
            return true;
        }
        return false;
    },
    loadJSON: function(key) {
        if (localStorage && localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key));
        }
        return null;
    },
    // convert image to localstorage friendly data URL string
    getImageDataURL: function(img, width, height) {
        if (!this.canvas) {
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

},{}],33:[function(require,module,exports){
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
    while (str.length < length) {
        str = substr + str;
    }
    return str;
}

// pads str with substr from the right
function padRight(str, substr, length) {
    while (str.length < length) {
        str += substr;
    }
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
    if (suffix === undefined) {
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
    } else {
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
    if (delim === undefined) {
        delim = ':';
    }
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor((seconds % 3600) % 60);
    var hr = (h < 10 ? '0' + h : h) + delim;
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
    if (index === -1) {
        return '';
    }
    index += substr.length;
    return str.substr(index);
}

// everything after the last occurence of substr in str
function afterLast(str, substr) {
    var index = str.lastIndexOf(substr);
    if (index === -1) {
        return '';
    }
    index += substr.length;
    return str.substr(index);
}

// everything before the first occurrence of substr in str
function beforeFirst(str, substr) {
    var index = str.indexOf(substr);
    if (index === -1) {
        return '';
    }
    return str.substr(0, index);
}

// everything before the last occurrence of substr in the string.
function beforeLast(str, substr) {
    var index = str.lastIndexOf(substr);
    if (index === -1) {
        return '';
    }
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
            substr = str.substr(startIndex, endIndex - startIndex);
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
    if (delim === undefined) {
        delim = '.';
    }
    var arr = [];

    if (!str || !contains(str, delim)) {
        return arr;
    }
    if (delim === ' ') {
        str += delim;
    }

    var chrIndex = 0;
    var strLen = str.length;
    var replPatt = new RegExp('[^' + escapePattern(delim) + ']+$');
    while (chrIndex < strLen) {
        var subString = str.substr(chrIndex, len);
        if (!contains(subString, delim)) {
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

    if (source === null) {
        source = '';
    }
    if (target === null) {
        target = '';
    }

    if (source === target) {
        return 0;
    }

    var d = [];
    var cost;
    var n = source.length;
    var m = target.length;
    var j;

    if (n === 0) {
        return m;
    }
    if (m === 0) {
        return n;
    }

    for (i = 0; i <= n; i++) {
        d[i] = [];
    }
    for (i = 0; i <= n; i++) {
        d[i][0] = i;
    }
    for (j = 0; j <= m; j++) {
        d[0][j] = j;
    }

    for (i = 1; i <= n; i++) {

        var si = source.charAt(i - 1);
        for (j = 1; j <= m; j++) {

            var tj = target.charAt(j - 1);

            if (si === tj) {
                cost = 0;
            } else {
                cost = 1;
            }

            d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
        }
    }
    return d[n][m];
}

// percentage of similiarity from 0 to 1
function similarity(a, b) {
    var e = editDistance(a, b);
    var m = Math.max(a.length, b.length);
    if (m === 0) {
        return 1;
    } else {
        return (1 - e / m);
    }
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

},{}],34:[function(require,module,exports){
'use strict';

var track = {
    init: function(gaAccount) {
        console.log('Initialize Google Analytics with account Id:', gaAccount);

        /* eslint-disable */
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        /* eslint-enable */

        window.ga('create', gaAccount, 'auto');
        window.ga('send', 'pageview');
    },
    page: function(value) {
        console.log('track.page:', value);
        window.ga('send', {
            'hitType': 'pageview',
            'page': value,
            'title': value
        });
    },
    event: function(category, action, label, value) {
        console.log('track.event:', category, action, label, value);
        if (label) {
            console.log('track with label:', category, action, label, value);
            window.ga('send', {
                'hitType': 'event',
                'eventCategory': category,
                'eventAction': action,
                'eventLabel': label,
                'eventValue': value
            });
        } else {
            console.log('track without label:', category, action);
            window.ga('send', {
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

},{}],35:[function(require,module,exports){
'use strict';

var urlParams = {};

(function() {
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
}());

if (typeof module === 'object' && module.exports) {
    module.exports = urlParams;
}

},{}],36:[function(require,module,exports){
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
        if (this.rect.stageWidth > this.rect.stageHeight) {
            resizeUtil(this.rect, this.rect.stageWidth, this.rect.stageHeight, true, 'fill');
        } else {
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
                fn.call(thisArg);
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

},{"./Emitter":3,"./resize":30}],37:[function(require,module,exports){
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

if (visibilityChange !== undefined) {
    document.addEventListener(visibilityChange, onVisibilityChange, false);
}

visibility = Object.create(Emitter.prototype, {
    _events: { value: {} }
});

if (typeof module === 'object' && module.exports) {
    module.exports = visibility;
}

},{"./Emitter":3}]},{},[19])(19)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJBc3NldExvYWRlci5qcyIsIkN1ZXBvaW50c1JlYWRlci5qcyIsIkVtaXR0ZXIuanMiLCJGYWNlYm9vay5qcyIsIkZsYXNoLmpzIiwiRnBzLmpzIiwiR3JhcGhpY3MuanMiLCJJbnB1dENvb3Jkcy5qcyIsIktleUlucHV0LmpzIiwiTGlua2VkTGlzdC5qcyIsIk1vdXNlV2hlZWwuanMiLCJPYmplY3RQb29sLmpzIiwiVG91Y2hJbnB1dC5qcyIsIlZpZGVvUGxheWVyLmpzIiwiYXJyYXkuanMiLCJkZXZpY2UuanMiLCJmdWxsc2NyZWVuLmpzIiwiaW5kZXguanMiLCJrZXlib2FyZC5qcyIsIm1hdGguanMiLCJtb2Rlcm4uanMiLCJub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsInBsYXRmb3JtLmpzIiwicG9seWZpbGwtY2xhc3NsaXN0LmpzIiwicG9seWZpbGwtY29uc29sZS5qcyIsInBvbHlmaWxsLXJhZi5qcyIsInBvcHVwLmpzIiwicmVhZHkuanMiLCJyZXNpemUuanMiLCJzaGFyZS5qcyIsInN0b3JhZ2UuanMiLCJzdHJpbmcuanMiLCJ0cmFjay5qcyIsInVybFBhcmFtcy5qcyIsInZpZXdwb3J0LmpzIiwidmlzaWJpbGl0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25lQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDMUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJy4vRW1pdHRlcicpO1xuXG52YXIgYnJvd3Nlckhhc0Jsb2IgPSAoZnVuY3Rpb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuICEhbmV3IEJsb2IoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59KCkpO1xuXG4vKlxuICogR3JvdXBcbiAqL1xuXG5mdW5jdGlvbiBBc3NldHNMb2FkZXIoY29uZmlnKSB7XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuXG4gICAgdmFyIGNyb3NzT3JpZ2luID0gY29uZmlnLmNyb3NzT3JpZ2luO1xuICAgIHZhciBpc1RvdWNoTG9ja2VkID0gISFjb25maWcuaXNUb3VjaExvY2tlZDtcbiAgICB2YXIgYmxvYiA9ICEhKGNvbmZpZy5ibG9iICYmIGJyb3dzZXJIYXNCbG9iKTtcbiAgICB2YXIgd2ViQXVkaW9Db250ZXh0ID0gY29uZmlnLndlYkF1ZGlvQ29udGV4dDtcblxuICAgIHZhciBhc3NldHNMb2FkZXI7XG4gICAgdmFyIG1hcCA9IHt9O1xuICAgIHZhciBmaWxlcyA9IFtdO1xuICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgIHZhciBudW1Mb2FkZWQgPSAwO1xuICAgIHZhciBudW1Ub3RhbCA9IDA7XG5cbiAgICB2YXIgYWRkID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBhZGQoaXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBhc3NldHNMb2FkZXI7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxvYWRlciA9IG5ldyBBc3NldHNMb2FkZXIuTG9hZGVyKGNvbmZpZ3VyZShvcHRpb25zKSk7XG4gICAgICAgIHF1ZXVlLnB1c2gobG9hZGVyKTtcbiAgICAgICAgcmV0dXJuIGFzc2V0c0xvYWRlcjtcbiAgICB9O1xuXG4gICAgdmFyIGdldCA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHJldHVybiBtYXBbaWRdO1xuICAgIH07XG5cbiAgICB2YXIgY29uZmlndXJlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB2YXIgdXJsID0gb3B0aW9ucztcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5pc1RvdWNoTG9ja2VkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuaXNUb3VjaExvY2tlZCA9IGlzVG91Y2hMb2NrZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMuYmxvYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvcHRpb25zLmJsb2IgPSBibG9iO1xuICAgICAgICB9XG5cbiAgICAgICAgb3B0aW9ucy5pZCA9IG9wdGlvbnMuaWQgfHwgb3B0aW9ucy51cmw7XG4gICAgICAgIG9wdGlvbnMudHlwZSA9IG9wdGlvbnMudHlwZSB8fCBvcHRpb25zLnVybC5zcGxpdCgnPycpWzBdLnNwbGl0KCcuJykucG9wKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgb3B0aW9ucy5jcm9zc09yaWdpbiA9IG9wdGlvbnMuY3Jvc3NPcmlnaW4gfHwgY3Jvc3NPcmlnaW47XG4gICAgICAgIG9wdGlvbnMud2ViQXVkaW9Db250ZXh0ID0gb3B0aW9ucy53ZWJBdWRpb0NvbnRleHQgfHwgd2ViQXVkaW9Db250ZXh0O1xuXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH07XG5cbiAgICB2YXIgc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbnVtVG90YWwgPSBxdWV1ZS5sZW5ndGg7XG5cbiAgICAgICAgcXVldWUuZm9yRWFjaChmdW5jdGlvbihsb2FkZXIpIHtcbiAgICAgICAgICAgIGxvYWRlci5vbigncHJvZ3Jlc3MnLCBwcm9ncmVzc0hhbmRsZXIpO1xuICAgICAgICAgICAgbG9hZGVyLm9uY2UoJ2NvbXBsZXRlJywgY29tcGxldGVIYW5kbGVyKTtcbiAgICAgICAgICAgIGxvYWRlci5vbmNlKCdlcnJvcicsIGVycm9ySGFuZGxlcik7XG4gICAgICAgICAgICBsb2FkZXIuc3RhcnQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGFzc2V0c0xvYWRlcjtcbiAgICB9O1xuXG4gICAgdmFyIHByb2dyZXNzSGFuZGxlciA9IGZ1bmN0aW9uKHByb2dyZXNzKSB7XG4gICAgICAgIHZhciBsb2FkZWQgPSBudW1Mb2FkZWQgKyBwcm9ncmVzcztcbiAgICAgICAgYXNzZXRzTG9hZGVyLmVtaXQoJ3Byb2dyZXNzJywgbG9hZGVkIC8gbnVtVG90YWwpO1xuICAgIH07XG5cbiAgICB2YXIgY29tcGxldGVIYW5kbGVyID0gZnVuY3Rpb24oa2V5LCBmaWxlKSB7XG4gICAgICAgIG51bUxvYWRlZCsrO1xuICAgICAgICBhc3NldHNMb2FkZXIuZW1pdCgncHJvZ3Jlc3MnLCBudW1Mb2FkZWQgLyBudW1Ub3RhbCk7XG4gICAgICAgIG1hcFtrZXldID0gZmlsZTtcbiAgICAgICAgZmlsZXMucHVzaChmaWxlKTtcblxuICAgICAgICBhc3NldHNMb2FkZXIuZW1pdCgnY2hpbGQnLCBmaWxlKTtcbiAgICAgICAgY2hlY2tDb21wbGV0ZSgpO1xuICAgIH07XG5cbiAgICB2YXIgZXJyb3JIYW5kbGVyID0gZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgIG51bVRvdGFsLS07XG4gICAgICAgIGlmIChhc3NldHNMb2FkZXIubGlzdGVuZXJzKCdlcnJvcicpLmxlbmd0aCkge1xuICAgICAgICAgICAgYXNzZXRzTG9hZGVyLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICBjaGVja0NvbXBsZXRlKCk7XG4gICAgfTtcblxuICAgIHZhciBjaGVja0NvbXBsZXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChudW1Mb2FkZWQgPj0gbnVtVG90YWwpIHtcbiAgICAgICAgICAgIGFzc2V0c0xvYWRlci5lbWl0KCdjb21wbGV0ZScsIGZpbGVzLCBtYXApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBkZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHF1ZXVlLnBvcCgpLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICBhc3NldHNMb2FkZXIub2ZmKCdlcnJvcicpO1xuICAgICAgICBhc3NldHNMb2FkZXIub2ZmKCdwcm9ncmVzcycpO1xuICAgICAgICBhc3NldHNMb2FkZXIub2ZmKCdjb21wbGV0ZScpO1xuICAgICAgICBtYXAgPSB7fTtcbiAgICAgICAgZmlsZXMgPSBbXTtcbiAgICAgICAgd2ViQXVkaW9Db250ZXh0ID0gbnVsbDtcbiAgICAgICAgbnVtVG90YWwgPSAwO1xuICAgICAgICBudW1Mb2FkZWQgPSAwO1xuXG4gICAgICAgIHJldHVybiBhc3NldHNMb2FkZXI7XG4gICAgfTtcblxuICAgIGFzc2V0c0xvYWRlciA9IE9iamVjdC5jcmVhdGUoRW1pdHRlci5wcm90b3R5cGUsIHtcbiAgICAgICAgX2V2ZW50czoge1xuICAgICAgICAgICAgdmFsdWU6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIGFkZDoge1xuICAgICAgICAgICAgdmFsdWU6IGFkZFxuICAgICAgICB9LFxuICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgdmFsdWU6IHN0YXJ0XG4gICAgICAgIH0sXG4gICAgICAgIGdldDoge1xuICAgICAgICAgICAgdmFsdWU6IGdldFxuICAgICAgICB9LFxuICAgICAgICBkZXN0cm95OiB7XG4gICAgICAgICAgICB2YWx1ZTogZGVzdHJveVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb25maWcuYXNzZXRzKSkge1xuICAgICAgICBhZGQoY29uZmlnLmFzc2V0cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoYXNzZXRzTG9hZGVyKTtcbn1cblxuLypcbiAqIExvYWRlclxuICovXG5cbkFzc2V0c0xvYWRlci5Mb2FkZXIgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdmFyIGlkID0gb3B0aW9ucy5pZDtcbiAgICB2YXIgdXJsID0gb3B0aW9ucy51cmw7XG4gICAgdmFyIHR5cGUgPSBvcHRpb25zLnR5cGU7XG4gICAgdmFyIGNyb3NzT3JpZ2luID0gb3B0aW9ucy5jcm9zc09yaWdpbjtcbiAgICB2YXIgaXNUb3VjaExvY2tlZCA9IG9wdGlvbnMuaXNUb3VjaExvY2tlZDtcbiAgICB2YXIgYmxvYiA9IG9wdGlvbnMuYmxvYiAmJiBicm93c2VySGFzQmxvYjtcbiAgICB2YXIgd2ViQXVkaW9Db250ZXh0ID0gb3B0aW9ucy53ZWJBdWRpb0NvbnRleHQ7XG5cbiAgICB2YXIgbG9hZGVyO1xuICAgIHZhciBsb2FkSGFuZGxlcjtcbiAgICB2YXIgcmVxdWVzdDtcbiAgICB2YXIgc3RhcnRUaW1lO1xuICAgIHZhciB0aW1lb3V0O1xuXG4gICAgdmFyIHN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdqc29uJzpcbiAgICAgICAgICAgICAgICBsb2FkSlNPTigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnanBnJzpcbiAgICAgICAgICAgIGNhc2UgJ3BuZyc6XG4gICAgICAgICAgICBjYXNlICdnaWYnOlxuICAgICAgICAgICAgY2FzZSAnd2VicCc6XG4gICAgICAgICAgICAgICAgbG9hZEltYWdlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtcDMnOlxuICAgICAgICAgICAgY2FzZSAnb2dnJzpcbiAgICAgICAgICAgIGNhc2UgJ29wdXMnOlxuICAgICAgICAgICAgY2FzZSAnd2F2JzpcbiAgICAgICAgICAgIGNhc2UgJ200YSc6XG4gICAgICAgICAgICAgICAgbG9hZEF1ZGlvKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdvZ3YnOlxuICAgICAgICAgICAgY2FzZSAnbXA0JzpcbiAgICAgICAgICAgIGNhc2UgJ3dlYm0nOlxuICAgICAgICAgICAgY2FzZSAnaGxzJzpcbiAgICAgICAgICAgICAgICBsb2FkVmlkZW8oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Jpbic6XG4gICAgICAgICAgICAgICAgbG9hZFhIUignYXJyYXlidWZmZXInKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgJ0Fzc2V0c0xvYWRlciBFUlJPUjogVW5rbm93biB0eXBlIGZvciBmaWxlIHdpdGggVVJMOiAnICsgdXJsICsgJyAoJyArIHR5cGUgKyAnKSc7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGRpc3BhdGNoQ29tcGxldGUgPSBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxvYWRlci5lbWl0KCdwcm9ncmVzcycsIDEpO1xuICAgICAgICBsb2FkZXIuZW1pdCgnY29tcGxldGUnLCBpZCwgZmlsZSk7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVycygpO1xuICAgIH07XG5cbiAgICB2YXIgbG9hZFhIUiA9IGZ1bmN0aW9uKHJlc3BvbnNlVHlwZSwgY3VzdG9tTG9hZEhhbmRsZXIpIHtcbiAgICAgICAgbG9hZEhhbmRsZXIgPSBjdXN0b21Mb2FkSGFuZGxlciB8fCBjb21wbGV0ZUhhbmRsZXI7XG5cbiAgICAgICAgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlO1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgcHJvZ3Jlc3NIYW5kbGVyKTtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgbG9hZEhhbmRsZXIpO1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JIYW5kbGVyKTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgfTtcblxuICAgIHZhciBwcm9ncmVzc0hhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQubGVuZ3RoQ29tcHV0YWJsZSkge1xuICAgICAgICAgICAgbG9hZGVyLmVtaXQoJ3Byb2dyZXNzJywgZXZlbnQubG9hZGVkIC8gZXZlbnQudG90YWwpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBjb21wbGV0ZUhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHN1Y2Nlc3MoKSkge1xuICAgICAgICAgICAgZGlzcGF0Y2hDb21wbGV0ZShyZXF1ZXN0LnJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgc3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocmVxdWVzdCAmJiByZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xuICAgICAgICAgICAgQXNzZXRzTG9hZGVyLnN0YXRzLnVwZGF0ZShyZXF1ZXN0LCBzdGFydFRpbWUsIHVybCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlcnJvckhhbmRsZXIocmVxdWVzdCAmJiByZXF1ZXN0LnN0YXR1c1RleHQpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8vIGpzb25cblxuICAgIHZhciBsb2FkSlNPTiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBsb2FkWEhSKCdqc29uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoc3VjY2VzcygpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRpc3BhdGNoQ29tcGxldGUoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBpbWFnZVxuXG4gICAgdmFyIGxvYWRJbWFnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoYmxvYikge1xuICAgICAgICAgICAgbG9hZEltYWdlQmxvYigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9hZEltYWdlRWxlbWVudCgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBsb2FkSW1hZ2VFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlcXVlc3QgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaWYgKGNyb3NzT3JpZ2luKSB7XG4gICAgICAgICAgICByZXF1ZXN0LmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9ySGFuZGxlciwgZmFsc2UpO1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBlbGVtZW50TG9hZEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgcmVxdWVzdC5zcmMgPSB1cmw7XG4gICAgfTtcblxuICAgIHZhciBlbGVtZW50TG9hZEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgZGlzcGF0Y2hDb21wbGV0ZShyZXF1ZXN0KTtcbiAgICB9O1xuXG4gICAgdmFyIGxvYWRJbWFnZUJsb2IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbG9hZFhIUignYmxvYicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHN1Y2Nlc3MoKSkge1xuICAgICAgICAgICAgICAgIHZhciBzcmMgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChyZXF1ZXN0LnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0ID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9ySGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGltYWdlQmxvYkhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnNyYyA9IHNyYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBpbWFnZUJsb2JIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgICAgIGRpc3BhdGNoQ29tcGxldGUocmVxdWVzdCk7XG4gICAgfTtcblxuICAgIC8vIGF1ZGlvXG5cbiAgICB2YXIgbG9hZEF1ZGlvID0gZnVuY3Rpb24oY29udGV4dCkge1xuICAgICAgICBpZiAoY29udGV4dCkge1xuICAgICAgICAgICAgbG9hZEF1ZGlvQnVmZmVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2FkTWVkaWFFbGVtZW50KCdhdWRpbycpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIHZpZGVvXG5cbiAgICB2YXIgbG9hZFZpZGVvID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChibG9iKSB7XG4gICAgICAgICAgICBsb2FkWEhSKCdibG9iJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2FkTWVkaWFFbGVtZW50KCd2aWRlbycpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIGF1ZGlvIGJ1ZmZlclxuXG4gICAgdmFyIGxvYWRBdWRpb0J1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBsb2FkWEhSKCdhcnJheWJ1ZmZlcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHN1Y2Nlc3MoKSkge1xuICAgICAgICAgICAgICAgIHdlYkF1ZGlvQ29udGV4dC5kZWNvZGVBdWRpb0RhdGEoXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QucmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaENvbXBsZXRlKGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ySGFuZGxlcihlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBtZWRpYSBlbGVtZW50XG5cbiAgICB2YXIgbG9hZE1lZGlhRWxlbWVudCA9IGZ1bmN0aW9uKHRhZ05hbWUpIHtcbiAgICAgICAgcmVxdWVzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG5cbiAgICAgICAgaWYgKCFpc1RvdWNoTG9ja2VkKSB7XG4gICAgICAgICAgICAvLyB0aW1lb3V0IGJlY2F1c2Ugc29tZXRpbWVzIGNhbnBsYXl0aHJvdWdoIGRvZXNuJ3QgZmlyZVxuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIHRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dChlbGVtZW50TG9hZEhhbmRsZXIsIDIwMDApO1xuICAgICAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIGVsZW1lbnRMb2FkSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9ySGFuZGxlciwgZmFsc2UpO1xuICAgICAgICByZXF1ZXN0LnByZWxvYWQgPSAnYXV0byc7XG4gICAgICAgIHJlcXVlc3Quc3JjID0gdXJsO1xuICAgICAgICByZXF1ZXN0LmxvYWQoKTtcblxuICAgICAgICBpZiAoaXNUb3VjaExvY2tlZCkge1xuICAgICAgICAgICAgZGlzcGF0Y2hDb21wbGV0ZShyZXF1ZXN0KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBlcnJvclxuXG4gICAgdmFyIGVycm9ySGFuZGxlciA9IGZ1bmN0aW9uKGVycikge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgICAgIHZhciBtZXNzYWdlID0gZXJyO1xuXG4gICAgICAgIGlmIChyZXF1ZXN0ICYmIHJlcXVlc3QudGFnTmFtZSAmJiByZXF1ZXN0LmVycm9yKSB7XG4gICAgICAgICAgICB2YXIgRVJST1JfU1RBVEUgPSBbJycsICdBQk9SVEVEJywgJ05FVFdPUksnLCAnREVDT0RFJywgJ1NSQ19OT1RfU1VQUE9SVEVEJ107XG4gICAgICAgICAgICBtZXNzYWdlID0gJ01lZGlhRXJyb3I6ICcgKyBFUlJPUl9TVEFURVtyZXF1ZXN0LmVycm9yLmNvZGVdICsgJyAnICsgcmVxdWVzdC5zcmM7XG4gICAgICAgIH0gZWxzZSBpZiAocmVxdWVzdCAmJiByZXF1ZXN0LnN0YXR1c1RleHQpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSByZXF1ZXN0LnN0YXR1c1RleHQ7XG4gICAgICAgIH0gZWxzZSBpZiAoZXJyICYmIGVyci5tZXNzYWdlKSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gICAgICAgIH0gZWxzZSBpZiAoZXJyICYmIGVyci50eXBlKSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gZXJyLnR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICBsb2FkZXIuZW1pdCgnZXJyb3InLCAnRXJyb3IgbG9hZGluZyBcIicgKyB1cmwgKyAnXCIgJyArIG1lc3NhZ2UpO1xuXG4gICAgICAgIGRlc3Ryb3koKTtcbiAgICB9O1xuXG4gICAgLy8gY2xlYW4gdXBcblxuICAgIHZhciByZW1vdmVMaXN0ZW5lcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbG9hZGVyLm9mZignZXJyb3InKTtcbiAgICAgICAgbG9hZGVyLm9mZigncHJvZ3Jlc3MnKTtcbiAgICAgICAgbG9hZGVyLm9mZignY29tcGxldGUnKTtcblxuICAgICAgICBpZiAocmVxdWVzdCkge1xuICAgICAgICAgICAgcmVxdWVzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHByb2dyZXNzSGFuZGxlcik7XG4gICAgICAgICAgICByZXF1ZXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBsb2FkSGFuZGxlcik7XG4gICAgICAgICAgICByZXF1ZXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JIYW5kbGVyKTtcbiAgICAgICAgICAgIHJlcXVlc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIGVsZW1lbnRMb2FkSGFuZGxlcik7XG4gICAgICAgICAgICByZXF1ZXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgZWxlbWVudExvYWRIYW5kbGVyKTtcbiAgICAgICAgICAgIHJlcXVlc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIGltYWdlQmxvYkhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBkZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVycygpO1xuXG4gICAgICAgIGlmIChyZXF1ZXN0ICYmIHJlcXVlc3QuYWJvcnQgJiYgcmVxdWVzdC5yZWFkeVN0YXRlIDwgNCkge1xuICAgICAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICAgIHdlYkF1ZGlvQ29udGV4dCA9IG51bGw7XG5cbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB9O1xuXG4gICAgbG9hZGVyID0gT2JqZWN0LmNyZWF0ZShFbWl0dGVyLnByb3RvdHlwZSwge1xuICAgICAgICBfZXZlbnRzOiB7XG4gICAgICAgICAgICB2YWx1ZToge31cbiAgICAgICAgfSxcbiAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBzdGFydFxuICAgICAgICB9LFxuICAgICAgICBkZXN0cm95OiB7XG4gICAgICAgICAgICB2YWx1ZTogZGVzdHJveVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZShsb2FkZXIpO1xufTtcblxuLypcbiAqIFN0YXRzXG4gKi9cblxuQXNzZXRzTG9hZGVyLnN0YXRzID0ge1xuICAgIG1iczogMCxcbiAgICBzZWNzOiAwLFxuICAgIHVwZGF0ZTogZnVuY3Rpb24ocmVxdWVzdCwgc3RhcnRUaW1lLCB1cmwpIHtcbiAgICAgICAgdmFyIGxlbmd0aDtcbiAgICAgICAgdmFyIGhlYWRlcnMgPSByZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpO1xuICAgICAgICBpZiAoaGVhZGVycykge1xuICAgICAgICAgICAgdmFyIG1hdGNoID0gaGVhZGVycy5tYXRjaCgvY29udGVudC1sZW5ndGg6IChcXGQrKS9pKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCAmJiBtYXRjaC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsZW5ndGggPSBtYXRjaFsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyB2YXIgbGVuZ3RoID0gcmVxdWVzdC5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1MZW5ndGgnKTtcbiAgICAgICAgaWYgKGxlbmd0aCkge1xuICAgICAgICAgICAgbGVuZ3RoID0gcGFyc2VJbnQobGVuZ3RoLCAxMCk7XG4gICAgICAgICAgICB2YXIgbWJzID0gbGVuZ3RoIC8gMTAyNCAvIDEwMjQ7XG4gICAgICAgICAgICB2YXIgc2VjcyA9IChEYXRlLm5vdygpIC0gc3RhcnRUaW1lKSAvIDEwMDA7XG4gICAgICAgICAgICB0aGlzLnNlY3MgKz0gc2VjcztcbiAgICAgICAgICAgIHRoaXMubWJzICs9IG1icztcbiAgICAgICAgICAgIC8vIHRoaXMubG9nKHVybCwgbWJzLCBzZWNzKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbG9nOiBmdW5jdGlvbih1cmwsIG1icywgc2Vjcykge1xuICAgICAgICBjb25zb2xlLmxvZy5jYWxsKGNvbnNvbGUsIHVybCwgbWJzLCBzZWNzKTtcbiAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgdmFyIGZpbGUgPSAnRmlsZSBsb2FkZWQ6ICcgK1xuICAgICAgICAgICAgICAgIHVybC5zdWJzdHIodXJsLmxhc3RJbmRleE9mKCcvJykgKyAxKSArXG4gICAgICAgICAgICAgICAgJyBzaXplOicgKyBtYnMudG9GaXhlZCgyKSArICdtYicgK1xuICAgICAgICAgICAgICAgICcgdGltZTonICsgc2Vjcy50b0ZpeGVkKDIpICsgJ3MnICtcbiAgICAgICAgICAgICAgICAnIHNwZWVkOicgKyAobWJzIC8gc2VjcykudG9GaXhlZCgyKSArICdtYnBzJztcblxuICAgICAgICAgICAgY29uc29sZS5sb2cuY2FsbChjb25zb2xlLCBmaWxlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdG90YWwgPSAnVG90YWwgbG9hZGVkOiAnICsgdGhpcy5tYnMudG9GaXhlZCgyKSArICdtYicgK1xuICAgICAgICAgICAgJyB0aW1lOicgKyB0aGlzLnNlY3MudG9GaXhlZCgyKSArICdzJyArXG4gICAgICAgICAgICAnIHNwZWVkOicgKyB0aGlzLmdldE1icHMoKS50b0ZpeGVkKDIpICsgJ21icHMnO1xuICAgICAgICBjb25zb2xlLmxvZy5jYWxsKGNvbnNvbGUsIHRvdGFsKTtcbiAgICB9LFxuICAgIGdldE1icHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYnMgLyB0aGlzLnNlY3M7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBc3NldHNMb2FkZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIEN1ZXBvaW50c1JlYWRlcigpIHtcbiAgICB2YXIgY3VlcG9pbnRzUmVhZGVyO1xuICAgIHZhciBkaXNwYXRjaDtcbiAgICB2YXIgbGlzdCA9IFtdO1xuICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSAwO1xuICAgIHZhciBsYXN0UG9zaXRpb24gPSAtMTtcbiAgICB2YXIgdG9sZXJhbmNlID0gMC4yO1xuXG4gICAgdmFyIGFkZCA9IGZ1bmN0aW9uKHBvc2l0aW9uLCBuYW1lLCBkYXRhKSB7XG4gICAgICAgIGxpc3QucHVzaCh7XG4gICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KTtcblxuICAgICAgICBsaXN0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEucG9zaXRpb24gLSBiLnBvc2l0aW9uO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gY3VlcG9pbnRzUmVhZGVyO1xuICAgIH07XG5cbiAgICB2YXIgb25DdWVwb2ludCA9IGZ1bmN0aW9uKGZuLCB0aGlzQXJnKSB7XG4gICAgICAgIGlmIChmbikge1xuICAgICAgICAgICAgZGlzcGF0Y2ggPSB0aGlzQXJnID8gZm4uYmluZCh0aGlzQXJnKSA6IGZuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlzcGF0Y2ggPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdWVwb2ludHNSZWFkZXI7XG4gICAgfTtcblxuICAgIHZhciByZW1vdmVBbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgICByZXR1cm4gcmVzZXQoKTtcbiAgICB9O1xuXG4gICAgdmFyIHJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGN1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgICAgIGxhc3RQb3NpdGlvbiA9IC0xO1xuICAgICAgICByZXR1cm4gY3VlcG9pbnRzUmVhZGVyO1xuICAgIH07XG5cbiAgICB2YXIgc2V0VG9sZXJhbmNlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgdG9sZXJhbmNlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBjdWVwb2ludHNSZWFkZXI7XG4gICAgfTtcblxuICAgIHZhciB1cGRhdGUgPSBmdW5jdGlvbihwb3NpdGlvbikge1xuICAgICAgICBjdXJyZW50UG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgY2hlY2soY3VycmVudFBvc2l0aW9uLCBsYXN0UG9zaXRpb24pO1xuICAgICAgICBsYXN0UG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICAgIHJldHVybiBjdWVwb2ludHNSZWFkZXI7XG4gICAgfTtcblxuICAgIHZhciBjaGVjayA9IGZ1bmN0aW9uKGN1cnJlbnRQb3MsIGxhc3RQb3MpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRQb3MgPD0gbGFzdFBvcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZGlzcGF0Y2ggIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3Quc29tZShmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICBpZiAoaW5SYW5nZShpdGVtLnBvc2l0aW9uLCBjdXJyZW50UG9zLCBsYXN0UG9zKSkge1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGluUmFuZ2UgPSBmdW5jdGlvbihjdWVwb2ludFBvcywgY3VycmVudFBvcywgbGFzdFBvcykge1xuICAgICAgICBpZiAoY3VlcG9pbnRQb3MgPiBjdXJyZW50UG9zKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1ZXBvaW50UG9zIDw9IGxhc3RQb3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkaWZmID0gY3VlcG9pbnRQb3MgLSBjdXJyZW50UG9zO1xuICAgICAgICBpZiAoZGlmZiA8IDApIHtcbiAgICAgICAgICAgIGRpZmYgPSAtZGlmZjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGlmZiA8PSB0b2xlcmFuY2U7XG4gICAgfTtcblxuICAgIGN1ZXBvaW50c1JlYWRlciA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBhZGQ6IGFkZCxcbiAgICAgICAgb25DdWVwb2ludDogb25DdWVwb2ludCxcbiAgICAgICAgcmVtb3ZlQWxsOiByZW1vdmVBbGwsXG4gICAgICAgIHJlc2V0OiByZXNldCxcbiAgICAgICAgc2V0VG9sZXJhbmNlOiBzZXRUb2xlcmFuY2UsXG4gICAgICAgIHVwZGF0ZTogdXBkYXRlXG4gICAgfSk7XG5cbiAgICByZXR1cm4gY3VlcG9pbnRzUmVhZGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEN1ZXBvaW50c1JlYWRlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcblxuZnVuY3Rpb24gRW1pdHRlcigpIHtcbiAgICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcbiAgICB0aGlzLnNldE1heExpc3RlbmVycygyMCk7XG59XG5cbkVtaXR0ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFdmVudEVtaXR0ZXIucHJvdG90eXBlKTtcbkVtaXR0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRW1pdHRlcjtcblxuRW1pdHRlci5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICBpZiAodHlwZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnModHlwZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJy4vRW1pdHRlcicpO1xuXG5mdW5jdGlvbiBGYWNlYm9vayhhcHBJZCkge1xuXG4gICAgdmFyIGxvYWRTY3JpcHRUaW1lb3V0O1xuXG4gICAgLy8gaW5pdGlhbGl6ZSBGQiBhcHBcbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpZiAod2luZG93LkZCICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8qRkIuRXZlbnQuc3Vic2NyaWJlKCdhdXRoLnN0YXR1c0NoYW5nZScsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2F1dGguc3RhdHVzQ2hhbmdlJywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gJ2Nvbm5lY3RlZCcpIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTsqL1xuICAgICAgICAgICAgd2luZG93LkZCLmluaXQoe1xuICAgICAgICAgICAgICAgIGFwcElkOiBhcHBJZCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXG4gICAgICAgICAgICAgICAgY29va2llOiB0cnVlLFxuICAgICAgICAgICAgICAgIGxvZ2dpbmc6IHRydWUsXG4gICAgICAgICAgICAgICAgeGZibWw6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgd2luZG93LkZCLmdldExvZ2luU3RhdHVzKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdpbml0JywgcmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRTY3JpcHRUaW1lb3V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNhbGxlZCBieSBGQnMgSlMgd2hlbiBmaW5pc2hlZCBsb2FkaW5nXG4gICAgICAgICAgICB3aW5kb3cuZmJBc3luY0luaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpbml0KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gbG9naW5cbiAgICBmdW5jdGlvbiBsb2dpbihjYWxsYmFjaywgcGVybWlzc2lvbnMpIHtcbiAgICAgICAgd2luZG93LkZCLmxvZ2luKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgJ3Njb3BlJzogKHBlcm1pc3Npb25zIHx8ICcnKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayB0aGF0IHVzZXIgaGFzIGdyYW50ZWQgcmVxdWlyZWQgcGVybWlzc2lvbnMgYW5kIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgZnVuY3Rpb24gY2hlY2tQZXJtaXNzaW9ucyhjYWxsYmFjaywgcGVybWlzc2lvbnMpIHtcbiAgICAgICAgaWYgKHBlcm1pc3Npb25zID09PSB1bmRlZmluZWQgfHwgcGVybWlzc2lvbnMgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5GQi5hcGkoJy9tZS9wZXJtaXNzaW9ucycsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB2YXIgaGFzUGVybWlzc2lvbiA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcGVybXMgPSBwZXJtaXNzaW9ucy5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwZXJtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGhhc1Blcm1pc3Npb24gPSAhIXJlc3BvbnNlLmRhdGFbMF1bcGVybXNbaV1dO1xuICAgICAgICAgICAgICAgIGlmICghaGFzUGVybWlzc2lvbikge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGFzUGVybWlzc2lvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9naW4oY2FsbGJhY2ssIHBlcm1pc3Npb25zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgdXNlciBsb2dpbiBhbmQgcGVybWlzc2lvbiBzdGF0dXNcbiAgICBmdW5jdGlvbiBjaGVja0F1dGgoY2FsbGJhY2ssIHBlcm1pc3Npb25zKSB7XG4gICAgICAgIHdpbmRvdy5GQi5nZXRMb2dpblN0YXR1cyhmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gJ2Nvbm5lY3RlZCcpIHtcbiAgICAgICAgICAgICAgICBjaGVja1Blcm1pc3Npb25zKGNhbGxiYWNrLCBwZXJtaXNzaW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ2luKGNhbGxiYWNrLCBwZXJtaXNzaW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEluZm8ocGVybWlzc2lvbnMsIGZpZWxkcykge1xuICAgICAgICBjaGVja0F1dGgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB3aW5kb3cuRkIuYXBpKCcvbWUnLCB7XG4gICAgICAgICAgICAgICAgJ2ZpZWxkcyc6IGZpZWxkc1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ2luZm8nLCBudWxsKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ2luZm8nLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHBlcm1pc3Npb25zKTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgRkIgY29udGFpbmVyIGFuZCBsb2FkIHNjcmlwdFxuICAgIGZ1bmN0aW9uIGxvYWRTY3JpcHQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuRkIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmYnJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmItcm9vdCcpO1xuICAgICAgICBpZiAoIWZicm9vdCkge1xuICAgICAgICAgICAgZmJyb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBmYnJvb3Quc2V0QXR0cmlidXRlKCdpZCcsICdmYi1yb290Jyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZicm9vdCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIGZiLnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgICAgZmIuYXN5bmMgPSB0cnVlO1xuICAgICAgICBmYi5zcmMgPSBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCArICcvL2Nvbm5lY3QuZmFjZWJvb2submV0L2VuX1VTL2FsbC5qcyc7XG4gICAgICAgIGZicm9vdC5hcHBlbmRDaGlsZChmYik7XG5cbiAgICAgICAgbG9hZFNjcmlwdFRpbWVvdXQgPSBzZXRUaW1lb3V0KGxvYWRTY3JpcHQsIDYwMDApO1xuICAgIH1cblxuICAgIGxvYWRTY3JpcHQoKTtcblxuICAgIC8vIHB1YmxpY1xuICAgIHZhciBzZWxmID0gT2JqZWN0LmNyZWF0ZShFbWl0dGVyLnByb3RvdHlwZSwge1xuICAgICAgICBfZXZlbnRzOiB7XG4gICAgICAgICAgICB2YWx1ZToge31cbiAgICAgICAgfSxcbiAgICAgICAgaW5pdDoge1xuICAgICAgICAgICAgdmFsdWU6IGluaXRcbiAgICAgICAgfSxcbiAgICAgICAgbG9naW46IHtcbiAgICAgICAgICAgIHZhbHVlOiBsb2dpblxuICAgICAgICB9LFxuICAgICAgICB1dGlsczoge1xuICAgICAgICAgICAgdmFsdWU6IHV0aWxzXG4gICAgICAgIH0sXG4gICAgICAgIGdldEluZm86IHtcbiAgICAgICAgICAgIHZhbHVlOiBnZXRJbmZvXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBzZWxmO1xufVxuXG52YXIgdXRpbHMgPSB7XG4gICAgZ2V0UHJvZmlsZUltYWdlVXJsOiBmdW5jdGlvbihpZCwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgK1xuICAgICAgICAgICAgJy8vZ3JhcGguZmFjZWJvb2suY29tLycgKyBpZCArXG4gICAgICAgICAgICAnL3BpY3R1cmU/d2lkdGg9JyArIHdpZHRoICsgJyZoZWlnaHQ9JyArIGhlaWdodDtcbiAgICB9LFxuICAgIHJlc2l6ZUNhbnZhczogZnVuY3Rpb24oaGVpZ2h0KSB7XG4gICAgICAgIHdpbmRvdy5GQi5DYW52YXMuc2V0U2l6ZSh7XG4gICAgICAgICAgICAnaGVpZ2h0JzogaGVpZ2h0XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgd2luZG93LkZCLkNhbnZhcy5zZXRTaXplKHtcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzogaGVpZ2h0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfSxcbiAgICBzY3JvbGxUb1RvcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5GQi5DYW52YXMuc2Nyb2xsVG8oMCwgMCk7XG4gICAgfSxcbiAgICBsb2dvdXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cuRkIuRXZlbnQuc3Vic2NyaWJlKCdhdXRoLmxvZ291dCcsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHJlc3BvbnNlICYmICFyZXNwb25zZS5lcnJvcjtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbkZhY2Vib29rTG9nb3V0Q29tcGxldGUnLCBzdWNjZXNzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5GQi5sb2dvdXQoKTtcbiAgICB9LFxuICAgIGdldEZyaWVuZHM6IGZ1bmN0aW9uKGxpbWl0KSB7XG4gICAgICAgIHdpbmRvdy5GQi5hcGkoJy9tZS9mcmllbmRzJywge1xuICAgICAgICAgICAgbGltaXQ6IGxpbWl0XG4gICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldEZyaWVuZHMgRVJST1InKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgc29ydEZyaWVuZHNCeU11dHVhbDogZnVuY3Rpb24odXNlckRhdGEpIHtcbiAgICAgICAgdmFyIGZyaWVuZHMgPSB1c2VyRGF0YS5mcmllbmRzLmRhdGEuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICB2YXIgeCA9IGEubXV0dWFsZnJpZW5kcyA/IGEubXV0dWFsZnJpZW5kcy5kYXRhLmxlbmd0aCA6IDA7XG4gICAgICAgICAgICB2YXIgeSA9IGIubXV0dWFsZnJpZW5kcyA/IGIubXV0dWFsZnJpZW5kcy5kYXRhLmxlbmd0aCA6IDA7XG4gICAgICAgICAgICByZXR1cm4geSAtIHg7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZnJpZW5kcztcbiAgICB9LFxuICAgIC8qIHB1Ymxpc2ggc3RhdHVzIG1lc3NhZ2UgdG8gZmVlZC4gcmVxdWlyZXMgcHVibGlzaF9zdHJlYW0gcGVybWlzc2lvbiAqL1xuICAgIHN0YXR1c1B1Ymxpc2g6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgd2luZG93LkZCLmFwaSgnL21lL2ZlZWQnLCAncG9zdCcsIHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb25GYWNlYm9va1N0YXR1c1B1Ymxpc2ggRVJST1InKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29uRmFjZWJvb2tTdGF0dXNQdWJsaXNoIFNVQ0NFU1MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICAvKiBTZW5kIGEgbWVzc2FnZSAqL1xuICAgIHNlbmREaWFsb2c6IGZ1bmN0aW9uKF9saW5rLCBfbmFtZSwgX2Rlc2NyaXB0aW9uLCBfcGljdHVyZSwgX3RvKSB7XG4gICAgICAgIHdpbmRvdy5GQi51aSh7XG4gICAgICAgICAgICBtZXRob2Q6ICdzZW5kJyxcbiAgICAgICAgICAgIHRvOiBfdG8sXG4gICAgICAgICAgICBuYW1lOiBfbmFtZSxcbiAgICAgICAgICAgIHBpY3R1cmU6IF9waWN0dXJlLFxuICAgICAgICAgICAgbGluazogX2xpbmssXG4gICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IF9kZXNjcmlwdGlvblxuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZhY2Vib29rLnNlbmREaWFsb2cnLCByZXNwb25zZSk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbkZhY2Vib29rU2VuZERpYWxvZ0NvbXBsZXRlJywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbkZhY2Vib29rU2VuZERpYWxvZ0NvbXBsZXRlJywgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIC8qIFB1Ymxpc2ggYWN0aW9uLiByZXF1aXJlcyBwdWJsaXNoX2FjdGlvbnMgcGVybWlzc2lvbiAqL1xuICAgIC8qcHVibGlzaEFjdGlvbjogZnVuY3Rpb24oYXBwSWQsIG5hbWVzcGFjZSwgYWN0aW9uLCB0YXJnZXRfaWQsIHJlcGVhdGVyVXJsLCBvYmplY3QsIHVybCwgaW1hZ2UpIHtcbiAgICAgICAgdmFyIG9iamVjdFBhcmFtcyA9ICdmYjphcHBfaWQ9JyArIGFwcElkICsgJyZvZzp0eXBlPScgKyBuYW1lc3BhY2UgKyAnOicgKyBvYmplY3QgKyAnJnVybCcgPSB1cmw7XG4gICAgICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICAgICAgICAndGFncyc6IHRhcmdldF9pZCxcbiAgICAgICAgICAgICdpbWFnZVswXVt1cmxdJzogaW1hZ2VcbiAgICAgICAgfTtcbiAgICAgICAgcGFyYW1zW29iamVjdF0gPSByZXBlYXRlclVybCArIChyZXBlYXRlclVybC5pbmRleE9mKCc/JykgPCAwID8gJz8nIDogJyYnKSArIG9iamVjdFBhcmFtcztcblxuICAgICAgICBGQi5hcGkoJy9tZS8nICsgbmFtZXNwYWNlICsgJzonICsgYWN0aW9uICsgJz8nICsgJC5wYXJhbShwYXJhbXMpLCAncG9zdCcsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coICdvbkZhY2Vib29rUHVibGlzaEFjdGlvbkNvbXBsZXRlJywgZmFsc2UgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coICdvbkZhY2Vib29rUHVibGlzaEFjdGlvbkNvbXBsZXRlJywgdHJ1ZSApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LCovXG4gICAgLyogc3RyZWFtIHB1Ymxpc2ggd2l0aCBjb25maXJtYXRpb24gYW5kIHVzZXIgaW5wdXQuIHJxdWlyZXMgcHVibGlzaF9zdHJlYW0gcGVybWlzc2lvbiAqL1xuICAgIHN0cmVhbVB1Ymxpc2g6IGZ1bmN0aW9uKG1lc3NhZ2UsIGF0dGFjaG1lbnQsIGFjdGlvbkxpbmtzLCB1c2VyTWVzc2FnZVByb21wdCwgdGFyZ2V0SWQpIHtcbiAgICAgICAgdmFyIHB1Ymxpc2ggPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdzdHJlYW0ucHVibGlzaCcsXG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgYXR0YWNobWVudDogYXR0YWNobWVudCxcbiAgICAgICAgICAgIGFjdGlvbl9saW5rczogYWN0aW9uTGlua3MsXG4gICAgICAgICAgICB1c2VyX21lc3NhZ2VfcHJvbXB0OiB1c2VyTWVzc2FnZVByb21wdCxcbiAgICAgICAgICAgIHRhcmdldF9pZDogdGFyZ2V0SWRcbiAgICAgICAgfTtcbiAgICAgICAgd2luZG93LkZCLnVpKHB1Ymxpc2gsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29uRmFjZWJvb2tTdHJlYW1QdWJsaXNoQ29tcGxldGUnLCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbkZhY2Vib29rU3RyZWFtUHVibGlzaENvbXBsZXRlJywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdGVzdF9zdHJlYW1QdWJsaXNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSAnbWVzc2FnZSc7XG4gICAgICAgIHZhciBhdHRhY2htZW50ID0ge1xuICAgICAgICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgICAgICAgY2FwdGlvbjogJ2NhcHRpb24nLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICBocmVmOiAnaHR0cDovL2V4YW1wbGUuY29tLydcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGFjdGlvbkxpbmtzID0gW3tcbiAgICAgICAgICAgIHRleHQ6ICdhY3Rpb25fbGluaycsXG4gICAgICAgICAgICBocmVmOiAnaHR0cDovL2V4YW1wbGUuY29tLydcbiAgICAgICAgfV07XG4gICAgICAgIHZhciB1c2VyTWVzc2FnZVByb21wdCA9ICd1c2VyX21lc3NhZ2VfcHJvbXB0JztcbiAgICAgICAgdGhpcy5zdHJlYW1QdWJsaXNoKG1lc3NhZ2UsIGF0dGFjaG1lbnQsIGFjdGlvbkxpbmtzLCB1c2VyTWVzc2FnZVByb21wdCk7XG4gICAgfVxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBGYWNlYm9vaztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCcuL0VtaXR0ZXInKSxcbiAgICBzd2ZvYmplY3QgPSB3aW5kb3cuc3dmb2JqZWN0O1xuXG5mdW5jdGlvbiBGbGFzaChlbGVtZW50LCB1cmwsIGVtYmVkdmFycywgZmxhc2h2YXJzKSB7XG5cbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuICAgIHRoaXMuZWxlbWVudElkID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgdGhpcy5mbGFzaElkID0gJ2ZsYXNoLScgKyB0aGlzLmVsZW1lbnRJZDtcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgICB0aGlzLmVtYmVkdmFycyA9IGVtYmVkdmFycyB8fCB7fTtcbiAgICB0aGlzLmZsYXNodmFycyA9IGZsYXNodmFycyB8fCB7fTtcblxuICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xuICAgIHRoaXMucXVldWVkQ2FsbHMgPSBbXTtcbn1cblxuRmxhc2gucHJvdG90eXBlID0ge1xuICAgIC8qXG4gICAgICogRW1iZWQgbWFpbiBmbGFzaCBhcHBcbiAgICAgKi9cbiAgICBlbWJlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFF1ZXJ5c3RyaW5nIHZhcnNcbiAgICAgICAgdGhpcy5fZ2V0Rmxhc2h2YXJzRnJvbVF1ZXJ5U3RyaW5nKHRoaXMuZmxhc2h2YXJzKTtcbiAgICAgICAgLy8gQ2hlY2sgcGF0aCBmb3JtYXRcbiAgICAgICAgdGhpcy5fZm9ybWF0UGF0aHModGhpcy5mbGFzaHZhcnMpO1xuICAgICAgICAvLyBjaGVjayBmbGFzaCB2ZXJzaW9uXG4gICAgICAgIHZhciBmbGFzaFZlcnNpb24gPSBzd2ZvYmplY3QuZ2V0Rmxhc2hQbGF5ZXJWZXJzaW9uKCk7XG4gICAgICAgIHZhciBtYWpvciA9IGZsYXNoVmVyc2lvbi5tYWpvcjtcbiAgICAgICAgdmFyIG1pbm9yID0gZmxhc2hWZXJzaW9uLm1pbm9yO1xuICAgICAgICB2YXIgbWluVmVyc2lvbkFyciA9ICh0aGlzLmVtYmVkdmFycy52ZXJzaW9uIHx8ICcxMC4yLjAnKS5zcGxpdCgnLicpO1xuICAgICAgICB2YXIgbWluTWFqb3IgPSBwYXJzZUludChtaW5WZXJzaW9uQXJyWzBdLCAxMCk7XG4gICAgICAgIHZhciBtaW5NaW5vciA9IHBhcnNlSW50KG1pblZlcnNpb25BcnJbMV0sIDEwKTtcblxuICAgICAgICB2YXIgcmVzdWx0O1xuXG4gICAgICAgIC8vIERldGVjdCAvIEVtYmVkXG4gICAgICAgIGlmIChmbGFzaFZlcnNpb24ubWFqb3IgPT09IDApIHtcbiAgICAgICAgICAgIC8vIE5vIEZsYXNoXG4gICAgICAgICAgICByZXN1bHQgPSAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChtYWpvciA8IG1pbk1ham9yIHx8IChtYWpvciA9PT0gbWluTWFqb3IgJiYgbWlub3IgPCBtaW5NaW5vcikpIHtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBGbGFzaFxuICAgICAgICAgICAgcmVzdWx0ID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgJ21lbnUnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAncXVhbGl0eSc6ICdoaWdoJyxcbiAgICAgICAgICAgICAgICAnYmdjb2xvcic6ICh0aGlzLmVtYmVkdmFycy5iZ0NvbG9yIHx8ICcjZmZmZmZmJyksXG4gICAgICAgICAgICAgICAgJ2FsbG93RnVsbFNjcmVlbic6IHRydWUsXG4gICAgICAgICAgICAgICAgJ2FsbG93RnVsbFNjcmVlbkludGVyYWN0aXZlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAnYWxsb3dTY3JpcHRBY2Nlc3MnOiAnYWx3YXlzJyxcbiAgICAgICAgICAgICAgICAnd21vZGUnOiAodGhpcy5lbWJlZHZhcnMud21vZGUgfHwgdW5kZWZpbmVkKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSB7XG4gICAgICAgICAgICAgICAgJ2lkJzogdGhpcy5mbGFzaElkLFxuICAgICAgICAgICAgICAgICduYW1lJzogdGhpcy5mbGFzaElkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzd2ZvYmplY3QuZW1iZWRTV0YoXG4gICAgICAgICAgICAgICAgdGhpcy51cmwsXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50SWQsXG4gICAgICAgICAgICAgICAgKHRoaXMuZW1iZWR2YXJzLndpZHRoIHx8ICcxMDAlJyksXG4gICAgICAgICAgICAgICAgKHRoaXMuZW1iZWR2YXJzLmhlaWdodCB8fCAnMTAwJScpLFxuICAgICAgICAgICAgICAgICh0aGlzLmVtYmVkdmFycy52ZXJzaW9uIHx8ICcxMC4yLjAnKSxcbiAgICAgICAgICAgICAgICB0aGlzLmZsYXNodmFycy5hc3NldHNQYXRoICsgJ3N3Zi9leHByZXNzSW5zdGFsbC5zd2YnLFxuICAgICAgICAgICAgICAgIHRoaXMuZmxhc2h2YXJzLFxuICAgICAgICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2VtYmVkJywgcmVzdWx0KTtcbiAgICB9LFxuICAgIC8qXG4gICAgICogR2V0IHJlZiB0byBGbGFzaCBvYmplY3RcbiAgICAgKi9cbiAgICBnZXRGbGFzaE9iamVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBzd2ZvYmplY3QuZ2V0T2JqZWN0QnlJZCh0aGlzLmZsYXNoSWQpO1xuICAgIH0sXG4gICAgLypcbiAgICAgKiBGbGFzaCBtdXN0IGNhbGwgJ2ZsYXNoLnJlYWR5JyB3aGVuIGxvYWRlZCBhbmQgcmVhZHkgdG8gcmVjZWl2ZSBKUyBjYWxsc1xuICAgICAqL1xuICAgIHJlYWR5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNSZWFkeSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmbGFzaC5yZWFkeSBjYWxsZWQnKTtcbiAgICAgICAgdGhpcy5fYXBwbHlRdWV1ZWRDYWxscygpO1xuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgncmVhZHknKTtcbiAgICB9LFxuICAgIC8qXG4gICAgICogQ2FsbCBtZXRob2RzIGluIGZsYXNoXG4gICAgICpcbiAgICAgKiBFLmcuXG4gICAgICogZmxhc2guY2FsbCggXCJvblNvbWVKU0FjdGlvbkNvbXBsZXRlXCIsIHJlc3BvbnNlICk7XG4gICAgICogLSBjYWxscyB0aGUgRXh0ZXJuYWxJbnRlcmZhY2UgY2FsbCBiYWNrICdvblNvbWVKU0FjdGlvbkNvbXBsZXRlJyBpbiBGbGFzaFxuICAgICAqIGZsYXNoLmNhbGwoXCJvbkZsYXNoRGlzcGF0Y2hlclwiLCBcIkhlbGxvXCIsIFwiV29ybGRcIiwge3Rlc3RPYmo6dHJ1ZX0sIGZhbHNlKTtcbiAgICAgKiAtIGNhbiBzZW5kIG11bHRpcGxlIGFyZ3VtZW50cyAtIG1heCA0IGF0IG1vbWVudCFcbiAgICAgKlxuICAgICAqL1xuICAgIGNhbGw6IGZ1bmN0aW9uKGZ1bmN0aW9uTmFtZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZsYXNoLmNhbGw6ICcsIGZ1bmN0aW9uTmFtZSwgJ2FyZ3VtZW50czonLCAoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5zbGljZSgxKSkpO1xuXG4gICAgICAgICAgICB2YXIgZmxhc2hPYmplY3QgPSB0aGlzLmdldEZsYXNoT2JqZWN0KCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZmxhc2ggcmVhZHk6JywgdGhpcy5pc1JlYWR5LCBmbGFzaE9iamVjdCk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1JlYWR5ICYmIGZsYXNoT2JqZWN0ICYmIGZsYXNoT2JqZWN0W2Z1bmN0aW9uTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBmaWd1cmUgb3V0IGhvdyB0byBkbyB0aGlzIGluIGEgY2xldmVyIHdheSFcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZsYXNoT2JqZWN0W2Z1bmN0aW9uTmFtZV0oYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0sIGFyZ3VtZW50c1szXSwgYXJndW1lbnRzWzRdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmbGFzaE9iamVjdFtmdW5jdGlvbk5hbWVdKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZsYXNoT2JqZWN0W2Z1bmN0aW9uTmFtZV0oYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZsYXNoT2JqZWN0W2Z1bmN0aW9uTmFtZV0oYXJndW1lbnRzWzFdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmxhc2hPYmplY3RbZnVuY3Rpb25OYW1lXSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZsYXNoLnF1ZXVlZENhbGxzLnB1c2g6JywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXVlZENhbGxzLnB1c2goYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmbGFzaC5jYWxsIEVSUk9SOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICAvKlxuICAgICAqIEFueSBKUyBtZXRob2RzIGNhbGxlZCBiZWZvcmUgRmxhc2ggbG9hZGVkIHdpbGwgYmUgcXVldWVkIGFuZCBjYWxsZWQgd2hlbiB0aGlzIG1ldGhvZCBpcyBjYWxsZWQuXG4gICAgICovXG4gICAgX2FwcGx5UXVldWVkQ2FsbHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZmxhc2guX2FwcGx5UXVldWVkQ2FsbHMnLCB0aGlzLnF1ZXVlZENhbGxzLmxlbmd0aCk7XG4gICAgICAgIHZhciBxdWV1ZWRDYWxscyA9IHRoaXMucXVldWVkQ2FsbHM7XG4gICAgICAgIHZhciBsID0gcXVldWVkQ2FsbHMubGVuZ3RoO1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgbCkge1xuICAgICAgICAgICAgdGhpcy5jYWxsLmFwcGx5KHRoaXMsIHF1ZXVlZENhbGxzW2ldKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnF1ZXVlZENhbGxzID0gW107XG4gICAgfSxcbiAgICAvKlxuICAgICAqIENoZWNrIFF1ZXJ5c3RyaW5nIGZvciBGbGFzaHZhciB2YWx1ZXNcbiAgICAgKi9cbiAgICBfZ2V0Rmxhc2h2YXJzRnJvbVF1ZXJ5U3RyaW5nOiBmdW5jdGlvbihmbGFzaHZhcnMpIHtcbiAgICAgICAgLy8gU2V0IEZsYXNodmFycyBmcm9tIFF1ZXJ5IFN0cmluZyBwYXJhbXNcbiAgICAgICAgZnVuY3Rpb24gc2V0Rmxhc2h2YXJGcm9tUXVlcnlTdHJpbmcocGFyYW0pIHtcbiAgICAgICAgICAgIGlmIChzd2ZvYmplY3QuZ2V0UXVlcnlQYXJhbVZhbHVlKHBhcmFtKSkge1xuICAgICAgICAgICAgICAgIGZsYXNodmFyc1twYXJhbV0gPSBzd2ZvYmplY3QuZ2V0UXVlcnlQYXJhbVZhbHVlKHBhcmFtKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmxhc2ggU2V0IGZsYXNodmFyIFxcJycgKyBwYXJhbSArICdcXCcgdG8gXFwnJyArIGZsYXNodmFyc1twYXJhbV0gKyAnXFwnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gUXVlcnlTdHJpbmcgcGFyYW1zIHRvIG92ZXJ3cml0ZSBkZWZhdWx0IEZsYXNodmFyc1xuICAgICAgICBmdW5jdGlvbiBxdWVyeVBhcmFtc1RvRmxhc2h2YXJzKHZhcnMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIHBhcmFtIGluIHZhcnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFycy5oYXNPd25Qcm9wZXJ0eShwYXJhbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0Rmxhc2h2YXJGcm9tUXVlcnlTdHJpbmcocGFyYW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWVyeVBhcmFtc1RvRmxhc2h2YXJzKGZsYXNodmFycyk7XG4gICAgICAgIC8vIExvb2sgZm9yIGxvY2FsZSBhbmQgZGVidWcgcGFyYW1zIGlmIHRoZXkgaGF2ZW4ndCBhbHJlYWR5IGJlZW4gZGVmaW5lZFxuICAgICAgICBpZiAoIWZsYXNodmFycy5sb2NhbGUpIHtcbiAgICAgICAgICAgIHNldEZsYXNodmFyRnJvbVF1ZXJ5U3RyaW5nKCdsb2NhbGUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZsYXNodmFycy5kZWJ1Zykge1xuICAgICAgICAgICAgc2V0Rmxhc2h2YXJGcm9tUXVlcnlTdHJpbmcoJ2RlYnVnJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmbGFzaHZhcnMuYncpIHtcbiAgICAgICAgICAgIHNldEZsYXNodmFyRnJvbVF1ZXJ5U3RyaW5nKCdidycpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvKlxuICAgICAqIENoZWNrIHBhdGhzIGZvciBjb3JyZWN0IGZvcm1hdHRpbmdcbiAgICAgKi9cbiAgICBfZm9ybWF0UGF0aHM6IGZ1bmN0aW9uKGZsYXNodmFycykge1xuICAgICAgICAvLyBNYWtlIHN1cmUgcGF0aHMgc3RhcnQgd2l0aCBwcm90b2NvbCBhbmQgZW5kIHdpdGggJy8nXG4gICAgICAgIGZ1bmN0aW9uIGZvcm1hdFBhdGgoaW5wdXQpIHtcbiAgICAgICAgICAgIGlmIChpbnB1dCAmJiBpbnB1dC5sYXN0SW5kZXhPZignLycpICE9PSBpbnB1dC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSBpbnB1dCArICcvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbnB1dCAmJiBpbnB1dC5zdWJzdHIoMCwgMikgPT09ICcvLycpIHtcbiAgICAgICAgICAgICAgICBpbnB1dCA9IGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sICsgaW5wdXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9ybWF0UGF0aChmbGFzaHZhcnMuYXNzZXRzUGF0aCk7XG4gICAgICAgIGZvcm1hdFBhdGgoZmxhc2h2YXJzLnZpZGVvUGF0aCk7XG4gICAgICAgIGZvcm1hdFBhdGgoZmxhc2h2YXJzLmF1ZGlvUGF0aCk7XG4gICAgICAgIGZvcm1hdFBhdGgoZmxhc2h2YXJzLmFwcFBhdGgpO1xuICAgIH1cblxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBGbGFzaDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gRlBTKGVsKSB7XG5cbiAgICB2YXIgdGltZSA9IDAsXG4gICAgICAgIGZwcyA9IDAsXG4gICAgICAgIGN1cnJlbnRGcHMgPSAwLFxuICAgICAgICBhdmVyYWdlRnBzID0gMCxcbiAgICAgICAgdGlja3MgPSAwLFxuICAgICAgICB0b3RhbEZwcyA9IDAsXG4gICAgICAgIGxhc3RGcHMgPSAwLFxuICAgICAgICBsYXN0QXZlcmFnZSA9IDA7XG5cbiAgICBpZiAoIWVsKSB7XG4gICAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnaWQnLCAnZnBzJyk7XG4gICAgICAgIGVsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgZWwuc3R5bGUudG9wID0gJzBweCc7XG4gICAgICAgIGVsLnN0eWxlLnJpZ2h0ID0gJzBweCc7XG4gICAgICAgIGVsLnN0eWxlLnBhZGRpbmcgPSAnMnB4IDZweCc7XG4gICAgICAgIGVsLnN0eWxlLnpJbmRleCA9ICc5OTk5OSc7XG4gICAgICAgIGVsLnN0eWxlLmJhY2tncm91bmQgPSAnIzAwMCc7XG4gICAgICAgIGVsLnN0eWxlLmNvbG9yID0gJyNmZmYnO1xuICAgICAgICBlbC5zdHlsZS5mb250U2l6ZSA9ICcxMHB4JztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVwb3J0KCkge1xuICAgICAgICBpZiAoY3VycmVudEZwcyA9PT0gbGFzdEZwcyAmJiBhdmVyYWdlRnBzID09PSBsYXN0QXZlcmFnZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RGcHMgPSBjdXJyZW50RnBzO1xuICAgICAgICBsYXN0QXZlcmFnZSA9IGF2ZXJhZ2VGcHM7XG4gICAgICAgIGVsLmlubmVySFRNTCA9ICdGUFM6ICcgKyBjdXJyZW50RnBzICsgJzxiciAvPkFWRTogJyArIGF2ZXJhZ2VGcHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlKG5vdykge1xuICAgICAgICBpZiAobm93ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGltZSA9PT0gMCkge1xuICAgICAgICAgICAgdGltZSA9IG5vdztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub3cgLSAxMDAwID4gdGltZSkge1xuICAgICAgICAgICAgdGltZSA9IG5vdztcbiAgICAgICAgICAgIGN1cnJlbnRGcHMgPSBmcHM7XG4gICAgICAgICAgICBmcHMgPSAwO1xuXG4gICAgICAgICAgICBpZiAoY3VycmVudEZwcyA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aWNrcysrO1xuICAgICAgICAgICAgICAgIHRvdGFsRnBzICs9IGN1cnJlbnRGcHM7XG4gICAgICAgICAgICAgICAgYXZlcmFnZUZwcyA9IE1hdGguZmxvb3IodG90YWxGcHMgLyB0aWNrcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXBvcnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZwcysrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGF1dG9VcGRhdGUoKSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYXV0b1VwZGF0ZSk7XG5cbiAgICAgICAgdXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ2F1dG9VcGRhdGUnOiBhdXRvVXBkYXRlLFxuICAgICAgICAndXBkYXRlJzogdXBkYXRlXG4gICAgfTtcbn1cblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBGUFM7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIEdyYXBoaWNzKGNhbnZhcykge1xuICAgIHRoaXMuaW5pdChjYW52YXMpO1xufVxuXG5HcmFwaGljcy5wcm90b3R5cGUgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oY2FudmFzKSB7XG4gICAgICAgIGlmIChjYW52YXMpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICAgICAgdGhpcy5zaXplKHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpKSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpO1xuICAgICAgICAgICAgdGhpcy5zaXplKHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jYW52YXMpO1xuICAgICAgICAgICAgdGhpcy5zaXplKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICB0aGlzLl90ZXh0Rm9udCA9ICdUaW1lcyc7XG4gICAgICAgIHRoaXMuX3RleHRTaXplID0gMTI7XG4gICAgICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5fdGV4dFNpemUgKyAncHggJyArIHRoaXMuX3RleHRGb250O1xuICAgIH0sXG4gICAgc2l6ZTogZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aCB8fCB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQgfHwgd2luZG93LmlubmVySGVpZ2h0O1xuICAgIH0sXG4gICAgY2xlYXI6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBiYWNrZ3JvdW5kOiBmdW5jdGlvbihyLCBnLCBiKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoJ3JnYignICsgciArICcsICcgKyBiICsgJywgJyArIGcgKyAnKScpO1xuICAgIH0sXG4gICAgZmlsbDogZnVuY3Rpb24ociwgZywgYiwgYSkge1xuICAgICAgICBpZiAodHlwZW9mIHIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gcjtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhID0gYSA9PT0gdW5kZWZpbmVkID8gMSA6IGE7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAncmdiYSgnICsgciArICcsICcgKyBiICsgJywgJyArIGcgKyAnLCAnICsgYSArICcpJztcbiAgICB9LFxuICAgIHN0cm9rZTogZnVuY3Rpb24ociwgZywgYiwgYSkge1xuICAgICAgICBhID0gYSA9PT0gdW5kZWZpbmVkID8gMSA6IGE7XG4gICAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9ICdyZ2JhKCcgKyByICsgJywgJyArIGIgKyAnLCAnICsgZyArICcsICcgKyBhICsgJyknO1xuICAgIH0sXG4gICAgc3Ryb2tlV2VpZ2h0OiBmdW5jdGlvbih3KSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB3O1xuICAgIH0sXG4gICAgbW92ZTogZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICB0aGlzLmNvbnRleHQubW92ZVRvKHgsIHkpO1xuICAgIH0sXG4gICAgbGluZTogZnVuY3Rpb24oeDEsIHkxLCB4MiwgeTIpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmNvbnRleHQubW92ZVRvKHgxLCB5MSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oeDIsIHkyKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIH0sXG4gICAgcmVjdDogZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodCwgYW5nbGUpIHtcbiAgICAgICAgaWYgKGFuZ2xlICE9PSB1bmRlZmluZWQgJiYgYW5nbGUgIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQudHJhbnNsYXRlKHggKyB3aWR0aCAvIDIsIHkgKyBoZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5yb3RhdGUoYW5nbGUpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnJlY3QoLXdpZHRoIC8gMiwgLWhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNpcmNsZTogZnVuY3Rpb24oeCwgeSwgcmFkaXVzKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmFyYyh4LCB5LCByYWRpdXMsIDAsIE1hdGguUEkgKiAyLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gICAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICB9LFxuICAgIHRyaWFuZ2xlOiBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0LCBhbmdsZSkge1xuICAgICAgICBpZiAoYW5nbGUgIT09IHVuZGVmaW5lZCAmJiBhbmdsZSAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUoeCwgeSk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucm90YXRlKGFuZ2xlKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oMCAtIHdpZHRoIC8gMiwgMCArIGhlaWdodCAvIDIpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbygwLCAwIC0gaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKDAgKyB3aWR0aCAvIDIsIDAgKyBoZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbyh4IC0gd2lkdGggLyAyLCB5ICsgaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHgsIHkgLSBoZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oeCArIHdpZHRoIC8gMiwgeSArIGhlaWdodCAvIDIpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdHJpYW5nbGVBQkM6IGZ1bmN0aW9uKHgxLCB5MSwgeDIsIHkyLCB4MywgeTMpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmNvbnRleHQubW92ZVRvKHgxLCB5MSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oeDIsIHkyKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh4MywgeTMpO1xuICAgICAgICB0aGlzLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgICB9LFxuICAgIGltYWdlOiBmdW5jdGlvbihpbWcsIHgsIHksIGFuZ2xlKSB7XG4gICAgICAgIGlmIChhbmdsZSAhPT0gdW5kZWZpbmVkICYmIGFuZ2xlICE9PSAwKSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0WCA9IGltZy53aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgb2Zmc2V0WSA9IGltZy5oZWlnaHQgLyAyO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUoeCArIG9mZnNldFgsIHkgKyBvZmZzZXRZKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5yb3RhdGUoYW5nbGUpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShpbWcsIC1vZmZzZXRYLCAtb2Zmc2V0WSk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShpbWcsIHgsIHkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjcm9zczogZnVuY3Rpb24ocmFkaXVzKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbygtcmFkaXVzLCAtcmFkaXVzKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyhyYWRpdXMsIHJhZGl1cyk7XG4gICAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oLXJhZGl1cywgcmFkaXVzKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyhyYWRpdXMsIC1yYWRpdXMpO1xuICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfSxcbiAgICB0ZXh0OiBmdW5jdGlvbihzdHIsIHgsIHkpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHN0ciwgeCwgeSk7XG4gICAgfSxcbiAgICB0ZXh0Rm9udDogZnVuY3Rpb24oZm9udCkge1xuICAgICAgICB0aGlzLl90ZXh0Rm9udCA9IGZvbnQ7XG4gICAgICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5fdGV4dFNpemUgKyAncHggJyArIGZvbnQ7XG4gICAgfSxcbiAgICB0ZXh0U2l6ZTogZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgICB0aGlzLl90ZXh0U2l6ZSA9IHNpemU7XG4gICAgICAgIHRoaXMuY29udGV4dC5mb250ID0gc2l6ZSArICdweCAnICsgdGhpcy5fdGV4dEZvbnQ7XG4gICAgfSxcbiAgICBvcGVuSW1hZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgd2luID0gd2luZG93Lm9wZW4oJycsICdDYW52YXMgSW1hZ2UnKSxcbiAgICAgICAgICAgIHNyYyA9IHRoaXMuY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG4gICAgICAgIHdpbi5kb2N1bWVudC53cml0ZSgnPGltZyBzcmM9XCInICsgc3JjICtcbiAgICAgICAgICAgICdcIiB3aWR0aD1cIicgKyB0aGlzLndpZHRoICtcbiAgICAgICAgICAgICdcIiBoZWlnaHQ9XCInICsgdGhpcy5oZWlnaHQgKyAnXCIgLz4nKTtcbiAgICB9LFxuICAgIGRvd25sb2FkSW1hZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3JjID0gdGhpcy5jYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKS5yZXBsYWNlKCdpbWFnZS9wbmcnLCAnaW1hZ2Uvb2N0ZXQtc3RyZWFtJyk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gc3JjO1xuICAgIH0sXG4gICAgZ2V0SW1hZ2VEYXRhOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH0sXG4gICAgZ2V0UGl4ZWw6IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgdmFyIGltYWdlRGF0YSA9IHRoaXMuZ2V0SW1hZ2VEYXRhKCk7XG4gICAgICAgIHZhciBpID0gKHggKyB5ICogaW1hZ2VEYXRhLndpZHRoKSAqIDQ7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChpbWFnZURhdGEuZGF0YSwgaSwgaSArIDQpO1xuICAgIH0sXG4gICAgc2V0UGl4ZWw6IGZ1bmN0aW9uKHgsIHksIHIsIGcsIGIsIGEpIHtcbiAgICAgICAgdmFyIGltYWdlRGF0YSA9IHRoaXMuZ2V0SW1hZ2VEYXRhKCk7XG4gICAgICAgIHZhciBpID0gKHggKyB5ICogaW1hZ2VEYXRhLndpZHRoKSAqIDQ7XG4gICAgICAgIGltYWdlRGF0YS5kYXRhW2kgKyAwXSA9IHI7XG4gICAgICAgIGltYWdlRGF0YS5kYXRhW2kgKyAxXSA9IGc7XG4gICAgICAgIGltYWdlRGF0YS5kYXRhW2kgKyAyXSA9IGI7XG4gICAgICAgIGltYWdlRGF0YS5kYXRhW2kgKyAzXSA9IGE7XG4gICAgfSxcbiAgICBlYWNoUGl4ZWw6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgIHZhciBpbWFnZURhdGEgPSB0aGlzLmdldEltYWdlRGF0YSgpO1xuICAgICAgICB2YXIgcGl4ZWxzID0gaW1hZ2VEYXRhLmRhdGE7XG4gICAgICAgIHZhciB3ID0gaW1hZ2VEYXRhLndpZHRoO1xuICAgICAgICB2YXIgaCA9IGltYWdlRGF0YS5oZWlnaHQ7XG5cbiAgICAgICAgdmFyIGwgPSB3ICogaDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIC8vIGdldCBjb2xvciBvZiBwaXhlbFxuICAgICAgICAgICAgdmFyIHIgPSBwaXhlbHNbaSAqIDRdOyAvLyBSZWRcbiAgICAgICAgICAgIHZhciBnID0gcGl4ZWxzW2kgKiA0ICsgMV07IC8vIEdyZWVuXG4gICAgICAgICAgICB2YXIgYiA9IHBpeGVsc1tpICogNCArIDJdOyAvLyBCbHVlXG4gICAgICAgICAgICB2YXIgYSA9IHBpeGVsc1tpICogNCArIDNdOyAvLyBBbHBoYVxuXG4gICAgICAgICAgICAvLyBnZXQgdGhlIHBvc2l0aW9uIG9mIHBpeGVsXG4gICAgICAgICAgICB2YXIgeSA9IE1hdGguZmxvb3IoaSAvIHcpO1xuICAgICAgICAgICAgdmFyIHggPSBpIC0geSAqIHc7XG5cbiAgICAgICAgICAgIGZuKHIsIGcsIGIsIGEsIHgsIHkpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBHcmFwaGljcztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gSW5wdXRDb29yZHMoKSB7XG4gICAgdmFyIHNlbGY7XG4gICAgdmFyIGNhbGN1bGF0ZUNvb3JkcyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZuO1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5wYWdlWE9mZnNldCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGZuID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIHZhciBwWCA9IChlLmNsaWVudFggfHwgMCksXG4gICAgICAgICAgICAgICAgICAgIHBZID0gKGUuY2xpZW50WSB8fCAwKSxcbiAgICAgICAgICAgICAgICAgICAgc1ggPSB3aW5kb3cucGFnZVhPZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgIHNZID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICAgICAgICAgIHNlbGYueCA9IHBYICsgc1g7XG4gICAgICAgICAgICAgICAgc2VsZi55ID0gcFkgKyBzWTtcbiAgICAgICAgICAgICAgICBzZWxmLnBlcmNlbnRYID0gc2VsZi54IC8gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgICAgICAgc2VsZi5wZXJjZW50WSA9IHNlbGYueSAvIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmbiA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlID0gKGUgJiYgZS5jbGllbnRYKSA/IGUgOiB3aW5kb3cuZXZlbnQ7XG4gICAgICAgICAgICAgICAgdmFyIHBYID0gZS5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICBwWSA9IGUuY2xpZW50WSxcbiAgICAgICAgICAgICAgICAgICAgZCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgYiA9IGRvY3VtZW50LmJvZHksXG4gICAgICAgICAgICAgICAgICAgIHNYID0gTWF0aC5tYXgoZC5zY3JvbGxMZWZ0LCBiLnNjcm9sbExlZnQpLFxuICAgICAgICAgICAgICAgICAgICBzWSA9IE1hdGgubWF4KGQuc2Nyb2xsVG9wLCBiLnNjcm9sbFRvcCk7XG4gICAgICAgICAgICAgICAgc2VsZi54ID0gcFggKyBzWDtcbiAgICAgICAgICAgICAgICBzZWxmLnkgPSBwWSArIHNZO1xuICAgICAgICAgICAgICAgIHNlbGYucGVyY2VudFggPSBzZWxmLnggLyB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgICAgICAgICBzZWxmLnBlcmNlbnRZID0gc2VsZi55IC8gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm47XG4gICAgfSgpKTtcblxuICAgIHNlbGYgPSB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDAsXG4gICAgICAgIHBlcmNlbnRYOiAwLFxuICAgICAgICBwZXJjZW50WTogMCxcbiAgICAgICAgaXNMaXN0ZW5pbmc6IGZhbHNlLFxuXG4gICAgICAgIG9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgY2FsY3VsYXRlQ29vcmRzKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgY2FsY3VsYXRlQ29vcmRzKTtcbiAgICAgICAgICAgIHNlbGYuaXNMaXN0ZW5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIG9mZjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGNhbGN1bGF0ZUNvb3Jkcyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGNhbGN1bGF0ZUNvb3Jkcyk7XG4gICAgICAgICAgICBzZWxmLmlzTGlzdGVuaW5nID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHNlbGY7XG59XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gSW5wdXRDb29yZHM7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBLZXlib2FyZCA9IHJlcXVpcmUoJy4va2V5Ym9hcmQnKTtcblxuZnVuY3Rpb24gS2V5SW5wdXQoKSB7XG4gICAgdmFyIGtleXMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgICAgICAga2V5cy5wdXNoKGZhbHNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleURvd24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAga2V5c1tldmVudC5rZXlDb2RlXSA9IHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXlVcChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBrZXlzW2V2ZW50LmtleUNvZGVdID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHNlbGYgPSB7XG4gICAgICAgIG9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24sIGZhbHNlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25LZXlVcCwgZmFsc2UpO1xuICAgICAgICB9LFxuICAgICAgICBvZmY6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93biwgZmFsc2UpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBvbktleVVwLCBmYWxzZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzRG93bjogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5c1trZXldO1xuICAgICAgICB9LFxuICAgICAgICBsZWZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXlzW0tleWJvYXJkLkxFRlRdIHx8IGtleXNbS2V5Ym9hcmQuQV07XG4gICAgICAgIH0sXG4gICAgICAgIHJpZ2h0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXlzW0tleWJvYXJkLlJJR0hUXSB8fCBrZXlzW0tleWJvYXJkLkRdO1xuICAgICAgICB9LFxuICAgICAgICB1cDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5c1tLZXlib2FyZC5VUF0gfHwga2V5c1tLZXlib2FyZC5XXTtcbiAgICAgICAgfSxcbiAgICAgICAgZG93bjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5c1tLZXlib2FyZC5ET1dOXSB8fCBrZXlzW0tleWJvYXJkLlNdO1xuICAgICAgICB9LFxuICAgICAgICBzcGFjZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5c1tLZXlib2FyZC5TUEFDRUJBUl07XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VsZi5vbigpO1xuXG4gICAgcmV0dXJuIHNlbGY7XG59XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gS2V5SW5wdXQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIExpbmtlZExpc3QoKSB7XG5cbiAgICB2YXIgZmlyc3QsXG4gICAgICAgIGxhc3Q7XG5cbiAgICAvKlxuICAgICAgICBpdGVtID0ge1xuICAgICAgICAgICAgJ25leHQnOiBudWxsLFxuICAgICAgICAgICAgJ3ByZXYnOiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXRlbSA9IGxpbmtlZExpc3QuZ2V0Rmlyc3QoKTtcbiAgICAgICAgd2hpbGUoaXRlbSkge1xuICAgICAgICAgICAgLy8gZG8gc3R1ZmZcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLm5leHQ7XG4gICAgICAgIH1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGFkZChpdGVtKSB7XG4gICAgICAgIGlmICghZmlyc3QpIHtcbiAgICAgICAgICAgIGZpcnN0ID0gbGFzdCA9IGl0ZW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgaSA9IGZpcnN0O1xuICAgICAgICAgICAgd2hpbGUgKGkubmV4dCkge1xuICAgICAgICAgICAgICAgIGkgPSBpLm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnNlcnRBZnRlcihpdGVtLCBpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmUoaXRlbSkge1xuICAgICAgICBpZiAoaXRlbS5uZXh0KSB7XG4gICAgICAgICAgICBpdGVtLm5leHQucHJldiA9IGl0ZW0ucHJldjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbS5wcmV2KSB7XG4gICAgICAgICAgICBpdGVtLnByZXYubmV4dCA9IGl0ZW0ubmV4dDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbSA9PT0gZmlyc3QpIHtcbiAgICAgICAgICAgIGZpcnN0ID0gaXRlbS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtID09PSBsYXN0KSB7XG4gICAgICAgICAgICBsYXN0ID0gaXRlbS5wcmV2O1xuICAgICAgICB9XG4gICAgICAgIGl0ZW0ubmV4dCA9IGl0ZW0ucHJldiA9IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIoaXRlbSwgYWZ0ZXIpIHtcbiAgICAgICAgcmVtb3ZlKGl0ZW0pO1xuXG4gICAgICAgIGl0ZW0ucHJldiA9IGFmdGVyO1xuICAgICAgICBpdGVtLm5leHQgPSBhZnRlci5uZXh0O1xuXG4gICAgICAgIGlmICghYWZ0ZXIubmV4dCkge1xuICAgICAgICAgICAgbGFzdCA9IGl0ZW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZnRlci5uZXh0LnByZXYgPSBpdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgYWZ0ZXIubmV4dCA9IGl0ZW07XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKGl0ZW0sIGJlZm9yZSkge1xuICAgICAgICByZW1vdmUoaXRlbSk7XG5cbiAgICAgICAgaXRlbS5wcmV2ID0gYmVmb3JlLnByZXY7XG4gICAgICAgIGl0ZW0ubmV4dCA9IGJlZm9yZTtcblxuICAgICAgICBpZiAoIWJlZm9yZS5wcmV2KSB7XG4gICAgICAgICAgICBmaXJzdCA9IGl0ZW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiZWZvcmUucHJldi5uZXh0ID0gaXRlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJlZm9yZS5wcmV2ID0gaXRlbTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrLCBjYWxsYmFja0NvbnRleHQpIHtcbiAgICAgICAgaWYgKCFmaXJzdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNwbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgICAgIGFyZ3MudW5zaGlmdChudWxsKTsgLy8gbWFrZSBzcGFjZSBmb3IgaXRlbVxuXG4gICAgICAgIHZhciBpdGVtID0gZmlyc3Q7XG4gICAgICAgIHdoaWxlIChpdGVtKSB7XG4gICAgICAgICAgICBhcmdzWzBdID0gaXRlbTtcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KGNhbGxiYWNrQ29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICBpdGVtID0gaXRlbS5uZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0Rmlyc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZpcnN0O1xuICAgICAgICB9LFxuICAgICAgICBnZXRMYXN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBsYXN0O1xuICAgICAgICB9LFxuICAgICAgICBnZXRDb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgICAgICAgdmFyIGkgPSBmaXJzdDtcbiAgICAgICAgICAgIHdoaWxlIChpKSB7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICBpID0gaS5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvdW50O1xuICAgICAgICB9LFxuICAgICAgICAnYWRkJzogYWRkLFxuICAgICAgICAncmVtb3ZlJzogcmVtb3ZlLFxuICAgICAgICAnaW5zZXJ0QWZ0ZXInOiBpbnNlcnRBZnRlcixcbiAgICAgICAgJ2luc2VydEJlZm9yZSc6IGluc2VydEJlZm9yZSxcbiAgICAgICAgJ2ZvckVhY2gnOiBmb3JFYWNoXG4gICAgfTtcbn1cblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBMaW5rZWRMaXN0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJy4vRW1pdHRlcicpO1xuXG5mdW5jdGlvbiBNb3VzZVdoZWVsKHNwZWVkKSB7XG4gICAgc3BlZWQgPSBzcGVlZCB8fCAyO1xuXG4gICAgdmFyIG1vdXNlV2hlZWw7XG5cbiAgICBmdW5jdGlvbiBhZGQoKSB7XG4gICAgICAgIGlmICgnb25tb3VzZXdoZWVsJyBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgbW91c2VXaGVlbEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgbW91c2VXaGVlbEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgICAgaWYgKCdvbm1vdXNld2hlZWwnIGluIHdpbmRvdykge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCBtb3VzZVdoZWVsSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBtb3VzZVdoZWVsSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW91c2VXaGVlbEhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudCkge1xuICAgICAgICAgICAgZXZlbnQgPSB3aW5kb3cuZXZlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgZGlyZWN0aW9uID0gKGV2ZW50LmRldGFpbCA8IDAgfHwgZXZlbnQud2hlZWxEZWx0YSA+IDApID8gMSA6IC0xO1xuICAgICAgICB2YXIgZGVsdGEgPSBkaXJlY3Rpb24gKiBzcGVlZDtcblxuICAgICAgICBpZiAoZGlyZWN0aW9uID4gMCkge1xuICAgICAgICAgICAgbW91c2VXaGVlbC5lbWl0KCd1cCcsIGRlbHRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vdXNlV2hlZWwuZW1pdCgnZG93bicsIGRlbHRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1vdXNlV2hlZWwuZW1pdCgndXBkYXRlJywgZGVsdGEpO1xuICAgIH1cblxuICAgIGFkZCgpO1xuXG4gICAgbW91c2VXaGVlbCA9IE9iamVjdC5jcmVhdGUoRW1pdHRlci5wcm90b3R5cGUsIHtcbiAgICAgICAgX2V2ZW50czoge1xuICAgICAgICAgICAgdmFsdWU6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIGFkZDoge1xuICAgICAgICAgICAgdmFsdWU6IGFkZFxuICAgICAgICB9LFxuICAgICAgICByZW1vdmU6IHtcbiAgICAgICAgICAgIHZhbHVlOiByZW1vdmVcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUobW91c2VXaGVlbCk7XG59XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gTW91c2VXaGVlbDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gT2JqZWN0UG9vbChUeXBlKSB7XG5cbiAgICB2YXIgcG9vbCA9IFtdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0UG9vbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gcG9vbDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICggcG9vbC5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwb29sLnBvcCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFR5cGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGlzcG9zZTogZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHBvb2wucHVzaChpbnN0YW5jZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbGw6IGZ1bmN0aW9uKGNvdW50KSB7XG4gICAgICAgICAgICB3aGlsZSAoIHBvb2wubGVuZ3RoIDwgY291bnQgKSB7XG4gICAgICAgICAgICAgICAgcG9vbFtwb29sLmxlbmd0aF0gPSBuZXcgVHlwZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbXB0eTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwb29sID0gW107XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IE9iamVjdFBvb2w7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCcuL2VtaXR0ZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBUb3VjaElucHV0KGVsLCBtaW5Td2lwZURpc3RhbmNlKSB7XG4gICAgZWwgPSBlbCB8fCBkb2N1bWVudC5ib2R5O1xuICAgIG1pblN3aXBlRGlzdGFuY2UgPSBtaW5Td2lwZURpc3RhbmNlIHx8IDEwO1xuXG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHN0YXJ0OiBbLTEsIC0xXSxcbiAgICAgICAgbW92ZTogWy0xLCAtMV0sXG4gICAgICAgIGVuZDogWy0xLCAtMV0sXG4gICAgICAgIHBvc2l0aW9uOiBbLTEsIC0xXSxcbiAgICAgICAgZGlzdGFuY2U6IFswLCAwXSxcbiAgICAgICAgZGlyZWN0aW9uOiBbJ25vbmUnLCAnbm9uZSddLFxuICAgICAgICB0b3VjaGluZzogZmFsc2UsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IG51bGxcbiAgICB9O1xuXG4gICAgdmFyIHRvdWNoSW5wdXQ7XG5cbiAgICBmdW5jdGlvbiBkZXRlY3RTd2lwZShpLCBhLCBiKSB7XG4gICAgICAgIGRhdGEuZGlzdGFuY2VbaV0gPSBNYXRoLmFicyhkYXRhLnN0YXJ0W2ldIC0gZGF0YS5lbmRbaV0pO1xuICAgICAgICBpZiAoZGF0YS5kaXN0YW5jZVtpXSA+PSBtaW5Td2lwZURpc3RhbmNlKSB7XG4gICAgICAgICAgICBkYXRhLmRpcmVjdGlvbltpXSA9IGRhdGEuc3RhcnRbaV0gPiBkYXRhLm1vdmVbaV0gPyBhIDogYjtcbiAgICAgICAgICAgIHRvdWNoSW5wdXQuZW1pdCgnc3dpcGUnLCBkYXRhLmRpcmVjdGlvbltpXSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b3VjaEhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKCEoZXZlbnQgJiYgZXZlbnQudG91Y2hlcykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkYXRhLm9yaWdpbmFsRXZlbnQgPSBldmVudDtcbiAgICAgICAgdmFyIHRvdWNoID0gZXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgdmFyIHggPSB0b3VjaCAmJiB0b3VjaC5wYWdlWDtcbiAgICAgICAgdmFyIHkgPSB0b3VjaCAmJiB0b3VjaC5wYWdlWTtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3RvdWNoc3RhcnQnOlxuICAgICAgICAgICAgICAgIGRhdGEuc3RhcnRbMF0gPSBkYXRhLm1vdmVbMF0gPSBkYXRhLmVuZFswXSA9IGRhdGEucG9zaXRpb25bMF0gPSB4O1xuICAgICAgICAgICAgICAgIGRhdGEuc3RhcnRbMV0gPSBkYXRhLm1vdmVbMV0gPSBkYXRhLmVuZFsxXSA9IGRhdGEucG9zaXRpb25bMV0gPSB5O1xuICAgICAgICAgICAgICAgIGRhdGEudG91Y2hpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndG91Y2htb3ZlJzpcbiAgICAgICAgICAgICAgICBkYXRhLm1vdmVbMF0gPSBkYXRhLnBvc2l0aW9uWzBdID0geDtcbiAgICAgICAgICAgICAgICBkYXRhLm1vdmVbMV0gPSBkYXRhLnBvc2l0aW9uWzFdID0geTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RvdWNoZW5kJzpcbiAgICAgICAgICAgICAgICBkYXRhLmVuZFswXSA9IGRhdGEucG9zaXRpb25bMF0gPSB4O1xuICAgICAgICAgICAgICAgIGRhdGEuZW5kWzFdID0gZGF0YS5wb3NpdGlvblsxXSA9IHk7XG4gICAgICAgICAgICAgICAgZGF0YS50b3VjaGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICh0b3VjaElucHV0Lmxpc3RlbmVyQ291bnQoJ3N3aXBlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0ZWN0U3dpcGUoMCwgJ2xlZnQnLCAncmlnaHQnKTtcbiAgICAgICAgICAgICAgICAgICAgZGV0ZWN0U3dpcGUoMSwgJ3VwJywgJ2Rvd24nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdGVuKGVsZW0pIHtcbiAgICAgICAgZWwgPSBlbGVtIHx8IGVsO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaEhhbmRsZXIpO1xuICAgICAgICByZXR1cm4gdG91Y2hJbnB1dDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICB0b3VjaElucHV0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaEhhbmRsZXIpO1xuICAgICAgICBlbCA9IG51bGw7XG4gICAgICAgIHJldHVybiB0b3VjaElucHV0O1xuICAgIH1cblxuICAgIGxpc3RlbihlbCk7XG5cbiAgICB0b3VjaElucHV0ID0gT2JqZWN0LmNyZWF0ZShFdmVudEVtaXR0ZXIucHJvdG90eXBlLCB7XG4gICAgICAgIF9ldmVudHM6IHtcbiAgICAgICAgICAgIHZhbHVlOiB7fVxuICAgICAgICB9LFxuICAgICAgICBsaXN0ZW46IHtcbiAgICAgICAgICAgIHZhbHVlOiBsaXN0ZW5cbiAgICAgICAgfSxcbiAgICAgICAgaXNEb3duOiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEudG91Y2hpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldFRvdWNoOiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRlc3Ryb3k6IHtcbiAgICAgICAgICAgIHZhbHVlOiBkZXN0cm95XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHRvdWNoSW5wdXQpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCcuL0VtaXR0ZXInKTtcblxuZnVuY3Rpb24gVmlkZW9PYmplY3QodmlkZW9FbCkge1xuICAgIHZhciBlbCA9IHZpZGVvRWwgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICB2YXIgcGxheWVyO1xuXG4gICAgdmFyIG1ldGFkYXRhSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgnbWV0YWRhdGEnLCB7XG4gICAgICAgICAgICBzcmM6IGVsLmN1cnJlbnRTcmMsXG4gICAgICAgICAgICB3aWR0aDogZWwudmlkZW9XaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogZWwudmlkZW9IZWlnaHQsXG4gICAgICAgICAgICBkdXJhdGlvbjogZWwuZHVyYXRpb25cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBjYW5wbGF5SGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgncmVhZHknKTtcbiAgICB9O1xuXG4gICAgdmFyIHBsYXlIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHBsYXllci5lbWl0KCdwbGF5Jyk7XG4gICAgfTtcblxuICAgIHZhciBlbmRlZEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ2VuZGVkJyk7XG4gICAgfTtcblxuICAgIHZhciBlcnJvckhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ2Vycm9yJywgZWwuZXJyb3IpO1xuICAgIH07XG5cbiAgICB2YXIgdGltZXVwZGF0ZUhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3RpbWV1cGRhdGUnLCBlbC5jdXJyZW50VGltZSk7XG4gICAgfTtcblxuICAgIHZhciBhZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZW1vdmVFdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgbWV0YWRhdGFIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgY2FucGxheUhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIHBsYXlIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXlpbmcnLCBwbGF5SGFuZGxlciwgZmFsc2UpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9ySGFuZGxlciwgZmFsc2UpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGVuZGVkSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdGltZXVwZGF0ZUhhbmRsZXIsIGZhbHNlKTtcbiAgICB9O1xuXG4gICAgdmFyIHJlbW92ZUV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgbWV0YWRhdGFIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCBjYW5wbGF5SGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BsYXknLCBwbGF5SGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BsYXlpbmcnLCBwbGF5SGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBlbmRlZEhhbmRsZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdGltZXVwZGF0ZUhhbmRsZXIpO1xuICAgIH07XG5cbiAgICB2YXIgZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwbGF5ZXIub2ZmKCk7XG4gICAgICAgIGVsLnBhdXNlKCk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICAgICBpZiAoZWwucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgZWwucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgIH1cblxuICAgICAgICBlbCA9IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9O1xuXG4gICAgdmFyIGxvYWQgPSBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5CbG9iICYmIHVybCBpbnN0YW5jZW9mIHdpbmRvdy5CbG9iKSB7XG4gICAgICAgICAgICB1cmwgPSBnZXRCbG9iVVJMKHVybCk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICAgICBlbC5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xuICAgICAgICBlbC5wcmVsb2FkID0gJ2F1dG8nO1xuICAgICAgICBlbC5zcmMgPSB1cmw7XG4gICAgICAgIGVsLmxvYWQoKTtcblxuICAgICAgICByZXR1cm4gcGxheWVyO1xuICAgIH07XG5cbiAgICB2YXIgcGxheSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBlbC5wbGF5KCk7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9O1xuXG4gICAgdmFyIHBhdXNlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGVsLnBhdXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9O1xuXG4gICAgdmFyIHNlZWsgPSBmdW5jdGlvbih0aW1lKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBlbC5jdXJyZW50VGltZSA9IHRpbWU7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9O1xuXG4gICAgdmFyIGdldEJsb2JVUkwgPSBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwodXJsKTtcbiAgICAgICAgdmFyIHJldm9rZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCByZXZva2UpO1xuICAgICAgICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgICAgICAgfTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCByZXZva2UpO1xuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH07XG5cbiAgICBhZGRFdmVudExpc3RlbmVycygpO1xuXG4gICAgcGxheWVyID0gT2JqZWN0LmNyZWF0ZShFbWl0dGVyLnByb3RvdHlwZSwge1xuICAgICAgICBfZXZlbnRzOiB7XG4gICAgICAgICAgICB2YWx1ZToge31cbiAgICAgICAgfSxcbiAgICAgICAgZGVzdHJveToge1xuICAgICAgICAgICAgdmFsdWU6IGRlc3Ryb3lcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZDoge1xuICAgICAgICAgICAgdmFsdWU6IGxvYWRcbiAgICAgICAgfSxcbiAgICAgICAgcGF1c2U6IHtcbiAgICAgICAgICAgIHZhbHVlOiBwYXVzZVxuICAgICAgICB9LFxuICAgICAgICBwbGF5OiB7XG4gICAgICAgICAgICB2YWx1ZTogcGxheVxuICAgICAgICB9LFxuICAgICAgICBzZWVrOiB7XG4gICAgICAgICAgICB2YWx1ZTogc2Vla1xuICAgICAgICB9LFxuICAgICAgICBlbDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGN1cnJlbnRUaW1lOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5jdXJyZW50VGltZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZWwuY3VycmVudFRpbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZHVyYXRpb246IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLmR1cmF0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB2b2x1bWU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLnZvbHVtZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZWwudm9sdW1lID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHBsYXllcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVmlkZW9PYmplY3Q7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBBcnJheVV0aWxzID0ge1xuICAgIGNsb25lOiBmdW5jdGlvbihhcnIpIHtcbiAgICAgICAgcmV0dXJuIGFyci5zbGljZSgwKTtcbiAgICB9LFxuICAgIGdldFJhbmRvbTogZnVuY3Rpb24oYXJyKSB7XG4gICAgICAgIHJldHVybiBhcnJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldO1xuICAgIH0sXG4gICAgaXNBcnJheTogZnVuY3Rpb24oYXJyKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5ID8gQXJyYXkuaXNBcnJheShhcnIpIDogYXJyICYmIGFyciBpbnN0YW5jZW9mIEFycmF5O1xuICAgIH0sXG4gICAgbmVhcmVzdDogZnVuY3Rpb24odmFsdWUsIGFycikge1xuICAgICAgICB2YXIgbGVhc3QgPSBOdW1iZXIuTUFYX1ZBTFVFLCBkaWZmO1xuICAgICAgICByZXR1cm4gYXJyLnJlZHVjZShmdW5jdGlvbihpbmRleCwgaXRlbSwgaSkge1xuICAgICAgICAgICAgZGlmZiA9IE1hdGguYWJzKGl0ZW0gLSB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZGlmZiA8IGxlYXN0KSB7XG4gICAgICAgICAgICAgICAgbGVhc3QgPSBkaWZmO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSwgLTEpO1xuICAgIH0sXG4gICAgc29ydE51bWVyaWM6IGZ1bmN0aW9uKGFycikge1xuICAgICAgICByZXR1cm4gYXJyLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEgLSBiO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHNvcnRSYW5kb206IGZ1bmN0aW9uKGFycikge1xuICAgICAgICByZXR1cm4gYXJyLnNvcnQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA+IDAuNSA/IC0xIDogMTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBBcnJheVV0aWxzO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXG4vKiBhbmRyb2lkICovXG5cbmZ1bmN0aW9uIGFuZHJvaWQoKSB7XG4gICAgcmV0dXJuICEhdWEubWF0Y2goL0FuZHJvaWQvaSk7XG59XG5cbmZ1bmN0aW9uIGFuZHJvaWRPbGQoKSB7XG4gICAgcmV0dXJuICEhKGFuZHJvaWQoKSAmJiBwYXJzZUZsb2F0KHVhLnNsaWNlKHVhLmluZGV4T2YoJ0FuZHJvaWQnKSArIDgpKSA8IDQpO1xufVxuXG5mdW5jdGlvbiBhbmRyb2lkU3RvY2soKSB7XG4gICAgaWYgKCFhbmRyb2lkKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgcmVnRXhBcHBsZVdlYktpdCA9IG5ldyBSZWdFeHAoL0FwcGxlV2ViS2l0XFwvKFtcXGQuXSspLyk7XG4gICAgdmFyIHJlc3VsdEFwcGxlV2ViS2l0UmVnRXggPSByZWdFeEFwcGxlV2ViS2l0LmV4ZWModWEpO1xuICAgIHZhciBhcHBsZVdlYktpdFZlcnNpb24gPSAocmVzdWx0QXBwbGVXZWJLaXRSZWdFeCA9PT0gbnVsbCA/IG51bGwgOiBwYXJzZUZsb2F0KHJlZ0V4QXBwbGVXZWJLaXQuZXhlYyh1YSlbMV0pKTtcbiAgICB2YXIgaXNBbmRyb2lkQnJvd3NlciA9IGFwcGxlV2ViS2l0VmVyc2lvbiAhPT0gbnVsbCAmJiBhcHBsZVdlYktpdFZlcnNpb24gPCA1Mzc7XG4gICAgcmV0dXJuIGlzQW5kcm9pZEJyb3dzZXI7XG59XG5cbi8qIGRwciAqL1xuXG5mdW5jdGlvbiBkcHIoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvICE9PSB1bmRlZmluZWQgPyB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA6IDE7XG59XG5cbi8qIGllICovXG5cbmZ1bmN0aW9uIGllOGRvd24oKSB7XG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5pbm5lckhUTUwgPSAnPCEtLVtpZiBsdGUgSUUgOF0+PGk+PC9pPjwhW2VuZGlmXS0tPic7XG4gICAgcmV0dXJuIChkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2knKS5sZW5ndGggPT09IDEpO1xufVxuXG5mdW5jdGlvbiBpZTlkb3duKCkge1xuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gJzwhLS1baWYgSUVdPjxpPjwvaT48IVtlbmRpZl0tLT4nO1xuICAgIHJldHVybiAoZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpJykubGVuZ3RoID09PSAxKTtcbn1cblxuZnVuY3Rpb24gaWVWZXJzaW9uKCkge1xuICAgIHZhciBydiA9IC0xLFxuICAgICAgICByZTtcbiAgICBpZiAobmF2aWdhdG9yLmFwcE5hbWUgPT09ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInKSB7XG4gICAgICAgIHJlID0gbmV3IFJlZ0V4cCgnTVNJRSAoWzAtOV17MSx9Wy4wLTldezAsfSknKTtcbiAgICAgICAgaWYgKHJlLmV4ZWModWEpICE9PSBudWxsKSB7XG4gICAgICAgICAgICBydiA9IHBhcnNlRmxvYXQoIFJlZ0V4cC4kMSApO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IuYXBwTmFtZSA9PT0gJ05ldHNjYXBlJykge1xuICAgICAgICByZSA9IG5ldyBSZWdFeHAoJ1RyaWRlbnQvLipydjooWzAtOV17MSx9Wy4wLTldezAsfSknKTtcbiAgICAgICAgaWYgKHJlLmV4ZWModWEpICE9PSBudWxsKSB7XG4gICAgICAgICAgICBydiA9IHBhcnNlRmxvYXQoIFJlZ0V4cC4kMSApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBydjtcbn1cblxuLyogaW9zICovXG5cbmZ1bmN0aW9uIGlvczUoKSB7XG4gICAgcmV0dXJuICEhKHVhLm1hdGNoKC9PUyA1KF9cXGQpKyBsaWtlIE1hYyBPUyBYL2kpKTtcbn1cblxuZnVuY3Rpb24gaXBhZCgpIHtcbiAgICByZXR1cm4gISF1YS5tYXRjaCgvaVBhZC9pKTtcbn1cblxuZnVuY3Rpb24gaXBob25lKCkge1xuICAgIHJldHVybiAhIXVhLm1hdGNoKC9pUGhvbmUvaSk7XG59XG5cbmZ1bmN0aW9uIGlwb2QoKSB7XG4gICAgcmV0dXJuICEhdWEubWF0Y2goL2lQb2QvaSk7XG59XG5cbmZ1bmN0aW9uIGlvcygpIHtcbiAgICByZXR1cm4gKGlwYWQoKSB8fCBpcG9kKCkgfHwgaXBob25lKCkpO1xufVxuXG4vKiBtb2JpbGUgKi9cblxuZnVuY3Rpb24gbW9iaWxlKCkge1xuICAgIHJldHVybiAhIXVhLm1hdGNoKC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kpO1xufVxuXG4vLyBzY3JlZW4ud2lkdGggLyBzY3JlZW4uaGVpZ2h0IGlzIG9mdGVuIHdyb25nIGluIEFuZHJvaWRcblxuZnVuY3Rpb24gc2NyZWVuSGVpZ2h0KCkge1xuICAgIHJldHVybiBNYXRoLm1heCh3aW5kb3cub3V0ZXJIZWlnaHQsIHdpbmRvdy5zY3JlZW4uaGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gc2NyZWVuV2lkdGgoKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KHdpbmRvdy5vdXRlcldpZHRoLCB3aW5kb3cuc2NyZWVuLndpZHRoKTtcbn1cblxudmFyIERldmljZSA9IHtcbiAgICAnYW5kcm9pZCc6IGFuZHJvaWQoKSxcbiAgICAnYW5kcm9pZE9sZCc6IGFuZHJvaWRPbGQoKSxcbiAgICAnYW5kcm9pZFN0b2NrJzogYW5kcm9pZFN0b2NrKCksXG4gICAgJ2Rwcic6IGRwcigpLFxuICAgICdpZThkb3duJzogaWU4ZG93bigpLFxuICAgICdpZTlkb3duJzogaWU5ZG93bigpLFxuICAgICdpZVZlcnNpb24nOiBpZVZlcnNpb24oKSxcbiAgICAnaW9zJzogaW9zKCksXG4gICAgJ2lvczUnOiBpb3M1KCksXG4gICAgJ2lwYWQnOiBpcGFkKCksXG4gICAgJ2lwaG9uZSc6IGlwaG9uZSgpLFxuICAgICdpcG9kJzogaXBvZCgpLFxuICAgICdtb2JpbGUnOiBtb2JpbGUoKSxcbiAgICAncmV0aW5hJzogKGRwcigpID4gMSksXG4gICAgJ3NjcmVlbkhlaWdodCc6IHNjcmVlbkhlaWdodCgpLFxuICAgICdzY3JlZW5XaWR0aCc6IHNjcmVlbldpZHRoKClcbn07XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gRGV2aWNlO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJy4vRW1pdHRlcicpO1xuXG52YXIgRnVsbHNjcmVlbiA9IChmdW5jdGlvbigpIHtcblxuICAgIHZhciBzZWxmLFxuICAgICAgICBkb2NFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcbiAgICAgICAgaXNTdXBwb3J0ZWQgPSAhIShkb2NFbC5yZXF1ZXN0RnVsbFNjcmVlbiB8fFxuICAgICAgICAgICAgZG9jRWwud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICAgIGRvY0VsLm1velJlcXVlc3RGdWxsU2NyZWVuKTtcblxuICAgIGZ1bmN0aW9uIG9uRnVsbHNjcmVlbkNoYW5nZSgpIHtcbiAgICAgICAgc2VsZi5lbWl0KCdjaGFuZ2UnLCBzZWxmLmlzRnVsbHNjcmVlbigpKTtcbiAgICB9XG5cbiAgICBpZiAoaXNTdXBwb3J0ZWQpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZnVsbHNjcmVlbmNoYW5nZScsIG9uRnVsbHNjcmVlbkNoYW5nZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCBvbkZ1bGxzY3JlZW5DaGFuZ2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJywgb25GdWxsc2NyZWVuQ2hhbmdlKTtcbiAgICAgICAgLy9kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtc2Z1bGxzY3JlZW5jaGFuZ2UnLCBvbkZ1bGxzY3JlZW5DaGFuZ2UpO1xuICAgIH1cblxuICAgIHNlbGYgPSBPYmplY3QuY3JlYXRlKEVtaXR0ZXIucHJvdG90eXBlLCB7XG4gICAgICAgIF9ldmVudHM6IHtcbiAgICAgICAgICAgIHZhbHVlOiB7fVxuICAgICAgICB9LFxuICAgICAgICBpc1N1cHBvcnRlZDoge1xuICAgICAgICAgICAgdmFsdWU6IGlzU3VwcG9ydGVkXG4gICAgICAgIH0sXG4gICAgICAgIGVudGVyOiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgICBlbCA9IGVsIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgICAgICAgICAgICAgIHZhciBtZXRob2QgPSBlbC5yZXF1ZXN0RnVsbFNjcmVlbiB8fFxuICAgICAgICAgICAgICAgICAgICBlbC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbiB8fFxuICAgICAgICAgICAgICAgICAgICBlbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbjtcblxuICAgICAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmNhbGwoZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXhpdDoge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBtZXRob2QgPSBkb2N1bWVudC5leGl0RnVsbHNjcmVlbiB8fFxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5jYW5jZWxGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbjtcblxuICAgICAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmNhbGwoZG9jdW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdG9nZ2xlOiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0Z1bGxzY3JlZW4oKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4aXQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGVyKGVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRnVsbHNjcmVlbjoge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhIShkb2N1bWVudC5mdWxsU2NyZWVuIHx8XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdElzRnVsbFNjcmVlbiB8fFxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5tb3pGdWxsU2NyZWVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNlbGY7XG5cbn0oKSk7XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gRnVsbHNjcmVlbjtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9wb2x5ZmlsbC1jbGFzc2xpc3QnKTtcbnJlcXVpcmUoJy4vcG9seWZpbGwtY29uc29sZScpO1xucmVxdWlyZSgnLi9wb2x5ZmlsbC1yYWYnKTtcblxudmFyIHVzZmwgPSB7fTtcblxudXNmbC5hcnJheSA9IHJlcXVpcmUoJy4vYXJyYXknKTtcbnVzZmwuQXNzZXRMb2FkZXIgPSByZXF1aXJlKCcuL0Fzc2V0TG9hZGVyJyk7XG51c2ZsLkN1ZXBvaW50c1JlYWRlciA9IHJlcXVpcmUoJy4vQ3VlcG9pbnRzUmVhZGVyJyk7XG51c2ZsLmRldmljZSA9IHJlcXVpcmUoJy4vZGV2aWNlJyk7XG51c2ZsLkVtaXR0ZXIgPSByZXF1aXJlKCcuL0VtaXR0ZXInKTtcbnVzZmwuRmFjZWJvb2sgPSByZXF1aXJlKCcuL0ZhY2Vib29rJyk7XG51c2ZsLkZsYXNoID0gcmVxdWlyZSgnLi9GbGFzaCcpO1xudXNmbC5GUFMgPSByZXF1aXJlKCcuL0ZwcycpO1xudXNmbC5mdWxsc2NyZWVuID0gcmVxdWlyZSgnLi9mdWxsc2NyZWVuJyk7XG51c2ZsLkdyYXBoaWNzID0gcmVxdWlyZSgnLi9HcmFwaGljcycpO1xudXNmbC5JbnB1dENvb3JkcyA9IHJlcXVpcmUoJy4vSW5wdXRDb29yZHMnKTtcbnVzZmwua2V5Ym9hcmQgPSByZXF1aXJlKCcuL2tleWJvYXJkJyk7XG51c2ZsLktleUlucHV0ID0gcmVxdWlyZSgnLi9LZXlJbnB1dCcpO1xudXNmbC5MaW5rZWRMaXN0ID0gcmVxdWlyZSgnLi9MaW5rZWRMaXN0Jyk7XG51c2ZsLm1hdGggPSByZXF1aXJlKCcuL21hdGgnKTtcbnVzZmwubW9kZXJuID0gcmVxdWlyZSgnLi9tb2Rlcm4nKTtcbnVzZmwuTW91c2VXaGVlbCA9IHJlcXVpcmUoJy4vTW91c2VXaGVlbCcpO1xudXNmbC5PYmplY3RQb29sID0gcmVxdWlyZSgnLi9PYmplY3RQb29sJyk7XG51c2ZsLnBsYXRmb3JtID0gcmVxdWlyZSgnLi9wbGF0Zm9ybScpO1xudXNmbC5wb3B1cCA9IHJlcXVpcmUoJy4vcG9wdXAnKTtcbnVzZmwucmVhZHkgPSByZXF1aXJlKCcuL3JlYWR5Jyk7XG51c2ZsLnJlc2l6ZSA9IHJlcXVpcmUoJy4vcmVzaXplJyk7XG51c2ZsLnNoYXJlID0gcmVxdWlyZSgnLi9zaGFyZScpO1xudXNmbC5zdG9yYWdlID0gcmVxdWlyZSgnLi9zdG9yYWdlJyk7XG51c2ZsLnN0cmluZyA9IHJlcXVpcmUoJy4vc3RyaW5nJyk7XG51c2ZsLlRvdWNoSW5wdXQgPSByZXF1aXJlKCcuL1RvdWNoSW5wdXQnKTtcbnVzZmwudHJhY2sgPSByZXF1aXJlKCcuL3RyYWNrJyk7XG51c2ZsLnVybFBhcmFtcyA9IHJlcXVpcmUoJy4vdXJsUGFyYW1zJyk7XG51c2ZsLlZpZGVvUGxheWVyID0gcmVxdWlyZSgnLi9WaWRlb1BsYXllcicpO1xudXNmbC5WaWV3cG9ydCA9IHJlcXVpcmUoJy4vdmlld3BvcnQnKTtcbnVzZmwudmlzaWJpbGl0eSA9IHJlcXVpcmUoJy4vdmlzaWJpbGl0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVzZmw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBLZXlib2FyZCA9IHtcbiAgICBBOiAnQScuY2hhckNvZGVBdCgwKSxcbiAgICBCOiAnQicuY2hhckNvZGVBdCgwKSxcbiAgICBDOiAnQycuY2hhckNvZGVBdCgwKSxcbiAgICBEOiAnRCcuY2hhckNvZGVBdCgwKSxcbiAgICBFOiAnRScuY2hhckNvZGVBdCgwKSxcbiAgICBGOiAnRicuY2hhckNvZGVBdCgwKSxcbiAgICBHOiAnRycuY2hhckNvZGVBdCgwKSxcbiAgICBIOiAnSCcuY2hhckNvZGVBdCgwKSxcbiAgICBJOiAnSScuY2hhckNvZGVBdCgwKSxcbiAgICBKOiAnSicuY2hhckNvZGVBdCgwKSxcbiAgICBLOiAnSycuY2hhckNvZGVBdCgwKSxcbiAgICBMOiAnTCcuY2hhckNvZGVBdCgwKSxcbiAgICBNOiAnTScuY2hhckNvZGVBdCgwKSxcbiAgICBOOiAnTicuY2hhckNvZGVBdCgwKSxcbiAgICBPOiAnTycuY2hhckNvZGVBdCgwKSxcbiAgICBQOiAnUCcuY2hhckNvZGVBdCgwKSxcbiAgICBROiAnUScuY2hhckNvZGVBdCgwKSxcbiAgICBSOiAnUicuY2hhckNvZGVBdCgwKSxcbiAgICBTOiAnUycuY2hhckNvZGVBdCgwKSxcbiAgICBUOiAnVCcuY2hhckNvZGVBdCgwKSxcbiAgICBVOiAnVScuY2hhckNvZGVBdCgwKSxcbiAgICBWOiAnVicuY2hhckNvZGVBdCgwKSxcbiAgICBXOiAnVycuY2hhckNvZGVBdCgwKSxcbiAgICBYOiAnWCcuY2hhckNvZGVBdCgwKSxcbiAgICBZOiAnWScuY2hhckNvZGVBdCgwKSxcbiAgICBaOiAnWicuY2hhckNvZGVBdCgwKSxcbiAgICBaRVJPOiAnMCcuY2hhckNvZGVBdCgwKSxcbiAgICBPTkU6ICcxJy5jaGFyQ29kZUF0KDApLFxuICAgIFRXTzogJzInLmNoYXJDb2RlQXQoMCksXG4gICAgVEhSRUU6ICczJy5jaGFyQ29kZUF0KDApLFxuICAgIEZPVVI6ICc0Jy5jaGFyQ29kZUF0KDApLFxuICAgIEZJVkU6ICc1Jy5jaGFyQ29kZUF0KDApLFxuICAgIFNJWDogJzYnLmNoYXJDb2RlQXQoMCksXG4gICAgU0VWRU46ICc3Jy5jaGFyQ29kZUF0KDApLFxuICAgIEVJR0hUOiAnOCcuY2hhckNvZGVBdCgwKSxcbiAgICBOSU5FOiAnOScuY2hhckNvZGVBdCgwKSxcbiAgICBOVU1QQURfMDogOTYsXG4gICAgTlVNUEFEXzE6IDk3LFxuICAgIE5VTVBBRF8yOiA5OCxcbiAgICBOVU1QQURfMzogOTksXG4gICAgTlVNUEFEXzQ6IDEwMCxcbiAgICBOVU1QQURfNTogMTAxLFxuICAgIE5VTVBBRF82OiAxMDIsXG4gICAgTlVNUEFEXzc6IDEwMyxcbiAgICBOVU1QQURfODogMTA0LFxuICAgIE5VTVBBRF85OiAxMDUsXG4gICAgTlVNUEFEX01VTFRJUExZOiAxMDYsXG4gICAgTlVNUEFEX0FERDogMTA3LFxuICAgIE5VTVBBRF9FTlRFUjogMTA4LFxuICAgIE5VTVBBRF9TVUJUUkFDVDogMTA5LFxuICAgIE5VTVBBRF9ERUNJTUFMOiAxMTAsXG4gICAgTlVNUEFEX0RJVklERTogMTExLFxuICAgIEYxOiAxMTIsXG4gICAgRjI6IDExMyxcbiAgICBGMzogMTE0LFxuICAgIEY0OiAxMTUsXG4gICAgRjU6IDExNixcbiAgICBGNjogMTE3LFxuICAgIEY3OiAxMTgsXG4gICAgRjg6IDExOSxcbiAgICBGOTogMTIwLFxuICAgIEYxMDogMTIxLFxuICAgIEYxMTogMTIyLFxuICAgIEYxMjogMTIzLFxuICAgIEYxMzogMTI0LFxuICAgIEYxNDogMTI1LFxuICAgIEYxNTogMTI2LFxuICAgIENPTE9OOiAxODYsXG4gICAgRVFVQUxTOiAxODcsXG4gICAgVU5ERVJTQ09SRTogMTg5LFxuICAgIFFVRVNUSU9OX01BUks6IDE5MSxcbiAgICBUSUxERTogMTkyLFxuICAgIE9QRU5fQlJBQ0tFVDogMjE5LFxuICAgIEJBQ0tXQVJEX1NMQVNIOiAyMjAsXG4gICAgQ0xPU0VEX0JSQUNLRVQ6IDIyMSxcbiAgICBRVU9URVM6IDIyMixcbiAgICBCQUNLU1BBQ0U6IDgsXG4gICAgVEFCOiA5LFxuICAgIENMRUFSOiAxMixcbiAgICBFTlRFUjogMTMsXG4gICAgU0hJRlQ6IDE2LFxuICAgIENPTlRST0w6IDE3LFxuICAgIEFMVDogMTgsXG4gICAgQ0FQU19MT0NLOiAyMCxcbiAgICBFU0M6IDI3LFxuICAgIFNQQUNFQkFSOiAzMixcbiAgICBQQUdFX1VQOiAzMyxcbiAgICBQQUdFX0RPV046IDM0LFxuICAgIEVORDogMzUsXG4gICAgSE9NRTogMzYsXG4gICAgTEVGVDogMzcsXG4gICAgVVA6IDM4LFxuICAgIFJJR0hUOiAzOSxcbiAgICBET1dOOiA0MCxcbiAgICBJTlNFUlQ6IDQ1LFxuICAgIERFTEVURTogNDYsXG4gICAgSEVMUDogNDcsXG4gICAgTlVNX0xPQ0s6IDE0NFxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIERFRyA9IDE4MCAvIE1hdGguUEk7XG52YXIgUkFEID0gTWF0aC5QSSAvIDE4MDtcbnZhciBQSTIgPSBNYXRoLlBJICogMjtcblxudmFyIE1hdGhVdGlscyA9IHtcbiAgICBhbmdsZTogZnVuY3Rpb24oeDEsIHkxLCB4MiwgeTIpIHtcbiAgICAgICAgdmFyIGR4ID0geDIgLSB4MTtcbiAgICAgICAgdmFyIGR5ID0geTIgLSB5MTtcbiAgICAgICAgcmV0dXJuIE1hdGguYXRhbjIoZHksIGR4KTtcbiAgICB9LFxuICAgIGNsYW1wOiBmdW5jdGlvbih2YWx1ZSwgbWluLCBtYXgpIHtcbiAgICAgICAgaWYgKG1pbiA+IG1heCkge1xuICAgICAgICAgICAgdmFyIGEgPSBtaW47XG4gICAgICAgICAgICBtaW4gPSBtYXg7XG4gICAgICAgICAgICBtYXggPSBhO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA8IG1pbikge1xuICAgICAgICAgICAgcmV0dXJuIG1pbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUgPiBtYXgpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgY29pblRvc3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA+IDAuNTtcbiAgICB9LFxuICAgIGNyb3NzUHJvZHVjdDogZnVuY3Rpb24oYVgsIGFZLCBiWCwgYlkpIHtcbiAgICAgICAgLypcbiAgICAgICAgVGhlIHNpZ24gdGVsbHMgdXMgaWYgYSBpcyB0byB0aGUgbGVmdCAoLSkgb3IgdGhlIHJpZ2h0ICgrKSBvZiBiXG4gICAgICAgICovXG4gICAgICAgIHJldHVybiBhWCAqIGJZIC0gYVkgKiBiWDtcbiAgICB9LFxuICAgIGRlZ3JlZXM6IGZ1bmN0aW9uKHJhZGlhbnMpIHtcbiAgICAgICAgcmV0dXJuIHJhZGlhbnMgKiBERUc7XG4gICAgfSxcbiAgICBkaWZmZXJlbmNlOiBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmFicyhhIC0gYik7XG4gICAgfSxcbiAgICBkaXN0YW5jZTogZnVuY3Rpb24oeDEsIHkxLCB4MiwgeTIpIHtcbiAgICAgICAgdmFyIHNxID0gTWF0aFV0aWxzLmRpc3RhbmNlU1EoeDEsIHkxLCB4MiwgeTIpO1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHNxKTtcbiAgICB9LFxuICAgIGRpc3RhbmNlU1E6IGZ1bmN0aW9uKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgICAgIHZhciBkeCA9IHgxIC0geDI7XG4gICAgICAgIHZhciBkeSA9IHkxIC0geTI7XG4gICAgICAgIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICB9LFxuICAgIGRvdFByb2R1Y3Q6IGZ1bmN0aW9uKGFYLCBhWSwgYlgsIGJZKSB7XG4gICAgICAgIC8qXG4gICAgICAgIC0gSWYgQSBhbmQgQiBhcmUgcGVycGVuZGljdWxhciAoYXQgOTAgZGVncmVlcyB0byBlYWNoIG90aGVyKSwgdGhlIHJlc3VsdFxuICAgICAgICAgIG9mIHRoZSBkb3QgcHJvZHVjdCB3aWxsIGJlIHplcm8sIGJlY2F1c2UgY29zKM6YKSB3aWxsIGJlIHplcm8uXG4gICAgICAgIC0gSWYgdGhlIGFuZ2xlIGJldHdlZW4gQSBhbmQgQiBhcmUgbGVzcyB0aGFuIDkwIGRlZ3JlZXMsIHRoZSBkb3QgcHJvZHVjdFxuICAgICAgICAgIHdpbGwgYmUgcG9zaXRpdmUgKGdyZWF0ZXIgdGhhbiB6ZXJvKSwgYXMgY29zKM6YKSB3aWxsIGJlIHBvc2l0aXZlLCBhbmRcbiAgICAgICAgICB0aGUgdmVjdG9yIGxlbmd0aHMgYXJlIGFsd2F5cyBwb3NpdGl2ZSB2YWx1ZXMuXG4gICAgICAgIC0gSWYgdGhlIGFuZ2xlIGJldHdlZW4gQSBhbmQgQiBhcmUgZ3JlYXRlciB0aGFuIDkwIGRlZ3JlZXMsIHRoZSBkb3RcbiAgICAgICAgICBwcm9kdWN0IHdpbGwgYmUgbmVnYXRpdmUgKGxlc3MgdGhhbiB6ZXJvKSwgYXMgY29zKM6YKSB3aWxsIGJlIG5lZ2F0aXZlLFxuICAgICAgICAgIGFuZCB0aGUgdmVjdG9yIGxlbmd0aHMgYXJlIGFsd2F5cyBwb3NpdGl2ZSB2YWx1ZXNcbiAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIGFYICogYlggKyBhWSAqIGJZO1xuICAgIH0sXG4gICAgZ2V0Q2lyY2xlUG9pbnRzOiBmdW5jdGlvbihvcmlnaW5YLCBvcmlnaW5ZLCByYWRpdXMsIGNvdW50LCBzdGFydCwgQ2xhc3MpIHtcbiAgICAgICAgc3RhcnQgPSBzdGFydCA9PT0gdW5kZWZpbmVkID8gLU1hdGguUEkgLyAyIDogc3RhcnQ7XG4gICAgICAgIHZhciBwb2ludHMgPSBbXSxcbiAgICAgICAgICAgIGNpcmMgPSBNYXRoLlBJICogMixcbiAgICAgICAgICAgIGluY3IgPSBjaXJjIC8gY291bnQsXG4gICAgICAgICAgICBvYjtcbiAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgY2lyYyArIHN0YXJ0OyBpICs9IGluY3IpIHtcbiAgICAgICAgICAgIG9iID0gQ2xhc3MgPT09IHVuZGVmaW5lZCA/IHt9IDogbmV3IENsYXNzKCk7XG4gICAgICAgICAgICBvYi54ID0gb3JpZ2luWCArIHJhZGl1cyAqIE1hdGguY29zKGkpO1xuICAgICAgICAgICAgb2IueSA9IG9yaWdpblkgKyByYWRpdXMgKiBNYXRoLnNpbihpKTtcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKG9iKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcG9pbnRzO1xuICAgIH0sXG4gICAgZ2V0SW50ZXJzZWN0aW9uQXJlYTogZnVuY3Rpb24oYVgsIGFZLCBhVywgYUgsIGJYLCBiWSwgYlcsIGJIKSB7XG4gICAgICAgIHZhciBvdmVybGFwWCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGFYICsgYVcsIGJYICsgYlcpIC0gTWF0aC5tYXgoYVgsIGJYKSk7XG4gICAgICAgIHZhciBvdmVybGFwWSA9IE1hdGgubWF4KDAsIE1hdGgubWluKGFZICsgYUgsIGJZICsgYkgpIC0gTWF0aC5tYXgoYVksIGJZKSk7XG4gICAgICAgIHJldHVybiBvdmVybGFwWCAqIG92ZXJsYXBZO1xuICAgIH0sXG4gICAgZ2V0T3ZlcmxhcFg6IGZ1bmN0aW9uKGFYLCBhVywgYlgsIGJXKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihhWCArIGFXLCBiWCArIGJXKSAtIE1hdGgubWF4KGFYLCBiWCkpO1xuICAgIH0sXG4gICAgZ2V0T3ZlcmxhcFk6IGZ1bmN0aW9uKGFZLCBhSCwgYlksIGJIKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihhWSArIGFILCBiWSArIGJIKSAtIE1hdGgubWF4KGFZLCBiWSkpO1xuICAgIH0sXG4gICAgbGVycDogZnVuY3Rpb24oZnJvbSwgdG8sIHBlcmNlbnQpIHtcbiAgICAgICAgcmV0dXJuIGZyb20gKyAodG8gLSBmcm9tKSAqIHBlcmNlbnQ7XG4gICAgfSxcbiAgICBtYXA6IGZ1bmN0aW9uKHYsIGEsIGIsIHgsIHkpIHtcbiAgICAgICAgLy8gdmFsdWUsIG1pbiBleHBlY3RlZCwgbWF4IGV4cGVjdGVkLCBtYXAgbWluLCBtYXAgbWF4XG4gICAgICAgIC8vIGUuZy4gbWFwIHNvbWUgdmFsdWUgYmV0d2VlbiAwIHRvIDEwMCB0byAtNTAgdG8gNTBcbiAgICAgICAgLy8gbWFwKDUwLCAwLCAxMDAsIC01MCwgNTApIC8vIDBcbiAgICAgICAgLy8gbWFwKDI1LCAwLCAxMDAsIC01MCwgNTApIC8vIC0yNVxuICAgICAgICByZXR1cm4gKHYgPT09IGEpID8geCA6ICh2IC0gYSkgKiAoeSAtIHgpIC8gKGIgLSBhKSArIHg7XG4gICAgfSxcbiAgICBwZXJjZW50UmVtYWluaW5nOiBmdW5jdGlvbih2YWx1ZSwgdG90YWwpIHtcbiAgICAgICAgcmV0dXJuICh2YWx1ZSAlIHRvdGFsKSAvIHRvdGFsO1xuICAgIH0sXG4gICAgcmFkaWFuczogZnVuY3Rpb24oZGVncmVlcykge1xuICAgICAgICByZXR1cm4gZGVncmVlcyAqIFJBRDtcbiAgICB9LFxuICAgIHJhbmRvbTogZnVuY3Rpb24obWluLCBtYXgpIHtcbiAgICAgICAgaWYgKGlzTmFOKG1heCkpIHtcbiAgICAgICAgICAgIG1heCA9IG1pbjtcbiAgICAgICAgICAgIG1pbiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pbiArIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKTtcbiAgICB9LFxuICAgIHJvdGF0ZVRvREVHOiBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICAgIHZhciBkaWZmID0gKGVuZCAtIHN0YXJ0KSAlIDM2MDtcbiAgICAgICAgaWYgKGRpZmYgIT09IGRpZmYgJSAxODApIHtcbiAgICAgICAgICAgIGRpZmYgPSAoZGlmZiA8IDApID8gZGlmZiArIDM2MCA6IGRpZmYgLSAzNjA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXJ0ICsgZGlmZjtcbiAgICB9LFxuICAgIHJvdGF0ZVRvUkFEOiBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICAgIHZhciBkaWZmID0gKGVuZCAtIHN0YXJ0KSAlIFBJMjtcbiAgICAgICAgaWYgKGRpZmYgIT09IGRpZmYgJSBNYXRoLlBJKSB7XG4gICAgICAgICAgICBkaWZmID0gZGlmZiA8IDAgPyBkaWZmICsgUEkyIDogZGlmZiAtIFBJMjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhcnQgKyBkaWZmO1xuICAgIH0sXG4gICAgcm91bmRUb05lYXJlc3Q6IGZ1bmN0aW9uKHZhbHVlLCB1bml0KSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlIC8gdW5pdCkgKiB1bml0O1xuICAgIH1cbn07XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gTWF0aFV0aWxzO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbW9kZXJuID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGlvczUgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAhIShuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9PUyA1KF9cXGQpKyBsaWtlIE1hYyBPUyBYL2kpKTtcbiAgICB9KCkpO1xuXG4gICAgdmFyIGFuZHJvaWRPbGQgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgICAgIHJldHVybiAhISh1YS5tYXRjaCgvQW5kcm9pZC9pKSAmJiBwYXJzZUZsb2F0KHVhLnNsaWNlKHVhLmluZGV4T2YoJ0FuZHJvaWQnKSArIDgpKSA8IDQpO1xuICAgIH0oKSk7XG5cbiAgICB2YXIgYW5kcm9pZFN0b2NrID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgICB2YXIgcmVnRXhBcHBsZVdlYktpdCA9IG5ldyBSZWdFeHAoL0FwcGxlV2ViS2l0XFwvKFtcXGQuXSspLyk7XG4gICAgICAgIHZhciByZXN1bHRBcHBsZVdlYktpdFJlZ0V4ID0gcmVnRXhBcHBsZVdlYktpdC5leGVjKHVhKTtcbiAgICAgICAgdmFyIGFwcGxlV2ViS2l0VmVyc2lvbiA9IChyZXN1bHRBcHBsZVdlYktpdFJlZ0V4ID09PSBudWxsID8gbnVsbCA6IHBhcnNlRmxvYXQocmVnRXhBcHBsZVdlYktpdC5leGVjKHVhKVsxXSkpO1xuICAgICAgICB2YXIgaXNBbmRyb2lkQnJvd3NlciA9IHVhLm1hdGNoKC9BbmRyb2lkL2kpICYmIGFwcGxlV2ViS2l0VmVyc2lvbiAhPT0gbnVsbCAmJiBhcHBsZVdlYktpdFZlcnNpb24gPCA1Mzc7XG4gICAgICAgIHJldHVybiBpc0FuZHJvaWRCcm93c2VyO1xuICAgIH0oKSk7XG5cbiAgICB2YXIgaWU5RG93biA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXYuaW5uZXJIVE1MID0gJzwhLS1baWYgSUVdPjxpPjwvaT48IVtlbmRpZl0tLT4nO1xuICAgICAgICByZXR1cm4gKGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaScpLmxlbmd0aCA9PT0gMSk7XG4gICAgfSgpKTtcblxuICAgIHZhciBlczUgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICd4Jywge30pO1xuICAgICAgICAgICAgT2JqZWN0LmNyZWF0ZSh7fSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KCkpO1xuXG4gICAgdmFyIGNhbnZhcyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHJldHVybiAhIShlbC5nZXRDb250ZXh0ICYmIGVsLmdldENvbnRleHQoJzJkJykpO1xuICAgIH0oKSk7XG5cbiAgICB2YXIgc21hbGxWaWV3cG9ydCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KCB3aW5kb3cuc2NyZWVuLndpZHRoLCB3aW5kb3cuc2NyZWVuLmhlaWdodCwgd2luZG93Lm91dGVyV2lkdGgsIHdpbmRvdy5vdXRlckhlaWdodCApIDw9IDQ4MDtcbiAgICB9KCkpO1xuXG4gICAgcmV0dXJuICEhKGNhbnZhcyAmJiBlczUgJiYgIShpb3M1IHx8IGFuZHJvaWRPbGQgfHwgYW5kcm9pZFN0b2NrIHx8IGllOURvd24gfHwgc21hbGxWaWV3cG9ydCkpO1xuXG59KCkpO1xuXG5pZiAod2luZG93Lk1vZGVybml6cikge1xuICAgIHdpbmRvdy5Nb2Rlcm5penIuYWRkVGVzdCgnbW9kZXJuJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBtb2Rlcm47XG4gICAgfSk7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBtb2Rlcm47XG59XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfVxuICAgICAgdGhyb3cgVHlwZUVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LicpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2UgaWYgKGxpc3RlbmVycykge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgaWYgKHRoaXMuX2V2ZW50cykge1xuICAgIHZhciBldmxpc3RlbmVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oZXZsaXN0ZW5lcikpXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmIChldmxpc3RlbmVyKVxuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICB9XG4gIHJldHVybiAwO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cbi8vIG9zXG52YXIgYW5kcm9pZCA9IC9BbmRyb2lkLy50ZXN0KHVhKTtcbnZhciBpb3MgPSAvaVBbYW9dZHxpUGhvbmUvaS50ZXN0KHVhKTtcbnZhciBsaW51eCA9IC9MaW51eC8udGVzdCh1YSk7XG52YXIgb3N4ID0gIWlvcyAmJiAvTWFjIE9TLy50ZXN0KHVhKTtcbnZhciB3aW5kb3dzUGhvbmUgPSAvV2luZG93cyBQaG9uZS9pLnRlc3QodWEpO1xudmFyIHdpbmRvd3MgPSAhd2luZG93c1Bob25lICYmIC9XaW5kb3dzLy50ZXN0KHVhKTtcblxuLy8gZGV2aWNlXG52YXIgaXBhZCA9IC9pUGFkL2kudGVzdCh1YSk7XG52YXIgaXBvZCA9IC9pUG9kL2kudGVzdCh1YSk7XG52YXIgaXBob25lID0gL2lQaG9uZS9pLnRlc3QodWEpO1xudmFyIG1vYmlsZSA9ICEhdWEubWF0Y2goL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbml8V2luZG93cyBQaG9uZXxTeW1iaWFuT1MvaSk7XG52YXIgZGVza3RvcCA9ICFtb2JpbGU7XG5cbi8vIHZlcnNpb25cbnZhciBhbmRyb2lkVmVyc2lvbiA9IChmdW5jdGlvbigpIHtcbiAgICBpZiAoIWFuZHJvaWQpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2VGbG9hdCh1YS5zbGljZSh1YS5pbmRleE9mKCdBbmRyb2lkJykgKyA4KSk7XG59KCkpO1xuXG52YXIgaW9zVmVyc2lvbiA9IChmdW5jdGlvbigpIHtcbiAgICBpZiAoL2lQW2FvXWR8aVBob25lL2kudGVzdCh1YSkpIHtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSB1YS5tYXRjaCgvT1MgKFxcZCspXyhcXGQrKS9pKTtcbiAgICAgICAgaWYgKG1hdGNoZXMgJiYgbWF0Y2hlcy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChtYXRjaGVzWzFdICsgJy4nICsgbWF0Y2hlc1syXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufSgpKTtcblxuLy8gYnJvd3NlclxudmFyIGFuZHJvaWRTdG9ja0Jyb3dzZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1hdGNoZXMgPSB1YS5tYXRjaCgvQW5kcm9pZC4qQXBwbGVXZWJLaXRcXC8oW1xcZC5dKykvKTtcbiAgICByZXR1cm4gISFtYXRjaGVzICYmIG1hdGNoZXNbMV0gPCA1Mzc7XG59KCkpO1xuXG52YXIgaWVWZXJzaW9uID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gLTE7XG4gICAgaWYgKC9NU0lFIChcXGQrXFwuXFxkKyk7Ly50ZXN0KHVhKSkge1xuICAgICAgICB2ID0gcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCk7XG4gICAgfSBlbHNlIGlmICgvVHJpZGVudFxcLyhcXGQrXFwuXFxkKykoLiopcnY6KFxcZCtcXC5cXGQrKS8udGVzdCh1YSkpIHtcbiAgICAgICAgdiA9IHBhcnNlSW50KFJlZ0V4cC4kMywgMTApO1xuICAgIH1cbiAgICByZXR1cm4gdjtcbn0oKSk7XG5cbnZhciBjaHJvbWUgPSAvQ2hyb21lLy50ZXN0KHVhKTtcbnZhciBmaXJlZm94ID0gL0ZpcmVmb3gvLnRlc3QodWEpO1xudmFyIGZpcmVmb3hWZXJzaW9uID0gKGZ1bmN0aW9uKCkge1xuICAgIGlmICghZmlyZWZveCkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIHJldHVybiBwYXJzZUZsb2F0KHVhLnNsaWNlKHVhLmluZGV4T2YoJ0ZpcmVmb3gnKSArIDgpKTtcbn0oKSk7XG52YXIgaWUgPSBpZVZlcnNpb24gPiAtMTtcbnZhciBvcGVyYSA9IC9PcGVyYS8udGVzdCh1YSk7XG52YXIgc2FmYXJpID0gIWFuZHJvaWRTdG9ja0Jyb3dzZXIgJiYgIWNocm9tZSAmJiAvU2FmYXJpLy50ZXN0KHVhKTtcbnZhciBzYWZhcmlNb2JpbGUgPSBpb3MgJiYgL0FwcGxlV2ViS2l0Ly50ZXN0KHVhKTtcbnZhciBjaHJvbWVpT1MgPSBpb3MgJiYgL0NyaU9TLy50ZXN0KHVhKTtcblxuLy8gbG9jYWxcbnZhciBsb2NhbCA9IC9eKD86aHR0cHM/OlxcL1xcLyk/KD86bG9jYWxob3N0fDE5MlxcLjE2OCkvLnRlc3Qod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4vLyBleHBvcnRcblxudmFyIHBsYXRmb3JtID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgYnJvd3Nlcjoge1xuICAgICAgICBhbmRyb2lkU3RvY2tCcm93c2VyOiBhbmRyb2lkU3RvY2tCcm93c2VyLFxuICAgICAgICBjaHJvbWU6IGNocm9tZSxcbiAgICAgICAgY2hyb21laU9TOiBjaHJvbWVpT1MsXG4gICAgICAgIGZpcmVmb3g6IGZpcmVmb3gsXG4gICAgICAgIGZpcmVmb3hWZXJzaW9uOiBmaXJlZm94VmVyc2lvbixcbiAgICAgICAgaWU6IGllLFxuICAgICAgICBpZVZlcnNpb246IGllVmVyc2lvbixcbiAgICAgICAgb3BlcmE6IG9wZXJhLFxuICAgICAgICBzYWZhcmk6IHNhZmFyaSxcbiAgICAgICAgc2FmYXJpTW9iaWxlOiBzYWZhcmlNb2JpbGVcbiAgICB9LFxuICAgIGRldmljZToge1xuICAgICAgICBkZXNrdG9wOiBkZXNrdG9wLFxuICAgICAgICBpcGFkOiBpcGFkLFxuICAgICAgICBpcGhvbmU6IGlwaG9uZSxcbiAgICAgICAgaXBvZDogaXBvZCxcbiAgICAgICAgbW9iaWxlOiBtb2JpbGVcbiAgICB9LFxuICAgIG9zOiB7XG4gICAgICAgIGFuZHJvaWQ6IGFuZHJvaWQsXG4gICAgICAgIGlvczogaW9zLFxuICAgICAgICBsaW51eDogbGludXgsXG4gICAgICAgIG9zeDogb3N4LFxuICAgICAgICB3aW5kb3dzOiB3aW5kb3dzLFxuICAgICAgICB3aW5kb3dzUGhvbmU6IHdpbmRvd3NQaG9uZSxcbiAgICAgICAgYW5kcm9pZFZlcnNpb246IGFuZHJvaWRWZXJzaW9uLFxuICAgICAgICBpb3NWZXJzaW9uOiBpb3NWZXJzaW9uXG4gICAgfSxcbiAgICBsb2NhbDogbG9jYWxcbn0pO1xuXG4vLyBjb25zb2xlLmxvZygnLS0+JywgdWEpO1xuLy8gY29uc29sZS5sb2coJy0tPicsIHBsYXRmb3JtKTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBwbGF0Zm9ybTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLypcbiAqIGNsYXNzTGlzdCAoaWUxMCBhbmQgaWUxMSBwYXJ0aWFsIHBvbHlmaWxsKVxuICogYWRhcHRlZCBmcm9tOiBodHRwczovL2dpdGh1Yi5jb20vZWxpZ3JleS9jbGFzc0xpc3QuanMvYmxvYi9tYXN0ZXIvY2xhc3NMaXN0LmpzXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHRlc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnXycpO1xuXG4gICAgdGVzdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYzEnLCAnYzInKTtcblxuICAgIC8vIFBvbHlmaWxsIGZvciBJRSAxMC8xMSBhbmQgRmlyZWZveCA8MjYsIHdoZXJlIGNsYXNzTGlzdC5hZGQgYW5kXG4gICAgLy8gY2xhc3NMaXN0LnJlbW92ZSBleGlzdCBidXQgc3VwcG9ydCBvbmx5IG9uZSBhcmd1bWVudCBhdCBhIHRpbWUuXG4gICAgaWYgKCF0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2MyJykpIHtcbiAgICAgICAgdmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgICAgdmFyIG9yaWdpbmFsID0gd2luZG93LkRPTVRva2VuTGlzdC5wcm90b3R5cGVbbWV0aG9kXTtcblxuICAgICAgICAgICAgd2luZG93LkRPTVRva2VuTGlzdC5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsLmNhbGwodGhpcywgdG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIGNyZWF0ZU1ldGhvZCgnYWRkJyk7XG4gICAgICAgIGNyZWF0ZU1ldGhvZCgncmVtb3ZlJyk7XG4gICAgfVxuXG4gICAgdGVzdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnYzMnLCBmYWxzZSk7XG5cbiAgICAvLyBQb2x5ZmlsbCBmb3IgSUUgMTAgYW5kIEZpcmVmb3ggPDI0LCB3aGVyZSBjbGFzc0xpc3QudG9nZ2xlIGRvZXMgbm90XG4gICAgLy8gc3VwcG9ydCB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuICAgIGlmICh0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2MzJykpIHtcbiAgICAgICAgdmFyIF90b2dnbGUgPSB3aW5kb3cuRE9NVG9rZW5MaXN0LnByb3RvdHlwZS50b2dnbGU7XG5cbiAgICAgICAgd2luZG93LkRPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24odG9rZW4sIGZvcmNlKSB7XG4gICAgICAgICAgICBmb3JjZSA9ICEhZm9yY2U7XG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgdGhpcy5jb250YWlucyh0b2tlbikgPT09IGZvcmNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcmNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RvZ2dsZS5jYWxsKHRoaXMsIHRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB0ZXN0RWxlbWVudCA9IG51bGw7XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24oZm4pIHtcbiAgICB3aW5kb3cuY29uc29sZSA9IHdpbmRvdy5jb25zb2xlIHx8IHt9O1xuICAgIHZhciBtZXRob2RzID0gW1xuICAgICAgICAnYXNzZXJ0JyxcbiAgICAgICAgJ2NsZWFyJyxcbiAgICAgICAgJ2NvdW50JyxcbiAgICAgICAgJ2RlYnVnJyxcbiAgICAgICAgJ2RpcicsXG4gICAgICAgICdkaXJ4bWwnLFxuICAgICAgICAnZXJyb3InLFxuICAgICAgICAnZ3JvdXAnLFxuICAgICAgICAnZ3JvdXBDb2xsYXBzZWQnLFxuICAgICAgICAnZ3JvdXBFbmQnLFxuICAgICAgICAnaW5mbycsXG4gICAgICAgICdsb2cnLFxuICAgICAgICAnbWFya1RpbWVsaW5lJyxcbiAgICAgICAgJ21lbW9yeScsXG4gICAgICAgICdwcm9maWxlJyxcbiAgICAgICAgJ3Byb2ZpbGVFbmQnLFxuICAgICAgICAndGFibGUnLFxuICAgICAgICAndGltZScsXG4gICAgICAgICd0aW1lRW5kJyxcbiAgICAgICAgJ3RpbWVTdGFtcCcsXG4gICAgICAgICd0aW1lbGluZScsXG4gICAgICAgICd0aW1lbGluZUVuZCcsXG4gICAgICAgICd0cmFjZScsXG4gICAgICAgICd3YXJuJ1xuICAgIF07XG4gICAgdmFyIG1ldGhvZE5hbWU7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXRob2RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG1ldGhvZE5hbWUgPSBtZXRob2RzW2ldO1xuICAgICAgICB3aW5kb3cuY29uc29sZVttZXRob2ROYW1lXSA9IHdpbmRvdy5jb25zb2xlW21ldGhvZE5hbWVdIHx8IGZuO1xuICAgIH1cbn0oZnVuY3Rpb24oKSB7fSkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgLy8gaW9zNiwgaWUxMCwgYW5kcm9pZCA8IDQuNFxuICAgIHZhciB2ZW5kb3JzID0gWydtcycsICdtb3onLCAnd2Via2l0JywgJ28nXTtcbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyArK3gpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSArICdDYW5jZWxBbmltYXRpb25GcmFtZSddIHx8XG4gICAgICAgIHdpbmRvd1t2ZW5kb3JzW3hdICsgJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgIH1cbiAgICAvLyBpZSA8IDEwXG4gICAgaWYgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgICAgIHZhciBsYXN0VGltZSA9IDA7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICB2YXIgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKTtcbiAgICAgICAgICAgIHZhciBpZCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7XG4gICAgICAgICAgICB9LCB0aW1lVG9DYWxsKTtcbiAgICAgICAgICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9O1xuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgICAgICAgfTtcbiAgICB9XG59KCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcG9wdXAgPSBmdW5jdGlvbiAodXJsLCBuYW1lLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdmFyIGxlZnQgPSAoc2NyZWVuLndpZHRoIC0gd2lkdGgpIC8gMjtcbiAgICB2YXIgdG9wID0gKHNjcmVlbi5oZWlnaHQgLSBoZWlnaHQpIC8gMjtcbiAgICB2YXIgcGFyYW1zID0gJ3dpZHRoPScgKyB3aWR0aCArICcsIGhlaWdodD0nICsgaGVpZ2h0ICtcbiAgICAnLCB0b3A9JyArIHRvcCArICcsIGxlZnQ9JyArIGxlZnQgK1xuICAgICcsIGRpcmVjdG9yaWVzPW5vJyArXG4gICAgJywgbG9jYXRpb249bm8nICtcbiAgICAnLCBtZW51YmFyPW5vJyArXG4gICAgJywgcmVzaXphYmxlPW5vJyArXG4gICAgJywgc2Nyb2xsYmFycz1ubycgK1xuICAgICcsIHN0YXR1cz1ubycgK1xuICAgICcsIHRvb2xiYXI9bm8nO1xuICAgIHZhciBuZXd3aW4gPSB3aW5kb3cub3Blbih1cmwsIG5hbWUsIHBhcmFtcyk7XG4gICAgaWYgKG5ld3dpbiA9PT0gbnVsbCB8fCB0eXBlb2YgbmV3d2luID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh3aW5kb3cuZm9jdXMpIHtcbiAgICAgICAgbmV3d2luLmZvY3VzKCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBwb3B1cDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlYWR5O1xuaWYgKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICByZWFkeSA9IGZ1bmN0aW9uKGZuLCBjb250ZXh0KSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnIHx8IGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZScpIHtcbiAgICAgICAgICAgIGZuLmNhbGwoY29udGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZm4uY2FsbChjb250ZXh0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn0gZWxzZSB7XG4gICAgcmVhZHkgPSBmdW5jdGlvbihmbiwgY29udGV4dCkge1xuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2ludGVyYWN0aXZlJykge1xuICAgICAgICAgICAgZm4uY2FsbChjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5hdHRhY2hFdmVudCgnb25yZWFkeXN0YXRlY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2ludGVyYWN0aXZlJykge1xuICAgICAgICAgICAgICAgIGZuLmNhbGwoY29udGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gcmVhZHk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciByZXNpemUgPSBmdW5jdGlvbiAocmVjdCwgYXJlYVdpZHRoLCBhcmVhSGVpZ2h0LCBhdXRvQ2VudGVyLCBtZXRob2QpIHtcbiAgICB2YXIgd2lkdGggPSByZWN0LndpZHRoLFxuICAgICAgICBoZWlnaHQgPSByZWN0LmhlaWdodCxcbiAgICAgICAgc2NhbGU7XG5cbiAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgICBjYXNlICdmaWxsJzpcbiAgICAgICAgICAgIHNjYWxlID0gTWF0aC5tYXgoYXJlYVdpZHRoIC8gd2lkdGgsIGFyZWFIZWlnaHQgLyBoZWlnaHQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ZpdCc6XG4gICAgICAgICAgICBzY2FsZSA9IE1hdGgubWluKGFyZWFXaWR0aCAvIHdpZHRoLCBhcmVhSGVpZ2h0IC8gaGVpZ2h0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmaXRXaWR0aCc6XG4gICAgICAgICAgICBzY2FsZSA9IGFyZWFXaWR0aCAvIHdpZHRoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ZpdEhlaWdodCc6XG4gICAgICAgICAgICBzY2FsZSA9IGFyZWFIZWlnaHQgLyBoZWlnaHQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHNjYWxlID0gTWF0aC5tYXgoYXJlYVdpZHRoIC8gd2lkdGgsIGFyZWFIZWlnaHQgLyBoZWlnaHQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmVjdC53aWR0aCA9IE1hdGguY2VpbCh3aWR0aCAqIHNjYWxlKTtcbiAgICByZWN0LmhlaWdodCA9IE1hdGguY2VpbChoZWlnaHQgKiBzY2FsZSk7XG5cbiAgICBpZiAoYXV0b0NlbnRlcikge1xuICAgICAgICByZWN0LnggPSBNYXRoLnJvdW5kKChhcmVhV2lkdGggLSByZWN0LndpZHRoKSAqIDAuNSk7XG4gICAgICAgIHJlY3QueSA9IE1hdGgucm91bmQoKGFyZWFIZWlnaHQgLSByZWN0LmhlaWdodCkgKiAwLjUpO1xuICAgIH1cbn07XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gcmVzaXplO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcG9wdXAgPSByZXF1aXJlKCcuL3BvcHVwJyk7XG5cbi8vIHdhcm5CYWRVUkwgLSBoZWxwZXIgdG8gd2FybiBvbiByZWxhdGl2ZSBVUkxzIHN1cHBsaWVkIGZvciBpbWFnZXMgZXRjXG5mdW5jdGlvbiB3YXJuQmFkVVJMKHVybCkge1xuICAgIGlmICh1cmwuc3Vic3RyKDAsIDQpICE9PSAnaHR0cCcpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdVUkw6ICcgKyB1cmwgKyAnIHNob3VsZCBzdGFydCB3aXRoIGh0dHAnKTtcbiAgICB9XG59XG5cbnZhciBTaGFyZSA9IHtcbiAgICAvLyBTdGFuZGFyZCBGQiBzaGFyZSAodXNlcyBvZyB0YWdzKVxuICAgIGZhY2Vib29rOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NoYXJlLmZhY2Vib29rJywgdXJsKTtcbiAgICAgICAgcmV0dXJuIHBvcHVwKCdodHRwOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZS5waHA/dT0nICtcbiAgICAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudCh1cmwpLCAnc2hhcmVGYWNlYm9vaycsIDcyMCwgNDgwKTtcbiAgICB9LFxuICAgIHR3aXR0ZXI6IGZ1bmN0aW9uKHVybCwgdGV4dCwgaGFzaHRhZ3MsIHJlbGF0ZWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NoYXJlLnR3aXR0ZXInLCB1cmwsIHRleHQsIGhhc2h0YWdzLCByZWxhdGVkKTtcbiAgICAgICAgcmV0dXJuIHBvcHVwKCdodHRwczovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldD91cmw9JyArIGVuY29kZVVSSUNvbXBvbmVudCh1cmwpICtcbiAgICAgICAgICAgICcmdGV4dD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpICtcbiAgICAgICAgICAgICcmaGFzaHRhZ3M9JyArIGVuY29kZVVSSUNvbXBvbmVudChoYXNodGFncykgK1xuICAgICAgICAgICAgJyZyZWxhdGVkPScgKyBlbmNvZGVVUklDb21wb25lbnQocmVsYXRlZCksICdzaGFyZVR3aXR0ZXInLCA1NTAsIDM4MCk7XG4gICAgfSxcbiAgICBnb29nbGVQbHVzOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NoYXJlLmdvb2dsZVBsdXMnLCB1cmwpO1xuICAgICAgICByZXR1cm4gcG9wdXAoJ2h0dHBzOi8vcGx1cy5nb29nbGUuY29tL3NoYXJlP3VybD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVybCksICdzaGFyZUdvb2dsZVBsdXMnLCA1NTAsIDM4MCk7XG4gICAgfSxcbiAgICBwaW50ZXJlc3Q6IGZ1bmN0aW9uKHVybCwgcGljdHVyZSwgdGV4dCkge1xuICAgICAgICB3YXJuQmFkVVJMKHBpY3R1cmUpO1xuICAgICAgICBjb25zb2xlLmxvZygnc2hhcmUucGludGVyZXN0JywgdXJsLCBwaWN0dXJlLCB0ZXh0KTtcbiAgICAgICAgcmV0dXJuIHBvcHVwKCdodHRwOi8vcGludGVyZXN0LmNvbS9waW4vY3JlYXRlL2J1dHRvbi8/dXJsPScgKyBlbmNvZGVVUklDb21wb25lbnQodXJsKSArXG4gICAgICAgICAgICAnJm1lZGlhPScgKyBlbmNvZGVVUklDb21wb25lbnQocGljdHVyZSkgK1xuICAgICAgICAgICAgJyZkZXNjcmlwdGlvbj0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHRleHQpLCAnc2hhcmVQaW50ZXJlc3QnLCA2MzAsIDI4MCk7XG4gICAgfSxcbiAgICB2a29udGFrdGU6IGZ1bmN0aW9uKHVybCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBpbWFnZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnc2hhcmUudmtvbnRha3RlJywgdXJsLCB0aXRsZSwgZGVzY3JpcHRpb24sIGltYWdlKTtcbiAgICAgICAgcmV0dXJuIHBvcHVwKCdodHRwOi8vdmtvbnRha3RlLnJ1L3NoYXJlLnBocD91cmw9JyArIGVuY29kZVVSSUNvbXBvbmVudCh1cmwpICtcbiAgICAgICAgICAgICcmdGl0bGU9JyArIHRpdGxlICsgJyZkZXNjcmlwdGlvbj0nICsgZGVzY3JpcHRpb24gK1xuICAgICAgICAgICAgJyZpbWFnZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGltYWdlKSwgJ3NoYXJlVksnLCA1NTAsIDM4MCk7XG4gICAgfSxcbiAgICByZW5yZW46IGZ1bmN0aW9uKHVybCwgdGl0bGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NoYXJlLnJlbnJlbicsIHVybCwgdGl0bGUpO1xuICAgICAgICByZXR1cm4gcG9wdXAoJ2h0dHA6Ly9zaGFyZS5yZW5yZW4uY29tL3NoYXJlL2J1dHRvbnNoYXJlLmRvP2xpbms9JyArIGVuY29kZVVSSUNvbXBvbmVudCh1cmwpICtcbiAgICAgICAgICAgICcmdGl0bGU9JyArIHRpdGxlLCAnc2hhcmVSZW5SZW4nLCA5MDAsIDQ4MCk7XG4gICAgfSxcbiAgICB3ZWlibzogZnVuY3Rpb24odXJsLCB0aXRsZSwgaW1hZ2UpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NoYXJlLndlaWJvJywgdXJsLCB0aXRsZSwgaW1hZ2UpO1xuICAgICAgICByZXR1cm4gcG9wdXAoJ2h0dHA6Ly9zZXJ2aWNlLndlaWJvLmNvbS9zaGFyZS9zaGFyZS5waHA/dXJsPScgKyBlbmNvZGVVUklDb21wb25lbnQodXJsKSArXG4gICAgICAgICAgICAnJmFwcGtleT0mdGl0bGU9JyArIHRpdGxlICsgJyZwaWM9JyArIGVuY29kZVVSSUNvbXBvbmVudChpbWFnZSkgK1xuICAgICAgICAgICAgJyZyYWxhdGVVaWQ9Jmxhbmd1YWdlPXpoX2NuJywgJ3NoYXJlV2VpYm8nLCA2NDAsIDQ4MCk7XG4gICAgfSxcbiAgICAvLyBGQiBmZWVkIGRpYWxvZyBzaGFyZSBmb3Igc2hhcmluZyB3aXRoIGN1c3RvbWlzZWQgdGV4dCBhbmQgaW1hZ2VzXG4gICAgLy8gU2VlIGh0dHA6Ly9kZXZlbG9wZXJzLmZhY2Vib29rLmNvbS9kb2NzL3JlZmVyZW5jZS9kaWFsb2dzL2ZlZWQvXG4gICAgZmFjZWJvb2tGZWVkRGlhbG9nOiBmdW5jdGlvbihhcHBJZCwgdGl0bGUsIGxpbmssIHBpY3R1cmUsIHNvdXJjZSwgY2FwdGlvbiwgZGVzY3JpcHRpb24sIHJlZGlyZWN0VVJMKSB7XG4gICAgICAgIHdhcm5CYWRVUkwocGljdHVyZSk7XG4gICAgICAgIHdhcm5CYWRVUkwocmVkaXJlY3RVUkwpO1xuICAgICAgICBjb25zb2xlLmxvZygnc2hhcmUuZmFjZWJvb2tWaWFBcHAnLCBhcHBJZCwgdGl0bGUsIGxpbmssIHBpY3R1cmUsIHNvdXJjZSwgY2FwdGlvbiwgZGVzY3JpcHRpb24sIHJlZGlyZWN0VVJMKTtcblxuICAgICAgICB2YXIgdXJsID0gJ2h0dHA6Ly93d3cuZmFjZWJvb2suY29tL2RpYWxvZy9mZWVkP2FwcF9pZD0nICsgYXBwSWQgK1xuICAgICAgICAnJnBpY3R1cmU9JyArIHBpY3R1cmUgK1xuICAgICAgICAoIHNvdXJjZSAmJiBzb3VyY2UgIT09ICcnID8gJyZzb3VyY2U9JyArIHNvdXJjZSA6ICcnICkgK1xuICAgICAgICAnJm5hbWU9JyArIGVuY29kZVVSSUNvbXBvbmVudCh0aXRsZSkgK1xuICAgICAgICAnJmxpbms9JyArIGxpbmsgK1xuICAgICAgICAnJmNhcHRpb249JyArIGVuY29kZVVSSUNvbXBvbmVudChjYXB0aW9uKSArXG4gICAgICAgICcmZGVzY3JpcHRpb249JyArIGVuY29kZVVSSUNvbXBvbmVudChkZXNjcmlwdGlvbikgK1xuICAgICAgICAnJmRpc3BsYXk9cG9wdXAnICtcbiAgICAgICAgJyZzaG93X2Vycm9yPXRydWUnICtcbiAgICAgICAgJyZyZWRpcmVjdF91cmk9JyArIHJlZGlyZWN0VVJMO1xuXG4gICAgICAgIHJldHVybiBwb3B1cCh1cmwsICdzaGFyZUZhY2Vib29rJywgNTUwLCAzODApO1xuICAgIH1cbn07XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gU2hhcmU7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBTdG9yYWdlVXRpbHMgPSB7XG4gICAgc2F2ZUpTT046IGZ1bmN0aW9uKGtleSwgb2JqZWN0KSB7XG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkob2JqZWN0KSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBsb2FkSlNPTjogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UgJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICAvLyBjb252ZXJ0IGltYWdlIHRvIGxvY2Fsc3RvcmFnZSBmcmllbmRseSBkYXRhIFVSTCBzdHJpbmdcbiAgICBnZXRJbWFnZURhdGFVUkw6IGZ1bmN0aW9uKGltZywgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICBpZiAoIXRoaXMuY2FudmFzKSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoIHx8IGltZy53aWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IGltZy5oZWlnaHQ7XG4gICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcbiAgICAgICAgdmFyIGRhdGFVUkwgPSB0aGlzLmNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpO1xuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICByZXR1cm4gZGF0YVVSTDtcbiAgICB9XG59O1xuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IFN0b3JhZ2VVdGlscztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLypcbiAqIEhlbHBlclxuICovXG5cbi8vIHJlZ2V4IGVzY2FwZSBwYXR0ZXJuXG5mdW5jdGlvbiBlc2NhcGVQYXR0ZXJuKHBhdHRlcm4pIHtcbiAgICByZXR1cm4gcGF0dGVybi5yZXBsYWNlKC8oXFxdfFxcW3xcXHt8XFx9fFxcKHxcXCl8XFwqfFxcK3xcXD98XFwufFxcXFwpL2csICdcXFxcJDEnKTtcbn1cblxuLypcbiAqIEZvcm1hdFxuICovXG5cbi8vIHJlbW92ZSB3aGl0ZXNwYWNlIGZyb20gdGhlIGZyb250IGFuZCBlbmQgb2Ygc3RyXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xufVxuXG4vLyByZW1vdmUgd2hpdGVzcGFjZSBmcm9tIHRoZSBmcm9udCBvZiBzdHJcbmZ1bmN0aW9uIHRyaW1MZWZ0KHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvXlxccysvLCAnJyk7XG59XG5cbi8vIHJlbW92ZSB3aGl0ZXNwYWNlIGZyb20gdGhlIGVuZCBvZiBzdHJcbmZ1bmN0aW9uIHRyaW1SaWdodChzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xccyskLywgJycpO1xufVxuXG4vLyBwYWQgc3RyIHdpdGggc3Vic3RyIGZyb20gdGhlIGxlZnRcbmZ1bmN0aW9uIHBhZExlZnQoc3RyLCBzdWJzdHIsIGxlbmd0aCkge1xuICAgIHdoaWxlIChzdHIubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICAgIHN0ciA9IHN1YnN0ciArIHN0cjtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cblxuLy8gcGFkcyBzdHIgd2l0aCBzdWJzdHIgZnJvbSB0aGUgcmlnaHRcbmZ1bmN0aW9uIHBhZFJpZ2h0KHN0ciwgc3Vic3RyLCBsZW5ndGgpIHtcbiAgICB3aGlsZSAoc3RyLmxlbmd0aCA8IGxlbmd0aCkge1xuICAgICAgICBzdHIgKz0gc3Vic3RyO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuXG4vLyByZW1vdmUgZXh0cmEgd2hpdGVzcGFjZSAoZXh0cmEgc3BhY2VzLCB0YWJzLCBsaW5lIGJyZWFrcywgZXRjKVxuZnVuY3Rpb24gcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlKHN0cikge1xuICAgIHZhciBzdWJzdHIgPSB0cmltKHN0cik7XG4gICAgcmV0dXJuIHN1YnN0ci5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG59XG5cbi8vIHJlbW92ZSBhbGwgaW5zdGFuY2VzIG9mIHN1YnN0ciBpbiBzdHJcbmZ1bmN0aW9uIHJlbW92ZShzdHIsIHN1YnN0ciwgY2FzZVNlbnNpdGl2ZSkge1xuICAgIHZhciBlc2NhcGVkU3RyID0gZXNjYXBlUGF0dGVybihzdWJzdHIpO1xuICAgIHZhciBmbGFncyA9IGNhc2VTZW5zaXRpdmUgPyAnZycgOiAnaWcnO1xuICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKGVzY2FwZWRTdHIsIGZsYWdzKSwgJycpO1xufVxuXG4vLyB0cnVuY2F0ZSB0byBsZW5ndGggd2l0aCBzdWZmaXhcbmZ1bmN0aW9uIHRydW5jYXRlKHN0ciwgbGVuLCBzdWZmaXgpIHtcbiAgICBpZiAoc3VmZml4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3VmZml4ID0gJy4uLic7XG4gICAgfVxuICAgIGxlbiAtPSBzdWZmaXgubGVuZ3RoO1xuICAgIHZhciB0cnVuYyA9IHN0cjtcbiAgICBpZiAodHJ1bmMubGVuZ3RoID4gbGVuKSB7XG4gICAgICAgIHRydW5jID0gdHJ1bmMuc3Vic3RyKDAsIGxlbik7XG4gICAgICAgIHZhciByID0gL1teXFxzXS87XG4gICAgICAgIGlmIChyLnRlc3Qoc3RyLmNoYXJBdChsZW4pKSkge1xuICAgICAgICAgICAgdHJ1bmMgPSB0cmltUmlnaHQodHJ1bmMucmVwbGFjZSgvXFx3KyR8XFxzKyQvLCAnJykpO1xuICAgICAgICB9XG4gICAgICAgIHRydW5jICs9IHN1ZmZpeDtcbiAgICB9XG4gICAgcmV0dXJuIHRydW5jO1xufVxuXG4vLyBDYXBpdGFsaXplIHRoZSBmaXJzdCB3b3JkIGluIGEgc3RyaW5nIG9yIGFsbCB3b3Jkc1xuZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHIsIGFsbCkge1xuICAgIHZhciBzdWJzdHIgPSB0cmltTGVmdChzdHIpO1xuICAgIGlmIChhbGwpIHtcbiAgICAgICAgcmV0dXJuIHN1YnN0ci5yZXBsYWNlKC9eLnxcXGIuL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2gudG9VcHBlckNhc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHN1YnN0ci5yZXBsYWNlKC8oXlxcdykvLCBmdW5jdGlvbihtYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLy8gcHJvcGVyIGNhc2Ugc3RyIGluIHNlbnRlbmNlIGZvcm1hdFxuZnVuY3Rpb24gcHJvcGVyQ2FzZShzdHIpIHtcbiAgICB2YXIgbmV3U3RyID0gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxiKFteLj87IV0rKS8sIGNhcGl0YWxpemUpO1xuICAgIHJldHVybiBuZXdTdHIucmVwbGFjZSgvXFxiW2ldXFxiLywgJ0knKTtcbn1cblxuLy8gcmV2ZXJzZSBjaGFyYWN0ZXIgb3JkZXJcbmZ1bmN0aW9uIHJldmVyc2Uoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpO1xufVxuXG4vLyByZXZlcnNlIHdvcmQgb3JkZXJcbmZ1bmN0aW9uIHJldmVyc2VXb3JkcyhzdHIpIHtcbiAgICByZXR1cm4gc3RyLnNwbGl0KCcgJykucmV2ZXJzZSgpLmpvaW4oJyAnKTtcbn1cblxuLy8gcmVtb3ZlIGFsbCBIVE1MIHRhZ3MgZnJvbSBzdHJcbmZ1bmN0aW9uIHN0cmlwVGFncyhzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLzxcXC8/W14+XSs+L2lnbSwgJycpO1xufVxuXG4vLyBzd2FwcyB0aGUgY2FzZSBvZiBzdHJcbmZ1bmN0aW9uIHN3YXBDYXNlKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvKFxcdykvLCBmdW5jdGlvbihuZXdTdHIpIHtcbiAgICAgICAgdmFyIGxvd2VyID0gbmV3U3RyLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciB1cHBlciA9IG5ld1N0ci50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBzd2l0Y2ggKG5ld1N0cikge1xuICAgICAgICAgICAgY2FzZSBsb3dlcjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdXBwZXI7XG4gICAgICAgICAgICBjYXNlIHVwcGVyOlxuICAgICAgICAgICAgICAgIHJldHVybiBsb3dlcjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1N0cjtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vLyBmb3JtYXRzIHNlY29uZHMgaW50byBISDpNTTpTU1xuZnVuY3Rpb24gdGltZUNvZGUoc2Vjb25kcywgZGVsaW0pIHtcbiAgICBpZiAoZGVsaW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkZWxpbSA9ICc6JztcbiAgICB9XG4gICAgdmFyIGggPSBNYXRoLmZsb29yKHNlY29uZHMgLyAzNjAwKTtcbiAgICB2YXIgbSA9IE1hdGguZmxvb3IoKHNlY29uZHMgJSAzNjAwKSAvIDYwKTtcbiAgICB2YXIgcyA9IE1hdGguZmxvb3IoKHNlY29uZHMgJSAzNjAwKSAlIDYwKTtcbiAgICB2YXIgaHIgPSAoaCA8IDEwID8gJzAnICsgaCA6IGgpICsgZGVsaW07XG4gICAgdmFyIG1uID0gKG0gPCAxMCA/ICcwJyArIG0gOiBtKSArIGRlbGltO1xuICAgIHZhciBzYyA9IChzIDwgMTAgPyAnMCcgKyBzIDogcyk7XG4gICAgcmV0dXJuIGhyICsgbW4gKyBzYztcbn1cblxuLypcbiAqIFF1ZXJ5XG4gKi9cblxuLy8gd2hldGhlciBzdHIgYmVnaW5zIHdpdGggc3Vic3RyXG5mdW5jdGlvbiBiZWdpbnNXaXRoKHN0ciwgc3Vic3RyKSB7XG4gICAgcmV0dXJuIHN0ci5pbmRleE9mKHN1YnN0cikgPT09IDA7XG59XG5cbi8vIHdoZXRoZXIgc3RyIGNvbnRhaW5zIGFueSBpbnN0YW5jZXMgb2Ygc3Vic3RyXG5mdW5jdGlvbiBjb250YWlucyhzdHIsIHN1YnN0cikge1xuICAgIHJldHVybiBzdHIuaW5kZXhPZihzdWJzdHIpICE9PSAtMTtcbn1cblxuLy8gdGhlIG51bWJlciBvZiB0aW1lcyBzdWJzdHIgYXBwZWFycyB3aXRoaW4gc3RyXG5mdW5jdGlvbiBjb3VudE9mKHN0ciwgc3Vic3RyLCBjYXNlU2Vuc2l0aXZlKSB7XG4gICAgdmFyIGVzY2FwZWRTdHIgPSBlc2NhcGVQYXR0ZXJuKHN1YnN0cik7XG4gICAgdmFyIGZsYWdzID0gKCFjYXNlU2Vuc2l0aXZlKSA/ICdpZycgOiAnZyc7XG4gICAgcmV0dXJuIHN0ci5tYXRjaChuZXcgUmVnRXhwKGVzY2FwZWRTdHIsIGZsYWdzKSkubGVuZ3RoO1xufVxuXG4vLyB3aGV0aGVyIHN0ciBlbmRzIHdpdGggc3Vic3RyXG5mdW5jdGlvbiBlbmRzV2l0aChzdHIsIHN1YnN0cikge1xuICAgIHJldHVybiBzdHIubGFzdEluZGV4T2Yoc3Vic3RyKSA9PT0gc3RyLmxlbmd0aCAtIHN1YnN0ci5sZW5ndGg7XG59XG5cbi8vIHdoZXRoZXIgc3RyIGNvbnRhaW5zIGFueSB0ZXh0XG5mdW5jdGlvbiBoYXNUZXh0KHN0cikge1xuICAgIHZhciBzdWJzdHIgPSByZW1vdmVFeHRyYVdoaXRlc3BhY2Uoc3RyKTtcbiAgICByZXR1cm4gISFzdWJzdHIubGVuZ3RoO1xufVxuXG4vLyB3aGV0aGVyIHN0ciBjb250YWlucyBhbnkgY2hhcmFjdGVyc1xuZnVuY3Rpb24gaXNFbXB0eShzdHIpIHtcbiAgICByZXR1cm4gIXN0ci5sZW5ndGg7XG59XG5cbi8vIHdoZXRoZXIgc3RyIGlzIG51bWVyaWNcbmZ1bmN0aW9uIGlzTnVtZXJpYyhzdHIpIHtcbiAgICB2YXIgcmVneCA9IC9eWy0rXT9cXGQqXFwuP1xcZCsoPzpbZUVdWy0rXT9cXGQrKT8kLztcbiAgICByZXR1cm4gcmVneC50ZXN0KHN0cik7XG59XG5cbi8vIHRoZSBudW1iZXIgb2Ygd29yZHMgaW4gYSBzdHJpbmdcbmZ1bmN0aW9uIHdvcmRDb3VudChzdHIpIHtcbiAgICByZXR1cm4gc3RyLm1hdGNoKC9cXGJcXHcrXFxiL2cpLmxlbmd0aDtcbn1cblxuLypcbiAqIFN1YnN0cmluZ1xuICovXG5cbi8vIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2Ygc3Vic3RyIGluIHN0clxuZnVuY3Rpb24gYWZ0ZXJGaXJzdChzdHIsIHN1YnN0cikge1xuICAgIHZhciBpbmRleCA9IHN0ci5pbmRleE9mKHN1YnN0cik7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGluZGV4ICs9IHN1YnN0ci5sZW5ndGg7XG4gICAgcmV0dXJuIHN0ci5zdWJzdHIoaW5kZXgpO1xufVxuXG4vLyBldmVyeXRoaW5nIGFmdGVyIHRoZSBsYXN0IG9jY3VyZW5jZSBvZiBzdWJzdHIgaW4gc3RyXG5mdW5jdGlvbiBhZnRlckxhc3Qoc3RyLCBzdWJzdHIpIHtcbiAgICB2YXIgaW5kZXggPSBzdHIubGFzdEluZGV4T2Yoc3Vic3RyKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaW5kZXggKz0gc3Vic3RyLmxlbmd0aDtcbiAgICByZXR1cm4gc3RyLnN1YnN0cihpbmRleCk7XG59XG5cbi8vIGV2ZXJ5dGhpbmcgYmVmb3JlIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHN1YnN0ciBpbiBzdHJcbmZ1bmN0aW9uIGJlZm9yZUZpcnN0KHN0ciwgc3Vic3RyKSB7XG4gICAgdmFyIGluZGV4ID0gc3RyLmluZGV4T2Yoc3Vic3RyKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIHN0ci5zdWJzdHIoMCwgaW5kZXgpO1xufVxuXG4vLyBldmVyeXRoaW5nIGJlZm9yZSB0aGUgbGFzdCBvY2N1cnJlbmNlIG9mIHN1YnN0ciBpbiB0aGUgc3RyaW5nLlxuZnVuY3Rpb24gYmVmb3JlTGFzdChzdHIsIHN1YnN0cikge1xuICAgIHZhciBpbmRleCA9IHN0ci5sYXN0SW5kZXhPZihzdWJzdHIpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLnN1YnN0cigwLCBpbmRleCk7XG59XG5cbi8vIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IG9jY3VyYW5jZSBvZiBzdGFydCBhbmQgYmVmb3JlIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGVuZFxuZnVuY3Rpb24gYmV0d2VlbihzdHIsIHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgc3Vic3RyID0gJyc7XG4gICAgdmFyIHN0YXJ0SW5kZXggPSBzdHIuaW5kZXhPZihzdGFydCk7XG4gICAgaWYgKHN0YXJ0SW5kZXggIT09IC0xKSB7XG4gICAgICAgIHN0YXJ0SW5kZXggKz0gc3RhcnQubGVuZ3RoO1xuICAgICAgICB2YXIgZW5kSW5kZXggPSBzdHIuaW5kZXhPZihlbmQsIHN0YXJ0SW5kZXgpO1xuICAgICAgICBpZiAoZW5kSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBzdWJzdHIgPSBzdHIuc3Vic3RyKHN0YXJ0SW5kZXgsIGVuZEluZGV4IC0gc3RhcnRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN1YnN0cjtcbn1cblxuLypcbiAqIFV0aWxpdHlcbiAqL1xuXG4vLyBVdGlsaXR5IG1ldGhvZCB0aGF0IGludGVsbGlnZW50bHkgYnJlYWtzIHVwIHlvdXIgc3RyaW5nLFxuLy8gYWxsb3dpbmcgeW91IHRvIGNyZWF0ZSBibG9ja3Mgb2YgcmVhZGFibGUgdGV4dC5cbi8vIFRoaXMgbWV0aG9kIHJldHVybnMgeW91IHRoZSBjbG9zZXN0IHBvc3NpYmxlIG1hdGNoIHRvIHRoZSBkZWxpbSBwYXJhbWF0ZXIsXG4vLyB3aGlsZSBrZWVwaW5nIHRoZSB0ZXh0IGxlbmd0aCB3aXRoaW4gdGhlIGxlbiBwYXJhbXRlci5cbi8vIElmIGEgbWF0Y2ggY2FuJ3QgYmUgZm91bmQgaW4geW91ciBzcGVjaWZpZWQgbGVuZ3RoIGFuICAnLi4uJyBpcyBhZGRlZCB0byB0aGF0IGJsb2NrLFxuLy8gYW5kIHRoZSBibG9ja2luZyBjb250aW51ZXMgdW50aWxsIGFsbCB0aGUgdGV4dCBpcyBicm9rZW4gYXBhcnQuXG5mdW5jdGlvbiBibG9jayhzdHIsIGxlbiwgZGVsaW0pIHtcbiAgICBpZiAoZGVsaW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkZWxpbSA9ICcuJztcbiAgICB9XG4gICAgdmFyIGFyciA9IFtdO1xuXG4gICAgaWYgKCFzdHIgfHwgIWNvbnRhaW5zKHN0ciwgZGVsaW0pKSB7XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuICAgIGlmIChkZWxpbSA9PT0gJyAnKSB7XG4gICAgICAgIHN0ciArPSBkZWxpbTtcbiAgICB9XG5cbiAgICB2YXIgY2hySW5kZXggPSAwO1xuICAgIHZhciBzdHJMZW4gPSBzdHIubGVuZ3RoO1xuICAgIHZhciByZXBsUGF0dCA9IG5ldyBSZWdFeHAoJ1teJyArIGVzY2FwZVBhdHRlcm4oZGVsaW0pICsgJ10rJCcpO1xuICAgIHdoaWxlIChjaHJJbmRleCA8IHN0ckxlbikge1xuICAgICAgICB2YXIgc3ViU3RyaW5nID0gc3RyLnN1YnN0cihjaHJJbmRleCwgbGVuKTtcbiAgICAgICAgaWYgKCFjb250YWlucyhzdWJTdHJpbmcsIGRlbGltKSkge1xuICAgICAgICAgICAgYXJyLnB1c2godHJ1bmNhdGUoc3ViU3RyaW5nLCBzdWJTdHJpbmcubGVuZ3RoKSk7XG4gICAgICAgICAgICBjaHJJbmRleCArPSBzdWJTdHJpbmcubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHN1YlN0cmluZyA9IHN1YlN0cmluZy5yZXBsYWNlKHJlcGxQYXR0LCAnJyk7XG4gICAgICAgIGFyci5wdXNoKHRyaW0oc3ViU3RyaW5nKSk7XG4gICAgICAgIGNockluZGV4ICs9IHN1YlN0cmluZy5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG59XG5cbi8vIExldmVuc2h0ZWluIGRpc3RhbmNlIChlZGl0RGlzdGFuY2UpIGlzIGEgbWVhc3VyZSBvZiB0aGUgc2ltaWxhcml0eSBiZXR3ZWVuIHR3byBzdHJpbmdzLFxuLy8gVGhlIGRpc3RhbmNlIGlzIHRoZSBudW1iZXIgb2YgZGVsZXRpb25zLCBpbnNlcnRpb25zLCBvciBzdWJzdGl0dXRpb25zIHJlcXVpcmVkIHRvXG4vLyB0cmFuc2Zvcm0gc291cmNlIGludG8gdGFyZ2V0LlxuZnVuY3Rpb24gZWRpdERpc3RhbmNlKHNvdXJjZSwgdGFyZ2V0KSB7XG4gICAgdmFyIGk7XG5cbiAgICBpZiAoc291cmNlID09PSBudWxsKSB7XG4gICAgICAgIHNvdXJjZSA9ICcnO1xuICAgIH1cbiAgICBpZiAodGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgIHRhcmdldCA9ICcnO1xuICAgIH1cblxuICAgIGlmIChzb3VyY2UgPT09IHRhcmdldCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICB2YXIgZCA9IFtdO1xuICAgIHZhciBjb3N0O1xuICAgIHZhciBuID0gc291cmNlLmxlbmd0aDtcbiAgICB2YXIgbSA9IHRhcmdldC5sZW5ndGg7XG4gICAgdmFyIGo7XG5cbiAgICBpZiAobiA9PT0gMCkge1xuICAgICAgICByZXR1cm4gbTtcbiAgICB9XG4gICAgaWYgKG0gPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG47XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8PSBuOyBpKyspIHtcbiAgICAgICAgZFtpXSA9IFtdO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDw9IG47IGkrKykge1xuICAgICAgICBkW2ldWzBdID0gaTtcbiAgICB9XG4gICAgZm9yIChqID0gMDsgaiA8PSBtOyBqKyspIHtcbiAgICAgICAgZFswXVtqXSA9IGo7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMTsgaSA8PSBuOyBpKyspIHtcblxuICAgICAgICB2YXIgc2kgPSBzb3VyY2UuY2hhckF0KGkgLSAxKTtcbiAgICAgICAgZm9yIChqID0gMTsgaiA8PSBtOyBqKyspIHtcblxuICAgICAgICAgICAgdmFyIHRqID0gdGFyZ2V0LmNoYXJBdChqIC0gMSk7XG5cbiAgICAgICAgICAgIGlmIChzaSA9PT0gdGopIHtcbiAgICAgICAgICAgICAgICBjb3N0ID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29zdCA9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRbaV1bal0gPSBNYXRoLm1pbihkW2kgLSAxXVtqXSArIDEsIGRbaV1baiAtIDFdICsgMSwgZFtpIC0gMV1baiAtIDFdICsgY29zdCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRbbl1bbV07XG59XG5cbi8vIHBlcmNlbnRhZ2Ugb2Ygc2ltaWxpYXJpdHkgZnJvbSAwIHRvIDFcbmZ1bmN0aW9uIHNpbWlsYXJpdHkoYSwgYikge1xuICAgIHZhciBlID0gZWRpdERpc3RhbmNlKGEsIGIpO1xuICAgIHZhciBtID0gTWF0aC5tYXgoYS5sZW5ndGgsIGIubGVuZ3RoKTtcbiAgICBpZiAobSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gKDEgLSBlIC8gbSk7XG4gICAgfVxufVxuXG5cbnZhciBTdHJpbmdVdGlscyA9IHtcbiAgICAvLyBoZWxwZXI6XG4gICAgJ2VzY2FwZVBhdHRlcm4nOiBlc2NhcGVQYXR0ZXJuLFxuXG4gICAgLy8gZm9ybWF0OlxuICAgICd0cmltJzogdHJpbSxcbiAgICAndHJpbUxlZnQnOiB0cmltTGVmdCxcbiAgICAndHJpbVJpZ2h0JzogdHJpbVJpZ2h0LFxuICAgICdwYWRMZWZ0JzogcGFkTGVmdCxcbiAgICAncGFkUmlnaHQnOiBwYWRSaWdodCxcbiAgICAncmVtb3ZlRXh0cmFXaGl0ZXNwYWNlJzogcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlLFxuICAgICdyZW1vdmUnOiByZW1vdmUsXG4gICAgJ3RydW5jYXRlJzogdHJ1bmNhdGUsXG4gICAgJ2NhcGl0YWxpemUnOiBjYXBpdGFsaXplLFxuICAgICdwcm9wZXJDYXNlJzogcHJvcGVyQ2FzZSxcbiAgICAncmV2ZXJzZSc6IHJldmVyc2UsXG4gICAgJ3JldmVyc2VXb3Jkcyc6IHJldmVyc2VXb3JkcyxcbiAgICAnc3RyaXBUYWdzJzogc3RyaXBUYWdzLFxuICAgICdzd2FwQ2FzZSc6IHN3YXBDYXNlLFxuICAgICd0aW1lQ29kZSc6IHRpbWVDb2RlLFxuXG4gICAgLy8gcXVlcnk6XG4gICAgJ2JlZ2luc1dpdGgnOiBiZWdpbnNXaXRoLFxuICAgICdjb250YWlucyc6IGNvbnRhaW5zLFxuICAgICdjb3VudE9mJzogY291bnRPZixcbiAgICAnZW5kc1dpdGgnOiBlbmRzV2l0aCxcbiAgICAnaGFzVGV4dCc6IGhhc1RleHQsXG4gICAgJ2lzRW1wdHknOiBpc0VtcHR5LFxuICAgICdpc051bWVyaWMnOiBpc051bWVyaWMsXG4gICAgJ3dvcmRDb3VudCc6IHdvcmRDb3VudCxcblxuICAgIC8vIHN1YnN0cmluZzpcbiAgICAnYWZ0ZXJGaXJzdCc6IGFmdGVyRmlyc3QsXG4gICAgJ2FmdGVyTGFzdCc6IGFmdGVyTGFzdCxcbiAgICAnYmVmb3JlRmlyc3QnOiBiZWZvcmVGaXJzdCxcbiAgICAnYmVmb3JlTGFzdCc6IGJlZm9yZUxhc3QsXG4gICAgJ2JldHdlZW4nOiBiZXR3ZWVuLFxuXG4gICAgLy8gdXRpbGl0eTpcbiAgICAnYmxvY2snOiBibG9jayxcbiAgICAnZWRpdERpc3RhbmNlJzogZWRpdERpc3RhbmNlLFxuICAgICdzaW1pbGFyaXR5Jzogc2ltaWxhcml0eVxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBTdHJpbmdVdGlscztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRyYWNrID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uKGdhQWNjb3VudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnSW5pdGlhbGl6ZSBHb29nbGUgQW5hbHl0aWNzIHdpdGggYWNjb3VudCBJZDonLCBnYUFjY291bnQpO1xuXG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgICAgIChmdW5jdGlvbihpLHMsbyxnLHIsYSxtKXtpWydHb29nbGVBbmFseXRpY3NPYmplY3QnXT1yO2lbcl09aVtyXXx8ZnVuY3Rpb24oKXtcbiAgICAgICAgKGlbcl0ucT1pW3JdLnF8fFtdKS5wdXNoKGFyZ3VtZW50cyk7fSxpW3JdLmw9MSpuZXcgRGF0ZSgpO2E9cy5jcmVhdGVFbGVtZW50KG8pLFxuICAgICAgICBtPXMuZ2V0RWxlbWVudHNCeVRhZ05hbWUobylbMF07YS5hc3luYz0xO2Euc3JjPWc7bS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhLG0pO1xuICAgICAgICB9KSh3aW5kb3csZG9jdW1lbnQsJ3NjcmlwdCcsJy8vd3d3Lmdvb2dsZS1hbmFseXRpY3MuY29tL2FuYWx5dGljcy5qcycsJ2dhJyk7XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgKi9cblxuICAgICAgICB3aW5kb3cuZ2EoJ2NyZWF0ZScsIGdhQWNjb3VudCwgJ2F1dG8nKTtcbiAgICAgICAgd2luZG93LmdhKCdzZW5kJywgJ3BhZ2V2aWV3Jyk7XG4gICAgfSxcbiAgICBwYWdlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygndHJhY2sucGFnZTonLCB2YWx1ZSk7XG4gICAgICAgIHdpbmRvdy5nYSgnc2VuZCcsIHtcbiAgICAgICAgICAgICdoaXRUeXBlJzogJ3BhZ2V2aWV3JyxcbiAgICAgICAgICAgICdwYWdlJzogdmFsdWUsXG4gICAgICAgICAgICAndGl0bGUnOiB2YWx1ZVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGV2ZW50OiBmdW5jdGlvbihjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RyYWNrLmV2ZW50OicsIGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZSk7XG4gICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RyYWNrIHdpdGggbGFiZWw6JywgY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlKTtcbiAgICAgICAgICAgIHdpbmRvdy5nYSgnc2VuZCcsIHtcbiAgICAgICAgICAgICAgICAnaGl0VHlwZSc6ICdldmVudCcsXG4gICAgICAgICAgICAgICAgJ2V2ZW50Q2F0ZWdvcnknOiBjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAnZXZlbnRBY3Rpb24nOiBhY3Rpb24sXG4gICAgICAgICAgICAgICAgJ2V2ZW50TGFiZWwnOiBsYWJlbCxcbiAgICAgICAgICAgICAgICAnZXZlbnRWYWx1ZSc6IHZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0cmFjayB3aXRob3V0IGxhYmVsOicsIGNhdGVnb3J5LCBhY3Rpb24pO1xuICAgICAgICAgICAgd2luZG93LmdhKCdzZW5kJywge1xuICAgICAgICAgICAgICAgICdoaXRUeXBlJzogJ2V2ZW50JyxcbiAgICAgICAgICAgICAgICAnZXZlbnRDYXRlZ29yeSc6IGNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICdldmVudEFjdGlvbic6IGFjdGlvblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHRyYWNrO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXJsUGFyYW1zID0ge307XG5cbihmdW5jdGlvbigpIHtcbiAgICB2YXIgcGwgPSAvXFwrL2c7ICAvLyBSZWdleCBmb3IgcmVwbGFjaW5nIGFkZGl0aW9uIHN5bWJvbCB3aXRoIGEgc3BhY2VcbiAgICB2YXIgc2VhcmNoID0gLyhbXiY9XSspPT8oW14mXSopL2c7XG4gICAgdmFyIGRlY29kZSA9IGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzLnJlcGxhY2UocGwsICcgJykpO1xuICAgIH07XG4gICAgdmFyIHF1ZXJ5ID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSk7XG4gICAgdmFyIG1hdGNoID0gc2VhcmNoLmV4ZWMocXVlcnkpO1xuICAgIHdoaWxlIChtYXRjaCkge1xuICAgICAgICB1cmxQYXJhbXNbZGVjb2RlKG1hdGNoWzFdKV0gPSBkZWNvZGUobWF0Y2hbMl0pO1xuICAgICAgICBtYXRjaCA9IHNlYXJjaC5leGVjKHF1ZXJ5KTtcbiAgICB9XG59KCkpO1xuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHVybFBhcmFtcztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCcuL0VtaXR0ZXInKSxcbiAgICByZXNpemVVdGlsID0gcmVxdWlyZSgnLi9yZXNpemUnKTtcblxudmFyIFZpZXdQb3J0ID0ge1xuICAgIHJlY3Q6IHtcbiAgICAgICAgJ3gnOiAwLFxuICAgICAgICAneSc6IDAsXG4gICAgICAgICd3aWR0aCc6IDAsXG4gICAgICAgICdoZWlnaHQnOiAwLFxuICAgICAgICAnc3RhZ2VXaWR0aCc6IDAsXG4gICAgICAgICdzdGFnZUhlaWdodCc6IDAsXG4gICAgICAgICdzY2FsZSc6IDFcbiAgICB9LFxuICAgIG9yaWdpbmFsV2lkdGg6IDAsXG4gICAgb3JpZ2luYWxIZWlnaHQ6IDAsXG5cbiAgICBpbml0OiBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMub3JpZ2luYWxXaWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLm9yaWdpbmFsSGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHdpbmRvdy5vbnJlc2l6ZSA9IHdpbmRvdy5vbm9yaWVudGF0aW9uY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLnJlc2l6ZSgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgIH0sXG4gICAgcmVzaXplOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gcmVzZXRcbiAgICAgICAgdGhpcy5yZWN0LnggPSAwO1xuICAgICAgICB0aGlzLnJlY3QueSA9IDA7XG4gICAgICAgIHRoaXMucmVjdC53aWR0aCA9IHRoaXMub3JpZ2luYWxXaWR0aDtcbiAgICAgICAgdGhpcy5yZWN0LmhlaWdodCA9IHRoaXMub3JpZ2luYWxIZWlnaHQ7XG4gICAgICAgIHRoaXMucmVjdC5zdGFnZVdpZHRoID0gdGhpcy5nZXRXaW5kb3dXaWR0aCgpO1xuICAgICAgICB0aGlzLnJlY3Quc3RhZ2VIZWlnaHQgPSB0aGlzLmdldFdpbmRvd0hlaWdodCgpO1xuICAgICAgICB0aGlzLnJlY3Quc2NhbGUgPSAxO1xuICAgICAgICAvLyByZXNpemVcbiAgICAgICAgaWYgKHRoaXMucmVjdC5zdGFnZVdpZHRoID4gdGhpcy5yZWN0LnN0YWdlSGVpZ2h0KSB7XG4gICAgICAgICAgICByZXNpemVVdGlsKHRoaXMucmVjdCwgdGhpcy5yZWN0LnN0YWdlV2lkdGgsIHRoaXMucmVjdC5zdGFnZUhlaWdodCwgdHJ1ZSwgJ2ZpbGwnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc2l6ZVV0aWwodGhpcy5yZWN0LCB0aGlzLnJlY3Quc3RhZ2VXaWR0aCwgdGhpcy5yZWN0LnN0YWdlSGVpZ2h0LCB0cnVlLCAnZml0V2lkdGgnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlY3Quc2NhbGUgPSB0aGlzLnJlY3Qud2lkdGggLyB0aGlzLm9yaWdpbmFsV2lkdGg7XG4gICAgICAgIC8vIG5vdGlmeVxuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgncmVzaXplJyk7XG4gICAgfSxcbiAgICBtb3VzZUxlZnRXaW5kb3c6IGZ1bmN0aW9uKGZuLCB0aGlzQXJnKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIGZyb20gPSBlLnJlbGF0ZWRUYXJnZXQgfHwgZS50b0VsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoIWZyb20gfHwgZnJvbS5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICAgICAgICAgICAgZm4uY2FsbCh0aGlzQXJnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBnZXRXaW5kb3dXaWR0aDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIEdldCBjdXJyZW50IGJyb3dzZXIgdmlld3BhbmUgaGVpZ3RodFxuICAgICAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggfHxcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCB8fCAwO1xuICAgIH0sXG4gICAgZ2V0V2luZG93SGVpZ2h0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gR2V0IGN1cnJlbnQgYnJvd3NlciB2aWV3cGFuZSBoZWlndGh0XG4gICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQgfHxcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHxcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0IHx8IDA7XG4gICAgfSxcbiAgICBnZXRTY3JvbGxUb3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgd2luZG93LnBhZ2VZT2Zmc2V0IHx8IDA7XG4gICAgfSxcbiAgICBnZXRXaW5kb3dTY3JvbGxZOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gR2V0IGN1cnJlbnQgYWJzb2x1dGUgd2luZG93IHNjcm9sbCBwb3NpdGlvblxuICAgICAgICByZXR1cm4gd2luZG93LnBhZ2VZT2Zmc2V0IHx8XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fFxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCAwO1xuICAgIH0sXG4gICAgZ2V0RG9jSGVpZ2h0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gR2V0IGN1cnJlbnQgYWJzb2x1dGUgZG9jdW1lbnQgaGVpZ2h0XG4gICAgICAgIHJldHVybiBNYXRoLm1heChcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0IHx8IDAsXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0IHx8IDAsXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCB8fCAwLFxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodCB8fCAwLFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQgfHwgMCxcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHwgMFxuICAgICAgICApO1xuICAgIH0sXG4gICAgZ2V0U2Nyb2xsUGVyY2VudGFnZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIEdldCBjdXJyZW50IHZlcnRpY2FsIHNjcm9sbCBwZXJjZW50YWdlXG4gICAgICAgIHJldHVybiAoKHRoaXMuZ2V0V2luZG93U2Nyb2xsWSgpICsgdGhpcy5nZXRXaW5kb3dIZWlnaHQoKSkgLyB0aGlzLmdldERvY0hlaWdodCgpKSAqIDEwMDtcbiAgICB9XG59O1xuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IFZpZXdQb3J0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJy4vRW1pdHRlcicpO1xuXG52YXIgdmlzaWJpbGl0eSxcbiAgICBoaWRkZW4sXG4gICAgdmlzaWJpbGl0eUNoYW5nZTtcblxuZnVuY3Rpb24gb25WaXNpYmlsaXR5Q2hhbmdlKCkge1xuICAgIGlmIChkb2N1bWVudFtoaWRkZW5dKSB7XG4gICAgICAgIHZpc2liaWxpdHkuZW1pdCgnaGlkZGVuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmlzaWJpbGl0eS5lbWl0KCdzaG93bicpO1xuICAgIH1cbn1cblxuaWYgKHR5cGVvZiBkb2N1bWVudC5oaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7IC8vIE9wZXJhIDEyLjEwIGFuZCBGaXJlZm94IDE4IGFuZCBsYXRlciBzdXBwb3J0XG4gICAgaGlkZGVuID0gJ2hpZGRlbic7XG4gICAgdmlzaWJpbGl0eUNoYW5nZSA9ICd2aXNpYmlsaXR5Y2hhbmdlJztcbn0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50Lm1vekhpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBoaWRkZW4gPSAnbW96SGlkZGVuJztcbiAgICB2aXNpYmlsaXR5Q2hhbmdlID0gJ21venZpc2liaWxpdHljaGFuZ2UnO1xufSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQubXNIaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaGlkZGVuID0gJ21zSGlkZGVuJztcbiAgICB2aXNpYmlsaXR5Q2hhbmdlID0gJ21zdmlzaWJpbGl0eWNoYW5nZSc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC53ZWJraXRIaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaGlkZGVuID0gJ3dlYmtpdEhpZGRlbic7XG4gICAgdmlzaWJpbGl0eUNoYW5nZSA9ICd3ZWJraXR2aXNpYmlsaXR5Y2hhbmdlJztcbn1cblxuaWYgKHZpc2liaWxpdHlDaGFuZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIodmlzaWJpbGl0eUNoYW5nZSwgb25WaXNpYmlsaXR5Q2hhbmdlLCBmYWxzZSk7XG59XG5cbnZpc2liaWxpdHkgPSBPYmplY3QuY3JlYXRlKEVtaXR0ZXIucHJvdG90eXBlLCB7XG4gICAgX2V2ZW50czogeyB2YWx1ZToge30gfVxufSk7XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gdmlzaWJpbGl0eTtcbn1cbiJdfQ==
