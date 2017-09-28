export default (ua = (typeof navigator !== 'undefined' && navigator.userAgent)) => /iPod|iPhone/i.test(ua);
