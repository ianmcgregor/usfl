export default (ua = (typeof navigator !== 'undefined' && navigator.userAgent)) => /Firefox/.test(ua);
