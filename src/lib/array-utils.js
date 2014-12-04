'use strict';

var ArrayUtils = {
    clone: function(arr) {
        return arr.slice(0);
    },
    getRandom: function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },
    isArray: function(arr) {
        return Array.isArray ? Array.isArray(arr) : arr && arr instanceof Array;
    },
    nearest: function(value, arr) {
        var index = -1,
            least = Number.MAX_VALUE,
            diff;
        arr.forEach(function(item, i) {
            diff = Math.abs(item - value);
            if (diff < least) {
                least = diff;
                index = i;
            }
        });
        return index;
    },
    sortNumeric: function(arr) {
        return arr.sort(function(a,b){
            return a - b;
        });
    },
    sortRandom: function(arr) {
        return arr.sort(function(){
            return Math.random() > 0.5 ? -1 : 1;
        });
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = ArrayUtils;
}
