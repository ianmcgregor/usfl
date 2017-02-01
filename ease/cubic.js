function easeInCubic(t, b, c, d) {
    return c * (t /= d) * t * t + b;
}

function easeOutCubic(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
}

function easeInOutCubic(t, b, c, d) {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t + b;
    }
    return c / 2 * ((t -= 2) * t * t + 2) + b;
}

export default {
    easeIn: easeInCubic,
    easeOut: easeOutCubic,
    easeInOut: easeInOutCubic
};

export {
    easeInCubic,
    easeOutCubic,
    easeInOutCubic
};
