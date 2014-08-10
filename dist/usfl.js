!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.usfl=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/*jslint onevar:true, undef:true, newcap:true, regexp:true, bitwise:true, maxerr:50, indent:4, white:false, nomen:false, plusplus:false */
/*global define:false, require:false, exports:false, module:false, signals:false */

/** @license
 * JS Signals <http://millermedeiros.github.com/js-signals/>
 * Released under the MIT license
 * Author: Miller Medeiros
 * Version: 1.0.0 - Build: 268 (2012/11/29 05:48 PM)
 */

(function(global){

    // SignalBinding -------------------------------------------------
    //================================================================

    /**
     * Object that represents a binding between a Signal and a listener function.
     * <br />- <strong>This is an internal constructor and shouldn't be called by regular users.</strong>
     * <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
     * @author Miller Medeiros
     * @constructor
     * @internal
     * @name SignalBinding
     * @param {Signal} signal Reference to Signal object that listener is currently bound to.
     * @param {Function} listener Handler function bound to the signal.
     * @param {boolean} isOnce If binding should be executed just once.
     * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
     * @param {Number} [priority] The priority level of the event listener. (default = 0).
     */
    function SignalBinding(signal, listener, isOnce, listenerContext, priority) {

        /**
         * Handler function bound to the signal.
         * @type Function
         * @private
         */
        this._listener = listener;

        /**
         * If binding should be executed just once.
         * @type boolean
         * @private
         */
        this._isOnce = isOnce;

        /**
         * Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @memberOf SignalBinding.prototype
         * @name context
         * @type Object|undefined|null
         */
        this.context = listenerContext;

        /**
         * Reference to Signal object that listener is currently bound to.
         * @type Signal
         * @private
         */
        this._signal = signal;

        /**
         * Listener priority
         * @type Number
         * @private
         */
        this._priority = priority || 0;
    }

    SignalBinding.prototype = {

        /**
         * If binding is active and should be executed.
         * @type boolean
         */
        active : true,

        /**
         * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute`. (curried parameters)
         * @type Array|null
         */
        params : null,

        /**
         * Call listener passing arbitrary parameters.
         * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.</p>
         * @param {Array} [paramsArr] Array of parameters that should be passed to the listener
         * @return {*} Value returned by the listener.
         */
        execute : function (paramsArr) {
            var handlerReturn, params;
            if (this.active && !!this._listener) {
                params = this.params? this.params.concat(paramsArr) : paramsArr;
                handlerReturn = this._listener.apply(this.context, params);
                if (this._isOnce) {
                    this.detach();
                }
            }
            return handlerReturn;
        },

        /**
         * Detach binding from signal.
         * - alias to: mySignal.remove(myBinding.getListener());
         * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
         */
        detach : function () {
            return this.isBound()? this._signal.remove(this._listener, this.context) : null;
        },

        /**
         * @return {Boolean} `true` if binding is still bound to the signal and have a listener.
         */
        isBound : function () {
            return (!!this._signal && !!this._listener);
        },

        /**
         * @return {boolean} If SignalBinding will only be executed once.
         */
        isOnce : function () {
            return this._isOnce;
        },

        /**
         * @return {Function} Handler function bound to the signal.
         */
        getListener : function () {
            return this._listener;
        },

        /**
         * @return {Signal} Signal that listener is currently bound to.
         */
        getSignal : function () {
            return this._signal;
        },

        /**
         * Delete instance properties
         * @private
         */
        _destroy : function () {
            delete this._signal;
            delete this._listener;
            delete this.context;
        },

        /**
         * @return {string} String representation of the object.
         */
        toString : function () {
            return '[SignalBinding isOnce:' + this._isOnce +', isBound:'+ this.isBound() +', active:' + this.active + ']';
        }

    };


/*global SignalBinding:false*/

    // Signal --------------------------------------------------------
    //================================================================

    function validateListener(listener, fnName) {
        if (typeof listener !== 'function') {
            throw new Error( 'listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName) );
        }
    }

    /**
     * Custom event broadcaster
     * <br />- inspired by Robert Penner's AS3 Signals.
     * @name Signal
     * @author Miller Medeiros
     * @constructor
     */
    function Signal() {
        /**
         * @type Array.<SignalBinding>
         * @private
         */
        this._bindings = [];
        this._prevParams = null;

        // enforce dispatch to aways work on same context (#47)
        var self = this;
        this.dispatch = function(){
            Signal.prototype.dispatch.apply(self, arguments);
        };
    }

    Signal.prototype = {

        /**
         * Signals Version Number
         * @type String
         * @const
         */
        VERSION : '1.0.0',

        /**
         * If Signal should keep record of previously dispatched parameters and
         * automatically execute listener during `add()`/`addOnce()` if Signal was
         * already dispatched before.
         * @type boolean
         */
        memorize : false,

        /**
         * @type boolean
         * @private
         */
        _shouldPropagate : true,

        /**
         * If Signal is active and should broadcast events.
         * <p><strong>IMPORTANT:</strong> Setting this property during a dispatch will only affect the next dispatch, if you want to stop the propagation of a signal use `halt()` instead.</p>
         * @type boolean
         */
        active : true,

        /**
         * @param {Function} listener
         * @param {boolean} isOnce
         * @param {Object} [listenerContext]
         * @param {Number} [priority]
         * @return {SignalBinding}
         * @private
         */
        _registerListener : function (listener, isOnce, listenerContext, priority) {

            var prevIndex = this._indexOfListener(listener, listenerContext),
                binding;

            if (prevIndex !== -1) {
                binding = this._bindings[prevIndex];
                if (binding.isOnce() !== isOnce) {
                    throw new Error('You cannot add'+ (isOnce? '' : 'Once') +'() then add'+ (!isOnce? '' : 'Once') +'() the same listener without removing the relationship first.');
                }
            } else {
                binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);
                this._addBinding(binding);
            }

            if(this.memorize && this._prevParams){
                binding.execute(this._prevParams);
            }

            return binding;
        },

        /**
         * @param {SignalBinding} binding
         * @private
         */
        _addBinding : function (binding) {
            //simplified insertion sort
            var n = this._bindings.length;
            do { --n; } while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);
            this._bindings.splice(n + 1, 0, binding);
        },

        /**
         * @param {Function} listener
         * @return {number}
         * @private
         */
        _indexOfListener : function (listener, context) {
            var n = this._bindings.length,
                cur;
            while (n--) {
                cur = this._bindings[n];
                if (cur._listener === listener && cur.context === context) {
                    return n;
                }
            }
            return -1;
        },

        /**
         * Check if listener was attached to Signal.
         * @param {Function} listener
         * @param {Object} [context]
         * @return {boolean} if Signal has the specified listener.
         */
        has : function (listener, context) {
            return this._indexOfListener(listener, context) !== -1;
        },

        /**
         * Add a listener to the signal.
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        add : function (listener, listenerContext, priority) {
            validateListener(listener, 'add');
            return this._registerListener(listener, false, listenerContext, priority);
        },

        /**
         * Add listener to the signal that should be removed after first execution (will be executed only once).
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        addOnce : function (listener, listenerContext, priority) {
            validateListener(listener, 'addOnce');
            return this._registerListener(listener, true, listenerContext, priority);
        },

        /**
         * Remove a single listener from the dispatch queue.
         * @param {Function} listener Handler function that should be removed.
         * @param {Object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
         * @return {Function} Listener handler function.
         */
        remove : function (listener, context) {
            validateListener(listener, 'remove');

            var i = this._indexOfListener(listener, context);
            if (i !== -1) {
                this._bindings[i]._destroy(); //no reason to a SignalBinding exist if it isn't attached to a signal
                this._bindings.splice(i, 1);
            }
            return listener;
        },

        /**
         * Remove all listeners from the Signal.
         */
        removeAll : function () {
            var n = this._bindings.length;
            while (n--) {
                this._bindings[n]._destroy();
            }
            this._bindings.length = 0;
        },

        /**
         * @return {number} Number of listeners attached to the Signal.
         */
        getNumListeners : function () {
            return this._bindings.length;
        },

        /**
         * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
         * <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
         * @see Signal.prototype.disable
         */
        halt : function () {
            this._shouldPropagate = false;
        },

        /**
         * Dispatch/Broadcast Signal to all listeners added to the queue.
         * @param {...*} [params] Parameters that should be passed to each handler.
         */
        dispatch : function (params) {
            if (! this.active) {
                return;
            }

            var paramsArr = Array.prototype.slice.call(arguments),
                n = this._bindings.length,
                bindings;

            if (this.memorize) {
                this._prevParams = paramsArr;
            }

            if (! n) {
                //should come after memorize
                return;
            }

            bindings = this._bindings.slice(); //clone array in case add/remove items during dispatch
            this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.

            //execute all callbacks until end of the list or until a callback returns `false` or stops propagation
            //reverse loop since listeners with higher priority will be added at the end of the list
            do { n--; } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
        },

        /**
         * Forget memorized arguments.
         * @see Signal.memorize
         */
        forget : function(){
            this._prevParams = null;
        },

        /**
         * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
         * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
         */
        dispose : function () {
            this.removeAll();
            delete this._bindings;
            delete this._prevParams;
        },

        /**
         * @return {string} String representation of the object.
         */
        toString : function () {
            return '[Signal active:'+ this.active +' numListeners:'+ this.getNumListeners() +']';
        }

    };


    // Namespace -----------------------------------------------------
    //================================================================

    /**
     * Signals namespace
     * @namespace
     * @name signals
     */
    var signals = Signal;

    /**
     * Custom event broadcaster
     * @see Signal
     */
    // alias for backwards compatibility (see #gh-44)
    signals.Signal = Signal;



    //exports to multiple environments
    if(typeof define === 'function' && define.amd){ //AMD
        define(function () { return signals; });
    } else if (typeof module !== 'undefined' && module.exports){ //node
        module.exports = signals;
    } else { //browser
        //use string because of Google closure compiler ADVANCED_MODE
        /*jslint sub:true */
        global['signals'] = signals;
    }

}(this));

},{}],2:[function(_dereq_,module,exports){
'use strict';

var ArrayUtils = {
    isArray: function(arr) {
        return arr instanceof Array;
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
    },
    getRandom: function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = ArrayUtils;
}

},{}],3:[function(_dereq_,module,exports){
'use strict';

var signals = _dereq_('signals');

function AssetLoader() {
    this.onChildComplete = new signals.Signal();
    this.onComplete = new signals.Signal();
    this.onProgress = new signals.Signal();
    this.onError = new signals.Signal();

    this.queue = [];
    this.index = 0;
    this.loaders = {};

    this.loaded = false;
    this.webAudioContext = null;
    this.crossOrigin = false;
    this.touchLocked = false;
    this.numTotal = 0;
    this.numLoaded = 0;
}

function createXHR() {
    var xhr, i, progId,
        progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];

    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    } else if (typeof window.ActiveXObject !== 'undefined') {
        for (i = 0; i < 3; i += 1) {
            progId = progIds[i];
            try {
                xhr = new window.ActiveXObject(progId);
            } catch (e) {}
        }
    }
    return xhr;
}

AssetLoader.prototype = {
    add: function(url, type) {
        var loader = new AssetLoader.Loader(url, type);
        loader.webAudioContext = this.webAudioContext;
        loader.crossOrigin = this.crossOrigin;
        loader.touchLocked = this.touchLocked;
        this.queue.push(loader);
        this.numTotal++;
        return loader;
    },
    start: function() {
        this.numTotal = this.queue.length;
        this.next();
    },
    next: function() {
        if(this.queue.length === 0) {
            this.loaded = true;
            this.onComplete.dispatch(this.loaders);
            return;
        }
        var loader = this.queue.pop();
        var self = this;
        loader.onComplete.addOnce(function(){
            self.numLoaded++;
            if(self.onProgress.getNumListeners() > 0) {
                self.onProgress.dispatch(self.numLoaded/self.numTotal);
            }
            self.loaders[loader.url] = loader;
            self.onChildComplete.dispatch(loader);
            self.next();
        });
        loader.onError.addOnce(function(){
            self.onError.dispatch(loader);
            self.next();
        });
        loader.start();
    },
    addMultiple: function(array) {
        for (var i = 0; i < array.length; i++) {
            this.add(array[i]);
        }
    },
    get: function(url) {
        return this.loaders[url];
    }
};

AssetLoader.Loader = function(url, type) {
    this.url = url;
    this.type = type || this.url.split('?')[0].toLowerCase().split('.').pop();

    this.onComplete = new signals.Signal();
    this.onError = new signals.Signal();
    this.onProgress = new signals.Signal();

    this.webAudioContext = null;
    this.crossOrigin = false;
    this.touchLocked = false;
};

AssetLoader.Loader.prototype = {
    start: function() {
        switch(this.type) {
            case 'mp3':
            case 'ogg':
                this.loadAudio(this.webAudioContext, this.touchLocked);
                break;
            case 'jpg':
            case 'png':
            case 'gif':
                this.loadImage(this.crossOrigin);
                break;
            case 'json':
                this.loadJSON();
                break;
            default:
                throw 'ERROR: Unknown type for file with URL: ' + this.url;
        }
    },
    loadAudio: function(webAudioContext, touchLocked) {
        if(webAudioContext) {
            this.loadWebAudio(webAudioContext);
        } else {
            this.loadHTML5Audio(touchLocked);
        }
    },
    loadWebAudio: function(webAudioContext) {
        var request = new XMLHttpRequest();
        request.open('GET', this.url, true);
        request.responseType = 'arraybuffer';
        var self = this;
        request.onprogress = function(event) {
            if (event.lengthComputable) {
                var percentComplete = event.loaded / event.total;
                self.onProgress.dispatch(percentComplete);
            }
        };
        request.onload = function() {
            webAudioContext.decodeAudioData(request.response, function(buffer) {
                self.data = buffer;
                self.onComplete.dispatch(buffer);
            }, function() {
                self.onError.dispatch();
            });
        };
        request.onerror = function() {
            self.onError.dispatch();
        };
        request.send();
        this.request = request;
    },
    loadHTML5Audio: function(touchLocked) {
        var request = new Audio();
        this.data = request;
        request.name = this.url;
        request.preload = 'auto';
        var self = this;
        request.src = this.url;
        if (!!touchLocked) {
            this.onProgress.dispatch(1);
            this.onComplete.dispatch(this.data);
        }
        else {
            var ready = function(){
                request.removeEventListener('canplaythrough', ready);
                clearTimeout(timeout);
                self.onProgress.dispatch(1);
                self.onComplete.dispatch(self.data);
            };
            // timeout because sometimes canplaythrough doesn't fire
            var timeout = setTimeout(ready, 2000);
            request.addEventListener('canplaythrough', ready, false);
            request.onerror = function() {
                clearTimeout(timeout);
                self.onError.dispatch();
            };
            request.load();
        }
    },
    loadImage: function(crossOrigin) {
        var request = new Image();
        this.data = request;
        request.name = this.url;
        var self = this;
        request.onload = function () {
            self.onComplete.dispatch(self.data);
        };
        request.onerror = function () {
            self.onError.dispatch();
        };
        if(crossOrigin) {
            request.crossOrigin = 'anonymous';
        }
        request.src = this.url;
        this.request = request;
    },
    loadJSON: function() {

        var request = createXHR();
        request.open('GET', this.url, true);
        request.responseType = 'text';
        var self = this;
        
        function handleLoaded() {
            if (request.status >= 400) {
                self.onError.dispatch();
                return;
            }
            self.json = self.data = JSON.parse(request.responseText);

            self.onComplete.dispatch(self.data);
        }

        function handleError() {
            self.onError.dispatch();
        }

        if ('onload' in request && 'onerror' in request) {
            request.onload = handleLoaded;
            request.onerror = handleError;
        } else {
            request.onreadystatechange = function () {
                try {
                    if (this.done !== undefined) { return; }

                    if (this.status >= 200 && this.status < 300) {
                        this.done = true;
                        handleLoaded();
                    }
                    if (this.status >= 400) {
                        this.done = true;
                        handleError();
                    }
                } catch(e) {}
            };
        }

        request.send();
        this.request = request;
    },
    cancel: function() {
      if(this.request && this.request.readyState !== 4) {
          this.request.abort();
      }
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = AssetLoader;
}

},{"signals":1}],4:[function(_dereq_,module,exports){
'use strict';

// webkitAudioContextMonkeyPatch is breaking Firefox
//require('./webkitAudioContextMonkeyPatch.js');

var WebAudio = _dereq_('./web-audio.js'),
    HTMLAudio = _dereq_('./html-audio.js'),
    PageVisibility = _dereq_('./visibility.js');

function AudioManager() {
    this.webAudioContext = WebAudio.createContext();
    this._sounds = {};
    this._delayTimeouts = [];
    this._ext = undefined;
    this._isSupported = undefined;
    this._touchLocked = false;
    this._queued = [];

    PageVisibility.onPageHidden.add(function() {
        this.pauseAll();
    }, this);
    PageVisibility.onPageShown.add(function() {
        this.resumeAll();
    }, this);
}

AudioManager.prototype = {
    add: function(key, data, loop) {
        var sound = this.webAudioContext && !data.tagName ? new WebAudio(this.webAudioContext) : new HTMLAudio();
        sound.loop = !!(loop);
        sound.add(data);
        this._sounds[key] = sound;
        return sound;
    },
    getExtension: function() {
        if(!this._ext) {
            var el = document.createElement('audio');
            this._ext = (el.canPlayType('audio/ogg; codecs="vorbis"') ? '.ogg' : '.mp3');
        }
        return this._ext;
    },
    isSupported: function() {
        if(this._isSupported === undefined) {
            try {
                var el = document.createElement('audio');
                this._isSupported = !!(el && (el.canPlayType('audio/ogg; codecs="vorbis"') || el.canPlayType('audio/mpeg;')));
            } catch(e) {
                this._isSupported = false;
            }
        }
        return this._isSupported;
    },
    webAudioSupported: function() {
        return !!this.webAudioContext;
    },
    get: function(key) {
        return this._sounds[key];
    },
    play: function(key, delay, loop) {
        if(this._touchLocked) {
            this.queueUp(key, delay, loop);
            return;
        }
        var sound = this._sounds[key];
        if(!sound) {
            return;
        }
        if(loop !== undefined) {
            sound.loop = loop;
        }
        if(delay !== undefined && delay > 0) {
            var delayed = setTimeout(function(){
                sound.play();
            }, delay);
            this._delayTimeouts.push(delayed);
        }
        else {
            sound.play();
        }
    },
    mute: function() {
        for(var i in this._sounds) {
            this._sounds[i].volume = 0;
        }
    },
    unMute: function() {
        for(var i in this._sounds) {
            this._sounds[i].volume = 1;
        }
    },
    pause: function(key) {
        if(!this._sounds[key]) {
            return;
        }
        this._sounds[key].pause();
    },
    stop: function(key) {
        if(!this._sounds[key]) {
            return;
        }
        this._sounds[key].stop();
    },
    pauseAll: function() {
        for(var i in this._sounds) {
            if(this._sounds[i].playing) {
                this._sounds[i].pause();
            }
        }
    },
    resumeAll: function() {
        for(var i in this._sounds) {
            if(this._sounds[i].paused) {
                this._sounds[i].play();
            }
        }
    },
    stopAll: function() {
        for(var key in this._sounds) {
            this._sounds[key].stop();
        }
        for (var i = 0; i < this._delayTimeouts.length; i++) {
            clearTimeout(this._delayTimeouts[i]);
        }
        this._delayTimeouts.length = 0;
    },
    getTouchLocked: function() {
        return this._touchLocked;
    },
    setTouchLocked: function(value) {
        this._touchLocked = value;

        var self = this;
        var unlock = function() {
            self._touchLocked = false;
            document.body.removeEventListener('touchstart', unlock);
            for (var i = 0; i < self._queued.length; i++) {
                self._queued[i]();
            }
            self._queued.length = 0;
        };

        if(this._touchLocked) {
            document.body.addEventListener('touchstart', unlock, false);
        }
    },
    queueUp: function(key, delay, loop) {
        var self = this;
        var fn = function() {
            self.play(key, delay, loop);
        };
        this._queued.push(fn);
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = AudioManager;
}

},{"./html-audio.js":10,"./visibility.js":33,"./web-audio.js":34}],5:[function(_dereq_,module,exports){
'use strict';

var Vec2 = _dereq_('./vec2.js');

function Boid()
{
    this._position = Vec2.get();
    this._velocity = Vec2.get();    
    this._steeringForce = Vec2.get();
    this._bounds = {x:0, y:0, width:640, height:480};
    this._edgeBehavior = Boid.EDGE_BOUNCE;
    this._mass = 1.0;
    this._maxSpeed = 10;
    this._maxForce = 1;
    // arrive
    this._arrivalThreshold = 50;
    // wander
    this._wanderDistance = 10;
    this._wanderRadius = 5;
    this._wanderAngle = 0;
    this._wanderRange = 1;
    // avoid
    this._avoidDistance = 300;
    this._avoidBuffer = 20;
    // follow path
    this._pathIndex = 0;
    this._pathThreshold = 20;
    // flock
    this._inSightDistance = 300;
    this._tooCloseDistance = 60;
}

// edge behaviors

Boid.EDGE_WRAP = 'wrap';
Boid.EDGE_BOUNCE = 'bounce';

Boid.prototype.setBounds = function(width, height, x, y) {
    this._bounds.width = width;
    this._bounds.height = height;
    this._bounds.x = x || 0;
    this._bounds.y = y || 0;
};

Boid.prototype.update = function() {
    // steer
    this._steeringForce.truncate(this._maxForce);
    //this._steeringForce = this._steeringForce.divide(this._mass, true);
    this._steeringForce.divideBy(this._mass);
    this._velocity = this._velocity.add(this._steeringForce, true);
    this._steeringForce.reset();
    // make sure velocity stays within max speed.
    this._velocity.truncate(this._maxSpeed);
    // add velocity to position
    this._position = this._position.add(this._velocity, true);
    // handle any edge behavior
    if(this._edgeBehavior === Boid.EDGE_WRAP) {
        this.wrap();
    }
    else if(this._edgeBehavior === Boid.EDGE_BOUNCE) {
        this.bounce();
    }
};

// Causes boid to bounce off edge if edge is hit
Boid.prototype.bounce = function() {
    if(this._position.x > this._bounds.width) {
        this._position.x = this._bounds.width;
        this._velocity.x *= -1;
    }
    else if(this._position.x < this._bounds.x) {
        this._position.x = this._bounds.x;
        this._velocity.x *= -1;
    }
    if(this._position.y > this._bounds.height) {
        this._position.y = this._bounds.height;
        this._velocity.y *= -1;
    }
    else if(this._position.y < this._bounds.y) {
        this._position.y = this._bounds.y;
        this._velocity.y *= -1;
    }
};

// Causes boid to wrap around to opposite edge if edge is hit
Boid.prototype.wrap = function() {
    if(this._position.x > this._bounds.width) {
        this._position.x = this._bounds.x;
    }
    else if(this._position.x < this._bounds.x) {
        this._position.x = this._bounds.width;
    }
    if(this._position.y > this._bounds.height) {
        this._position.y = this._bounds.y;
    }
    else if(this._position.y < this._bounds.y) {
        this._position.y = this._bounds.height;
    }
};

Boid.prototype.seek = function(targetVec) {
    var desiredVelocity = targetVec.subtract(this._position);
    desiredVelocity.normalize();
    desiredVelocity.scaleBy(this._maxSpeed);
    //desiredVelocity = desiredVelocity.multiply(this._maxSpeed, true);
    var force = desiredVelocity.subtract(this._velocity, true);
    this._steeringForce = this._steeringForce.add(force, true);

    force.dispose();
};

Boid.prototype.flee = function(targetVec) {
    var desiredVelocity = targetVec.subtract(this._position);
    desiredVelocity.normalize();
    desiredVelocity.scaleBy(this._maxSpeed);
    //desiredVelocity = desiredVelocity.multiply(this._maxSpeed, true);
    var force = desiredVelocity.subtract(this._velocity, true);
    // only this line different from seek:
    this._steeringForce = this._steeringForce.subtract(force, true);

    force.dispose();
};

// seek until withing arrivalThreshold
Boid.prototype.arrive = function(targetVec) {
    var desiredVelocity = targetVec.subtract(this._position);
    desiredVelocity.normalize();

    var distance = this._position.distance(targetVec);
    if(distance > this._arrivalThreshold) {
        desiredVelocity.scaleBy(this._maxSpeed);
        //desiredVelocity = desiredVelocity.multiply(this._maxSpeed, true);
    }
    else {
        var mul = this._maxSpeed * distance / this._arrivalThreshold;
        desiredVelocity.scaleBy(mul);
        //desiredVelocity = desiredVelocity.multiply(mul, true);
    }
    var force = desiredVelocity.subtract(this._velocity, true);
    this._steeringForce = this._steeringForce.add(force, true);

    force.dispose();
};

// look at velocity of boid and try to predict where it's going
Boid.prototype.pursue = function(targetBoid) {
    var lookAheadTime = this._position.distance(targetBoid._position) / this._maxSpeed;
    // e.g. of where new vec should be returned:
    var scaledVelocity = targetBoid._velocity.clone().scaleBy(lookAheadTime);
    var predictedTarget = targetBoid._position.add(scaledVelocity);
    //var predictedTarget = targetBoid._position.add(targetBoid._velocity.multiply(lookAheadTime));
    this.seek(predictedTarget);

    scaledVelocity.dispose();
    predictedTarget.dispose();
};

// look at velocity of boid and try to predict where it's going
Boid.prototype.evade = function(targetBoid) {
    var lookAheadTime = this._position.distance(targetBoid._position) / this._maxSpeed;
    // e.g. of where new vec should be returned:
    var scaledVelocity = targetBoid._velocity.clone().scaleBy(lookAheadTime);
    var predictedTarget = targetBoid._position.add(scaledVelocity);
    //var predictedTarget = targetBoid._position.add(targetBoid._velocity.multiply(lookAheadTime));
    // only this line diff from pursue:
    this.flee(predictedTarget);

    predictedTarget.dispose();
};

// wander around, changing angle by a limited amount each tick
Boid.prototype.wander = function() {
    var center = this._velocity.clone().normalize().scaleBy(this._wanderDistance);
    //var center = this._velocity.clone().normalize().multiply(this._wanderDistance, true);
    var offset = Vec2.get();
    offset.length = this._wanderRadius;
    offset.angle = this._wanderAngle;
    this._wanderAngle += Math.random() * this._wanderRange - this._wanderRange * 0.5;
    var force = center.add(offset, true);
    this._steeringForce = this._steeringForce.add(force, true);

    offset.dispose();
    force.dispose();
};

// gets a bit rough used in combination with seeking as the vehicle attempts 
// to seek straight through an object while simultaneously trying to avoid it
Boid.prototype.avoid = function(circles) {
    var l = circles.length;
    for (var i = 0; i < l; i++) {
        var circle = circles[i];
        var heading = this._velocity.clone().normalize();

        // vec between circle and boid
        var difference = circle.position.subtract(this._position);
        var dotProd = difference.dotProduct(heading);

        // if circle in front of boid
        if(dotProd > 0) {
            // vec to represent 'feeler' arm
            //var feeler = heading.multiply(this._avoidDistance);
            var feeler = heading.clone().scaleBy(this._avoidDistance);
            // project differebce onto feeler
            //var projection = heading.multiply(dotProd);
            var projection = heading.clone().scaleBy(dotProd);
            // distance from circle to feeler
            var vecDistance = projection.subtract(difference);
            var distance = vecDistance.length;
            // if feeler intersects circle (plus buffer), and projection
            // less than feeler length, will collide
            if(distance < circle.radius + this._avoidBuffer && projection.length < feeler.length) {
                // calc a force +/- 90 deg from vec to circ
                //var force = heading.multiply(this._maxSpeed);
                var force = heading.clone().scaleBy(this._maxSpeed);
                force.angle += difference.sign(this._velocity) * Math.PI / 2;
                // scale force by distance (further = smaller force)
                //force = force.multiply(1 - projection.length / feeler.length, true);
                force.scaleBy(1 - projection.length / feeler.length);
                // add to steering force
                this._steeringForce = this._steeringForce.add(force, true);
                // braking force - slows boid down so it has time to turn (closer = harder)
                //this._velocity = this._velocity.multiply(projection.length / feeler.length, true);
                this._velocity.scaleBy(projection.length / feeler.length);

                force.dispose();
            }
            feeler.dispose();
            projection.dispose();
            vecDistance.dispose();
        }
        heading.dispose();
        difference.dispose();
    }
};

// for defining obstacles or areas to avoid
Boid.Circle = function(radius, x, y) {
    console.log(radius, x, y);
    this.radius = radius;
    this.position = Vec2.get(x, y);
};

// follow a path made up of an array or vectors
Boid.prototype.followPath = function(path, loop) {
    loop = loop === undefined ? false : loop;
    var wayPoint = path[this._pathIndex];
    //console.log(wayPoint);
    if(!wayPoint) { return; }
    if(this._position.distance(wayPoint) < this._pathThreshold) {
        if(this._pathIndex >= path.length-1) {
            if(loop) { this._pathIndex = 0; }   
        }
        else {
            this._pathIndex++;
        }
    }
    if(this._pathIndex >= path.length-1 && !loop) {
        this.arrive(wayPoint);
    }
    else {
        this.seek(wayPoint);
    }
};

// flock - group of boids loosely move together
Boid.prototype.flock = function(boids) {
    var averageVelocity = this._velocity.clone();
    var averagePosition = Vec2.get();
    var inSightCount = 0;
    var l = boids.length;
    for (var i = 0; i < l; i++) {
        var boid = boids[i];
        if(boid !== this && this._inSight(boid)) {
            averageVelocity = averageVelocity.add(boid._velocity, true);
            averagePosition = averagePosition.add(boid._position, true);
            if(this._tooClose(boid)) {
                this.flee(boid._position);
            }
            inSightCount++;
        }
    }
    if(inSightCount > 0) {
        //averageVelocity = averageVelocity.divide(inSightCount, true);
        //averagePosition = averagePosition.divide(inSightCount, true);
        averageVelocity.divideBy(inSightCount);
        averagePosition.divideBy(inSightCount);
        this.seek(averagePosition);
        this._steeringForce.add(averageVelocity.subtract(this._velocity, true), true);
    }
    averageVelocity.dispose();
    averagePosition.dispose();
};

// is boid close enough to be in sight? for use with flock
Boid.prototype._inSight = function(boid) {
    if(this._position.distance(boid._position) > this._inSightDistance) {
        return false;
    }
    var heading = this._velocity.clone().normalize();
    var difference = boid._position.subtract(this._position);
    var dotProd = difference.dotProduct(heading);

    heading.dispose();
    difference.dispose();

    if(dotProd < 0) {
        return false;
    }
    return true;
};

// is boid too close? for use with flock
Boid.prototype._tooClose = function(boid) {
    return this._position.distance(boid._position) < this._tooCloseDistance;
};

// getters / setters
Object.defineProperty(Boid.prototype, 'position', {
    get: function() {
        return this._position;
    }
});

Object.defineProperty(Boid.prototype, 'velocity', {
    get: function() {
        return this._velocity;
    }
});

Object.defineProperty(Boid.prototype, 'edgeBehavior', {
    get: function() {
        return this.__edgeBehavior;
    },
    set: function(value) {
        this._edgeBehavior = value;
    }
});

if (typeof module === 'object' && module.exports) {
    module.exports = Boid;
}

},{"./vec2.js":30}],6:[function(_dereq_,module,exports){
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
    return  Math.max(window.outerHeight, window.screen.height);
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

},{}],7:[function(_dereq_,module,exports){
'use strict';

function FPS(el) {

    var ms = 0,
        fps = 0,
        currentFps = 0,
        averageFps = 0,
        ticks = 0,
        totalFps = 0;

    if(!el) {
        el = document.createElement('div');
        el.setAttribute('id', 'fps');
        el.style.position = 'absolute';
        el.style.top = '0px';
        el.style.right = '0px';
        el.style.padding = '2px 6px';
        el.style.zIndex = '9999';
        el.style.background = '#000';
        el.style.color = '#fff';
        document.body.appendChild(el);
    }

    function report() {
        el.innerHTML = 'FPS: ' + currentFps + '<br />AVE: ' + averageFps;
    }

    function update(time) {
        if(time === undefined) {
            time = Date.now();
        }
        if(ms === 0) {
            ms = time;
        }
        if (time - 1000 > ms) {
            ms = time;
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

    return {
        'update': update
    };
}

if(typeof module === 'object' && module.exports) {
    module.exports = FPS;
}

},{}],8:[function(_dereq_,module,exports){
'use strict';

var signals = _dereq_('signals');

var Fullscreen = (function() {

    var self,
        el = document.documentElement,
        isSupported = !!( el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen ),
        onChange = new signals.Signal();

    function onFullscreenChange() {
        onChange.dispatch(self.isFullscreen());
    }

    if(isSupported) {
        document.addEventListener('fullscreenchange', onFullscreenChange);
        document.addEventListener('mozfullscreenchange', onFullscreenChange);
        document.addEventListener('webkitfullscreenchange', onFullscreenChange);
        //document.addEventListener('msfullscreenchange', onFullscreenChange);
    }

    self = {
        'isSupported': isSupported,
        'onChange': onChange,

        enter: function(element) {
            element = element || document.documentElement;

            var method = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen;// || element.msRequestFullscreen;

            if (method) {
                method.call(element);
            }
        },
        exit: function() {
            var method = document.exitFullscreen || document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen;// || document.msExitFullscreen;

            if (method) {
                method.call(document);
            }
        },
        toggle: function(element) {
            if(this.isFullscreen()) {
                this.exit();
            } else {
                this.enter(element);
            }
        },
        isFullscreen: function() {
            return !!( document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen );// || document.msFullscreenElement );
        }
    };

    return self;

}());

if (typeof module === 'object' && module.exports) {
    module.exports = Fullscreen;
}

},{"signals":1}],9:[function(_dereq_,module,exports){
'use strict';

function Graphics(canvas) {
  this.init(canvas);
}

Graphics.prototype = {
  init: function(canvas) {
    if(canvas) {
      this.canvas = canvas;
      this.size(this.canvas.width, this.canvas.height);
    }
    else if(document.querySelector('canvas')) {
      this.canvas = document.querySelector('canvas');
      this.size(this.canvas.width, this.canvas.height);
    }
    else {
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
    if(color) {
      this.context.fillStyle = color;
      this.context.fillRect(0, 0, this.width, this.height);
    }
    else {
      this.context.clearRect(0, 0, this.width, this.height);
    }
  },
  background: function(r, g, b) {
    this.clear('rgb('+r+', '+b+', '+g+')');
  },
  fill: function(r, g, b, a) {
    if(typeof r === 'string') {
      this.context.fillStyle = r;
      return;  
    }
    a = a === undefined ? 1 : a;
    this.context.fillStyle = 'rgba('+r+', '+b+', '+g+', '+a+')';
  },
  stroke: function(r, g, b, a) {
    a = a === undefined ? 1 : a;
    this.context.strokeStyle = 'rgba('+r+', '+b+', '+g+', '+a+')';
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
    if(angle !== undefined && angle !== 0) {
      this.context.save();
      this.context.translate(x + width/2, y + height/2);
      this.context.rotate(angle);
      this.context.rect(-width/2, -height/2, width, height);
      this.context.fill();
      this.context.stroke();
      this.context.restore();
    }
    else {
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
    if(angle !== undefined && angle !== 0) {
      this.context.save();
      this.context.translate(x, y);
      this.context.rotate(angle);
      this.context.beginPath();
      this.context.moveTo(0 - width/2, 0 + height/2);
      this.context.lineTo(0, 0 - height/2);
      this.context.lineTo(0 + width/2, 0 + height/2);
      this.context.closePath();
      this.context.stroke();
      this.context.fill();
      this.context.restore();
    }
    else {
      this.context.beginPath();
      this.context.moveTo(x - width/2, y + height/2);
      this.context.lineTo(x, y - height/2);
      this.context.lineTo(x + width/2, y + height/2);
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
    if(angle !== undefined && angle !== 0) {
      var offsetX = img.width/2,
          offsetY = img.height/2;
      this.context.save();
      this.context.translate(x + offsetX, y + offsetY);
      this.context.rotate(angle);
      this.context.drawImage(img, -offsetX, -offsetY);
      this.context.restore();
    }
    else {
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
  }
};

if (typeof module === 'object' && module.exports) {
    module.exports = Graphics;
}

},{}],10:[function(_dereq_,module,exports){
'use strict';

function HTMLAudio() {
    this._sound = null;
    this._loop = false;
    this._volume = 1;
    this._playing = false;
    this._paused = false;
}

HTMLAudio.prototype = {
    add: function(el) {
        this._sound = el;
        return this._sound;
    },
    play: function() {
        if(this._sound.volume !== undefined) {
            this._sound.volume = this._volume;
        }
        this._sound.play();
        this._playing = true;
        this._paused = false;

        var self = this;
        this._sound.addEventListener('ended', function() {
            if(self._loop) {
                this.currentTime = 0;
                this.play();
            }
            else {
                self._playing = false;
            }
        }, false);
    },
    pause: function() {
        this._sound.pause();
        this._playing = false;
        this._paused = true;
    },
    stop: function() {
        this._sound.pause();
        this._playing = false;
        this._paused = false;
    }
};

Object.defineProperty(HTMLAudio.prototype, 'loop', {
    get: function() {
        return this._loop;
    },
    set: function(value) {
        this._loop = value;
    }
});

Object.defineProperty(HTMLAudio.prototype, 'volume', {
    get: function() {
        return this._volume;
    },
    set: function(value) {
        if(isNaN(value)) {
            return;
        }
        this._volume = value;
        if(this._sound && this._sound.volume !== undefined) {
            this._sound.volume = this._volume;
        }
    }
});

Object.defineProperty(HTMLAudio.prototype, 'playing', {
    get: function() {
        return this._playing;
    }
});

Object.defineProperty(HTMLAudio.prototype, 'paused', {
    get: function() {
        return this._paused;
    }
});

Object.defineProperty(HTMLAudio.prototype, 'sound', {
    get: function() {
        return this._sound;
    }
});

if (typeof module === 'object' && module.exports) {
    module.exports = HTMLAudio;
}

},{}],11:[function(_dereq_,module,exports){
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

		listen: function(on) {
			if(on) {
				document.body.addEventListener('mousemove', calculateCoords);
				document.body.addEventListener('touchmove', calculateCoords);
			}
			else {
				document.body.removeEventListener('mousemove', calculateCoords);
				document.body.removeEventListener('touchmove', calculateCoords);	
			}
			self.isListening = on;
			return this;
		}
	};
	return self;
}

if (typeof module === 'object' && module.exports) {
    module.exports = InputCoords;
}

},{}],12:[function(_dereq_,module,exports){
'use strict';

var Keyboard = _dereq_('./keyboard.js');

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

},{"./keyboard.js":13}],13:[function(_dereq_,module,exports){
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

},{}],14:[function(_dereq_,module,exports){
'use strict';

(function(fn) {
    window.console = window.console || {log:fn,warn:fn,error:fn,table:fn};
    window.console.table = window.console.table || fn;
}(function(){}));
},{}],15:[function(_dereq_,module,exports){
/*
 * ie8, ie9
 */

'use strict';

var hasClass = function(el, className) {
    if (el.classList) {
        return el.classList.contains(className);
    }
    else {
        return el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
};

var removeClass = function(el, className) {
    if (el.classList) {
        el.classList.remove(className);
    }
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
};

var addClass = function(el, className) {
    removeClass(el, className);
    if (el.classList) {
        el.classList.add(className);
    } else {
        el.className += ' ' + className;
    }
};

var toggleClass = function(el, className) {
    if (el.classList) {
        el.classList.toggle(className);
    }
    else {
        if (hasClass(el, className)) {
            removeClass(el, className);
        } else {
            addClass(el, className);
        }
    }
};

var CssUtils = {
    'addClass': addClass,
    'hasClass': hasClass,
    'removeClass': removeClass,
    'toggleClass': toggleClass
};

if (typeof module === 'object' && module.exports) {
    module.exports = CssUtils;
}

},{}],16:[function(_dereq_,module,exports){
/*
 * ie8
 */

'use strict';

var getEvent = function (e, el) {
    if (!e) { e = window.event; }

    if (e.srcElement) {
        e.target = e.srcElement;
        e.currentTarget = el;
        e.preventDefault = function () {
            e.returnValue = false;
        };
        e.stopPropagation = function () {
            e.cancelBubble = true;
        };
    }
    return e;
};

var addEvent = (function () {
    if (document.addEventListener) {
        return function (el, type, fn) {
            el.addEventListener(type, fn, false);
        };
    } else {
        return function (el, type, fn) {
            el.attachEvent('on' + type, function (e) {
                e = getEvent(e, el);
                fn(e);
            });
        };
    }
}());

var removeEvent = (function () {
    if (document.addEventListener) {
        return function (el, type, fn) {
            el.removeEventListener(type, fn, false);
        };
    } else {
        return function (el, type, fn) {
            el.detachEvent('on' + type, fn);
        };
    }
}());

var EventUtils = {
    'addEvent': addEvent,
    'removeEvent': removeEvent
};

if (typeof module === 'object' && module.exports) {
    module.exports = EventUtils;
}

},{}],17:[function(_dereq_,module,exports){
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

},{}],18:[function(_dereq_,module,exports){
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

},{}],19:[function(_dereq_,module,exports){
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

},{}],20:[function(_dereq_,module,exports){
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

},{}],21:[function(_dereq_,module,exports){
/*
 * ie8, ie9, safari 6 (osx and ios)
 */

'use strict';

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] ||
        window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
 
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());
},{}],22:[function(_dereq_,module,exports){
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

},{}],23:[function(_dereq_,module,exports){
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

},{}],24:[function(_dereq_,module,exports){
'use strict';

var popup = _dereq_('./popup.js');

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

},{"./popup.js":20}],25:[function(_dereq_,module,exports){
'use strict';

var signals = signals || _dereq_('signals');

/*
 * StateMachine
 */

function StateMachine() {
	this._states = {};
	this._initial = null;
	this._currentState = null;
	this._previousState = null;
	this._cancelled = null;
	this._hasChanged = false;
	this._actionQueue = [];
	this._history = [];
	this._factory = new StateMachine.Factory(this);
	this._onChange = new signals.Signal();
}

StateMachine.prototype = {
	start: function() {
		if ( !this._initial ) {
			throw 'State Machine cannot start. No states defined.';
		}
		this._transitionTo( this._initial, null );
	},
	action: function(action, data) {
		// Check if current action transition is complete
		if(!this._hasChanged) {
			// Queue the new action and exit
			this._actionQueue.push({
				'action': action,
				'data': data
			});
			return;
		}
		// Check if we're already in the correct state
		if (this._currentState && this._currentState.getTarget(action) === this._currentState.name) {
			return;
		}
		var newStateTarget = this._currentState.getTarget( action );
		var newState = this._states[ newStateTarget ];
		// Only transition if there's a state associated with the action
		if( newState ) {
			this._transitionTo( newState, data );
		}
	},
	_transitionTo: function( nextState, data ) {
		this._hasChanged = false;

		if ( nextState === null ) {
			return;
		}

		this._cancelled = false;

		// Exit current
		if ( this._currentState && this._currentState.onExit.getNumListeners() > 0 ) {
			this._currentState.onExit.dispatch(data);
		}

		// Has transition been been cancelled on Exit guard?
		if ( this._cancelled ) {
			this._cancelled = false;
			return;
		}
		
		// Enter next State
		if ( nextState.onEnter.getNumListeners() > 0 ) {
			nextState.onEnter.dispatch(data);
		}
		
		// Has transition been been cancelled on Enter guard?
		if ( this._cancelled ) {
			this._cancelled = false;
			return;
		}

		// Set previous state and save name in history array
		if(this._currentState) {
			this._previousState = this._currentState;
			this._history.push(this._previousState.name);
		}

		// Update current state now both guards have been passed
		this._currentState = nextState;
		
		// Dispatch specific Change notification for this State 
		if ( nextState.onChange.getNumListeners() > 0 ) {
			nextState.onChange.dispatch(data);
		}

		// Dispatch general Change notification 
		this._onChange.dispatch(this._currentState.name, data);

		// Set hasChanged flag to true
		this._hasChanged = true;

		// Process action queue
		this._processActionQueue();
	},
	_processActionQueue: function() {
		if(this._actionQueue.length > 0) {
			var stateEvent = this._actionQueue.shift();

			// If currentState has no state for that action go to the next one
			if(!this._currentState.getTarget(stateEvent.action)) {
				this._processActionQueue();
			}
			else {
				this.action(stateEvent.action, stateEvent.data);
			}
		}
	},
	cancel: function() {
		this._cancelled = true;
	},
	addState: function( state, isInitial ) {
		if ( state === null || this._states[ state.name ]) {
			return null;
		}
		this._states[ state.name ] = state;
		if ( isInitial ) {
			this._initial = state;
		}
		return state;
	},
	removeState: function( stateName ) {
		var state = this._states[ stateName ];
		if ( state === null ) {
			return;
		}
		this._states[ stateName ] = null;
	},
	getState: function(stateName) {
		return this._states[stateName];
	}
};

Object.defineProperty(StateMachine.prototype, 'onChange', {
	get: function() {
		return this._onChange;
	}
});

Object.defineProperty(StateMachine.prototype, 'currentState', {
	get: function() {
		return this._currentState;
	}
});

Object.defineProperty(StateMachine.prototype, 'previousState', {
	get: function() {
		return this._previousState;
	}
});

Object.defineProperty(StateMachine.prototype, 'states', {
	get: function() {
		return this._states;
	}
});

Object.defineProperty(StateMachine.prototype, 'initial', {
	get: function() {
		return this._initial;
	}
});

Object.defineProperty(StateMachine.prototype, 'history', {
	get: function() {
		return this._history;
	}
});

Object.defineProperty(StateMachine.prototype, 'factory', {
	get: function() {
		return this._factory;
	}
});

/*
 * State
 */

StateMachine.State = function(name) {
	this._transitions = {};
	this._name = name;
	this._onChange = new signals.Signal();
	this._onEnter = new signals.Signal();
	this._onExit = new signals.Signal();
};

StateMachine.State.prototype = {
	addTransition: function(action, target) {
		if ( this.getTarget( action ) ) {
			return;
		}
		this._transitions[ action ] = target;
	},
	removeTransition: function(action) {
		this._transitions[ action ] = null;
	},
	getTarget: function(action)	{
		return this._transitions[ action ];
	}
};

Object.defineProperty(StateMachine.State.prototype, 'name', {
	get: function() {
		return this._name;
	}
});

Object.defineProperty(StateMachine.State.prototype, 'transitions', {
	get: function() {
		return this._transitions;
	}
});

Object.defineProperty(StateMachine.State.prototype, 'onChange', {
	get: function() {
		return this._onChange;
	}
});

Object.defineProperty(StateMachine.State.prototype, 'onEnter', {
	get: function() {
		return this._onEnter;
	}
});

Object.defineProperty(StateMachine.State.prototype, 'onExit', {
	get: function() {
		return this._onExit;
	}
});

/*
 * Factory
 */

StateMachine.Factory = function(fsm) {
	this.fsm = fsm;
};

StateMachine.Factory.prototype = {
	add: function(config) {
		var state = new StateMachine.State(config.name);
		var transitions = config.transitions;
		if(transitions) {
			for (var i = 0; i < transitions.length; i++) {
				state.addTransition(transitions[i].action, transitions[i].target);
				if(typeof config.onChange === 'function') {
					state.onChange.add(config.onChange);
				}
				if(typeof config.onEnter === 'function') {
					state.onEnter.add(config.onEnter);
				}
				if(typeof config.onExit === 'function') {
					state.onExit.add(config.onExit);
				}
			}
		}
		var isInitial = this.getTotal() === 0 || config.initial;
		this.fsm.addState(state, isInitial);
	},
	addMultiple: function(arr) {
		for (var i = 0; i < arr.length; i++) {
			this.add(arr[i]);
		}
	},
	create: function(name, transitions, isInitial) {
		var state = new StateMachine.State(name);
		if(transitions !== undefined) {
			for (var i = 0; i < transitions.length; i++) {
				state.addTransition(transitions[i].action, transitions[i].target);
			}
		}
		this.fsm.addState(state, isInitial);
		return state;
	},
	getTotal: function() {
		var i = 0;
		for(var key in this.fsm.states) {
			if(this.fsm.states.hasOwnProperty(key) && this.fsm.states[key] !== null){
				i++;
			}
		}
		return i;
	}
};

/*
 * Debug View
 */

StateMachine.DebugView = function(fsm) {

	var container = document.createElement('div');

	function updateState(name) {
		var all = container.querySelectorAll('div');
		for (var i = 0; i < all.length; i++) {
			all[i].style.display = all[i].getAttribute('data-state') === name ? 'block' : 'none';
		}
	}

	function createButton(action) {
		var b = document.createElement('button');
		b.setAttribute('data-action', action);
		b.addEventListener('click', function() {
			var a = this.getAttribute('data-action');
			fsm.action(a);
		});
		b.innerHTML = action;
		return b;
	}

	for(var key in fsm.states) {
		var s = fsm.states[key];
		var d = document.createElement('div');
		d.setAttribute('data-state', s.name);
		d.style.display = 'none';
		
		var h = document.createElement('h3');
		h.innerHTML = 'State: ' + s.name;
		d.appendChild(h);

		var transitions = s.transitions;
		if(transitions) {
			for(var a in transitions) {
				if(transitions.hasOwnProperty(a)) {
					d.appendChild(createButton(a));
				}
			}
		}
		container.appendChild(d);
	}

	fsm.onChange.add(function(name) {
		updateState(name);
	});

	if(fsm.currentState) {
		updateState(fsm.currentState.name);
	}

	return container;
};

if(typeof module === 'object' && module.exports) {
	module.exports = StateMachine;
}

},{"signals":1}],26:[function(_dereq_,module,exports){
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

},{}],27:[function(_dereq_,module,exports){
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

/*
 * Query
 */

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

// whether str begins with substr
function beginsWith(str, substr) {
    return str.indexOf(substr) === 0;
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
        if (endIndex !== -1) { substr = str.substr(startIndex, endIndex-startIndex); }
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
    if(delim === undefined) {
        delim = '.';
    }
    var arr = [];
    if (str === null || !contains(str, delim)) { return arr; }
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
        arr.push(subString);
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

    // query:
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
    'beginsWith': beginsWith,
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

},{}],28:[function(_dereq_,module,exports){
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

},{}],29:[function(_dereq_,module,exports){
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

},{}],30:[function(_dereq_,module,exports){
'use strict';

function Vec2(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Vec2.prototype = {
    add: function(vec, overwrite) {
        if(overwrite) {
            this.x = this.x + vec.x;
            this.y = this.y + vec.y;
            return this;
        }
        return Vec2.get(this.x + vec.x, this.y + vec.y);
    },
    subtract: function(vec, overwrite) {
        if(overwrite) {
            this.x = this.x - vec.x;
            this.y = this.y - vec.y;
            return this;
        }
        return Vec2.get(this.x - vec.x, this.y - vec.y);
    },
    multiply: function(vec, overwrite) {
        if(overwrite) {
            this.x = this.x * vec.x;
            this.y = this.y * vec.y;
            return this;
        }
        return Vec2.get(this.x * vec.x, this.y * vec.y);
    },
    divide: function(vec, overwrite) {
        if(overwrite) {
            this.x = this.x / vec.x;
            this.y = this.y / vec.y;
            return this;
        }
        return Vec2.get(this.x / vec.x, this.y / vec.y);
    },
    normalize: function() {
        var l = this.length;
        if(l === 0) {
            this.x = 1;
            return this;
        }
        this.x /= l;
        this.y /= l;
        return this;
    },
    isNormalized: function() {
        return this.length === 1;
    },
    truncate:  function(max) {
        if(this.length > max) {
            this.length = max;
        }
        return this;
    },
    scaleBy: function(mul) {
        this.x *= mul;
        this.y *= mul;
        return this;
    },
    divideBy: function(div) {
        this.x /= div;
        this.y /= div;
        return this;
    },
    equals: function(vec) {
        return this.x === vec.x &&
            this.y === vec.y;
    },
    negate: function() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    },
    reverse: function() {
        this.negate();
        return this;
    },
    dotProduct: function(vec) {
        /*
        If A and B are perpendicular (at 90 degrees to each other), the result of the dot product will be zero, because cos(Θ) will be zero.
        If the angle between A and B are less than 90 degrees, the dot product will be positive (greater than zero), as cos(Θ) will be positive, and the vector lengths are always positive values.
        If the angle between A and B are greater than 90 degrees, the dot product will be negative (less than zero), as cos(Θ) will be negative, and the vector lengths are always positive values
        */
        return this.x * vec.x + this.y * vec.y;
    },
    crossProduct: function(vec) {
        /*
        The sign tells us if vec to the left (-) or the right (+) of this vec
        */
        return this.x * vec.y - this.y * vec.x;
    },
    distanceSquared: function(vec) {
        var dx = vec.x - this.x;
        var dy = vec.y - this.y;
        return dx * dx + dy * dy;
    },
    distance: function(vec) {
        return Math.sqrt(this.distanceSquared(vec));
    },
    clone: function() {
        return Vec2.get(this.x, this.y);
    },
    zero: function() {
        this.x = 0;
        this.y = 0;
        return this;
    },
    isZero: function() {
        return this.x === 0 && this.y === 0;
    },
    reset: function() {
        return this.zero();
    },
    perpendicular: function() {
        return Vec2.get(-this.y, this.x);
    },
    sign: function(vec) {
        // Determines if a given vector is to the right or left of this vector.
        // If to the left, returns -1. If to the right, +1.
        var p = this.perpendicular();
        var s = p.dotProduct(vec) < 0 ? -1 : 1;
        p.dispose();
        return s;
    },
    set: function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        return this;
    },
    dispose: function() {
        Vec2.pool.push(this.zero());
    }
};

// static
Vec2.pool = [];
Vec2.get = function(x, y) {
    var v = Vec2.pool.length > 0 ? Vec2.pool.pop() : new Vec2();
    v.set(x, y);
    return v;
};

Vec2.angleBetween = function(a, b) {
    if(!a.isNormalized()) { a = a.clone().normalize(); }
    if(!b.isNormalized()) { b = b.clone().normalize(); }
    return Math.acos(a.dotProduct(b));
};

// getters / setters
Object.defineProperty(Vec2.prototype, 'lengthSquared', {
    get: function() {
        return this.x * this.x + this.y * this.y;
    }
});

Object.defineProperty(Vec2.prototype, 'length', {
    get: function() {
        return Math.sqrt(this.lengthSquared);
    },
    set: function(value) {
        var a = this.angle;
        this.x = Math.cos(a) * value;
        this.y = Math.sin(a) * value;
    }
});

Object.defineProperty(Vec2.prototype, 'angle', {
    get: function() {
        return Math.atan2(this.y, this.x);
    },
    set: function(value) {
        var l = this.length;
        this.x = Math.cos(value) * l;
        this.y = Math.sin(value) * l;
    }
});

if (typeof module === 'object' && module.exports) {
    module.exports = Vec2;
}

},{}],31:[function(_dereq_,module,exports){
'use strict';

var signals = _dereq_('signals');

function VideoObject() {
    var NETWORK_STATE = ['NETWORK_EMPTY','NETWORK_IDLE', 'NETWORK_LOADING', 'NETWORK_NO_SOURCE'],
        READY_STATE = ['HAVE_NOTHING','HAVE_METADATA', 'HAVE_CURRENT_DATA', 'HAVE_FUTURE_DATA', 'HAVE_ENOUGH_DATA'],
        ERROR_STATE = ['','ABORTED', 'NETWORK', 'DECODE', 'SRC_NOT_SUPPORTED'],
        self,
        videoElement = null,
        onReady = new signals.Signal(),
        onPlay = new signals.Signal(),
        onError = new signals.Signal(),
        onEnded = new signals.Signal(),
        onTimeUpdate = new signals.Signal(),
        forceLoadTimeout = null;

    var canplayHandler = function() {
        onReady.dispatch(self);
    };

    var playHandler = function() {
        onPlay.dispatch(self);
    };

    var endedHandler = function() {
        onEnded.dispatch(self);
    };

    var errorHandler = function(event) {
        onError.dispatch(self, event.target.error);
    };

    var timeupdateHandler = function() {
        if(onTimeUpdate.getNumListeners() > 0) {
            onTimeUpdate.dispatch(self, videoElement.currentTime);
        }
    };

    var create = function() {
        if(videoElement !== null) {
            return;
        }
        videoElement = document.createElement('video');
        videoElement.addEventListener('canplaythrough', canplayHandler, false);
        videoElement.addEventListener('play', playHandler, false);
        videoElement.addEventListener('playing', playHandler, false);
        //videoElement.addEventListener('loadedmetadata', canplayHandler, false);
        //videoElement.addEventListener('loadeddata', loadedHandler, false);
        videoElement.addEventListener('error', errorHandler, false);
        videoElement.addEventListener('ended', endedHandler, false);
        videoElement.addEventListener('timeupdate', timeupdateHandler, false);
    };

    var unload = function() {
        clearTimeout(forceLoadTimeout);

        onReady.removeAll();
        onPlay.removeAll();
        onError.removeAll();
        onEnded.removeAll();
        onTimeUpdate.removeAll();

        if(videoElement === null) {
            return;
        }

        videoElement.pause();

        try {
            videoElement.removeAttribute('src');
            //videoElement.setAttribute('src', '');
            //videoElement.load();
        } catch(e) {}
    };

    var destroy = function() {
        unload();
        if(videoElement === null) {
            return;
        }

        videoElement.removeEventListener('canplaythrough', canplayHandler, false);
        videoElement.removeEventListener('play', playHandler, false);
        videoElement.removeEventListener('playing', playHandler, false);
        //videoElement.removeEventListener('loadedmetadata', canplayHandler, false);
        //videoElement.removeEventListener('loadeddata', loadedHandler, false);
        videoElement.removeEventListener('error', errorHandler, false);
        videoElement.removeEventListener('ended', endedHandler, false);
        videoElement.removeEventListener('timeupdate', timeupdateHandler, false);

        if(videoElement.parentElement) {
            videoElement.parentElement.removeChild(videoElement);
        }
        videoElement = null;
    };

    var load = function(url) {
        if(videoElement === null) {
            create();
        }
        videoElement.setAttribute('preload', 'auto');
        //videoElement.setAttribute('autoplay', false);
        //videoElement.setAttribute('poster', 'assets/img/wallpapers/test-medium.jpg');
        videoElement.setAttribute('src', url);
        videoElement.load();
    };

    var forceLoad = function(pauseDelay) {
        if(pauseDelay === undefined) {
            pauseDelay = 40;
        }
        play();
        forceLoadTimeout = setTimeout(function() {
            pause();
            seek(0);
        }, pauseDelay);
    };

    var play = function() {
        if(videoElement) {
            clearTimeout(forceLoadTimeout);
            videoElement.play();
        }
    };

    var pause = function() {
        if(videoElement) {
            videoElement.pause();
        }
    };

    var seek = function(time) {
        try {
            videoElement.currentTime = time;
        } catch(e) {

        }
    };

    var getNetworkStateString = function() {
        if(videoElement) {
            var i = videoElement.networkState;
            return NETWORK_STATE[i];
        }
        return '';
    };

    var getReadyStateString = function() {
        if(videoElement) {
            var i = videoElement.readyState;
            return READY_STATE[i];
        }
        return '';
    };

    var getErrorStateString = function() {
        if(videoElement) {
            var i = videoElement.error ? videoElement.error.code : 0;
            return ERROR_STATE[i];
        }
        return '';
    };

    var getBufferProgress = function() {
        if(isNaN(videoElement.duration)) {
            return -1;
        }
        var p = -1;
        if (videoElement.buffered && videoElement.buffered.length > 0 && videoElement.buffered.end && videoElement.duration) {
            p = videoElement.buffered.end(0) / videoElement.duration;
            if(isNaN(p)) {
                p = -1;
            }
        }
        return Math.round(p * 10) / 10;
    };

    self = {
        'onReady': onReady,
        'onPlay': onPlay,
        'onError': onError,
        'onEnded': onEnded,
        'onTimeUpdate': onTimeUpdate,

        'create': create,
        'load': load,
        'forceLoad': forceLoad,
        'unload': unload,
        'destroy': destroy,
        'play': play,
        'pause': pause,
        'seek': seek,
        'getBufferProgress': getBufferProgress,
        'getReadyStateString': getReadyStateString,
        'getNetworkStateString': getNetworkStateString,
        'getErrorStateString': getErrorStateString,

        getElement: function() {
            return videoElement;
        },
        getVolume: function() {
            if(videoElement === null) {
                return NaN;
            }
            return videoElement.volume;
        },
        setVolume: function(value) {
            if(videoElement === null) {
                return;
            }
            videoElement.volume = value;
        }
    };

    return self;
}

if (typeof module === 'object' && module.exports) {
    module.exports = VideoObject;
}

},{"signals":1}],32:[function(_dereq_,module,exports){
'use strict';

var signals = _dereq_('signals'),
    resizeUtil = _dereq_('./resize.js'),
    EventUtils = _dereq_('./legacy/event-utils.js');

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
        this.onResize.dispatch();
    },
    mouseLeftWindow: function(fn, context) {
        EventUtils.addEvent('mouseout', document, function(e) {
            e = e ? e : window.event;
            var from = e.relatedTarget || e.toElement;
            if (!from || from.nodeName === 'HTML') {
                fn.call(context || this);
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
    },
    onResize: new signals.Signal()
};

if (typeof module === 'object' && module.exports) {
    module.exports = ViewPort;
}

},{"./legacy/event-utils.js":16,"./resize.js":23,"signals":1}],33:[function(_dereq_,module,exports){
'use strict';

var signals = _dereq_('signals');

var onPageHidden = new signals.Signal(),
    onPageShown = new signals.Signal(),
    hidden, visibilityChange;

function onVisibilityChange() {
    if (document[hidden]) {
        onPageHidden.dispatch();
    } else {
        onPageShown.dispatch();
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

var Visibility = {
    onPageShown: onPageShown,
    onPageHidden: onPageHidden
};

if (typeof module === 'object' && module.exports) {
    module.exports = Visibility;
}

},{"signals":1}],34:[function(_dereq_,module,exports){
'use strict';

function WebAudio(context) {
    this.context = context || WebAudio.createContext();
    if(!this.context) { return; }
    this._sound = [];
    this._node = [];
    this._gain = this.context.createGain();
    this._gain.connect(this.context.destination);
    this._startedAt = 0;
    this._pausedAt = 0;
    this._loop = false;
    this._playing = false;
    this._nodeFactory = new WebAudio.NodeFactory(this.context);
}

WebAudio.prototype = {
    add: function(buffer) {
        this._sound.push(new WebAudio.Sound(buffer, this.context));
        this._sound[this._sound.length-1].loop = this._loop;
        return this._sound[this._sound.length-1];
    },
    play: function() {
        var maxDuration = -1,
            longestSound;
        for (var i = 0; i < this._sound.length; i++) {
            this._sound[i].stop();
            this._sound[i].connect(this._gain);
            this._sound[i].play(0, this._pausedAt / 1000);
            if(this._sound[i].duration > maxDuration) {
                maxDuration = this._sound[i].duration;
                longestSound = this._sound[i];
            }
        }
        var self = this;
        longestSound.source.onended = function() {
            self._playing = false;
        };
        this._startedAt = Date.now() - this._pausedAt;
        this._playing = true;
    },
    pause: function() {
        this.stop();
        this._pausedAt = Date.now() - this._startedAt;
    },
    stop: function() {
        for (var i = 0; i < this._sound.length; i++) {
            this._sound[i].stop();
        }
        this._pausedAt = 0;
        this._playing = false;
    }
};

Object.defineProperty(WebAudio.prototype, 'loop', {
    get: function() {
        return this._loop;
    },
    set: function(value) {
        this._loop = value;
        for (var i = 0; i < this._sound.length; i++) {
            this._sound[i].loop = value;
        }
    }
});

Object.defineProperty(WebAudio.prototype, 'volume', {
    get: function() {
        return this._gain.gain.value;
    },
    set: function(value) {
        if(isNaN(value)) {
            return;
        }
        this._gain.gain.value = value;
    }
});

Object.defineProperty(WebAudio.prototype, 'playing', {
    get: function() {
        return this._playing;
    }
});

Object.defineProperty(WebAudio.prototype, 'paused', {
    get: function() {
        return this._pausedAt > 0;
    }
});

Object.defineProperty(WebAudio.prototype, 'sound', {
    get: function() {
        return this._sound;
    }
});

Object.defineProperty(WebAudio.prototype, 'nodeFactory', {
    get: function() {
        return this._nodeFactory;
    }
});

/*
 * Context
 */

WebAudio.createContext = function() {
    var context = null;
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    if(window.AudioContext) {
        context = new window.AudioContext();
    }
    return context;
};

/*
 * Sound
 */

WebAudio.Sound = function(buffer, context) {
    this._buffer = buffer;
    this._context = context;
    this._source = null;
    this._node = [];
    this._loop = false;
    this.name = '';
};

WebAudio.Sound.prototype = {
    play: function(delay, offset) {
        if(delay === undefined) {
            delay = 0;
        }
        else if(delay > 0) {
            delay = this._context.currentTime + delay;
        }
        if(offset === undefined) {
            offset = 0;
        }
        this.source.loop = this._loop;
        this.source.start(delay, offset);
    },
    stop: function() {
        if(this._source) {
            this._source.stop(0);
            this._source = null;
        }
    },
    connect: function(node) {
        if(this._node.length > 0) {
            this._node[this._node.length - 1].connect(node);
        }
        else {
            this.source.connect(node);
        }
        this.destination = node;
    },
    addNode: function(node) {
        this._node.push(node);
        this.updateConnections();
    },
    updateConnections: function() {
        if(!this._source) {
            return;
        }
        for (var i = 0; i < this._node.length; i++) {
            if(i === 0) {
                this._source.connect(this._node[i]);
            }
            else {
                this._node[i-1].connect(this._node[i]);
            }
        }
        if(this.destination) {
            this.connect(this.destination);
        }
    }
};

Object.defineProperty(WebAudio.Sound.prototype, 'source', {
    get: function() {
        if(!this._source) {
            this._source = this._context.createBufferSource();
            this._source.buffer = this._buffer;
            this.updateConnections();
        }
        return this._source;
    }
});

Object.defineProperty(WebAudio.Sound.prototype, 'loop', {
    get: function() {
        return this._loop;
    },
    set: function(value) {
        this._loop = value;
    }
});

Object.defineProperty(WebAudio.Sound.prototype, 'duration', {
    get: function() {
        return this._buffer ? this._buffer.duration : 0;
    }
});

/*
 * Nodes
 */

WebAudio.NodeFactory = function(context) {

    function createFilter(type, frequency) {
        var filterNode = context.createBiquadFilter();
        filterNode.type = type;
        if(frequency !== undefined) {
            filterNode.frequency.value = frequency;
        }
        return filterNode;
    }

    function setOptionalParam(value, defaultValue) {
        if(value === undefined) {
            value = defaultValue;
        }
        return value;
    }

    return {
        gain: function(value) {
            var node = context.createGain();
            if(value !== undefined) {
                node.gain.value = value;
            }
            return node;
        },
        pan: function(x, y, z) {
            var node = context.createPanner();
            setOptionalParam(x, 0);
            setOptionalParam(y, 0);
            setOptionalParam(z, 0.5);
            node.setPosition(x, y, z);
            return node;
        },
        filter: {
            lowpass: function(frequency) {
                return createFilter('lowpass', frequency);
            },
            highpass: function(frequency) {
                return createFilter('highpass', frequency);
            },
            bandpass: function(frequency) {
                return createFilter('bandpass', frequency);
            },
            lowshelf: function(frequency) {
                return createFilter('lowshelf', frequency);
            },
            highshelf: function(frequency) {
                return createFilter('highshelf', frequency);
            },
            peaking: function(frequency) {
                return createFilter('peaking', frequency);
            },
            notch: function(frequency) {
                return createFilter('notch', frequency);
            },
            allpass: function(frequency) {
                return createFilter('allpass', frequency);
            }
        },
        delay: function(time) {
            var node = context.createDelay();
            if(time !== undefined) {
                node.delayTime = time;
            }
            return node;
        },
        convolver: function() {
            var node = context.createConvolver();
            return node;
        },
        analyser: function() {
            var node = context.createAnalyser();
            node.smoothingTimeConstant = 0.85;
            return node;
        }
    };
};

/*
 * Effects
 */

WebAudio.Effects = function(context) {

    function ramp(param, value, duration) {
        param.linearRampToValueAtTime(value, context.currentTime + duration);
    }

    return {
        fade: function(gainNode, value, duration) {
            ramp(gainNode.gain, value, duration);
        }
    };
};

if (typeof module === 'object' && module.exports) {
    module.exports = WebAudio;
}

},{}],35:[function(_dereq_,module,exports){
'use strict';

_dereq_('./lib/legacy/console-patch.js'); // ie8
_dereq_('./lib/raf-polyfill.js'); // iOS6 (prefix), ie9, iOS5, Android < 4.4

var usfl = {};

/*
 * instance
 */

usfl.array = _dereq_('./lib/array-utils.js');
usfl.css = _dereq_('./lib/legacy/css-utils.js'); // for ie9, Android 2
usfl.device = _dereq_('./lib/device.js');
usfl.event = _dereq_('./lib/legacy/event-utils.js'); // for ie8
usfl.fullscreen = _dereq_('./lib/fullscreen.js');
usfl.keyboard = _dereq_('./lib/keyboard.js');
usfl.math = _dereq_('./lib/math-utils.js');
usfl.share = _dereq_('./lib/share.js');
usfl.storage = _dereq_('./lib/storage-utils.js');
usfl.string = _dereq_('./lib/string-utils.js');
usfl.track = _dereq_('./lib/track.js');
usfl.urlParams = _dereq_('./lib/url-params.js');
usfl.visibility = _dereq_('./lib/visibility.js');

/*
 * constructor
 */

usfl.AssetLoader = _dereq_('./lib/asset-loader.js');
usfl.AudioManager = _dereq_('./lib/audio-manager.js');
usfl.Boid = _dereq_('./lib/boid.js');
//usfl.Facebook = require('./lib/facebook.js');
//usfl.Flash = require('./lib/flash.js');
usfl.FPS = _dereq_('./lib/fps.js');
usfl.Graphics = _dereq_('./lib/graphics.js');
usfl.HTMLAudio = _dereq_('./lib/html-audio.js');
usfl.InputCoords = _dereq_('./lib/input-coords.js'); // should be instance?
usfl.KeyInput = _dereq_('./lib/key-input.js');
usfl.LinkedList = _dereq_('./lib/linked-list.js');
usfl.ObjectPool = _dereq_('./lib/object-pool.js');
usfl.StateMachine = _dereq_('./lib/state-machine.js');
usfl.Vec2 = _dereq_('./lib/vec2.js');
usfl.VideoObject = _dereq_('./lib/video-object.js');
usfl.Viewport = _dereq_('./lib/viewport.js');
usfl.WebAudio = _dereq_('./lib/web-audio.js');

/*
 * function
 */

usfl.popup = _dereq_('./lib/popup.js');
usfl.ready = _dereq_('./lib/ready.js');
usfl.resize = _dereq_('./lib/resize.js');

module.exports = usfl;

},{"./lib/array-utils.js":2,"./lib/asset-loader.js":3,"./lib/audio-manager.js":4,"./lib/boid.js":5,"./lib/device.js":6,"./lib/fps.js":7,"./lib/fullscreen.js":8,"./lib/graphics.js":9,"./lib/html-audio.js":10,"./lib/input-coords.js":11,"./lib/key-input.js":12,"./lib/keyboard.js":13,"./lib/legacy/console-patch.js":14,"./lib/legacy/css-utils.js":15,"./lib/legacy/event-utils.js":16,"./lib/linked-list.js":17,"./lib/math-utils.js":18,"./lib/object-pool.js":19,"./lib/popup.js":20,"./lib/raf-polyfill.js":21,"./lib/ready.js":22,"./lib/resize.js":23,"./lib/share.js":24,"./lib/state-machine.js":25,"./lib/storage-utils.js":26,"./lib/string-utils.js":27,"./lib/track.js":28,"./lib/url-params.js":29,"./lib/vec2.js":30,"./lib/video-object.js":31,"./lib/viewport.js":32,"./lib/visibility.js":33,"./lib/web-audio.js":34}]},{},[35])
(35)
});