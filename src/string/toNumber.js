export default function toNumber(str) {
    return Number(str.replace(/[^0-9.]/g, ''));
}
