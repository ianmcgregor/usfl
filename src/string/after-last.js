// everything after the last occurence of substr in str
export default function afterLast(str, substr) {
    let index = str.lastIndexOf(substr);
    if (index === -1) {
        return '';
    }
    index += substr.length;
    return str.slice(index);
}
