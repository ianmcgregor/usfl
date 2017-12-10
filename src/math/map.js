export default function map(v, a, b, x, y, clamp = true) {
    // value, min expected, max expected, map min, map max, clamp
    // e.g. map some value between 0 to 100 to -50 to 50
    // map(50, 0, 100, -50, 50) // 0
    // map(25, 0, 100, -50, 50) // -25
    if (v === a) {
        return x;
    }

    let val = (v - a) * (y - x) / (b - a) + x;

    if (!clamp) {
        return val;
    }

    if (y > x) {
        if (val > y) {
            val = y;
        }
        if (val < x) {
            val = x;
        }
    } else {
        if (val < y) {
            val = y;
        }
        if (val > x) {
            val = x;
        }
    }

    return val;
}
