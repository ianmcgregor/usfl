export default function blockScrolling(value) {
    document.body.style.overflow = value ? 'hidden' : '';
}
