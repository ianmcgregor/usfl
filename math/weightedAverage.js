export default function weightedAverage(from, to, weight = 10) {
    return ((from * (weight - 1)) + to) / weight;
}
