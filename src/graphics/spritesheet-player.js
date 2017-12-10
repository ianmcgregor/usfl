import looper from '../loop';

const dpr = Math.min(2, typeof window !== 'undefined' && (window.devicePixelRatio || 1));

export default class SpritesheetPlayer {
    constructor({
        canvas = (typeof document !== 'undefined' && document.createElement('canvas')),
        data = null,
        image,
        fps = 12,
        trim = true,
        delay = 0,
        repeatDelay = 0,
        scale = 1,
        loop = true
    } = {}) {
        this.canvas = canvas;
        this.data = data;
        this.image = image;
        this.trim = trim;
        this.interval = 1000 / fps;
        this.last = 0;
        this.currentFrame = 0;
        this.playing = false;
        this.delay = delay;
        this.loop = loop;
        this.repeatDelay = repeatDelay;
        this.remainingDelay = delay;
        this.scale = scale * dpr;

        this.update = this.update.bind(this);

        if (data) {
            this.init(data);
        }
    }

    play() {
        if (this.playing) {
            return;
        }
        this.remainingDelay = this.delay;
        this.elapsed = 0;
        looper.add(this.update);
        looper.start();
        this.playing = true;
    }

    pause() {
        looper.remove(this.looper);
        // loop.stop();
        this.playing = false;
    }

    reset() {
        this.currentFrame = 0;
        this.remainingDelay = this.delay;
        this.elapsed = 0;
        this.pause();
        this.draw(0);
    }

    updateDimensions() {
        this.canvas.width = this.w * this.scale;
        this.canvas.height = this.h * this.scale;
        this.canvas.style.width = `${this.w * this.scale / dpr}px`;
        this.canvas.style.height = `${this.h * this.scale / dpr}px`;
    }

    setScale(value) {
        this.scale = value * dpr;
        this.updateDimensions();
        this.reset();
    }

    init(data) {
        const rawFrames = Array.isArray(data.frames) ? data.frames : Object.keys(data.frames).map(i => data.frames[i]);
        const trimX = this.trim ? Math.min(...rawFrames.map(f => f.spriteSourceSize.x)) : 0;
        const trimY = this.trim ? Math.min(...rawFrames.map(f => f.spriteSourceSize.y)) : 0;
        const frames = rawFrames.map(f => Object.assign({}, f.frame, {
            tx: f.spriteSourceSize.x - trimX,
            ty: f.spriteSourceSize.y - trimY
        }));

        if (this.trim) {
            this.w = Math.max(...frames.map(f => f.tx + f.w));
            this.h = Math.max(...frames.map(f => f.ty + f.h));
        } else {
            this.w = Math.max(...rawFrames.map(f => f.sourceSize.w));
            this.h = Math.max(...rawFrames.map(f => f.sourceSize.h));
        }

        this.frames = frames;
        this.updateDimensions();
        this.ctx = this.canvas.getContext('2d');

        if (typeof this.image === 'string') {
            const img = new Image();
            img.onload = () => this.setImg(img);
            img.src = this.image;
        } else {
            this.setImg(this.image);
        }
    }

    setImg(img) {
        this.img = img;
        this.draw(0);
    }

    update(df, dt) {
        this.elapsed += dt;
        if (this.elapsed < this.interval) {
            return;
        }
        this.elapsed = 0;

        if (this.remainingDelay > 0) {
            this.remainingDelay -= this.interval;
            return;
        }

        if (!this.img) {
            return;
        }

        let currentFrame = this.currentFrame + 1;

        if (currentFrame === this.frames.length) {
            if (!this.loop) {
                return;
            }
            this.remainingDelay = this.repeatDelay;
            currentFrame = 0;
        }

        this.draw(currentFrame);

        this.currentFrame = currentFrame;
    }

    draw(currentFrame) {
        // this.ctx.fillStyle = 'red';
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const frame = this.frames[currentFrame];

        this.ctx.drawImage(
            this.img,
            frame.x,
            frame.y,
            frame.w,
            frame.h,
            frame.tx * this.scale,
            frame.ty * this.scale,
            frame.w * this.scale,
            frame.h * this.scale
        );
    }
}
