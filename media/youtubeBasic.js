export default function youtubeBasic(el) {
    const iframe = el.contentWindow;

    function sendCommand(command) {
        iframe.postMessage(`{"event":"command","func":"${command}","args":""}`, '*');
    }

    function play() {
        sendCommand('playVideo');
    }

    function pause() {
        sendCommand('pauseVideo');
    }

    return {
        play,
        pause
    };
}
