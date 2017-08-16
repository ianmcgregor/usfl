import ieVersion from './ie-version';

export default (ua = navigator.userAgent) => ieVersion(ua) > 0;
