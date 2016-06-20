import popup from '../popup';

export default function reddit(url, title = '') {
    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    return popup(`https://www.reddit.com/submit?url=${url}&title=${title}`);
}
