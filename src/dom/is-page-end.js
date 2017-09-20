import getScrollRemaining from './get-scroll-remaining';

export default function isPageEnd(buffer = 0) {
    return getScrollRemaining() <= buffer;
}
