export default function jsonp(url, timeout = 10000) {
    return new Promise((resolve, reject) => {
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
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        };

        script.src = `${url}${separator}callback=${callback}`;
        document.body.appendChild(script);
    });
}
