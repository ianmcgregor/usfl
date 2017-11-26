export default function language() {
    if (typeof navigator === 'undefined') {
        return null;
    }
    return (navigator.languages && navigator.languages[0]) || (navigator.language || navigator.userLanguage);
}
