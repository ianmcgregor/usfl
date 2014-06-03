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

module.exports = popup;
