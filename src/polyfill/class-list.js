/*
 * classList (partial polyfill for IE 10, IE 11 and Firefox <24)
 * adapted from: https://github.com/eligrey/classList.js/blob/master/classList.js
 */

(function() {

    if (typeof document === 'undefined') {
        return;
    }

    let testElement = document.createElement('_');

    testElement.classList.add('c1', 'c2');

    // Polyfill for IE 10/11 and Firefox <26, where classList.add and
    // classList.remove exist but support only one argument at a time.
    if (!testElement.classList.contains('c2')) {
        function createMethod(method) {
            const original = window.DOMTokenList.prototype[method];

            window.DOMTokenList.prototype[method] = function(token) {
                let i;
                const len = arguments.length;

                for (i = 0; i < len; i++) {
                    token = arguments[i];
                    original.call(this, token);
                }
            };
        }
        createMethod('add');
        createMethod('remove');
    }

    testElement.classList.toggle('c3', false);

    // Polyfill for IE 10, IE 11 and Firefox <24, where classList.toggle does not
    // support the second argument.
    if (testElement.classList.contains('c3')) {
        const toggle = window.DOMTokenList.prototype.toggle;

        window.DOMTokenList.prototype.toggle = function(token, force) {
            force = !!force;
            if (arguments.length > 1 && this.contains(token) === force) {
                return force;
            } else {
                return toggle.call(this, token);
            }
        };
    }

    testElement = null;
}());
