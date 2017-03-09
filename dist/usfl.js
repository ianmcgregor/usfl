(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.usfl = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = array;
function array(length, value) {
    var arr = [];
    for (var i = 0; i < length; i++) {
        var val = typeof value !== 'undefined' ? value : i;
        arr.push(val);
    }
    return arr;
}

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = clone;
function clone(arr) {
    return arr.slice(0);
}

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _array = require('./array');

var _array2 = _interopRequireDefault(_array);

var _clone = require('./clone');

var _clone2 = _interopRequireDefault(_clone);

var _nearest = require('./nearest');

var _nearest2 = _interopRequireDefault(_nearest);

var _randomChoice = require('./randomChoice');

var _randomChoice2 = _interopRequireDefault(_randomChoice);

var _sortAlpha = require('./sortAlpha');

var _sortAlpha2 = _interopRequireDefault(_sortAlpha);

var _sortNumeric = require('./sortNumeric');

var _sortNumeric2 = _interopRequireDefault(_sortNumeric);

var _sortRandom = require('./sortRandom');

var _sortRandom2 = _interopRequireDefault(_sortRandom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    array: _array2.default,
    clone: _clone2.default,
    nearest: _nearest2.default,
    randomChoice: _randomChoice2.default,
    sortAlpha: _sortAlpha2.default,
    sortNumeric: _sortNumeric2.default,
    sortRandom: _sortRandom2.default
};

},{"./array":1,"./clone":2,"./nearest":4,"./randomChoice":5,"./sortAlpha":6,"./sortNumeric":7,"./sortRandom":8}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = nearest;
function nearest(value, arr) {
    var least = Number.MAX_VALUE;
    return arr.reduce(function (result, item) {
        var diff = Math.abs(item - value);
        if (diff < least) {
            least = diff;
            result = item;
        }
        return result;
    }, -1);
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = randomChoice;
function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = sortAlpha;
function sortAlpha(a, b) {
    if (arguments.length === 1) {
        return function (x, y) {
            return String(x[a]).toLowerCase() > String(y[a]).toLowerCase() ? 1 : -1;
        };
    }
    return String(a).toLowerCase() > String(b).toLowerCase() ? 1 : -1;
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = sortNumeric;
function sortNumeric(a, b) {
    if (arguments.length === 1) {
        return function (x, y) {
            return Number(x[a]) - Number(y[a]);
        };
    }
    return Number(a) - Number(b);
}

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = sortRandom;
function sortRandom() {
    return Math.random() > 0.5 ? -1 : 1;
}

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = blockScrolling;
function blockScrolling(value) {
    document.body.style.overflow = value ? 'hidden' : '';
}

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = forceRedraw;
function forceRedraw(el) {
    var display = el.style.display;
    el.style.display = 'none';
    el.offsetHeight;
    el.style.display = display;
}

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getPageHeight;
function getPageHeight() {
    var body = document.body;
    var doc = document.documentElement;

    return Math.max(body.scrollHeight || 0, body.offsetHeight || 0, body.clientHeight || 0, doc.clientHeight || 0, doc.offsetHeight || 0, doc.scrollHeight || 0);
}

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getScrollPercentage;

var _getScrollTop = require('./getScrollTop');

var _getScrollTop2 = _interopRequireDefault(_getScrollTop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getScrollPercentage() {
    return ((0, _getScrollTop2.default)() + window.innerHeight) / document.body.clientHeight;
}

},{"./getScrollTop":14}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getScrollRemaining;

var _getScrollTop = require('./getScrollTop');

var _getScrollTop2 = _interopRequireDefault(_getScrollTop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getScrollRemaining() {
    var b = document.body;
    return Math.abs((0, _getScrollTop2.default)() - (b.scrollHeight - b.clientHeight));
}

},{"./getScrollTop":14}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getScrollTop;
function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = getSrcsetImage;
function getSrcsetImage(srcset, pixelWidth) {
    pixelWidth = pixelWidth || window.innerWidth * (window.devicePixelRatio || 0);

    var set = srcset.split(',').map(function (item) {
        var _item$trim$split = item.trim().split(/\s+/);

        var _item$trim$split2 = _slicedToArray(_item$trim$split, 2);

        var url = _item$trim$split2[0];
        var width = _item$trim$split2[1];

        var size = parseInt(width.slice(0, -1), 10);
        return { url: url, size: size };
    }).sort(function (a, b) {
        return b.size - a.size;
    });

    if (!set.length) {
        return '';
    }

    return set.reduce(function (value, item) {
        return item.size >= pixelWidth ? item.url : value;
    }, set[0].url);
}

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _blockScrolling = require('./blockScrolling');

var _blockScrolling2 = _interopRequireDefault(_blockScrolling);

var _forceRedraw = require('./forceRedraw');

var _forceRedraw2 = _interopRequireDefault(_forceRedraw);

var _getPageHeight = require('./getPageHeight');

var _getPageHeight2 = _interopRequireDefault(_getPageHeight);

var _getScrollPercentage = require('./getScrollPercentage');

var _getScrollPercentage2 = _interopRequireDefault(_getScrollPercentage);

var _getScrollRemaining = require('./getScrollRemaining');

var _getScrollRemaining2 = _interopRequireDefault(_getScrollRemaining);

var _getScrollTop = require('./getScrollTop');

var _getScrollTop2 = _interopRequireDefault(_getScrollTop);

var _getSrcsetImage = require('./getSrcsetImage');

var _getSrcsetImage2 = _interopRequireDefault(_getSrcsetImage);

var _isElementInViewport = require('./isElementInViewport');

var _isElementInViewport2 = _interopRequireDefault(_isElementInViewport);

var _isPageEnd = require('./isPageEnd');

var _isPageEnd2 = _interopRequireDefault(_isPageEnd);

var _resize = require('./resize');

var _resize2 = _interopRequireDefault(_resize);

var _scroll = require('./scroll');

var _scroll2 = _interopRequireDefault(_scroll);

var _setStyle = require('./setStyle');

var _setStyle2 = _interopRequireDefault(_setStyle);

var _transitionEnd = require('./transitionEnd');

var _transitionEnd2 = _interopRequireDefault(_transitionEnd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    blockScrolling: _blockScrolling2.default,
    forceRedraw: _forceRedraw2.default,
    getPageHeight: _getPageHeight2.default,
    getScrollPercentage: _getScrollPercentage2.default,
    getScrollRemaining: _getScrollRemaining2.default,
    getScrollTop: _getScrollTop2.default,
    getSrcsetImage: _getSrcsetImage2.default,
    isElementInViewport: _isElementInViewport2.default,
    isPageEnd: _isPageEnd2.default,
    resize: _resize2.default,
    scroll: _scroll2.default,
    setStyle: _setStyle2.default,
    transitionEnd: _transitionEnd2.default
};

},{"./blockScrolling":9,"./forceRedraw":10,"./getPageHeight":11,"./getScrollPercentage":12,"./getScrollRemaining":13,"./getScrollTop":14,"./getSrcsetImage":15,"./isElementInViewport":17,"./isPageEnd":18,"./resize":19,"./scroll":20,"./setStyle":21,"./transitionEnd":22}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = isElementInViewport;
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth;
}

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = isPageEnd;

var _getScrollTop = require('./getScrollTop');

var _getScrollTop2 = _interopRequireDefault(_getScrollTop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isPageEnd() {
    var buffer = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

    var b = document.body;
    return Math.abs((0, _getScrollTop2.default)() - (b.scrollHeight - b.clientHeight)) <= buffer;
}

},{"./getScrollTop":14}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = resize;

var _eventBus = require('../events/eventBus');

var _eventBus2 = _interopRequireDefault(_eventBus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resize() {
    var debouceDelay = arguments.length <= 0 || arguments[0] === undefined ? 500 : arguments[0];


    var timeoutId = void 0;

    // orientationchange too?

    window.addEventListener('resize', function () {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(function () {
            return _eventBus2.default.emit('resize');
        }, debouceDelay);
    });
}

},{"../events/eventBus":38}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = scroll;

var _eventBus = require('../events/eventBus');

var _eventBus2 = _interopRequireDefault(_eventBus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scroll() {

    var lastScrollY = 0,
        ticking = false,
        timeoutId = void 0;

    function update() {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(function () {
            return _eventBus2.default.emit('scrollend', lastScrollY);
        }, 200);

        _eventBus2.default.emit('scroll', lastScrollY);
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }

    function onScroll() {
        // lastScrollY = window.scrollY;
        lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
        requestTick();
    }

    window.addEventListener('scroll', onScroll, false);
}

},{"../events/eventBus":38}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = setStyle;
function setStyle(el, style) {
    Object.keys(style).forEach(function (prop) {
        el.style[prop] = style[prop];
    });
    return el;
}

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = transitionEnd;
function transitionEnd(el, cb) {
    var timeout = arguments.length <= 2 || arguments[2] === undefined ? 1000 : arguments[2];


    var timeoutId = void 0;

    function handler() {
        window.clearTimeout(timeoutId);
        el.removeEventListener('transitionend', handler);
        el.removeEventListener('webkitTransitionEnd', handler);
        cb();
    }

    if (typeof el.style.transition !== 'undefined') {
        el.addEventListener('transitionend', handler);
    } else if (typeof el.style.WebkitTransition !== 'undefined') {
        el.addEventListener('webkitTransitionEnd', handler);
    }

    timeoutId = window.setTimeout(handler, timeout);
}

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function easeInBack(t, b, c, d) {
    var s = arguments.length <= 4 || arguments[4] === undefined ? 1.70158 : arguments[4];

    return c * (t /= d) * t * ((s + 1) * t - s) + b;
}

function easeOutBack(t, b, c, d) {
    var s = arguments.length <= 4 || arguments[4] === undefined ? 1.70158 : arguments[4];

    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}

function easeInOutBack(t, b, c, d) {
    var s = arguments.length <= 4 || arguments[4] === undefined ? 1.70158 : arguments[4];

    if ((t /= d / 2) < 1) {
        return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
    }
    return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
}

exports.default = {
    easeIn: easeInBack,
    easeOut: easeOutBack,
    easeInOut: easeInOutBack
};
exports.easeInBack = easeInBack;
exports.easeOutBack = easeOutBack;
exports.easeInOutBack = easeInOutBack;

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function easeOutBounce(t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
        return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
    } else if (t < 2.5 / 2.75) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
    }
    return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
}

function easeInBounce(t, b, c, d) {
    return c - easeOutBounce(d - t, 0, c, d) + b;
}

function easeInOutBounce(t, b, c, d) {
    if (t < d / 2) {
        return easeInBounce(t * 2, 0, c, d) * 0.5 + b;
    }
    return easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
}

exports.default = {
    easeIn: easeInBounce,
    easeOut: easeOutBounce,
    easeInOut: easeInOutBounce
};
exports.easeInBounce = easeInBounce;
exports.easeOutBounce = easeOutBounce;
exports.easeInOutBounce = easeInOutBounce;

},{}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var sqrt = Math.sqrt;


function easeInCircular(t, b, c, d) {
    return -c * (sqrt(1 - (t /= d) * t) - 1) + b;
}

function easeOutCircular(t, b, c, d) {
    return c * sqrt(1 - (t = t / d - 1) * t) + b;
}

function easeInOutCircular(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return -c / 2 * (sqrt(1 - t * t) - 1) + b;
    }
    return c / 2 * (sqrt(1 - (t -= 2) * t) + 1) + b;
}

exports.default = {
    easeIn: easeInCircular,
    easeOut: easeOutCircular,
    easeInOut: easeInOutCircular
};
exports.easeInCircular = easeInCircular;
exports.easeOutCircular = easeOutCircular;
exports.easeInOutCircular = easeInOutCircular;

},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function easeInCubic(t, b, c, d) {
    return c * (t /= d) * t * t + b;
}

function easeOutCubic(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
}

function easeInOutCubic(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t + b;
    }
    return c / 2 * ((t -= 2) * t * t + 2) + b;
}

exports.default = {
    easeIn: easeInCubic,
    easeOut: easeOutCubic,
    easeInOut: easeInOutCubic
};
exports.easeInCubic = easeInCubic;
exports.easeOutCubic = easeOutCubic;
exports.easeInOutCubic = easeInOutCubic;

},{}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var abs = Math.abs;
var asin = Math.asin;
var PI = Math.PI;
var pow = Math.pow;
var sin = Math.sin;

var PI_2 = PI * 2;

function easeInElastic(t, b, c, d, a, p) {
    var s = void 0;
    if (t === 0) {
        return b;
    }
    if ((t /= d) === 1) {
        return b + c;
    }
    if (!p) {
        p = d * 0.3;
    }
    if (!a || a < abs(c)) {
        a = c;
        s = p / 4;
    } else {
        s = p / PI_2 * asin(c / a);
    }
    return -(a * pow(2, 10 * (t -= 1)) * sin((t * d - s) * PI_2 / p)) + b;
}

function easeOutElastic(t, b, c, d, a, p) {
    var s = void 0;
    if (t === 0) {
        return b;
    }
    if ((t /= d) === 1) {
        return b + c;
    }
    if (!p) {
        p = d * 0.3;
    }
    if (!a || a < abs(c)) {
        a = c;
        s = p / 4;
    } else {
        s = p / PI_2 * asin(c / a);
    }
    return a * pow(2, -10 * t) * sin((t * d - s) * PI_2 / p) + c + b;
}

function easeInOutElastic(t, b, c, d, a, p) {
    var s = void 0;
    if (t === 0) {
        return b;
    }
    if ((t /= d / 2) === 2) {
        return b + c;
    }
    if (!p) {
        p = d * (0.3 * 1.5);
    }
    if (!a || a < abs(c)) {
        a = c;
        s = p / 4;
    } else {
        s = p / PI_2 * asin(c / a);
    }
    if (t < 1) {
        return -0.5 * (a * pow(2, 10 * (t -= 1)) * sin((t * d - s) * PI_2 / p)) + b;
    }
    return a * pow(2, -10 * (t -= 1)) * sin((t * d - s) * PI_2 / p) * 0.5 + c + b;
}

exports.default = {
    easeIn: easeInElastic,
    easeOut: easeOutElastic,
    easeInOut: easeInOutElastic
};
exports.easeInElastic = easeInElastic;
exports.easeOutElastic = easeOutElastic;
exports.easeInOutElastic = easeInOutElastic;

},{}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var pow = Math.pow;


function easeInExpo(t, b, c, d) {
    return t === 0 ? b : c * pow(2, 10 * (t / d - 1)) + b;
}

function easeOutExpo(t, b, c, d) {
    return t === d ? b + c : c * (-pow(2, -10 * t / d) + 1) + b;
}

function easeInOutExpo(t, b, c, d) {
    if (t === 0) {
        return b;
    }
    if (t === d) {
        return b + c;
    }
    if ((t /= d / 2) < 1) {
        return c / 2 * pow(2, 10 * (t - 1)) + b;
    }
    return c / 2 * (-pow(2, -10 * --t) + 2) + b;
}

exports.default = {
    easeIn: easeInExpo,
    easeOut: easeOutExpo,
    easeInOut: easeInOutExpo
};
exports.easeInExpo = easeInExpo;
exports.easeOutExpo = easeOutExpo;
exports.easeInOutExpo = easeInOutExpo;

},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.easeInOutSine = exports.easeOutSine = exports.easeInSine = exports.easeInOutQuint = exports.easeOutQuint = exports.easeInQuint = exports.easeInOutQuart = exports.easeOutQuart = exports.easeInQuart = exports.easeInOutQuad = exports.easeOutQuad = exports.easeInQuad = exports.easeInOutExpo = exports.easeOutExpo = exports.easeInExpo = exports.easeInOutElastic = exports.easeOutElastic = exports.easeInElastic = exports.easeInOutCubic = exports.easeOutCubic = exports.easeInCubic = exports.easeInOutCircular = exports.easeOutCircular = exports.easeInCircular = exports.easeInOutBounce = exports.easeOutBounce = exports.easeInBounce = exports.easeInOutBack = exports.easeOutBack = exports.easeInBack = exports.easeLinear = exports.sine = exports.quint = exports.quart = exports.quad = exports.linear = exports.expo = exports.elastic = exports.cubic = exports.circular = exports.bounce = exports.back = undefined;

var _back = require('./back');

var _back2 = _interopRequireDefault(_back);

var _bounce = require('./bounce');

var _bounce2 = _interopRequireDefault(_bounce);

var _circular = require('./circular');

var _circular2 = _interopRequireDefault(_circular);

var _cubic = require('./cubic');

var _cubic2 = _interopRequireDefault(_cubic);

var _elastic = require('./elastic');

var _elastic2 = _interopRequireDefault(_elastic);

var _expo = require('./expo');

var _expo2 = _interopRequireDefault(_expo);

var _linear = require('./linear');

var _linear2 = _interopRequireDefault(_linear);

var _quad = require('./quad');

var _quad2 = _interopRequireDefault(_quad);

var _quart = require('./quart');

var _quart2 = _interopRequireDefault(_quart);

var _quint = require('./quint');

var _quint2 = _interopRequireDefault(_quint);

var _sine = require('./sine');

var _sine2 = _interopRequireDefault(_sine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.back = _back2.default;
exports.bounce = _bounce2.default;
exports.circular = _circular2.default;
exports.cubic = _cubic2.default;
exports.elastic = _elastic2.default;
exports.expo = _expo2.default;
exports.linear = _linear2.default;
exports.quad = _quad2.default;
exports.quart = _quart2.default;
exports.quint = _quint2.default;
exports.sine = _sine2.default;
exports.easeLinear = _linear.easeLinear;
exports.easeInBack = _back.easeInBack;
exports.easeOutBack = _back.easeOutBack;
exports.easeInOutBack = _back.easeInOutBack;
exports.easeInBounce = _bounce.easeInBounce;
exports.easeOutBounce = _bounce.easeOutBounce;
exports.easeInOutBounce = _bounce.easeInOutBounce;
exports.easeInCircular = _circular.easeInCircular;
exports.easeOutCircular = _circular.easeOutCircular;
exports.easeInOutCircular = _circular.easeInOutCircular;
exports.easeInCubic = _cubic.easeInCubic;
exports.easeOutCubic = _cubic.easeOutCubic;
exports.easeInOutCubic = _cubic.easeInOutCubic;
exports.easeInElastic = _elastic.easeInElastic;
exports.easeOutElastic = _elastic.easeOutElastic;
exports.easeInOutElastic = _elastic.easeInOutElastic;
exports.easeInExpo = _expo.easeInExpo;
exports.easeOutExpo = _expo.easeOutExpo;
exports.easeInOutExpo = _expo.easeInOutExpo;
exports.easeInQuad = _quad.easeInQuad;
exports.easeOutQuad = _quad.easeOutQuad;
exports.easeInOutQuad = _quad.easeInOutQuad;
exports.easeInQuart = _quart.easeInQuart;
exports.easeOutQuart = _quart.easeOutQuart;
exports.easeInOutQuart = _quart.easeInOutQuart;
exports.easeInQuint = _quint.easeInQuint;
exports.easeOutQuint = _quint.easeOutQuint;
exports.easeInOutQuint = _quint.easeInOutQuint;
exports.easeInSine = _sine.easeInSine;
exports.easeOutSine = _sine.easeOutSine;
exports.easeInOutSine = _sine.easeInOutSine;

/*
TERMS OF USE - EASING EQUATIONS

Open source under the BSD License.

Copyright © 2001 Robert Penner
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this
list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this
list of conditions and the following disclaimer in the documentation and/or
other materials provided with the distribution.
Neither the name of the author nor the names of contributors may be used to
endorse or promote products derived from this software without specific
prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

},{"./back":23,"./bounce":24,"./circular":25,"./cubic":26,"./elastic":27,"./expo":28,"./linear":30,"./quad":31,"./quart":32,"./quint":33,"./sine":34}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function easeLinear(t, b, c, d) {
    return c * t / d + b;
}

exports.default = {
    easeIn: easeLinear,
    easeOut: easeLinear,
    easeInOut: easeLinear
};
exports.easeLinear = easeLinear;

},{}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function easeInQuad(t, b, c, d) {
    return c * (t /= d) * t + b;
}

function easeOutQuad(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
}

function easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
    }
    return -c / 2 * (--t * (t - 2) - 1) + b;
}

exports.default = {
    easeIn: easeInQuad,
    easeOut: easeOutQuad,
    easeInOut: easeInOutQuad
};
exports.easeInQuad = easeInQuad;
exports.easeOutQuad = easeOutQuad;
exports.easeInOutQuad = easeInOutQuad;

},{}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function easeInQuart(t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
}

function easeOutQuart(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

function easeInOutQuart(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t + b;
    }
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}

exports.default = {
    easeIn: easeInQuart,
    easeOut: easeOutQuart,
    easeInOut: easeInOutQuart
};
exports.easeInQuart = easeInQuart;
exports.easeOutQuart = easeOutQuart;
exports.easeInOutQuart = easeInOutQuart;

},{}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function easeInQuint(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
}

function easeOutQuint(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}

function easeInOutQuint(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t * t + b;
    }
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
}

exports.default = {
    easeIn: easeInQuint,
    easeOut: easeOutQuint,
    easeInOut: easeInOutQuint
};
exports.easeInQuint = easeInQuint;
exports.easeOutQuint = easeOutQuint;
exports.easeInOutQuint = easeInOutQuint;

},{}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var cos = Math.cos;
var PI = Math.PI;
var sin = Math.sin;

var PI_D2 = PI / 2;

function easeInSine(t, b, c, d) {
    return -c * cos(t / d * PI_D2) + c + b;
}

function easeOutSine(t, b, c, d) {
    return c * sin(t / d * PI_D2) + b;
}

function easeInOutSine(t, b, c, d) {
    return -c / 2 * (cos(PI * t / d) - 1) + b;
}

exports.default = {
    easeIn: easeInSine,
    easeOut: easeOutSine,
    easeInOut: easeInOutSine
};
exports.easeInSine = easeInSine;
exports.easeOutSine = easeOutSine;
exports.easeInOutSine = easeInOutSine;

},{}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = debounce;
function debounce(handler) {
    var ticking = false;

    function update(event) {
        handler(event);
        ticking = false;
    }

    function requestTick(event) {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                return update(event);
            });
            ticking = true;
        }
    }

    return requestTick;
}

},{}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = delegateEvents;
function delegateEvents(parentEl, eventType, tagName, cb) {
    tagName = tagName.toUpperCase();

    parentEl.addEventListener(eventType, function (event) {
        var target = event.target;

        while (target !== parentEl) {
            if (target.tagName === tagName) {
                event.stopImmediatePropagation();
                cb(target, event);
                break;
            }
            target = target.parentNode;
        }
    });
}

},{}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var emitter = function (_EventEmitter) {
    _inherits(emitter, _EventEmitter);

    function emitter() {
        _classCallCheck(this, emitter);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(emitter).call(this));

        _this.setMaxListeners(20);
        return _this;
    }

    _createClass(emitter, [{
        key: 'off',
        value: function off(type, listener) {
            if (listener) {
                return this.removeListener(type, listener);
            }
            if (type) {
                return this.removeAllListeners(type);
            }
            return this.removeAllListeners();
        }
    }]);

    return emitter;
}(_events.EventEmitter);

exports.default = emitter;

},{"events":108}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emitter = require('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Object.create(_emitter2.default.prototype);

},{"./emitter":37}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = heartbeat;

var _emitter = require('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function heartbeat(interval) {
    var beat = null,
        time = 0,
        numTimes = 0,
        maxTimes = 0,
        running = false;

    function start() {
        var maxNumTimes = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var timeOffset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        maxTimes = maxNumTimes;
        time = timeOffset;
        numTimes = 0;
        running = true;
        return beat;
    }

    function stop() {
        running = false;
        return beat;
    }

    function update() {
        var dt = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

        if (!running) {
            return beat;
        }

        if (maxTimes > 0 && numTimes >= maxTimes) {
            running = false;
            beat.emit('complete');
            return beat;
        }

        time += dt;

        if (time >= interval) {
            time = 0;
            numTimes++;
            beat.emit('update', numTimes);
        }
        return beat;
    }

    function setInterval(value) {
        interval = value;
        return beat;
    }

    beat = Object.assign(Object.create(_emitter2.default.prototype), {
        start: start,
        stop: stop,
        update: update,
        get interval() {
            return interval;
        },
        set interval(value) {
            interval = value;
        },
        setInterval: setInterval
    });

    return beat;
}

},{"./emitter":37}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _debounce = require('./debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _delegateEvents = require('./delegateEvents');

var _delegateEvents2 = _interopRequireDefault(_delegateEvents);

var _emitter = require('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _eventBus = require('./eventBus');

var _eventBus2 = _interopRequireDefault(_eventBus);

var _heartbeat = require('./heartbeat');

var _heartbeat2 = _interopRequireDefault(_heartbeat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    debounce: _debounce2.default,
    delegateEvents: _delegateEvents2.default,
    emitter: _emitter2.default,
    eventBus: _eventBus2.default,
    heartbeat: _heartbeat2.default
};

},{"./debounce":35,"./delegateEvents":36,"./emitter":37,"./eventBus":38,"./heartbeat":39}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = fps;
function fps(el) {

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
        if (typeof now === 'undefined') {
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

    function auto() {
        window.requestAnimationFrame(auto);

        update();
    }

    return {
        auto: auto,
        update: update
    };
}

},{}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var request = null,
    exit = null,
    change = null,
    error = null,
    element = null,
    enabled = null;

var docEl = document.documentElement;

if (typeof docEl.requestFullscreen !== 'undefined') {
    request = 'requestFullscreen';
    exit = 'exitFullscreen';
    change = 'fullscreenchange';
    error = 'fullscreenerror';
    element = 'fullscreenElement';
    enabled = 'fullscreenEnabled';
} else if (typeof docEl.mozRequestFullScreen !== 'undefined') {
    request = 'mozRequestFullScreen';
    exit = 'mozCancelFullScreen';
    change = 'mozfullscreenchange';
    error = 'mozfullscreenerror';
    element = 'mozFullScreenElement';
    enabled = 'mozFullScreenEnabled';
} else if (typeof docEl.msRequestFullscreen !== 'undefined') {
    request = 'msRequestFullscreen';
    exit = 'msExitFullscreen';
    change = 'MSFullscreenChange';
    error = 'MSFullscreenError';
    element = 'msFullscreenElement';
    enabled = 'msFullscreenEnabled';
} else if (typeof docEl.webkitRequestFullscreen !== 'undefined') {
    request = 'webkitRequestFullscreen';
    exit = 'webkitExitFullscreen';
    change = 'webkitfullscreenchange';
    error = 'webkitFullscreenError';
    element = 'webkitFullscreenElement';
    enabled = 'webkitFullscreenEnabled';
}

exports.default = {
    request: request,
    exit: exit,
    change: change,
    error: error,
    element: element,
    enabled: enabled
};

},{}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _emitter = require('../events/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fullscreen = Object.create(_emitter2.default.prototype);

document.addEventListener(_api2.default.change, function (event) {
    fullscreen.emit('change', event);
});

document.addEventListener(_api2.default.error, function (event) {
    fullscreen.emit('error', event);
});

Object.defineProperties(fullscreen, {
    request: {
        value: function value(el) {
            el = el || document.documentElement;
            el[_api2.default.request](true);
        }
    },
    exit: {
        value: function value() {
            document[_api2.default.exit]();
        }
    },
    toggle: {
        value: function value(el) {
            if (this.isFullscreen) {
                this.exit();
            } else {
                this.request(el);
            }
        }
    },
    isSupported: {
        get: function get() {
            return !!_api2.default.request;
        }
    },
    isFullscreen: {
        get: function get() {
            return !!document[_api2.default.element];
        }
    },
    element: {
        enumerable: true,
        get: function get() {
            return document[_api2.default.element];
        }
    },
    enabled: {
        enumerable: true,
        get: function get() {
            return document[_api2.default.enabled];
        }
    }
});

exports.default = fullscreen;

},{"../events/emitter":37,"./api":42}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getColour(r, g, b) {
    var a = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

    if (typeof r === 'string') {
        return r;
    }
    if (typeof r === 'number') {
        return 'rgba(' + r + ',' + b + ',' + g + ',' + a + ')';
    }
    return null;
}

var Graphics = function () {
    function Graphics(width, height) {
        _classCallCheck(this, Graphics);

        if ((typeof width === 'undefined' ? 'undefined' : _typeof(width)) === 'object' && width.tagName === 'CANVAS') {
            this.canvas = width;
        } else {
            this.canvas = document.createElement('canvas');
            this.size(width, height);
        }
        this.ctx = this.canvas.getContext('2d');
    }

    _createClass(Graphics, [{
        key: 'fill',
        value: function fill(r, g, b) {
            var a = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

            this.ctx.fillStyle = getColour(r, g, b, a);
            return this;
        }
    }, {
        key: 'stroke',
        value: function stroke(r, g, b) {
            var a = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

            this.ctx.strokeStyle = getColour(r, g, b, a);
            return this;
        }
    }, {
        key: 'circle',
        value: function circle(x, y, radius) {
            var ctx = this.ctx;

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            ctx.fill();
            return this;
        }
    }, {
        key: 'rect',
        value: function rect(x, y, width, height) {
            var angle = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
            var ctx = this.ctx;

            if (angle !== 0) {
                ctx.save();
                ctx.translate(x + width / 2, y + height / 2);
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.rect(-width / 2, -height / 2, width, height);
                ctx.fill();
                ctx.stroke();
                ctx.restore();
            } else {
                ctx.rect(x, y, width, height);
                ctx.fill();
                ctx.stroke();
            }
            return this;
        }
    }, {
        key: 'line',
        value: function line(x1, y1, x2, y2) {
            var ctx = this.ctx;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            return this;
        }
    }, {
        key: 'lineWidth',
        value: function lineWidth(width) {
            this.ctx.lineWidth = width;
            return this;
        }
    }, {
        key: 'move',
        value: function move(x, y) {
            this.ctx.moveTo(x, y);
            return this;
        }
    }, {
        key: 'image',
        value: function image(el, x, y) {
            var angle = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
            var ctx = this.ctx;

            if (angle !== 0) {
                var offsetX = el.width / 2;
                var offsetY = el.height / 2;
                ctx.save();
                ctx.translate(x + offsetX, y + offsetY);
                ctx.rotate(angle);
                ctx.drawImage(el, -offsetX, -offsetY);
                ctx.restore();
            } else {
                ctx.drawImage(el, x, y);
            }
            return this;
        }
    }, {
        key: 'text',
        value: function text(str, x, y) {
            this.ctx.fillText(str, x, y);
            return this;
        }
    }, {
        key: 'setFontStyle',
        value: function setFontStyle(family, size) {
            this.ctx.font = size + 'px ' + family;
        }
    }, {
        key: 'getImageData',
        value: function getImageData() {
            var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
            var width = arguments[2];
            var height = arguments[3];
            var ctx = this.ctx;
            var canvas = this.canvas;

            return ctx.getImageData(x, y, width || canvas.width, height || canvas.height);
        }
    }, {
        key: 'getPixel',
        value: function getPixel(x, y) {
            x = Math.floor(x);
            y = Math.floor(y);

            var _ctx$getImageData = this.ctx.getImageData(x, y, 1, 1);

            var data = _ctx$getImageData.data;

            return Array.prototype.slice.call(data);
        }
    }, {
        key: 'setPixel',
        value: function setPixel(x, y, r, g, b, a) {
            x = Math.floor(x);
            y = Math.floor(y);

            var _getImageData = this.getImageData();

            var width = _getImageData.width;
            var data = _getImageData.data;

            var i = (x + y * width) * 4;
            data[i + 0] = r;
            data[i + 1] = g;
            data[i + 2] = b;
            data[i + 3] = a;
            return this;
        }
    }, {
        key: 'clearCircle',
        value: function clearCircle(x, y) {
            var radius = arguments.length <= 2 || arguments[2] === undefined ? 20 : arguments[2];
            var ctx = this.ctx;

            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            this.circle(x, y, radius);
            ctx.globalCompositeOperation = 'source-over';
            ctx.restore();
            return this;
        }
    }, {
        key: 'translateAnd',
        value: function translateAnd(x, y, fn) {
            var ctx = this.ctx;

            ctx.save();
            ctx.translate(x, y);
            fn(ctx);
            ctx.restore();
            return this;
        }
    }, {
        key: 'clear',
        value: function clear(r, g, b) {
            var a = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

            var color = getColour(r, g, b, a);
            var ctx = this.ctx;
            var _canvas = this.canvas;
            var width = _canvas.width;
            var height = _canvas.height;

            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            if (color) {
                ctx.fillStyle = color;
                ctx.fillRect(0, 0, width, height);
            } else {
                ctx.clearRect(0, 0, width, height);
            }
            ctx.beginPath();
            ctx.restore();
            return this;
        }
    }, {
        key: 'size',
        value: function size() {
            var width = arguments.length <= 0 || arguments[0] === undefined ? window.innerWidth : arguments[0];
            var height = arguments.length <= 1 || arguments[1] === undefined ? window.innerHeight : arguments[1];

            this.canvas.width = width;
            this.canvas.height = height;
            return this;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            if (this.canvas.parentElement) {
                this.canvas.parentElement.removeChild(this.canvas);
            }
            this.canvas = null;
            this.ctx = null;
        }
    }, {
        key: 'context',
        get: function get() {
            return this.ctx;
        }
    }]);

    return Graphics;
}();

exports.default = Graphics;

},{}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = gui;

var _loadScript = require('../http/loadScript');

var _loadScript2 = _interopRequireDefault(_loadScript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// example usage:
//
// const opts = {
//     friction: 0.9,
//     maxSpeed: 1
// };
// gui(true)
//     .then((g) => {
//         g.add(opts, 'friction', 0.7, 0.999);
//         g.add(opts, 'maxSpeed', 0.5, 2).onChange((value) => console.log(value));
//     })
//     .catch((err) => console.error(err));

function gui() {
    var localhostOnly = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

    if (localhostOnly && !/^(?:https?:\/\/)?(?:localhost|192\.168)/.test(window.location.href)) {
        return new Promise(function () {});
    }
    return new Promise(function (resolve, reject) {
        (0, _loadScript2.default)('https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.6.1/dat.gui.min.js', function (err, src) {
            if (err) {
                console.error('Error loading script', src);
                reject(new Error('Error loading script'));
                return;
            }
            var g = new window.dat.GUI({ autoPlace: true });
            var s = document.styleSheets[0];
            s.insertRule('.dg.ac {z-index:10000 !important}', 0);
            s.insertRule('.dg * {font-size:11px !important}', 0);
            s.insertRule('.dg input {font:11px Lucida Grande,sans-serif !important}', 0);
            resolve(g);
        });
    });
}

},{"../http/loadScript":49}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getLocation;
function getLocation(href) {
    var l = document.createElement('a');
    l.href = href;
    return l;
}

},{}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getLocation = require('./getLocation');

var _getLocation2 = _interopRequireDefault(_getLocation);

var _jsonp = require('./jsonp');

var _jsonp2 = _interopRequireDefault(_jsonp);

var _loadScript = require('./loadScript');

var _loadScript2 = _interopRequireDefault(_loadScript);

var _urlParams = require('./urlParams');

var _urlParams2 = _interopRequireDefault(_urlParams);

var _xhr = require('./xhr');

var _xhr2 = _interopRequireDefault(_xhr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    getLocation: _getLocation2.default,
    jsonp: _jsonp2.default,
    loadScript: _loadScript2.default,
    urlParams: _urlParams2.default,
    xhr: _xhr2.default
};

},{"./getLocation":46,"./jsonp":48,"./loadScript":49,"./urlParams":50,"./xhr":51}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = jsonp;
function jsonp(url, cb) {
    var timeout = arguments.length <= 2 || arguments[2] === undefined ? 5000 : arguments[2];

    var script = document.createElement('script');
    var callback = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var separator = url.indexOf('?') >= 0 ? '&' : '?';

    var timeoutId = window.setTimeout(function () {
        window[callback](null, 'jsonp error');
    }, timeout);

    window[callback] = function (data) {
        var err = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        window.clearTimeout(timeoutId);
        delete window[callback];
        document.body.removeChild(script);
        cb(data, err);
    };

    script.src = '' + url + separator + 'callback=' + callback;
    document.body.appendChild(script);
}

},{}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = loadScript;
function loadScript(src, cb) {
    var script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', function () {
        return cb(null, src);
    });
    script.addEventListener('error', function () {
        return cb(true, src);
    });
    document.body.appendChild(script);
    return script;
}

},{}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = urlParams;
var plus = /\+/g; // match '+' symbol
var search = /([^&=]+)=?([^&]*)/g;

function decode(str) {
    return decodeURIComponent(str.replace(plus, ' '));
}

function urlParams(query) {
    query = query || window.location.search.slice(1);

    var params = {};
    var match = search.exec(query);
    while (match) {
        params[decode(match[1])] = decode(match[2]);
        match = search.exec(query);
    }
    return params;
}

},{}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = xhr;
function xhr(url) {
    var type = arguments.length <= 1 || arguments[1] === undefined ? 'json' : arguments[1];

    var p = new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.addEventListener('load', function () {
            var response = req.response;
            if (type === 'json' && typeof response === 'string') {
                response = JSON.parse(response);
            }
            resolve(response);
        });
        req.addEventListener('error', function () {
            return reject(req.status);
        });
        req.open('GET', url);
        req.responseType = type;
        // req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        req.send();
    });
    return p;
}

},{}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('./polyfill');

var _array = require('./array');

var _array2 = _interopRequireDefault(_array);

var _dom = require('./dom');

var _dom2 = _interopRequireDefault(_dom);

var _ease = require('./ease');

var _ease2 = _interopRequireDefault(_ease);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

var _fps = require('./fps');

var _fps2 = _interopRequireDefault(_fps);

var _fullscreen = require('./fullscreen');

var _fullscreen2 = _interopRequireDefault(_fullscreen);

var _graphics = require('./graphics');

var _graphics2 = _interopRequireDefault(_graphics);

var _gui = require('./gui');

var _gui2 = _interopRequireDefault(_gui);

var _http = require('./http');

var _http2 = _interopRequireDefault(_http);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _linkedList = require('./linked-list');

var _linkedList2 = _interopRequireDefault(_linkedList);

var _math = require('./math');

var _math2 = _interopRequireDefault(_math);

var _media = require('./media');

var _media2 = _interopRequireDefault(_media);

var _objectPool = require('./object-pool');

var _objectPool2 = _interopRequireDefault(_objectPool);

var _particle = require('./particle');

var _particle2 = _interopRequireDefault(_particle);

var _platform = require('./platform');

var _platform2 = _interopRequireDefault(_platform);

var _popup = require('./popup');

var _popup2 = _interopRequireDefault(_popup);

var _quadTree = require('./quad-tree');

var _quadTree2 = _interopRequireDefault(_quadTree);

var _share = require('./share');

var _share2 = _interopRequireDefault(_share);

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

var _string = require('./string');

var _string2 = _interopRequireDefault(_string);

var _ticker = require('./ticker');

var _ticker2 = _interopRequireDefault(_ticker);

var _track = require('./track');

var _track2 = _interopRequireDefault(_track);

var _tween = require('./tween');

var _tween2 = _interopRequireDefault(_tween);

var _visibility = require('./visibility');

var _visibility2 = _interopRequireDefault(_visibility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    array: _array2.default,
    dom: _dom2.default,
    ease: _ease2.default,
    events: _events2.default,
    fps: _fps2.default,
    fullscreen: _fullscreen2.default,
    graphics: _graphics2.default,
    gui: _gui2.default,
    http: _http2.default,
    input: _input2.default,
    linkedList: _linkedList2.default,
    math: _math2.default,
    media: _media2.default,
    objectPool: _objectPool2.default,
    Particle: _particle2.default,
    ParticleGroup: _particle2.default,
    platform: _platform2.default,
    popup: _popup2.default,
    QuadTree: _quadTree2.default,
    share: _share2.default,
    storage: _storage2.default,
    string: _string2.default,
    Ticker: _ticker2.default,
    Tween: _tween2.default,
    track: _track2.default,
    visibility: _visibility2.default
};

},{"./array":3,"./dom":16,"./ease":29,"./events":40,"./fps":41,"./fullscreen":43,"./graphics":44,"./gui":45,"./http":47,"./input":54,"./linked-list":62,"./math":78,"./media":103,"./object-pool":110,"./particle":111,"./platform":116,"./polyfill":134,"./popup":136,"./quad-tree":137,"./share":142,"./storage":152,"./string":167,"./ticker":184,"./track":186,"./tween":189,"./visibility":191}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = clickOutside;
function clickOutside(el, fn) {
    function onClickOutside(event) {
        var target = event.target;
        var inside = false;

        while (target !== document.body) {
            if (target === el) {
                event.stopImmediatePropagation();
                inside = true;
                break;
            }
            target = target.parentNode;
        }

        if (!inside) {
            fn(event);
        }
    }

    function onTouchOutside(event) {
        document.body.removeEventListener('click', onClickOutside);
        onClickOutside(event);
    }

    function destroy() {
        document.body.removeEventListener('click', onClickOutside);
        document.body.removeEventListener('touchstart', onTouchOutside);
    }

    document.body.addEventListener('click', onClickOutside);
    document.body.addEventListener('touchstart', onTouchOutside);

    return {
        destroy: destroy
    };
}

},{}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _clickOutside = require('./clickOutside');

var _clickOutside2 = _interopRequireDefault(_clickOutside);

var _keyboard = require('./keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

var _keyInput = require('./keyInput');

var _keyInput2 = _interopRequireDefault(_keyInput);

var _microphone = require('./microphone');

var _microphone2 = _interopRequireDefault(_microphone);

var _mouseLeftWindow = require('./mouseLeftWindow');

var _mouseLeftWindow2 = _interopRequireDefault(_mouseLeftWindow);

var _mouseWheel = require('./mouseWheel');

var _mouseWheel2 = _interopRequireDefault(_mouseWheel);

var _pointerCoords = require('./pointerCoords');

var _pointerCoords2 = _interopRequireDefault(_pointerCoords);

var _touchInput = require('./touchInput');

var _touchInput2 = _interopRequireDefault(_touchInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    clickOutside: _clickOutside2.default,
    keyboard: _keyboard2.default,
    keyInput: _keyInput2.default,
    microphone: _microphone2.default,
    mouseLeftWindow: _mouseLeftWindow2.default,
    mouseWheel: _mouseWheel2.default,
    pointerCoords: _pointerCoords2.default,
    touchInput: _touchInput2.default
};

},{"./clickOutside":53,"./keyInput":55,"./keyboard":56,"./microphone":57,"./mouseLeftWindow":58,"./mouseWheel":59,"./pointerCoords":60,"./touchInput":61}],55:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = keyInput;

var _array = require('../array/array');

var _array2 = _interopRequireDefault(_array);

var _emitter = require('../events/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _keyboard = require('./keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function keyInput() {
    var api = Object.create(_emitter2.default.prototype);
    var keys = (0, _array2.default)(256, false);

    function emitKey(keyCode) {
        var keyName = Object.keys(_keyboard2.default).reduce(function (value, key) {
            return _keyboard2.default[key] === keyCode ? key : value;
        }, '').toLowerCase();
        if (keyName) {
            api.emit(keyName.toLowerCase());
        }
    }

    function onKeyDown(event) {
        event.preventDefault();
        keys[event.keyCode] = true;
        api.emit('keydown', event.keyCode);
        emitKey(event.keyCode);
    }

    function onKeyUp(event) {
        event.preventDefault();
        keys[event.keyCode] = false;
        api.emit('keyup', event.keyCode);
    }

    function add() {
        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);
    }

    function remove() {
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('keyup', onKeyUp);
    }

    function isDown(key) {
        return keys[key];
    }

    function left() {
        return keys[_keyboard2.default.LEFT] || keys[_keyboard2.default.A];
    }

    function right() {
        return keys[_keyboard2.default.RIGHT] || keys[_keyboard2.default.D];
    }

    function up() {
        return keys[_keyboard2.default.UP] || keys[_keyboard2.default.W];
    }

    function down() {
        return keys[_keyboard2.default.DOWN] || keys[_keyboard2.default.S];
    }

    function space() {
        return keys[_keyboard2.default.SPACE];
    }

    function enable() {
        var value = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

        remove();
        if (value) {
            add();
        }
    }

    add();

    return Object.assign(api, {
        keyboard: _keyboard2.default,
        enable: enable,
        isDown: isDown,
        left: left,
        right: right,
        up: up,
        down: down,
        space: space
    });
}

},{"../array/array":1,"../events/emitter":37,"./keyboard":56}],56:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
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
    SPACE: 32,
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

},{}],57:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = microphone;

var _emitter = require('../events/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function microphone() {
    var mic = Object.create(_emitter2.default.prototype);
    var _stream = null;

    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    var _isSupported = !!getUserMedia;

    function connect() {
        if (!_isSupported) {
            mic.emit('error', 'Not supported');
            return;
        }
        getUserMedia({
            audio: true
        }, function (mediaStream) {
            _stream = mediaStream;
            mic.emit('connect', _stream);
        }, function (e) {
            if (e.name === 'PermissionDeniedError' || e === 'PERMISSION_DENIED') {
                console.log('Permission denied. Undo by clicking the camera icon in the address bar');
                mic.emit('denied');
            } else {
                mic.emit('error', e.message || e);
            }
        });
    }

    function disconnect() {
        if (_stream) {
            _stream.stop();
            _stream = null;
        }
    }

    function createWebAudioSource(webAudioContext, connectTo) {
        if (!_stream) {
            return null;
        }

        var source = webAudioContext.createMediaStreamSource(_stream);

        if (connectTo) {
            source.connect(connectTo);
        }

        // HACK: stops moz garbage collection killing the stream
        // see https://support.mozilla.org/en-US/questions/984179
        if (navigator.mozGetUserMedia) {
            window.hack_for_mozilla = source;
        }

        return source;
    }

    return Object.assign(mic, {
        connect: connect,
        disconnect: disconnect,
        createWebAudioSource: createWebAudioSource,
        isSupported: function isSupported() {
            return _isSupported;
        },
        stream: function stream() {
            return _stream;
        }
    });
}

},{"../events/emitter":37}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = mouseLeftWindow;
function mouseLeftWindow(cb) {
    function handler(event) {
        var from = event.relatedTarget || event.toElement;
        if (!from || from.nodeName === 'HTML') {
            cb();
        }
    }

    document.addEventListener('mouseout', handler, false);

    return {
        destroy: function destroy() {
            document.removeEventListener('mouseout', handler);
        }
    };
}

},{}],59:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = mouseWheel;

var _emitter = require('../events/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mouseWheel(speed) {
    speed = speed || 2;

    var wheel = void 0;

    function wheelHandler(event) {
        var direction = event.detail < 0 || event.wheelDelta > 0 ? 1 : -1;
        var delta = direction * speed;

        if (direction > 0) {
            wheel.emit('up', delta);
        } else {
            wheel.emit('down', delta);
        }

        wheel.emit('update', delta);
    }

    function add() {
        if ('onmousewheel' in window) {
            window.addEventListener('mousewheel', wheelHandler, false);
        } else if (window.addEventListener) {
            window.addEventListener('DOMMouseScroll', wheelHandler, false);
        }
    }

    function remove() {
        if ('onmousewheel' in window) {
            window.removeEventListener('mousewheel', wheelHandler, false);
        } else if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', wheelHandler, false);
        }
    }

    add();

    wheel = Object.create(_emitter2.default.prototype, {
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

    return Object.freeze(wheel);
}

},{"../events/emitter":37}],60:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = pointerCoords;
function pointerCoords() {
    var self = void 0;

    function calculateCoords(event) {
        var pX = event.clientX || 0;
        var pY = event.clientY || 0;
        var sX = window.pageXOffset;
        var sY = window.pageYOffset;
        self.x = pX + sX;
        self.y = pY + sY;
        self.percentX = self.x / window.innerWidth;
        self.percentY = self.y / window.innerHeight;
    }

    self = {
        x: 0,
        y: 0,
        percentX: 0,
        percentY: 0,
        isListening: false,

        on: function on() {
            document.body.addEventListener('mousemove', calculateCoords);
            document.body.addEventListener('touchmove', calculateCoords);
            self.isListening = true;
            return this;
        },
        off: function off() {
            document.body.removeEventListener('mousemove', calculateCoords);
            document.body.removeEventListener('touchmove', calculateCoords);
            self.isListening = false;
            return this;
        }
    };
    return self;
}

},{}],61:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = touchInput;

var _emitter = require('../events/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function touchInput(el) {
    el = el || document.body;

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

    var self = void 0;

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
                self.emit('start', data);
                break;
            case 'touchmove':
                data.move[0] = data.position[0] = x;
                data.move[1] = data.position[1] = y;
                self.emit('move', data);
                break;
            case 'touchend':
                data.end[0] = data.position[0] = x;
                data.end[1] = data.position[1] = y;
                data.touching = false;
                self.emit('end', data);
                break;
            default:
                break;
        }
    }

    function listen(elem) {
        el = elem || el;
        el.addEventListener('touchstart', touchHandler);
        el.addEventListener('touchmove', touchHandler);
        el.addEventListener('touchend', touchHandler);
        return self;
    }

    function destroy() {
        self.removeAllListeners();
        el.removeEventListener('touchstart', touchHandler);
        el.removeEventListener('touchmove', touchHandler);
        el.removeEventListener('touchend', touchHandler);
        el = null;
        return self;
    }

    listen(el);

    self = Object.create(_emitter2.default.prototype, {
        _events: {
            value: {}
        },
        listen: {
            value: listen
        },
        isDown: {
            value: function value() {
                return data.touching;
            }
        },
        getTouch: {
            value: function value() {
                return data;
            }
        },
        destroy: {
            value: destroy
        }
    });

    return Object.freeze(self);
}

},{"../events/emitter":37}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = linkedList;
function linkedList() {
    var arr = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];


    var first = void 0,
        last = void 0;

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

    function forEach(fn) {
        var item = first;
        while (item) {
            fn(item);
            item = item.next;
        }
    }

    function map(fn) {
        var list = linkedList();
        var item = first;
        while (item) {
            list.add(fn(item));
            item = item.next;
        }
        return list;
    }

    arr.forEach(function (item) {
        return add(item);
    });

    return {
        get first() {
            return first;
        },
        getFirst: function getFirst() {
            return first;
        },

        get last() {
            return last;
        },
        getLast: function getLast() {
            return last;
        },

        get length() {
            return this.getCount();
        },
        getCount: function getCount() {
            var count = 0;
            var i = first;
            while (i) {
                count++;
                i = i.next;
            }
            return count;
        },

        add: add,
        remove: remove,
        insertAfter: insertAfter,
        insertBefore: insertBefore,
        forEach: forEach,
        map: map
    };
}

},{}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = angle;
function angle(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.atan2(dy, dx);
}

},{}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cerp;
function cerp(from, to) {
    var weight = arguments.length <= 2 || arguments[2] === undefined ? 0.3 : arguments[2];

    var f = (1 - Math.cos(weight * Math.PI)) / 2;
    return from * (1 - f) + to * f;
}

},{}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = circleDistribution;
function circleDistribution(radius) {
    var origin = arguments.length <= 1 || arguments[1] === undefined ? { x: 0, y: 0 } : arguments[1];
    var p = arguments.length <= 2 || arguments[2] === undefined ? { x: 0, y: 0 } : arguments[2];

    var r = Math.sqrt(Math.random()) * radius;
    var theta = Math.random() * Math.PI * 2;
    p.x = origin.x + Math.cos(theta) * r;
    p.y = origin.y + Math.sin(theta) * r;
    return p;
}

},{}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = clamp;
function clamp(value, min, max) {
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
}

},{}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = coinToss;
function coinToss() {
    var heads = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
    var tails = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    return Math.random() > 0.5 ? heads : tails;
}

},{}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = crossProduct2d;
/*
The sign tells us if a is to the left (-) or the right (+) of b
*/
function crossProduct2d(aX, aY, bX, bY) {
    return aX * bY - aY * bX;
}

},{}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = degrees;
var DEG = 180 / Math.PI;

function degrees(radians) {
    return radians * DEG;
}

},{}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = difference;
function difference(a, b) {
    return Math.abs(a - b);
}

},{}],71:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = distance;
function distance(x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

},{}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = distanceSQ;
function distanceSQ(x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return dx * dx + dy * dy;
}

},{}],73:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = dotProduct2d;
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
function dotProduct2d(aX, aY, bX, bY) {
    return aX * bX + aY * bY;
}

},{}],74:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getCirclePoints;
function getCirclePoints(originX, originY, radius, count, start, Class) {
    if (typeof start === 'undefined') {
        start = -Math.PI / 2;
    }

    var points = [],
        circ = Math.PI * 2,
        incr = circ / count;

    for (var i = start; i < circ + start; i += incr) {
        var ob = typeof Class === 'undefined' ? {} : new Class();
        ob.x = originX + radius * Math.cos(i);
        ob.y = originY + radius * Math.sin(i);
        points.push(ob);
    }

    return points;
}

},{}],75:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getIntersectionArea;
function getIntersectionArea(aX, aY, aW, aH, bX, bY, bW, bH) {
    var overlapX = Math.max(0, Math.min(aX + aW, bX + bW) - Math.max(aX, bX));
    var overlapY = Math.max(0, Math.min(aY + aH, bY + bH) - Math.max(aY, bY));
    return overlapX * overlapY;
}

},{}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getOverlapX;
function getOverlapX(aX, aW, bX, bW) {
    return Math.max(0, Math.min(aX + aW, bX + bW) - Math.max(aX, bX));
}

},{}],77:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getOverlapY;
function getOverlapY(aY, aH, bY, bH) {
    return Math.max(0, Math.min(aY + aH, bY + bH) - Math.max(aY, bY));
}

},{}],78:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _angle = require('./angle');

var _angle2 = _interopRequireDefault(_angle);

var _cerp = require('./cerp');

var _cerp2 = _interopRequireDefault(_cerp);

var _circleDistribution = require('./circleDistribution');

var _circleDistribution2 = _interopRequireDefault(_circleDistribution);

var _clamp = require('./clamp');

var _clamp2 = _interopRequireDefault(_clamp);

var _coinToss = require('./coinToss');

var _coinToss2 = _interopRequireDefault(_coinToss);

var _crossProduct2d = require('./crossProduct2d');

var _crossProduct2d2 = _interopRequireDefault(_crossProduct2d);

var _degrees = require('./degrees');

var _degrees2 = _interopRequireDefault(_degrees);

var _difference = require('./difference');

var _difference2 = _interopRequireDefault(_difference);

var _distance = require('./distance');

var _distance2 = _interopRequireDefault(_distance);

var _distanceSq = require('./distanceSq');

var _distanceSq2 = _interopRequireDefault(_distanceSq);

var _dotProduct2d = require('./dotProduct2d');

var _dotProduct2d2 = _interopRequireDefault(_dotProduct2d);

var _getCirclePoints = require('./getCirclePoints');

var _getCirclePoints2 = _interopRequireDefault(_getCirclePoints);

var _getIntersectionArea = require('./getIntersectionArea');

var _getIntersectionArea2 = _interopRequireDefault(_getIntersectionArea);

var _getOverlapX = require('./getOverlapX');

var _getOverlapX2 = _interopRequireDefault(_getOverlapX);

var _getOverlapY = require('./getOverlapY');

var _getOverlapY2 = _interopRequireDefault(_getOverlapY);

var _lerp = require('./lerp');

var _lerp2 = _interopRequireDefault(_lerp);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _normalize = require('./normalize');

var _normalize2 = _interopRequireDefault(_normalize);

var _orientation = require('./orientation');

var _orientation2 = _interopRequireDefault(_orientation);

var _percentRemaining = require('./percentRemaining');

var _percentRemaining2 = _interopRequireDefault(_percentRemaining);

var _perspective = require('./perspective');

var _perspective2 = _interopRequireDefault(_perspective);

var _quadraticCurve = require('./quadraticCurve');

var _quadraticCurve2 = _interopRequireDefault(_quadraticCurve);

var _radians = require('./radians');

var _radians2 = _interopRequireDefault(_radians);

var _random = require('./random');

var _random2 = _interopRequireDefault(_random);

var _randomInt = require('./randomInt');

var _randomInt2 = _interopRequireDefault(_randomInt);

var _randomSign = require('./randomSign');

var _randomSign2 = _interopRequireDefault(_randomSign);

var _rotatePoint = require('./rotatePoint');

var _rotatePoint2 = _interopRequireDefault(_rotatePoint);

var _rotateToDeg = require('./rotateToDeg');

var _rotateToDeg2 = _interopRequireDefault(_rotateToDeg);

var _rotateToRad = require('./rotateToRad');

var _rotateToRad2 = _interopRequireDefault(_rotateToRad);

var _roundTo = require('./roundTo');

var _roundTo2 = _interopRequireDefault(_roundTo);

var _roundToNearest = require('./roundToNearest');

var _roundToNearest2 = _interopRequireDefault(_roundToNearest);

var _size = require('./size');

var _size2 = _interopRequireDefault(_size);

var _smerp = require('./smerp');

var _smerp2 = _interopRequireDefault(_smerp);

var _smoothstep = require('./smoothstep');

var _smoothstep2 = _interopRequireDefault(_smoothstep);

var _splitValueAndUnit = require('./splitValueAndUnit');

var _splitValueAndUnit2 = _interopRequireDefault(_splitValueAndUnit);

var _weightedAverage = require('./weightedAverage');

var _weightedAverage2 = _interopRequireDefault(_weightedAverage);

var _weightedDistribution = require('./weightedDistribution');

var _weightedDistribution2 = _interopRequireDefault(_weightedDistribution);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    angle: _angle2.default,
    cerp: _cerp2.default,
    circleDistribution: _circleDistribution2.default,
    clamp: _clamp2.default,
    coinToss: _coinToss2.default,
    crossProduct2d: _crossProduct2d2.default,
    degrees: _degrees2.default,
    difference: _difference2.default,
    distance: _distance2.default,
    distanceSq: _distanceSq2.default,
    dotProduct2d: _dotProduct2d2.default,
    getCirclePoints: _getCirclePoints2.default,
    getIntersectionArea: _getIntersectionArea2.default,
    getOverlapX: _getOverlapX2.default,
    getOverlapY: _getOverlapY2.default,
    lerp: _lerp2.default,
    map: _map2.default,
    normalize: _normalize2.default,
    orientation: _orientation2.default,
    percentRemaining: _percentRemaining2.default,
    perspective: _perspective2.default,
    quadraticCurve: _quadraticCurve2.default,
    radians: _radians2.default,
    random: _random2.default,
    randomInt: _randomInt2.default,
    randomSign: _randomSign2.default,
    rotatePoint: _rotatePoint2.default,
    rotateToDeg: _rotateToDeg2.default,
    rotateToRad: _rotateToRad2.default,
    roundTo: _roundTo2.default,
    roundToNearest: _roundToNearest2.default,
    smerp: _smerp2.default,
    smoothstep: _smoothstep2.default,
    size: _size2.default,
    splitValueAndUnit: _splitValueAndUnit2.default,
    weightedAverage: _weightedAverage2.default,
    weightedDistribution: _weightedDistribution2.default
};

},{"./angle":63,"./cerp":64,"./circleDistribution":65,"./clamp":66,"./coinToss":67,"./crossProduct2d":68,"./degrees":69,"./difference":70,"./distance":71,"./distanceSq":72,"./dotProduct2d":73,"./getCirclePoints":74,"./getIntersectionArea":75,"./getOverlapX":76,"./getOverlapY":77,"./lerp":79,"./map":80,"./normalize":81,"./orientation":82,"./percentRemaining":83,"./perspective":84,"./quadraticCurve":85,"./radians":86,"./random":87,"./randomInt":88,"./randomSign":89,"./rotatePoint":90,"./rotateToDeg":91,"./rotateToRad":92,"./roundTo":93,"./roundToNearest":94,"./size":95,"./smerp":96,"./smoothstep":97,"./splitValueAndUnit":98,"./weightedAverage":99,"./weightedDistribution":100}],79:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = lerp;
function lerp(from, to) {
    var weight = arguments.length <= 2 || arguments[2] === undefined ? 0.3 : arguments[2];

    return from + (to - from) * weight;
}

},{}],80:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = map;
function map(v, a, b, x, y) {
    // value, min expected, max expected, map min, map max
    // e.g. map some value between 0 to 100 to -50 to 50
    // map(50, 0, 100, -50, 50) // 0
    // map(25, 0, 100, -50, 50) // -25
    return v === a ? x : (v - a) * (y - x) / (b - a) + x;
}

},{}],81:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = normalize;
function normalize(value, min, max) {
    return (value - min) / (max - min);
}

},{}],82:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = orientation;
function orientation(x, y) {
    return Math.atan2(y, x);
}

},{}],83:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = percentRemaining;
function percentRemaining(value, total) {
    return value % total / total;
}

},{}],84:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = perspective;
// x = x * perspective
// y = y * perspective
// scale = perspective

function perspective(z) {
    var focalLength = arguments.length <= 1 || arguments[1] === undefined ? 300 : arguments[1];

    return focalLength / (focalLength + z);
}

},{}],85:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = quadraticCurve;
function quadraticCurve(fromX, fromY, cpX, cpY, toX, toY) {
    var goThroughCP = arguments.length <= 6 || arguments[6] === undefined ? false : arguments[6];

    var n = 20;
    var points = [fromX, fromY];
    var xa = 0;
    var ya = 0;

    if (goThroughCP) {
        cpX = cpX * 2 - (fromX + toX) / 2;
        cpY = cpY * 2 - (fromY + toY) / 2;
    }

    for (var i = 1; i <= n; ++i) {
        var j = i / n;

        xa = fromX + (cpX - fromX) * j;
        ya = fromY + (cpY - fromY) * j;

        points.push(xa + (cpX + (toX - cpX) * j - xa) * j, ya + (cpY + (toY - cpY) * j - ya) * j);
    }

    return points;
}

},{}],86:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = radians;
var RAD = Math.PI / 180;

function radians(degrees) {
    return degrees * RAD;
}

},{}],87:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = random;
function random(min, max) {
    if (isNaN(max)) {
        max = min;
        min = 0;
    }
    return min + Math.random() * (max - min);
}

},{}],88:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = randomInt;
function randomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

},{}],89:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = randomSign;
function randomSign() {
    return Math.random() > 0.5 ? -1 : 1;
}

},{}],90:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = rotatePoint;
function rotatePoint(p, theta) {
    var origin = arguments.length <= 2 || arguments[2] === undefined ? { x: 0, y: 0 } : arguments[2];
    var p1 = arguments.length <= 3 || arguments[3] === undefined ? { x: 0, y: 0 } : arguments[3];

    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    p1.x = (p.x - origin.x) * cosTheta - (p.y - origin.y) * sinTheta;
    p1.y = (p.x - origin.x) * sinTheta + (p.y - origin.y) * cosTheta;
    p1.x += origin.x;
    p1.y += origin.y;
    return p1;
}

},{}],91:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = rotateToDeg;
function rotateToDeg(start, end) {
    var diff = (end - start) % 360;
    if (diff !== diff % 180) {
        diff = diff < 0 ? diff + 360 : diff - 360;
    }
    return start + diff;
}

},{}],92:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = rotateToRAD;
var PI2 = Math.PI * 2;

function rotateToRAD(start, end) {
    var diff = (end - start) % PI2;
    if (diff !== diff % Math.PI) {
        diff = diff < 0 ? diff + PI2 : diff - PI2;
    }
    return start + diff;
}

},{}],93:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = roundTo;
function roundTo(x) {
    var places = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

    var div = Math.pow(10, places);
    return Math.round(x * div) / div;
}

},{}],94:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = roundToNearest;
function roundToNearest(value, unit) {
    return Math.round(value / unit) * unit;
}

},{}],95:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = size;
function getScale(method, width, height, areaWidth, areaHeight) {
    switch (method) {
        case 'cover':
            return Math.max(areaWidth / width, areaHeight / height);
        case 'contain':
            return Math.min(areaWidth / width, areaHeight / height);
        case 'width':
            return areaWidth / width;
        case 'height':
            return areaHeight / height;
        default:
            break;
    }
    return 1;
}

function size(rect, areaWidth, areaHeight) {
    var method = arguments.length <= 3 || arguments[3] === undefined ? 'cover' : arguments[3];
    var autoCenter = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];

    var scale = getScale(method, rect.width, rect.height, areaWidth, areaHeight);
    var width = Math.ceil(rect.width * scale);
    var height = Math.ceil(rect.height * scale);

    var x = 0,
        y = 0;

    if (autoCenter) {
        x = Math.round((areaWidth - width) * 0.5);
        y = Math.round((areaHeight - height) * 0.5);
    }

    return {
        x: x,
        y: y,
        width: width,
        height: height,
        scale: scale
    };
}

},{}],96:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = smerp;

var _smoothstep = require('./smoothstep');

var _smoothstep2 = _interopRequireDefault(_smoothstep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function smerp(from, to, startTime, endTime, time) {
    return from + (to - from) * (0, _smoothstep2.default)(startTime, endTime, time);
}

},{"./smoothstep":97}],97:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = smoothstep;

var _clamp = require('./clamp');

var _clamp2 = _interopRequireDefault(_clamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function smoothstep(min, max, value) {
    var x = (0, _clamp2.default)((value - min) / (max - min), 0, 1);
    return x * x * (3 - 2 * x);
}

},{"./clamp":66}],98:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = splitValueAndUnit;
function splitValueAndUnit(prop) {
    var re = /(^-?\d*\.?\d*)(.*)/;
    var match = prop.match(re);
    var value = Number(match[1]);
    var unit = match[2];
    return { value: value, unit: unit };
}

},{}],99:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = weightedAverage;
function weightedAverage(from, to) {
    var weight = arguments.length <= 2 || arguments[2] === undefined ? 10 : arguments[2];

    return (from * (weight - 1) + to) / weight;
}

},{}],100:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = weightedDistribution;

var _random = require('./random');

var _random2 = _interopRequireDefault(_random);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// greater probability of being halfway betweeen min and max

function weightedDistribution(min, max) {
    var weight = arguments.length <= 2 || arguments[2] === undefined ? 5 : arguments[2];

    var total = 0;
    for (var i = 0; i < weight; i++) {
        total += (0, _random2.default)(min, max);
    }
    return total / weight;
}

},{"./random":87}],101:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cuepointsReader;
function cuepointsReader() {
    var list = [];
    var reader = void 0;
    var dispatch = void 0;
    var currentPosition = 0;
    var lastPosition = -1;
    var tolerance = 0.2;

    function add(position, name, data) {
        list.push({ position: position, name: name, data: data });

        list.sort(function (a, b) {
            return a.position - b.position;
        });

        return reader;
    }

    function onCuepoint(fn, thisArg) {
        if (fn) {
            dispatch = thisArg ? fn.bind(thisArg) : fn;
        } else {
            dispatch = null;
        }
        return reader;
    }

    function reset() {
        currentPosition = 0;
        lastPosition = -1;
        return reader;
    }

    function removeAll() {
        list.length = 0;
        return reset();
    }

    function setTolerance(value) {
        tolerance = value;
        return reader;
    }

    function inRange(cuepointPos, currentPos, lastPos) {
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
    }

    function check(currentPos, lastPos) {
        if (currentPos <= lastPos) {
            return;
        }
        if (typeof dispatch !== 'function') {
            return;
        }

        list.some(function (item) {
            if (inRange(item.position, currentPos, lastPos)) {
                dispatch(item);
                return true;
            }
        });
    }

    function update(position) {
        currentPosition = position;
        check(currentPosition, lastPosition);
        lastPosition = currentPosition;
        return reader;
    }

    reader = Object.freeze({
        add: add,
        onCuepoint: onCuepoint,
        removeAll: removeAll,
        reset: reset,
        setTolerance: setTolerance,
        update: update
    });

    return reader;
}

},{}],102:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = iOSPlayVideoInline;
function iOSPlayVideoInline(el) {
    var loop = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var frameTime = 1 / 25;

    var self = void 0,
        lastTime = 0,
        playing = false;

    // This can (and should) be put in a css file instead of doing styleSheets[0].insertRule:
    var cssRule = '.iOSPlayVideoInline::-webkit-media-controls { display:none !important; }';
    document.styleSheets[0].insertRule(cssRule, 0);

    el.removeAttribute('controls');
    el.classList.add('iOSPlayVideoInline');

    function seek(time) {
        el.currentTime = time;
        return self;
    }

    function pause() {
        playing = false;
        return self;
    }

    function updateFrame() {
        if (!playing) {
            return;
        }

        window.requestAnimationFrame(updateFrame);

        var now = Date.now();
        var deltaTime = now - lastTime;

        if (deltaTime >= frameTime * 1000) {
            lastTime = now;

            var ended = el.currentTime + frameTime >= el.duration;

            if (ended && loop) {
                seek(0);
            } else if (ended) {
                pause();
                // self.emit('ended');
            } else {
                    seek(el.currentTime + frameTime);
                }

            // self.emit('timeupdate', el.currentTime, self);
        }
    }

    function play() {
        playing = true;
        updateFrame();
        return self;
    }

    function destroy() {
        // self.removeAllListeners();
        pause();
        window.cancelAnimationFrame(updateFrame);

        return self;
    }

    // self = Object.create(Emitter.prototype, {
    self = Object.create(null, {
        _events: {
            value: {}
        },
        destroy: {
            value: destroy
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
            get: function get() {
                return el;
            }
        },
        currentTime: {
            get: function get() {
                return el.currentTime;
            }
        },
        duration: {
            get: function get() {
                return el.duration;
            }
        },
        loop: {
            get: function get() {
                return loop;
            },
            set: function set(value) {
                loop = value;
            }
        },
        playing: {
            get: function get() {
                return playing;
            }
        }
    });

    return Object.freeze(self);
}

},{}],103:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cuepointsReader = require('./cuepointsReader');

var _cuepointsReader2 = _interopRequireDefault(_cuepointsReader);

var _iOSPlayVideoInline = require('./iOSPlayVideoInline');

var _iOSPlayVideoInline2 = _interopRequireDefault(_iOSPlayVideoInline);

var _videoPlayer = require('./videoPlayer');

var _videoPlayer2 = _interopRequireDefault(_videoPlayer);

var _vimeo = require('./vimeo');

var _vimeo2 = _interopRequireDefault(_vimeo);

var _youtube = require('./youtube');

var _youtube2 = _interopRequireDefault(_youtube);

var _youtubeBasic = require('./youtubeBasic');

var _youtubeBasic2 = _interopRequireDefault(_youtubeBasic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    cuepointsReader: _cuepointsReader2.default,
    iOSPlayVideoInline: _iOSPlayVideoInline2.default,
    videoPlayer: _videoPlayer2.default,
    vimeo: _vimeo2.default,
    youtube: _youtube2.default,
    youtubeBasic: _youtubeBasic2.default
};

},{"./cuepointsReader":101,"./iOSPlayVideoInline":102,"./videoPlayer":104,"./vimeo":105,"./youtube":106,"./youtubeBasic":107}],104:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = videoPlayer;

var _emitter = require('../events/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function videoPlayer(videoEl) {
    var el = videoEl || document.createElement('video');
    var player = void 0;

    function metadataHandler() {
        player.emit('metadata', {
            src: el.currentSrc,
            width: el.videoWidth,
            height: el.videoHeight,
            duration: el.duration
        });
    }

    function canplayHandler() {
        player.emit('ready');
    }

    function playHandler() {
        player.emit('play');
    }

    function endedHandler() {
        player.emit('ended');
    }

    function errorHandler() {
        player.emit('error', el.error);
    }

    function timeupdateHandler() {
        player.emit('timeupdate', el.currentTime);
    }

    function removeEventListeners() {
        el.removeEventListener('loadedmetadata', metadataHandler);
        el.removeEventListener('canplaythrough', canplayHandler);
        el.removeEventListener('play', playHandler);
        el.removeEventListener('playing', playHandler);
        el.removeEventListener('error', errorHandler);
        el.removeEventListener('ended', endedHandler);
        el.removeEventListener('timeupdate', timeupdateHandler);
    }

    function addEventListeners() {
        removeEventListeners();

        el.addEventListener('loadedmetadata', metadataHandler, false);
        el.addEventListener('canplaythrough', canplayHandler, false);
        el.addEventListener('play', playHandler, false);
        el.addEventListener('playing', playHandler, false);
        el.addEventListener('error', errorHandler, false);
        el.addEventListener('ended', endedHandler, false);
        el.addEventListener('timeupdate', timeupdateHandler, false);
    }

    function destroy() {
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
    }

    function getBlobURL(url) {
        url = window.URL.createObjectURL(url);
        function revoke() {
            el.removeEventListener('canplaythrough', revoke);
            window.URL.revokeObjectURL(url);
        }
        el.addEventListener('canplaythrough', revoke);
        return url;
    }

    function load(url) {
        if (window.Blob && url instanceof window.Blob) {
            url = getBlobURL(url);
        }
        addEventListeners();

        el.crossOrigin = 'anonymous';
        el.preload = 'auto';
        el.src = url;
        el.load();

        return player;
    }

    function play() {
        el.play();

        return player;
    }

    function pause() {
        el.pause();

        return player;
    }

    function seek(time) {
        try {
            el.currentTime = time;
        } catch (e) {}

        return player;
    }

    addEventListeners();

    player = Object.create(_emitter2.default.prototype, {
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
            get: function get() {
                return el;
            }
        },
        currentTime: {
            get: function get() {
                return el.currentTime;
            },
            set: function set(value) {
                el.currentTime = value;
            }
        },
        duration: {
            get: function get() {
                return el.duration;
            }
        },
        volume: {
            get: function get() {
                return el.volume;
            },
            set: function set(value) {
                el.volume = value;
            }
        }
    });

    return Object.freeze(player);
}

},{"../events/emitter":37}],105:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = vimeo;

var _emitter = require('../events/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://developer.vimeo.com/player/js-api

function vimeo(el) {
    var vimeoPlayer = el.contentWindow;
    var re = /^https?:\/\/player.vimeo.com/;
    var player = void 0,
        origin = '*',
        _paused = false;

    function sendCommand(method) {
        var value = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

        var data = {
            method: method
        };

        if (value) {
            data.value = value;
        }

        var message = JSON.stringify(data);
        vimeoPlayer.postMessage(message, origin);
    }

    function play() {
        _paused = false;
        sendCommand('play');
    }

    function pause() {
        _paused = true;
        sendCommand('pause');
    }

    function onReady() {
        sendCommand('addEventListener', 'play');
        sendCommand('addEventListener', 'pause');
        sendCommand('addEventListener', 'finish');
        sendCommand('addEventListener', 'playProgress');
        player.emit('ready');
    }

    function onPlay() {
        _paused = false;
        player.emit('play');
    }

    function onPause() {
        _paused = true;
        player.emit('pause');
    }

    function onFinish() {
        player.emit('ended');
    }

    function onPlayProgress(data) {
        player.emit('timeupdate', data.seconds);
    }

    function onMessage(event) {
        var isVimeo = re.test(event.origin);

        if (!isVimeo) {
            return;
        }

        var data = JSON.parse(event.data);

        if (data.player_id && el.id !== data.player_id) {
            return;
        }

        if (origin === '*') {
            origin = event.origin;
        }

        switch (data.event) {
            case 'ready':
                onReady(data.player_id);
                break;
            case 'playProgress':
                onPlayProgress(data.data);
                break;
            case 'play':
                onPlay();
                break;
            case 'pause':
                onPause();
                break;
            case 'finish':
                onFinish();
                break;
            default:
                break;
        }
    }

    function destroy() {
        window.removeEventListener('message', onMessage);
    }

    window.addEventListener('message', onMessage);

    player = Object.assign(Object.create(_emitter2.default.prototype), {
        _events: {},
        play: play,
        pause: pause,
        paused: function paused() {
            return _paused;
        },
        destroy: destroy
    });

    return player;
}

},{"../events/emitter":37}],106:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = youtube;

var _events = require('events');

function youtube(el) {
    var emitter = null,
        player = null,
        _paused = false;

    function play() {
        _paused = false;
        player.playVideo();
        return emitter;
    }

    function pause() {
        _paused = true;
        player.pauseVideo();
        return emitter;
    }

    function onReady() {
        emitter.emit('ready');
    }

    function onStateChange(event) {
        var PlayerState = window.YT.PlayerState;


        switch (event.data) {
            case PlayerState.CUED:
            case PlayerState.BUFFERING:
                break;
            case PlayerState.PLAYING:
                _paused = false;
                emitter.emit('play');
                break;
            case PlayerState.PAUSED:
                _paused = true;
                emitter.emit('pause');
                break;
            case PlayerState.ENDED:
                emitter.emit('ended');
                break;
            default:
                break;
        }
    }

    function destroy() {}

    function createPlayer() {
        if (player) {
            return;
        }

        player = new window.YT.Player(el, {
            events: {
                onReady: onReady,
                onStateChange: onStateChange
            }
        });
    }

    if (window.YT) {
        createPlayer();
    } else if (window.ytPlayerCalls) {
        window.ytPlayerCalls.push(createPlayer);
    } else {
        window.ytPlayerCalls = [createPlayer];
        window.onYouTubeIframeAPIReady = function () {
            window.ytPlayerCalls.forEach(function (call) {
                return call();
            });
        };
        var script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(script);
    }

    emitter = Object.assign(Object.create(_events.EventEmitter.prototype), {
        _events: {},
        play: play,
        pause: pause,
        paused: function paused() {
            return _paused;
        },
        destroy: destroy
    });

    return emitter;
} // https://developers.google.com/youtube/iframe_api_reference#Events

},{"events":108}],107:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = youtubeBasic;
function youtubeBasic(el) {
    var iframe = el.contentWindow;

    function sendCommand(command) {
        iframe.postMessage('{"event":"command","func":"' + command + '","args":""}', '*');
    }

    function play() {
        sendCommand('playVideo');
    }

    function pause() {
        sendCommand('pauseVideo');
    }

    return {
        play: play,
        pause: pause
    };
}

},{}],108:[function(require,module,exports){
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

},{}],109:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MiniSignalBinding = (function () {
  function MiniSignalBinding(fn, once, thisArg) {
    if (once === undefined) once = false;

    _classCallCheck(this, MiniSignalBinding);

    this._fn = fn;
    this._once = once;
    this._thisArg = thisArg;
    this._next = this._prev = this._owner = null;
  }

  _createClass(MiniSignalBinding, [{
    key: 'detach',
    value: function detach() {
      if (this._owner === null) return false;
      this._owner.detach(this);
      return true;
    }
  }]);

  return MiniSignalBinding;
})();

function _addMiniSignalBinding(self, node) {
  if (!self._head) {
    self._head = node;
    self._tail = node;
  } else {
    self._tail._next = node;
    node._prev = self._tail;
    self._tail = node;
  }

  node._owner = self;

  return node;
}

var MiniSignal = (function () {
  function MiniSignal() {
    _classCallCheck(this, MiniSignal);

    this._head = this._tail = undefined;
  }

  _createClass(MiniSignal, [{
    key: 'handlers',
    value: function handlers() {
      var exists = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      var node = this._head;

      if (exists) return !!node;

      var ee = [];

      while (node) {
        ee.push(node);
        node = node._next;
      }

      return ee;
    }
  }, {
    key: 'has',
    value: function has(node) {
      if (!(node instanceof MiniSignalBinding)) {
        throw new Error('MiniSignal#has(): First arg must be a MiniSignalBinding object.');
      }

      return node._owner === this;
    }
  }, {
    key: 'dispatch',
    value: function dispatch() {
      var node = this._head;

      if (!node) return false;

      while (node) {
        if (node._once) this.detach(node);
        node._fn.apply(node._thisArg, arguments);
        node = node._next;
      }

      return true;
    }
  }, {
    key: 'add',
    value: function add(fn) {
      var thisArg = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      if (typeof fn !== 'function') {
        throw new Error('MiniSignal#add(): First arg must be a Function.');
      }
      return _addMiniSignalBinding(this, new MiniSignalBinding(fn, false, thisArg));
    }
  }, {
    key: 'once',
    value: function once(fn) {
      var thisArg = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

      if (typeof fn !== 'function') {
        throw new Error('MiniSignal#once(): First arg must be a Function.');
      }
      return _addMiniSignalBinding(this, new MiniSignalBinding(fn, true, thisArg));
    }
  }, {
    key: 'detach',
    value: function detach(node) {
      if (!(node instanceof MiniSignalBinding)) {
        throw new Error('MiniSignal#detach(): First arg must be a MiniSignalBinding object.');
      }
      if (node._owner !== this) return this;

      if (node._prev) node._prev._next = node._next;
      if (node._next) node._next._prev = node._prev;

      if (node === this._head) {
        this._head = node._next;
        if (node._next === null) {
          this._tail = null;
        }
      } else if (node === this._tail) {
        this._tail = node._prev;
        this._tail._next = null;
      }

      node._owner = null;
      return this;
    }
  }, {
    key: 'detachAll',
    value: function detachAll() {
      var node = this._head;
      if (!node) return this;

      this._head = this._tail = null;

      while (node) {
        node._owner = null;
        node = node._next;
      }
      return this;
    }
  }]);

  return MiniSignal;
})();

MiniSignal.MiniSignalBinding = MiniSignalBinding;

exports['default'] = MiniSignal;
module.exports = exports['default'];

},{}],110:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = objectPool;
function objectPool(factoryFn) {

    var pool = [];
    var numCreated = 0;

    return {
        getPool: function getPool() {
            return pool;
        },
        get: function get() {
            if (pool.length > 0) {
                return pool.pop();
            } else {
                numCreated++;
                return factoryFn();
            }
        },
        dispose: function dispose(instance) {
            pool.push(instance);
        },
        fill: function fill(count) {
            while (pool.length < count) {
                numCreated++;
                pool[pool.length] = factoryFn();
            }
        },
        empty: function empty() {
            pool = [];
        },
        getNumCreated: function getNumCreated() {
            return numCreated;
        }
    };
}

},{}],111:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var abs = Math.abs;
var atan2 = Math.atan2;
var cos = Math.cos;
var sin = Math.sin;
var sqrt = Math.sqrt;

var Particle = function () {
    function Particle(options) {
        _classCallCheck(this, Particle);

        this.opts = options;

        this._bounds = {};
        this._outerBounds = {};

        this._defaults = {
            alive: true,
            x: 0,
            y: 0,
            angle: 0,
            speed: 0,
            gravity: 0,
            mass: 1,
            radius: 0,
            bounce: { x: -1, y: -1 },
            friction: 1,
            lifeTime: 0,
            bounds: { x: 0, y: 0, width: 1280, height: 720 }
        };

        this._props = Object.keys(this._defaults);

        this.reset(options);
    }

    _createClass(Particle, [{
        key: 'reset',
        value: function reset(options) {
            var defs = this._defaults;
            var props = this._props;
            var opts = options || defs;

            for (var i = 0; i < props.length; i++) {
                var key = props[i];
                var value = opts[key] || defs[key];
                this[key] = value;
                defs[key] = value;
            }

            var angle = opts.angle || defs.angle;
            var speed = opts.speed || defs.speed;

            this.vx = cos(angle) * speed;
            this.vy = sin(angle) * speed;

            return this;
        }
    }, {
        key: 'update',
        value: function update() {
            this.vx *= this.friction;
            this.vy *= this.friction;
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            return this;
        }
    }, {
        key: 'accellerate',
        value: function accellerate(speed, angle) {
            if (typeof angle === 'undefined') {
                angle = this.angle;
            }
            this.vx += cos(angle) * speed;
            this.vy += sin(angle) * speed;
            return this;
        }
    }, {
        key: 'setBounds',
        value: function setBounds(x, y, width, height) {
            this._bounds.x = x || 0;
            this._bounds.y = y || 0;
            this._bounds.width = width;
            this._bounds.height = height;
        }
    }, {
        key: 'angleTo',
        value: function angleTo(p) {
            return atan2(p.y - this.y, p.x - this.x);
        }
    }, {
        key: 'distanceTo',
        value: function distanceTo(p) {
            var dx = p.x - this.x;
            var dy = p.y - this.y;
            return sqrt(dx * dx + dy * dy);
        }
    }, {
        key: 'moveTo',
        value: function moveTo(p) {
            var thrust = arguments.length <= 1 || arguments[1] === undefined ? 0.005 : arguments[1];

            var dx = p.x - this.x;
            var dy = p.y - this.y;

            this.vx += dx * thrust;
            this.vy += dy * thrust;

            if (abs(this.vx) > abs(dx)) {
                this.vx = dx;
            }

            if (abs(this.vy) > abs(dy)) {
                this.vy = dy;
            }

            return this;
        }
    }, {
        key: 'gravitateTo',
        value: function gravitateTo(p) {
            var dx = p.x - this.x;
            var dy = p.y - this.y;
            var distSq = dx * dx + dy * dy;
            if (distSq > 0) {
                var dist = sqrt(distSq);
                var force = p.mass / distSq;
                var ax = dx / dist * force;
                var ay = dy / dist * force;
                this.vx += ax;
                this.vy += ay;
            }

            return this;
        }
    }, {
        key: 'springTo',
        value: function springTo(p, stiffness, length) {
            var dx = p.x - this.x;
            var dy = p.y - this.y;
            var distance = sqrt(dx * dx + dy * dy);
            var force = (distance - (length || 0)) * (stiffness || 0.2);

            if (abs(distance * force) > 0) {
                this.vx += dx / distance * force;
                this.vy += dy / distance * force;
            }

            return this;
        }
    }, {
        key: 'collides',
        value: function collides(p) {
            return this.distanceTo(p) <= this.radius + p.radius;
        }
    }, {
        key: 'edgeCollide',
        value: function edgeCollide() {
            var left = this._bounds.x + this.radius;
            var right = this._bounds.x + this._bounds.width - this.radius;
            var top = this._bounds.y + this.radius;
            var bottom = this._bounds.y + this._bounds.height - this.radius;

            if (this.x < left) {
                this.x = left;
                this.vx = this.vx * this.bounce.x;
            }

            if (this.x > right) {
                this.x = right;
                this.vx = this.vx * this.bounce.x;
            }

            if (this.y < top) {
                this.y = top;
                this.vy = this.vy * this.bounce.y;
            }

            if (this.y > bottom) {
                this.y = bottom;
                this.vy = this.vy * this.bounce.y;
            }
        }
    }, {
        key: 'edgeWrap',
        value: function edgeWrap() {
            var _outerBounds = this.outerBounds;
            var left = _outerBounds.left;
            var right = _outerBounds.right;
            var top = _outerBounds.top;
            var bottom = _outerBounds.bottom;


            if (this.x < left) {
                this.x = right;
            }

            if (this.x > right) {
                this.x = left;
            }

            if (this.y < top) {
                this.y = bottom;
            }

            if (this.y > bottom) {
                this.y = top;
            }
        }
    }, {
        key: 'edgeKill',
        value: function edgeKill() {
            var _outerBounds2 = this.outerBounds;
            var left = _outerBounds2.left;
            var right = _outerBounds2.right;
            var top = _outerBounds2.top;
            var bottom = _outerBounds2.bottom;


            if (this.x < left || this.x > right || this.y < top || this.y > bottom) {
                this.alive = false;
            }
        }
    }, {
        key: 'edgeReset',
        value: function edgeReset() {
            var _outerBounds3 = this.outerBounds;
            var left = _outerBounds3.left;
            var right = _outerBounds3.right;
            var top = _outerBounds3.top;
            var bottom = _outerBounds3.bottom;


            if (this.x < left || this.x > right || this.y < top || this.y > bottom) {
                this.reset();
            }
        }
    }, {
        key: 'lifeKill',
        value: function lifeKill() {
            this.lifeTime--;

            if (this.lifeTime <= 0) {
                this.alive = false;
            }
        }
    }, {
        key: 'speed',
        get: function get() {
            if (this.vx === 0 && this.vy === 0) {
                return 0;
            }
            return sqrt(this.vx * this.vx + this.vy * this.vy);
        },
        set: function set(value) {
            var angle = this.angle;
            this.vx = cos(angle) * value;
            this.vy = sin(angle) * value;
        }
    }, {
        key: 'angle',
        get: function get() {
            if (this.vx === 0 && this.vy === 0) {
                return 0;
            }
            return atan2(this.vy, this.vx);
        },
        set: function set(value) {
            var speed = this.speed;
            this.vx = cos(value) * speed;
            this.vy = sin(value) * speed;
        }
    }, {
        key: 'bounds',
        get: function get() {
            return this._bounds;
        },
        set: function set(ob) {
            var x = ob.x;
            var y = ob.y;
            var width = ob.width;
            var height = ob.height;

            this.setBounds(x, y, width, height);
        }
    }, {
        key: 'left',
        get: function get() {
            return this.x - this.radius;
        }
    }, {
        key: 'right',
        get: function get() {
            return this.x + this.radius;
        }
    }, {
        key: 'top',
        get: function get() {
            return this.y - this.radius;
        }
    }, {
        key: 'bottom',
        get: function get() {
            return this.y + this.radius;
        }
    }, {
        key: 'outerBounds',
        get: function get() {
            this._outerBounds.left = this._bounds.x - this.radius;
            this._outerBounds.right = this._bounds.x + this._bounds.width + this.radius;
            this._outerBounds.top = this._bounds.y - this.radius;
            this._outerBounds.bottom = this._bounds.y + this._bounds.height + this.radius;
            return this._outerBounds;
        }
    }]);

    return Particle;
}();

exports.default = Particle;

},{}],112:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = androidNative;

var _android = require('../os/android');

var _android2 = _interopRequireDefault(_android);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//http://stackoverflow.com/questions/14403766/how-to-detect-the-stock-android-browser
function androidNative() {
    var ua = arguments.length <= 0 || arguments[0] === undefined ? navigator.userAgent : arguments[0];

    if (!(0, _android2.default)(ua)) {
        return false;
    }

    var isAndroidMobile = ua.indexOf('Mozilla/5.0') > -1 && ua.indexOf('AppleWebKit') > -1;

    var reAppleWebKit = /AppleWebKit\/([\d.]+)/;
    var resultAppleWebKit = reAppleWebKit.exec(ua);
    var appleWebKitVersion = resultAppleWebKit ? parseFloat(reAppleWebKit.exec(ua)[1]) : null;

    var reChrome = /Chrome\/([\d.]+)/;
    var resultChrome = reChrome.exec(ua);
    var chromeVersion = resultChrome ? parseFloat(reChrome.exec(ua)[1]) : null;

    return isAndroidMobile && appleWebKitVersion && appleWebKitVersion < 537 || chromeVersion && chromeVersion < 37;
}

},{"../os/android":117}],113:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ieVersion;
function ieVersion() {
    var ua = arguments.length <= 0 || arguments[0] === undefined ? navigator.userAgent : arguments[0];

    var v = 0;
    if (/MSIE (\d+\.\d+);/.test(ua)) {
        v = parseInt(RegExp.$1, 10);
    } else if (/Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/.test(ua)) {
        v = parseInt(RegExp.$3, 10);
    }
    return v;
}

},{}],114:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _os = require('../os');

var _os2 = _interopRequireDefault(_os);

var _ieVersion = require('./ieVersion');

var _ieVersion2 = _interopRequireDefault(_ieVersion);

var _androidNative = require('./androidNative');

var _androidNative2 = _interopRequireDefault(_androidNative);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ua = navigator.userAgent;
var chromeiOS = function chromeiOS() {
    return _os2.default.ios() && /CriOS/.test(ua);
};
var firefox = function firefox() {
    return (/Firefox/.test(ua)
    );
};
var ie = function ie() {
    return (0, _ieVersion2.default)() > 0;
};
var safari = function safari() {
    return !/Android/.test(ua) && !/Chrome/.test(ua) && /Safari/.test(ua);
};
var safariMobile = function safariMobile() {
    return _os2.default.ios() && /AppleWebKit/.test(ua);
};

exports.default = {
    androidNative: _androidNative2.default,
    chromeiOS: chromeiOS,
    firefox: firefox,
    ie: ie,
    ieVersion: _ieVersion2.default,
    safari: safari,
    safariMobile: safariMobile
};

},{"../os":119,"./androidNative":112,"./ieVersion":113}],115:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ua = navigator.userAgent;

var ipad = function ipad() {
    return (/iPad/i.test(ua)
    );
};
var ipod = function ipod() {
    return (/iPod/i.test(ua)
    );
};
var iphone = function iphone() {
    return (/iPhone/i.test(ua)
    );
};
var mobile = function mobile() {
    return !!ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|SymbianOS/i);
};
var desktop = function desktop() {
    return !mobile();
};

exports.default = {
    desktop: desktop,
    ipad: ipad,
    iphone: iphone,
    ipod: ipod,
    mobile: mobile
};

},{}],116:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _browser = require('./browser');

var _browser2 = _interopRequireDefault(_browser);

var _device = require('./device');

var _device2 = _interopRequireDefault(_device);

var _os = require('./os');

var _os2 = _interopRequireDefault(_os);

var _supports = require('./supports');

var _supports2 = _interopRequireDefault(_supports);

var _screen = require('./screen');

var _screen2 = _interopRequireDefault(_screen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var local = /^(?:https?:\/\/)?(?:localhost|192\.168)/.test(window.location.href);

exports.default = {
    browser: _browser2.default,
    device: _device2.default,
    os: _os2.default,
    supports: _supports2.default,
    screen: _screen2.default,
    local: local
};

},{"./browser":114,"./device":115,"./os":119,"./screen":126,"./supports":128}],117:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var ua = arguments.length <= 0 || arguments[0] === undefined ? navigator.userAgent : arguments[0];

    return (/Android/i.test(ua)
    );
};

},{}],118:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = androidVersion;

var _android = require('./android');

var _android2 = _interopRequireDefault(_android);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function androidVersion() {
    var ua = arguments.length <= 0 || arguments[0] === undefined ? navigator.userAgent : arguments[0];

    if (!(0, _android2.default)(ua)) {
        return 0;
    }
    var version = ua.match(/Android (\d+(?:\.\d+)+);/)[1];

    var _version$split = version.split('.');

    var _version$split2 = _slicedToArray(_version$split, 2);

    var a = _version$split2[0];
    var b = _version$split2[1];

    return parseFloat(a + '.' + b);
}

},{"./android":117}],119:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _android = require('./android');

var _android2 = _interopRequireDefault(_android);

var _androidVersion = require('./androidVersion');

var _androidVersion2 = _interopRequireDefault(_androidVersion);

var _ios = require('./ios');

var _ios2 = _interopRequireDefault(_ios);

var _iosVersion = require('./iosVersion');

var _iosVersion2 = _interopRequireDefault(_iosVersion);

var _linux = require('./linux');

var _linux2 = _interopRequireDefault(_linux);

var _mac = require('./mac');

var _mac2 = _interopRequireDefault(_mac);

var _windows = require('./windows');

var _windows2 = _interopRequireDefault(_windows);

var _windowsPhone = require('./windowsPhone');

var _windowsPhone2 = _interopRequireDefault(_windowsPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    android: _android2.default,
    androidVersion: _androidVersion2.default,
    ios: _ios2.default,
    iosVersion: _iosVersion2.default,
    linux: _linux2.default,
    mac: _mac2.default,
    windows: _windows2.default,
    windowsPhone: _windowsPhone2.default
};

},{"./android":117,"./androidVersion":118,"./ios":120,"./iosVersion":121,"./linux":122,"./mac":123,"./windows":124,"./windowsPhone":125}],120:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ios;
function ios() {
    var ua = arguments.length <= 0 || arguments[0] === undefined ? navigator.userAgent : arguments[0];

    return (/iP[ao]d|iPhone/i.test(ua)
    );
}

},{}],121:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = iosVersion;

var _ios = require('./ios');

var _ios2 = _interopRequireDefault(_ios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function iosVersion() {
    var ua = arguments.length <= 0 || arguments[0] === undefined ? navigator.userAgent : arguments[0];

    if ((0, _ios2.default)(ua)) {
        var _ua$match = ua.match(/OS (\d+)_(\d+)/i);

        var _ua$match2 = _slicedToArray(_ua$match, 3);

        var b = _ua$match2[1];
        var c = _ua$match2[2];

        if (b && c) {
            return parseFloat(b + '.' + c);
        }
    }
    return 0;
}

},{"./ios":120}],122:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = linux;

var _android = require('./android');

var _android2 = _interopRequireDefault(_android);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function linux() {
    var ua = arguments.length <= 0 || arguments[0] === undefined ? navigator.userAgent : arguments[0];

    return !(0, _android2.default)(ua) && /Linux/.test(ua);
}

},{"./android":117}],123:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = mac;

var _ios = require('./ios');

var _ios2 = _interopRequireDefault(_ios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mac() {
    var ua = arguments.length <= 0 || arguments[0] === undefined ? navigator.userAgent : arguments[0];

    return !(0, _ios2.default)(ua) && /Mac OS/.test(ua);
}

},{"./ios":120}],124:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = windows;

var _windowsPhone = require('./windowsPhone');

var _windowsPhone2 = _interopRequireDefault(_windowsPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function windows() {
    var ua = arguments.length <= 0 || arguments[0] === undefined ? navigator.userAgent : arguments[0];

    return !(0, _windowsPhone2.default)(ua) && /Windows/.test(ua);
}

},{"./windowsPhone":125}],125:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = windowsPhone;
function windowsPhone() {
    var ua = arguments.length <= 0 || arguments[0] === undefined ? navigator.userAgent : arguments[0];

    return (/Windows Phone/i.test(ua)
    );
}

},{}],126:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// screen.width / screen.height is often wrong in Android
var height = function height() {
    return Math.max(window.outerHeight, window.screen.height);
};
var width = function width() {
    return Math.max(window.outerWidth, window.screen.width);
};
var dpr = function dpr() {
    return window.devicePixelRatio || 1;
};
var retina = function retina() {
    return dpr() > 1;
};

exports.default = {
    width: width,
    height: height,
    dpr: dpr,
    retina: retina
};

},{}],127:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return !!window.DeviceOrientationEvent;
};

},{}],128:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _webgl = require('./webgl');

var _webgl2 = _interopRequireDefault(_webgl);

var _webm = require('./webm');

var _webm2 = _interopRequireDefault(_webm);

var _mp = require('./mp4');

var _mp2 = _interopRequireDefault(_mp);

var _deviceOrientation = require('./deviceOrientation');

var _deviceOrientation2 = _interopRequireDefault(_deviceOrientation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    webgl: _webgl2.default,
    webm: _webm2.default,
    mp4: _mp2.default,
    deviceOrientation: _deviceOrientation2.default
};

},{"./deviceOrientation":127,"./mp4":129,"./webgl":130,"./webm":131}],129:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var videoEl = document.createElement('video');

exports.default = function () {
  return !!(videoEl.canPlayType && videoEl.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'));
};

},{}],130:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = webgl;
function webgl() {
    try {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!(window.WebGLRenderingContext && context);
    } catch (e) {
        return false;
    }
}

},{}],131:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var videoEl = document.createElement('video');

exports.default = function () {
  return !!(videoEl.canPlayType && videoEl.canPlayType('video/webm; codecs="vp8, vorbis"'));
};

},{}],132:[function(require,module,exports){
'use strict';

/*
 * classList (partial polyfill for IE 10, IE 11 and Firefox <24)
 * adapted from: https://github.com/eligrey/classList.js/blob/master/classList.js
 */

(function () {

    var testElement = document.createElement('_');

    testElement.classList.add('c1', 'c2');

    // Polyfill for IE 10/11 and Firefox <26, where classList.add and
    // classList.remove exist but support only one argument at a time.
    if (!testElement.classList.contains('c2')) {
        var createMethod = function createMethod(method) {
            var original = window.DOMTokenList.prototype[method];

            window.DOMTokenList.prototype[method] = function (token) {
                var i = void 0;
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

    // Polyfill for IE 10, IE 11 and Firefox <24, where classList.toggle does not
    // support the second argument.
    if (testElement.classList.contains('c3')) {
        (function () {
            var toggle = window.DOMTokenList.prototype.toggle;

            window.DOMTokenList.prototype.toggle = function (token, force) {
                force = !!force;
                if (arguments.length > 1 && this.contains(token) === force) {
                    return force;
                } else {
                    return toggle.call(this, token);
                }
            };
        })();
    }

    testElement = null;
})();

},{}],133:[function(require,module,exports){
'use strict';

(function (fn) {
    window.console = window.console || {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'memory', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'timeline', 'timelineEnd', 'trace', 'warn'];
    methods.forEach(function (name) {
        window.console[name] = window.console[name] || fn;
    });
})(function () {});

},{}],134:[function(require,module,exports){
'use strict';

require('./classList');

require('./console');

require('./requestAnimationFrame');

},{"./classList":132,"./console":133,"./requestAnimationFrame":135}],135:[function(require,module,exports){
'use strict';

/*
 * requestAnimationFrame (ios6 and android < 4.4)
 */

(function () {
    if (!window.requestAnimationFrame) {
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
    }
})();

},{}],136:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = popup;
function popup(url) {
    var width = arguments.length <= 1 || arguments[1] === undefined ? 800 : arguments[1];
    var height = arguments.length <= 2 || arguments[2] === undefined ? 600 : arguments[2];
    var name = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];

    var left = (window.screen.width - width) / 2;
    var top = (window.screen.height - height) / 2;
    // const left = (window.screen.availWidth - width) / 2;
    // const top = (window.screen.availHeight - height) / 2;
    var defaults = 'directories=no,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no';
    var params = 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left + ',' + defaults;
    var win = window.open(url, name, params);
    if (win === null || typeof win === 'undefined') {
        return false;
    }
    if (window.focus) {
        win.focus();
    }
    return true;
}

},{}],137:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
    function Node(bounds, depth, maxDepth, maxChildren) {
        _classCallCheck(this, Node);

        this._bounds = bounds;
        this._depth = depth;
        this._maxDepth = maxDepth;
        this._maxChildren = maxChildren;

        this.children = [];
        this.nodes = [];
    }

    _createClass(Node, [{
        key: "insert",
        value: function insert(item) {
            if (this.nodes.length) {
                var index = this._findIndex(item);
                this.nodes[index].insert(item);
                return;
            }

            this.children.push(item);

            if (!(this._depth >= this._maxDepth) && this.children.length > this._maxChildren) {

                this.subdivide();

                for (var i = 0; i < this.children.length; i++) {
                    this.insert(this.children[i]);
                }

                this.children.length = 0;
            }
        }
    }, {
        key: "retrieve",
        value: function retrieve(item) {
            if (this.nodes.length) {
                var index = this._findIndex(item);
                return this.nodes[index].retrieve(item);
            }

            return this.children;
        }
    }, {
        key: "_findIndex",
        value: function _findIndex(item) {
            var _bounds = this._bounds;
            var x = _bounds.x;
            var y = _bounds.y;
            var width = _bounds.width;
            var height = _bounds.height;


            var right = item.x > x + width / 2;
            var bottom = item.y > y + height / 2;

            var index = void 0;

            if (right) {
                index = bottom ? Node.BR : Node.TR;
            } else {
                index = bottom ? Node.BL : Node.TL;
            }

            return index;
        }
    }, {
        key: "subdivide",
        value: function subdivide() {
            var depth = this._depth + 1;

            var _bounds2 = this._bounds;
            var x = _bounds2.x;
            var y = _bounds2.y;
            var width = _bounds2.width;
            var height = _bounds2.height;

            var w = width / 2;
            var h = height / 2;

            this.nodes[Node.TL] = new Node({
                x: x,
                y: y,
                width: w,
                height: h
            }, depth, this._maxDepth, this._maxChildren);

            this.nodes[Node.TR] = new Node({
                x: x + w,
                y: y,
                width: w,
                height: h
            }, depth, this._maxDepth, this._maxChildren);

            this.nodes[Node.BL] = new Node({
                x: x,
                y: y + h,
                width: w,
                height: h
            }, depth, this._maxDepth, this._maxChildren);

            this.nodes[Node.BR] = new Node({
                x: x + w,
                y: y + h,
                width: w,
                height: h
            }, depth, this._maxDepth, this._maxChildren);
        }
    }, {
        key: "clear",
        value: function clear() {
            this.children.length = 0;

            while (this.nodes.length) {
                this.nodes.pop().clear();
            }
        }
    }]);

    return Node;
}();

Node.TL = 0;
Node.TR = 1;
Node.BL = 2;
Node.BR = 3;

var QuadTree = function () {
    function QuadTree(bounds) {
        var maxDepth = arguments.length <= 1 || arguments[1] === undefined ? -1 : arguments[1];
        var maxChildren = arguments.length <= 2 || arguments[2] === undefined ? -1 : arguments[2];

        _classCallCheck(this, QuadTree);

        this.root = new Node(bounds, 0, maxDepth, maxChildren);
    }

    _createClass(QuadTree, [{
        key: "insert",
        value: function insert(item) {
            if (Array.isArray(item)) {
                for (var i = 0; i < item.length; i++) {
                    this.root.insert(item[i]);
                }
            } else {
                this.root.insert(item);
            }
        }
    }, {
        key: "clear",
        value: function clear() {
            this.root.clear();
        }
    }, {
        key: "retrieve",
        value: function retrieve(item) {
            return this.root.retrieve(item);
        }
    }]);

    return QuadTree;
}();

exports.default = QuadTree;

},{}],138:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = email;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function email(url) {
    var subject = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
    var body = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

    url = encodeURIComponent(url);
    subject = encodeURIComponent(subject);

    var newlines = encodeURIComponent('\r\n\r\n');
    body = body ? '' + encodeURIComponent(body) + newlines : '';

    return (0, _popup2.default)('mailto:?subject=' + subject + '&body=' + body + url);
}

},{"../popup":136}],139:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = facebook;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function facebook(url) {
    url = encodeURIComponent(url);
    return (0, _popup2.default)('https://www.facebook.com/sharer/sharer.php?u=' + url);
}

},{"../popup":136}],140:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = facebookFeedDialog;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function facebookFeedDialog(appId, redirect, url) {
    var title = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];
    var image = arguments.length <= 4 || arguments[4] === undefined ? '' : arguments[4];
    var caption = arguments.length <= 5 || arguments[5] === undefined ? '' : arguments[5];
    var desc = arguments.length <= 6 || arguments[6] === undefined ? '' : arguments[6];
    var source = arguments.length <= 7 || arguments[7] === undefined ? '' : arguments[7];

    title = encodeURIComponent(title);
    caption = encodeURIComponent(caption);
    desc = encodeURIComponent(desc);

    var params = '?display=popup&show_error=true&app_id=' + appId + '&source=' + source + '&redirect_uri=' + redirect;
    var content = 'name=' + title + '&link=' + url + '&caption=' + caption + '&description=' + desc + '&picture=' + image;

    return (0, _popup2.default)('https://www.facebook.com/dialog/feed?' + params + '&' + content);
}

},{"../popup":136}],141:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = googleplus;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function googleplus(url) {
    url = encodeURIComponent(url);
    return (0, _popup2.default)('https://plus.google.com/share?url=' + url);
}

},{"../popup":136}],142:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _email = require('./email');

var _email2 = _interopRequireDefault(_email);

var _facebook = require('./facebook');

var _facebook2 = _interopRequireDefault(_facebook);

var _facebookFeedDialog = require('./facebookFeedDialog');

var _facebookFeedDialog2 = _interopRequireDefault(_facebookFeedDialog);

var _googleplus = require('./googleplus');

var _googleplus2 = _interopRequireDefault(_googleplus);

var _linkedin = require('./linkedin');

var _linkedin2 = _interopRequireDefault(_linkedin);

var _pinterest = require('./pinterest');

var _pinterest2 = _interopRequireDefault(_pinterest);

var _reddit = require('./reddit');

var _reddit2 = _interopRequireDefault(_reddit);

var _renren = require('./renren');

var _renren2 = _interopRequireDefault(_renren);

var _sms = require('./sms');

var _sms2 = _interopRequireDefault(_sms);

var _twitter = require('./twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _vkontakte = require('./vkontakte');

var _vkontakte2 = _interopRequireDefault(_vkontakte);

var _weibo = require('./weibo');

var _weibo2 = _interopRequireDefault(_weibo);

var _whatsapp = require('./whatsapp');

var _whatsapp2 = _interopRequireDefault(_whatsapp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    email: _email2.default,
    facebook: _facebook2.default,
    facebookFeedDialog: _facebookFeedDialog2.default,
    googleplus: _googleplus2.default,
    linkedin: _linkedin2.default,
    pinterest: _pinterest2.default,
    reddit: _reddit2.default,
    renren: _renren2.default,
    sms: _sms2.default,
    twitter: _twitter2.default,
    vkontakte: _vkontakte2.default,
    weibo: _weibo2.default,
    whatsapp: _whatsapp2.default
};

},{"./email":138,"./facebook":139,"./facebookFeedDialog":140,"./googleplus":141,"./linkedin":143,"./pinterest":144,"./reddit":145,"./renren":146,"./sms":147,"./twitter":148,"./vkontakte":149,"./weibo":150,"./whatsapp":151}],143:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = linkedin;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function linkedin(url) {
    var title = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    return (0, _popup2.default)('https://www.linkedin.com/shareArticle?mini=true&url=' + url + '&title=' + title);
}

},{"../popup":136}],144:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = pinterest;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pinterest(url, media) {
    var desc = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

    url = encodeURIComponent(url);
    media = encodeURIComponent(media);
    desc = encodeURIComponent(desc);
    return (0, _popup2.default)('https://pinterest.com/pin/create/button/?url=' + url + '&media=' + media + '&description=' + desc);
}

},{"../popup":136}],145:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reddit;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reddit(url) {
    var title = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    return (0, _popup2.default)('https://www.reddit.com/submit?url=' + url + '&title=' + title);
}

},{"../popup":136}],146:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = vkontakte;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function vkontakte(url) {
    var title = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    return (0, _popup2.default)('http://share.renren.com/share/buttonshare.do?link=' + url + '&title=' + title);
}

},{"../popup":136}],147:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = sms;
function sms(url) {
    var body = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    url = encodeURIComponent(url);

    var newlines = encodeURIComponent('\r\n\r\n');
    body = body ? '' + encodeURIComponent(body) + newlines : '';

    var ios = /iP[ao]d|iPhone/i.test(navigator.userAgent);
    var delim = ios ? '&' : '?';

    window.location.href = 'sms:' + delim + 'body=' + body + url;
}

},{}],148:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = twitter;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function twitter(url) {
    var text = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
    var hashtags = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
    var related = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];

    url = encodeURIComponent(url);
    text = encodeURIComponent(text);
    hashtags = encodeURIComponent(hashtags);
    related = encodeURIComponent(related);

    return (0, _popup2.default)('https://twitter.com/intent/tweet?url=' + url + '&text=' + text + '&hashtags=' + hashtags + '&related=' + related);
}

},{"../popup":136}],149:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = vkontakte;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function vkontakte(url) {
    var title = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
    var description = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
    var image = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];

    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    description = encodeURIComponent(description);
    image = encodeURIComponent(image);
    return (0, _popup2.default)('http://vkontakte.ru/share.php?url=' + url + '&title=' + title + '&description=' + description + '&image=' + image);
}

},{"../popup":136}],150:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = weibo;

var _popup = require('../popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function weibo(url) {
    var title = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
    var image = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    image = encodeURIComponent(image);

    var params = 'url=' + url + '&appkey=&title=' + title + '&pic=' + image + '&ralateUid=&language=zh_cn';
    return (0, _popup2.default)('http://service.weibo.com/share/share.php?' + params);
}

},{"../popup":136}],151:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = whatsapp;
function whatsapp(url) {
    var body = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    url = encodeURIComponent(url);

    var newlines = encodeURIComponent('\r\n\r\n');
    body = body ? '' + encodeURIComponent(body) + newlines : '';

    window.location.href = 'whatsapp://send?text=' + body + url;
}

},{}],152:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function load(key) {
    var item = null;

    try {
        item = localStorage.getItem(key);
    } catch (err) {}

    return item;
}

function save(key, item) {
    try {
        localStorage.setItem(key, item);
        return true;
    } catch (err) {
        console.error('Couldn\'t save in localStorage');
    }
}

function loadJSON(key) {
    var item = load(key);
    return item ? JSON.parse(item) : null;
}

function saveJSON(key, item) {
    return save(key, JSON.stringify(item));
}

function remove(key) {
    try {
        localStorage.removeItem(key);
    } catch (err) {}
}

exports.default = { load: load, save: save, loadJSON: loadJSON, saveJSON: saveJSON, remove: remove };

},{}],153:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = afterFirst;
// everything after the first occurrence of substr in str
function afterFirst(str, substr) {
    var index = str.indexOf(substr);
    if (index === -1) {
        return '';
    }
    index += substr.length;
    return str.slice(index);
}

},{}],154:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = afterLast;
// everything after the last occurence of substr in str
function afterLast(str, substr) {
    var index = str.lastIndexOf(substr);
    if (index === -1) {
        return '';
    }
    index += substr.length;
    return str.slice(index);
}

},{}],155:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = beforeFirst;
// everything before the first occurrence of substr in str
function beforeFirst(str, substr) {
    var index = str.indexOf(substr);
    if (index === -1) {
        return '';
    }
    return str.slice(0, index);
}

},{}],156:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = beforeLast;
// everything before the last occurrence of substr in the string.
function beforeLast(str, substr) {
    var index = str.lastIndexOf(substr);
    if (index === -1) {
        return '';
    }
    return str.slice(0, index);
}

},{}],157:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = beginsWith;
// whether str begins with substr
function beginsWith(str, substr) {
    return str.indexOf(substr) === 0;
}

},{}],158:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = between;
// everything after the first occurance of start and before the first occurrence of end
function between(str, start, end) {
    var substr = '';
    var startIndex = str.indexOf(start);
    if (startIndex !== -1) {
        startIndex += start.length;
        var endIndex = str.indexOf(end, startIndex);
        if (endIndex !== -1) {
            substr = str.slice(startIndex, endIndex);
        }
    }
    return substr;
}

},{}],159:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = block;

var _escapePattern = require('./escapePattern');

var _escapePattern2 = _interopRequireDefault(_escapePattern);

var _truncate = require('./truncate');

var _truncate2 = _interopRequireDefault(_truncate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Utility method that intelligently breaks up your string,
// allowing you to create blocks of readable text.
// This method returns you the closest possible match to the delim paramater,
// while keeping the text length within the len paramter.
// If a match can't be found in your specified length an  '...' is added to that block,
// and the blocking continues untill all the text is broken apart.
function block(str, len) {
    var delim = arguments.length <= 2 || arguments[2] === undefined ? '.' : arguments[2];

    var arr = [];

    if (!str || !str.includes(delim)) {
        return arr;
    }

    if (delim === ' ') {
        str += delim;
    }

    var chrIndex = 0;
    var replPatt = new RegExp('[^' + (0, _escapePattern2.default)(delim) + ']+$');

    while (chrIndex < str.length) {
        var subString = str.substr(chrIndex, len);
        if (!subString.includes(delim)) {
            arr.push((0, _truncate2.default)(subString, subString.length));
            chrIndex += subString.length;
        }
        subString = subString.replace(replPatt, '');
        chrIndex += subString.length;
        arr.push(subString.trim());
    }
    return arr;
}

},{"./escapePattern":165,"./truncate":182}],160:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = capitalize;
// Capitalize the first word in a string or all words
function capitalize(str) {
    var all = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    var substr = str.trimLeft();
    var re = all ? /^.|\b./g : /(^\w)/;
    return substr.replace(re, function (match) {
        return match.toUpperCase();
    });
}

},{}],161:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = countOf;

var _escapePattern = require('./escapePattern');

var _escapePattern2 = _interopRequireDefault(_escapePattern);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// the number of times substr appears within str
function countOf(str, substr, caseSensitive) {
    var escapedStr = (0, _escapePattern2.default)(substr);
    var flags = !caseSensitive ? 'ig' : 'g';
    return str.match(new RegExp(escapedStr, flags)).length;
}

},{"./escapePattern":165}],162:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = editDistance;
// Levenshtein distance (editDistance) is a measure of the similarity between
// two strings. The distance is the number of deletions, insertions, or
// substitutions required to transform source into target.
function editDistance() {
    var source = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var target = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];


    if (source === target) {
        return 0;
    }

    if (!source.length) {
        return target.length;
    }

    if (!target.length) {
        return source.length;
    }

    var d = [];
    var i = void 0,
        j = void 0,
        cost = void 0;

    for (i = 0; i <= source.length; i++) {
        d[i] = [];
    }
    for (i = 0; i <= source.length; i++) {
        d[i][0] = i;
    }
    for (j = 0; j <= target.length; j++) {
        d[0][j] = j;
    }

    for (i = 1; i <= source.length; i++) {

        var si = source.charAt(i - 1);
        for (j = 1; j <= target.length; j++) {

            var tj = target.charAt(j - 1);

            if (si === tj) {
                cost = 0;
            } else {
                cost = 1;
            }

            d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
        }
    }

    return d[source.length][target.length];
}

},{}],163:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = endsWith;
// whether str ends with substr
function endsWith(str, substr) {
    return str.lastIndexOf(substr) === str.length - substr.length;
}

},{}],164:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = escapeHtml;
// export default function escapeHtml(str) {
//     const div = document.createElement('div');
//     div.appendChild(document.createTextNode(str));
//     return div.innerHTML;
// }

var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
};

function escapeHtml(string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
        return entityMap[s];
    });
}

},{}],165:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = escapePattern;
// regex escape pattern
function escapePattern(pattern) {
    return pattern.replace(/(\]|\[|\{|\}|\(|\)|\*|\+|\?|\.|\\)/g, '\\$1');
}

},{}],166:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = hasText;

var _removeExtraWhitespace = require('./removeExtraWhitespace');

var _removeExtraWhitespace2 = _interopRequireDefault(_removeExtraWhitespace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// whether str contains any text
function hasText(str) {
    return !!(0, _removeExtraWhitespace2.default)(str).length;
}

},{"./removeExtraWhitespace":174}],167:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _afterFirst = require('./afterFirst');

var _afterFirst2 = _interopRequireDefault(_afterFirst);

var _afterLast = require('./afterLast');

var _afterLast2 = _interopRequireDefault(_afterLast);

var _beforeFirst = require('./beforeFirst');

var _beforeFirst2 = _interopRequireDefault(_beforeFirst);

var _beforeLast = require('./beforeLast');

var _beforeLast2 = _interopRequireDefault(_beforeLast);

var _beginsWith = require('./beginsWith');

var _beginsWith2 = _interopRequireDefault(_beginsWith);

var _between = require('./between');

var _between2 = _interopRequireDefault(_between);

var _block = require('./block');

var _block2 = _interopRequireDefault(_block);

var _capitalize = require('./capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

var _countOf = require('./countOf');

var _countOf2 = _interopRequireDefault(_countOf);

var _editDistance = require('./editDistance');

var _editDistance2 = _interopRequireDefault(_editDistance);

var _endsWith = require('./endsWith');

var _endsWith2 = _interopRequireDefault(_endsWith);

var _escapeHTML = require('./escapeHTML');

var _escapeHTML2 = _interopRequireDefault(_escapeHTML);

var _escapePattern = require('./escapePattern');

var _escapePattern2 = _interopRequireDefault(_escapePattern);

var _hasText = require('./hasText');

var _hasText2 = _interopRequireDefault(_hasText);

var _isNumeric = require('./isNumeric');

var _isNumeric2 = _interopRequireDefault(_isNumeric);

var _padLeft = require('./padLeft');

var _padLeft2 = _interopRequireDefault(_padLeft);

var _padRight = require('./padRight');

var _padRight2 = _interopRequireDefault(_padRight);

var _preventWidow = require('./preventWidow');

var _preventWidow2 = _interopRequireDefault(_preventWidow);

var _properCase = require('./properCase');

var _properCase2 = _interopRequireDefault(_properCase);

var _remove = require('./remove');

var _remove2 = _interopRequireDefault(_remove);

var _removeExtraWhitespace = require('./removeExtraWhitespace');

var _removeExtraWhitespace2 = _interopRequireDefault(_removeExtraWhitespace);

var _reverse = require('./reverse');

var _reverse2 = _interopRequireDefault(_reverse);

var _reverseWords = require('./reverseWords');

var _reverseWords2 = _interopRequireDefault(_reverseWords);

var _similarity = require('./similarity');

var _similarity2 = _interopRequireDefault(_similarity);

var _stripTags = require('./stripTags');

var _stripTags2 = _interopRequireDefault(_stripTags);

var _swapCase = require('./swapCase');

var _swapCase2 = _interopRequireDefault(_swapCase);

var _timeCode = require('./timeCode');

var _timeCode2 = _interopRequireDefault(_timeCode);

var _toNumber = require('./toNumber');

var _toNumber2 = _interopRequireDefault(_toNumber);

var _truncate = require('./truncate');

var _truncate2 = _interopRequireDefault(_truncate);

var _wordCount = require('./wordCount');

var _wordCount2 = _interopRequireDefault(_wordCount);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    afterFirst: _afterFirst2.default,
    afterLast: _afterLast2.default,
    beforeFirst: _beforeFirst2.default,
    beforeLast: _beforeLast2.default,
    beginsWith: _beginsWith2.default,
    between: _between2.default,
    block: _block2.default,
    capitalize: _capitalize2.default,
    countOf: _countOf2.default,
    editDistance: _editDistance2.default,
    endsWith: _endsWith2.default,
    escapeHTML: _escapeHTML2.default,
    escapePattern: _escapePattern2.default,
    hasText: _hasText2.default,
    isNumeric: _isNumeric2.default,
    padLeft: _padLeft2.default,
    padRight: _padRight2.default,
    preventWidow: _preventWidow2.default,
    properCase: _properCase2.default,
    remove: _remove2.default,
    removeExtraWhitespace: _removeExtraWhitespace2.default,
    reverse: _reverse2.default,
    reverseWords: _reverseWords2.default,
    similarity: _similarity2.default,
    stripTags: _stripTags2.default,
    swapCase: _swapCase2.default,
    timeCode: _timeCode2.default,
    toNumber: _toNumber2.default,
    truncate: _truncate2.default,
    wordCount: _wordCount2.default
};

},{"./afterFirst":153,"./afterLast":154,"./beforeFirst":155,"./beforeLast":156,"./beginsWith":157,"./between":158,"./block":159,"./capitalize":160,"./countOf":161,"./editDistance":162,"./endsWith":163,"./escapeHTML":164,"./escapePattern":165,"./hasText":166,"./isNumeric":168,"./padLeft":169,"./padRight":170,"./preventWidow":171,"./properCase":172,"./remove":173,"./removeExtraWhitespace":174,"./reverse":175,"./reverseWords":176,"./similarity":177,"./stripTags":178,"./swapCase":179,"./timeCode":180,"./toNumber":181,"./truncate":182,"./wordCount":183}],168:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = isNumeric;
// whether str is numeric
function isNumeric(str) {
    var regx = /^[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?$/;
    return regx.test(str);
}

},{}],169:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = padLeft;
// pad str with substr from the left
function padLeft(str, substr, length) {
    str = String(str);
    while (str.length < length) {
        str = substr + str;
    }
    return str;
}

},{}],170:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = padRight;
// pads str with substr from the right
function padRight(str, substr, length) {
    str = String(str);
    while (str.length < length) {
        str += substr;
    }
    return str;
}

},{}],171:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = preventWidow;
function preventWidow(str) {
    str = str.trim();

    var lastSpace = str.lastIndexOf(' ');
    if (lastSpace > 0) {
        return str.slice(0, lastSpace) + '&nbsp;' + str.slice(lastSpace + 1);
    }

    return str;
}

},{}],172:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = properCase;

var _capitalize = require('./capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// proper case str in sentence format
function properCase(str) {
    var newStr = str.toLowerCase().replace(/\b([^.?;!]+)/, _capitalize2.default);
    return newStr.replace(/\b[i]\b/, 'I');
}

},{"./capitalize":160}],173:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = remove;

var _escapePattern = require('./escapePattern');

var _escapePattern2 = _interopRequireDefault(_escapePattern);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// remove all instances of substr in str
function remove(str, substr) {
    var caseSensitive = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    var escapedStr = (0, _escapePattern2.default)(substr);
    var flags = caseSensitive ? 'g' : 'ig';
    return str.replace(new RegExp(escapedStr, flags), '');
}

},{"./escapePattern":165}],174:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = removeExtraWhitespace;
// remove extra whitespace (extra spaces, tabs, line breaks, etc)
function removeExtraWhitespace(str) {
    return str.trim().replace(/\s+/g, ' ');
}

},{}],175:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reverse;
// reverse character order
function reverse(str) {
    return str.split('').reverse().join('');
}

},{}],176:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = reverseWords;
// reverse word order
function reverseWords(str) {
    return str.split(' ').reverse().join(' ');
}

},{}],177:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = similarity;

var _editDistance = require('./editDistance');

var _editDistance2 = _interopRequireDefault(_editDistance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// percentage of similiarity from 0 to 1
function similarity(a, b) {
    var e = (0, _editDistance2.default)(a, b);
    var m = Math.max(a.length, b.length);
    if (m === 0) {
        return 1;
    }
    return 1 - e / m;
}

},{"./editDistance":162}],178:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = stripTags;
// remove all HTML tags from str
function stripTags(str) {
    return str.replace(/<\/?[^>]+>/igm, '');
}

},{}],179:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = swapCase;

// swaps the case of str
function swapCase(str) {
    return str.replace(/(\w)/, function (newStr) {
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

},{}],180:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = timeCode;
// formats seconds into HH:MM:SS
function timeCode(seconds) {
    var delim = arguments.length <= 1 || arguments[1] === undefined ? ':' : arguments[1];

    var h = Math.floor(seconds / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);
    var hr = (h < 10 ? '0' + h : h) + delim;
    var mn = (m < 10 ? '0' + m : m) + delim;
    var sc = s < 10 ? '0' + s : s;
    return hr + mn + sc;
}

},{}],181:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = toNumber;
function toNumber(str) {
    return Number(str.replace(/[^0-9.]/g, ''));
}

},{}],182:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = truncate;
// truncate to length with suffix
function truncate(str, len) {
    var suffix = arguments.length <= 2 || arguments[2] === undefined ? '...' : arguments[2];

    len -= suffix.length;
    var trunc = str;
    if (trunc.length > len) {
        trunc = trunc.substr(0, len);
        var r = /[^\s]/;
        if (r.test(str.charAt(len))) {
            trunc = trunc.replace(/\w+$|\s+$/, '').trimRight();
        }
        trunc += suffix;
    }
    return trunc;
}

},{}],183:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = wordCount;
// the number of words in a string
function wordCount(str) {
    return str.match(/\b\w+\b/g).length;
}

},{}],184:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import Signal from 'signals';


var _miniSignals = require('mini-signals');

var _miniSignals2 = _interopRequireDefault(_miniSignals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ticker = function () {
    function Ticker() {
        _classCallCheck(this, Ticker);

        this.update = this.update.bind(this);
        // this.onUpdate = new Signal();
        this.onUpdate = new _miniSignals2.default();

        this.running = false;
        this.last = 0;
        // this.accumulated = 0;
        // this.step = 1000 / 60;
    }

    _createClass(Ticker, [{
        key: 'start',
        value: function start() {
            if (this.running) {
                return;
            }

            this.running = true;
            this.update();
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (!this.running) {
                return;
            }

            this.running = false;
        }
    }, {
        key: 'update',
        value: function update() {
            if (!this.running) {
                return;
            }

            window.requestAnimationFrame(this.update);

            var now = Date.now();
            var dt = now - this.last;
            if (dt > 20) {
                dt = 20;
            }
            this.last = now;

            //  // fixed step:
            // this.accumulated += dt;
            //
            // while (this.accumulated >= this.step) {
            //     this.accumulated -= this.step;
            //     this.onUpdate.dispatch(this.step);
            // }

            this.onUpdate.dispatch(dt * 0.001);
        }
    }, {
        key: 'add',
        value: function add(fn, context) {
            return this.onUpdate.add(fn, context);
        }
    }, {
        key: 'remove',
        value: function remove(binding) {
            this.onUpdate.detach(binding);
        }

        // remove(fn, context) {
        //     this.onUpdate.remove(fn, context);
        // }

    }]);

    return Ticker;
}();

exports.default = Ticker;

},{"mini-signals":109}],185:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = event;
function event(category, action, label, value) {
    if (!window.ga) {
        return;
    }
    window.ga('send', 'event', category, action, label, value);
}

},{}],186:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

var _pageview = require('./pageview');

var _pageview2 = _interopRequireDefault(_pageview);

var _load = require('./load');

var _load2 = _interopRequireDefault(_load);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    event: _event2.default,
    pageview: _pageview2.default,
    load: _load2.default
};

},{"./event":185,"./load":187,"./pageview":188}],187:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = load;
function load(gaAccount) {
    console.log('Initialize Google Analytics with account Id:', gaAccount);

    /*eslint-disable*/
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments);
        }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
    /*eslint-enable*/

    window.ga('create', gaAccount, 'auto');
    window.ga('send', 'pageview');
}

},{}],188:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = pageview;
function pageview(path) {
    if (!window.ga) {
        return;
    }
    window.ga('send', 'pageview', path);
}

},{}],189:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _quad = require('../ease/quad');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tween = function () {
    function Tween(ob, props, duration, options) {
        _classCallCheck(this, Tween);

        this.ob = ob;

        if (props) {
            this.to(props, duration, options);
        }
    }

    _createClass(Tween, [{
        key: 'to',
        value: function to(props, duration) {
            var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

            this.duration = duration;
            this.ease = options.ease || _quad.easeOutQuad;
            this.delay = options.delay || 0;
            this.onUpdate = options.onUpdate;
            this.onComplete = options.onComplete;
            this.time = 0;
            this.complete = false;

            this._props = Object.keys(props);
            this._beginVals = {};
            this._changeVals = {};

            for (var i = 0; i < this._props.length; i++) {
                var prop = this._props[i];
                this._beginVals[prop] = this.ob[prop];
                this._changeVals[prop] = props[prop] - this._beginVals[prop];
            }
        }
    }, {
        key: 'update',
        value: function update(dt) {
            if (this.time === this.duration) {
                return;
            }

            if (this.delay > 0) {
                this.delay -= dt;
                return;
            }

            this.time += dt;

            if (this.time > this.duration) {
                this.time = this.duration;
            }

            for (var i = 0; i < this._props.length; i++) {
                var prop = this._props[i];
                this.ob[prop] = this.ease(this.time, this._beginVals[prop], this._changeVals[prop], this.duration);
            }

            if (this.onUpdate) {
                this.onUpdate(this.ob);
            }

            if (this.time === this.duration) {
                this.complete = true;

                if (this.onComplete) {
                    this.onComplete(this.ob);
                }
            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.time = 0;
            this.complete = false;
        }
    }]);

    return Tween;
}();

exports.default = Tween;

},{"../ease/quad":31}],190:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var hidden = void 0,
    change = void 0;

if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden';
    change = 'visibilitychange';
} else if (typeof document.mozHidden !== 'undefined') {
    hidden = 'mozHidden';
    change = 'mozvisibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    change = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    change = 'webkitvisibilitychange';
}

exports.default = {
    hidden: hidden,
    change: change
};

},{}],191:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _emitter = require('../events/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var visibility = Object.create(_emitter2.default.prototype, {
    hidden: {
        get: function get() {
            return document[_api2.default.hidden];
        }
    }
});

function onVisibilityChange() {
    if (document[_api2.default.hidden]) {
        visibility.emit('hidden');
    } else {
        visibility.emit('shown');
    }
}

if (_api2.default.change) {
    document.addEventListener(_api2.default.change, onVisibilityChange, false);
}

exports.default = visibility;

},{"../events/emitter":37,"./api":190}]},{},[52])(52)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcnJheS9hcnJheS5qcyIsImFycmF5L2Nsb25lLmpzIiwiYXJyYXkvaW5kZXguanMiLCJhcnJheS9uZWFyZXN0LmpzIiwiYXJyYXkvcmFuZG9tQ2hvaWNlLmpzIiwiYXJyYXkvc29ydEFscGhhLmpzIiwiYXJyYXkvc29ydE51bWVyaWMuanMiLCJhcnJheS9zb3J0UmFuZG9tLmpzIiwiZG9tL2Jsb2NrU2Nyb2xsaW5nLmpzIiwiZG9tL2ZvcmNlUmVkcmF3LmpzIiwiZG9tL2dldFBhZ2VIZWlnaHQuanMiLCJkb20vZ2V0U2Nyb2xsUGVyY2VudGFnZS5qcyIsImRvbS9nZXRTY3JvbGxSZW1haW5pbmcuanMiLCJkb20vZ2V0U2Nyb2xsVG9wLmpzIiwiZG9tL2dldFNyY3NldEltYWdlLmpzIiwiZG9tL2luZGV4LmpzIiwiZG9tL2lzRWxlbWVudEluVmlld3BvcnQuanMiLCJkb20vaXNQYWdlRW5kLmpzIiwiZG9tL3Jlc2l6ZS5qcyIsImRvbS9zY3JvbGwuanMiLCJkb20vc2V0U3R5bGUuanMiLCJkb20vdHJhbnNpdGlvbkVuZC5qcyIsImVhc2UvYmFjay5qcyIsImVhc2UvYm91bmNlLmpzIiwiZWFzZS9jaXJjdWxhci5qcyIsImVhc2UvY3ViaWMuanMiLCJlYXNlL2VsYXN0aWMuanMiLCJlYXNlL2V4cG8uanMiLCJlYXNlL2luZGV4LmpzIiwiZWFzZS9saW5lYXIuanMiLCJlYXNlL3F1YWQuanMiLCJlYXNlL3F1YXJ0LmpzIiwiZWFzZS9xdWludC5qcyIsImVhc2Uvc2luZS5qcyIsImV2ZW50cy9kZWJvdW5jZS5qcyIsImV2ZW50cy9kZWxlZ2F0ZUV2ZW50cy5qcyIsImV2ZW50cy9lbWl0dGVyLmpzIiwiZXZlbnRzL2V2ZW50QnVzLmpzIiwiZXZlbnRzL2hlYXJ0YmVhdC5qcyIsImV2ZW50cy9pbmRleC5qcyIsImZwcy9pbmRleC5qcyIsImZ1bGxzY3JlZW4vYXBpLmpzIiwiZnVsbHNjcmVlbi9pbmRleC5qcyIsImdyYXBoaWNzL2luZGV4LmpzIiwiZ3VpL2luZGV4LmpzIiwiaHR0cC9nZXRMb2NhdGlvbi5qcyIsImh0dHAvaW5kZXguanMiLCJodHRwL2pzb25wLmpzIiwiaHR0cC9sb2FkU2NyaXB0LmpzIiwiaHR0cC91cmxQYXJhbXMuanMiLCJodHRwL3hoci5qcyIsImluZGV4LmpzIiwiaW5wdXQvY2xpY2tPdXRzaWRlLmpzIiwiaW5wdXQvaW5kZXguanMiLCJpbnB1dC9rZXlJbnB1dC5qcyIsImlucHV0L2tleWJvYXJkLmpzIiwiaW5wdXQvbWljcm9waG9uZS5qcyIsImlucHV0L21vdXNlTGVmdFdpbmRvdy5qcyIsImlucHV0L21vdXNlV2hlZWwuanMiLCJpbnB1dC9wb2ludGVyQ29vcmRzLmpzIiwiaW5wdXQvdG91Y2hJbnB1dC5qcyIsImxpbmtlZC1saXN0L2luZGV4LmpzIiwibWF0aC9hbmdsZS5qcyIsIm1hdGgvY2VycC5qcyIsIm1hdGgvY2lyY2xlRGlzdHJpYnV0aW9uLmpzIiwibWF0aC9jbGFtcC5qcyIsIm1hdGgvY29pblRvc3MuanMiLCJtYXRoL2Nyb3NzUHJvZHVjdDJkLmpzIiwibWF0aC9kZWdyZWVzLmpzIiwibWF0aC9kaWZmZXJlbmNlLmpzIiwibWF0aC9kaXN0YW5jZS5qcyIsIm1hdGgvZGlzdGFuY2VTcS5qcyIsIm1hdGgvZG90UHJvZHVjdDJkLmpzIiwibWF0aC9nZXRDaXJjbGVQb2ludHMuanMiLCJtYXRoL2dldEludGVyc2VjdGlvbkFyZWEuanMiLCJtYXRoL2dldE92ZXJsYXBYLmpzIiwibWF0aC9nZXRPdmVybGFwWS5qcyIsIm1hdGgvaW5kZXguanMiLCJtYXRoL2xlcnAuanMiLCJtYXRoL21hcC5qcyIsIm1hdGgvbm9ybWFsaXplLmpzIiwibWF0aC9vcmllbnRhdGlvbi5qcyIsIm1hdGgvcGVyY2VudFJlbWFpbmluZy5qcyIsIm1hdGgvcGVyc3BlY3RpdmUuanMiLCJtYXRoL3F1YWRyYXRpY0N1cnZlLmpzIiwibWF0aC9yYWRpYW5zLmpzIiwibWF0aC9yYW5kb20uanMiLCJtYXRoL3JhbmRvbUludC5qcyIsIm1hdGgvcmFuZG9tU2lnbi5qcyIsIm1hdGgvcm90YXRlUG9pbnQuanMiLCJtYXRoL3JvdGF0ZVRvRGVnLmpzIiwibWF0aC9yb3RhdGVUb1JhZC5qcyIsIm1hdGgvcm91bmRUby5qcyIsIm1hdGgvcm91bmRUb05lYXJlc3QuanMiLCJtYXRoL3NpemUuanMiLCJtYXRoL3NtZXJwLmpzIiwibWF0aC9zbW9vdGhzdGVwLmpzIiwibWF0aC9zcGxpdFZhbHVlQW5kVW5pdC5qcyIsIm1hdGgvd2VpZ2h0ZWRBdmVyYWdlLmpzIiwibWF0aC93ZWlnaHRlZERpc3RyaWJ1dGlvbi5qcyIsIm1lZGlhL2N1ZXBvaW50c1JlYWRlci5qcyIsIm1lZGlhL2lPU1BsYXlWaWRlb0lubGluZS5qcyIsIm1lZGlhL2luZGV4LmpzIiwibWVkaWEvdmlkZW9QbGF5ZXIuanMiLCJtZWRpYS92aW1lby5qcyIsIm1lZGlhL3lvdXR1YmUuanMiLCJtZWRpYS95b3V0dWJlQmFzaWMuanMiLCJub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9taW5pLXNpZ25hbHMvbGliL21pbmktc2lnbmFscy5qcyIsIm9iamVjdC1wb29sL2luZGV4LmpzIiwicGFydGljbGUvaW5kZXguanMiLCJwbGF0Zm9ybS9icm93c2VyL2FuZHJvaWROYXRpdmUuanMiLCJwbGF0Zm9ybS9icm93c2VyL2llVmVyc2lvbi5qcyIsInBsYXRmb3JtL2Jyb3dzZXIvaW5kZXguanMiLCJwbGF0Zm9ybS9kZXZpY2UvaW5kZXguanMiLCJwbGF0Zm9ybS9pbmRleC5qcyIsInBsYXRmb3JtL29zL2FuZHJvaWQuanMiLCJwbGF0Zm9ybS9vcy9hbmRyb2lkVmVyc2lvbi5qcyIsInBsYXRmb3JtL29zL2luZGV4LmpzIiwicGxhdGZvcm0vb3MvaW9zLmpzIiwicGxhdGZvcm0vb3MvaW9zVmVyc2lvbi5qcyIsInBsYXRmb3JtL29zL2xpbnV4LmpzIiwicGxhdGZvcm0vb3MvbWFjLmpzIiwicGxhdGZvcm0vb3Mvd2luZG93cy5qcyIsInBsYXRmb3JtL29zL3dpbmRvd3NQaG9uZS5qcyIsInBsYXRmb3JtL3NjcmVlbi9pbmRleC5qcyIsInBsYXRmb3JtL3N1cHBvcnRzL2RldmljZU9yaWVudGF0aW9uLmpzIiwicGxhdGZvcm0vc3VwcG9ydHMvaW5kZXguanMiLCJwbGF0Zm9ybS9zdXBwb3J0cy9tcDQuanMiLCJwbGF0Zm9ybS9zdXBwb3J0cy93ZWJnbC5qcyIsInBsYXRmb3JtL3N1cHBvcnRzL3dlYm0uanMiLCJwb2x5ZmlsbC9jbGFzc0xpc3QuanMiLCJwb2x5ZmlsbC9jb25zb2xlLmpzIiwicG9seWZpbGwvaW5kZXguanMiLCJwb2x5ZmlsbC9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUuanMiLCJwb3B1cC9pbmRleC5qcyIsInF1YWQtdHJlZS9pbmRleC5qcyIsInNoYXJlL2VtYWlsLmpzIiwic2hhcmUvZmFjZWJvb2suanMiLCJzaGFyZS9mYWNlYm9va0ZlZWREaWFsb2cuanMiLCJzaGFyZS9nb29nbGVwbHVzLmpzIiwic2hhcmUvaW5kZXguanMiLCJzaGFyZS9saW5rZWRpbi5qcyIsInNoYXJlL3BpbnRlcmVzdC5qcyIsInNoYXJlL3JlZGRpdC5qcyIsInNoYXJlL3JlbnJlbi5qcyIsInNoYXJlL3Ntcy5qcyIsInNoYXJlL3R3aXR0ZXIuanMiLCJzaGFyZS92a29udGFrdGUuanMiLCJzaGFyZS93ZWliby5qcyIsInNoYXJlL3doYXRzYXBwLmpzIiwic3RvcmFnZS9pbmRleC5qcyIsInN0cmluZy9hZnRlckZpcnN0LmpzIiwic3RyaW5nL2FmdGVyTGFzdC5qcyIsInN0cmluZy9iZWZvcmVGaXJzdC5qcyIsInN0cmluZy9iZWZvcmVMYXN0LmpzIiwic3RyaW5nL2JlZ2luc1dpdGguanMiLCJzdHJpbmcvYmV0d2Vlbi5qcyIsInN0cmluZy9ibG9jay5qcyIsInN0cmluZy9jYXBpdGFsaXplLmpzIiwic3RyaW5nL2NvdW50T2YuanMiLCJzdHJpbmcvZWRpdERpc3RhbmNlLmpzIiwic3RyaW5nL2VuZHNXaXRoLmpzIiwic3RyaW5nL2VzY2FwZUhUTUwuanMiLCJzdHJpbmcvZXNjYXBlUGF0dGVybi5qcyIsInN0cmluZy9oYXNUZXh0LmpzIiwic3RyaW5nL2luZGV4LmpzIiwic3RyaW5nL2lzTnVtZXJpYy5qcyIsInN0cmluZy9wYWRMZWZ0LmpzIiwic3RyaW5nL3BhZFJpZ2h0LmpzIiwic3RyaW5nL3ByZXZlbnRXaWRvdy5qcyIsInN0cmluZy9wcm9wZXJDYXNlLmpzIiwic3RyaW5nL3JlbW92ZS5qcyIsInN0cmluZy9yZW1vdmVFeHRyYVdoaXRlc3BhY2UuanMiLCJzdHJpbmcvcmV2ZXJzZS5qcyIsInN0cmluZy9yZXZlcnNlV29yZHMuanMiLCJzdHJpbmcvc2ltaWxhcml0eS5qcyIsInN0cmluZy9zdHJpcFRhZ3MuanMiLCJzdHJpbmcvc3dhcENhc2UuanMiLCJzdHJpbmcvdGltZUNvZGUuanMiLCJzdHJpbmcvdG9OdW1iZXIuanMiLCJzdHJpbmcvdHJ1bmNhdGUuanMiLCJzdHJpbmcvd29yZENvdW50LmpzIiwidGlja2VyL2luZGV4LmpzIiwidHJhY2svZXZlbnQuanMiLCJ0cmFjay9pbmRleC5qcyIsInRyYWNrL2xvYWQuanMiLCJ0cmFjay9wYWdldmlldy5qcyIsInR3ZWVuL2luZGV4LmpzIiwidmlzaWJpbGl0eS9hcGkuanMiLCJ2aXNpYmlsaXR5L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7a0JDQXdCLEs7QUFBVCxTQUFTLEtBQVQsQ0FBZSxNQUFmLEVBQXVCLEtBQXZCLEVBQThCO0FBQ3pDLFFBQU0sTUFBTSxFQUFaO0FBQ0EsU0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLE1BQXBCLEVBQTRCLEdBQTVCLEVBQWlDO0FBQzdCLFlBQU0sTUFBTSxPQUFPLEtBQVAsS0FBaUIsV0FBakIsR0FBK0IsS0FBL0IsR0FBdUMsQ0FBbkQ7QUFDQSxZQUFJLElBQUosQ0FBUyxHQUFUO0FBQ0g7QUFDRCxXQUFPLEdBQVA7QUFDSDs7Ozs7Ozs7a0JDUHVCLEs7QUFBVCxTQUFT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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O2tCQ3JLd0IsVTtBQUFULFNBQVMsVUFBVCxDQUFvQixTQUFwQixFQUErQjs7QUFFMUMsUUFBSSxPQUFPLEVBQVg7QUFDQSxRQUFJLGFBQWEsQ0FBakI7O0FBRUEsV0FBTztBQUNILGVBREcscUJBQ1E7QUFDUCxtQkFBTyxJQUFQO0FBQ0gsU0FIRTtBQUlILFdBSkcsaUJBSUk7QUFDSCxnQkFBSyxLQUFLLE1BQUwsR0FBYyxDQUFuQixFQUF1QjtBQUNuQix1QkFBTyxLQUFLLEdBQUwsRUFBUDtBQUNILGFBRkQsTUFFTztBQUNIO0FBQ0EsdUJBQU8sV0FBUDtBQUNIO0FBQ0osU0FYRTtBQVlILGVBWkcsbUJBWU0sUUFaTixFQVlnQjtBQUNmLGlCQUFLLElBQUwsQ0FBVSxRQUFWO0FBQ0gsU0FkRTtBQWVILFlBZkcsZ0JBZUcsS0FmSCxFQWVVO0FBQ1QsbUJBQVEsS0FBSyxNQUFMLEdBQWMsS0FBdEIsRUFBOEI7QUFDMUI7QUFDQSxxQkFBSyxLQUFLLE1BQVYsSUFBb0IsV0FBcEI7QUFDSDtBQUNKLFNBcEJFO0FBcUJILGFBckJHLG1CQXFCTTtBQUNMLG1CQUFPLEVBQVA7QUFDSCxTQXZCRTtBQXdCSCxxQkF4QkcsMkJBd0JhO0FBQ1osbUJBQU8sVUFBUDtBQUNIO0FBMUJFLEtBQVA7QUE0Qkg7Ozs7Ozs7Ozs7Ozs7SUNqQ00sRyxHQUE4QixJLENBQTlCLEc7SUFBSyxLLEdBQXlCLEksQ0FBekIsSztJQUFPLEcsR0FBa0IsSSxDQUFsQixHO0lBQUssRyxHQUFhLEksQ0FBYixHO0lBQUssSSxHQUFRLEksQ0FBUixJOztJQUVSLFE7QUFDakIsc0JBQVksT0FBWixFQUFxQjtBQUFBOztBQUNqQixhQUFLLElBQUwsR0FBWSxPQUFaOztBQUVBLGFBQUssT0FBTCxHQUFlLEVBQWY7QUFDQSxhQUFLLFlBQUwsR0FBb0IsRUFBcEI7O0FBRUEsYUFBSyxTQUFMLEdBQWlCO0FBQ2IsbUJBQU8sSUFETTtBQUViLGVBQUcsQ0FGVTtBQUdiLGVBQUcsQ0FIVTtBQUliLG1CQUFPLENBSk07QUFLYixtQkFBTyxDQUxNO0FBTWIscUJBQVMsQ0FOSTtBQU9iLGtCQUFNLENBUE87QUFRYixvQkFBUSxDQVJLO0FBU2Isb0JBQVEsRUFBQyxHQUFHLENBQUMsQ0FBTCxFQUFRLEdBQUcsQ0FBQyxDQUFaLEVBVEs7QUFVYixzQkFBVSxDQVZHO0FBV2Isc0JBQVUsQ0FYRztBQVliLG9CQUFRLEVBQUMsR0FBRyxDQUFKLEVBQU8sR0FBRyxDQUFWLEVBQWEsT0FBTyxJQUFwQixFQUEwQixRQUFRLEdBQWxDO0FBWkssU0FBakI7O0FBZUEsYUFBSyxNQUFMLEdBQWMsT0FBTyxJQUFQLENBQVksS0FBSyxTQUFqQixDQUFkOztBQUVBLGFBQUssS0FBTCxDQUFXLE9BQVg7QUFDSDs7Ozs4QkFFSyxPLEVBQVM7QUFDWCxnQkFBTSxPQUFPLEtBQUssU0FBbEI7QUFDQSxnQkFBTSxRQUFRLEtBQUssTUFBbkI7QUFDQSxnQkFBTSxPQUFPLFdBQVcsSUFBeEI7O0FBRUEsaUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxNQUFNLE1BQTFCLEVBQWtDLEdBQWxDLEVBQXVDO0FBQ25DLG9CQUFNLE1BQU0sTUFBTSxDQUFOLENBQVo7QUFDQSxvQkFBTSxRQUFRLEtBQUssR0FBTCxLQUFhLEtBQUssR0FBTCxDQUEzQjtBQUNBLHFCQUFLLEdBQUwsSUFBWSxLQUFaO0FBQ0EscUJBQUssR0FBTCxJQUFZLEtBQVo7QUFDSDs7QUFFRCxnQkFBTSxRQUFRLEtBQUssS0FBTCxJQUFjLEtBQUssS0FBakM7QUFDQSxnQkFBTSxRQUFRLEtBQUssS0FBTCxJQUFjLEtBQUssS0FBakM7O0FBRUEsaUJBQUssRUFBTCxHQUFVLElBQUksS0FBSixJQUFhLEtBQXZCO0FBQ0EsaUJBQUssRUFBTCxHQUFVLElBQUksS0FBSixJQUFhLEtBQXZCOztBQUVBLG1CQUFPLElBQVA7QUFDSDs7O2lDQUVRO0FBQ0wsaUJBQUssRUFBTCxJQUFXLEtBQUssUUFBaEI7QUFDQSxpQkFBSyxFQUFMLElBQVcsS0FBSyxRQUFoQjtBQUNBLGlCQUFLLEVBQUwsSUFBVyxLQUFLLE9BQWhCO0FBQ0EsaUJBQUssQ0FBTCxJQUFVLEtBQUssRUFBZjtBQUNBLGlCQUFLLENBQUwsSUFBVSxLQUFLLEVBQWY7QUFDQSxtQkFBTyxJQUFQO0FBQ0g7OztvQ0FFVyxLLEVBQU8sSyxFQUFPO0FBQ3RCLGdCQUFJLE9BQU8sS0FBUCxLQUFpQixXQUFyQixFQUFrQztBQUM5Qix3QkFBUSxLQUFLLEtBQWI7QUFDSDtBQUNELGlCQUFLLEVBQUwsSUFBVyxJQUFJLEtBQUosSUFBYSxLQUF4QjtBQUNBLGlCQUFLLEVBQUwsSUFBVyxJQUFJLEtBQUosSUFBYSxLQUF4QjtBQUNBLG1CQUFPLElBQVA7QUFDSDs7O2tDQTRCUyxDLEVBQUcsQyxFQUFHLEssRUFBTyxNLEVBQVE7QUFDM0IsaUJBQUssT0FBTCxDQUFhLENBQWIsR0FBaUIsS0FBSyxDQUF0QjtBQUNBLGlCQUFLLE9BQUwsQ0FBYSxDQUFiLEdBQWlCLEtBQUssQ0FBdEI7QUFDQSxpQkFBSyxPQUFMLENBQWEsS0FBYixHQUFxQixLQUFyQjtBQUNBLGlCQUFLLE9BQUwsQ0FBYSxNQUFiLEdBQXNCLE1BQXRCO0FBQ0g7OztnQ0FtQ08sQyxFQUFHO0FBQ1AsbUJBQU8sTUFBTSxFQUFFLENBQUYsR0FBTSxLQUFLLENBQWpCLEVBQW9CLEVBQUUsQ0FBRixHQUFNLEtBQUssQ0FBL0IsQ0FBUDtBQUNIOzs7bUNBRVUsQyxFQUFHO0FBQ1YsZ0JBQU0sS0FBSyxFQUFFLENBQUYsR0FBTSxLQUFLLENBQXRCO0FBQ0EsZ0JBQU0sS0FBSyxFQUFFLENBQUYsR0FBTSxLQUFLLENBQXRCO0FBQ0EsbUJBQU8sS0FBSyxLQUFLLEVBQUwsR0FBVSxLQUFLLEVBQXBCLENBQVA7QUFDSDs7OytCQUVNLEMsRUFBbUI7QUFBQSxnQkFBaEIsTUFBZ0IseURBQVAsS0FBTzs7QUFDdEIsZ0JBQU0sS0FBSyxFQUFFLENBQUYsR0FBTSxLQUFLLENBQXRCO0FBQ0EsZ0JBQU0sS0FBSyxFQUFFLENBQUYsR0FBTSxLQUFLLENBQXRCOztBQUVBLGlCQUFLLEVBQUwsSUFBVyxLQUFLLE1BQWhCO0FBQ0EsaUJBQUssRUFBTCxJQUFXLEtBQUssTUFBaEI7O0FBRUEsZ0JBQUksSUFBSSxLQUFLLEVBQVQsSUFBZSxJQUFJLEVBQUosQ0FBbkIsRUFBNEI7QUFDeEIscUJBQUssRUFBTCxHQUFVLEVBQVY7QUFDSDs7QUFFRCxnQkFBSSxJQUFJLEtBQUssRUFBVCxJQUFlLElBQUksRUFBSixDQUFuQixFQUE0QjtBQUN4QixxQkFBSyxFQUFMLEdBQVUsRUFBVjtBQUNIOztBQUVELG1CQUFPLElBQVA7QUFDSDs7O29DQUVXLEMsRUFBRztBQUNYLGdCQUFNLEtBQUssRUFBRSxDQUFGLEdBQU0sS0FBSyxDQUF0QjtBQUNBLGdCQUFNLEtBQUssRUFBRSxDQUFGLEdBQU0sS0FBSyxDQUF0QjtBQUNBLGdCQUFNLFNBQVMsS0FBSyxFQUFMLEdBQVUsS0FBSyxFQUE5QjtBQUNBLGdCQUFJLFNBQVMsQ0FBYixFQUFnQjtBQUNaLG9CQUFNLE9BQU8sS0FBSyxNQUFMLENBQWI7QUFDQSxvQkFBTSxRQUFRLEVBQUUsSUFBRixHQUFTLE1BQXZCO0FBQ0Esb0JBQU0sS0FBSyxLQUFLLElBQUwsR0FBWSxLQUF2QjtBQUNBLG9CQUFNLEtBQUssS0FBSyxJQUFMLEdBQVksS0FBdkI7QUFDQSxxQkFBSyxFQUFMLElBQVcsRUFBWDtBQUNBLHFCQUFLLEVBQUwsSUFBVyxFQUFYO0FBQ0g7O0FBRUQsbUJBQU8sSUFBUDtBQUNIOzs7aUNBRVEsQyxFQUFHLFMsRUFBVyxNLEVBQVE7QUFDM0IsZ0JBQU0sS0FBSyxFQUFFLENBQUYsR0FBTSxLQUFLLENBQXRCO0FBQ0EsZ0JBQU0sS0FBSyxFQUFFLENBQUYsR0FBTSxLQUFLLENBQXRCO0FBQ0EsZ0JBQU0sV0FBVyxLQUFLLEtBQUssRUFBTCxHQUFVLEtBQUssRUFBcEIsQ0FBakI7QUFDQSxnQkFBTSxRQUFRLENBQUMsWUFBWSxVQUFVLENBQXRCLENBQUQsS0FBOEIsYUFBYSxHQUEzQyxDQUFkOztBQUVBLGdCQUFJLElBQUksV0FBVyxLQUFmLElBQXdCLENBQTVCLEVBQStCO0FBQzNCLHFCQUFLLEVBQUwsSUFBVyxLQUFLLFFBQUwsR0FBZ0IsS0FBM0I7QUFDQSxxQkFBSyxFQUFMLElBQVcsS0FBSyxRQUFMLEdBQWdCLEtBQTNCO0FBQ0g7O0FBRUQsbUJBQU8sSUFBUDtBQUNIOzs7aUNBRVEsQyxFQUFHO0FBQ1IsbUJBQU8sS0FBSyxVQUFMLENBQWdCLENBQWhCLEtBQXNCLEtBQUssTUFBTCxHQUFjLEVBQUUsTUFBN0M7QUFDSDs7O3NDQUVhO0FBQ1YsZ0JBQU0sT0FBTyxLQUFLLE9BQUwsQ0FBYSxDQUFiLEdBQWlCLEtBQUssTUFBbkM7QUFDQSxnQkFBTSxRQUFRLEtBQUssT0FBTCxDQUFhLENBQWIsR0FBaUIsS0FBSyxPQUFMLENBQWEsS0FBOUIsR0FBc0MsS0FBSyxNQUF6RDtBQUNBLGdCQUFNLE1BQU0sS0FBSyxPQUFMLENBQWEsQ0FBYixHQUFpQixLQUFLLE1BQWxDO0FBQ0EsZ0JBQU0sU0FBUyxLQUFLLE9BQUwsQ0FBYSxDQUFiLEdBQWlCLEtBQUssT0FBTCxDQUFhLE1BQTlCLEdBQXVDLEtBQUssTUFBM0Q7O0FBRUEsZ0JBQUksS0FBSyxDQUFMLEdBQVMsSUFBYixFQUFtQjtBQUNmLHFCQUFLLENBQUwsR0FBUyxJQUFUO0FBQ0EscUJBQUssRUFBTCxHQUFVLEtBQUssRUFBTCxHQUFVLEtBQUssTUFBTCxDQUFZLENBQWhDO0FBQ0g7O0FBRUQsZ0JBQUksS0FBSyxDQUFMLEdBQVMsS0FBYixFQUFvQjtBQUNoQixxQkFBSyxDQUFMLEdBQVMsS0FBVDtBQUNBLHFCQUFLLEVBQUwsR0FBVSxLQUFLLEVBQUwsR0FBVSxLQUFLLE1BQUwsQ0FBWSxDQUFoQztBQUNIOztBQUVELGdCQUFJLEtBQUssQ0FBTCxHQUFTLEdBQWIsRUFBa0I7QUFDZCxxQkFBSyxDQUFMLEdBQVMsR0FBVDtBQUNBLHFCQUFLLEVBQUwsR0FBVSxLQUFLLEVBQUwsR0FBVSxLQUFLLE1BQUwsQ0FBWSxDQUFoQztBQUNIOztBQUVELGdCQUFJLEtBQUssQ0FBTCxHQUFTLE1BQWIsRUFBcUI7QUFDakIscUJBQUssQ0FBTCxHQUFTLE1BQVQ7QUFDQSxxQkFBSyxFQUFMLEdBQVUsS0FBSyxFQUFMLEdBQVUsS0FBSyxNQUFMLENBQVksQ0FBaEM7QUFDSDtBQUNKOzs7bUNBRVU7QUFBQSwrQkFDNEIsS0FBSyxXQURqQztBQUFBLGdCQUNBLElBREEsZ0JBQ0EsSUFEQTtBQUFBLGdCQUNNLEtBRE4sZ0JBQ00sS0FETjtBQUFBLGdCQUNhLEdBRGIsZ0JBQ2EsR0FEYjtBQUFBLGdCQUNrQixNQURsQixnQkFDa0IsTUFEbEI7OztBQUdQLGdCQUFJLEtBQUssQ0FBTCxHQUFTLElBQWIsRUFBbUI7QUFDZixxQkFBSyxDQUFMLEdBQVMsS0FBVDtBQUNIOztBQUVELGdCQUFJLEtBQUssQ0FBTCxHQUFTLEtBQWIsRUFBb0I7QUFDaEIscUJBQUssQ0FBTCxHQUFTLElBQVQ7QUFDSDs7QUFFRCxnQkFBSSxLQUFLLENBQUwsR0FBUyxHQUFiLEVBQWtCO0FBQ2QscUJBQUssQ0FBTCxHQUFTLE1BQVQ7QUFDSDs7QUFFRCxnQkFBSSxLQUFLLENBQUwsR0FBUyxNQUFiLEVBQXFCO0FBQ2pCLHFCQUFLLENBQUwsR0FBUyxHQUFUO0FBQ0g7QUFDSjs7O21DQUVVO0FBQUEsZ0NBQzRCLEtBQUssV0FEakM7QUFBQSxnQkFDQSxJQURBLGlCQUNBLElBREE7QUFBQSxnQkFDTSxLQUROLGlCQUNNLEtBRE47QUFBQSxnQkFDYSxHQURiLGlCQUNhLEdBRGI7QUFBQSxnQkFDa0IsTUFEbEIsaUJBQ2tCLE1BRGxCOzs7QUFHUCxnQkFBSSxLQUFLLENBQUwsR0FBUyxJQUFULElBQWlCLEtBQUssQ0FBTCxHQUFTLEtBQTFCLElBQW1DLEtBQUssQ0FBTCxHQUFTLEdBQTVDLElBQW1ELEtBQUssQ0FBTCxHQUFTLE1BQWhFLEVBQXdFO0FBQ3BFLHFCQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0g7QUFDSjs7O29DQUVXO0FBQUEsZ0NBQzJCLEtBQUssV0FEaEM7QUFBQSxnQkFDRCxJQURDLGlCQUNELElBREM7QUFBQSxnQkFDSyxLQURMLGlCQUNLLEtBREw7QUFBQSxnQkFDWSxHQURaLGlCQUNZLEdBRFo7QUFBQSxnQkFDaUIsTUFEakIsaUJBQ2lCLE1BRGpCOzs7QUFHUixnQkFBSSxLQUFLLENBQUwsR0FBUyxJQUFULElBQWlCLEtBQUssQ0FBTCxHQUFTLEtBQTFCLElBQW1DLEtBQUssQ0FBTCxHQUFTLEdBQTVDLElBQW1ELEtBQUssQ0FBTCxHQUFTLE1BQWhFLEVBQXdFO0FBQ3BFLHFCQUFLLEtBQUw7QUFDSDtBQUNKOzs7bUNBRVU7QUFDUCxpQkFBSyxRQUFMOztBQUVBLGdCQUFJLEtBQUssUUFBTCxJQUFpQixDQUFyQixFQUF3QjtBQUNwQixxQkFBSyxLQUFMLEdBQWEsS0FBYjtBQUNIO0FBQ0o7Ozs0QkFyTVc7QUFDUixnQkFBSSxLQUFLLEVBQUwsS0FBWSxDQUFaLElBQWlCLEtBQUssRUFBTCxLQUFZLENBQWpDLEVBQW9DO0FBQ2hDLHVCQUFPLENBQVA7QUFDSDtBQUNELG1CQUFPLEtBQUssS0FBSyxFQUFMLEdBQVUsS0FBSyxFQUFmLEdBQW9CLEtBQUssRUFBTCxHQUFVLEtBQUssRUFBeEMsQ0FBUDtBQUNILFM7MEJBRVMsSyxFQUFPO0FBQ2IsZ0JBQU0sUUFBUSxLQUFLLEtBQW5CO0FBQ0EsaUJBQUssRUFBTCxHQUFVLElBQUksS0FBSixJQUFhLEtBQXZCO0FBQ0EsaUJBQUssRUFBTCxHQUFVLElBQUksS0FBSixJQUFhLEtBQXZCO0FBQ0g7Ozs0QkFFVztBQUNSLGdCQUFJLEtBQUssRUFBTCxLQUFZLENBQVosSUFBaUIsS0FBSyxFQUFMLEtBQVksQ0FBakMsRUFBb0M7QUFDaEMsdUJBQU8sQ0FBUDtBQUNIO0FBQ0QsbUJBQU8sTUFBTSxLQUFLLEVBQVgsRUFBZSxLQUFLLEVBQXBCLENBQVA7QUFDSCxTOzBCQUVTLEssRUFBTztBQUNiLGdCQUFNLFFBQVEsS0FBSyxLQUFuQjtBQUNBLGlCQUFLLEVBQUwsR0FBVSxJQUFJLEtBQUosSUFBYSxLQUF2QjtBQUNBLGlCQUFLLEVBQUwsR0FBVSxJQUFJLEtBQUosSUFBYSxLQUF2QjtBQUNIOzs7NEJBU1k7QUFDVCxtQkFBTyxLQUFLLE9BQVo7QUFDSCxTOzBCQUVVLEUsRUFBSTtBQUFBLGdCQUNKLENBREksR0FDbUIsRUFEbkIsQ0FDSixDQURJO0FBQUEsZ0JBQ0QsQ0FEQyxHQUNtQixFQURuQixDQUNELENBREM7QUFBQSxnQkFDRSxLQURGLEdBQ21CLEVBRG5CLENBQ0UsS0FERjtBQUFBLGdCQUNTLE1BRFQsR0FDbUIsRUFEbkIsQ0FDUyxNQURUOztBQUVYLGlCQUFLLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLENBQWxCLEVBQXFCLEtBQXJCLEVBQTRCLE1BQTVCO0FBQ0g7Ozs0QkFFVTtBQUNQLG1CQUFPLEtBQUssQ0FBTCxHQUFTLEtBQUssTUFBckI7QUFDSDs7OzRCQUVXO0FBQ1IsbUJBQU8sS0FBSyxDQUFMLEdBQVMsS0FBSyxNQUFyQjtBQUNIOzs7NEJBRVM7QUFDTixtQkFBTyxLQUFLLENBQUwsR0FBUyxLQUFLLE1BQXJCO0FBQ0g7Ozs0QkFFWTtBQUNULG1CQUFPLEtBQUssQ0FBTCxHQUFTLEtBQUssTUFBckI7QUFDSDs7OzRCQUVpQjtBQUNkLGlCQUFLLFlBQUwsQ0FBa0IsSUFBbEIsR0FBeUIsS0FBSyxPQUFMLENBQWEsQ0FBYixHQUFpQixLQUFLLE1BQS9DO0FBQ0EsaUJBQUssWUFBTCxDQUFrQixLQUFsQixHQUEwQixLQUFLLE9BQUwsQ0FBYSxDQUFiLEdBQWlCLEtBQUssT0FBTCxDQUFhLEtBQTlCLEdBQXNDLEtBQUssTUFBckU7QUFDQSxpQkFBSyxZQUFMLENBQWtCLEdBQWxCLEdBQXdCLEtBQUssT0FBTCxDQUFhLENBQWIsR0FBaUIsS0FBSyxNQUE5QztBQUNBLGlCQUFLLFlBQUwsQ0FBa0IsTUFBbEIsR0FBMkIsS0FBSyxPQUFMLENBQWEsQ0FBYixHQUFpQixLQUFLLE9BQUwsQ0FBYSxNQUE5QixHQUF1QyxLQUFLLE1BQXZFO0FBQ0EsbUJBQU8sS0FBSyxZQUFaO0FBQ0g7Ozs7OztrQkFsSWdCLFE7Ozs7Ozs7O2tCQ0NHLGE7O0FBSHhCOzs7Ozs7O0FBR2UsU0FBUyxhQUFULEdBQWlEO0FBQUEsUUFBMUIsRUFBMEIseURBQXJCLFVBQVUsU0FBVzs7QUFDNUQsUUFBSSxDQUFDLHVCQUFRLEVBQVIsQ0FBTCxFQUFrQjtBQUNkLGVBQU8sS0FBUDtBQUNIOztBQUVELFFBQU0sa0JBQWtCLEdBQUcsT0FBSCxDQUFXLGFBQVgsSUFBNEIsQ0FBQyxDQUE3QixJQUFrQyxHQUFHLE9BQUgsQ0FBVyxhQUFYLElBQTRCLENBQUMsQ0FBdkY7O0FBRUEsUUFBTSxnQkFBZ0IsdUJBQXRCO0FBQ0EsUUFBTSxvQkFBb0IsY0FBYyxJQUFkLENBQW1CLEVBQW5CLENBQTFCO0FBQ0EsUUFBTSxxQkFBcUIsb0JBQW9CLFdBQVcsY0FBYyxJQUFkLENBQW1CLEVBQW5CLEVBQXVCLENBQXZCLENBQVgsQ0FBcEIsR0FBNEQsSUFBdkY7O0FBRUEsUUFBTSxXQUFXLGtCQUFqQjtBQUNBLFFBQU0sZUFBZSxTQUFTLElBQVQsQ0FBYyxFQUFkLENBQXJCO0FBQ0EsUUFBTSxnQkFBZ0IsZUFBZSxXQUFXLFNBQVMsSUFBVCxDQUFjLEVBQWQsRUFBa0IsQ0FBbEIsQ0FBWCxDQUFmLEdBQWtELElBQXhFOztBQUVBLFdBQU8sbUJBQW9CLHNCQUFzQixxQkFBcUIsR0FBL0QsSUFBd0UsaUJBQWlCLGdCQUFnQixFQUFoSDtBQUNIOzs7Ozs7OztrQkNuQnVCLFM7QUFBVCxTQUFTLFNBQVQsR0FBNkM7QUFBQSxRQUExQixFQUEwQix5REFBckIsVUFBVSxTQUFXOztBQUN4RCxRQUFJLElBQUksQ0FBUjtBQUNBLFFBQUksbUJBQW1CLElBQW5CLENBQXdCLEVBQXhCLENBQUosRUFBaUM7QUFDN0IsWUFBSSxTQUFTLE9BQU8sRUFBaEIsRUFBb0IsRUFBcEIsQ0FBSjtBQUNILEtBRkQsTUFFTyxJQUFJLHVDQUF1QyxJQUF2QyxDQUE0QyxFQUE1QyxDQUFKLEVBQXFEO0FBQ3hELFlBQUksU0FBUyxPQUFPLEVBQWhCLEVBQW9CLEVBQXBCLENBQUo7QUFDSDtBQUNELFdBQU8sQ0FBUDtBQUNIOzs7Ozs7Ozs7QUNSRDs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sS0FBSyxVQUFVLFNBQXJCO0FBQ0EsSUFBTSxZQUFZLFNBQVosU0FBWTtBQUFBLFdBQU0sYUFBRyxHQUFILE1BQVksUUFBUSxJQUFSLENBQWEsRUFBYixDQUFsQjtBQUFBLENBQWxCO0FBQ0EsSUFBTSxVQUFVLFNBQVYsT0FBVTtBQUFBLFdBQU0sV0FBVSxJQUFWLENBQWUsRUFBZjtBQUFOO0FBQUEsQ0FBaEI7QUFDQSxJQUFNLEtBQUssU0FBTCxFQUFLO0FBQUEsV0FBTSw2QkFBYyxDQUFwQjtBQUFBLENBQVg7QUFDQSxJQUFNLFNBQVMsU0FBVCxNQUFTO0FBQUEsV0FBTSxDQUFDLFVBQVUsSUFBVixDQUFlLEVBQWYsQ0FBRCxJQUF1QixDQUFDLFNBQVMsSUFBVCxDQUFjLEVBQWQsQ0FBeEIsSUFBNkMsU0FBUyxJQUFULENBQWMsRUFBZCxDQUFuRDtBQUFBLENBQWY7QUFDQSxJQUFNLGVBQWUsU0FBZixZQUFlO0FBQUEsV0FBTSxhQUFHLEdBQUgsTUFBWSxjQUFjLElBQWQsQ0FBbUIsRUFBbkIsQ0FBbEI7QUFBQSxDQUFyQjs7a0JBRWU7QUFDWCwwQ0FEVztBQUVYLHdCQUZXO0FBR1gsb0JBSFc7QUFJWCxVQUpXO0FBS1gsa0NBTFc7QUFNWCxrQkFOVztBQU9YO0FBUFcsQzs7Ozs7Ozs7QUNYZixJQUFNLEtBQUssVUFBVSxTQUFyQjs7QUFFQSxJQUFNLE9BQU8sU0FBUCxJQUFPO0FBQUEsV0FBTSxTQUFRLElBQVIsQ0FBYSxFQUFiO0FBQU47QUFBQSxDQUFiO0FBQ0EsSUFBTSxPQUFPLFNBQVAsSUFBTztBQUFBLFdBQU0sU0FBUSxJQUFSLENBQWEsRUFBYjtBQUFOO0FBQUEsQ0FBYjtBQUNBLElBQU0sU0FBUyxTQUFULE1BQVM7QUFBQSxXQUFNLFdBQVUsSUFBVixDQUFlLEVBQWY7QUFBTjtBQUFBLENBQWY7QUFDQSxJQUFNLFNBQVMsU0FBVCxNQUFTO0FBQUEsV0FBTSxDQUFDLENBQUMsR0FBRyxLQUFILENBQVMsd0ZBQVQsQ0FBUjtBQUFBLENBQWY7QUFDQSxJQUFNLFVBQVUsU0FBVixPQUFVO0FBQUEsV0FBTSxDQUFDLFFBQVA7QUFBQSxDQUFoQjs7a0JBRWU7QUFDWCxvQkFEVztBQUVYLGNBRlc7QUFHWCxrQkFIVztBQUlYLGNBSlc7QUFLWDtBQUxXLEM7Ozs7Ozs7OztBQ1JmOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sUUFBUSwwQ0FBMEMsSUFBMUMsQ0FBK0MsT0FBTyxRQUFQLENBQWdCLElBQS9ELENBQWQ7O2tCQUVlO0FBQ1gsOEJBRFc7QUFFWCw0QkFGVztBQUdYLG9CQUhXO0FBSVgsZ0NBSlc7QUFLWCw0QkFMVztBQU1YO0FBTlcsQzs7Ozs7Ozs7O2tCQ1JBLFlBQW1DO0FBQUEsUUFBMUIsRUFBMEIseURBQXJCLFVBQVUsU0FBVzs7QUFDOUMsV0FBTyxZQUFXLElBQVgsQ0FBZ0IsRUFBaEI7QUFBUDtBQUNILEM7Ozs7Ozs7Ozs7O2tCQ0F1QixjOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBUyxjQUFULEdBQWtEO0FBQUEsUUFBMUIsRUFBMEIseURBQXJCLFVBQVUsU0FBVzs7QUFDN0QsUUFBSSxDQUFDLHVCQUFRLEVBQVIsQ0FBTCxFQUFrQjtBQUNkLGVBQU8sQ0FBUDtBQUNIO0FBQ0QsUUFBTSxVQUFVLEdBQUcsS0FBSCxDQUFTLDBCQUFULEVBQXFDLENBQXJDLENBQWhCOztBQUo2RCx5QkFLOUMsUUFBUSxLQUFSLENBQWMsR0FBZCxDQUw4Qzs7QUFBQTs7QUFBQSxRQUt0RCxDQUxzRDtBQUFBLFFBS25ELENBTG1EOztBQU03RCxXQUFPLFdBQWMsQ0FBZCxTQUFtQixDQUFuQixDQUFQO0FBQ0g7Ozs7Ozs7OztBQ1REOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFFZTtBQUNYLDhCQURXO0FBRVgsNENBRlc7QUFHWCxzQkFIVztBQUlYLG9DQUpXO0FBS1gsMEJBTFc7QUFNWCxzQkFOVztBQU9YLDhCQVBXO0FBUVg7QUFSVyxDOzs7Ozs7OztrQkNUUyxHO0FBQVQsU0FBUyxHQUFULEdBQXVDO0FBQUEsUUFBMUIsRUFBMEIseURBQXJCLFVBQVUsU0FBVzs7QUFDbEQsV0FBTyxtQkFBa0IsSUFBbEIsQ0FBdUIsRUFBdkI7QUFBUDtBQUNIOzs7Ozs7Ozs7OztrQkNBdUIsVTs7QUFGeEI7Ozs7OztBQUVlLFNBQVMsVUFBVCxHQUE4QztBQUFBLFFBQTFCLEVBQTBCLHlEQUFyQixVQUFVLFNBQVc7O0FBQ3pELFFBQUksbUJBQUksRUFBSixDQUFKLEVBQWE7QUFBQSx3QkFDUSxHQUFHLEtBQUgsQ0FBUyxpQkFBVCxDQURSOztBQUFBOztBQUFBLFlBQ0EsQ0FEQTtBQUFBLFlBQ0csQ0FESDs7QUFFVCxZQUFJLEtBQUssQ0FBVCxFQUFZO0FBQ1IsbUJBQU8sV0FBYyxDQUFkLFNBQW1CLENBQW5CLENBQVA7QUFDSDtBQUNKO0FBQ0QsV0FBTyxDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ1J1QixLOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBUyxLQUFULEdBQXlDO0FBQUEsUUFBMUIsRUFBMEIseURBQXJCLFVBQVUsU0FBVzs7QUFDcEQsV0FBTyxDQUFDLHVCQUFRLEVBQVIsQ0FBRCxJQUFnQixRQUFRLElBQVIsQ0FBYSxFQUFiLENBQXZCO0FBQ0g7Ozs7Ozs7O2tCQ0Z1QixHOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBUyxHQUFULEdBQXVDO0FBQUEsUUFBMUIsRUFBMEIseURBQXJCLFVBQVUsU0FBVzs7QUFDbEQsV0FBTyxDQUFDLG1CQUFJLEVBQUosQ0FBRCxJQUFZLFNBQVMsSUFBVCxDQUFjLEVBQWQsQ0FBbkI7QUFDSDs7Ozs7Ozs7a0JDRnVCLE87O0FBRnhCOzs7Ozs7QUFFZSxTQUFTLE9BQVQsR0FBMkM7QUFBQSxRQUExQixFQUEwQix5REFBckIsVUFBVSxTQUFXOztBQUN0RCxXQUFPLENBQUMsNEJBQWEsRUFBYixDQUFELElBQXFCLFVBQVUsSUFBVixDQUFlLEVBQWYsQ0FBNUI7QUFDSDs7Ozs7Ozs7a0JDSnVCLFk7QUFBVCxTQUFTLFlBQVQsR0FBZ0Q7QUFBQSxRQUExQixFQUEwQix5REFBckIsVUFBVSxTQUFXOztBQUMzRCxXQUFPLGtCQUFpQixJQUFqQixDQUFzQixFQUF0QjtBQUFQO0FBQ0g7Ozs7Ozs7OztBQ0RELElBQU0sU0FBUyxTQUFULE1BQVM7QUFBQSxXQUFNLEtBQUssR0FBTCxDQUFTLE9BQU8sV0FBaEIsRUFBNkIsT0FBTyxNQUFQLENBQWMsTUFBM0MsQ0FBTjtBQUFBLENBQWY7QUFDQSxJQUFNLFFBQVEsU0FBUixLQUFRO0FBQUEsV0FBTSxLQUFLLEdBQUwsQ0FBUyxPQUFPLFVBQWhCLEVBQTRCLE9BQU8sTUFBUCxDQUFjLEtBQTFDLENBQU47QUFBQSxDQUFkO0FBQ0EsSUFBTSxNQUFNLFNBQU4sR0FBTTtBQUFBLFdBQU0sT0FBTyxnQkFBUCxJQUEyQixDQUFqQztBQUFBLENBQVo7QUFDQSxJQUFNLFNBQVMsU0FBVCxNQUFTO0FBQUEsV0FBTSxRQUFRLENBQWQ7QUFBQSxDQUFmOztrQkFFZTtBQUNYLGdCQURXO0FBRVgsa0JBRlc7QUFHWCxZQUhXO0FBSVg7QUFKVyxDOzs7Ozs7Ozs7a0JDTkE7QUFBQSxTQUFNLENBQUMsQ0FBQyxPQUFPLHNCQUFmO0FBQUEsQzs7Ozs7Ozs7O0FDQWY7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFFZTtBQUNYLDBCQURXO0FBRVgsd0JBRlc7QUFHWCxxQkFIVztBQUlYO0FBSlcsQzs7Ozs7Ozs7QUNMZixJQUFNLFVBQVUsU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQWhCOztrQkFDZTtBQUFBLFNBQU0sQ0FBQyxFQUFFLFFBQVEsV0FBUixJQUF1QixRQUFRLFdBQVIsQ0FBb0IsNENBQXBCLENBQXpCLENBQVA7QUFBQSxDOzs7Ozs7OztrQkNEUyxLO0FBQVQsU0FBUyxLQUFULEdBQWlCO0FBQzVCLFFBQUk7QUFDQSxZQUFNLFNBQVMsU0FBUyxhQUFULENBQXVCLFFBQXZCLENBQWY7QUFDQSxZQUFNLFVBQVUsT0FBTyxVQUFQLENBQWtCLE9BQWxCLEtBQThCLE9BQU8sVUFBUCxDQUFrQixvQkFBbEIsQ0FBOUM7QUFDQSxlQUFPLENBQUMsRUFBRSxPQUFPLHFCQUFQLElBQWdDLE9BQWxDLENBQVI7QUFDSCxLQUpELENBSUUsT0FBTyxDQUFQLEVBQVU7QUFDUixlQUFPLEtBQVA7QUFDSDtBQUNKOzs7Ozs7OztBQ1JELElBQU0sVUFBVSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBaEI7O2tCQUNlO0FBQUEsU0FBTSxDQUFDLEVBQUUsUUFBUSxXQUFSLElBQXVCLFFBQVEsV0FBUixDQUFvQixrQ0FBcEIsQ0FBekIsQ0FBUDtBQUFBLEM7Ozs7Ozs7Ozs7QUNJZCxhQUFXOztBQUVSLFFBQUksY0FBYyxTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBbEI7O0FBRUEsZ0JBQVksU0FBWixDQUFzQixHQUF0QixDQUEwQixJQUExQixFQUFnQyxJQUFoQzs7OztBQUlBLFFBQUksQ0FBQyxZQUFZLFNBQVosQ0FBc0IsUUFBdEIsQ0FBK0IsSUFBL0IsQ0FBTCxFQUEyQztBQUFBLFlBQzlCLFlBRDhCLEdBQ3ZDLFNBQVMsWUFBVCxDQUFzQixNQUF0QixFQUE4QjtBQUMxQixnQkFBTSxXQUFXLE9BQU8sWUFBUCxDQUFvQixTQUFwQixDQUE4QixNQUE5QixDQUFqQjs7QUFFQSxtQkFBTyxZQUFQLENBQW9CLFNBQXBCLENBQThCLE1BQTlCLElBQXdDLFVBQVMsS0FBVCxFQUFnQjtBQUNwRCxvQkFBSSxVQUFKO0FBQ0Esb0JBQU0sTUFBTSxVQUFVLE1BQXRCOztBQUVBLHFCQUFLLElBQUksQ0FBVCxFQUFZLElBQUksR0FBaEIsRUFBcUIsR0FBckIsRUFBMEI7QUFDdEIsNEJBQVEsVUFBVSxDQUFWLENBQVI7QUFDQSw2QkFBUyxJQUFULENBQWMsSUFBZCxFQUFvQixLQUFwQjtBQUNIO0FBQ0osYUFSRDtBQVNILFNBYnNDOztBQWN2QyxxQkFBYSxLQUFiO0FBQ0EscUJBQWEsUUFBYjtBQUNIOztBQUVELGdCQUFZLFNBQVosQ0FBc0IsTUFBdEIsQ0FBNkIsSUFBN0IsRUFBbUMsS0FBbkM7Ozs7QUFJQSxRQUFJLFlBQVksU0FBWixDQUFzQixRQUF0QixDQUErQixJQUEvQixDQUFKLEVBQTBDO0FBQUE7QUFDdEMsZ0JBQU0sU0FBUyxPQUFPLFlBQVAsQ0FBb0IsU0FBcEIsQ0FBOEIsTUFBN0M7O0FBRUEsbUJBQU8sWUFBUCxDQUFvQixTQUFwQixDQUE4QixNQUE5QixHQUF1QyxVQUFTLEtBQVQsRUFBZ0IsS0FBaEIsRUFBdUI7QUFDMUQsd0JBQVEsQ0FBQyxDQUFDLEtBQVY7QUFDQSxvQkFBSSxVQUFVLE1BQVYsR0FBbUIsQ0FBbkIsSUFBd0IsS0FBSyxRQUFMLENBQWMsS0FBZCxNQUF5QixLQUFyRCxFQUE0RDtBQUN4RCwyQkFBTyxLQUFQO0FBQ0gsaUJBRkQsTUFFTztBQUNILDJCQUFPLE9BQU8sSUFBUCxDQUFZLElBQVosRUFBa0IsS0FBbEIsQ0FBUDtBQUNIO0FBQ0osYUFQRDtBQUhzQztBQVd6Qzs7QUFFRCxrQkFBYyxJQUFkO0FBQ0gsQ0E1Q0EsR0FBRDs7Ozs7QUNMQyxXQUFTLEVBQVQsRUFBYTtBQUNWLFdBQU8sT0FBUCxHQUFpQixPQUFPLE9BQVAsSUFBa0IsRUFBbkM7QUFDQSxRQUFNLFVBQVUsQ0FDWixRQURZLEVBRVosT0FGWSxFQUdaLE9BSFksRUFJWixPQUpZLEVBS1osS0FMWSxFQU1aLFFBTlksRUFPWixPQVBZLEVBUVosT0FSWSxFQVNaLGdCQVRZLEVBVVosVUFWWSxFQVdaLE1BWFksRUFZWixLQVpZLEVBYVosY0FiWSxFQWNaLFFBZFksRUFlWixTQWZZLEVBZ0JaLFlBaEJZLEVBaUJaLE9BakJZLEVBa0JaLE1BbEJZLEVBbUJaLFNBbkJZLEVBb0JaLFdBcEJZLEVBcUJaLFVBckJZLEVBc0JaLGFBdEJZLEVBdUJaLE9BdkJZLEVBd0JaLE1BeEJZLENBQWhCO0FBMEJBLFlBQVEsT0FBUixDQUFnQixVQUFDLElBQUQsRUFBVTtBQUN0QixlQUFPLE9BQVAsQ0FBZSxJQUFmLElBQXVCLE9BQU8sT0FBUCxDQUFlLElBQWYsS0FBd0IsRUFBL0M7QUFDSCxLQUZEO0FBR0gsQ0EvQkEsRUErQkMsWUFBVyxDQUFFLENBL0JkLENBQUQ7Ozs7O0FDQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7OztBQ0VDLGFBQVc7QUFDUixRQUFJLENBQUMsT0FBTyxxQkFBWixFQUFtQztBQUMvQixZQUFNLFVBQVUsQ0FBQyxJQUFELEVBQU8sS0FBUCxFQUFjLFFBQWQsRUFBd0IsR0FBeEIsQ0FBaEI7QUFDQSxhQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksUUFBUSxNQUFaLElBQXNCLENBQUMsT0FBTyxxQkFBOUMsRUFBcUUsRUFBRSxDQUF2RSxFQUEwRTtBQUN0RSxtQkFBTyxxQkFBUCxHQUErQixPQUFPLFFBQVEsQ0FBUixJQUFhLHVCQUFwQixDQUEvQjtBQUNBLG1CQUFPLG9CQUFQLEdBQThCLE9BQU8sUUFBUSxDQUFSLElBQWEsc0JBQXBCLEtBQStDLE9BQU8sUUFBUSxDQUFSLElBQ2hGLDZCQUR5RSxDQUE3RTtBQUVIO0FBQ0o7QUFDSixDQVRBLEdBQUQ7Ozs7Ozs7O2tCQ0p3QixLO0FBQVQsU0FBUyxLQUFULENBQWUsR0FBZixFQUEwRDtBQUFBLFFBQXRDLEtBQXNDLHlEQUE5QixHQUE4QjtBQUFBLFFBQXpCLE1BQXlCLHlEQUFoQixHQUFnQjtBQUFBLFFBQVgsSUFBVyx5REFBSixFQUFJOztBQUNyRSxRQUFNLE9BQU8sQ0FBQyxPQUFPLE1BQVAsQ0FBYyxLQUFkLEdBQXNCLEtBQXZCLElBQWdDLENBQTdDO0FBQ0EsUUFBTSxNQUFNLENBQUMsT0FBTyxNQUFQLENBQWMsTUFBZCxHQUF1QixNQUF4QixJQUFrQyxDQUE5Qzs7O0FBR0EsUUFBTSxXQUFXLHVGQUFqQjtBQUNBLFFBQU0sb0JBQWtCLEtBQWxCLGdCQUFrQyxNQUFsQyxhQUFnRCxHQUFoRCxjQUE0RCxJQUE1RCxTQUFvRSxRQUExRTtBQUNBLFFBQU0sTUFBTSxPQUFPLElBQVAsQ0FBWSxHQUFaLEVBQWlCLElBQWpCLEVBQXVCLE1BQXZCLENBQVo7QUFDQSxRQUFJLFFBQVEsSUFBUixJQUFnQixPQUFPLEdBQVAsS0FBZSxXQUFuQyxFQUFnRDtBQUM1QyxlQUFPLEtBQVA7QUFDSDtBQUNELFFBQUksT0FBTyxLQUFYLEVBQWtCO0FBQ2QsWUFBSSxLQUFKO0FBQ0g7QUFDRCxXQUFPLElBQVA7QUFDSDs7Ozs7Ozs7Ozs7OztJQ2RLLEk7QUFDRixrQkFBWSxNQUFaLEVBQW9CLEtBQXBCLEVBQTJCLFFBQTNCLEVBQXFDLFdBQXJDLEVBQWtEO0FBQUE7O0FBQzlDLGFBQUssT0FBTCxHQUFlLE1BQWY7QUFDQSxhQUFLLE1BQUwsR0FBYyxLQUFkO0FBQ0EsYUFBSyxTQUFMLEdBQWlCLFFBQWpCO0FBQ0EsYUFBSyxZQUFMLEdBQW9CLFdBQXBCOztBQUVBLGFBQUssUUFBTCxHQUFnQixFQUFoQjtBQUNBLGFBQUssS0FBTCxHQUFhLEVBQWI7QUFDSDs7OzsrQkFFTSxJLEVBQU07QUFDVCxnQkFBSSxLQUFLLEtBQUwsQ0FBVyxNQUFmLEVBQXVCO0FBQ25CLG9CQUFNLFFBQVEsS0FBSyxVQUFMLENBQWdCLElBQWhCLENBQWQ7QUFDQSxxQkFBSyxLQUFMLENBQVcsS0FBWCxFQUFrQixNQUFsQixDQUF5QixJQUF6QjtBQUNBO0FBQ0g7O0FBRUQsaUJBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsSUFBbkI7O0FBRUEsZ0JBQUksRUFBRSxLQUFLLE1BQUwsSUFBZSxLQUFLLFNBQXRCLEtBQW9DLEtBQUssUUFBTCxDQUFjLE1BQWQsR0FBdUIsS0FBSyxZQUFwRSxFQUFrRjs7QUFFOUUscUJBQUssU0FBTDs7QUFFQSxxQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssUUFBTCxDQUFjLE1BQWxDLEVBQTBDLEdBQTFDLEVBQStDO0FBQzNDLHlCQUFLLE1BQUwsQ0FBWSxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQVo7QUFDSDs7QUFFRCxxQkFBSyxRQUFMLENBQWMsTUFBZCxHQUF1QixDQUF2QjtBQUNIO0FBQ0o7OztpQ0FFUSxJLEVBQU07QUFDWCxnQkFBSSxLQUFLLEtBQUwsQ0FBVyxNQUFmLEVBQXVCO0FBQ25CLG9CQUFNLFFBQVEsS0FBSyxVQUFMLENBQWdCLElBQWhCLENBQWQ7QUFDQSx1QkFBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYLEVBQWtCLFFBQWxCLENBQTJCLElBQTNCLENBQVA7QUFDSDs7QUFFRCxtQkFBTyxLQUFLLFFBQVo7QUFDSDs7O21DQUVVLEksRUFBTTtBQUFBLDBCQUNpQixLQUFLLE9BRHRCO0FBQUEsZ0JBQ04sQ0FETSxXQUNOLENBRE07QUFBQSxnQkFDSCxDQURHLFdBQ0gsQ0FERztBQUFBLGdCQUNBLEtBREEsV0FDQSxLQURBO0FBQUEsZ0JBQ08sTUFEUCxXQUNPLE1BRFA7OztBQUdiLGdCQUFNLFFBQVEsS0FBSyxDQUFMLEdBQVMsSUFBSSxRQUFRLENBQW5DO0FBQ0EsZ0JBQU0sU0FBUyxLQUFLLENBQUwsR0FBUyxJQUFJLFNBQVMsQ0FBckM7O0FBRUEsZ0JBQUksY0FBSjs7QUFFQSxnQkFBSSxLQUFKLEVBQVc7QUFDUCx3QkFBUSxTQUFTLEtBQUssRUFBZCxHQUFtQixLQUFLLEVBQWhDO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsd0JBQVEsU0FBUyxLQUFLLEVBQWQsR0FBbUIsS0FBSyxFQUFoQztBQUNIOztBQUVELG1CQUFPLEtBQVA7QUFDSDs7O29DQUVXO0FBQ1IsZ0JBQU0sUUFBUSxLQUFLLE1BQUwsR0FBYyxDQUE1Qjs7QUFEUSwyQkFHc0IsS0FBSyxPQUgzQjtBQUFBLGdCQUdELENBSEMsWUFHRCxDQUhDO0FBQUEsZ0JBR0UsQ0FIRixZQUdFLENBSEY7QUFBQSxnQkFHSyxLQUhMLFlBR0ssS0FITDtBQUFBLGdCQUdZLE1BSFosWUFHWSxNQUhaOztBQUlSLGdCQUFNLElBQUksUUFBUSxDQUFsQjtBQUNBLGdCQUFNLElBQUksU0FBUyxDQUFuQjs7QUFFQSxpQkFBSyxLQUFMLENBQVcsS0FBSyxFQUFoQixJQUFzQixJQUFJLElBQUosQ0FBUztBQUMzQixvQkFEMkI7QUFFM0Isb0JBRjJCO0FBRzNCLHVCQUFPLENBSG9CO0FBSTNCLHdCQUFRO0FBSm1CLGFBQVQsRUFNdEIsS0FOc0IsRUFNZixLQUFLLFNBTlUsRUFNQyxLQUFLLFlBTk4sQ0FBdEI7O0FBUUEsaUJBQUssS0FBTCxDQUFXLEtBQUssRUFBaEIsSUFBc0IsSUFBSSxJQUFKLENBQVM7QUFDM0IsbUJBQUcsSUFBSSxDQURvQjtBQUUzQixvQkFGMkI7QUFHM0IsdUJBQU8sQ0FIb0I7QUFJM0Isd0JBQVE7QUFKbUIsYUFBVCxFQU10QixLQU5zQixFQU1mLEtBQUssU0FOVSxFQU1DLEtBQUssWUFOTixDQUF0Qjs7QUFRQSxpQkFBSyxLQUFMLENBQVcsS0FBSyxFQUFoQixJQUFzQixJQUFJLElBQUosQ0FBUztBQUMzQixvQkFEMkI7QUFFM0IsbUJBQUcsSUFBSSxDQUZvQjtBQUczQix1QkFBTyxDQUhvQjtBQUkzQix3QkFBUTtBQUptQixhQUFULEVBTXRCLEtBTnNCLEVBTWYsS0FBSyxTQU5VLEVBTUMsS0FBSyxZQU5OLENBQXRCOztBQVFBLGlCQUFLLEtBQUwsQ0FBVyxLQUFLLEVBQWhCLElBQXNCLElBQUksSUFBSixDQUFTO0FBQzNCLG1CQUFHLElBQUksQ0FEb0I7QUFFM0IsbUJBQUcsSUFBSSxDQUZvQjtBQUczQix1QkFBTyxDQUhvQjtBQUkzQix3QkFBUTtBQUptQixhQUFULEVBTXRCLEtBTnNCLEVBTWYsS0FBSyxTQU5VLEVBTUMsS0FBSyxZQU5OLENBQXRCO0FBT0g7OztnQ0FFTztBQUNKLGlCQUFLLFFBQUwsQ0FBYyxNQUFkLEdBQXVCLENBQXZCOztBQUVBLG1CQUFPLEtBQUssS0FBTCxDQUFXLE1BQWxCLEVBQTBCO0FBQ3RCLHFCQUFLLEtBQUwsQ0FBVyxHQUFYLEdBQWlCLEtBQWpCO0FBQ0g7QUFDSjs7Ozs7O0FBR0wsS0FBSyxFQUFMLEdBQVUsQ0FBVjtBQUNBLEtBQUssRUFBTCxHQUFVLENBQVY7QUFDQSxLQUFLLEVBQUwsR0FBVSxDQUFWO0FBQ0EsS0FBSyxFQUFMLEdBQVUsQ0FBVjs7SUFFcUIsUTtBQUNqQixzQkFBWSxNQUFaLEVBQXFEO0FBQUEsWUFBakMsUUFBaUMseURBQXRCLENBQUMsQ0FBcUI7QUFBQSxZQUFsQixXQUFrQix5REFBSixDQUFDLENBQUc7O0FBQUE7O0FBQ2pELGFBQUssSUFBTCxHQUFZLElBQUksSUFBSixDQUFTLE1BQVQsRUFBaUIsQ0FBakIsRUFBb0IsUUFBcEIsRUFBOEIsV0FBOUIsQ0FBWjtBQUNIOzs7OytCQUVNLEksRUFBTTtBQUNULGdCQUFJLE1BQU0sT0FBTixDQUFjLElBQWQsQ0FBSixFQUF5QjtBQUNyQixxQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssTUFBekIsRUFBaUMsR0FBakMsRUFBc0M7QUFDbEMseUJBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsS0FBSyxDQUFMLENBQWpCO0FBQ0g7QUFDSixhQUpELE1BSU87QUFDSCxxQkFBSyxJQUFMLENBQVUsTUFBVixDQUFpQixJQUFqQjtBQUNIO0FBQ0o7OztnQ0FFTztBQUNKLGlCQUFLLElBQUwsQ0FBVSxLQUFWO0FBQ0g7OztpQ0FFUSxJLEVBQU07QUFDWCxtQkFBTyxLQUFLLElBQUwsQ0FBVSxRQUFWLENBQW1CLElBQW5CLENBQVA7QUFDSDs7Ozs7O2tCQXJCZ0IsUTs7Ozs7Ozs7a0JDL0dHLEs7O0FBRnhCOzs7Ozs7QUFFZSxTQUFTLEtBQVQsQ0FBZSxHQUFmLEVBQTZDO0FBQUEsUUFBekIsT0FBeUIseURBQWYsRUFBZTtBQUFBLFFBQVgsSUFBVyx5REFBSixFQUFJOztBQUN4RCxVQUFNLG1CQUFtQixHQUFuQixDQUFOO0FBQ0EsY0FBVSxtQkFBbUIsT0FBbkIsQ0FBVjs7QUFFQSxRQUFNLFdBQVcsbUJBQW1CLFVBQW5CLENBQWpCO0FBQ0EsV0FBTyxZQUFVLG1CQUFtQixJQUFuQixDQUFWLEdBQXFDLFFBQXJDLEdBQWtELEVBQXpEOztBQUVBLFdBQU8sMENBQXlCLE9BQXpCLGNBQXlDLElBQXpDLEdBQWdELEdBQWhELENBQVA7QUFDSDs7Ozs7Ozs7a0JDUnVCLFE7O0FBRnhCOzs7Ozs7QUFFZSxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBdUI7QUFDbEMsVUFBTSxtQkFBbUIsR0FBbkIsQ0FBTjtBQUNBLFdBQU8sdUVBQXNELEdBQXRELENBQVA7QUFDSDs7Ozs7Ozs7a0JDSHVCLGtCOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBUyxrQkFBVCxDQUE0QixLQUE1QixFQUFtQyxRQUFuQyxFQUE2QyxHQUE3QyxFQUFnSDtBQUFBLFFBQTlELEtBQThELHlEQUF0RCxFQUFzRDtBQUFBLFFBQWxELEtBQWtELHlEQUExQyxFQUEwQztBQUFBLFFBQXRDLE9BQXNDLHlEQUE1QixFQUE0QjtBQUFBLFFBQXhCLElBQXdCLHlEQUFqQixFQUFpQjtBQUFBLFFBQWIsTUFBYSx5REFBSixFQUFJOztBQUMzSCxZQUFRLG1CQUFtQixLQUFuQixDQUFSO0FBQ0EsY0FBVSxtQkFBbUIsT0FBbkIsQ0FBVjtBQUNBLFdBQU8sbUJBQW1CLElBQW5CLENBQVA7O0FBRUEsUUFBTSxvREFBa0QsS0FBbEQsZ0JBQWtFLE1BQWxFLHNCQUF5RixRQUEvRjtBQUNBLFFBQU0sb0JBQWtCLEtBQWxCLGNBQWdDLEdBQWhDLGlCQUErQyxPQUEvQyxxQkFBc0UsSUFBdEUsaUJBQXNGLEtBQTVGOztBQUVBLFdBQU8sK0RBQThDLE1BQTlDLFNBQXdELE9BQXhELENBQVA7QUFDSDs7Ozs7Ozs7a0JDVHVCLFU7O0FBRnhCOzs7Ozs7QUFFZSxTQUFTLFVBQVQsQ0FBb0IsR0FBcEIsRUFBeUI7QUFDcEMsVUFBTSxtQkFBbUIsR0FBbkIsQ0FBTjtBQUNBLFdBQU8sNERBQTJDLEdBQTNDLENBQVA7QUFDSDs7Ozs7Ozs7O0FDTEQ7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFFZTtBQUNYLDBCQURXO0FBRVgsZ0NBRlc7QUFHWCxvREFIVztBQUlYLG9DQUpXO0FBS1gsZ0NBTFc7QUFNWCxrQ0FOVztBQU9YLDRCQVBXO0FBUVgsNEJBUlc7QUFTWCxzQkFUVztBQVVYLDhCQVZXO0FBV1gsa0NBWFc7QUFZWCwwQkFaVztBQWFYO0FBYlcsQzs7Ozs7Ozs7a0JDWlMsUTs7QUFGeEI7Ozs7OztBQUVlLFNBQVMsUUFBVCxDQUFrQixHQUFsQixFQUFtQztBQUFBLFFBQVosS0FBWSx5REFBSixFQUFJOztBQUM5QyxVQUFNLG1CQUFtQixHQUFuQixDQUFOO0FBQ0EsWUFBUSxtQkFBbUIsS0FBbkIsQ0FBUjtBQUNBLFdBQU8sOEVBQTZELEdBQTdELGVBQTBFLEtBQTFFLENBQVA7QUFDSDs7Ozs7Ozs7a0JDSnVCLFM7O0FBRnhCOzs7Ozs7QUFFZSxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBd0IsS0FBeEIsRUFBMEM7QUFBQSxRQUFYLElBQVcseURBQUosRUFBSTs7QUFDckQsVUFBTSxtQkFBbUIsR0FBbkIsQ0FBTjtBQUNBLFlBQVEsbUJBQW1CLEtBQW5CLENBQVI7QUFDQSxXQUFPLG1CQUFtQixJQUFuQixDQUFQO0FBQ0EsV0FBTyx1RUFBc0QsR0FBdEQsZUFBbUUsS0FBbkUscUJBQXdGLElBQXhGLENBQVA7QUFDSDs7Ozs7Ozs7a0JDTHVCLE07O0FBRnhCOzs7Ozs7QUFFZSxTQUFTLE1BQVQsQ0FBZ0IsR0FBaEIsRUFBaUM7QUFBQSxRQUFaLEtBQVkseURBQUosRUFBSTs7QUFDNUMsVUFBTSxtQkFBbUIsR0FBbkIsQ0FBTjtBQUNBLFlBQVEsbUJBQW1CLEtBQW5CLENBQVI7QUFDQSxXQUFPLDREQUEyQyxHQUEzQyxlQUF3RCxLQUF4RCxDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ0p1QixTOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBUyxTQUFULENBQW1CLEdBQW5CLEVBQW9DO0FBQUEsUUFBWixLQUFZLHlEQUFKLEVBQUk7O0FBQy9DLFVBQU0sbUJBQW1CLEdBQW5CLENBQU47QUFDQSxZQUFRLG1CQUFtQixLQUFuQixDQUFSO0FBQ0EsV0FBTyw0RUFBMkQsR0FBM0QsZUFBd0UsS0FBeEUsQ0FBUDtBQUNIOzs7Ozs7OztrQkNOdUIsRztBQUFULFNBQVMsR0FBVCxDQUFhLEdBQWIsRUFBNkI7QUFBQSxRQUFYLElBQVcseURBQUosRUFBSTs7QUFDeEMsVUFBTSxtQkFBbUIsR0FBbkIsQ0FBTjs7QUFFQSxRQUFNLFdBQVcsbUJBQW1CLFVBQW5CLENBQWpCO0FBQ0EsV0FBTyxZQUFVLG1CQUFtQixJQUFuQixDQUFWLEdBQXFDLFFBQXJDLEdBQWtELEVBQXpEOztBQUVBLFFBQU0sTUFBTSxrQkFBa0IsSUFBbEIsQ0FBdUIsVUFBVSxTQUFqQyxDQUFaO0FBQ0EsUUFBTSxRQUFRLE1BQU0sR0FBTixHQUFZLEdBQTFCOztBQUVBLFdBQU8sUUFBUCxDQUFnQixJQUFoQixZQUE4QixLQUE5QixhQUEyQyxJQUEzQyxHQUFrRCxHQUFsRDtBQUNIOzs7Ozs7OztrQkNSdUIsTzs7QUFGeEI7Ozs7OztBQUVlLFNBQVMsT0FBVCxDQUFpQixHQUFqQixFQUE4RDtBQUFBLFFBQXhDLElBQXdDLHlEQUFqQyxFQUFpQztBQUFBLFFBQTdCLFFBQTZCLHlEQUFsQixFQUFrQjtBQUFBLFFBQWQsT0FBYyx5REFBSixFQUFJOztBQUN6RSxVQUFNLG1CQUFtQixHQUFuQixDQUFOO0FBQ0EsV0FBTyxtQkFBbUIsSUFBbkIsQ0FBUDtBQUNBLGVBQVcsbUJBQW1CLFFBQW5CLENBQVg7QUFDQSxjQUFVLG1CQUFtQixPQUFuQixDQUFWOztBQUVBLFdBQU8sK0RBQThDLEdBQTlDLGNBQTBELElBQTFELGtCQUEyRSxRQUEzRSxpQkFBK0YsT0FBL0YsQ0FBUDtBQUNIOzs7Ozs7OztrQkNQdUIsUzs7QUFGeEI7Ozs7OztBQUVlLFNBQVMsU0FBVCxDQUFtQixHQUFuQixFQUFrRTtBQUFBLFFBQTFDLEtBQTBDLHlEQUFsQyxFQUFrQztBQUFBLFFBQTlCLFdBQThCLHlEQUFoQixFQUFnQjtBQUFBLFFBQVosS0FBWSx5REFBSixFQUFJOztBQUM3RSxVQUFNLG1CQUFtQixHQUFuQixDQUFOO0FBQ0EsWUFBUSxtQkFBbUIsS0FBbkIsQ0FBUjtBQUNBLGtCQUFjLG1CQUFtQixXQUFuQixDQUFkO0FBQ0EsWUFBUSxtQkFBbUIsS0FBbkIsQ0FBUjtBQUNBLFdBQU8sNERBQTJDLEdBQTNDLGVBQXdELEtBQXhELHFCQUE2RSxXQUE3RSxlQUFrRyxLQUFsRyxDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ051QixLOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBUyxLQUFULENBQWUsR0FBZixFQUE0QztBQUFBLFFBQXhCLEtBQXdCLHlEQUFoQixFQUFnQjtBQUFBLFFBQVosS0FBWSx5REFBSixFQUFJOztBQUN2RCxVQUFNLG1CQUFtQixHQUFuQixDQUFOO0FBQ0EsWUFBUSxtQkFBbUIsS0FBbkIsQ0FBUjtBQUNBLFlBQVEsbUJBQW1CLEtBQW5CLENBQVI7O0FBRUEsUUFBTSxrQkFBZ0IsR0FBaEIsdUJBQXFDLEtBQXJDLGFBQWtELEtBQWxELCtCQUFOO0FBQ0EsV0FBTyxtRUFBa0QsTUFBbEQsQ0FBUDtBQUNIOzs7Ozs7OztrQkNUdUIsUTtBQUFULFNBQVMsUUFBVCxDQUFrQixHQUFsQixFQUFrQztBQUFBLFFBQVgsSUFBVyx5REFBSixFQUFJOztBQUM3QyxVQUFNLG1CQUFtQixHQUFuQixDQUFOOztBQUVBLFFBQU0sV0FBVyxtQkFBbUIsVUFBbkIsQ0FBakI7QUFDQSxXQUFPLFlBQVUsbUJBQW1CLElBQW5CLENBQVYsR0FBcUMsUUFBckMsR0FBa0QsRUFBekQ7O0FBRUEsV0FBTyxRQUFQLENBQWdCLElBQWhCLDZCQUErQyxJQUEvQyxHQUFzRCxHQUF0RDtBQUNIOzs7Ozs7OztBQ1BELFNBQVMsSUFBVCxDQUFjLEdBQWQsRUFBbUI7QUFDZixRQUFJLE9BQU8sSUFBWDs7QUFFQSxRQUFJO0FBQ0EsZUFBTyxhQUFhLE9BQWIsQ0FBcUIsR0FBckIsQ0FBUDtBQUNILEtBRkQsQ0FFRSxPQUFPLEdBQVAsRUFBWSxDQUFFOztBQUVoQixXQUFPLElBQVA7QUFDSDs7QUFFRCxTQUFTLElBQVQsQ0FBYyxHQUFkLEVBQW1CLElBQW5CLEVBQXlCO0FBQ3JCLFFBQUk7QUFDQSxxQkFBYSxPQUFiLENBQXFCLEdBQXJCLEVBQTBCLElBQTFCO0FBQ0EsZUFBTyxJQUFQO0FBQ0gsS0FIRCxDQUdFLE9BQU8sR0FBUCxFQUFZO0FBQ1YsZ0JBQVEsS0FBUixDQUFjLGdDQUFkO0FBQ0g7QUFDSjs7QUFFRCxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBdUI7QUFDbkIsUUFBTSxPQUFPLEtBQUssR0FBTCxDQUFiO0FBQ0EsV0FBTyxPQUFPLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBUCxHQUEwQixJQUFqQztBQUNIOztBQUVELFNBQVMsUUFBVCxDQUFrQixHQUFsQixFQUF1QixJQUF2QixFQUE2QjtBQUN6QixXQUFPLEtBQUssR0FBTCxFQUFVLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBVixDQUFQO0FBQ0g7O0FBRUQsU0FBUyxNQUFULENBQWdCLEdBQWhCLEVBQXFCO0FBQ2pCLFFBQUk7QUFDQSxxQkFBYSxVQUFiLENBQXdCLEdBQXhCO0FBQ0gsS0FGRCxDQUVFLE9BQU8sR0FBUCxFQUFZLENBQUU7QUFDbkI7O2tCQUVjLEVBQUMsVUFBRCxFQUFPLFVBQVAsRUFBYSxrQkFBYixFQUF1QixrQkFBdkIsRUFBaUMsY0FBakMsRTs7Ozs7Ozs7a0JDakNTLFU7O0FBQVQsU0FBUyxVQUFULENBQW9CLEdBQXBCLEVBQXlCLE1BQXpCLEVBQWlDO0FBQzVDLFFBQUksUUFBUSxJQUFJLE9BQUosQ0FBWSxNQUFaLENBQVo7QUFDQSxRQUFJLFVBQVUsQ0FBQyxDQUFmLEVBQWtCO0FBQ2QsZUFBTyxFQUFQO0FBQ0g7QUFDRCxhQUFTLE9BQU8sTUFBaEI7QUFDQSxXQUFPLElBQUksS0FBSixDQUFVLEtBQVYsQ0FBUDtBQUNIOzs7Ozs7OztrQkNQdUIsUzs7QUFBVCxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBd0IsTUFBeEIsRUFBZ0M7QUFDM0MsUUFBSSxRQUFRLElBQUksV0FBSixDQUFnQixNQUFoQixDQUFaO0FBQ0EsUUFBSSxVQUFVLENBQUMsQ0FBZixFQUFrQjtBQUNkLGVBQU8sRUFBUDtBQUNIO0FBQ0QsYUFBUyxPQUFPLE1BQWhCO0FBQ0EsV0FBTyxJQUFJLEtBQUosQ0FBVSxLQUFWLENBQVA7QUFDSDs7Ozs7Ozs7a0JDUHVCLFc7O0FBQVQsU0FBUyxXQUFULENBQXFCLEdBQXJCLEVBQTBCLE1BQTFCLEVBQWtDO0FBQzdDLFFBQU0sUUFBUSxJQUFJLE9BQUosQ0FBWSxNQUFaLENBQWQ7QUFDQSxRQUFJLFVBQVUsQ0FBQyxDQUFmLEVBQWtCO0FBQ2QsZUFBTyxFQUFQO0FBQ0g7QUFDRCxXQUFPLElBQUksS0FBSixDQUFVLENBQVYsRUFBYSxLQUFiLENBQVA7QUFDSDs7Ozs7Ozs7a0JDTnVCLFU7O0FBQVQsU0FBUyxVQUFULENBQW9CLEdBQXBCLEVBQXlCLE1BQXpCLEVBQWlDO0FBQzVDLFFBQU0sUUFBUSxJQUFJLFdBQUosQ0FBZ0IsTUFBaEIsQ0FBZDtBQUNBLFFBQUksVUFBVSxDQUFDLENBQWYsRUFBa0I7QUFDZCxlQUFPLEVBQVA7QUFDSDtBQUNELFdBQU8sSUFBSSxLQUFKLENBQVUsQ0FBVixFQUFhLEtBQWIsQ0FBUDtBQUNIOzs7Ozs7OztrQkNOdUIsVTs7QUFBVCxTQUFTLFVBQVQsQ0FBb0IsR0FBcEIsRUFBeUIsTUFBekIsRUFBaUM7QUFDNUMsV0FBTyxJQUFJLE9BQUosQ0FBWSxNQUFaLE1BQXdCLENBQS9CO0FBQ0g7Ozs7Ozs7O2tCQ0Z1QixPOztBQUFULFNBQVMsT0FBVCxDQUFpQixHQUFqQixFQUFzQixLQUF0QixFQUE2QixHQUE3QixFQUFrQztBQUM3QyxRQUFJLFNBQVMsRUFBYjtBQUNBLFFBQUksYUFBYSxJQUFJLE9BQUosQ0FBWSxLQUFaLENBQWpCO0FBQ0EsUUFBSSxlQUFlLENBQUMsQ0FBcEIsRUFBdUI7QUFDbkIsc0JBQWMsTUFBTSxNQUFwQjtBQUNBLFlBQU0sV0FBVyxJQUFJLE9BQUosQ0FBWSxHQUFaLEVBQWlCLFVBQWpCLENBQWpCO0FBQ0EsWUFBSSxhQUFhLENBQUMsQ0FBbEIsRUFBcUI7QUFDakIscUJBQVMsSUFBSSxLQUFKLENBQVUsVUFBVixFQUFzQixRQUF0QixDQUFUO0FBQ0g7QUFDSjtBQUNELFdBQU8sTUFBUDtBQUNIOzs7Ozs7OztrQkNKdUIsSzs7QUFSeEI7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBT2UsU0FBUyxLQUFULENBQWUsR0FBZixFQUFvQixHQUFwQixFQUFzQztBQUFBLFFBQWIsS0FBYSx5REFBTCxHQUFLOztBQUNqRCxRQUFNLE1BQU0sRUFBWjs7QUFFQSxRQUFJLENBQUMsR0FBRCxJQUFRLENBQUMsSUFBSSxRQUFKLENBQWEsS0FBYixDQUFiLEVBQWtDO0FBQzlCLGVBQU8sR0FBUDtBQUNIOztBQUVELFFBQUksVUFBVSxHQUFkLEVBQW1CO0FBQ2YsZUFBTyxLQUFQO0FBQ0g7O0FBRUQsUUFBSSxXQUFXLENBQWY7QUFDQSxRQUFNLFdBQVcsSUFBSSxNQUFKLENBQVcsT0FBTyw2QkFBYyxLQUFkLENBQVAsR0FBOEIsS0FBekMsQ0FBakI7O0FBRUEsV0FBTyxXQUFXLElBQUksTUFBdEIsRUFBOEI7QUFDMUIsWUFBSSxZQUFZLElBQUksTUFBSixDQUFXLFFBQVgsRUFBcUIsR0FBckIsQ0FBaEI7QUFDQSxZQUFJLENBQUMsVUFBVSxRQUFWLENBQW1CLEtBQW5CLENBQUwsRUFBZ0M7QUFDNUIsZ0JBQUksSUFBSixDQUFTLHdCQUFTLFNBQVQsRUFBb0IsVUFBVSxNQUE5QixDQUFUO0FBQ0Esd0JBQVksVUFBVSxNQUF0QjtBQUNIO0FBQ0Qsb0JBQVksVUFBVSxPQUFWLENBQWtCLFFBQWxCLEVBQTRCLEVBQTVCLENBQVo7QUFDQSxvQkFBWSxVQUFVLE1BQXRCO0FBQ0EsWUFBSSxJQUFKLENBQVMsVUFBVSxJQUFWLEVBQVQ7QUFDSDtBQUNELFdBQU8sR0FBUDtBQUNIOzs7Ozs7OztrQkNoQ3VCLFU7O0FBQVQsU0FBUyxVQUFULENBQW9CLEdBQXBCLEVBQXNDO0FBQUEsUUFBYixHQUFhLHlEQUFQLEtBQU87O0FBQ2pELFFBQU0sU0FBUyxJQUFJLFFBQUosRUFBZjtBQUNBLFFBQU0sS0FBSyxNQUFNLFNBQU4sR0FBa0IsT0FBN0I7QUFDQSxXQUFPLE9BQU8sT0FBUCxDQUFlLEVBQWYsRUFBbUIsVUFBQyxLQUFEO0FBQUEsZUFBVyxNQUFNLFdBQU4sRUFBWDtBQUFBLEtBQW5CLENBQVA7QUFDSDs7Ozs7Ozs7a0JDRnVCLE87O0FBSHhCOzs7Ozs7O0FBR2UsU0FBUyxPQUFULENBQWlCLEdBQWpCLEVBQXNCLE1BQXRCLEVBQThCLGFBQTlCLEVBQTZDO0FBQ3hELFFBQU0sYUFBYSw2QkFBYyxNQUFkLENBQW5CO0FBQ0EsUUFBTSxRQUFTLENBQUMsYUFBRixHQUFtQixJQUFuQixHQUEwQixHQUF4QztBQUNBLFdBQU8sSUFBSSxLQUFKLENBQVUsSUFBSSxNQUFKLENBQVcsVUFBWCxFQUF1QixLQUF2QixDQUFWLEVBQXlDLE1BQWhEO0FBQ0g7Ozs7Ozs7O2tCQ0p1QixZOzs7O0FBQVQsU0FBUyxZQUFULEdBQWdEO0FBQUEsUUFBMUIsTUFBMEIseURBQWpCLEVBQWlCO0FBQUEsUUFBYixNQUFhLHlEQUFKLEVBQUk7OztBQUUzRCxRQUFJLFdBQVcsTUFBZixFQUF1QjtBQUNuQixlQUFPLENBQVA7QUFDSDs7QUFFRCxRQUFJLENBQUMsT0FBTyxNQUFaLEVBQW9CO0FBQ2hCLGVBQU8sT0FBTyxNQUFkO0FBQ0g7O0FBRUQsUUFBSSxDQUFDLE9BQU8sTUFBWixFQUFvQjtBQUNoQixlQUFPLE9BQU8sTUFBZDtBQUNIOztBQUVELFFBQU0sSUFBSSxFQUFWO0FBQ0EsUUFBSSxVQUFKO1FBQU8sVUFBUDtRQUFVLGFBQVY7O0FBRUEsU0FBSyxJQUFJLENBQVQsRUFBWSxLQUFLLE9BQU8sTUFBeEIsRUFBZ0MsR0FBaEMsRUFBcUM7QUFDakMsVUFBRSxDQUFGLElBQU8sRUFBUDtBQUNIO0FBQ0QsU0FBSyxJQUFJLENBQVQsRUFBWSxLQUFLLE9BQU8sTUFBeEIsRUFBZ0MsR0FBaEMsRUFBcUM7QUFDakMsVUFBRSxDQUFGLEVBQUssQ0FBTCxJQUFVLENBQVY7QUFDSDtBQUNELFNBQUssSUFBSSxDQUFULEVBQVksS0FBSyxPQUFPLE1BQXhCLEVBQWdDLEdBQWhDLEVBQXFDO0FBQ2pDLFVBQUUsQ0FBRixFQUFLLENBQUwsSUFBVSxDQUFWO0FBQ0g7O0FBRUQsU0FBSyxJQUFJLENBQVQsRUFBWSxLQUFLLE9BQU8sTUFBeEIsRUFBZ0MsR0FBaEMsRUFBcUM7O0FBRWpDLFlBQU0sS0FBSyxPQUFPLE1BQVAsQ0FBYyxJQUFJLENBQWxCLENBQVg7QUFDQSxhQUFLLElBQUksQ0FBVCxFQUFZLEtBQUssT0FBTyxNQUF4QixFQUFnQyxHQUFoQyxFQUFxQzs7QUFFakMsZ0JBQU0sS0FBSyxPQUFPLE1BQVAsQ0FBYyxJQUFJLENBQWxCLENBQVg7O0FBRUEsZ0JBQUksT0FBTyxFQUFYLEVBQWU7QUFDWCx1QkFBTyxDQUFQO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsdUJBQU8sQ0FBUDtBQUNIOztBQUVELGNBQUUsQ0FBRixFQUFLLENBQUwsSUFBVSxLQUFLLEdBQUwsQ0FBUyxFQUFFLElBQUksQ0FBTixFQUFTLENBQVQsSUFBYyxDQUF2QixFQUEwQixFQUFFLENBQUYsRUFBSyxJQUFJLENBQVQsSUFBYyxDQUF4QyxFQUEyQyxFQUFFLElBQUksQ0FBTixFQUFTLElBQUksQ0FBYixJQUFrQixJQUE3RCxDQUFWO0FBQ0g7QUFDSjs7QUFFRCxXQUFPLEVBQUUsT0FBTyxNQUFULEVBQWlCLE9BQU8sTUFBeEIsQ0FBUDtBQUNIOzs7Ozs7OztrQkMvQ3VCLFE7O0FBQVQsU0FBUyxRQUFULENBQWtCLEdBQWxCLEVBQXVCLE1BQXZCLEVBQStCO0FBQzFDLFdBQU8sSUFBSSxXQUFKLENBQWdCLE1BQWhCLE1BQTRCLElBQUksTUFBSixHQUFhLE9BQU8sTUFBdkQ7QUFDSDs7Ozs7Ozs7a0JDY3VCLFU7Ozs7Ozs7QUFYeEIsSUFBTSxZQUFZO0FBQ2QsU0FBSyxPQURTO0FBRWQsU0FBSyxNQUZTO0FBR2QsU0FBSyxNQUhTO0FBSWQsU0FBSyxRQUpTO0FBS2QsVUFBTSxPQUxRO0FBTWQsU0FBSyxRQU5TO0FBT2QsU0FBSyxRQVBTO0FBUWQsU0FBSztBQVJTLENBQWxCOztBQVdlLFNBQVMsVUFBVCxDQUFvQixNQUFwQixFQUE0QjtBQUN2QyxXQUFPLE9BQU8sTUFBUCxFQUNGLE9BREUsQ0FDTSxjQUROLEVBQ3NCLFNBQVMsYUFBVCxDQUF1QixDQUF2QixFQUEwQjtBQUMvQyxlQUFPLFVBQVUsQ0FBVixDQUFQO0FBQ0gsS0FIRSxDQUFQO0FBSUg7Ozs7Ozs7O2tCQ3JCdUIsYTs7QUFBVCxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsRUFBZ0M7QUFDM0MsV0FBTyxRQUFRLE9BQVIsQ0FBZ0IscUNBQWhCLEVBQXVELE1BQXZELENBQVA7QUFDSDs7Ozs7Ozs7a0JDQXVCLE87O0FBSHhCOzs7Ozs7O0FBR2UsU0FBUyxPQUFULENBQWlCLEdBQWpCLEVBQXNCO0FBQ2pDLFdBQU8sQ0FBQyxDQUFDLHFDQUFzQixHQUF0QixFQUEyQixNQUFwQztBQUNIOzs7Ozs7Ozs7QUNMRDs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFFZTtBQUNYLG9DQURXO0FBRVgsa0NBRlc7QUFHWCxzQ0FIVztBQUlYLG9DQUpXO0FBS1gsb0NBTFc7QUFNWCw4QkFOVztBQU9YLDBCQVBXO0FBUVgsb0NBUlc7QUFTWCw4QkFUVztBQVVYLHdDQVZXO0FBV1gsZ0NBWFc7QUFZWCxvQ0FaVztBQWFYLDBDQWJXO0FBY1gsOEJBZFc7QUFlWCxrQ0FmVztBQWdCWCw4QkFoQlc7QUFpQlgsZ0NBakJXO0FBa0JYLHdDQWxCVztBQW1CWCxvQ0FuQlc7QUFvQlgsNEJBcEJXO0FBcUJYLDBEQXJCVztBQXNCWCw4QkF0Qlc7QUF1Qlgsd0NBdkJXO0FBd0JYLG9DQXhCVztBQXlCWCxrQ0F6Qlc7QUEwQlgsZ0NBMUJXO0FBMkJYLGdDQTNCVztBQTRCWCxnQ0E1Qlc7QUE2QlgsZ0NBN0JXO0FBOEJYO0FBOUJXLEM7Ozs7Ozs7O2tCQzlCUyxTOztBQUFULFNBQVMsU0FBVCxDQUFtQixHQUFuQixFQUF3QjtBQUNuQyxRQUFNLE9BQU8sbUNBQWI7QUFDQSxXQUFPLEtBQUssSUFBTCxDQUFVLEdBQVYsQ0FBUDtBQUNIOzs7Ozs7OztrQkNIdUIsTzs7QUFBVCxTQUFTLE9BQVQsQ0FBaUIsR0FBakIsRUFBc0IsTUFBdEIsRUFBOEIsTUFBOUIsRUFBc0M7QUFDakQsVUFBTSxPQUFPLEdBQVAsQ0FBTjtBQUNBLFdBQU8sSUFBSSxNQUFKLEdBQWEsTUFBcEIsRUFBNEI7QUFDeEIsY0FBTSxTQUFTLEdBQWY7QUFDSDtBQUNELFdBQU8sR0FBUDtBQUNIOzs7Ozs7OztrQkNOdUIsUTs7QUFBVCxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBdUIsTUFBdkIsRUFBK0IsTUFBL0IsRUFBdUM7QUFDbEQsVUFBTSxPQUFPLEdBQVAsQ0FBTjtBQUNBLFdBQU8sSUFBSSxNQUFKLEdBQWEsTUFBcEIsRUFBNEI7QUFDeEIsZUFBTyxNQUFQO0FBQ0g7QUFDRCxXQUFPLEdBQVA7QUFDSDs7Ozs7Ozs7a0JDUHVCLFk7QUFBVCxTQUFTLFlBQVQsQ0FBc0IsR0FBdEIsRUFBMkI7QUFDdEMsVUFBTSxJQUFJLElBQUosRUFBTjs7QUFFQSxRQUFNLFlBQVksSUFBSSxXQUFKLENBQWdCLEdBQWhCLENBQWxCO0FBQ0EsUUFBSSxZQUFZLENBQWhCLEVBQW1CO0FBQ2YsZUFBVSxJQUFJLEtBQUosQ0FBVSxDQUFWLEVBQWEsU0FBYixDQUFWLGNBQTBDLElBQUksS0FBSixDQUFVLFlBQVksQ0FBdEIsQ0FBMUM7QUFDSDs7QUFFRCxXQUFPLEdBQVA7QUFDSDs7Ozs7Ozs7a0JDTnVCLFU7O0FBSHhCOzs7Ozs7O0FBR2UsU0FBUyxVQUFULENBQW9CLEdBQXBCLEVBQXlCO0FBQ3BDLFFBQU0sU0FBUyxJQUFJLFdBQUosR0FBa0IsT0FBbEIsQ0FBMEIsY0FBMUIsdUJBQWY7QUFDQSxXQUFPLE9BQU8sT0FBUCxDQUFlLFNBQWYsRUFBMEIsR0FBMUIsQ0FBUDtBQUNIOzs7Ozs7OztrQkNIdUIsTTs7QUFIeEI7Ozs7Ozs7QUFHZSxTQUFTLE1BQVQsQ0FBZ0IsR0FBaEIsRUFBcUIsTUFBckIsRUFBb0Q7QUFBQSxRQUF2QixhQUF1Qix5REFBUCxLQUFPOztBQUMvRCxRQUFNLGFBQWEsNkJBQWMsTUFBZCxDQUFuQjtBQUNBLFFBQU0sUUFBUSxnQkFBZ0IsR0FBaEIsR0FBc0IsSUFBcEM7QUFDQSxXQUFPLElBQUksT0FBSixDQUFZLElBQUksTUFBSixDQUFXLFVBQVgsRUFBdUIsS0FBdkIsQ0FBWixFQUEyQyxFQUEzQyxDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ051QixxQjs7QUFBVCxTQUFTLHFCQUFULENBQStCLEdBQS9CLEVBQW9DO0FBQy9DLFdBQU8sSUFBSSxJQUFKLEdBQVcsT0FBWCxDQUFtQixNQUFuQixFQUEyQixHQUEzQixDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ0Z1QixPOztBQUFULFNBQVMsT0FBVCxDQUFpQixHQUFqQixFQUFzQjtBQUNqQyxXQUFPLElBQUksS0FBSixDQUFVLEVBQVYsRUFBYyxPQUFkLEdBQXdCLElBQXhCLENBQTZCLEVBQTdCLENBQVA7QUFDSDs7Ozs7Ozs7a0JDRnVCLFk7O0FBQVQsU0FBUyxZQUFULENBQXNCLEdBQXRCLEVBQTJCO0FBQ3RDLFdBQU8sSUFBSSxLQUFKLENBQVUsR0FBVixFQUFlLE9BQWYsR0FBeUIsSUFBekIsQ0FBOEIsR0FBOUIsQ0FBUDtBQUNIOzs7Ozs7OztrQkNBdUIsVTs7QUFIeEI7Ozs7Ozs7QUFHZSxTQUFTLFVBQVQsQ0FBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEI7QUFDckMsUUFBTSxJQUFJLDRCQUFhLENBQWIsRUFBZ0IsQ0FBaEIsQ0FBVjtBQUNBLFFBQU0sSUFBSSxLQUFLLEdBQUwsQ0FBUyxFQUFFLE1BQVgsRUFBbUIsRUFBRSxNQUFyQixDQUFWO0FBQ0EsUUFBSSxNQUFNLENBQVYsRUFBYTtBQUNULGVBQU8sQ0FBUDtBQUNIO0FBQ0QsV0FBUSxJQUFJLElBQUksQ0FBaEI7QUFDSDs7Ozs7Ozs7a0JDVHVCLFM7O0FBQVQsU0FBUyxTQUFULENBQW1CLEdBQW5CLEVBQXdCO0FBQ25DLFdBQU8sSUFBSSxPQUFKLENBQVksZUFBWixFQUE2QixFQUE3QixDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ0R1QixROzs7QUFBVCxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBdUI7QUFDbEMsV0FBTyxJQUFJLE9BQUosQ0FBWSxNQUFaLEVBQW9CLFVBQVMsTUFBVCxFQUFpQjtBQUN4QyxZQUFNLFFBQVEsT0FBTyxXQUFQLEVBQWQ7QUFDQSxZQUFNLFFBQVEsT0FBTyxXQUFQLEVBQWQ7QUFDQSxnQkFBUSxNQUFSO0FBQ0ksaUJBQUssS0FBTDtBQUNJLHVCQUFPLEtBQVA7QUFDSixpQkFBSyxLQUFMO0FBQ0ksdUJBQU8sS0FBUDtBQUNKO0FBQ0ksdUJBQU8sTUFBUDtBQU5SO0FBUUgsS0FYTSxDQUFQO0FBWUg7Ozs7Ozs7O2tCQ2R1QixROztBQUFULFNBQVMsUUFBVCxDQUFrQixPQUFsQixFQUF3QztBQUFBLFFBQWIsS0FBYSx5REFBTCxHQUFLOztBQUNuRCxRQUFNLElBQUksS0FBSyxLQUFMLENBQVcsVUFBVSxJQUFyQixDQUFWO0FBQ0EsUUFBTSxJQUFJLEtBQUssS0FBTCxDQUFZLFVBQVUsSUFBWCxHQUFtQixFQUE5QixDQUFWO0FBQ0EsUUFBTSxJQUFJLEtBQUssS0FBTCxDQUFZLFVBQVUsSUFBWCxHQUFtQixFQUE5QixDQUFWO0FBQ0EsUUFBTSxLQUFLLENBQUMsSUFBSSxFQUFKLEdBQVMsTUFBTSxDQUFmLEdBQW1CLENBQXBCLElBQXlCLEtBQXBDO0FBQ0EsUUFBTSxLQUFLLENBQUMsSUFBSSxFQUFKLEdBQVMsTUFBTSxDQUFmLEdBQW1CLENBQXBCLElBQXlCLEtBQXBDO0FBQ0EsUUFBTSxLQUFNLElBQUksRUFBSixHQUFTLE1BQU0sQ0FBZixHQUFtQixDQUEvQjtBQUNBLFdBQU8sS0FBSyxFQUFMLEdBQVUsRUFBakI7QUFDSDs7Ozs7Ozs7a0JDVHVCLFE7QUFBVCxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBdUI7QUFDbEMsV0FBTyxPQUFPLElBQUksT0FBSixDQUFZLFVBQVosRUFBd0IsRUFBeEIsQ0FBUCxDQUFQO0FBQ0g7Ozs7Ozs7O2tCQ0R1QixROztBQUFULFNBQVMsUUFBVCxDQUFrQixHQUFsQixFQUF1QixHQUF2QixFQUE0QztBQUFBLFFBQWhCLE1BQWdCLHlEQUFQLEtBQU87O0FBQ3ZELFdBQU8sT0FBTyxNQUFkO0FBQ0EsUUFBSSxRQUFRLEdBQVo7QUFDQSxRQUFJLE1BQU0sTUFBTixHQUFlLEdBQW5CLEVBQXdCO0FBQ3BCLGdCQUFRLE1BQU0sTUFBTixDQUFhLENBQWIsRUFBZ0IsR0FBaEIsQ0FBUjtBQUNBLFlBQU0sSUFBSSxPQUFWO0FBQ0EsWUFBSSxFQUFFLElBQUYsQ0FBTyxJQUFJLE1BQUosQ0FBVyxHQUFYLENBQVAsQ0FBSixFQUE2QjtBQUN6QixvQkFBUSxNQUFNLE9BQU4sQ0FBYyxXQUFkLEVBQTJCLEVBQTNCLEVBQStCLFNBQS9CLEVBQVI7QUFDSDtBQUNELGlCQUFTLE1BQVQ7QUFDSDtBQUNELFdBQU8sS0FBUDtBQUNIOzs7Ozs7OztrQkNadUIsUzs7QUFBVCxTQUFTLFNBQVQsQ0FBbUIsR0FBbkIsRUFBd0I7QUFDbkMsV0FBTyxJQUFJLEtBQUosQ0FBVSxVQUFWLEVBQXNCLE1BQTdCO0FBQ0g7Ozs7Ozs7Ozs7OztBQ0ZEOzs7Ozs7OztJQUVxQixNO0FBQ2pCLHNCQUFjO0FBQUE7O0FBQ1YsYUFBSyxNQUFMLEdBQWMsS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixJQUFqQixDQUFkOztBQUVBLGFBQUssUUFBTCxHQUFnQiwyQkFBaEI7O0FBRUEsYUFBSyxPQUFMLEdBQWUsS0FBZjtBQUNBLGFBQUssSUFBTCxHQUFZLENBQVo7OztBQUdIOzs7O2dDQUVPO0FBQ0osZ0JBQUksS0FBSyxPQUFULEVBQWtCO0FBQ2Q7QUFDSDs7QUFFRCxpQkFBSyxPQUFMLEdBQWUsSUFBZjtBQUNBLGlCQUFLLE1BQUw7QUFDSDs7OytCQUVNO0FBQ0gsZ0JBQUksQ0FBQyxLQUFLLE9BQVYsRUFBbUI7QUFDZjtBQUNIOztBQUVELGlCQUFLLE9BQUwsR0FBZSxLQUFmO0FBQ0g7OztpQ0FFUTtBQUNMLGdCQUFJLENBQUMsS0FBSyxPQUFWLEVBQW1CO0FBQ2Y7QUFDSDs7QUFFRCxtQkFBTyxxQkFBUCxDQUE2QixLQUFLLE1BQWxDOztBQUVBLGdCQUFNLE1BQU0sS0FBSyxHQUFMLEVBQVo7QUFDQSxnQkFBSSxLQUFLLE1BQU0sS0FBSyxJQUFwQjtBQUNBLGdCQUFJLEtBQUssRUFBVCxFQUFhO0FBQ1QscUJBQUssRUFBTDtBQUNIO0FBQ0QsaUJBQUssSUFBTCxHQUFZLEdBQVo7Ozs7Ozs7Ozs7QUFVQSxpQkFBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixLQUFLLEtBQTVCO0FBQ0g7Ozs0QkFFRyxFLEVBQUksTyxFQUFTO0FBQ2IsbUJBQU8sS0FBSyxRQUFMLENBQWMsR0FBZCxDQUFrQixFQUFsQixFQUFzQixPQUF0QixDQUFQO0FBQ0g7OzsrQkFFTSxPLEVBQVM7QUFDWixpQkFBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixPQUFyQjtBQUNIOzs7Ozs7Ozs7OztrQkE1RGdCLE07Ozs7Ozs7O2tCQ0hHLEs7QUFBVCxTQUFTLEtBQVQsQ0FBZSxRQUFmLEVBQXlCLE1BQXpCLEVBQWlDLEtBQWpDLEVBQXdDLEtBQXhDLEVBQStDO0FBQzFELFFBQUksQ0FBQyxPQUFPLEVBQVosRUFBZ0I7QUFDWjtBQUNIO0FBQ0QsV0FBTyxFQUFQLENBQVUsTUFBVixFQUFrQixPQUFsQixFQUEyQixRQUEzQixFQUFxQyxNQUFyQyxFQUE2QyxLQUE3QyxFQUFvRCxLQUFwRDtBQUNIOzs7Ozs7Ozs7QUNMRDs7OztBQUNBOzs7O0FBQ0E7Ozs7OztrQkFFZTtBQUNYLDBCQURXO0FBRVgsZ0NBRlc7QUFHWDtBQUhXLEM7Ozs7Ozs7O2tCQ0pTLEk7QUFBVCxTQUFTLElBQVQsQ0FBYyxTQUFkLEVBQXlCO0FBQ3BDLFlBQVEsR0FBUixDQUFZLDhDQUFaLEVBQTRELFNBQTVEOzs7QUFHQSxLQUFDLFVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QjtBQUFDLFVBQUUsdUJBQUYsSUFBMkIsQ0FBM0IsQ0FBNkIsRUFBRSxDQUFGLElBQUssRUFBRSxDQUFGLEtBQU0sWUFBVTtBQUM5RSxhQUFDLEVBQUUsQ0FBRixFQUFLLENBQUwsR0FBTyxFQUFFLENBQUYsRUFBSyxDQUFMLElBQVEsRUFBaEIsRUFBb0IsSUFBcEIsQ0FBeUIsU0FBekI7QUFBb0MsU0FEcUIsRUFDcEIsRUFBRSxDQUFGLEVBQUssQ0FBTCxHQUFPLElBQUUsSUFBSSxJQUFKLEVBRFcsQ0FDQSxJQUFFLEVBQUUsYUFBRixDQUFnQixDQUFoQixDQUFGLEVBQ3pELElBQUUsRUFBRSxvQkFBRixDQUF1QixDQUF2QixFQUEwQixDQUExQixDQUR1RCxDQUMxQixFQUFFLEtBQUYsR0FBUSxDQUFSLENBQVUsRUFBRSxHQUFGLEdBQU0sQ0FBTixDQUFRLEVBQUUsVUFBRixDQUFhLFlBQWIsQ0FBMEIsQ0FBMUIsRUFBNEIsQ0FBNUI7QUFDaEQsS0FIRSxFQUdBLE1BSEEsRUFHTyxRQUhQLEVBR2dCLFFBSGhCLEVBR3lCLHlDQUh6QixFQUdtRSxJQUhuRTs7O0FBTUEsV0FBTyxFQUFQLENBQVUsUUFBVixFQUFvQixTQUFwQixFQUErQixNQUEvQjtBQUNBLFdBQU8sRUFBUCxDQUFVLE1BQVYsRUFBa0IsVUFBbEI7QUFDSDs7Ozs7Ozs7a0JDWnVCLFE7QUFBVCxTQUFTLFFBQVQsQ0FBa0IsSUFBbEIsRUFBd0I7QUFDbkMsUUFBSSxDQUFDLE9BQU8sRUFBWixFQUFnQjtBQUNaO0FBQ0g7QUFDRCxXQUFPLEVBQVAsQ0FBVSxNQUFWLEVBQWtCLFVBQWxCLEVBQThCLElBQTlCO0FBQ0g7Ozs7Ozs7Ozs7O0FDTEQ7Ozs7SUFFcUIsSztBQUNqQixtQkFBWSxFQUFaLEVBQWdCLEtBQWhCLEVBQXVCLFFBQXZCLEVBQWlDLE9BQWpDLEVBQTBDO0FBQUE7O0FBQ3RDLGFBQUssRUFBTCxHQUFVLEVBQVY7O0FBRUEsWUFBSSxLQUFKLEVBQVc7QUFDUCxpQkFBSyxFQUFMLENBQVEsS0FBUixFQUFlLFFBQWYsRUFBeUIsT0FBekI7QUFDSDtBQUNKOzs7OzJCQUVFLEssRUFBTyxRLEVBQXdCO0FBQUEsZ0JBQWQsT0FBYyx5REFBSixFQUFJOztBQUM5QixpQkFBSyxRQUFMLEdBQWdCLFFBQWhCO0FBQ0EsaUJBQUssSUFBTCxHQUFZLFFBQVEsSUFBUixxQkFBWjtBQUNBLGlCQUFLLEtBQUwsR0FBYSxRQUFRLEtBQVIsSUFBaUIsQ0FBOUI7QUFDQSxpQkFBSyxRQUFMLEdBQWdCLFFBQVEsUUFBeEI7QUFDQSxpQkFBSyxVQUFMLEdBQWtCLFFBQVEsVUFBMUI7QUFDQSxpQkFBSyxJQUFMLEdBQVksQ0FBWjtBQUNBLGlCQUFLLFFBQUwsR0FBZ0IsS0FBaEI7O0FBRUEsaUJBQUssTUFBTCxHQUFjLE9BQU8sSUFBUCxDQUFZLEtBQVosQ0FBZDtBQUNBLGlCQUFLLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxpQkFBSyxXQUFMLEdBQW1CLEVBQW5COztBQUVBLGlCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksS0FBSyxNQUFMLENBQVksTUFBaEMsRUFBd0MsR0FBeEMsRUFBNkM7QUFDekMsb0JBQU0sT0FBTyxLQUFLLE1BQUwsQ0FBWSxDQUFaLENBQWI7QUFDQSxxQkFBSyxVQUFMLENBQWdCLElBQWhCLElBQXdCLEtBQUssRUFBTCxDQUFRLElBQVIsQ0FBeEI7QUFDQSxxQkFBSyxXQUFMLENBQWlCLElBQWpCLElBQXlCLE1BQU0sSUFBTixJQUFjLEtBQUssVUFBTCxDQUFnQixJQUFoQixDQUF2QztBQUNIO0FBQ0o7OzsrQkFFTSxFLEVBQUk7QUFDUCxnQkFBSSxLQUFLLElBQUwsS0FBYyxLQUFLLFFBQXZCLEVBQWlDO0FBQzdCO0FBQ0g7O0FBRUQsZ0JBQUksS0FBSyxLQUFMLEdBQWEsQ0FBakIsRUFBb0I7QUFDaEIscUJBQUssS0FBTCxJQUFjLEVBQWQ7QUFDQTtBQUNIOztBQUVELGlCQUFLLElBQUwsSUFBYSxFQUFiOztBQUVBLGdCQUFJLEtBQUssSUFBTCxHQUFZLEtBQUssUUFBckIsRUFBK0I7QUFDM0IscUJBQUssSUFBTCxHQUFZLEtBQUssUUFBakI7QUFDSDs7QUFFRCxpQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssTUFBTCxDQUFZLE1BQWhDLEVBQXdDLEdBQXhDLEVBQTZDO0FBQ3pDLG9CQUFNLE9BQU8sS0FBSyxNQUFMLENBQVksQ0FBWixDQUFiO0FBQ0EscUJBQUssRUFBTCxDQUFRLElBQVIsSUFBZ0IsS0FBSyxJQUFMLENBQVUsS0FBSyxJQUFmLEVBQXFCLEtBQUssVUFBTCxDQUFnQixJQUFoQixDQUFyQixFQUE0QyxLQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBNUMsRUFBb0UsS0FBSyxRQUF6RSxDQUFoQjtBQUNIOztBQUVELGdCQUFJLEtBQUssUUFBVCxFQUFtQjtBQUNmLHFCQUFLLFFBQUwsQ0FBYyxLQUFLLEVBQW5CO0FBQ0g7O0FBRUQsZ0JBQUksS0FBSyxJQUFMLEtBQWMsS0FBSyxRQUF2QixFQUFpQztBQUM3QixxQkFBSyxRQUFMLEdBQWdCLElBQWhCOztBQUVBLG9CQUFJLEtBQUssVUFBVCxFQUFxQjtBQUNqQix5QkFBSyxVQUFMLENBQWdCLEtBQUssRUFBckI7QUFDSDtBQUNKO0FBQ0o7OztnQ0FFTztBQUNKLGlCQUFLLElBQUwsR0FBWSxDQUFaO0FBQ0EsaUJBQUssUUFBTCxHQUFnQixLQUFoQjtBQUNIOzs7Ozs7a0JBbEVnQixLOzs7Ozs7OztBQ0ZyQixJQUFJLGVBQUo7SUFDSSxlQURKOztBQUdBLElBQUksT0FBTyxTQUFTLE1BQWhCLEtBQTJCLFdBQS9CLEVBQTRDO0FBQ3hDLGFBQVMsUUFBVDtBQUNBLGFBQVMsa0JBQVQ7QUFDSCxDQUhELE1BR08sSUFBSSxPQUFPLFNBQVMsU0FBaEIsS0FBOEIsV0FBbEMsRUFBK0M7QUFDbEQsYUFBUyxXQUFUO0FBQ0EsYUFBUyxxQkFBVDtBQUNILENBSE0sTUFHQSxJQUFJLE9BQU8sU0FBUyxRQUFoQixLQUE2QixXQUFqQyxFQUE4QztBQUNqRCxhQUFTLFVBQVQ7QUFDQSxhQUFTLG9CQUFUO0FBQ0gsQ0FITSxNQUdBLElBQUksT0FBTyxTQUFTLFlBQWhCLEtBQWlDLFdBQXJDLEVBQWtEO0FBQ3JELGFBQVMsY0FBVDtBQUNBLGFBQVMsd0JBQVQ7QUFDSDs7a0JBRWM7QUFDWCxrQkFEVztBQUVYO0FBRlcsQzs7Ozs7Ozs7O0FDakJmOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sYUFBYSxPQUFPLE1BQVAsQ0FBYyxrQkFBUSxTQUF0QixFQUFpQztBQUNoRCxZQUFRO0FBQ0osYUFBSyxlQUFXO0FBQ1osbUJBQU8sU0FBUyxjQUFJLE1BQWIsQ0FBUDtBQUNIO0FBSEc7QUFEd0MsQ0FBakMsQ0FBbkI7O0FBUUEsU0FBUyxrQkFBVCxHQUE4QjtBQUMxQixRQUFJLFNBQVMsY0FBSSxNQUFiLENBQUosRUFBMEI7QUFDdEIsbUJBQVcsSUFBWCxDQUFnQixRQUFoQjtBQUNILEtBRkQsTUFFTztBQUNILG1CQUFXLElBQVgsQ0FBZ0IsT0FBaEI7QUFDSDtBQUNKOztBQUVELElBQUksY0FBSSxNQUFSLEVBQWdCO0FBQ1osYUFBUyxnQkFBVCxDQUEwQixjQUFJLE1BQTlCLEVBQXNDLGtCQUF0QyxFQUEwRCxLQUExRDtBQUNIOztrQkFFYyxVIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFycmF5KGxlbmd0aCwgdmFsdWUpIHtcbiAgICBjb25zdCBhcnIgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHZhbCA9IHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgPyB2YWx1ZSA6IGk7XG4gICAgICAgIGFyci5wdXNoKHZhbCk7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjbG9uZShhcnIpIHtcbiAgICByZXR1cm4gYXJyLnNsaWNlKDApO1xufVxuIiwiaW1wb3J0IGFycmF5IGZyb20gJy4vYXJyYXknO1xuaW1wb3J0IGNsb25lIGZyb20gJy4vY2xvbmUnO1xuaW1wb3J0IG5lYXJlc3QgZnJvbSAnLi9uZWFyZXN0JztcbmltcG9ydCByYW5kb21DaG9pY2UgZnJvbSAnLi9yYW5kb21DaG9pY2UnO1xuaW1wb3J0IHNvcnRBbHBoYSBmcm9tICcuL3NvcnRBbHBoYSc7XG5pbXBvcnQgc29ydE51bWVyaWMgZnJvbSAnLi9zb3J0TnVtZXJpYyc7XG5pbXBvcnQgc29ydFJhbmRvbSBmcm9tICcuL3NvcnRSYW5kb20nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgYXJyYXksXG4gICAgY2xvbmUsXG4gICAgbmVhcmVzdCxcbiAgICByYW5kb21DaG9pY2UsXG4gICAgc29ydEFscGhhLFxuICAgIHNvcnROdW1lcmljLFxuICAgIHNvcnRSYW5kb21cbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBuZWFyZXN0KHZhbHVlLCBhcnIpIHtcbiAgICBsZXQgbGVhc3QgPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgIHJldHVybiBhcnIucmVkdWNlKChyZXN1bHQsIGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgZGlmZiA9IE1hdGguYWJzKGl0ZW0gLSB2YWx1ZSk7XG4gICAgICAgIGlmIChkaWZmIDwgbGVhc3QpIHtcbiAgICAgICAgICAgIGxlYXN0ID0gZGlmZjtcbiAgICAgICAgICAgIHJlc3VsdCA9IGl0ZW07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCAtMSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5kb21DaG9pY2UoYXJyKSB7XG4gICAgcmV0dXJuIGFycltNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcnIubGVuZ3RoKV07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzb3J0QWxwaGEoYSwgYikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKHhbYV0pLnRvTG93ZXJDYXNlKCkgPiBTdHJpbmcoeVthXSkudG9Mb3dlckNhc2UoKSA/IDEgOiAtMTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIFN0cmluZyhhKS50b0xvd2VyQ2FzZSgpID4gU3RyaW5nKGIpLnRvTG93ZXJDYXNlKCkgPyAxIDogLTE7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzb3J0TnVtZXJpYyhhLCBiKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIoeFthXSkgLSBOdW1iZXIoeVthXSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBOdW1iZXIoYSkgLSBOdW1iZXIoYik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzb3J0UmFuZG9tKCkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpID4gMC41ID8gLTEgOiAxO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmxvY2tTY3JvbGxpbmcodmFsdWUpIHtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gdmFsdWUgPyAnaGlkZGVuJyA6ICcnO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9yY2VSZWRyYXcoZWwpIHtcbiAgICBjb25zdCBkaXNwbGF5ID0gZWwuc3R5bGUuZGlzcGxheTtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGVsLm9mZnNldEhlaWdodDtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFBhZ2VIZWlnaHQoKSB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgY29uc3QgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgcmV0dXJuIE1hdGgubWF4KFxuICAgICAgICBib2R5LnNjcm9sbEhlaWdodCB8fCAwLFxuICAgICAgICBib2R5Lm9mZnNldEhlaWdodCB8fCAwLFxuICAgICAgICBib2R5LmNsaWVudEhlaWdodCB8fCAwLFxuICAgICAgICBkb2MuY2xpZW50SGVpZ2h0IHx8IDAsXG4gICAgICAgIGRvYy5vZmZzZXRIZWlnaHQgfHwgMCxcbiAgICAgICAgZG9jLnNjcm9sbEhlaWdodCB8fCAwXG4gICAgKTtcbn1cbiIsImltcG9ydCBnZXRTY3JvbGxUb3AgZnJvbSAnLi9nZXRTY3JvbGxUb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTY3JvbGxQZXJjZW50YWdlKCkge1xuICAgIHJldHVybiAoZ2V0U2Nyb2xsVG9wKCkgKyB3aW5kb3cuaW5uZXJIZWlnaHQpIC8gZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQ7XG59XG4iLCJpbXBvcnQgZ2V0U2Nyb2xsVG9wIGZyb20gJy4vZ2V0U2Nyb2xsVG9wJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2Nyb2xsUmVtYWluaW5nKCkge1xuICAgIGNvbnN0IGIgPSBkb2N1bWVudC5ib2R5O1xuICAgIHJldHVybiBNYXRoLmFicyhnZXRTY3JvbGxUb3AoKSAtIChiLnNjcm9sbEhlaWdodCAtIGIuY2xpZW50SGVpZ2h0KSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRTY3JvbGxUb3AoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U3Jjc2V0SW1hZ2Uoc3Jjc2V0LCBwaXhlbFdpZHRoKSB7XG4gICAgcGl4ZWxXaWR0aCA9IHBpeGVsV2lkdGggfHwgd2luZG93LmlubmVyV2lkdGggKiAod2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMCk7XG5cbiAgICBjb25zdCBzZXQgPSBzcmNzZXQuc3BsaXQoJywnKVxuICAgICAgICAubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBbdXJsLCB3aWR0aF0gPSBpdGVtLnRyaW0oKS5zcGxpdCgvXFxzKy8pO1xuICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IHBhcnNlSW50KHdpZHRoLnNsaWNlKDAsIC0xKSwgMTApO1xuICAgICAgICAgICAgcmV0dXJuIHt1cmwsIHNpemV9O1xuICAgICAgICB9KVxuICAgICAgICAuc29ydCgoYSwgYikgPT4gYi5zaXplIC0gYS5zaXplKTtcblxuICAgIGlmICghc2V0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNldC5yZWR1Y2UoKHZhbHVlLCBpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLnNpemUgPj0gcGl4ZWxXaWR0aCA/IGl0ZW0udXJsIDogdmFsdWU7XG4gICAgfSwgc2V0WzBdLnVybCk7XG59XG4iLCJpbXBvcnQgYmxvY2tTY3JvbGxpbmcgZnJvbSAnLi9ibG9ja1Njcm9sbGluZyc7XG5pbXBvcnQgZm9yY2VSZWRyYXcgZnJvbSAnLi9mb3JjZVJlZHJhdyc7XG5pbXBvcnQgZ2V0UGFnZUhlaWdodCBmcm9tICcuL2dldFBhZ2VIZWlnaHQnO1xuaW1wb3J0IGdldFNjcm9sbFBlcmNlbnRhZ2UgZnJvbSAnLi9nZXRTY3JvbGxQZXJjZW50YWdlJztcbmltcG9ydCBnZXRTY3JvbGxSZW1haW5pbmcgZnJvbSAnLi9nZXRTY3JvbGxSZW1haW5pbmcnO1xuaW1wb3J0IGdldFNjcm9sbFRvcCBmcm9tICcuL2dldFNjcm9sbFRvcCc7XG5pbXBvcnQgZ2V0U3Jjc2V0SW1hZ2UgZnJvbSAnLi9nZXRTcmNzZXRJbWFnZSc7XG5pbXBvcnQgaXNFbGVtZW50SW5WaWV3cG9ydCBmcm9tICcuL2lzRWxlbWVudEluVmlld3BvcnQnO1xuaW1wb3J0IGlzUGFnZUVuZCBmcm9tICcuL2lzUGFnZUVuZCc7XG5pbXBvcnQgcmVzaXplIGZyb20gJy4vcmVzaXplJztcbmltcG9ydCBzY3JvbGwgZnJvbSAnLi9zY3JvbGwnO1xuaW1wb3J0IHNldFN0eWxlIGZyb20gJy4vc2V0U3R5bGUnO1xuaW1wb3J0IHRyYW5zaXRpb25FbmQgZnJvbSAnLi90cmFuc2l0aW9uRW5kJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGJsb2NrU2Nyb2xsaW5nLFxuICAgIGZvcmNlUmVkcmF3LFxuICAgIGdldFBhZ2VIZWlnaHQsXG4gICAgZ2V0U2Nyb2xsUGVyY2VudGFnZSxcbiAgICBnZXRTY3JvbGxSZW1haW5pbmcsXG4gICAgZ2V0U2Nyb2xsVG9wLFxuICAgIGdldFNyY3NldEltYWdlLFxuICAgIGlzRWxlbWVudEluVmlld3BvcnQsXG4gICAgaXNQYWdlRW5kLFxuICAgIHJlc2l6ZSxcbiAgICBzY3JvbGwsXG4gICAgc2V0U3R5bGUsXG4gICAgdHJhbnNpdGlvbkVuZFxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzRWxlbWVudEluVmlld3BvcnQoZWwpIHtcbiAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIChcbiAgICAgICAgcmVjdC50b3AgPj0gMCAmJlxuICAgICAgICByZWN0LmxlZnQgPj0gMCAmJlxuICAgICAgICByZWN0LmJvdHRvbSA8PSB3aW5kb3cuaW5uZXJIZWlnaHQgJiZcbiAgICAgICAgcmVjdC5yaWdodCA8PSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICk7XG59XG4iLCJpbXBvcnQgZ2V0U2Nyb2xsVG9wIGZyb20gJy4vZ2V0U2Nyb2xsVG9wJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNQYWdlRW5kKGJ1ZmZlciA9IDApIHtcbiAgICBjb25zdCBiID0gZG9jdW1lbnQuYm9keTtcbiAgICByZXR1cm4gTWF0aC5hYnMoZ2V0U2Nyb2xsVG9wKCkgLSAoYi5zY3JvbGxIZWlnaHQgLSBiLmNsaWVudEhlaWdodCkpIDw9IGJ1ZmZlcjtcbn1cbiIsImltcG9ydCBldmVudEJ1cyBmcm9tICcuLi9ldmVudHMvZXZlbnRCdXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXNpemUoZGVib3VjZURlbGF5ID0gNTAwKSB7XG5cbiAgICBsZXQgdGltZW91dElkO1xuXG4gICAgLy8gb3JpZW50YXRpb25jaGFuZ2UgdG9vP1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgIHRpbWVvdXRJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IGV2ZW50QnVzLmVtaXQoJ3Jlc2l6ZScpLCBkZWJvdWNlRGVsYXkpO1xuICAgIH0pO1xufVxuIiwiaW1wb3J0IGV2ZW50QnVzIGZyb20gJy4uL2V2ZW50cy9ldmVudEJ1cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNjcm9sbCgpIHtcblxuICAgIGxldCBsYXN0U2Nyb2xsWSA9IDAsXG4gICAgICAgIHRpY2tpbmcgPSBmYWxzZSxcbiAgICAgICAgdGltZW91dElkO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgICAgdGltZW91dElkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gZXZlbnRCdXMuZW1pdCgnc2Nyb2xsZW5kJywgbGFzdFNjcm9sbFkpLCAyMDApO1xuXG4gICAgICAgIGV2ZW50QnVzLmVtaXQoJ3Njcm9sbCcsIGxhc3RTY3JvbGxZKTtcbiAgICAgICAgdGlja2luZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcXVlc3RUaWNrKCkge1xuICAgICAgICBpZiAoIXRpY2tpbmcpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcbiAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25TY3JvbGwoKSB7XG4gICAgICAgIC8vIGxhc3RTY3JvbGxZID0gd2luZG93LnNjcm9sbFk7XG4gICAgICAgIGxhc3RTY3JvbGxZID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgIHJlcXVlc3RUaWNrKCk7XG4gICAgfVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uU2Nyb2xsLCBmYWxzZSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXRTdHlsZShlbCwgc3R5bGUpIHtcbiAgICBPYmplY3Qua2V5cyhzdHlsZSkuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgICBlbC5zdHlsZVtwcm9wXSA9IHN0eWxlW3Byb3BdO1xuICAgIH0pO1xuICAgIHJldHVybiBlbDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zaXRpb25FbmQoZWwsIGNiLCB0aW1lb3V0ID0gMTAwMCkge1xuXG4gICAgbGV0IHRpbWVvdXRJZDtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGhhbmRsZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgaGFuZGxlcik7XG4gICAgICAgIGNiKCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBlbC5zdHlsZS50cmFuc2l0aW9uICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgaGFuZGxlcik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZWwuc3R5bGUuV2Via2l0VHJhbnNpdGlvbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGhhbmRsZXIpO1xuICAgIH1cblxuICAgIHRpbWVvdXRJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KGhhbmRsZXIsIHRpbWVvdXQpO1xufVxuIiwiZnVuY3Rpb24gZWFzZUluQmFjayh0LCBiLCBjLCBkLCBzID0gMS43MDE1OCkge1xuICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogKChzICsgMSkgKiB0IC0gcykgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlT3V0QmFjayh0LCBiLCBjLCBkLCBzID0gMS43MDE1OCkge1xuICAgIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiAoKHMgKyAxKSAqIHQgKyBzKSArIDEpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZUluT3V0QmFjayh0LCBiLCBjLCBkLCBzID0gMS43MDE1OCkge1xuICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgIHJldHVybiBjIC8gMiAqICh0ICogdCAqICgoKHMgKj0gKDEuNTI1KSkgKyAxKSAqIHQgLSBzKSkgKyBiO1xuICAgIH1cbiAgICByZXR1cm4gYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogKCgocyAqPSAoMS41MjUpKSArIDEpICogdCArIHMpICsgMikgKyBiO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZWFzZUluOiBlYXNlSW5CYWNrLFxuICAgIGVhc2VPdXQ6IGVhc2VPdXRCYWNrLFxuICAgIGVhc2VJbk91dDogZWFzZUluT3V0QmFja1xufTtcblxuZXhwb3J0IHtcbiAgICBlYXNlSW5CYWNrLFxuICAgIGVhc2VPdXRCYWNrLFxuICAgIGVhc2VJbk91dEJhY2tcbn07XG4iLCJmdW5jdGlvbiBlYXNlT3V0Qm91bmNlKHQsIGIsIGMsIGQpIHtcbiAgICBpZiAoKHQgLz0gZCkgPCAoMSAvIDIuNzUpKSB7XG4gICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqIHQgKiB0KSArIGI7XG4gICAgfSBlbHNlIGlmICh0IDwgKDIgLyAyLjc1KSkge1xuICAgICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAoMS41IC8gMi43NSkpICogdCArIDAuNzUpICsgYjtcbiAgICB9IGVsc2UgaWYgKHQgPCAoMi41IC8gMi43NSkpIHtcbiAgICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gKDIuMjUgLyAyLjc1KSkgKiB0ICsgMC45Mzc1KSArIGI7XG4gICAgfVxuICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09ICgyLjYyNSAvIDIuNzUpKSAqIHQgKyAwLjk4NDM3NSkgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlSW5Cb3VuY2UodCwgYiwgYywgZCkge1xuICAgIHJldHVybiBjIC0gZWFzZU91dEJvdW5jZShkIC0gdCwgMCwgYywgZCkgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlSW5PdXRCb3VuY2UodCwgYiwgYywgZCkge1xuICAgIGlmICh0IDwgZCAvIDIpIHtcbiAgICAgICAgcmV0dXJuIGVhc2VJbkJvdW5jZSh0ICogMiwgMCwgYywgZCkgKiAwLjUgKyBiO1xuICAgIH1cbiAgICByZXR1cm4gZWFzZU91dEJvdW5jZSh0ICogMiAtIGQsIDAsIGMsIGQpICogMC41ICsgYyAqIDAuNSArIGI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlYXNlSW46IGVhc2VJbkJvdW5jZSxcbiAgICBlYXNlT3V0OiBlYXNlT3V0Qm91bmNlLFxuICAgIGVhc2VJbk91dDogZWFzZUluT3V0Qm91bmNlXG59O1xuXG5leHBvcnQge1xuICAgIGVhc2VJbkJvdW5jZSxcbiAgICBlYXNlT3V0Qm91bmNlLFxuICAgIGVhc2VJbk91dEJvdW5jZVxufTtcbiIsImNvbnN0IHtzcXJ0fSA9IE1hdGg7XG5cbmZ1bmN0aW9uIGVhc2VJbkNpcmN1bGFyKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gLWMgKiAoc3FydCgxIC0gKHQgLz0gZCkgKiB0KSAtIDEpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZU91dENpcmN1bGFyKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gYyAqIHNxcnQoMSAtICh0ID0gdCAvIGQgLSAxKSAqIHQpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZUluT3V0Q2lyY3VsYXIodCwgYiwgYywgZCkge1xuICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgIHJldHVybiAtYyAvIDIgKiAoc3FydCgxIC0gdCAqIHQpIC0gMSkgKyBiO1xuICAgIH1cbiAgICByZXR1cm4gYyAvIDIgKiAoc3FydCgxIC0gKHQgLT0gMikgKiB0KSArIDEpICsgYjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGVhc2VJbjogZWFzZUluQ2lyY3VsYXIsXG4gICAgZWFzZU91dDogZWFzZU91dENpcmN1bGFyLFxuICAgIGVhc2VJbk91dDogZWFzZUluT3V0Q2lyY3VsYXJcbn07XG5cbmV4cG9ydCB7XG4gICAgZWFzZUluQ2lyY3VsYXIsXG4gICAgZWFzZU91dENpcmN1bGFyLFxuICAgIGVhc2VJbk91dENpcmN1bGFyXG59O1xuIiwiZnVuY3Rpb24gZWFzZUluQ3ViaWModCwgYiwgYywgZCkge1xuICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogdCArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VPdXRDdWJpYyh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKyAxKSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VJbk91dEN1YmljKHQsIGIsIGMsIGQpIHtcbiAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICByZXR1cm4gYyAvIDIgKiB0ICogdCAqIHQgKyBiO1xuICAgIH1cbiAgICByZXR1cm4gYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogdCArIDIpICsgYjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGVhc2VJbjogZWFzZUluQ3ViaWMsXG4gICAgZWFzZU91dDogZWFzZU91dEN1YmljLFxuICAgIGVhc2VJbk91dDogZWFzZUluT3V0Q3ViaWNcbn07XG5cbmV4cG9ydCB7XG4gICAgZWFzZUluQ3ViaWMsXG4gICAgZWFzZU91dEN1YmljLFxuICAgIGVhc2VJbk91dEN1YmljXG59O1xuIiwiY29uc3Qge2FicywgYXNpbiwgUEksIHBvdywgc2lufSA9IE1hdGg7XG5jb25zdCBQSV8yID0gUEkgKiAyO1xuXG5mdW5jdGlvbiBlYXNlSW5FbGFzdGljKHQsIGIsIGMsIGQsIGEsIHApIHtcbiAgICBsZXQgcztcbiAgICBpZiAodCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gYjtcbiAgICB9XG4gICAgaWYgKCh0IC89IGQpID09PSAxKSB7XG4gICAgICAgIHJldHVybiBiICsgYztcbiAgICB9XG4gICAgaWYgKCFwKSB7XG4gICAgICAgIHAgPSBkICogMC4zO1xuICAgIH1cbiAgICBpZiAoIWEgfHwgYSA8IGFicyhjKSkge1xuICAgICAgICBhID0gYztcbiAgICAgICAgcyA9IHAgLyA0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHMgPSBwIC8gUElfMiAqIGFzaW4oYyAvIGEpO1xuICAgIH1cbiAgICByZXR1cm4gLShhICogcG93KDIsIDEwICogKHQgLT0gMSkpICogc2luKCh0ICogZCAtIHMpICogUElfMiAvIHApKSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VPdXRFbGFzdGljKHQsIGIsIGMsIGQsIGEsIHApIHtcbiAgICBsZXQgcztcbiAgICBpZiAodCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gYjtcbiAgICB9XG4gICAgaWYgKCh0IC89IGQpID09PSAxKSB7XG4gICAgICAgIHJldHVybiBiICsgYztcbiAgICB9XG4gICAgaWYgKCFwKSB7XG4gICAgICAgIHAgPSBkICogMC4zO1xuICAgIH1cbiAgICBpZiAoIWEgfHwgYSA8IGFicyhjKSkge1xuICAgICAgICBhID0gYztcbiAgICAgICAgcyA9IHAgLyA0O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHMgPSBwIC8gUElfMiAqIGFzaW4oYyAvIGEpO1xuICAgIH1cbiAgICByZXR1cm4gKGEgKiBwb3coMiwgLTEwICogdCkgKiBzaW4oKHQgKiBkIC0gcykgKiBQSV8yIC8gcCkgKyBjICsgYik7XG59XG5cbmZ1bmN0aW9uIGVhc2VJbk91dEVsYXN0aWModCwgYiwgYywgZCwgYSwgcCkge1xuICAgIGxldCBzO1xuICAgIGlmICh0ID09PSAwKSB7XG4gICAgICAgIHJldHVybiBiO1xuICAgIH1cbiAgICBpZiAoKHQgLz0gZCAvIDIpID09PSAyKSB7XG4gICAgICAgIHJldHVybiBiICsgYztcbiAgICB9XG4gICAgaWYgKCFwKSB7XG4gICAgICAgIHAgPSBkICogKDAuMyAqIDEuNSk7XG4gICAgfVxuICAgIGlmICghYSB8fCBhIDwgYWJzKGMpKSB7XG4gICAgICAgIGEgPSBjO1xuICAgICAgICBzID0gcCAvIDQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcyA9IHAgLyBQSV8yICogYXNpbihjIC8gYSk7XG4gICAgfVxuICAgIGlmICh0IDwgMSkge1xuICAgICAgICByZXR1cm4gLTAuNSAqIChhICogcG93KDIsIDEwICogKHQgLT0gMSkpICogc2luKCh0ICogZCAtIHMpICogUElfMiAvIHApKSArIGI7XG4gICAgfVxuICAgIHJldHVybiBhICogcG93KDIsIC0xMCAqICh0IC09IDEpKSAqIHNpbigodCAqIGQgLSBzKSAqIFBJXzIgLyBwKSAqIDAuNSArIGMgKyBiO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgZWFzZUluOiBlYXNlSW5FbGFzdGljLFxuICAgIGVhc2VPdXQ6IGVhc2VPdXRFbGFzdGljLFxuICAgIGVhc2VJbk91dDogZWFzZUluT3V0RWxhc3RpY1xufTtcblxuZXhwb3J0IHtcbiAgICBlYXNlSW5FbGFzdGljLFxuICAgIGVhc2VPdXRFbGFzdGljLFxuICAgIGVhc2VJbk91dEVsYXN0aWNcbn07XG4iLCJjb25zdCB7cG93fSA9IE1hdGg7XG5cbmZ1bmN0aW9uIGVhc2VJbkV4cG8odCwgYiwgYywgZCkge1xuICAgIHJldHVybiB0ID09PSAwID8gYiA6IGMgKiBwb3coMiwgMTAgKiAodCAvIGQgLSAxKSkgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlT3V0RXhwbyh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIHQgPT09IGQgPyBiICsgYyA6IGMgKiAoLXBvdygyLCAtMTAgKiB0IC8gZCkgKyAxKSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VJbk91dEV4cG8odCwgYiwgYywgZCkge1xuICAgIGlmICh0ID09PSAwKSB7XG4gICAgICAgIHJldHVybiBiO1xuICAgIH1cbiAgICBpZiAodCA9PT0gZCkge1xuICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgfVxuICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgIHJldHVybiBjIC8gMiAqIHBvdygyLCAxMCAqICh0IC0gMSkpICsgYjtcbiAgICB9XG4gICAgcmV0dXJuIGMgLyAyICogKC1wb3coMiwgLTEwICogLS10KSArIDIpICsgYjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGVhc2VJbjogZWFzZUluRXhwbyxcbiAgICBlYXNlT3V0OiBlYXNlT3V0RXhwbyxcbiAgICBlYXNlSW5PdXQ6IGVhc2VJbk91dEV4cG9cbn07XG5cbmV4cG9ydCB7XG4gICAgZWFzZUluRXhwbyxcbiAgICBlYXNlT3V0RXhwbyxcbiAgICBlYXNlSW5PdXRFeHBvXG59O1xuIiwiaW1wb3J0IGJhY2ssIHtlYXNlSW5CYWNrLCBlYXNlT3V0QmFjaywgZWFzZUluT3V0QmFja30gZnJvbSAnLi9iYWNrJztcbmltcG9ydCBib3VuY2UsIHtlYXNlSW5Cb3VuY2UsIGVhc2VPdXRCb3VuY2UsIGVhc2VJbk91dEJvdW5jZX0gZnJvbSAnLi9ib3VuY2UnO1xuaW1wb3J0IGNpcmN1bGFyLCB7ZWFzZUluQ2lyY3VsYXIsIGVhc2VPdXRDaXJjdWxhciwgZWFzZUluT3V0Q2lyY3VsYXJ9IGZyb20gJy4vY2lyY3VsYXInO1xuaW1wb3J0IGN1YmljLCB7ZWFzZUluQ3ViaWMsIGVhc2VPdXRDdWJpYywgZWFzZUluT3V0Q3ViaWN9IGZyb20gJy4vY3ViaWMnO1xuaW1wb3J0IGVsYXN0aWMsIHtlYXNlSW5FbGFzdGljLCBlYXNlT3V0RWxhc3RpYywgZWFzZUluT3V0RWxhc3RpY30gZnJvbSAnLi9lbGFzdGljJztcbmltcG9ydCBleHBvLCB7ZWFzZUluRXhwbywgZWFzZU91dEV4cG8sIGVhc2VJbk91dEV4cG99IGZyb20gJy4vZXhwbyc7XG5pbXBvcnQgbGluZWFyLCB7ZWFzZUxpbmVhcn0gZnJvbSAnLi9saW5lYXInO1xuaW1wb3J0IHF1YWQsIHtlYXNlSW5RdWFkLCBlYXNlT3V0UXVhZCwgZWFzZUluT3V0UXVhZH0gZnJvbSAnLi9xdWFkJztcbmltcG9ydCBxdWFydCwge2Vhc2VJblF1YXJ0LCBlYXNlT3V0UXVhcnQsIGVhc2VJbk91dFF1YXJ0fSBmcm9tICcuL3F1YXJ0JztcbmltcG9ydCBxdWludCwge2Vhc2VJblF1aW50LCBlYXNlT3V0UXVpbnQsIGVhc2VJbk91dFF1aW50fSBmcm9tICcuL3F1aW50JztcbmltcG9ydCBzaW5lLCB7ZWFzZUluU2luZSwgZWFzZU91dFNpbmUsIGVhc2VJbk91dFNpbmV9IGZyb20gJy4vc2luZSc7XG5cbmV4cG9ydCB7XG4gICAgYmFjayxcbiAgICBib3VuY2UsXG4gICAgY2lyY3VsYXIsXG4gICAgY3ViaWMsXG4gICAgZWxhc3RpYyxcbiAgICBleHBvLFxuICAgIGxpbmVhcixcbiAgICBxdWFkLFxuICAgIHF1YXJ0LFxuICAgIHF1aW50LFxuICAgIHNpbmUsXG4gICAgZWFzZUxpbmVhcixcbiAgICBlYXNlSW5CYWNrLFxuICAgIGVhc2VPdXRCYWNrLFxuICAgIGVhc2VJbk91dEJhY2ssXG4gICAgZWFzZUluQm91bmNlLFxuICAgIGVhc2VPdXRCb3VuY2UsXG4gICAgZWFzZUluT3V0Qm91bmNlLFxuICAgIGVhc2VJbkNpcmN1bGFyLFxuICAgIGVhc2VPdXRDaXJjdWxhcixcbiAgICBlYXNlSW5PdXRDaXJjdWxhcixcbiAgICBlYXNlSW5DdWJpYyxcbiAgICBlYXNlT3V0Q3ViaWMsXG4gICAgZWFzZUluT3V0Q3ViaWMsXG4gICAgZWFzZUluRWxhc3RpYyxcbiAgICBlYXNlT3V0RWxhc3RpYyxcbiAgICBlYXNlSW5PdXRFbGFzdGljLFxuICAgIGVhc2VJbkV4cG8sXG4gICAgZWFzZU91dEV4cG8sXG4gICAgZWFzZUluT3V0RXhwbyxcbiAgICBlYXNlSW5RdWFkLFxuICAgIGVhc2VPdXRRdWFkLFxuICAgIGVhc2VJbk91dFF1YWQsXG4gICAgZWFzZUluUXVhcnQsXG4gICAgZWFzZU91dFF1YXJ0LFxuICAgIGVhc2VJbk91dFF1YXJ0LFxuICAgIGVhc2VJblF1aW50LFxuICAgIGVhc2VPdXRRdWludCxcbiAgICBlYXNlSW5PdXRRdWludCxcbiAgICBlYXNlSW5TaW5lLFxuICAgIGVhc2VPdXRTaW5lLFxuICAgIGVhc2VJbk91dFNpbmVcbn07XG5cbi8qXG5URVJNUyBPRiBVU0UgLSBFQVNJTkcgRVFVQVRJT05TXG5cbk9wZW4gc291cmNlIHVuZGVyIHRoZSBCU0QgTGljZW5zZS5cblxuQ29weXJpZ2h0IMKpIDIwMDEgUm9iZXJ0IFBlbm5lclxuQWxsIHJpZ2h0cyByZXNlcnZlZC5cblxuUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG5tb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG5saXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cblJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpc1xubGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb24gYW5kL29yXG5vdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuTmVpdGhlciB0aGUgbmFtZSBvZiB0aGUgYXV0aG9yIG5vciB0aGUgbmFtZXMgb2YgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvXG5lbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHMgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmUgd2l0aG91dCBzcGVjaWZpY1xucHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxuVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCJcbkFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEVcbklNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRVxuRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBPV05FUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUlxuQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4oSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG5MT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT05cbkFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4oSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4qL1xuIiwiZnVuY3Rpb24gZWFzZUxpbmVhcih0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIGMgKiB0IC8gZCArIGI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlYXNlSW46IGVhc2VMaW5lYXIsXG4gICAgZWFzZU91dDogZWFzZUxpbmVhcixcbiAgICBlYXNlSW5PdXQ6IGVhc2VMaW5lYXJcbn07XG5cbmV4cG9ydCB7XG4gICAgZWFzZUxpbmVhclxufTtcbiIsImZ1bmN0aW9uIGVhc2VJblF1YWQodCwgYiwgYywgZCkge1xuICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZU91dFF1YWQodCwgYiwgYywgZCkge1xuICAgIHJldHVybiAtYyAqICh0IC89IGQpICogKHQgLSAyKSArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VJbk91dFF1YWQodCwgYiwgYywgZCkge1xuICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgIHJldHVybiBjIC8gMiAqIHQgKiB0ICsgYjtcbiAgICB9XG4gICAgcmV0dXJuIC1jIC8gMiAqICgoLS10KSAqICh0IC0gMikgLSAxKSArIGI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlYXNlSW46IGVhc2VJblF1YWQsXG4gICAgZWFzZU91dDogZWFzZU91dFF1YWQsXG4gICAgZWFzZUluT3V0OiBlYXNlSW5PdXRRdWFkXG59O1xuXG5leHBvcnQge1xuICAgIGVhc2VJblF1YWQsXG4gICAgZWFzZU91dFF1YWQsXG4gICAgZWFzZUluT3V0UXVhZFxufTtcbiIsImZ1bmN0aW9uIGVhc2VJblF1YXJ0KHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKiB0ICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZU91dFF1YXJ0KHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gLWMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0IC0gMSkgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlSW5PdXRRdWFydCh0LCBiLCBjLCBkKSB7XG4gICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICogdCArIGI7XG4gICAgfVxuICAgIHJldHVybiAtYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogdCAqIHQgLSAyKSArIGI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlYXNlSW46IGVhc2VJblF1YXJ0LFxuICAgIGVhc2VPdXQ6IGVhc2VPdXRRdWFydCxcbiAgICBlYXNlSW5PdXQ6IGVhc2VJbk91dFF1YXJ0XG59O1xuXG5leHBvcnQge1xuICAgIGVhc2VJblF1YXJ0LFxuICAgIGVhc2VPdXRRdWFydCxcbiAgICBlYXNlSW5PdXRRdWFydFxufTtcbiIsImZ1bmN0aW9uIGVhc2VJblF1aW50KHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKiB0ICogdCArIGI7XG59XG5cbmZ1bmN0aW9uIGVhc2VPdXRRdWludCh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0ICogdCArIDEpICsgYjtcbn1cblxuZnVuY3Rpb24gZWFzZUluT3V0UXVpbnQodCwgYiwgYywgZCkge1xuICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgIHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCAqIHQgKiB0ICsgYjtcbiAgICB9XG4gICAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKiB0ICogdCArIDIpICsgYjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGVhc2VJbjogZWFzZUluUXVpbnQsXG4gICAgZWFzZU91dDogZWFzZU91dFF1aW50LFxuICAgIGVhc2VJbk91dDogZWFzZUluT3V0UXVpbnRcbn07XG5cbmV4cG9ydCB7XG4gICAgZWFzZUluUXVpbnQsXG4gICAgZWFzZU91dFF1aW50LFxuICAgIGVhc2VJbk91dFF1aW50XG59O1xuIiwiY29uc3Qge2NvcywgUEksIHNpbn0gPSBNYXRoO1xuY29uc3QgUElfRDIgPSBQSSAvIDI7XG5cbmZ1bmN0aW9uIGVhc2VJblNpbmUodCwgYiwgYywgZCkge1xuICAgIHJldHVybiAtYyAqIGNvcyh0IC8gZCAqIFBJX0QyKSArIGMgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlT3V0U2luZSh0LCBiLCBjLCBkKSB7XG4gICAgcmV0dXJuIGMgKiBzaW4odCAvIGQgKiBQSV9EMikgKyBiO1xufVxuXG5mdW5jdGlvbiBlYXNlSW5PdXRTaW5lKHQsIGIsIGMsIGQpIHtcbiAgICByZXR1cm4gLWMgLyAyICogKGNvcyhQSSAqIHQgLyBkKSAtIDEpICsgYjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGVhc2VJbjogZWFzZUluU2luZSxcbiAgICBlYXNlT3V0OiBlYXNlT3V0U2luZSxcbiAgICBlYXNlSW5PdXQ6IGVhc2VJbk91dFNpbmVcbn07XG5cbmV4cG9ydCB7XG4gICAgZWFzZUluU2luZSxcbiAgICBlYXNlT3V0U2luZSxcbiAgICBlYXNlSW5PdXRTaW5lXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVib3VuY2UoaGFuZGxlcikge1xuICAgIGxldCB0aWNraW5nID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGUoZXZlbnQpIHtcbiAgICAgICAgaGFuZGxlcihldmVudCk7XG4gICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXF1ZXN0VGljayhldmVudCkge1xuICAgICAgICBpZiAoIXRpY2tpbmcpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdXBkYXRlKGV2ZW50KSk7XG4gICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXF1ZXN0VGljaztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlbGVnYXRlRXZlbnRzKHBhcmVudEVsLCBldmVudFR5cGUsIHRhZ05hbWUsIGNiKSB7XG4gICAgdGFnTmFtZSA9IHRhZ05hbWUudG9VcHBlckNhc2UoKTtcblxuICAgIHBhcmVudEVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCAoZXZlbnQpID0+IHtcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcblxuICAgICAgICB3aGlsZSAodGFyZ2V0ICE9PSBwYXJlbnRFbCkge1xuICAgICAgICAgICAgaWYgKHRhcmdldC50YWdOYW1lID09PSB0YWdOYW1lKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgY2IodGFyZ2V0LCBldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGVtaXR0ZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc2V0TWF4TGlzdGVuZXJzKDIwKTtcbiAgICB9XG5cbiAgICBvZmYgKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnModHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi9lbWl0dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmNyZWF0ZShlbWl0dGVyLnByb3RvdHlwZSk7XG4iLCJpbXBvcnQgZW1pdHRlciBmcm9tICcuL2VtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoZWFydGJlYXQoaW50ZXJ2YWwpIHtcbiAgICBsZXQgYmVhdCA9IG51bGwsXG4gICAgICAgIHRpbWUgPSAwLFxuICAgICAgICBudW1UaW1lcyA9IDAsXG4gICAgICAgIG1heFRpbWVzID0gMCxcbiAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gc3RhcnQobWF4TnVtVGltZXMgPSAwLCB0aW1lT2Zmc2V0ID0gMCkge1xuICAgICAgICBtYXhUaW1lcyA9IG1heE51bVRpbWVzO1xuICAgICAgICB0aW1lID0gdGltZU9mZnNldDtcbiAgICAgICAgbnVtVGltZXMgPSAwO1xuICAgICAgICBydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGJlYXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gYmVhdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGUoZHQgPSAxKSB7XG4gICAgICAgIGlmICghcnVubmluZykge1xuICAgICAgICAgICAgcmV0dXJuIGJlYXQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF4VGltZXMgPiAwICYmIG51bVRpbWVzID49IG1heFRpbWVzKSB7XG4gICAgICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBiZWF0LmVtaXQoJ2NvbXBsZXRlJyk7XG4gICAgICAgICAgICByZXR1cm4gYmVhdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRpbWUgKz0gZHQ7XG5cbiAgICAgICAgaWYgKHRpbWUgPj0gaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIHRpbWUgPSAwO1xuICAgICAgICAgICAgbnVtVGltZXMrKztcbiAgICAgICAgICAgIGJlYXQuZW1pdCgndXBkYXRlJywgbnVtVGltZXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiZWF0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEludGVydmFsKHZhbHVlKSB7XG4gICAgICAgIGludGVydmFsID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBiZWF0O1xuICAgIH1cblxuICAgIGJlYXQgPSBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUpLCB7XG4gICAgICAgIHN0YXJ0LFxuICAgICAgICBzdG9wLFxuICAgICAgICB1cGRhdGUsXG4gICAgICAgIGdldCBpbnRlcnZhbCgpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnRlcnZhbDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0IGludGVydmFsKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnRlcnZhbCA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBzZXRJbnRlcnZhbFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGJlYXQ7XG59XG4iLCJpbXBvcnQgZGVib3VuY2UgZnJvbSAnLi9kZWJvdW5jZSc7XG5pbXBvcnQgZGVsZWdhdGVFdmVudHMgZnJvbSAnLi9kZWxlZ2F0ZUV2ZW50cyc7XG5pbXBvcnQgZW1pdHRlciBmcm9tICcuL2VtaXR0ZXInO1xuaW1wb3J0IGV2ZW50QnVzIGZyb20gJy4vZXZlbnRCdXMnO1xuaW1wb3J0IGhlYXJ0YmVhdCBmcm9tICcuL2hlYXJ0YmVhdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkZWJvdW5jZSxcbiAgICBkZWxlZ2F0ZUV2ZW50cyxcbiAgICBlbWl0dGVyLFxuICAgIGV2ZW50QnVzLFxuICAgIGhlYXJ0YmVhdFxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZwcyhlbCkge1xuXG4gICAgbGV0IHRpbWUgPSAwLFxuICAgICAgICBmcHMgPSAwLFxuICAgICAgICBjdXJyZW50RnBzID0gMCxcbiAgICAgICAgYXZlcmFnZUZwcyA9IDAsXG4gICAgICAgIHRpY2tzID0gMCxcbiAgICAgICAgdG90YWxGcHMgPSAwLFxuICAgICAgICBsYXN0RnBzID0gMCxcbiAgICAgICAgbGFzdEF2ZXJhZ2UgPSAwO1xuXG4gICAgaWYgKCFlbCkge1xuICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2ZwcycpO1xuICAgICAgICBlbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIGVsLnN0eWxlLnRvcCA9ICcwcHgnO1xuICAgICAgICBlbC5zdHlsZS5yaWdodCA9ICcwcHgnO1xuICAgICAgICBlbC5zdHlsZS5wYWRkaW5nID0gJzJweCA2cHgnO1xuICAgICAgICBlbC5zdHlsZS56SW5kZXggPSAnOTk5OTknO1xuICAgICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kID0gJyMwMDAnO1xuICAgICAgICBlbC5zdHlsZS5jb2xvciA9ICcjZmZmJztcbiAgICAgICAgZWwuc3R5bGUuZm9udFNpemUgPSAnMTBweCc7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcG9ydCgpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRGcHMgPT09IGxhc3RGcHMgJiYgYXZlcmFnZUZwcyA9PT0gbGFzdEF2ZXJhZ2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsYXN0RnBzID0gY3VycmVudEZwcztcbiAgICAgICAgbGFzdEF2ZXJhZ2UgPSBhdmVyYWdlRnBzO1xuICAgICAgICBlbC5pbm5lckhUTUwgPSAnRlBTOiAnICsgY3VycmVudEZwcyArICc8YnIgLz5BVkU6ICcgKyBhdmVyYWdlRnBzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZShub3cpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBub3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRpbWUgPT09IDApIHtcbiAgICAgICAgICAgIHRpbWUgPSBub3c7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm93IC0gMTAwMCA+IHRpbWUpIHtcbiAgICAgICAgICAgIHRpbWUgPSBub3c7XG4gICAgICAgICAgICBjdXJyZW50RnBzID0gZnBzO1xuICAgICAgICAgICAgZnBzID0gMDtcblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRGcHMgPiAxKSB7XG4gICAgICAgICAgICAgICAgdGlja3MrKztcbiAgICAgICAgICAgICAgICB0b3RhbEZwcyArPSBjdXJyZW50RnBzO1xuICAgICAgICAgICAgICAgIGF2ZXJhZ2VGcHMgPSBNYXRoLmZsb29yKHRvdGFsRnBzIC8gdGlja3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVwb3J0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBmcHMrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhdXRvKCkge1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGF1dG8pO1xuXG4gICAgICAgIHVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGF1dG8sXG4gICAgICAgIHVwZGF0ZVxuICAgIH07XG59XG4iLCJsZXQgcmVxdWVzdCA9IG51bGwsXG4gICAgZXhpdCA9IG51bGwsXG4gICAgY2hhbmdlID0gbnVsbCxcbiAgICBlcnJvciA9IG51bGwsXG4gICAgZWxlbWVudCA9IG51bGwsXG4gICAgZW5hYmxlZCA9IG51bGw7XG5cbmNvbnN0IGRvY0VsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5pZiAodHlwZW9mIGRvY0VsLnJlcXVlc3RGdWxsc2NyZWVuICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJlcXVlc3QgPSAncmVxdWVzdEZ1bGxzY3JlZW4nO1xuICAgIGV4aXQgPSAnZXhpdEZ1bGxzY3JlZW4nO1xuICAgIGNoYW5nZSA9ICdmdWxsc2NyZWVuY2hhbmdlJztcbiAgICBlcnJvciA9ICdmdWxsc2NyZWVuZXJyb3InO1xuICAgIGVsZW1lbnQgPSAnZnVsbHNjcmVlbkVsZW1lbnQnO1xuICAgIGVuYWJsZWQgPSAnZnVsbHNjcmVlbkVuYWJsZWQnO1xufSBlbHNlIGlmICh0eXBlb2YgZG9jRWwubW96UmVxdWVzdEZ1bGxTY3JlZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmVxdWVzdCA9ICdtb3pSZXF1ZXN0RnVsbFNjcmVlbic7XG4gICAgZXhpdCA9ICdtb3pDYW5jZWxGdWxsU2NyZWVuJztcbiAgICBjaGFuZ2UgPSAnbW96ZnVsbHNjcmVlbmNoYW5nZSc7XG4gICAgZXJyb3IgPSAnbW96ZnVsbHNjcmVlbmVycm9yJztcbiAgICBlbGVtZW50ID0gJ21vekZ1bGxTY3JlZW5FbGVtZW50JztcbiAgICBlbmFibGVkID0gJ21vekZ1bGxTY3JlZW5FbmFibGVkJztcbn0gZWxzZSBpZiAodHlwZW9mIGRvY0VsLm1zUmVxdWVzdEZ1bGxzY3JlZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmVxdWVzdCA9ICdtc1JlcXVlc3RGdWxsc2NyZWVuJztcbiAgICBleGl0ID0gJ21zRXhpdEZ1bGxzY3JlZW4nO1xuICAgIGNoYW5nZSA9ICdNU0Z1bGxzY3JlZW5DaGFuZ2UnO1xuICAgIGVycm9yID0gJ01TRnVsbHNjcmVlbkVycm9yJztcbiAgICBlbGVtZW50ID0gJ21zRnVsbHNjcmVlbkVsZW1lbnQnO1xuICAgIGVuYWJsZWQgPSAnbXNGdWxsc2NyZWVuRW5hYmxlZCc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2NFbC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXF1ZXN0ID0gJ3dlYmtpdFJlcXVlc3RGdWxsc2NyZWVuJztcbiAgICBleGl0ID0gJ3dlYmtpdEV4aXRGdWxsc2NyZWVuJztcbiAgICBjaGFuZ2UgPSAnd2Via2l0ZnVsbHNjcmVlbmNoYW5nZSc7XG4gICAgZXJyb3IgPSAnd2Via2l0RnVsbHNjcmVlbkVycm9yJztcbiAgICBlbGVtZW50ID0gJ3dlYmtpdEZ1bGxzY3JlZW5FbGVtZW50JztcbiAgICBlbmFibGVkID0gJ3dlYmtpdEZ1bGxzY3JlZW5FbmFibGVkJztcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHJlcXVlc3QsXG4gICAgZXhpdCxcbiAgICBjaGFuZ2UsXG4gICAgZXJyb3IsXG4gICAgZWxlbWVudCxcbiAgICBlbmFibGVkXG59O1xuIiwiaW1wb3J0IGFwaSBmcm9tICcuL2FwaSc7XG5pbXBvcnQgZW1pdHRlciBmcm9tICcuLi9ldmVudHMvZW1pdHRlcic7XG5cbmNvbnN0IGZ1bGxzY3JlZW4gPSBPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihhcGkuY2hhbmdlLCAoZXZlbnQpID0+IHtcbiAgICBmdWxsc2NyZWVuLmVtaXQoJ2NoYW5nZScsIGV2ZW50KTtcbn0pO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGFwaS5lcnJvciwgKGV2ZW50KSA9PiB7XG4gICAgZnVsbHNjcmVlbi5lbWl0KCdlcnJvcicsIGV2ZW50KTtcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhmdWxsc2NyZWVuLCB7XG4gICAgcmVxdWVzdDoge1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgIGVsID0gZWwgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgZWxbYXBpLnJlcXVlc3RdKHRydWUpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBleGl0OiB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRvY3VtZW50W2FwaS5leGl0XSgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICB0b2dnbGU6IHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0Z1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4aXQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0KGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgaXNTdXBwb3J0ZWQ6IHtcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuICEhYXBpLnJlcXVlc3Q7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGlzRnVsbHNjcmVlbjoge1xuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gISFkb2N1bWVudFthcGkuZWxlbWVudF07XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGVsZW1lbnQ6IHtcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50W2FwaS5lbGVtZW50XTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZW5hYmxlZDoge1xuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnRbYXBpLmVuYWJsZWRdO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bGxzY3JlZW47XG4iLCJmdW5jdGlvbiBnZXRDb2xvdXIociwgZywgYiwgYSA9IDEpIHtcbiAgICBpZiAodHlwZW9mIHIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiByO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHIgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiBgcmdiYSgke3J9LCR7Yn0sJHtnfSwke2F9KWA7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaGljcyB7XG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBpZiAodHlwZW9mIHdpZHRoID09PSAnb2JqZWN0JyAmJiB3aWR0aC50YWdOYW1lID09PSAnQ0FOVkFTJykge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMgPSB3aWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICB0aGlzLnNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIH1cblxuICAgIGdldCBjb250ZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jdHg7XG4gICAgfVxuXG4gICAgZmlsbChyLCBnLCBiLCBhID0gMSkge1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBnZXRDb2xvdXIociwgZywgYiwgYSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHN0cm9rZShyLCBnLCBiLCBhID0gMSkge1xuICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IGdldENvbG91cihyLCBnLCBiLCBhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY2lyY2xlKHgsIHksIHJhZGl1cykge1xuICAgICAgICBjb25zdCB7Y3R4fSA9IHRoaXM7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyh4LCB5LCByYWRpdXMsIDAsIE1hdGguUEkgKiAyLCBmYWxzZSk7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCwgYW5nbGUgPSAwKSB7XG4gICAgICAgIGNvbnN0IHtjdHh9ID0gdGhpcztcbiAgICAgICAgaWYgKGFuZ2xlICE9PSAwKSB7XG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSh4ICsgd2lkdGggLyAyLCB5ICsgaGVpZ2h0IC8gMik7XG4gICAgICAgICAgICBjdHgucm90YXRlKGFuZ2xlKTtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5yZWN0KC13aWR0aCAvIDIsIC1oZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3R4LnJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGxpbmUoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICAgICAgY29uc3Qge2N0eH0gPSB0aGlzO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oeDEsIHkxKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4MiwgeTIpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGxpbmVXaWR0aCh3aWR0aCkge1xuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSB3aWR0aDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbW92ZSh4LCB5KSB7XG4gICAgICAgIHRoaXMuY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgaW1hZ2UoZWwsIHgsIHksIGFuZ2xlID0gMCkge1xuICAgICAgICBjb25zdCB7Y3R4fSA9IHRoaXM7XG4gICAgICAgIGlmIChhbmdsZSAhPT0gMCkge1xuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0WCA9IGVsLndpZHRoIC8gMjtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFkgPSBlbC5oZWlnaHQgLyAyO1xuICAgICAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoeCArIG9mZnNldFgsIHkgKyBvZmZzZXRZKTtcbiAgICAgICAgICAgIGN0eC5yb3RhdGUoYW5nbGUpO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShlbCwgLW9mZnNldFgsIC1vZmZzZXRZKTtcbiAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGVsLCB4LCB5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0ZXh0KHN0ciwgeCwgeSkge1xuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChzdHIsIHgsIHkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRGb250U3R5bGUoZmFtaWx5LCBzaXplKSB7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBgJHtzaXplfXB4ICR7ZmFtaWx5fWA7XG4gICAgfVxuXG4gICAgZ2V0SW1hZ2VEYXRhKHggPSAwLCB5ID0gMCwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICBjb25zdCB7Y3R4LCBjYW52YXN9ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGN0eC5nZXRJbWFnZURhdGEoeCwgeSwgd2lkdGggfHwgY2FudmFzLndpZHRoLCBoZWlnaHQgfHwgY2FudmFzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgZ2V0UGl4ZWwoeCwgeSkge1xuICAgICAgICB4ID0gTWF0aC5mbG9vcih4KTtcbiAgICAgICAgeSA9IE1hdGguZmxvb3IoeSk7XG4gICAgICAgIGNvbnN0IHtkYXRhfSA9IHRoaXMuY3R4LmdldEltYWdlRGF0YSh4LCB5LCAxLCAxKTtcbiAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRhdGEpO1xuICAgIH1cblxuICAgIHNldFBpeGVsKHgsIHksIHIsIGcsIGIsIGEpIHtcbiAgICAgICAgeCA9IE1hdGguZmxvb3IoeCk7XG4gICAgICAgIHkgPSBNYXRoLmZsb29yKHkpO1xuICAgICAgICBjb25zdCB7d2lkdGgsIGRhdGF9ID0gdGhpcy5nZXRJbWFnZURhdGEoKTtcbiAgICAgICAgY29uc3QgaSA9ICh4ICsgeSAqIHdpZHRoKSAqIDQ7XG4gICAgICAgIGRhdGFbaSArIDBdID0gcjtcbiAgICAgICAgZGF0YVtpICsgMV0gPSBnO1xuICAgICAgICBkYXRhW2kgKyAyXSA9IGI7XG4gICAgICAgIGRhdGFbaSArIDNdID0gYTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY2xlYXJDaXJjbGUoeCwgeSwgcmFkaXVzID0gMjApIHtcbiAgICAgICAgY29uc3Qge2N0eH0gPSB0aGlzO1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLW91dCc7XG4gICAgICAgIHRoaXMuY2lyY2xlKHgsIHksIHJhZGl1cyk7XG4gICAgICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc291cmNlLW92ZXInO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0cmFuc2xhdGVBbmQoeCwgeSwgZm4pIHtcbiAgICAgICAgY29uc3Qge2N0eH0gPSB0aGlzO1xuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHgudHJhbnNsYXRlKHgsIHkpO1xuICAgICAgICBmbihjdHgpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjbGVhcihyLCBnLCBiLCBhID0gMSkge1xuICAgICAgICBjb25zdCBjb2xvciA9IGdldENvbG91cihyLCBnLCBiLCBhKTtcbiAgICAgICAgY29uc3Qge2N0eH0gPSB0aGlzO1xuICAgICAgICBjb25zdCB7d2lkdGgsIGhlaWdodH0gPSB0aGlzLmNhbnZhcztcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2l6ZSh3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5jYW52YXMucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmNhbnZhcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYW52YXMgPSBudWxsO1xuICAgICAgICB0aGlzLmN0eCA9IG51bGw7XG4gICAgfVxufVxuIiwiaW1wb3J0IGxvYWRTY3JpcHQgZnJvbSAnLi4vaHR0cC9sb2FkU2NyaXB0JztcblxuLy8gZXhhbXBsZSB1c2FnZTpcbi8vXG4vLyBjb25zdCBvcHRzID0ge1xuLy8gICAgIGZyaWN0aW9uOiAwLjksXG4vLyAgICAgbWF4U3BlZWQ6IDFcbi8vIH07XG4vLyBndWkodHJ1ZSlcbi8vICAgICAudGhlbigoZykgPT4ge1xuLy8gICAgICAgICBnLmFkZChvcHRzLCAnZnJpY3Rpb24nLCAwLjcsIDAuOTk5KTtcbi8vICAgICAgICAgZy5hZGQob3B0cywgJ21heFNwZWVkJywgMC41LCAyKS5vbkNoYW5nZSgodmFsdWUpID0+IGNvbnNvbGUubG9nKHZhbHVlKSk7XG4vLyAgICAgfSlcbi8vICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ3VpKGxvY2FsaG9zdE9ubHkgPSBmYWxzZSkge1xuICAgIGlmIChsb2NhbGhvc3RPbmx5ICYmICEvXig/Omh0dHBzPzpcXC9cXC8pPyg/OmxvY2FsaG9zdHwxOTJcXC4xNjgpLy50ZXN0KHdpbmRvdy5sb2NhdGlvbi5ocmVmKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKCkgPT4ge30pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBsb2FkU2NyaXB0KCdodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9kYXQtZ3VpLzAuNi4xL2RhdC5ndWkubWluLmpzJywgKGVyciwgc3JjKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyBzY3JpcHQnLCBzcmMpO1xuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ0Vycm9yIGxvYWRpbmcgc2NyaXB0JykpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGcgPSBuZXcgd2luZG93LmRhdC5HVUkoe2F1dG9QbGFjZTogdHJ1ZX0pO1xuICAgICAgICAgICAgY29uc3QgcyA9IGRvY3VtZW50LnN0eWxlU2hlZXRzWzBdO1xuICAgICAgICAgICAgcy5pbnNlcnRSdWxlKCcuZGcuYWMge3otaW5kZXg6MTAwMDAgIWltcG9ydGFudH0nLCAwKTtcbiAgICAgICAgICAgIHMuaW5zZXJ0UnVsZSgnLmRnICoge2ZvbnQtc2l6ZToxMXB4ICFpbXBvcnRhbnR9JywgMCk7XG4gICAgICAgICAgICBzLmluc2VydFJ1bGUoJy5kZyBpbnB1dCB7Zm9udDoxMXB4IEx1Y2lkYSBHcmFuZGUsc2Fucy1zZXJpZiAhaW1wb3J0YW50fScsIDApO1xuICAgICAgICAgICAgcmVzb2x2ZShnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRMb2NhdGlvbihocmVmKSB7XG4gICAgY29uc3QgbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBsLmhyZWYgPSBocmVmO1xuICAgIHJldHVybiBsO1xufVxuIiwiaW1wb3J0IGdldExvY2F0aW9uIGZyb20gJy4vZ2V0TG9jYXRpb24nO1xuaW1wb3J0IGpzb25wIGZyb20gJy4vanNvbnAnO1xuaW1wb3J0IGxvYWRTY3JpcHQgZnJvbSAnLi9sb2FkU2NyaXB0JztcbmltcG9ydCB1cmxQYXJhbXMgZnJvbSAnLi91cmxQYXJhbXMnO1xuaW1wb3J0IHhociBmcm9tICcuL3hocic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBnZXRMb2NhdGlvbixcbiAgICBqc29ucCxcbiAgICBsb2FkU2NyaXB0LFxuICAgIHVybFBhcmFtcyxcbiAgICB4aHJcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBqc29ucCh1cmwsIGNiLCB0aW1lb3V0ID0gNTAwMCkge1xuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIGNvbnN0IGNhbGxiYWNrID0gYGpzb25wX2NhbGxiYWNrXyR7TWF0aC5yb3VuZCgxMDAwMDAgKiBNYXRoLnJhbmRvbSgpKX1gO1xuICAgIGNvbnN0IHNlcGFyYXRvciA9IHVybC5pbmRleE9mKCc/JykgPj0gMCA/ICcmJyA6ICc/JztcblxuICAgIGNvbnN0IHRpbWVvdXRJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgd2luZG93W2NhbGxiYWNrXShudWxsLCAnanNvbnAgZXJyb3InKTtcbiAgICB9LCB0aW1lb3V0KTtcblxuICAgIHdpbmRvd1tjYWxsYmFja10gPSBmdW5jdGlvbihkYXRhLCBlcnIgPSBudWxsKSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgICAgZGVsZXRlIHdpbmRvd1tjYWxsYmFja107XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgY2IoZGF0YSwgZXJyKTtcbiAgICB9O1xuXG4gICAgc2NyaXB0LnNyYyA9IGAke3VybH0ke3NlcGFyYXRvcn1jYWxsYmFjaz0ke2NhbGxiYWNrfWA7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZFNjcmlwdChzcmMsIGNiKSB7XG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LnNyYyA9IHNyYztcbiAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IGNiKG51bGwsIHNyYykpO1xuICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsICgpID0+IGNiKHRydWUsIHNyYykpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICByZXR1cm4gc2NyaXB0O1xufVxuIiwiY29uc3QgcGx1cyA9IC9cXCsvZzsgIC8vIG1hdGNoICcrJyBzeW1ib2xcbmNvbnN0IHNlYXJjaCA9IC8oW14mPV0rKT0/KFteJl0qKS9nO1xuXG5mdW5jdGlvbiBkZWNvZGUoc3RyKSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHIucmVwbGFjZShwbHVzLCAnICcpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXJsUGFyYW1zKHF1ZXJ5KSB7XG4gICAgcXVlcnkgPSBxdWVyeSB8fCB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnNsaWNlKDEpO1xuXG4gICAgY29uc3QgcGFyYW1zID0ge307XG4gICAgbGV0IG1hdGNoID0gc2VhcmNoLmV4ZWMocXVlcnkpO1xuICAgIHdoaWxlIChtYXRjaCkge1xuICAgICAgICBwYXJhbXNbZGVjb2RlKG1hdGNoWzFdKV0gPSBkZWNvZGUobWF0Y2hbMl0pO1xuICAgICAgICBtYXRjaCA9IHNlYXJjaC5leGVjKHF1ZXJ5KTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcmFtcztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHhocih1cmwsIHR5cGUgPSAnanNvbicpIHtcbiAgICBjb25zdCBwID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgcmVxLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSByZXEucmVzcG9uc2U7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2pzb24nICYmIHR5cGVvZiByZXNwb25zZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IEpTT04ucGFyc2UocmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXEuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoKSA9PiByZWplY3QocmVxLnN0YXR1cykpO1xuICAgICAgICByZXEub3BlbignR0VUJywgdXJsKTtcbiAgICAgICAgcmVxLnJlc3BvbnNlVHlwZSA9IHR5cGU7XG4gICAgICAgIC8vIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuICAgICAgICByZXEuc2VuZCgpO1xuICAgIH0pO1xuICAgIHJldHVybiBwO1xufVxuIiwiaW1wb3J0ICcuL3BvbHlmaWxsJztcbmltcG9ydCBhcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCBkb20gZnJvbSAnLi9kb20nO1xuaW1wb3J0IGVhc2UgZnJvbSAnLi9lYXNlJztcbmltcG9ydCBldmVudHMgZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IGZwcyBmcm9tICcuL2Zwcyc7XG5pbXBvcnQgZnVsbHNjcmVlbiBmcm9tICcuL2Z1bGxzY3JlZW4nO1xuaW1wb3J0IGdyYXBoaWNzIGZyb20gJy4vZ3JhcGhpY3MnO1xuaW1wb3J0IGd1aSBmcm9tICcuL2d1aSc7XG5pbXBvcnQgaHR0cCBmcm9tICcuL2h0dHAnO1xuaW1wb3J0IGlucHV0IGZyb20gJy4vaW5wdXQnO1xuaW1wb3J0IGxpbmtlZExpc3QgZnJvbSAnLi9saW5rZWQtbGlzdCc7XG5pbXBvcnQgbWF0aCBmcm9tICcuL21hdGgnO1xuaW1wb3J0IG1lZGlhIGZyb20gJy4vbWVkaWEnO1xuaW1wb3J0IG9iamVjdFBvb2wgZnJvbSAnLi9vYmplY3QtcG9vbCc7XG5pbXBvcnQgUGFydGljbGUgZnJvbSAnLi9wYXJ0aWNsZSc7XG5pbXBvcnQgUGFydGljbGVHcm91cCBmcm9tICcuL3BhcnRpY2xlJztcbmltcG9ydCBwbGF0Zm9ybSBmcm9tICcuL3BsYXRmb3JtJztcbmltcG9ydCBwb3B1cCBmcm9tICcuL3BvcHVwJztcbmltcG9ydCBRdWFkVHJlZSBmcm9tICcuL3F1YWQtdHJlZSc7XG5pbXBvcnQgc2hhcmUgZnJvbSAnLi9zaGFyZSc7XG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UnO1xuaW1wb3J0IHN0cmluZyBmcm9tICcuL3N0cmluZyc7XG5pbXBvcnQgVGlja2VyIGZyb20gJy4vdGlja2VyJztcbmltcG9ydCB0cmFjayBmcm9tICcuL3RyYWNrJztcbmltcG9ydCBUd2VlbiBmcm9tICcuL3R3ZWVuJztcbmltcG9ydCB2aXNpYmlsaXR5IGZyb20gJy4vdmlzaWJpbGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhcnJheSxcbiAgICBkb20sXG4gICAgZWFzZSxcbiAgICBldmVudHMsXG4gICAgZnBzLFxuICAgIGZ1bGxzY3JlZW4sXG4gICAgZ3JhcGhpY3MsXG4gICAgZ3VpLFxuICAgIGh0dHAsXG4gICAgaW5wdXQsXG4gICAgbGlua2VkTGlzdCxcbiAgICBtYXRoLFxuICAgIG1lZGlhLFxuICAgIG9iamVjdFBvb2wsXG4gICAgUGFydGljbGUsXG4gICAgUGFydGljbGVHcm91cCxcbiAgICBwbGF0Zm9ybSxcbiAgICBwb3B1cCxcbiAgICBRdWFkVHJlZSxcbiAgICBzaGFyZSxcbiAgICBzdG9yYWdlLFxuICAgIHN0cmluZyxcbiAgICBUaWNrZXIsXG4gICAgVHdlZW4sXG4gICAgdHJhY2ssXG4gICAgdmlzaWJpbGl0eVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsaWNrT3V0c2lkZShlbCwgZm4pIHtcbiAgICBmdW5jdGlvbiBvbkNsaWNrT3V0c2lkZShldmVudCkge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBsZXQgaW5zaWRlID0gZmFsc2U7XG5cbiAgICAgICAgd2hpbGUgKHRhcmdldCAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gZWwpIHtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpbnNpZGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWluc2lkZSkge1xuICAgICAgICAgICAgZm4oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Ub3VjaE91dHNpZGUoZXZlbnQpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2tPdXRzaWRlKTtcbiAgICAgICAgb25DbGlja091dHNpZGUoZXZlbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrT3V0c2lkZSk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG9uVG91Y2hPdXRzaWRlKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGlja091dHNpZGUpO1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG9uVG91Y2hPdXRzaWRlKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGRlc3Ryb3lcbiAgICB9O1xufVxuIiwiaW1wb3J0IGNsaWNrT3V0c2lkZSBmcm9tICcuL2NsaWNrT3V0c2lkZSc7XG5pbXBvcnQga2V5Ym9hcmQgZnJvbSAnLi9rZXlib2FyZCc7XG5pbXBvcnQga2V5SW5wdXQgZnJvbSAnLi9rZXlJbnB1dCc7XG5pbXBvcnQgbWljcm9waG9uZSBmcm9tICcuL21pY3JvcGhvbmUnO1xuaW1wb3J0IG1vdXNlTGVmdFdpbmRvdyBmcm9tICcuL21vdXNlTGVmdFdpbmRvdyc7XG5pbXBvcnQgbW91c2VXaGVlbCBmcm9tICcuL21vdXNlV2hlZWwnO1xuaW1wb3J0IHBvaW50ZXJDb29yZHMgZnJvbSAnLi9wb2ludGVyQ29vcmRzJztcbmltcG9ydCB0b3VjaElucHV0IGZyb20gJy4vdG91Y2hJbnB1dCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjbGlja091dHNpZGUsXG4gICAga2V5Ym9hcmQsXG4gICAga2V5SW5wdXQsXG4gICAgbWljcm9waG9uZSxcbiAgICBtb3VzZUxlZnRXaW5kb3csXG4gICAgbW91c2VXaGVlbCxcbiAgICBwb2ludGVyQ29vcmRzLFxuICAgIHRvdWNoSW5wdXRcbn07XG4iLCJpbXBvcnQgYXJyYXkgZnJvbSAnLi4vYXJyYXkvYXJyYXknO1xuaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuaW1wb3J0IGtleWJvYXJkIGZyb20gJy4va2V5Ym9hcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBrZXlJbnB1dCgpIHtcbiAgICBjb25zdCBhcGkgPSBPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlKTtcbiAgICBjb25zdCBrZXlzID0gYXJyYXkoMjU2LCBmYWxzZSk7XG5cbiAgICBmdW5jdGlvbiBlbWl0S2V5KGtleUNvZGUpIHtcbiAgICAgICAgY29uc3Qga2V5TmFtZSA9IE9iamVjdC5rZXlzKGtleWJvYXJkKS5yZWR1Y2UoKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBrZXlib2FyZFtrZXldID09PSBrZXlDb2RlID8ga2V5IDogdmFsdWU7XG4gICAgICAgIH0sICcnKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoa2V5TmFtZSkge1xuICAgICAgICAgICAgYXBpLmVtaXQoa2V5TmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uS2V5RG93bihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBrZXlzW2V2ZW50LmtleUNvZGVdID0gdHJ1ZTtcbiAgICAgICAgYXBpLmVtaXQoJ2tleWRvd24nLCBldmVudC5rZXlDb2RlKTtcbiAgICAgICAgZW1pdEtleShldmVudC5rZXlDb2RlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbktleVVwKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGtleXNbZXZlbnQua2V5Q29kZV0gPSBmYWxzZTtcbiAgICAgICAgYXBpLmVtaXQoJ2tleXVwJywgZXZlbnQua2V5Q29kZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkKCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duLCBmYWxzZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25LZXlVcCwgZmFsc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93bik7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25LZXlVcCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNEb3duKGtleSkge1xuICAgICAgICByZXR1cm4ga2V5c1trZXldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxlZnQoKSB7XG4gICAgICAgIHJldHVybiBrZXlzW2tleWJvYXJkLkxFRlRdIHx8IGtleXNba2V5Ym9hcmQuQV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmlnaHQoKSB7XG4gICAgICAgIHJldHVybiBrZXlzW2tleWJvYXJkLlJJR0hUXSB8fCBrZXlzW2tleWJvYXJkLkRdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwKCkge1xuICAgICAgICByZXR1cm4ga2V5c1trZXlib2FyZC5VUF0gfHwga2V5c1trZXlib2FyZC5XXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkb3duKCkge1xuICAgICAgICByZXR1cm4ga2V5c1trZXlib2FyZC5ET1dOXSB8fCBrZXlzW2tleWJvYXJkLlNdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNwYWNlKCkge1xuICAgICAgICByZXR1cm4ga2V5c1trZXlib2FyZC5TUEFDRV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5hYmxlKHZhbHVlID0gdHJ1ZSkge1xuICAgICAgICByZW1vdmUoKTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBhZGQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZCgpO1xuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oYXBpLCB7XG4gICAgICAgIGtleWJvYXJkLFxuICAgICAgICBlbmFibGUsXG4gICAgICAgIGlzRG93bixcbiAgICAgICAgbGVmdCxcbiAgICAgICAgcmlnaHQsXG4gICAgICAgIHVwLFxuICAgICAgICBkb3duLFxuICAgICAgICBzcGFjZVxuICAgIH0pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICAgIEE6ICdBJy5jaGFyQ29kZUF0KDApLFxuICAgIEI6ICdCJy5jaGFyQ29kZUF0KDApLFxuICAgIEM6ICdDJy5jaGFyQ29kZUF0KDApLFxuICAgIEQ6ICdEJy5jaGFyQ29kZUF0KDApLFxuICAgIEU6ICdFJy5jaGFyQ29kZUF0KDApLFxuICAgIEY6ICdGJy5jaGFyQ29kZUF0KDApLFxuICAgIEc6ICdHJy5jaGFyQ29kZUF0KDApLFxuICAgIEg6ICdIJy5jaGFyQ29kZUF0KDApLFxuICAgIEk6ICdJJy5jaGFyQ29kZUF0KDApLFxuICAgIEo6ICdKJy5jaGFyQ29kZUF0KDApLFxuICAgIEs6ICdLJy5jaGFyQ29kZUF0KDApLFxuICAgIEw6ICdMJy5jaGFyQ29kZUF0KDApLFxuICAgIE06ICdNJy5jaGFyQ29kZUF0KDApLFxuICAgIE46ICdOJy5jaGFyQ29kZUF0KDApLFxuICAgIE86ICdPJy5jaGFyQ29kZUF0KDApLFxuICAgIFA6ICdQJy5jaGFyQ29kZUF0KDApLFxuICAgIFE6ICdRJy5jaGFyQ29kZUF0KDApLFxuICAgIFI6ICdSJy5jaGFyQ29kZUF0KDApLFxuICAgIFM6ICdTJy5jaGFyQ29kZUF0KDApLFxuICAgIFQ6ICdUJy5jaGFyQ29kZUF0KDApLFxuICAgIFU6ICdVJy5jaGFyQ29kZUF0KDApLFxuICAgIFY6ICdWJy5jaGFyQ29kZUF0KDApLFxuICAgIFc6ICdXJy5jaGFyQ29kZUF0KDApLFxuICAgIFg6ICdYJy5jaGFyQ29kZUF0KDApLFxuICAgIFk6ICdZJy5jaGFyQ29kZUF0KDApLFxuICAgIFo6ICdaJy5jaGFyQ29kZUF0KDApLFxuICAgIFpFUk86ICcwJy5jaGFyQ29kZUF0KDApLFxuICAgIE9ORTogJzEnLmNoYXJDb2RlQXQoMCksXG4gICAgVFdPOiAnMicuY2hhckNvZGVBdCgwKSxcbiAgICBUSFJFRTogJzMnLmNoYXJDb2RlQXQoMCksXG4gICAgRk9VUjogJzQnLmNoYXJDb2RlQXQoMCksXG4gICAgRklWRTogJzUnLmNoYXJDb2RlQXQoMCksXG4gICAgU0lYOiAnNicuY2hhckNvZGVBdCgwKSxcbiAgICBTRVZFTjogJzcnLmNoYXJDb2RlQXQoMCksXG4gICAgRUlHSFQ6ICc4Jy5jaGFyQ29kZUF0KDApLFxuICAgIE5JTkU6ICc5Jy5jaGFyQ29kZUF0KDApLFxuICAgIE5VTVBBRF8wOiA5NixcbiAgICBOVU1QQURfMTogOTcsXG4gICAgTlVNUEFEXzI6IDk4LFxuICAgIE5VTVBBRF8zOiA5OSxcbiAgICBOVU1QQURfNDogMTAwLFxuICAgIE5VTVBBRF81OiAxMDEsXG4gICAgTlVNUEFEXzY6IDEwMixcbiAgICBOVU1QQURfNzogMTAzLFxuICAgIE5VTVBBRF84OiAxMDQsXG4gICAgTlVNUEFEXzk6IDEwNSxcbiAgICBOVU1QQURfTVVMVElQTFk6IDEwNixcbiAgICBOVU1QQURfQUREOiAxMDcsXG4gICAgTlVNUEFEX0VOVEVSOiAxMDgsXG4gICAgTlVNUEFEX1NVQlRSQUNUOiAxMDksXG4gICAgTlVNUEFEX0RFQ0lNQUw6IDExMCxcbiAgICBOVU1QQURfRElWSURFOiAxMTEsXG4gICAgRjE6IDExMixcbiAgICBGMjogMTEzLFxuICAgIEYzOiAxMTQsXG4gICAgRjQ6IDExNSxcbiAgICBGNTogMTE2LFxuICAgIEY2OiAxMTcsXG4gICAgRjc6IDExOCxcbiAgICBGODogMTE5LFxuICAgIEY5OiAxMjAsXG4gICAgRjEwOiAxMjEsXG4gICAgRjExOiAxMjIsXG4gICAgRjEyOiAxMjMsXG4gICAgRjEzOiAxMjQsXG4gICAgRjE0OiAxMjUsXG4gICAgRjE1OiAxMjYsXG4gICAgQ09MT046IDE4NixcbiAgICBFUVVBTFM6IDE4NyxcbiAgICBVTkRFUlNDT1JFOiAxODksXG4gICAgUVVFU1RJT05fTUFSSzogMTkxLFxuICAgIFRJTERFOiAxOTIsXG4gICAgT1BFTl9CUkFDS0VUOiAyMTksXG4gICAgQkFDS1dBUkRfU0xBU0g6IDIyMCxcbiAgICBDTE9TRURfQlJBQ0tFVDogMjIxLFxuICAgIFFVT1RFUzogMjIyLFxuICAgIEJBQ0tTUEFDRTogOCxcbiAgICBUQUI6IDksXG4gICAgQ0xFQVI6IDEyLFxuICAgIEVOVEVSOiAxMyxcbiAgICBTSElGVDogMTYsXG4gICAgQ09OVFJPTDogMTcsXG4gICAgQUxUOiAxOCxcbiAgICBDQVBTX0xPQ0s6IDIwLFxuICAgIEVTQzogMjcsXG4gICAgU1BBQ0U6IDMyLFxuICAgIFBBR0VfVVA6IDMzLFxuICAgIFBBR0VfRE9XTjogMzQsXG4gICAgRU5EOiAzNSxcbiAgICBIT01FOiAzNixcbiAgICBMRUZUOiAzNyxcbiAgICBVUDogMzgsXG4gICAgUklHSFQ6IDM5LFxuICAgIERPV046IDQwLFxuICAgIElOU0VSVDogNDUsXG4gICAgREVMRVRFOiA0NixcbiAgICBIRUxQOiA0NyxcbiAgICBOVU1fTE9DSzogMTQ0XG59O1xuIiwiaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtaWNyb3Bob25lKCkge1xuICAgIGNvbnN0IG1pYyA9IE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUpO1xuICAgIGxldCBzdHJlYW0gPSBudWxsO1xuXG4gICAgY29uc3QgZ2V0VXNlck1lZGlhID0gKG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgfHxcbiAgICAgICAgbmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYSB8fFxuICAgICAgICBuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhIHx8XG4gICAgICAgIG5hdmlnYXRvci5tc0dldFVzZXJNZWRpYSk7XG5cbiAgICBjb25zdCBpc1N1cHBvcnRlZCA9ICEhZ2V0VXNlck1lZGlhO1xuXG4gICAgZnVuY3Rpb24gY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKCFpc1N1cHBvcnRlZCkge1xuICAgICAgICAgICAgbWljLmVtaXQoJ2Vycm9yJywgJ05vdCBzdXBwb3J0ZWQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBnZXRVc2VyTWVkaWEoe1xuICAgICAgICAgICAgYXVkaW86IHRydWVcbiAgICAgICAgfSwgKG1lZGlhU3RyZWFtKSA9PiB7XG4gICAgICAgICAgICBzdHJlYW0gPSBtZWRpYVN0cmVhbTtcbiAgICAgICAgICAgIG1pYy5lbWl0KCdjb25uZWN0Jywgc3RyZWFtKTtcbiAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLm5hbWUgPT09ICdQZXJtaXNzaW9uRGVuaWVkRXJyb3InIHx8IGUgPT09ICdQRVJNSVNTSU9OX0RFTklFRCcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUGVybWlzc2lvbiBkZW5pZWQuIFVuZG8gYnkgY2xpY2tpbmcgdGhlIGNhbWVyYSBpY29uIGluIHRoZSBhZGRyZXNzIGJhcicpO1xuICAgICAgICAgICAgICAgIG1pYy5lbWl0KCdkZW5pZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWljLmVtaXQoJ2Vycm9yJywgZS5tZXNzYWdlIHx8IGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkaXNjb25uZWN0KCkge1xuICAgICAgICBpZiAoc3RyZWFtKSB7XG4gICAgICAgICAgICBzdHJlYW0uc3RvcCgpO1xuICAgICAgICAgICAgc3RyZWFtID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVdlYkF1ZGlvU291cmNlKHdlYkF1ZGlvQ29udGV4dCwgY29ubmVjdFRvKSB7XG4gICAgICAgIGlmICghc3RyZWFtKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHdlYkF1ZGlvQ29udGV4dC5jcmVhdGVNZWRpYVN0cmVhbVNvdXJjZShzdHJlYW0pO1xuXG4gICAgICAgIGlmIChjb25uZWN0VG8pIHtcbiAgICAgICAgICAgIHNvdXJjZS5jb25uZWN0KGNvbm5lY3RUbyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIQUNLOiBzdG9wcyBtb3ogZ2FyYmFnZSBjb2xsZWN0aW9uIGtpbGxpbmcgdGhlIHN0cmVhbVxuICAgICAgICAvLyBzZWUgaHR0cHM6Ly9zdXBwb3J0Lm1vemlsbGEub3JnL2VuLVVTL3F1ZXN0aW9ucy85ODQxNzlcbiAgICAgICAgaWYgKG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEpIHtcbiAgICAgICAgICAgIHdpbmRvdy5oYWNrX2Zvcl9tb3ppbGxhID0gc291cmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihtaWMsIHtcbiAgICAgICAgY29ubmVjdCxcbiAgICAgICAgZGlzY29ubmVjdCxcbiAgICAgICAgY3JlYXRlV2ViQXVkaW9Tb3VyY2UsXG4gICAgICAgIGlzU3VwcG9ydGVkOiAoKSA9PiBpc1N1cHBvcnRlZCxcbiAgICAgICAgc3RyZWFtOiAoKSA9PiBzdHJlYW1cbiAgICB9KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1vdXNlTGVmdFdpbmRvdyhjYikge1xuICAgIGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZnJvbSA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQgfHwgZXZlbnQudG9FbGVtZW50O1xuICAgICAgICBpZiAoIWZyb20gfHwgZnJvbS5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBoYW5kbGVyLCBmYWxzZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkZXN0cm95ICgpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIiwiaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtb3VzZVdoZWVsKHNwZWVkKSB7XG4gICAgc3BlZWQgPSBzcGVlZCB8fCAyO1xuXG4gICAgbGV0IHdoZWVsO1xuXG4gICAgZnVuY3Rpb24gd2hlZWxIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IChldmVudC5kZXRhaWwgPCAwIHx8IGV2ZW50LndoZWVsRGVsdGEgPiAwKSA/IDEgOiAtMTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSBkaXJlY3Rpb24gKiBzcGVlZDtcblxuICAgICAgICBpZiAoZGlyZWN0aW9uID4gMCkge1xuICAgICAgICAgICAgd2hlZWwuZW1pdCgndXAnLCBkZWx0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aGVlbC5lbWl0KCdkb3duJywgZGVsdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hlZWwuZW1pdCgndXBkYXRlJywgZGVsdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZCgpIHtcbiAgICAgICAgaWYgKCdvbm1vdXNld2hlZWwnIGluIHdpbmRvdykge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCB3aGVlbEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgd2hlZWxIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICAgIGlmICgnb25tb3VzZXdoZWVsJyBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgd2hlZWxIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAod2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHdoZWVsSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkKCk7XG5cbiAgICB3aGVlbCA9IE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUsIHtcbiAgICAgICAgX2V2ZW50czoge1xuICAgICAgICAgICAgdmFsdWU6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIGFkZDoge1xuICAgICAgICAgICAgdmFsdWU6IGFkZFxuICAgICAgICB9LFxuICAgICAgICByZW1vdmU6IHtcbiAgICAgICAgICAgIHZhbHVlOiByZW1vdmVcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUod2hlZWwpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcG9pbnRlckNvb3JkcygpIHtcbiAgICBsZXQgc2VsZjtcblxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZUNvb3JkcyhldmVudCkge1xuICAgICAgICBjb25zdCBwWCA9IGV2ZW50LmNsaWVudFggfHwgMDtcbiAgICAgICAgY29uc3QgcFkgPSBldmVudC5jbGllbnRZIHx8IDA7XG4gICAgICAgIGNvbnN0IHNYID0gd2luZG93LnBhZ2VYT2Zmc2V0O1xuICAgICAgICBjb25zdCBzWSA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgICAgc2VsZi54ID0gcFggKyBzWDtcbiAgICAgICAgc2VsZi55ID0gcFkgKyBzWTtcbiAgICAgICAgc2VsZi5wZXJjZW50WCA9IHNlbGYueCAvIHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBzZWxmLnBlcmNlbnRZID0gc2VsZi55IC8gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIH1cblxuICAgIHNlbGYgPSB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDAsXG4gICAgICAgIHBlcmNlbnRYOiAwLFxuICAgICAgICBwZXJjZW50WTogMCxcbiAgICAgICAgaXNMaXN0ZW5pbmc6IGZhbHNlLFxuXG4gICAgICAgIG9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgY2FsY3VsYXRlQ29vcmRzKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgY2FsY3VsYXRlQ29vcmRzKTtcbiAgICAgICAgICAgIHNlbGYuaXNMaXN0ZW5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIG9mZjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGNhbGN1bGF0ZUNvb3Jkcyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGNhbGN1bGF0ZUNvb3Jkcyk7XG4gICAgICAgICAgICBzZWxmLmlzTGlzdGVuaW5nID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHNlbGY7XG59XG4iLCJpbXBvcnQgZW1pdHRlciBmcm9tICcuLi9ldmVudHMvZW1pdHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvdWNoSW5wdXQoZWwpIHtcbiAgICBlbCA9IGVsIHx8IGRvY3VtZW50LmJvZHk7XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBzdGFydDogWy0xLCAtMV0sXG4gICAgICAgIG1vdmU6IFstMSwgLTFdLFxuICAgICAgICBlbmQ6IFstMSwgLTFdLFxuICAgICAgICBwb3NpdGlvbjogWy0xLCAtMV0sXG4gICAgICAgIGRpc3RhbmNlOiBbMCwgMF0sXG4gICAgICAgIGRpcmVjdGlvbjogWydub25lJywgJ25vbmUnXSxcbiAgICAgICAgdG91Y2hpbmc6IGZhbHNlLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBudWxsXG4gICAgfTtcblxuICAgIGxldCBzZWxmO1xuXG4gICAgZnVuY3Rpb24gdG91Y2hIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGlmICghKGV2ZW50ICYmIGV2ZW50LnRvdWNoZXMpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZGF0YS5vcmlnaW5hbEV2ZW50ID0gZXZlbnQ7XG4gICAgICAgIGNvbnN0IHRvdWNoID0gZXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgY29uc3QgeCA9IHRvdWNoICYmIHRvdWNoLnBhZ2VYO1xuICAgICAgICBjb25zdCB5ID0gdG91Y2ggJiYgdG91Y2gucGFnZVk7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICd0b3VjaHN0YXJ0JzpcbiAgICAgICAgICAgICAgICBkYXRhLnN0YXJ0WzBdID0gZGF0YS5tb3ZlWzBdID0gZGF0YS5lbmRbMF0gPSBkYXRhLnBvc2l0aW9uWzBdID0geDtcbiAgICAgICAgICAgICAgICBkYXRhLnN0YXJ0WzFdID0gZGF0YS5tb3ZlWzFdID0gZGF0YS5lbmRbMV0gPSBkYXRhLnBvc2l0aW9uWzFdID0geTtcbiAgICAgICAgICAgICAgICBkYXRhLnRvdWNoaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ3N0YXJ0JywgZGF0YSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0b3VjaG1vdmUnOlxuICAgICAgICAgICAgICAgIGRhdGEubW92ZVswXSA9IGRhdGEucG9zaXRpb25bMF0gPSB4O1xuICAgICAgICAgICAgICAgIGRhdGEubW92ZVsxXSA9IGRhdGEucG9zaXRpb25bMV0gPSB5O1xuICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgnbW92ZScsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndG91Y2hlbmQnOlxuICAgICAgICAgICAgICAgIGRhdGEuZW5kWzBdID0gZGF0YS5wb3NpdGlvblswXSA9IHg7XG4gICAgICAgICAgICAgICAgZGF0YS5lbmRbMV0gPSBkYXRhLnBvc2l0aW9uWzFdID0geTtcbiAgICAgICAgICAgICAgICBkYXRhLnRvdWNoaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdlbmQnLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6IGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlzdGVuKGVsZW0pIHtcbiAgICAgICAgZWwgPSBlbGVtIHx8IGVsO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaEhhbmRsZXIpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICBzZWxmLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2hIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaEhhbmRsZXIpO1xuICAgICAgICBlbCA9IG51bGw7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cblxuICAgIGxpc3RlbihlbCk7XG5cbiAgICBzZWxmID0gT2JqZWN0LmNyZWF0ZShlbWl0dGVyLnByb3RvdHlwZSwge1xuICAgICAgICBfZXZlbnRzOiB7XG4gICAgICAgICAgICB2YWx1ZToge31cbiAgICAgICAgfSxcbiAgICAgICAgbGlzdGVuOiB7XG4gICAgICAgICAgICB2YWx1ZTogbGlzdGVuXG4gICAgICAgIH0sXG4gICAgICAgIGlzRG93bjoge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnRvdWNoaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXRUb3VjaDoge1xuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBkZXN0cm95OiB7XG4gICAgICAgICAgICB2YWx1ZTogZGVzdHJveVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZShzZWxmKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpbmtlZExpc3QoYXJyID0gW10pIHtcblxuICAgIGxldCBmaXJzdCxcbiAgICAgICAgbGFzdDtcblxuICAgIC8qXG4gICAgICAgIGl0ZW0gPSB7XG4gICAgICAgICAgICAnbmV4dCc6IG51bGwsXG4gICAgICAgICAgICAncHJldic6IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVtID0gbGlua2VkTGlzdC5nZXRGaXJzdCgpO1xuICAgICAgICB3aGlsZShpdGVtKSB7XG4gICAgICAgICAgICAvLyBkbyBzdHVmZlxuICAgICAgICAgICAgaXRlbSA9IGl0ZW0ubmV4dDtcbiAgICAgICAgfVxuICAgICovXG5cbiAgICBmdW5jdGlvbiByZW1vdmUoaXRlbSkge1xuICAgICAgICBpZiAoaXRlbS5uZXh0KSB7XG4gICAgICAgICAgICBpdGVtLm5leHQucHJldiA9IGl0ZW0ucHJldjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbS5wcmV2KSB7XG4gICAgICAgICAgICBpdGVtLnByZXYubmV4dCA9IGl0ZW0ubmV4dDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbSA9PT0gZmlyc3QpIHtcbiAgICAgICAgICAgIGZpcnN0ID0gaXRlbS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtID09PSBsYXN0KSB7XG4gICAgICAgICAgICBsYXN0ID0gaXRlbS5wcmV2O1xuICAgICAgICB9XG4gICAgICAgIGl0ZW0ubmV4dCA9IGl0ZW0ucHJldiA9IG51bGw7XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIoaXRlbSwgYWZ0ZXIpIHtcbiAgICAgICAgcmVtb3ZlKGl0ZW0pO1xuXG4gICAgICAgIGl0ZW0ucHJldiA9IGFmdGVyO1xuICAgICAgICBpdGVtLm5leHQgPSBhZnRlci5uZXh0O1xuXG4gICAgICAgIGlmICghYWZ0ZXIubmV4dCkge1xuICAgICAgICAgICAgbGFzdCA9IGl0ZW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZnRlci5uZXh0LnByZXYgPSBpdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgYWZ0ZXIubmV4dCA9IGl0ZW07XG5cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKGl0ZW0sIGJlZm9yZSkge1xuICAgICAgICByZW1vdmUoaXRlbSk7XG5cbiAgICAgICAgaXRlbS5wcmV2ID0gYmVmb3JlLnByZXY7XG4gICAgICAgIGl0ZW0ubmV4dCA9IGJlZm9yZTtcblxuICAgICAgICBpZiAoIWJlZm9yZS5wcmV2KSB7XG4gICAgICAgICAgICBmaXJzdCA9IGl0ZW07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiZWZvcmUucHJldi5uZXh0ID0gaXRlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJlZm9yZS5wcmV2ID0gaXRlbTtcblxuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGQoaXRlbSkge1xuICAgICAgICBpZiAoIWZpcnN0KSB7XG4gICAgICAgICAgICBmaXJzdCA9IGxhc3QgPSBpdGVtO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGkgPSBmaXJzdDtcbiAgICAgICAgICAgIHdoaWxlIChpLm5leHQpIHtcbiAgICAgICAgICAgICAgICBpID0gaS5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5zZXJ0QWZ0ZXIoaXRlbSwgaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICAgICAgICBsZXQgaXRlbSA9IGZpcnN0O1xuICAgICAgICB3aGlsZSAoaXRlbSkge1xuICAgICAgICAgICAgZm4oaXRlbSk7XG4gICAgICAgICAgICBpdGVtID0gaXRlbS5uZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFwKGZuKSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBsaW5rZWRMaXN0KCk7XG4gICAgICAgIGxldCBpdGVtID0gZmlyc3Q7XG4gICAgICAgIHdoaWxlIChpdGVtKSB7XG4gICAgICAgICAgICBsaXN0LmFkZChmbihpdGVtKSk7XG4gICAgICAgICAgICBpdGVtID0gaXRlbS5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaXN0O1xuICAgIH1cblxuICAgIGFyci5mb3JFYWNoKChpdGVtKSA9PiBhZGQoaXRlbSkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0IGZpcnN0ICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmaXJzdDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Rmlyc3QgKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZpcnN0O1xuICAgICAgICB9LFxuICAgICAgICBnZXQgbGFzdCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbGFzdDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0TGFzdCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbGFzdDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGxlbmd0aCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb3VudCgpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRDb3VudCAoKSB7XG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICAgICAgbGV0IGkgPSBmaXJzdDtcbiAgICAgICAgICAgIHdoaWxlIChpKSB7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICBpID0gaS5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvdW50O1xuICAgICAgICB9LFxuICAgICAgICBhZGQsXG4gICAgICAgIHJlbW92ZSxcbiAgICAgICAgaW5zZXJ0QWZ0ZXIsXG4gICAgICAgIGluc2VydEJlZm9yZSxcbiAgICAgICAgZm9yRWFjaCxcbiAgICAgICAgbWFwXG4gICAgfTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFuZ2xlKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgY29uc3QgZHggPSB4MiAtIHgxO1xuICAgIGNvbnN0IGR5ID0geTIgLSB5MTtcbiAgICByZXR1cm4gTWF0aC5hdGFuMihkeSwgZHgpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2VycChmcm9tLCB0bywgd2VpZ2h0ID0gMC4zKSB7XG4gICAgY29uc3QgZiA9ICgxIC0gTWF0aC5jb3Mod2VpZ2h0ICogTWF0aC5QSSkpIC8gMjtcbiAgICByZXR1cm4gKGZyb20gKiAoMSAtIGYpICsgdG8gKiBmKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNpcmNsZURpc3RyaWJ1dGlvbihyYWRpdXMsIG9yaWdpbiA9IHt4OiAwLCB5OiAwfSwgcCA9IHt4OiAwLCB5OiAwfSkge1xuICAgIGNvbnN0IHIgPSBNYXRoLnNxcnQoTWF0aC5yYW5kb20oKSkgKiByYWRpdXM7XG4gICAgY29uc3QgdGhldGEgPSBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDI7XG4gICAgcC54ID0gb3JpZ2luLnggKyBNYXRoLmNvcyh0aGV0YSkgKiByO1xuICAgIHAueSA9IG9yaWdpbi55ICsgTWF0aC5zaW4odGhldGEpICogcjtcbiAgICByZXR1cm4gcDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsYW1wKHZhbHVlLCBtaW4sIG1heCkge1xuICAgIGlmIChtaW4gPiBtYXgpIHtcbiAgICAgICAgY29uc3QgYSA9IG1pbjtcbiAgICAgICAgbWluID0gbWF4O1xuICAgICAgICBtYXggPSBhO1xuICAgIH1cbiAgICBpZiAodmFsdWUgPCBtaW4pIHtcbiAgICAgICAgcmV0dXJuIG1pbjtcbiAgICB9XG4gICAgaWYgKHZhbHVlID4gbWF4KSB7XG4gICAgICAgIHJldHVybiBtYXg7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvaW5Ub3NzKGhlYWRzID0gdHJ1ZSwgdGFpbHMgPSBmYWxzZSkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpID4gMC41ID8gaGVhZHMgOiB0YWlscztcbn1cbiIsIi8qXG5UaGUgc2lnbiB0ZWxscyB1cyBpZiBhIGlzIHRvIHRoZSBsZWZ0ICgtKSBvciB0aGUgcmlnaHQgKCspIG9mIGJcbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcm9zc1Byb2R1Y3QyZChhWCwgYVksIGJYLCBiWSkge1xuICAgIHJldHVybiBhWCAqIGJZIC0gYVkgKiBiWDtcbn1cbiIsImNvbnN0IERFRyA9IDE4MCAvIE1hdGguUEk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlZ3JlZXMocmFkaWFucykge1xuICAgIHJldHVybiByYWRpYW5zICogREVHO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlmZmVyZW5jZShhLCBiKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpc3RhbmNlKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgY29uc3QgZHggPSB4MSAtIHgyO1xuICAgIGNvbnN0IGR5ID0geTEgLSB5MjtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpc3RhbmNlU1EoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICBjb25zdCBkeCA9IHgxIC0geDI7XG4gICAgY29uc3QgZHkgPSB5MSAtIHkyO1xuICAgIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcbn1cbiIsIi8qXG4tIElmIEEgYW5kIEIgYXJlIHBlcnBlbmRpY3VsYXIgKGF0IDkwIGRlZ3JlZXMgdG8gZWFjaCBvdGhlciksIHRoZSByZXN1bHRcbm9mIHRoZSBkb3QgcHJvZHVjdCB3aWxsIGJlIHplcm8sIGJlY2F1c2UgY29zKM6YKSB3aWxsIGJlIHplcm8uXG4tIElmIHRoZSBhbmdsZSBiZXR3ZWVuIEEgYW5kIEIgYXJlIGxlc3MgdGhhbiA5MCBkZWdyZWVzLCB0aGUgZG90IHByb2R1Y3RcbndpbGwgYmUgcG9zaXRpdmUgKGdyZWF0ZXIgdGhhbiB6ZXJvKSwgYXMgY29zKM6YKSB3aWxsIGJlIHBvc2l0aXZlLCBhbmRcbnRoZSB2ZWN0b3IgbGVuZ3RocyBhcmUgYWx3YXlzIHBvc2l0aXZlIHZhbHVlcy5cbi0gSWYgdGhlIGFuZ2xlIGJldHdlZW4gQSBhbmQgQiBhcmUgZ3JlYXRlciB0aGFuIDkwIGRlZ3JlZXMsIHRoZSBkb3RcbnByb2R1Y3Qgd2lsbCBiZSBuZWdhdGl2ZSAobGVzcyB0aGFuIHplcm8pLCBhcyBjb3MozpgpIHdpbGwgYmUgbmVnYXRpdmUsXG5hbmQgdGhlIHZlY3RvciBsZW5ndGhzIGFyZSBhbHdheXMgcG9zaXRpdmUgdmFsdWVzXG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZG90UHJvZHVjdDJkKGFYLCBhWSwgYlgsIGJZKSB7XG4gICAgcmV0dXJuIGFYICogYlggKyBhWSAqIGJZO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q2lyY2xlUG9pbnRzKG9yaWdpblgsIG9yaWdpblksIHJhZGl1cywgY291bnQsIHN0YXJ0LCBDbGFzcykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHN0YXJ0ID0gLU1hdGguUEkgLyAyO1xuICAgIH1cblxuICAgIGNvbnN0IHBvaW50cyA9IFtdLFxuICAgICAgICBjaXJjID0gTWF0aC5QSSAqIDIsXG4gICAgICAgIGluY3IgPSBjaXJjIC8gY291bnQ7XG5cbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBjaXJjICsgc3RhcnQ7IGkgKz0gaW5jcikge1xuICAgICAgICBjb25zdCBvYiA9IHR5cGVvZiBDbGFzcyA9PT0gJ3VuZGVmaW5lZCcgPyB7fSA6IG5ldyBDbGFzcygpO1xuICAgICAgICBvYi54ID0gb3JpZ2luWCArIHJhZGl1cyAqIE1hdGguY29zKGkpO1xuICAgICAgICBvYi55ID0gb3JpZ2luWSArIHJhZGl1cyAqIE1hdGguc2luKGkpO1xuICAgICAgICBwb2ludHMucHVzaChvYik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvaW50cztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEludGVyc2VjdGlvbkFyZWEoYVgsIGFZLCBhVywgYUgsIGJYLCBiWSwgYlcsIGJIKSB7XG4gICAgY29uc3Qgb3ZlcmxhcFggPSBNYXRoLm1heCgwLCBNYXRoLm1pbihhWCArIGFXLCBiWCArIGJXKSAtIE1hdGgubWF4KGFYLCBiWCkpO1xuICAgIGNvbnN0IG92ZXJsYXBZID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oYVkgKyBhSCwgYlkgKyBiSCkgLSBNYXRoLm1heChhWSwgYlkpKTtcbiAgICByZXR1cm4gb3ZlcmxhcFggKiBvdmVybGFwWTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE92ZXJsYXBYKGFYLCBhVywgYlgsIGJXKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKGFYICsgYVcsIGJYICsgYlcpIC0gTWF0aC5tYXgoYVgsIGJYKSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPdmVybGFwWShhWSwgYUgsIGJZLCBiSCkge1xuICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihhWSArIGFILCBiWSArIGJIKSAtIE1hdGgubWF4KGFZLCBiWSkpO1xufVxuIiwiaW1wb3J0IGFuZ2xlIGZyb20gJy4vYW5nbGUnO1xuaW1wb3J0IGNlcnAgZnJvbSAnLi9jZXJwJztcbmltcG9ydCBjaXJjbGVEaXN0cmlidXRpb24gZnJvbSAnLi9jaXJjbGVEaXN0cmlidXRpb24nO1xuaW1wb3J0IGNsYW1wIGZyb20gJy4vY2xhbXAnO1xuaW1wb3J0IGNvaW5Ub3NzIGZyb20gJy4vY29pblRvc3MnO1xuaW1wb3J0IGNyb3NzUHJvZHVjdDJkIGZyb20gJy4vY3Jvc3NQcm9kdWN0MmQnO1xuaW1wb3J0IGRlZ3JlZXMgZnJvbSAnLi9kZWdyZWVzJztcbmltcG9ydCBkaWZmZXJlbmNlIGZyb20gJy4vZGlmZmVyZW5jZSc7XG5pbXBvcnQgZGlzdGFuY2UgZnJvbSAnLi9kaXN0YW5jZSc7XG5pbXBvcnQgZGlzdGFuY2VTcSBmcm9tICcuL2Rpc3RhbmNlU3EnO1xuaW1wb3J0IGRvdFByb2R1Y3QyZCBmcm9tICcuL2RvdFByb2R1Y3QyZCc7XG5pbXBvcnQgZ2V0Q2lyY2xlUG9pbnRzIGZyb20gJy4vZ2V0Q2lyY2xlUG9pbnRzJztcbmltcG9ydCBnZXRJbnRlcnNlY3Rpb25BcmVhIGZyb20gJy4vZ2V0SW50ZXJzZWN0aW9uQXJlYSc7XG5pbXBvcnQgZ2V0T3ZlcmxhcFggZnJvbSAnLi9nZXRPdmVybGFwWCc7XG5pbXBvcnQgZ2V0T3ZlcmxhcFkgZnJvbSAnLi9nZXRPdmVybGFwWSc7XG5pbXBvcnQgbGVycCBmcm9tICcuL2xlcnAnO1xuaW1wb3J0IG1hcCBmcm9tICcuL21hcCc7XG5pbXBvcnQgbm9ybWFsaXplIGZyb20gJy4vbm9ybWFsaXplJztcbmltcG9ydCBvcmllbnRhdGlvbiBmcm9tICcuL29yaWVudGF0aW9uJztcbmltcG9ydCBwZXJjZW50UmVtYWluaW5nIGZyb20gJy4vcGVyY2VudFJlbWFpbmluZyc7XG5pbXBvcnQgcGVyc3BlY3RpdmUgZnJvbSAnLi9wZXJzcGVjdGl2ZSc7XG5pbXBvcnQgcXVhZHJhdGljQ3VydmUgZnJvbSAnLi9xdWFkcmF0aWNDdXJ2ZSc7XG5pbXBvcnQgcmFkaWFucyBmcm9tICcuL3JhZGlhbnMnO1xuaW1wb3J0IHJhbmRvbSBmcm9tICcuL3JhbmRvbSc7XG5pbXBvcnQgcmFuZG9tSW50IGZyb20gJy4vcmFuZG9tSW50JztcbmltcG9ydCByYW5kb21TaWduIGZyb20gJy4vcmFuZG9tU2lnbic7XG5pbXBvcnQgcm90YXRlUG9pbnQgZnJvbSAnLi9yb3RhdGVQb2ludCc7XG5pbXBvcnQgcm90YXRlVG9EZWcgZnJvbSAnLi9yb3RhdGVUb0RlZyc7XG5pbXBvcnQgcm90YXRlVG9SYWQgZnJvbSAnLi9yb3RhdGVUb1JhZCc7XG5pbXBvcnQgcm91bmRUbyBmcm9tICcuL3JvdW5kVG8nO1xuaW1wb3J0IHJvdW5kVG9OZWFyZXN0IGZyb20gJy4vcm91bmRUb05lYXJlc3QnO1xuaW1wb3J0IHNpemUgZnJvbSAnLi9zaXplJztcbmltcG9ydCBzbWVycCBmcm9tICcuL3NtZXJwJztcbmltcG9ydCBzbW9vdGhzdGVwIGZyb20gJy4vc21vb3Roc3RlcCc7XG5pbXBvcnQgc3BsaXRWYWx1ZUFuZFVuaXQgZnJvbSAnLi9zcGxpdFZhbHVlQW5kVW5pdCc7XG5pbXBvcnQgd2VpZ2h0ZWRBdmVyYWdlIGZyb20gJy4vd2VpZ2h0ZWRBdmVyYWdlJztcbmltcG9ydCB3ZWlnaHRlZERpc3RyaWJ1dGlvbiBmcm9tICcuL3dlaWdodGVkRGlzdHJpYnV0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFuZ2xlLFxuICAgIGNlcnAsXG4gICAgY2lyY2xlRGlzdHJpYnV0aW9uLFxuICAgIGNsYW1wLFxuICAgIGNvaW5Ub3NzLFxuICAgIGNyb3NzUHJvZHVjdDJkLFxuICAgIGRlZ3JlZXMsXG4gICAgZGlmZmVyZW5jZSxcbiAgICBkaXN0YW5jZSxcbiAgICBkaXN0YW5jZVNxLFxuICAgIGRvdFByb2R1Y3QyZCxcbiAgICBnZXRDaXJjbGVQb2ludHMsXG4gICAgZ2V0SW50ZXJzZWN0aW9uQXJlYSxcbiAgICBnZXRPdmVybGFwWCxcbiAgICBnZXRPdmVybGFwWSxcbiAgICBsZXJwLFxuICAgIG1hcCxcbiAgICBub3JtYWxpemUsXG4gICAgb3JpZW50YXRpb24sXG4gICAgcGVyY2VudFJlbWFpbmluZyxcbiAgICBwZXJzcGVjdGl2ZSxcbiAgICBxdWFkcmF0aWNDdXJ2ZSxcbiAgICByYWRpYW5zLFxuICAgIHJhbmRvbSxcbiAgICByYW5kb21JbnQsXG4gICAgcmFuZG9tU2lnbixcbiAgICByb3RhdGVQb2ludCxcbiAgICByb3RhdGVUb0RlZyxcbiAgICByb3RhdGVUb1JhZCxcbiAgICByb3VuZFRvLFxuICAgIHJvdW5kVG9OZWFyZXN0LFxuICAgIHNtZXJwLFxuICAgIHNtb290aHN0ZXAsXG4gICAgc2l6ZSxcbiAgICBzcGxpdFZhbHVlQW5kVW5pdCxcbiAgICB3ZWlnaHRlZEF2ZXJhZ2UsXG4gICAgd2VpZ2h0ZWREaXN0cmlidXRpb25cbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsZXJwKGZyb20sIHRvLCB3ZWlnaHQgPSAwLjMpIHtcbiAgICByZXR1cm4gZnJvbSArICh0byAtIGZyb20pICogd2VpZ2h0O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFwKHYsIGEsIGIsIHgsIHkpIHtcbiAgICAvLyB2YWx1ZSwgbWluIGV4cGVjdGVkLCBtYXggZXhwZWN0ZWQsIG1hcCBtaW4sIG1hcCBtYXhcbiAgICAvLyBlLmcuIG1hcCBzb21lIHZhbHVlIGJldHdlZW4gMCB0byAxMDAgdG8gLTUwIHRvIDUwXG4gICAgLy8gbWFwKDUwLCAwLCAxMDAsIC01MCwgNTApIC8vIDBcbiAgICAvLyBtYXAoMjUsIDAsIDEwMCwgLTUwLCA1MCkgLy8gLTI1XG4gICAgcmV0dXJuICh2ID09PSBhKSA/IHggOiAodiAtIGEpICogKHkgLSB4KSAvIChiIC0gYSkgKyB4O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm9ybWFsaXplKHZhbHVlLCBtaW4sIG1heCkge1xuICAgIHJldHVybiAodmFsdWUgLSBtaW4pIC8gKG1heCAtIG1pbik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvcmllbnRhdGlvbih4LCB5KSB7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIoeSwgeCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwZXJjZW50UmVtYWluaW5nKHZhbHVlLCB0b3RhbCkge1xuICAgIHJldHVybiAodmFsdWUgJSB0b3RhbCkgLyB0b3RhbDtcbn1cbiIsIi8vIHggPSB4ICogcGVyc3BlY3RpdmVcbi8vIHkgPSB5ICogcGVyc3BlY3RpdmVcbi8vIHNjYWxlID0gcGVyc3BlY3RpdmVcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGVyc3BlY3RpdmUoeiwgZm9jYWxMZW5ndGggPSAzMDApIHtcbiAgICByZXR1cm4gZm9jYWxMZW5ndGggLyAoZm9jYWxMZW5ndGggKyB6KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHF1YWRyYXRpY0N1cnZlKGZyb21YLCBmcm9tWSwgY3BYLCBjcFksIHRvWCwgdG9ZLCBnb1Rocm91Z2hDUCA9IGZhbHNlKSB7XG4gICAgY29uc3QgbiA9IDIwO1xuICAgIGNvbnN0IHBvaW50cyA9IFtmcm9tWCwgZnJvbVldO1xuICAgIGxldCB4YSA9IDA7XG4gICAgbGV0IHlhID0gMDtcblxuICAgIGlmIChnb1Rocm91Z2hDUCkge1xuICAgICAgICBjcFggPSBjcFggKiAyIC0gKGZyb21YICsgdG9YKSAvIDI7XG4gICAgICAgIGNwWSA9IGNwWSAqIDIgLSAoZnJvbVkgKyB0b1kpIC8gMjtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBuOyArK2kpIHtcbiAgICAgICAgY29uc3QgaiA9IGkgLyBuO1xuXG4gICAgICAgIHhhID0gZnJvbVggKyAoKGNwWCAtIGZyb21YKSAqIGopO1xuICAgICAgICB5YSA9IGZyb21ZICsgKChjcFkgLSBmcm9tWSkgKiBqKTtcblxuICAgICAgICBwb2ludHMucHVzaCh4YSArICgoKGNwWCArICgodG9YIC0gY3BYKSAqIGopKSAtIHhhKSAqIGopLCB5YSArICgoKGNwWSArICgodG9ZIC0gY3BZKSAqIGopKSAtIHlhKSAqIGopKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9pbnRzO1xufVxuIiwiY29uc3QgUkFEID0gTWF0aC5QSSAvIDE4MDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmFkaWFucyhkZWdyZWVzKSB7XG4gICAgcmV0dXJuIGRlZ3JlZXMgKiBSQUQ7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5kb20obWluLCBtYXgpIHtcbiAgICBpZiAoaXNOYU4obWF4KSkge1xuICAgICAgICBtYXggPSBtaW47XG4gICAgICAgIG1pbiA9IDA7XG4gICAgfVxuICAgIHJldHVybiBtaW4gKyBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5kb21JbnQobWluLCBtYXgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihtaW4gKyBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbVNpZ24oKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgPiAwLjUgPyAtMSA6IDE7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3RhdGVQb2ludChwLCB0aGV0YSwgb3JpZ2luID0ge3g6IDAsIHk6IDB9LCBwMSA9IHt4OiAwLCB5OiAwfSkge1xuICAgIGNvbnN0IHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIGNvbnN0IGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHAxLnggPSAocC54IC0gb3JpZ2luLngpICogY29zVGhldGEgLSAocC55IC0gb3JpZ2luLnkpICogc2luVGhldGE7XG4gICAgcDEueSA9IChwLnggLSBvcmlnaW4ueCkgKiBzaW5UaGV0YSArIChwLnkgLSBvcmlnaW4ueSkgKiBjb3NUaGV0YTtcbiAgICBwMS54ICs9IG9yaWdpbi54O1xuICAgIHAxLnkgKz0gb3JpZ2luLnk7XG4gICAgcmV0dXJuIHAxO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm90YXRlVG9EZWcoc3RhcnQsIGVuZCkge1xuICAgIGxldCBkaWZmID0gKGVuZCAtIHN0YXJ0KSAlIDM2MDtcbiAgICBpZiAoZGlmZiAhPT0gZGlmZiAlIDE4MCkge1xuICAgICAgICBkaWZmID0gKGRpZmYgPCAwKSA/IGRpZmYgKyAzNjAgOiBkaWZmIC0gMzYwO1xuICAgIH1cbiAgICByZXR1cm4gc3RhcnQgKyBkaWZmO1xufVxuIiwiY29uc3QgUEkyID0gTWF0aC5QSSAqIDI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJvdGF0ZVRvUkFEKHN0YXJ0LCBlbmQpIHtcbiAgICBsZXQgZGlmZiA9IChlbmQgLSBzdGFydCkgJSBQSTI7XG4gICAgaWYgKGRpZmYgIT09IGRpZmYgJSBNYXRoLlBJKSB7XG4gICAgICAgIGRpZmYgPSBkaWZmIDwgMCA/IGRpZmYgKyBQSTIgOiBkaWZmIC0gUEkyO1xuICAgIH1cbiAgICByZXR1cm4gc3RhcnQgKyBkaWZmO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm91bmRUbyh4LCBwbGFjZXMgPSAyKSB7XG4gICAgY29uc3QgZGl2ID0gTWF0aC5wb3coMTAsIHBsYWNlcyk7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoeCAqIGRpdikgLyBkaXY7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByb3VuZFRvTmVhcmVzdCh2YWx1ZSwgdW5pdCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlIC8gdW5pdCkgKiB1bml0O1xufVxuIiwiZnVuY3Rpb24gZ2V0U2NhbGUobWV0aG9kLCB3aWR0aCwgaGVpZ2h0LCBhcmVhV2lkdGgsIGFyZWFIZWlnaHQpIHtcbiAgICBzd2l0Y2ggKG1ldGhvZCkge1xuICAgICAgICBjYXNlICdjb3Zlcic6XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoYXJlYVdpZHRoIC8gd2lkdGgsIGFyZWFIZWlnaHQgLyBoZWlnaHQpO1xuICAgICAgICBjYXNlICdjb250YWluJzpcbiAgICAgICAgICAgIHJldHVybiBNYXRoLm1pbihhcmVhV2lkdGggLyB3aWR0aCwgYXJlYUhlaWdodCAvIGhlaWdodCk7XG4gICAgICAgIGNhc2UgJ3dpZHRoJzpcbiAgICAgICAgICAgIHJldHVybiBhcmVhV2lkdGggLyB3aWR0aDtcbiAgICAgICAgY2FzZSAnaGVpZ2h0JzpcbiAgICAgICAgICAgIHJldHVybiBhcmVhSGVpZ2h0IC8gaGVpZ2h0O1xuICAgICAgICBkZWZhdWx0OiBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIDE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNpemUocmVjdCwgYXJlYVdpZHRoLCBhcmVhSGVpZ2h0LCBtZXRob2QgPSAnY292ZXInLCBhdXRvQ2VudGVyID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNjYWxlID0gZ2V0U2NhbGUobWV0aG9kLCByZWN0LndpZHRoLCByZWN0LmhlaWdodCwgYXJlYVdpZHRoLCBhcmVhSGVpZ2h0KTtcbiAgICBjb25zdCB3aWR0aCA9IE1hdGguY2VpbChyZWN0LndpZHRoICogc2NhbGUpO1xuICAgIGNvbnN0IGhlaWdodCA9IE1hdGguY2VpbChyZWN0LmhlaWdodCAqIHNjYWxlKTtcblxuICAgIGxldCB4ID0gMCwgeSA9IDA7XG5cbiAgICBpZiAoYXV0b0NlbnRlcikge1xuICAgICAgICB4ID0gTWF0aC5yb3VuZCgoYXJlYVdpZHRoIC0gd2lkdGgpICogMC41KTtcbiAgICAgICAgeSA9IE1hdGgucm91bmQoKGFyZWFIZWlnaHQgLSBoZWlnaHQpICogMC41KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICBzY2FsZVxuICAgIH07XG59XG4iLCJpbXBvcnQgc21vb3Roc3RlcCBmcm9tICcuL3Ntb290aHN0ZXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzbWVycChmcm9tLCB0bywgc3RhcnRUaW1lLCBlbmRUaW1lLCB0aW1lKSB7XG4gICAgcmV0dXJuIGZyb20gKyAodG8gLSBmcm9tKSAqIHNtb290aHN0ZXAoc3RhcnRUaW1lLCBlbmRUaW1lLCB0aW1lKTtcbn1cbiIsImltcG9ydCBjbGFtcCBmcm9tICcuL2NsYW1wJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc21vb3Roc3RlcChtaW4sIG1heCwgdmFsdWUpIHtcbiAgICBjb25zdCB4ID0gY2xhbXAoKHZhbHVlIC0gbWluKSAvIChtYXggLSBtaW4pLCAwLCAxKTtcbiAgICByZXR1cm4geCAqIHggKiAoMyAtIDIgKiB4KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNwbGl0VmFsdWVBbmRVbml0KHByb3ApIHtcbiAgICBjb25zdCByZSA9IC8oXi0/XFxkKlxcLj9cXGQqKSguKikvO1xuICAgIGNvbnN0IG1hdGNoID0gcHJvcC5tYXRjaChyZSk7XG4gICAgY29uc3QgdmFsdWUgPSBOdW1iZXIobWF0Y2hbMV0pO1xuICAgIGNvbnN0IHVuaXQgPSBtYXRjaFsyXTtcbiAgICByZXR1cm4ge3ZhbHVlLCB1bml0fTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdlaWdodGVkQXZlcmFnZShmcm9tLCB0bywgd2VpZ2h0ID0gMTApIHtcbiAgICByZXR1cm4gKChmcm9tICogKHdlaWdodCAtIDEpKSArIHRvKSAvIHdlaWdodDtcbn1cbiIsImltcG9ydCByYW5kb20gZnJvbSAnLi9yYW5kb20nO1xuXG4vLyBncmVhdGVyIHByb2JhYmlsaXR5IG9mIGJlaW5nIGhhbGZ3YXkgYmV0d2VlZW4gbWluIGFuZCBtYXhcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2VpZ2h0ZWREaXN0cmlidXRpb24obWluLCBtYXgsIHdlaWdodCA9IDUpIHtcbiAgICBsZXQgdG90YWwgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2VpZ2h0OyBpKyspIHtcbiAgICAgICAgdG90YWwgKz0gcmFuZG9tKG1pbiwgbWF4KTtcbiAgICB9XG4gICAgcmV0dXJuIHRvdGFsIC8gd2VpZ2h0O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3VlcG9pbnRzUmVhZGVyKCkge1xuICAgIGNvbnN0IGxpc3QgPSBbXTtcbiAgICBsZXQgcmVhZGVyO1xuICAgIGxldCBkaXNwYXRjaDtcbiAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gMDtcbiAgICBsZXQgbGFzdFBvc2l0aW9uID0gLTE7XG4gICAgbGV0IHRvbGVyYW5jZSA9IDAuMjtcblxuICAgIGZ1bmN0aW9uIGFkZChwb3NpdGlvbiwgbmFtZSwgZGF0YSkge1xuICAgICAgICBsaXN0LnB1c2goe3Bvc2l0aW9uLCBuYW1lLCBkYXRhfSk7XG5cbiAgICAgICAgbGlzdC5zb3J0KChhLCBiKSA9PiBhLnBvc2l0aW9uIC0gYi5wb3NpdGlvbik7XG5cbiAgICAgICAgcmV0dXJuIHJlYWRlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkN1ZXBvaW50KGZuLCB0aGlzQXJnKSB7XG4gICAgICAgIGlmIChmbikge1xuICAgICAgICAgICAgZGlzcGF0Y2ggPSB0aGlzQXJnID8gZm4uYmluZCh0aGlzQXJnKSA6IGZuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGlzcGF0Y2ggPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWFkZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgIGN1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgICAgIGxhc3RQb3NpdGlvbiA9IC0xO1xuICAgICAgICByZXR1cm4gcmVhZGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbCgpIHtcbiAgICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgICByZXR1cm4gcmVzZXQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRUb2xlcmFuY2UodmFsdWUpIHtcbiAgICAgICAgdG9sZXJhbmNlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiByZWFkZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5SYW5nZShjdWVwb2ludFBvcywgY3VycmVudFBvcywgbGFzdFBvcykge1xuICAgICAgICBpZiAoY3VlcG9pbnRQb3MgPiBjdXJyZW50UG9zKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1ZXBvaW50UG9zIDw9IGxhc3RQb3MpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkaWZmID0gY3VlcG9pbnRQb3MgLSBjdXJyZW50UG9zO1xuICAgICAgICBpZiAoZGlmZiA8IDApIHtcbiAgICAgICAgICAgIGRpZmYgPSAtZGlmZjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGlmZiA8PSB0b2xlcmFuY2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2soY3VycmVudFBvcywgbGFzdFBvcykge1xuICAgICAgICBpZiAoY3VycmVudFBvcyA8PSBsYXN0UG9zKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkaXNwYXRjaCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGlzdC5zb21lKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5SYW5nZShpdGVtLnBvc2l0aW9uLCBjdXJyZW50UG9zLCBsYXN0UG9zKSkge1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGUocG9zaXRpb24pIHtcbiAgICAgICAgY3VycmVudFBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIGNoZWNrKGN1cnJlbnRQb3NpdGlvbiwgbGFzdFBvc2l0aW9uKTtcbiAgICAgICAgbGFzdFBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICByZXR1cm4gcmVhZGVyO1xuICAgIH1cblxuICAgIHJlYWRlciA9IE9iamVjdC5mcmVlemUoe1xuICAgICAgICBhZGQsXG4gICAgICAgIG9uQ3VlcG9pbnQsXG4gICAgICAgIHJlbW92ZUFsbCxcbiAgICAgICAgcmVzZXQsXG4gICAgICAgIHNldFRvbGVyYW5jZSxcbiAgICAgICAgdXBkYXRlXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVhZGVyO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaU9TUGxheVZpZGVvSW5saW5lKGVsLCBsb29wID0gdHJ1ZSkge1xuICAgIGNvbnN0IGZyYW1lVGltZSA9IDEgLyAyNTtcblxuICAgIGxldCBzZWxmLFxuICAgICAgICBsYXN0VGltZSA9IDAsXG4gICAgICAgIHBsYXlpbmcgPSBmYWxzZTtcblxuICAgIC8vIFRoaXMgY2FuIChhbmQgc2hvdWxkKSBiZSBwdXQgaW4gYSBjc3MgZmlsZSBpbnN0ZWFkIG9mIGRvaW5nIHN0eWxlU2hlZXRzWzBdLmluc2VydFJ1bGU6XG4gICAgY29uc3QgY3NzUnVsZSA9ICcuaU9TUGxheVZpZGVvSW5saW5lOjotd2Via2l0LW1lZGlhLWNvbnRyb2xzIHsgZGlzcGxheTpub25lICFpbXBvcnRhbnQ7IH0nO1xuICAgIGRvY3VtZW50LnN0eWxlU2hlZXRzWzBdLmluc2VydFJ1bGUoY3NzUnVsZSwgMCk7XG5cbiAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ2NvbnRyb2xzJyk7XG4gICAgZWwuY2xhc3NMaXN0LmFkZCgnaU9TUGxheVZpZGVvSW5saW5lJyk7XG5cblxuICAgIGZ1bmN0aW9uIHNlZWsodGltZSkge1xuICAgICAgICBlbC5jdXJyZW50VGltZSA9IHRpbWU7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgICAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUZyYW1lKCkge1xuICAgICAgICBpZiAoIXBsYXlpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlRnJhbWUpO1xuXG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRlbHRhVGltZSA9IG5vdyAtIGxhc3RUaW1lO1xuXG4gICAgICAgIGlmIChkZWx0YVRpbWUgPj0gZnJhbWVUaW1lICogMTAwMCkge1xuICAgICAgICAgICAgbGFzdFRpbWUgPSBub3c7XG5cbiAgICAgICAgICAgIGNvbnN0IGVuZGVkID0gZWwuY3VycmVudFRpbWUgKyBmcmFtZVRpbWUgPj0gZWwuZHVyYXRpb247XG5cbiAgICAgICAgICAgIGlmIChlbmRlZCAmJiBsb29wKSB7XG4gICAgICAgICAgICAgICAgc2VlaygwKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW5kZWQpIHtcbiAgICAgICAgICAgICAgICBwYXVzZSgpO1xuICAgICAgICAgICAgICAgIC8vIHNlbGYuZW1pdCgnZW5kZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VlayhlbC5jdXJyZW50VGltZSArIGZyYW1lVGltZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNlbGYuZW1pdCgndGltZXVwZGF0ZScsIGVsLmN1cnJlbnRUaW1lLCBzZWxmKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgICAgIHBsYXlpbmcgPSB0cnVlO1xuICAgICAgICB1cGRhdGVGcmFtZSgpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAvLyBzZWxmLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICBwYXVzZSgpO1xuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodXBkYXRlRnJhbWUpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cblxuICAgIC8vIHNlbGYgPSBPYmplY3QuY3JlYXRlKEVtaXR0ZXIucHJvdG90eXBlLCB7XG4gICAgc2VsZiA9IE9iamVjdC5jcmVhdGUobnVsbCwge1xuICAgICAgICBfZXZlbnRzOiB7XG4gICAgICAgICAgICB2YWx1ZToge31cbiAgICAgICAgfSxcbiAgICAgICAgZGVzdHJveToge1xuICAgICAgICAgICAgdmFsdWU6IGRlc3Ryb3lcbiAgICAgICAgfSxcbiAgICAgICAgcGF1c2U6IHtcbiAgICAgICAgICAgIHZhbHVlOiBwYXVzZVxuICAgICAgICB9LFxuICAgICAgICBwbGF5OiB7XG4gICAgICAgICAgICB2YWx1ZTogcGxheVxuICAgICAgICB9LFxuICAgICAgICBzZWVrOiB7XG4gICAgICAgICAgICB2YWx1ZTogc2Vla1xuICAgICAgICB9LFxuICAgICAgICBlbDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGN1cnJlbnRUaW1lOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5jdXJyZW50VGltZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZHVyYXRpb246IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsLmR1cmF0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBsb29wOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsb29wO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsb29wID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHBsYXlpbmc6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYXlpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHNlbGYpO1xufVxuIiwiaW1wb3J0IGN1ZXBvaW50c1JlYWRlciBmcm9tICcuL2N1ZXBvaW50c1JlYWRlcic7XG5pbXBvcnQgaU9TUGxheVZpZGVvSW5saW5lIGZyb20gJy4vaU9TUGxheVZpZGVvSW5saW5lJztcbmltcG9ydCB2aWRlb1BsYXllciBmcm9tICcuL3ZpZGVvUGxheWVyJztcbmltcG9ydCB2aW1lbyBmcm9tICcuL3ZpbWVvJztcbmltcG9ydCB5b3V0dWJlIGZyb20gJy4veW91dHViZSc7XG5pbXBvcnQgeW91dHViZUJhc2ljIGZyb20gJy4veW91dHViZUJhc2ljJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGN1ZXBvaW50c1JlYWRlcixcbiAgICBpT1NQbGF5VmlkZW9JbmxpbmUsXG4gICAgdmlkZW9QbGF5ZXIsXG4gICAgdmltZW8sXG4gICAgeW91dHViZSxcbiAgICB5b3V0dWJlQmFzaWNcbn07XG4iLCJpbXBvcnQgZW1pdHRlciBmcm9tICcuLi9ldmVudHMvZW1pdHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZpZGVvUGxheWVyKHZpZGVvRWwpIHtcbiAgICBsZXQgZWwgPSB2aWRlb0VsIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgbGV0IHBsYXllcjtcblxuICAgIGZ1bmN0aW9uIG1ldGFkYXRhSGFuZGxlcigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ21ldGFkYXRhJywge1xuICAgICAgICAgICAgc3JjOiBlbC5jdXJyZW50U3JjLFxuICAgICAgICAgICAgd2lkdGg6IGVsLnZpZGVvV2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGVsLnZpZGVvSGVpZ2h0LFxuICAgICAgICAgICAgZHVyYXRpb246IGVsLmR1cmF0aW9uXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbnBsYXlIYW5kbGVyKCkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgncmVhZHknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5SGFuZGxlcigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3BsYXknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRlZEhhbmRsZXIoKSB7XG4gICAgICAgIHBsYXllci5lbWl0KCdlbmRlZCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVycm9ySGFuZGxlcigpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ2Vycm9yJywgZWwuZXJyb3IpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRpbWV1cGRhdGVIYW5kbGVyKCkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgndGltZXVwZGF0ZScsIGVsLmN1cnJlbnRUaW1lKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCBtZXRhZGF0YUhhbmRsZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIGNhbnBsYXlIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigncGxheScsIHBsYXlIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigncGxheWluZycsIHBsYXlIYW5kbGVyKTtcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvckhhbmRsZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdlbmRlZCcsIGVuZGVkSGFuZGxlcik7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCB0aW1ldXBkYXRlSGFuZGxlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCBtZXRhZGF0YUhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCBjYW5wbGF5SGFuZGxlciwgZmFsc2UpO1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgcGxheUhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigncGxheWluZycsIHBsYXlIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgZW5kZWRIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCB0aW1ldXBkYXRlSGFuZGxlciwgZmFsc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIHBsYXllci5vZmYoKTtcbiAgICAgICAgZWwucGF1c2UoKTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgICByZW1vdmVFdmVudExpc3RlbmVycygpO1xuXG4gICAgICAgIGlmIChlbC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICBlbC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsID0gbnVsbDtcblxuICAgICAgICByZXR1cm4gcGxheWVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJsb2JVUkwodXJsKSB7XG4gICAgICAgIHVybCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKHVybCk7XG4gICAgICAgIGZ1bmN0aW9uIHJldm9rZSgpIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgcmV2b2tlKTtcbiAgICAgICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgICAgIH1cbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCByZXZva2UpO1xuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWQodXJsKSB7XG4gICAgICAgIGlmICh3aW5kb3cuQmxvYiAmJiB1cmwgaW5zdGFuY2VvZiB3aW5kb3cuQmxvYikge1xuICAgICAgICAgICAgdXJsID0gZ2V0QmxvYlVSTCh1cmwpO1xuICAgICAgICB9XG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAgICAgZWwuY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJztcbiAgICAgICAgZWwucHJlbG9hZCA9ICdhdXRvJztcbiAgICAgICAgZWwuc3JjID0gdXJsO1xuICAgICAgICBlbC5sb2FkKCk7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5KCkge1xuICAgICAgICBlbC5wbGF5KCk7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICAgICAgZWwucGF1c2UoKTtcblxuICAgICAgICByZXR1cm4gcGxheWVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNlZWsodGltZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZWwuY3VycmVudFRpbWUgPSB0aW1lO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICAgIHJldHVybiBwbGF5ZXI7XG4gICAgfVxuXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgIHBsYXllciA9IE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUsIHtcbiAgICAgICAgX2V2ZW50czoge1xuICAgICAgICAgICAgdmFsdWU6IHt9XG4gICAgICAgIH0sXG4gICAgICAgIGRlc3Ryb3k6IHtcbiAgICAgICAgICAgIHZhbHVlOiBkZXN0cm95XG4gICAgICAgIH0sXG4gICAgICAgIGxvYWQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBsb2FkXG4gICAgICAgIH0sXG4gICAgICAgIHBhdXNlOiB7XG4gICAgICAgICAgICB2YWx1ZTogcGF1c2VcbiAgICAgICAgfSxcbiAgICAgICAgcGxheToge1xuICAgICAgICAgICAgdmFsdWU6IHBsYXlcbiAgICAgICAgfSxcbiAgICAgICAgc2Vlazoge1xuICAgICAgICAgICAgdmFsdWU6IHNlZWtcbiAgICAgICAgfSxcbiAgICAgICAgZWw6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjdXJyZW50VGltZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWwuY3VycmVudFRpbWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGVsLmN1cnJlbnRUaW1lID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGR1cmF0aW9uOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC5kdXJhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdm9sdW1lOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbC52b2x1bWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGVsLnZvbHVtZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZShwbGF5ZXIpO1xufVxuIiwiaW1wb3J0IGVtaXR0ZXIgZnJvbSAnLi4vZXZlbnRzL2VtaXR0ZXInO1xuXG4vLyBodHRwczovL2RldmVsb3Blci52aW1lby5jb20vcGxheWVyL2pzLWFwaVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2aW1lbyhlbCkge1xuICAgIGNvbnN0IHZpbWVvUGxheWVyID0gZWwuY29udGVudFdpbmRvdztcbiAgICBjb25zdCByZSA9IC9eaHR0cHM/OlxcL1xcL3BsYXllci52aW1lby5jb20vO1xuICAgIGxldCBwbGF5ZXIsIG9yaWdpbiA9ICcqJywgcGF1c2VkID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBzZW5kQ29tbWFuZChtZXRob2QsIHZhbHVlID0gJycpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIG1ldGhvZFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgZGF0YS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgICB2aW1lb1BsYXllci5wb3N0TWVzc2FnZShtZXNzYWdlLCBvcmlnaW4pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgICAgIHBhdXNlZCA9IGZhbHNlO1xuICAgICAgICBzZW5kQ29tbWFuZCgncGxheScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgICAgICBwYXVzZWQgPSB0cnVlO1xuICAgICAgICBzZW5kQ29tbWFuZCgncGF1c2UnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblJlYWR5KCkge1xuICAgICAgICBzZW5kQ29tbWFuZCgnYWRkRXZlbnRMaXN0ZW5lcicsICdwbGF5Jyk7XG4gICAgICAgIHNlbmRDb21tYW5kKCdhZGRFdmVudExpc3RlbmVyJywgJ3BhdXNlJyk7XG4gICAgICAgIHNlbmRDb21tYW5kKCdhZGRFdmVudExpc3RlbmVyJywgJ2ZpbmlzaCcpO1xuICAgICAgICBzZW5kQ29tbWFuZCgnYWRkRXZlbnRMaXN0ZW5lcicsICdwbGF5UHJvZ3Jlc3MnKTtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3JlYWR5Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QbGF5KCkge1xuICAgICAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgcGxheWVyLmVtaXQoJ3BsYXknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblBhdXNlKCkge1xuICAgICAgICBwYXVzZWQgPSB0cnVlO1xuICAgICAgICBwbGF5ZXIuZW1pdCgncGF1c2UnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZpbmlzaCgpIHtcbiAgICAgICAgcGxheWVyLmVtaXQoJ2VuZGVkJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QbGF5UHJvZ3Jlc3MoZGF0YSkge1xuICAgICAgICBwbGF5ZXIuZW1pdCgndGltZXVwZGF0ZScsIGRhdGEuc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25NZXNzYWdlKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGlzVmltZW8gPSByZS50ZXN0KGV2ZW50Lm9yaWdpbik7XG5cbiAgICAgICAgaWYgKCFpc1ZpbWVvKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcblxuICAgICAgICBpZiAoZGF0YS5wbGF5ZXJfaWQgJiYgZWwuaWQgIT09IGRhdGEucGxheWVyX2lkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3JpZ2luID09PSAnKicpIHtcbiAgICAgICAgICAgIG9yaWdpbiA9IGV2ZW50Lm9yaWdpbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZGF0YS5ldmVudCkge1xuICAgICAgICAgICAgY2FzZSAncmVhZHknOlxuICAgICAgICAgICAgICAgIG9uUmVhZHkoZGF0YS5wbGF5ZXJfaWQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncGxheVByb2dyZXNzJzpcbiAgICAgICAgICAgICAgICBvblBsYXlQcm9ncmVzcyhkYXRhLmRhdGEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncGxheSc6XG4gICAgICAgICAgICAgICAgb25QbGF5KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdwYXVzZSc6XG4gICAgICAgICAgICAgICAgb25QYXVzZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZmluaXNoJzpcbiAgICAgICAgICAgICAgICBvbkZpbmlzaCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgb25NZXNzYWdlKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG9uTWVzc2FnZSk7XG5cbiAgICBwbGF5ZXIgPSBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUoZW1pdHRlci5wcm90b3R5cGUpLCB7XG4gICAgICAgIF9ldmVudHM6IHt9LFxuICAgICAgICBwbGF5LFxuICAgICAgICBwYXVzZSxcbiAgICAgICAgcGF1c2VkOiAoKSA9PiBwYXVzZWQsXG4gICAgICAgIGRlc3Ryb3lcbiAgICB9KTtcblxuICAgIHJldHVybiBwbGF5ZXI7XG59XG4iLCIvLyBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS95b3V0dWJlL2lmcmFtZV9hcGlfcmVmZXJlbmNlI0V2ZW50c1xuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHlvdXR1YmUoZWwpIHtcbiAgICBsZXQgZW1pdHRlciA9IG51bGwsIHBsYXllciA9IG51bGwsIHBhdXNlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gcGxheSgpIHtcbiAgICAgICAgcGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHBsYXllci5wbGF5VmlkZW8oKTtcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGF1c2UoKSB7XG4gICAgICAgIHBhdXNlZCA9IHRydWU7XG4gICAgICAgIHBsYXllci5wYXVzZVZpZGVvKCk7XG4gICAgICAgIHJldHVybiBlbWl0dGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUmVhZHkoKSB7XG4gICAgICAgIGVtaXR0ZXIuZW1pdCgncmVhZHknKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblN0YXRlQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHtQbGF5ZXJTdGF0ZX0gPSB3aW5kb3cuWVQ7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5kYXRhKSB7XG4gICAgICAgICAgICBjYXNlIFBsYXllclN0YXRlLkNVRUQ6XG4gICAgICAgICAgICBjYXNlIFBsYXllclN0YXRlLkJVRkZFUklORzpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGxheWVyU3RhdGUuUExBWUlORzpcbiAgICAgICAgICAgICAgICBwYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoJ3BsYXknKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGxheWVyU3RhdGUuUEFVU0VEOlxuICAgICAgICAgICAgICAgIHBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KCdwYXVzZScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQbGF5ZXJTdGF0ZS5FTkRFRDpcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoJ2VuZGVkJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlc3Ryb3koKSB7fVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUGxheWVyKCkge1xuICAgICAgICBpZiAocGxheWVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwbGF5ZXIgPSBuZXcgd2luZG93LllULlBsYXllcihlbCwge1xuICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAgb25SZWFkeSxcbiAgICAgICAgICAgICAgICBvblN0YXRlQ2hhbmdlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cbiAgICBpZiAod2luZG93LllUKSB7XG4gICAgICAgIGNyZWF0ZVBsYXllcigpO1xuICAgIH0gZWxzZSBpZiAod2luZG93Lnl0UGxheWVyQ2FsbHMpIHtcbiAgICAgICAgd2luZG93Lnl0UGxheWVyQ2FsbHMucHVzaChjcmVhdGVQbGF5ZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy55dFBsYXllckNhbGxzID0gW2NyZWF0ZVBsYXllcl07XG4gICAgICAgIHdpbmRvdy5vbllvdVR1YmVJZnJhbWVBUElSZWFkeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgd2luZG93Lnl0UGxheWVyQ2FsbHMuZm9yRWFjaCgoY2FsbCkgPT4gY2FsbCgpKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHNjcmlwdC5zcmMgPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vaWZyYW1lX2FwaSc7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9XG5cbiAgICBlbWl0dGVyID0gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKEV2ZW50RW1pdHRlci5wcm90b3R5cGUpLCB7XG4gICAgICAgIF9ldmVudHM6IHt9LFxuICAgICAgICBwbGF5LFxuICAgICAgICBwYXVzZSxcbiAgICAgICAgcGF1c2VkOiAoKSA9PiBwYXVzZWQsXG4gICAgICAgIGRlc3Ryb3lcbiAgICB9KTtcblxuICAgIHJldHVybiBlbWl0dGVyO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24geW91dHViZUJhc2ljKGVsKSB7XG4gICAgY29uc3QgaWZyYW1lID0gZWwuY29udGVudFdpbmRvdztcblxuICAgIGZ1bmN0aW9uIHNlbmRDb21tYW5kKGNvbW1hbmQpIHtcbiAgICAgICAgaWZyYW1lLnBvc3RNZXNzYWdlKGB7XCJldmVudFwiOlwiY29tbWFuZFwiLFwiZnVuY1wiOlwiJHtjb21tYW5kfVwiLFwiYXJnc1wiOlwiXCJ9YCwgJyonKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGF5KCkge1xuICAgICAgICBzZW5kQ29tbWFuZCgncGxheVZpZGVvJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGF1c2UoKSB7XG4gICAgICAgIHNlbmRDb21tYW5kKCdwYXVzZVZpZGVvJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGxheSxcbiAgICAgICAgcGF1c2VcbiAgICB9O1xufVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH1cbiAgICAgIHRocm93IFR5cGVFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4nKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbnZhciBNaW5pU2lnbmFsQmluZGluZyA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE1pbmlTaWduYWxCaW5kaW5nKGZuLCBvbmNlLCB0aGlzQXJnKSB7XG4gICAgaWYgKG9uY2UgPT09IHVuZGVmaW5lZCkgb25jZSA9IGZhbHNlO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1pbmlTaWduYWxCaW5kaW5nKTtcblxuICAgIHRoaXMuX2ZuID0gZm47XG4gICAgdGhpcy5fb25jZSA9IG9uY2U7XG4gICAgdGhpcy5fdGhpc0FyZyA9IHRoaXNBcmc7XG4gICAgdGhpcy5fbmV4dCA9IHRoaXMuX3ByZXYgPSB0aGlzLl9vd25lciA9IG51bGw7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTWluaVNpZ25hbEJpbmRpbmcsIFt7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgICAgaWYgKHRoaXMuX293bmVyID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgICB0aGlzLl9vd25lci5kZXRhY2godGhpcyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gTWluaVNpZ25hbEJpbmRpbmc7XG59KSgpO1xuXG5mdW5jdGlvbiBfYWRkTWluaVNpZ25hbEJpbmRpbmcoc2VsZiwgbm9kZSkge1xuICBpZiAoIXNlbGYuX2hlYWQpIHtcbiAgICBzZWxmLl9oZWFkID0gbm9kZTtcbiAgICBzZWxmLl90YWlsID0gbm9kZTtcbiAgfSBlbHNlIHtcbiAgICBzZWxmLl90YWlsLl9uZXh0ID0gbm9kZTtcbiAgICBub2RlLl9wcmV2ID0gc2VsZi5fdGFpbDtcbiAgICBzZWxmLl90YWlsID0gbm9kZTtcbiAgfVxuXG4gIG5vZGUuX293bmVyID0gc2VsZjtcblxuICByZXR1cm4gbm9kZTtcbn1cblxudmFyIE1pbmlTaWduYWwgPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBNaW5pU2lnbmFsKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBNaW5pU2lnbmFsKTtcblxuICAgIHRoaXMuX2hlYWQgPSB0aGlzLl90YWlsID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKE1pbmlTaWduYWwsIFt7XG4gICAga2V5OiAnaGFuZGxlcnMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVycygpIHtcbiAgICAgIHZhciBleGlzdHMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IGFyZ3VtZW50c1swXTtcblxuICAgICAgdmFyIG5vZGUgPSB0aGlzLl9oZWFkO1xuXG4gICAgICBpZiAoZXhpc3RzKSByZXR1cm4gISFub2RlO1xuXG4gICAgICB2YXIgZWUgPSBbXTtcblxuICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgZWUucHVzaChub2RlKTtcbiAgICAgICAgbm9kZSA9IG5vZGUuX25leHQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBlZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdoYXMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoYXMobm9kZSkge1xuICAgICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIE1pbmlTaWduYWxCaW5kaW5nKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pbmlTaWduYWwjaGFzKCk6IEZpcnN0IGFyZyBtdXN0IGJlIGEgTWluaVNpZ25hbEJpbmRpbmcgb2JqZWN0LicpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9kZS5fb3duZXIgPT09IHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGlzcGF0Y2gnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNwYXRjaCgpIHtcbiAgICAgIHZhciBub2RlID0gdGhpcy5faGVhZDtcblxuICAgICAgaWYgKCFub2RlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIGlmIChub2RlLl9vbmNlKSB0aGlzLmRldGFjaChub2RlKTtcbiAgICAgICAgbm9kZS5fZm4uYXBwbHkobm9kZS5fdGhpc0FyZywgYXJndW1lbnRzKTtcbiAgICAgICAgbm9kZSA9IG5vZGUuX25leHQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2FkZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFkZChmbikge1xuICAgICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBudWxsIDogYXJndW1lbnRzWzFdO1xuXG4gICAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWluaVNpZ25hbCNhZGQoKTogRmlyc3QgYXJnIG11c3QgYmUgYSBGdW5jdGlvbi4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfYWRkTWluaVNpZ25hbEJpbmRpbmcodGhpcywgbmV3IE1pbmlTaWduYWxCaW5kaW5nKGZuLCBmYWxzZSwgdGhpc0FyZykpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uY2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbmNlKGZuKSB7XG4gICAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IG51bGwgOiBhcmd1bWVudHNbMV07XG5cbiAgICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaW5pU2lnbmFsI29uY2UoKTogRmlyc3QgYXJnIG11c3QgYmUgYSBGdW5jdGlvbi4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfYWRkTWluaVNpZ25hbEJpbmRpbmcodGhpcywgbmV3IE1pbmlTaWduYWxCaW5kaW5nKGZuLCB0cnVlLCB0aGlzQXJnKSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGV0YWNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGV0YWNoKG5vZGUpIHtcbiAgICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBNaW5pU2lnbmFsQmluZGluZykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaW5pU2lnbmFsI2RldGFjaCgpOiBGaXJzdCBhcmcgbXVzdCBiZSBhIE1pbmlTaWduYWxCaW5kaW5nIG9iamVjdC4nKTtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLl9vd25lciAhPT0gdGhpcykgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChub2RlLl9wcmV2KSBub2RlLl9wcmV2Ll9uZXh0ID0gbm9kZS5fbmV4dDtcbiAgICAgIGlmIChub2RlLl9uZXh0KSBub2RlLl9uZXh0Ll9wcmV2ID0gbm9kZS5fcHJldjtcblxuICAgICAgaWYgKG5vZGUgPT09IHRoaXMuX2hlYWQpIHtcbiAgICAgICAgdGhpcy5faGVhZCA9IG5vZGUuX25leHQ7XG4gICAgICAgIGlmIChub2RlLl9uZXh0ID09PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fdGFpbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobm9kZSA9PT0gdGhpcy5fdGFpbCkge1xuICAgICAgICB0aGlzLl90YWlsID0gbm9kZS5fcHJldjtcbiAgICAgICAgdGhpcy5fdGFpbC5fbmV4dCA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIG5vZGUuX293bmVyID0gbnVsbDtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2RldGFjaEFsbCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRldGFjaEFsbCgpIHtcbiAgICAgIHZhciBub2RlID0gdGhpcy5faGVhZDtcbiAgICAgIGlmICghbm9kZSkgcmV0dXJuIHRoaXM7XG5cbiAgICAgIHRoaXMuX2hlYWQgPSB0aGlzLl90YWlsID0gbnVsbDtcblxuICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgbm9kZS5fb3duZXIgPSBudWxsO1xuICAgICAgICBub2RlID0gbm9kZS5fbmV4dDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBNaW5pU2lnbmFsO1xufSkoKTtcblxuTWluaVNpZ25hbC5NaW5pU2lnbmFsQmluZGluZyA9IE1pbmlTaWduYWxCaW5kaW5nO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBNaW5pU2lnbmFsO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvYmplY3RQb29sKGZhY3RvcnlGbikge1xuXG4gICAgbGV0IHBvb2wgPSBbXTtcbiAgICBsZXQgbnVtQ3JlYXRlZCA9IDA7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRQb29sICgpIHtcbiAgICAgICAgICAgIHJldHVybiBwb29sO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgaWYgKCBwb29sLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvb2wucG9wKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG51bUNyZWF0ZWQrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFjdG9yeUZuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRpc3Bvc2UgKGluc3RhbmNlKSB7XG4gICAgICAgICAgICBwb29sLnB1c2goaW5zdGFuY2UpO1xuICAgICAgICB9LFxuICAgICAgICBmaWxsIChjb3VudCkge1xuICAgICAgICAgICAgd2hpbGUgKCBwb29sLmxlbmd0aCA8IGNvdW50ICkge1xuICAgICAgICAgICAgICAgIG51bUNyZWF0ZWQrKztcbiAgICAgICAgICAgICAgICBwb29sW3Bvb2wubGVuZ3RoXSA9IGZhY3RvcnlGbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlbXB0eSAoKSB7XG4gICAgICAgICAgICBwb29sID0gW107XG4gICAgICAgIH0sXG4gICAgICAgIGdldE51bUNyZWF0ZWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVtQ3JlYXRlZDtcbiAgICAgICAgfVxuICAgIH07XG59XG4iLCJjb25zdCB7YWJzLCBhdGFuMiwgY29zLCBzaW4sIHNxcnR9ID0gTWF0aDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFydGljbGUge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5vcHRzID0gb3B0aW9ucztcblxuICAgICAgICB0aGlzLl9ib3VuZHMgPSB7fTtcbiAgICAgICAgdGhpcy5fb3V0ZXJCb3VuZHMgPSB7fTtcblxuICAgICAgICB0aGlzLl9kZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIGFsaXZlOiB0cnVlLFxuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICBhbmdsZTogMCxcbiAgICAgICAgICAgIHNwZWVkOiAwLFxuICAgICAgICAgICAgZ3Jhdml0eTogMCxcbiAgICAgICAgICAgIG1hc3M6IDEsXG4gICAgICAgICAgICByYWRpdXM6IDAsXG4gICAgICAgICAgICBib3VuY2U6IHt4OiAtMSwgeTogLTF9LFxuICAgICAgICAgICAgZnJpY3Rpb246IDEsXG4gICAgICAgICAgICBsaWZlVGltZTogMCxcbiAgICAgICAgICAgIGJvdW5kczoge3g6IDAsIHk6IDAsIHdpZHRoOiAxMjgwLCBoZWlnaHQ6IDcyMH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9wcm9wcyA9IE9iamVjdC5rZXlzKHRoaXMuX2RlZmF1bHRzKTtcblxuICAgICAgICB0aGlzLnJlc2V0KG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJlc2V0KG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZGVmcyA9IHRoaXMuX2RlZmF1bHRzO1xuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMuX3Byb3BzO1xuICAgICAgICBjb25zdCBvcHRzID0gb3B0aW9ucyB8fCBkZWZzO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHByb3BzW2ldO1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBvcHRzW2tleV0gfHwgZGVmc1trZXldO1xuICAgICAgICAgICAgdGhpc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICBkZWZzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFuZ2xlID0gb3B0cy5hbmdsZSB8fCBkZWZzLmFuZ2xlO1xuICAgICAgICBjb25zdCBzcGVlZCA9IG9wdHMuc3BlZWQgfHwgZGVmcy5zcGVlZDtcblxuICAgICAgICB0aGlzLnZ4ID0gY29zKGFuZ2xlKSAqIHNwZWVkO1xuICAgICAgICB0aGlzLnZ5ID0gc2luKGFuZ2xlKSAqIHNwZWVkO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy52eCAqPSB0aGlzLmZyaWN0aW9uO1xuICAgICAgICB0aGlzLnZ5ICo9IHRoaXMuZnJpY3Rpb247XG4gICAgICAgIHRoaXMudnkgKz0gdGhpcy5ncmF2aXR5O1xuICAgICAgICB0aGlzLnggKz0gdGhpcy52eDtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGFjY2VsbGVyYXRlKHNwZWVkLCBhbmdsZSkge1xuICAgICAgICBpZiAodHlwZW9mIGFuZ2xlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgYW5nbGUgPSB0aGlzLmFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudnggKz0gY29zKGFuZ2xlKSAqIHNwZWVkO1xuICAgICAgICB0aGlzLnZ5ICs9IHNpbihhbmdsZSkgKiBzcGVlZDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZ2V0IHNwZWVkKCkge1xuICAgICAgICBpZiAodGhpcy52eCA9PT0gMCAmJiB0aGlzLnZ5ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3FydCh0aGlzLnZ4ICogdGhpcy52eCArIHRoaXMudnkgKiB0aGlzLnZ5KTtcbiAgICB9XG5cbiAgICBzZXQgc3BlZWQodmFsdWUpIHtcbiAgICAgICAgY29uc3QgYW5nbGUgPSB0aGlzLmFuZ2xlO1xuICAgICAgICB0aGlzLnZ4ID0gY29zKGFuZ2xlKSAqIHZhbHVlO1xuICAgICAgICB0aGlzLnZ5ID0gc2luKGFuZ2xlKSAqIHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBhbmdsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMudnggPT09IDAgJiYgdGhpcy52eSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF0YW4yKHRoaXMudnksIHRoaXMudngpO1xuICAgIH1cblxuICAgIHNldCBhbmdsZSh2YWx1ZSkge1xuICAgICAgICBjb25zdCBzcGVlZCA9IHRoaXMuc3BlZWQ7XG4gICAgICAgIHRoaXMudnggPSBjb3ModmFsdWUpICogc3BlZWQ7XG4gICAgICAgIHRoaXMudnkgPSBzaW4odmFsdWUpICogc3BlZWQ7XG4gICAgfVxuXG4gICAgc2V0Qm91bmRzKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5fYm91bmRzLnggPSB4IHx8IDA7XG4gICAgICAgIHRoaXMuX2JvdW5kcy55ID0geSB8fCAwO1xuICAgICAgICB0aGlzLl9ib3VuZHMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5fYm91bmRzLmhlaWdodCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICBnZXQgYm91bmRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYm91bmRzO1xuICAgIH1cblxuICAgIHNldCBib3VuZHMob2IpIHtcbiAgICAgICAgY29uc3Qge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gb2I7XG4gICAgICAgIHRoaXMuc2V0Qm91bmRzKHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cblxuICAgIGdldCBsZWZ0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy54IC0gdGhpcy5yYWRpdXM7XG4gICAgfVxuXG4gICAgZ2V0IHJpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy54ICsgdGhpcy5yYWRpdXM7XG4gICAgfVxuXG4gICAgZ2V0IHRvcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueSAtIHRoaXMucmFkaXVzO1xuICAgIH1cblxuICAgIGdldCBib3R0b20oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnkgKyB0aGlzLnJhZGl1cztcbiAgICB9XG5cbiAgICBnZXQgb3V0ZXJCb3VuZHMoKSB7XG4gICAgICAgIHRoaXMuX291dGVyQm91bmRzLmxlZnQgPSB0aGlzLl9ib3VuZHMueCAtIHRoaXMucmFkaXVzO1xuICAgICAgICB0aGlzLl9vdXRlckJvdW5kcy5yaWdodCA9IHRoaXMuX2JvdW5kcy54ICsgdGhpcy5fYm91bmRzLndpZHRoICsgdGhpcy5yYWRpdXM7XG4gICAgICAgIHRoaXMuX291dGVyQm91bmRzLnRvcCA9IHRoaXMuX2JvdW5kcy55IC0gdGhpcy5yYWRpdXM7XG4gICAgICAgIHRoaXMuX291dGVyQm91bmRzLmJvdHRvbSA9IHRoaXMuX2JvdW5kcy55ICsgdGhpcy5fYm91bmRzLmhlaWdodCArIHRoaXMucmFkaXVzO1xuICAgICAgICByZXR1cm4gdGhpcy5fb3V0ZXJCb3VuZHM7XG4gICAgfVxuXG4gICAgYW5nbGVUbyhwKSB7XG4gICAgICAgIHJldHVybiBhdGFuMihwLnkgLSB0aGlzLnksIHAueCAtIHRoaXMueCk7XG4gICAgfVxuXG4gICAgZGlzdGFuY2VUbyhwKSB7XG4gICAgICAgIGNvbnN0IGR4ID0gcC54IC0gdGhpcy54O1xuICAgICAgICBjb25zdCBkeSA9IHAueSAtIHRoaXMueTtcbiAgICAgICAgcmV0dXJuIHNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgIH1cblxuICAgIG1vdmVUbyhwLCB0aHJ1c3QgPSAwLjAwNSkge1xuICAgICAgICBjb25zdCBkeCA9IHAueCAtIHRoaXMueDtcbiAgICAgICAgY29uc3QgZHkgPSBwLnkgLSB0aGlzLnk7XG5cbiAgICAgICAgdGhpcy52eCArPSBkeCAqIHRocnVzdDtcbiAgICAgICAgdGhpcy52eSArPSBkeSAqIHRocnVzdDtcblxuICAgICAgICBpZiAoYWJzKHRoaXMudngpID4gYWJzKGR4KSkge1xuICAgICAgICAgICAgdGhpcy52eCA9IGR4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFicyh0aGlzLnZ5KSA+IGFicyhkeSkpIHtcbiAgICAgICAgICAgIHRoaXMudnkgPSBkeTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdyYXZpdGF0ZVRvKHApIHtcbiAgICAgICAgY29uc3QgZHggPSBwLnggLSB0aGlzLng7XG4gICAgICAgIGNvbnN0IGR5ID0gcC55IC0gdGhpcy55O1xuICAgICAgICBjb25zdCBkaXN0U3EgPSBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICAgICAgaWYgKGRpc3RTcSA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBzcXJ0KGRpc3RTcSk7XG4gICAgICAgICAgICBjb25zdCBmb3JjZSA9IHAubWFzcyAvIGRpc3RTcTtcbiAgICAgICAgICAgIGNvbnN0IGF4ID0gZHggLyBkaXN0ICogZm9yY2U7XG4gICAgICAgICAgICBjb25zdCBheSA9IGR5IC8gZGlzdCAqIGZvcmNlO1xuICAgICAgICAgICAgdGhpcy52eCArPSBheDtcbiAgICAgICAgICAgIHRoaXMudnkgKz0gYXk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzcHJpbmdUbyhwLCBzdGlmZm5lc3MsIGxlbmd0aCkge1xuICAgICAgICBjb25zdCBkeCA9IHAueCAtIHRoaXMueDtcbiAgICAgICAgY29uc3QgZHkgPSBwLnkgLSB0aGlzLnk7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgIGNvbnN0IGZvcmNlID0gKGRpc3RhbmNlIC0gKGxlbmd0aCB8fCAwKSkgKiAoc3RpZmZuZXNzIHx8IDAuMik7XG5cbiAgICAgICAgaWYgKGFicyhkaXN0YW5jZSAqIGZvcmNlKSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMudnggKz0gZHggLyBkaXN0YW5jZSAqIGZvcmNlO1xuICAgICAgICAgICAgdGhpcy52eSArPSBkeSAvIGRpc3RhbmNlICogZm9yY2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjb2xsaWRlcyhwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc3RhbmNlVG8ocCkgPD0gdGhpcy5yYWRpdXMgKyBwLnJhZGl1cztcbiAgICB9XG5cbiAgICBlZGdlQ29sbGlkZSgpIHtcbiAgICAgICAgY29uc3QgbGVmdCA9IHRoaXMuX2JvdW5kcy54ICsgdGhpcy5yYWRpdXM7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gdGhpcy5fYm91bmRzLnggKyB0aGlzLl9ib3VuZHMud2lkdGggLSB0aGlzLnJhZGl1cztcbiAgICAgICAgY29uc3QgdG9wID0gdGhpcy5fYm91bmRzLnkgKyB0aGlzLnJhZGl1cztcbiAgICAgICAgY29uc3QgYm90dG9tID0gdGhpcy5fYm91bmRzLnkgKyB0aGlzLl9ib3VuZHMuaGVpZ2h0IC0gdGhpcy5yYWRpdXM7XG5cbiAgICAgICAgaWYgKHRoaXMueCA8IGxlZnQpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IGxlZnQ7XG4gICAgICAgICAgICB0aGlzLnZ4ID0gdGhpcy52eCAqIHRoaXMuYm91bmNlLng7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy54ID4gcmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHJpZ2h0O1xuICAgICAgICAgICAgdGhpcy52eCA9IHRoaXMudnggKiB0aGlzLmJvdW5jZS54O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueSA8IHRvcCkge1xuICAgICAgICAgICAgdGhpcy55ID0gdG9wO1xuICAgICAgICAgICAgdGhpcy52eSA9IHRoaXMudnkgKiB0aGlzLmJvdW5jZS55O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueSA+IGJvdHRvbSkge1xuICAgICAgICAgICAgdGhpcy55ID0gYm90dG9tO1xuICAgICAgICAgICAgdGhpcy52eSA9IHRoaXMudnkgKiB0aGlzLmJvdW5jZS55O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZWRnZVdyYXAoKSB7XG4gICAgICAgIGNvbnN0IHtsZWZ0LCByaWdodCwgdG9wLCBib3R0b219ID0gdGhpcy5vdXRlckJvdW5kcztcblxuICAgICAgICBpZiAodGhpcy54IDwgbGVmdCkge1xuICAgICAgICAgICAgdGhpcy54ID0gcmlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy54ID4gcmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IGxlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55IDwgdG9wKSB7XG4gICAgICAgICAgICB0aGlzLnkgPSBib3R0b207XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55ID4gYm90dG9tKSB7XG4gICAgICAgICAgICB0aGlzLnkgPSB0b3A7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlZGdlS2lsbCgpIHtcbiAgICAgICAgY29uc3Qge2xlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbX0gPSB0aGlzLm91dGVyQm91bmRzO1xuXG4gICAgICAgIGlmICh0aGlzLnggPCBsZWZ0IHx8IHRoaXMueCA+IHJpZ2h0IHx8IHRoaXMueSA8IHRvcCB8fCB0aGlzLnkgPiBib3R0b20pIHtcbiAgICAgICAgICAgIHRoaXMuYWxpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVkZ2VSZXNldCgpIHtcbiAgICAgICAgY29uc3Qge2xlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbX0gPSB0aGlzLm91dGVyQm91bmRzO1xuXG4gICAgICAgIGlmICh0aGlzLnggPCBsZWZ0IHx8IHRoaXMueCA+IHJpZ2h0IHx8IHRoaXMueSA8IHRvcCB8fCB0aGlzLnkgPiBib3R0b20pIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxpZmVLaWxsKCkge1xuICAgICAgICB0aGlzLmxpZmVUaW1lLS07XG5cbiAgICAgICAgaWYgKHRoaXMubGlmZVRpbWUgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5hbGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IGFuZHJvaWQgZnJvbSAnLi4vb3MvYW5kcm9pZCc7XG5cbi8vaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNDQwMzc2Ni9ob3ctdG8tZGV0ZWN0LXRoZS1zdG9jay1hbmRyb2lkLWJyb3dzZXJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFuZHJvaWROYXRpdmUodWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gICAgaWYgKCFhbmRyb2lkKHVhKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgaXNBbmRyb2lkTW9iaWxlID0gdWEuaW5kZXhPZignTW96aWxsYS81LjAnKSA+IC0xICYmIHVhLmluZGV4T2YoJ0FwcGxlV2ViS2l0JykgPiAtMTtcblxuICAgIGNvbnN0IHJlQXBwbGVXZWJLaXQgPSAvQXBwbGVXZWJLaXRcXC8oW1xcZC5dKykvO1xuICAgIGNvbnN0IHJlc3VsdEFwcGxlV2ViS2l0ID0gcmVBcHBsZVdlYktpdC5leGVjKHVhKTtcbiAgICBjb25zdCBhcHBsZVdlYktpdFZlcnNpb24gPSByZXN1bHRBcHBsZVdlYktpdCA/IHBhcnNlRmxvYXQocmVBcHBsZVdlYktpdC5leGVjKHVhKVsxXSkgOiBudWxsO1xuXG4gICAgY29uc3QgcmVDaHJvbWUgPSAvQ2hyb21lXFwvKFtcXGQuXSspLztcbiAgICBjb25zdCByZXN1bHRDaHJvbWUgPSByZUNocm9tZS5leGVjKHVhKTtcbiAgICBjb25zdCBjaHJvbWVWZXJzaW9uID0gcmVzdWx0Q2hyb21lID8gcGFyc2VGbG9hdChyZUNocm9tZS5leGVjKHVhKVsxXSkgOiBudWxsO1xuXG4gICAgcmV0dXJuIGlzQW5kcm9pZE1vYmlsZSAmJiAoYXBwbGVXZWJLaXRWZXJzaW9uICYmIGFwcGxlV2ViS2l0VmVyc2lvbiA8IDUzNykgfHwgKGNocm9tZVZlcnNpb24gJiYgY2hyb21lVmVyc2lvbiA8IDM3KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGllVmVyc2lvbih1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICBsZXQgdiA9IDA7XG4gICAgaWYgKC9NU0lFIChcXGQrXFwuXFxkKyk7Ly50ZXN0KHVhKSkge1xuICAgICAgICB2ID0gcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCk7XG4gICAgfSBlbHNlIGlmICgvVHJpZGVudFxcLyhcXGQrXFwuXFxkKykoLiopcnY6KFxcZCtcXC5cXGQrKS8udGVzdCh1YSkpIHtcbiAgICAgICAgdiA9IHBhcnNlSW50KFJlZ0V4cC4kMywgMTApO1xuICAgIH1cbiAgICByZXR1cm4gdjtcbn1cbiIsImltcG9ydCBvcyBmcm9tICcuLi9vcyc7XG5pbXBvcnQgaWVWZXJzaW9uIGZyb20gJy4vaWVWZXJzaW9uJztcbmltcG9ydCBhbmRyb2lkTmF0aXZlIGZyb20gJy4vYW5kcm9pZE5hdGl2ZSc7XG5cbmNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbmNvbnN0IGNocm9tZWlPUyA9ICgpID0+IG9zLmlvcygpICYmIC9DcmlPUy8udGVzdCh1YSk7XG5jb25zdCBmaXJlZm94ID0gKCkgPT4gL0ZpcmVmb3gvLnRlc3QodWEpO1xuY29uc3QgaWUgPSAoKSA9PiBpZVZlcnNpb24oKSA+IDA7XG5jb25zdCBzYWZhcmkgPSAoKSA9PiAhL0FuZHJvaWQvLnRlc3QodWEpICYmICEvQ2hyb21lLy50ZXN0KHVhKSAmJiAvU2FmYXJpLy50ZXN0KHVhKTtcbmNvbnN0IHNhZmFyaU1vYmlsZSA9ICgpID0+IG9zLmlvcygpICYmIC9BcHBsZVdlYktpdC8udGVzdCh1YSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBhbmRyb2lkTmF0aXZlLFxuICAgIGNocm9tZWlPUyxcbiAgICBmaXJlZm94LFxuICAgIGllLFxuICAgIGllVmVyc2lvbixcbiAgICBzYWZhcmksXG4gICAgc2FmYXJpTW9iaWxlXG59O1xuIiwiY29uc3QgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXG5jb25zdCBpcGFkID0gKCkgPT4gL2lQYWQvaS50ZXN0KHVhKTtcbmNvbnN0IGlwb2QgPSAoKSA9PiAvaVBvZC9pLnRlc3QodWEpO1xuY29uc3QgaXBob25lID0gKCkgPT4gL2lQaG9uZS9pLnRlc3QodWEpO1xuY29uc3QgbW9iaWxlID0gKCkgPT4gISF1YS5tYXRjaCgvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaXxXaW5kb3dzIFBob25lfFN5bWJpYW5PUy9pKTtcbmNvbnN0IGRlc2t0b3AgPSAoKSA9PiAhbW9iaWxlKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkZXNrdG9wLFxuICAgIGlwYWQsXG4gICAgaXBob25lLFxuICAgIGlwb2QsXG4gICAgbW9iaWxlXG59O1xuIiwiaW1wb3J0IGJyb3dzZXIgZnJvbSAnLi9icm93c2VyJztcbmltcG9ydCBkZXZpY2UgZnJvbSAnLi9kZXZpY2UnO1xuaW1wb3J0IG9zIGZyb20gJy4vb3MnO1xuaW1wb3J0IHN1cHBvcnRzIGZyb20gJy4vc3VwcG9ydHMnO1xuaW1wb3J0IHNjcmVlbiBmcm9tICcuL3NjcmVlbic7XG5cbmNvbnN0IGxvY2FsID0gL14oPzpodHRwcz86XFwvXFwvKT8oPzpsb2NhbGhvc3R8MTkyXFwuMTY4KS8udGVzdCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBicm93c2VyLFxuICAgIGRldmljZSxcbiAgICBvcyxcbiAgICBzdXBwb3J0cyxcbiAgICBzY3JlZW4sXG4gICAgbG9jYWxcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICByZXR1cm4gL0FuZHJvaWQvaS50ZXN0KHVhKTtcbn1cbiIsImltcG9ydCBhbmRyb2lkIGZyb20gJy4vYW5kcm9pZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFuZHJvaWRWZXJzaW9uKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIGlmICghYW5kcm9pZCh1YSkpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGNvbnN0IHZlcnNpb24gPSB1YS5tYXRjaCgvQW5kcm9pZCAoXFxkKyg/OlxcLlxcZCspKyk7LylbMV07XG4gICAgY29uc3QgW2EsIGJdID0gdmVyc2lvbi5zcGxpdCgnLicpO1xuICAgIHJldHVybiBwYXJzZUZsb2F0KGAke2F9LiR7Yn1gKTtcbn1cbiIsImltcG9ydCBhbmRyb2lkIGZyb20gJy4vYW5kcm9pZCc7XG5pbXBvcnQgYW5kcm9pZFZlcnNpb24gZnJvbSAnLi9hbmRyb2lkVmVyc2lvbic7XG5pbXBvcnQgaW9zIGZyb20gJy4vaW9zJztcbmltcG9ydCBpb3NWZXJzaW9uIGZyb20gJy4vaW9zVmVyc2lvbic7XG5pbXBvcnQgbGludXggZnJvbSAnLi9saW51eCc7XG5pbXBvcnQgbWFjIGZyb20gJy4vbWFjJztcbmltcG9ydCB3aW5kb3dzIGZyb20gJy4vd2luZG93cyc7XG5pbXBvcnQgd2luZG93c1Bob25lIGZyb20gJy4vd2luZG93c1Bob25lJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFuZHJvaWQsXG4gICAgYW5kcm9pZFZlcnNpb24sXG4gICAgaW9zLFxuICAgIGlvc1ZlcnNpb24sXG4gICAgbGludXgsXG4gICAgbWFjLFxuICAgIHdpbmRvd3MsXG4gICAgd2luZG93c1Bob25lXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW9zKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIHJldHVybiAvaVBbYW9dZHxpUGhvbmUvaS50ZXN0KHVhKTtcbn1cbiIsImltcG9ydCBpb3MgZnJvbSAnLi9pb3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpb3NWZXJzaW9uKHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIGlmIChpb3ModWEpKSB7XG4gICAgICAgIGNvbnN0IFssIGIsIGNdID0gdWEubWF0Y2goL09TIChcXGQrKV8oXFxkKykvaSk7XG4gICAgICAgIGlmIChiICYmIGMpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KGAke2J9LiR7Y31gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbn1cbiIsImltcG9ydCBhbmRyb2lkIGZyb20gJy4vYW5kcm9pZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpbnV4KHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCkge1xuICAgIHJldHVybiAhYW5kcm9pZCh1YSkgJiYgL0xpbnV4Ly50ZXN0KHVhKTtcbn1cbiIsImltcG9ydCBpb3MgZnJvbSAnLi9pb3MnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWModWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gICAgcmV0dXJuICFpb3ModWEpICYmIC9NYWMgT1MvLnRlc3QodWEpO1xufVxuIiwiaW1wb3J0IHdpbmRvd3NQaG9uZSBmcm9tICcuL3dpbmRvd3NQaG9uZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdpbmRvd3ModWEgPSBuYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gICAgcmV0dXJuICF3aW5kb3dzUGhvbmUodWEpICYmIC9XaW5kb3dzLy50ZXN0KHVhKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdpbmRvd3NQaG9uZSh1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQpIHtcbiAgICByZXR1cm4gL1dpbmRvd3MgUGhvbmUvaS50ZXN0KHVhKTtcbn1cbiIsIi8vIHNjcmVlbi53aWR0aCAvIHNjcmVlbi5oZWlnaHQgaXMgb2Z0ZW4gd3JvbmcgaW4gQW5kcm9pZFxuY29uc3QgaGVpZ2h0ID0gKCkgPT4gTWF0aC5tYXgod2luZG93Lm91dGVySGVpZ2h0LCB3aW5kb3cuc2NyZWVuLmhlaWdodCk7XG5jb25zdCB3aWR0aCA9ICgpID0+IE1hdGgubWF4KHdpbmRvdy5vdXRlcldpZHRoLCB3aW5kb3cuc2NyZWVuLndpZHRoKTtcbmNvbnN0IGRwciA9ICgpID0+IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG5jb25zdCByZXRpbmEgPSAoKSA9PiBkcHIoKSA+IDE7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICB3aWR0aCxcbiAgICBoZWlnaHQsXG4gICAgZHByLFxuICAgIHJldGluYVxufTtcbiIsImV4cG9ydCBkZWZhdWx0ICgpID0+ICEhd2luZG93LkRldmljZU9yaWVudGF0aW9uRXZlbnQ7XG4iLCJpbXBvcnQgd2ViZ2wgZnJvbSAnLi93ZWJnbCc7XG5pbXBvcnQgd2VibSBmcm9tICcuL3dlYm0nO1xuaW1wb3J0IG1wNCBmcm9tICcuL21wNCc7XG5pbXBvcnQgZGV2aWNlT3JpZW50YXRpb24gZnJvbSAnLi9kZXZpY2VPcmllbnRhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICB3ZWJnbCxcbiAgICB3ZWJtLFxuICAgIG1wNCxcbiAgICBkZXZpY2VPcmllbnRhdGlvblxufTtcbiIsImNvbnN0IHZpZGVvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuZXhwb3J0IGRlZmF1bHQgKCkgPT4gISEodmlkZW9FbC5jYW5QbGF5VHlwZSAmJiB2aWRlb0VsLmNhblBsYXlUeXBlKCd2aWRlby9tcDQ7IGNvZGVjcz1cImF2YzEuNDJFMDFFLCBtcDRhLjQwLjJcIicpKTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdlYmdsKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJykgfHwgY2FudmFzLmdldENvbnRleHQoJ2V4cGVyaW1lbnRhbC13ZWJnbCcpO1xuICAgICAgICByZXR1cm4gISEod2luZG93LldlYkdMUmVuZGVyaW5nQ29udGV4dCAmJiBjb250ZXh0KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG4iLCJjb25zdCB2aWRlb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbmV4cG9ydCBkZWZhdWx0ICgpID0+ICEhKHZpZGVvRWwuY2FuUGxheVR5cGUgJiYgdmlkZW9FbC5jYW5QbGF5VHlwZSgndmlkZW8vd2VibTsgY29kZWNzPVwidnA4LCB2b3JiaXNcIicpKTtcbiIsIi8qXG4gKiBjbGFzc0xpc3QgKHBhcnRpYWwgcG9seWZpbGwgZm9yIElFIDEwLCBJRSAxMSBhbmQgRmlyZWZveCA8MjQpXG4gKiBhZGFwdGVkIGZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9lbGlncmV5L2NsYXNzTGlzdC5qcy9ibG9iL21hc3Rlci9jbGFzc0xpc3QuanNcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgdGVzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdfJyk7XG5cbiAgICB0ZXN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjMScsICdjMicpO1xuXG4gICAgLy8gUG9seWZpbGwgZm9yIElFIDEwLzExIGFuZCBGaXJlZm94IDwyNiwgd2hlcmUgY2xhc3NMaXN0LmFkZCBhbmRcbiAgICAvLyBjbGFzc0xpc3QucmVtb3ZlIGV4aXN0IGJ1dCBzdXBwb3J0IG9ubHkgb25lIGFyZ3VtZW50IGF0IGEgdGltZS5cbiAgICBpZiAoIXRlc3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYzInKSkge1xuICAgICAgICBmdW5jdGlvbiBjcmVhdGVNZXRob2QobWV0aG9kKSB7XG4gICAgICAgICAgICBjb25zdCBvcmlnaW5hbCA9IHdpbmRvdy5ET01Ub2tlbkxpc3QucHJvdG90eXBlW21ldGhvZF07XG5cbiAgICAgICAgICAgIHdpbmRvdy5ET01Ub2tlbkxpc3QucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgIGxldCBpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsLmNhbGwodGhpcywgdG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgY3JlYXRlTWV0aG9kKCdhZGQnKTtcbiAgICAgICAgY3JlYXRlTWV0aG9kKCdyZW1vdmUnKTtcbiAgICB9XG5cbiAgICB0ZXN0RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdjMycsIGZhbHNlKTtcblxuICAgIC8vIFBvbHlmaWxsIGZvciBJRSAxMCwgSUUgMTEgYW5kIEZpcmVmb3ggPDI0LCB3aGVyZSBjbGFzc0xpc3QudG9nZ2xlIGRvZXMgbm90XG4gICAgLy8gc3VwcG9ydCB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuICAgIGlmICh0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2MzJykpIHtcbiAgICAgICAgY29uc3QgdG9nZ2xlID0gd2luZG93LkRPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlO1xuXG4gICAgICAgIHdpbmRvdy5ET01Ub2tlbkxpc3QucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKHRva2VuLCBmb3JjZSkge1xuICAgICAgICAgICAgZm9yY2UgPSAhIWZvcmNlO1xuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIHRoaXMuY29udGFpbnModG9rZW4pID09PSBmb3JjZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JjZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvZ2dsZS5jYWxsKHRoaXMsIHRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB0ZXN0RWxlbWVudCA9IG51bGw7XG59KCkpO1xuIiwiKGZ1bmN0aW9uKGZuKSB7XG4gICAgd2luZG93LmNvbnNvbGUgPSB3aW5kb3cuY29uc29sZSB8fCB7fTtcbiAgICBjb25zdCBtZXRob2RzID0gW1xuICAgICAgICAnYXNzZXJ0JyxcbiAgICAgICAgJ2NsZWFyJyxcbiAgICAgICAgJ2NvdW50JyxcbiAgICAgICAgJ2RlYnVnJyxcbiAgICAgICAgJ2RpcicsXG4gICAgICAgICdkaXJ4bWwnLFxuICAgICAgICAnZXJyb3InLFxuICAgICAgICAnZ3JvdXAnLFxuICAgICAgICAnZ3JvdXBDb2xsYXBzZWQnLFxuICAgICAgICAnZ3JvdXBFbmQnLFxuICAgICAgICAnaW5mbycsXG4gICAgICAgICdsb2cnLFxuICAgICAgICAnbWFya1RpbWVsaW5lJyxcbiAgICAgICAgJ21lbW9yeScsXG4gICAgICAgICdwcm9maWxlJyxcbiAgICAgICAgJ3Byb2ZpbGVFbmQnLFxuICAgICAgICAndGFibGUnLFxuICAgICAgICAndGltZScsXG4gICAgICAgICd0aW1lRW5kJyxcbiAgICAgICAgJ3RpbWVTdGFtcCcsXG4gICAgICAgICd0aW1lbGluZScsXG4gICAgICAgICd0aW1lbGluZUVuZCcsXG4gICAgICAgICd0cmFjZScsXG4gICAgICAgICd3YXJuJ1xuICAgIF07XG4gICAgbWV0aG9kcy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgIHdpbmRvdy5jb25zb2xlW25hbWVdID0gd2luZG93LmNvbnNvbGVbbmFtZV0gfHwgZm47XG4gICAgfSk7XG59KGZ1bmN0aW9uKCkge30pKTtcbiIsImltcG9ydCAnLi9jbGFzc0xpc3QnO1xuaW1wb3J0ICcuL2NvbnNvbGUnO1xuaW1wb3J0ICcuL3JlcXVlc3RBbmltYXRpb25GcmFtZSc7XG4iLCIvKlxuICogcmVxdWVzdEFuaW1hdGlvbkZyYW1lIChpb3M2IGFuZCBhbmRyb2lkIDwgNC40KVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgICBpZiAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcbiAgICAgICAgY29uc3QgdmVuZG9ycyA9IFsnbXMnLCAnbW96JywgJ3dlYmtpdCcsICdvJ107XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ICsreCkge1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdICsgJ1JlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93W3ZlbmRvcnNbeF0gKyAnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXSB8fCB3aW5kb3dbdmVuZG9yc1t4XSArXG4gICAgICAgICAgICAgICAgJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSddO1xuICAgICAgICB9XG4gICAgfVxufSgpKTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBvcHVwKHVybCwgd2lkdGggPSA4MDAsIGhlaWdodCA9IDYwMCwgbmFtZSA9ICcnKSB7XG4gICAgY29uc3QgbGVmdCA9ICh3aW5kb3cuc2NyZWVuLndpZHRoIC0gd2lkdGgpIC8gMjtcbiAgICBjb25zdCB0b3AgPSAod2luZG93LnNjcmVlbi5oZWlnaHQgLSBoZWlnaHQpIC8gMjtcbiAgICAvLyBjb25zdCBsZWZ0ID0gKHdpbmRvdy5zY3JlZW4uYXZhaWxXaWR0aCAtIHdpZHRoKSAvIDI7XG4gICAgLy8gY29uc3QgdG9wID0gKHdpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQgLSBoZWlnaHQpIC8gMjtcbiAgICBjb25zdCBkZWZhdWx0cyA9ICdkaXJlY3Rvcmllcz1ubyxsb2NhdGlvbj1ubyxtZW51YmFyPW5vLHJlc2l6YWJsZT1ubyxzY3JvbGxiYXJzPW5vLHN0YXR1cz1ubyx0b29sYmFyPW5vJztcbiAgICBjb25zdCBwYXJhbXMgPSBgd2lkdGg9JHt3aWR0aH0saGVpZ2h0PSR7aGVpZ2h0fSx0b3A9JHt0b3B9LGxlZnQ9JHtsZWZ0fSwke2RlZmF1bHRzfWA7XG4gICAgY29uc3Qgd2luID0gd2luZG93Lm9wZW4odXJsLCBuYW1lLCBwYXJhbXMpO1xuICAgIGlmICh3aW4gPT09IG51bGwgfHwgdHlwZW9mIHdpbiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAod2luZG93LmZvY3VzKSB7XG4gICAgICAgIHdpbi5mb2N1cygpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbiIsIlxuY2xhc3MgTm9kZSB7XG4gICAgY29uc3RydWN0b3IoYm91bmRzLCBkZXB0aCwgbWF4RGVwdGgsIG1heENoaWxkcmVuKSB7XG4gICAgICAgIHRoaXMuX2JvdW5kcyA9IGJvdW5kcztcbiAgICAgICAgdGhpcy5fZGVwdGggPSBkZXB0aDtcbiAgICAgICAgdGhpcy5fbWF4RGVwdGggPSBtYXhEZXB0aDtcbiAgICAgICAgdGhpcy5fbWF4Q2hpbGRyZW4gPSBtYXhDaGlsZHJlbjtcblxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgICAgIHRoaXMubm9kZXMgPSBbXTtcbiAgICB9XG5cbiAgICBpbnNlcnQoaXRlbSkge1xuICAgICAgICBpZiAodGhpcy5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZmluZEluZGV4KGl0ZW0pO1xuICAgICAgICAgICAgdGhpcy5ub2Rlc1tpbmRleF0uaW5zZXJ0KGl0ZW0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGl0ZW0pO1xuXG4gICAgICAgIGlmICghKHRoaXMuX2RlcHRoID49IHRoaXMuX21heERlcHRoKSAmJiB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IHRoaXMuX21heENoaWxkcmVuKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc3ViZGl2aWRlKCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0KHRoaXMuY2hpbGRyZW5baV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXRyaWV2ZShpdGVtKSB7XG4gICAgICAgIGlmICh0aGlzLm5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9maW5kSW5kZXgoaXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub2Rlc1tpbmRleF0ucmV0cmlldmUoaXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbjtcbiAgICB9XG5cbiAgICBfZmluZEluZGV4KGl0ZW0pIHtcbiAgICAgICAgY29uc3Qge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gdGhpcy5fYm91bmRzO1xuXG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gaXRlbS54ID4geCArIHdpZHRoIC8gMjtcbiAgICAgICAgY29uc3QgYm90dG9tID0gaXRlbS55ID4geSArIGhlaWdodCAvIDI7XG5cbiAgICAgICAgbGV0IGluZGV4O1xuXG4gICAgICAgIGlmIChyaWdodCkge1xuICAgICAgICAgICAgaW5kZXggPSBib3R0b20gPyBOb2RlLkJSIDogTm9kZS5UUjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluZGV4ID0gYm90dG9tID8gTm9kZS5CTCA6IE5vZGUuVEw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgc3ViZGl2aWRlKCkge1xuICAgICAgICBjb25zdCBkZXB0aCA9IHRoaXMuX2RlcHRoICsgMTtcblxuICAgICAgICBjb25zdCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSB0aGlzLl9ib3VuZHM7XG4gICAgICAgIGNvbnN0IHcgPSB3aWR0aCAvIDI7XG4gICAgICAgIGNvbnN0IGggPSBoZWlnaHQgLyAyO1xuXG4gICAgICAgIHRoaXMubm9kZXNbTm9kZS5UTF0gPSBuZXcgTm9kZSh7XG4gICAgICAgICAgICB4LFxuICAgICAgICAgICAgeSxcbiAgICAgICAgICAgIHdpZHRoOiB3LFxuICAgICAgICAgICAgaGVpZ2h0OiBoXG4gICAgICAgIH0sXG4gICAgICAgIGRlcHRoLCB0aGlzLl9tYXhEZXB0aCwgdGhpcy5fbWF4Q2hpbGRyZW4pO1xuXG4gICAgICAgIHRoaXMubm9kZXNbTm9kZS5UUl0gPSBuZXcgTm9kZSh7XG4gICAgICAgICAgICB4OiB4ICsgdyxcbiAgICAgICAgICAgIHksXG4gICAgICAgICAgICB3aWR0aDogdyxcbiAgICAgICAgICAgIGhlaWdodDogaFxuICAgICAgICB9LFxuICAgICAgICBkZXB0aCwgdGhpcy5fbWF4RGVwdGgsIHRoaXMuX21heENoaWxkcmVuKTtcblxuICAgICAgICB0aGlzLm5vZGVzW05vZGUuQkxdID0gbmV3IE5vZGUoe1xuICAgICAgICAgICAgeCxcbiAgICAgICAgICAgIHk6IHkgKyBoLFxuICAgICAgICAgICAgd2lkdGg6IHcsXG4gICAgICAgICAgICBoZWlnaHQ6IGhcbiAgICAgICAgfSxcbiAgICAgICAgZGVwdGgsIHRoaXMuX21heERlcHRoLCB0aGlzLl9tYXhDaGlsZHJlbik7XG5cbiAgICAgICAgdGhpcy5ub2Rlc1tOb2RlLkJSXSA9IG5ldyBOb2RlKHtcbiAgICAgICAgICAgIHg6IHggKyB3LFxuICAgICAgICAgICAgeTogeSArIGgsXG4gICAgICAgICAgICB3aWR0aDogdyxcbiAgICAgICAgICAgIGhlaWdodDogaFxuICAgICAgICB9LFxuICAgICAgICBkZXB0aCwgdGhpcy5fbWF4RGVwdGgsIHRoaXMuX21heENoaWxkcmVuKTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5sZW5ndGggPSAwO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLm5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5ub2Rlcy5wb3AoKS5jbGVhcigpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5Ob2RlLlRMID0gMDtcbk5vZGUuVFIgPSAxO1xuTm9kZS5CTCA9IDI7XG5Ob2RlLkJSID0gMztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVhZFRyZWUge1xuICAgIGNvbnN0cnVjdG9yKGJvdW5kcywgbWF4RGVwdGggPSAtMSwgbWF4Q2hpbGRyZW4gPSAtMSkge1xuICAgICAgICB0aGlzLnJvb3QgPSBuZXcgTm9kZShib3VuZHMsIDAsIG1heERlcHRoLCBtYXhDaGlsZHJlbik7XG4gICAgfVxuXG4gICAgaW5zZXJ0KGl0ZW0pIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdC5pbnNlcnQoaXRlbVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJvb3QuaW5zZXJ0KGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMucm9vdC5jbGVhcigpO1xuICAgIH1cblxuICAgIHJldHJpZXZlKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm9vdC5yZXRyaWV2ZShpdGVtKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlbWFpbCh1cmwsIHN1YmplY3QgPSAnJywgYm9keSA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgc3ViamVjdCA9IGVuY29kZVVSSUNvbXBvbmVudChzdWJqZWN0KTtcblxuICAgIGNvbnN0IG5ld2xpbmVzID0gZW5jb2RlVVJJQ29tcG9uZW50KCdcXHJcXG5cXHJcXG4nKTtcbiAgICBib2R5ID0gYm9keSA/IGAke2VuY29kZVVSSUNvbXBvbmVudChib2R5KX0ke25ld2xpbmVzfWAgOiAnJztcblxuICAgIHJldHVybiBwb3B1cChgbWFpbHRvOj9zdWJqZWN0PSR7c3ViamVjdH0mYm9keT0ke2JvZHl9JHt1cmx9YCk7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmYWNlYm9vayh1cmwpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICByZXR1cm4gcG9wdXAoYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PSR7dXJsfWApO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmFjZWJvb2tGZWVkRGlhbG9nKGFwcElkLCByZWRpcmVjdCwgdXJsLCB0aXRsZSA9ICcnLCBpbWFnZSA9ICcnLCBjYXB0aW9uID0gJycsIGRlc2MgPSAnJywgc291cmNlID0gJycpIHtcbiAgICB0aXRsZSA9IGVuY29kZVVSSUNvbXBvbmVudCh0aXRsZSk7XG4gICAgY2FwdGlvbiA9IGVuY29kZVVSSUNvbXBvbmVudChjYXB0aW9uKTtcbiAgICBkZXNjID0gZW5jb2RlVVJJQ29tcG9uZW50KGRlc2MpO1xuXG4gICAgY29uc3QgcGFyYW1zID0gYD9kaXNwbGF5PXBvcHVwJnNob3dfZXJyb3I9dHJ1ZSZhcHBfaWQ9JHthcHBJZH0mc291cmNlPSR7c291cmNlfSZyZWRpcmVjdF91cmk9JHtyZWRpcmVjdH1gO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBgbmFtZT0ke3RpdGxlfSZsaW5rPSR7dXJsfSZjYXB0aW9uPSR7Y2FwdGlvbn0mZGVzY3JpcHRpb249JHtkZXNjfSZwaWN0dXJlPSR7aW1hZ2V9YDtcblxuICAgIHJldHVybiBwb3B1cChgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL2RpYWxvZy9mZWVkPyR7cGFyYW1zfSYke2NvbnRlbnR9YCk7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnb29nbGVwbHVzKHVybCkge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHJldHVybiBwb3B1cChgaHR0cHM6Ly9wbHVzLmdvb2dsZS5jb20vc2hhcmU/dXJsPSR7dXJsfWApO1xufVxuIiwiaW1wb3J0IGVtYWlsIGZyb20gJy4vZW1haWwnO1xuaW1wb3J0IGZhY2Vib29rIGZyb20gJy4vZmFjZWJvb2snO1xuaW1wb3J0IGZhY2Vib29rRmVlZERpYWxvZyBmcm9tICcuL2ZhY2Vib29rRmVlZERpYWxvZyc7XG5pbXBvcnQgZ29vZ2xlcGx1cyBmcm9tICcuL2dvb2dsZXBsdXMnO1xuaW1wb3J0IGxpbmtlZGluIGZyb20gJy4vbGlua2VkaW4nO1xuaW1wb3J0IHBpbnRlcmVzdCBmcm9tICcuL3BpbnRlcmVzdCc7XG5pbXBvcnQgcmVkZGl0IGZyb20gJy4vcmVkZGl0JztcbmltcG9ydCByZW5yZW4gZnJvbSAnLi9yZW5yZW4nO1xuaW1wb3J0IHNtcyBmcm9tICcuL3Ntcyc7XG5pbXBvcnQgdHdpdHRlciBmcm9tICcuL3R3aXR0ZXInO1xuaW1wb3J0IHZrb250YWt0ZSBmcm9tICcuL3Zrb250YWt0ZSc7XG5pbXBvcnQgd2VpYm8gZnJvbSAnLi93ZWlibyc7XG5pbXBvcnQgd2hhdHNhcHAgZnJvbSAnLi93aGF0c2FwcCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBlbWFpbCxcbiAgICBmYWNlYm9vayxcbiAgICBmYWNlYm9va0ZlZWREaWFsb2csXG4gICAgZ29vZ2xlcGx1cyxcbiAgICBsaW5rZWRpbixcbiAgICBwaW50ZXJlc3QsXG4gICAgcmVkZGl0LFxuICAgIHJlbnJlbixcbiAgICBzbXMsXG4gICAgdHdpdHRlcixcbiAgICB2a29udGFrdGUsXG4gICAgd2VpYm8sXG4gICAgd2hhdHNhcHBcbn07XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsaW5rZWRpbih1cmwsIHRpdGxlID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICB0aXRsZSA9IGVuY29kZVVSSUNvbXBvbmVudCh0aXRsZSk7XG4gICAgcmV0dXJuIHBvcHVwKGBodHRwczovL3d3dy5saW5rZWRpbi5jb20vc2hhcmVBcnRpY2xlP21pbmk9dHJ1ZSZ1cmw9JHt1cmx9JnRpdGxlPSR7dGl0bGV9YCk7XG59XG4iLCJpbXBvcnQgcG9wdXAgZnJvbSAnLi4vcG9wdXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwaW50ZXJlc3QodXJsLCBtZWRpYSwgZGVzYyA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgbWVkaWEgPSBlbmNvZGVVUklDb21wb25lbnQobWVkaWEpO1xuICAgIGRlc2MgPSBlbmNvZGVVUklDb21wb25lbnQoZGVzYyk7XG4gICAgcmV0dXJuIHBvcHVwKGBodHRwczovL3BpbnRlcmVzdC5jb20vcGluL2NyZWF0ZS9idXR0b24vP3VybD0ke3VybH0mbWVkaWE9JHttZWRpYX0mZGVzY3JpcHRpb249JHtkZXNjfWApO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVkZGl0KHVybCwgdGl0bGUgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHRpdGxlID0gZW5jb2RlVVJJQ29tcG9uZW50KHRpdGxlKTtcbiAgICByZXR1cm4gcG9wdXAoYGh0dHBzOi8vd3d3LnJlZGRpdC5jb20vc3VibWl0P3VybD0ke3VybH0mdGl0bGU9JHt0aXRsZX1gKTtcbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZrb250YWt0ZSh1cmwsIHRpdGxlID0gJycpIHtcbiAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsKTtcbiAgICB0aXRsZSA9IGVuY29kZVVSSUNvbXBvbmVudCh0aXRsZSk7XG4gICAgcmV0dXJuIHBvcHVwKGBodHRwOi8vc2hhcmUucmVucmVuLmNvbS9zaGFyZS9idXR0b25zaGFyZS5kbz9saW5rPSR7dXJsfSZ0aXRsZT0ke3RpdGxlfWApO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc21zKHVybCwgYm9keSA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG5cbiAgICBjb25zdCBuZXdsaW5lcyA9IGVuY29kZVVSSUNvbXBvbmVudCgnXFxyXFxuXFxyXFxuJyk7XG4gICAgYm9keSA9IGJvZHkgPyBgJHtlbmNvZGVVUklDb21wb25lbnQoYm9keSl9JHtuZXdsaW5lc31gIDogJyc7XG5cbiAgICBjb25zdCBpb3MgPSAvaVBbYW9dZHxpUGhvbmUvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIGNvbnN0IGRlbGltID0gaW9zID8gJyYnIDogJz8nO1xuXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgc21zOiR7ZGVsaW19Ym9keT0ke2JvZHl9JHt1cmx9YDtcbn1cbiIsImltcG9ydCBwb3B1cCBmcm9tICcuLi9wb3B1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHR3aXR0ZXIodXJsLCB0ZXh0ID0gJycsIGhhc2h0YWdzID0gJycsIHJlbGF0ZWQgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHRleHQgPSBlbmNvZGVVUklDb21wb25lbnQodGV4dCk7XG4gICAgaGFzaHRhZ3MgPSBlbmNvZGVVUklDb21wb25lbnQoaGFzaHRhZ3MpO1xuICAgIHJlbGF0ZWQgPSBlbmNvZGVVUklDb21wb25lbnQocmVsYXRlZCk7XG5cbiAgICByZXR1cm4gcG9wdXAoYGh0dHBzOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0P3VybD0ke3VybH0mdGV4dD0ke3RleHR9Jmhhc2h0YWdzPSR7aGFzaHRhZ3N9JnJlbGF0ZWQ9JHtyZWxhdGVkfWApO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmtvbnRha3RlKHVybCwgdGl0bGUgPSAnJywgZGVzY3JpcHRpb24gPSAnJywgaW1hZ2UgPSAnJykge1xuICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwpO1xuICAgIHRpdGxlID0gZW5jb2RlVVJJQ29tcG9uZW50KHRpdGxlKTtcbiAgICBkZXNjcmlwdGlvbiA9IGVuY29kZVVSSUNvbXBvbmVudChkZXNjcmlwdGlvbik7XG4gICAgaW1hZ2UgPSBlbmNvZGVVUklDb21wb25lbnQoaW1hZ2UpO1xuICAgIHJldHVybiBwb3B1cChgaHR0cDovL3Zrb250YWt0ZS5ydS9zaGFyZS5waHA/dXJsPSR7dXJsfSZ0aXRsZT0ke3RpdGxlfSZkZXNjcmlwdGlvbj0ke2Rlc2NyaXB0aW9ufSZpbWFnZT0ke2ltYWdlfWApO1xufVxuIiwiaW1wb3J0IHBvcHVwIGZyb20gJy4uL3BvcHVwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2VpYm8odXJsLCB0aXRsZSA9ICcnLCBpbWFnZSA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG4gICAgdGl0bGUgPSBlbmNvZGVVUklDb21wb25lbnQodGl0bGUpO1xuICAgIGltYWdlID0gZW5jb2RlVVJJQ29tcG9uZW50KGltYWdlKTtcblxuICAgIGNvbnN0IHBhcmFtcyA9IGB1cmw9JHt1cmx9JmFwcGtleT0mdGl0bGU9JHt0aXRsZX0mcGljPSR7aW1hZ2V9JnJhbGF0ZVVpZD0mbGFuZ3VhZ2U9emhfY25gO1xuICAgIHJldHVybiBwb3B1cChgaHR0cDovL3NlcnZpY2Uud2VpYm8uY29tL3NoYXJlL3NoYXJlLnBocD8ke3BhcmFtc31gKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdoYXRzYXBwKHVybCwgYm9keSA9ICcnKSB7XG4gICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCk7XG5cbiAgICBjb25zdCBuZXdsaW5lcyA9IGVuY29kZVVSSUNvbXBvbmVudCgnXFxyXFxuXFxyXFxuJyk7XG4gICAgYm9keSA9IGJvZHkgPyBgJHtlbmNvZGVVUklDb21wb25lbnQoYm9keSl9JHtuZXdsaW5lc31gIDogJyc7XG5cbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGB3aGF0c2FwcDovL3NlbmQ/dGV4dD0ke2JvZHl9JHt1cmx9YDtcbn1cbiIsImZ1bmN0aW9uIGxvYWQoa2V5KSB7XG4gICAgbGV0IGl0ZW0gPSBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgICAgaXRlbSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7fVxuXG4gICAgcmV0dXJuIGl0ZW07XG59XG5cbmZ1bmN0aW9uIHNhdmUoa2V5LCBpdGVtKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBpdGVtKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0NvdWxkblxcJ3Qgc2F2ZSBpbiBsb2NhbFN0b3JhZ2UnKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGxvYWRKU09OKGtleSkge1xuICAgIGNvbnN0IGl0ZW0gPSBsb2FkKGtleSk7XG4gICAgcmV0dXJuIGl0ZW0gPyBKU09OLnBhcnNlKGl0ZW0pIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gc2F2ZUpTT04oa2V5LCBpdGVtKSB7XG4gICAgcmV0dXJuIHNhdmUoa2V5LCBKU09OLnN0cmluZ2lmeShpdGVtKSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZShrZXkpIHtcbiAgICB0cnkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgIH0gY2F0Y2ggKGVycikge31cbn1cblxuZXhwb3J0IGRlZmF1bHQge2xvYWQsIHNhdmUsIGxvYWRKU09OLCBzYXZlSlNPTiwgcmVtb3ZlfTtcbiIsIi8vIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2Ygc3Vic3RyIGluIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWZ0ZXJGaXJzdChzdHIsIHN1YnN0cikge1xuICAgIGxldCBpbmRleCA9IHN0ci5pbmRleE9mKHN1YnN0cik7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGluZGV4ICs9IHN1YnN0ci5sZW5ndGg7XG4gICAgcmV0dXJuIHN0ci5zbGljZShpbmRleCk7XG59XG4iLCIvLyBldmVyeXRoaW5nIGFmdGVyIHRoZSBsYXN0IG9jY3VyZW5jZSBvZiBzdWJzdHIgaW4gc3RyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZnRlckxhc3Qoc3RyLCBzdWJzdHIpIHtcbiAgICBsZXQgaW5kZXggPSBzdHIubGFzdEluZGV4T2Yoc3Vic3RyKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaW5kZXggKz0gc3Vic3RyLmxlbmd0aDtcbiAgICByZXR1cm4gc3RyLnNsaWNlKGluZGV4KTtcbn1cbiIsIi8vIGV2ZXJ5dGhpbmcgYmVmb3JlIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIHN1YnN0ciBpbiBzdHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJlZm9yZUZpcnN0KHN0ciwgc3Vic3RyKSB7XG4gICAgY29uc3QgaW5kZXggPSBzdHIuaW5kZXhPZihzdWJzdHIpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gc3RyLnNsaWNlKDAsIGluZGV4KTtcbn1cbiIsIi8vIGV2ZXJ5dGhpbmcgYmVmb3JlIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2Ygc3Vic3RyIGluIHRoZSBzdHJpbmcuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiZWZvcmVMYXN0KHN0ciwgc3Vic3RyKSB7XG4gICAgY29uc3QgaW5kZXggPSBzdHIubGFzdEluZGV4T2Yoc3Vic3RyKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIHN0ci5zbGljZSgwLCBpbmRleCk7XG59XG4iLCIvLyB3aGV0aGVyIHN0ciBiZWdpbnMgd2l0aCBzdWJzdHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJlZ2luc1dpdGgoc3RyLCBzdWJzdHIpIHtcbiAgICByZXR1cm4gc3RyLmluZGV4T2Yoc3Vic3RyKSA9PT0gMDtcbn1cbiIsIi8vIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IG9jY3VyYW5jZSBvZiBzdGFydCBhbmQgYmVmb3JlIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGVuZFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmV0d2VlbihzdHIsIHN0YXJ0LCBlbmQpIHtcbiAgICBsZXQgc3Vic3RyID0gJyc7XG4gICAgbGV0IHN0YXJ0SW5kZXggPSBzdHIuaW5kZXhPZihzdGFydCk7XG4gICAgaWYgKHN0YXJ0SW5kZXggIT09IC0xKSB7XG4gICAgICAgIHN0YXJ0SW5kZXggKz0gc3RhcnQubGVuZ3RoO1xuICAgICAgICBjb25zdCBlbmRJbmRleCA9IHN0ci5pbmRleE9mKGVuZCwgc3RhcnRJbmRleCk7XG4gICAgICAgIGlmIChlbmRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHN1YnN0ciA9IHN0ci5zbGljZShzdGFydEluZGV4LCBlbmRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN1YnN0cjtcbn1cbiIsImltcG9ydCBlc2NhcGVQYXR0ZXJuIGZyb20gJy4vZXNjYXBlUGF0dGVybic7XG5pbXBvcnQgdHJ1bmNhdGUgZnJvbSAnLi90cnVuY2F0ZSc7XG4vLyBVdGlsaXR5IG1ldGhvZCB0aGF0IGludGVsbGlnZW50bHkgYnJlYWtzIHVwIHlvdXIgc3RyaW5nLFxuLy8gYWxsb3dpbmcgeW91IHRvIGNyZWF0ZSBibG9ja3Mgb2YgcmVhZGFibGUgdGV4dC5cbi8vIFRoaXMgbWV0aG9kIHJldHVybnMgeW91IHRoZSBjbG9zZXN0IHBvc3NpYmxlIG1hdGNoIHRvIHRoZSBkZWxpbSBwYXJhbWF0ZXIsXG4vLyB3aGlsZSBrZWVwaW5nIHRoZSB0ZXh0IGxlbmd0aCB3aXRoaW4gdGhlIGxlbiBwYXJhbXRlci5cbi8vIElmIGEgbWF0Y2ggY2FuJ3QgYmUgZm91bmQgaW4geW91ciBzcGVjaWZpZWQgbGVuZ3RoIGFuICAnLi4uJyBpcyBhZGRlZCB0byB0aGF0IGJsb2NrLFxuLy8gYW5kIHRoZSBibG9ja2luZyBjb250aW51ZXMgdW50aWxsIGFsbCB0aGUgdGV4dCBpcyBicm9rZW4gYXBhcnQuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBibG9jayhzdHIsIGxlbiwgZGVsaW0gPSAnLicpIHtcbiAgICBjb25zdCBhcnIgPSBbXTtcblxuICAgIGlmICghc3RyIHx8ICFzdHIuaW5jbHVkZXMoZGVsaW0pKSB7XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuXG4gICAgaWYgKGRlbGltID09PSAnICcpIHtcbiAgICAgICAgc3RyICs9IGRlbGltO1xuICAgIH1cblxuICAgIGxldCBjaHJJbmRleCA9IDA7XG4gICAgY29uc3QgcmVwbFBhdHQgPSBuZXcgUmVnRXhwKCdbXicgKyBlc2NhcGVQYXR0ZXJuKGRlbGltKSArICddKyQnKTtcblxuICAgIHdoaWxlIChjaHJJbmRleCA8IHN0ci5sZW5ndGgpIHtcbiAgICAgICAgbGV0IHN1YlN0cmluZyA9IHN0ci5zdWJzdHIoY2hySW5kZXgsIGxlbik7XG4gICAgICAgIGlmICghc3ViU3RyaW5nLmluY2x1ZGVzKGRlbGltKSkge1xuICAgICAgICAgICAgYXJyLnB1c2godHJ1bmNhdGUoc3ViU3RyaW5nLCBzdWJTdHJpbmcubGVuZ3RoKSk7XG4gICAgICAgICAgICBjaHJJbmRleCArPSBzdWJTdHJpbmcubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHN1YlN0cmluZyA9IHN1YlN0cmluZy5yZXBsYWNlKHJlcGxQYXR0LCAnJyk7XG4gICAgICAgIGNockluZGV4ICs9IHN1YlN0cmluZy5sZW5ndGg7XG4gICAgICAgIGFyci5wdXNoKHN1YlN0cmluZy50cmltKCkpO1xuICAgIH1cbiAgICByZXR1cm4gYXJyO1xufVxuIiwiLy8gQ2FwaXRhbGl6ZSB0aGUgZmlyc3Qgd29yZCBpbiBhIHN0cmluZyBvciBhbGwgd29yZHNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyLCBhbGwgPSBmYWxzZSkge1xuICAgIGNvbnN0IHN1YnN0ciA9IHN0ci50cmltTGVmdCgpO1xuICAgIGNvbnN0IHJlID0gYWxsID8gL14ufFxcYi4vZyA6IC8oXlxcdykvO1xuICAgIHJldHVybiBzdWJzdHIucmVwbGFjZShyZSwgKG1hdGNoKSA9PiBtYXRjaC50b1VwcGVyQ2FzZSgpKTtcbn1cbiIsImltcG9ydCBlc2NhcGVQYXR0ZXJuIGZyb20gJy4vZXNjYXBlUGF0dGVybic7XG5cbi8vIHRoZSBudW1iZXIgb2YgdGltZXMgc3Vic3RyIGFwcGVhcnMgd2l0aGluIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY291bnRPZihzdHIsIHN1YnN0ciwgY2FzZVNlbnNpdGl2ZSkge1xuICAgIGNvbnN0IGVzY2FwZWRTdHIgPSBlc2NhcGVQYXR0ZXJuKHN1YnN0cik7XG4gICAgY29uc3QgZmxhZ3MgPSAoIWNhc2VTZW5zaXRpdmUpID8gJ2lnJyA6ICdnJztcbiAgICByZXR1cm4gc3RyLm1hdGNoKG5ldyBSZWdFeHAoZXNjYXBlZFN0ciwgZmxhZ3MpKS5sZW5ndGg7XG59XG4iLCIvLyBMZXZlbnNodGVpbiBkaXN0YW5jZSAoZWRpdERpc3RhbmNlKSBpcyBhIG1lYXN1cmUgb2YgdGhlIHNpbWlsYXJpdHkgYmV0d2VlblxuLy8gdHdvIHN0cmluZ3MuIFRoZSBkaXN0YW5jZSBpcyB0aGUgbnVtYmVyIG9mIGRlbGV0aW9ucywgaW5zZXJ0aW9ucywgb3Jcbi8vIHN1YnN0aXR1dGlvbnMgcmVxdWlyZWQgdG8gdHJhbnNmb3JtIHNvdXJjZSBpbnRvIHRhcmdldC5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVkaXREaXN0YW5jZShzb3VyY2UgPSAnJywgdGFyZ2V0ID0gJycpIHtcblxuICAgIGlmIChzb3VyY2UgPT09IHRhcmdldCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBpZiAoIXNvdXJjZS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldC5sZW5ndGg7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXQubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UubGVuZ3RoO1xuICAgIH1cblxuICAgIGNvbnN0IGQgPSBbXTtcbiAgICBsZXQgaSwgaiwgY29zdDtcblxuICAgIGZvciAoaSA9IDA7IGkgPD0gc291cmNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRbaV0gPSBbXTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8PSBzb3VyY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZFtpXVswXSA9IGk7XG4gICAgfVxuICAgIGZvciAoaiA9IDA7IGogPD0gdGFyZ2V0Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRbMF1bal0gPSBqO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDE7IGkgPD0gc291cmNlLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgY29uc3Qgc2kgPSBzb3VyY2UuY2hhckF0KGkgLSAxKTtcbiAgICAgICAgZm9yIChqID0gMTsgaiA8PSB0YXJnZXQubGVuZ3RoOyBqKyspIHtcblxuICAgICAgICAgICAgY29uc3QgdGogPSB0YXJnZXQuY2hhckF0KGogLSAxKTtcblxuICAgICAgICAgICAgaWYgKHNpID09PSB0aikge1xuICAgICAgICAgICAgICAgIGNvc3QgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3N0ID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZFtpXVtqXSA9IE1hdGgubWluKGRbaSAtIDFdW2pdICsgMSwgZFtpXVtqIC0gMV0gKyAxLCBkW2kgLSAxXVtqIC0gMV0gKyBjb3N0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkW3NvdXJjZS5sZW5ndGhdW3RhcmdldC5sZW5ndGhdO1xufVxuIiwiLy8gd2hldGhlciBzdHIgZW5kcyB3aXRoIHN1YnN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZW5kc1dpdGgoc3RyLCBzdWJzdHIpIHtcbiAgICByZXR1cm4gc3RyLmxhc3RJbmRleE9mKHN1YnN0cikgPT09IHN0ci5sZW5ndGggLSBzdWJzdHIubGVuZ3RoO1xufVxuIiwiLy8gZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXNjYXBlSHRtbChzdHIpIHtcbi8vICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vICAgICBkaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3RyKSk7XG4vLyAgICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XG4vLyB9XG5cbmNvbnN0IGVudGl0eU1hcCA9IHtcbiAgICAnJic6ICcmYW1wOycsXG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0OycsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgJ1xcJyc6ICcmIzM5OycsXG4gICAgJy8nOiAnJiN4MkY7JyxcbiAgICAnYCc6ICcmI3g2MDsnLFxuICAgICc9JzogJyYjeDNEOydcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyaW5nKSB7XG4gICAgcmV0dXJuIFN0cmluZyhzdHJpbmcpXG4gICAgICAgIC5yZXBsYWNlKC9bJjw+XCInYD1cXC9dL2csIGZ1bmN0aW9uIGZyb21FbnRpdHlNYXAocykge1xuICAgICAgICAgICAgcmV0dXJuIGVudGl0eU1hcFtzXTtcbiAgICAgICAgfSk7XG59XG4iLCIvLyByZWdleCBlc2NhcGUgcGF0dGVyblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXNjYXBlUGF0dGVybihwYXR0ZXJuKSB7XG4gICAgcmV0dXJuIHBhdHRlcm4ucmVwbGFjZSgvKFxcXXxcXFt8XFx7fFxcfXxcXCh8XFwpfFxcKnxcXCt8XFw/fFxcLnxcXFxcKS9nLCAnXFxcXCQxJyk7XG59XG4iLCJpbXBvcnQgcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlIGZyb20gJy4vcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlJztcblxuLy8gd2hldGhlciBzdHIgY29udGFpbnMgYW55IHRleHRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhhc1RleHQoc3RyKSB7XG4gICAgcmV0dXJuICEhcmVtb3ZlRXh0cmFXaGl0ZXNwYWNlKHN0cikubGVuZ3RoO1xufVxuIiwiaW1wb3J0IGFmdGVyRmlyc3QgZnJvbSAnLi9hZnRlckZpcnN0JztcbmltcG9ydCBhZnRlckxhc3QgZnJvbSAnLi9hZnRlckxhc3QnO1xuaW1wb3J0IGJlZm9yZUZpcnN0IGZyb20gJy4vYmVmb3JlRmlyc3QnO1xuaW1wb3J0IGJlZm9yZUxhc3QgZnJvbSAnLi9iZWZvcmVMYXN0JztcbmltcG9ydCBiZWdpbnNXaXRoIGZyb20gJy4vYmVnaW5zV2l0aCc7XG5pbXBvcnQgYmV0d2VlbiBmcm9tICcuL2JldHdlZW4nO1xuaW1wb3J0IGJsb2NrIGZyb20gJy4vYmxvY2snO1xuaW1wb3J0IGNhcGl0YWxpemUgZnJvbSAnLi9jYXBpdGFsaXplJztcbmltcG9ydCBjb3VudE9mIGZyb20gJy4vY291bnRPZic7XG5pbXBvcnQgZWRpdERpc3RhbmNlIGZyb20gJy4vZWRpdERpc3RhbmNlJztcbmltcG9ydCBlbmRzV2l0aCBmcm9tICcuL2VuZHNXaXRoJztcbmltcG9ydCBlc2NhcGVIVE1MIGZyb20gJy4vZXNjYXBlSFRNTCc7XG5pbXBvcnQgZXNjYXBlUGF0dGVybiBmcm9tICcuL2VzY2FwZVBhdHRlcm4nO1xuaW1wb3J0IGhhc1RleHQgZnJvbSAnLi9oYXNUZXh0JztcbmltcG9ydCBpc051bWVyaWMgZnJvbSAnLi9pc051bWVyaWMnO1xuaW1wb3J0IHBhZExlZnQgZnJvbSAnLi9wYWRMZWZ0JztcbmltcG9ydCBwYWRSaWdodCBmcm9tICcuL3BhZFJpZ2h0JztcbmltcG9ydCBwcmV2ZW50V2lkb3cgZnJvbSAnLi9wcmV2ZW50V2lkb3cnO1xuaW1wb3J0IHByb3BlckNhc2UgZnJvbSAnLi9wcm9wZXJDYXNlJztcbmltcG9ydCByZW1vdmUgZnJvbSAnLi9yZW1vdmUnO1xuaW1wb3J0IHJlbW92ZUV4dHJhV2hpdGVzcGFjZSBmcm9tICcuL3JlbW92ZUV4dHJhV2hpdGVzcGFjZSc7XG5pbXBvcnQgcmV2ZXJzZSBmcm9tICcuL3JldmVyc2UnO1xuaW1wb3J0IHJldmVyc2VXb3JkcyBmcm9tICcuL3JldmVyc2VXb3Jkcyc7XG5pbXBvcnQgc2ltaWxhcml0eSBmcm9tICcuL3NpbWlsYXJpdHknO1xuaW1wb3J0IHN0cmlwVGFncyBmcm9tICcuL3N0cmlwVGFncyc7XG5pbXBvcnQgc3dhcENhc2UgZnJvbSAnLi9zd2FwQ2FzZSc7XG5pbXBvcnQgdGltZUNvZGUgZnJvbSAnLi90aW1lQ29kZSc7XG5pbXBvcnQgdG9OdW1iZXIgZnJvbSAnLi90b051bWJlcic7XG5pbXBvcnQgdHJ1bmNhdGUgZnJvbSAnLi90cnVuY2F0ZSc7XG5pbXBvcnQgd29yZENvdW50IGZyb20gJy4vd29yZENvdW50JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGFmdGVyRmlyc3QsXG4gICAgYWZ0ZXJMYXN0LFxuICAgIGJlZm9yZUZpcnN0LFxuICAgIGJlZm9yZUxhc3QsXG4gICAgYmVnaW5zV2l0aCxcbiAgICBiZXR3ZWVuLFxuICAgIGJsb2NrLFxuICAgIGNhcGl0YWxpemUsXG4gICAgY291bnRPZixcbiAgICBlZGl0RGlzdGFuY2UsXG4gICAgZW5kc1dpdGgsXG4gICAgZXNjYXBlSFRNTCxcbiAgICBlc2NhcGVQYXR0ZXJuLFxuICAgIGhhc1RleHQsXG4gICAgaXNOdW1lcmljLFxuICAgIHBhZExlZnQsXG4gICAgcGFkUmlnaHQsXG4gICAgcHJldmVudFdpZG93LFxuICAgIHByb3BlckNhc2UsXG4gICAgcmVtb3ZlLFxuICAgIHJlbW92ZUV4dHJhV2hpdGVzcGFjZSxcbiAgICByZXZlcnNlLFxuICAgIHJldmVyc2VXb3JkcyxcbiAgICBzaW1pbGFyaXR5LFxuICAgIHN0cmlwVGFncyxcbiAgICBzd2FwQ2FzZSxcbiAgICB0aW1lQ29kZSxcbiAgICB0b051bWJlcixcbiAgICB0cnVuY2F0ZSxcbiAgICB3b3JkQ291bnRcbn07XG4iLCIvLyB3aGV0aGVyIHN0ciBpcyBudW1lcmljXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc051bWVyaWMoc3RyKSB7XG4gICAgY29uc3QgcmVneCA9IC9eWy0rXT9cXGQqXFwuP1xcZCsoPzpbZUVdWy0rXT9cXGQrKT8kLztcbiAgICByZXR1cm4gcmVneC50ZXN0KHN0cik7XG59XG4iLCIvLyBwYWQgc3RyIHdpdGggc3Vic3RyIGZyb20gdGhlIGxlZnRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhZExlZnQoc3RyLCBzdWJzdHIsIGxlbmd0aCkge1xuICAgIHN0ciA9IFN0cmluZyhzdHIpO1xuICAgIHdoaWxlIChzdHIubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICAgIHN0ciA9IHN1YnN0ciArIHN0cjtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cbiIsIi8vIHBhZHMgc3RyIHdpdGggc3Vic3RyIGZyb20gdGhlIHJpZ2h0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYWRSaWdodChzdHIsIHN1YnN0ciwgbGVuZ3RoKSB7XG4gICAgc3RyID0gU3RyaW5nKHN0cik7XG4gICAgd2hpbGUgKHN0ci5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgICAgc3RyICs9IHN1YnN0cjtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByZXZlbnRXaWRvdyhzdHIpIHtcbiAgICBzdHIgPSBzdHIudHJpbSgpO1xuXG4gICAgY29uc3QgbGFzdFNwYWNlID0gc3RyLmxhc3RJbmRleE9mKCcgJyk7XG4gICAgaWYgKGxhc3RTcGFjZSA+IDApIHtcbiAgICAgICAgcmV0dXJuIGAke3N0ci5zbGljZSgwLCBsYXN0U3BhY2UpfSZuYnNwOyR7c3RyLnNsaWNlKGxhc3RTcGFjZSArIDEpfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cjtcbn1cbiIsImltcG9ydCBjYXBpdGFsaXplIGZyb20gJy4vY2FwaXRhbGl6ZSc7XG5cbi8vIHByb3BlciBjYXNlIHN0ciBpbiBzZW50ZW5jZSBmb3JtYXRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb3BlckNhc2Uoc3RyKSB7XG4gICAgY29uc3QgbmV3U3RyID0gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxiKFteLj87IV0rKS8sIGNhcGl0YWxpemUpO1xuICAgIHJldHVybiBuZXdTdHIucmVwbGFjZSgvXFxiW2ldXFxiLywgJ0knKTtcbn1cbiIsImltcG9ydCBlc2NhcGVQYXR0ZXJuIGZyb20gJy4vZXNjYXBlUGF0dGVybic7XG5cbi8vIHJlbW92ZSBhbGwgaW5zdGFuY2VzIG9mIHN1YnN0ciBpbiBzdHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbW92ZShzdHIsIHN1YnN0ciwgY2FzZVNlbnNpdGl2ZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgZXNjYXBlZFN0ciA9IGVzY2FwZVBhdHRlcm4oc3Vic3RyKTtcbiAgICBjb25zdCBmbGFncyA9IGNhc2VTZW5zaXRpdmUgPyAnZycgOiAnaWcnO1xuICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKGVzY2FwZWRTdHIsIGZsYWdzKSwgJycpO1xufVxuIiwiLy8gcmVtb3ZlIGV4dHJhIHdoaXRlc3BhY2UgKGV4dHJhIHNwYWNlcywgdGFicywgbGluZSBicmVha3MsIGV0YylcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbW92ZUV4dHJhV2hpdGVzcGFjZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnRyaW0oKS5yZXBsYWNlKC9cXHMrL2csICcgJyk7XG59XG4iLCIvLyByZXZlcnNlIGNoYXJhY3RlciBvcmRlclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmV2ZXJzZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJyk7XG59XG4iLCIvLyByZXZlcnNlIHdvcmQgb3JkZXJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJldmVyc2VXb3JkcyhzdHIpIHtcbiAgICByZXR1cm4gc3RyLnNwbGl0KCcgJykucmV2ZXJzZSgpLmpvaW4oJyAnKTtcbn1cbiIsImltcG9ydCBlZGl0RGlzdGFuY2UgZnJvbSAnLi9lZGl0RGlzdGFuY2UnO1xuXG4vLyBwZXJjZW50YWdlIG9mIHNpbWlsaWFyaXR5IGZyb20gMCB0byAxXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaW1pbGFyaXR5KGEsIGIpIHtcbiAgICBjb25zdCBlID0gZWRpdERpc3RhbmNlKGEsIGIpO1xuICAgIGNvbnN0IG0gPSBNYXRoLm1heChhLmxlbmd0aCwgYi5sZW5ndGgpO1xuICAgIGlmIChtID09PSAwKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICByZXR1cm4gKDEgLSBlIC8gbSk7XG59XG4iLCIvLyByZW1vdmUgYWxsIEhUTUwgdGFncyBmcm9tIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RyaXBUYWdzKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvPFxcLz9bXj5dKz4vaWdtLCAnJyk7XG59XG4iLCJcbi8vIHN3YXBzIHRoZSBjYXNlIG9mIHN0clxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3dhcENhc2Uoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oXFx3KS8sIGZ1bmN0aW9uKG5ld1N0cikge1xuICAgICAgICBjb25zdCBsb3dlciA9IG5ld1N0ci50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCB1cHBlciA9IG5ld1N0ci50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBzd2l0Y2ggKG5ld1N0cikge1xuICAgICAgICAgICAgY2FzZSBsb3dlcjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdXBwZXI7XG4gICAgICAgICAgICBjYXNlIHVwcGVyOlxuICAgICAgICAgICAgICAgIHJldHVybiBsb3dlcjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1N0cjtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiLy8gZm9ybWF0cyBzZWNvbmRzIGludG8gSEg6TU06U1NcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRpbWVDb2RlKHNlY29uZHMsIGRlbGltID0gJzonKSB7XG4gICAgY29uc3QgaCA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDM2MDApO1xuICAgIGNvbnN0IG0gPSBNYXRoLmZsb29yKChzZWNvbmRzICUgMzYwMCkgLyA2MCk7XG4gICAgY29uc3QgcyA9IE1hdGguZmxvb3IoKHNlY29uZHMgJSAzNjAwKSAlIDYwKTtcbiAgICBjb25zdCBociA9IChoIDwgMTAgPyAnMCcgKyBoIDogaCkgKyBkZWxpbTtcbiAgICBjb25zdCBtbiA9IChtIDwgMTAgPyAnMCcgKyBtIDogbSkgKyBkZWxpbTtcbiAgICBjb25zdCBzYyA9IChzIDwgMTAgPyAnMCcgKyBzIDogcyk7XG4gICAgcmV0dXJuIGhyICsgbW4gKyBzYztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvTnVtYmVyKHN0cikge1xuICAgIHJldHVybiBOdW1iZXIoc3RyLnJlcGxhY2UoL1teMC05Ll0vZywgJycpKTtcbn1cbiIsIi8vIHRydW5jYXRlIHRvIGxlbmd0aCB3aXRoIHN1ZmZpeFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJ1bmNhdGUoc3RyLCBsZW4sIHN1ZmZpeCA9ICcuLi4nKSB7XG4gICAgbGVuIC09IHN1ZmZpeC5sZW5ndGg7XG4gICAgbGV0IHRydW5jID0gc3RyO1xuICAgIGlmICh0cnVuYy5sZW5ndGggPiBsZW4pIHtcbiAgICAgICAgdHJ1bmMgPSB0cnVuYy5zdWJzdHIoMCwgbGVuKTtcbiAgICAgICAgY29uc3QgciA9IC9bXlxcc10vO1xuICAgICAgICBpZiAoci50ZXN0KHN0ci5jaGFyQXQobGVuKSkpIHtcbiAgICAgICAgICAgIHRydW5jID0gdHJ1bmMucmVwbGFjZSgvXFx3KyR8XFxzKyQvLCAnJykudHJpbVJpZ2h0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ1bmMgKz0gc3VmZml4O1xuICAgIH1cbiAgICByZXR1cm4gdHJ1bmM7XG59XG4iLCIvLyB0aGUgbnVtYmVyIG9mIHdvcmRzIGluIGEgc3RyaW5nXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3b3JkQ291bnQoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5tYXRjaCgvXFxiXFx3K1xcYi9nKS5sZW5ndGg7XG59XG4iLCIvLyBpbXBvcnQgU2lnbmFsIGZyb20gJ3NpZ25hbHMnO1xuaW1wb3J0IE1pbmlTaWduYWwgZnJvbSAnbWluaS1zaWduYWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlja2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy51cGRhdGUgPSB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpO1xuICAgICAgICAvLyB0aGlzLm9uVXBkYXRlID0gbmV3IFNpZ25hbCgpO1xuICAgICAgICB0aGlzLm9uVXBkYXRlID0gbmV3IE1pbmlTaWduYWwoKTtcblxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sYXN0ID0gMDtcbiAgICAgICAgLy8gdGhpcy5hY2N1bXVsYXRlZCA9IDA7XG4gICAgICAgIC8vIHRoaXMuc3RlcCA9IDEwMDAgLyA2MDtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgaWYgKHRoaXMucnVubmluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICBzdG9wKCkge1xuICAgICAgICBpZiAoIXRoaXMucnVubmluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAoIXRoaXMucnVubmluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZSk7XG5cbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgbGV0IGR0ID0gbm93IC0gdGhpcy5sYXN0O1xuICAgICAgICBpZiAoZHQgPiAyMCkge1xuICAgICAgICAgICAgZHQgPSAyMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhc3QgPSBub3c7XG5cbiAgICAgICAgLy8gIC8vIGZpeGVkIHN0ZXA6XG4gICAgICAgIC8vIHRoaXMuYWNjdW11bGF0ZWQgKz0gZHQ7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIHdoaWxlICh0aGlzLmFjY3VtdWxhdGVkID49IHRoaXMuc3RlcCkge1xuICAgICAgICAvLyAgICAgdGhpcy5hY2N1bXVsYXRlZCAtPSB0aGlzLnN0ZXA7XG4gICAgICAgIC8vICAgICB0aGlzLm9uVXBkYXRlLmRpc3BhdGNoKHRoaXMuc3RlcCk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICB0aGlzLm9uVXBkYXRlLmRpc3BhdGNoKGR0ICogMC4wMDEpO1xuICAgIH1cblxuICAgIGFkZChmbiwgY29udGV4dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vblVwZGF0ZS5hZGQoZm4sIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJlbW92ZShiaW5kaW5nKSB7XG4gICAgICAgIHRoaXMub25VcGRhdGUuZGV0YWNoKGJpbmRpbmcpO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZShmbiwgY29udGV4dCkge1xuICAgIC8vICAgICB0aGlzLm9uVXBkYXRlLnJlbW92ZShmbiwgY29udGV4dCk7XG4gICAgLy8gfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXZlbnQoY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwsIHZhbHVlKSB7XG4gICAgaWYgKCF3aW5kb3cuZ2EpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB3aW5kb3cuZ2EoJ3NlbmQnLCAnZXZlbnQnLCBjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCwgdmFsdWUpO1xufVxuIiwiaW1wb3J0IGV2ZW50IGZyb20gJy4vZXZlbnQnO1xuaW1wb3J0IHBhZ2V2aWV3IGZyb20gJy4vcGFnZXZpZXcnO1xuaW1wb3J0IGxvYWQgZnJvbSAnLi9sb2FkJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIGV2ZW50LFxuICAgIHBhZ2V2aWV3LFxuICAgIGxvYWRcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkKGdhQWNjb3VudCkge1xuICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXplIEdvb2dsZSBBbmFseXRpY3Mgd2l0aCBhY2NvdW50IElkOicsIGdhQWNjb3VudCk7XG5cbiAgICAvKmVzbGludC1kaXNhYmxlKi9cbiAgICAoZnVuY3Rpb24oaSxzLG8sZyxyLGEsbSl7aVsnR29vZ2xlQW5hbHl0aWNzT2JqZWN0J109cjtpW3JdPWlbcl18fGZ1bmN0aW9uKCl7XG5cdChpW3JdLnE9aVtyXS5xfHxbXSkucHVzaChhcmd1bWVudHMpfSxpW3JdLmw9MSpuZXcgRGF0ZSgpO2E9cy5jcmVhdGVFbGVtZW50KG8pLFxuXHRtPXMuZ2V0RWxlbWVudHNCeVRhZ05hbWUobylbMF07YS5hc3luYz0xO2Euc3JjPWc7bS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhLG0pXG5cdH0pKHdpbmRvdyxkb2N1bWVudCwnc2NyaXB0JywnLy93d3cuZ29vZ2xlLWFuYWx5dGljcy5jb20vYW5hbHl0aWNzLmpzJywnZ2EnKTtcbiAgICAvKmVzbGludC1lbmFibGUqL1xuXG4gICAgd2luZG93LmdhKCdjcmVhdGUnLCBnYUFjY291bnQsICdhdXRvJyk7XG4gICAgd2luZG93LmdhKCdzZW5kJywgJ3BhZ2V2aWV3Jyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYWdldmlldyhwYXRoKSB7XG4gICAgaWYgKCF3aW5kb3cuZ2EpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB3aW5kb3cuZ2EoJ3NlbmQnLCAncGFnZXZpZXcnLCBwYXRoKTtcbn1cbiIsImltcG9ydCB7ZWFzZU91dFF1YWR9IGZyb20gJy4uL2Vhc2UvcXVhZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR3ZWVuIHtcbiAgICBjb25zdHJ1Y3RvcihvYiwgcHJvcHMsIGR1cmF0aW9uLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMub2IgPSBvYjtcblxuICAgICAgICBpZiAocHJvcHMpIHtcbiAgICAgICAgICAgIHRoaXMudG8ocHJvcHMsIGR1cmF0aW9uLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvKHByb3BzLCBkdXJhdGlvbiwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgICAgdGhpcy5lYXNlID0gb3B0aW9ucy5lYXNlIHx8IGVhc2VPdXRRdWFkO1xuICAgICAgICB0aGlzLmRlbGF5ID0gb3B0aW9ucy5kZWxheSB8fCAwO1xuICAgICAgICB0aGlzLm9uVXBkYXRlID0gb3B0aW9ucy5vblVwZGF0ZTtcbiAgICAgICAgdGhpcy5vbkNvbXBsZXRlID0gb3B0aW9ucy5vbkNvbXBsZXRlO1xuICAgICAgICB0aGlzLnRpbWUgPSAwO1xuICAgICAgICB0aGlzLmNvbXBsZXRlID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fcHJvcHMgPSBPYmplY3Qua2V5cyhwcm9wcyk7XG4gICAgICAgIHRoaXMuX2JlZ2luVmFscyA9IHt9O1xuICAgICAgICB0aGlzLl9jaGFuZ2VWYWxzID0ge307XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9wcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcHJvcCA9IHRoaXMuX3Byb3BzW2ldO1xuICAgICAgICAgICAgdGhpcy5fYmVnaW5WYWxzW3Byb3BdID0gdGhpcy5vYltwcm9wXTtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZVZhbHNbcHJvcF0gPSBwcm9wc1twcm9wXSAtIHRoaXMuX2JlZ2luVmFsc1twcm9wXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICBpZiAodGhpcy50aW1lID09PSB0aGlzLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kZWxheSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVsYXkgLT0gZHQ7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRpbWUgKz0gZHQ7XG5cbiAgICAgICAgaWYgKHRoaXMudGltZSA+IHRoaXMuZHVyYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IHRoaXMuZHVyYXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3Byb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wID0gdGhpcy5fcHJvcHNbaV07XG4gICAgICAgICAgICB0aGlzLm9iW3Byb3BdID0gdGhpcy5lYXNlKHRoaXMudGltZSwgdGhpcy5fYmVnaW5WYWxzW3Byb3BdLCB0aGlzLl9jaGFuZ2VWYWxzW3Byb3BdLCB0aGlzLmR1cmF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm9uVXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLm9uVXBkYXRlKHRoaXMub2IpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudGltZSA9PT0gdGhpcy5kdXJhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5jb21wbGV0ZSA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLm9uQ29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29tcGxldGUodGhpcy5vYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy50aW1lID0gMDtcbiAgICAgICAgdGhpcy5jb21wbGV0ZSA9IGZhbHNlO1xuICAgIH1cbn1cbiIsImxldCBoaWRkZW4sXG4gICAgY2hhbmdlO1xuXG5pZiAodHlwZW9mIGRvY3VtZW50LmhpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBoaWRkZW4gPSAnaGlkZGVuJztcbiAgICBjaGFuZ2UgPSAndmlzaWJpbGl0eWNoYW5nZSc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC5tb3pIaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaGlkZGVuID0gJ21vekhpZGRlbic7XG4gICAgY2hhbmdlID0gJ21venZpc2liaWxpdHljaGFuZ2UnO1xufSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQubXNIaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaGlkZGVuID0gJ21zSGlkZGVuJztcbiAgICBjaGFuZ2UgPSAnbXN2aXNpYmlsaXR5Y2hhbmdlJztcbn0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50LndlYmtpdEhpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBoaWRkZW4gPSAnd2Via2l0SGlkZGVuJztcbiAgICBjaGFuZ2UgPSAnd2Via2l0dmlzaWJpbGl0eWNoYW5nZSc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBoaWRkZW4sXG4gICAgY2hhbmdlXG59O1xuIiwiaW1wb3J0IGFwaSBmcm9tICcuL2FwaSc7XG5pbXBvcnQgZW1pdHRlciBmcm9tICcuLi9ldmVudHMvZW1pdHRlcic7XG5cbmNvbnN0IHZpc2liaWxpdHkgPSBPYmplY3QuY3JlYXRlKGVtaXR0ZXIucHJvdG90eXBlLCB7XG4gICAgaGlkZGVuOiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnRbYXBpLmhpZGRlbl07XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuZnVuY3Rpb24gb25WaXNpYmlsaXR5Q2hhbmdlKCkge1xuICAgIGlmIChkb2N1bWVudFthcGkuaGlkZGVuXSkge1xuICAgICAgICB2aXNpYmlsaXR5LmVtaXQoJ2hpZGRlbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZpc2liaWxpdHkuZW1pdCgnc2hvd24nKTtcbiAgICB9XG59XG5cbmlmIChhcGkuY2hhbmdlKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihhcGkuY2hhbmdlLCBvblZpc2liaWxpdHlDaGFuZ2UsIGZhbHNlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmlzaWJpbGl0eTtcbiJdfQ==
