export default function(ua = navigator.userAgent) {
    return /Android/i.test(ua);
}
