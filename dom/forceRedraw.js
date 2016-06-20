export default function forceRedraw(el) {
    const display = el.style.display;
    el.style.display = 'none';
    el.offsetHeight;
    el.style.display = display;
}
