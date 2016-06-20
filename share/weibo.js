import popup from '../popup';

export default function weibo(url, title = '', image = '') {
    url = encodeURIComponent(url);
    title = encodeURIComponent(title);
    image = encodeURIComponent(image);

    const params = `url=${url}&appkey=&title=${title}&pic=${image}&ralateUid=&language=zh_cn`;
    return popup(`http://service.weibo.com/share/share.php?${params}`);
}
