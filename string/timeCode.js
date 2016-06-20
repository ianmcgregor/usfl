// formats seconds into HH:MM:SS
export default function timeCode(seconds, delim = ':') {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);
    const hr = (h < 10 ? '0' + h : h) + delim;
    const mn = (m < 10 ? '0' + m : m) + delim;
    const sc = (s < 10 ? '0' + s : s);
    return hr + mn + sc;
}
