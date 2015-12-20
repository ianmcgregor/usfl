'use strict';

var LinkedList = require('../LinkedList');

describe('linked list', function() {
    var linkedList = new LinkedList();
    var items = [];

    for (var i = 0; i < 10; i++) {
        items.push(linkedList.add({
            'index': i,
            'next': null,
            'prev': null
        }));
    }

    it('should have 10 items', function() {
        expect(linkedList.getCount()).to.eql(10);
    });

    it('should have first', function() {
        expect(linkedList.getFirst()).to.exist;
    });

    it('should have last', function() {
        expect(linkedList.getLast()).to.exist;
    });

    it('should be able to iterate', function() {
        var item = linkedList.getFirst();
        while (item.next) {
            expect(item).to.exist;
            expect(item).to.have.property('index');
            item = item.next;
        }
        expect(item).to.eql(linkedList.getLast());
    });

    it('should be able to remove item', function() {
        linkedList.remove(linkedList.getFirst());
        expect(linkedList.getCount()).to.eql(9);
        expect(linkedList.getFirst()).to.exist;

        linkedList.remove(linkedList.getLast());
        expect(linkedList.getCount()).to.eql(8);
        expect(linkedList.getLast()).to.exist;
    });

    it('should be able to insert', function() {
        var item = {
            'index': 100,
            'next': null,
            'prev': null
        };
        linkedList.insertBefore(item, linkedList.getFirst());

        expect(linkedList.getCount()).to.eql(9);
        expect(item).to.eql(linkedList.getFirst());
    });
});
