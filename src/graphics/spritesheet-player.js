import loop from '../loop';

export default class SpritesheetPlayer {
    constructor({
        canvas = (typeof document !== 'undefined' && document.createElement('canvas')),
        data = null,
        image,
        fps = 12,
        trim = true
    } = {}) {
        this.canvas = canvas;
        this.data = data;
        this.image = image;
        this.trim = trim;
        this.interval = 1000 / fps;
        this.last = 0;
        this.currentFrame = 0;
        this.playing = false;

        this.update = this.update.bind(this);

        if (data) {
            this.init(data);
        }
    }

    play() {
        loop.add(this.update);
        loop.start();
        this.playing = true;
    }

    pause() {
        loop.remove(this.looper);
        // loop.stop();
        this.playing = false;
    }

    init(data) {
        const rawFrames = Array.isArray(data.frames) ? data.frames : Object.keys(data.frames).map(i => data.frames[i]);
        const trimX = this.trim ? Math.min(...rawFrames.map(f => f.spriteSourceSize.x)) : 0;
        const trimY = this.trim ? Math.min(...rawFrames.map(f => f.spriteSourceSize.y)) : 0;
        const frames = rawFrames.map(f => Object.assign({}, f.frame, {
            tx: f.spriteSourceSize.x - trimX,
            ty: f.spriteSourceSize.y - trimY
        }));

        let w = 0;
        let h = 0;

        if (this.trim) {
            w = Math.max(...frames.map(f => f.tx + f.w));
            h = Math.max(...frames.map(f => f.ty + f.h));
        } else {
            w = Math.max(...rawFrames.map(f => f.sourceSize.w));
            h = Math.max(...rawFrames.map(f => f.sourceSize.h));
        }

        this.frames = frames;
        this.canvas.width = w;
        this.canvas.height = h;
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

    update() {
        const now = Date.now();
        if (now - this.last < this.interval) {
            return;
        }
        this.last = now;

        if (!this.img) {
            return;
        }

        let currentFrame = this.currentFrame + 1;
        if (currentFrame === this.frames.length) {
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
            frame.tx,
            frame.ty,
            frame.w,
            frame.h
        );
    }
}
