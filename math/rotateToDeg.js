export default function rotateToDeg(start, end) {
    let diff = (end - start) % 360;
    if (diff !== diff % 180) {
        diff = (diff < 0) ? diff + 360 : diff - 360;
    }
    return start + diff;
}
