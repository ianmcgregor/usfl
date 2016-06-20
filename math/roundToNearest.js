export default function roundToNearest(value, unit) {
    return Math.round(value / unit) * unit;
}
