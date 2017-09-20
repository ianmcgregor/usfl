import editDistance from './edit-distance';

// percentage of similiarity from 0 to 1
export default function similarity(a, b) {
    const e = editDistance(a, b);
    const m = Math.max(a.length, b.length);
    if (m === 0) {
        return 1;
    }
    return (1 - e / m);
}
