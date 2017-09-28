export default (ua = (typeof navigator !== 'undefined' && navigator.userAgent)) => /Android/i.test(ua);
