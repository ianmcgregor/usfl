const el = typeof document !== 'undefined' && document.createElement('video');

const tests = [
    {type: 'ogv', codec: 'video/ogg; codecs="theora"'},
    {type: 'mp4', codec: 'video/mp4; codecs="avc1.42E01E"'}, // H.264 Constrained baseline profile level 3
    {type: 'webm', codec: 'video/webm; codecs="vp8, vorbis"'},
    {type: 'vp9', codec: 'video/webm; codecs="vp9"'},
    {type: 'hls', codec: 'application/x-mpegURL; codecs="avc1.42E01E"'},

    {type: 'ogg', codec: 'audio/ogg; codecs="vorbis"'},
    {type: 'mp3', codec: 'audio/mpeg;'},
    {type: 'opus', codec: 'audio/ogg; codecs="opus"'},
    {type: 'wav', codec: 'audio/wav; codecs="1"'}
];

export default tests.reduce((map, test) => {
    map[test.type] = !!(el && el.canPlayType && el.canPlayType(test.codec));
    return map;
}, {});
