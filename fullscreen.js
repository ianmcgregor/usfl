'use strict';

var Emitter = require('./Emitter');

var Fullscreen = (function() {

    var self,
        docEl = document.documentElement,
        isSupported = !!(docEl.requestFullScreen ||
            docEl.webkitRequestFullScreen ||
            docEl.mozRequestFullScreen);

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
            value: function(el) {
                el = el || document.documentElement;

                var method = el.requestFullScreen ||
                    el.webkitRequestFullScreen ||
                    el.mozRequestFullScreen;

                if (method) {
                    method.call(el);
                }
            }
        },
        exit: {
            value: function() {
                var method = document.exitFullscreen ||
                    document.cancelFullScreen ||
                    document.webkitCancelFullScreen ||
                    document.mozCancelFullScreen;

                if (method) {
                    method.call(document);
                }
            }
        },
        toggle: {
            value: function(el) {
                if (this.isFullscreen()) {
                    this.exit();
                } else {
                    this.enter(el);
                }
            }
        },
        isFullscreen: {
            value: function() {
                return !!(document.fullScreen ||
                    document.webkitIsFullScreen ||
                    document.mozFullScreen);
            }
        }
    });

    return self;

}());

if (typeof module === 'object' && module.exports) {
    module.exports = Fullscreen;
}
