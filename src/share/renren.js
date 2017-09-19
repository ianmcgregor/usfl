import popup from '../popup';

export default function vkontakte(url, title = '') {
    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    return popup(`http://share.renren.com/share/buttonshare.do?link=${url}&title=${title}`);
}
