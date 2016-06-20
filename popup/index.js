export default function popup(url, width = 800, height = 600, name = '') {
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    // const left = (window.screen.availWidth - width) / 2;
    // const top = (window.screen.availHeight - height) / 2;
    const defaults = 'directories=no,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no';
    const params = `width=${width},height=${height},top=${top},left=${left},${defaults}`;
    const win = window.open(url, name, params);
    if (win === null || typeof win === 'undefined') {
        return false;
    }
    if (window.focus) {
        win.focus();
    }
    return true;
}
