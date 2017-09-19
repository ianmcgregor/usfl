export default function randomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}
