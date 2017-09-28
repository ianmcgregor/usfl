import ios from './ios';

export default (ua = (typeof navigator !== 'undefined' && navigator.userAgent)) => !ios(ua) && /Mac OS/.test(ua);
