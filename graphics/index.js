import downloadImage from './downloadImage';
import openImage from './openImage';

export default function graphics(canvas) {
    let gfx, ctx, w, h;
    let textFont = 'Times';
    let textSize = 12;

    function size(width, height) {
        w = canvas.width = width || window.innerWidth;
        h = canvas.height = height || window.innerHeight;
        return gfx;
    }

    function clear(color) {
        if (color) {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, w, h);
        } else {
            ctx.clearRect(0, 0, w, h);
        }
        return gfx;
    }

    function background(r, g, b) {
        clear(`rgb(${r},${b},${g})`);
        return gfx;
    }

    function fill(r, g, b, a = 1) {
        if (typeof r === 'string') {
            ctx.fillStyle = r;
            return gfx;
        }
        ctx.fillStyle = `rgba(${r},${b},${g},${a})`;
        return gfx;
    }

    function stroke(r, g, b, a = 1) {
        ctx.strokeStyle = `rgba(${r},${b},${g},${a})`;
        return gfx;
    }

    function strokeWeight(width) {
        ctx.lineWidth = width;
        return gfx;
    }

    function move(x, y) {
        ctx.moveTo(x, y);
        return gfx;
    }

    function line(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return gfx;
    }

    function rect(x, y, width, height, angle = 0) {
        if (angle !== 0) {
            ctx.save();
            ctx.translate(x + width / 2, y + height / 2);
            ctx.rotate(angle);
            ctx.rect(-width / 2, -height / 2, width, height);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        } else {
            ctx.rect(x, y, width, height);
            ctx.fill();
            ctx.stroke();
        }
        return gfx;
    }

    function circle(x, y, radius) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.stroke();
        return gfx;
    }

    function triangle(x, y, width, height, angle = 0) {
        if (angle !== 0) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0 - width / 2, 0 + height / 2);
            ctx.lineTo(0, 0 - height / 2);
            ctx.lineTo(0 + width / 2, 0 + height / 2);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.restore();
        } else {
            ctx.beginPath();
            ctx.moveTo(x - width / 2, y + height / 2);
            ctx.lineTo(x, y - height / 2);
            ctx.lineTo(x + width / 2, y + height / 2);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        }
        return gfx;
    }

    function triangleABC(x1, y1, x2, y2, x3, y3) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        return gfx;
    }

    function image(img, x, y, angle = 0) {
        if (angle !== 0) {
            const offsetX = img.width / 2,
                offsetY = img.height / 2;
            ctx.save();
            ctx.translate(x + offsetX, y + offsetY);
            ctx.rotate(angle);
            ctx.drawImage(img, -offsetX, -offsetY);
            ctx.restore();
        } else {
            ctx.drawImage(img, x, y);
        }
        return gfx;
    }

    function cross(radius) {
        ctx.beginPath();
        ctx.moveTo(-radius, -radius);
        ctx.lineTo(radius, radius);
        ctx.moveTo(-radius, radius);
        ctx.lineTo(radius, -radius);
        ctx.stroke();
        return gfx;
    }

    function text(str, x, y) {
        ctx.fillText(str, x, y);
        return gfx;
    }

    function setFont(fontFamily, fontSize) {
        textFont = fontFamily;
        if (fontSize) {
            textSize = fontSize;
        }
        ctx.font = `${textSize}px ${textFont}`;
        return gfx;
    }

    function setFontSize(fontSize) {
        setFont(textFont, fontSize);
        return gfx;
    }

    function getImageData() {
        return ctx.getImageData(0, 0, w, h);
    }

    function getPixel(x, y) {
        const imageData = getImageData();
        const i = (x + y * imageData.width) * 4;
        return Array.prototype.slice.call(imageData.data, i, i + 4);
    }

    function setPixel(x, y, r, g, b, a) {
        const imageData = getImageData();
        const i = (x + y * imageData.width) * 4;
        imageData.data[i + 0] = r;
        imageData.data[i + 1] = g;
        imageData.data[i + 2] = b;
        imageData.data[i + 3] = a;
        return gfx;
    }

    function eachPixel(fn) {
        const imageData = getImageData();
        const {data, width, height} = imageData;

        const l = width * height;
        for (let i = 0; i < l; i++) {
            // get color of pixel
            const r = data[i * 4]; // Red
            const g = data[i * 4 + 1]; // Green
            const b = data[i * 4 + 2]; // Blue
            const a = data[i * 4 + 3]; // Alpha

            // get the position of pixel
            const y = Math.floor(i / w);
            const x = i - y * w;

            fn(x, y, r, g, b, a);
        }
    }

    if (canvas) {
        size(canvas.width, canvas.height);
    } else if (document.querySelector('canvas')) {
        canvas = document.querySelector('canvas');
        size(canvas.width, canvas.height);
    } else {
        canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        size();
    }
    ctx = canvas.getContext('2d');
    setFont(textFont, textSize);

    gfx = {
        context: ctx,
        size,
        clear,
        background,
        fill,
        stroke,
        strokeWeight,
        move,
        line,
        rect,
        circle,
        triangle,
        triangleABC,
        image,
        cross,
        text,
        setFont,
        setFontSize,
        openImage: openImage.bind(null, canvas),
        downloadImage: downloadImage.bind(null, canvas),
        getImageData,
        getPixel,
        setPixel,
        eachPixel
    };

    return gfx;
}
