import ieVersion from './ie-version';

export default (ua = (typeof navigator !== 'undefined' && navigator.userAgent)) => ieVersion(ua) > 0;
