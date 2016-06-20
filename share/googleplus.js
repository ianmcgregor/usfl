import popup from '../popup';

export default function googleplus(url) {
    url = encodeURIComponent(url);
    return popup(`https://plus.google.com/share?url=${url}`);
}
