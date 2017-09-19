export default function loadScript(src, cb) {
    const script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', () => cb(null, src));
    script.addEventListener('error', () => cb(true, src));
    document.body.appendChild(script);
    return script;
}
