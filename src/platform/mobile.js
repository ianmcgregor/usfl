export default (ua = (typeof navigator !== 'undefined' && navigator.userAgent)) => {
    return /Android|webOS|iPhone|iP[ao]d|BlackBerry|IEMobile|Opera Mini|Windows Phone|SymbianOS/i.test(ua);
};
