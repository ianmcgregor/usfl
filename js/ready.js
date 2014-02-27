/* ready.js */

define(
	[],
	function() {

		'use strict';

		var ready = (function() {
			if (document.addEventListener) {
				return function(fn) {
					document.addEventListener('DOMContentLoaded', fn);
				};
			} else {
				return function(fn) {
					document.attachEvent('onreadystatechange', function(){
						if (document.readyState === 'interactive') {
							fn();
						}
					});
				};
			}
		}());

		return ready;
	}
);
