import windowsPhone from './windows-phone';

export default (ua = (typeof navigator !== 'undefined' && navigator.userAgent)) => (
    !windowsPhone(ua) && /Windows/.test(ua)
);
