/* array-utils.js */

define(
	[],
	function() {

		'use strict';

		return {
			sortNumeric: function(arr) {
				return arr.sort(function(a,b){
					return a - b;
				});
			},
			sortRandom: function(arr) {
				return arr.sort(function(){
					return Math.random() > 0.5 ? -1 : 1;
				});
			}
		};
	}
);
