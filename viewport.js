'use strict';

var Emitter = require('./Emitter'),
    resizeUtil = require('./resize');

var ViewPort = {
    rect: {
        'x': 0,
        'y': 0,
        'width': 0,
        'height': 0,
        'stageWidth': 0,
        'stageHeight': 0,
        'scale': 1
    },
    originalWidth: 0,
    originalHeight: 0,

    init: function(width, height) {
        this.emitter = new Emitter();
        this.originalWidth = width;
        this.originalHeight = height;
        var self = this;
        window.onresize = window.onorientationchange = function() {
            self.resize();
        };
        this.resize();
    },
    resize: function() {
        // reset
        this.rect.x = 0;
        this.rect.y = 0;
        this.rect.width = this.originalWidth;
        this.rect.height = this.originalHeight;
        this.rect.stageWidth = this.getWindowWidth();
        this.rect.stageHeight = this.getWindowHeight();
        this.rect.scale = 1;
        // resize
        if(this.rect.stageWidth > this.rect.stageHeight) {
            resizeUtil(this.rect, this.rect.stageWidth, this.rect.stageHeight, true, 'fill');
        }
        else {
            resizeUtil(this.rect, this.rect.stageWidth, this.rect.stageHeight, true, 'fitWidth');
        }
        this.rect.scale = this.rect.width / this.originalWidth;
        // notify
        this.emitter.emit('resize');
    },
    mouseLeftWindow: function(fn, thisArg) {
        document.addEventListener('mouseout', function(e) {
            var from = e.relatedTarget || e.toElement;
            if (!from || from.nodeName === 'HTML') {
                fn.call(thisArg || this);
            }
        });
    },
    getWindowWidth: function() {
        // Get current browser viewpane heigtht
        return window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth || 0;
    },
    getWindowHeight: function() {
        // Get current browser viewpane heigtht
        return window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight || 0;
    },
    getScrollTop: function () {
        return document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset || 0;
    },
    getWindowScrollY: function() {
        // Get current absolute window scroll position
        return window.pageYOffset ||
            document.body.scrollTop ||
            document.documentElement.scrollTop || 0;
    },
    getDocHeight: function() {
        // Get current absolute document height
        return Math.max(
            document.body.scrollHeight || 0,
            document.documentElement.scrollHeight || 0,
            document.body.offsetHeight || 0,
            document.documentElement.offsetHeight || 0,
            document.body.clientHeight || 0,
            document.documentElement.clientHeight || 0
        );
    },
    getScrollPercentage: function() {
        // Get current vertical scroll percentage
        return ((this.getWindowScrollY() + this.getWindowHeight()) / this.getDocHeight()) * 100;
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = ViewPort;
}
