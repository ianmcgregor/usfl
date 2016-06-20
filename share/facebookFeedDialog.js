import popup from '../popup';

export default function facebookFeedDialog(appId, redirect, url, title = '', image = '', caption = '', desc = '', source = '') {
    title = encodeURIComponent(title);
    caption = encodeURIComponent(caption);
    desc = encodeURIComponent(desc);

    const params = `?display=popup&show_error=true&app_id=${appId}&source=${source}&redirect_uri=${redirect}`;
    const content = `name=${title}&link=${url}&caption=${caption}&description=${desc}&picture=${image}`;

    return popup(`https://www.facebook.com/dialog/feed?${params}&${content}`);
}
