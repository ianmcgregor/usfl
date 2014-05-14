'use strict';

var ready = (function() {
	if (document.addEventListener) {
		return function(fn) {
			if (document.readyState === 'complete') {
				fn();
			}
			else {
				document.addEventListener('DOMContentLoaded', fn);
			}
		};
	} else {
		return function(fn) {
			if (document.readyState === 'interactive') {
				fn();
			}
			document.attachEvent('onreadystatechange', function(){
				if (document.readyState === 'interactive') {
					fn();
				}
			});
		};
	}
}());

module.exports = ready;
