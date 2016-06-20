import android from './android';

export default function linux(ua = navigator.userAgent) {
    return !android(ua) && /Linux/.test(ua);
}
