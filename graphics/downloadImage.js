export default function downloadImage(canvas) {
    window.location.href = canvas.toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
}
