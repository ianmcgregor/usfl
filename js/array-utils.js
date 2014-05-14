/* array-utils.js */

define(
	[],
	function() {

		'use strict';

		return {
			isArray: function(arr) {
				return arr instanceof Array;
			},
			sortNumeric: function(arr) {
				return arr.sort(function(a,b){
					return a - b;
				});
			},
			sortRandom: function(arr) {
				return arr.sort(function(){
					return Math.random() > 0.5 ? -1 : 1;
				});
			},
			getRandom: function(arr) {
				return arr[Math.floor(Math.random() * arr.length)];
			}
		};
	}
);
