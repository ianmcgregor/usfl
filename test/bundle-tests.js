(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

module.exports = {
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
},{}],3:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		/*request.onprogress = function(event) {
			if (event.lengthComputable) {
				var percentComplete = event.loaded / event.total;
				console.log('percentComplete:', percentComplete);
			} else {
				console.log('Unable to compute progress information since the total size is unknown');
			}
		};*/
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
	},
	loadHTML5Audio: function(touchLocked) {
		var request = new Audio();
		this.data = request;
		request.name = this.url;
		request.preload = 'auto';
		var self = this;
		request.onerror = function() {
			self.onError.dispatch();
		};
		request.src = this.url;
		if (!!touchLocked) {
			this.onComplete.dispatch(this.data);
		}
		else {
			/*request.addEventListener('canplaythrough', function(){
				console.log('audio canplaythrough');
				self.onComplete.dispatch(self.data);
			}, false);*/
			request.load();
			this.onComplete.dispatch(this.data);
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
	}
};

module.exports = AssetLoader;

/*if (typeof module !== 'undefined' && module.exports) {
	module.exports = AssetLoader;
}*/

/*var root = this;
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = AssetLoader;
    }
    exports.AssetLoader = AssetLoader;
} else if (typeof define !== 'undefined' && define.amd) {
    define('PIXI', (function() { return root.AssetLoader = AssetLoader; })() );
} else {
    root.PIXI = PIXI;
}*/
},{"signals":1}],4:[function(require,module,exports){
'use strict';

(function(fn) {
	window.console = window.console || {log:fn,warn:fn,error:fn,table:fn};
	window.console.table = window.console.table || fn;
}(function(){}));
},{}],5:[function(require,module,exports){
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

module.exports = {
	'hasClass': hasClass,
	'addClass': addClass,
	'removeClass': removeClass,
	'toggleClass': toggleClass
};

},{}],6:[function(require,module,exports){
'use strict';

var ua = navigator.userAgent;

/* mobile */

function mobile() {
	return !!ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
}

/* ios */

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

function ios5() {
	return !!(ua.match(/OS 5(_\d)+ like Mac OS X/i));
}

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

/* ie */

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

function ie9down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if IE]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function ie8down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if lte IE 8]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function dpr() {
	return window.devicePixelRatio !== undefined ? window.devicePixelRatio : 1;
}

function screenWidth() {
	return (android() ? window.outerWidth : window.screen.width) * dpr();
}

function screenHeight() {
	return  (android() ? window.outerHeight : window.screen.height) * dpr();
}

module.exports = {
	'mobile': mobile(),
	'ipad': ipad(),
	'iphone': iphone(),
	'ipod': ipod(),
	'ios': ios(),
	'ios5': ios5(),
	'android': android(),
	'androidOld': androidOld(),
	'androidStock': androidStock(),
	'ieVersion': ieVersion(),
	'ie9down': ie9down(),
	'ie8down': ie8down(),
	'screenWidth': screenWidth(),
	'screenHeight': screenHeight(),
	'dpr': dpr(),
	'retina': (dpr() > 1)
};

},{}],7:[function(require,module,exports){
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
		return function (el, type, func) {
			el.addEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.attachEvent('on' + type, function (e) {
				e = getEvent(e, el);
				func(e);
			});
		};
	}
}());

var removeEvent = (function () {
	if (document.addEventListener) {
		return function (el, type, func) {
			el.removeEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.detachEvent('on' + type, func);
		};
	}
}());

module.exports = {
	'addEvent': addEvent,
	'removeEvent': removeEvent
};

},{}],8:[function(require,module,exports){
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

module.exports = LinkedList;

},{}],9:[function(require,module,exports){
'use strict';

var DEG = 180 / Math.PI;
var RAD = Math.PI / 180;

var self = {
	map: function(v, a, b, x, y) {
		return (v === a) ? x : (v - a) * (y - x) / (b - a) + x;
	},
	lerp: function(from, to, percent) {
		return from + ( to - from ) * percent;
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
	random: function(min, max) {
		if ( isNaN(max) ) {
			max = min;
			min = 0;
		}
		return min + Math.random() * (max - min);
	},
	difference: function(a, b) {
		return Math.abs(a - b);
	},
	distance: function(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;
		return Math.sqrt(dx * dx + dy * dy);
	},
	coinToss: function() {
		return Math.random() > 0.5;
	},
	angle: function(x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		return Math.atan2(dy, dx);
	},
	degrees: function(radians) {
		return radians * DEG;
	},
	radians: function(degrees) {
		return degrees * RAD;
	},
	roundToNearest: function(value, amount) {
		return Math.round(value / amount) * amount;
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
	rotateTo: function(start, end) {
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
	dotProduct: function(aX, aY, bX, bY) {
		return aX * bX + aY * bY;
	}
};

module.exports = self;

},{}],10:[function(require,module,exports){
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

module.exports = ObjectPool;
},{}],11:[function(require,module,exports){
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
module.exports = ready;

},{}],12:[function(require,module,exports){
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

module.exports = resize;

},{}],13:[function(require,module,exports){
'use strict';

var self = {
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

module.exports = self;
},{}],14:[function(require,module,exports){
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


module.exports = {
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

},{}],15:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		//videoElement.setAttribute('preload', 'auto');
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

module.exports = VideoObject;

},{"signals":1}],16:[function(require,module,exports){
'use strict';

var ArrayUtils = require('../src/utils/array-utils.js');

describe('array utils', function() {
	it('should return [] is array true', function() {
		expect(ArrayUtils.isArray([])).to.be.true;
	});
	it('should return {} is array false', function() {
		expect(ArrayUtils.isArray({})).to.be.false;
	});
	it('should return numeric ordered array', function() {
		expect(ArrayUtils.sortNumeric([3,2,1,0])).to.eql([0,1,2,3]);
	});
	it('should return random sorted array', function() {
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.be.instanceof(Array);
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.have.property('length', 4);
	});
	it('should return random element', function() {
		expect(ArrayUtils.getRandom([3,2,1,0])).to.be.a('number');
	});
});

},{"../src/utils/array-utils.js":2}],17:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js');

describe('asset loader', function() {
	var assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		files = {
			'image': 'http://placekitten.com/g/200/300',
			'audio': ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
			'json': 'http://graph.facebook.com/facebook'
		},
		complete = false,
		loadProgress,
		childrenLoaded = 0;

	assetLoader.webAudioContext = null;
	assetLoader.crossOrigin = true;
	
	assetLoader.add(files.image, 'jpg');
	assetLoader.add(files.audio);
	assetLoader.add(files.json, 'json');

	beforeEach(function(done) {
		assetLoader.onProgress.add(function(progress) {
			loadProgress = progress;
		});
		assetLoader.onChildComplete.add(function() {
			childrenLoaded++;
		});
		assetLoader.onComplete.add(function() {
			complete = true;
			done();
		});
		assetLoader.start();
	});

	it('should have finished loading', function(){
		expect(complete).equals(true);
		expect(childrenLoaded).to.eql(assetLoader.numTotal);
		expect(assetLoader.numLoaded/assetLoader.numTotal).to.eql(1);
		expect(assetLoader.get(files.image)).to.exist;
		expect(assetLoader.get(files.audio)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
	});
});

},{"../src/utils/asset-loader.js":3}],18:[function(require,module,exports){
/*

'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	AudioObject = require('../src/utils/audio-object.js');

describe('audio object', function() {
	var audioObject,
		assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		file = ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
		playing = false;

	assetLoader.webAudioContext = null;
	assetLoader.add(file);

	beforeEach(function(done) {
		assetLoader.onComplete.add(function() {
			audioObject = new AudioObject(assetLoader.get(file).data, false, null);
			playing = audioObject.play();
			done();
		});
		assetLoader.start();
	});

	it('should be playing', function(){
		expect(playing).to.be.true;
		audioObject.stop();
	});
});
*/
},{}],19:[function(require,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

module.exports = {
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
},{}],3:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		/*request.onprogress = function(event) {
			if (event.lengthComputable) {
				var percentComplete = event.loaded / event.total;
				console.log('percentComplete:', percentComplete);
			} else {
				console.log('Unable to compute progress information since the total size is unknown');
			}
		};*/
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
	},
	loadHTML5Audio: function(touchLocked) {
		var request = new Audio();
		this.data = request;
		request.name = this.url;
		request.preload = 'auto';
		var self = this;
		request.onerror = function() {
			self.onError.dispatch();
		};
		request.src = this.url;
		if (!!touchLocked) {
			this.onComplete.dispatch(this.data);
		}
		else {
			/*request.addEventListener('canplaythrough', function(){
				console.log('audio canplaythrough');
				self.onComplete.dispatch(self.data);
			}, false);*/
			request.load();
			this.onComplete.dispatch(this.data);
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
	}
};

module.exports = AssetLoader;

/*if (typeof module !== 'undefined' && module.exports) {
	module.exports = AssetLoader;
}*/

/*var root = this;
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = AssetLoader;
    }
    exports.AssetLoader = AssetLoader;
} else if (typeof define !== 'undefined' && define.amd) {
    define('PIXI', (function() { return root.AssetLoader = AssetLoader; })() );
} else {
    root.PIXI = PIXI;
}*/
},{"signals":1}],4:[function(require,module,exports){
'use strict';

(function(fn) {
	window.console = window.console || {log:fn,warn:fn,error:fn,table:fn};
	window.console.table = window.console.table || fn;
}(function(){}));
},{}],5:[function(require,module,exports){
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

module.exports = {
	'hasClass': hasClass,
	'addClass': addClass,
	'removeClass': removeClass,
	'toggleClass': toggleClass
};

},{}],6:[function(require,module,exports){
'use strict';

var ua = navigator.userAgent;

/* mobile */

function mobile() {
	return !!ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
}

/* ios */

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

function ios5() {
	return !!(ua.match(/OS 5(_\d)+ like Mac OS X/i));
}

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

/* ie */

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

function ie9down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if IE]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function ie8down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if lte IE 8]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function dpr() {
	return window.devicePixelRatio !== undefined ? window.devicePixelRatio : 1;
}

function screenWidth() {
	return (android() ? window.outerWidth : window.screen.width) * dpr();
}

function screenHeight() {
	return  (android() ? window.outerHeight : window.screen.height) * dpr();
}

module.exports = {
	'mobile': mobile(),
	'ipad': ipad(),
	'iphone': iphone(),
	'ipod': ipod(),
	'ios': ios(),
	'ios5': ios5(),
	'android': android(),
	'androidOld': androidOld(),
	'androidStock': androidStock(),
	'ieVersion': ieVersion(),
	'ie9down': ie9down(),
	'ie8down': ie8down(),
	'screenWidth': screenWidth(),
	'screenHeight': screenHeight(),
	'dpr': dpr(),
	'retina': (dpr() > 1)
};

},{}],7:[function(require,module,exports){
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
		return function (el, type, func) {
			el.addEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.attachEvent('on' + type, function (e) {
				e = getEvent(e, el);
				func(e);
			});
		};
	}
}());

var removeEvent = (function () {
	if (document.addEventListener) {
		return function (el, type, func) {
			el.removeEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.detachEvent('on' + type, func);
		};
	}
}());

module.exports = {
	'addEvent': addEvent,
	'removeEvent': removeEvent
};

},{}],8:[function(require,module,exports){
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

module.exports = LinkedList;

},{}],9:[function(require,module,exports){
'use strict';

var DEG = 180 / Math.PI;
var RAD = Math.PI / 180;

var self = {
	map: function(v, a, b, x, y) {
		return (v === a) ? x : (v - a) * (y - x) / (b - a) + x;
	},
	lerp: function(from, to, percent) {
		return from + ( to - from ) * percent;
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
	random: function(min, max) {
		if ( isNaN(max) ) {
			max = min;
			min = 0;
		}
		return min + Math.random() * (max - min);
	},
	difference: function(a, b) {
		return Math.abs(a - b);
	},
	distance: function(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;
		return Math.sqrt(dx * dx + dy * dy);
	},
	coinToss: function() {
		return Math.random() > 0.5;
	},
	angle: function(x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		return Math.atan2(dy, dx);
	},
	degrees: function(radians) {
		return radians * DEG;
	},
	radians: function(degrees) {
		return degrees * RAD;
	},
	roundToNearest: function(value, amount) {
		return Math.round(value / amount) * amount;
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
	rotateTo: function(start, end) {
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
	dotProduct: function(aX, aY, bX, bY) {
		return aX * bX + aY * bY;
	}
};

module.exports = self;

},{}],10:[function(require,module,exports){
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

module.exports = ObjectPool;
},{}],11:[function(require,module,exports){
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
module.exports = ready;

},{}],12:[function(require,module,exports){
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

module.exports = resize;

},{}],13:[function(require,module,exports){
'use strict';

var self = {
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

module.exports = self;
},{}],14:[function(require,module,exports){
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


module.exports = {
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

},{}],15:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		//videoElement.setAttribute('preload', 'auto');
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

module.exports = VideoObject;

},{"signals":1}],16:[function(require,module,exports){
'use strict';

var ArrayUtils = require('../src/utils/array-utils.js');

describe('array utils', function() {
	it('should return [] is array true', function() {
		expect(ArrayUtils.isArray([])).to.be.true;
	});
	it('should return {} is array false', function() {
		expect(ArrayUtils.isArray({})).to.be.false;
	});
	it('should return numeric ordered array', function() {
		expect(ArrayUtils.sortNumeric([3,2,1,0])).to.eql([0,1,2,3]);
	});
	it('should return random sorted array', function() {
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.be.instanceof(Array);
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.have.property('length', 4);
	});
	it('should return random element', function() {
		expect(ArrayUtils.getRandom([3,2,1,0])).to.be.a('number');
	});
});

},{"../src/utils/array-utils.js":2}],17:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js');

describe('asset loader', function() {
	var assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		files = {
			'image': 'http://placekitten.com/g/200/300',
			'audio': ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
			'json': 'http://graph.facebook.com/facebook'
		},
		complete = false,
		loadProgress,
		childrenLoaded = 0;

	assetLoader.webAudioContext = null;
	assetLoader.crossOrigin = true;
	
	assetLoader.add(files.image, 'jpg');
	assetLoader.add(files.audio);
	assetLoader.add(files.json, 'json');

	beforeEach(function(done) {
		assetLoader.onProgress.add(function(progress) {
			loadProgress = progress;
		});
		assetLoader.onChildComplete.add(function() {
			childrenLoaded++;
		});
		assetLoader.onComplete.add(function() {
			complete = true;
			done();
		});
		assetLoader.start();
	});

	it('should have finished loading', function(){
		expect(complete).equals(true);
		expect(childrenLoaded).to.eql(assetLoader.numTotal);
		expect(assetLoader.numLoaded/assetLoader.numTotal).to.eql(1);
		expect(assetLoader.get(files.image)).to.exist;
		expect(assetLoader.get(files.audio)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
	});
});

},{"../src/utils/asset-loader.js":3}],18:[function(require,module,exports){
/*

'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	AudioObject = require('../src/utils/audio-object.js');

describe('audio object', function() {
	var audioObject,
		assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		file = ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
		playing = false;

	assetLoader.webAudioContext = null;
	assetLoader.add(file);

	beforeEach(function(done) {
		assetLoader.onComplete.add(function() {
			audioObject = new AudioObject(assetLoader.get(file).data, false, null);
			playing = audioObject.play();
			done();
		});
		assetLoader.start();
	});

	it('should be playing', function(){
		expect(playing).to.be.true;
		audioObject.stop();
	});
});
*/
},{}],19:[function(require,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

module.exports = {
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
},{}],3:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		/*request.onprogress = function(event) {
			if (event.lengthComputable) {
				var percentComplete = event.loaded / event.total;
				console.log('percentComplete:', percentComplete);
			} else {
				console.log('Unable to compute progress information since the total size is unknown');
			}
		};*/
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
	},
	loadHTML5Audio: function(touchLocked) {
		var request = new Audio();
		this.data = request;
		request.name = this.url;
		request.preload = 'auto';
		var self = this;
		request.onerror = function() {
			self.onError.dispatch();
		};
		request.src = this.url;
		if (!!touchLocked) {
			this.onComplete.dispatch(this.data);
		}
		else {
			/*request.addEventListener('canplaythrough', function(){
				console.log('audio canplaythrough');
				self.onComplete.dispatch(self.data);
			}, false);*/
			request.load();
			this.onComplete.dispatch(this.data);
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
	}
};

module.exports = AssetLoader;

/*if (typeof module !== 'undefined' && module.exports) {
	module.exports = AssetLoader;
}*/

/*var root = this;
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = AssetLoader;
    }
    exports.AssetLoader = AssetLoader;
} else if (typeof define !== 'undefined' && define.amd) {
    define('PIXI', (function() { return root.AssetLoader = AssetLoader; })() );
} else {
    root.PIXI = PIXI;
}*/
},{"signals":1}],4:[function(require,module,exports){
'use strict';

(function(fn) {
	window.console = window.console || {log:fn,warn:fn,error:fn,table:fn};
	window.console.table = window.console.table || fn;
}(function(){}));
},{}],5:[function(require,module,exports){
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

module.exports = {
	'hasClass': hasClass,
	'addClass': addClass,
	'removeClass': removeClass,
	'toggleClass': toggleClass
};

},{}],6:[function(require,module,exports){
'use strict';

var ua = navigator.userAgent;

/* mobile */

function mobile() {
	return !!ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
}

/* ios */

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

function ios5() {
	return !!(ua.match(/OS 5(_\d)+ like Mac OS X/i));
}

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

/* ie */

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

function ie9down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if IE]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function ie8down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if lte IE 8]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function dpr() {
	return window.devicePixelRatio !== undefined ? window.devicePixelRatio : 1;
}

function screenWidth() {
	return (android() ? window.outerWidth : window.screen.width) * dpr();
}

function screenHeight() {
	return  (android() ? window.outerHeight : window.screen.height) * dpr();
}

module.exports = {
	'mobile': mobile(),
	'ipad': ipad(),
	'iphone': iphone(),
	'ipod': ipod(),
	'ios': ios(),
	'ios5': ios5(),
	'android': android(),
	'androidOld': androidOld(),
	'androidStock': androidStock(),
	'ieVersion': ieVersion(),
	'ie9down': ie9down(),
	'ie8down': ie8down(),
	'screenWidth': screenWidth(),
	'screenHeight': screenHeight(),
	'dpr': dpr(),
	'retina': (dpr() > 1)
};

},{}],7:[function(require,module,exports){
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
		return function (el, type, func) {
			el.addEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.attachEvent('on' + type, function (e) {
				e = getEvent(e, el);
				func(e);
			});
		};
	}
}());

var removeEvent = (function () {
	if (document.addEventListener) {
		return function (el, type, func) {
			el.removeEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.detachEvent('on' + type, func);
		};
	}
}());

module.exports = {
	'addEvent': addEvent,
	'removeEvent': removeEvent
};

},{}],8:[function(require,module,exports){
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

module.exports = LinkedList;

},{}],9:[function(require,module,exports){
'use strict';

var DEG = 180 / Math.PI;
var RAD = Math.PI / 180;

var self = {
	map: function(v, a, b, x, y) {
		return (v === a) ? x : (v - a) * (y - x) / (b - a) + x;
	},
	lerp: function(from, to, percent) {
		return from + ( to - from ) * percent;
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
	random: function(min, max) {
		if ( isNaN(max) ) {
			max = min;
			min = 0;
		}
		return min + Math.random() * (max - min);
	},
	difference: function(a, b) {
		return Math.abs(a - b);
	},
	distance: function(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;
		return Math.sqrt(dx * dx + dy * dy);
	},
	coinToss: function() {
		return Math.random() > 0.5;
	},
	angle: function(x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		return Math.atan2(dy, dx);
	},
	degrees: function(radians) {
		return radians * DEG;
	},
	radians: function(degrees) {
		return degrees * RAD;
	},
	roundToNearest: function(value, amount) {
		return Math.round(value / amount) * amount;
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
	rotateTo: function(start, end) {
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
	dotProduct: function(aX, aY, bX, bY) {
		return aX * bX + aY * bY;
	}
};

module.exports = self;

},{}],10:[function(require,module,exports){
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

module.exports = ObjectPool;
},{}],11:[function(require,module,exports){
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
module.exports = ready;

},{}],12:[function(require,module,exports){
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

module.exports = resize;

},{}],13:[function(require,module,exports){
'use strict';

var self = {
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

module.exports = self;
},{}],14:[function(require,module,exports){
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


module.exports = {
	'contains': contains,
	'countOf': countOf,
	'endsWith': endsWith,
	'hasText': hasText,
	'isEmpty': isEmpty,
	'isNumeric': isNumeric,
	'wordCount': wordCount,
	'editDistance': editDistance,
	'similarity': similarity,
	'afterFirst': afterFirst,
	'afterLast': afterLast,
	'beginsWith': beginsWith,
	'beforeFirst': beforeFirst,
	'beforeLast': beforeLast,
	'between': between,
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
	'block': block,
	'escapePattern': escapePattern
};

},{}],15:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		//videoElement.setAttribute('preload', 'auto');
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

module.exports = VideoObject;

},{"signals":1}],16:[function(require,module,exports){
'use strict';

var ArrayUtils = require('../src/utils/array-utils.js');

describe('array utils', function() {
	it('should return [] is array true', function() {
		expect(ArrayUtils.isArray([])).to.be.true;
	});
	it('should return {} is array false', function() {
		expect(ArrayUtils.isArray({})).to.be.false;
	});
	it('should return numeric ordered array', function() {
		expect(ArrayUtils.sortNumeric([3,2,1,0])).to.eql([0,1,2,3]);
	});
	it('should return random sorted array', function() {
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.be.instanceof(Array);
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.have.property('length', 4);
	});
	it('should return random element', function() {
		expect(ArrayUtils.getRandom([3,2,1,0])).to.be.a('number');
	});
});

},{"../src/utils/array-utils.js":2}],17:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js');

describe('asset loader', function() {
	var assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		files = {
			'image': 'http://placekitten.com/g/200/300',
			'audio': ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
			'json': 'http://graph.facebook.com/facebook'
		},
		complete = false,
		loadProgress,
		childrenLoaded = 0;

	assetLoader.webAudioContext = null;
	assetLoader.crossOrigin = true;
	
	assetLoader.add(files.image, 'jpg');
	assetLoader.add(files.audio);
	assetLoader.add(files.json, 'json');

	beforeEach(function(done) {
		assetLoader.onProgress.add(function(progress) {
			loadProgress = progress;
		});
		assetLoader.onChildComplete.add(function() {
			childrenLoaded++;
		});
		assetLoader.onComplete.add(function() {
			complete = true;
			done();
		});
		assetLoader.start();
	});

	it('should have finished loading', function(){
		expect(complete).equals(true);
		expect(childrenLoaded).to.eql(assetLoader.numTotal);
		expect(assetLoader.numLoaded/assetLoader.numTotal).to.eql(1);
		expect(assetLoader.get(files.image)).to.exist;
		expect(assetLoader.get(files.audio)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
	});
});

},{"../src/utils/asset-loader.js":3}],18:[function(require,module,exports){
/*

'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	AudioObject = require('../src/utils/audio-object.js');

describe('audio object', function() {
	var audioObject,
		assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		file = ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
		playing = false;

	assetLoader.webAudioContext = null;
	assetLoader.add(file);

	beforeEach(function(done) {
		assetLoader.onComplete.add(function() {
			audioObject = new AudioObject(assetLoader.get(file).data, false, null);
			playing = audioObject.play();
			done();
		});
		assetLoader.start();
	});

	it('should be playing', function(){
		expect(playing).to.be.true;
		audioObject.stop();
	});
});
*/
},{}],19:[function(require,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

module.exports = {
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
},{}],3:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		/*request.onprogress = function(event) {
			if (event.lengthComputable) {
				var percentComplete = event.loaded / event.total;
				console.log('percentComplete:', percentComplete);
			} else {
				console.log('Unable to compute progress information since the total size is unknown');
			}
		};*/
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
	},
	loadHTML5Audio: function(touchLocked) {
		var request = new Audio();
		this.data = request;
		request.name = this.url;
		request.preload = 'auto';
		var self = this;
		request.onerror = function() {
			self.onError.dispatch();
		};
		request.src = this.url;
		if (!!touchLocked) {
			this.onComplete.dispatch(this.data);
		}
		else {
			/*request.addEventListener('canplaythrough', function(){
				console.log('audio canplaythrough');
				self.onComplete.dispatch(self.data);
			}, false);*/
			request.load();
			this.onComplete.dispatch(this.data);
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
	}
};

module.exports = AssetLoader;

/*if (typeof module !== 'undefined' && module.exports) {
	module.exports = AssetLoader;
}*/

/*var root = this;
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = AssetLoader;
    }
    exports.AssetLoader = AssetLoader;
} else if (typeof define !== 'undefined' && define.amd) {
    define('PIXI', (function() { return root.AssetLoader = AssetLoader; })() );
} else {
    root.PIXI = PIXI;
}*/
},{"signals":1}],4:[function(require,module,exports){
'use strict';

(function(fn) {
	window.console = window.console || {log:fn,warn:fn,error:fn,table:fn};
	window.console.table = window.console.table || fn;
}(function(){}));
},{}],5:[function(require,module,exports){
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

module.exports = {
	'hasClass': hasClass,
	'addClass': addClass,
	'removeClass': removeClass,
	'toggleClass': toggleClass
};

},{}],6:[function(require,module,exports){
'use strict';

var ua = navigator.userAgent;

/* mobile */

function mobile() {
	return !!ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
}

/* ios */

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

function ios5() {
	return !!(ua.match(/OS 5(_\d)+ like Mac OS X/i));
}

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

/* ie */

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

function ie9down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if IE]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function ie8down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if lte IE 8]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function dpr() {
	return window.devicePixelRatio !== undefined ? window.devicePixelRatio : 1;
}

function screenWidth() {
	return (android() ? window.outerWidth : window.screen.width) * dpr();
}

function screenHeight() {
	return  (android() ? window.outerHeight : window.screen.height) * dpr();
}

module.exports = {
	'mobile': mobile(),
	'ipad': ipad(),
	'iphone': iphone(),
	'ipod': ipod(),
	'ios': ios(),
	'ios5': ios5(),
	'android': android(),
	'androidOld': androidOld(),
	'androidStock': androidStock(),
	'ieVersion': ieVersion(),
	'ie9down': ie9down(),
	'ie8down': ie8down(),
	'screenWidth': screenWidth(),
	'screenHeight': screenHeight(),
	'dpr': dpr(),
	'retina': (dpr() > 1)
};

},{}],7:[function(require,module,exports){
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
		return function (el, type, func) {
			el.addEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.attachEvent('on' + type, function (e) {
				e = getEvent(e, el);
				func(e);
			});
		};
	}
}());

var removeEvent = (function () {
	if (document.addEventListener) {
		return function (el, type, func) {
			el.removeEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.detachEvent('on' + type, func);
		};
	}
}());

module.exports = {
	'addEvent': addEvent,
	'removeEvent': removeEvent
};

},{}],8:[function(require,module,exports){
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

module.exports = LinkedList;

},{}],9:[function(require,module,exports){
'use strict';

var DEG = 180 / Math.PI;
var RAD = Math.PI / 180;

var self = {
	map: function(v, a, b, x, y) {
		return (v === a) ? x : (v - a) * (y - x) / (b - a) + x;
	},
	lerp: function(from, to, percent) {
		return from + ( to - from ) * percent;
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
	random: function(min, max) {
		if ( isNaN(max) ) {
			max = min;
			min = 0;
		}
		return min + Math.random() * (max - min);
	},
	difference: function(a, b) {
		return Math.abs(a - b);
	},
	distance: function(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;
		return Math.sqrt(dx * dx + dy * dy);
	},
	coinToss: function() {
		return Math.random() > 0.5;
	},
	angle: function(x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		return Math.atan2(dy, dx);
	},
	degrees: function(radians) {
		return radians * DEG;
	},
	radians: function(degrees) {
		return degrees * RAD;
	},
	roundToNearest: function(value, amount) {
		return Math.round(value / amount) * amount;
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
	rotateTo: function(start, end) {
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
	dotProduct: function(aX, aY, bX, bY) {
		return aX * bX + aY * bY;
	}
};

module.exports = self;

},{}],10:[function(require,module,exports){
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

module.exports = ObjectPool;
},{}],11:[function(require,module,exports){
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
module.exports = ready;

},{}],12:[function(require,module,exports){
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

module.exports = resize;

},{}],13:[function(require,module,exports){
'use strict';

var self = {
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

module.exports = self;
},{}],14:[function(require,module,exports){
'use strict';

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


module.exports = {
	'contains': contains,
	'countOf': countOf,
	'endsWith': endsWith,
	'hasText': hasText,
	'isEmpty': isEmpty,
	'isNumeric': isNumeric,
	'wordCount': wordCount,
	'editDistance': editDistance,
	'similarity': similarity,
	'afterFirst': afterFirst,
	'afterLast': afterLast,
	'beginsWith': beginsWith,
	'beforeFirst': beforeFirst,
	'beforeLast': beforeLast,
	'between': between,
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
	'block': block,
	'escapePattern': escapePattern
};

},{}],15:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		//videoElement.setAttribute('preload', 'auto');
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

module.exports = VideoObject;

},{"signals":1}],16:[function(require,module,exports){
'use strict';

var ArrayUtils = require('../src/utils/array-utils.js');

describe('array utils', function() {
	it('should return [] is array true', function() {
		expect(ArrayUtils.isArray([])).to.be.true;
	});
	it('should return {} is array false', function() {
		expect(ArrayUtils.isArray({})).to.be.false;
	});
	it('should return numeric ordered array', function() {
		expect(ArrayUtils.sortNumeric([3,2,1,0])).to.eql([0,1,2,3]);
	});
	it('should return random sorted array', function() {
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.be.instanceof(Array);
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.have.property('length', 4);
	});
	it('should return random element', function() {
		expect(ArrayUtils.getRandom([3,2,1,0])).to.be.a('number');
	});
});

},{"../src/utils/array-utils.js":2}],17:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js');

describe('asset loader', function() {
	var assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		files = {
			'image': 'http://placekitten.com/g/200/300',
			'audio': ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
			'json': 'http://graph.facebook.com/facebook'
		},
		complete = false,
		loadProgress,
		childrenLoaded = 0;

	assetLoader.webAudioContext = null;
	assetLoader.crossOrigin = true;
	
	assetLoader.add(files.image, 'jpg');
	assetLoader.add(files.audio);
	assetLoader.add(files.json, 'json');

	beforeEach(function(done) {
		assetLoader.onProgress.add(function(progress) {
			loadProgress = progress;
		});
		assetLoader.onChildComplete.add(function() {
			childrenLoaded++;
		});
		assetLoader.onComplete.add(function() {
			complete = true;
			done();
		});
		assetLoader.start();
	});

	it('should have finished loading', function(){
		expect(complete).equals(true);
		expect(childrenLoaded).to.eql(assetLoader.numTotal);
		expect(assetLoader.numLoaded/assetLoader.numTotal).to.eql(1);
		expect(assetLoader.get(files.image)).to.exist;
		expect(assetLoader.get(files.audio)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
	});
});

},{"../src/utils/asset-loader.js":3}],18:[function(require,module,exports){
/*

'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	AudioObject = require('../src/utils/audio-object.js');

describe('audio object', function() {
	var audioObject,
		assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		file = ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
		playing = false;

	assetLoader.webAudioContext = null;
	assetLoader.add(file);

	beforeEach(function(done) {
		assetLoader.onComplete.add(function() {
			audioObject = new AudioObject(assetLoader.get(file).data, false, null);
			playing = audioObject.play();
			done();
		});
		assetLoader.start();
	});

	it('should be playing', function(){
		expect(playing).to.be.true;
		audioObject.stop();
	});
});
*/
},{}],19:[function(require,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

module.exports = {
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
},{}],3:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		/*request.onprogress = function(event) {
			if (event.lengthComputable) {
				var percentComplete = event.loaded / event.total;
				console.log('percentComplete:', percentComplete);
			} else {
				console.log('Unable to compute progress information since the total size is unknown');
			}
		};*/
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
	},
	loadHTML5Audio: function(touchLocked) {
		var request = new Audio();
		this.data = request;
		request.name = this.url;
		request.preload = 'auto';
		var self = this;
		request.onerror = function() {
			self.onError.dispatch();
		};
		request.src = this.url;
		if (!!touchLocked) {
			this.onComplete.dispatch(this.data);
		}
		else {
			/*request.addEventListener('canplaythrough', function(){
				console.log('audio canplaythrough');
				self.onComplete.dispatch(self.data);
			}, false);*/
			request.load();
			this.onComplete.dispatch(this.data);
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
	}
};

module.exports = AssetLoader;

/*if (typeof module !== 'undefined' && module.exports) {
	module.exports = AssetLoader;
}*/

/*var root = this;
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = AssetLoader;
    }
    exports.AssetLoader = AssetLoader;
} else if (typeof define !== 'undefined' && define.amd) {
    define('PIXI', (function() { return root.AssetLoader = AssetLoader; })() );
} else {
    root.PIXI = PIXI;
}*/
},{"signals":1}],4:[function(require,module,exports){
'use strict';

(function(fn) {
	window.console = window.console || {log:fn,warn:fn,error:fn,table:fn};
	window.console.table = window.console.table || fn;
}(function(){}));
},{}],5:[function(require,module,exports){
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

module.exports = {
	'hasClass': hasClass,
	'addClass': addClass,
	'removeClass': removeClass,
	'toggleClass': toggleClass
};

},{}],6:[function(require,module,exports){
'use strict';

var ua = navigator.userAgent;

/* mobile */

function mobile() {
	return !!ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
}

/* ios */

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

function ios5() {
	return !!(ua.match(/OS 5(_\d)+ like Mac OS X/i));
}

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

/* ie */

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

function ie9down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if IE]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function ie8down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if lte IE 8]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function dpr() {
	return window.devicePixelRatio !== undefined ? window.devicePixelRatio : 1;
}

function screenWidth() {
	return (android() ? window.outerWidth : window.screen.width) * dpr();
}

function screenHeight() {
	return  (android() ? window.outerHeight : window.screen.height) * dpr();
}

module.exports = {
	'mobile': mobile(),
	'ipad': ipad(),
	'iphone': iphone(),
	'ipod': ipod(),
	'ios': ios(),
	'ios5': ios5(),
	'android': android(),
	'androidOld': androidOld(),
	'androidStock': androidStock(),
	'ieVersion': ieVersion(),
	'ie9down': ie9down(),
	'ie8down': ie8down(),
	'screenWidth': screenWidth(),
	'screenHeight': screenHeight(),
	'dpr': dpr(),
	'retina': (dpr() > 1)
};

},{}],7:[function(require,module,exports){
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
		return function (el, type, func) {
			el.addEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.attachEvent('on' + type, function (e) {
				e = getEvent(e, el);
				func(e);
			});
		};
	}
}());

var removeEvent = (function () {
	if (document.addEventListener) {
		return function (el, type, func) {
			el.removeEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.detachEvent('on' + type, func);
		};
	}
}());

module.exports = {
	'addEvent': addEvent,
	'removeEvent': removeEvent
};

},{}],8:[function(require,module,exports){
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

module.exports = LinkedList;

},{}],9:[function(require,module,exports){
'use strict';

var DEG = 180 / Math.PI;
var RAD = Math.PI / 180;

var self = {
	map: function(v, a, b, x, y) {
		return (v === a) ? x : (v - a) * (y - x) / (b - a) + x;
	},
	lerp: function(from, to, percent) {
		return from + ( to - from ) * percent;
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
	random: function(min, max) {
		if ( isNaN(max) ) {
			max = min;
			min = 0;
		}
		return min + Math.random() * (max - min);
	},
	difference: function(a, b) {
		return Math.abs(a - b);
	},
	distance: function(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;
		return Math.sqrt(dx * dx + dy * dy);
	},
	coinToss: function() {
		return Math.random() > 0.5;
	},
	angle: function(x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		return Math.atan2(dy, dx);
	},
	degrees: function(radians) {
		return radians * DEG;
	},
	radians: function(degrees) {
		return degrees * RAD;
	},
	roundToNearest: function(value, amount) {
		return Math.round(value / amount) * amount;
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
	rotateTo: function(start, end) {
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
	dotProduct: function(aX, aY, bX, bY) {
		return aX * bX + aY * bY;
	}
};

module.exports = self;

},{}],10:[function(require,module,exports){
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

module.exports = ObjectPool;
},{}],11:[function(require,module,exports){
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
module.exports = ready;

},{}],12:[function(require,module,exports){
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

module.exports = resize;

},{}],13:[function(require,module,exports){
'use strict';

var self = {
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

module.exports = self;
},{}],14:[function(require,module,exports){
'use strict';

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


module.exports = {
	'contains': contains,
	'countOf': countOf,
	'endsWith': endsWith,
	'hasText': hasText,
	'isEmpty': isEmpty,
	'isNumeric': isNumeric,
	'wordCount': wordCount,
	'editDistance': editDistance,
	'similarity': similarity,
	'afterFirst': afterFirst,
	'afterLast': afterLast,
	'beginsWith': beginsWith,
	'beforeFirst': beforeFirst,
	'beforeLast': beforeLast,
	'between': between,
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
	'block': block,
	'escapePattern': escapePattern
};

},{}],15:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		//videoElement.setAttribute('preload', 'auto');
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

module.exports = VideoObject;

},{"signals":1}],16:[function(require,module,exports){
'use strict';

var ArrayUtils = require('../src/utils/array-utils.js');

describe('array utils', function() {
	it('should return [] is array true', function() {
		expect(ArrayUtils.isArray([])).to.be.true;
	});
	it('should return {} is array false', function() {
		expect(ArrayUtils.isArray({})).to.be.false;
	});
	it('should return numeric ordered array', function() {
		expect(ArrayUtils.sortNumeric([3,2,1,0])).to.eql([0,1,2,3]);
	});
	it('should return random sorted array', function() {
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.be.instanceof(Array);
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.have.property('length', 4);
	});
	it('should return random element', function() {
		expect(ArrayUtils.getRandom([3,2,1,0])).to.be.a('number');
	});
});

},{"../src/utils/array-utils.js":2}],17:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js');

describe('asset loader', function() {
	var assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		files = {
			'image': 'http://placekitten.com/g/200/300',
			'audio': ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
			'json': 'http://graph.facebook.com/facebook'
		},
		complete = false,
		loadProgress,
		childrenLoaded = 0;

	assetLoader.webAudioContext = null;
	assetLoader.crossOrigin = true;
	
	assetLoader.add(files.image, 'jpg');
	assetLoader.add(files.audio);
	assetLoader.add(files.json, 'json');

	beforeEach(function(done) {
		assetLoader.onProgress.add(function(progress) {
			loadProgress = progress;
		});
		assetLoader.onChildComplete.add(function() {
			childrenLoaded++;
		});
		assetLoader.onComplete.add(function() {
			complete = true;
			done();
		});
		assetLoader.start();
	});

	it('should have finished loading', function(){
		expect(complete).equals(true);
		expect(childrenLoaded).to.eql(assetLoader.numTotal);
		expect(assetLoader.numLoaded/assetLoader.numTotal).to.eql(1);
		expect(assetLoader.get(files.image)).to.exist;
		expect(assetLoader.get(files.audio)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
	});
});

},{"../src/utils/asset-loader.js":3}],18:[function(require,module,exports){
/*

'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	AudioObject = require('../src/utils/audio-object.js');

describe('audio object', function() {
	var audioObject,
		assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		file = ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
		playing = false;

	assetLoader.webAudioContext = null;
	assetLoader.add(file);

	beforeEach(function(done) {
		assetLoader.onComplete.add(function() {
			audioObject = new AudioObject(assetLoader.get(file).data, false, null);
			playing = audioObject.play();
			done();
		});
		assetLoader.start();
	});

	it('should be playing', function(){
		expect(playing).to.be.true;
		audioObject.stop();
	});
});
*/
},{}],19:[function(require,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

module.exports = {
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
},{}],3:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		/*request.onprogress = function(event) {
			if (event.lengthComputable) {
				var percentComplete = event.loaded / event.total;
				console.log('percentComplete:', percentComplete);
			} else {
				console.log('Unable to compute progress information since the total size is unknown');
			}
		};*/
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
	},
	loadHTML5Audio: function(touchLocked) {
		var request = new Audio();
		this.data = request;
		request.name = this.url;
		request.preload = 'auto';
		var self = this;
		request.onerror = function() {
			self.onError.dispatch();
		};
		request.src = this.url;
		if (!!touchLocked) {
			this.onComplete.dispatch(this.data);
		}
		else {
			/*request.addEventListener('canplaythrough', function(){
				console.log('audio canplaythrough');
				self.onComplete.dispatch(self.data);
			}, false);*/
			request.load();
			this.onComplete.dispatch(this.data);
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
	}
};

module.exports = AssetLoader;

/*if (typeof module !== 'undefined' && module.exports) {
	module.exports = AssetLoader;
}*/

/*var root = this;
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = AssetLoader;
    }
    exports.AssetLoader = AssetLoader;
} else if (typeof define !== 'undefined' && define.amd) {
    define('PIXI', (function() { return root.AssetLoader = AssetLoader; })() );
} else {
    root.PIXI = PIXI;
}*/
},{"signals":1}],4:[function(require,module,exports){
'use strict';

(function(fn) {
	window.console = window.console || {log:fn,warn:fn,error:fn,table:fn};
	window.console.table = window.console.table || fn;
}(function(){}));
},{}],5:[function(require,module,exports){
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

module.exports = {
	'hasClass': hasClass,
	'addClass': addClass,
	'removeClass': removeClass,
	'toggleClass': toggleClass
};

},{}],6:[function(require,module,exports){
'use strict';

var ua = navigator.userAgent;

/* mobile */

function mobile() {
	return !!ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
}

/* ios */

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

function ios5() {
	return !!(ua.match(/OS 5(_\d)+ like Mac OS X/i));
}

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

/* ie */

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

function ie9down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if IE]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function ie8down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if lte IE 8]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function dpr() {
	return window.devicePixelRatio !== undefined ? window.devicePixelRatio : 1;
}

function screenWidth() {
	return (android() ? window.outerWidth : window.screen.width) * dpr();
}

function screenHeight() {
	return  (android() ? window.outerHeight : window.screen.height) * dpr();
}

module.exports = {
	'mobile': mobile(),
	'ipad': ipad(),
	'iphone': iphone(),
	'ipod': ipod(),
	'ios': ios(),
	'ios5': ios5(),
	'android': android(),
	'androidOld': androidOld(),
	'androidStock': androidStock(),
	'ieVersion': ieVersion(),
	'ie9down': ie9down(),
	'ie8down': ie8down(),
	'screenWidth': screenWidth(),
	'screenHeight': screenHeight(),
	'dpr': dpr(),
	'retina': (dpr() > 1)
};

},{}],7:[function(require,module,exports){
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
		return function (el, type, func) {
			el.addEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.attachEvent('on' + type, function (e) {
				e = getEvent(e, el);
				func(e);
			});
		};
	}
}());

var removeEvent = (function () {
	if (document.addEventListener) {
		return function (el, type, func) {
			el.removeEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.detachEvent('on' + type, func);
		};
	}
}());

module.exports = {
	'addEvent': addEvent,
	'removeEvent': removeEvent
};

},{}],8:[function(require,module,exports){
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

module.exports = LinkedList;

},{}],9:[function(require,module,exports){
'use strict';

var DEG = 180 / Math.PI;
var RAD = Math.PI / 180;

var self = {
	map: function(v, a, b, x, y) {
		return (v === a) ? x : (v - a) * (y - x) / (b - a) + x;
	},
	lerp: function(from, to, percent) {
		return from + ( to - from ) * percent;
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
	random: function(min, max) {
		if ( isNaN(max) ) {
			max = min;
			min = 0;
		}
		return min + Math.random() * (max - min);
	},
	difference: function(a, b) {
		return Math.abs(a - b);
	},
	distance: function(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;
		return Math.sqrt(dx * dx + dy * dy);
	},
	coinToss: function() {
		return Math.random() > 0.5;
	},
	angle: function(x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		return Math.atan2(dy, dx);
	},
	degrees: function(radians) {
		return radians * DEG;
	},
	radians: function(degrees) {
		return degrees * RAD;
	},
	roundToNearest: function(value, amount) {
		return Math.round(value / amount) * amount;
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
	rotateTo: function(start, end) {
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
	dotProduct: function(aX, aY, bX, bY) {
		return aX * bX + aY * bY;
	}
};

module.exports = self;

},{}],10:[function(require,module,exports){
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

module.exports = ObjectPool;
},{}],11:[function(require,module,exports){
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
module.exports = ready;

},{}],12:[function(require,module,exports){
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

module.exports = resize;

},{}],13:[function(require,module,exports){
'use strict';

var self = {
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

module.exports = self;
},{}],14:[function(require,module,exports){
'use strict';

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


module.exports = {
	'contains': contains,
	'countOf': countOf,
	'endsWith': endsWith,
	'hasText': hasText,
	'isEmpty': isEmpty,
	'isNumeric': isNumeric,
	'wordCount': wordCount,
	'editDistance': editDistance,
	'similarity': similarity,
	'afterFirst': afterFirst,
	'afterLast': afterLast,
	'beginsWith': beginsWith,
	'beforeFirst': beforeFirst,
	'beforeLast': beforeLast,
	'between': between,
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
	'block': block,
	'escapePattern': escapePattern
};

},{}],15:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		//videoElement.setAttribute('preload', 'auto');
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

module.exports = VideoObject;

},{"signals":1}],16:[function(require,module,exports){
'use strict';

var ArrayUtils = require('../src/utils/array-utils.js');

describe('array utils', function() {
	it('should return [] is array true', function() {
		expect(ArrayUtils.isArray([])).to.be.true;
	});
	it('should return {} is array false', function() {
		expect(ArrayUtils.isArray({})).to.be.false;
	});
	it('should return numeric ordered array', function() {
		expect(ArrayUtils.sortNumeric([3,2,1,0])).to.eql([0,1,2,3]);
	});
	it('should return random sorted array', function() {
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.be.instanceof(Array);
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.have.property('length', 4);
	});
	it('should return random element', function() {
		expect(ArrayUtils.getRandom([3,2,1,0])).to.be.a('number');
	});
});

},{"../src/utils/array-utils.js":2}],17:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js');

describe('asset loader', function() {
	var assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		files = {
			'image': 'http://placekitten.com/g/200/300',
			'audio': ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
			'json': 'http://graph.facebook.com/facebook'
		},
		complete = false,
		loadProgress,
		childrenLoaded = 0;

	assetLoader.webAudioContext = null;
	assetLoader.crossOrigin = true;
	
	assetLoader.add(files.image, 'jpg');
	assetLoader.add(files.audio);
	assetLoader.add(files.json, 'json');

	beforeEach(function(done) {
		assetLoader.onProgress.add(function(progress) {
			loadProgress = progress;
		});
		assetLoader.onChildComplete.add(function() {
			childrenLoaded++;
		});
		assetLoader.onComplete.add(function() {
			complete = true;
			done();
		});
		assetLoader.start();
	});

	it('should have finished loading', function(){
		expect(complete).equals(true);
		expect(childrenLoaded).to.eql(assetLoader.numTotal);
		expect(assetLoader.numLoaded/assetLoader.numTotal).to.eql(1);
		expect(assetLoader.get(files.image)).to.exist;
		expect(assetLoader.get(files.audio)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
	});
});

},{"../src/utils/asset-loader.js":3}],18:[function(require,module,exports){
/*

'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	AudioObject = require('../src/utils/audio-object.js');

describe('audio object', function() {
	var audioObject,
		assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		file = ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
		playing = false;

	assetLoader.webAudioContext = null;
	assetLoader.add(file);

	beforeEach(function(done) {
		assetLoader.onComplete.add(function() {
			audioObject = new AudioObject(assetLoader.get(file).data, false, null);
			playing = audioObject.play();
			done();
		});
		assetLoader.start();
	});

	it('should be playing', function(){
		expect(playing).to.be.true;
		audioObject.stop();
	});
});
*/
},{}],19:[function(require,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

module.exports = {
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
},{}],3:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		/*request.onprogress = function(event) {
			if (event.lengthComputable) {
				var percentComplete = event.loaded / event.total;
				console.log('percentComplete:', percentComplete);
			} else {
				console.log('Unable to compute progress information since the total size is unknown');
			}
		};*/
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
	},
	loadHTML5Audio: function(touchLocked) {
		var request = new Audio();
		this.data = request;
		request.name = this.url;
		request.preload = 'auto';
		var self = this;
		request.onerror = function() {
			self.onError.dispatch();
		};
		request.src = this.url;
		if (!!touchLocked) {
			this.onComplete.dispatch(this.data);
		}
		else {
			/*request.addEventListener('canplaythrough', function(){
				console.log('audio canplaythrough');
				self.onComplete.dispatch(self.data);
			}, false);*/
			request.load();
			this.onComplete.dispatch(this.data);
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
	}
};

module.exports = AssetLoader;

/*if (typeof module !== 'undefined' && module.exports) {
	module.exports = AssetLoader;
}*/

/*var root = this;
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = AssetLoader;
    }
    exports.AssetLoader = AssetLoader;
} else if (typeof define !== 'undefined' && define.amd) {
    define('PIXI', (function() { return root.AssetLoader = AssetLoader; })() );
} else {
    root.PIXI = PIXI;
}*/
},{"signals":1}],4:[function(require,module,exports){
'use strict';

(function(fn) {
	window.console = window.console || {log:fn,warn:fn,error:fn,table:fn};
	window.console.table = window.console.table || fn;
}(function(){}));
},{}],5:[function(require,module,exports){
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

module.exports = {
	'hasClass': hasClass,
	'addClass': addClass,
	'removeClass': removeClass,
	'toggleClass': toggleClass
};

},{}],6:[function(require,module,exports){
'use strict';

var ua = navigator.userAgent;

/* mobile */

function mobile() {
	return !!ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
}

/* ios */

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

function ios5() {
	return !!(ua.match(/OS 5(_\d)+ like Mac OS X/i));
}

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

/* ie */

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

function ie9down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if IE]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function ie8down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if lte IE 8]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function dpr() {
	return window.devicePixelRatio !== undefined ? window.devicePixelRatio : 1;
}

function screenWidth() {
	return (android() ? window.outerWidth : window.screen.width) * dpr();
}

function screenHeight() {
	return  (android() ? window.outerHeight : window.screen.height) * dpr();
}

module.exports = {
	'mobile': mobile(),
	'ipad': ipad(),
	'iphone': iphone(),
	'ipod': ipod(),
	'ios': ios(),
	'ios5': ios5(),
	'android': android(),
	'androidOld': androidOld(),
	'androidStock': androidStock(),
	'ieVersion': ieVersion(),
	'ie9down': ie9down(),
	'ie8down': ie8down(),
	'screenWidth': screenWidth(),
	'screenHeight': screenHeight(),
	'dpr': dpr(),
	'retina': (dpr() > 1)
};

},{}],7:[function(require,module,exports){
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
		return function (el, type, func) {
			el.addEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.attachEvent('on' + type, function (e) {
				e = getEvent(e, el);
				func(e);
			});
		};
	}
}());

var removeEvent = (function () {
	if (document.addEventListener) {
		return function (el, type, func) {
			el.removeEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.detachEvent('on' + type, func);
		};
	}
}());

module.exports = {
	'addEvent': addEvent,
	'removeEvent': removeEvent
};

},{}],8:[function(require,module,exports){
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

module.exports = LinkedList;

},{}],9:[function(require,module,exports){
'use strict';

var DEG = 180 / Math.PI;
var RAD = Math.PI / 180;

var self = {
	map: function(v, a, b, x, y) {
		return (v === a) ? x : (v - a) * (y - x) / (b - a) + x;
	},
	lerp: function(from, to, percent) {
		return from + ( to - from ) * percent;
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
	random: function(min, max) {
		if ( isNaN(max) ) {
			max = min;
			min = 0;
		}
		return min + Math.random() * (max - min);
	},
	difference: function(a, b) {
		return Math.abs(a - b);
	},
	distance: function(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;
		return Math.sqrt(dx * dx + dy * dy);
	},
	coinToss: function() {
		return Math.random() > 0.5;
	},
	angle: function(x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		return Math.atan2(dy, dx);
	},
	degrees: function(radians) {
		return radians * DEG;
	},
	radians: function(degrees) {
		return degrees * RAD;
	},
	roundToNearest: function(value, amount) {
		return Math.round(value / amount) * amount;
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
	rotateTo: function(start, end) {
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
	dotProduct: function(aX, aY, bX, bY) {
		return aX * bX + aY * bY;
	}
};

module.exports = self;

},{}],10:[function(require,module,exports){
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

module.exports = ObjectPool;
},{}],11:[function(require,module,exports){
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
module.exports = ready;

},{}],12:[function(require,module,exports){
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

module.exports = resize;

},{}],13:[function(require,module,exports){
'use strict';

var self = {
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

module.exports = self;
},{}],14:[function(require,module,exports){
'use strict';

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


module.exports = {
	'contains': contains,
	'countOf': countOf,
	'endsWith': endsWith,
	'hasText': hasText,
	'isEmpty': isEmpty,
	'isNumeric': isNumeric,
	'wordCount': wordCount,
	'editDistance': editDistance,
	'similarity': similarity,
	'afterFirst': afterFirst,
	'afterLast': afterLast,
	'beginsWith': beginsWith,
	'beforeFirst': beforeFirst,
	'beforeLast': beforeLast,
	'between': between,
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
	'block': block,
	'escapePattern': escapePattern
};

},{}],15:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		//videoElement.setAttribute('preload', 'auto');
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

module.exports = VideoObject;

},{"signals":1}],16:[function(require,module,exports){
'use strict';

var ArrayUtils = require('../src/utils/array-utils.js');

describe('array utils', function() {
	it('should return [] is array true', function() {
		expect(ArrayUtils.isArray([])).to.be.true;
	});
	it('should return {} is array false', function() {
		expect(ArrayUtils.isArray({})).to.be.false;
	});
	it('should return numeric ordered array', function() {
		expect(ArrayUtils.sortNumeric([3,2,1,0])).to.eql([0,1,2,3]);
	});
	it('should return random sorted array', function() {
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.be.instanceof(Array);
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.have.property('length', 4);
	});
	it('should return random element', function() {
		expect(ArrayUtils.getRandom([3,2,1,0])).to.be.a('number');
	});
});

},{"../src/utils/array-utils.js":2}],17:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js');

describe('asset loader', function() {
	var assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		files = {
			'image': 'http://placekitten.com/g/200/300',
			'audio': ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
			'json': 'http://graph.facebook.com/facebook'
		},
		complete = false,
		loadProgress,
		childrenLoaded = 0;

	assetLoader.webAudioContext = null;
	assetLoader.crossOrigin = true;
	
	assetLoader.add(files.image, 'jpg');
	assetLoader.add(files.audio);
	assetLoader.add(files.json, 'json');

	beforeEach(function(done) {
		assetLoader.onProgress.add(function(progress) {
			loadProgress = progress;
		});
		assetLoader.onChildComplete.add(function() {
			childrenLoaded++;
		});
		assetLoader.onComplete.add(function() {
			complete = true;
			done();
		});
		assetLoader.start();
	});

	it('should have finished loading', function(){
		expect(complete).equals(true);
		expect(childrenLoaded).to.eql(assetLoader.numTotal);
		expect(assetLoader.numLoaded/assetLoader.numTotal).to.eql(1);
		expect(assetLoader.get(files.image)).to.exist;
		expect(assetLoader.get(files.audio)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
	});
});

},{"../src/utils/asset-loader.js":3}],18:[function(require,module,exports){
/*

'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	AudioObject = require('../src/utils/audio-object.js');

describe('audio object', function() {
	var audioObject,
		assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		file = ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
		playing = false;

	assetLoader.webAudioContext = null;
	assetLoader.add(file);

	beforeEach(function(done) {
		assetLoader.onComplete.add(function() {
			audioObject = new AudioObject(assetLoader.get(file).data, false, null);
			playing = audioObject.play();
			done();
		});
		assetLoader.start();
	});

	it('should be playing', function(){
		expect(playing).to.be.true;
		audioObject.stop();
	});
});
*/
},{}],19:[function(require,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

module.exports = {
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
},{}],3:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		/*request.onprogress = function(event) {
			if (event.lengthComputable) {
				var percentComplete = event.loaded / event.total;
				console.log('percentComplete:', percentComplete);
			} else {
				console.log('Unable to compute progress information since the total size is unknown');
			}
		};*/
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
	},
	loadHTML5Audio: function(touchLocked) {
		var request = new Audio();
		this.data = request;
		request.name = this.url;
		request.preload = 'auto';
		var self = this;
		request.onerror = function() {
			self.onError.dispatch();
		};
		request.src = this.url;
		if (!!touchLocked) {
			this.onComplete.dispatch(this.data);
		}
		else {
			/*request.addEventListener('canplaythrough', function(){
				console.log('audio canplaythrough');
				self.onComplete.dispatch(self.data);
			}, false);*/
			request.load();
			this.onComplete.dispatch(this.data);
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
	}
};

module.exports = AssetLoader;

/*if (typeof module !== 'undefined' && module.exports) {
	module.exports = AssetLoader;
}*/

/*var root = this;
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = AssetLoader;
    }
    exports.AssetLoader = AssetLoader;
} else if (typeof define !== 'undefined' && define.amd) {
    define('PIXI', (function() { return root.AssetLoader = AssetLoader; })() );
} else {
    root.PIXI = PIXI;
}*/
},{"signals":1}],4:[function(require,module,exports){
'use strict';

(function(fn) {
	window.console = window.console || {log:fn,warn:fn,error:fn,table:fn};
	window.console.table = window.console.table || fn;
}(function(){}));
},{}],5:[function(require,module,exports){
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

module.exports = {
	'hasClass': hasClass,
	'addClass': addClass,
	'removeClass': removeClass,
	'toggleClass': toggleClass
};

},{}],6:[function(require,module,exports){
'use strict';

var ua = navigator.userAgent;

/* mobile */

function mobile() {
	return !!ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
}

/* ios */

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

function ios5() {
	return !!(ua.match(/OS 5(_\d)+ like Mac OS X/i));
}

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

/* ie */

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

function ie9down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if IE]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function ie8down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if lte IE 8]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function dpr() {
	return window.devicePixelRatio !== undefined ? window.devicePixelRatio : 1;
}

function screenWidth() {
	return (android() ? window.outerWidth : window.screen.width) * dpr();
}

function screenHeight() {
	return  (android() ? window.outerHeight : window.screen.height) * dpr();
}

module.exports = {
	'mobile': mobile(),
	'ipad': ipad(),
	'iphone': iphone(),
	'ipod': ipod(),
	'ios': ios(),
	'ios5': ios5(),
	'android': android(),
	'androidOld': androidOld(),
	'androidStock': androidStock(),
	'ieVersion': ieVersion(),
	'ie9down': ie9down(),
	'ie8down': ie8down(),
	'screenWidth': screenWidth(),
	'screenHeight': screenHeight(),
	'dpr': dpr(),
	'retina': (dpr() > 1)
};

},{}],7:[function(require,module,exports){
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
		return function (el, type, func) {
			el.addEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.attachEvent('on' + type, function (e) {
				e = getEvent(e, el);
				func(e);
			});
		};
	}
}());

var removeEvent = (function () {
	if (document.addEventListener) {
		return function (el, type, func) {
			el.removeEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.detachEvent('on' + type, func);
		};
	}
}());

module.exports = {
	'addEvent': addEvent,
	'removeEvent': removeEvent
};

},{}],8:[function(require,module,exports){
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

module.exports = LinkedList;

},{}],9:[function(require,module,exports){
'use strict';

var DEG = 180 / Math.PI;
var RAD = Math.PI / 180;

var self = {
	map: function(v, a, b, x, y) {
		return (v === a) ? x : (v - a) * (y - x) / (b - a) + x;
	},
	lerp: function(from, to, percent) {
		return from + ( to - from ) * percent;
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
	random: function(min, max) {
		if ( isNaN(max) ) {
			max = min;
			min = 0;
		}
		return min + Math.random() * (max - min);
	},
	difference: function(a, b) {
		return Math.abs(a - b);
	},
	distance: function(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;
		return Math.sqrt(dx * dx + dy * dy);
	},
	coinToss: function() {
		return Math.random() > 0.5;
	},
	angle: function(x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		return Math.atan2(dy, dx);
	},
	degrees: function(radians) {
		return radians * DEG;
	},
	radians: function(degrees) {
		return degrees * RAD;
	},
	roundToNearest: function(value, amount) {
		return Math.round(value / amount) * amount;
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
	rotateTo: function(start, end) {
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
	dotProduct: function(aX, aY, bX, bY) {
		return aX * bX + aY * bY;
	}
};

module.exports = self;

},{}],10:[function(require,module,exports){
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

module.exports = ObjectPool;
},{}],11:[function(require,module,exports){
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
module.exports = ready;

},{}],12:[function(require,module,exports){
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

module.exports = resize;

},{}],13:[function(require,module,exports){
'use strict';

var self = {
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

module.exports = self;
},{}],14:[function(require,module,exports){
'use strict';


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

// regex escape pattern
function escapePattern(pattern) {
	return pattern.replace(/(\]|\[|\{|\}|\(|\)|\*|\+|\?|\.|\\)/g, '\\$1');
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


module.exports = {
	'contains': contains,
	'countOf': countOf,
	'endsWith': endsWith,
	'hasText': hasText,
	'isEmpty': isEmpty,
	'isNumeric': isNumeric,
	'wordCount': wordCount,
	'editDistance': editDistance,
	'similarity': similarity,
	'afterFirst': afterFirst,
	'afterLast': afterLast,
	'beginsWith': beginsWith,
	'beforeFirst': beforeFirst,
	'beforeLast': beforeLast,
	'between': between,
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
	'block': block,
	'escapePattern': escapePattern
};

},{}],15:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		//videoElement.setAttribute('preload', 'auto');
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

module.exports = VideoObject;

},{"signals":1}],16:[function(require,module,exports){
'use strict';

var ArrayUtils = require('../src/utils/array-utils.js');

describe('array utils', function() {
	it('should return [] is array true', function() {
		expect(ArrayUtils.isArray([])).to.be.true;
	});
	it('should return {} is array false', function() {
		expect(ArrayUtils.isArray({})).to.be.false;
	});
	it('should return numeric ordered array', function() {
		expect(ArrayUtils.sortNumeric([3,2,1,0])).to.eql([0,1,2,3]);
	});
	it('should return random sorted array', function() {
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.be.instanceof(Array);
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.have.property('length', 4);
	});
	it('should return random element', function() {
		expect(ArrayUtils.getRandom([3,2,1,0])).to.be.a('number');
	});
});

},{"../src/utils/array-utils.js":2}],17:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js');

describe('asset loader', function() {
	var assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		files = {
			'image': 'http://placekitten.com/g/200/300',
			'audio': ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
			'json': 'http://graph.facebook.com/facebook'
		},
		complete = false,
		loadProgress,
		childrenLoaded = 0;

	assetLoader.webAudioContext = null;
	assetLoader.crossOrigin = true;
	
	assetLoader.add(files.image, 'jpg');
	assetLoader.add(files.audio);
	assetLoader.add(files.json, 'json');

	beforeEach(function(done) {
		assetLoader.onProgress.add(function(progress) {
			loadProgress = progress;
		});
		assetLoader.onChildComplete.add(function() {
			childrenLoaded++;
		});
		assetLoader.onComplete.add(function() {
			complete = true;
			done();
		});
		assetLoader.start();
	});

	it('should have finished loading', function(){
		expect(complete).equals(true);
		expect(childrenLoaded).to.eql(assetLoader.numTotal);
		expect(assetLoader.numLoaded/assetLoader.numTotal).to.eql(1);
		expect(assetLoader.get(files.image)).to.exist;
		expect(assetLoader.get(files.audio)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
	});
});

},{"../src/utils/asset-loader.js":3}],18:[function(require,module,exports){
/*

'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	AudioObject = require('../src/utils/audio-object.js');

describe('audio object', function() {
	var audioObject,
		assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		file = ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
		playing = false;

	assetLoader.webAudioContext = null;
	assetLoader.add(file);

	beforeEach(function(done) {
		assetLoader.onComplete.add(function() {
			audioObject = new AudioObject(assetLoader.get(file).data, false, null);
			playing = audioObject.play();
			done();
		});
		assetLoader.start();
	});

	it('should be playing', function(){
		expect(playing).to.be.true;
		audioObject.stop();
	});
});
*/
},{}],19:[function(require,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

module.exports = {
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
},{}],3:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		/*request.onprogress = function(event) {
			if (event.lengthComputable) {
				var percentComplete = event.loaded / event.total;
				console.log('percentComplete:', percentComplete);
			} else {
				console.log('Unable to compute progress information since the total size is unknown');
			}
		};*/
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
	},
	loadHTML5Audio: function(touchLocked) {
		var request = new Audio();
		this.data = request;
		request.name = this.url;
		request.preload = 'auto';
		var self = this;
		request.onerror = function() {
			self.onError.dispatch();
		};
		request.src = this.url;
		if (!!touchLocked) {
			this.onComplete.dispatch(this.data);
		}
		else {
			/*request.addEventListener('canplaythrough', function(){
				console.log('audio canplaythrough');
				self.onComplete.dispatch(self.data);
			}, false);*/
			request.load();
			this.onComplete.dispatch(this.data);
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
	}
};

module.exports = AssetLoader;

/*if (typeof module !== 'undefined' && module.exports) {
	module.exports = AssetLoader;
}*/

/*var root = this;
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = AssetLoader;
    }
    exports.AssetLoader = AssetLoader;
} else if (typeof define !== 'undefined' && define.amd) {
    define('PIXI', (function() { return root.AssetLoader = AssetLoader; })() );
} else {
    root.PIXI = PIXI;
}*/
},{"signals":1}],4:[function(require,module,exports){
'use strict';

(function(fn) {
	window.console = window.console || {log:fn,warn:fn,error:fn,table:fn};
	window.console.table = window.console.table || fn;
}(function(){}));
},{}],5:[function(require,module,exports){
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

module.exports = {
	'hasClass': hasClass,
	'addClass': addClass,
	'removeClass': removeClass,
	'toggleClass': toggleClass
};

},{}],6:[function(require,module,exports){
'use strict';

var ua = navigator.userAgent;

/* mobile */

function mobile() {
	return !!ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
}

/* ios */

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

function ios5() {
	return !!(ua.match(/OS 5(_\d)+ like Mac OS X/i));
}

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

/* ie */

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

function ie9down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if IE]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function ie8down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if lte IE 8]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function dpr() {
	return window.devicePixelRatio !== undefined ? window.devicePixelRatio : 1;
}

function screenWidth() {
	return (android() ? window.outerWidth : window.screen.width) * dpr();
}

function screenHeight() {
	return  (android() ? window.outerHeight : window.screen.height) * dpr();
}

module.exports = {
	'mobile': mobile(),
	'ipad': ipad(),
	'iphone': iphone(),
	'ipod': ipod(),
	'ios': ios(),
	'ios5': ios5(),
	'android': android(),
	'androidOld': androidOld(),
	'androidStock': androidStock(),
	'ieVersion': ieVersion(),
	'ie9down': ie9down(),
	'ie8down': ie8down(),
	'screenWidth': screenWidth(),
	'screenHeight': screenHeight(),
	'dpr': dpr(),
	'retina': (dpr() > 1)
};

},{}],7:[function(require,module,exports){
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
		return function (el, type, func) {
			el.addEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.attachEvent('on' + type, function (e) {
				e = getEvent(e, el);
				func(e);
			});
		};
	}
}());

var removeEvent = (function () {
	if (document.addEventListener) {
		return function (el, type, func) {
			el.removeEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.detachEvent('on' + type, func);
		};
	}
}());

module.exports = {
	'addEvent': addEvent,
	'removeEvent': removeEvent
};

},{}],8:[function(require,module,exports){
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

module.exports = LinkedList;

},{}],9:[function(require,module,exports){
'use strict';

var DEG = 180 / Math.PI;
var RAD = Math.PI / 180;

var self = {
	map: function(v, a, b, x, y) {
		return (v === a) ? x : (v - a) * (y - x) / (b - a) + x;
	},
	lerp: function(from, to, percent) {
		return from + ( to - from ) * percent;
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
	random: function(min, max) {
		if ( isNaN(max) ) {
			max = min;
			min = 0;
		}
		return min + Math.random() * (max - min);
	},
	difference: function(a, b) {
		return Math.abs(a - b);
	},
	distance: function(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;
		return Math.sqrt(dx * dx + dy * dy);
	},
	coinToss: function() {
		return Math.random() > 0.5;
	},
	angle: function(x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		return Math.atan2(dy, dx);
	},
	degrees: function(radians) {
		return radians * DEG;
	},
	radians: function(degrees) {
		return degrees * RAD;
	},
	roundToNearest: function(value, amount) {
		return Math.round(value / amount) * amount;
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
	rotateTo: function(start, end) {
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
	dotProduct: function(aX, aY, bX, bY) {
		return aX * bX + aY * bY;
	}
};

module.exports = self;

},{}],10:[function(require,module,exports){
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

module.exports = ObjectPool;
},{}],11:[function(require,module,exports){
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
module.exports = ready;

},{}],12:[function(require,module,exports){
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

module.exports = resize;

},{}],13:[function(require,module,exports){
'use strict';

var self = {
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

module.exports = self;
},{}],14:[function(require,module,exports){
'use strict';

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

// regex escape pattern
function escapePattern(pattern) {
	return pattern.replace(/(\]|\[|\{|\}|\(|\)|\*|\+|\?|\.|\\)/g, '\\$1');
}

module.exports = {
	'contains': contains,
	'countOf': countOf,
	'endsWith': endsWith,
	'hasText': hasText,
	'isEmpty': isEmpty,
	'isNumeric': isNumeric,
	'wordCount': wordCount,
	'editDistance': editDistance,
	'similarity': similarity,
	'afterFirst': afterFirst,
	'afterLast': afterLast,
	'beginsWith': beginsWith,
	'beforeFirst': beforeFirst,
	'beforeLast': beforeLast,
	'between': between,
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
	'block': block,
	'escapePattern': escapePattern
};

},{}],15:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		//videoElement.setAttribute('preload', 'auto');
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

module.exports = VideoObject;

},{"signals":1}],16:[function(require,module,exports){
'use strict';

var ArrayUtils = require('../src/utils/array-utils.js');

describe('array utils', function() {
	it('should return [] is array true', function() {
		expect(ArrayUtils.isArray([])).to.be.true;
	});
	it('should return {} is array false', function() {
		expect(ArrayUtils.isArray({})).to.be.false;
	});
	it('should return numeric ordered array', function() {
		expect(ArrayUtils.sortNumeric([3,2,1,0])).to.eql([0,1,2,3]);
	});
	it('should return random sorted array', function() {
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.be.instanceof(Array);
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.have.property('length', 4);
	});
	it('should return random element', function() {
		expect(ArrayUtils.getRandom([3,2,1,0])).to.be.a('number');
	});
});

},{"../src/utils/array-utils.js":2}],17:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js');

describe('asset loader', function() {
	var assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		files = {
			'image': 'http://placekitten.com/g/200/300',
			'audio': ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
			'json': 'http://graph.facebook.com/facebook'
		},
		complete = false,
		loadProgress,
		childrenLoaded = 0;

	assetLoader.webAudioContext = null;
	assetLoader.crossOrigin = true;
	
	assetLoader.add(files.image, 'jpg');
	assetLoader.add(files.audio);
	assetLoader.add(files.json, 'json');

	beforeEach(function(done) {
		assetLoader.onProgress.add(function(progress) {
			loadProgress = progress;
		});
		assetLoader.onChildComplete.add(function() {
			childrenLoaded++;
		});
		assetLoader.onComplete.add(function() {
			complete = true;
			done();
		});
		assetLoader.start();
	});

	it('should have finished loading', function(){
		expect(complete).equals(true);
		expect(childrenLoaded).to.eql(assetLoader.numTotal);
		expect(assetLoader.numLoaded/assetLoader.numTotal).to.eql(1);
		expect(assetLoader.get(files.image)).to.exist;
		expect(assetLoader.get(files.audio)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
	});
});

},{"../src/utils/asset-loader.js":3}],18:[function(require,module,exports){
/*

'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	AudioObject = require('../src/utils/audio-object.js');

describe('audio object', function() {
	var audioObject,
		assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		file = ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
		playing = false;

	assetLoader.webAudioContext = null;
	assetLoader.add(file);

	beforeEach(function(done) {
		assetLoader.onComplete.add(function() {
			audioObject = new AudioObject(assetLoader.get(file).data, false, null);
			playing = audioObject.play();
			done();
		});
		assetLoader.start();
	});

	it('should be playing', function(){
		expect(playing).to.be.true;
		audioObject.stop();
	});
});
*/
},{}],19:[function(require,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

module.exports = {
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
},{}],3:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		/*request.onprogress = function(event) {
			if (event.lengthComputable) {
				var percentComplete = event.loaded / event.total;
				console.log('percentComplete:', percentComplete);
			} else {
				console.log('Unable to compute progress information since the total size is unknown');
			}
		};*/
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
	},
	loadHTML5Audio: function(touchLocked) {
		var request = new Audio();
		this.data = request;
		request.name = this.url;
		request.preload = 'auto';
		var self = this;
		request.onerror = function() {
			self.onError.dispatch();
		};
		request.src = this.url;
		if (!!touchLocked) {
			this.onComplete.dispatch(this.data);
		}
		else {
			/*request.addEventListener('canplaythrough', function(){
				console.log('audio canplaythrough');
				self.onComplete.dispatch(self.data);
			}, false);*/
			request.load();
			this.onComplete.dispatch(this.data);
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
	}
};

module.exports = AssetLoader;

/*if (typeof module !== 'undefined' && module.exports) {
	module.exports = AssetLoader;
}*/

/*var root = this;
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = AssetLoader;
    }
    exports.AssetLoader = AssetLoader;
} else if (typeof define !== 'undefined' && define.amd) {
    define('PIXI', (function() { return root.AssetLoader = AssetLoader; })() );
} else {
    root.PIXI = PIXI;
}*/
},{"signals":1}],4:[function(require,module,exports){
'use strict';

(function(fn) {
	window.console = window.console || {log:fn,warn:fn,error:fn,table:fn};
	window.console.table = window.console.table || fn;
}(function(){}));
},{}],5:[function(require,module,exports){
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

module.exports = {
	'hasClass': hasClass,
	'addClass': addClass,
	'removeClass': removeClass,
	'toggleClass': toggleClass
};

},{}],6:[function(require,module,exports){
'use strict';

var ua = navigator.userAgent;

/* mobile */

function mobile() {
	return !!ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
}

/* ios */

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

function ios5() {
	return !!(ua.match(/OS 5(_\d)+ like Mac OS X/i));
}

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

/* ie */

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

function ie9down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if IE]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function ie8down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if lte IE 8]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function dpr() {
	return window.devicePixelRatio !== undefined ? window.devicePixelRatio : 1;
}

function screenWidth() {
	return (android() ? window.outerWidth : window.screen.width) * dpr();
}

function screenHeight() {
	return  (android() ? window.outerHeight : window.screen.height) * dpr();
}

module.exports = {
	'mobile': mobile(),
	'ipad': ipad(),
	'iphone': iphone(),
	'ipod': ipod(),
	'ios': ios(),
	'ios5': ios5(),
	'android': android(),
	'androidOld': androidOld(),
	'androidStock': androidStock(),
	'ieVersion': ieVersion(),
	'ie9down': ie9down(),
	'ie8down': ie8down(),
	'screenWidth': screenWidth(),
	'screenHeight': screenHeight(),
	'dpr': dpr(),
	'retina': (dpr() > 1)
};

},{}],7:[function(require,module,exports){
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
		return function (el, type, func) {
			el.addEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.attachEvent('on' + type, function (e) {
				e = getEvent(e, el);
				func(e);
			});
		};
	}
}());

var removeEvent = (function () {
	if (document.addEventListener) {
		return function (el, type, func) {
			el.removeEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.detachEvent('on' + type, func);
		};
	}
}());

module.exports = {
	'addEvent': addEvent,
	'removeEvent': removeEvent
};

},{}],8:[function(require,module,exports){
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

module.exports = LinkedList;

},{}],9:[function(require,module,exports){
'use strict';

var DEG = 180 / Math.PI;
var RAD = Math.PI / 180;

var self = {
	map: function(v, a, b, x, y) {
		return (v === a) ? x : (v - a) * (y - x) / (b - a) + x;
	},
	lerp: function(from, to, percent) {
		return from + ( to - from ) * percent;
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
	random: function(min, max) {
		if ( isNaN(max) ) {
			max = min;
			min = 0;
		}
		return min + Math.random() * (max - min);
	},
	difference: function(a, b) {
		return Math.abs(a - b);
	},
	distance: function(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;
		return Math.sqrt(dx * dx + dy * dy);
	},
	coinToss: function() {
		return Math.random() > 0.5;
	},
	angle: function(x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		return Math.atan2(dy, dx);
	},
	degrees: function(radians) {
		return radians * DEG;
	},
	radians: function(degrees) {
		return degrees * RAD;
	},
	roundToNearest: function(value, amount) {
		return Math.round(value / amount) * amount;
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
	rotateTo: function(start, end) {
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
	dotProduct: function(aX, aY, bX, bY) {
		return aX * bX + aY * bY;
	}
};

module.exports = self;

},{}],10:[function(require,module,exports){
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

module.exports = ObjectPool;
},{}],11:[function(require,module,exports){
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
module.exports = ready;

},{}],12:[function(require,module,exports){
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

module.exports = resize;

},{}],13:[function(require,module,exports){
'use strict';

var self = {
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

module.exports = self;
},{}],14:[function(require,module,exports){
'use strict';



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

// regex escape pattern
function escapePattern(pattern) {
	return pattern.replace(/(\]|\[|\{|\}|\(|\)|\*|\+|\?|\.|\\)/g, '\\$1');
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

module.exports = {
	'contains': contains,
	'countOf': countOf,
	'endsWith': endsWith,
	'hasText': hasText,
	'isEmpty': isEmpty,
	'isNumeric': isNumeric,
	'wordCount': wordCount,
	'editDistance': editDistance,
	'similarity': similarity,
	'afterFirst': afterFirst,
	'afterLast': afterLast,
	'beginsWith': beginsWith,
	'beforeFirst': beforeFirst,
	'beforeLast': beforeLast,
	'between': between,
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
	'block': block,
	'escapePattern': escapePattern
};

},{}],15:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		//videoElement.setAttribute('preload', 'auto');
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

module.exports = VideoObject;

},{"signals":1}],16:[function(require,module,exports){
'use strict';

var ArrayUtils = require('../src/utils/array-utils.js');

describe('array utils', function() {
	it('should return [] is array true', function() {
		expect(ArrayUtils.isArray([])).to.be.true;
	});
	it('should return {} is array false', function() {
		expect(ArrayUtils.isArray({})).to.be.false;
	});
	it('should return numeric ordered array', function() {
		expect(ArrayUtils.sortNumeric([3,2,1,0])).to.eql([0,1,2,3]);
	});
	it('should return random sorted array', function() {
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.be.instanceof(Array);
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.have.property('length', 4);
	});
	it('should return random element', function() {
		expect(ArrayUtils.getRandom([3,2,1,0])).to.be.a('number');
	});
});

},{"../src/utils/array-utils.js":2}],17:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js');

describe('asset loader', function() {
	var assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		files = {
			'image': 'http://placekitten.com/g/200/300',
			'audio': ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
			'json': 'http://graph.facebook.com/facebook'
		},
		complete = false,
		loadProgress,
		childrenLoaded = 0;

	assetLoader.webAudioContext = null;
	assetLoader.crossOrigin = true;
	
	assetLoader.add(files.image, 'jpg');
	assetLoader.add(files.audio);
	assetLoader.add(files.json, 'json');

	beforeEach(function(done) {
		assetLoader.onProgress.add(function(progress) {
			loadProgress = progress;
		});
		assetLoader.onChildComplete.add(function() {
			childrenLoaded++;
		});
		assetLoader.onComplete.add(function() {
			complete = true;
			done();
		});
		assetLoader.start();
	});

	it('should have finished loading', function(){
		expect(complete).equals(true);
		expect(childrenLoaded).to.eql(assetLoader.numTotal);
		expect(assetLoader.numLoaded/assetLoader.numTotal).to.eql(1);
		expect(assetLoader.get(files.image)).to.exist;
		expect(assetLoader.get(files.audio)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
	});
});

},{"../src/utils/asset-loader.js":3}],18:[function(require,module,exports){
/*

'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	AudioObject = require('../src/utils/audio-object.js');

describe('audio object', function() {
	var audioObject,
		assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		file = ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
		playing = false;

	assetLoader.webAudioContext = null;
	assetLoader.add(file);

	beforeEach(function(done) {
		assetLoader.onComplete.add(function() {
			audioObject = new AudioObject(assetLoader.get(file).data, false, null);
			playing = audioObject.play();
			done();
		});
		assetLoader.start();
	});

	it('should be playing', function(){
		expect(playing).to.be.true;
		audioObject.stop();
	});
});
*/
},{}],19:[function(require,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

module.exports = {
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
},{}],3:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		/*request.onprogress = function(event) {
			if (event.lengthComputable) {
				var percentComplete = event.loaded / event.total;
				console.log('percentComplete:', percentComplete);
			} else {
				console.log('Unable to compute progress information since the total size is unknown');
			}
		};*/
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
	},
	loadHTML5Audio: function(touchLocked) {
		var request = new Audio();
		this.data = request;
		request.name = this.url;
		request.preload = 'auto';
		var self = this;
		request.onerror = function() {
			self.onError.dispatch();
		};
		request.src = this.url;
		if (!!touchLocked) {
			this.onComplete.dispatch(this.data);
		}
		else {
			/*request.addEventListener('canplaythrough', function(){
				console.log('audio canplaythrough');
				self.onComplete.dispatch(self.data);
			}, false);*/
			request.load();
			this.onComplete.dispatch(this.data);
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
	}
};

module.exports = AssetLoader;

/*if (typeof module !== 'undefined' && module.exports) {
	module.exports = AssetLoader;
}*/

/*var root = this;
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = AssetLoader;
    }
    exports.AssetLoader = AssetLoader;
} else if (typeof define !== 'undefined' && define.amd) {
    define('PIXI', (function() { return root.AssetLoader = AssetLoader; })() );
} else {
    root.PIXI = PIXI;
}*/
},{"signals":1}],4:[function(require,module,exports){
'use strict';

(function(fn) {
	window.console = window.console || {log:fn,warn:fn,error:fn,table:fn};
	window.console.table = window.console.table || fn;
}(function(){}));
},{}],5:[function(require,module,exports){
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

module.exports = {
	'hasClass': hasClass,
	'addClass': addClass,
	'removeClass': removeClass,
	'toggleClass': toggleClass
};

},{}],6:[function(require,module,exports){
'use strict';

var ua = navigator.userAgent;

/* mobile */

function mobile() {
	return !!ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
}

/* ios */

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

function ios5() {
	return !!(ua.match(/OS 5(_\d)+ like Mac OS X/i));
}

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

/* ie */

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

function ie9down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if IE]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function ie8down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if lte IE 8]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function dpr() {
	return window.devicePixelRatio !== undefined ? window.devicePixelRatio : 1;
}

function screenWidth() {
	return (android() ? window.outerWidth : window.screen.width) * dpr();
}

function screenHeight() {
	return  (android() ? window.outerHeight : window.screen.height) * dpr();
}

module.exports = {
	'mobile': mobile(),
	'ipad': ipad(),
	'iphone': iphone(),
	'ipod': ipod(),
	'ios': ios(),
	'ios5': ios5(),
	'android': android(),
	'androidOld': androidOld(),
	'androidStock': androidStock(),
	'ieVersion': ieVersion(),
	'ie9down': ie9down(),
	'ie8down': ie8down(),
	'screenWidth': screenWidth(),
	'screenHeight': screenHeight(),
	'dpr': dpr(),
	'retina': (dpr() > 1)
};

},{}],7:[function(require,module,exports){
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
		return function (el, type, func) {
			el.addEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.attachEvent('on' + type, function (e) {
				e = getEvent(e, el);
				func(e);
			});
		};
	}
}());

var removeEvent = (function () {
	if (document.addEventListener) {
		return function (el, type, func) {
			el.removeEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.detachEvent('on' + type, func);
		};
	}
}());

module.exports = {
	'addEvent': addEvent,
	'removeEvent': removeEvent
};

},{}],8:[function(require,module,exports){
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

module.exports = LinkedList;

},{}],9:[function(require,module,exports){
'use strict';

var DEG = 180 / Math.PI;
var RAD = Math.PI / 180;

var self = {
	map: function(v, a, b, x, y) {
		return (v === a) ? x : (v - a) * (y - x) / (b - a) + x;
	},
	lerp: function(from, to, percent) {
		return from + ( to - from ) * percent;
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
	random: function(min, max) {
		if ( isNaN(max) ) {
			max = min;
			min = 0;
		}
		return min + Math.random() * (max - min);
	},
	difference: function(a, b) {
		return Math.abs(a - b);
	},
	distance: function(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;
		return Math.sqrt(dx * dx + dy * dy);
	},
	coinToss: function() {
		return Math.random() > 0.5;
	},
	angle: function(x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		return Math.atan2(dy, dx);
	},
	degrees: function(radians) {
		return radians * DEG;
	},
	radians: function(degrees) {
		return degrees * RAD;
	},
	roundToNearest: function(value, amount) {
		return Math.round(value / amount) * amount;
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
	rotateTo: function(start, end) {
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
	dotProduct: function(aX, aY, bX, bY) {
		return aX * bX + aY * bY;
	}
};

module.exports = self;

},{}],10:[function(require,module,exports){
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

module.exports = ObjectPool;
},{}],11:[function(require,module,exports){
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
module.exports = ready;

},{}],12:[function(require,module,exports){
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

module.exports = resize;

},{}],13:[function(require,module,exports){
'use strict';

var self = {
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

module.exports = self;
},{}],14:[function(require,module,exports){
'use strict';

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

// regex escape pattern
function escapePattern(pattern) {
	return pattern.replace(/(\]|\[|\{|\}|\(|\)|\*|\+|\?|\.|\\)/g, '\\$1');
}

module.exports = {
	'contains': contains,
	'countOf': countOf,
	'endsWith': endsWith,
	'hasText': hasText,
	'isEmpty': isEmpty,
	'isNumeric': isNumeric,
	'wordCount': wordCount,
	'editDistance': editDistance,
	'similarity': similarity,
	'afterFirst': afterFirst,
	'afterLast': afterLast,
	'beginsWith': beginsWith,
	'beforeFirst': beforeFirst,
	'beforeLast': beforeLast,
	'between': between,
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
	'block': block,
	'escapePattern': escapePattern
};

},{}],15:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		//videoElement.setAttribute('preload', 'auto');
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

module.exports = VideoObject;

},{"signals":1}],16:[function(require,module,exports){
'use strict';

var ArrayUtils = require('../src/utils/array-utils.js');

describe('array utils', function() {
	it('should return [] is array true', function() {
		expect(ArrayUtils.isArray([])).to.be.true;
	});
	it('should return {} is array false', function() {
		expect(ArrayUtils.isArray({})).to.be.false;
	});
	it('should return numeric ordered array', function() {
		expect(ArrayUtils.sortNumeric([3,2,1,0])).to.eql([0,1,2,3]);
	});
	it('should return random sorted array', function() {
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.be.instanceof(Array);
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.have.property('length', 4);
	});
	it('should return random element', function() {
		expect(ArrayUtils.getRandom([3,2,1,0])).to.be.a('number');
	});
});

},{"../src/utils/array-utils.js":2}],17:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js');

describe('asset loader', function() {
	var assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		files = {
			'image': 'http://placekitten.com/g/200/300',
			'audio': ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
			'json': 'http://graph.facebook.com/facebook'
		},
		complete = false,
		loadProgress,
		childrenLoaded = 0;

	assetLoader.webAudioContext = null;
	assetLoader.crossOrigin = true;
	
	assetLoader.add(files.image, 'jpg');
	assetLoader.add(files.audio);
	assetLoader.add(files.json, 'json');

	beforeEach(function(done) {
		assetLoader.onProgress.add(function(progress) {
			loadProgress = progress;
		});
		assetLoader.onChildComplete.add(function() {
			childrenLoaded++;
		});
		assetLoader.onComplete.add(function() {
			complete = true;
			done();
		});
		assetLoader.start();
	});

	it('should have finished loading', function(){
		expect(complete).equals(true);
		expect(childrenLoaded).to.eql(assetLoader.numTotal);
		expect(assetLoader.numLoaded/assetLoader.numTotal).to.eql(1);
		expect(assetLoader.get(files.image)).to.exist;
		expect(assetLoader.get(files.audio)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
	});
});

},{"../src/utils/asset-loader.js":3}],18:[function(require,module,exports){
/*

'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	AudioObject = require('../src/utils/audio-object.js');

describe('audio object', function() {
	var audioObject,
		assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		file = ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
		playing = false;

	assetLoader.webAudioContext = null;
	assetLoader.add(file);

	beforeEach(function(done) {
		assetLoader.onComplete.add(function() {
			audioObject = new AudioObject(assetLoader.get(file).data, false, null);
			playing = audioObject.play();
			done();
		});
		assetLoader.start();
	});

	it('should be playing', function(){
		expect(playing).to.be.true;
		audioObject.stop();
	});
});
*/
},{}],19:[function(require,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

module.exports = {
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
},{}],3:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		/*request.onprogress = function(event) {
			if (event.lengthComputable) {
				var percentComplete = event.loaded / event.total;
				console.log('percentComplete:', percentComplete);
			} else {
				console.log('Unable to compute progress information since the total size is unknown');
			}
		};*/
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
	},
	loadHTML5Audio: function(touchLocked) {
		var request = new Audio();
		this.data = request;
		request.name = this.url;
		request.preload = 'auto';
		var self = this;
		request.onerror = function() {
			self.onError.dispatch();
		};
		request.src = this.url;
		if (!!touchLocked) {
			this.onComplete.dispatch(this.data);
		}
		else {
			/*request.addEventListener('canplaythrough', function(){
				console.log('audio canplaythrough');
				self.onComplete.dispatch(self.data);
			}, false);*/
			request.load();
			this.onComplete.dispatch(this.data);
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
	}
};

module.exports = AssetLoader;

/*if (typeof module !== 'undefined' && module.exports) {
	module.exports = AssetLoader;
}*/

/*var root = this;
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = AssetLoader;
    }
    exports.AssetLoader = AssetLoader;
} else if (typeof define !== 'undefined' && define.amd) {
    define('PIXI', (function() { return root.AssetLoader = AssetLoader; })() );
} else {
    root.PIXI = PIXI;
}*/
},{"signals":1}],4:[function(require,module,exports){
'use strict';

(function(fn) {
	window.console = window.console || {log:fn,warn:fn,error:fn,table:fn};
	window.console.table = window.console.table || fn;
}(function(){}));
},{}],5:[function(require,module,exports){
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

module.exports = {
	'hasClass': hasClass,
	'addClass': addClass,
	'removeClass': removeClass,
	'toggleClass': toggleClass
};

},{}],6:[function(require,module,exports){
'use strict';

var ua = navigator.userAgent;

/* mobile */

function mobile() {
	return !!ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
}

/* ios */

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

function ios5() {
	return !!(ua.match(/OS 5(_\d)+ like Mac OS X/i));
}

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

/* ie */

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

function ie9down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if IE]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function ie8down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if lte IE 8]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function dpr() {
	return window.devicePixelRatio !== undefined ? window.devicePixelRatio : 1;
}

function screenWidth() {
	return (android() ? window.outerWidth : window.screen.width) * dpr();
}

function screenHeight() {
	return  (android() ? window.outerHeight : window.screen.height) * dpr();
}

module.exports = {
	'mobile': mobile(),
	'ipad': ipad(),
	'iphone': iphone(),
	'ipod': ipod(),
	'ios': ios(),
	'ios5': ios5(),
	'android': android(),
	'androidOld': androidOld(),
	'androidStock': androidStock(),
	'ieVersion': ieVersion(),
	'ie9down': ie9down(),
	'ie8down': ie8down(),
	'screenWidth': screenWidth(),
	'screenHeight': screenHeight(),
	'dpr': dpr(),
	'retina': (dpr() > 1)
};

},{}],7:[function(require,module,exports){
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
		return function (el, type, func) {
			el.addEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.attachEvent('on' + type, function (e) {
				e = getEvent(e, el);
				func(e);
			});
		};
	}
}());

var removeEvent = (function () {
	if (document.addEventListener) {
		return function (el, type, func) {
			el.removeEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.detachEvent('on' + type, func);
		};
	}
}());

module.exports = {
	'addEvent': addEvent,
	'removeEvent': removeEvent
};

},{}],8:[function(require,module,exports){
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

module.exports = LinkedList;

},{}],9:[function(require,module,exports){
'use strict';

var DEG = 180 / Math.PI;
var RAD = Math.PI / 180;

var self = {
	map: function(v, a, b, x, y) {
		return (v === a) ? x : (v - a) * (y - x) / (b - a) + x;
	},
	lerp: function(from, to, percent) {
		return from + ( to - from ) * percent;
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
	random: function(min, max) {
		if ( isNaN(max) ) {
			max = min;
			min = 0;
		}
		return min + Math.random() * (max - min);
	},
	difference: function(a, b) {
		return Math.abs(a - b);
	},
	distance: function(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;
		return Math.sqrt(dx * dx + dy * dy);
	},
	coinToss: function() {
		return Math.random() > 0.5;
	},
	angle: function(x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		return Math.atan2(dy, dx);
	},
	degrees: function(radians) {
		return radians * DEG;
	},
	radians: function(degrees) {
		return degrees * RAD;
	},
	roundToNearest: function(value, amount) {
		return Math.round(value / amount) * amount;
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
	rotateTo: function(start, end) {
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
	dotProduct: function(aX, aY, bX, bY) {
		return aX * bX + aY * bY;
	}
};

module.exports = self;

},{}],10:[function(require,module,exports){
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

module.exports = ObjectPool;
},{}],11:[function(require,module,exports){
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
module.exports = ready;

},{}],12:[function(require,module,exports){
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

module.exports = resize;

},{}],13:[function(require,module,exports){
'use strict';

var self = {
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

module.exports = self;
},{}],14:[function(require,module,exports){
'use strict';

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

// regex escape pattern
function escapePattern(pattern) {
	return pattern.replace(/(\]|\[|\{|\}|\(|\)|\*|\+|\?|\.|\\)/g, '\\$1');
}

module.exports = {
	'contains': contains,
	'countOf': countOf,
	'endsWith': endsWith,
	'hasText': hasText,
	'isEmpty': isEmpty,
	'isNumeric': isNumeric,
	'wordCount': wordCount,
	'editDistance': editDistance,
	'similarity': similarity,
	'afterFirst': afterFirst,
	'afterLast': afterLast,
	'beginsWith': beginsWith,
	'beforeFirst': beforeFirst,
	'beforeLast': beforeLast,
	'between': between,
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
	'block': block,
	'escapePattern': escapePattern
};

},{}],15:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		//videoElement.setAttribute('preload', 'auto');
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

module.exports = VideoObject;

},{"signals":1}],16:[function(require,module,exports){
'use strict';

var ArrayUtils = require('../src/utils/array-utils.js');

describe('array utils', function() {
	it('should return [] is array true', function() {
		expect(ArrayUtils.isArray([])).to.be.true;
	});
	it('should return {} is array false', function() {
		expect(ArrayUtils.isArray({})).to.be.false;
	});
	it('should return numeric ordered array', function() {
		expect(ArrayUtils.sortNumeric([3,2,1,0])).to.eql([0,1,2,3]);
	});
	it('should return random sorted array', function() {
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.be.instanceof(Array);
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.have.property('length', 4);
	});
	it('should return random element', function() {
		expect(ArrayUtils.getRandom([3,2,1,0])).to.be.a('number');
	});
});

},{"../src/utils/array-utils.js":2}],17:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js');

describe('asset loader', function() {
	var assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		files = {
			'image': 'http://placekitten.com/g/200/300',
			'audio': ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
			'json': 'http://graph.facebook.com/facebook'
		},
		complete = false,
		loadProgress,
		childrenLoaded = 0;

	assetLoader.webAudioContext = null;
	assetLoader.crossOrigin = true;
	
	assetLoader.add(files.image, 'jpg');
	assetLoader.add(files.audio);
	assetLoader.add(files.json, 'json');

	beforeEach(function(done) {
		assetLoader.onProgress.add(function(progress) {
			loadProgress = progress;
		});
		assetLoader.onChildComplete.add(function() {
			childrenLoaded++;
		});
		assetLoader.onComplete.add(function() {
			complete = true;
			done();
		});
		assetLoader.start();
	});

	it('should have finished loading', function(){
		expect(complete).equals(true);
		expect(childrenLoaded).to.eql(assetLoader.numTotal);
		expect(assetLoader.numLoaded/assetLoader.numTotal).to.eql(1);
		expect(assetLoader.get(files.image)).to.exist;
		expect(assetLoader.get(files.audio)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
	});
});

},{"../src/utils/asset-loader.js":3}],18:[function(require,module,exports){
/*

'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	AudioObject = require('../src/utils/audio-object.js');

describe('audio object', function() {
	var audioObject,
		assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		file = ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
		playing = false;

	assetLoader.webAudioContext = null;
	assetLoader.add(file);

	beforeEach(function(done) {
		assetLoader.onComplete.add(function() {
			audioObject = new AudioObject(assetLoader.get(file).data, false, null);
			playing = audioObject.play();
			done();
		});
		assetLoader.start();
	});

	it('should be playing', function(){
		expect(playing).to.be.true;
		audioObject.stop();
	});
});
*/
},{}],19:[function(require,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

module.exports = {
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
},{}],3:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		/*request.onprogress = function(event) {
			if (event.lengthComputable) {
				var percentComplete = event.loaded / event.total;
				console.log('percentComplete:', percentComplete);
			} else {
				console.log('Unable to compute progress information since the total size is unknown');
			}
		};*/
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
	},
	loadHTML5Audio: function(touchLocked) {
		var request = new Audio();
		this.data = request;
		request.name = this.url;
		request.preload = 'auto';
		var self = this;
		request.onerror = function() {
			self.onError.dispatch();
		};
		request.src = this.url;
		if (!!touchLocked) {
			this.onComplete.dispatch(this.data);
		}
		else {
			/*request.addEventListener('canplaythrough', function(){
				console.log('audio canplaythrough');
				self.onComplete.dispatch(self.data);
			}, false);*/
			request.load();
			this.onComplete.dispatch(this.data);
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
	}
};

module.exports = AssetLoader;

/*if (typeof module !== 'undefined' && module.exports) {
	module.exports = AssetLoader;
}*/

/*var root = this;
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = AssetLoader;
    }
    exports.AssetLoader = AssetLoader;
} else if (typeof define !== 'undefined' && define.amd) {
    define('PIXI', (function() { return root.AssetLoader = AssetLoader; })() );
} else {
    root.PIXI = PIXI;
}*/
},{"signals":1}],4:[function(require,module,exports){
'use strict';

(function(fn) {
	window.console = window.console || {log:fn,warn:fn,error:fn,table:fn};
	window.console.table = window.console.table || fn;
}(function(){}));
},{}],5:[function(require,module,exports){
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

module.exports = {
	'hasClass': hasClass,
	'addClass': addClass,
	'removeClass': removeClass,
	'toggleClass': toggleClass
};

},{}],6:[function(require,module,exports){
'use strict';

var ua = navigator.userAgent;

/* mobile */

function mobile() {
	return !!ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
}

/* ios */

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

function ios5() {
	return !!(ua.match(/OS 5(_\d)+ like Mac OS X/i));
}

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

/* ie */

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

function ie9down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if IE]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function ie8down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if lte IE 8]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function dpr() {
	return window.devicePixelRatio !== undefined ? window.devicePixelRatio : 1;
}

function screenWidth() {
	return (android() ? window.outerWidth : window.screen.width) * dpr();
}

function screenHeight() {
	return  (android() ? window.outerHeight : window.screen.height) * dpr();
}

module.exports = {
	'mobile': mobile(),
	'ipad': ipad(),
	'iphone': iphone(),
	'ipod': ipod(),
	'ios': ios(),
	'ios5': ios5(),
	'android': android(),
	'androidOld': androidOld(),
	'androidStock': androidStock(),
	'ieVersion': ieVersion(),
	'ie9down': ie9down(),
	'ie8down': ie8down(),
	'screenWidth': screenWidth(),
	'screenHeight': screenHeight(),
	'dpr': dpr(),
	'retina': (dpr() > 1)
};

},{}],7:[function(require,module,exports){
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
		return function (el, type, func) {
			el.addEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.attachEvent('on' + type, function (e) {
				e = getEvent(e, el);
				func(e);
			});
		};
	}
}());

var removeEvent = (function () {
	if (document.addEventListener) {
		return function (el, type, func) {
			el.removeEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.detachEvent('on' + type, func);
		};
	}
}());

module.exports = {
	'addEvent': addEvent,
	'removeEvent': removeEvent
};

},{}],8:[function(require,module,exports){
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

module.exports = LinkedList;

},{}],9:[function(require,module,exports){
'use strict';

var DEG = 180 / Math.PI;
var RAD = Math.PI / 180;

var self = {
	map: function(v, a, b, x, y) {
		return (v === a) ? x : (v - a) * (y - x) / (b - a) + x;
	},
	lerp: function(from, to, percent) {
		return from + ( to - from ) * percent;
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
	random: function(min, max) {
		if ( isNaN(max) ) {
			max = min;
			min = 0;
		}
		return min + Math.random() * (max - min);
	},
	difference: function(a, b) {
		return Math.abs(a - b);
	},
	distance: function(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;
		return Math.sqrt(dx * dx + dy * dy);
	},
	coinToss: function() {
		return Math.random() > 0.5;
	},
	angle: function(x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		return Math.atan2(dy, dx);
	},
	degrees: function(radians) {
		return radians * DEG;
	},
	radians: function(degrees) {
		return degrees * RAD;
	},
	roundToNearest: function(value, amount) {
		return Math.round(value / amount) * amount;
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
	rotateTo: function(start, end) {
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
	dotProduct: function(aX, aY, bX, bY) {
		return aX * bX + aY * bY;
	}
};

module.exports = self;

},{}],10:[function(require,module,exports){
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

module.exports = ObjectPool;
},{}],11:[function(require,module,exports){
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
module.exports = ready;

},{}],12:[function(require,module,exports){
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

module.exports = resize;

},{}],13:[function(require,module,exports){
'use strict';

var self = {
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

module.exports = self;
},{}],14:[function(require,module,exports){
'use strict';

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

// regex escape pattern
function escapePattern(pattern) {
	return pattern.replace(/(\]|\[|\{|\}|\(|\)|\*|\+|\?|\.|\\)/g, '\\$1');
}

module.exports = {
	'contains': contains,
	'countOf': countOf,
	'endsWith': endsWith,
	'hasText': hasText,
	'isEmpty': isEmpty,
	'isNumeric': isNumeric,
	'wordCount': wordCount,
	'editDistance': editDistance,
	'similarity': similarity,
	'afterFirst': afterFirst,
	'afterLast': afterLast,
	'beginsWith': beginsWith,
	'beforeFirst': beforeFirst,
	'beforeLast': beforeLast,
	'between': between,
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
	'block': block,
	'escapePattern': escapePattern
};

},{}],15:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		//videoElement.setAttribute('preload', 'auto');
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

module.exports = VideoObject;

},{"signals":1}],16:[function(require,module,exports){
'use strict';

var ArrayUtils = require('../src/utils/array-utils.js');

describe('array utils', function() {
	it('should return [] is array true', function() {
		expect(ArrayUtils.isArray([])).to.be.true;
	});
	it('should return {} is array false', function() {
		expect(ArrayUtils.isArray({})).to.be.false;
	});
	it('should return numeric ordered array', function() {
		expect(ArrayUtils.sortNumeric([3,2,1,0])).to.eql([0,1,2,3]);
	});
	it('should return random sorted array', function() {
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.be.instanceof(Array);
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.have.property('length', 4);
	});
	it('should return random element', function() {
		expect(ArrayUtils.getRandom([3,2,1,0])).to.be.a('number');
	});
});

},{"../src/utils/array-utils.js":2}],17:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js');

describe('asset loader', function() {
	var assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		files = {
			'image': 'http://placekitten.com/g/200/300',
			'audio': ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
			'json': 'http://graph.facebook.com/facebook'
		},
		complete = false,
		loadProgress,
		childrenLoaded = 0;

	assetLoader.webAudioContext = null;
	assetLoader.crossOrigin = true;
	
	assetLoader.add(files.image, 'jpg');
	assetLoader.add(files.audio);
	assetLoader.add(files.json, 'json');

	beforeEach(function(done) {
		assetLoader.onProgress.add(function(progress) {
			loadProgress = progress;
		});
		assetLoader.onChildComplete.add(function() {
			childrenLoaded++;
		});
		assetLoader.onComplete.add(function() {
			complete = true;
			done();
		});
		assetLoader.start();
	});

	it('should have finished loading', function(){
		expect(complete).equals(true);
		expect(childrenLoaded).to.eql(assetLoader.numTotal);
		expect(assetLoader.numLoaded/assetLoader.numTotal).to.eql(1);
		expect(assetLoader.get(files.image)).to.exist;
		expect(assetLoader.get(files.audio)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
	});
});

},{"../src/utils/asset-loader.js":3}],18:[function(require,module,exports){
/*

'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	AudioObject = require('../src/utils/audio-object.js');

describe('audio object', function() {
	var audioObject,
		assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		file = ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
		playing = false;

	assetLoader.webAudioContext = null;
	assetLoader.add(file);

	beforeEach(function(done) {
		assetLoader.onComplete.add(function() {
			audioObject = new AudioObject(assetLoader.get(file).data, false, null);
			playing = audioObject.play();
			done();
		});
		assetLoader.start();
	});

	it('should be playing', function(){
		expect(playing).to.be.true;
		audioObject.stop();
	});
});
*/
},{}],19:[function(require,module,exports){
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

module.exports = {
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
},{}],3:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		/*request.onprogress = function(event) {
			if (event.lengthComputable) {
				var percentComplete = event.loaded / event.total;
				console.log('percentComplete:', percentComplete);
			} else {
				console.log('Unable to compute progress information since the total size is unknown');
			}
		};*/
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
	},
	loadHTML5Audio: function(touchLocked) {
		var request = new Audio();
		this.data = request;
		request.name = this.url;
		request.preload = 'auto';
		var self = this;
		request.onerror = function() {
			self.onError.dispatch();
		};
		request.src = this.url;
		if (!!touchLocked) {
			this.onComplete.dispatch(this.data);
		}
		else {
			/*request.addEventListener('canplaythrough', function(){
				console.log('audio canplaythrough');
				self.onComplete.dispatch(self.data);
			}, false);*/
			request.load();
			this.onComplete.dispatch(this.data);
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
	}
};

module.exports = AssetLoader;

/*if (typeof module !== 'undefined' && module.exports) {
	module.exports = AssetLoader;
}*/

/*var root = this;
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = AssetLoader;
    }
    exports.AssetLoader = AssetLoader;
} else if (typeof define !== 'undefined' && define.amd) {
    define('PIXI', (function() { return root.AssetLoader = AssetLoader; })() );
} else {
    root.PIXI = PIXI;
}*/
},{"signals":1}],4:[function(require,module,exports){
'use strict';

(function(fn) {
	window.console = window.console || {log:fn,warn:fn,error:fn,table:fn};
	window.console.table = window.console.table || fn;
}(function(){}));
},{}],5:[function(require,module,exports){
'use strict';

var hasClass = function(el, className) {
	if (el.classList) {
		return el.classList.contains(className);
	}
	else {
		return el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
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

var removeClass = function(el, className) {
	if (el.classList) {
		el.classList.remove(className);
	}
	else if (hasClass(el, className)) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		el.className = el.className.replace(reg, ' ');
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

module.exports = {
	'hasClass': hasClass,
	'addClass': addClass,
	'removeClass': removeClass,
	'toggleClass': toggleClass
};

},{}],6:[function(require,module,exports){
'use strict';

var ua = navigator.userAgent;

/* mobile */

function mobile() {
	return !!ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
}

/* ios */

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

function ios5() {
	return !!(ua.match(/OS 5(_\d)+ like Mac OS X/i));
}

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

/* ie */

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

function ie9down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if IE]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function ie8down() {
	var div = document.createElement('div');
	div.innerHTML = '<!--[if lte IE 8]><i></i><![endif]-->';
	return (div.getElementsByTagName('i').length === 1);
}

function dpr() {
	return window.devicePixelRatio !== undefined ? window.devicePixelRatio : 1;
}

function screenWidth() {
	return (android() ? window.outerWidth : window.screen.width) * dpr();
}

function screenHeight() {
	return  (android() ? window.outerHeight : window.screen.height) * dpr();
}

module.exports = {
	'mobile': mobile(),
	'ipad': ipad(),
	'iphone': iphone(),
	'ipod': ipod(),
	'ios': ios(),
	'ios5': ios5(),
	'android': android(),
	'androidOld': androidOld(),
	'androidStock': androidStock(),
	'ieVersion': ieVersion(),
	'ie9down': ie9down(),
	'ie8down': ie8down(),
	'screenWidth': screenWidth(),
	'screenHeight': screenHeight(),
	'dpr': dpr(),
	'retina': (dpr() > 1)
};

},{}],7:[function(require,module,exports){
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
		return function (el, type, func) {
			el.addEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.attachEvent('on' + type, function (e) {
				e = getEvent(e, el);
				func(e);
			});
		};
	}
}());

var removeEvent = (function () {
	if (document.addEventListener) {
		return function (el, type, func) {
			el.removeEventListener(type, func, false);
		};
	} else {
		return function (el, type, func) {
			el.detachEvent('on' + type, func);
		};
	}
}());

module.exports = {
	'addEvent': addEvent,
	'removeEvent': removeEvent
};

},{}],8:[function(require,module,exports){
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

module.exports = LinkedList;

},{}],9:[function(require,module,exports){
'use strict';

var DEG = 180 / Math.PI;
var RAD = Math.PI / 180;

var self = {
	map: function(v, a, b, x, y) {
		return (v === a) ? x : (v - a) * (y - x) / (b - a) + x;
	},
	lerp: function(from, to, percent) {
		return from + ( to - from ) * percent;
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
	random: function(min, max) {
		if ( isNaN(max) ) {
			max = min;
			min = 0;
		}
		return min + Math.random() * (max - min);
	},
	difference: function(a, b) {
		return Math.abs(a - b);
	},
	distance: function(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;
		return Math.sqrt(dx * dx + dy * dy);
	},
	coinToss: function() {
		return Math.random() > 0.5;
	},
	angle: function(x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		return Math.atan2(dy, dx);
	},
	degrees: function(radians) {
		return radians * DEG;
	},
	radians: function(degrees) {
		return degrees * RAD;
	},
	roundToNearest: function(value, amount) {
		return Math.round(value / amount) * amount;
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
	rotateTo: function(start, end) {
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
	dotProduct: function(aX, aY, bX, bY) {
		return aX * bX + aY * bY;
	}
};

module.exports = self;

},{}],10:[function(require,module,exports){
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

module.exports = ObjectPool;
},{}],11:[function(require,module,exports){
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
module.exports = ready;

},{}],12:[function(require,module,exports){
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

module.exports = resize;

},{}],13:[function(require,module,exports){
'use strict';

var self = {
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

module.exports = self;
},{}],14:[function(require,module,exports){
'use strict';

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

// regex escape pattern
function escapePattern(pattern) {
	return pattern.replace(/(\]|\[|\{|\}|\(|\)|\*|\+|\?|\.|\\)/g, '\\$1');
}

module.exports = {
	'contains': contains,
	'countOf': countOf,
	'endsWith': endsWith,
	'hasText': hasText,
	'isEmpty': isEmpty,
	'isNumeric': isNumeric,
	'wordCount': wordCount,
	'editDistance': editDistance,
	'similarity': similarity,
	'afterFirst': afterFirst,
	'afterLast': afterLast,
	'beginsWith': beginsWith,
	'beforeFirst': beforeFirst,
	'beforeLast': beforeLast,
	'between': between,
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
	'block': block,
	'escapePattern': escapePattern
};

},{}],15:[function(require,module,exports){
'use strict';

var signals = require('signals');

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
		//videoElement.setAttribute('preload', 'auto');
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

module.exports = VideoObject;

},{"signals":1}],16:[function(require,module,exports){
'use strict';

var ArrayUtils = require('../src/utils/array-utils.js');

describe('array utils', function() {
	it('should return [] is array true', function() {
		expect(ArrayUtils.isArray([])).to.be.true;
	});
	it('should return {} is array false', function() {
		expect(ArrayUtils.isArray({})).to.be.false;
	});
	it('should return numeric ordered array', function() {
		expect(ArrayUtils.sortNumeric([3,2,1,0])).to.eql([0,1,2,3]);
	});
	it('should return random sorted array', function() {
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.be.instanceof(Array);
		expect(ArrayUtils.sortRandom([3,2,1,0])).to.have.property('length', 4);
	});
	it('should return random element', function() {
		expect(ArrayUtils.getRandom([3,2,1,0])).to.be.a('number');
	});
});

},{"../src/utils/array-utils.js":2}],17:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js');

describe('asset loader', function() {
	var assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		files = {
			'image': 'http://placekitten.com/g/200/300',
			'audio': ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
			'json': 'http://graph.facebook.com/facebook'
		},
		complete = false,
		loadProgress,
		childrenLoaded = 0;

	assetLoader.webAudioContext = null;
	assetLoader.crossOrigin = true;
	
	assetLoader.add(files.image, 'jpg');
	assetLoader.add(files.audio);
	assetLoader.add(files.json, 'json');

	beforeEach(function(done) {
		assetLoader.onProgress.add(function(progress) {
			loadProgress = progress;
		});
		assetLoader.onChildComplete.add(function() {
			childrenLoaded++;
		});
		assetLoader.onComplete.add(function() {
			complete = true;
			done();
		});
		assetLoader.start();
	});

	it('should have finished loading', function(){
		expect(complete).equals(true);
		expect(childrenLoaded).to.eql(assetLoader.numTotal);
		expect(assetLoader.numLoaded/assetLoader.numTotal).to.eql(1);
		expect(assetLoader.get(files.image)).to.exist;
		expect(assetLoader.get(files.audio)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
		expect(assetLoader.get(files.json)).to.exist;
	});
});

},{"../src/utils/asset-loader.js":3}],18:[function(require,module,exports){
/*

'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	AudioObject = require('../src/utils/audio-object.js');

describe('audio object', function() {
	var audioObject,
		assetLoader = new AssetLoader(),
		el = document.createElement('audio'),
		ext = (el.canPlayType('audio/mpeg;') ? 'mp3' : 'ogg'),
		file = ('http://www.google.com/logos/2013/debussy/clairdelune.' + ext),
		playing = false;

	assetLoader.webAudioContext = null;
	assetLoader.add(file);

	beforeEach(function(done) {
		assetLoader.onComplete.add(function() {
			audioObject = new AudioObject(assetLoader.get(file).data, false, null);
			playing = audioObject.play();
			done();
		});
		assetLoader.start();
	});

	it('should be playing', function(){
		expect(playing).to.be.true;
		audioObject.stop();
	});
});
*/
},{}],19:[function(require,module,exports){
'use strict';

require('../src/utils/console-patch.js');

describe('console patch', function() {

	it('should be function', function() {
		expect(window.console).to.exist;
		expect(window.console.table).to.exist;
	});

});
},{"../src/utils/console-patch.js":4}],20:[function(require,module,exports){
'use strict';

var CssUtils = require('../src/utils/css-utils.js');

describe('css utils', function() {
	var el = document.createElement('div');
	
	it('should add class to element', function() {
		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('foo');

		CssUtils.addClass(el, 'bar');
		expect(el.className).to.eql('foo bar');

		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('bar foo');

		CssUtils.removeClass(el, 'foo');
		expect(el.className).to.eql('bar');
	});

	it('should remove class from', function() {
				CssUtils.removeClass(el, 'foo');
				expect(el.className).to.eql('bar');
	});

	it('should return true', function() {
				expect(CssUtils.hasClass(el, 'bar')).to.be.true;
	});

	it('should return false', function() {
				expect(CssUtils.hasClass(el, 'foo')).to.be.false;
	});
});

},{"../src/utils/css-utils.js":5}],21:[function(require,module,exports){
'use strict';

var device = require('../src/utils/device.js');

describe('device', function() {
	
	it('should pass', function() {
		expect(device.mobile).to.be.false;
		expect(device.ipad).to.be.false;
		expect(device.iphone).to.be.false;
		expect(device.ipod).to.be.false;
		expect(device.ios).to.be.false;
		expect(device.ios5).to.be.false;
		expect(device.android).to.be.false;
		expect(device.androidOld).to.be.false;
		expect(device.androidStock).to.be.false;
		expect(device.ieVersion).to.eql(-1);
		expect(device.ie9down).to.be.false;
		expect(device.ie8down).to.be.false;
		expect(device.screenWidth).to.eql(window.screen.width);
		expect(device.screenHeight).to.eql(window.screen.height);
		expect(device.dpr).to.eql(1);
		expect(device.ie8down).to.be.false;
	});

});

},{"../src/utils/device.js":6}],22:[function(require,module,exports){
'use strict';

var EventUtils = require('../src/utils/event-utils.js');

describe('event utils', function() {
	var el = document.createElement('div'),
		complete = false;

	function simulateClick(el) {
		var e = document.createEvent('MouseEvents');
		e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		var cancelled = el.dispatchEvent(e);
		return cancelled;
	}

	EventUtils.addEvent(el, 'click', function() {
		complete = true;
	});

	simulateClick(el);
	
	it('should have recived click event', function() {
		expect(complete).to.be.true;
	});
});

},{"../src/utils/event-utils.js":7}],23:[function(require,module,exports){
'use strict';

var LinkedList = require('../src/utils/linked-list.js');

describe('linked list', function() {
	var linkedList = new LinkedList();
	var items = [];

	for (var i = 0; i < 10; i++) {
		items.push(linkedList.add({
			'index': i,
			'next': null,
			'prev': null
		}));
	}
	
	it('should have 10 items', function() {
		expect(linkedList.getCount()).to.eql(10);
	});

	it('should have first', function() {
		expect(linkedList.getFirst()).to.exist;
	});

	it('should have last', function() {
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to iterate', function() {
		var item = linkedList.getFirst();
		while(item.next) {
			expect(item).to.exist;
			expect(item).to.have.property('index');
			item = item.next;
		}
		expect(item).to.eql(linkedList.getLast());
	});

	it('should be able to remove item', function() {
		linkedList.remove(linkedList.getFirst());
		expect(linkedList.getCount()).to.eql(9);
		expect(linkedList.getFirst()).to.exist;

		linkedList.remove(linkedList.getLast());
		expect(linkedList.getCount()).to.eql(8);
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to insert', function() {
		var item = {
			'index': 100,
			'next': null,
			'prev': null
		};
		linkedList.insertBefore(item, linkedList.getFirst());

		expect(linkedList.getCount()).to.eql(9);
		expect(item).to.eql(linkedList.getFirst());
	});
});

},{"../src/utils/linked-list.js":8}],24:[function(require,module,exports){
'use strict';

var MathUtils = require('../src/utils/math-utils.js');

describe('math utils', function() {
	
	it('should pass', function() {
		expect(MathUtils.map(0.75, 0, 1, -100, 100)).to.eql(50);
		expect(MathUtils.lerp(0, 1, 0.5)).to.eql(0.5);
		expect(MathUtils.clamp(100, 0, 50)).to.eql(50);
		expect(MathUtils.random(0, 100)).to.be.within(0,100);
		expect(MathUtils.difference(-20, 20)).to.eql(40);
		expect(MathUtils.distance(0, 0, 1, 1)).to.eql(Math.SQRT2);
		expect(MathUtils.coinToss()).to.be.a('boolean');
		expect(MathUtils.angle(0, 0, -1, 0)).to.eql(Math.PI);
		expect(MathUtils.degrees(Math.PI)).to.eql(180);
		expect(MathUtils.radians(180)).to.eql(Math.PI);
		expect(MathUtils.roundToNearest(96.5, 10)).to.eql(100);
		expect(MathUtils.getIntersectionArea(0, 0, 2, 2, 0, 1, 2, 2)).to.eql(2);
		expect(MathUtils.rotateTo(359, 1)).to.eql(361);
	});

});

},{"../src/utils/math-utils.js":9}],25:[function(require,module,exports){
'use strict';

var ObjectPool = require('../src/utils/object-pool.js');

describe('object pool', function() {
	var newlyCreated = 0;

	function TestOb() {
		newlyCreated ++;
		var id = Math.random();
		return {
			getId: function() {
				return id;
			}
		};
	}

	it('should pass', function(){
		var p = new ObjectPool(TestOb);
		var t = p.get();

		expect(t).to.exist;
		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);

		p.dispose(t);

		expect(p.getPool().length).to.eql(1);
		
		t = p.get();

		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);
		expect(newlyCreated).to.eql(1);

		p.fill(10);
		expect(p.getPool().length).to.eql(10);
		expect(newlyCreated).to.eql(11);

		for(var i = 0; i < 5; i++) {
			t = p.get();
			expect(t.getId()).to.be.a('number');
		}
		expect(p.getPool().length).to.eql(5);
		expect(newlyCreated).to.eql(11);
	});
});

},{"../src/utils/object-pool.js":10}],26:[function(require,module,exports){
'use strict';

var ready = require('../src/utils/ready.js');

describe('ready', function() {
	var isReady = false;
	
	beforeEach(function(done) {
		ready(function() {
			isReady = true;
			done();
		});
	});

	it('should be ready', function(){
		expect(isReady).to.be.true;
	});
});

},{"../src/utils/ready.js":11}],27:[function(require,module,exports){
'use strict';

var resize = require('../src/utils/resize.js');

describe('resize', function() {
	var rect = {
		x: 0,
		y: 0,
		width: 640,
		height: 360
	};

	it('should pass', function(){
		resize(rect, 1920, 720, true, 'fit');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});

		resize(rect, 1920, 720, true, 'fill');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitWidth');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitHeight');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});
	});
});

},{"../src/utils/resize.js":12}],28:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	StorageUtils = require('../src/utils/storage-utils.js');

describe('storage utils', function() {
	var key = 'testData',
		testData = {
			id: 'foo',
			name: 'bar',
			x: 0
		};

	it('should store object and return true', function(){
		var saved = StorageUtils.saveJSON(key, testData);
		expect(saved).to.be.true;
	});

	it('should retrieve stored object', function(){
		var loaded = StorageUtils.loadJSON(key);
		expect(loaded).to.exist;
		expect(loaded.id).to.eql('foo');
		expect(loaded.name).to.eql('bar');
		expect(loaded.x).to.eql(0);
	});

	var loader = new AssetLoader.Loader('http://placekitten.com/g/200/300', 'jpg');
	loader.crossOrigin = true;
	beforeEach(function(done) {
		loader.onComplete.add(function() {
			loader.onComplete.removeAll();
			done();
		});
		loader.start();
	});

	it('should get image data', function(){
		var dataURL = StorageUtils.getImageDataURL(loader.data);
		expect(dataURL.indexOf('data:image/')).to.eql(0);
	});
});

},{"../src/utils/asset-loader.js":3,"../src/utils/storage-utils.js":13}],29:[function(require,module,exports){
'use strict';

var StringUtils = require('../src/utils/string-utils.js');

describe('string utils', function() {

	var str = 'Hello World';

	it('should query', function() {
		expect(StringUtils.contains(str, 'World')).to.be.true;
		expect(StringUtils.countOf(str, 'l')).to.eql(3);
		expect(StringUtils.endsWith(str, 'ld')).to.be.true;
		expect(StringUtils.hasText(str)).to.be.true;
		expect(StringUtils.isEmpty(str)).to.be.false;
		expect(StringUtils.isNumeric(str)).to.be.false;
		expect(StringUtils.isNumeric('68769123214')).to.be.true;
		expect(StringUtils.wordCount(str)).to.eql(2);
		expect(StringUtils.editDistance(str, str)).to.eql(0);
		expect(StringUtils.editDistance(str, str + 'a')).to.eql(1);
		expect(StringUtils.similarity(str, str)).to.eql(1);
	});

	it('should find substr', function() {
		expect(StringUtils.afterFirst(str, 'l')).to.eql('lo World');
		expect(StringUtils.afterLast(str, 'l')).to.eql('d');
		expect(StringUtils.beginsWith(str, 'H')).to.be.true;
		expect(StringUtils.beforeFirst(str, 'l')).to.eql('He');
		expect(StringUtils.beforeLast(str, 'l')).to.eql('Hello Wor');
		expect(StringUtils.between(str, 'H', 'W')).to.eql('ello ');
	});

	it('should format', function() {
		expect(StringUtils.trim('  '+str+'  ')).to.eql('Hello World');
		expect(StringUtils.trimLeft('  '+str+'  ')).to.eql('Hello World  ');
		expect(StringUtils.trimRight('  '+str+'  ')).to.eql('  Hello World');
		expect(StringUtils.padLeft(str, '_', 12)).to.eql('_Hello World');
		expect(StringUtils.padRight(str, '_', 12)).to.eql('Hello World_');
		expect(StringUtils.removeExtraWhitespace('Hello     World')).to.eql('Hello World');
		expect(StringUtils.remove(str, 'll')).to.eql('Heo World');
		// TODO: this sometime acts unexpectedly with shorter strings
		expect(StringUtils.truncate(str, 10)).to.eql('Hello...');
		//expect(StringUtils.truncate(str, 4)).to.eql('Hello...');
		expect(StringUtils.capitalize(str.toLowerCase())).to.eql('Hello world');
		expect(StringUtils.properCase(str.toLowerCase())).to.eql('Hello World');
		expect(StringUtils.reverse(str)).to.eql('dlroW olleH');
		expect(StringUtils.reverseWords(str)).to.eql('World Hello');
		expect(StringUtils.stripTags('<p>'+str+'</p>')).to.eql('Hello World');
		expect(StringUtils.swapCase(str)).to.eql('hello World');
		//expect(StringUtils.block(str)).to.eql('Hello World');
		expect(StringUtils.escapePattern(str + '.')).to.eql('Hello World\\.');
	});
});

},{"../src/utils/string-utils.js":14}],30:[function(require,module,exports){
'use strict';

describe('A test suite', function() {
	beforeEach(function() {
	});
	afterEach(function() {
	});

	it('should fail', function() {
		expect(true).to.be.true;
	});
});

},{}],31:[function(require,module,exports){
'use strict';

var VideoObject = require('../src/utils/video-object.js');

describe('video object', function() {
	var videoObject = new VideoObject(),
		el = document.createElement('video'),
		ext = (el.canPlayType('video/mp4;') ? 'mp4' : 'ogv'),
		file = ('http://techslides.com/demos/sample-videos/small.' + ext),
		ready = false;

	beforeEach(function(done) {
		videoObject.onReady.add(function() {
			ready = true;
			done();
		});
		videoObject.load(file);
	});

	it('should be ready', function(){
		expect(ready).to.be.true;
	});
});

},{"../src/utils/video-object.js":15}]},{},[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31])


},{"../src/utils/array-utils.js":2,"../src/utils/asset-loader.js":3,"../src/utils/console-patch.js":4,"../src/utils/css-utils.js":5,"../src/utils/device.js":6,"../src/utils/event-utils.js":7,"../src/utils/linked-list.js":8,"../src/utils/math-utils.js":9,"../src/utils/object-pool.js":10,"../src/utils/ready.js":11,"../src/utils/resize.js":12,"../src/utils/storage-utils.js":13,"../src/utils/string-utils.js":14,"../src/utils/video-object.js":15,"signals":1}],20:[function(require,module,exports){
'use strict';

require('../src/utils/console-patch.js');

describe('console patch', function() {

	it('should be function', function() {
		expect(window.console).to.exist;
		expect(window.console.table).to.exist;
	});

});
},{"../src/utils/console-patch.js":4}],21:[function(require,module,exports){
'use strict';

var CssUtils = require('../src/utils/css-utils.js');

describe('css utils', function() {
	var el = document.createElement('div');
	
	it('should add class to element', function() {
		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('foo');

		CssUtils.addClass(el, 'bar');
		expect(el.className).to.eql('foo bar');

		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('bar foo');

		CssUtils.removeClass(el, 'foo');
		expect(el.className).to.eql('bar');
	});

	it('should remove class from', function() {
				CssUtils.removeClass(el, 'foo');
				expect(el.className).to.eql('bar');
	});

	it('should return true', function() {
				expect(CssUtils.hasClass(el, 'bar')).to.be.true;
	});

	it('should return false', function() {
				expect(CssUtils.hasClass(el, 'foo')).to.be.false;
	});
});

},{"../src/utils/css-utils.js":5}],22:[function(require,module,exports){
'use strict';

var device = require('../src/utils/device.js');

describe('device', function() {
	
	it('should pass', function() {
		expect(device.mobile).to.be.false;
		expect(device.ipad).to.be.false;
		expect(device.iphone).to.be.false;
		expect(device.ipod).to.be.false;
		expect(device.ios).to.be.false;
		expect(device.ios5).to.be.false;
		expect(device.android).to.be.false;
		expect(device.androidOld).to.be.false;
		expect(device.androidStock).to.be.false;
		expect(device.ieVersion).to.eql(-1);
		expect(device.ie9down).to.be.false;
		expect(device.ie8down).to.be.false;
		expect(device.screenWidth).to.eql(window.screen.width);
		expect(device.screenHeight).to.eql(window.screen.height);
		expect(device.dpr).to.eql(1);
		expect(device.ie8down).to.be.false;
	});

});

},{"../src/utils/device.js":6}],23:[function(require,module,exports){
'use strict';

var EventUtils = require('../src/utils/event-utils.js');

describe('event utils', function() {
	var el = document.createElement('div'),
		complete = false;

	function simulateClick(el) {
		var e = document.createEvent('MouseEvents');
		e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		var cancelled = el.dispatchEvent(e);
		return cancelled;
	}

	EventUtils.addEvent(el, 'click', function() {
		complete = true;
	});

	simulateClick(el);
	
	it('should have recived click event', function() {
		expect(complete).to.be.true;
	});
});

},{"../src/utils/event-utils.js":7}],24:[function(require,module,exports){
'use strict';

var LinkedList = require('../src/utils/linked-list.js');

describe('linked list', function() {
	var linkedList = new LinkedList();
	var items = [];

	for (var i = 0; i < 10; i++) {
		items.push(linkedList.add({
			'index': i,
			'next': null,
			'prev': null
		}));
	}
	
	it('should have 10 items', function() {
		expect(linkedList.getCount()).to.eql(10);
	});

	it('should have first', function() {
		expect(linkedList.getFirst()).to.exist;
	});

	it('should have last', function() {
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to iterate', function() {
		var item = linkedList.getFirst();
		while(item.next) {
			expect(item).to.exist;
			expect(item).to.have.property('index');
			item = item.next;
		}
		expect(item).to.eql(linkedList.getLast());
	});

	it('should be able to remove item', function() {
		linkedList.remove(linkedList.getFirst());
		expect(linkedList.getCount()).to.eql(9);
		expect(linkedList.getFirst()).to.exist;

		linkedList.remove(linkedList.getLast());
		expect(linkedList.getCount()).to.eql(8);
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to insert', function() {
		var item = {
			'index': 100,
			'next': null,
			'prev': null
		};
		linkedList.insertBefore(item, linkedList.getFirst());

		expect(linkedList.getCount()).to.eql(9);
		expect(item).to.eql(linkedList.getFirst());
	});
});

},{"../src/utils/linked-list.js":8}],25:[function(require,module,exports){
'use strict';

var MathUtils = require('../src/utils/math-utils.js');

describe('math utils', function() {
	
	it('should pass', function() {
		expect(MathUtils.map(0.75, 0, 1, -100, 100)).to.eql(50);
		expect(MathUtils.lerp(0, 1, 0.5)).to.eql(0.5);
		expect(MathUtils.clamp(100, 0, 50)).to.eql(50);
		expect(MathUtils.random(0, 100)).to.be.within(0,100);
		expect(MathUtils.difference(-20, 20)).to.eql(40);
		expect(MathUtils.distance(0, 0, 1, 1)).to.eql(Math.SQRT2);
		expect(MathUtils.coinToss()).to.be.a('boolean');
		expect(MathUtils.angle(0, 0, -1, 0)).to.eql(Math.PI);
		expect(MathUtils.degrees(Math.PI)).to.eql(180);
		expect(MathUtils.radians(180)).to.eql(Math.PI);
		expect(MathUtils.roundToNearest(96.5, 10)).to.eql(100);
		expect(MathUtils.getIntersectionArea(0, 0, 2, 2, 0, 1, 2, 2)).to.eql(2);
		expect(MathUtils.rotateTo(359, 1)).to.eql(361);
	});

});

},{"../src/utils/math-utils.js":9}],26:[function(require,module,exports){
'use strict';

var ObjectPool = require('../src/utils/object-pool.js');

describe('object pool', function() {
	var newlyCreated = 0;

	function TestOb() {
		newlyCreated ++;
		var id = Math.random();
		return {
			getId: function() {
				return id;
			}
		};
	}

	it('should pass', function(){
		var p = new ObjectPool(TestOb);
		var t = p.get();

		expect(t).to.exist;
		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);

		p.dispose(t);

		expect(p.getPool().length).to.eql(1);
		
		t = p.get();

		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);
		expect(newlyCreated).to.eql(1);

		p.fill(10);
		expect(p.getPool().length).to.eql(10);
		expect(newlyCreated).to.eql(11);

		for(var i = 0; i < 5; i++) {
			t = p.get();
			expect(t.getId()).to.be.a('number');
		}
		expect(p.getPool().length).to.eql(5);
		expect(newlyCreated).to.eql(11);
	});
});

},{"../src/utils/object-pool.js":10}],27:[function(require,module,exports){
'use strict';

var ready = require('../src/utils/ready.js');

describe('ready', function() {
	var isReady = false;
	
	beforeEach(function(done) {
		ready(function() {
			isReady = true;
			done();
		});
	});

	it('should be ready', function(){
		expect(isReady).to.be.true;
	});
});

},{"../src/utils/ready.js":11}],28:[function(require,module,exports){
'use strict';

var resize = require('../src/utils/resize.js');

describe('resize', function() {
	var rect = {
		x: 0,
		y: 0,
		width: 640,
		height: 360
	};

	it('should pass', function(){
		resize(rect, 1920, 720, true, 'fit');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});

		resize(rect, 1920, 720, true, 'fill');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitWidth');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitHeight');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});
	});
});

},{"../src/utils/resize.js":12}],29:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	StorageUtils = require('../src/utils/storage-utils.js');

describe('storage utils', function() {
	var key = 'testData',
		testData = {
			id: 'foo',
			name: 'bar',
			x: 0
		};

	it('should store object and return true', function(){
		var saved = StorageUtils.saveJSON(key, testData);
		expect(saved).to.be.true;
	});

	it('should retrieve stored object', function(){
		var loaded = StorageUtils.loadJSON(key);
		expect(loaded).to.exist;
		expect(loaded.id).to.eql('foo');
		expect(loaded.name).to.eql('bar');
		expect(loaded.x).to.eql(0);
	});

	var loader = new AssetLoader.Loader('http://placekitten.com/g/200/300', 'jpg');
	loader.crossOrigin = true;
	beforeEach(function(done) {
		loader.onComplete.add(function() {
			loader.onComplete.removeAll();
			done();
		});
		loader.start();
	});

	it('should get image data', function(){
		var dataURL = StorageUtils.getImageDataURL(loader.data);
		expect(dataURL.indexOf('data:image/')).to.eql(0);
	});
});

},{"../src/utils/asset-loader.js":3,"../src/utils/storage-utils.js":13}],30:[function(require,module,exports){
'use strict';

var StringUtils = require('../src/utils/string-utils.js');

describe('string utils', function() {

	var str = 'Hello World';

	it('should query', function() {
		expect(StringUtils.contains(str, 'World')).to.be.true;
		expect(StringUtils.countOf(str, 'l')).to.eql(3);
		expect(StringUtils.endsWith(str, 'ld')).to.be.true;
		expect(StringUtils.hasText(str)).to.be.true;
		expect(StringUtils.isEmpty(str)).to.be.false;
		expect(StringUtils.isNumeric(str)).to.be.false;
		expect(StringUtils.isNumeric('68769123214')).to.be.true;
		expect(StringUtils.wordCount(str)).to.eql(2);
		expect(StringUtils.editDistance(str, str)).to.eql(0);
		expect(StringUtils.editDistance(str, str + 'a')).to.eql(1);
		expect(StringUtils.similarity(str, str)).to.eql(1);
	});

	it('should find substr', function() {
		expect(StringUtils.afterFirst(str, 'l')).to.eql('lo World');
		expect(StringUtils.afterLast(str, 'l')).to.eql('d');
		expect(StringUtils.beginsWith(str, 'H')).to.be.true;
		expect(StringUtils.beforeFirst(str, 'l')).to.eql('He');
		expect(StringUtils.beforeLast(str, 'l')).to.eql('Hello Wor');
		expect(StringUtils.between(str, 'H', 'W')).to.eql('ello ');
	});

	it('should format', function() {
		expect(StringUtils.trim('  '+str+'  ')).to.eql('Hello World');
		expect(StringUtils.trimLeft('  '+str+'  ')).to.eql('Hello World  ');
		expect(StringUtils.trimRight('  '+str+'  ')).to.eql('  Hello World');
		expect(StringUtils.padLeft(str, '_', 12)).to.eql('_Hello World');
		expect(StringUtils.padRight(str, '_', 12)).to.eql('Hello World_');
		expect(StringUtils.removeExtraWhitespace('Hello     World')).to.eql('Hello World');
		expect(StringUtils.remove(str, 'll')).to.eql('Heo World');
		// TODO: this sometime acts unexpectedly with shorter strings
		expect(StringUtils.truncate(str, 10)).to.eql('Hello...');
		//expect(StringUtils.truncate(str, 4)).to.eql('Hello...');
		expect(StringUtils.capitalize(str.toLowerCase())).to.eql('Hello world');
		expect(StringUtils.properCase(str.toLowerCase())).to.eql('Hello World');
		expect(StringUtils.reverse(str)).to.eql('dlroW olleH');
		expect(StringUtils.reverseWords(str)).to.eql('World Hello');
		expect(StringUtils.stripTags('<p>'+str+'</p>')).to.eql('Hello World');
		expect(StringUtils.swapCase(str)).to.eql('hello World');
		//expect(StringUtils.block(str)).to.eql('Hello World');
		expect(StringUtils.escapePattern(str + '.')).to.eql('Hello World\\.');
	});
});

},{"../src/utils/string-utils.js":14}],31:[function(require,module,exports){
'use strict';

describe('A test suite', function() {
	beforeEach(function() {
	});
	afterEach(function() {
	});

	it('should fail', function() {
		expect(true).to.be.true;
	});
});

},{}],32:[function(require,module,exports){
'use strict';

var VideoObject = require('../src/utils/video-object.js');

describe('video object', function() {
	var videoObject = new VideoObject(),
		el = document.createElement('video'),
		ext = (el.canPlayType('video/mp4;') ? 'mp4' : 'ogv'),
		file = ('http://techslides.com/demos/sample-videos/small.' + ext),
		ready = false;

	beforeEach(function(done) {
		videoObject.onReady.add(function() {
			ready = true;
			done();
		});
		videoObject.load(file);
	});

	it('should be ready', function(){
		expect(ready).to.be.true;
	});
});

},{"../src/utils/video-object.js":15}]},{},[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])


},{"../src/utils/array-utils.js":2,"../src/utils/asset-loader.js":3,"../src/utils/console-patch.js":4,"../src/utils/css-utils.js":5,"../src/utils/device.js":6,"../src/utils/event-utils.js":7,"../src/utils/linked-list.js":8,"../src/utils/math-utils.js":9,"../src/utils/object-pool.js":10,"../src/utils/ready.js":11,"../src/utils/resize.js":12,"../src/utils/storage-utils.js":13,"../src/utils/string-utils.js":14,"../src/utils/video-object.js":15,"signals":1}],20:[function(require,module,exports){
'use strict';

require('../src/utils/console-patch.js');

describe('console patch', function() {

	it('should be function', function() {
		expect(window.console).to.exist;
		expect(window.console.table).to.exist;
	});

});
},{"../src/utils/console-patch.js":4}],21:[function(require,module,exports){
'use strict';

var CssUtils = require('../src/utils/css-utils.js');

describe('css utils', function() {
	var el = document.createElement('div');
	
	it('should add class to element', function() {
		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('foo');

		CssUtils.addClass(el, 'bar');
		expect(el.className).to.eql('foo bar');

		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('bar foo');

		CssUtils.removeClass(el, 'foo');
		expect(el.className).to.eql('bar');
	});

	it('should remove class from', function() {
				CssUtils.removeClass(el, 'foo');
				expect(el.className).to.eql('bar');
	});

	it('should return true', function() {
				expect(CssUtils.hasClass(el, 'bar')).to.be.true;
	});

	it('should return false', function() {
				expect(CssUtils.hasClass(el, 'foo')).to.be.false;
	});
});

},{"../src/utils/css-utils.js":5}],22:[function(require,module,exports){
'use strict';

var device = require('../src/utils/device.js');

describe('device', function() {
	
	it('should pass', function() {
		expect(device.mobile).to.be.false;
		expect(device.ipad).to.be.false;
		expect(device.iphone).to.be.false;
		expect(device.ipod).to.be.false;
		expect(device.ios).to.be.false;
		expect(device.ios5).to.be.false;
		expect(device.android).to.be.false;
		expect(device.androidOld).to.be.false;
		expect(device.androidStock).to.be.false;
		expect(device.ieVersion).to.eql(-1);
		expect(device.ie9down).to.be.false;
		expect(device.ie8down).to.be.false;
		expect(device.screenWidth).to.eql(window.screen.width);
		expect(device.screenHeight).to.eql(window.screen.height);
		expect(device.dpr).to.eql(1);
		expect(device.ie8down).to.be.false;
	});

});

},{"../src/utils/device.js":6}],23:[function(require,module,exports){
'use strict';

var EventUtils = require('../src/utils/event-utils.js');

describe('event utils', function() {
	var el = document.createElement('div'),
		complete = false;

	function simulateClick(el) {
		var e = document.createEvent('MouseEvents');
		e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		var cancelled = el.dispatchEvent(e);
		return cancelled;
	}

	EventUtils.addEvent(el, 'click', function() {
		complete = true;
	});

	simulateClick(el);
	
	it('should have recived click event', function() {
		expect(complete).to.be.true;
	});
});

},{"../src/utils/event-utils.js":7}],24:[function(require,module,exports){
'use strict';

var LinkedList = require('../src/utils/linked-list.js');

describe('linked list', function() {
	var linkedList = new LinkedList();
	var items = [];

	for (var i = 0; i < 10; i++) {
		items.push(linkedList.add({
			'index': i,
			'next': null,
			'prev': null
		}));
	}
	
	it('should have 10 items', function() {
		expect(linkedList.getCount()).to.eql(10);
	});

	it('should have first', function() {
		expect(linkedList.getFirst()).to.exist;
	});

	it('should have last', function() {
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to iterate', function() {
		var item = linkedList.getFirst();
		while(item.next) {
			expect(item).to.exist;
			expect(item).to.have.property('index');
			item = item.next;
		}
		expect(item).to.eql(linkedList.getLast());
	});

	it('should be able to remove item', function() {
		linkedList.remove(linkedList.getFirst());
		expect(linkedList.getCount()).to.eql(9);
		expect(linkedList.getFirst()).to.exist;

		linkedList.remove(linkedList.getLast());
		expect(linkedList.getCount()).to.eql(8);
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to insert', function() {
		var item = {
			'index': 100,
			'next': null,
			'prev': null
		};
		linkedList.insertBefore(item, linkedList.getFirst());

		expect(linkedList.getCount()).to.eql(9);
		expect(item).to.eql(linkedList.getFirst());
	});
});

},{"../src/utils/linked-list.js":8}],25:[function(require,module,exports){
'use strict';

var MathUtils = require('../src/utils/math-utils.js');

describe('math utils', function() {
	
	it('should pass', function() {
		expect(MathUtils.map(0.75, 0, 1, -100, 100)).to.eql(50);
		expect(MathUtils.lerp(0, 1, 0.5)).to.eql(0.5);
		expect(MathUtils.clamp(100, 0, 50)).to.eql(50);
		expect(MathUtils.random(0, 100)).to.be.within(0,100);
		expect(MathUtils.difference(-20, 20)).to.eql(40);
		expect(MathUtils.distance(0, 0, 1, 1)).to.eql(Math.SQRT2);
		expect(MathUtils.coinToss()).to.be.a('boolean');
		expect(MathUtils.angle(0, 0, -1, 0)).to.eql(Math.PI);
		expect(MathUtils.degrees(Math.PI)).to.eql(180);
		expect(MathUtils.radians(180)).to.eql(Math.PI);
		expect(MathUtils.roundToNearest(96.5, 10)).to.eql(100);
		expect(MathUtils.getIntersectionArea(0, 0, 2, 2, 0, 1, 2, 2)).to.eql(2);
		expect(MathUtils.rotateTo(359, 1)).to.eql(361);
	});

});

},{"../src/utils/math-utils.js":9}],26:[function(require,module,exports){
'use strict';

var ObjectPool = require('../src/utils/object-pool.js');

describe('object pool', function() {
	var newlyCreated = 0;

	function TestOb() {
		newlyCreated ++;
		var id = Math.random();
		return {
			getId: function() {
				return id;
			}
		};
	}

	it('should pass', function(){
		var p = new ObjectPool(TestOb);
		var t = p.get();

		expect(t).to.exist;
		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);

		p.dispose(t);

		expect(p.getPool().length).to.eql(1);
		
		t = p.get();

		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);
		expect(newlyCreated).to.eql(1);

		p.fill(10);
		expect(p.getPool().length).to.eql(10);
		expect(newlyCreated).to.eql(11);

		for(var i = 0; i < 5; i++) {
			t = p.get();
			expect(t.getId()).to.be.a('number');
		}
		expect(p.getPool().length).to.eql(5);
		expect(newlyCreated).to.eql(11);
	});
});

},{"../src/utils/object-pool.js":10}],27:[function(require,module,exports){
'use strict';

var ready = require('../src/utils/ready.js');

describe('ready', function() {
	var isReady = false;
	
	beforeEach(function(done) {
		ready(function() {
			isReady = true;
			done();
		});
	});

	it('should be ready', function(){
		expect(isReady).to.be.true;
	});
});

},{"../src/utils/ready.js":11}],28:[function(require,module,exports){
'use strict';

var resize = require('../src/utils/resize.js');

describe('resize', function() {
	var rect = {
		x: 0,
		y: 0,
		width: 640,
		height: 360
	};

	it('should pass', function(){
		resize(rect, 1920, 720, true, 'fit');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});

		resize(rect, 1920, 720, true, 'fill');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitWidth');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitHeight');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});
	});
});

},{"../src/utils/resize.js":12}],29:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	StorageUtils = require('../src/utils/storage-utils.js');

describe('storage utils', function() {
	var key = 'testData',
		testData = {
			id: 'foo',
			name: 'bar',
			x: 0
		};

	it('should store object and return true', function(){
		var saved = StorageUtils.saveJSON(key, testData);
		expect(saved).to.be.true;
	});

	it('should retrieve stored object', function(){
		var loaded = StorageUtils.loadJSON(key);
		expect(loaded).to.exist;
		expect(loaded.id).to.eql('foo');
		expect(loaded.name).to.eql('bar');
		expect(loaded.x).to.eql(0);
	});

	var loader = new AssetLoader.Loader('http://placekitten.com/g/200/300', 'jpg');
	loader.crossOrigin = true;
	beforeEach(function(done) {
		loader.onComplete.add(function() {
			loader.onComplete.removeAll();
			done();
		});
		loader.start();
	});

	it('should get image data', function(){
		var dataURL = StorageUtils.getImageDataURL(loader.data);
		expect(dataURL.indexOf('data:image/')).to.eql(0);
	});
});

},{"../src/utils/asset-loader.js":3,"../src/utils/storage-utils.js":13}],30:[function(require,module,exports){
'use strict';

var StringUtils = require('../src/utils/string-utils.js');

describe('string utils', function() {

	var str = 'Hello World';

	it('should query', function() {
		expect(StringUtils.contains(str, 'World')).to.be.true;
		expect(StringUtils.countOf(str, 'l')).to.eql(3);
		expect(StringUtils.endsWith(str, 'ld')).to.be.true;
		expect(StringUtils.hasText(str)).to.be.true;
		expect(StringUtils.isEmpty(str)).to.be.false;
		expect(StringUtils.isNumeric(str)).to.be.false;
		expect(StringUtils.isNumeric('68769123214')).to.be.true;
		expect(StringUtils.wordCount(str)).to.eql(2);
		expect(StringUtils.editDistance(str, str)).to.eql(0);
		expect(StringUtils.editDistance(str, str + 'a')).to.eql(1);
		expect(StringUtils.similarity(str, str)).to.eql(1);
	});

	it('should find substr', function() {
		expect(StringUtils.afterFirst(str, 'l')).to.eql('lo World');
		expect(StringUtils.afterLast(str, 'l')).to.eql('d');
		expect(StringUtils.beginsWith(str, 'H')).to.be.true;
		expect(StringUtils.beforeFirst(str, 'l')).to.eql('He');
		expect(StringUtils.beforeLast(str, 'l')).to.eql('Hello Wor');
		expect(StringUtils.between(str, 'H', 'W')).to.eql('ello ');
	});

	it('should format', function() {
		expect(StringUtils.trim('  '+str+'  ')).to.eql('Hello World');
		expect(StringUtils.trimLeft('  '+str+'  ')).to.eql('Hello World  ');
		expect(StringUtils.trimRight('  '+str+'  ')).to.eql('  Hello World');
		expect(StringUtils.padLeft(str, '_', 12)).to.eql('_Hello World');
		expect(StringUtils.padRight(str, '_', 12)).to.eql('Hello World_');
		expect(StringUtils.removeExtraWhitespace('Hello     World')).to.eql('Hello World');
		expect(StringUtils.remove(str, 'll')).to.eql('Heo World');
		// TODO: this sometime acts unexpectedly with shorter strings
		expect(StringUtils.truncate(str, 10)).to.eql('Hello...');
		//expect(StringUtils.truncate(str, 4)).to.eql('Hello...');
		expect(StringUtils.capitalize(str.toLowerCase())).to.eql('Hello world');
		expect(StringUtils.properCase(str.toLowerCase())).to.eql('Hello World');
		expect(StringUtils.reverse(str)).to.eql('dlroW olleH');
		expect(StringUtils.reverseWords(str)).to.eql('World Hello');
		expect(StringUtils.stripTags('<p>'+str+'</p>')).to.eql('Hello World');
		expect(StringUtils.swapCase(str)).to.eql('hello World');
		//expect(StringUtils.block(str)).to.eql('Hello World');
		expect(StringUtils.escapePattern(str + '.')).to.eql('Hello World\\.');
	});
});

},{"../src/utils/string-utils.js":14}],31:[function(require,module,exports){
'use strict';

describe('A test suite', function() {
	beforeEach(function() {
	});
	afterEach(function() {
	});

	it('should fail', function() {
		expect(true).to.be.true;
	});
});

},{}],32:[function(require,module,exports){
'use strict';

var VideoObject = require('../src/utils/video-object.js');

describe('video object', function() {
	var videoObject = new VideoObject(),
		el = document.createElement('video'),
		ext = (el.canPlayType('video/mp4;') ? 'mp4' : 'ogv'),
		file = ('http://techslides.com/demos/sample-videos/small.' + ext),
		ready = false;

	beforeEach(function(done) {
		videoObject.onReady.add(function() {
			ready = true;
			done();
		});
		videoObject.load(file);
	});

	it('should be ready', function(){
		expect(ready).to.be.true;
	});
});

},{"../src/utils/video-object.js":15}]},{},[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])


},{"../src/utils/array-utils.js":2,"../src/utils/asset-loader.js":3,"../src/utils/console-patch.js":4,"../src/utils/css-utils.js":5,"../src/utils/device.js":6,"../src/utils/event-utils.js":7,"../src/utils/linked-list.js":8,"../src/utils/math-utils.js":9,"../src/utils/object-pool.js":10,"../src/utils/ready.js":11,"../src/utils/resize.js":12,"../src/utils/storage-utils.js":13,"../src/utils/string-utils.js":14,"../src/utils/video-object.js":15,"signals":1}],20:[function(require,module,exports){
'use strict';

require('../src/utils/console-patch.js');

describe('console patch', function() {

	it('should be function', function() {
		expect(window.console).to.exist;
		expect(window.console.table).to.exist;
	});

});
},{"../src/utils/console-patch.js":4}],21:[function(require,module,exports){
'use strict';

var CssUtils = require('../src/utils/css-utils.js');

describe('css utils', function() {
	var el = document.createElement('div');
	
	it('should add class to element', function() {
		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('foo');

		CssUtils.addClass(el, 'bar');
		expect(el.className).to.eql('foo bar');

		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('bar foo');

		CssUtils.removeClass(el, 'foo');
		expect(el.className).to.eql('bar');
	});

	it('should remove class from', function() {
				CssUtils.removeClass(el, 'foo');
				expect(el.className).to.eql('bar');
	});

	it('should return true', function() {
				expect(CssUtils.hasClass(el, 'bar')).to.be.true;
	});

	it('should return false', function() {
				expect(CssUtils.hasClass(el, 'foo')).to.be.false;
	});
});

},{"../src/utils/css-utils.js":5}],22:[function(require,module,exports){
'use strict';

var device = require('../src/utils/device.js');

describe('device', function() {
	
	it('should pass', function() {
		expect(device.mobile).to.be.false;
		expect(device.ipad).to.be.false;
		expect(device.iphone).to.be.false;
		expect(device.ipod).to.be.false;
		expect(device.ios).to.be.false;
		expect(device.ios5).to.be.false;
		expect(device.android).to.be.false;
		expect(device.androidOld).to.be.false;
		expect(device.androidStock).to.be.false;
		expect(device.ieVersion).to.eql(-1);
		expect(device.ie9down).to.be.false;
		expect(device.ie8down).to.be.false;
		expect(device.screenWidth).to.eql(window.screen.width);
		expect(device.screenHeight).to.eql(window.screen.height);
		expect(device.dpr).to.eql(1);
		expect(device.ie8down).to.be.false;
	});

});

},{"../src/utils/device.js":6}],23:[function(require,module,exports){
'use strict';

var EventUtils = require('../src/utils/event-utils.js');

describe('event utils', function() {
	var el = document.createElement('div'),
		complete = false;

	function simulateClick(el) {
		var e = document.createEvent('MouseEvents');
		e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		var cancelled = el.dispatchEvent(e);
		return cancelled;
	}

	EventUtils.addEvent(el, 'click', function() {
		complete = true;
	});

	simulateClick(el);
	
	it('should have recived click event', function() {
		expect(complete).to.be.true;
	});
});

},{"../src/utils/event-utils.js":7}],24:[function(require,module,exports){
'use strict';

var LinkedList = require('../src/utils/linked-list.js');

describe('linked list', function() {
	var linkedList = new LinkedList();
	var items = [];

	for (var i = 0; i < 10; i++) {
		items.push(linkedList.add({
			'index': i,
			'next': null,
			'prev': null
		}));
	}
	
	it('should have 10 items', function() {
		expect(linkedList.getCount()).to.eql(10);
	});

	it('should have first', function() {
		expect(linkedList.getFirst()).to.exist;
	});

	it('should have last', function() {
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to iterate', function() {
		var item = linkedList.getFirst();
		while(item.next) {
			expect(item).to.exist;
			expect(item).to.have.property('index');
			item = item.next;
		}
		expect(item).to.eql(linkedList.getLast());
	});

	it('should be able to remove item', function() {
		linkedList.remove(linkedList.getFirst());
		expect(linkedList.getCount()).to.eql(9);
		expect(linkedList.getFirst()).to.exist;

		linkedList.remove(linkedList.getLast());
		expect(linkedList.getCount()).to.eql(8);
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to insert', function() {
		var item = {
			'index': 100,
			'next': null,
			'prev': null
		};
		linkedList.insertBefore(item, linkedList.getFirst());

		expect(linkedList.getCount()).to.eql(9);
		expect(item).to.eql(linkedList.getFirst());
	});
});

},{"../src/utils/linked-list.js":8}],25:[function(require,module,exports){
'use strict';

var MathUtils = require('../src/utils/math-utils.js');

describe('math utils', function() {
	
	it('should pass', function() {
		expect(MathUtils.map(0.75, 0, 1, -100, 100)).to.eql(50);
		expect(MathUtils.lerp(0, 1, 0.5)).to.eql(0.5);
		expect(MathUtils.clamp(100, 0, 50)).to.eql(50);
		expect(MathUtils.random(0, 100)).to.be.within(0,100);
		expect(MathUtils.difference(-20, 20)).to.eql(40);
		expect(MathUtils.distance(0, 0, 1, 1)).to.eql(Math.SQRT2);
		expect(MathUtils.coinToss()).to.be.a('boolean');
		expect(MathUtils.angle(0, 0, -1, 0)).to.eql(Math.PI);
		expect(MathUtils.degrees(Math.PI)).to.eql(180);
		expect(MathUtils.radians(180)).to.eql(Math.PI);
		expect(MathUtils.roundToNearest(96.5, 10)).to.eql(100);
		expect(MathUtils.getIntersectionArea(0, 0, 2, 2, 0, 1, 2, 2)).to.eql(2);
		expect(MathUtils.rotateTo(359, 1)).to.eql(361);
	});

});

},{"../src/utils/math-utils.js":9}],26:[function(require,module,exports){
'use strict';

var ObjectPool = require('../src/utils/object-pool.js');

describe('object pool', function() {
	var newlyCreated = 0;

	function TestOb() {
		newlyCreated ++;
		var id = Math.random();
		return {
			getId: function() {
				return id;
			}
		};
	}

	it('should pass', function(){
		var p = new ObjectPool(TestOb);
		var t = p.get();

		expect(t).to.exist;
		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);

		p.dispose(t);

		expect(p.getPool().length).to.eql(1);
		
		t = p.get();

		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);
		expect(newlyCreated).to.eql(1);

		p.fill(10);
		expect(p.getPool().length).to.eql(10);
		expect(newlyCreated).to.eql(11);

		for(var i = 0; i < 5; i++) {
			t = p.get();
			expect(t.getId()).to.be.a('number');
		}
		expect(p.getPool().length).to.eql(5);
		expect(newlyCreated).to.eql(11);
	});
});

},{"../src/utils/object-pool.js":10}],27:[function(require,module,exports){
'use strict';

var ready = require('../src/utils/ready.js');

describe('ready', function() {
	var isReady = false;
	
	beforeEach(function(done) {
		ready(function() {
			isReady = true;
			done();
		});
	});

	it('should be ready', function(){
		expect(isReady).to.be.true;
	});
});

},{"../src/utils/ready.js":11}],28:[function(require,module,exports){
'use strict';

var resize = require('../src/utils/resize.js');

describe('resize', function() {
	var rect = {
		x: 0,
		y: 0,
		width: 640,
		height: 360
	};

	it('should pass', function(){
		resize(rect, 1920, 720, true, 'fit');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});

		resize(rect, 1920, 720, true, 'fill');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitWidth');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitHeight');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});
	});
});

},{"../src/utils/resize.js":12}],29:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	StorageUtils = require('../src/utils/storage-utils.js');

describe('storage utils', function() {
	var key = 'testData',
		testData = {
			id: 'foo',
			name: 'bar',
			x: 0
		};

	it('should store object and return true', function(){
		var saved = StorageUtils.saveJSON(key, testData);
		expect(saved).to.be.true;
	});

	it('should retrieve stored object', function(){
		var loaded = StorageUtils.loadJSON(key);
		expect(loaded).to.exist;
		expect(loaded.id).to.eql('foo');
		expect(loaded.name).to.eql('bar');
		expect(loaded.x).to.eql(0);
	});

	var loader = new AssetLoader.Loader('http://placekitten.com/g/200/300', 'jpg');
	loader.crossOrigin = true;
	beforeEach(function(done) {
		loader.onComplete.add(function() {
			loader.onComplete.removeAll();
			done();
		});
		loader.start();
	});

	it('should get image data', function(){
		var dataURL = StorageUtils.getImageDataURL(loader.data);
		expect(dataURL.indexOf('data:image/')).to.eql(0);
	});
});

},{"../src/utils/asset-loader.js":3,"../src/utils/storage-utils.js":13}],30:[function(require,module,exports){
'use strict';

var StringUtils = require('../src/utils/string-utils.js');

describe('string utils', function() {

	var str = 'Hello World';

	it('should query', function() {
		expect(StringUtils.contains(str, 'World')).to.be.true;
		expect(StringUtils.countOf(str, 'l')).to.eql(3);
		expect(StringUtils.endsWith(str, 'ld')).to.be.true;
		expect(StringUtils.hasText(str)).to.be.true;
		expect(StringUtils.isEmpty(str)).to.be.false;
		expect(StringUtils.isNumeric(str)).to.be.false;
		expect(StringUtils.isNumeric('68769123214')).to.be.true;
		expect(StringUtils.wordCount(str)).to.eql(2);
		expect(StringUtils.editDistance(str, str)).to.eql(0);
		expect(StringUtils.editDistance(str, str + 'a')).to.eql(1);
		expect(StringUtils.similarity(str, str)).to.eql(1);
	});

	it('should find substr', function() {
		expect(StringUtils.afterFirst(str, 'l')).to.eql('lo World');
		expect(StringUtils.afterLast(str, 'l')).to.eql('d');
		expect(StringUtils.beginsWith(str, 'H')).to.be.true;
		expect(StringUtils.beforeFirst(str, 'l')).to.eql('He');
		expect(StringUtils.beforeLast(str, 'l')).to.eql('Hello Wor');
		expect(StringUtils.between(str, 'H', 'W')).to.eql('ello ');
	});

	it('should format', function() {
		expect(StringUtils.trim('  '+str+'  ')).to.eql('Hello World');
		expect(StringUtils.trimLeft('  '+str+'  ')).to.eql('Hello World  ');
		expect(StringUtils.trimRight('  '+str+'  ')).to.eql('  Hello World');
		expect(StringUtils.padLeft(str, '_', 12)).to.eql('_Hello World');
		expect(StringUtils.padRight(str, '_', 12)).to.eql('Hello World_');
		expect(StringUtils.removeExtraWhitespace('Hello     World')).to.eql('Hello World');
		expect(StringUtils.remove(str, 'll')).to.eql('Heo World');
		// TODO: this sometime acts unexpectedly with shorter strings
		expect(StringUtils.truncate(str, 10)).to.eql('Hello...');
		//expect(StringUtils.truncate(str, 4)).to.eql('Hello...');
		expect(StringUtils.capitalize(str.toLowerCase())).to.eql('Hello world');
		expect(StringUtils.properCase(str.toLowerCase())).to.eql('Hello World');
		expect(StringUtils.reverse(str)).to.eql('dlroW olleH');
		expect(StringUtils.reverseWords(str)).to.eql('World Hello');
		expect(StringUtils.stripTags('<p>'+str+'</p>')).to.eql('Hello World');
		expect(StringUtils.swapCase(str)).to.eql('hello World');
		//expect(StringUtils.block(str)).to.eql('Hello World');
		expect(StringUtils.escapePattern(str + '.')).to.eql('Hello World\\.');
	});
});

},{"../src/utils/string-utils.js":14}],31:[function(require,module,exports){
'use strict';

describe('A test suite', function() {
	beforeEach(function() {
	});
	afterEach(function() {
	});

	it('should fail', function() {
		expect(true).to.be.true;
	});
});

},{}],32:[function(require,module,exports){
'use strict';

var VideoObject = require('../src/utils/video-object.js');

describe('video object', function() {
	var videoObject = new VideoObject(),
		el = document.createElement('video'),
		ext = (el.canPlayType('video/mp4;') ? 'mp4' : 'ogv'),
		file = ('http://techslides.com/demos/sample-videos/small.' + ext),
		ready = false;

	beforeEach(function(done) {
		videoObject.onReady.add(function() {
			ready = true;
			done();
		});
		videoObject.load(file);
	});

	it('should be ready', function(){
		expect(ready).to.be.true;
	});
});

},{"../src/utils/video-object.js":15}]},{},[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])


},{"../src/utils/array-utils.js":2,"../src/utils/asset-loader.js":3,"../src/utils/console-patch.js":4,"../src/utils/css-utils.js":5,"../src/utils/device.js":6,"../src/utils/event-utils.js":7,"../src/utils/linked-list.js":8,"../src/utils/math-utils.js":9,"../src/utils/object-pool.js":10,"../src/utils/ready.js":11,"../src/utils/resize.js":12,"../src/utils/storage-utils.js":13,"../src/utils/string-utils.js":14,"../src/utils/video-object.js":15,"signals":1}],20:[function(require,module,exports){
'use strict';

require('../src/utils/console-patch.js');

describe('console patch', function() {

	it('should be function', function() {
		expect(window.console).to.exist;
		expect(window.console.table).to.exist;
	});

});
},{"../src/utils/console-patch.js":4}],21:[function(require,module,exports){
'use strict';

var CssUtils = require('../src/utils/css-utils.js');

describe('css utils', function() {
	var el = document.createElement('div');
	
	it('should add class to element', function() {
		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('foo');

		CssUtils.addClass(el, 'bar');
		expect(el.className).to.eql('foo bar');

		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('bar foo');

		CssUtils.removeClass(el, 'foo');
		expect(el.className).to.eql('bar');
	});

	it('should remove class from', function() {
				CssUtils.removeClass(el, 'foo');
				expect(el.className).to.eql('bar');
	});

	it('should return true', function() {
				expect(CssUtils.hasClass(el, 'bar')).to.be.true;
	});

	it('should return false', function() {
				expect(CssUtils.hasClass(el, 'foo')).to.be.false;
	});
});

},{"../src/utils/css-utils.js":5}],22:[function(require,module,exports){
'use strict';

var device = require('../src/utils/device.js');

describe('device', function() {
	
	it('should pass', function() {
		expect(device.mobile).to.be.false;
		expect(device.ipad).to.be.false;
		expect(device.iphone).to.be.false;
		expect(device.ipod).to.be.false;
		expect(device.ios).to.be.false;
		expect(device.ios5).to.be.false;
		expect(device.android).to.be.false;
		expect(device.androidOld).to.be.false;
		expect(device.androidStock).to.be.false;
		expect(device.ieVersion).to.eql(-1);
		expect(device.ie9down).to.be.false;
		expect(device.ie8down).to.be.false;
		expect(device.screenWidth).to.eql(window.screen.width);
		expect(device.screenHeight).to.eql(window.screen.height);
		expect(device.dpr).to.eql(1);
		expect(device.ie8down).to.be.false;
	});

});

},{"../src/utils/device.js":6}],23:[function(require,module,exports){
'use strict';

var EventUtils = require('../src/utils/event-utils.js');

describe('event utils', function() {
	var el = document.createElement('div'),
		complete = false;

	function simulateClick(el) {
		var e = document.createEvent('MouseEvents');
		e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		var cancelled = el.dispatchEvent(e);
		return cancelled;
	}

	EventUtils.addEvent(el, 'click', function() {
		complete = true;
	});

	simulateClick(el);
	
	it('should have recived click event', function() {
		expect(complete).to.be.true;
	});
});

},{"../src/utils/event-utils.js":7}],24:[function(require,module,exports){
'use strict';

var LinkedList = require('../src/utils/linked-list.js');

describe('linked list', function() {
	var linkedList = new LinkedList();
	var items = [];

	for (var i = 0; i < 10; i++) {
		items.push(linkedList.add({
			'index': i,
			'next': null,
			'prev': null
		}));
	}
	
	it('should have 10 items', function() {
		expect(linkedList.getCount()).to.eql(10);
	});

	it('should have first', function() {
		expect(linkedList.getFirst()).to.exist;
	});

	it('should have last', function() {
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to iterate', function() {
		var item = linkedList.getFirst();
		while(item.next) {
			expect(item).to.exist;
			expect(item).to.have.property('index');
			item = item.next;
		}
		expect(item).to.eql(linkedList.getLast());
	});

	it('should be able to remove item', function() {
		linkedList.remove(linkedList.getFirst());
		expect(linkedList.getCount()).to.eql(9);
		expect(linkedList.getFirst()).to.exist;

		linkedList.remove(linkedList.getLast());
		expect(linkedList.getCount()).to.eql(8);
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to insert', function() {
		var item = {
			'index': 100,
			'next': null,
			'prev': null
		};
		linkedList.insertBefore(item, linkedList.getFirst());

		expect(linkedList.getCount()).to.eql(9);
		expect(item).to.eql(linkedList.getFirst());
	});
});

},{"../src/utils/linked-list.js":8}],25:[function(require,module,exports){
'use strict';

var MathUtils = require('../src/utils/math-utils.js');

describe('math utils', function() {
	
	it('should pass', function() {
		expect(MathUtils.map(0.75, 0, 1, -100, 100)).to.eql(50);
		expect(MathUtils.lerp(0, 1, 0.5)).to.eql(0.5);
		expect(MathUtils.clamp(100, 0, 50)).to.eql(50);
		expect(MathUtils.random(0, 100)).to.be.within(0,100);
		expect(MathUtils.difference(-20, 20)).to.eql(40);
		expect(MathUtils.distance(0, 0, 1, 1)).to.eql(Math.SQRT2);
		expect(MathUtils.coinToss()).to.be.a('boolean');
		expect(MathUtils.angle(0, 0, -1, 0)).to.eql(Math.PI);
		expect(MathUtils.degrees(Math.PI)).to.eql(180);
		expect(MathUtils.radians(180)).to.eql(Math.PI);
		expect(MathUtils.roundToNearest(96.5, 10)).to.eql(100);
		expect(MathUtils.getIntersectionArea(0, 0, 2, 2, 0, 1, 2, 2)).to.eql(2);
		expect(MathUtils.rotateTo(359, 1)).to.eql(361);
	});

});

},{"../src/utils/math-utils.js":9}],26:[function(require,module,exports){
'use strict';

var ObjectPool = require('../src/utils/object-pool.js');

describe('object pool', function() {
	var newlyCreated = 0;

	function TestOb() {
		newlyCreated ++;
		var id = Math.random();
		return {
			getId: function() {
				return id;
			}
		};
	}

	it('should pass', function(){
		var p = new ObjectPool(TestOb);
		var t = p.get();

		expect(t).to.exist;
		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);

		p.dispose(t);

		expect(p.getPool().length).to.eql(1);
		
		t = p.get();

		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);
		expect(newlyCreated).to.eql(1);

		p.fill(10);
		expect(p.getPool().length).to.eql(10);
		expect(newlyCreated).to.eql(11);

		for(var i = 0; i < 5; i++) {
			t = p.get();
			expect(t.getId()).to.be.a('number');
		}
		expect(p.getPool().length).to.eql(5);
		expect(newlyCreated).to.eql(11);
	});
});

},{"../src/utils/object-pool.js":10}],27:[function(require,module,exports){
'use strict';

var ready = require('../src/utils/ready.js');

describe('ready', function() {
	var isReady = false;
	
	beforeEach(function(done) {
		ready(function() {
			isReady = true;
			done();
		});
	});

	it('should be ready', function(){
		expect(isReady).to.be.true;
	});
});

},{"../src/utils/ready.js":11}],28:[function(require,module,exports){
'use strict';

var resize = require('../src/utils/resize.js');

describe('resize', function() {
	var rect = {
		x: 0,
		y: 0,
		width: 640,
		height: 360
	};

	it('should pass', function(){
		resize(rect, 1920, 720, true, 'fit');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});

		resize(rect, 1920, 720, true, 'fill');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitWidth');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitHeight');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});
	});
});

},{"../src/utils/resize.js":12}],29:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	StorageUtils = require('../src/utils/storage-utils.js');

describe('storage utils', function() {
	var key = 'testData',
		testData = {
			id: 'foo',
			name: 'bar',
			x: 0
		};

	it('should store object and return true', function(){
		var saved = StorageUtils.saveJSON(key, testData);
		expect(saved).to.be.true;
	});

	it('should retrieve stored object', function(){
		var loaded = StorageUtils.loadJSON(key);
		expect(loaded).to.exist;
		expect(loaded.id).to.eql('foo');
		expect(loaded.name).to.eql('bar');
		expect(loaded.x).to.eql(0);
	});

	var loader = new AssetLoader.Loader('http://placekitten.com/g/200/300', 'jpg');
	loader.crossOrigin = true;
	beforeEach(function(done) {
		loader.onComplete.add(function() {
			loader.onComplete.removeAll();
			done();
		});
		loader.start();
	});

	it('should get image data', function(){
		var dataURL = StorageUtils.getImageDataURL(loader.data);
		expect(dataURL.indexOf('data:image/')).to.eql(0);
	});
});

},{"../src/utils/asset-loader.js":3,"../src/utils/storage-utils.js":13}],30:[function(require,module,exports){
'use strict';

var StringUtils = require('../src/utils/string-utils.js');

describe('string utils', function() {

	var str = 'Hello World';

	it('should query', function() {
		expect(StringUtils.contains(str, 'World')).to.be.true;
		expect(StringUtils.countOf(str, 'l')).to.eql(3);
		expect(StringUtils.endsWith(str, 'ld')).to.be.true;
		expect(StringUtils.hasText(str)).to.be.true;
		expect(StringUtils.isEmpty(str)).to.be.false;
		expect(StringUtils.isNumeric(str)).to.be.false;
		expect(StringUtils.isNumeric('68769123214')).to.be.true;
		expect(StringUtils.wordCount(str)).to.eql(2);
		expect(StringUtils.editDistance(str, str)).to.eql(0);
		expect(StringUtils.editDistance(str, str + 'a')).to.eql(1);
		expect(StringUtils.similarity(str, str)).to.eql(1);
	});

	it('should find substr', function() {
		expect(StringUtils.afterFirst(str, 'l')).to.eql('lo World');
		expect(StringUtils.afterLast(str, 'l')).to.eql('d');
		expect(StringUtils.beginsWith(str, 'H')).to.be.true;
		expect(StringUtils.beforeFirst(str, 'l')).to.eql('He');
		expect(StringUtils.beforeLast(str, 'l')).to.eql('Hello Wor');
		expect(StringUtils.between(str, 'H', 'W')).to.eql('ello ');
	});

	it('should format', function() {
		expect(StringUtils.trim('  '+str+'  ')).to.eql('Hello World');
		expect(StringUtils.trimLeft('  '+str+'  ')).to.eql('Hello World  ');
		expect(StringUtils.trimRight('  '+str+'  ')).to.eql('  Hello World');
		expect(StringUtils.padLeft(str, '_', 12)).to.eql('_Hello World');
		expect(StringUtils.padRight(str, '_', 12)).to.eql('Hello World_');
		expect(StringUtils.removeExtraWhitespace('Hello     World')).to.eql('Hello World');
		expect(StringUtils.remove(str, 'll')).to.eql('Heo World');
		// TODO: this sometime acts unexpectedly with shorter strings
		expect(StringUtils.truncate(str, 10)).to.eql('Hello...');
		//expect(StringUtils.truncate(str, 4)).to.eql('Hello...');
		expect(StringUtils.capitalize(str.toLowerCase())).to.eql('Hello world');
		expect(StringUtils.properCase(str.toLowerCase())).to.eql('Hello World');
		expect(StringUtils.reverse(str)).to.eql('dlroW olleH');
		expect(StringUtils.reverseWords(str)).to.eql('World Hello');
		expect(StringUtils.stripTags('<p>'+str+'</p>')).to.eql('Hello World');
		expect(StringUtils.swapCase(str)).to.eql('hello World');
		//expect(StringUtils.block(str)).to.eql('Hello World');
		expect(StringUtils.escapePattern(str + '.')).to.eql('Hello World\\.');
	});
});

},{"../src/utils/string-utils.js":14}],31:[function(require,module,exports){
'use strict';

describe('A test suite', function() {
	beforeEach(function() {
	});
	afterEach(function() {
	});

	it('should fail', function() {
		expect(true).to.be.true;
	});
});

},{}],32:[function(require,module,exports){
'use strict';

var VideoObject = require('../src/utils/video-object.js');

describe('video object', function() {
	var videoObject = new VideoObject(),
		el = document.createElement('video'),
		ext = (el.canPlayType('video/mp4;') ? 'mp4' : 'ogv'),
		file = ('http://techslides.com/demos/sample-videos/small.' + ext),
		ready = false;

	beforeEach(function(done) {
		videoObject.onReady.add(function() {
			ready = true;
			done();
		});
		videoObject.load(file);
	});

	it('should be ready', function(){
		expect(ready).to.be.true;
	});
});

},{"../src/utils/video-object.js":15}]},{},[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])


},{"../src/utils/array-utils.js":2,"../src/utils/asset-loader.js":3,"../src/utils/console-patch.js":4,"../src/utils/css-utils.js":5,"../src/utils/device.js":6,"../src/utils/event-utils.js":7,"../src/utils/linked-list.js":8,"../src/utils/math-utils.js":9,"../src/utils/object-pool.js":10,"../src/utils/ready.js":11,"../src/utils/resize.js":12,"../src/utils/storage-utils.js":13,"../src/utils/string-utils.js":14,"../src/utils/video-object.js":15,"signals":1}],20:[function(require,module,exports){
'use strict';

require('../src/utils/console-patch.js');

describe('console patch', function() {

	it('should be function', function() {
		expect(window.console).to.exist;
		expect(window.console.table).to.exist;
	});

});
},{"../src/utils/console-patch.js":4}],21:[function(require,module,exports){
'use strict';

var CssUtils = require('../src/utils/css-utils.js');

describe('css utils', function() {
	var el = document.createElement('div');
	
	it('should add class to element', function() {
		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('foo');

		CssUtils.addClass(el, 'bar');
		expect(el.className).to.eql('foo bar');

		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('bar foo');

		CssUtils.removeClass(el, 'foo');
		expect(el.className).to.eql('bar');
	});

	it('should remove class from', function() {
				CssUtils.removeClass(el, 'foo');
				expect(el.className).to.eql('bar');
	});

	it('should return true', function() {
				expect(CssUtils.hasClass(el, 'bar')).to.be.true;
	});

	it('should return false', function() {
				expect(CssUtils.hasClass(el, 'foo')).to.be.false;
	});
});

},{"../src/utils/css-utils.js":5}],22:[function(require,module,exports){
'use strict';

var device = require('../src/utils/device.js');

describe('device', function() {
	
	it('should pass', function() {
		expect(device.mobile).to.be.false;
		expect(device.ipad).to.be.false;
		expect(device.iphone).to.be.false;
		expect(device.ipod).to.be.false;
		expect(device.ios).to.be.false;
		expect(device.ios5).to.be.false;
		expect(device.android).to.be.false;
		expect(device.androidOld).to.be.false;
		expect(device.androidStock).to.be.false;
		expect(device.ieVersion).to.eql(-1);
		expect(device.ie9down).to.be.false;
		expect(device.ie8down).to.be.false;
		expect(device.screenWidth).to.eql(window.screen.width);
		expect(device.screenHeight).to.eql(window.screen.height);
		expect(device.dpr).to.eql(1);
		expect(device.ie8down).to.be.false;
	});

});

},{"../src/utils/device.js":6}],23:[function(require,module,exports){
'use strict';

var EventUtils = require('../src/utils/event-utils.js');

describe('event utils', function() {
	var el = document.createElement('div'),
		complete = false;

	function simulateClick(el) {
		var e = document.createEvent('MouseEvents');
		e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		var cancelled = el.dispatchEvent(e);
		return cancelled;
	}

	EventUtils.addEvent(el, 'click', function() {
		complete = true;
	});

	simulateClick(el);
	
	it('should have recived click event', function() {
		expect(complete).to.be.true;
	});
});

},{"../src/utils/event-utils.js":7}],24:[function(require,module,exports){
'use strict';

var LinkedList = require('../src/utils/linked-list.js');

describe('linked list', function() {
	var linkedList = new LinkedList();
	var items = [];

	for (var i = 0; i < 10; i++) {
		items.push(linkedList.add({
			'index': i,
			'next': null,
			'prev': null
		}));
	}
	
	it('should have 10 items', function() {
		expect(linkedList.getCount()).to.eql(10);
	});

	it('should have first', function() {
		expect(linkedList.getFirst()).to.exist;
	});

	it('should have last', function() {
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to iterate', function() {
		var item = linkedList.getFirst();
		while(item.next) {
			expect(item).to.exist;
			expect(item).to.have.property('index');
			item = item.next;
		}
		expect(item).to.eql(linkedList.getLast());
	});

	it('should be able to remove item', function() {
		linkedList.remove(linkedList.getFirst());
		expect(linkedList.getCount()).to.eql(9);
		expect(linkedList.getFirst()).to.exist;

		linkedList.remove(linkedList.getLast());
		expect(linkedList.getCount()).to.eql(8);
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to insert', function() {
		var item = {
			'index': 100,
			'next': null,
			'prev': null
		};
		linkedList.insertBefore(item, linkedList.getFirst());

		expect(linkedList.getCount()).to.eql(9);
		expect(item).to.eql(linkedList.getFirst());
	});
});

},{"../src/utils/linked-list.js":8}],25:[function(require,module,exports){
'use strict';

var MathUtils = require('../src/utils/math-utils.js');

describe('math utils', function() {
	
	it('should pass', function() {
		expect(MathUtils.map(0.75, 0, 1, -100, 100)).to.eql(50);
		expect(MathUtils.lerp(0, 1, 0.5)).to.eql(0.5);
		expect(MathUtils.clamp(100, 0, 50)).to.eql(50);
		expect(MathUtils.random(0, 100)).to.be.within(0,100);
		expect(MathUtils.difference(-20, 20)).to.eql(40);
		expect(MathUtils.distance(0, 0, 1, 1)).to.eql(Math.SQRT2);
		expect(MathUtils.coinToss()).to.be.a('boolean');
		expect(MathUtils.angle(0, 0, -1, 0)).to.eql(Math.PI);
		expect(MathUtils.degrees(Math.PI)).to.eql(180);
		expect(MathUtils.radians(180)).to.eql(Math.PI);
		expect(MathUtils.roundToNearest(96.5, 10)).to.eql(100);
		expect(MathUtils.getIntersectionArea(0, 0, 2, 2, 0, 1, 2, 2)).to.eql(2);
		expect(MathUtils.rotateTo(359, 1)).to.eql(361);
	});

});

},{"../src/utils/math-utils.js":9}],26:[function(require,module,exports){
'use strict';

var ObjectPool = require('../src/utils/object-pool.js');

describe('object pool', function() {
	var newlyCreated = 0;

	function TestOb() {
		newlyCreated ++;
		var id = Math.random();
		return {
			getId: function() {
				return id;
			}
		};
	}

	it('should pass', function(){
		var p = new ObjectPool(TestOb);
		var t = p.get();

		expect(t).to.exist;
		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);

		p.dispose(t);

		expect(p.getPool().length).to.eql(1);
		
		t = p.get();

		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);
		expect(newlyCreated).to.eql(1);

		p.fill(10);
		expect(p.getPool().length).to.eql(10);
		expect(newlyCreated).to.eql(11);

		for(var i = 0; i < 5; i++) {
			t = p.get();
			expect(t.getId()).to.be.a('number');
		}
		expect(p.getPool().length).to.eql(5);
		expect(newlyCreated).to.eql(11);
	});
});

},{"../src/utils/object-pool.js":10}],27:[function(require,module,exports){
'use strict';

var ready = require('../src/utils/ready.js');

describe('ready', function() {
	var isReady = false;
	
	beforeEach(function(done) {
		ready(function() {
			isReady = true;
			done();
		});
	});

	it('should be ready', function(){
		expect(isReady).to.be.true;
	});
});

},{"../src/utils/ready.js":11}],28:[function(require,module,exports){
'use strict';

var resize = require('../src/utils/resize.js');

describe('resize', function() {
	var rect = {
		x: 0,
		y: 0,
		width: 640,
		height: 360
	};

	it('should pass', function(){
		resize(rect, 1920, 720, true, 'fit');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});

		resize(rect, 1920, 720, true, 'fill');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitWidth');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitHeight');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});
	});
});

},{"../src/utils/resize.js":12}],29:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	StorageUtils = require('../src/utils/storage-utils.js');

describe('storage utils', function() {
	var key = 'testData',
		testData = {
			id: 'foo',
			name: 'bar',
			x: 0
		};

	it('should store object and return true', function(){
		var saved = StorageUtils.saveJSON(key, testData);
		expect(saved).to.be.true;
	});

	it('should retrieve stored object', function(){
		var loaded = StorageUtils.loadJSON(key);
		expect(loaded).to.exist;
		expect(loaded.id).to.eql('foo');
		expect(loaded.name).to.eql('bar');
		expect(loaded.x).to.eql(0);
	});

	var loader = new AssetLoader.Loader('http://placekitten.com/g/200/300', 'jpg');
	loader.crossOrigin = true;
	beforeEach(function(done) {
		loader.onComplete.add(function() {
			loader.onComplete.removeAll();
			done();
		});
		loader.start();
	});

	it('should get image data', function(){
		var dataURL = StorageUtils.getImageDataURL(loader.data);
		expect(dataURL.indexOf('data:image/')).to.eql(0);
	});
});

},{"../src/utils/asset-loader.js":3,"../src/utils/storage-utils.js":13}],30:[function(require,module,exports){
'use strict';

var StringUtils = require('../src/utils/string-utils.js');

describe('string utils', function() {

	var str = 'Hello World';

	it('should query', function() {
		expect(StringUtils.contains(str, 'World')).to.be.true;
		expect(StringUtils.countOf(str, 'l')).to.eql(3);
		expect(StringUtils.endsWith(str, 'ld')).to.be.true;
		expect(StringUtils.hasText(str)).to.be.true;
		expect(StringUtils.isEmpty(str)).to.be.false;
		expect(StringUtils.isNumeric(str)).to.be.false;
		expect(StringUtils.isNumeric('68769123214')).to.be.true;
		expect(StringUtils.wordCount(str)).to.eql(2);
		expect(StringUtils.editDistance(str, str)).to.eql(0);
		expect(StringUtils.editDistance(str, str + 'a')).to.eql(1);
		expect(StringUtils.similarity(str, str)).to.eql(1);
	});

	it('should find substr', function() {
		expect(StringUtils.afterFirst(str, 'l')).to.eql('lo World');
		expect(StringUtils.afterLast(str, 'l')).to.eql('d');
		expect(StringUtils.beginsWith(str, 'H')).to.be.true;
		expect(StringUtils.beforeFirst(str, 'l')).to.eql('He');
		expect(StringUtils.beforeLast(str, 'l')).to.eql('Hello Wor');
		expect(StringUtils.between(str, 'H', 'W')).to.eql('ello ');
	});

	it('should format', function() {
		expect(StringUtils.trim('  '+str+'  ')).to.eql('Hello World');
		expect(StringUtils.trimLeft('  '+str+'  ')).to.eql('Hello World  ');
		expect(StringUtils.trimRight('  '+str+'  ')).to.eql('  Hello World');
		expect(StringUtils.padLeft(str, '_', 12)).to.eql('_Hello World');
		expect(StringUtils.padRight(str, '_', 12)).to.eql('Hello World_');
		expect(StringUtils.removeExtraWhitespace('Hello     World')).to.eql('Hello World');
		expect(StringUtils.remove(str, 'll')).to.eql('Heo World');
		// TODO: this sometime acts unexpectedly with shorter strings
		expect(StringUtils.truncate(str, 10)).to.eql('Hello...');
		//expect(StringUtils.truncate(str, 4)).to.eql('Hello...');
		expect(StringUtils.capitalize(str.toLowerCase())).to.eql('Hello world');
		expect(StringUtils.properCase(str.toLowerCase())).to.eql('Hello World');
		expect(StringUtils.reverse(str)).to.eql('dlroW olleH');
		expect(StringUtils.reverseWords(str)).to.eql('World Hello');
		expect(StringUtils.stripTags('<p>'+str+'</p>')).to.eql('Hello World');
		expect(StringUtils.swapCase(str)).to.eql('hello World');
		//expect(StringUtils.block(str)).to.eql('Hello World');
		expect(StringUtils.escapePattern(str + '.')).to.eql('Hello World\\.');
	});
});

},{"../src/utils/string-utils.js":14}],31:[function(require,module,exports){
'use strict';

describe('A test suite', function() {
	beforeEach(function() {
	});
	afterEach(function() {
	});

	it('should fail', function() {
		expect(true).to.be.true;
	});
});

},{}],32:[function(require,module,exports){
'use strict';

var VideoObject = require('../src/utils/video-object.js');

describe('video object', function() {
	var videoObject = new VideoObject(),
		el = document.createElement('video'),
		ext = (el.canPlayType('video/mp4;') ? 'mp4' : 'ogv'),
		file = ('http://techslides.com/demos/sample-videos/small.' + ext),
		ready = false;

	beforeEach(function(done) {
		videoObject.onReady.add(function() {
			ready = true;
			done();
		});
		videoObject.load(file);
	});

	it('should be ready', function(){
		expect(ready).to.be.true;
	});
});

},{"../src/utils/video-object.js":15}]},{},[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])


},{"../src/utils/array-utils.js":2,"../src/utils/asset-loader.js":3,"../src/utils/console-patch.js":4,"../src/utils/css-utils.js":5,"../src/utils/device.js":6,"../src/utils/event-utils.js":7,"../src/utils/linked-list.js":8,"../src/utils/math-utils.js":9,"../src/utils/object-pool.js":10,"../src/utils/ready.js":11,"../src/utils/resize.js":12,"../src/utils/storage-utils.js":13,"../src/utils/string-utils.js":14,"../src/utils/video-object.js":15,"signals":1}],20:[function(require,module,exports){
'use strict';

require('../src/utils/console-patch.js');

describe('console patch', function() {

	it('should be function', function() {
		expect(window.console).to.exist;
		expect(window.console.table).to.exist;
	});

});
},{"../src/utils/console-patch.js":4}],21:[function(require,module,exports){
'use strict';

var CssUtils = require('../src/utils/css-utils.js');

describe('css utils', function() {
	var el = document.createElement('div');
	
	it('should add class to element', function() {
		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('foo');

		CssUtils.addClass(el, 'bar');
		expect(el.className).to.eql('foo bar');

		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('bar foo');

		CssUtils.removeClass(el, 'foo');
		expect(el.className).to.eql('bar');
	});

	it('should remove class from', function() {
				CssUtils.removeClass(el, 'foo');
				expect(el.className).to.eql('bar');
	});

	it('should return true', function() {
				expect(CssUtils.hasClass(el, 'bar')).to.be.true;
	});

	it('should return false', function() {
				expect(CssUtils.hasClass(el, 'foo')).to.be.false;
	});
});

},{"../src/utils/css-utils.js":5}],22:[function(require,module,exports){
'use strict';

var device = require('../src/utils/device.js');

describe('device', function() {
	
	it('should pass', function() {
		expect(device.mobile).to.be.false;
		expect(device.ipad).to.be.false;
		expect(device.iphone).to.be.false;
		expect(device.ipod).to.be.false;
		expect(device.ios).to.be.false;
		expect(device.ios5).to.be.false;
		expect(device.android).to.be.false;
		expect(device.androidOld).to.be.false;
		expect(device.androidStock).to.be.false;
		expect(device.ieVersion).to.eql(-1);
		expect(device.ie9down).to.be.false;
		expect(device.ie8down).to.be.false;
		expect(device.screenWidth).to.eql(window.screen.width);
		expect(device.screenHeight).to.eql(window.screen.height);
		expect(device.dpr).to.eql(1);
		expect(device.ie8down).to.be.false;
	});

});

},{"../src/utils/device.js":6}],23:[function(require,module,exports){
'use strict';

var EventUtils = require('../src/utils/event-utils.js');

describe('event utils', function() {
	var el = document.createElement('div'),
		complete = false;

	function simulateClick(el) {
		var e = document.createEvent('MouseEvents');
		e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		var cancelled = el.dispatchEvent(e);
		return cancelled;
	}

	EventUtils.addEvent(el, 'click', function() {
		complete = true;
	});

	simulateClick(el);
	
	it('should have recived click event', function() {
		expect(complete).to.be.true;
	});
});

},{"../src/utils/event-utils.js":7}],24:[function(require,module,exports){
'use strict';

var LinkedList = require('../src/utils/linked-list.js');

describe('linked list', function() {
	var linkedList = new LinkedList();
	var items = [];

	for (var i = 0; i < 10; i++) {
		items.push(linkedList.add({
			'index': i,
			'next': null,
			'prev': null
		}));
	}
	
	it('should have 10 items', function() {
		expect(linkedList.getCount()).to.eql(10);
	});

	it('should have first', function() {
		expect(linkedList.getFirst()).to.exist;
	});

	it('should have last', function() {
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to iterate', function() {
		var item = linkedList.getFirst();
		while(item.next) {
			expect(item).to.exist;
			expect(item).to.have.property('index');
			item = item.next;
		}
		expect(item).to.eql(linkedList.getLast());
	});

	it('should be able to remove item', function() {
		linkedList.remove(linkedList.getFirst());
		expect(linkedList.getCount()).to.eql(9);
		expect(linkedList.getFirst()).to.exist;

		linkedList.remove(linkedList.getLast());
		expect(linkedList.getCount()).to.eql(8);
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to insert', function() {
		var item = {
			'index': 100,
			'next': null,
			'prev': null
		};
		linkedList.insertBefore(item, linkedList.getFirst());

		expect(linkedList.getCount()).to.eql(9);
		expect(item).to.eql(linkedList.getFirst());
	});
});

},{"../src/utils/linked-list.js":8}],25:[function(require,module,exports){
'use strict';

var MathUtils = require('../src/utils/math-utils.js');

describe('math utils', function() {
	
	it('should pass', function() {
		expect(MathUtils.map(0.75, 0, 1, -100, 100)).to.eql(50);
		expect(MathUtils.lerp(0, 1, 0.5)).to.eql(0.5);
		expect(MathUtils.clamp(100, 0, 50)).to.eql(50);
		expect(MathUtils.random(0, 100)).to.be.within(0,100);
		expect(MathUtils.difference(-20, 20)).to.eql(40);
		expect(MathUtils.distance(0, 0, 1, 1)).to.eql(Math.SQRT2);
		expect(MathUtils.coinToss()).to.be.a('boolean');
		expect(MathUtils.angle(0, 0, -1, 0)).to.eql(Math.PI);
		expect(MathUtils.degrees(Math.PI)).to.eql(180);
		expect(MathUtils.radians(180)).to.eql(Math.PI);
		expect(MathUtils.roundToNearest(96.5, 10)).to.eql(100);
		expect(MathUtils.getIntersectionArea(0, 0, 2, 2, 0, 1, 2, 2)).to.eql(2);
		expect(MathUtils.rotateTo(359, 1)).to.eql(361);
	});

});

},{"../src/utils/math-utils.js":9}],26:[function(require,module,exports){
'use strict';

var ObjectPool = require('../src/utils/object-pool.js');

describe('object pool', function() {
	var newlyCreated = 0;

	function TestOb() {
		newlyCreated ++;
		var id = Math.random();
		return {
			getId: function() {
				return id;
			}
		};
	}

	it('should pass', function(){
		var p = new ObjectPool(TestOb);
		var t = p.get();

		expect(t).to.exist;
		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);

		p.dispose(t);

		expect(p.getPool().length).to.eql(1);
		
		t = p.get();

		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);
		expect(newlyCreated).to.eql(1);

		p.fill(10);
		expect(p.getPool().length).to.eql(10);
		expect(newlyCreated).to.eql(11);

		for(var i = 0; i < 5; i++) {
			t = p.get();
			expect(t.getId()).to.be.a('number');
		}
		expect(p.getPool().length).to.eql(5);
		expect(newlyCreated).to.eql(11);
	});
});

},{"../src/utils/object-pool.js":10}],27:[function(require,module,exports){
'use strict';

var ready = require('../src/utils/ready.js');

describe('ready', function() {
	var isReady = false;
	
	beforeEach(function(done) {
		ready(function() {
			isReady = true;
			done();
		});
	});

	it('should be ready', function(){
		expect(isReady).to.be.true;
	});
});

},{"../src/utils/ready.js":11}],28:[function(require,module,exports){
'use strict';

var resize = require('../src/utils/resize.js');

describe('resize', function() {
	var rect = {
		x: 0,
		y: 0,
		width: 640,
		height: 360
	};

	it('should pass', function(){
		resize(rect, 1920, 720, true, 'fit');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});

		resize(rect, 1920, 720, true, 'fill');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitWidth');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitHeight');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});
	});
});

},{"../src/utils/resize.js":12}],29:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	StorageUtils = require('../src/utils/storage-utils.js');

describe('storage utils', function() {
	var key = 'testData',
		testData = {
			id: 'foo',
			name: 'bar',
			x: 0
		};

	it('should store object and return true', function(){
		var saved = StorageUtils.saveJSON(key, testData);
		expect(saved).to.be.true;
	});

	it('should retrieve stored object', function(){
		var loaded = StorageUtils.loadJSON(key);
		expect(loaded).to.exist;
		expect(loaded.id).to.eql('foo');
		expect(loaded.name).to.eql('bar');
		expect(loaded.x).to.eql(0);
	});

	var loader = new AssetLoader.Loader('http://placekitten.com/g/200/300', 'jpg');
	loader.crossOrigin = true;
	beforeEach(function(done) {
		loader.onComplete.add(function() {
			loader.onComplete.removeAll();
			done();
		});
		loader.start();
	});

	it('should get image data', function(){
		var dataURL = StorageUtils.getImageDataURL(loader.data);
		expect(dataURL.indexOf('data:image/')).to.eql(0);
	});
});

},{"../src/utils/asset-loader.js":3,"../src/utils/storage-utils.js":13}],30:[function(require,module,exports){
'use strict';

var StringUtils = require('../src/utils/string-utils.js');

describe('string utils', function() {

	var str = 'Hello World';

	it('should query', function() {
		expect(StringUtils.contains(str, 'World')).to.be.true;
		expect(StringUtils.countOf(str, 'l')).to.eql(3);
		expect(StringUtils.endsWith(str, 'ld')).to.be.true;
		expect(StringUtils.hasText(str)).to.be.true;
		expect(StringUtils.isEmpty(str)).to.be.false;
		expect(StringUtils.isNumeric(str)).to.be.false;
		expect(StringUtils.isNumeric('68769123214')).to.be.true;
		expect(StringUtils.wordCount(str)).to.eql(2);
		expect(StringUtils.editDistance(str, str)).to.eql(0);
		expect(StringUtils.editDistance(str, str + 'a')).to.eql(1);
		expect(StringUtils.similarity(str, str)).to.eql(1);
	});

	it('should find substr', function() {
		expect(StringUtils.afterFirst(str, 'l')).to.eql('lo World');
		expect(StringUtils.afterLast(str, 'l')).to.eql('d');
		expect(StringUtils.beginsWith(str, 'H')).to.be.true;
		expect(StringUtils.beforeFirst(str, 'l')).to.eql('He');
		expect(StringUtils.beforeLast(str, 'l')).to.eql('Hello Wor');
		expect(StringUtils.between(str, 'H', 'W')).to.eql('ello ');
	});

	it('should format', function() {
		expect(StringUtils.trim('  '+str+'  ')).to.eql('Hello World');
		expect(StringUtils.trimLeft('  '+str+'  ')).to.eql('Hello World  ');
		expect(StringUtils.trimRight('  '+str+'  ')).to.eql('  Hello World');
		expect(StringUtils.padLeft(str, '_', 12)).to.eql('_Hello World');
		expect(StringUtils.padRight(str, '_', 12)).to.eql('Hello World_');
		expect(StringUtils.removeExtraWhitespace('Hello     World')).to.eql('Hello World');
		expect(StringUtils.remove(str, 'll')).to.eql('Heo World');
		// TODO: this sometime acts unexpectedly with shorter strings
		expect(StringUtils.truncate(str, 10)).to.eql('Hello...');
		//expect(StringUtils.truncate(str, 4)).to.eql('Hello...');
		expect(StringUtils.capitalize(str.toLowerCase())).to.eql('Hello world');
		expect(StringUtils.properCase(str.toLowerCase())).to.eql('Hello World');
		expect(StringUtils.reverse(str)).to.eql('dlroW olleH');
		expect(StringUtils.reverseWords(str)).to.eql('World Hello');
		expect(StringUtils.stripTags('<p>'+str+'</p>')).to.eql('Hello World');
		expect(StringUtils.swapCase(str)).to.eql('hello World');
		//expect(StringUtils.block(str)).to.eql('Hello World');
		expect(StringUtils.escapePattern(str + '.')).to.eql('Hello World\\.');
	});
});

},{"../src/utils/string-utils.js":14}],31:[function(require,module,exports){
'use strict';

describe('A test suite', function() {
	beforeEach(function() {
	});
	afterEach(function() {
	});

	it('should fail', function() {
		expect(true).to.be.true;
	});
});

},{}],32:[function(require,module,exports){
'use strict';

var VideoObject = require('../src/utils/video-object.js');

describe('video object', function() {
	var videoObject = new VideoObject(),
		el = document.createElement('video'),
		ext = (el.canPlayType('video/mp4;') ? 'mp4' : 'ogv'),
		file = ('http://techslides.com/demos/sample-videos/small.' + ext),
		ready = false;

	beforeEach(function(done) {
		videoObject.onReady.add(function() {
			ready = true;
			done();
		});
		videoObject.load(file);
	});

	it('should be ready', function(){
		expect(ready).to.be.true;
	});
});

},{"../src/utils/video-object.js":15}]},{},[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])


},{"../src/utils/array-utils.js":2,"../src/utils/asset-loader.js":3,"../src/utils/console-patch.js":4,"../src/utils/css-utils.js":5,"../src/utils/device.js":6,"../src/utils/event-utils.js":7,"../src/utils/linked-list.js":8,"../src/utils/math-utils.js":9,"../src/utils/object-pool.js":10,"../src/utils/ready.js":11,"../src/utils/resize.js":12,"../src/utils/storage-utils.js":13,"../src/utils/string-utils.js":14,"../src/utils/video-object.js":15,"signals":1}],20:[function(require,module,exports){
'use strict';

require('../src/utils/console-patch.js');

describe('console patch', function() {

	it('should be function', function() {
		expect(window.console).to.exist;
		expect(window.console.table).to.exist;
	});

});
},{"../src/utils/console-patch.js":4}],21:[function(require,module,exports){
'use strict';

var CssUtils = require('../src/utils/css-utils.js');

describe('css utils', function() {
	var el = document.createElement('div');
	
	it('should add class to element', function() {
		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('foo');

		CssUtils.addClass(el, 'bar');
		expect(el.className).to.eql('foo bar');

		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('bar foo');

		CssUtils.removeClass(el, 'foo');
		expect(el.className).to.eql('bar');
	});

	it('should remove class from', function() {
				CssUtils.removeClass(el, 'foo');
				expect(el.className).to.eql('bar');
	});

	it('should return true', function() {
				expect(CssUtils.hasClass(el, 'bar')).to.be.true;
	});

	it('should return false', function() {
				expect(CssUtils.hasClass(el, 'foo')).to.be.false;
	});
});

},{"../src/utils/css-utils.js":5}],22:[function(require,module,exports){
'use strict';

var device = require('../src/utils/device.js');

describe('device', function() {
	
	it('should pass', function() {
		expect(device.mobile).to.be.false;
		expect(device.ipad).to.be.false;
		expect(device.iphone).to.be.false;
		expect(device.ipod).to.be.false;
		expect(device.ios).to.be.false;
		expect(device.ios5).to.be.false;
		expect(device.android).to.be.false;
		expect(device.androidOld).to.be.false;
		expect(device.androidStock).to.be.false;
		expect(device.ieVersion).to.eql(-1);
		expect(device.ie9down).to.be.false;
		expect(device.ie8down).to.be.false;
		expect(device.screenWidth).to.eql(window.screen.width);
		expect(device.screenHeight).to.eql(window.screen.height);
		expect(device.dpr).to.eql(1);
		expect(device.ie8down).to.be.false;
	});

});

},{"../src/utils/device.js":6}],23:[function(require,module,exports){
'use strict';

var EventUtils = require('../src/utils/event-utils.js');

describe('event utils', function() {
	var el = document.createElement('div'),
		complete = false;

	function simulateClick(el) {
		var e = document.createEvent('MouseEvents');
		e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		var cancelled = el.dispatchEvent(e);
		return cancelled;
	}

	EventUtils.addEvent(el, 'click', function() {
		complete = true;
	});

	simulateClick(el);
	
	it('should have recived click event', function() {
		expect(complete).to.be.true;
	});
});

},{"../src/utils/event-utils.js":7}],24:[function(require,module,exports){
'use strict';

var LinkedList = require('../src/utils/linked-list.js');

describe('linked list', function() {
	var linkedList = new LinkedList();
	var items = [];

	for (var i = 0; i < 10; i++) {
		items.push(linkedList.add({
			'index': i,
			'next': null,
			'prev': null
		}));
	}
	
	it('should have 10 items', function() {
		expect(linkedList.getCount()).to.eql(10);
	});

	it('should have first', function() {
		expect(linkedList.getFirst()).to.exist;
	});

	it('should have last', function() {
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to iterate', function() {
		var item = linkedList.getFirst();
		while(item.next) {
			expect(item).to.exist;
			expect(item).to.have.property('index');
			item = item.next;
		}
		expect(item).to.eql(linkedList.getLast());
	});

	it('should be able to remove item', function() {
		linkedList.remove(linkedList.getFirst());
		expect(linkedList.getCount()).to.eql(9);
		expect(linkedList.getFirst()).to.exist;

		linkedList.remove(linkedList.getLast());
		expect(linkedList.getCount()).to.eql(8);
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to insert', function() {
		var item = {
			'index': 100,
			'next': null,
			'prev': null
		};
		linkedList.insertBefore(item, linkedList.getFirst());

		expect(linkedList.getCount()).to.eql(9);
		expect(item).to.eql(linkedList.getFirst());
	});
});

},{"../src/utils/linked-list.js":8}],25:[function(require,module,exports){
'use strict';

var MathUtils = require('../src/utils/math-utils.js');

describe('math utils', function() {
	
	it('should pass', function() {
		expect(MathUtils.map(0.75, 0, 1, -100, 100)).to.eql(50);
		expect(MathUtils.lerp(0, 1, 0.5)).to.eql(0.5);
		expect(MathUtils.clamp(100, 0, 50)).to.eql(50);
		expect(MathUtils.random(0, 100)).to.be.within(0,100);
		expect(MathUtils.difference(-20, 20)).to.eql(40);
		expect(MathUtils.distance(0, 0, 1, 1)).to.eql(Math.SQRT2);
		expect(MathUtils.coinToss()).to.be.a('boolean');
		expect(MathUtils.angle(0, 0, -1, 0)).to.eql(Math.PI);
		expect(MathUtils.degrees(Math.PI)).to.eql(180);
		expect(MathUtils.radians(180)).to.eql(Math.PI);
		expect(MathUtils.roundToNearest(96.5, 10)).to.eql(100);
		expect(MathUtils.getIntersectionArea(0, 0, 2, 2, 0, 1, 2, 2)).to.eql(2);
		expect(MathUtils.rotateTo(359, 1)).to.eql(361);
	});

});

},{"../src/utils/math-utils.js":9}],26:[function(require,module,exports){
'use strict';

var ObjectPool = require('../src/utils/object-pool.js');

describe('object pool', function() {
	var newlyCreated = 0;

	function TestOb() {
		newlyCreated ++;
		var id = Math.random();
		return {
			getId: function() {
				return id;
			}
		};
	}

	it('should pass', function(){
		var p = new ObjectPool(TestOb);
		var t = p.get();

		expect(t).to.exist;
		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);

		p.dispose(t);

		expect(p.getPool().length).to.eql(1);
		
		t = p.get();

		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);
		expect(newlyCreated).to.eql(1);

		p.fill(10);
		expect(p.getPool().length).to.eql(10);
		expect(newlyCreated).to.eql(11);

		for(var i = 0; i < 5; i++) {
			t = p.get();
			expect(t.getId()).to.be.a('number');
		}
		expect(p.getPool().length).to.eql(5);
		expect(newlyCreated).to.eql(11);
	});
});

},{"../src/utils/object-pool.js":10}],27:[function(require,module,exports){
'use strict';

var ready = require('../src/utils/ready.js');

describe('ready', function() {
	var isReady = false;
	
	beforeEach(function(done) {
		ready(function() {
			isReady = true;
			done();
		});
	});

	it('should be ready', function(){
		expect(isReady).to.be.true;
	});
});

},{"../src/utils/ready.js":11}],28:[function(require,module,exports){
'use strict';

var resize = require('../src/utils/resize.js');

describe('resize', function() {
	var rect = {
		x: 0,
		y: 0,
		width: 640,
		height: 360
	};

	it('should pass', function(){
		resize(rect, 1920, 720, true, 'fit');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});

		resize(rect, 1920, 720, true, 'fill');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitWidth');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitHeight');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});
	});
});

},{"../src/utils/resize.js":12}],29:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	StorageUtils = require('../src/utils/storage-utils.js');

describe('storage utils', function() {
	var key = 'testData',
		testData = {
			id: 'foo',
			name: 'bar',
			x: 0
		};

	it('should store object and return true', function(){
		var saved = StorageUtils.saveJSON(key, testData);
		expect(saved).to.be.true;
	});

	it('should retrieve stored object', function(){
		var loaded = StorageUtils.loadJSON(key);
		expect(loaded).to.exist;
		expect(loaded.id).to.eql('foo');
		expect(loaded.name).to.eql('bar');
		expect(loaded.x).to.eql(0);
	});

	var loader = new AssetLoader.Loader('http://placekitten.com/g/200/300', 'jpg');
	loader.crossOrigin = true;
	beforeEach(function(done) {
		loader.onComplete.add(function() {
			loader.onComplete.removeAll();
			done();
		});
		loader.start();
	});

	it('should get image data', function(){
		var dataURL = StorageUtils.getImageDataURL(loader.data);
		expect(dataURL.indexOf('data:image/')).to.eql(0);
	});
});

},{"../src/utils/asset-loader.js":3,"../src/utils/storage-utils.js":13}],30:[function(require,module,exports){
'use strict';

var StringUtils = require('../src/utils/string-utils.js');

describe('string utils', function() {

	var str = 'Hello World';

	it('should query', function() {
		expect(StringUtils.contains(str, 'World')).to.be.true;
		expect(StringUtils.countOf(str, 'l')).to.eql(3);
		expect(StringUtils.endsWith(str, 'ld')).to.be.true;
		expect(StringUtils.hasText(str)).to.be.true;
		expect(StringUtils.isEmpty(str)).to.be.false;
		expect(StringUtils.isNumeric(str)).to.be.false;
		expect(StringUtils.isNumeric('68769123214')).to.be.true;
		expect(StringUtils.wordCount(str)).to.eql(2);
		expect(StringUtils.editDistance(str, str)).to.eql(0);
		expect(StringUtils.editDistance(str, str + 'a')).to.eql(1);
		expect(StringUtils.similarity(str, str)).to.eql(1);
	});

	it('should find substr', function() {
		expect(StringUtils.afterFirst(str, 'l')).to.eql('lo World');
		expect(StringUtils.afterLast(str, 'l')).to.eql('d');
		expect(StringUtils.beginsWith(str, 'H')).to.be.true;
		expect(StringUtils.beforeFirst(str, 'l')).to.eql('He');
		expect(StringUtils.beforeLast(str, 'l')).to.eql('Hello Wor');
		expect(StringUtils.between(str, 'H', 'W')).to.eql('ello ');
	});

	it('should format', function() {
		expect(StringUtils.trim('  '+str+'  ')).to.eql('Hello World');
		expect(StringUtils.trimLeft('  '+str+'  ')).to.eql('Hello World  ');
		expect(StringUtils.trimRight('  '+str+'  ')).to.eql('  Hello World');
		expect(StringUtils.padLeft(str, '_', 12)).to.eql('_Hello World');
		expect(StringUtils.padRight(str, '_', 12)).to.eql('Hello World_');
		expect(StringUtils.removeExtraWhitespace('Hello     World')).to.eql('Hello World');
		expect(StringUtils.remove(str, 'll')).to.eql('Heo World');
		// TODO: this sometime acts unexpectedly with shorter strings
		expect(StringUtils.truncate(str, 10)).to.eql('Hello...');
		//expect(StringUtils.truncate(str, 4)).to.eql('Hello...');
		expect(StringUtils.capitalize(str.toLowerCase())).to.eql('Hello world');
		expect(StringUtils.properCase(str.toLowerCase())).to.eql('Hello World');
		expect(StringUtils.reverse(str)).to.eql('dlroW olleH');
		expect(StringUtils.reverseWords(str)).to.eql('World Hello');
		expect(StringUtils.stripTags('<p>'+str+'</p>')).to.eql('Hello World');
		expect(StringUtils.swapCase(str)).to.eql('hello World');
		//expect(StringUtils.block(str)).to.eql('Hello World');
		expect(StringUtils.escapePattern(str + '.')).to.eql('Hello World\\.');
	});
});

},{"../src/utils/string-utils.js":14}],31:[function(require,module,exports){
'use strict';

describe('A test suite', function() {
	beforeEach(function() {
	});
	afterEach(function() {
	});

	it('should fail', function() {
		expect(true).to.be.true;
	});
});

},{}],32:[function(require,module,exports){
'use strict';

var VideoObject = require('../src/utils/video-object.js');

describe('video object', function() {
	var videoObject = new VideoObject(),
		el = document.createElement('video'),
		ext = (el.canPlayType('video/mp4;') ? 'mp4' : 'ogv'),
		file = ('http://techslides.com/demos/sample-videos/small.' + ext),
		ready = false;

	beforeEach(function(done) {
		videoObject.onReady.add(function() {
			ready = true;
			done();
		});
		videoObject.load(file);
	});

	it('should be ready', function(){
		expect(ready).to.be.true;
	});
});

},{"../src/utils/video-object.js":15}]},{},[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])


},{"../src/utils/array-utils.js":2,"../src/utils/asset-loader.js":3,"../src/utils/console-patch.js":4,"../src/utils/css-utils.js":5,"../src/utils/device.js":6,"../src/utils/event-utils.js":7,"../src/utils/linked-list.js":8,"../src/utils/math-utils.js":9,"../src/utils/object-pool.js":10,"../src/utils/ready.js":11,"../src/utils/resize.js":12,"../src/utils/storage-utils.js":13,"../src/utils/string-utils.js":14,"../src/utils/video-object.js":15,"signals":1}],20:[function(require,module,exports){
'use strict';

require('../src/utils/console-patch.js');

describe('console patch', function() {

	it('should be function', function() {
		expect(window.console).to.exist;
		expect(window.console.table).to.exist;
	});

});
},{"../src/utils/console-patch.js":4}],21:[function(require,module,exports){
'use strict';

var CssUtils = require('../src/utils/css-utils.js');

describe('css utils', function() {
	var el = document.createElement('div');
	
	it('should add class to element', function() {
		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('foo');

		CssUtils.addClass(el, 'bar');
		expect(el.className).to.eql('foo bar');

		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('bar foo');

		CssUtils.removeClass(el, 'foo');
		expect(el.className).to.eql('bar');
	});

	it('should remove class from', function() {
				CssUtils.removeClass(el, 'foo');
				expect(el.className).to.eql('bar');
	});

	it('should return true', function() {
				expect(CssUtils.hasClass(el, 'bar')).to.be.true;
	});

	it('should return false', function() {
				expect(CssUtils.hasClass(el, 'foo')).to.be.false;
	});
});

},{"../src/utils/css-utils.js":5}],22:[function(require,module,exports){
'use strict';

var device = require('../src/utils/device.js');

describe('device', function() {
	
	it('should pass', function() {
		expect(device.mobile).to.be.false;
		expect(device.ipad).to.be.false;
		expect(device.iphone).to.be.false;
		expect(device.ipod).to.be.false;
		expect(device.ios).to.be.false;
		expect(device.ios5).to.be.false;
		expect(device.android).to.be.false;
		expect(device.androidOld).to.be.false;
		expect(device.androidStock).to.be.false;
		expect(device.ieVersion).to.eql(-1);
		expect(device.ie9down).to.be.false;
		expect(device.ie8down).to.be.false;
		expect(device.screenWidth).to.eql(window.screen.width);
		expect(device.screenHeight).to.eql(window.screen.height);
		expect(device.dpr).to.eql(1);
		expect(device.ie8down).to.be.false;
	});

});

},{"../src/utils/device.js":6}],23:[function(require,module,exports){
'use strict';

var EventUtils = require('../src/utils/event-utils.js');

describe('event utils', function() {
	var el = document.createElement('div'),
		complete = false;

	function simulateClick(el) {
		var e = document.createEvent('MouseEvents');
		e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		var cancelled = el.dispatchEvent(e);
		return cancelled;
	}

	EventUtils.addEvent(el, 'click', function() {
		complete = true;
	});

	simulateClick(el);
	
	it('should have recived click event', function() {
		expect(complete).to.be.true;
	});
});

},{"../src/utils/event-utils.js":7}],24:[function(require,module,exports){
'use strict';

var LinkedList = require('../src/utils/linked-list.js');

describe('linked list', function() {
	var linkedList = new LinkedList();
	var items = [];

	for (var i = 0; i < 10; i++) {
		items.push(linkedList.add({
			'index': i,
			'next': null,
			'prev': null
		}));
	}
	
	it('should have 10 items', function() {
		expect(linkedList.getCount()).to.eql(10);
	});

	it('should have first', function() {
		expect(linkedList.getFirst()).to.exist;
	});

	it('should have last', function() {
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to iterate', function() {
		var item = linkedList.getFirst();
		while(item.next) {
			expect(item).to.exist;
			expect(item).to.have.property('index');
			item = item.next;
		}
		expect(item).to.eql(linkedList.getLast());
	});

	it('should be able to remove item', function() {
		linkedList.remove(linkedList.getFirst());
		expect(linkedList.getCount()).to.eql(9);
		expect(linkedList.getFirst()).to.exist;

		linkedList.remove(linkedList.getLast());
		expect(linkedList.getCount()).to.eql(8);
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to insert', function() {
		var item = {
			'index': 100,
			'next': null,
			'prev': null
		};
		linkedList.insertBefore(item, linkedList.getFirst());

		expect(linkedList.getCount()).to.eql(9);
		expect(item).to.eql(linkedList.getFirst());
	});
});

},{"../src/utils/linked-list.js":8}],25:[function(require,module,exports){
'use strict';

var MathUtils = require('../src/utils/math-utils.js');

describe('math utils', function() {
	
	it('should pass', function() {
		expect(MathUtils.map(0.75, 0, 1, -100, 100)).to.eql(50);
		expect(MathUtils.lerp(0, 1, 0.5)).to.eql(0.5);
		expect(MathUtils.clamp(100, 0, 50)).to.eql(50);
		expect(MathUtils.random(0, 100)).to.be.within(0,100);
		expect(MathUtils.difference(-20, 20)).to.eql(40);
		expect(MathUtils.distance(0, 0, 1, 1)).to.eql(Math.SQRT2);
		expect(MathUtils.coinToss()).to.be.a('boolean');
		expect(MathUtils.angle(0, 0, -1, 0)).to.eql(Math.PI);
		expect(MathUtils.degrees(Math.PI)).to.eql(180);
		expect(MathUtils.radians(180)).to.eql(Math.PI);
		expect(MathUtils.roundToNearest(96.5, 10)).to.eql(100);
		expect(MathUtils.getIntersectionArea(0, 0, 2, 2, 0, 1, 2, 2)).to.eql(2);
		expect(MathUtils.rotateTo(359, 1)).to.eql(361);
	});

});

},{"../src/utils/math-utils.js":9}],26:[function(require,module,exports){
'use strict';

var ObjectPool = require('../src/utils/object-pool.js');

describe('object pool', function() {
	var newlyCreated = 0;

	function TestOb() {
		newlyCreated ++;
		var id = Math.random();
		return {
			getId: function() {
				return id;
			}
		};
	}

	it('should pass', function(){
		var p = new ObjectPool(TestOb);
		var t = p.get();

		expect(t).to.exist;
		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);

		p.dispose(t);

		expect(p.getPool().length).to.eql(1);
		
		t = p.get();

		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);
		expect(newlyCreated).to.eql(1);

		p.fill(10);
		expect(p.getPool().length).to.eql(10);
		expect(newlyCreated).to.eql(11);

		for(var i = 0; i < 5; i++) {
			t = p.get();
			expect(t.getId()).to.be.a('number');
		}
		expect(p.getPool().length).to.eql(5);
		expect(newlyCreated).to.eql(11);
	});
});

},{"../src/utils/object-pool.js":10}],27:[function(require,module,exports){
'use strict';

var ready = require('../src/utils/ready.js');

describe('ready', function() {
	var isReady = false;
	
	beforeEach(function(done) {
		ready(function() {
			isReady = true;
			done();
		});
	});

	it('should be ready', function(){
		expect(isReady).to.be.true;
	});
});

},{"../src/utils/ready.js":11}],28:[function(require,module,exports){
'use strict';

var resize = require('../src/utils/resize.js');

describe('resize', function() {
	var rect = {
		x: 0,
		y: 0,
		width: 640,
		height: 360
	};

	it('should pass', function(){
		resize(rect, 1920, 720, true, 'fit');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});

		resize(rect, 1920, 720, true, 'fill');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitWidth');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitHeight');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});
	});
});

},{"../src/utils/resize.js":12}],29:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	StorageUtils = require('../src/utils/storage-utils.js');

describe('storage utils', function() {
	var key = 'testData',
		testData = {
			id: 'foo',
			name: 'bar',
			x: 0
		};

	it('should store object and return true', function(){
		var saved = StorageUtils.saveJSON(key, testData);
		expect(saved).to.be.true;
	});

	it('should retrieve stored object', function(){
		var loaded = StorageUtils.loadJSON(key);
		expect(loaded).to.exist;
		expect(loaded.id).to.eql('foo');
		expect(loaded.name).to.eql('bar');
		expect(loaded.x).to.eql(0);
	});

	var loader = new AssetLoader.Loader('http://placekitten.com/g/200/300', 'jpg');
	loader.crossOrigin = true;
	beforeEach(function(done) {
		loader.onComplete.add(function() {
			loader.onComplete.removeAll();
			done();
		});
		loader.start();
	});

	it('should get image data', function(){
		var dataURL = StorageUtils.getImageDataURL(loader.data);
		expect(dataURL.indexOf('data:image/')).to.eql(0);
	});
});

},{"../src/utils/asset-loader.js":3,"../src/utils/storage-utils.js":13}],30:[function(require,module,exports){
'use strict';

var StringUtils = require('../src/utils/string-utils.js');

describe('string utils', function() {

	var str = 'Hello World';

	it('should query', function() {
		expect(StringUtils.contains(str, 'World')).to.be.true;
		expect(StringUtils.countOf(str, 'l')).to.eql(3);
		expect(StringUtils.endsWith(str, 'ld')).to.be.true;
		expect(StringUtils.hasText(str)).to.be.true;
		expect(StringUtils.isEmpty(str)).to.be.false;
		expect(StringUtils.isNumeric(str)).to.be.false;
		expect(StringUtils.isNumeric('68769123214')).to.be.true;
		expect(StringUtils.wordCount(str)).to.eql(2);
		expect(StringUtils.editDistance(str, str)).to.eql(0);
		expect(StringUtils.editDistance(str, str + 'a')).to.eql(1);
		expect(StringUtils.similarity(str, str)).to.eql(1);
	});

	it('should find substr', function() {
		expect(StringUtils.afterFirst(str, 'l')).to.eql('lo World');
		expect(StringUtils.afterLast(str, 'l')).to.eql('d');
		expect(StringUtils.beginsWith(str, 'H')).to.be.true;
		expect(StringUtils.beforeFirst(str, 'l')).to.eql('He');
		expect(StringUtils.beforeLast(str, 'l')).to.eql('Hello Wor');
		expect(StringUtils.between(str, 'H', 'W')).to.eql('ello ');
	});

	it('should format', function() {
		expect(StringUtils.trim('  '+str+'  ')).to.eql('Hello World');
		expect(StringUtils.trimLeft('  '+str+'  ')).to.eql('Hello World  ');
		expect(StringUtils.trimRight('  '+str+'  ')).to.eql('  Hello World');
		expect(StringUtils.padLeft(str, '_', 12)).to.eql('_Hello World');
		expect(StringUtils.padRight(str, '_', 12)).to.eql('Hello World_');
		expect(StringUtils.removeExtraWhitespace('Hello     World')).to.eql('Hello World');
		expect(StringUtils.remove(str, 'll')).to.eql('Heo World');
		// TODO: this sometime acts unexpectedly with shorter strings
		expect(StringUtils.truncate(str, 10)).to.eql('Hello...');
		//expect(StringUtils.truncate(str, 4)).to.eql('Hello...');
		expect(StringUtils.capitalize(str.toLowerCase())).to.eql('Hello world');
		expect(StringUtils.properCase(str.toLowerCase())).to.eql('Hello World');
		expect(StringUtils.reverse(str)).to.eql('dlroW olleH');
		expect(StringUtils.reverseWords(str)).to.eql('World Hello');
		expect(StringUtils.stripTags('<p>'+str+'</p>')).to.eql('Hello World');
		expect(StringUtils.swapCase(str)).to.eql('hello World');
		//expect(StringUtils.block(str)).to.eql('Hello World');
		expect(StringUtils.escapePattern(str + '.')).to.eql('Hello World\\.');
	});
});

},{"../src/utils/string-utils.js":14}],31:[function(require,module,exports){
'use strict';

describe('A test suite', function() {
	beforeEach(function() {
	});
	afterEach(function() {
	});

	it('should fail', function() {
		expect(true).to.be.true;
	});
});

},{}],32:[function(require,module,exports){
'use strict';

var VideoObject = require('../src/utils/video-object.js');

describe('video object', function() {
	var videoObject = new VideoObject(),
		el = document.createElement('video'),
		ext = (el.canPlayType('video/mp4;') ? 'mp4' : 'ogv'),
		file = ('http://techslides.com/demos/sample-videos/small.' + ext),
		ready = false;

	beforeEach(function(done) {
		videoObject.onReady.add(function() {
			ready = true;
			done();
		});
		videoObject.load(file);
	});

	it('should be ready', function(){
		expect(ready).to.be.true;
	});
});

},{"../src/utils/video-object.js":15}]},{},[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])


},{"../src/utils/array-utils.js":2,"../src/utils/asset-loader.js":3,"../src/utils/console-patch.js":4,"../src/utils/css-utils.js":5,"../src/utils/device.js":6,"../src/utils/event-utils.js":7,"../src/utils/linked-list.js":8,"../src/utils/math-utils.js":9,"../src/utils/object-pool.js":10,"../src/utils/ready.js":11,"../src/utils/resize.js":12,"../src/utils/storage-utils.js":13,"../src/utils/string-utils.js":14,"../src/utils/video-object.js":15,"signals":1}],20:[function(require,module,exports){
'use strict';

require('../src/utils/console-patch.js');

describe('console patch', function() {

	it('should be function', function() {
		expect(window.console).to.exist;
		expect(window.console.table).to.exist;
	});

});
},{"../src/utils/console-patch.js":4}],21:[function(require,module,exports){
'use strict';

var CssUtils = require('../src/utils/css-utils.js');

describe('css utils', function() {
	var el = document.createElement('div');
	
	it('should add class to element', function() {
		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('foo');

		CssUtils.addClass(el, 'bar');
		expect(el.className).to.eql('foo bar');

		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('bar foo');

		CssUtils.removeClass(el, 'foo');
		expect(el.className).to.eql('bar');
	});

	it('should remove class from', function() {
				CssUtils.removeClass(el, 'foo');
				expect(el.className).to.eql('bar');
	});

	it('should return true', function() {
				expect(CssUtils.hasClass(el, 'bar')).to.be.true;
	});

	it('should return false', function() {
				expect(CssUtils.hasClass(el, 'foo')).to.be.false;
	});
});

},{"../src/utils/css-utils.js":5}],22:[function(require,module,exports){
'use strict';

var device = require('../src/utils/device.js');

describe('device', function() {
	
	it('should pass', function() {
		expect(device.mobile).to.be.false;
		expect(device.ipad).to.be.false;
		expect(device.iphone).to.be.false;
		expect(device.ipod).to.be.false;
		expect(device.ios).to.be.false;
		expect(device.ios5).to.be.false;
		expect(device.android).to.be.false;
		expect(device.androidOld).to.be.false;
		expect(device.androidStock).to.be.false;
		expect(device.ieVersion).to.eql(-1);
		expect(device.ie9down).to.be.false;
		expect(device.ie8down).to.be.false;
		expect(device.screenWidth).to.eql(window.screen.width);
		expect(device.screenHeight).to.eql(window.screen.height);
		expect(device.dpr).to.eql(1);
		expect(device.ie8down).to.be.false;
	});

});

},{"../src/utils/device.js":6}],23:[function(require,module,exports){
'use strict';

var EventUtils = require('../src/utils/event-utils.js');

describe('event utils', function() {
	var el = document.createElement('div'),
		complete = false;

	function simulateClick(el) {
		var e = document.createEvent('MouseEvents');
		e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		var cancelled = el.dispatchEvent(e);
		return cancelled;
	}

	EventUtils.addEvent(el, 'click', function() {
		complete = true;
	});

	simulateClick(el);
	
	it('should have recived click event', function() {
		expect(complete).to.be.true;
	});
});

},{"../src/utils/event-utils.js":7}],24:[function(require,module,exports){
'use strict';

var LinkedList = require('../src/utils/linked-list.js');

describe('linked list', function() {
	var linkedList = new LinkedList();
	var items = [];

	for (var i = 0; i < 10; i++) {
		items.push(linkedList.add({
			'index': i,
			'next': null,
			'prev': null
		}));
	}
	
	it('should have 10 items', function() {
		expect(linkedList.getCount()).to.eql(10);
	});

	it('should have first', function() {
		expect(linkedList.getFirst()).to.exist;
	});

	it('should have last', function() {
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to iterate', function() {
		var item = linkedList.getFirst();
		while(item.next) {
			expect(item).to.exist;
			expect(item).to.have.property('index');
			item = item.next;
		}
		expect(item).to.eql(linkedList.getLast());
	});

	it('should be able to remove item', function() {
		linkedList.remove(linkedList.getFirst());
		expect(linkedList.getCount()).to.eql(9);
		expect(linkedList.getFirst()).to.exist;

		linkedList.remove(linkedList.getLast());
		expect(linkedList.getCount()).to.eql(8);
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to insert', function() {
		var item = {
			'index': 100,
			'next': null,
			'prev': null
		};
		linkedList.insertBefore(item, linkedList.getFirst());

		expect(linkedList.getCount()).to.eql(9);
		expect(item).to.eql(linkedList.getFirst());
	});
});

},{"../src/utils/linked-list.js":8}],25:[function(require,module,exports){
'use strict';

var MathUtils = require('../src/utils/math-utils.js');

describe('math utils', function() {
	
	it('should pass', function() {
		expect(MathUtils.map(0.75, 0, 1, -100, 100)).to.eql(50);
		expect(MathUtils.lerp(0, 1, 0.5)).to.eql(0.5);
		expect(MathUtils.clamp(100, 0, 50)).to.eql(50);
		expect(MathUtils.random(0, 100)).to.be.within(0,100);
		expect(MathUtils.difference(-20, 20)).to.eql(40);
		expect(MathUtils.distance(0, 0, 1, 1)).to.eql(Math.SQRT2);
		expect(MathUtils.coinToss()).to.be.a('boolean');
		expect(MathUtils.angle(0, 0, -1, 0)).to.eql(Math.PI);
		expect(MathUtils.degrees(Math.PI)).to.eql(180);
		expect(MathUtils.radians(180)).to.eql(Math.PI);
		expect(MathUtils.roundToNearest(96.5, 10)).to.eql(100);
		expect(MathUtils.getIntersectionArea(0, 0, 2, 2, 0, 1, 2, 2)).to.eql(2);
		expect(MathUtils.rotateTo(359, 1)).to.eql(361);
	});

});

},{"../src/utils/math-utils.js":9}],26:[function(require,module,exports){
'use strict';

var ObjectPool = require('../src/utils/object-pool.js');

describe('object pool', function() {
	var newlyCreated = 0;

	function TestOb() {
		newlyCreated ++;
		var id = Math.random();
		return {
			getId: function() {
				return id;
			}
		};
	}

	it('should pass', function(){
		var p = new ObjectPool(TestOb);
		var t = p.get();

		expect(t).to.exist;
		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);

		p.dispose(t);

		expect(p.getPool().length).to.eql(1);
		
		t = p.get();

		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);
		expect(newlyCreated).to.eql(1);

		p.fill(10);
		expect(p.getPool().length).to.eql(10);
		expect(newlyCreated).to.eql(11);

		for(var i = 0; i < 5; i++) {
			t = p.get();
			expect(t.getId()).to.be.a('number');
		}
		expect(p.getPool().length).to.eql(5);
		expect(newlyCreated).to.eql(11);
	});
});

},{"../src/utils/object-pool.js":10}],27:[function(require,module,exports){
'use strict';

var ready = require('../src/utils/ready.js');

describe('ready', function() {
	var isReady = false;
	
	beforeEach(function(done) {
		ready(function() {
			isReady = true;
			done();
		});
	});

	it('should be ready', function(){
		expect(isReady).to.be.true;
	});
});

},{"../src/utils/ready.js":11}],28:[function(require,module,exports){
'use strict';

var resize = require('../src/utils/resize.js');

describe('resize', function() {
	var rect = {
		x: 0,
		y: 0,
		width: 640,
		height: 360
	};

	it('should pass', function(){
		resize(rect, 1920, 720, true, 'fit');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});

		resize(rect, 1920, 720, true, 'fill');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitWidth');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitHeight');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});
	});
});

},{"../src/utils/resize.js":12}],29:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	StorageUtils = require('../src/utils/storage-utils.js');

describe('storage utils', function() {
	var key = 'testData',
		testData = {
			id: 'foo',
			name: 'bar',
			x: 0
		};

	it('should store object and return true', function(){
		var saved = StorageUtils.saveJSON(key, testData);
		expect(saved).to.be.true;
	});

	it('should retrieve stored object', function(){
		var loaded = StorageUtils.loadJSON(key);
		expect(loaded).to.exist;
		expect(loaded.id).to.eql('foo');
		expect(loaded.name).to.eql('bar');
		expect(loaded.x).to.eql(0);
	});

	var loader = new AssetLoader.Loader('http://placekitten.com/g/200/300', 'jpg');
	loader.crossOrigin = true;
	beforeEach(function(done) {
		loader.onComplete.add(function() {
			loader.onComplete.removeAll();
			done();
		});
		loader.start();
	});

	it('should get image data', function(){
		var dataURL = StorageUtils.getImageDataURL(loader.data);
		expect(dataURL.indexOf('data:image/')).to.eql(0);
	});
});

},{"../src/utils/asset-loader.js":3,"../src/utils/storage-utils.js":13}],30:[function(require,module,exports){
'use strict';

var StringUtils = require('../src/utils/string-utils.js');

describe('string utils', function() {

	var str = 'Hello World';

	it('should query', function() {
		expect(StringUtils.contains(str, 'World')).to.be.true;
		expect(StringUtils.countOf(str, 'l')).to.eql(3);
		expect(StringUtils.endsWith(str, 'ld')).to.be.true;
		expect(StringUtils.hasText(str)).to.be.true;
		expect(StringUtils.isEmpty(str)).to.be.false;
		expect(StringUtils.isNumeric(str)).to.be.false;
		expect(StringUtils.isNumeric('68769123214')).to.be.true;
		expect(StringUtils.wordCount(str)).to.eql(2);
		expect(StringUtils.editDistance(str, str)).to.eql(0);
		expect(StringUtils.editDistance(str, str + 'a')).to.eql(1);
		expect(StringUtils.similarity(str, str)).to.eql(1);
	});

	it('should find substr', function() {
		expect(StringUtils.afterFirst(str, 'l')).to.eql('lo World');
		expect(StringUtils.afterLast(str, 'l')).to.eql('d');
		expect(StringUtils.beginsWith(str, 'H')).to.be.true;
		expect(StringUtils.beforeFirst(str, 'l')).to.eql('He');
		expect(StringUtils.beforeLast(str, 'l')).to.eql('Hello Wor');
		expect(StringUtils.between(str, 'H', 'W')).to.eql('ello ');
	});

	it('should format', function() {
		expect(StringUtils.trim('  '+str+'  ')).to.eql('Hello World');
		expect(StringUtils.trimLeft('  '+str+'  ')).to.eql('Hello World  ');
		expect(StringUtils.trimRight('  '+str+'  ')).to.eql('  Hello World');
		expect(StringUtils.padLeft(str, '_', 12)).to.eql('_Hello World');
		expect(StringUtils.padRight(str, '_', 12)).to.eql('Hello World_');
		expect(StringUtils.removeExtraWhitespace('Hello     World')).to.eql('Hello World');
		expect(StringUtils.remove(str, 'll')).to.eql('Heo World');
		// TODO: this sometime acts unexpectedly with shorter strings
		expect(StringUtils.truncate(str, 10)).to.eql('Hello...');
		//expect(StringUtils.truncate(str, 4)).to.eql('Hello...');
		expect(StringUtils.capitalize(str.toLowerCase())).to.eql('Hello world');
		expect(StringUtils.properCase(str.toLowerCase())).to.eql('Hello World');
		expect(StringUtils.reverse(str)).to.eql('dlroW olleH');
		expect(StringUtils.reverseWords(str)).to.eql('World Hello');
		expect(StringUtils.stripTags('<p>'+str+'</p>')).to.eql('Hello World');
		expect(StringUtils.swapCase(str)).to.eql('hello World');
		//expect(StringUtils.block(str)).to.eql('Hello World');
		expect(StringUtils.escapePattern(str + '.')).to.eql('Hello World\\.');
	});
});

},{"../src/utils/string-utils.js":14}],31:[function(require,module,exports){
'use strict';

describe('A test suite', function() {
	beforeEach(function() {
	});
	afterEach(function() {
	});

	it('should fail', function() {
		expect(true).to.be.true;
	});
});

},{}],32:[function(require,module,exports){
'use strict';

var VideoObject = require('../src/utils/video-object.js');

describe('video object', function() {
	var videoObject = new VideoObject(),
		el = document.createElement('video'),
		ext = (el.canPlayType('video/mp4;') ? 'mp4' : 'ogv'),
		file = ('http://techslides.com/demos/sample-videos/small.' + ext),
		ready = false;

	beforeEach(function(done) {
		videoObject.onReady.add(function() {
			ready = true;
			done();
		});
		videoObject.load(file);
	});

	it('should be ready', function(){
		expect(ready).to.be.true;
	});
});

},{"../src/utils/video-object.js":15}]},{},[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])


},{"../src/utils/array-utils.js":2,"../src/utils/asset-loader.js":3,"../src/utils/console-patch.js":4,"../src/utils/css-utils.js":5,"../src/utils/device.js":6,"../src/utils/event-utils.js":7,"../src/utils/linked-list.js":8,"../src/utils/math-utils.js":9,"../src/utils/object-pool.js":10,"../src/utils/ready.js":11,"../src/utils/resize.js":12,"../src/utils/storage-utils.js":13,"../src/utils/string-utils.js":14,"../src/utils/video-object.js":15,"signals":1}],20:[function(require,module,exports){
'use strict';

require('../src/utils/console-patch.js');

describe('console patch', function() {

	it('should be function', function() {
		expect(window.console).to.exist;
		expect(window.console.table).to.exist;
	});

});
},{"../src/utils/console-patch.js":4}],21:[function(require,module,exports){
'use strict';

var CssUtils = require('../src/utils/css-utils.js');

describe('css utils', function() {
	var el = document.createElement('div');
	
	it('should add class to element', function() {
		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('foo');

		CssUtils.addClass(el, 'bar');
		expect(el.className).to.eql('foo bar');

		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('bar foo');

		CssUtils.removeClass(el, 'foo');
		expect(el.className).to.eql('bar');
	});

	it('should remove class from', function() {
				CssUtils.removeClass(el, 'foo');
				expect(el.className).to.eql('bar');
	});

	it('should return true', function() {
				expect(CssUtils.hasClass(el, 'bar')).to.be.true;
	});

	it('should return false', function() {
				expect(CssUtils.hasClass(el, 'foo')).to.be.false;
	});
});

},{"../src/utils/css-utils.js":5}],22:[function(require,module,exports){
'use strict';

var device = require('../src/utils/device.js');

describe('device', function() {
	
	it('should pass', function() {
		expect(device.mobile).to.be.false;
		expect(device.ipad).to.be.false;
		expect(device.iphone).to.be.false;
		expect(device.ipod).to.be.false;
		expect(device.ios).to.be.false;
		expect(device.ios5).to.be.false;
		expect(device.android).to.be.false;
		expect(device.androidOld).to.be.false;
		expect(device.androidStock).to.be.false;
		expect(device.ieVersion).to.eql(-1);
		expect(device.ie9down).to.be.false;
		expect(device.ie8down).to.be.false;
		expect(device.screenWidth).to.eql(window.screen.width);
		expect(device.screenHeight).to.eql(window.screen.height);
		expect(device.dpr).to.eql(1);
		expect(device.ie8down).to.be.false;
	});

});

},{"../src/utils/device.js":6}],23:[function(require,module,exports){
'use strict';

var EventUtils = require('../src/utils/event-utils.js');

describe('event utils', function() {
	var el = document.createElement('div'),
		complete = false;

	function simulateClick(el) {
		var e = document.createEvent('MouseEvents');
		e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		var cancelled = el.dispatchEvent(e);
		return cancelled;
	}

	EventUtils.addEvent(el, 'click', function() {
		complete = true;
	});

	simulateClick(el);
	
	it('should have recived click event', function() {
		expect(complete).to.be.true;
	});
});

},{"../src/utils/event-utils.js":7}],24:[function(require,module,exports){
'use strict';

var LinkedList = require('../src/utils/linked-list.js');

describe('linked list', function() {
	var linkedList = new LinkedList();
	var items = [];

	for (var i = 0; i < 10; i++) {
		items.push(linkedList.add({
			'index': i,
			'next': null,
			'prev': null
		}));
	}
	
	it('should have 10 items', function() {
		expect(linkedList.getCount()).to.eql(10);
	});

	it('should have first', function() {
		expect(linkedList.getFirst()).to.exist;
	});

	it('should have last', function() {
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to iterate', function() {
		var item = linkedList.getFirst();
		while(item.next) {
			expect(item).to.exist;
			expect(item).to.have.property('index');
			item = item.next;
		}
		expect(item).to.eql(linkedList.getLast());
	});

	it('should be able to remove item', function() {
		linkedList.remove(linkedList.getFirst());
		expect(linkedList.getCount()).to.eql(9);
		expect(linkedList.getFirst()).to.exist;

		linkedList.remove(linkedList.getLast());
		expect(linkedList.getCount()).to.eql(8);
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to insert', function() {
		var item = {
			'index': 100,
			'next': null,
			'prev': null
		};
		linkedList.insertBefore(item, linkedList.getFirst());

		expect(linkedList.getCount()).to.eql(9);
		expect(item).to.eql(linkedList.getFirst());
	});
});

},{"../src/utils/linked-list.js":8}],25:[function(require,module,exports){
'use strict';

var MathUtils = require('../src/utils/math-utils.js');

describe('math utils', function() {
	
	it('should pass', function() {
		expect(MathUtils.map(0.75, 0, 1, -100, 100)).to.eql(50);
		expect(MathUtils.lerp(0, 1, 0.5)).to.eql(0.5);
		expect(MathUtils.clamp(100, 0, 50)).to.eql(50);
		expect(MathUtils.random(0, 100)).to.be.within(0,100);
		expect(MathUtils.difference(-20, 20)).to.eql(40);
		expect(MathUtils.distance(0, 0, 1, 1)).to.eql(Math.SQRT2);
		expect(MathUtils.coinToss()).to.be.a('boolean');
		expect(MathUtils.angle(0, 0, -1, 0)).to.eql(Math.PI);
		expect(MathUtils.degrees(Math.PI)).to.eql(180);
		expect(MathUtils.radians(180)).to.eql(Math.PI);
		expect(MathUtils.roundToNearest(96.5, 10)).to.eql(100);
		expect(MathUtils.getIntersectionArea(0, 0, 2, 2, 0, 1, 2, 2)).to.eql(2);
		expect(MathUtils.rotateTo(359, 1)).to.eql(361);
	});

});

},{"../src/utils/math-utils.js":9}],26:[function(require,module,exports){
'use strict';

var ObjectPool = require('../src/utils/object-pool.js');

describe('object pool', function() {
	var newlyCreated = 0;

	function TestOb() {
		newlyCreated ++;
		var id = Math.random();
		return {
			getId: function() {
				return id;
			}
		};
	}

	it('should pass', function(){
		var p = new ObjectPool(TestOb);
		var t = p.get();

		expect(t).to.exist;
		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);

		p.dispose(t);

		expect(p.getPool().length).to.eql(1);
		
		t = p.get();

		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);
		expect(newlyCreated).to.eql(1);

		p.fill(10);
		expect(p.getPool().length).to.eql(10);
		expect(newlyCreated).to.eql(11);

		for(var i = 0; i < 5; i++) {
			t = p.get();
			expect(t.getId()).to.be.a('number');
		}
		expect(p.getPool().length).to.eql(5);
		expect(newlyCreated).to.eql(11);
	});
});

},{"../src/utils/object-pool.js":10}],27:[function(require,module,exports){
'use strict';

var ready = require('../src/utils/ready.js');

describe('ready', function() {
	var isReady = false;
	
	beforeEach(function(done) {
		ready(function() {
			isReady = true;
			done();
		});
	});

	it('should be ready', function(){
		expect(isReady).to.be.true;
	});
});

},{"../src/utils/ready.js":11}],28:[function(require,module,exports){
'use strict';

var resize = require('../src/utils/resize.js');

describe('resize', function() {
	var rect = {
		x: 0,
		y: 0,
		width: 640,
		height: 360
	};

	it('should pass', function(){
		resize(rect, 1920, 720, true, 'fit');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});

		resize(rect, 1920, 720, true, 'fill');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitWidth');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitHeight');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});
	});
});

},{"../src/utils/resize.js":12}],29:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	StorageUtils = require('../src/utils/storage-utils.js');

describe('storage utils', function() {
	var key = 'testData',
		testData = {
			id: 'foo',
			name: 'bar',
			x: 0
		};

	it('should store object and return true', function(){
		var saved = StorageUtils.saveJSON(key, testData);
		expect(saved).to.be.true;
	});

	it('should retrieve stored object', function(){
		var loaded = StorageUtils.loadJSON(key);
		expect(loaded).to.exist;
		expect(loaded.id).to.eql('foo');
		expect(loaded.name).to.eql('bar');
		expect(loaded.x).to.eql(0);
	});

	var loader = new AssetLoader.Loader('http://placekitten.com/g/200/300', 'jpg');
	loader.crossOrigin = true;
	beforeEach(function(done) {
		loader.onComplete.add(function() {
			loader.onComplete.removeAll();
			done();
		});
		loader.start();
	});

	it('should get image data', function(){
		var dataURL = StorageUtils.getImageDataURL(loader.data);
		expect(dataURL.indexOf('data:image/')).to.eql(0);
	});
});

},{"../src/utils/asset-loader.js":3,"../src/utils/storage-utils.js":13}],30:[function(require,module,exports){
'use strict';

var StringUtils = require('../src/utils/string-utils.js');

describe('string utils', function() {

	var str = 'Hello World';

	it('should query', function() {
		expect(StringUtils.contains(str, 'World')).to.be.true;
		expect(StringUtils.countOf(str, 'l')).to.eql(3);
		expect(StringUtils.endsWith(str, 'ld')).to.be.true;
		expect(StringUtils.hasText(str)).to.be.true;
		expect(StringUtils.isEmpty(str)).to.be.false;
		expect(StringUtils.isNumeric(str)).to.be.false;
		expect(StringUtils.isNumeric('68769123214')).to.be.true;
		expect(StringUtils.wordCount(str)).to.eql(2);
		expect(StringUtils.editDistance(str, str)).to.eql(0);
		expect(StringUtils.editDistance(str, str + 'a')).to.eql(1);
		expect(StringUtils.similarity(str, str)).to.eql(1);
	});

	it('should find substr', function() {
		expect(StringUtils.afterFirst(str, 'l')).to.eql('lo World');
		expect(StringUtils.afterLast(str, 'l')).to.eql('d');
		expect(StringUtils.beginsWith(str, 'H')).to.be.true;
		expect(StringUtils.beforeFirst(str, 'l')).to.eql('He');
		expect(StringUtils.beforeLast(str, 'l')).to.eql('Hello Wor');
		expect(StringUtils.between(str, 'H', 'W')).to.eql('ello ');
	});

	it('should format', function() {
		expect(StringUtils.trim('  '+str+'  ')).to.eql('Hello World');
		expect(StringUtils.trimLeft('  '+str+'  ')).to.eql('Hello World  ');
		expect(StringUtils.trimRight('  '+str+'  ')).to.eql('  Hello World');
		expect(StringUtils.padLeft(str, '_', 12)).to.eql('_Hello World');
		expect(StringUtils.padRight(str, '_', 12)).to.eql('Hello World_');
		expect(StringUtils.removeExtraWhitespace('Hello     World')).to.eql('Hello World');
		expect(StringUtils.remove(str, 'll')).to.eql('Heo World');
		// TODO: this sometime acts unexpectedly with shorter strings
		expect(StringUtils.truncate(str, 10)).to.eql('Hello...');
		//expect(StringUtils.truncate(str, 4)).to.eql('Hello...');
		expect(StringUtils.capitalize(str.toLowerCase())).to.eql('Hello world');
		expect(StringUtils.properCase(str.toLowerCase())).to.eql('Hello World');
		expect(StringUtils.reverse(str)).to.eql('dlroW olleH');
		expect(StringUtils.reverseWords(str)).to.eql('World Hello');
		expect(StringUtils.stripTags('<p>'+str+'</p>')).to.eql('Hello World');
		expect(StringUtils.swapCase(str)).to.eql('hello World');
		//expect(StringUtils.block(str)).to.eql('Hello World');
		expect(StringUtils.escapePattern(str + '.')).to.eql('Hello World\\.');
	});
});

},{"../src/utils/string-utils.js":14}],31:[function(require,module,exports){
'use strict';

describe('A test suite', function() {
	beforeEach(function() {
	});
	afterEach(function() {
	});

	it('should fail', function() {
		expect(true).to.be.true;
	});
});

},{}],32:[function(require,module,exports){
'use strict';

var VideoObject = require('../src/utils/video-object.js');

describe('video object', function() {
	var videoObject = new VideoObject(),
		el = document.createElement('video'),
		ext = (el.canPlayType('video/mp4;') ? 'mp4' : 'ogv'),
		file = ('http://techslides.com/demos/sample-videos/small.' + ext),
		ready = false;

	beforeEach(function(done) {
		videoObject.onReady.add(function() {
			ready = true;
			done();
		});
		videoObject.load(file);
	});

	it('should be ready', function(){
		expect(ready).to.be.true;
	});
});

},{"../src/utils/video-object.js":15}]},{},[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])


},{"../src/utils/array-utils.js":2,"../src/utils/asset-loader.js":3,"../src/utils/console-patch.js":4,"../src/utils/css-utils.js":5,"../src/utils/device.js":6,"../src/utils/event-utils.js":7,"../src/utils/linked-list.js":8,"../src/utils/math-utils.js":9,"../src/utils/object-pool.js":10,"../src/utils/ready.js":11,"../src/utils/resize.js":12,"../src/utils/storage-utils.js":13,"../src/utils/string-utils.js":14,"../src/utils/video-object.js":15,"signals":1}],20:[function(require,module,exports){
'use strict';

require('../src/utils/console-patch.js');

describe('console patch', function() {

	it('should be function', function() {
		expect(window.console).to.exist;
		expect(window.console.table).to.exist;
	});

});
},{"../src/utils/console-patch.js":4}],21:[function(require,module,exports){
'use strict';

var CssUtils = require('../src/utils/css-utils.js');

describe('css utils', function() {
	var el = document.createElement('div');
	
	it('should add class to element', function() {
		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('foo');

		CssUtils.addClass(el, 'bar');
		expect(el.className).to.eql('foo bar');

		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('bar foo');

		CssUtils.removeClass(el, 'foo');
		expect(el.className).to.eql('bar');
	});

	it('should remove class from', function() {
				CssUtils.removeClass(el, 'foo');
				expect(el.className).to.eql('bar');
	});

	it('should return true', function() {
				expect(CssUtils.hasClass(el, 'bar')).to.be.true;
	});

	it('should return false', function() {
				expect(CssUtils.hasClass(el, 'foo')).to.be.false;
	});
});

},{"../src/utils/css-utils.js":5}],22:[function(require,module,exports){
'use strict';

var device = require('../src/utils/device.js');

describe('device', function() {
	
	it('should pass', function() {
		expect(device.mobile).to.be.false;
		expect(device.ipad).to.be.false;
		expect(device.iphone).to.be.false;
		expect(device.ipod).to.be.false;
		expect(device.ios).to.be.false;
		expect(device.ios5).to.be.false;
		expect(device.android).to.be.false;
		expect(device.androidOld).to.be.false;
		expect(device.androidStock).to.be.false;
		expect(device.ieVersion).to.eql(-1);
		expect(device.ie9down).to.be.false;
		expect(device.ie8down).to.be.false;
		expect(device.screenWidth).to.eql(window.screen.width);
		expect(device.screenHeight).to.eql(window.screen.height);
		expect(device.dpr).to.eql(1);
		expect(device.ie8down).to.be.false;
	});

});

},{"../src/utils/device.js":6}],23:[function(require,module,exports){
'use strict';

var EventUtils = require('../src/utils/event-utils.js');

describe('event utils', function() {
	var el = document.createElement('div'),
		complete = false;

	function simulateClick(el) {
		var e = document.createEvent('MouseEvents');
		e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		var cancelled = el.dispatchEvent(e);
		return cancelled;
	}

	EventUtils.addEvent(el, 'click', function() {
		complete = true;
	});

	simulateClick(el);
	
	it('should have recived click event', function() {
		expect(complete).to.be.true;
	});
});

},{"../src/utils/event-utils.js":7}],24:[function(require,module,exports){
'use strict';

var LinkedList = require('../src/utils/linked-list.js');

describe('linked list', function() {
	var linkedList = new LinkedList();
	var items = [];

	for (var i = 0; i < 10; i++) {
		items.push(linkedList.add({
			'index': i,
			'next': null,
			'prev': null
		}));
	}
	
	it('should have 10 items', function() {
		expect(linkedList.getCount()).to.eql(10);
	});

	it('should have first', function() {
		expect(linkedList.getFirst()).to.exist;
	});

	it('should have last', function() {
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to iterate', function() {
		var item = linkedList.getFirst();
		while(item.next) {
			expect(item).to.exist;
			expect(item).to.have.property('index');
			item = item.next;
		}
		expect(item).to.eql(linkedList.getLast());
	});

	it('should be able to remove item', function() {
		linkedList.remove(linkedList.getFirst());
		expect(linkedList.getCount()).to.eql(9);
		expect(linkedList.getFirst()).to.exist;

		linkedList.remove(linkedList.getLast());
		expect(linkedList.getCount()).to.eql(8);
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to insert', function() {
		var item = {
			'index': 100,
			'next': null,
			'prev': null
		};
		linkedList.insertBefore(item, linkedList.getFirst());

		expect(linkedList.getCount()).to.eql(9);
		expect(item).to.eql(linkedList.getFirst());
	});
});

},{"../src/utils/linked-list.js":8}],25:[function(require,module,exports){
'use strict';

var MathUtils = require('../src/utils/math-utils.js');

describe('math utils', function() {
	
	it('should pass', function() {
		expect(MathUtils.map(0.75, 0, 1, -100, 100)).to.eql(50);
		expect(MathUtils.lerp(0, 1, 0.5)).to.eql(0.5);
		expect(MathUtils.clamp(100, 0, 50)).to.eql(50);
		expect(MathUtils.random(0, 100)).to.be.within(0,100);
		expect(MathUtils.difference(-20, 20)).to.eql(40);
		expect(MathUtils.distance(0, 0, 1, 1)).to.eql(Math.SQRT2);
		expect(MathUtils.coinToss()).to.be.a('boolean');
		expect(MathUtils.angle(0, 0, -1, 0)).to.eql(Math.PI);
		expect(MathUtils.degrees(Math.PI)).to.eql(180);
		expect(MathUtils.radians(180)).to.eql(Math.PI);
		expect(MathUtils.roundToNearest(96.5, 10)).to.eql(100);
		expect(MathUtils.getIntersectionArea(0, 0, 2, 2, 0, 1, 2, 2)).to.eql(2);
		expect(MathUtils.rotateTo(359, 1)).to.eql(361);
	});

});

},{"../src/utils/math-utils.js":9}],26:[function(require,module,exports){
'use strict';

var ObjectPool = require('../src/utils/object-pool.js');

describe('object pool', function() {
	var newlyCreated = 0;

	function TestOb() {
		newlyCreated ++;
		var id = Math.random();
		return {
			getId: function() {
				return id;
			}
		};
	}

	it('should pass', function(){
		var p = new ObjectPool(TestOb);
		var t = p.get();

		expect(t).to.exist;
		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);

		p.dispose(t);

		expect(p.getPool().length).to.eql(1);
		
		t = p.get();

		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);
		expect(newlyCreated).to.eql(1);

		p.fill(10);
		expect(p.getPool().length).to.eql(10);
		expect(newlyCreated).to.eql(11);

		for(var i = 0; i < 5; i++) {
			t = p.get();
			expect(t.getId()).to.be.a('number');
		}
		expect(p.getPool().length).to.eql(5);
		expect(newlyCreated).to.eql(11);
	});
});

},{"../src/utils/object-pool.js":10}],27:[function(require,module,exports){
'use strict';

var ready = require('../src/utils/ready.js');

describe('ready', function() {
	var isReady = false;
	
	beforeEach(function(done) {
		ready(function() {
			isReady = true;
			done();
		});
	});

	it('should be ready', function(){
		expect(isReady).to.be.true;
	});
});

},{"../src/utils/ready.js":11}],28:[function(require,module,exports){
'use strict';

var resize = require('../src/utils/resize.js');

describe('resize', function() {
	var rect = {
		x: 0,
		y: 0,
		width: 640,
		height: 360
	};

	it('should pass', function(){
		resize(rect, 1920, 720, true, 'fit');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});

		resize(rect, 1920, 720, true, 'fill');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitWidth');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitHeight');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});
	});
});

},{"../src/utils/resize.js":12}],29:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	StorageUtils = require('../src/utils/storage-utils.js');

describe('storage utils', function() {
	var key = 'testData',
		testData = {
			id: 'foo',
			name: 'bar',
			x: 0
		};

	it('should store object and return true', function(){
		var saved = StorageUtils.saveJSON(key, testData);
		expect(saved).to.be.true;
	});

	it('should retrieve stored object', function(){
		var loaded = StorageUtils.loadJSON(key);
		expect(loaded).to.exist;
		expect(loaded.id).to.eql('foo');
		expect(loaded.name).to.eql('bar');
		expect(loaded.x).to.eql(0);
	});

	var loader = new AssetLoader.Loader('http://placekitten.com/g/200/300', 'jpg');
	loader.crossOrigin = true;
	beforeEach(function(done) {
		loader.onComplete.add(function() {
			loader.onComplete.removeAll();
			done();
		});
		loader.start();
	});

	it('should get image data', function(){
		var dataURL = StorageUtils.getImageDataURL(loader.data);
		expect(dataURL.indexOf('data:image/')).to.eql(0);
	});
});

},{"../src/utils/asset-loader.js":3,"../src/utils/storage-utils.js":13}],30:[function(require,module,exports){
'use strict';

var StringUtils = require('../src/utils/string-utils.js');

describe('string utils', function() {

	var str = 'Hello World';

	it('should query', function() {
		expect(StringUtils.contains(str, 'World')).to.be.true;
		expect(StringUtils.countOf(str, 'l')).to.eql(3);
		expect(StringUtils.endsWith(str, 'ld')).to.be.true;
		expect(StringUtils.hasText(str)).to.be.true;
		expect(StringUtils.isEmpty(str)).to.be.false;
		expect(StringUtils.isNumeric(str)).to.be.false;
		expect(StringUtils.isNumeric('68769123214')).to.be.true;
		expect(StringUtils.wordCount(str)).to.eql(2);
		expect(StringUtils.editDistance(str, str)).to.eql(0);
		expect(StringUtils.editDistance(str, str + 'a')).to.eql(1);
		expect(StringUtils.similarity(str, str)).to.eql(1);
	});

	it('should find substr', function() {
		expect(StringUtils.afterFirst(str, 'l')).to.eql('lo World');
		expect(StringUtils.afterLast(str, 'l')).to.eql('d');
		expect(StringUtils.beginsWith(str, 'H')).to.be.true;
		expect(StringUtils.beforeFirst(str, 'l')).to.eql('He');
		expect(StringUtils.beforeLast(str, 'l')).to.eql('Hello Wor');
		expect(StringUtils.between(str, 'H', 'W')).to.eql('ello ');
	});

	it('should format', function() {
		expect(StringUtils.trim('  '+str+'  ')).to.eql('Hello World');
		expect(StringUtils.trimLeft('  '+str+'  ')).to.eql('Hello World  ');
		expect(StringUtils.trimRight('  '+str+'  ')).to.eql('  Hello World');
		expect(StringUtils.padLeft(str, '_', 12)).to.eql('_Hello World');
		expect(StringUtils.padRight(str, '_', 12)).to.eql('Hello World_');
		expect(StringUtils.removeExtraWhitespace('Hello     World')).to.eql('Hello World');
		expect(StringUtils.remove(str, 'll')).to.eql('Heo World');
		// TODO: this sometime acts unexpectedly with shorter strings
		expect(StringUtils.truncate(str, 10)).to.eql('Hello...');
		//expect(StringUtils.truncate(str, 4)).to.eql('Hello...');
		expect(StringUtils.capitalize(str.toLowerCase())).to.eql('Hello world');
		expect(StringUtils.properCase(str.toLowerCase())).to.eql('Hello World');
		expect(StringUtils.reverse(str)).to.eql('dlroW olleH');
		expect(StringUtils.reverseWords(str)).to.eql('World Hello');
		expect(StringUtils.stripTags('<p>'+str+'</p>')).to.eql('Hello World');
		expect(StringUtils.swapCase(str)).to.eql('hello World');
		//expect(StringUtils.block(str)).to.eql('Hello World');
		expect(StringUtils.escapePattern(str + '.')).to.eql('Hello World\\.');
	});
});

},{"../src/utils/string-utils.js":14}],31:[function(require,module,exports){
'use strict';

describe('A test suite', function() {
	beforeEach(function() {
	});
	afterEach(function() {
	});

	it('should fail', function() {
		expect(true).to.be.true;
	});
});

},{}],32:[function(require,module,exports){
'use strict';

var VideoObject = require('../src/utils/video-object.js');

describe('video object', function() {
	var videoObject = new VideoObject(),
		el = document.createElement('video'),
		ext = (el.canPlayType('video/mp4;') ? 'mp4' : 'ogv'),
		file = ('http://techslides.com/demos/sample-videos/small.' + ext),
		ready = false;

	beforeEach(function(done) {
		videoObject.onReady.add(function() {
			ready = true;
			done();
		});
		videoObject.load(file);
	});

	it('should be ready', function(){
		expect(ready).to.be.true;
	});
});

},{"../src/utils/video-object.js":15}]},{},[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])


},{"../src/utils/array-utils.js":2,"../src/utils/asset-loader.js":3,"../src/utils/console-patch.js":4,"../src/utils/css-utils.js":5,"../src/utils/device.js":6,"../src/utils/event-utils.js":7,"../src/utils/linked-list.js":8,"../src/utils/math-utils.js":9,"../src/utils/object-pool.js":10,"../src/utils/ready.js":11,"../src/utils/resize.js":12,"../src/utils/storage-utils.js":13,"../src/utils/string-utils.js":14,"../src/utils/video-object.js":15,"signals":1}],20:[function(require,module,exports){
'use strict';

require('../src/utils/console-patch.js');

describe('console patch', function() {

	it('should be function', function() {
		expect(window.console).to.exist;
		expect(window.console.table).to.exist;
	});

});
},{"../src/utils/console-patch.js":4}],21:[function(require,module,exports){
'use strict';

var CssUtils = require('../src/utils/css-utils.js');

describe('css utils', function() {
	var el = document.createElement('div');
	
	it('should add class to element', function() {
		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('foo');

		CssUtils.addClass(el, 'bar');
		expect(el.className).to.eql('foo bar');

		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('bar foo');

		CssUtils.removeClass(el, 'foo');
		expect(el.className).to.eql('bar');
	});

	it('should remove class from', function() {
				CssUtils.removeClass(el, 'foo');
				expect(el.className).to.eql('bar');
	});

	it('should return true', function() {
				expect(CssUtils.hasClass(el, 'bar')).to.be.true;
	});

	it('should return false', function() {
				expect(CssUtils.hasClass(el, 'foo')).to.be.false;
	});
});

},{"../src/utils/css-utils.js":5}],22:[function(require,module,exports){
'use strict';

var device = require('../src/utils/device.js');

describe('device', function() {
	
	it('should pass', function() {
		expect(device.mobile).to.be.false;
		expect(device.ipad).to.be.false;
		expect(device.iphone).to.be.false;
		expect(device.ipod).to.be.false;
		expect(device.ios).to.be.false;
		expect(device.ios5).to.be.false;
		expect(device.android).to.be.false;
		expect(device.androidOld).to.be.false;
		expect(device.androidStock).to.be.false;
		expect(device.ieVersion).to.eql(-1);
		expect(device.ie9down).to.be.false;
		expect(device.ie8down).to.be.false;
		expect(device.screenWidth).to.eql(window.screen.width);
		expect(device.screenHeight).to.eql(window.screen.height);
		expect(device.dpr).to.eql(1);
		expect(device.ie8down).to.be.false;
	});

});

},{"../src/utils/device.js":6}],23:[function(require,module,exports){
'use strict';

var EventUtils = require('../src/utils/event-utils.js');

describe('event utils', function() {
	var el = document.createElement('div'),
		complete = false;

	function simulateClick(el) {
		var e = document.createEvent('MouseEvents');
		e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		var cancelled = el.dispatchEvent(e);
		return cancelled;
	}

	EventUtils.addEvent(el, 'click', function() {
		complete = true;
	});

	simulateClick(el);
	
	it('should have recived click event', function() {
		expect(complete).to.be.true;
	});
});

},{"../src/utils/event-utils.js":7}],24:[function(require,module,exports){
'use strict';

var LinkedList = require('../src/utils/linked-list.js');

describe('linked list', function() {
	var linkedList = new LinkedList();
	var items = [];

	for (var i = 0; i < 10; i++) {
		items.push(linkedList.add({
			'index': i,
			'next': null,
			'prev': null
		}));
	}
	
	it('should have 10 items', function() {
		expect(linkedList.getCount()).to.eql(10);
	});

	it('should have first', function() {
		expect(linkedList.getFirst()).to.exist;
	});

	it('should have last', function() {
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to iterate', function() {
		var item = linkedList.getFirst();
		while(item.next) {
			expect(item).to.exist;
			expect(item).to.have.property('index');
			item = item.next;
		}
		expect(item).to.eql(linkedList.getLast());
	});

	it('should be able to remove item', function() {
		linkedList.remove(linkedList.getFirst());
		expect(linkedList.getCount()).to.eql(9);
		expect(linkedList.getFirst()).to.exist;

		linkedList.remove(linkedList.getLast());
		expect(linkedList.getCount()).to.eql(8);
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to insert', function() {
		var item = {
			'index': 100,
			'next': null,
			'prev': null
		};
		linkedList.insertBefore(item, linkedList.getFirst());

		expect(linkedList.getCount()).to.eql(9);
		expect(item).to.eql(linkedList.getFirst());
	});
});

},{"../src/utils/linked-list.js":8}],25:[function(require,module,exports){
'use strict';

var MathUtils = require('../src/utils/math-utils.js');

describe('math utils', function() {
	
	it('should pass', function() {
		expect(MathUtils.map(0.75, 0, 1, -100, 100)).to.eql(50);
		expect(MathUtils.lerp(0, 1, 0.5)).to.eql(0.5);
		expect(MathUtils.clamp(100, 0, 50)).to.eql(50);
		expect(MathUtils.random(0, 100)).to.be.within(0,100);
		expect(MathUtils.difference(-20, 20)).to.eql(40);
		expect(MathUtils.distance(0, 0, 1, 1)).to.eql(Math.SQRT2);
		expect(MathUtils.coinToss()).to.be.a('boolean');
		expect(MathUtils.angle(0, 0, -1, 0)).to.eql(Math.PI);
		expect(MathUtils.degrees(Math.PI)).to.eql(180);
		expect(MathUtils.radians(180)).to.eql(Math.PI);
		expect(MathUtils.roundToNearest(96.5, 10)).to.eql(100);
		expect(MathUtils.getIntersectionArea(0, 0, 2, 2, 0, 1, 2, 2)).to.eql(2);
		expect(MathUtils.rotateTo(359, 1)).to.eql(361);
	});

});

},{"../src/utils/math-utils.js":9}],26:[function(require,module,exports){
'use strict';

var ObjectPool = require('../src/utils/object-pool.js');

describe('object pool', function() {
	var newlyCreated = 0;

	function TestOb() {
		newlyCreated ++;
		var id = Math.random();
		return {
			getId: function() {
				return id;
			}
		};
	}

	it('should pass', function(){
		var p = new ObjectPool(TestOb);
		var t = p.get();

		expect(t).to.exist;
		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);

		p.dispose(t);

		expect(p.getPool().length).to.eql(1);
		
		t = p.get();

		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);
		expect(newlyCreated).to.eql(1);

		p.fill(10);
		expect(p.getPool().length).to.eql(10);
		expect(newlyCreated).to.eql(11);

		for(var i = 0; i < 5; i++) {
			t = p.get();
			expect(t.getId()).to.be.a('number');
		}
		expect(p.getPool().length).to.eql(5);
		expect(newlyCreated).to.eql(11);
	});
});

},{"../src/utils/object-pool.js":10}],27:[function(require,module,exports){
'use strict';

var ready = require('../src/utils/ready.js');

describe('ready', function() {
	var isReady = false;
	
	beforeEach(function(done) {
		ready(function() {
			isReady = true;
			done();
		});
	});

	it('should be ready', function(){
		expect(isReady).to.be.true;
	});
});

},{"../src/utils/ready.js":11}],28:[function(require,module,exports){
'use strict';

var resize = require('../src/utils/resize.js');

describe('resize', function() {
	var rect = {
		x: 0,
		y: 0,
		width: 640,
		height: 360
	};

	it('should pass', function(){
		resize(rect, 1920, 720, true, 'fit');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});

		resize(rect, 1920, 720, true, 'fill');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitWidth');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitHeight');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});
	});
});

},{"../src/utils/resize.js":12}],29:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	StorageUtils = require('../src/utils/storage-utils.js');

describe('storage utils', function() {
	var key = 'testData',
		testData = {
			id: 'foo',
			name: 'bar',
			x: 0
		};

	it('should store object and return true', function(){
		var saved = StorageUtils.saveJSON(key, testData);
		expect(saved).to.be.true;
	});

	it('should retrieve stored object', function(){
		var loaded = StorageUtils.loadJSON(key);
		expect(loaded).to.exist;
		expect(loaded.id).to.eql('foo');
		expect(loaded.name).to.eql('bar');
		expect(loaded.x).to.eql(0);
	});

	var loader = new AssetLoader.Loader('http://placekitten.com/g/200/300', 'jpg');
	loader.crossOrigin = true;
	beforeEach(function(done) {
		loader.onComplete.add(function() {
			loader.onComplete.removeAll();
			done();
		});
		loader.start();
	});

	it('should get image data', function(){
		var dataURL = StorageUtils.getImageDataURL(loader.data);
		expect(dataURL.indexOf('data:image/')).to.eql(0);
	});
});

},{"../src/utils/asset-loader.js":3,"../src/utils/storage-utils.js":13}],30:[function(require,module,exports){
'use strict';

var StringUtils = require('../src/utils/string-utils.js');

describe('string utils', function() {

	var str = 'Hello World';

	it('should query', function() {
		expect(StringUtils.contains(str, 'World')).to.be.true;
		expect(StringUtils.countOf(str, 'l')).to.eql(3);
		expect(StringUtils.endsWith(str, 'ld')).to.be.true;
		expect(StringUtils.hasText(str)).to.be.true;
		expect(StringUtils.isEmpty(str)).to.be.false;
		expect(StringUtils.isNumeric(str)).to.be.false;
		expect(StringUtils.isNumeric('68769123214')).to.be.true;
		expect(StringUtils.wordCount(str)).to.eql(2);
		expect(StringUtils.editDistance(str, str)).to.eql(0);
		expect(StringUtils.editDistance(str, str + 'a')).to.eql(1);
		expect(StringUtils.similarity(str, str)).to.eql(1);
	});

	it('should find substr', function() {
		expect(StringUtils.afterFirst(str, 'l')).to.eql('lo World');
		expect(StringUtils.afterLast(str, 'l')).to.eql('d');
		expect(StringUtils.beginsWith(str, 'H')).to.be.true;
		expect(StringUtils.beforeFirst(str, 'l')).to.eql('He');
		expect(StringUtils.beforeLast(str, 'l')).to.eql('Hello Wor');
		expect(StringUtils.between(str, 'H', 'W')).to.eql('ello ');
	});

	it('should format', function() {
		expect(StringUtils.trim('  '+str+'  ')).to.eql('Hello World');
		expect(StringUtils.trimLeft('  '+str+'  ')).to.eql('Hello World  ');
		expect(StringUtils.trimRight('  '+str+'  ')).to.eql('  Hello World');
		expect(StringUtils.padLeft(str, '_', 12)).to.eql('_Hello World');
		expect(StringUtils.padRight(str, '_', 12)).to.eql('Hello World_');
		expect(StringUtils.removeExtraWhitespace('Hello     World')).to.eql('Hello World');
		expect(StringUtils.remove(str, 'll')).to.eql('Heo World');
		// TODO: this sometime acts unexpectedly with shorter strings
		expect(StringUtils.truncate(str, 10)).to.eql('Hello...');
		//expect(StringUtils.truncate(str, 4)).to.eql('Hello...');
		expect(StringUtils.capitalize(str.toLowerCase())).to.eql('Hello world');
		expect(StringUtils.properCase(str.toLowerCase())).to.eql('Hello World');
		expect(StringUtils.reverse(str)).to.eql('dlroW olleH');
		expect(StringUtils.reverseWords(str)).to.eql('World Hello');
		expect(StringUtils.stripTags('<p>'+str+'</p>')).to.eql('Hello World');
		expect(StringUtils.swapCase(str)).to.eql('hello World');
		//expect(StringUtils.block(str)).to.eql('Hello World');
		expect(StringUtils.escapePattern(str + '.')).to.eql('Hello World\\.');
	});
});

},{"../src/utils/string-utils.js":14}],31:[function(require,module,exports){
'use strict';

describe('A test suite', function() {
	beforeEach(function() {
	});
	afterEach(function() {
	});

	it('should fail', function() {
		expect(true).to.be.true;
	});
});

},{}],32:[function(require,module,exports){
'use strict';

var VideoObject = require('../src/utils/video-object.js');

describe('video object', function() {
	var videoObject = new VideoObject(),
		el = document.createElement('video'),
		ext = (el.canPlayType('video/mp4;') ? 'mp4' : 'ogv'),
		file = ('http://techslides.com/demos/sample-videos/small.' + ext),
		ready = false;

	beforeEach(function(done) {
		videoObject.onReady.add(function() {
			ready = true;
			done();
		});
		videoObject.load(file);
	});

	it('should be ready', function(){
		expect(ready).to.be.true;
	});
});

},{"../src/utils/video-object.js":15}]},{},[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])


},{"../src/utils/array-utils.js":2,"../src/utils/asset-loader.js":3,"../src/utils/console-patch.js":4,"../src/utils/css-utils.js":5,"../src/utils/device.js":6,"../src/utils/event-utils.js":7,"../src/utils/linked-list.js":8,"../src/utils/math-utils.js":9,"../src/utils/object-pool.js":10,"../src/utils/ready.js":11,"../src/utils/resize.js":12,"../src/utils/storage-utils.js":13,"../src/utils/string-utils.js":14,"../src/utils/video-object.js":15,"signals":1}],20:[function(require,module,exports){
'use strict';

require('../src/utils/console-patch.js');

describe('console patch', function() {

	it('should be function', function() {
		expect(window.console).to.exist;
		expect(window.console.table).to.exist;
	});

});
},{"../src/utils/console-patch.js":4}],21:[function(require,module,exports){
'use strict';

var CssUtils = require('../src/utils/css-utils.js');

describe('css utils', function() {
	var el = document.createElement('div');
	
	it('should add class to element', function() {
		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('foo');

		CssUtils.addClass(el, 'bar');
		expect(el.className).to.eql('foo bar');

		CssUtils.addClass(el, 'foo');
		expect(el.className).to.eql('bar foo');

		CssUtils.removeClass(el, 'foo');
		expect(el.className).to.eql('bar');
	});

	it('should remove class from', function() {
				CssUtils.removeClass(el, 'foo');
				expect(el.className).to.eql('bar');
	});

	it('should return true', function() {
				expect(CssUtils.hasClass(el, 'bar')).to.be.true;
	});

	it('should return false', function() {
				expect(CssUtils.hasClass(el, 'foo')).to.be.false;
	});
});

},{"../src/utils/css-utils.js":5}],22:[function(require,module,exports){
'use strict';

var device = require('../src/utils/device.js');

describe('device', function() {
	
	it('should pass', function() {
		expect(device.mobile).to.be.false;
		expect(device.ipad).to.be.false;
		expect(device.iphone).to.be.false;
		expect(device.ipod).to.be.false;
		expect(device.ios).to.be.false;
		expect(device.ios5).to.be.false;
		expect(device.android).to.be.false;
		expect(device.androidOld).to.be.false;
		expect(device.androidStock).to.be.false;
		expect(device.ieVersion).to.eql(-1);
		expect(device.ie9down).to.be.false;
		expect(device.ie8down).to.be.false;
		expect(device.screenWidth).to.eql(window.screen.width);
		expect(device.screenHeight).to.eql(window.screen.height);
		expect(device.dpr).to.eql(1);
		expect(device.ie8down).to.be.false;
	});

});

},{"../src/utils/device.js":6}],23:[function(require,module,exports){
'use strict';

var EventUtils = require('../src/utils/event-utils.js');

describe('event utils', function() {
	var el = document.createElement('div'),
		complete = false;

	function simulateClick(el) {
		var e = document.createEvent('MouseEvents');
		e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		var cancelled = el.dispatchEvent(e);
		return cancelled;
	}

	EventUtils.addEvent(el, 'click', function() {
		complete = true;
	});

	simulateClick(el);
	
	it('should have recived click event', function() {
		expect(complete).to.be.true;
	});
});

},{"../src/utils/event-utils.js":7}],24:[function(require,module,exports){
'use strict';

var LinkedList = require('../src/utils/linked-list.js');

describe('linked list', function() {
	var linkedList = new LinkedList();
	var items = [];

	for (var i = 0; i < 10; i++) {
		items.push(linkedList.add({
			'index': i,
			'next': null,
			'prev': null
		}));
	}
	
	it('should have 10 items', function() {
		expect(linkedList.getCount()).to.eql(10);
	});

	it('should have first', function() {
		expect(linkedList.getFirst()).to.exist;
	});

	it('should have last', function() {
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to iterate', function() {
		var item = linkedList.getFirst();
		while(item.next) {
			expect(item).to.exist;
			expect(item).to.have.property('index');
			item = item.next;
		}
		expect(item).to.eql(linkedList.getLast());
	});

	it('should be able to remove item', function() {
		linkedList.remove(linkedList.getFirst());
		expect(linkedList.getCount()).to.eql(9);
		expect(linkedList.getFirst()).to.exist;

		linkedList.remove(linkedList.getLast());
		expect(linkedList.getCount()).to.eql(8);
		expect(linkedList.getLast()).to.exist;
	});

	it('should be able to insert', function() {
		var item = {
			'index': 100,
			'next': null,
			'prev': null
		};
		linkedList.insertBefore(item, linkedList.getFirst());

		expect(linkedList.getCount()).to.eql(9);
		expect(item).to.eql(linkedList.getFirst());
	});
});

},{"../src/utils/linked-list.js":8}],25:[function(require,module,exports){
'use strict';

var MathUtils = require('../src/utils/math-utils.js');

describe('math utils', function() {
	
	it('should pass', function() {
		expect(MathUtils.map(0.75, 0, 1, -100, 100)).to.eql(50);
		expect(MathUtils.lerp(0, 1, 0.5)).to.eql(0.5);
		expect(MathUtils.clamp(100, 0, 50)).to.eql(50);
		expect(MathUtils.random(0, 100)).to.be.within(0,100);
		expect(MathUtils.difference(-20, 20)).to.eql(40);
		expect(MathUtils.distance(0, 0, 1, 1)).to.eql(Math.SQRT2);
		expect(MathUtils.coinToss()).to.be.a('boolean');
		expect(MathUtils.angle(0, 0, -1, 0)).to.eql(Math.PI);
		expect(MathUtils.degrees(Math.PI)).to.eql(180);
		expect(MathUtils.radians(180)).to.eql(Math.PI);
		expect(MathUtils.roundToNearest(96.5, 10)).to.eql(100);
		expect(MathUtils.getIntersectionArea(0, 0, 2, 2, 0, 1, 2, 2)).to.eql(2);
		expect(MathUtils.rotateTo(359, 1)).to.eql(361);
	});

});

},{"../src/utils/math-utils.js":9}],26:[function(require,module,exports){
'use strict';

var ObjectPool = require('../src/utils/object-pool.js');

describe('object pool', function() {
	var newlyCreated = 0;

	function TestOb() {
		newlyCreated ++;
		var id = Math.random();
		return {
			getId: function() {
				return id;
			}
		};
	}

	it('should pass', function(){
		var p = new ObjectPool(TestOb);
		var t = p.get();

		expect(t).to.exist;
		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);

		p.dispose(t);

		expect(p.getPool().length).to.eql(1);
		
		t = p.get();

		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);
		expect(newlyCreated).to.eql(1);

		p.fill(10);
		expect(p.getPool().length).to.eql(10);
		expect(newlyCreated).to.eql(11);

		for(var i = 0; i < 5; i++) {
			t = p.get();
			expect(t.getId()).to.be.a('number');
		}
		expect(p.getPool().length).to.eql(5);
		expect(newlyCreated).to.eql(11);
	});
});

},{"../src/utils/object-pool.js":10}],27:[function(require,module,exports){
'use strict';

var ready = require('../src/utils/ready.js');

describe('ready', function() {
	var isReady = false;
	
	beforeEach(function(done) {
		ready(function() {
			isReady = true;
			done();
		});
	});

	it('should be ready', function(){
		expect(isReady).to.be.true;
	});
});

},{"../src/utils/ready.js":11}],28:[function(require,module,exports){
'use strict';

var resize = require('../src/utils/resize.js');

describe('resize', function() {
	var rect = {
		x: 0,
		y: 0,
		width: 640,
		height: 360
	};

	it('should pass', function(){
		resize(rect, 1920, 720, true, 'fit');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});

		resize(rect, 1920, 720, true, 'fill');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitWidth');
		expect(rect).to.eql({
			x: 0,
			y: -180,
			width: 1920,
			height: 1080
		});

		resize(rect, 1920, 720, true, 'fitHeight');
		expect(rect).to.eql({
			x: 320,
			y: 0,
			width: 1280,
			height: 720
		});
	});
});

},{"../src/utils/resize.js":12}],29:[function(require,module,exports){
'use strict';

var AssetLoader = require('../src/utils/asset-loader.js'),
	StorageUtils = require('../src/utils/storage-utils.js');

describe('storage utils', function() {
	var key = 'testData',
		testData = {
			id: 'foo',
			name: 'bar',
			x: 0
		};

	it('should store object and return true', function(){
		var saved = StorageUtils.saveJSON(key, testData);
		expect(saved).to.be.true;
	});

	it('should retrieve stored object', function(){
		var loaded = StorageUtils.loadJSON(key);
		expect(loaded).to.exist;
		expect(loaded.id).to.eql('foo');
		expect(loaded.name).to.eql('bar');
		expect(loaded.x).to.eql(0);
	});

	var loader = new AssetLoader.Loader('http://placekitten.com/g/200/300', 'jpg');
	loader.crossOrigin = true;
	beforeEach(function(done) {
		loader.onComplete.add(function() {
			loader.onComplete.removeAll();
			done();
		});
		loader.start();
	});

	it('should get image data', function(){
		var dataURL = StorageUtils.getImageDataURL(loader.data);
		expect(dataURL.indexOf('data:image/')).to.eql(0);
	});
});

},{"../src/utils/asset-loader.js":3,"../src/utils/storage-utils.js":13}],30:[function(require,module,exports){
'use strict';

var StringUtils = require('../src/utils/string-utils.js');

describe('string utils', function() {

	var str = 'Hello World';

	it('should query', function() {
		expect(StringUtils.contains(str, 'World')).to.be.true;
		expect(StringUtils.countOf(str, 'l')).to.eql(3);
		expect(StringUtils.endsWith(str, 'ld')).to.be.true;
		expect(StringUtils.hasText(str)).to.be.true;
		expect(StringUtils.isEmpty(str)).to.be.false;
		expect(StringUtils.isNumeric(str)).to.be.false;
		expect(StringUtils.isNumeric('68769123214')).to.be.true;
		expect(StringUtils.wordCount(str)).to.eql(2);
		expect(StringUtils.editDistance(str, str)).to.eql(0);
		expect(StringUtils.editDistance(str, str + 'a')).to.eql(1);
		expect(StringUtils.similarity(str, str)).to.eql(1);
	});

	it('should find substr', function() {
		expect(StringUtils.afterFirst(str, 'l')).to.eql('lo World');
		expect(StringUtils.afterLast(str, 'l')).to.eql('d');
		expect(StringUtils.beginsWith(str, 'H')).to.be.true;
		expect(StringUtils.beforeFirst(str, 'l')).to.eql('He');
		expect(StringUtils.beforeLast(str, 'l')).to.eql('Hello Wor');
		expect(StringUtils.between(str, 'H', 'W')).to.eql('ello ');
	});

	it('should format', function() {
		expect(StringUtils.trim('  '+str+'  ')).to.eql('Hello World');
		expect(StringUtils.trimLeft('  '+str+'  ')).to.eql('Hello World  ');
		expect(StringUtils.trimRight('  '+str+'  ')).to.eql('  Hello World');
		expect(StringUtils.padLeft(str, '_', 12)).to.eql('_Hello World');
		expect(StringUtils.padRight(str, '_', 12)).to.eql('Hello World_');
		expect(StringUtils.removeExtraWhitespace('Hello     World')).to.eql('Hello World');
		expect(StringUtils.remove(str, 'll')).to.eql('Heo World');
		// TODO: this sometime acts unexpectedly with shorter strings
		expect(StringUtils.truncate(str, 10)).to.eql('Hello...');
		//expect(StringUtils.truncate(str, 4)).to.eql('Hello...');
		expect(StringUtils.capitalize(str.toLowerCase())).to.eql('Hello world');
		expect(StringUtils.properCase(str.toLowerCase())).to.eql('Hello World');
		expect(StringUtils.reverse(str)).to.eql('dlroW olleH');
		expect(StringUtils.reverseWords(str)).to.eql('World Hello');
		expect(StringUtils.stripTags('<p>'+str+'</p>')).to.eql('Hello World');
		expect(StringUtils.swapCase(str)).to.eql('hello World');
		//expect(StringUtils.block(str)).to.eql('Hello World');
		expect(StringUtils.escapePattern(str + '.')).to.eql('Hello World\\.');
	});
});

},{"../src/utils/string-utils.js":14}],31:[function(require,module,exports){
'use strict';

describe('A test suite', function() {
	beforeEach(function() {
	});
	afterEach(function() {
	});

	it('should fail', function() {
		expect(true).to.be.true;
	});
});

},{}],32:[function(require,module,exports){
'use strict';

var VideoObject = require('../src/utils/video-object.js');

describe('video object', function() {
	var videoObject = new VideoObject(),
		el = document.createElement('video'),
		ext = (el.canPlayType('video/mp4;') ? 'mp4' : 'ogv'),
		file = ('http://techslides.com/demos/sample-videos/small.' + ext),
		ready = false;

	beforeEach(function(done) {
		videoObject.onReady.add(function() {
			ready = true;
			done();
		});
		videoObject.load(file);
	});

	it('should be ready', function(){
		expect(ready).to.be.true;
	});
});

},{"../src/utils/video-object.js":15}]},{},[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32])