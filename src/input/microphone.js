import Emitter from '../events/emitter';

export default function microphone() {
    const mic = new Emitter();
    let stream = null;

    const getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

    const isSupported = !!getUserMedia;

    function connect() {
        if (!isSupported) {
            mic.emit('error', 'Not supported');
            return;
        }
        getUserMedia({
            audio: true
        }, (mediaStream) => {
            stream = mediaStream;
            mic.emit('connect', stream);
        }, (e) => {
            if (e.name === 'PermissionDeniedError' || e === 'PERMISSION_DENIED') {
                console.log('Permission denied. Undo by clicking the camera icon in the address bar');
                mic.emit('denied');
            } else {
                mic.emit('error', e.message || e);
            }
        });
    }

    function disconnect() {
        if (stream) {
            stream.stop();
            stream = null;
        }
    }

    function createWebAudioSource(webAudioContext, connectTo) {
        if (!stream) {
            return null;
        }

        const source = webAudioContext.createMediaStreamSource(stream);

        if (connectTo) {
            source.connect(connectTo);
        }

        // HACK: stops moz garbage collection killing the stream
        // see https://support.mozilla.org/en-US/questions/984179
        if (navigator.mozGetUserMedia) {
            window.hack_for_mozilla = source;
        }

        return source;
    }

    return Object.assign(mic, {
        connect,
        disconnect,
        createWebAudioSource,
        isSupported: () => isSupported,
        stream: () => stream
    });
}
