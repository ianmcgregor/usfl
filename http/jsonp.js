export default function jsonp(url, cb, timeout = 5000) {
    const script = document.createElement('script');
    const callback = `jsonp_callback_${Math.round(100000 * Math.random())}`;
    const separator = url.indexOf('?') >= 0 ? '&' : '?';

    const timeoutId = window.setTimeout(() => {
        window[callback](null, 'jsonp error');
    }, timeout);

    window[callback] = function(data, err = null) {
        window.clearTimeout(timeoutId);
        delete window[callback];
        document.body.removeChild(script);
        cb(data, err);
    };

    script.src = `${url}${separator}callback=${callback}`;
    document.body.appendChild(script);
}
