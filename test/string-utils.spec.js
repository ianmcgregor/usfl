'use strict';

var StringUtils = require('../src/lib/string-utils.js');

describe('string utils', function() {

	var str = 'Hello World';

	it('should query', function() {
		expect(StringUtils.contains(str, 'World')).to.be.true;
		expect(StringUtils.countOf(str, 'l')).to.eql(3);
		expect(StringUtils.endsWith(str, 'ld')).to.be.true;
		expect(StringUtils.hasText(str)).to.be.true;
		expect(StringUtils.isEmpty(str)).to.be.false;
		expect(StringUtils.isNumeric(str)).to.be.false;
		expect(StringUtils.isNumeric('68769123214')).to.be.true;
		expect(StringUtils.wordCount(str)).to.eql(2);
		expect(StringUtils.editDistance(str, str)).to.eql(0);
		expect(StringUtils.editDistance(str, str + 'a')).to.eql(1);
		expect(StringUtils.similarity(str, str)).to.eql(1);
	});

	it('should find substr', function() {
		expect(StringUtils.afterFirst(str, 'l')).to.eql('lo World');
		expect(StringUtils.afterLast(str, 'l')).to.eql('d');
		expect(StringUtils.beginsWith(str, 'H')).to.be.true;
		expect(StringUtils.beforeFirst(str, 'l')).to.eql('He');
		expect(StringUtils.beforeLast(str, 'l')).to.eql('Hello Wor');
		expect(StringUtils.between(str, 'H', 'W')).to.eql('ello ');
	});

	it('should format', function() {
		expect(StringUtils.trim('  '+str+'  ')).to.eql('Hello World');
		expect(StringUtils.trimLeft('  '+str+'  ')).to.eql('Hello World  ');
		expect(StringUtils.trimRight('  '+str+'  ')).to.eql('  Hello World');
		expect(StringUtils.padLeft(str, '_', 12)).to.eql('_Hello World');
		expect(StringUtils.padRight(str, '_', 12)).to.eql('Hello World_');
		expect(StringUtils.removeExtraWhitespace('Hello     World')).to.eql('Hello World');
		expect(StringUtils.remove(str, 'll')).to.eql('Heo World');
		// TODO: this sometime acts unexpectedly with shorter strings
		expect(StringUtils.truncate(str, 10)).to.eql('Hello...');
		//expect(StringUtils.truncate(str, 4)).to.eql('Hello...');
		expect(StringUtils.capitalize(str.toLowerCase())).to.eql('Hello world');
		expect(StringUtils.properCase(str.toLowerCase())).to.eql('Hello World');
		expect(StringUtils.reverse(str)).to.eql('dlroW olleH');
		expect(StringUtils.reverseWords(str)).to.eql('World Hello');
		expect(StringUtils.stripTags('<p>'+str+'</p>')).to.eql('Hello World');
		expect(StringUtils.swapCase(str)).to.eql('hello World');
		//expect(StringUtils.block(str)).to.eql('Hello World');
		expect(StringUtils.escapePattern(str + '.')).to.eql('Hello World\\.');
	});
});
