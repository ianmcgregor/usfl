'use strict';

var StorageUtils = {
    saveJSON: function(key, object) {
        if(localStorage) {
            localStorage.setItem(key, JSON.stringify(object));
            return true;
        }
        return false;
    },
    loadJSON: function(key) {
        if(localStorage && localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key));
        }
        return null;
    },
    // convert image to localstorage friendly data URL string
    getImageDataURL: function(img, width, height) {
        if(!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d');
        }
        this.canvas.width = width || img.width;
        this.canvas.height = height || img.height;
        this.context.drawImage(img, 0, 0);
        var dataURL = this.canvas.toDataURL('image/png');
        this.context.clearRect(0, 0, width, height);
        return dataURL;
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = StorageUtils;
}
