/* logger.js */

define(
	[],
	function() {

		'use strict';

		var log = function(elementId, value, x, y) {
			var el = document.getElementById(elementId);
			if(!el) {
				el = document.createElement('div');
				el.setAttribute('id', elementId);
				document.body.appendChild(el);
				el.style.position = 'absolute';
				if(x !== undefined) {
					el.style.left = x + 'px';
				}
				if(y !== undefined) {
					el.style.left = y + 'px';
				}
			}
			el.innerHTML = value;
		};

		return {
			'log': log
		};
	}
);

