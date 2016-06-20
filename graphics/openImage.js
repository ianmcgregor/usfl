export default function openImage(canvas) {
    const {width, height} = canvas;
    const win = window.open('', 'image');
    const src = canvas.toDataURL('image/png');
    win.document.write(`<img src="${src}" width="${width}" height="${height}">`);
}
