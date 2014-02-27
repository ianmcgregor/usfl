/* event-utils.js */

define(
	[],
	function() {

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

		return {
			'addEvent': addEvent,
			'removeEvent': removeEvent
		};
	}
);
