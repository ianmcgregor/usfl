const ua = navigator.userAgent;

const ipad = () => /iPad/i.test(ua);
const ipod = () => /iPod/i.test(ua);
const iphone = () => /iPhone/i.test(ua);
const mobile = () => !!ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|SymbianOS/i);
const desktop = () => !mobile();

export default {
    desktop,
    ipad,
    iphone,
    ipod,
    mobile
};
