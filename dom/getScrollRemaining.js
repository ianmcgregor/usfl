import getScrollTop from './getScrollTop';

export default function getScrollRemaining() {
    const b = document.body;
    return Math.abs(getScrollTop() - (b.scrollHeight - b.clientHeight));
}
