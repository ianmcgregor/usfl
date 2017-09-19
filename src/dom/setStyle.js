export default function setStyle(el, style) {
    Object.keys(style).forEach((prop) => {
        el.style[prop] = style[prop];
    });
    return el;
}
