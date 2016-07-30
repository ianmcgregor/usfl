export default function cerp(from, to, weight = 0.3) {
    const f = (1 - Math.cos(weight * Math.PI)) / 2;
    return (from * (1 - f) + to * f);
}
