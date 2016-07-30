export default function lerp(from, to, weight = 0.3) {
    return from + (to - from) * weight;
}
