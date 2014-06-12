'use strict';

var ObjectPool = require('../src/lib/object-pool.js');

describe('object pool', function() {
	var newlyCreated = 0;

	function TestOb() {
		newlyCreated ++;
		var id = Math.random();
		return {
			getId: function() {
				return id;
			}
		};
	}

	it('should pass', function(){
		var p = new ObjectPool(TestOb);
		var t = p.get();

		expect(t).to.exist;
		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);

		p.dispose(t);

		expect(p.getPool().length).to.eql(1);
		
		t = p.get();

		expect(t.getId()).to.be.a('number');
		expect(p.getPool().length).to.eql(0);
		expect(newlyCreated).to.eql(1);

		p.fill(10);
		expect(p.getPool().length).to.eql(10);
		expect(newlyCreated).to.eql(11);

		for(var i = 0; i < 5; i++) {
			t = p.get();
			expect(t.getId()).to.be.a('number');
		}
		expect(p.getPool().length).to.eql(5);
		expect(newlyCreated).to.eql(11);
	});
});
