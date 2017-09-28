import android from './android';

export default function androidVersion(ua = (typeof navigator !== 'undefined' && navigator.userAgent)) {
    if (!android(ua)) {
        return 0;
    }
    const version = ua.match(/Android (\d+(?:\.\d+)+);/)[1];
    const [a, b] = version.split('.');
    return parseFloat(`${a}.${b}`);
}
