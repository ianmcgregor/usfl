function getColour(r, g, b, a = 1) {
    if (typeof r === 'string') {
        return r;
    }
    if (typeof r === 'number') {
        return `rgba(${r},${b},${g},${a})`;
    }
    return null;
}

export default class Graphics {
    constructor(width, height) {
        if (typeof width === 'object' && width.tagName === 'CANVAS') {
            this.canvas = width;
        } else {
            this.canvas = document.createElement('canvas');
            this.size(width, height);
        }
        this.ctx = this.canvas.getContext('2d');
    }

    get context() {
        return this.ctx;
    }

    fill(r, g, b, a = 1) {
        this.ctx.fillStyle = getColour(r, g, b, a);
        return this;
    }

    stroke(r, g, b, a = 1) {
        this.ctx.strokeStyle = getColour(r, g, b, a);
        return this;
    }

    circle(x, y, radius) {
        const {ctx} = this;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.fill();
        return this;
    }

    rect(x, y, width, height, angle = 0) {
        const {ctx} = this;
        if (angle !== 0) {
            ctx.save();
            ctx.translate(x + width / 2, y + height / 2);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.rect(-width / 2, -height / 2, width, height);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        } else {
            ctx.rect(x, y, width, height);
            ctx.fill();
            ctx.stroke();
        }
        return this;
    }

    line(x1, y1, x2, y2) {
        const {ctx} = this;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return this;
    }

    lineWidth(width) {
        this.ctx.lineWidth = width;
        return this;
    }

    move(x, y) {
        this.ctx.moveTo(x, y);
        return this;
    }

    image(el, x, y, options) {
        const {ctx} = this;
        if (options) {
            const {alpha = 1, rotation = 0, scale = 1} = options;
            const offsetX = el.width / 2;
            const offsetY = el.height / 2;
            ctx.save();
            ctx.translate(x + offsetX, y + offsetY);
            ctx.rotate(rotation);
            ctx.scale(scale, scale);
            ctx.globalAlpha = alpha;
            ctx.drawImage(el, -offsetX, -offsetY);
            ctx.restore();
        } else {
            ctx.drawImage(el, x, y);
        }
        return this;
    }

    text(str, x, y) {
        this.ctx.fillText(str, x, y);
        return this;
    }

    setFontStyle(family, size) {
        this.ctx.font = `${size}px ${family}`;
    }

    getImageData(x = 0, y = 0, width, height) {
        const {ctx, canvas} = this;
        return ctx.getImageData(x, y, width || canvas.width, height || canvas.height);
    }

    getPixel(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        const {data} = this.ctx.getImageData(x, y, 1, 1);
        return Array.prototype.slice.call(data);
    }

    setPixel(x, y, r, g, b, a) {
        x = Math.floor(x);
        y = Math.floor(y);
        const {width, data} = this.getImageData();
        const i = (x + y * width) * 4;
        data[i + 0] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = a;
        return this;
    }

    clearCircle(x, y, radius = 20) {
        const {ctx} = this;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        this.circle(x, y, radius);
        ctx.globalCompositeOperation = 'source-over';
        ctx.restore();
        return this;
    }

    translateAnd(x, y, fn) {
        const {ctx} = this;
        ctx.save();
        ctx.translate(x, y);
        fn(ctx);
        ctx.restore();
        return this;
    }

    clear(r, g, b, a = 1) {
        const color = getColour(r, g, b, a);
        const {ctx} = this;
        const {width, height} = this.canvas;
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (color) {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, width, height);
        } else {
            ctx.clearRect(0, 0, width, height);
        }
        ctx.beginPath();
        ctx.restore();
        return this;
    }

    size(width = window.innerWidth, height = window.innerHeight) {
        this.canvas.width = width;
        this.canvas.height = height;
        return this;
    }

    destroy() {
        if (this.canvas.parentElement) {
            this.canvas.parentElement.removeChild(this.canvas);
        }
        this.canvas = null;
        this.ctx = null;
    }
}
