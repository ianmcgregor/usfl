'use strict';

var Emitter = require('./Emitter');

function VideoObject(videoEl) {
  var el = videoEl || document.createElement('video');
  var player;

  var metadataHandler = function() {
    player.emit('metadata', {
      src: this.currentSrc,
      width: this.videoWidth,
      height: this.videoHeight,
      duration: this.duration
    });
  };

  var canplayHandler = function() {
    player.emit('ready');
  };

  var playHandler = function() {
    player.emit('play');
  };

  var endedHandler = function() {
    player.emit('ended');
  };

  var errorHandler = function() {
    player.emit('error', el.error);
  };

  var timeupdateHandler = function() {
    player.emit('timeupdate', el.currentTime);
  };

  var addEventListeners = function() {
    removeEventListeners();

    el.addEventListener('loadedmetadata', metadataHandler, false);
    el.addEventListener('canplaythrough', canplayHandler, false);
    el.addEventListener('play', playHandler, false);
    el.addEventListener('playing', playHandler, false);
    el.addEventListener('error', errorHandler, false);
    el.addEventListener('ended', endedHandler, false);
    el.addEventListener('timeupdate', timeupdateHandler, false);
  };

  var removeEventListeners = function() {
    el.removeEventListener('loadedmetadata', metadataHandler);
    el.removeEventListener('canplaythrough', canplayHandler);
    el.removeEventListener('play', playHandler);
    el.removeEventListener('playing', playHandler);
    el.removeEventListener('error', errorHandler);
    el.removeEventListener('ended', endedHandler);
    el.removeEventListener('timeupdate', timeupdateHandler);
  };

  var destroy = function() {
    player.off();
    el.pause();

    try {
      el.removeAttribute('src');
    } catch (e) {}

    removeEventListeners();

    if (el.parentElement) {
      el.parentElement.removeChild(el);
    }

    el = null;

    return player;
  };

  var load = function(url) {
    if(window.Blob && url instanceof window.Blob) {
      url = getBlobURL(url);
    }
    addEventListeners();

    el.crossOrigin = 'anonymous';
    el.preload = 'auto';
    el.src = url;
    el.load();

    return player;
  };

  var play = function() {
    el.play();

    return player;
  };

  var pause = function() {
    el.pause();

    return player;
  };

  var seek = function(time) {
    try {
      el.currentTime = time;
    } catch (e) {}

    return player;
  };

  var getBlobURL = function(url) {
    url = window.URL.createObjectURL(url);
    var revoke = function() {
      el.removeEventListener('canplaythrough', revoke);
      window.URL.revokeObjectURL(url);
    };
    el.addEventListener('canplaythrough', revoke);
    return url;
  };

  addEventListeners();

  player = Object.create(Emitter.prototype, {
      _events: { value: {} },
      destroy: { value: destroy },
      load: { value: load },
      pause: { value: pause },
      play: { value: play },
      seek: { value: seek },
      el: {
        get: function() {
          return el;
        }
      },
      currentTime: {
        get: function() {
          return el.currentTime;
        },
        set: function(value) {
          el.currentTime = value;
        }
      },
      duration: {
        get: function() {
          return el.duration;
        }
      },
      volume: {
        get: function() {
          return el.volume;
        },
        set: function(value) {
          el.volume = value;
        }
      }
  });

  return Object.freeze(player);
}

module.exports = VideoObject;
