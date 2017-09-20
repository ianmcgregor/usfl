export default function preventWidow(str) {
    str = str.trim();

    const lastSpace = str.lastIndexOf(' ');
    if (lastSpace > 0) {
        return `${str.slice(0, lastSpace)}&nbsp;${str.slice(lastSpace + 1)}`;
    }

    return str;
}
