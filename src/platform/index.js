import android from './android';
import androidNative from './android-native';
import androidVersion from './android-version';
import chromeIOS from './chrome-ios';
import desktop from './desktop';
import deviceOrientation from './device-orientation';
import firefox from './firefox';
import ie from './ie';
import ieVersion from './ie-version';
import ios from './ios';
import iosVersion from './ios-version';
import ipad from './ipad';
import iphone from './iphone';
import linux from './linux';
import localHost from './local-host';
import mac from './mac';
import mobile from './mobile';
import mp4 from './mp4';
import safari from './safari';
import safariIOS from './safari-ios';
import screen from './screen';
import webgl from './webgl';
import webm from './webm';
import windows from './windows';
import windowsPhone from './windows-phone';

export default {
    android: android(),
    androidNative: androidNative(),
    androidVersion: androidVersion(),
    chromeIOS: chromeIOS(),
    desktop: desktop(),
    deviceOrientation: deviceOrientation(),
    firefox: firefox(),
    ie: ie(),
    ieVersion: ieVersion(),
    ios: ios(),
    iosVersion: iosVersion(),
    ipad: ipad(),
    iphone: iphone(),
    linux: linux(),
    localHost: localHost(),
    mac: mac(),
    mobile: mobile(),
    mp4: mp4(),
    safari: safari(),
    safariIOS: safariIOS(),
    screen: screen,
    webgl: webgl(),
    webm: webm(),
    windows: windows(),
    windowsPhone: windowsPhone()
};
