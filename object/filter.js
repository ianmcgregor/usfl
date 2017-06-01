export default function filter(ob, predicate) {
    return Object.keys(ob)
        .filter(key => predicate(key, ob[key]))
        .reduce((newOb, key) => {
            newOb[key] = ob[key];
            return newOb;
        }, {});
}
