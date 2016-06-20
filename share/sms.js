export default function sms(url, body = '') {
    url = encodeURIComponent(url);

    const newlines = encodeURIComponent('\r\n\r\n');
    body = body ? `${encodeURIComponent(body)}${newlines}` : '';

    const ios = /iP[ao]d|iPhone/i.test(navigator.userAgent);
    const delim = ios ? '&' : '?';

    window.location.href = `sms:${delim}body=${body}${url}`;
}
