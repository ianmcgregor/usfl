import popup from '../popup';

export default function twitter(url, text = '', hashtags = '', related = '') {
    url = encodeURIComponent(url);
    text = encodeURIComponent(text);
    hashtags = encodeURIComponent(hashtags);
    related = encodeURIComponent(related);

    return popup(`https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${hashtags}&related=${related}`);
}
