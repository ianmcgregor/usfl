export default function sortAlpha(a, b) {
    if (arguments.length === 1) {
        return function(x, y) {
            return String(x[a]).toLowerCase() > String(y[a]).toLowerCase() ? 1 : -1;
        };
    }
    return String(a).toLowerCase() > String(b).toLowerCase() ? 1 : -1;
}
