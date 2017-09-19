import windowsPhone from './windows-phone';

export default (ua = navigator.userAgent) => !windowsPhone(ua) && /Windows/.test(ua);
