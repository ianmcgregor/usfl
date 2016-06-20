// whether str ends with substr
export default function endsWith(str, substr) {
    return str.lastIndexOf(substr) === str.length - substr.length;
}
