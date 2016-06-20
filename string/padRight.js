// pads str with substr from the right
export default function padRight(str, substr, length) {
    while (str.length < length) {
        str += substr;
    }
    return str;
}
