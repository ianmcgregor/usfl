export default function getLocation(href) {
    const l = document.createElement('a');
    l.href = href;

    return {
        hash: l.hash,
        host: l.host,
        hostname: l.hostname,
        pathname: l.pathname,
        port: l.port,
        protocol: l.protocol,
        search: l.search
    };
}
