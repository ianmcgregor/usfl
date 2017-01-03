export default function circleDistribution(radius, origin = {x: 0, y: 0}, p = {x: 0, y: 0}) {
    const r = Math.sqrt(Math.random()) * radius;
    const theta = Math.random() * Math.PI * 2;
    p.x = origin.x + Math.cos(theta) * r;
    p.y = origin.y + Math.sin(theta) * r;
    return p;
}
