import escapePattern from './escape-pattern';

// the number of times substr appears within str
export default function countOf(str, substr, caseSensitive) {
    const escapedStr = escapePattern(substr);
    const flags = (!caseSensitive) ? 'ig' : 'g';
    return str.match(new RegExp(escapedStr, flags)).length;
}
