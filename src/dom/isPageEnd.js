import getScrollRemaining from './getScrollRemaining';

export default function isPageEnd(buffer = 0) {
    return getScrollRemaining() <= buffer;
}
