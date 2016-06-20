// remove all HTML tags from str
export default function stripTags(str) {
    return str.replace(/<\/?[^>]+>/igm, '');
}
