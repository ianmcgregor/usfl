import ios from './ios';

export default (ua = navigator.userAgent) => ios(ua) && /AppleWebKit/.test(ua);
