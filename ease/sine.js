const {cos, PI, sin} = Math;
const PI_D2 = PI / 2;

function easeInSine(t, b, c, d) {
    return -c * cos(t / d * PI_D2) + c + b;
}

function easeOutSine(t, b, c, d) {
    return c * sin(t / d * PI_D2) + b;
}

function easeInOutSine(t, b, c, d) {
    return -c / 2 * (cos(PI * t / d) - 1) + b;
}

export default {
    easeIn: easeInSine,
    easeOut: easeOutSine,
    easeInOut: easeInOutSine
};

export {
    easeInSine,
    easeOutSine,
    easeInOutSine
};
