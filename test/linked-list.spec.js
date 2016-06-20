import linkedList from '../linked-list';

describe('linked list', () => {
    const list = linkedList();
    const items = [];

    for (let i = 0; i < 10; i++) {
        items.push(list.add({
            'index': i,
            'next': null,
            'prev': null
        }));
    }

    it('should have 10 items', () => {
        expect(list.getCount()).to.eql(10);
    });

    it('should have first', () => {
        expect(list.getFirst()).to.exist;
    });

    it('should have last', () => {
        expect(list.getLast()).to.exist;
    });

    it('should be able to iterate', () => {
        let item = list.getFirst();
        while (item.next) {
            expect(item).to.exist;
            expect(item).to.have.property('index');
            item = item.next;
        }
        expect(item).to.eql(list.getLast());
    });

    it('should be able to remove item', () => {
        list.remove(list.getFirst());
        expect(list.getCount()).to.eql(9);
        expect(list.getFirst()).to.exist;

        list.remove(list.getLast());
        expect(list.getCount()).to.eql(8);
        expect(list.getLast()).to.exist;
    });

    it('should be able to insert', () => {
        const item = {
            'index': 100,
            'next': null,
            'prev': null
        };
        list.insertBefore(item, list.getFirst());

        expect(list.getCount()).to.eql(9);
        expect(item).to.eql(list.getFirst());
    });
});
