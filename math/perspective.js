// x = x * perspective
// y = y * perspective
// scale = perspective

export default function perspective(z, focalLength = 300) {
    return focalLength / (focalLength + z);
}
