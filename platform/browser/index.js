import os from '../os';
import ieVersion from './ieVersion';
import androidNative from './androidNative';

const ua = navigator.userAgent;
const chromeiOS = () => os.ios() && /CriOS/.test(ua);
const firefox = () => /Firefox/.test(ua);
const ie = () => ieVersion() > 0;
const safari = () => !/Android/.test(ua) && !/Chrome/.test(ua) && /Safari/.test(ua);
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
