export default function webgl() {
    try {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!(window.WebGLRenderingContext && context);
    } catch (e) {
        return false;
    }
}
