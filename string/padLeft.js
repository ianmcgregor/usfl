// pad str with substr from the left
export default function padLeft(str, substr, length) {
    while (str.length < length) {
        str = substr + str;
    }
    return str;
}
