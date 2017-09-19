// truncate to length with suffix
export default function truncate(str, len, suffix = '...') {
    len -= suffix.length;
    let trunc = str;
    if (trunc.length > len) {
        trunc = trunc.substr(0, len);
        const r = /[^\s]/;
        if (r.test(str.charAt(len))) {
            trunc = trunc.replace(/\w+$|\s+$/, '').trimRight();
        }
        trunc += suffix;
    }
    return trunc;
}
