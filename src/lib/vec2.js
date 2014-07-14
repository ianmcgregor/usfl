'use strict';

function Vec2(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Vec2.prototype = {
    add: function(vec, overwrite) {
        if(overwrite) {
            this.x = this.x + vec.x;
            this.y = this.y + vec.y;
            return this;
        }
        return Vec2.get(this.x + vec.x, this.y + vec.y);
    },
    subtract: function(vec, overwrite) {
        if(overwrite) {
            this.x = this.x - vec.x;
            this.y = this.y - vec.y;
            return this;
        }
        return Vec2.get(this.x - vec.x, this.y - vec.y);
    },
    multiply: function(vec, overwrite) {
        if(overwrite) {
            this.x = this.x * vec.x;
            this.y = this.y * vec.y;
            return this;
        }
        return Vec2.get(this.x * vec.x, this.y * vec.y);
    },
    divide: function(vec, overwrite) {
        if(overwrite) {
            this.x = this.x / vec.x;
            this.y = this.y / vec.y;
            return this;
        }
        return Vec2.get(this.x / vec.x, this.y / vec.y);
    },
    normalize: function() {
        var l = this.length;
        if(l === 0) {
            this.x = 1;
            return this;
        }
        this.x /= l;
        this.y /= l;
        return this;
    },
    isNormalized: function() {
        return this.length === 1;
    },
    truncate:  function(max) {
        if(this.length > max) {
            this.length = max;
        }
        return this;
    },
    scaleBy: function(mul) {
        this.x *= mul;
        this.y *= mul;
        return this;
    },
    divideBy: function(div) {
        this.x /= div;
        this.y /= div;
        return this;
    },
    equals: function(vec) {
        return this.x === vec.x &&
            this.y === vec.y;
    },
    negate: function() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    },
    reverse: function() {
        this.negate();
        return this;
    },
    dotProduct: function(vec) {
        /*
        If A and B are perpendicular (at 90 degrees to each other), the result of the dot product will be zero, because cos(Θ) will be zero.
        If the angle between A and B are less than 90 degrees, the dot product will be positive (greater than zero), as cos(Θ) will be positive, and the vector lengths are always positive values.
        If the angle between A and B are greater than 90 degrees, the dot product will be negative (less than zero), as cos(Θ) will be negative, and the vector lengths are always positive values
        */
        return this.x * vec.x + this.y * vec.y;
    },
    crossProduct: function(vec) {
        /*
        The sign tells us if vec to the left (-) or the right (+) of this vec
        */
        return this.x * vec.y - this.y * vec.x;
    },
    distanceSquared: function(vec) {
        var dx = vec.x - this.x;
        var dy = vec.y - this.y;
        return dx * dx + dy * dy;
    },
    distance: function(vec) {
        return Math.sqrt(this.distanceSquared(vec));
    },
    clone: function() {
        return Vec2.get(this.x, this.y);
    },
    zero: function() {
        this.x = 0;
        this.y = 0;
        return this;
    },
    isZero: function() {
        return this.x === 0 && this.y === 0;
    },
    reset: function() {
        return this.zero();
    },
    perpendicular: function() {
        return Vec2.get(-this.y, this.x);
    },
    sign: function(vec) {
        // Determines if a given vector is to the right or left of this vector.
        // If to the left, returns -1. If to the right, +1.
        var p = this.perpendicular();
        var s = p.dotProduct(vec) < 0 ? -1 : 1;
        p.dispose();
        return s;
    },
    set: function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        return this;
    },
    dispose: function() {
        Vec2.pool.push(this.zero());
    }
};

// static
Vec2.pool = [];
Vec2.get = function(x, y) {
    var v = Vec2.pool.length > 0 ? Vec2.pool.pop() : new Vec2();
    v.set(x, y);
    return v;
};

Vec2.angleBetween = function(a, b) {
    if(!a.isNormalized()) { a = a.clone().normalize(); }
    if(!b.isNormalized()) { b = b.clone().normalize(); }
    return Math.acos(a.dotProduct(b));
};

// getters / setters
Object.defineProperty(Vec2.prototype, 'lengthSquared', {
    get: function() {
        return this.x * this.x + this.y * this.y;
    }
});

Object.defineProperty(Vec2.prototype, 'length', {
    get: function() {
        return Math.sqrt(this.lengthSquared);
    },
    set: function(value) {
        var a = this.angle;
        this.x = Math.cos(a) * value;
        this.y = Math.sin(a) * value;
    }
});

Object.defineProperty(Vec2.prototype, 'angle', {
    get: function() {
        return Math.atan2(this.y, this.x);
    },
    set: function(value) {
        var l = this.length;
        this.x = Math.cos(value) * l;
        this.y = Math.sin(value) * l;
    }
});

if (typeof module === 'object' && module.exports) {
    module.exports = Vec2;
}
