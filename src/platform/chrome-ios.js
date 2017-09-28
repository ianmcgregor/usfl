import ios from './ios';

export default (ua = (typeof navigator !== 'undefined' && navigator.userAgent)) => ios(ua) && /CriOS/.test(ua);
