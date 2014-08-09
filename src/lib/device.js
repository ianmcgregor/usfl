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
