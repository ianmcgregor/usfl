import popup from '../popup';

export default function linkedin(url, title = '') {
    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    return popup(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`);
}
