import capitalize from './capitalize';

// proper case str in sentence format
export default function properCase(str) {
    const newStr = str.toLowerCase().replace(/\b([^.?;!]+)/, capitalize);
    return newStr.replace(/\b[i]\b/, 'I');
}
