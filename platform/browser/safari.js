export default function safari(ua = navigator.userAgent) {
    return !/Android/.test(ua) && !/Chrome/.test(ua) && /Safari/.test(ua);
}
