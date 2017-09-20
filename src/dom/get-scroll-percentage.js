import getScrollTop from './get-scroll-top';

export default function getScrollPercentage() {
    return (getScrollTop() + window.innerHeight) / document.body.clientHeight;
}
