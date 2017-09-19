export default function clamp(value, min, max) {
    if (min > max) {
        const a = min;
        min = max;
        max = a;
    }
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
}
