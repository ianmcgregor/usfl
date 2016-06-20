import getScrollTop from './getScrollTop';

export default function isPageEnd(buffer = 0) {
    const b = document.body;
    return Math.abs(getScrollTop() - (b.scrollHeight - b.clientHeight)) <= buffer;
}
