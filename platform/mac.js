import ios from './ios';

export default (ua = navigator.userAgent) => !ios(ua) && /Mac OS/.test(ua);
