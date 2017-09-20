export default function quadraticCurve(fromX, fromY, cpX, cpY, toX, toY, goThroughCP = false) {
    const n = 20;
    const points = [fromX, fromY];
    let xa = 0;
    let ya = 0;

    if (goThroughCP) {
        cpX = cpX * 2 - (fromX + toX) / 2;
        cpY = cpY * 2 - (fromY + toY) / 2;
    }

    for (let i = 1; i <= n; ++i) {
        const j = i / n;

        xa = fromX + ((cpX - fromX) * j);
        ya = fromY + ((cpY - fromY) * j);

        points.push(xa + (((cpX + ((toX - cpX) * j)) - xa) * j), ya + (((cpY + ((toY - cpY) * j)) - ya) * j));
    }

    return points;
}
