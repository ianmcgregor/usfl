import browser from './browser';
import device from './device';
import os from './os';
import supports from './supports';
import screen from './screen';

const local = /^(?:https?:\/\/)?(?:localhost|192\.168)/.test(window.location.href);

export default {
    browser,
    device,
    os,
    supports,
    screen,
    local
};
