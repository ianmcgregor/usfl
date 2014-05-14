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
