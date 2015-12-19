'use strict';

var resize = function (rect, areaWidth, areaHeight, autoCenter, method) {
    var width = rect.width,
        height = rect.height,
        scale;

    switch (method) {
        case 'fill':
            scale = Math.max(areaWidth / width, areaHeight / height);
            break;
        case 'fit':
            scale = Math.min(areaWidth / width, areaHeight / height);
            break;
        case 'fitWidth':
            scale = areaWidth / width;
            break;
        case 'fitHeight':
            scale = areaHeight / height;
            break;
        default:
            scale = Math.max(areaWidth / width, areaHeight / height);
            break;
    }

    rect.width = Math.ceil(width * scale);
    rect.height = Math.ceil(height * scale);

    if (autoCenter) {
        rect.x = Math.round((areaWidth - rect.width) * 0.5);
        rect.y = Math.round((areaHeight - rect.height) * 0.5);
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = resize;
}
