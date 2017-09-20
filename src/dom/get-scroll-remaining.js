import getScrollTop from './get-scroll-top';

export default function getScrollRemaining() {
    const b = document.body;
    return Math.abs(getScrollTop() - (b.scrollHeight - b.clientHeight));
}
