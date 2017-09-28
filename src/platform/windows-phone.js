export default (ua = (typeof navigator !== 'undefined' && navigator.userAgent)) => /Windows Phone/i.test(ua);
