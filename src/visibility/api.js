let hidden = null;
let change = null;

if (typeof document !== 'undefined') {
    if (typeof document.hidden !== 'undefined') {
        hidden = 'hidden';
        change = 'visibilitychange';
    } else if (typeof document.mozHidden !== 'undefined') {
        hidden = 'mozHidden';
        change = 'mozvisibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden';
        change = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
        hidden = 'webkitHidden';
        change = 'webkitvisibilitychange';
    }
}

export default {
    hidden,
    change
};
