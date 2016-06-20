import getScrollTop from './getScrollTop';

export default function getScrollPercentage() {
    return (getScrollTop() + window.innerHeight) / document.body.clientHeight;
}
