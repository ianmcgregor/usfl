export default function xhr(url, type = 'json') {
    const p = new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.addEventListener('load', () => resolve(req.response));
        req.addEventListener('error', () => reject(req.status));
        req.open('GET', url);
        req.responseType = type;
        // req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        req.send();
    });
    return p;
}
