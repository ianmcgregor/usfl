function easeInQuart(t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
}

function easeOutQuart(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

function easeInOutQuart(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t + b;
    }
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}

export default {
    easeIn: easeInQuart,
    easeOut: easeOutQuart,
    easeInOut: easeInOutQuart
};

export {
    easeInQuart,
    easeOutQuart,
    easeInOutQuart
};
