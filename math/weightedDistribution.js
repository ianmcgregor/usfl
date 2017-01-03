import random from './random';

export default function weightedDistribution(min, max, weight = 5) {
    let total = 0;
    for (let i = 0; i < weight; i++) {
        total += random(min, max);
    }
    return total / weight;
}
