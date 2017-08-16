export default (ua = navigator.userAgent) => !/Android/.test(ua) && !/Chrome/.test(ua) && /Safari/.test(ua);
