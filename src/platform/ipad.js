export default (ua = (typeof navigator !== 'undefined' && navigator.userAgent)) => /iPad/i.test(ua);
