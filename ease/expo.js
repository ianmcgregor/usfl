const {pow} = Math;

function easeInExpo(t, b, c, d) {
    return t === 0 ? b : c * pow(2, 10 * (t / d - 1)) + b;
}

function easeOutExpo(t, b, c, d) {
    return t === d ? b + c : c * (-pow(2, -10 * t / d) + 1) + b;
}

function easeInOutExpo(t, b, c, d) {
    if (t === 0) {
        return b;
    }
    if (t === d) {
        return b + c;
    }
    if ((t /= d / 2) < 1) {
        return c / 2 * pow(2, 10 * (t - 1)) + b;
    }
    return c / 2 * (-pow(2, -10 * --t) + 2) + b;
}

export default {
    easeIn: easeInExpo,
    easeOut: easeOutExpo,
    easeInOut: easeInOutExpo
};

export {
    easeInExpo,
    easeOutExpo,
    easeInOutExpo
};
