export default function getLocation(href) {
    const l = document.createElement('a');
    l.href = href;
    return l;
}
