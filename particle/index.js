const {abs, atan2, cos, sin, sqrt} = Math;

export default class Particle {
    constructor(options) {
        this.opts = options;

        this._bounds = {};
        this._outerBounds = {};

        this._defaults = {
            alive: true,
            x: 0,
            y: 0,
            angle: 0,
            speed: 0,
            gravity: 0,
            mass: 1,
            radius: 0,
            bounce: {x: -1, y: -1},
            friction: 1,
            lifeTime: 0,
            bounds: {x: 0, y: 0, width: 1280, height: 720}
        };

        this._props = Object.keys(this._defaults);

        this.reset(options);
    }

    reset(options) {
        const defs = this._defaults;
        const props = this._props;
        const opts = options || defs;

        for (let i = 0; i < props.length; i++) {
            const key = props[i];
            const value = opts[key] || defs[key];
            this[key] = value;
            defs[key] = value;
        }

        const angle = opts.angle || defs.angle;
        const speed = opts.speed || defs.speed;

        this.vx = cos(angle) * speed;
        this.vy = sin(angle) * speed;

        return this;
    }

    update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        return this;
    }

    accellerate(speed, angle) {
        if (typeof angle === 'undefined') {
            angle = this.angle;
        }
        this.vx += cos(angle) * speed;
        this.vy += sin(angle) * speed;
        return this;
    }

    get speed() {
        if (this.vx === 0 && this.vy === 0) {
            return 0;
        }
        return sqrt(this.vx * this.vx + this.vy * this.vy);
    }

    set speed(value) {
        const angle = this.angle;
        this.vx = cos(angle) * value;
        this.vy = sin(angle) * value;
    }

    get angle() {
        if (this.vx === 0 && this.vy === 0) {
            return 0;
        }
        return atan2(this.vy, this.vx);
    }

    set angle(value) {
        const speed = this.speed;
        this.vx = cos(value) * speed;
        this.vy = sin(value) * speed;
    }

    setBounds(x, y, width, height) {
        this._bounds.x = x || 0;
        this._bounds.y = y || 0;
        this._bounds.width = width;
        this._bounds.height = height;
    }

    get bounds() {
        return this._bounds;
    }

    set bounds(ob) {
        const {x, y, width, height} = ob;
        this.setBounds(x, y, width, height);
    }

    get left() {
        return this.x - this.radius;
    }

    get right() {
        return this.x + this.radius;
    }

    get top() {
        return this.y - this.radius;
    }

    get bottom() {
        return this.y + this.radius;
    }

    get outerBounds() {
        this._outerBounds.left = this._bounds.x - this.radius;
        this._outerBounds.right = this._bounds.x + this._bounds.width + this.radius;
        this._outerBounds.top = this._bounds.y - this.radius;
        this._outerBounds.bottom = this._bounds.y + this._bounds.height + this.radius;
        return this._outerBounds;
    }

    angleTo(p) {
        return atan2(p.y - this.y, p.x - this.x);
    }

    distanceTo(p) {
        const dx = p.x - this.x;
        const dy = p.y - this.y;
        return sqrt(dx * dx + dy * dy);
    }

    gravitateTo(p) {
        const dx = p.x - this.x;
        const dy = p.y - this.y;
        const distSq = dx * dx + dy * dy;
        const dist = sqrt(distSq);
        const force = p.mass / distSq;
        const ax = dx / dist * force;
        const ay = dy / dist * force;
        this.vx += ax;
        this.vy += ay;

        return this;
    }

    springTo(p, stiffness, length) {
        const dx = p.x - this.x;
        const dy = p.y - this.y;
        const distance = sqrt(dx * dx + dy * dy);
        const force = (distance - (length || 0)) * (stiffness || 0.2);

        if (abs(distance * force) > 0) {
            this.vx += dx / distance * force;
            this.vy += dy / distance * force;
        }

        return this;
    }

    collides(p) {
        return this.distanceTo(p) <= this.radius + p.radius;
    }

    edgeCollide() {
        const left = this._bounds.x + this.radius;
        const right = this._bounds.x + this._bounds.width - this.radius;
        const top = this._bounds.y + this.radius;
        const bottom = this._bounds.y + this._bounds.height - this.radius;

        if (this.x < left) {
            this.x = left;
            this.vx = this.vx * this.bounce.x;
        }

        if (this.x > right) {
            this.x = right;
            this.vx = this.vx * this.bounce.x;
        }

        if (this.y < top) {
            this.y = top;
            this.vy = this.vy * this.bounce.y;
        }

        if (this.y > bottom) {
            this.y = bottom;
            this.vy = this.vy * this.bounce.y;
        }
    }

    edgeWrap() {
        const {left, right, top, bottom} = this.outerBounds;

        if (this.x < left) {
            this.x = right;
        }

        if (this.x > right) {
            this.x = left;
        }

        if (this.y < top) {
            this.y = bottom;
        }

        if (this.y > bottom) {
            this.y = top;
        }
    }

    edgeKill() {
        const {left, right, top, bottom} = this.outerBounds;

        if (this.x < left || this.x > right || this.y < top || this.y > bottom) {
            this.alive = false;
        }
    }

    edgeReset() {
        const {left, right, top, bottom} = this.outerBounds;

        if (this.x < left || this.x > right || this.y < top || this.y > bottom) {
            this.reset();
        }
    }

    lifeKill() {
        this.lifeTime--;

        if (this.lifeTime <= 0) {
            this.alive = false;
        }
    }
}
