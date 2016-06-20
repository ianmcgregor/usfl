import ios from './ios';

export default function mac(ua = navigator.userAgent) {
    return !ios(ua) && /Mac OS/.test(ua);
}
