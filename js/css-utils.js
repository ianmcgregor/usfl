'use strict';

var hasClass = function(el, className) {
	if (el.classList) {
		return el.classList.contains(className);
	}
	else {
		return el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}
};

var addClass = function(el, className) {
	removeClass(el, className);
	if (el.classList) {
		el.classList.add(className);
	} else {
		el.className += ' ' + className;
	}
};

var removeClass = function(el, className) {
	if (el.classList) {
		el.classList.remove(className);
	}
	else if (hasClass(el, className)) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		el.className = el.className.replace(reg, ' ');
	}
};

var toggleClass = function(el, className) {
	if (el.classList) {
		el.classList.toggle(className);
	}
	else {
		if (hasClass(el, className)) {
			removeClass(el, className);
		} else {
			addClass(el, className);
		}
	}
};

module.exports = {
	'hasClass': hasClass,
	'addClass': addClass,
	'removeClass': removeClass,
	'toggleClass': toggleClass
};
