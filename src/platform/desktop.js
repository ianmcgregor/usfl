import mobile from './mobile';

export default (ua = (typeof navigator !== 'undefined' && navigator.userAgent)) => !mobile(ua);
