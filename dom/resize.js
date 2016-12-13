import eventBus from '../events/eventBus';

export default function resize(debouceDelay = 500) {

    let timeoutId;

    // orientationchange too?

    window.addEventListener('resize', () => {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => eventBus.emit('resize'), debouceDelay);
    });
}
