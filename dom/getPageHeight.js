export default function getPageHeight() {
    const body = document.body;
    const doc = document.documentElement;

    return Math.max(
        body.scrollHeight || 0,
        body.offsetHeight || 0,
        body.clientHeight || 0,
        doc.clientHeight || 0,
        doc.offsetHeight || 0,
        doc.scrollHeight || 0
    );
}
