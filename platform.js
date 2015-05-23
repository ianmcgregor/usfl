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
