const videoEl = document.createElement('video');
export default () => !!(videoEl.canPlayType && videoEl.canPlayType('video/webm; codecs="vp8, vorbis"'));
