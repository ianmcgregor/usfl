export default function getIntersectionArea(aX, aY, aW, aH, bX, bY, bW, bH) {
    const overlapX = Math.max(0, Math.min(aX + aW, bX + bW) - Math.max(aX, bX));
    const overlapY = Math.max(0, Math.min(aY + aH, bY + bH) - Math.max(aY, bY));
    return overlapX * overlapY;
}
