'use strict';

var Emitter = require('./Emitter');

var Fullscreen = (function() {

    var self,
        el = document.documentElement,
        isSupported = !!(el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen);

    function onFullscreenChange() {
        self.emit('change', self.isFullscreen());
    }

    if (isSupported) {
        document.addEventListener('fullscreenchange', onFullscreenChange);
        document.addEventListener('mozfullscreenchange', onFullscreenChange);
        document.addEventListener('webkitfullscreenchange', onFullscreenChange);
        //document.addEventListener('msfullscreenchange', onFullscreenChange);
    }

    self = Object.create(Emitter.prototype, {
        _events: {
            value: {}
        },
        isSupported: {
            value: isSupported
        },
        enter: {
            value: function(element) {
                element = element || document.documentElement;

                var method = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen; // || element.msRequestFullscreen;

                if (method) {
                    method.call(element);
                }
            }
        },
        exit: {
            value: function() {
                var method = document.exitFullscreen || document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen; // || document.msExitFullscreen;

                if (method) {
                    method.call(document);
                }
            }
        },
        toggle: {
            value: function(element) {
                if (this.isFullscreen()) {
                    this.exit();
                } else {
                    this.enter(element);
                }
            }
        },
        isFullscreen: {
            value: function() {
                return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen); // || document.msFullscreenElement );
            }
        }
    });

    return self;

}());

if (typeof module === 'object' && module.exports) {
    module.exports = Fullscreen;
}
