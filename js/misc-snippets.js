/* misc-snippets.js */

define(
	[
		'event-utils'
	],
	function(EventUtils) {

		'use strict';

		// Fix Chrome text cursor on drag
		document.onselectstart = function(){ return false; };

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

		// Get current browser viewpane heigtht
		function getWindowHeight() {
			return window.innerHeight ||
					document.documentElement.clientHeight ||
					document.body.clientHeight || 0;
		}

		// Get current absolute window scroll position
		function getWindowScrollY() {
			return window.pageYOffset ||
				document.body.scrollTop ||
				document.documentElement.scrollTop || 0;
		}

		// Get current absolute document height
		function getDocHeight() {
			return Math.max(
				document.body.scrollHeight || 0,
				document.documentElement.scrollHeight || 0,
				document.body.offsetHeight || 0,
				document.documentElement.offsetHeight || 0,
				document.body.clientHeight || 0,
				document.documentElement.clientHeight || 0
			);
		}

		// Get current vertical scroll percentage
		function getScrollPercentage() {
			return ((getWindowScrollY() + getWindowHeight()) / getDocHeight()) * 100;
		}

		return {
			'getScrollTop': getScrollTop,
			'leftWindow': leftWindow,
			'getWindowHeight': getWindowHeight,
			'getWindowScrollY': getWindowScrollY,
			'getDocHeight': getDocHeight,
			'getScrollPercentage': getScrollPercentage
		};
});