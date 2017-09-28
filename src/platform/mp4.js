export default () => {
    const el = typeof document !== 'undefined' && document.createElement('video');
    return !!(el && el.canPlayType && el.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'));
};
