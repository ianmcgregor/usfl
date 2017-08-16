import ios from './ios';

export default (ua = navigator.userAgent) => ios(ua) && /CriOS/.test(ua);
