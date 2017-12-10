// https://developers.google.com/youtube/iframe_api_reference#Events
import EventEmitter from 'eventemitter3';

export const getYouTubeId = url => {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
        return match[2];
    }
    return null;
};

export default function youtube(el) {
    let emitter = null;
    let player = null;
    let paused = false;

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

    emitter = Object.assign(new EventEmitter(), {
        play,
        pause,
        paused: () => paused,
        destroy
    });

    return emitter;
}
