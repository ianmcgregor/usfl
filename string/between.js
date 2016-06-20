// everything after the first occurance of start and before the first occurrence of end
export default function between(str, start, end) {
    let substr = '';
    let startIndex = str.indexOf(start);
    if (startIndex !== -1) {
        startIndex += start.length;
        const endIndex = str.indexOf(end, startIndex);
        if (endIndex !== -1) {
            substr = str.slice(startIndex, endIndex);
        }
    }
    return substr;
}
