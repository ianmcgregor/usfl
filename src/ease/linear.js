function easeLinear(t, b, c, d) {
    return c * t / d + b;
}

export default {
    easeIn: easeLinear,
    easeOut: easeLinear,
    easeInOut: easeLinear
};

export {
    easeLinear
};
