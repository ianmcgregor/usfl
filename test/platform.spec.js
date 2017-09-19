import platform from '../src/platform';
import androidNative from '../src/platform/android-native';
import ieVersion from '../src/platform/ie-version';
import iosVersion from '../src/platform/ios-version';
import androidVersion from '../src/platform/android-version';

describe('platform', () => {

    it('should get device', () => {
        expect(platform.mobile).to.be.false;
        expect(platform.ipad).to.be.false;
        expect(platform.iphone).to.be.false;
        expect(platform.desktop).to.be.true;
    });

    it('should get os', () => {
        expect(platform.ios).to.be.false;
        expect(platform.mac).to.be.a('boolean');
        expect(platform.android).to.be.false;
        expect(platform.windows).to.be.false;
    });

    it('should get browser', () => {
        expect(androidNative('Mozilla/5.0 (Linux; U; Android 2.3.3; de-ch; HTC Desire Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1')).to.be.true;
        expect(androidNative('Mozilla/5.0 (Linux; U; Android 4.2; en-us; Nexus 10 Build/JVP15I) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30')).to.be.true;
        expect(ieVersion()).to.eql(0);
        expect(platform.ie).to.be.false;
    });

    it('should get screen props', () => {
        expect(platform.screen.width).to.eql(window.screen.width);
        expect(platform.screen.height).to.eql(window.screen.height);
        expect(platform.screen.dpr).to.be.a('number');
    });

    it('should get ie version', () => {
        expect(ieVersion('Mozilla/5.0 (Linux; Android 4.1; Galaxy Nexus Build/JRN84D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19')).to.eql(0);
        expect(ieVersion('Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; SLCC1; .NET CLR 2.0.50727; .NET CLR 1.1.4322; InfoPath.2; .NET CLR 3.5.21022; .NET CLR 3.5.30729; MS-RTC LM 8; OfficeLiveConnector.1.4; OfficeLivePatch.1.3; .NET CLR 3.0.30729)')).to.eql(8);
        expect(ieVersion('Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)')).to.eql(9);
        expect(ieVersion('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0)')).to.eql(10);
        expect(ieVersion('Mozilla/5.0 (IE 11.0; Windows NT 6.3; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko')).to.eql(11);
    });

    it('should get ios version', () => {
        expect(iosVersion('Mozilla/5.0 (Linux; Android 4.1; Galaxy Nexus Build/JRN84D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19')).to.eql(0);
        expect(iosVersion('Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53')).to.eql(7);
        expect(iosVersion('Mozilla/5.0 (iPad; CPU OS 9_0 like Mac OS X) AppleWebKit/601.1.17 (KHTML, like Gecko) Version/8.0 Mobile/13A175 Safari/600.1.4')).to.eql(9);
        expect(iosVersion('Mozilla/5.0 (iPhone; CPU iPhone OS 9_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13C75 Safari/601.1')).to.eql(9.2);
    });

    it('should get android version', () => {
        expect(androidVersion('Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53')).to.eql(0);
        expect(androidVersion('Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30')).to.eql(4);
        expect(androidVersion('Mozilla/5.0 (Linux; U; Android 2.3.3; de-ch; HTC Desire Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1')).to.eql(2.3);
        expect(androidVersion('Mozilla/5.0 (Linux; U; Android 4.2; en-us; Nexus 10 Build/JVP15I) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30')).to.eql(4.2);
        expect(androidVersion('Mozilla/5.0 (Linux; Android 4.1; Galaxy Nexus Build/JRN84D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19')).to.eql(4.1);
    });

});
