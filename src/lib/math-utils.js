'use strict';

var DEG = 180 / Math.PI;
var RAD = Math.PI / 180;

var MathUtils = {
    angle: function(x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        return Math.atan2(dy, dx);
    },
    clamp: function(value, min, max) {
        if(min > max) {
            var a = min;
            min = max;
            max = a;
        }
        if(value < min) {
            return min;
        }
        if(value > max) {
            return max;
        }
        return value;
    },
    coinToss: function() {
        return Math.random() > 0.5;
    },
    crossProduct: function(aX, aY, bX, bY) {
        /*
        The sign tells us if a is to the left (-) or the right (+) of b
        */
        return aX * bY - aY * bX;
    },
    degrees: function(radians) {
        return radians * DEG;
    },
    difference: function(a, b) {
        return Math.abs(a - b);
    },
    distance: function(x1, y1, x2, y2) {
        var sq = MathUtils.distanceSQ(x1, y1, x2, y2);
        return Math.sqrt(sq);
    },
    distanceSQ: function(x1, y1, x2, y2) {
        var dx = x1 - x2;
        var dy = y1 - y2;
        return dx * dx + dy * dy;
    },
    dotProduct: function(aX, aY, bX, bY) {
        /*
        - If A and B are perpendicular (at 90 degrees to each other), the result
          of the dot product will be zero, because cos(Θ) will be zero.
        - If the angle between A and B are less than 90 degrees, the dot product
          will be positive (greater than zero), as cos(Θ) will be positive, and
          the vector lengths are always positive values.
        - If the angle between A and B are greater than 90 degrees, the dot
          product will be negative (less than zero), as cos(Θ) will be negative,
          and the vector lengths are always positive values
        */
        return aX * bX + aY * bY;
    },
    getCirclePoints: function(originX, originY, radius, count, start, Class) {
        start = start === undefined ? -Math.PI/2 : start;
        var points = [],
            circ = Math.PI * 2,
            incr = circ / count,
            ob;
        for (var i = start; i < circ + start; i += incr) {
            ob = Class === undefined ? {} : new Class();
            ob.x = originX + radius * Math.cos(i);
            ob.y = originY + radius * Math.sin(i);
            points.push(ob);
        }
        return points;
    },
    getIntersectionArea: function(aX, aY, aW, aH, bX, bY, bW, bH) {
        var overlapX = Math.max(0, Math.min(aX + aW, bX + bW) - Math.max(aX, bX));
        var overlapY = Math.max(0, Math.min(aY + aH, bY + bH) - Math.max(aY, bY));
        return overlapX * overlapY;
    },
    getOverlapX: function(aX, aW, bX, bW) {
        return Math.max(0, Math.min(aX + aW, bX + bW) - Math.max(aX, bX));
    },
    getOverlapY: function(aY, aH, bY, bH) {
        return Math.max(0, Math.min(aY + aH, bY + bH) - Math.max(aY, bY));
    },
    lerp: function(from, to, percent) {
        return from + ( to - from ) * percent;
    },
    map: function(v, a, b, x, y) {
        // value, min expected, max expected, map min, map max
        // e.g. map some value between 0 to 100 to -50 to 50
        // map(50, 0, 100, -50, 50) // 0
        // map(25, 0, 100, -50, 50) // -25
        return (v === a) ? x : (v - a) * (y - x) / (b - a) + x;
    },
    radians: function(degrees) {
        return degrees * RAD;
    },
    random: function(min, max) {
        if ( isNaN(max) ) {
            max = min;
            min = 0;
        }
        return min + Math.random() * (max - min);
    },
    rotateToDEG: function(start, end) {
        var diff = (end - start) % 360;
        if (diff !== diff % 180) {
            diff = (diff < 0) ? diff + 360 : diff - 360;
        }
        return start + diff;
    },
    rotateToRAD: function(start, end) {
        var PI2 = Math.PI * 2;
        var diff = (end - start) % PI2;
        console.log('diff:',diff);
        if (diff !== diff % Math.PI) {
            diff = diff < 0 ? diff + PI2 : diff - PI2;
        }
        return start + diff;
    },
    roundToNearest: function(value, unit) {
        return Math.round(value / unit) * unit;
    }
};

if (typeof module === 'object' && module.exports) {
    module.exports = MathUtils;
}
