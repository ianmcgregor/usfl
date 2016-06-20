import escapePattern from './escapePattern';

// remove all instances of substr in str
export default function remove(str, substr, caseSensitive = false) {
    const escapedStr = escapePattern(substr);
    const flags = caseSensitive ? 'g' : 'ig';
    return str.replace(new RegExp(escapedStr, flags), '');
}
