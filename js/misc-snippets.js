/* misc-snippets.js */

define(
	[
		'event-utils'
	],
	function(EventUtils) {

		'use strict';

		// Fix Chrome text cursor on drag
		document.onselectstart = function(){ return false; };

		// randomPick

		var randomPick = function() {
			return arguments[Math.floor(Math.random() * arguments.length)];
		};

		// pad zeros

		var padZeros = function(i, l) {
			var n = i.toString();
			while(n.length < l) {
				n = '0' + n;
			}
			return n;
		};

		var selectEls = function (selector, context) {
			if (!selector || typeof selector !== 'string') { return; }
			if (selector[0] === '#') {
				return document.getElementById(selector.substring(1));
			} else {
				if (context) {
					return context.querySelectorAll(selector);
				} else {
					return document.querySelectorAll(selector);
				}
			}
		};

		var getScrollTop = function () {
			return document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset || 0;
		};

		var leftWindow = function(fn) {
			EventUtils.addEvent('mouseout', document, function(e) {
				e = e ? e : window.event;
				var from = e.relatedTarget || e.toElement;
				if (!from || from.nodeName === 'HTML') {
					fn();
				}
			});
		};

		return {
			'randomPick': randomPick,
			'padZeros': padZeros,
			'selectEls': selectEls,
			'getScrollTop': getScrollTop,
			'leftWindow': leftWindow
		};
});