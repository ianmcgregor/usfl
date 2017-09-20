export default function rotatePoint(p, theta, origin = {x: 0, y: 0}, p1 = {x: 0, y: 0}) {
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);
    p1.x = (p.x - origin.x) * cosTheta - (p.y - origin.y) * sinTheta;
    p1.y = (p.x - origin.x) * sinTheta + (p.y - origin.y) * cosTheta;
    p1.x += origin.x;
    p1.y += origin.y;
    return p1;
}
