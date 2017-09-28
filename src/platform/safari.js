export default (ua = (typeof navigator !== 'undefined' && navigator.userAgent)) => (
    !/Android/.test(ua) && !/Chrome/.test(ua) && /Safari/.test(ua)
);
