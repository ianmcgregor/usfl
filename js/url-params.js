/* url-params.js */

define(
	[],
	function() {

		'use strict';

		var urlParams = {};

		(function () {
			var pl = /\+/g;  // Regex for replacing addition symbol with a space
			var search = /([^&=]+)=?([^&]*)/g;
			var decode = function(s) {
				return decodeURIComponent(s.replace(pl, ' '));
			};
			var query = window.location.search.substring(1);
			var match = search.exec(query);
			while (match) {
				urlParams[decode(match[1])] = decode(match[2]);
				match = search.exec(query);
			}
		})();

		return urlParams;
	}
);
