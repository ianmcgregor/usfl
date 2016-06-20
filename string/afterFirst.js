// everything after the first occurrence of substr in str
export default function afterFirst(str, substr) {
    let index = str.indexOf(substr);
    if (index === -1) {
        return '';
    }
    index += substr.length;
    return str.slice(index);
}
