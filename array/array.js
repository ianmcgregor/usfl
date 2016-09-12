export default function array(length, value) {
    const arr = [];
    for (let i = 0; i < length; i++) {
        const val = typeof value !== 'undefined' ? value : i;
        arr.push(val);
    }
    return arr;
}
