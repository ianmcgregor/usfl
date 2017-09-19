import popup from '../popup';

export default function vkontakte(url, title = '', description = '', image = '') {
    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    description = encodeURIComponent(description);
    image = encodeURIComponent(image);
    return popup(`http://vkontakte.ru/share.php?url=${url}&title=${title}&description=${description}&image=${image}`);
}
