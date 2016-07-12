export default function roundTo(x, places = 2) {
    const div = Math.pow(10, places);
    return Math.round(x * div) / div;
}
