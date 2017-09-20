// whether str is numeric
export default function isNumeric(str) {
    const regx = /^[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?$/;
    return regx.test(str);
}
