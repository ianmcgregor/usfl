import ios from './ios';

export default function iosVersion(ua = navigator.userAgent) {
    if (ios(ua)) {
        const [, b, c] = ua.match(/OS (\d+)_(\d+)/i);
        if (b && c) {
            return parseFloat(`${b}.${c}`);
        }
    }
    return 0;
}
