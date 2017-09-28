export default (href = (typeof window !== 'undefined' && window.location.href)) => (
    /^(?:https?:\/\/)?(?:localhost|192\.168)/.test(href)
);
