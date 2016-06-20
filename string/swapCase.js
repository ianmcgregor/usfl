
// swaps the case of str
export default function swapCase(str) {
    return str.replace(/(\w)/, function(newStr) {
        const lower = newStr.toLowerCase();
        const upper = newStr.toUpperCase();
        switch (newStr) {
            case lower:
                return upper;
            case upper:
                return lower;
            default:
                return newStr;
        }
    });
}
