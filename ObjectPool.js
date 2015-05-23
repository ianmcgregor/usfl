'use strict';

function ObjectPool(Type) {

    var pool = [];

    return {
        getPool: function() {
            return pool;
        },
        get: function() {
            if ( pool.length > 0 ) {
                return pool.pop();
            } else {
                return new Type();
            }
        },
        dispose: function(instance) {
            pool.push(instance);
        },
        fill: function(count) {
            while ( pool.length < count ) {
                pool[pool.length] = new Type();
            }
        },
        empty: function() {
            pool = [];
        }
    };
}

if (typeof module === 'object' && module.exports) {
    module.exports = ObjectPool;
}
