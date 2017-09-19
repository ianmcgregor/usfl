function getScale(method, width, height, areaWidth, areaHeight) {
    switch (method) {
        case 'cover':
            return Math.max(areaWidth / width, areaHeight / height);
        case 'contain':
            return Math.min(areaWidth / width, areaHeight / height);
        case 'width':
            return areaWidth / width;
        case 'height':
            return areaHeight / height;
        default: break;
    }
    return 1;
}

export default function size(rect, areaWidth, areaHeight, method = 'cover', autoCenter = true) {
    const scale = getScale(method, rect.width, rect.height, areaWidth, areaHeight);
    const width = Math.ceil(rect.width * scale);
    const height = Math.ceil(rect.height * scale);

    let x = 0, y = 0;

    if (autoCenter) {
        x = Math.round((areaWidth - width) * 0.5);
        y = Math.round((areaHeight - height) * 0.5);
    }

    return {
        x,
        y,
        width,
        height,
        scale
    };
}
