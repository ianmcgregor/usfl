// https://developers.google.com/youtube/iframe_api_reference#Events
import {EventEmitter} from 'events';

export default function youtube(el) {
    let emitter = null, player = null, paused = false;

    function play() {
        paused = false;
        player.playVideo();
        return emitter;
    }

    function pause() {
        paused = true;
        player.pauseVideo();
        return emitter;
    }

    function onReady() {
        emitter.emit('ready');
    }

    function onStateChange(event) {
        const {PlayerState} = window.YT;

        switch (event.data) {
            case PlayerState.CUED:
            case PlayerState.BUFFERING:
                break;
            case PlayerState.PLAYING:
                paused = false;
                emitter.emit('play');
                break;
            case PlayerState.PAUSED:
                paused = true;
                emitter.emit('pause');
                break;
            case PlayerState.ENDED:
                emitter.emit('ended');
                break;
            default: break;
        }
    }

    function destroy() {}

    function createPlayer() {
        if (player) {
            return;
        }

        player = new window.YT.Player(el, {
            events: {
                onReady,
                onStateChange
            }
        });
    }



    if (window.YT) {
        createPlayer();
    } else if (window.ytPlayerCalls) {
        window.ytPlayerCalls.push(createPlayer);
    } else {
        window.ytPlayerCalls = [createPlayer];
        window.onYouTubeIframeAPIReady = function() {
            window.ytPlayerCalls.forEach((call) => call());
        };
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(script);
    }

    emitter = Object.assign(Object.create(EventEmitter.prototype), {
        _events: {},
        play,
        pause,
        paused: () => paused,
        destroy
    });

    return emitter;
}
