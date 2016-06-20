import android from '../os/android';

//http://stackoverflow.com/questions/14403766/how-to-detect-the-stock-android-browser
export default function androidNative(ua = navigator.userAgent) {
    if (!android(ua)) {
        return false;
    }

    const isAndroidMobile = ua.indexOf('Mozilla/5.0') > -1 && ua.indexOf('AppleWebKit') > -1;

    const reAppleWebKit = /AppleWebKit\/([\d.]+)/;
    const resultAppleWebKit = reAppleWebKit.exec(ua);
    const appleWebKitVersion = resultAppleWebKit ? parseFloat(reAppleWebKit.exec(ua)[1]) : null;

    const reChrome = /Chrome\/([\d.]+)/;
    const resultChrome = reChrome.exec(ua);
    const chromeVersion = resultChrome ? parseFloat(reChrome.exec(ua)[1]) : null;

    return isAndroidMobile && (appleWebKitVersion && appleWebKitVersion < 537) || (chromeVersion && chromeVersion < 37);
}
