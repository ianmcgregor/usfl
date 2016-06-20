import share from '../share';

describe('share', () => {

    it('should have share functions', () => {
        expect(share.email).to.be.a('function');
        expect(share.facebook).to.be.a('function');
        expect(share.facebookFeedDialog).to.be.a('function');
        expect(share.googleplus).to.be.a('function');
        expect(share.linkedin).to.be.a('function');
        expect(share.pinterest).to.be.a('function');
        expect(share.reddit).to.be.a('function');
        expect(share.renren).to.be.a('function');
        expect(share.sms).to.be.a('function');
        expect(share.twitter).to.be.a('function');
        expect(share.vkontakte).to.be.a('function');
        expect(share.weibo).to.be.a('function');
        expect(share.whatsapp).to.be.a('function');
    });

});
