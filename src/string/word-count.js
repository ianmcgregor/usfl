// the number of words in a string
export default function wordCount(str) {
    return str.match(/\b\w+\b/g).length;
}
