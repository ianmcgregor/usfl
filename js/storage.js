/* storage.js */

define(
    [],
    function() {

        'use strict';

        var self = {
            saveJSON: function(key) {
                if(localStorage) {
                    localStorage.setItem(key, JSON.stringify(this.model));
                    //console.log(localStorage.getItem('game'));
                }
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
                    //document.body.appendChild(canvas);
                }
                this.canvas.width = width;
                this.canvas.height = height;
                this.context.drawImage(img, 0, 0);
                var dataURL = this.canvas.toDataURL('image/png');
                this.context.clearRect (0, 0, width, height);
                return dataURL;
            }
        };

        return self;
    }
);