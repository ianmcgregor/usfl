/* Object literal */

define(
	[
		
	],
	function() {

		'use strict';

		var self = {

		};

		return self;
	}
);


/* Revealing module */

define(
	[
		
	],
	function() {

		'use strict';

		function Module() {

			return {

			};
		}

		return Module;
	}
);


/* Prototypical */

define(
	[
		
	],
	function() {

		'use strict';

		function Prototypical() {
			
		}

		Prototypical.prototype = {
			
		};

		return Prototypical;
	}
);


/* 'Subclass' */
define(
    [
		'superclass'
    ],
    function(SuperClass) {

        'use strict';

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
    }
);