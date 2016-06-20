const plus = /\+/g;  // match '+' symbol
const search = /([^&=]+)=?([^&]*)/g;

function decode(str) {
    return decodeURIComponent(str.replace(plus, ' '));
}

export default function urlParams(query) {
    query = query || window.location.search.slice(1);

    const params = {};
    let match = search.exec(query);
    while (match) {
        params[decode(match[1])] = decode(match[2]);
        match = search.exec(query);
    }
    return params;
}
