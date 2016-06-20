export default function sortRandom(arr) {
    return arr.sort(() => {
        return Math.random() > 0.5 ? -1 : 1;
    });
}
