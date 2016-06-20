// everything before the first occurrence of substr in str
export default function beforeFirst(str, substr) {
    const index = str.indexOf(substr);
    if (index === -1) {
        return '';
    }
    return str.slice(0, index);
}
