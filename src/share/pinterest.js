import popup from '../popup';

export default function pinterest(url, media, desc = '') {
    url = encodeURIComponent(url);
    media = encodeURIComponent(media);
    desc = encodeURIComponent(desc);
    return popup(`https://pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${desc}`);
}
