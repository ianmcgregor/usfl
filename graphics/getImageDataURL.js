// convert image to localstorage friendly data URL string
export default function getImageDataURL(img, width, height) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = width || img.width;
    canvas.height = height || img.height;
    context.drawImage(img, 0, 0);
    return canvas.toDataURL('image/png');
}
