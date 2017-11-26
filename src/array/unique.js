export default function uniqiue(arr) {
    return arr.filter((value, index, self) => self.indexOf(value) === index);
}
