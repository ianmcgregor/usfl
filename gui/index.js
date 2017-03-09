import loadScript from '../http/loadScript';

// example usage:
//
// const opts = {
//     friction: 0.9,
//     maxSpeed: 1
// };
// gui(true)
//     .then((g) => {
//         g.add(opts, 'friction', 0.7, 0.999);
//         g.add(opts, 'maxSpeed', 0.5, 2).onChange((value) => console.log(value));
//     })
//     .catch((err) => console.error(err));

export default function gui(localhostOnly = false) {
    if (localhostOnly && !/^(?:https?:\/\/)?(?:localhost|192\.168)/.test(window.location.href)) {
        return new Promise(() => {});
    }
    return new Promise((resolve, reject) => {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.6.1/dat.gui.min.js', (err, src) => {
            if (err) {
                console.error('Error loading script', src);
                reject(new Error('Error loading script'));
                return;
            }
            const g = new window.dat.GUI({autoPlace: true});
            const s = document.styleSheets[0];
            s.insertRule('.dg.ac {z-index:10000 !important}', 0);
            s.insertRule('.dg * {font-size:11px !important}', 0);
            s.insertRule('.dg input {font:11px Lucida Grande,sans-serif !important}', 0);
            resolve(g);
        });
    });
}
