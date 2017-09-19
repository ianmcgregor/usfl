// Capitalize the first word in a string or all words
export default function capitalize(str, all = false) {
    const substr = str.trimLeft();
    const re = all ? /^.|\b./g : /(^\w)/;
    return substr.replace(re, (match) => match.toUpperCase());
}
