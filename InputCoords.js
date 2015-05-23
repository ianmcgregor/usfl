'use strict';

function InputCoords() {
	var self;
	var calculateCoords = (function(){
		var fn;
		if(typeof window.pageXOffset === 'number'){
			fn = function(e){
				var pX = (e.clientX || 0),
					pY = (e.clientY || 0),
					sX = window.pageXOffset,
					sY = window.pageYOffset;
				self.x = pX+sX;
				self.y = pY+sY;
				self.percentX = self.x / window.innerWidth;
				self.percentY = self.y / window.innerHeight;
			};
		}
		else {
			fn = function(e){
				e = (e && e.clientX) ? e : window.event;
				var pX = e.clientX,
					pY = e.clientY,
					d = document.documentElement,
					b = document.body,
					sX = Math.max(d.scrollLeft, b.scrollLeft),
					sY = Math.max(d.scrollTop, b.scrollTop);
				self.x = pX+sX;
				self.y = pY+sY;
				self.percentX = self.x / window.innerWidth;
				self.percentY = self.y / window.innerHeight;
			};
		}
		return fn;
	})();

	self = {
		x: 0,
		y: 0,
		percentX: 0,
		percentY: 0,
		isListening: false,

		on: function() {
			document.body.addEventListener('mousemove', calculateCoords);
			document.body.addEventListener('touchmove', calculateCoords);
			self.isListening = true;
			return this;
		},
		off: function() {
			document.body.removeEventListener('mousemove', calculateCoords);
			document.body.removeEventListener('touchmove', calculateCoords);
			self.isListening = false;
			return this;
		}
	};
	return self;
}

if (typeof module === 'object' && module.exports) {
    module.exports = InputCoords;
}
