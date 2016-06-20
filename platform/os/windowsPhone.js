export default function windowsPhone(ua = navigator.userAgent) {
    return /Windows Phone/i.test(ua);
}
