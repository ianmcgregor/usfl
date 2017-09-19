export default function nearest(value, arr) {
    let least = Number.MAX_VALUE;
    return arr.reduce((result, item) => {
        const diff = Math.abs(item - value);
        if (diff < least) {
            least = diff;
            result = item;
        }
        return result;
    }, -1);
}
