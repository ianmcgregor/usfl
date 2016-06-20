import popup from '../popup';

export default function facebook(url) {
    url = encodeURIComponent(url);
    return popup(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
}
