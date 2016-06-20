import http from '../http';

describe('http', () => {

    it('should get location', () => {
        expect(http.getLocation('http://www.example.com/path').hostname).to.eql('www.example.com');
        expect(http.getLocation('http://www.example.com/path').pathname).to.eql('/path');
        expect(http.getLocation('http://www.example.com/path').protocol).to.eql('http:');
    });

    it('should have jsonp', () => {
        expect(http.jsonp).to.be.a('function');
    });

    it('should get url params', () => {
        expect(http.urlParams('foo=bar&hello=world')).to.eql({
            foo: 'bar',
            hello: 'world'
        });
    });

});

describe('http.xhr', function() {
    this.timeout(5000);

    let res = null;

    it('should have xhr', () => {
        expect(http.xhr).to.be.a('function');
    });

    beforeEach((done) => {
        http.xhr('https://dl.dropboxusercontent.com/u/15470024/prototypes/test/test.json')
            .then((response) => (res = response))
            .then(() => done())
            .catch((err) => console.log('err', err));
    });

    it('should have json response', () => {
        expect(res).to.be.an('object');
        expect(res.name).to.eql('test');
    });
});
