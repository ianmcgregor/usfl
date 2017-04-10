export default function isLocalHost() {
    return /^(?:https?:\/\/)?(?:localhost|192\.168)/.test(window.location.href);
}
