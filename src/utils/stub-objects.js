/* jshint ignore:start */


/* Object literal */

var self = {

};

return self;


/* Revealing module */

function Module() {

	return {

	};
}

return Module;


/* Prototypical */

function Prototypical() {
	
}

Prototypical.prototype = {
	
};

return Prototypical;


/* 'Subclass' */
var SuperClass = require('subclass.js');

function SubClass() {
    SuperClass.call(this);
}

SubClass.prototype = Object.create(SuperClass.prototype);
SubClass.prototype.constructor = SubClass;

SubClass.prototype.foo = function() {
};

Object.defineProperty(SubClass.prototype, 'foo', {
    get: function() {
        return this.foo;
    },
    set: function(value) {
        this.foo = value;
    }
});

return SubClass;


/* jshint ignore:end */