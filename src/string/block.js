import escapePattern from './escape-pattern';
import truncate from './truncate';
// Utility method that intelligently breaks up your string,
// allowing you to create blocks of readable text.
// This method returns you the closest possible match to the delim paramater,
// while keeping the text length within the len paramter.
// If a match can't be found in your specified length an  '...' is added to that block,
// and the blocking continues untill all the text is broken apart.
export default function block(str, len, delim = '.') {
    const arr = [];

    if (!str || !str.includes(delim)) {
        return arr;
    }

    if (delim === ' ') {
        str += delim;
    }

    let chrIndex = 0;
    const replPatt = new RegExp('[^' + escapePattern(delim) + ']+$');

    while (chrIndex < str.length) {
        let subString = str.substr(chrIndex, len);
        if (!subString.includes(delim)) {
            arr.push(truncate(subString, subString.length));
            chrIndex += subString.length;
        }
        subString = subString.replace(replPatt, '');
        chrIndex += subString.length;
        arr.push(subString.trim());
    }
    return arr;
}
