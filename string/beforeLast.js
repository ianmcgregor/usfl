// everything before the last occurrence of substr in the string.
export default function beforeLast(str, substr) {
    const index = str.lastIndexOf(substr);
    if (index === -1) {
        return '';
    }
    return str.slice(0, index);
}
