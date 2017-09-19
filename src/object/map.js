export default function map(ob, fn) {
    return Object.keys(ob)
        .reduce((newOb, key) => {
            newOb[key] = fn(key, ob[key]);
            return newOb;
        }, {});
}
