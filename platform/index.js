import browser from './browser';
import device from './device';
import os from './os';
import supports from './supports';
import screen from './screen';
import isLocalHost from './isLocalHost';

const local = isLocalHost();

export default {
    browser,
    device,
    os,
    supports,
    screen,
    local
};
