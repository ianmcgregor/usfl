export default function moveElement(arr, from, to) {
    arr = arr.slice(0);
    const removed = arr.splice(from, 1)[0];
    const insertAt = to < 0 ? arr.length + to : to;
    arr.splice(insertAt, 0, removed);
    return arr;
}
