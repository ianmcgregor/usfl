import emitter from '../events/emitter';

// https://developers.google.com/youtube/iframe_api_reference#Events

export default function youtube(el) {
    let player, ytPlayer, paused = false;

    function play() {
        paused = false;
        ytPlayer.playVideo();
    }

    function pause() {
        paused = true;
        ytPlayer.pauseVideo();
    }

    function onStateChange(event) {
        const {PlayerState} = window.YT;

        switch (event.data) {
            case PlayerState.CUED:
                player.emit('ready');
                break;
            case PlayerState.PLAYING:
                paused = false;
                player.emit('play');
                break;
            case PlayerState.PAUSED:
                paused = true;
                player.emit('pause');
                break;
            case PlayerState.ENDED:
                player.emit('ended');
                break;
            default: break;
        }

        // YT.PlayerState.BUFFERING
    }

    function destroy() {}

    window.onYouTubeIframeAPIReady = () => {
        if (ytPlayer) {
            return;
        }

        ytPlayer = window.YT.Player(el, {
            events: {
                onStateChange
            }
        });
    };

    if (window.YT) {
        window.onYouTubeIframeAPIReady();
    } else {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(script);
    }

    player = Object.assign(Object.create(emitter.prototype), {
        play,
        pause,
        paused: () => paused,
        destroy
    });

    return player;
}
