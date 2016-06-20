export default function splitValueAndUnit(prop) {
    const re = /(^-?\d*\.?\d*)(.*)/;
    const match = prop.match(re);
    const value = Number(match[1]);
    const unit = match[2];
    return {value, unit};
}
