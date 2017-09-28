export default () => {
    const el = typeof document !== 'undefined' && document.createElement('video');
    return !!(el && el.canPlayType && el.canPlayType('video/webm; codecs="vp8, vorbis"'));
};
