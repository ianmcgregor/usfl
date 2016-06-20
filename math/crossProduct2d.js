/*
The sign tells us if a is to the left (-) or the right (+) of b
*/
export default function crossProduct2d(aX, aY, bX, bY) {
    return aX * bY - aY * bX;
}
