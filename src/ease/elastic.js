const {abs, asin, PI, pow, sin} = Math;
const PI_2 = PI * 2;

function easeInElastic(t, b, c, d, a, p) {
    let s;
    if (t === 0) {
        return b;
    }
    if ((t /= d) === 1) {
        return b + c;
    }
    if (!p) {
        p = d * 0.3;
    }
    if (!a || a < abs(c)) {
        a = c;
        s = p / 4;
    } else {
        s = p / PI_2 * asin(c / a);
    }
    return -(a * pow(2, 10 * (t -= 1)) * sin((t * d - s) * PI_2 / p)) + b;
}

function easeOutElastic(t, b, c, d, a, p) {
    let s;
    if (t === 0) {
        return b;
    }
    if ((t /= d) === 1) {
        return b + c;
    }
    if (!p) {
        p = d * 0.3;
    }
    if (!a || a < abs(c)) {
        a = c;
        s = p / 4;
    } else {
        s = p / PI_2 * asin(c / a);
    }
    return (a * pow(2, -10 * t) * sin((t * d - s) * PI_2 / p) + c + b);
}

function easeInOutElastic(t, b, c, d, a, p) {
    let s;
    if (t === 0) {
        return b;
    }
    if ((t /= d / 2) === 2) {
        return b + c;
    }
    if (!p) {
        p = d * (0.3 * 1.5);
    }
    if (!a || a < abs(c)) {
        a = c;
        s = p / 4;
    } else {
        s = p / PI_2 * asin(c / a);
    }
    if (t < 1) {
        return -0.5 * (a * pow(2, 10 * (t -= 1)) * sin((t * d - s) * PI_2 / p)) + b;
    }
    return a * pow(2, -10 * (t -= 1)) * sin((t * d - s) * PI_2 / p) * 0.5 + c + b;
}

export default {
    easeIn: easeInElastic,
    easeOut: easeOutElastic,
    easeInOut: easeInOutElastic
};

export {
    easeInElastic,
    easeOutElastic,
    easeInOutElastic
};
