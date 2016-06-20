export default function objectPool(factoryFn) {

    let pool = [];

    return {
        getPool () {
            return pool;
        },
        get () {
            if ( pool.length > 0 ) {
                return pool.pop();
            } else {
                return factoryFn();
            }
        },
        dispose (instance) {
            pool.push(instance);
        },
        fill (count) {
            while ( pool.length < count ) {
                pool[pool.length] = factoryFn();
            }
        },
        empty () {
            pool = [];
        }
    };
}
