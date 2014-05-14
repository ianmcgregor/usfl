'use strict';

var DEG = 180 / Math.PI;
var RAD = Math.PI / 180;

var self = {
	map: function(v, a, b, x, y) {
		return (v === a) ? x : (v - a) * (y - x) / (b - a) + x;
	},
	lerp: function(from, to, percent) {
		return from + ( to - from ) * percent;
	},
	clamp: function(value, min, max) {
		if(min > max) {
			var a = min;
			min = max;
			max = a;
		}
		if(value < min) {
			return min;
		}
		if(value > max) {
			return max;
		}
		return value;
	},
	random: function(min, max) {
		if ( isNaN(max) ) {
			max = min;
			min = 0;
		}
		return min + Math.random() * (max - min);
	},
	difference: function(a, b) {
		return Math.abs(a - b);
	},
	distance: function(x1, y1, x2, y2) {
		var dx = x1 - x2;
		var dy = y1 - y2;
		return Math.sqrt(dx * dx + dy * dy);
	},
	coinToss: function() {
		return Math.random() > 0.5;
	},
	angle: function(x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		return Math.atan2(dy, dx);
	},
	degrees: function(radians) {
		return radians * DEG;
	},
	radians: function(degrees) {
		return degrees * RAD;
	},
	roundToNearest: function(value, amount) {
		return Math.round(value / amount) * amount;
	},
	getIntersectionArea: function(aX, aY, aW, aH, bX, bY, bW, bH) {
		var overlapX = Math.max(0, Math.min(aX + aW, bX + bW) - Math.max(aX, bX));
		var overlapY = Math.max(0, Math.min(aY + aH, bY + bH) - Math.max(aY, bY));
		return overlapX * overlapY;
	},
	getOverlapX: function(aX, aW, bX, bW) {
		return Math.max(0, Math.min(aX + aW, bX + bW) - Math.max(aX, bX));
	},
	getOverlapY: function(aY, aH, bY, bH) {
		return Math.max(0, Math.min(aY + aH, bY + bH) - Math.max(aY, bY));
	},
	rotateTo: function(start, end) {
		var diff = (end - start) % 360;
		if (diff !== diff % 180) {
			diff = (diff < 0) ? diff + 360 : diff - 360;
		}
		return start + diff;
	},
	rotateToRAD: function(start, end) {
		var PI2 = Math.PI * 2;
		var diff = (end - start) % PI2;
		if (diff !== diff % Math.PI) {
			diff = diff < 0 ? diff + PI2 : diff - PI2;
		}
		return start + diff;
	},
	dotProduct: function(aX, aY, bX, bY) {
		return aX * bX + aY * bY;
	}
};

module.exports = self;
