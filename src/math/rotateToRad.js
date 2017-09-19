const PI2 = Math.PI * 2;

export default function rotateToRAD(start, end) {
    let diff = (end - start) % PI2;
    if (diff !== diff % Math.PI) {
        diff = diff < 0 ? diff + PI2 : diff - PI2;
    }
    return start + diff;
}
