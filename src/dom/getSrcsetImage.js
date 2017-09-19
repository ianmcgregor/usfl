export default function getSrcsetImage(srcset, pixelWidth) {
    pixelWidth = pixelWidth || window.innerWidth * (window.devicePixelRatio || 0);

    const set = srcset.split(',')
        .map((item) => {
            const [url, width] = item.trim().split(/\s+/);
            const size = parseInt(width.slice(0, -1), 10);
            return {url, size};
        })
        .sort((a, b) => b.size - a.size);

    if (!set.length) {
        return '';
    }

    return set.reduce((value, item) => {
        return item.size >= pixelWidth ? item.url : value;
    }, set[0].url);
}
