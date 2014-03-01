/* console-patch.js */

define(
	[],
	function() {

		'use strict';

		(function(fn) {
			window.console = window.console || {log:fn,warn:fn,error:fn,table:fn};
			window.console.table = window.console.table || fn;
		}(function(){}));
	}
);