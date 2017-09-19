import android from './android';

export default (ua = navigator.userAgent) => !android(ua) && /Linux/.test(ua);
