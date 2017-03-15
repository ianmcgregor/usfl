import os from '../os';
import ieVersion from './ieVersion';
import androidNative from './androidNative';
import safari from './safari';

const ua = navigator.userAgent;
const chromeiOS = () => os.ios() && /CriOS/.test(ua);
const firefox = () => /Firefox/.test(ua);
const ie = () => ieVersion() > 0;
const safariMobile = () => os.ios() && /AppleWebKit/.test(ua);

export default {
    androidNative,
    chromeiOS,
    firefox,
    ie,
    ieVersion,
    safari,
    safariMobile
};
