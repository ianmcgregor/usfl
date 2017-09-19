function easeInQuad(t, b, c, d) {
    return c * (t /= d) * t + b;
}

function easeOutQuad(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
}

function easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
    }
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

export default {
    easeIn: easeInQuad,
    easeOut: easeOutQuad,
    easeInOut: easeInOutQuad
};

export {
    easeInQuad,
    easeOutQuad,
    easeInOutQuad
};
