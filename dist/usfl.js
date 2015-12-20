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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJBc3NldExvYWRlci5qcyIsIkN1ZXBvaW50c1JlYWRlci5qcyIsIkVtaXR0ZXIuanMiLCJGYWNlYm9vay5qcyIsIkZsYXNoLmpzIiwiRnBzLmpzIiwiR3JhcGhpY3MuanMiLCJJbnB1dENvb3Jkcy5qcyIsIktleUlucHV0LmpzIiwiTGlua2VkTGlzdC5qcyIsIk1vdXNlV2hlZWwuanMiLCJPYmplY3RQb29sLmpzIiwiVG91Y2hJbnB1dC5qcyIsIlZpZGVvUGxheWVyLmpzIiwiYXJyYXkuanMiLCJkZXZpY2UuanMiLCJmdWxsc2NyZWVuLmpzIiwiaW5kZXguanMiLCJrZXlib2FyZC5qcyIsIm1hdGguanMiLCJtb2Rlcm4uanMiLCJub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsInBsYXRmb3JtLmpzIiwicG9seWZpbGwtY2xhc3NsaXN0LmpzIiwicG9seWZpbGwtY29uc29sZS5qcyIsInBvbHlmaWxsLXJhZi5qcyIsInBvcHVwLmpzIiwicmVhZHkuanMiLCJyZXNpemUuanMiLCJzaGFyZS5qcyIsInN0b3JhZ2UuanMiLCJzdHJpbmcuanMiLCJ0cmFjay5qcyIsInVybFBhcmFtcy5qcyIsInZpZXdwb3J0LmpzIiwidmlzaWJpbGl0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9LQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDblpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCcuL0VtaXR0ZXInKTtcblxudmFyIGJyb3dzZXJIYXNCbG9iID0gKGZ1bmN0aW9uKCkge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiAhIW5ldyBCbG9iKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufSgpKTtcblxuLypcbiAqIEdyb3VwXG4gKi9cblxuZnVuY3Rpb24gQXNzZXRzTG9hZGVyKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcblxuICAgIHZhciBjcm9zc09yaWdpbiA9IGNvbmZpZy5jcm9zc09yaWdpbjtcbiAgICB2YXIgaXNUb3VjaExvY2tlZCA9ICEhY29uZmlnLmlzVG91Y2hMb2NrZWQ7XG4gICAgdmFyIGJsb2IgPSAhIShjb25maWcuYmxvYiAmJiBicm93c2VySGFzQmxvYik7XG4gICAgdmFyIHdlYkF1ZGlvQ29udGV4dCA9IGNvbmZpZy53ZWJBdWRpb0NvbnRleHQ7XG5cbiAgICB2YXIgYXNzZXRzTG9hZGVyO1xuICAgIHZhciBtYXAgPSB7fTtcbiAgICB2YXIgZmlsZXMgPSBbXTtcbiAgICB2YXIgcXVldWUgPSBbXTtcbiAgICB2YXIgbnVtTG9hZGVkID0gMDtcbiAgICB2YXIgbnVtVG90YWwgPSAwO1xuXG4gICAgdmFyIGFkZCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgYWRkKGl0ZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gYXNzZXRzTG9hZGVyO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsb2FkZXIgPSBuZXcgQXNzZXRzTG9hZGVyLkxvYWRlcihjb25maWd1cmUob3B0aW9ucykpO1xuICAgICAgICBxdWV1ZS5wdXNoKGxvYWRlcik7XG4gICAgICAgIHJldHVybiBhc3NldHNMb2FkZXI7XG4gICAgfTtcblxuICAgIHZhciBnZXQgPSBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gbWFwW2lkXTtcbiAgICB9O1xuXG4gICAgdmFyIGNvbmZpZ3VyZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdmFyIHVybCA9IG9wdGlvbnM7XG4gICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHVybDogdXJsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuaXNUb3VjaExvY2tlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvcHRpb25zLmlzVG91Y2hMb2NrZWQgPSBpc1RvdWNoTG9ja2VkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmJsb2IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgb3B0aW9ucy5ibG9iID0gYmxvYjtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wdGlvbnMuaWQgPSBvcHRpb25zLmlkIHx8IG9wdGlvbnMudXJsO1xuICAgICAgICBvcHRpb25zLnR5cGUgPSBvcHRpb25zLnR5cGUgfHwgb3B0aW9ucy51cmwuc3BsaXQoJz8nKVswXS5zcGxpdCgnLicpLnBvcCgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIG9wdGlvbnMuY3Jvc3NPcmlnaW4gPSBvcHRpb25zLmNyb3NzT3JpZ2luIHx8IGNyb3NzT3JpZ2luO1xuICAgICAgICBvcHRpb25zLndlYkF1ZGlvQ29udGV4dCA9IG9wdGlvbnMud2ViQXVkaW9Db250ZXh0IHx8IHdlYkF1ZGlvQ29udGV4dDtcblxuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9O1xuXG4gICAgdmFyIHN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIG51bVRvdGFsID0gcXVldWUubGVuZ3RoO1xuXG4gICAgICAgIHF1ZXVlLmZvckVhY2goZnVuY3Rpb24obG9hZGVyKSB7XG4gICAgICAgICAgICBsb2FkZXIub24oJ3Byb2dyZXNzJywgcHJvZ3Jlc3NIYW5kbGVyKTtcbiAgICAgICAgICAgIGxvYWRlci5vbmNlKCdjb21wbGV0ZScsIGNvbXBsZXRlSGFuZGxlcik7XG4gICAgICAgICAgICBsb2FkZXIub25jZSgnZXJyb3InLCBlcnJvckhhbmRsZXIpO1xuICAgICAgICAgICAgbG9hZGVyLnN0YXJ0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBhc3NldHNMb2FkZXI7XG4gICAgfTtcblxuICAgIHZhciBwcm9ncmVzc0hhbmRsZXIgPSBmdW5jdGlvbihwcm9ncmVzcykge1xuICAgICAgICB2YXIgbG9hZGVkID0gbnVtTG9hZGVkICsgcHJvZ3Jlc3M7XG4gICAgICAgIGFzc2V0c0xvYWRlci5lbWl0KCdwcm9ncmVzcycsIGxvYWRlZCAvIG51bVRvdGFsKTtcbiAgICB9O1xuXG4gICAgdmFyIGNvbXBsZXRlSGFuZGxlciA9IGZ1bmN0aW9uKGtleSwgZmlsZSkge1xuICAgICAgICBudW1Mb2FkZWQrKztcbiAgICAgICAgYXNzZXRzTG9hZGVyLmVtaXQoJ3Byb2dyZXNzJywgbnVtTG9hZGVkIC8gbnVtVG90YWwpO1xuICAgICAgICBtYXBba2V5XSA9IGZpbGU7XG4gICAgICAgIGZpbGVzLnB1c2goZmlsZSk7XG5cbiAgICAgICAgYXNzZXRzTG9hZGVyLmVtaXQoJ2NoaWxkJywgZmlsZSk7XG4gICAgICAgIGNoZWNrQ29tcGxldGUoKTtcbiAgICB9O1xuXG4gICAgdmFyIGVycm9ySGFuZGxlciA9IGZ1bmN0aW9uKGVycikge1xuICAgICAgICBudW1Ub3RhbC0tO1xuICAgICAgICBpZiAoYXNzZXRzTG9hZGVyLmxpc3RlbmVycygnZXJyb3InKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFzc2V0c0xvYWRlci5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgY2hlY2tDb21wbGV0ZSgpO1xuICAgIH07XG5cbiAgICB2YXIgY2hlY2tDb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAobnVtTG9hZGVkID49IG51bVRvdGFsKSB7XG4gICAgICAgICAgICBhc3NldHNMb2FkZXIuZW1pdCgnY29tcGxldGUnLCBmaWxlcywgbWFwKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB3aGlsZSAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgICBxdWV1ZS5wb3AoKS5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgYXNzZXRzTG9hZGVyLm9mZignZXJyb3InKTtcbiAgICAgICAgYXNzZXRzTG9hZGVyLm9mZigncHJvZ3Jlc3MnKTtcbiAgICAgICAgYXNzZXRzTG9hZGVyLm9mZignY29tcGxldGUnKTtcbiAgICAgICAgbWFwID0ge307XG4gICAgICAgIGZpbGVzID0gW107XG4gICAgICAgIHdlYkF1ZGlvQ29udGV4dCA9IG51bGw7XG4gICAgICAgIG51bVRvdGFsID0gMDtcbiAgICAgICAgbnVtTG9hZGVkID0gMDtcblxuICAgICAgICByZXR1cm4gYXNzZXRzTG9hZGVyO1xuICAgIH07XG5cbiAgICBhc3NldHNMb2FkZXIgPSBPYmplY3QuY3JlYXRlKEVtaXR0ZXIucHJvdG90eXBlLCB7XG4gICAgICAgIF9ldmVudHM6IHtcbiAgICAgICAgICAgIHZhbHVlOiB7fVxuICAgICAgICB9LFxuICAgICAgICBhZGQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBhZGRcbiAgICAgICAgfSxcbiAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBzdGFydFxuICAgICAgICB9LFxuICAgICAgICBnZXQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBnZXRcbiAgICAgICAgfSxcbiAgICAgICAgZGVzdHJveToge1xuICAgICAgICAgICAgdmFsdWU6IGRlc3Ryb3lcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlnLmFzc2V0cykpIHtcbiAgICAgICAgYWRkKGNvbmZpZy5hc3NldHMpO1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKGFzc2V0c0xvYWRlcik7XG59XG5cbi8qXG4gKiBMb2FkZXJcbiAqL1xuXG5Bc3NldHNMb2FkZXIuTG9hZGVyID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHZhciBpZCA9IG9wdGlvbnMuaWQ7XG4gICAgdmFyIHVybCA9IG9wdGlvbnMudXJsO1xuICAgIHZhciB0eXBlID0gb3B0aW9ucy50eXBlO1xuICAgIHZhciBjcm9zc09yaWdpbiA9IG9wdGlvbnMuY3Jvc3NPcmlnaW47XG4gICAgdmFyIGlzVG91Y2hMb2NrZWQgPSBvcHRpb25zLmlzVG91Y2hMb2NrZWQ7XG4gICAgdmFyIGJsb2IgPSBvcHRpb25zLmJsb2IgJiYgYnJvd3Nlckhhc0Jsb2I7XG4gICAgdmFyIHdlYkF1ZGlvQ29udGV4dCA9IG9wdGlvbnMud2ViQXVkaW9Db250ZXh0O1xuXG4gICAgdmFyIGxvYWRlcjtcbiAgICB2YXIgbG9hZEhhbmRsZXI7XG4gICAgdmFyIHJlcXVlc3Q7XG4gICAgdmFyIHN0YXJ0VGltZTtcbiAgICB2YXIgdGltZW91dDtcblxuICAgIHZhciBzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnanNvbic6XG4gICAgICAgICAgICAgICAgbG9hZEpTT04oKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2pwZyc6XG4gICAgICAgICAgICBjYXNlICdwbmcnOlxuICAgICAgICAgICAgY2FzZSAnZ2lmJzpcbiAgICAgICAgICAgIGNhc2UgJ3dlYnAnOlxuICAgICAgICAgICAgICAgIGxvYWRJbWFnZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbXAzJzpcbiAgICAgICAgICAgIGNhc2UgJ29nZyc6XG4gICAgICAgICAgICBjYXNlICdvcHVzJzpcbiAgICAgICAgICAgIGNhc2UgJ3dhdic6XG4gICAgICAgICAgICBjYXNlICdtNGEnOlxuICAgICAgICAgICAgICAgIGxvYWRBdWRpbygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnb2d2JzpcbiAgICAgICAgICAgIGNhc2UgJ21wNCc6XG4gICAgICAgICAgICBjYXNlICd3ZWJtJzpcbiAgICAgICAgICAgIGNhc2UgJ2hscyc6XG4gICAgICAgICAgICAgICAgbG9hZFZpZGVvKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdiaW4nOlxuICAgICAgICAgICAgICAgIGxvYWRYSFIoJ2FycmF5YnVmZmVyJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93ICdBc3NldHNMb2FkZXIgRVJST1I6IFVua25vd24gdHlwZSBmb3IgZmlsZSB3aXRoIFVSTDogJyArIHVybCArICcgKCcgKyB0eXBlICsgJyknO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBkaXNwYXRjaENvbXBsZXRlID0gZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsb2FkZXIuZW1pdCgncHJvZ3Jlc3MnLCAxKTtcbiAgICAgICAgbG9hZGVyLmVtaXQoJ2NvbXBsZXRlJywgaWQsIGZpbGUpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcnMoKTtcbiAgICB9O1xuXG4gICAgdmFyIGxvYWRYSFIgPSBmdW5jdGlvbihyZXNwb25zZVR5cGUsIGN1c3RvbUxvYWRIYW5kbGVyKSB7XG4gICAgICAgIGxvYWRIYW5kbGVyID0gY3VzdG9tTG9hZEhhbmRsZXIgfHwgY29tcGxldGVIYW5kbGVyO1xuXG4gICAgICAgIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgcmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IHJlc3BvbnNlVHlwZTtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHByb2dyZXNzSGFuZGxlcik7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGxvYWRIYW5kbGVyKTtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9ySGFuZGxlcik7XG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgIH07XG5cbiAgICB2YXIgcHJvZ3Jlc3NIYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50Lmxlbmd0aENvbXB1dGFibGUpIHtcbiAgICAgICAgICAgIGxvYWRlci5lbWl0KCdwcm9ncmVzcycsIGV2ZW50LmxvYWRlZCAvIGV2ZW50LnRvdGFsKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgY29tcGxldGVIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChzdWNjZXNzKCkpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoQ29tcGxldGUocmVxdWVzdC5yZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHN1Y2Nlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHJlcXVlc3QgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgICAgIEFzc2V0c0xvYWRlci5zdGF0cy51cGRhdGUocmVxdWVzdCwgc3RhcnRUaW1lLCB1cmwpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3JIYW5kbGVyKHJlcXVlc3QgJiYgcmVxdWVzdC5zdGF0dXNUZXh0KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvLyBqc29uXG5cbiAgICB2YXIgbG9hZEpTT04gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbG9hZFhIUignanNvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHN1Y2Nlc3MoKSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkaXNwYXRjaENvbXBsZXRlKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gaW1hZ2VcblxuICAgIHZhciBsb2FkSW1hZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGJsb2IpIHtcbiAgICAgICAgICAgIGxvYWRJbWFnZUJsb2IoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvYWRJbWFnZUVsZW1lbnQoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgbG9hZEltYWdlRWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXF1ZXN0ID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGlmIChjcm9zc09yaWdpbikge1xuICAgICAgICAgICAgcmVxdWVzdC5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvckhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZWxlbWVudExvYWRIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIHJlcXVlc3Quc3JjID0gdXJsO1xuICAgIH07XG5cbiAgICB2YXIgZWxlbWVudExvYWRIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIGRpc3BhdGNoQ29tcGxldGUocmVxdWVzdCk7XG4gICAgfTtcblxuICAgIHZhciBsb2FkSW1hZ2VCbG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGxvYWRYSFIoJ2Jsb2InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChzdWNjZXNzKCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3JjID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwocmVxdWVzdC5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgcmVxdWVzdCA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvckhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBpbWFnZUJsb2JIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zcmMgPSBzcmM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgaW1hZ2VCbG9iSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgICAgICBkaXNwYXRjaENvbXBsZXRlKHJlcXVlc3QpO1xuICAgIH07XG5cbiAgICAvLyBhdWRpb1xuXG4gICAgdmFyIGxvYWRBdWRpbyA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKGNvbnRleHQpIHtcbiAgICAgICAgICAgIGxvYWRBdWRpb0J1ZmZlcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9hZE1lZGlhRWxlbWVudCgnYXVkaW8nKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyB2aWRlb1xuXG4gICAgdmFyIGxvYWRWaWRlbyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoYmxvYikge1xuICAgICAgICAgICAgbG9hZFhIUignYmxvYicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9hZE1lZGlhRWxlbWVudCgndmlkZW8nKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBhdWRpbyBidWZmZXJcblxuICAgIHZhciBsb2FkQXVkaW9CdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbG9hZFhIUignYXJyYXlidWZmZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChzdWNjZXNzKCkpIHtcbiAgICAgICAgICAgICAgICB3ZWJBdWRpb0NvbnRleHQuZGVjb2RlQXVkaW9EYXRhKFxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LnJlc3BvbnNlLFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihidWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2hDb21wbGV0ZShidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvckhhbmRsZXIoZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gbWVkaWEgZWxlbWVudFxuXG4gICAgdmFyIGxvYWRNZWRpYUVsZW1lbnQgPSBmdW5jdGlvbih0YWdOYW1lKSB7XG4gICAgICAgIHJlcXVlc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuXG4gICAgICAgIGlmICghaXNUb3VjaExvY2tlZCkge1xuICAgICAgICAgICAgLy8gdGltZW91dCBiZWNhdXNlIHNvbWV0aW1lcyBjYW5wbGF5dGhyb3VnaCBkb2Vzbid0IGZpcmVcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICB0aW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoZWxlbWVudExvYWRIYW5kbGVyLCAyMDAwKTtcbiAgICAgICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCBlbGVtZW50TG9hZEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvckhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgcmVxdWVzdC5wcmVsb2FkID0gJ2F1dG8nO1xuICAgICAgICByZXF1ZXN0LnNyYyA9IHVybDtcbiAgICAgICAgcmVxdWVzdC5sb2FkKCk7XG5cbiAgICAgICAgaWYgKGlzVG91Y2hMb2NrZWQpIHtcbiAgICAgICAgICAgIGRpc3BhdGNoQ29tcGxldGUocmVxdWVzdCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gZXJyb3JcblxuICAgIHZhciBlcnJvckhhbmRsZXIgPSBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuICAgICAgICB2YXIgbWVzc2FnZSA9IGVycjtcblxuICAgICAgICBpZiAocmVxdWVzdCAmJiByZXF1ZXN0LnRhZ05hbWUgJiYgcmVxdWVzdC5lcnJvcikge1xuICAgICAgICAgICAgdmFyIEVSUk9SX1NUQVRFID0gWycnLCAnQUJPUlRFRCcsICdORVRXT1JLJywgJ0RFQ09ERScsICdTUkNfTk9UX1NVUFBPUlRFRCddO1xuICAgICAgICAgICAgbWVzc2FnZSA9ICdNZWRpYUVycm9yOiAnICsgRVJST1JfU1RBVEVbcmVxdWVzdC5lcnJvci5jb2RlXSArICcgJyArIHJlcXVlc3Quc3JjO1xuICAgICAgICB9IGVsc2UgaWYgKHJlcXVlc3QgJiYgcmVxdWVzdC5zdGF0dXNUZXh0KSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gcmVxdWVzdC5zdGF0dXNUZXh0O1xuICAgICAgICB9IGVsc2UgaWYgKGVyciAmJiBlcnIubWVzc2FnZSkge1xuICAgICAgICAgICAgbWVzc2FnZSA9IGVyci5tZXNzYWdlO1xuICAgICAgICB9IGVsc2UgaWYgKGVyciAmJiBlcnIudHlwZSkge1xuICAgICAgICAgICAgbWVzc2FnZSA9IGVyci50eXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9hZGVyLmVtaXQoJ2Vycm9yJywgJ0Vycm9yIGxvYWRpbmcgXCInICsgdXJsICsgJ1wiICcgKyBtZXNzYWdlKTtcblxuICAgICAgICBkZXN0cm95KCk7XG4gICAgfTtcblxuICAgIC8vIGNsZWFuIHVwXG5cbiAgICB2YXIgcmVtb3ZlTGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGxvYWRlci5vZmYoJ2Vycm9yJyk7XG4gICAgICAgIGxvYWRlci5vZmYoJ3Byb2dyZXNzJyk7XG4gICAgICAgIGxvYWRlci5vZmYoJ2NvbXBsZXRlJyk7XG5cbiAgICAgICAgaWYgKHJlcXVlc3QpIHtcbiAgICAgICAgICAgIHJlcXVlc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBwcm9ncmVzc0hhbmRsZXIpO1xuICAgICAgICAgICAgcmVxdWVzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgbG9hZEhhbmRsZXIpO1xuICAgICAgICAgICAgcmVxdWVzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9ySGFuZGxlcik7XG4gICAgICAgICAgICByZXF1ZXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBlbGVtZW50TG9hZEhhbmRsZXIpO1xuICAgICAgICAgICAgcmVxdWVzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIGVsZW1lbnRMb2FkSGFuZGxlcik7XG4gICAgICAgICAgICByZXF1ZXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBpbWFnZUJsb2JIYW5kbGVyKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZW1vdmVMaXN0ZW5lcnMoKTtcblxuICAgICAgICBpZiAocmVxdWVzdCAmJiByZXF1ZXN0LmFib3J0ICYmIHJlcXVlc3QucmVhZHlTdGF0ZSA8IDQpIHtcbiAgICAgICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgICB3ZWJBdWRpb0NvbnRleHQgPSBudWxsO1xuXG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgfTtcblxuICAgIGxvYWRlciA9IE9iamVjdC5jcmVhdGUoRW1pdHRlci5wcm90b3R5cGUsIHtcbiAgICAgICAgX2V2ZW50czoge1xuICAgICAgICAgICAgdmFsdWU6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICB2YWx1ZTogc3RhcnRcbiAgICAgICAgfSxcbiAgICAgICAgZGVzdHJveToge1xuICAgICAgICAgICAgdmFsdWU6IGRlc3Ryb3lcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUobG9hZGVyKTtcbn07XG5cbi8qXG4gKiBTdGF0c1xuICovXG5cbkFzc2V0c0xvYWRlci5zdGF0cyA9IHtcbiAgICBtYnM6IDAsXG4gICAgc2VjczogMCxcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKHJlcXVlc3QsIHN0YXJ0VGltZSwgdXJsKSB7XG4gICAgICAgIHZhciBsZW5ndGg7XG4gICAgICAgIHZhciBoZWFkZXJzID0gcmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKTtcbiAgICAgICAgaWYgKGhlYWRlcnMpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGhlYWRlcnMubWF0Y2goL2NvbnRlbnQtbGVuZ3RoOiAoXFxkKykvaSk7XG4gICAgICAgICAgICBpZiAobWF0Y2ggJiYgbWF0Y2gubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gbWF0Y2hbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gdmFyIGxlbmd0aCA9IHJlcXVlc3QuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtTGVuZ3RoJyk7XG4gICAgICAgIGlmIChsZW5ndGgpIHtcbiAgICAgICAgICAgIGxlbmd0aCA9IHBhcnNlSW50KGxlbmd0aCwgMTApO1xuICAgICAgICAgICAgdmFyIG1icyA9IGxlbmd0aCAvIDEwMjQgLyAxMDI0O1xuICAgICAgICAgICAgdmFyIHNlY3MgPSAoRGF0ZS5ub3coKSAtIHN0YXJ0VGltZSkgLyAxMDAwO1xuICAgICAgICAgICAgdGhpcy5zZWNzICs9IHNlY3M7XG4gICAgICAgICAgICB0aGlzLm1icyArPSBtYnM7XG4gICAgICAgICAgICB0aGlzLmxvZyh1cmwsIG1icywgc2Vjcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4uY2FsbChjb25zb2xlLCAnQ2FuXFwndCBnZXQgQ29udGVudC1MZW5ndGg6JywgdXJsKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbG9nOiBmdW5jdGlvbih1cmwsIG1icywgc2Vjcykge1xuICAgICAgICBjb25zb2xlLmxvZy5jYWxsKGNvbnNvbGUsIHVybCwgbWJzLCBzZWNzKTtcbiAgICAgICAgaWYgKHVybCkge1xuICAgICAgICAgICAgdmFyIGZpbGUgPSAnRmlsZSBsb2FkZWQ6ICcgK1xuICAgICAgICAgICAgICAgIHVybC5zdWJzdHIodXJsLmxhc3RJbmRleE9mKCcvJykgKyAxKSArXG4gICAgICAgICAgICAgICAgJyBzaXplOicgKyBtYnMudG9GaXhlZCgyKSArICdtYicgK1xuICAgICAgICAgICAgICAgICcgdGltZTonICsgc2Vjcy50b0ZpeGVkKDIpICsgJ3MnICtcbiAgICAgICAgICAgICAgICAnIHNwZWVkOicgKyAobWJzIC8gc2VjcykudG9GaXhlZCgyKSArICdtYnBzJztcblxuICAgICAgICAgICAgY29uc29sZS5sb2cuY2FsbChjb25zb2xlLCBmaWxlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdG90YWwgPSAnVG90YWwgbG9hZGVkOiAnICsgdGhpcy5tYnMudG9GaXhlZCgyKSArICdtYicgK1xuICAgICAgICAgICAgJyB0aW1lOicgKyB0aGlzLnNlY3MudG9GaXhlZCgyKSArICdzJyArXG4gICAgICAgICAgICAnIHNwZWVkOicgKyB0aGlzLmdldE1icHMoKS50b0ZpeGVkKDIpICsgJ21icHMnO1xuICAgICAgICBjb25zb2xlLmxvZy5jYWxsKGNvbnNvbGUsIHRvdGFsKTtcbiAgICB9LFxuICAgIGdldE1icHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYnMgLyB0aGlzLnNlY3M7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBc3NldHNMb2FkZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIEN1ZXBvaW50c1JlYWRlcigpIHtcbiAgICB2YXIgY3VlcG9pbnRzUmVhZGVyO1xuICAgIHZhciBkaXNwYXRjaDtcbiAgICB2YXIgbGlzdCA9IFtdO1xuICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSAwO1xuICAgIHZhciBsYXN0UG9zaXRpb24gPSAtMTtcbiAgICB2YXIgdG9sZXJhbmNlID0gMC4yO1xuXG4gICAgdmFyIGFkZCA9IGZ1bmN0aW9uKHBvc2l0aW9uLCBuYW1lLCBkYXRhKSB7XG4gICAgICAgIGxpc3QucHVzaCh7XG4gICAgICAgICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KTtcblxuICAgICAgICBsaXN0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEucG9zaXRpb24gLSBiLnBvc2l0aW9uO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gY3VlcG9pbnRzUmVhZGVyO1xuICAgIH07XG5cbiAgICB2YXIgb25DdWVwb2ludCA9IGZ1bmN0aW9uKGZuLCB0aGlzQXJnKSB7XG4gICAgICAgIGlmIChmbikge1xuICAgICAgICAgICAgZGlzcGF0Y2ggPSB0aGlzQXJnID8gZm4uYmluZCh0aGlzQXJnKSA6IGZuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlzcGF0Y2ggPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdWVwb2ludHNSZWFkZXI7XG4gICAgfTtcblxuICAgIHZhciByZW1vdmVBbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgICByZXR1cm4gcmVzZXQoKTtcbiAgICB9O1xuXG4gICAgdmFyIHJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGN1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgICAgIGxhc3RQb3NpdGlvbiA9IC0xO1xuICAgICAgICByZXR1cm4gY3VlcG9pbnRzUmVhZGVyO1xuICAgIH07XG5cbiAgICB2YXIgc2V0VG9sZXJhbmNlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgdG9sZXJhbmNlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBjdWVwb2ludHNSZWFkZXI7XG4gICAgfTtcblxuICAgIHZhciB1cGRhdGUgPSBmdW5jdGlvbihwb3NpdGlvbikge1xuICAgICAgICBjdXJyZW50UG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgY2hlY2soY3VycmVudFBvc2l0aW9uLCBsYXN0UG9zaXRpb24pO1xuICAgICAgICBsYXN0UG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICAgIHJldHVybiBjdWVwb2ludHNSZWFkZXI7XG4gICAgfTtcblxuICAgIHZhciBjaGVjayA9IGZ1bmN0aW9uKGN1cnJlbnRQb3MsIGxhc3RQb3MpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRQb3MgPD0gbGFzdFBvcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZGlzcGF0Y2ggIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3Quc29tZShmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICBpZiAoaW5SYW5nZShpdGVtLnBvc2l0aW9uLCBjdXJyZW50UG9zLCBsYXN0UG9zKSkge1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGluUmFuZ2UgPSBmdW5jdGlvbihjdWVwb2ludFBvcywgY3VycmVudFBvcywgbGFzdFBvcykge1xuICAgICAgICBpZiAoY3VlcG9pbnRQb3MgPiBjdXJyZW50UG9zKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1ZXBvaW50UG9zIDw9IGxhc3RQb3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkaWZmID0gY3VlcG9pbnRQb3MgLSBjdXJyZW50UG9zO1xuICAgICAgICBpZiAoZGlmZiA8IDApIHtcbiAgICAgICAgICAgIGRpZmYgPSAtZGlmZjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGlmZiA8PSB0b2xlcmFuY2U7XG4gICAgfTtcblxuICAgIGN1ZXBvaW50c1JlYWRlciA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBhZGQ6IGFkZCxcbiAgICAgICAgb25DdWVwb2ludDogb25DdWVwb2ludCxcbiAgICAgICAgcmVtb3ZlQWxsOiByZW1vdmVBbGwsXG4gICAgICAgIHJlc2V0OiByZXNldCxcbiAgICAgICAgc2V0VG9sZXJhbmNlOiBzZXRUb2xlcmFuY2UsXG4gICAgICAgIHVwZGF0ZTogdXBkYXRlXG4gICAgfSk7XG5cbiAgICByZXR1cm4gY3VlcG9pbnRzUmVhZGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEN1ZXBvaW50c1JlYWRlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlcjtcblxuZnVuY3Rpb24gRW1pdHRlcigpIHtcbiAgICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcbiAgICB0aGlzLnNldE1heExpc3RlbmVycygyMCk7XG59XG5cbkVtaXR0ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFdmVudEVtaXR0ZXIucHJvdG90eXBlKTtcbkVtaXR0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRW1pdHRlcjtcblxuRW1pdHRlci5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgICBpZiAodHlwZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnModHlwZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJy4vRW1pdHRlcicpO1xuXG5mdW5jdGlvbiBGYWNlYm9vayhhcHBJZCkge1xuXG4gICAgdmFyIGxvYWRTY3JpcHRUaW1lb3V0O1xuXG4gICAgLy8gaW5pdGlhbGl6ZSBGQiBhcHBcbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpZiAod2luZG93LkZCICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8qRkIuRXZlbnQuc3Vic2NyaWJlKCdhdXRoLnN0YXR1c0NoYW5nZScsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2F1dGguc3RhdHVzQ2hhbmdlJywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gJ2Nvbm5lY3RlZCcpIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTsqL1xuICAgICAgICAgICAgd2luZG93LkZCLmluaXQoe1xuICAgICAgICAgICAgICAgIGFwcElkOiBhcHBJZCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IHRydWUsXG4gICAgICAgICAgICAgICAgY29va2llOiB0cnVlLFxuICAgICAgICAgICAgICAgIGxvZ2dpbmc6IHRydWUsXG4gICAgICAgICAgICAgICAgeGZibWw6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgd2luZG93LkZCLmdldExvZ2luU3RhdHVzKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdpbml0JywgcmVzcG9uc2Uuc3RhdHVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxvYWRTY3JpcHRUaW1lb3V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNhbGxlZCBieSBGQnMgSlMgd2hlbiBmaW5pc2hlZCBsb2FkaW5nXG4gICAgICAgICAgICB3aW5kb3cuZmJBc3luY0luaXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpbml0KCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gbG9naW5cbiAgICBmdW5jdGlvbiBsb2dpbihjYWxsYmFjaywgcGVybWlzc2lvbnMpIHtcbiAgICAgICAgd2luZG93LkZCLmxvZ2luKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgJ3Njb3BlJzogKHBlcm1pc3Npb25zIHx8ICcnKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayB0aGF0IHVzZXIgaGFzIGdyYW50ZWQgcmVxdWlyZWQgcGVybWlzc2lvbnMgYW5kIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgZnVuY3Rpb24gY2hlY2tQZXJtaXNzaW9ucyhjYWxsYmFjaywgcGVybWlzc2lvbnMpIHtcbiAgICAgICAgaWYgKHBlcm1pc3Npb25zID09PSB1bmRlZmluZWQgfHwgcGVybWlzc2lvbnMgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5GQi5hcGkoJy9tZS9wZXJtaXNzaW9ucycsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB2YXIgaGFzUGVybWlzc2lvbiA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcGVybXMgPSBwZXJtaXNzaW9ucy5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwZXJtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGhhc1Blcm1pc3Npb24gPSAhIXJlc3BvbnNlLmRhdGFbMF1bcGVybXNbaV1dO1xuICAgICAgICAgICAgICAgIGlmICghaGFzUGVybWlzc2lvbikge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaGFzUGVybWlzc2lvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9naW4oY2FsbGJhY2ssIHBlcm1pc3Npb25zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgdXNlciBsb2dpbiBhbmQgcGVybWlzc2lvbiBzdGF0dXNcbiAgICBmdW5jdGlvbiBjaGVja0F1dGgoY2FsbGJhY2ssIHBlcm1pc3Npb25zKSB7XG4gICAgICAgIHdpbmRvdy5GQi5nZXRMb2dpblN0YXR1cyhmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gJ2Nvbm5lY3RlZCcpIHtcbiAgICAgICAgICAgICAgICBjaGVja1Blcm1pc3Npb25zKGNhbGxiYWNrLCBwZXJtaXNzaW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZ2luKGNhbGxiYWNrLCBwZXJtaXNzaW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEluZm8ocGVybWlzc2lvbnMsIGZpZWxkcykge1xuICAgICAgICBjaGVja0F1dGgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB3aW5kb3cuRkIuYXBpKCcvbWUnLCB7XG4gICAgICAgICAgICAgICAgJ2ZpZWxkcyc6IGZpZWxkc1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ2luZm8nLCBudWxsKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ2luZm8nLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHBlcm1pc3Npb25zKTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgRkIgY29udGFpbmVyIGFuZCBsb2FkIHNjcmlwdFxuICAgIGZ1bmN0aW9uIGxvYWRTY3JpcHQoKSB7XG4gICAgICAgIGlmICh3aW5kb3cuRkIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmYnJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmItcm9vdCcpO1xuICAgICAgICBpZiAoIWZicm9vdCkge1xuICAgICAgICAgICAgZmJyb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBmYnJvb3Quc2V0QXR0cmlidXRlKCdpZCcsICdmYi1yb290Jyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZicm9vdCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIGZiLnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgICAgZmIuYXN5bmMgPSB0cnVlO1xuICAgICAgICBmYi5zcmMgPSBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCArICcvL2Nvbm5lY3QuZmFjZWJvb2submV0L2VuX1VTL2FsbC5qcyc7XG4gICAgICAgIGZicm9vdC5hcHBlbmRDaGlsZChmYik7XG5cbiAgICAgICAgbG9hZFNjcmlwdFRpbWVvdXQgPSBzZXRUaW1lb3V0KGxvYWRTY3JpcHQsIDYwMDApO1xuICAgIH1cblxuICAgIGxvYWRTY3JpcHQoKTtcblxuICAgIC8vIHB1YmxpY1xuICAgIHZhciBzZWxmID0gT2JqZWN0LmNyZWF0ZShFbWl0dGVyLnByb3RvdHlwZSwge1xuICAgICAgICBfZXZlbnRzOiB7XG4gICAgICAgICAgICB2YWx1ZToge31cbiAgICAgICAgfSxcbiAgICAgICAgaW5pdDoge1xuICAgICAgICAgICAgdmFsdWU6IGluaXRcbiAgICAgICAgfSxcbiAgICAgICAgbG9naW46IHtcbiAgICAgICAgICAgIHZhbHVlOiBsb2dpblxuICAgICAgICB9LFxuICAgICAgICB1dGlsczoge1xuICAgICAgICAgICAgdmFsdWU6IHV0aWxzXG4gICAgICAgIH0sXG4gICAgICAgIGdldEluZm86IHtcbiAgICAgICAgICAgIHZhbHVlOiBnZXRJbmZvXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBzZWxmO1xufVxuXG52YXIgdXRpbHMgPSB7XG4gICAgZ2V0UHJvZmlsZUltYWdlVXJsOiBmdW5jdGlvbihpZCwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgK1xuICAgICAgICAgICAgJy8vZ3JhcGguZmFjZWJvb2suY29tLycgKyBpZCArXG4gICAgICAgICAgICAnL3BpY3R1cmU/d2lkdGg9JyArIHdpZHRoICsgJyZoZWlnaHQ9JyArIGhlaWdodDtcbiAgICB9LFxuICAgIHJlc2l6ZUNhbnZhczogZnVuY3Rpb24oaGVpZ2h0KSB7XG4gICAgICAgIHdpbmRvdy5GQi5DYW52YXMuc2V0U2l6ZSh7XG4gICAgICAgICAgICAnaGVpZ2h0JzogaGVpZ2h0XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgd2luZG93LkZCLkNhbnZhcy5zZXRTaXplKHtcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzogaGVpZ2h0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfSxcbiAgICBzY3JvbGxUb1RvcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5GQi5DYW52YXMuc2Nyb2xsVG8oMCwgMCk7XG4gICAgfSxcbiAgICBsb2dvdXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cuRkIuRXZlbnQuc3Vic2NyaWJlKCdhdXRoLmxvZ291dCcsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICB2YXIgc3VjY2VzcyA9IHJlc3BvbnNlICYmICFyZXNwb25zZS5lcnJvcjtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbkZhY2Vib29rTG9nb3V0Q29tcGxldGUnLCBzdWNjZXNzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5GQi5sb2dvdXQoKTtcbiAgICB9LFxuICAgIGdldEZyaWVuZHM6IGZ1bmN0aW9uKGxpbWl0KSB7XG4gICAgICAgIHdpbmRvdy5GQi5hcGkoJy9tZS9mcmllbmRzJywge1xuICAgICAgICAgICAgbGltaXQ6IGxpbWl0XG4gICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldEZyaWVuZHMgRVJST1InKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgc29ydEZyaWVuZHNCeU11dHVhbDogZnVuY3Rpb24odXNlckRhdGEpIHtcbiAgICAgICAgdmFyIGZyaWVuZHMgPSB1c2VyRGF0YS5mcmllbmRzLmRhdGEuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICB2YXIgeCA9IGEubXV0dWFsZnJpZW5kcyA/IGEubXV0dWFsZnJpZW5kcy5kYXRhLmxlbmd0aCA6IDA7XG4gICAgICAgICAgICB2YXIgeSA9IGIubXV0dWFsZnJpZW5kcyA/IGIubXV0dWFsZnJpZW5kcy5kYXRhLmxlbmd0aCA6IDA7XG4gICAgICAgICAgICByZXR1cm4geSAtIHg7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZnJpZW5kcztcbiAgICB9LFxuICAgIC8qIHB1Ymxpc2ggc3RhdHVzIG1lc3NhZ2UgdG8gZmVlZC4gcmVxdWlyZXMgcHVibGlzaF9zdHJlYW0gcGVybWlzc2lvbiAqL1xuICAgIHN0YXR1c1B1Ymxpc2g6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgd2luZG93LkZCLmFwaSgnL21lL2ZlZWQnLCAncG9zdCcsIHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnb25GYWNlYm9va1N0YXR1c1B1Ymxpc2ggRVJST1InKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29uRmFjZWJvb2tTdGF0dXNQdWJsaXNoIFNVQ0NFU1MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICAvKiBTZW5kIGEgbWVzc2FnZSAqL1xuICAgIHNlbmREaWFsb2c6IGZ1bmN0aW9uKF9saW5rLCBfbmFtZSwgX2Rlc2NyaXB0aW9uLCBfcGljdHVyZSwgX3RvKSB7XG4gICAgICAgIHdpbmRvdy5GQi51aSh7XG4gICAgICAgICAgICBtZXRob2Q6ICdzZW5kJyxcbiAgICAgICAgICAgIHRvOiBfdG8sXG4gICAgICAgICAgICBuYW1lOiBfbmFtZSxcbiAgICAgICAgICAgIHBpY3R1cmU6IF9waWN0dXJlLFxuICAgICAgICAgICAgbGluazogX2xpbmssXG4gICAgICAgICAgICBkaXNwbGF5OiAncG9wdXAnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IF9kZXNjcmlwdGlvblxuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZhY2Vib29rLnNlbmREaWFsb2cnLCByZXNwb25zZSk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbkZhY2Vib29rU2VuZERpYWxvZ0NvbXBsZXRlJywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbkZhY2Vib29rU2VuZERpYWxvZ0NvbXBsZXRlJywgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIC8qIFB1Ymxpc2ggYWN0aW9uLiByZXF1aXJlcyBwdWJsaXNoX2FjdGlvbnMgcGVybWlzc2lvbiAqL1xuICAgIC8qcHVibGlzaEFjdGlvbjogZnVuY3Rpb24oYXBwSWQsIG5hbWVzcGFjZSwgYWN0aW9uLCB0YXJnZXRfaWQsIHJlcGVhdGVyVXJsLCBvYmplY3QsIHVybCwgaW1hZ2UpIHtcbiAgICAgICAgdmFyIG9iamVjdFBhcmFtcyA9ICdmYjphcHBfaWQ9JyArIGFwcElkICsgJyZvZzp0eXBlPScgKyBuYW1lc3BhY2UgKyAnOicgKyBvYmplY3QgKyAnJnVybCcgPSB1cmw7XG4gICAgICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICAgICAgICAndGFncyc6IHRhcmdldF9pZCxcbiAgICAgICAgICAgICdpbWFnZVswXVt1cmxdJzogaW1hZ2VcbiAgICAgICAgfTtcbiAgICAgICAgcGFyYW1zW29iamVjdF0gPSByZXBlYXRlclVybCArIChyZXBlYXRlclVybC5pbmRleE9mKCc/JykgPCAwID8gJz8nIDogJyYnKSArIG9iamVjdFBhcmFtcztcblxuICAgICAgICBGQi5hcGkoJy9tZS8nICsgbmFtZXNwYWNlICsgJzonICsgYWN0aW9uICsgJz8nICsgJC5wYXJhbShwYXJhbXMpLCAncG9zdCcsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coICdvbkZhY2Vib29rUHVibGlzaEFjdGlvbkNvbXBsZXRlJywgZmFsc2UgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coICdvbkZhY2Vib29rUHVibGlzaEFjdGlvbkNvbXBsZXRlJywgdHJ1ZSApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LCovXG4gICAgLyogc3RyZWFtIHB1Ymxpc2ggd2l0aCBjb25maXJtYXRpb24gYW5kIHVzZXIgaW5wdXQuIHJxdWlyZXMgcHVibGlzaF9zdHJlYW0gcGVybWlzc2lvbiAqL1xuICAgIHN0cmVhbVB1Ymxpc2g6IGZ1bmN0aW9uKG1lc3NhZ2UsIGF0dGFjaG1lbnQsIGFjdGlvbkxpbmtzLCB1c2VyTWVzc2FnZVByb21wdCwgdGFyZ2V0SWQpIHtcbiAgICAgICAgdmFyIHB1Ymxpc2ggPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdzdHJlYW0ucHVibGlzaCcsXG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgYXR0YWNobWVudDogYXR0YWNobWVudCxcbiAgICAgICAgICAgIGFjdGlvbl9saW5rczogYWN0aW9uTGlua3MsXG4gICAgICAgICAgICB1c2VyX21lc3NhZ2VfcHJvbXB0OiB1c2VyTWVzc2FnZVByb21wdCxcbiAgICAgICAgICAgIHRhcmdldF9pZDogdGFyZ2V0SWRcbiAgICAgICAgfTtcbiAgICAgICAgd2luZG93LkZCLnVpKHB1Ymxpc2gsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29uRmFjZWJvb2tTdHJlYW1QdWJsaXNoQ29tcGxldGUnLCBmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvbkZhY2Vib29rU3RyZWFtUHVibGlzaENvbXBsZXRlJywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgdGVzdF9zdHJlYW1QdWJsaXNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSAnbWVzc2FnZSc7XG4gICAgICAgIHZhciBhdHRhY2htZW50ID0ge1xuICAgICAgICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgICAgICAgY2FwdGlvbjogJ2NhcHRpb24nLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICBocmVmOiAnaHR0cDovL2V4YW1wbGUuY29tLydcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGFjdGlvbkxpbmtzID0gW3tcbiAgICAgICAgICAgIHRleHQ6ICdhY3Rpb25fbGluaycsXG4gICAgICAgICAgICBocmVmOiAnaHR0cDovL2V4YW1wbGUuY29tLydcbiAgICAgICAgfV07XG4gICAgICAgIHZhciB1c2VyTWVzc2FnZVByb21wdCA9ICd1c2VyX21lc3NhZ2VfcHJvbXB0JztcbiAgICAgICAgdGhpcy5zdHJlYW1QdWJsaXNoKG1lc3NhZ2UsIGF0dGFjaG1lbnQsIGFjdGlvbkxpbmtzLCB1c2VyTWVzc2FnZVByb21wdCk7XG4gICAgfVxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBGYWNlYm9vaztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCcuL0VtaXR0ZXInKSxcbiAgICBzd2ZvYmplY3QgPSB3aW5kb3cuc3dmb2JqZWN0O1xuXG5mdW5jdGlvbiBGbGFzaChlbGVtZW50LCB1cmwsIGVtYmVkdmFycywgZmxhc2h2YXJzKSB7XG5cbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuICAgIHRoaXMuZWxlbWVudElkID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgdGhpcy5mbGFzaElkID0gJ2ZsYXNoLScgKyB0aGlzLmVsZW1lbnRJZDtcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgICB0aGlzLmVtYmVkdmFycyA9IGVtYmVkdmFycyB8fCB7fTtcbiAgICB0aGlzLmZsYXNodmFycyA9IGZsYXNodmFycyB8fCB7fTtcblxuICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xuICAgIHRoaXMucXVldWVkQ2FsbHMgPSBbXTtcbn1cblxuRmxhc2gucHJvdG90eXBlID0ge1xuICAgIC8qXG4gICAgICogRW1iZWQgbWFpbiBmbGFzaCBhcHBcbiAgICAgKi9cbiAgICBlbWJlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFF1ZXJ5c3RyaW5nIHZhcnNcbiAgICAgICAgdGhpcy5fZ2V0Rmxhc2h2YXJzRnJvbVF1ZXJ5U3RyaW5nKHRoaXMuZmxhc2h2YXJzKTtcbiAgICAgICAgLy8gQ2hlY2sgcGF0aCBmb3JtYXRcbiAgICAgICAgdGhpcy5fZm9ybWF0UGF0aHModGhpcy5mbGFzaHZhcnMpO1xuICAgICAgICAvLyBjaGVjayBmbGFzaCB2ZXJzaW9uXG4gICAgICAgIHZhciBmbGFzaFZlcnNpb24gPSBzd2ZvYmplY3QuZ2V0Rmxhc2hQbGF5ZXJWZXJzaW9uKCk7XG4gICAgICAgIHZhciBtYWpvciA9IGZsYXNoVmVyc2lvbi5tYWpvcjtcbiAgICAgICAgdmFyIG1pbm9yID0gZmxhc2hWZXJzaW9uLm1pbm9yO1xuICAgICAgICB2YXIgbWluVmVyc2lvbkFyciA9ICh0aGlzLmVtYmVkdmFycy52ZXJzaW9uIHx8ICcxMC4yLjAnKS5zcGxpdCgnLicpO1xuICAgICAgICB2YXIgbWluTWFqb3IgPSBwYXJzZUludChtaW5WZXJzaW9uQXJyWzBdLCAxMCk7XG4gICAgICAgIHZhciBtaW5NaW5vciA9IHBhcnNlSW50KG1pblZlcnNpb25BcnJbMV0sIDEwKTtcblxuICAgICAgICB2YXIgcmVzdWx0O1xuXG4gICAgICAgIC8vIERldGVjdCAvIEVtYmVkXG4gICAgICAgIGlmIChmbGFzaFZlcnNpb24ubWFqb3IgPT09IDApIHtcbiAgICAgICAgICAgIC8vIE5vIEZsYXNoXG4gICAgICAgICAgICByZXN1bHQgPSAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChtYWpvciA8IG1pbk1ham9yIHx8IChtYWpvciA9PT0gbWluTWFqb3IgJiYgbWlub3IgPCBtaW5NaW5vcikpIHtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBGbGFzaFxuICAgICAgICAgICAgcmVzdWx0ID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgJ21lbnUnOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAncXVhbGl0eSc6ICdoaWdoJyxcbiAgICAgICAgICAgICAgICAnYmdjb2xvcic6ICh0aGlzLmVtYmVkdmFycy5iZ0NvbG9yIHx8ICcjZmZmZmZmJyksXG4gICAgICAgICAgICAgICAgJ2FsbG93RnVsbFNjcmVlbic6IHRydWUsXG4gICAgICAgICAgICAgICAgJ2FsbG93RnVsbFNjcmVlbkludGVyYWN0aXZlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAnYWxsb3dTY3JpcHRBY2Nlc3MnOiAnYWx3YXlzJyxcbiAgICAgICAgICAgICAgICAnd21vZGUnOiAodGhpcy5lbWJlZHZhcnMud21vZGUgfHwgdW5kZWZpbmVkKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSB7XG4gICAgICAgICAgICAgICAgJ2lkJzogdGhpcy5mbGFzaElkLFxuICAgICAgICAgICAgICAgICduYW1lJzogdGhpcy5mbGFzaElkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzd2ZvYmplY3QuZW1iZWRTV0YoXG4gICAgICAgICAgICAgICAgdGhpcy51cmwsXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50SWQsXG4gICAgICAgICAgICAgICAgKHRoaXMuZW1iZWR2YXJzLndpZHRoIHx8ICcxMDAlJyksXG4gICAgICAgICAgICAgICAgKHRoaXMuZW1iZWR2YXJzLmhlaWdodCB8fCAnMTAwJScpLFxuICAgICAgICAgICAgICAgICh0aGlzLmVtYmVkdmFycy52ZXJzaW9uIHx8ICcxMC4yLjAnKSxcbiAgICAgICAgICAgICAgICB0aGlzLmZsYXNodmFycy5hc3NldHNQYXRoICsgJ3N3Zi9leHByZXNzSW5zdGFsbC5zd2YnLFxuICAgICAgICAgICAgICAgIHRoaXMuZmxhc2h2YXJzLFxuICAgICAgICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ2VtYmVkJywgcmVzdWx0KTtcbiAgICB9LFxuICAgIC8qXG4gICAgICogR2V0IHJlZiB0byBGbGFzaCBvYmplY3RcbiAgICAgKi9cbiAgICBnZXRGbGFzaE9iamVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBzd2ZvYmplY3QuZ2V0T2JqZWN0QnlJZCh0aGlzLmZsYXNoSWQpO1xuICAgIH0sXG4gICAgLypcbiAgICAgKiBGbGFzaCBtdXN0IGNhbGwgJ2ZsYXNoLnJlYWR5JyB3aGVuIGxvYWRlZCBhbmQgcmVhZHkgdG8gcmVjZWl2ZSBKUyBjYWxsc1xuICAgICAqL1xuICAgIHJlYWR5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNSZWFkeSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmbGFzaC5yZWFkeSBjYWxsZWQnKTtcbiAgICAgICAgdGhpcy5fYXBwbHlRdWV1ZWRDYWxscygpO1xuICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCgncmVhZHknKTtcbiAgICB9LFxuICAgIC8qXG4gICAgICogQ2FsbCBtZXRob2RzIGluIGZsYXNoXG4gICAgICpcbiAgICAgKiBFLmcuXG4gICAgICogZmxhc2guY2FsbCggXCJvblNvbWVKU0FjdGlvbkNvbXBsZXRlXCIsIHJlc3BvbnNlICk7XG4gICAgICogLSBjYWxscyB0aGUgRXh0ZXJuYWxJbnRlcmZhY2UgY2FsbCBiYWNrICdvblNvbWVKU0FjdGlvbkNvbXBsZXRlJyBpbiBGbGFzaFxuICAgICAqIGZsYXNoLmNhbGwoXCJvbkZsYXNoRGlzcGF0Y2hlclwiLCBcIkhlbGxvXCIsIFwiV29ybGRcIiwge3Rlc3RPYmo6dHJ1ZX0sIGZhbHNlKTtcbiAgICAgKiAtIGNhbiBzZW5kIG11bHRpcGxlIGFyZ3VtZW50cyAtIG1heCA0IGF0IG1vbWVudCFcbiAgICAgKlxuICAgICAqL1xuICAgIGNhbGw6IGZ1bmN0aW9uKGZ1bmN0aW9uTmFtZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZsYXNoLmNhbGw6ICcsIGZ1bmN0aW9uTmFtZSwgJ2FyZ3VtZW50czonLCAoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKS5zbGljZSgxKSkpO1xuXG4gICAgICAgICAgICB2YXIgZmxhc2hPYmplY3QgPSB0aGlzLmdldEZsYXNoT2JqZWN0KCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZmxhc2ggcmVhZHk6JywgdGhpcy5pc1JlYWR5LCBmbGFzaE9iamVjdCk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1JlYWR5ICYmIGZsYXNoT2JqZWN0ICYmIGZsYXNoT2JqZWN0W2Z1bmN0aW9uTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBmaWd1cmUgb3V0IGhvdyB0byBkbyB0aGlzIGluIGEgY2xldmVyIHdheSFcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZsYXNoT2JqZWN0W2Z1bmN0aW9uTmFtZV0oYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0sIGFyZ3VtZW50c1szXSwgYXJndW1lbnRzWzRdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmbGFzaE9iamVjdFtmdW5jdGlvbk5hbWVdKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZsYXNoT2JqZWN0W2Z1bmN0aW9uTmFtZV0oYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZsYXNoT2JqZWN0W2Z1bmN0aW9uTmFtZV0oYXJndW1lbnRzWzFdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmxhc2hPYmplY3RbZnVuY3Rpb25OYW1lXSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZsYXNoLnF1ZXVlZENhbGxzLnB1c2g6JywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXVlZENhbGxzLnB1c2goYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmbGFzaC5jYWxsIEVSUk9SOicsIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICAvKlxuICAgICAqIEFueSBKUyBtZXRob2RzIGNhbGxlZCBiZWZvcmUgRmxhc2ggbG9hZGVkIHdpbGwgYmUgcXVldWVkIGFuZCBjYWxsZWQgd2hlbiB0aGlzIG1ldGhvZCBpcyBjYWxsZWQuXG4gICAgICovXG4gICAgX2FwcGx5UXVldWVkQ2FsbHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZmxhc2guX2FwcGx5UXVldWVkQ2FsbHMnLCB0aGlzLnF1ZXVlZENhbGxzLmxlbmd0aCk7XG4gICAgICAgIHZhciBxdWV1ZWRDYWxscyA9IHRoaXMucXVldWVkQ2FsbHM7XG4gICAgICAgIHZhciBsID0gcXVldWVkQ2FsbHMubGVuZ3RoO1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgbCkge1xuICAgICAgICAgICAgdGhpcy5jYWxsLmFwcGx5KHRoaXMsIHF1ZXVlZENhbGxzW2ldKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnF1ZXVlZENhbGxzID0gW107XG4gICAgfSxcbiAgICAvKlxuICAgICAqIENoZWNrIFF1ZXJ5c3RyaW5nIGZvciBGbGFzaHZhciB2YWx1ZXNcbiAgICAgKi9cbiAgICBfZ2V0Rmxhc2h2YXJzRnJvbVF1ZXJ5U3RyaW5nOiBmdW5jdGlvbihmbGFzaHZhcnMpIHtcbiAgICAgICAgLy8gU2V0IEZsYXNodmFycyBmcm9tIFF1ZXJ5IFN0cmluZyBwYXJhbXNcbiAgICAgICAgZnVuY3Rpb24gc2V0Rmxhc2h2YXJGcm9tUXVlcnlTdHJpbmcocGFyYW0pIHtcbiAgICAgICAgICAgIGlmIChzd2ZvYmplY3QuZ2V0UXVlcnlQYXJhbVZhbHVlKHBhcmFtKSkge1xuICAgICAgICAgICAgICAgIGZsYXNodmFyc1twYXJhbV0gPSBzd2ZvYmplY3QuZ2V0UXVlcnlQYXJhbVZhbHVlKHBhcmFtKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmxhc2ggU2V0IGZsYXNodmFyIFxcJycgKyBwYXJhbSArICdcXCcgdG8gXFwnJyArIGZsYXNodmFyc1twYXJhbV0gKyAnXFwnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gUXVlcnlTdHJpbmcgcGFyYW1zIHRvIG92ZXJ3cml0ZSBkZWZhdWx0IEZsYXNodmFyc1xuICAgICAgICBmdW5jdGlvbiBxdWVyeVBhcmFtc1RvRmxhc2h2YXJzKHZhcnMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIHBhcmFtIGluIHZhcnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFycy5oYXNPd25Qcm9wZXJ0eShwYXJhbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0Rmxhc2h2YXJGcm9tUXVlcnlTdHJpbmcocGFyYW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWVyeVBhcmFtc1RvRmxhc2h2YXJzKGZsYXNodmFycyk7XG4gICAgICAgIC8vIExvb2sgZm9yIGxvY2FsZSBhbmQgZGVidWcgcGFyYW1zIGlmIHRoZXkgaGF2ZW4ndCBhbHJlYWR5IGJlZW4gZGVmaW5lZFxuICAgICAgICBpZiAoIWZsYXNodmFycy5sb2NhbGUpIHtcbiAgICAgICAgICAgIHNldEZsYXNodmFyRnJvbVF1ZXJ5U3RyaW5nKCdsb2NhbGUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZsYXNodmFycy5kZWJ1Zykge1xuICAgICAgICAgICAgc2V0Rmxhc2h2YXJGcm9tUXVlcnlTdHJpbmcoJ2RlYnVnJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmbGFzaHZhcnMuYncpIHtcbiAgICAgICAgICAgIHNldEZsYXNodmFyRnJvbVF1ZXJ5U3RyaW5nKCdidycpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvKlxuICAgICAqIENoZWNrIHBhdGhzIGZvciBjb3JyZWN0IGZvcm1hdHRpbmdcbiAgICAgKi9cbiAgICBfZm9ybWF0UGF0aHM6IGZ1bmN0aW9uKGZsYXNodmFycykge1xuICAgICAgICAvLyBNYWtlIHN1cmUgcGF0aHMgc3RhcnQgd2l0aCBwcm90b2NvbCBhbmQgZW5kIHdpdGggJy8nXG4gICAgICAgIGZ1bmN0aW9uIGZvcm1hdFBhdGgoaW5wdXQpIHtcbiAgICAgICAgICAgIGlmIChpbnB1dCAmJiBpbnB1dC5sYXN0SW5kZXhPZignLycpICE9PSBpbnB1dC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSBpbnB1dCArICcvJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbnB1dCAmJiBpbnB1dC5zdWJzdHIoMCwgMikgPT09ICcvLycpIHtcbiAgICAgICAgICAgICAgICBpbnB1dCA9IGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sICsgaW5wdXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9ybWF0UGF0aChmbGFzaHZhcnMuYXNzZXRzUGF0aCk7XG4gICAgICAgIGZvcm1hdFBhdGgoZmxhc2h2YXJzLnZpZGVvUGF0aCk7XG4gICAgICAgIGZvcm1hdFBhdGgoZmxhc2h2YXJzLmF1ZGlvUGF0aCk7XG4gICAgICAgIGZvcm1hdFBhdGgoZmxhc2h2YXJzLmFwcFBhdGgpO1xuICAgIH1cblxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBGbGFzaDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gRlBTKGVsKSB7XG5cbiAgICB2YXIgdGltZSA9IDAsXG4gICAgICAgIGZwcyA9IDAsXG4gICAgICAgIGN1cnJlbnRGcHMgPSAwLFxuICAgICAgICBhdmVyYWdlRnBzID0gMCxcbiAgICAgICAgdGlja3MgPSAwLFxuICAgICAgICB0b3RhbEZwcyA9IDAsXG4gICAgICAgIGxhc3RGcHMgPSAwLFxuICAgICAgICBsYXN0QXZlcmFnZSA9IDA7XG5cbiAgICBpZiAoIWVsKSB7XG4gICAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnaWQnLCAnZnBzJyk7XG4gICAgICAgIGVsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgZWwuc3R5bGUudG9wID0gJzBweCc7XG4gICAgICAgIGVsLnN0eWxlLnJpZ2h0ID0gJzBweCc7XG4gICAgICAgIGVsLnN0eWxlLnBhZGRpbmcgPSAnMnB4IDZweCc7XG4gICAgICAgIGVsLnN0eWxlLnpJbmRleCA9ICc5OTk5OSc7XG4gICAgICAgIGVsLnN0eWxlLmJhY2tncm91bmQgPSAnIzAwMCc7XG4gICAgICAgIGVsLnN0eWxlLmNvbG9yID0gJyNmZmYnO1xuICAgICAgICBlbC5zdHlsZS5mb250U2l6ZSA9ICcxMHB4JztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVwb3J0KCkge1xuICAgICAgICBpZiAoY3VycmVudEZwcyA9PT0gbGFzdEZwcyAmJiBhdmVyYWdlRnBzID09PSBsYXN0QXZlcmFnZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RGcHMgPSBjdXJyZW50RnBzO1xuICAgICAgICBsYXN0QXZlcmFnZSA9IGF2ZXJhZ2VGcHM7XG4gICAgICAgIGVsLmlubmVySFRNTCA9ICdGUFM6ICcgKyBjdXJyZW50RnBzICsgJzxiciAvPkFWRTogJyArIGF2ZXJhZ2VGcHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlKG5vdykge1xuICAgICAgICBpZiAobm93ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGltZSA9PT0gMCkge1xuICAgICAgICAgICAgdGltZSA9IG5vdztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub3cgLSAxMDAwID4gdGltZSkge1xuICAgICAgICAgICAgdGltZSA9IG5vdztcbiAgICAgICAgICAgIGN1cnJlbnRGcHMgPSBmcHM7XG4gICAgICAgICAgICBmcHMgPSAwO1xuXG4gICAgICAgICAgICBpZiAoY3VycmVudEZwcyA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aWNrcysrO1xuICAgICAgICAgICAgICAgIHRvdGFsRnBzICs9IGN1cnJlbnRGcHM7XG4gICAgICAgICAgICAgICAgYXZlcmFnZUZwcyA9IE1hdGguZmxvb3IodG90YWxGcHMgLyB0aWNrcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXBvcnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZwcysrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGF1dG9VcGRhdGUoKSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYXV0b1VwZGF0ZSk7XG5cbiAgICAgICAgdXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ2F1dG9VcGRhdGUnOiBhdXRvVXBkYXRlLFxuICAgICAgICAndXBkYXRlJzogdXBkYXRlXG4gICAgfTtcbn1cblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBGUFM7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIEdyYXBoaWNzKGNhbnZhcykge1xuICAgIHRoaXMuaW5pdChjYW52YXMpO1xufVxuXG5HcmFwaGljcy5wcm90b3R5cGUgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24oY2FudmFzKSB7XG4gICAgICAgIGlmIChjYW52YXMpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICAgICAgdGhpcy5zaXplKHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpKSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpO1xuICAgICAgICAgICAgdGhpcy5zaXplKHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jYW52YXMpO1xuICAgICAgICAgICAgdGhpcy5zaXplKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgICAgICB0aGlzLl90ZXh0Rm9udCA9ICdUaW1lcyc7XG4gICAgICAgIHRoaXMuX3RleHRTaXplID0gMTI7XG4gICAgICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5fdGV4dFNpemUgKyAncHggJyArIHRoaXMuX3RleHRGb250O1xuICAgIH0sXG4gICAgc2l6ZTogZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aCB8fCB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQgfHwgd2luZG93LmlubmVySGVpZ2h0O1xuICAgIH0sXG4gICAgY2xlYXI6IGZ1bmN0aW9uKGNvbG9yKSB7XG4gICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBiYWNrZ3JvdW5kOiBmdW5jdGlvbihyLCBnLCBiKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoJ3JnYignICsgciArICcsICcgKyBiICsgJywgJyArIGcgKyAnKScpO1xuICAgIH0sXG4gICAgZmlsbDogZnVuY3Rpb24ociwgZywgYiwgYSkge1xuICAgICAgICBpZiAodHlwZW9mIHIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gcjtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhID0gYSA9PT0gdW5kZWZpbmVkID8gMSA6IGE7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSAncmdiYSgnICsgciArICcsICcgKyBiICsgJywgJyArIGcgKyAnLCAnICsgYSArICcpJztcbiAgICB9LFxuICAgIHN0cm9rZTogZnVuY3Rpb24ociwgZywgYiwgYSkge1xuICAgICAgICBhID0gYSA9PT0gdW5kZWZpbmVkID8gMSA6IGE7XG4gICAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9ICdyZ2JhKCcgKyByICsgJywgJyArIGIgKyAnLCAnICsgZyArICcsICcgKyBhICsgJyknO1xuICAgIH0sXG4gICAgc3Ryb2tlV2VpZ2h0OiBmdW5jdGlvbih3KSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB3O1xuICAgIH0sXG4gICAgbW92ZTogZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICB0aGlzLmNvbnRleHQubW92ZVRvKHgsIHkpO1xuICAgIH0sXG4gICAgbGluZTogZnVuY3Rpb24oeDEsIHkxLCB4MiwgeTIpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmNvbnRleHQubW92ZVRvKHgxLCB5MSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oeDIsIHkyKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIH0sXG4gICAgcmVjdDogZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodCwgYW5nbGUpIHtcbiAgICAgICAgaWYgKGFuZ2xlICE9PSB1bmRlZmluZWQgJiYgYW5nbGUgIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQudHJhbnNsYXRlKHggKyB3aWR0aCAvIDIsIHkgKyBoZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5yb3RhdGUoYW5nbGUpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnJlY3QoLXdpZHRoIC8gMiwgLWhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNpcmNsZTogZnVuY3Rpb24oeCwgeSwgcmFkaXVzKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmFyYyh4LCB5LCByYWRpdXMsIDAsIE1hdGguUEkgKiAyLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gICAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICB9LFxuICAgIHRyaWFuZ2xlOiBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0LCBhbmdsZSkge1xuICAgICAgICBpZiAoYW5nbGUgIT09IHVuZGVmaW5lZCAmJiBhbmdsZSAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUoeCwgeSk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucm90YXRlKGFuZ2xlKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oMCAtIHdpZHRoIC8gMiwgMCArIGhlaWdodCAvIDIpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbygwLCAwIC0gaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKDAgKyB3aWR0aCAvIDIsIDAgKyBoZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbyh4IC0gd2lkdGggLyAyLCB5ICsgaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQubGluZVRvKHgsIHkgLSBoZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oeCArIHdpZHRoIC8gMiwgeSArIGhlaWdodCAvIDIpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdHJpYW5nbGVBQkM6IGZ1bmN0aW9uKHgxLCB5MSwgeDIsIHkyLCB4MywgeTMpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmNvbnRleHQubW92ZVRvKHgxLCB5MSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oeDIsIHkyKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyh4MywgeTMpO1xuICAgICAgICB0aGlzLmNvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGwoKTtcbiAgICB9LFxuICAgIGltYWdlOiBmdW5jdGlvbihpbWcsIHgsIHksIGFuZ2xlKSB7XG4gICAgICAgIGlmIChhbmdsZSAhPT0gdW5kZWZpbmVkICYmIGFuZ2xlICE9PSAwKSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0WCA9IGltZy53aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgb2Zmc2V0WSA9IGltZy5oZWlnaHQgLyAyO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC50cmFuc2xhdGUoeCArIG9mZnNldFgsIHkgKyBvZmZzZXRZKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5yb3RhdGUoYW5nbGUpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShpbWcsIC1vZmZzZXRYLCAtb2Zmc2V0WSk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShpbWcsIHgsIHkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjcm9zczogZnVuY3Rpb24ocmFkaXVzKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbygtcmFkaXVzLCAtcmFkaXVzKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyhyYWRpdXMsIHJhZGl1cyk7XG4gICAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oLXJhZGl1cywgcmFkaXVzKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbyhyYWRpdXMsIC1yYWRpdXMpO1xuICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfSxcbiAgICB0ZXh0OiBmdW5jdGlvbihzdHIsIHgsIHkpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHN0ciwgeCwgeSk7XG4gICAgfSxcbiAgICB0ZXh0Rm9udDogZnVuY3Rpb24oZm9udCkge1xuICAgICAgICB0aGlzLl90ZXh0Rm9udCA9IGZvbnQ7XG4gICAgICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5fdGV4dFNpemUgKyAncHggJyArIGZvbnQ7XG4gICAgfSxcbiAgICB0ZXh0U2l6ZTogZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgICB0aGlzLl90ZXh0U2l6ZSA9IHNpemU7XG4gICAgICAgIHRoaXMuY29udGV4dC5mb250ID0gc2l6ZSArICdweCAnICsgdGhpcy5fdGV4dEZvbnQ7XG4gICAgfSxcbiAgICBvcGVuSW1hZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgd2luID0gd2luZG93Lm9wZW4oJycsICdDYW52YXMgSW1hZ2UnKSxcbiAgICAgICAgICAgIHNyYyA9IHRoaXMuY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG4gICAgICAgIHdpbi5kb2N1bWVudC53cml0ZSgnPGltZyBzcmM9XCInICsgc3JjICtcbiAgICAgICAgICAgICdcIiB3aWR0aD1cIicgKyB0aGlzLndpZHRoICtcbiAgICAgICAgICAgICdcIiBoZWlnaHQ9XCInICsgdGhpcy5oZWlnaHQgKyAnXCIgLz4nKTtcbiAgICB9LFxuICAgIGRvd25sb2FkSW1hZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3JjID0gdGhpcy5jYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKS5yZXBsYWNlKCdpbWFnZS9wbmcnLCAnaW1hZ2Uvb2N0ZXQtc3RyZWFtJyk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gc3JjO1xuICAgIH0sXG4gICAgZ2V0SW1hZ2VEYXRhOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH0sXG4gICAgZ2V0UGl4ZWw6IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgdmFyIGltYWdlRGF0YSA9IHRoaXMuZ2V0SW1hZ2VEYXRhKCk7XG4gICAgICAgIHZhciBpID0gKHggKyB5ICogaW1hZ2VEYXRhLndpZHRoKSAqIDQ7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChpbWFnZURhdGEuZGF0YSwgaSwgaSArIDQpO1xuICAgIH0sXG4gICAgc2V0UGl4ZWw6IGZ1bmN0aW9uKHgsIHksIHIsIGcsIGIsIGEpIHtcbiAgICAgICAgdmFyIGltYWdlRGF0YSA9IHRoaXMuZ2V0SW1hZ2VEYXRhKCk7XG4gICAgICAgIHZhciBpID0gKHggKyB5ICogaW1hZ2VEYXRhLndpZHRoKSAqIDQ7XG4gICAgICAgIGltYWdlRGF0YS5kYXRhW2kgKyAwXSA9IHI7XG4gICAgICAgIGltYWdlRGF0YS5kYXRhW2kgKyAxXSA9IGc7XG4gICAgICAgIGltYWdlRGF0YS5kYXRhW2kgKyAyXSA9IGI7XG4gICAgICAgIGltYWdlRGF0YS5kYXRhW2kgKyAzXSA9IGE7XG4gICAgfSxcbiAgICBlYWNoUGl4ZWw6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgIHZhciBpbWFnZURhdGEgPSB0aGlzLmdldEltYWdlRGF0YSgpO1xuICAgICAgICB2YXIgcGl4ZWxzID0gaW1hZ2VEYXRhLmRhdGE7XG4gICAgICAgIHZhciB3ID0gaW1hZ2VEYXRhLndpZHRoO1xuICAgICAgICB2YXIgaCA9IGltYWdlRGF0YS5oZWlnaHQ7XG5cbiAgICAgICAgdmFyIGwgPSB3ICogaDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIC8vIGdldCBjb2xvciBvZiBwaXhlbFxuICAgICAgICAgICAgdmFyIHIgPSBwaXhlbHNbaSAqIDRdOyAvLyBSZWRcbiAgICAgICAgICAgIHZhciBnID0gcGl4ZWxzW2kgKiA0ICsgMV07IC8vIEdyZWVuXG4gICAgICAgICAgICB2YXIgYiA9IHBpeGVsc1tpICogNCArIDJdOyAvLyBCbHVlXG4gICAgICAgICAgICB2YXIgYSA9IHBpeGVsc1tpICogNCArIDNdOyAvLyBBbHBoYVxuXG4gICAgICAgICAgICAvLyBnZXQgdGhlIHBvc2l0aW9uIG9mIHBpeGVsXG4gICAgICAgICAgICB2YXIgeSA9IE1hdGguZmxvb3IoaSAvIHcpO1xuICAgICAgICAgICAgdmFyIHggPSBpIC0geSAqIHc7XG5cbiAgICAgICAgICAgIGZuKHIsIGcsIGIsIGEsIHgsIHkpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBHcmFwaGljcztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gSW5wdXRDb29yZHMoKSB7XG4gICAgdmFyIHNlbGY7XG4gICAgdmFyIGNhbGN1bGF0ZUNvb3JkcyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZuO1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5wYWdlWE9mZnNldCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGZuID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIHZhciBwWCA9IChlLmNsaWVudFggfHwgMCksXG4gICAgICAgICAgICAgICAgICAgIHBZID0gKGUuY2xpZW50WSB8fCAwKSxcbiAgICAgICAgICAgICAgICAgICAgc1ggPSB3aW5kb3cucGFnZVhPZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgIHNZID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgICAgICAgICAgICAgIHNlbGYueCA9IHBYICsgc1g7XG4gICAgICAgICAgICAgICAgc2VsZi55ID0gcFkgKyBzWTtcbiAgICAgICAgICAgICAgICBzZWxmLnBlcmNlbnRYID0gc2VsZi54IC8gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgICAgICAgc2VsZi5wZXJjZW50WSA9IHNlbGYueSAvIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmbiA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlID0gKGUgJiYgZS5jbGllbnRYKSA/IGUgOiB3aW5kb3cuZXZlbnQ7XG4gICAgICAgICAgICAgICAgdmFyIHBYID0gZS5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICBwWSA9IGUuY2xpZW50WSxcbiAgICAgICAgICAgICAgICAgICAgZCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgYiA9IGRvY3VtZW50LmJvZHksXG4gICAgICAgICAgICAgICAgICAgIHNYID0gTWF0aC5tYXgoZC5zY3JvbGxMZWZ0LCBiLnNjcm9sbExlZnQpLFxuICAgICAgICAgICAgICAgICAgICBzWSA9IE1hdGgubWF4KGQuc2Nyb2xsVG9wLCBiLnNjcm9sbFRvcCk7XG4gICAgICAgICAgICAgICAgc2VsZi54ID0gcFggKyBzWDtcbiAgICAgICAgICAgICAgICBzZWxmLnkgPSBwWSArIHNZO1xuICAgICAgICAgICAgICAgIHNlbGYucGVyY2VudFggPSBzZWxmLnggLyB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgICAgICAgICBzZWxmLnBlcmNlbnRZID0gc2VsZi55IC8gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm47XG4gICAgfSgpKTtcblxuICAgIHNlbGYgPSB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDAsXG4gICAgICAgIHBlcmNlbnRYOiAwLFxuICAgICAgICBwZXJjZW50WTogMCxcbiAgICAgICAgaXNMaXN0ZW5pbmc6IGZhbHNlLFxuXG4gICAgICAgIG9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgY2FsY3VsYXRlQ29vcmRzKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgY2FsY3VsYXRlQ29vcmRzKTtcbiAgICAgICAgICAgIHNlbGYuaXNMaXN0ZW5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIG9mZjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGNhbGN1bGF0ZUNvb3Jkcyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGNhbGN1bGF0ZUNvb3Jkcyk7XG4gICAgICAgICAgICBzZWxmLmlzTGlzdGVuaW5nID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHNlbGY7XG59XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gSW5wdXRDb29yZHM7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBLZXlib2FyZCA9IHJlcXVpcmUoJy4va2V5Ym9hcmQnKTtcblxuZnVuY3Rpb24gS2V5SW5wdXQoKSB7XG4gICAgdmFyIGtleXMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgICAgICAga2V5cy5wdXNoKGZhbHNlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleURvd24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAga2V5c1tldmVudC5rZXlDb2RlXSA9IHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXlVcChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBrZXlzW2V2ZW50LmtleUNvZGVdID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHNlbGYgPSB7XG4gICAgICAgIG9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24sIGZhbHNlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25LZXlVcCwgZmFsc2UpO1xuICAgICAgICB9LFxuICAgICAgICBvZmY6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93biwgZmFsc2UpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBvbktleVVwLCBmYWxzZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzRG93bjogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5c1trZXldO1xuICAgICAgICB9LFxuICAgICAgICBsZWZ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXlzW0tleWJvYXJkLkxFRlRdIHx8IGtleXNbS2V5Ym9hcmQuQV07XG4gICAgICAgIH0sXG4gICAgICAgIHJpZ2h0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXlzW0tleWJvYXJkLlJJR0hUXSB8fCBrZXlzW0tleWJvYXJkLkRdO1xuICAgICAgICB9LFxuICAgICAgICB1cDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5c1tLZXlib2FyZC5VUF0gfHwga2V5c1tLZXlib2FyZC5XXTtcbiAgICAgICAgfSxcbiAgICAgICAgZG93bjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5c1tLZXlib2FyZC5ET1dOXSB8fCBrZXlzW0tleWJvYXJkLlNdO1xuICAgICAgICB9LFxuICAgICAgICBzcGFjZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5c1tLZXlib2FyZC5TUEFDRUJBUl07XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgc2VsZi5vbigpO1xuXG4gICAgcmV0dXJuIHNlbGY7XG59XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gS2V5SW5wdXQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIExpbmtlZExpc3QoKSB7XG5cbiAgICB2YXIgZmlyc3QsXG4gICAgICAgIGxhc3Q7XG5cbiAgICAvKlxuICAgICAgICBpdGVtID0ge1xuICAgICAgICAgICAgJ25leHQnOiBudWxsLFxuICAgICAgICAgICAgJ3ByZXYnOiBudWxsXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXRlbSA9IGxpbmtlZExpc3QuZ2V0Rmlyc3QoKTtcbiAgICAgICAgd2hpbGUoaXRlbSkge1xuICAgICAgICAgICAgLy8gZG8gc3R1ZmZcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLm5leHQ7XG4gICAgICAgIH1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGFkZChpdGVtKSB7XG4gICAgICAgIGlmICghZmlyc3QpIHtcbiAgICAgICAgICAgIGZpcnN0ID0gbGFzdCA9IGl0ZW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgaSA9IGZpcnN0O1xuICAgICAgICAgICAgd2hpbGUgKGkubmV4dCkge1xuICAgICAgICAgICAgICAgIGkgPSBpLm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnNlcnRBZnRlcihpdGVtLCBpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmUoaXRlbSkge1xuICAgICAgICBpZiAoaXRlbS5uZXh0KSB7XG4gICAgICAgICAgICBpdGVtLm5leHQucHJldiA9IGl0ZW0ucHJldjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbS5wcmV2KSB7XG4gICAgICAgICAgICBpdGVtLnByZXYubmV4dCA9IGl0ZW0ubmV4dDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbSA9PT0gZmlyc3QpIHtcbiAgICAgICAgICAgIGZpcnN0ID0gaXRlbS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtID09PSBsYXN0KSB7XG4gICAgICAgICAgICBsYXN0ID0gaXRlbS5wcmV2O1xuICAgICAgICB9XG4gICAgICAgIGl0ZW0ubmV4dCA9IGl0ZW0ucHJldiA9IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIoaXRlbSwgYWZ0ZXIpIHtcbiAgICAgICAgcmVtb3ZlKGl0ZW0pO1xuXG4gICAgICAgIGl0ZW0ucHJldiA9IGFmdGVyO1xuICAgICAgICBpdGVtLm5leHQgPSBhZnRlci5uZXh0O1xuXG4gICAgICAgIGlmICghYWZ0ZXIubmV4dCkge1xuICAgICAgICAgICAgbGFzdCA9IGl0ZW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZnRlci5uZXh0LnByZXYgPSBpdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgYWZ0ZXIubmV4dCA9IGl0ZW07XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKGl0ZW0sIGJlZm9yZSkge1xuICAgICAgICByZW1vdmUoaXRlbSk7XG5cbiAgICAgICAgaXRlbS5wcmV2ID0gYmVmb3JlLnByZXY7XG4gICAgICAgIGl0ZW0ubmV4dCA9IGJlZm9yZTtcblxuICAgICAgICBpZiAoIWJlZm9yZS5wcmV2KSB7XG4gICAgICAgICAgICBmaXJzdCA9IGl0ZW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiZWZvcmUucHJldi5uZXh0ID0gaXRlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJlZm9yZS5wcmV2ID0gaXRlbTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrLCBjYWxsYmFja0NvbnRleHQpIHtcbiAgICAgICAgaWYgKCFmaXJzdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNwbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgICAgIGFyZ3MudW5zaGlmdChudWxsKTsgLy8gbWFrZSBzcGFjZSBmb3IgaXRlbVxuXG4gICAgICAgIHZhciBpdGVtID0gZmlyc3Q7XG4gICAgICAgIHdoaWxlIChpdGVtKSB7XG4gICAgICAgICAgICBhcmdzWzBdID0gaXRlbTtcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KGNhbGxiYWNrQ29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICBpdGVtID0gaXRlbS5uZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0Rmlyc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZpcnN0O1xuICAgICAgICB9LFxuICAgICAgICBnZXRMYXN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBsYXN0O1xuICAgICAgICB9LFxuICAgICAgICBnZXRDb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgICAgICAgdmFyIGkgPSBmaXJzdDtcbiAgICAgICAgICAgIHdoaWxlIChpKSB7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICBpID0gaS5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvdW50O1xuICAgICAgICB9LFxuICAgICAgICAnYWRkJzogYWRkLFxuICAgICAgICAncmVtb3ZlJzogcmVtb3ZlLFxuICAgICAgICAnaW5zZXJ0QWZ0ZXInOiBpbnNlcnRBZnRlcixcbiAgICAgICAgJ2luc2VydEJlZm9yZSc6IGluc2VydEJlZm9yZSxcbiAgICAgICAgJ2ZvckVhY2gnOiBmb3JFYWNoXG4gICAgfTtcbn1cblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBMaW5rZWRMaXN0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJy4vRW1pdHRlcicpO1xuXG5mdW5jdGlvbiBNb3VzZVdoZWVsKHNwZWVkKSB7XG4gICAgc3BlZWQgPSBzcGVlZCB8fCAyO1xuXG4gICAgdmFyIG1vdXNlV2hlZWw7XG5cbiAgICBmdW5jdGlvbiBhZGQoKSB7XG4gICAgICAgIGlmICgnb25tb3VzZXdoZWVsJyBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgbW91c2VXaGVlbEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgbW91c2VXaGVlbEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgICAgaWYgKCdvbm1vdXNld2hlZWwnIGluIHdpbmRvdykge1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCBtb3VzZVdoZWVsSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBtb3VzZVdoZWVsSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW91c2VXaGVlbEhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKCFldmVudCkge1xuICAgICAgICAgICAgZXZlbnQgPSB3aW5kb3cuZXZlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgZGlyZWN0aW9uID0gKGV2ZW50LmRldGFpbCA8IDAgfHwgZXZlbnQud2hlZWxEZWx0YSA+IDApID8gMSA6IC0xO1xuICAgICAgICB2YXIgZGVsdGEgPSBkaXJlY3Rpb24gKiBzcGVlZDtcblxuICAgICAgICBpZiAoZGlyZWN0aW9uID4gMCkge1xuICAgICAgICAgICAgbW91c2VXaGVlbC5lbWl0KCd1cCcsIGRlbHRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vdXNlV2hlZWwuZW1pdCgnZG93bicsIGRlbHRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1vdXNlV2hlZWwuZW1pdCgndXBkYXRlJywgZGVsdGEpO1xuICAgIH1cblxuICAgIGFkZCgpO1xuXG4gICAgbW91c2VXaGVlbCA9IE9iamVjdC5jcmVhdGUoRW1pdHRlci5wcm90b3R5cGUsIHtcbiAgICAgICAgX2V2ZW50czoge1xuICAgICAgICAgICAgdmFsdWU6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIGFkZDoge1xuICAgICAgICAgICAgdmFsdWU6IGFkZFxuICAgICAgICB9LFxuICAgICAgICByZW1vdmU6IHtcbiAgICAgICAgICAgIHZhbHVlOiByZW1vdmVcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUobW91c2VXaGVlbCk7XG59XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gTW91c2VXaGVlbDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gT2JqZWN0UG9vbChUeXBlKSB7XG5cbiAgICB2YXIgcG9vbCA9IFtdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0UG9vbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gcG9vbDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICggcG9vbC5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwb29sLnBvcCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFR5cGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZGlzcG9zZTogZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHBvb2wucHVzaChpbnN0YW5jZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGZpbGw6IGZ1bmN0aW9uKGNvdW50KSB7XG4gICAgICAgICAgICB3aGlsZSAoIHBvb2wubGVuZ3RoIDwgY291bnQgKSB7XG4gICAgICAgICAgICAgICAgcG9vbFtwb29sLmxlbmd0aF0gPSBuZXcgVHlwZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbXB0eTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwb29sID0gW107XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IE9iamVjdFBvb2w7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCcuL2VtaXR0ZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBUb3VjaElucHV0KGVsLCBtaW5Td2lwZURpc3RhbmNlKSB7XG4gICAgZWwgPSBlbCB8fCBkb2N1bWVudC5ib2R5O1xuICAgIG1pblN3aXBlRGlzdGFuY2UgPSBtaW5Td2lwZURpc3RhbmNlIHx8IDEwO1xuXG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIHN0YXJ0OiBbLTEsIC0xXSxcbiAgICAgICAgbW92ZTogWy0xLCAtMV0sXG4gICAgICAgIGVuZDogWy0xLCAtMV0sXG4gICAgICAgIHBvc2l0aW9uOiBbLTEsIC0xXSxcbiAgICAgICAgZGlzdGFuY2U6IFswLCAwXSxcbiAgICAgICAgZGlyZWN0aW9uOiBbJ25vbmUnLCAnbm9uZSddLFxuICAgICAgICB0b3VjaGluZzogZmFsc2UsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IG51bGxcbiAgICB9O1xuXG4gICAgdmFyIHRvdWNoSW5wdXQ7XG5cbiAgICBmdW5jdGlvbiBkZXRlY3RTd2lwZShpLCBhLCBiKSB7XG4gICAgICAgIGRhdGEuZGlzdGFuY2VbaV0gPSBNYXRoLmFicyhkYXRhLnN0YXJ0W2ldIC0gZGF0YS5lbmRbaV0pO1xuICAgICAgICBpZiAoZGF0YS5kaXN0YW5jZVtpXSA+PSBtaW5Td2lwZURpc3RhbmNlKSB7XG4gICAgICAgICAgICBkYXRhLmRpcmVjdGlvbltpXSA9IGRhdGEuc3RhcnRbaV0gPiBkYXRhLm1vdmVbaV0gPyBhIDogYjtcbiAgICAgICAgICAgIHRvdWNoSW5wdXQuZW1pdCgnc3dpcGUnLCBkYXRhLmRpcmVjdGlvbltpXSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b3VjaEhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKCEoZXZlbnQgJiYgZXZlbnQudG91Y2hlcykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkYXRhLm9yaWdpbmFsRXZlbnQgPSBldmVudDtcbiAgICAgICAgdmFyIHRvdWNoID0gZXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgdmFyIHggPSB0b3VjaCAmJiB0b3VjaC5wYWdlWDtcbiAgICAgICAgdmFyIHkgPSB0b3VjaCAmJiB0b3VjaC5wYWdlWTtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3RvdWNoc3RhcnQnOlxuICAgICAgICAgICAgICAgIGRhdGEuc3RhcnRbMF0gPSBkYXRhLm1vdmVbMF0gPSBkYXRhLmVuZFswXSA9IGRhdGEucG9zaXRpb25bMF0gPSB4O1xuICAgICAgICAgICAgICAgIGRhdGEuc3RhcnRbMV0gPSBkYXRhLm1vdmVbMV0gPSBkYXRhLmVuZFsxXSA9IGRhdGEucG9zaXRpb25bMV0gPSB5O1xuICAgICAgICAgICAgICAgIGRhdGEudG91Y2hpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndG91Y2htb3ZlJzpcbiAgICAgICAgICAgICAgICBkYXRhLm1vdmVbMF0gPSBkYXRhLnBvc2l0aW9uWzBdID0geDtcbiAgICAgICAgICAgICAgICBkYXRhLm1vdmVbMV0gPSBkYXRhLnBvc2l0aW9uWzFdID0geTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RvdWNoZW5kJzpcbiAgICAgICAgICAgICAgICBkYXRhLmVuZFswXSA9IGRhdGEucG9zaXRpb25bMF0gPSB4O1xuICAgICAgICAgICAgICAgIGRhdGEuZW5kWzFdID0gZGF0YS5wb3NpdGlvblsxXSA9IHk7XG4gICAgICAgICAgICAgICAgZGF0YS50b3VjaGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICh0b3VjaElucHV0Lmxpc3RlbmVyQ291bnQoJ3N3aXBlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgZGV0ZWN0U3dpcGUoMCwgJ2xlZnQnLCAncmlnaHQnKTtcbiAgICAgICAgICAgICAgICAgICAgZGV0ZWN0U3dpcGUoMSwgJ3VwJywgJ2Rvd24nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdGVuKGVsZW0pIHtcbiAgICAgICAgZWwgPSBlbGVtIHx8IGVsO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaEhhbmRsZXIpO1xuICAgICAgICByZXR1cm4gdG91Y2hJbnB1dDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICB0b3VjaElucHV0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaEhhbmRsZXIpO1xuICAgICAgICBlbCA9IG51bGw7XG4gICAgICAgIHJldHVybiB0b3VjaElucHV0O1xuICAgIH1cblxuICAgIGxpc3RlbihlbCk7XG5cbiAgICB0b3VjaElucHV0ID0gT2JqZWN0LmNyZWF0ZShFdmVudEVtaXR0ZXIucHJvdG90eXBlLCB7XG4gICAgICAgIF9ldmVudHM6IHtcbiAgICAgICAgICAgIHZhbHVlOiB7fVxuICAgICAgICB9LFxuICAgICAgICBsaXN0ZW46IHtcbiAgICAgICAgICAgIHZhbHVlOiBsaXN0ZW5cbiAgICAgICAgfSxcbiAgICAgICAgaXNEb3duOiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEudG91Y2hpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldFRvdWNoOiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRlc3Ryb3k6IHtcbiAgICAgICAgICAgIHZhbHVlOiBkZXN0cm95XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHRvdWNoSW5wdXQpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCcuL0VtaXR0ZXInKTtcblxuZnVuY3Rpb24gVmlkZW9PYmplY3QodmlkZW9FbCkge1xuICAgIHZhciBlbCA9IHZpZGVvRWwgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICB2YXIgcGxheWVyO1xuXG4gICAgdmFyIG1ldGFkYXRhSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgnbWV0YWRhdGEnLCB7XG4gICAgICAgICAgICBzcmM6IGVsLmN1cnJlbnRTcmMsXG4gICAgICAgICAgICB3aWR0aDogZWwudmlkZW9XaWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogZWwudmlkZW9IZWlnaHQsXG4gICAgICAgICAgICBkdXJhdGlvbjogZWwuZHVyYXRpb25cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBjYW5wbGF5SGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgncmVhZHknKTtcbiAgICB9O1xuXG4gICAgdmFyIHBsYXlIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHBsYXllci5lbWl0KCdwbGF5Jyk7XG4gICAgfTtcblxuICAgIHZhciBlbmRlZEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ2VuZGVkJyk7XG4gICAgfTtcblxuICAgIHZhciBlcnJvckhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ2Vycm9yJywgZWwuZXJyb3IpO1xuICAgIH07XG5cbiAgICB2YXIgdGltZXVwZGF0ZUhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3RpbWV1cGRhdGUnLCBlbC5jdXJyZW50VGltZSk7XG4gICAgfTtcblxuICAgIHZhciBhZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZW1vdmVFdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgbWV0YWRhdGFIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgY2FucGxheUhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIHBsYXlIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXlpbmcnLCBwbGF5SGFuZGxlciwgZmFsc2UpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9ySGFuZGxlciwgZmFsc2UpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGVuZGVkSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdGltZXVwZGF0ZUhhbmRsZXIsIGZhbHNlKTtcbiAgICB9O1xuXG4gICAgdmFyIHJlbW92ZUV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgbWV0YWRhdGFIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCBjYW5wbGF5SGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BsYXknLCBwbGF5SGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BsYXlpbmcnLCBwbGF5SGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBlbmRlZEhhbmRsZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdGltZXVwZGF0ZUhhbmRsZXIpO1xuICAgIH07XG5cbiAgICB2YXIgZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBwbGF5ZXIub2ZmKCk7XG4gICAgICAgIGVsLnBhdXNlKCk7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICAgICBpZiAoZWwucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgZWwucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbCk7XG4gICAgICAgIH1cblxuICAgICAgICBlbCA9IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9O1xuXG4gICAgdmFyIGxvYWQgPSBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5CbG9iICYmIHVybCBpbnN0YW5jZW9mIHdpbmRvdy5CbG9iKSB7XG4gICAgICAgICAgICB1cmwgPSBnZXRCbG9iVVJMKHVybCk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICAgICBlbC5jcm9zc09yaWdpbiA9ICdhbm9ueW1vdXMnO1xuICAgICAgICBlbC5wcmVsb2FkID0gJ2F1dG8nO1xuICAgICAgICBlbC5zcmMgPSB1cmw7XG4gICAgICAgIGVsLmxvYWQoKTtcblxuICAgICAgICByZXR1cm4gcGxheWVyO1xuICAgIH07XG5cbiAgICB2YXIgcGxheSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBlbC5wbGF5KCk7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9O1xuXG4gICAgdmFyIHBhdXNlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGVsLnBhdXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9O1xuXG4gICAgdmFyIHNlZWsgPSBmdW5jdGlvbih0aW1lKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBlbC5jdXJyZW50VGltZSA9IHRpbWU7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9O1xuXG4gICAgdmFyIGdldEJsb2JVUkwgPSBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwodXJsKTtcbiAgICAgICAgdmFyIHJldm9rZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCByZXZva2UpO1xuICAgICAgICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgICAgICAgfTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCByZXZva2UpO1xuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH07XG5cbiAgICBhZGRFdmVudExpc3RlbmVycygpO1xuXG4gICAgcGxheWVyID0gT2JqZWN0LmNyZWF0ZShFbWl0dGVyLnByb3RvdHlwZSwge1xuICAgICAgICBfZXZlbnRzOiB7XG4gICAgICAgICAgICB2YWx1ZToge31cbiAgICAgICAgfSxcbiAgICAgICAgZGVzdHJveToge1xuICAgICAgICAgICAgdmFsdWU6IGRlc3Ryb3lcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZDoge1xuICAgICAgICAgICAgdmFsdWU6IGxvYWRcbiAgICAgICAgfSxcbiAgICAgICAgcGF1c2U6IHtcbiAgICAgICAgICAgIHZhbHVlOiBwYXVzZVxuICAgICAgICB9LFxuICAgICAgICBwbGF5OiB7XG4gICAgICAgICAgICB2YWx1ZTogcGxheVxuICAgICAgICB9LFxuICAgICAgICBzZWVrOiB7XG4gICAgICAgICAgICB2YWx1ZTogc2Vla1xuICAgICAgICB9LFxuICAgICAgICBlbDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGN1cnJlbnRUaW1lOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5jdXJyZW50VGltZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZWwuY3VycmVudFRpbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZHVyYXRpb246IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLmR1cmF0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB2b2x1bWU6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLnZvbHVtZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZWwudm9sdW1lID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHBsYXllcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVmlkZW9PYmplY3Q7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBBcnJheVV0aWxzID0ge1xuICAgIGNsb25lOiBmdW5jdGlvbihhcnIpIHtcbiAgICAgICAgcmV0dXJuIGFyci5zbGljZSgwKTtcbiAgICB9LFxuICAgIGdldFJhbmRvbTogZnVuY3Rpb24oYXJyKSB7XG4gICAgICAgIHJldHVybiBhcnJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldO1xuICAgIH0sXG4gICAgaXNBcnJheTogZnVuY3Rpb24oYXJyKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5ID8gQXJyYXkuaXNBcnJheShhcnIpIDogYXJyICYmIGFyciBpbnN0YW5jZW9mIEFycmF5O1xuICAgIH0sXG4gICAgbmVhcmVzdDogZnVuY3Rpb24odmFsdWUsIGFycikge1xuICAgICAgICB2YXIgbGVhc3QgPSBOdW1iZXIuTUFYX1ZBTFVFLCBkaWZmO1xuICAgICAgICByZXR1cm4gYXJyLnJlZHVjZShmdW5jdGlvbihpbmRleCwgaXRlbSwgaSkge1xuICAgICAgICAgICAgZGlmZiA9IE1hdGguYWJzKGl0ZW0gLSB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZGlmZiA8IGxlYXN0KSB7XG4gICAgICAgICAgICAgICAgbGVhc3QgPSBkaWZmO1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSwgLTEpO1xuICAgIH0sXG4gICAgc29ydE51bWVyaWM6IGZ1bmN0aW9uKGFycikge1xuICAgICAgICByZXR1cm4gYXJyLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEgLSBiO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHNvcnRSYW5kb206IGZ1bmN0aW9uKGFycikge1xuICAgICAgICByZXR1cm4gYXJyLnNvcnQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA+IDAuNSA/IC0xIDogMTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBBcnJheVV0aWxzO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXG4vKiBhbmRyb2lkICovXG5cbmZ1bmN0aW9uIGFuZHJvaWQoKSB7XG4gICAgcmV0dXJuICEhdWEubWF0Y2goL0FuZHJvaWQvaSk7XG59XG5cbmZ1bmN0aW9uIGFuZHJvaWRPbGQoKSB7XG4gICAgcmV0dXJuICEhKGFuZHJvaWQoKSAmJiBwYXJzZUZsb2F0KHVhLnNsaWNlKHVhLmluZGV4T2YoJ0FuZHJvaWQnKSArIDgpKSA8IDQpO1xufVxuXG5mdW5jdGlvbiBhbmRyb2lkU3RvY2soKSB7XG4gICAgaWYgKCFhbmRyb2lkKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgcmVnRXhBcHBsZVdlYktpdCA9IG5ldyBSZWdFeHAoL0FwcGxlV2ViS2l0XFwvKFtcXGQuXSspLyk7XG4gICAgdmFyIHJlc3VsdEFwcGxlV2ViS2l0UmVnRXggPSByZWdFeEFwcGxlV2ViS2l0LmV4ZWModWEpO1xuICAgIHZhciBhcHBsZVdlYktpdFZlcnNpb24gPSAocmVzdWx0QXBwbGVXZWJLaXRSZWdFeCA9PT0gbnVsbCA/IG51bGwgOiBwYXJzZUZsb2F0KHJlZ0V4QXBwbGVXZWJLaXQuZXhlYyh1YSlbMV0pKTtcbiAgICB2YXIgaXNBbmRyb2lkQnJvd3NlciA9IGFwcGxlV2ViS2l0VmVyc2lvbiAhPT0gbnVsbCAmJiBhcHBsZVdlYktpdFZlcnNpb24gPCA1Mzc7XG4gICAgcmV0dXJuIGlzQW5kcm9pZEJyb3dzZXI7XG59XG5cbi8qIGRwciAqL1xuXG5mdW5jdGlvbiBkcHIoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvICE9PSB1bmRlZmluZWQgPyB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA6IDE7XG59XG5cbi8qIGllICovXG5cbmZ1bmN0aW9uIGllOGRvd24oKSB7XG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5pbm5lckhUTUwgPSAnPCEtLVtpZiBsdGUgSUUgOF0+PGk+PC9pPjwhW2VuZGlmXS0tPic7XG4gICAgcmV0dXJuIChkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2knKS5sZW5ndGggPT09IDEpO1xufVxuXG5mdW5jdGlvbiBpZTlkb3duKCkge1xuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gJzwhLS1baWYgSUVdPjxpPjwvaT48IVtlbmRpZl0tLT4nO1xuICAgIHJldHVybiAoZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpJykubGVuZ3RoID09PSAxKTtcbn1cblxuZnVuY3Rpb24gaWVWZXJzaW9uKCkge1xuICAgIHZhciBydiA9IC0xLFxuICAgICAgICByZTtcbiAgICBpZiAobmF2aWdhdG9yLmFwcE5hbWUgPT09ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInKSB7XG4gICAgICAgIHJlID0gbmV3IFJlZ0V4cCgnTVNJRSAoWzAtOV17MSx9Wy4wLTldezAsfSknKTtcbiAgICAgICAgaWYgKHJlLmV4ZWModWEpICE9PSBudWxsKSB7XG4gICAgICAgICAgICBydiA9IHBhcnNlRmxvYXQoIFJlZ0V4cC4kMSApO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IuYXBwTmFtZSA9PT0gJ05ldHNjYXBlJykge1xuICAgICAgICByZSA9IG5ldyBSZWdFeHAoJ1RyaWRlbnQvLipydjooWzAtOV17MSx9Wy4wLTldezAsfSknKTtcbiAgICAgICAgaWYgKHJlLmV4ZWModWEpICE9PSBudWxsKSB7XG4gICAgICAgICAgICBydiA9IHBhcnNlRmxvYXQoIFJlZ0V4cC4kMSApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBydjtcbn1cblxuLyogaW9zICovXG5cbmZ1bmN0aW9uIGlvczUoKSB7XG4gICAgcmV0dXJuICEhKHVhLm1hdGNoKC9PUyA1KF9cXGQpKyBsaWtlIE1hYyBPUyBYL2kpKTtcbn1cblxuZnVuY3Rpb24gaXBhZCgpIHtcbiAgICByZXR1cm4gISF1YS5tYXRjaCgvaVBhZC9pKTtcbn1cblxuZnVuY3Rpb24gaXBob25lKCkge1xuICAgIHJldHVybiAhIXVhLm1hdGNoKC9pUGhvbmUvaSk7XG59XG5cbmZ1bmN0aW9uIGlwb2QoKSB7XG4gICAgcmV0dXJuICEhdWEubWF0Y2goL2lQb2QvaSk7XG59XG5cbmZ1bmN0aW9uIGlvcygpIHtcbiAgICByZXR1cm4gKGlwYWQoKSB8fCBpcG9kKCkgfHwgaXBob25lKCkpO1xufVxuXG4vKiBtb2JpbGUgKi9cblxuZnVuY3Rpb24gbW9iaWxlKCkge1xuICAgIHJldHVybiAhIXVhLm1hdGNoKC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kpO1xufVxuXG4vLyBzY3JlZW4ud2lkdGggLyBzY3JlZW4uaGVpZ2h0IGlzIG9mdGVuIHdyb25nIGluIEFuZHJvaWRcblxuZnVuY3Rpb24gc2NyZWVuSGVpZ2h0KCkge1xuICAgIHJldHVybiBNYXRoLm1heCh3aW5kb3cub3V0ZXJIZWlnaHQsIHdpbmRvdy5zY3JlZW4uaGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gc2NyZWVuV2lkdGgoKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KHdpbmRvdy5vdXRlcldpZHRoLCB3aW5kb3cuc2NyZWVuLndpZHRoKTtcbn1cblxudmFyIERldmljZSA9IHtcbiAgICAnYW5kcm9pZCc6IGFuZHJvaWQoKSxcbiAgICAnYW5kcm9pZE9sZCc6IGFuZHJvaWRPbGQoKSxcbiAgICAnYW5kcm9pZFN0b2NrJzogYW5kcm9pZFN0b2NrKCksXG4gICAgJ2Rwcic6IGRwcigpLFxuICAgICdpZThkb3duJzogaWU4ZG93bigpLFxuICAgICdpZTlkb3duJzogaWU5ZG93bigpLFxuICAgICdpZVZlcnNpb24nOiBpZVZlcnNpb24oKSxcbiAgICAnaW9zJzogaW9zKCksXG4gICAgJ2lvczUnOiBpb3M1KCksXG4gICAgJ2lwYWQnOiBpcGFkKCksXG4gICAgJ2lwaG9uZSc6IGlwaG9uZSgpLFxuICAgICdpcG9kJzogaXBvZCgpLFxuICAgICdtb2JpbGUnOiBtb2JpbGUoKSxcbiAgICAncmV0aW5hJzogKGRwcigpID4gMSksXG4gICAgJ3NjcmVlbkhlaWdodCc6IHNjcmVlbkhlaWdodCgpLFxuICAgICdzY3JlZW5XaWR0aCc6IHNjcmVlbldpZHRoKClcbn07XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gRGV2aWNlO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJy4vRW1pdHRlcicpO1xuXG52YXIgRnVsbHNjcmVlbiA9IChmdW5jdGlvbigpIHtcblxuICAgIHZhciBzZWxmLFxuICAgICAgICBkb2NFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcbiAgICAgICAgaXNTdXBwb3J0ZWQgPSAhIShkb2NFbC5yZXF1ZXN0RnVsbFNjcmVlbiB8fFxuICAgICAgICAgICAgZG9jRWwud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICAgIGRvY0VsLm1velJlcXVlc3RGdWxsU2NyZWVuKTtcblxuICAgIGZ1bmN0aW9uIG9uRnVsbHNjcmVlbkNoYW5nZSgpIHtcbiAgICAgICAgc2VsZi5lbWl0KCdjaGFuZ2UnLCBzZWxmLmlzRnVsbHNjcmVlbigpKTtcbiAgICB9XG5cbiAgICBpZiAoaXNTdXBwb3J0ZWQpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZnVsbHNjcmVlbmNoYW5nZScsIG9uRnVsbHNjcmVlbkNoYW5nZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCBvbkZ1bGxzY3JlZW5DaGFuZ2UpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJywgb25GdWxsc2NyZWVuQ2hhbmdlKTtcbiAgICAgICAgLy9kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtc2Z1bGxzY3JlZW5jaGFuZ2UnLCBvbkZ1bGxzY3JlZW5DaGFuZ2UpO1xuICAgIH1cblxuICAgIHNlbGYgPSBPYmplY3QuY3JlYXRlKEVtaXR0ZXIucHJvdG90eXBlLCB7XG4gICAgICAgIF9ldmVudHM6IHtcbiAgICAgICAgICAgIHZhbHVlOiB7fVxuICAgICAgICB9LFxuICAgICAgICBpc1N1cHBvcnRlZDoge1xuICAgICAgICAgICAgdmFsdWU6IGlzU3VwcG9ydGVkXG4gICAgICAgIH0sXG4gICAgICAgIGVudGVyOiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgICBlbCA9IGVsIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuICAgICAgICAgICAgICAgIHZhciBtZXRob2QgPSBlbC5yZXF1ZXN0RnVsbFNjcmVlbiB8fFxuICAgICAgICAgICAgICAgICAgICBlbC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbiB8fFxuICAgICAgICAgICAgICAgICAgICBlbC5tb3pSZXF1ZXN0RnVsbFNjcmVlbjtcblxuICAgICAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmNhbGwoZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXhpdDoge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBtZXRob2QgPSBkb2N1bWVudC5leGl0RnVsbHNjcmVlbiB8fFxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5jYW5jZWxGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdENhbmNlbEZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbjtcblxuICAgICAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmNhbGwoZG9jdW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdG9nZ2xlOiB7XG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0Z1bGxzY3JlZW4oKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4aXQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVudGVyKGVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRnVsbHNjcmVlbjoge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhIShkb2N1bWVudC5mdWxsU2NyZWVuIHx8XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdElzRnVsbFNjcmVlbiB8fFxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5tb3pGdWxsU2NyZWVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNlbGY7XG5cbn0oKSk7XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gRnVsbHNjcmVlbjtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9wb2x5ZmlsbC1jbGFzc2xpc3QnKTtcbnJlcXVpcmUoJy4vcG9seWZpbGwtY29uc29sZScpO1xucmVxdWlyZSgnLi9wb2x5ZmlsbC1yYWYnKTtcblxudmFyIHVzZmwgPSB7fTtcblxudXNmbC5hcnJheSA9IHJlcXVpcmUoJy4vYXJyYXknKTtcbnVzZmwuQXNzZXRMb2FkZXIgPSByZXF1aXJlKCcuL0Fzc2V0TG9hZGVyJyk7XG51c2ZsLkN1ZXBvaW50c1JlYWRlciA9IHJlcXVpcmUoJy4vQ3VlcG9pbnRzUmVhZGVyJyk7XG51c2ZsLmRldmljZSA9IHJlcXVpcmUoJy4vZGV2aWNlJyk7XG51c2ZsLkVtaXR0ZXIgPSByZXF1aXJlKCcuL0VtaXR0ZXInKTtcbnVzZmwuRmFjZWJvb2sgPSByZXF1aXJlKCcuL0ZhY2Vib29rJyk7XG51c2ZsLkZsYXNoID0gcmVxdWlyZSgnLi9GbGFzaCcpO1xudXNmbC5GUFMgPSByZXF1aXJlKCcuL0ZwcycpO1xudXNmbC5mdWxsc2NyZWVuID0gcmVxdWlyZSgnLi9mdWxsc2NyZWVuJyk7XG51c2ZsLkdyYXBoaWNzID0gcmVxdWlyZSgnLi9HcmFwaGljcycpO1xudXNmbC5JbnB1dENvb3JkcyA9IHJlcXVpcmUoJy4vSW5wdXRDb29yZHMnKTtcbnVzZmwua2V5Ym9hcmQgPSByZXF1aXJlKCcuL2tleWJvYXJkJyk7XG51c2ZsLktleUlucHV0ID0gcmVxdWlyZSgnLi9LZXlJbnB1dCcpO1xudXNmbC5MaW5rZWRMaXN0ID0gcmVxdWlyZSgnLi9MaW5rZWRMaXN0Jyk7XG51c2ZsLm1hdGggPSByZXF1aXJlKCcuL21hdGgnKTtcbnVzZmwubW9kZXJuID0gcmVxdWlyZSgnLi9tb2Rlcm4nKTtcbnVzZmwuTW91c2VXaGVlbCA9IHJlcXVpcmUoJy4vTW91c2VXaGVlbCcpO1xudXNmbC5PYmplY3RQb29sID0gcmVxdWlyZSgnLi9PYmplY3RQb29sJyk7XG51c2ZsLnBsYXRmb3JtID0gcmVxdWlyZSgnLi9wbGF0Zm9ybScpO1xudXNmbC5wb3B1cCA9IHJlcXVpcmUoJy4vcG9wdXAnKTtcbnVzZmwucmVhZHkgPSByZXF1aXJlKCcuL3JlYWR5Jyk7XG51c2ZsLnJlc2l6ZSA9IHJlcXVpcmUoJy4vcmVzaXplJyk7XG51c2ZsLnNoYXJlID0gcmVxdWlyZSgnLi9zaGFyZScpO1xudXNmbC5zdG9yYWdlID0gcmVxdWlyZSgnLi9zdG9yYWdlJyk7XG51c2ZsLnN0cmluZyA9IHJlcXVpcmUoJy4vc3RyaW5nJyk7XG51c2ZsLlRvdWNoSW5wdXQgPSByZXF1aXJlKCcuL1RvdWNoSW5wdXQnKTtcbnVzZmwudHJhY2sgPSByZXF1aXJlKCcuL3RyYWNrJyk7XG51c2ZsLnVybFBhcmFtcyA9IHJlcXVpcmUoJy4vdXJsUGFyYW1zJyk7XG51c2ZsLlZpZGVvUGxheWVyID0gcmVxdWlyZSgnLi9WaWRlb1BsYXllcicpO1xudXNmbC5WaWV3cG9ydCA9IHJlcXVpcmUoJy4vdmlld3BvcnQnKTtcbnVzZmwudmlzaWJpbGl0eSA9IHJlcXVpcmUoJy4vdmlzaWJpbGl0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVzZmw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBLZXlib2FyZCA9IHtcbiAgICBBOiAnQScuY2hhckNvZGVBdCgwKSxcbiAgICBCOiAnQicuY2hhckNvZGVBdCgwKSxcbiAgICBDOiAnQycuY2hhckNvZGVBdCgwKSxcbiAgICBEOiAnRCcuY2hhckNvZGVBdCgwKSxcbiAgICBFOiAnRScuY2hhckNvZGVBdCgwKSxcbiAgICBGOiAnRicuY2hhckNvZGVBdCgwKSxcbiAgICBHOiAnRycuY2hhckNvZGVBdCgwKSxcbiAgICBIOiAnSCcuY2hhckNvZGVBdCgwKSxcbiAgICBJOiAnSScuY2hhckNvZGVBdCgwKSxcbiAgICBKOiAnSicuY2hhckNvZGVBdCgwKSxcbiAgICBLOiAnSycuY2hhckNvZGVBdCgwKSxcbiAgICBMOiAnTCcuY2hhckNvZGVBdCgwKSxcbiAgICBNOiAnTScuY2hhckNvZGVBdCgwKSxcbiAgICBOOiAnTicuY2hhckNvZGVBdCgwKSxcbiAgICBPOiAnTycuY2hhckNvZGVBdCgwKSxcbiAgICBQOiAnUCcuY2hhckNvZGVBdCgwKSxcbiAgICBROiAnUScuY2hhckNvZGVBdCgwKSxcbiAgICBSOiAnUicuY2hhckNvZGVBdCgwKSxcbiAgICBTOiAnUycuY2hhckNvZGVBdCgwKSxcbiAgICBUOiAnVCcuY2hhckNvZGVBdCgwKSxcbiAgICBVOiAnVScuY2hhckNvZGVBdCgwKSxcbiAgICBWOiAnVicuY2hhckNvZGVBdCgwKSxcbiAgICBXOiAnVycuY2hhckNvZGVBdCgwKSxcbiAgICBYOiAnWCcuY2hhckNvZGVBdCgwKSxcbiAgICBZOiAnWScuY2hhckNvZGVBdCgwKSxcbiAgICBaOiAnWicuY2hhckNvZGVBdCgwKSxcbiAgICBaRVJPOiAnMCcuY2hhckNvZGVBdCgwKSxcbiAgICBPTkU6ICcxJy5jaGFyQ29kZUF0KDApLFxuICAgIFRXTzogJzInLmNoYXJDb2RlQXQoMCksXG4gICAgVEhSRUU6ICczJy5jaGFyQ29kZUF0KDApLFxuICAgIEZPVVI6ICc0Jy5jaGFyQ29kZUF0KDApLFxuICAgIEZJVkU6ICc1Jy5jaGFyQ29kZUF0KDApLFxuICAgIFNJWDogJzYnLmNoYXJDb2RlQXQoMCksXG4gICAgU0VWRU46ICc3Jy5jaGFyQ29kZUF0KDApLFxuICAgIEVJR0hUOiAnOCcuY2hhckNvZGVBdCgwKSxcbiAgICBOSU5FOiAnOScuY2hhckNvZGVBdCgwKSxcbiAgICBOVU1QQURfMDogOTYsXG4gICAgTlVNUEFEXzE6IDk3LFxuICAgIE5VTVBBRF8yOiA5OCxcbiAgICBOVU1QQURfMzogOTksXG4gICAgTlVNUEFEXzQ6IDEwMCxcbiAgICBOVU1QQURfNTogMTAxLFxuICAgIE5VTVBBRF82OiAxMDIsXG4gICAgTlVNUEFEXzc6IDEwMyxcbiAgICBOVU1QQURfODogMTA0LFxuICAgIE5VTVBBRF85OiAxMDUsXG4gICAgTlVNUEFEX01VTFRJUExZOiAxMDYsXG4gICAgTlVNUEFEX0FERDogMTA3LFxuICAgIE5VTVBBRF9FTlRFUjogMTA4LFxuICAgIE5VTVBBRF9TVUJUUkFDVDogMTA5LFxuICAgIE5VTVBBRF9ERUNJTUFMOiAxMTAsXG4gICAgTlVNUEFEX0RJVklERTogMTExLFxuICAgIEYxOiAxMTIsXG4gICAgRjI6IDExMyxcbiAgICBGMzogMTE0LFxuICAgIEY0OiAxMTUsXG4gICAgRjU6IDExNixcbiAgICBGNjogMTE3LFxuICAgIEY3OiAxMTgsXG4gICAgRjg6IDExOSxcbiAgICBGOTogMTIwLFxuICAgIEYxMDogMTIxLFxuICAgIEYxMTogMTIyLFxuICAgIEYxMjogMTIzLFxuICAgIEYxMzogMTI0LFxuICAgIEYxNDogMTI1LFxuICAgIEYxNTogMTI2LFxuICAgIENPTE9OOiAxODYsXG4gICAgRVFVQUxTOiAxODcsXG4gICAgVU5ERVJTQ09SRTogMTg5LFxuICAgIFFVRVNUSU9OX01BUks6IDE5MSxcbiAgICBUSUxERTogMTkyLFxuICAgIE9QRU5fQlJBQ0tFVDogMjE5LFxuICAgIEJBQ0tXQVJEX1NMQVNIOiAyMjAsXG4gICAgQ0xPU0VEX0JSQUNLRVQ6IDIyMSxcbiAgICBRVU9URVM6IDIyMixcbiAgICBCQUNLU1BBQ0U6IDgsXG4gICAgVEFCOiA5LFxuICAgIENMRUFSOiAxMixcbiAgICBFTlRFUjogMTMsXG4gICAgU0hJRlQ6IDE2LFxuICAgIENPTlRST0w6IDE3LFxuICAgIEFMVDogMTgsXG4gICAgQ0FQU19MT0NLOiAyMCxcbiAgICBFU0M6IDI3LFxuICAgIFNQQUNFQkFSOiAzMixcbiAgICBQQUdFX1VQOiAzMyxcbiAgICBQQUdFX0RPV046IDM0LFxuICAgIEVORDogMzUsXG4gICAgSE9NRTogMzYsXG4gICAgTEVGVDogMzcsXG4gICAgVVA6IDM4LFxuICAgIFJJR0hUOiAzOSxcbiAgICBET1dOOiA0MCxcbiAgICBJTlNFUlQ6IDQ1LFxuICAgIERFTEVURTogNDYsXG4gICAgSEVMUDogNDcsXG4gICAgTlVNX0xPQ0s6IDE0NFxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBLZXlib2FyZDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIERFRyA9IDE4MCAvIE1hdGguUEk7XG52YXIgUkFEID0gTWF0aC5QSSAvIDE4MDtcblxudmFyIE1hdGhVdGlscyA9IHtcbiAgICBhbmdsZTogZnVuY3Rpb24oeDEsIHkxLCB4MiwgeTIpIHtcbiAgICAgICAgdmFyIGR4ID0geDIgLSB4MTtcbiAgICAgICAgdmFyIGR5ID0geTIgLSB5MTtcbiAgICAgICAgcmV0dXJuIE1hdGguYXRhbjIoZHksIGR4KTtcbiAgICB9LFxuICAgIGNsYW1wOiBmdW5jdGlvbih2YWx1ZSwgbWluLCBtYXgpIHtcbiAgICAgICAgaWYgKG1pbiA+IG1heCkge1xuICAgICAgICAgICAgdmFyIGEgPSBtaW47XG4gICAgICAgICAgICBtaW4gPSBtYXg7XG4gICAgICAgICAgICBtYXggPSBhO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA8IG1pbikge1xuICAgICAgICAgICAgcmV0dXJuIG1pbjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUgPiBtYXgpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgY29pblRvc3M6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA+IDAuNTtcbiAgICB9LFxuICAgIGNyb3NzUHJvZHVjdDogZnVuY3Rpb24oYVgsIGFZLCBiWCwgYlkpIHtcbiAgICAgICAgLypcbiAgICAgICAgVGhlIHNpZ24gdGVsbHMgdXMgaWYgYSBpcyB0byB0aGUgbGVmdCAoLSkgb3IgdGhlIHJpZ2h0ICgrKSBvZiBiXG4gICAgICAgICovXG4gICAgICAgIHJldHVybiBhWCAqIGJZIC0gYVkgKiBiWDtcbiAgICB9LFxuICAgIGRlZ3JlZXM6IGZ1bmN0aW9uKHJhZGlhbnMpIHtcbiAgICAgICAgcmV0dXJuIHJhZGlhbnMgKiBERUc7XG4gICAgfSxcbiAgICBkaWZmZXJlbmNlOiBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmFicyhhIC0gYik7XG4gICAgfSxcbiAgICBkaXN0YW5jZTogZnVuY3Rpb24oeDEsIHkxLCB4MiwgeTIpIHtcbiAgICAgICAgdmFyIHNxID0gTWF0aFV0aWxzLmRpc3RhbmNlU1EoeDEsIHkxLCB4MiwgeTIpO1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHNxKTtcbiAgICB9LFxuICAgIGRpc3RhbmNlU1E6IGZ1bmN0aW9uKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgICAgIHZhciBkeCA9IHgxIC0geDI7XG4gICAgICAgIHZhciBkeSA9IHkxIC0geTI7XG4gICAgICAgIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICB9LFxuICAgIGRvdFByb2R1Y3Q6IGZ1bmN0aW9uKGFYLCBhWSwgYlgsIGJZKSB7XG4gICAgICAgIC8qXG4gICAgICAgIC0gSWYgQSBhbmQgQiBhcmUgcGVycGVuZGljdWxhciAoYXQgOTAgZGVncmVlcyB0byBlYWNoIG90aGVyKSwgdGhlIHJlc3VsdFxuICAgICAgICAgIG9mIHRoZSBkb3QgcHJvZHVjdCB3aWxsIGJlIHplcm8sIGJlY2F1c2UgY29zKM6YKSB3aWxsIGJlIHplcm8uXG4gICAgICAgIC0gSWYgdGhlIGFuZ2xlIGJldHdlZW4gQSBhbmQgQiBhcmUgbGVzcyB0aGFuIDkwIGRlZ3JlZXMsIHRoZSBkb3QgcHJvZHVjdFxuICAgICAgICAgIHdpbGwgYmUgcG9zaXRpdmUgKGdyZWF0ZXIgdGhhbiB6ZXJvKSwgYXMgY29zKM6YKSB3aWxsIGJlIHBvc2l0aXZlLCBhbmRcbiAgICAgICAgICB0aGUgdmVjdG9yIGxlbmd0aHMgYXJlIGFsd2F5cyBwb3NpdGl2ZSB2YWx1ZXMuXG4gICAgICAgIC0gSWYgdGhlIGFuZ2xlIGJldHdlZW4gQSBhbmQgQiBhcmUgZ3JlYXRlciB0aGFuIDkwIGRlZ3JlZXMsIHRoZSBkb3RcbiAgICAgICAgICBwcm9kdWN0IHdpbGwgYmUgbmVnYXRpdmUgKGxlc3MgdGhhbiB6ZXJvKSwgYXMgY29zKM6YKSB3aWxsIGJlIG5lZ2F0aXZlLFxuICAgICAgICAgIGFuZCB0aGUgdmVjdG9yIGxlbmd0aHMgYXJlIGFsd2F5cyBwb3NpdGl2ZSB2YWx1ZXNcbiAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIGFYICogYlggKyBhWSAqIGJZO1xuICAgIH0sXG4gICAgZ2V0Q2lyY2xlUG9pbnRzOiBmdW5jdGlvbihvcmlnaW5YLCBvcmlnaW5ZLCByYWRpdXMsIGNvdW50LCBzdGFydCwgQ2xhc3MpIHtcbiAgICAgICAgc3RhcnQgPSBzdGFydCA9PT0gdW5kZWZpbmVkID8gLU1hdGguUEkgLyAyIDogc3RhcnQ7XG4gICAgICAgIHZhciBwb2ludHMgPSBbXSxcbiAgICAgICAgICAgIGNpcmMgPSBNYXRoLlBJICogMixcbiAgICAgICAgICAgIGluY3IgPSBjaXJjIC8gY291bnQsXG4gICAgICAgICAgICBvYjtcbiAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgY2lyYyArIHN0YXJ0OyBpICs9IGluY3IpIHtcbiAgICAgICAgICAgIG9iID0gQ2xhc3MgPT09IHVuZGVmaW5lZCA/IHt9IDogbmV3IENsYXNzKCk7XG4gICAgICAgICAgICBvYi54ID0gb3JpZ2luWCArIHJhZGl1cyAqIE1hdGguY29zKGkpO1xuICAgICAgICAgICAgb2IueSA9IG9yaWdpblkgKyByYWRpdXMgKiBNYXRoLnNpbihpKTtcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKG9iKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcG9pbnRzO1xuICAgIH0sXG4gICAgZ2V0SW50ZXJzZWN0aW9uQXJlYTogZnVuY3Rpb24oYVgsIGFZLCBhVywgYUgsIGJYLCBiWSwgYlcsIGJIKSB7XG4gICAgICAgIHZhciBvdmVybGFwWCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGFYICsgYVcsIGJYICsgYlcpIC0gTWF0aC5tYXgoYVgsIGJYKSk7XG4gICAgICAgIHZhciBvdmVybGFwWSA9IE1hdGgubWF4KDAsIE1hdGgubWluKGFZICsgYUgsIGJZICsgYkgpIC0gTWF0aC5tYXgoYVksIGJZKSk7XG4gICAgICAgIHJldHVybiBvdmVybGFwWCAqIG92ZXJsYXBZO1xuICAgIH0sXG4gICAgZ2V0T3ZlcmxhcFg6IGZ1bmN0aW9uKGFYLCBhVywgYlgsIGJXKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihhWCArIGFXLCBiWCArIGJXKSAtIE1hdGgubWF4KGFYLCBiWCkpO1xuICAgIH0sXG4gICAgZ2V0T3ZlcmxhcFk6IGZ1bmN0aW9uKGFZLCBhSCwgYlksIGJIKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihhWSArIGFILCBiWSArIGJIKSAtIE1hdGgubWF4KGFZLCBiWSkpO1xuICAgIH0sXG4gICAgbGVycDogZnVuY3Rpb24oZnJvbSwgdG8sIHBlcmNlbnQpIHtcbiAgICAgICAgcmV0dXJuIGZyb20gKyAodG8gLSBmcm9tKSAqIHBlcmNlbnQ7XG4gICAgfSxcbiAgICBtYXA6IGZ1bmN0aW9uKHYsIGEsIGIsIHgsIHkpIHtcbiAgICAgICAgLy8gdmFsdWUsIG1pbiBleHBlY3RlZCwgbWF4IGV4cGVjdGVkLCBtYXAgbWluLCBtYXAgbWF4XG4gICAgICAgIC8vIGUuZy4gbWFwIHNvbWUgdmFsdWUgYmV0d2VlbiAwIHRvIDEwMCB0byAtNTAgdG8gNTBcbiAgICAgICAgLy8gbWFwKDUwLCAwLCAxMDAsIC01MCwgNTApIC8vIDBcbiAgICAgICAgLy8gbWFwKDI1LCAwLCAxMDAsIC01MCwgNTApIC8vIC0yNVxuICAgICAgICByZXR1cm4gKHYgPT09IGEpID8geCA6ICh2IC0gYSkgKiAoeSAtIHgpIC8gKGIgLSBhKSArIHg7XG4gICAgfSxcbiAgICByYWRpYW5zOiBmdW5jdGlvbihkZWdyZWVzKSB7XG4gICAgICAgIHJldHVybiBkZWdyZWVzICogUkFEO1xuICAgIH0sXG4gICAgcmFuZG9tOiBmdW5jdGlvbihtaW4sIG1heCkge1xuICAgICAgICBpZiAoaXNOYU4obWF4KSkge1xuICAgICAgICAgICAgbWF4ID0gbWluO1xuICAgICAgICAgICAgbWluID0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWluICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pO1xuICAgIH0sXG4gICAgcm90YXRlVG9ERUc6IGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgdmFyIGRpZmYgPSAoZW5kIC0gc3RhcnQpICUgMzYwO1xuICAgICAgICBpZiAoZGlmZiAhPT0gZGlmZiAlIDE4MCkge1xuICAgICAgICAgICAgZGlmZiA9IChkaWZmIDwgMCkgPyBkaWZmICsgMzYwIDogZGlmZiAtIDM2MDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhcnQgKyBkaWZmO1xuICAgIH0sXG4gICAgcm90YXRlVG9SQUQ6IGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgdmFyIFBJMiA9IE1hdGguUEkgKiAyO1xuICAgICAgICB2YXIgZGlmZiA9IChlbmQgLSBzdGFydCkgJSBQSTI7XG4gICAgICAgIGlmIChkaWZmICE9PSBkaWZmICUgTWF0aC5QSSkge1xuICAgICAgICAgICAgZGlmZiA9IGRpZmYgPCAwID8gZGlmZiArIFBJMiA6IGRpZmYgLSBQSTI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXJ0ICsgZGlmZjtcbiAgICB9LFxuICAgIHJvdW5kVG9OZWFyZXN0OiBmdW5jdGlvbih2YWx1ZSwgdW5pdCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAvIHVuaXQpICogdW5pdDtcbiAgICB9XG59O1xuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IE1hdGhVdGlscztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1vZGVybiA9IChmdW5jdGlvbigpIHtcblxuICAgIHZhciBpb3M1ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gISEobmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvT1MgNShfXFxkKSsgbGlrZSBNYWMgT1MgWC9pKSk7XG4gICAgfSgpKTtcblxuICAgIHZhciBhbmRyb2lkT2xkID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgICByZXR1cm4gISEodWEubWF0Y2goL0FuZHJvaWQvaSkgJiYgcGFyc2VGbG9hdCh1YS5zbGljZSh1YS5pbmRleE9mKCdBbmRyb2lkJykgKyA4KSkgPCA0KTtcbiAgICB9KCkpO1xuXG4gICAgdmFyIGFuZHJvaWRTdG9jayA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICAgICAgdmFyIHJlZ0V4QXBwbGVXZWJLaXQgPSBuZXcgUmVnRXhwKC9BcHBsZVdlYktpdFxcLyhbXFxkLl0rKS8pO1xuICAgICAgICB2YXIgcmVzdWx0QXBwbGVXZWJLaXRSZWdFeCA9IHJlZ0V4QXBwbGVXZWJLaXQuZXhlYyh1YSk7XG4gICAgICAgIHZhciBhcHBsZVdlYktpdFZlcnNpb24gPSAocmVzdWx0QXBwbGVXZWJLaXRSZWdFeCA9PT0gbnVsbCA/IG51bGwgOiBwYXJzZUZsb2F0KHJlZ0V4QXBwbGVXZWJLaXQuZXhlYyh1YSlbMV0pKTtcbiAgICAgICAgdmFyIGlzQW5kcm9pZEJyb3dzZXIgPSB1YS5tYXRjaCgvQW5kcm9pZC9pKSAmJiBhcHBsZVdlYktpdFZlcnNpb24gIT09IG51bGwgJiYgYXBwbGVXZWJLaXRWZXJzaW9uIDwgNTM3O1xuICAgICAgICByZXR1cm4gaXNBbmRyb2lkQnJvd3NlcjtcbiAgICB9KCkpO1xuXG4gICAgdmFyIGllOURvd24gPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2LmlubmVySFRNTCA9ICc8IS0tW2lmIElFXT48aT48L2k+PCFbZW5kaWZdLS0+JztcbiAgICAgICAgcmV0dXJuIChkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2knKS5sZW5ndGggPT09IDEpO1xuICAgIH0oKSk7XG5cbiAgICB2YXIgZXM1ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAneCcsIHt9KTtcbiAgICAgICAgICAgIE9iamVjdC5jcmVhdGUoe30pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSgpKTtcblxuICAgIHZhciBjYW52YXMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICByZXR1cm4gISEoZWwuZ2V0Q29udGV4dCAmJiBlbC5nZXRDb250ZXh0KCcyZCcpKTtcbiAgICB9KCkpO1xuXG4gICAgdmFyIHNtYWxsVmlld3BvcnQgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCggd2luZG93LnNjcmVlbi53aWR0aCwgd2luZG93LnNjcmVlbi5oZWlnaHQsIHdpbmRvdy5vdXRlcldpZHRoLCB3aW5kb3cub3V0ZXJIZWlnaHQgKSA8PSA0ODA7XG4gICAgfSgpKTtcblxuICAgIHJldHVybiAhIShjYW52YXMgJiYgZXM1ICYmICEoaW9zNSB8fCBhbmRyb2lkT2xkIHx8IGFuZHJvaWRTdG9jayB8fCBpZTlEb3duIHx8IHNtYWxsVmlld3BvcnQpKTtcblxufSgpKTtcblxuaWYgKHdpbmRvdy5Nb2Rlcm5penIpIHtcbiAgICB3aW5kb3cuTW9kZXJuaXpyLmFkZFRlc3QoJ21vZGVybicsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbW9kZXJuO1xuICAgIH0pO1xufSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gbW9kZXJuO1xufVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH1cbiAgICAgIHRocm93IFR5cGVFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4nKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXG4vLyBvc1xudmFyIGFuZHJvaWQgPSAvQW5kcm9pZC8udGVzdCh1YSk7XG52YXIgaW9zID0gL2lQW2FvXWR8aVBob25lL2kudGVzdCh1YSk7XG52YXIgbGludXggPSAvTGludXgvLnRlc3QodWEpO1xudmFyIG9zeCA9ICFpb3MgJiYgL01hYyBPUy8udGVzdCh1YSk7XG52YXIgd2luZG93c1Bob25lID0gL1dpbmRvd3MgUGhvbmUvaS50ZXN0KHVhKTtcbnZhciB3aW5kb3dzID0gIXdpbmRvd3NQaG9uZSAmJiAvV2luZG93cy8udGVzdCh1YSk7XG5cbi8vIGRldmljZVxudmFyIGlwYWQgPSAvaVBhZC9pLnRlc3QodWEpO1xudmFyIGlwb2QgPSAvaVBvZC9pLnRlc3QodWEpO1xudmFyIGlwaG9uZSA9IC9pUGhvbmUvaS50ZXN0KHVhKTtcbnZhciBtb2JpbGUgPSAhIXVhLm1hdGNoKC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pfFdpbmRvd3MgUGhvbmV8U3ltYmlhbk9TL2kpO1xudmFyIGRlc2t0b3AgPSAhbW9iaWxlO1xuXG4vLyB2ZXJzaW9uXG52YXIgYW5kcm9pZFZlcnNpb24gPSAoZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFhbmRyb2lkKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodWEuc2xpY2UodWEuaW5kZXhPZignQW5kcm9pZCcpICsgOCkpO1xufSgpKTtcblxudmFyIGlvc1ZlcnNpb24gPSAoZnVuY3Rpb24oKSB7XG4gICAgaWYgKC9pUFthb11kfGlQaG9uZS9pLnRlc3QodWEpKSB7XG4gICAgICAgIHZhciBtYXRjaGVzID0gdWEubWF0Y2goL09TIChcXGQrKV8oXFxkKykvaSk7XG4gICAgICAgIGlmIChtYXRjaGVzICYmIG1hdGNoZXMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQobWF0Y2hlc1sxXSArICcuJyArIG1hdGNoZXNbMl0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn0oKSk7XG5cbi8vIGJyb3dzZXJcbnZhciBhbmRyb2lkU3RvY2tCcm93c2VyID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBtYXRjaGVzID0gdWEubWF0Y2goL0FuZHJvaWQuKkFwcGxlV2ViS2l0XFwvKFtcXGQuXSspLyk7XG4gICAgcmV0dXJuICEhbWF0Y2hlcyAmJiBtYXRjaGVzWzFdIDwgNTM3O1xufSgpKTtcblxudmFyIGllVmVyc2lvbiA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IC0xO1xuICAgIGlmICgvTVNJRSAoXFxkK1xcLlxcZCspOy8udGVzdCh1YSkpIHtcbiAgICAgICAgdiA9IHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApO1xuICAgIH0gZWxzZSBpZiAoL1RyaWRlbnRcXC8oXFxkK1xcLlxcZCspKC4qKXJ2OihcXGQrXFwuXFxkKykvLnRlc3QodWEpKSB7XG4gICAgICAgIHYgPSBwYXJzZUludChSZWdFeHAuJDMsIDEwKTtcbiAgICB9XG4gICAgcmV0dXJuIHY7XG59KCkpO1xuXG52YXIgY2hyb21lID0gL0Nocm9tZS8udGVzdCh1YSk7XG52YXIgZmlyZWZveCA9IC9GaXJlZm94Ly50ZXN0KHVhKTtcbnZhciBmaXJlZm94VmVyc2lvbiA9IChmdW5jdGlvbigpIHtcbiAgICBpZiAoIWZpcmVmb3gpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2VGbG9hdCh1YS5zbGljZSh1YS5pbmRleE9mKCdGaXJlZm94JykgKyA4KSk7XG59KCkpO1xudmFyIGllID0gaWVWZXJzaW9uID4gLTE7XG52YXIgb3BlcmEgPSAvT3BlcmEvLnRlc3QodWEpO1xudmFyIHNhZmFyaSA9ICFhbmRyb2lkU3RvY2tCcm93c2VyICYmICFjaHJvbWUgJiYgL1NhZmFyaS8udGVzdCh1YSk7XG52YXIgc2FmYXJpTW9iaWxlID0gaW9zICYmIC9BcHBsZVdlYktpdC8udGVzdCh1YSk7XG52YXIgY2hyb21laU9TID0gaW9zICYmIC9DcmlPUy8udGVzdCh1YSk7XG5cbi8vIGxvY2FsXG52YXIgbG9jYWwgPSAvXig/Omh0dHBzPzpcXC9cXC8pPyg/OmxvY2FsaG9zdHwxOTJcXC4xNjgpLy50ZXN0KHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuLy8gZXhwb3J0XG5cbnZhciBwbGF0Zm9ybSA9IE9iamVjdC5mcmVlemUoe1xuICAgIGJyb3dzZXI6IHtcbiAgICAgICAgYW5kcm9pZFN0b2NrQnJvd3NlcjogYW5kcm9pZFN0b2NrQnJvd3NlcixcbiAgICAgICAgY2hyb21lOiBjaHJvbWUsXG4gICAgICAgIGNocm9tZWlPUzogY2hyb21laU9TLFxuICAgICAgICBmaXJlZm94OiBmaXJlZm94LFxuICAgICAgICBmaXJlZm94VmVyc2lvbjogZmlyZWZveFZlcnNpb24sXG4gICAgICAgIGllOiBpZSxcbiAgICAgICAgaWVWZXJzaW9uOiBpZVZlcnNpb24sXG4gICAgICAgIG9wZXJhOiBvcGVyYSxcbiAgICAgICAgc2FmYXJpOiBzYWZhcmksXG4gICAgICAgIHNhZmFyaU1vYmlsZTogc2FmYXJpTW9iaWxlXG4gICAgfSxcbiAgICBkZXZpY2U6IHtcbiAgICAgICAgZGVza3RvcDogZGVza3RvcCxcbiAgICAgICAgaXBhZDogaXBhZCxcbiAgICAgICAgaXBob25lOiBpcGhvbmUsXG4gICAgICAgIGlwb2Q6IGlwb2QsXG4gICAgICAgIG1vYmlsZTogbW9iaWxlXG4gICAgfSxcbiAgICBvczoge1xuICAgICAgICBhbmRyb2lkOiBhbmRyb2lkLFxuICAgICAgICBpb3M6IGlvcyxcbiAgICAgICAgbGludXg6IGxpbnV4LFxuICAgICAgICBvc3g6IG9zeCxcbiAgICAgICAgd2luZG93czogd2luZG93cyxcbiAgICAgICAgd2luZG93c1Bob25lOiB3aW5kb3dzUGhvbmUsXG4gICAgICAgIGFuZHJvaWRWZXJzaW9uOiBhbmRyb2lkVmVyc2lvbixcbiAgICAgICAgaW9zVmVyc2lvbjogaW9zVmVyc2lvblxuICAgIH0sXG4gICAgbG9jYWw6IGxvY2FsXG59KTtcblxuLy8gY29uc29sZS5sb2coJy0tPicsIHVhKTtcbi8vIGNvbnNvbGUubG9nKCctLT4nLCBwbGF0Zm9ybSk7XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gcGxhdGZvcm07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qXG4gKiBjbGFzc0xpc3QgKGllMTAgYW5kIGllMTEgcGFydGlhbCBwb2x5ZmlsbClcbiAqIGFkYXB0ZWQgZnJvbTogaHR0cHM6Ly9naXRodWIuY29tL2VsaWdyZXkvY2xhc3NMaXN0LmpzL2Jsb2IvbWFzdGVyL2NsYXNzTGlzdC5qc1xuICovXG5cbihmdW5jdGlvbigpIHtcblxuICAgIHZhciB0ZXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ18nKTtcblxuICAgIHRlc3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2MxJywgJ2MyJyk7XG5cbiAgICAvLyBQb2x5ZmlsbCBmb3IgSUUgMTAvMTEgYW5kIEZpcmVmb3ggPDI2LCB3aGVyZSBjbGFzc0xpc3QuYWRkIGFuZFxuICAgIC8vIGNsYXNzTGlzdC5yZW1vdmUgZXhpc3QgYnV0IHN1cHBvcnQgb25seSBvbmUgYXJndW1lbnQgYXQgYSB0aW1lLlxuICAgIGlmICghdGVzdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjMicpKSB7XG4gICAgICAgIHZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbCA9IHdpbmRvdy5ET01Ub2tlbkxpc3QucHJvdG90eXBlW21ldGhvZF07XG5cbiAgICAgICAgICAgIHdpbmRvdy5ET01Ub2tlbkxpc3QucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgICAgIHZhciBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbC5jYWxsKHRoaXMsIHRva2VuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBjcmVhdGVNZXRob2QoJ2FkZCcpO1xuICAgICAgICBjcmVhdGVNZXRob2QoJ3JlbW92ZScpO1xuICAgIH1cblxuICAgIHRlc3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2MzJywgZmFsc2UpO1xuXG4gICAgLy8gUG9seWZpbGwgZm9yIElFIDEwIGFuZCBGaXJlZm94IDwyNCwgd2hlcmUgY2xhc3NMaXN0LnRvZ2dsZSBkb2VzIG5vdFxuICAgIC8vIHN1cHBvcnQgdGhlIHNlY29uZCBhcmd1bWVudC5cbiAgICBpZiAodGVzdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjMycpKSB7XG4gICAgICAgIHZhciBfdG9nZ2xlID0gd2luZG93LkRPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlO1xuXG4gICAgICAgIHdpbmRvdy5ET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKHRva2VuLCBmb3JjZSkge1xuICAgICAgICAgICAgZm9yY2UgPSAhIWZvcmNlO1xuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIHRoaXMuY29udGFpbnModG9rZW4pID09PSBmb3JjZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JjZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90b2dnbGUuY2FsbCh0aGlzLCB0b2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdGVzdEVsZW1lbnQgPSBudWxsO1xufSgpKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uKGZuKSB7XG4gICAgd2luZG93LmNvbnNvbGUgPSB3aW5kb3cuY29uc29sZSB8fCB7fTtcbiAgICB2YXIgbWV0aG9kcyA9IFtcbiAgICAgICAgJ2Fzc2VydCcsXG4gICAgICAgICdjbGVhcicsXG4gICAgICAgICdjb3VudCcsXG4gICAgICAgICdkZWJ1ZycsXG4gICAgICAgICdkaXInLFxuICAgICAgICAnZGlyeG1sJyxcbiAgICAgICAgJ2Vycm9yJyxcbiAgICAgICAgJ2dyb3VwJyxcbiAgICAgICAgJ2dyb3VwQ29sbGFwc2VkJyxcbiAgICAgICAgJ2dyb3VwRW5kJyxcbiAgICAgICAgJ2luZm8nLFxuICAgICAgICAnbG9nJyxcbiAgICAgICAgJ21hcmtUaW1lbGluZScsXG4gICAgICAgICdtZW1vcnknLFxuICAgICAgICAncHJvZmlsZScsXG4gICAgICAgICdwcm9maWxlRW5kJyxcbiAgICAgICAgJ3RhYmxlJyxcbiAgICAgICAgJ3RpbWUnLFxuICAgICAgICAndGltZUVuZCcsXG4gICAgICAgICd0aW1lU3RhbXAnLFxuICAgICAgICAndGltZWxpbmUnLFxuICAgICAgICAndGltZWxpbmVFbmQnLFxuICAgICAgICAndHJhY2UnLFxuICAgICAgICAnd2FybidcbiAgICBdO1xuICAgIHZhciBtZXRob2ROYW1lO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWV0aG9kcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBtZXRob2ROYW1lID0gbWV0aG9kc1tpXTtcbiAgICAgICAgd2luZG93LmNvbnNvbGVbbWV0aG9kTmFtZV0gPSB3aW5kb3cuY29uc29sZVttZXRob2ROYW1lXSB8fCBmbjtcbiAgICB9XG59KGZ1bmN0aW9uKCkge30pKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uKCkge1xuICAgIC8vIGlvczYsIGllMTAsIGFuZHJvaWQgPCA0LjRcbiAgICB2YXIgdmVuZG9ycyA9IFsnbXMnLCAnbW96JywgJ3dlYmtpdCcsICdvJ107XG4gICAgZm9yICh2YXIgeCA9IDA7IHggPCB2ZW5kb3JzLmxlbmd0aCAmJiAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgKyt4KSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSArICdSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93W3ZlbmRvcnNbeF0gKyAnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXSB8fFxuICAgICAgICB3aW5kb3dbdmVuZG9yc1t4XSArICdDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcbiAgICB9XG4gICAgLy8gaWUgPCAxMFxuICAgIGlmICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuICAgICAgICB2YXIgbGFzdFRpbWUgPSAwO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBjdXJyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgdmFyIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSk7XG4gICAgICAgICAgICB2YXIgaWQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhjdXJyVGltZSArIHRpbWVUb0NhbGwpO1xuICAgICAgICAgICAgfSwgdGltZVRvQ2FsbCk7XG4gICAgICAgICAgICBsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfTtcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChpZCk7XG4gICAgICAgIH07XG4gICAgfVxufSgpKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHBvcHVwID0gZnVuY3Rpb24gKHVybCwgbmFtZSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHZhciBsZWZ0ID0gKHNjcmVlbi53aWR0aCAtIHdpZHRoKSAvIDI7XG4gICAgdmFyIHRvcCA9IChzY3JlZW4uaGVpZ2h0IC0gaGVpZ2h0KSAvIDI7XG4gICAgdmFyIHBhcmFtcyA9ICd3aWR0aD0nICsgd2lkdGggKyAnLCBoZWlnaHQ9JyArIGhlaWdodCArXG4gICAgJywgdG9wPScgKyB0b3AgKyAnLCBsZWZ0PScgKyBsZWZ0ICtcbiAgICAnLCBkaXJlY3Rvcmllcz1ubycgK1xuICAgICcsIGxvY2F0aW9uPW5vJyArXG4gICAgJywgbWVudWJhcj1ubycgK1xuICAgICcsIHJlc2l6YWJsZT1ubycgK1xuICAgICcsIHNjcm9sbGJhcnM9bm8nICtcbiAgICAnLCBzdGF0dXM9bm8nICtcbiAgICAnLCB0b29sYmFyPW5vJztcbiAgICB2YXIgbmV3d2luID0gd2luZG93Lm9wZW4odXJsLCBuYW1lLCBwYXJhbXMpO1xuICAgIGlmIChuZXd3aW4gPT09IG51bGwgfHwgdHlwZW9mIG5ld3dpbiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAod2luZG93LmZvY3VzKSB7XG4gICAgICAgIG5ld3dpbi5mb2N1cygpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gcG9wdXA7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciByZWFkeTtcbmlmIChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgcmVhZHkgPSBmdW5jdGlvbihmbiwgY29udGV4dCkge1xuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJyB8fCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnaW50ZXJhY3RpdmUnKSB7XG4gICAgICAgICAgICBmbi5jYWxsKGNvbnRleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGZuLmNhbGwoY29udGV4dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59IGVsc2Uge1xuICAgIHJlYWR5ID0gZnVuY3Rpb24oZm4sIGNvbnRleHQpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZScpIHtcbiAgICAgICAgICAgIGZuLmNhbGwoY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuYXR0YWNoRXZlbnQoJ29ucmVhZHlzdGF0ZWNoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZScpIHtcbiAgICAgICAgICAgICAgICBmbi5jYWxsKGNvbnRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xufVxuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJlYWR5O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVzaXplID0gZnVuY3Rpb24gKHJlY3QsIGFyZWFXaWR0aCwgYXJlYUhlaWdodCwgYXV0b0NlbnRlciwgbWV0aG9kKSB7XG4gICAgdmFyIHdpZHRoID0gcmVjdC53aWR0aCxcbiAgICAgICAgaGVpZ2h0ID0gcmVjdC5oZWlnaHQsXG4gICAgICAgIHNjYWxlO1xuXG4gICAgc3dpdGNoIChtZXRob2QpIHtcbiAgICAgICAgY2FzZSAnZmlsbCc6XG4gICAgICAgICAgICBzY2FsZSA9IE1hdGgubWF4KGFyZWFXaWR0aCAvIHdpZHRoLCBhcmVhSGVpZ2h0IC8gaGVpZ2h0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmaXQnOlxuICAgICAgICAgICAgc2NhbGUgPSBNYXRoLm1pbihhcmVhV2lkdGggLyB3aWR0aCwgYXJlYUhlaWdodCAvIGhlaWdodCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZml0V2lkdGgnOlxuICAgICAgICAgICAgc2NhbGUgPSBhcmVhV2lkdGggLyB3aWR0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmaXRIZWlnaHQnOlxuICAgICAgICAgICAgc2NhbGUgPSBhcmVhSGVpZ2h0IC8gaGVpZ2h0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBzY2FsZSA9IE1hdGgubWF4KGFyZWFXaWR0aCAvIHdpZHRoLCBhcmVhSGVpZ2h0IC8gaGVpZ2h0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJlY3Qud2lkdGggPSBNYXRoLmNlaWwod2lkdGggKiBzY2FsZSk7XG4gICAgcmVjdC5oZWlnaHQgPSBNYXRoLmNlaWwoaGVpZ2h0ICogc2NhbGUpO1xuXG4gICAgaWYgKGF1dG9DZW50ZXIpIHtcbiAgICAgICAgcmVjdC54ID0gTWF0aC5yb3VuZCgoYXJlYVdpZHRoIC0gcmVjdC53aWR0aCkgKiAwLjUpO1xuICAgICAgICByZWN0LnkgPSBNYXRoLnJvdW5kKChhcmVhSGVpZ2h0IC0gcmVjdC5oZWlnaHQpICogMC41KTtcbiAgICB9XG59O1xuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJlc2l6ZTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHBvcHVwID0gcmVxdWlyZSgnLi9wb3B1cCcpO1xuXG4vLyB3YXJuQmFkVVJMIC0gaGVscGVyIHRvIHdhcm4gb24gcmVsYXRpdmUgVVJMcyBzdXBwbGllZCBmb3IgaW1hZ2VzIGV0Y1xuZnVuY3Rpb24gd2FybkJhZFVSTCh1cmwpIHtcbiAgICBpZiAodXJsLnN1YnN0cigwLCA0KSAhPT0gJ2h0dHAnKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignVVJMOiAnICsgdXJsICsgJyBzaG91bGQgc3RhcnQgd2l0aCBodHRwJyk7XG4gICAgfVxufVxuXG52YXIgU2hhcmUgPSB7XG4gICAgLy8gU3RhbmRhcmQgRkIgc2hhcmUgKHVzZXMgb2cgdGFncylcbiAgICBmYWNlYm9vazogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzaGFyZS5mYWNlYm9vaycsIHVybCk7XG4gICAgICAgIHJldHVybiBwb3B1cCgnaHR0cDovL3d3dy5mYWNlYm9vay5jb20vc2hhcmUucGhwP3U9JyArXG4gICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQodXJsKSwgJ3NoYXJlRmFjZWJvb2snLCA3MjAsIDQ4MCk7XG4gICAgfSxcbiAgICB0d2l0dGVyOiBmdW5jdGlvbih1cmwsIHRleHQsIGhhc2h0YWdzLCByZWxhdGVkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzaGFyZS50d2l0dGVyJywgdXJsLCB0ZXh0LCBoYXNodGFncywgcmVsYXRlZCk7XG4gICAgICAgIHJldHVybiBwb3B1cCgnaHR0cHM6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQ/dXJsPScgKyBlbmNvZGVVUklDb21wb25lbnQodXJsKSArXG4gICAgICAgICAgICAnJnRleHQ9JyArIGVuY29kZVVSSUNvbXBvbmVudCh0ZXh0KSArXG4gICAgICAgICAgICAnJmhhc2h0YWdzPScgKyBlbmNvZGVVUklDb21wb25lbnQoaGFzaHRhZ3MpICtcbiAgICAgICAgICAgICcmcmVsYXRlZD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHJlbGF0ZWQpLCAnc2hhcmVUd2l0dGVyJywgNTUwLCAzODApO1xuICAgIH0sXG4gICAgZ29vZ2xlUGx1czogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzaGFyZS5nb29nbGVQbHVzJywgdXJsKTtcbiAgICAgICAgcmV0dXJuIHBvcHVwKCdodHRwczovL3BsdXMuZ29vZ2xlLmNvbS9zaGFyZT91cmw9JyArIGVuY29kZVVSSUNvbXBvbmVudCh1cmwpLCAnc2hhcmVHb29nbGVQbHVzJywgNTUwLCAzODApO1xuICAgIH0sXG4gICAgcGludGVyZXN0OiBmdW5jdGlvbih1cmwsIHBpY3R1cmUsIHRleHQpIHtcbiAgICAgICAgd2FybkJhZFVSTChwaWN0dXJlKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3NoYXJlLnBpbnRlcmVzdCcsIHVybCwgcGljdHVyZSwgdGV4dCk7XG4gICAgICAgIHJldHVybiBwb3B1cCgnaHR0cDovL3BpbnRlcmVzdC5jb20vcGluL2NyZWF0ZS9idXR0b24vP3VybD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVybCkgK1xuICAgICAgICAgICAgJyZtZWRpYT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHBpY3R1cmUpICtcbiAgICAgICAgICAgICcmZGVzY3JpcHRpb249JyArIGVuY29kZVVSSUNvbXBvbmVudCh0ZXh0KSwgJ3NoYXJlUGludGVyZXN0JywgNjMwLCAyODApO1xuICAgIH0sXG4gICAgdmtvbnRha3RlOiBmdW5jdGlvbih1cmwsIHRpdGxlLCBkZXNjcmlwdGlvbiwgaW1hZ2UpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NoYXJlLnZrb250YWt0ZScsIHVybCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBpbWFnZSk7XG4gICAgICAgIHJldHVybiBwb3B1cCgnaHR0cDovL3Zrb250YWt0ZS5ydS9zaGFyZS5waHA/dXJsPScgKyBlbmNvZGVVUklDb21wb25lbnQodXJsKSArXG4gICAgICAgICAgICAnJnRpdGxlPScgKyB0aXRsZSArICcmZGVzY3JpcHRpb249JyArIGRlc2NyaXB0aW9uICtcbiAgICAgICAgICAgICcmaW1hZ2U9JyArIGVuY29kZVVSSUNvbXBvbmVudChpbWFnZSksICdzaGFyZVZLJywgNTUwLCAzODApO1xuICAgIH0sXG4gICAgcmVucmVuOiBmdW5jdGlvbih1cmwsIHRpdGxlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzaGFyZS5yZW5yZW4nLCB1cmwsIHRpdGxlKTtcbiAgICAgICAgcmV0dXJuIHBvcHVwKCdodHRwOi8vc2hhcmUucmVucmVuLmNvbS9zaGFyZS9idXR0b25zaGFyZS5kbz9saW5rPScgKyBlbmNvZGVVUklDb21wb25lbnQodXJsKSArXG4gICAgICAgICAgICAnJnRpdGxlPScgKyB0aXRsZSwgJ3NoYXJlUmVuUmVuJywgOTAwLCA0ODApO1xuICAgIH0sXG4gICAgd2VpYm86IGZ1bmN0aW9uKHVybCwgdGl0bGUsIGltYWdlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzaGFyZS53ZWlibycsIHVybCwgdGl0bGUsIGltYWdlKTtcbiAgICAgICAgcmV0dXJuIHBvcHVwKCdodHRwOi8vc2VydmljZS53ZWliby5jb20vc2hhcmUvc2hhcmUucGhwP3VybD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVybCkgK1xuICAgICAgICAgICAgJyZhcHBrZXk9JnRpdGxlPScgKyB0aXRsZSArICcmcGljPScgKyBlbmNvZGVVUklDb21wb25lbnQoaW1hZ2UpICtcbiAgICAgICAgICAgICcmcmFsYXRlVWlkPSZsYW5ndWFnZT16aF9jbicsICdzaGFyZVdlaWJvJywgNjQwLCA0ODApO1xuICAgIH0sXG4gICAgLy8gRkIgZmVlZCBkaWFsb2cgc2hhcmUgZm9yIHNoYXJpbmcgd2l0aCBjdXN0b21pc2VkIHRleHQgYW5kIGltYWdlc1xuICAgIC8vIFNlZSBodHRwOi8vZGV2ZWxvcGVycy5mYWNlYm9vay5jb20vZG9jcy9yZWZlcmVuY2UvZGlhbG9ncy9mZWVkL1xuICAgIGZhY2Vib29rRmVlZERpYWxvZzogZnVuY3Rpb24oYXBwSWQsIHRpdGxlLCBsaW5rLCBwaWN0dXJlLCBzb3VyY2UsIGNhcHRpb24sIGRlc2NyaXB0aW9uLCByZWRpcmVjdFVSTCkge1xuICAgICAgICB3YXJuQmFkVVJMKHBpY3R1cmUpO1xuICAgICAgICB3YXJuQmFkVVJMKHJlZGlyZWN0VVJMKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3NoYXJlLmZhY2Vib29rVmlhQXBwJywgYXBwSWQsIHRpdGxlLCBsaW5rLCBwaWN0dXJlLCBzb3VyY2UsIGNhcHRpb24sIGRlc2NyaXB0aW9uLCByZWRpcmVjdFVSTCk7XG5cbiAgICAgICAgdmFyIHVybCA9ICdodHRwOi8vd3d3LmZhY2Vib29rLmNvbS9kaWFsb2cvZmVlZD9hcHBfaWQ9JyArIGFwcElkICtcbiAgICAgICAgJyZwaWN0dXJlPScgKyBwaWN0dXJlICtcbiAgICAgICAgKCBzb3VyY2UgJiYgc291cmNlICE9PSAnJyA/ICcmc291cmNlPScgKyBzb3VyY2UgOiAnJyApICtcbiAgICAgICAgJyZuYW1lPScgKyBlbmNvZGVVUklDb21wb25lbnQodGl0bGUpICtcbiAgICAgICAgJyZsaW5rPScgKyBsaW5rICtcbiAgICAgICAgJyZjYXB0aW9uPScgKyBlbmNvZGVVUklDb21wb25lbnQoY2FwdGlvbikgK1xuICAgICAgICAnJmRlc2NyaXB0aW9uPScgKyBlbmNvZGVVUklDb21wb25lbnQoZGVzY3JpcHRpb24pICtcbiAgICAgICAgJyZkaXNwbGF5PXBvcHVwJyArXG4gICAgICAgICcmc2hvd19lcnJvcj10cnVlJyArXG4gICAgICAgICcmcmVkaXJlY3RfdXJpPScgKyByZWRpcmVjdFVSTDtcblxuICAgICAgICByZXR1cm4gcG9wdXAodXJsLCAnc2hhcmVGYWNlYm9vaycsIDU1MCwgMzgwKTtcbiAgICB9XG59O1xuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IFNoYXJlO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgU3RvcmFnZVV0aWxzID0ge1xuICAgIHNhdmVKU09OOiBmdW5jdGlvbihrZXksIG9iamVjdCkge1xuICAgICAgICBpZiAobG9jYWxTdG9yYWdlKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KG9iamVjdCkpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgbG9hZEpTT046IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICBpZiAobG9jYWxTdG9yYWdlICYmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgLy8gY29udmVydCBpbWFnZSB0byBsb2NhbHN0b3JhZ2UgZnJpZW5kbHkgZGF0YSBVUkwgc3RyaW5nXG4gICAgZ2V0SW1hZ2VEYXRhVVJMOiBmdW5jdGlvbihpbWcsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNhbnZhcykge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aCB8fCBpbWcud2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodCB8fCBpbWcuaGVpZ2h0O1xuICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCk7XG4gICAgICAgIHZhciBkYXRhVVJMID0gdGhpcy5jYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIGRhdGFVUkw7XG4gICAgfVxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBTdG9yYWdlVXRpbHM7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qXG4gKiBIZWxwZXJcbiAqL1xuXG4vLyByZWdleCBlc2NhcGUgcGF0dGVyblxuZnVuY3Rpb24gZXNjYXBlUGF0dGVybihwYXR0ZXJuKSB7XG4gICAgcmV0dXJuIHBhdHRlcm4ucmVwbGFjZSgvKFxcXXxcXFt8XFx7fFxcfXxcXCh8XFwpfFxcKnxcXCt8XFw/fFxcLnxcXFxcKS9nLCAnXFxcXCQxJyk7XG59XG5cbi8qXG4gKiBGb3JtYXRcbiAqL1xuXG4vLyByZW1vdmUgd2hpdGVzcGFjZSBmcm9tIHRoZSBmcm9udCBhbmQgZW5kIG9mIHN0clxuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbn1cblxuLy8gcmVtb3ZlIHdoaXRlc3BhY2UgZnJvbSB0aGUgZnJvbnQgb2Ygc3RyXG5mdW5jdGlvbiB0cmltTGVmdChzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrLywgJycpO1xufVxuXG4vLyByZW1vdmUgd2hpdGVzcGFjZSBmcm9tIHRoZSBlbmQgb2Ygc3RyXG5mdW5jdGlvbiB0cmltUmlnaHQoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHMrJC8sICcnKTtcbn1cblxuLy8gcGFkIHN0ciB3aXRoIHN1YnN0ciBmcm9tIHRoZSBsZWZ0XG5mdW5jdGlvbiBwYWRMZWZ0KHN0ciwgc3Vic3RyLCBsZW5ndGgpIHtcbiAgICB3aGlsZSAoc3RyLmxlbmd0aCA8IGxlbmd0aCkge1xuICAgICAgICBzdHIgPSBzdWJzdHIgKyBzdHI7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG5cbi8vIHBhZHMgc3RyIHdpdGggc3Vic3RyIGZyb20gdGhlIHJpZ2h0XG5mdW5jdGlvbiBwYWRSaWdodChzdHIsIHN1YnN0ciwgbGVuZ3RoKSB7XG4gICAgd2hpbGUgKHN0ci5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgICAgc3RyICs9IHN1YnN0cjtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cblxuLy8gcmVtb3ZlIGV4dHJhIHdoaXRlc3BhY2UgKGV4dHJhIHNwYWNlcywgdGFicywgbGluZSBicmVha3MsIGV0YylcbmZ1bmN0aW9uIHJlbW92ZUV4dHJhV2hpdGVzcGFjZShzdHIpIHtcbiAgICB2YXIgc3Vic3RyID0gdHJpbShzdHIpO1xuICAgIHJldHVybiBzdWJzdHIucmVwbGFjZSgvXFxzKy9nLCAnICcpO1xufVxuXG4vLyByZW1vdmUgYWxsIGluc3RhbmNlcyBvZiBzdWJzdHIgaW4gc3RyXG5mdW5jdGlvbiByZW1vdmUoc3RyLCBzdWJzdHIsIGNhc2VTZW5zaXRpdmUpIHtcbiAgICB2YXIgZXNjYXBlZFN0ciA9IGVzY2FwZVBhdHRlcm4oc3Vic3RyKTtcbiAgICB2YXIgZmxhZ3MgPSBjYXNlU2Vuc2l0aXZlID8gJ2cnIDogJ2lnJztcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChlc2NhcGVkU3RyLCBmbGFncyksICcnKTtcbn1cblxuLy8gdHJ1bmNhdGUgdG8gbGVuZ3RoIHdpdGggc3VmZml4XG5mdW5jdGlvbiB0cnVuY2F0ZShzdHIsIGxlbiwgc3VmZml4KSB7XG4gICAgaWYgKHN1ZmZpeCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN1ZmZpeCA9ICcuLi4nO1xuICAgIH1cbiAgICBsZW4gLT0gc3VmZml4Lmxlbmd0aDtcbiAgICB2YXIgdHJ1bmMgPSBzdHI7XG4gICAgaWYgKHRydW5jLmxlbmd0aCA+IGxlbikge1xuICAgICAgICB0cnVuYyA9IHRydW5jLnN1YnN0cigwLCBsZW4pO1xuICAgICAgICB2YXIgciA9IC9bXlxcc10vO1xuICAgICAgICBpZiAoci50ZXN0KHN0ci5jaGFyQXQobGVuKSkpIHtcbiAgICAgICAgICAgIHRydW5jID0gdHJpbVJpZ2h0KHRydW5jLnJlcGxhY2UoL1xcdyskfFxccyskLywgJycpKTtcbiAgICAgICAgfVxuICAgICAgICB0cnVuYyArPSBzdWZmaXg7XG4gICAgfVxuICAgIHJldHVybiB0cnVuYztcbn1cblxuLy8gQ2FwaXRhbGl6ZSB0aGUgZmlyc3Qgd29yZCBpbiBhIHN0cmluZyBvciBhbGwgd29yZHNcbmZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyLCBhbGwpIHtcbiAgICB2YXIgc3Vic3RyID0gdHJpbUxlZnQoc3RyKTtcbiAgICBpZiAoYWxsKSB7XG4gICAgICAgIHJldHVybiBzdWJzdHIucmVwbGFjZSgvXi58XFxiLi9nLCBmdW5jdGlvbihtYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzdWJzdHIucmVwbGFjZSgvKF5cXHcpLywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8vIHByb3BlciBjYXNlIHN0ciBpbiBzZW50ZW5jZSBmb3JtYXRcbmZ1bmN0aW9uIHByb3BlckNhc2Uoc3RyKSB7XG4gICAgdmFyIG5ld1N0ciA9IHN0ci50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xcYihbXi4/OyFdKykvLCBjYXBpdGFsaXplKTtcbiAgICByZXR1cm4gbmV3U3RyLnJlcGxhY2UoL1xcYltpXVxcYi8sICdJJyk7XG59XG5cbi8vIHJldmVyc2UgY2hhcmFjdGVyIG9yZGVyXG5mdW5jdGlvbiByZXZlcnNlKHN0cikge1xuICAgIHJldHVybiBzdHIuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKTtcbn1cblxuLy8gcmV2ZXJzZSB3b3JkIG9yZGVyXG5mdW5jdGlvbiByZXZlcnNlV29yZHMoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5zcGxpdCgnICcpLnJldmVyc2UoKS5qb2luKCcgJyk7XG59XG5cbi8vIHJlbW92ZSBhbGwgSFRNTCB0YWdzIGZyb20gc3RyXG5mdW5jdGlvbiBzdHJpcFRhZ3Moc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC88XFwvP1tePl0rPi9pZ20sICcnKTtcbn1cblxuLy8gc3dhcHMgdGhlIGNhc2Ugb2Ygc3RyXG5mdW5jdGlvbiBzd2FwQ2FzZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyhcXHcpLywgZnVuY3Rpb24obmV3U3RyKSB7XG4gICAgICAgIHZhciBsb3dlciA9IG5ld1N0ci50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YXIgdXBwZXIgPSBuZXdTdHIudG9VcHBlckNhc2UoKTtcbiAgICAgICAgc3dpdGNoIChuZXdTdHIpIHtcbiAgICAgICAgICAgIGNhc2UgbG93ZXI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVwcGVyO1xuICAgICAgICAgICAgY2FzZSB1cHBlcjpcbiAgICAgICAgICAgICAgICByZXR1cm4gbG93ZXI7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdTdHI7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8gZm9ybWF0cyBzZWNvbmRzIGludG8gSEg6TU06U1NcbmZ1bmN0aW9uIHRpbWVDb2RlKHNlY29uZHMsIGRlbGltKSB7XG4gICAgaWYgKGRlbGltID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGVsaW0gPSAnOic7XG4gICAgfVxuICAgIHZhciBoID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMzYwMCk7XG4gICAgdmFyIG0gPSBNYXRoLmZsb29yKChzZWNvbmRzICUgMzYwMCkgLyA2MCk7XG4gICAgdmFyIHMgPSBNYXRoLmZsb29yKChzZWNvbmRzICUgMzYwMCkgJSA2MCk7XG4gICAgdmFyIGhyID0gKGggPCAxMCA/ICcwJyArIGggOiBoKSArIGRlbGltO1xuICAgIHZhciBtbiA9IChtIDwgMTAgPyAnMCcgKyBtIDogbSkgKyBkZWxpbTtcbiAgICB2YXIgc2MgPSAocyA8IDEwID8gJzAnICsgcyA6IHMpO1xuICAgIHJldHVybiBociArIG1uICsgc2M7XG59XG5cbi8qXG4gKiBRdWVyeVxuICovXG5cbi8vIHdoZXRoZXIgc3RyIGJlZ2lucyB3aXRoIHN1YnN0clxuZnVuY3Rpb24gYmVnaW5zV2l0aChzdHIsIHN1YnN0cikge1xuICAgIHJldHVybiBzdHIuaW5kZXhPZihzdWJzdHIpID09PSAwO1xufVxuXG4vLyB3aGV0aGVyIHN0ciBjb250YWlucyBhbnkgaW5zdGFuY2VzIG9mIHN1YnN0clxuZnVuY3Rpb24gY29udGFpbnMoc3RyLCBzdWJzdHIpIHtcbiAgICByZXR1cm4gc3RyLmluZGV4T2Yoc3Vic3RyKSAhPT0gLTE7XG59XG5cbi8vIHRoZSBudW1iZXIgb2YgdGltZXMgc3Vic3RyIGFwcGVhcnMgd2l0aGluIHN0clxuZnVuY3Rpb24gY291bnRPZihzdHIsIHN1YnN0ciwgY2FzZVNlbnNpdGl2ZSkge1xuICAgIHZhciBlc2NhcGVkU3RyID0gZXNjYXBlUGF0dGVybihzdWJzdHIpO1xuICAgIHZhciBmbGFncyA9ICghY2FzZVNlbnNpdGl2ZSkgPyAnaWcnIDogJ2cnO1xuICAgIHJldHVybiBzdHIubWF0Y2gobmV3IFJlZ0V4cChlc2NhcGVkU3RyLCBmbGFncykpLmxlbmd0aDtcbn1cblxuLy8gd2hldGhlciBzdHIgZW5kcyB3aXRoIHN1YnN0clxuZnVuY3Rpb24gZW5kc1dpdGgoc3RyLCBzdWJzdHIpIHtcbiAgICByZXR1cm4gc3RyLmxhc3RJbmRleE9mKHN1YnN0cikgPT09IHN0ci5sZW5ndGggLSBzdWJzdHIubGVuZ3RoO1xufVxuXG4vLyB3aGV0aGVyIHN0ciBjb250YWlucyBhbnkgdGV4dFxuZnVuY3Rpb24gaGFzVGV4dChzdHIpIHtcbiAgICB2YXIgc3Vic3RyID0gcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlKHN0cik7XG4gICAgcmV0dXJuICEhc3Vic3RyLmxlbmd0aDtcbn1cblxuLy8gd2hldGhlciBzdHIgY29udGFpbnMgYW55IGNoYXJhY3RlcnNcbmZ1bmN0aW9uIGlzRW1wdHkoc3RyKSB7XG4gICAgcmV0dXJuICFzdHIubGVuZ3RoO1xufVxuXG4vLyB3aGV0aGVyIHN0ciBpcyBudW1lcmljXG5mdW5jdGlvbiBpc051bWVyaWMoc3RyKSB7XG4gICAgdmFyIHJlZ3ggPSAvXlstK10/XFxkKlxcLj9cXGQrKD86W2VFXVstK10/XFxkKyk/JC87XG4gICAgcmV0dXJuIHJlZ3gudGVzdChzdHIpO1xufVxuXG4vLyB0aGUgbnVtYmVyIG9mIHdvcmRzIGluIGEgc3RyaW5nXG5mdW5jdGlvbiB3b3JkQ291bnQoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5tYXRjaCgvXFxiXFx3K1xcYi9nKS5sZW5ndGg7XG59XG5cbi8qXG4gKiBTdWJzdHJpbmdcbiAqL1xuXG4vLyBldmVyeXRoaW5nIGFmdGVyIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHN1YnN0ciBpbiBzdHJcbmZ1bmN0aW9uIGFmdGVyRmlyc3Qoc3RyLCBzdWJzdHIpIHtcbiAgICB2YXIgaW5kZXggPSBzdHIuaW5kZXhPZihzdWJzdHIpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpbmRleCArPSBzdWJzdHIubGVuZ3RoO1xuICAgIHJldHVybiBzdHIuc3Vic3RyKGluZGV4KTtcbn1cblxuLy8gZXZlcnl0aGluZyBhZnRlciB0aGUgbGFzdCBvY2N1cmVuY2Ugb2Ygc3Vic3RyIGluIHN0clxuZnVuY3Rpb24gYWZ0ZXJMYXN0KHN0ciwgc3Vic3RyKSB7XG4gICAgdmFyIGluZGV4ID0gc3RyLmxhc3RJbmRleE9mKHN1YnN0cik7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGluZGV4ICs9IHN1YnN0ci5sZW5ndGg7XG4gICAgcmV0dXJuIHN0ci5zdWJzdHIoaW5kZXgpO1xufVxuXG4vLyBldmVyeXRoaW5nIGJlZm9yZSB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBzdWJzdHIgaW4gc3RyXG5mdW5jdGlvbiBiZWZvcmVGaXJzdChzdHIsIHN1YnN0cikge1xuICAgIHZhciBpbmRleCA9IHN0ci5pbmRleE9mKHN1YnN0cik7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBzdHIuc3Vic3RyKDAsIGluZGV4KTtcbn1cblxuLy8gZXZlcnl0aGluZyBiZWZvcmUgdGhlIGxhc3Qgb2NjdXJyZW5jZSBvZiBzdWJzdHIgaW4gdGhlIHN0cmluZy5cbmZ1bmN0aW9uIGJlZm9yZUxhc3Qoc3RyLCBzdWJzdHIpIHtcbiAgICB2YXIgaW5kZXggPSBzdHIubGFzdEluZGV4T2Yoc3Vic3RyKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIHN0ci5zdWJzdHIoMCwgaW5kZXgpO1xufVxuXG4vLyBldmVyeXRoaW5nIGFmdGVyIHRoZSBmaXJzdCBvY2N1cmFuY2Ugb2Ygc3RhcnQgYW5kIGJlZm9yZSB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBlbmRcbmZ1bmN0aW9uIGJldHdlZW4oc3RyLCBzdGFydCwgZW5kKSB7XG4gICAgdmFyIHN1YnN0ciA9ICcnO1xuICAgIHZhciBzdGFydEluZGV4ID0gc3RyLmluZGV4T2Yoc3RhcnQpO1xuICAgIGlmIChzdGFydEluZGV4ICE9PSAtMSkge1xuICAgICAgICBzdGFydEluZGV4ICs9IHN0YXJ0Lmxlbmd0aDtcbiAgICAgICAgdmFyIGVuZEluZGV4ID0gc3RyLmluZGV4T2YoZW5kLCBzdGFydEluZGV4KTtcbiAgICAgICAgaWYgKGVuZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgc3Vic3RyID0gc3RyLnN1YnN0cihzdGFydEluZGV4LCBlbmRJbmRleCAtIHN0YXJ0SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdWJzdHI7XG59XG5cbi8qXG4gKiBVdGlsaXR5XG4gKi9cblxuLy8gVXRpbGl0eSBtZXRob2QgdGhhdCBpbnRlbGxpZ2VudGx5IGJyZWFrcyB1cCB5b3VyIHN0cmluZyxcbi8vIGFsbG93aW5nIHlvdSB0byBjcmVhdGUgYmxvY2tzIG9mIHJlYWRhYmxlIHRleHQuXG4vLyBUaGlzIG1ldGhvZCByZXR1cm5zIHlvdSB0aGUgY2xvc2VzdCBwb3NzaWJsZSBtYXRjaCB0byB0aGUgZGVsaW0gcGFyYW1hdGVyLFxuLy8gd2hpbGUga2VlcGluZyB0aGUgdGV4dCBsZW5ndGggd2l0aGluIHRoZSBsZW4gcGFyYW10ZXIuXG4vLyBJZiBhIG1hdGNoIGNhbid0IGJlIGZvdW5kIGluIHlvdXIgc3BlY2lmaWVkIGxlbmd0aCBhbiAgJy4uLicgaXMgYWRkZWQgdG8gdGhhdCBibG9jayxcbi8vIGFuZCB0aGUgYmxvY2tpbmcgY29udGludWVzIHVudGlsbCBhbGwgdGhlIHRleHQgaXMgYnJva2VuIGFwYXJ0LlxuZnVuY3Rpb24gYmxvY2soc3RyLCBsZW4sIGRlbGltKSB7XG4gICAgaWYgKGRlbGltID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGVsaW0gPSAnLic7XG4gICAgfVxuICAgIHZhciBhcnIgPSBbXTtcblxuICAgIGlmICghc3RyIHx8ICFjb250YWlucyhzdHIsIGRlbGltKSkge1xuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH1cbiAgICBpZiAoZGVsaW0gPT09ICcgJykge1xuICAgICAgICBzdHIgKz0gZGVsaW07XG4gICAgfVxuXG4gICAgdmFyIGNockluZGV4ID0gMDtcbiAgICB2YXIgc3RyTGVuID0gc3RyLmxlbmd0aDtcbiAgICB2YXIgcmVwbFBhdHQgPSBuZXcgUmVnRXhwKCdbXicgKyBlc2NhcGVQYXR0ZXJuKGRlbGltKSArICddKyQnKTtcbiAgICB3aGlsZSAoY2hySW5kZXggPCBzdHJMZW4pIHtcbiAgICAgICAgdmFyIHN1YlN0cmluZyA9IHN0ci5zdWJzdHIoY2hySW5kZXgsIGxlbik7XG4gICAgICAgIGlmICghY29udGFpbnMoc3ViU3RyaW5nLCBkZWxpbSkpIHtcbiAgICAgICAgICAgIGFyci5wdXNoKHRydW5jYXRlKHN1YlN0cmluZywgc3ViU3RyaW5nLmxlbmd0aCkpO1xuICAgICAgICAgICAgY2hySW5kZXggKz0gc3ViU3RyaW5nLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBzdWJTdHJpbmcgPSBzdWJTdHJpbmcucmVwbGFjZShyZXBsUGF0dCwgJycpO1xuICAgICAgICBhcnIucHVzaCh0cmltKHN1YlN0cmluZykpO1xuICAgICAgICBjaHJJbmRleCArPSBzdWJTdHJpbmcubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gYXJyO1xufVxuXG4vLyBMZXZlbnNodGVpbiBkaXN0YW5jZSAoZWRpdERpc3RhbmNlKSBpcyBhIG1lYXN1cmUgb2YgdGhlIHNpbWlsYXJpdHkgYmV0d2VlbiB0d28gc3RyaW5ncyxcbi8vIFRoZSBkaXN0YW5jZSBpcyB0aGUgbnVtYmVyIG9mIGRlbGV0aW9ucywgaW5zZXJ0aW9ucywgb3Igc3Vic3RpdHV0aW9ucyByZXF1aXJlZCB0b1xuLy8gdHJhbnNmb3JtIHNvdXJjZSBpbnRvIHRhcmdldC5cbmZ1bmN0aW9uIGVkaXREaXN0YW5jZShzb3VyY2UsIHRhcmdldCkge1xuICAgIHZhciBpO1xuXG4gICAgaWYgKHNvdXJjZSA9PT0gbnVsbCkge1xuICAgICAgICBzb3VyY2UgPSAnJztcbiAgICB9XG4gICAgaWYgKHRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICB0YXJnZXQgPSAnJztcbiAgICB9XG5cbiAgICBpZiAoc291cmNlID09PSB0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgdmFyIGQgPSBbXTtcbiAgICB2YXIgY29zdDtcbiAgICB2YXIgbiA9IHNvdXJjZS5sZW5ndGg7XG4gICAgdmFyIG0gPSB0YXJnZXQubGVuZ3RoO1xuICAgIHZhciBqO1xuXG4gICAgaWYgKG4gPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG07XG4gICAgfVxuICAgIGlmIChtID09PSAwKSB7XG4gICAgICAgIHJldHVybiBuO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPD0gbjsgaSsrKSB7XG4gICAgICAgIGRbaV0gPSBbXTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8PSBuOyBpKyspIHtcbiAgICAgICAgZFtpXVswXSA9IGk7XG4gICAgfVxuICAgIGZvciAoaiA9IDA7IGogPD0gbTsgaisrKSB7XG4gICAgICAgIGRbMF1bal0gPSBqO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDE7IGkgPD0gbjsgaSsrKSB7XG5cbiAgICAgICAgdmFyIHNpID0gc291cmNlLmNoYXJBdChpIC0gMSk7XG4gICAgICAgIGZvciAoaiA9IDE7IGogPD0gbTsgaisrKSB7XG5cbiAgICAgICAgICAgIHZhciB0aiA9IHRhcmdldC5jaGFyQXQoaiAtIDEpO1xuXG4gICAgICAgICAgICBpZiAoc2kgPT09IHRqKSB7XG4gICAgICAgICAgICAgICAgY29zdCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvc3QgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkW2ldW2pdID0gTWF0aC5taW4oZFtpIC0gMV1bal0gKyAxLCBkW2ldW2ogLSAxXSArIDEsIGRbaSAtIDFdW2ogLSAxXSArIGNvc3QpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkW25dW21dO1xufVxuXG4vLyBwZXJjZW50YWdlIG9mIHNpbWlsaWFyaXR5IGZyb20gMCB0byAxXG5mdW5jdGlvbiBzaW1pbGFyaXR5KGEsIGIpIHtcbiAgICB2YXIgZSA9IGVkaXREaXN0YW5jZShhLCBiKTtcbiAgICB2YXIgbSA9IE1hdGgubWF4KGEubGVuZ3RoLCBiLmxlbmd0aCk7XG4gICAgaWYgKG0gPT09IDApIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICgxIC0gZSAvIG0pO1xuICAgIH1cbn1cblxuXG52YXIgU3RyaW5nVXRpbHMgPSB7XG4gICAgLy8gaGVscGVyOlxuICAgICdlc2NhcGVQYXR0ZXJuJzogZXNjYXBlUGF0dGVybixcblxuICAgIC8vIGZvcm1hdDpcbiAgICAndHJpbSc6IHRyaW0sXG4gICAgJ3RyaW1MZWZ0JzogdHJpbUxlZnQsXG4gICAgJ3RyaW1SaWdodCc6IHRyaW1SaWdodCxcbiAgICAncGFkTGVmdCc6IHBhZExlZnQsXG4gICAgJ3BhZFJpZ2h0JzogcGFkUmlnaHQsXG4gICAgJ3JlbW92ZUV4dHJhV2hpdGVzcGFjZSc6IHJlbW92ZUV4dHJhV2hpdGVzcGFjZSxcbiAgICAncmVtb3ZlJzogcmVtb3ZlLFxuICAgICd0cnVuY2F0ZSc6IHRydW5jYXRlLFxuICAgICdjYXBpdGFsaXplJzogY2FwaXRhbGl6ZSxcbiAgICAncHJvcGVyQ2FzZSc6IHByb3BlckNhc2UsXG4gICAgJ3JldmVyc2UnOiByZXZlcnNlLFxuICAgICdyZXZlcnNlV29yZHMnOiByZXZlcnNlV29yZHMsXG4gICAgJ3N0cmlwVGFncyc6IHN0cmlwVGFncyxcbiAgICAnc3dhcENhc2UnOiBzd2FwQ2FzZSxcbiAgICAndGltZUNvZGUnOiB0aW1lQ29kZSxcblxuICAgIC8vIHF1ZXJ5OlxuICAgICdiZWdpbnNXaXRoJzogYmVnaW5zV2l0aCxcbiAgICAnY29udGFpbnMnOiBjb250YWlucyxcbiAgICAnY291bnRPZic6IGNvdW50T2YsXG4gICAgJ2VuZHNXaXRoJzogZW5kc1dpdGgsXG4gICAgJ2hhc1RleHQnOiBoYXNUZXh0LFxuICAgICdpc0VtcHR5JzogaXNFbXB0eSxcbiAgICAnaXNOdW1lcmljJzogaXNOdW1lcmljLFxuICAgICd3b3JkQ291bnQnOiB3b3JkQ291bnQsXG5cbiAgICAvLyBzdWJzdHJpbmc6XG4gICAgJ2FmdGVyRmlyc3QnOiBhZnRlckZpcnN0LFxuICAgICdhZnRlckxhc3QnOiBhZnRlckxhc3QsXG4gICAgJ2JlZm9yZUZpcnN0JzogYmVmb3JlRmlyc3QsXG4gICAgJ2JlZm9yZUxhc3QnOiBiZWZvcmVMYXN0LFxuICAgICdiZXR3ZWVuJzogYmV0d2VlbixcblxuICAgIC8vIHV0aWxpdHk6XG4gICAgJ2Jsb2NrJzogYmxvY2ssXG4gICAgJ2VkaXREaXN0YW5jZSc6IGVkaXREaXN0YW5jZSxcbiAgICAnc2ltaWxhcml0eSc6IHNpbWlsYXJpdHlcbn07XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gU3RyaW5nVXRpbHM7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB0cmFjayA9IHtcbiAgICBpbml0OiBmdW5jdGlvbihnYUFjY291bnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpemUgR29vZ2xlIEFuYWx5dGljcyB3aXRoIGFjY291bnQgSWQ6JywgZ2FBY2NvdW50KTtcblxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xuICAgICAgICAoZnVuY3Rpb24oaSxzLG8sZyxyLGEsbSl7aVsnR29vZ2xlQW5hbHl0aWNzT2JqZWN0J109cjtpW3JdPWlbcl18fGZ1bmN0aW9uKCl7XG4gICAgICAgIChpW3JdLnE9aVtyXS5xfHxbXSkucHVzaChhcmd1bWVudHMpO30saVtyXS5sPTEqbmV3IERhdGUoKTthPXMuY3JlYXRlRWxlbWVudChvKSxcbiAgICAgICAgbT1zLmdldEVsZW1lbnRzQnlUYWdOYW1lKG8pWzBdO2EuYXN5bmM9MTthLnNyYz1nO20ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYSxtKTtcbiAgICAgICAgfSkod2luZG93LGRvY3VtZW50LCdzY3JpcHQnLCcvL3d3dy5nb29nbGUtYW5hbHl0aWNzLmNvbS9hbmFseXRpY3MuanMnLCdnYScpO1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlICovXG5cbiAgICAgICAgd2luZG93LmdhKCdjcmVhdGUnLCBnYUFjY291bnQsICdhdXRvJyk7XG4gICAgICAgIHdpbmRvdy5nYSgnc2VuZCcsICdwYWdldmlldycpO1xuICAgIH0sXG4gICAgcGFnZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RyYWNrLnBhZ2U6JywgdmFsdWUpO1xuICAgICAgICB3aW5kb3cuZ2EoJ3NlbmQnLCB7XG4gICAgICAgICAgICAnaGl0VHlwZSc6ICdwYWdldmlldycsXG4gICAgICAgICAgICAncGFnZSc6IHZhbHVlLFxuICAgICAgICAgICAgJ3RpdGxlJzogdmFsdWVcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBldmVudDogZnVuY3Rpb24oY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0cmFjay5ldmVudDonLCBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpO1xuICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0cmFjayB3aXRoIGxhYmVsOicsIGNhdGVnb3J5LCBhY3Rpb24sIGxhYmVsLCB2YWx1ZSk7XG4gICAgICAgICAgICB3aW5kb3cuZ2EoJ3NlbmQnLCB7XG4gICAgICAgICAgICAgICAgJ2hpdFR5cGUnOiAnZXZlbnQnLFxuICAgICAgICAgICAgICAgICdldmVudENhdGVnb3J5JzogY2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgJ2V2ZW50QWN0aW9uJzogYWN0aW9uLFxuICAgICAgICAgICAgICAgICdldmVudExhYmVsJzogbGFiZWwsXG4gICAgICAgICAgICAgICAgJ2V2ZW50VmFsdWUnOiB2YWx1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndHJhY2sgd2l0aG91dCBsYWJlbDonLCBjYXRlZ29yeSwgYWN0aW9uKTtcbiAgICAgICAgICAgIHdpbmRvdy5nYSgnc2VuZCcsIHtcbiAgICAgICAgICAgICAgICAnaGl0VHlwZSc6ICdldmVudCcsXG4gICAgICAgICAgICAgICAgJ2V2ZW50Q2F0ZWdvcnknOiBjYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAnZXZlbnRBY3Rpb24nOiBhY3Rpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB0cmFjaztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHVybFBhcmFtcyA9IHt9O1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBsID0gL1xcKy9nOyAgLy8gUmVnZXggZm9yIHJlcGxhY2luZyBhZGRpdGlvbiBzeW1ib2wgd2l0aCBhIHNwYWNlXG4gICAgdmFyIHNlYXJjaCA9IC8oW14mPV0rKT0/KFteJl0qKS9nO1xuICAgIHZhciBkZWNvZGUgPSBmdW5jdGlvbihzKSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocy5yZXBsYWNlKHBsLCAnICcpKTtcbiAgICB9O1xuICAgIHZhciBxdWVyeSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpO1xuICAgIHZhciBtYXRjaCA9IHNlYXJjaC5leGVjKHF1ZXJ5KTtcbiAgICB3aGlsZSAobWF0Y2gpIHtcbiAgICAgICAgdXJsUGFyYW1zW2RlY29kZShtYXRjaFsxXSldID0gZGVjb2RlKG1hdGNoWzJdKTtcbiAgICAgICAgbWF0Y2ggPSBzZWFyY2guZXhlYyhxdWVyeSk7XG4gICAgfVxufSgpKTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB1cmxQYXJhbXM7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnLi9FbWl0dGVyJyksXG4gICAgcmVzaXplVXRpbCA9IHJlcXVpcmUoJy4vcmVzaXplJyk7XG5cbnZhciBWaWV3UG9ydCA9IHtcbiAgICByZWN0OiB7XG4gICAgICAgICd4JzogMCxcbiAgICAgICAgJ3knOiAwLFxuICAgICAgICAnd2lkdGgnOiAwLFxuICAgICAgICAnaGVpZ2h0JzogMCxcbiAgICAgICAgJ3N0YWdlV2lkdGgnOiAwLFxuICAgICAgICAnc3RhZ2VIZWlnaHQnOiAwLFxuICAgICAgICAnc2NhbGUnOiAxXG4gICAgfSxcbiAgICBvcmlnaW5hbFdpZHRoOiAwLFxuICAgIG9yaWdpbmFsSGVpZ2h0OiAwLFxuXG4gICAgaW5pdDogZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuICAgICAgICB0aGlzLm9yaWdpbmFsV2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5vcmlnaW5hbEhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB3aW5kb3cub25yZXNpemUgPSB3aW5kb3cub25vcmllbnRhdGlvbmNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi5yZXNpemUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICB9LFxuICAgIHJlc2l6ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIHJlc2V0XG4gICAgICAgIHRoaXMucmVjdC54ID0gMDtcbiAgICAgICAgdGhpcy5yZWN0LnkgPSAwO1xuICAgICAgICB0aGlzLnJlY3Qud2lkdGggPSB0aGlzLm9yaWdpbmFsV2lkdGg7XG4gICAgICAgIHRoaXMucmVjdC5oZWlnaHQgPSB0aGlzLm9yaWdpbmFsSGVpZ2h0O1xuICAgICAgICB0aGlzLnJlY3Quc3RhZ2VXaWR0aCA9IHRoaXMuZ2V0V2luZG93V2lkdGgoKTtcbiAgICAgICAgdGhpcy5yZWN0LnN0YWdlSGVpZ2h0ID0gdGhpcy5nZXRXaW5kb3dIZWlnaHQoKTtcbiAgICAgICAgdGhpcy5yZWN0LnNjYWxlID0gMTtcbiAgICAgICAgLy8gcmVzaXplXG4gICAgICAgIGlmICh0aGlzLnJlY3Quc3RhZ2VXaWR0aCA+IHRoaXMucmVjdC5zdGFnZUhlaWdodCkge1xuICAgICAgICAgICAgcmVzaXplVXRpbCh0aGlzLnJlY3QsIHRoaXMucmVjdC5zdGFnZVdpZHRoLCB0aGlzLnJlY3Quc3RhZ2VIZWlnaHQsIHRydWUsICdmaWxsJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNpemVVdGlsKHRoaXMucmVjdCwgdGhpcy5yZWN0LnN0YWdlV2lkdGgsIHRoaXMucmVjdC5zdGFnZUhlaWdodCwgdHJ1ZSwgJ2ZpdFdpZHRoJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWN0LnNjYWxlID0gdGhpcy5yZWN0LndpZHRoIC8gdGhpcy5vcmlnaW5hbFdpZHRoO1xuICAgICAgICAvLyBub3RpZnlcbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoJ3Jlc2l6ZScpO1xuICAgIH0sXG4gICAgbW91c2VMZWZ0V2luZG93OiBmdW5jdGlvbihmbiwgdGhpc0FyZykge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciBmcm9tID0gZS5yZWxhdGVkVGFyZ2V0IHx8IGUudG9FbGVtZW50O1xuICAgICAgICAgICAgaWYgKCFmcm9tIHx8IGZyb20ubm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgICAgICAgICAgICAgIGZuLmNhbGwodGhpc0FyZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0V2luZG93V2lkdGg6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBHZXQgY3VycmVudCBicm93c2VyIHZpZXdwYW5lIGhlaWd0aHRcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoIHx8XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHxcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggfHwgMDtcbiAgICB9LFxuICAgIGdldFdpbmRvd0hlaWdodDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIEdldCBjdXJyZW50IGJyb3dzZXIgdmlld3BhbmUgaGVpZ3RodFxuICAgICAgICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0IHx8XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCB8fCAwO1xuICAgIH0sXG4gICAgZ2V0U2Nyb2xsVG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IHdpbmRvdy5wYWdlWU9mZnNldCB8fCAwO1xuICAgIH0sXG4gICAgZ2V0V2luZG93U2Nyb2xsWTogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIEdldCBjdXJyZW50IGFic29sdXRlIHdpbmRvdyBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAgcmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldCB8fFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHxcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgMDtcbiAgICB9LFxuICAgIGdldERvY0hlaWdodDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIEdldCBjdXJyZW50IGFic29sdXRlIGRvY3VtZW50IGhlaWdodFxuICAgICAgICByZXR1cm4gTWF0aC5tYXgoXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCB8fCAwLFxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCB8fCAwLFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQgfHwgMCxcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgMCxcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0IHx8IDAsXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IDBcbiAgICAgICAgKTtcbiAgICB9LFxuICAgIGdldFNjcm9sbFBlcmNlbnRhZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBHZXQgY3VycmVudCB2ZXJ0aWNhbCBzY3JvbGwgcGVyY2VudGFnZVxuICAgICAgICByZXR1cm4gKCh0aGlzLmdldFdpbmRvd1Njcm9sbFkoKSArIHRoaXMuZ2V0V2luZG93SGVpZ2h0KCkpIC8gdGhpcy5nZXREb2NIZWlnaHQoKSkgKiAxMDA7XG4gICAgfVxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBWaWV3UG9ydDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCcuL0VtaXR0ZXInKTtcblxudmFyIHZpc2liaWxpdHksXG4gICAgaGlkZGVuLFxuICAgIHZpc2liaWxpdHlDaGFuZ2U7XG5cbmZ1bmN0aW9uIG9uVmlzaWJpbGl0eUNoYW5nZSgpIHtcbiAgICBpZiAoZG9jdW1lbnRbaGlkZGVuXSkge1xuICAgICAgICB2aXNpYmlsaXR5LmVtaXQoJ2hpZGRlbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZpc2liaWxpdHkuZW1pdCgnc2hvd24nKTtcbiAgICB9XG59XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQuaGlkZGVuICE9PSAndW5kZWZpbmVkJykgeyAvLyBPcGVyYSAxMi4xMCBhbmQgRmlyZWZveCAxOCBhbmQgbGF0ZXIgc3VwcG9ydFxuICAgIGhpZGRlbiA9ICdoaWRkZW4nO1xuICAgIHZpc2liaWxpdHlDaGFuZ2UgPSAndmlzaWJpbGl0eWNoYW5nZSc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC5tb3pIaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaGlkZGVuID0gJ21vekhpZGRlbic7XG4gICAgdmlzaWJpbGl0eUNoYW5nZSA9ICdtb3p2aXNpYmlsaXR5Y2hhbmdlJztcbn0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50Lm1zSGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICAgIGhpZGRlbiA9ICdtc0hpZGRlbic7XG4gICAgdmlzaWJpbGl0eUNoYW5nZSA9ICdtc3Zpc2liaWxpdHljaGFuZ2UnO1xufSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQud2Via2l0SGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICAgIGhpZGRlbiA9ICd3ZWJraXRIaWRkZW4nO1xuICAgIHZpc2liaWxpdHlDaGFuZ2UgPSAnd2Via2l0dmlzaWJpbGl0eWNoYW5nZSc7XG59XG5cbmlmICh2aXNpYmlsaXR5Q2hhbmdlICE9PSB1bmRlZmluZWQpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHZpc2liaWxpdHlDaGFuZ2UsIG9uVmlzaWJpbGl0eUNoYW5nZSwgZmFsc2UpO1xufVxuXG52aXNpYmlsaXR5ID0gT2JqZWN0LmNyZWF0ZShFbWl0dGVyLnByb3RvdHlwZSwge1xuICAgIF9ldmVudHM6IHsgdmFsdWU6IHt9IH1cbn0pO1xuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHZpc2liaWxpdHk7XG59XG4iXX0=
