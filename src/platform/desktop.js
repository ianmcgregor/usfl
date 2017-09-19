import mobile from './mobile';

export default (ua = navigator.userAgent) => !mobile(ua);
