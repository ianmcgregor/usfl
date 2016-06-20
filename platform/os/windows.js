import windowsPhone from './windowsPhone';

export default function windows(ua = navigator.userAgent) {
    return !windowsPhone(ua) && /Windows/.test(ua);
}
