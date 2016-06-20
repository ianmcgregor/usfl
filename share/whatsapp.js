export default function whatsapp(url, body = '') {
    url = encodeURIComponent(url);

    const newlines = encodeURIComponent('\r\n\r\n');
    body = body ? `${encodeURIComponent(body)}${newlines}` : '';

    window.location.href = `whatsapp://send?text=${body}${url}`;
}
