function easeInBack(t, b, c, d, s = 1.70158) {
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
}

function easeOutBack(t, b, c, d, s = 1.70158) {
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}

function easeInOutBack(t, b, c, d, s = 1.70158) {
    if ((t /= d / 2) < 1) {
        return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    }
    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
}

export default {
    easeIn: easeInBack,
    easeOut: easeOutBack,
    easeInOut: easeInOutBack
};

export {
    easeInBack,
    easeOutBack,
    easeInOutBack
};
