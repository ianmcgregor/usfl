import popup from '../popup';

export default function email(url, subject = '', body = '') {
    url = encodeURIComponent(url);
    subject = encodeURIComponent(subject);

    const newlines = encodeURIComponent('\r\n\r\n');
    body = body ? `${encodeURIComponent(body)}${newlines}` : '';

    return popup(`mailto:?subject=${subject}&body=${body}${url}`);
}
