export default function sortNumeric(a, b) {
    if (arguments.length === 1) {
        return function(x, y) {
            return Number(x[a]) - Number(y[a]);
        };
    }
    return Number(a) - Number(b);
}
