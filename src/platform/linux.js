import android from './android';

export default (ua = (typeof navigator !== 'undefined' && navigator.userAgent)) => !android(ua) && /Linux/.test(ua);
