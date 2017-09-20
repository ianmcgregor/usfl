const re = /[^0-9.-]/g;

function diff(a, b) {
    const a1 = a.replace(re, '');
    const b1 = b.replace(re, '');
    return Number(a1) - Number(b1);
}

export default function sortNumbered(a, b) {
    if (arguments.length === 1) {
        return function(x, y) {
            return diff(x[a], y[a]);
        };
    }
    return diff(a, b);
}
