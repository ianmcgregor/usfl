export default function objectPool(factoryFn) {

    let pool = [];
    let numCreated = 0;

    return {
        getPool () {
            return pool;
        },
        get () {
            if ( pool.length > 0 ) {
                return pool.pop();
            } else {
                numCreated++;
                return factoryFn();
            }
        },
        dispose (instance) {
            pool.push(instance);
        },
        fill (count) {
            while ( pool.length < count ) {
                numCreated++;
                pool[pool.length] = factoryFn();
            }
        },
        empty () {
            pool = [];
        },
        getNumCreated() {
            return numCreated;
        }
    };
}
