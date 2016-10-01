import string from '../string';

describe('string utils', function() {

    const str = 'Hello World';

    it('should query', () => {
        expect(string.countOf(str, 'l')).to.eql(3);
        expect(string.endsWith(str, 'ld')).to.be.true;
        expect(string.hasText(str)).to.be.true;
        expect(string.isNumeric(str)).to.be.false;
        expect(string.isNumeric('68769123214')).to.be.true;
        expect(string.wordCount(str)).to.eql(2);
        expect(string.similarity(str, str)).to.eql(1);
    });

    it('should find editDistance', () => {
        expect(string.editDistance(str, str)).to.eql(0);
        expect(string.editDistance(str, str + 'a')).to.eql(1);
    });

    it('should find substr', () => {
        expect(string.afterFirst(str, 'l')).to.eql('lo World');
        expect(string.afterLast(str, 'l')).to.eql('d');
        expect(string.beginsWith(str, 'H')).to.be.true;
        expect(string.beforeFirst(str, 'l')).to.eql('He');
        expect(string.beforeLast(str, 'l')).to.eql('Hello Wor');
        expect(string.between(str, 'H', 'W')).to.eql('ello ');
    });

    it('should format', () => {
        expect(string.padLeft(str, '_', 12)).to.eql('_Hello World');
        expect(string.padRight(str, '_', 12)).to.eql('Hello World_');
        expect(string.removeExtraWhitespace('Hello     World')).to.eql('Hello World');
        expect(string.remove(str, 'll')).to.eql('Heo World');
        // TODO: this sometime acts unexpectedly with shorter strings
        expect(string.truncate(str, 10)).to.eql('Hello...');
        //expect(string.truncate(str, 4)).to.eql('Hello...');
        expect(string.capitalize(str.toLowerCase())).to.eql('Hello world');
        expect(string.properCase(str.toLowerCase())).to.eql('Hello World');
        expect(string.reverse(str)).to.eql('dlroW olleH');
        expect(string.reverseWords(str)).to.eql('World Hello');
        expect(string.stripTags('<p>' + str + '</p>')).to.eql('Hello World');
        expect(string.swapCase(str)).to.eql('hello World');
        // expect(string.block(str)).to.eql('Hello World');
        expect(string.timeCode(217.8)).to.eql('00:03:37');
    });

    it('should escape', () => {
        expect(string.escapePattern(str + '.')).to.eql('Hello World\\.');
        expect(string.escapeHTML('<script>alert("lol")</script>'))
            .to.eql('&lt;script&gt;alert(&quot;lol&quot;)&lt;&#x2F;script&gt;');
    });

    it('should prevent widow', () => {
        expect(string.preventWidow('Hello world')).to.eql('Hello&nbsp;world');
        expect(string.preventWidow('   Hello world      ')).to.eql('Hello&nbsp;world');
        expect(string.preventWidow('Morbi in sem quis dui placerat ornare.'))
            .to.eql('Morbi in sem quis dui placerat&nbsp;ornare.');
    });

    it('should convert to number', () => {
        expect(string.toNumber('thing_01')).to.eql(1);
        expect(string.toNumber('123%')).to.eql(123);
        expect(string.toNumber('0.10')).to.eql(0.1);
    });
});
