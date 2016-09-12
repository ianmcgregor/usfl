import objectPool from '../object-pool';

describe('object pool', function() {
    let newlyCreated = 0;

    function TestOb() {
        newlyCreated++;
        const id = Math.random();
        return {
            getId: function() {
                return id;
            }
        };
    }

    it('should pass', function() {
        const pool = objectPool(TestOb);
        let instance = pool.get();

        expect(instance).to.exist;
        expect(instance.getId()).to.be.a('number');
        expect(pool.getPool().length).to.eql(0);

        pool.dispose(instance);

        expect(pool.getPool().length).to.eql(1);

        instance = pool.get();

        expect(instance.getId()).to.be.a('number');
        expect(pool.getPool().length).to.eql(0);
        expect(newlyCreated).to.eql(1);

        pool.fill(10);
        expect(pool.getPool().length).to.eql(10);
        expect(newlyCreated).to.eql(11);

        for (let i = 0; i < 5; i++) {
            instance = pool.get();
            expect(instance.getId()).to.be.a('number');
        }
        expect(pool.getPool().length).to.eql(5);
        expect(newlyCreated).to.eql(11);

        expect(pool.getNumCreated()).to.eql(newlyCreated);
    });
});
