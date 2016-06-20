export default function ios(ua = navigator.userAgent) {
    return /iP[ao]d|iPhone/i.test(ua);
}
