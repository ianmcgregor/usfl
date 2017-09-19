import emitter from '../events/emitter';

// https://developer.vimeo.com/player/js-api

export default function vimeo(el) {
    const vimeoPlayer = el.contentWindow;
    const re = /^https?:\/\/player.vimeo.com/;
    let player = null;
    let origin = '*';
    let paused = false;

    function sendCommand(method, value = '') {
        const data = {
            method
        };

        if (value) {
            data.value = value;
        }

        const message = JSON.stringify(data);
        vimeoPlayer.postMessage(message, origin);
    }

    function play() {
        paused = false;
        sendCommand('play');
    }

    function pause() {
        paused = true;
        sendCommand('pause');
    }

    function onReady() {
        sendCommand('addEventListener', 'play');
        sendCommand('addEventListener', 'pause');
        sendCommand('addEventListener', 'finish');
        sendCommand('addEventListener', 'playProgress');
        player.emit('ready');
    }

    function onPlay() {
        paused = false;
        player.emit('play');
    }

    function onPause() {
        paused = true;
        player.emit('pause');
    }

    function onFinish() {
        player.emit('ended');
    }

    function onPlayProgress(data) {
        player.emit('timeupdate', data.seconds);
    }

    function onMessage(event) {
        const isVimeo = re.test(event.origin);

        if (!isVimeo) {
            return;
        }

        const data = JSON.parse(event.data);

        if (data.player_id && el.id !== data.player_id) {
            return;
        }

        if (origin === '*') {
            origin = event.origin;
        }

        switch (data.event) {
            case 'ready':
                onReady(data.player_id);
                break;
            case 'playProgress':
                onPlayProgress(data.data);
                break;
            case 'play':
                onPlay();
                break;
            case 'pause':
                onPause();
                break;
            case 'finish':
                onFinish();
                break;
            default:
                break;
        }
    }

    function destroy() {
        window.removeEventListener('message', onMessage);
    }

    window.addEventListener('message', onMessage);

    player = Object.assign(Object.create(emitter.prototype), {
        _events: {},
        play,
        pause,
        paused: () => paused,
        destroy
    });

    return player;
}
