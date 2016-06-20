// remove extra whitespace (extra spaces, tabs, line breaks, etc)
export default function removeExtraWhitespace(str) {
    return str.trim().replace(/\s+/g, ' ');
}
