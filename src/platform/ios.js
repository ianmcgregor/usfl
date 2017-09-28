export default (ua = (typeof navigator !== 'undefined' && navigator.userAgent)) => /iP[ao]d|iPhone/i.test(ua);
