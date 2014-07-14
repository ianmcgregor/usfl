'use strict';

var Vec2 = require('./vec2.js');

function Boid()
{
    this._position = Vec2.get();
    this._velocity = Vec2.get();    
    this._steeringForce = Vec2.get();
    this._bounds = {x:0, y:0, width:640, height:480};
    this._edgeBehavior = Boid.EDGE_BOUNCE;
    this._mass = 1.0;
    this._maxSpeed = 10;
    this._maxForce = 1;
    // arrive
    this._arrivalThreshold = 50;
    // wander
    this._wanderDistance = 10;
    this._wanderRadius = 5;
    this._wanderAngle = 0;
    this._wanderRange = 1;
    // avoid
    this._avoidDistance = 300;
    this._avoidBuffer = 20;
    // follow path
    this._pathIndex = 0;
    this._pathThreshold = 20;
    // flock
    this._inSightDistance = 300;
    this._tooCloseDistance = 60;
}

// edge behaviors

Boid.EDGE_WRAP = 'wrap';
Boid.EDGE_BOUNCE = 'bounce';

Boid.prototype.setBounds = function(width, height, x, y) {
    this._bounds.width = width;
    this._bounds.height = height;
    this._bounds.x = x || 0;
    this._bounds.y = y || 0;
};

Boid.prototype.update = function() {
    // steer
    this._steeringForce.truncate(this._maxForce);
    //this._steeringForce = this._steeringForce.divide(this._mass, true);
    this._steeringForce.divideBy(this._mass);
    this._velocity = this._velocity.add(this._steeringForce, true);
    this._steeringForce.reset();
    // make sure velocity stays within max speed.
    this._velocity.truncate(this._maxSpeed);
    // add velocity to position
    this._position = this._position.add(this._velocity, true);
    // handle any edge behavior
    if(this._edgeBehavior === Boid.EDGE_WRAP) {
        this.wrap();
    }
    else if(this._edgeBehavior === Boid.EDGE_BOUNCE) {
        this.bounce();
    }
};

// Causes boid to bounce off edge if edge is hit
Boid.prototype.bounce = function() {
    if(this._position.x > this._bounds.width) {
        this._position.x = this._bounds.width;
        this._velocity.x *= -1;
    }
    else if(this._position.x < this._bounds.x) {
        this._position.x = this._bounds.x;
        this._velocity.x *= -1;
    }
    if(this._position.y > this._bounds.height) {
        this._position.y = this._bounds.height;
        this._velocity.y *= -1;
    }
    else if(this._position.y < this._bounds.y) {
        this._position.y = this._bounds.y;
        this._velocity.y *= -1;
    }
};

// Causes boid to wrap around to opposite edge if edge is hit
Boid.prototype.wrap = function() {
    if(this._position.x > this._bounds.width) {
        this._position.x = this._bounds.x;
    }
    else if(this._position.x < this._bounds.x) {
        this._position.x = this._bounds.width;
    }
    if(this._position.y > this._bounds.height) {
        this._position.y = this._bounds.y;
    }
    else if(this._position.y < this._bounds.y) {
        this._position.y = this._bounds.height;
    }
};

Boid.prototype.seek = function(targetVec) {
    var desiredVelocity = targetVec.subtract(this._position);
    desiredVelocity.normalize();
    desiredVelocity.scaleBy(this._maxSpeed);
    //desiredVelocity = desiredVelocity.multiply(this._maxSpeed, true);
    var force = desiredVelocity.subtract(this._velocity, true);
    this._steeringForce = this._steeringForce.add(force, true);

    force.dispose();
};

Boid.prototype.flee = function(targetVec) {
    var desiredVelocity = targetVec.subtract(this._position);
    desiredVelocity.normalize();
    desiredVelocity.scaleBy(this._maxSpeed);
    //desiredVelocity = desiredVelocity.multiply(this._maxSpeed, true);
    var force = desiredVelocity.subtract(this._velocity, true);
    // only this line different from seek:
    this._steeringForce = this._steeringForce.subtract(force, true);

    force.dispose();
};

// seek until withing arrivalThreshold
Boid.prototype.arrive = function(targetVec) {
    var desiredVelocity = targetVec.subtract(this._position);
    desiredVelocity.normalize();

    var distance = this._position.distance(targetVec);
    if(distance > this._arrivalThreshold) {
        desiredVelocity.scaleBy(this._maxSpeed);
        //desiredVelocity = desiredVelocity.multiply(this._maxSpeed, true);
    }
    else {
        var mul = this._maxSpeed * distance / this._arrivalThreshold;
        desiredVelocity.scaleBy(mul);
        //desiredVelocity = desiredVelocity.multiply(mul, true);
    }
    var force = desiredVelocity.subtract(this._velocity, true);
    this._steeringForce = this._steeringForce.add(force, true);

    force.dispose();
};

// look at velocity of boid and try to predict where it's going
Boid.prototype.pursue = function(targetBoid) {
    var lookAheadTime = this._position.distance(targetBoid._position) / this._maxSpeed;
    // e.g. of where new vec should be returned:
    var scaledVelocity = targetBoid._velocity.clone().scaleBy(lookAheadTime);
    var predictedTarget = targetBoid._position.add(scaledVelocity);
    //var predictedTarget = targetBoid._position.add(targetBoid._velocity.multiply(lookAheadTime));
    this.seek(predictedTarget);

    scaledVelocity.dispose();
    predictedTarget.dispose();
};

// look at velocity of boid and try to predict where it's going
Boid.prototype.evade = function(targetBoid) {
    var lookAheadTime = this._position.distance(targetBoid._position) / this._maxSpeed;
    // e.g. of where new vec should be returned:
    var scaledVelocity = targetBoid._velocity.clone().scaleBy(lookAheadTime);
    var predictedTarget = targetBoid._position.add(scaledVelocity);
    //var predictedTarget = targetBoid._position.add(targetBoid._velocity.multiply(lookAheadTime));
    // only this line diff from pursue:
    this.flee(predictedTarget);

    predictedTarget.dispose();
};

// wander around, changing angle by a limited amount each tick
Boid.prototype.wander = function() {
    var center = this._velocity.clone().normalize().scaleBy(this._wanderDistance);
    //var center = this._velocity.clone().normalize().multiply(this._wanderDistance, true);
    var offset = Vec2.get();
    offset.length = this._wanderRadius;
    offset.angle = this._wanderAngle;
    this._wanderAngle += Math.random() * this._wanderRange - this._wanderRange * 0.5;
    var force = center.add(offset, true);
    this._steeringForce = this._steeringForce.add(force, true);

    offset.dispose();
    force.dispose();
};

// gets a bit rough used in combination with seeking as the vehicle attempts 
// to seek straight through an object while simultaneously trying to avoid it
Boid.prototype.avoid = function(circles) {
    var l = circles.length;
    for (var i = 0; i < l; i++) {
        var circle = circles[i];
        var heading = this._velocity.clone().normalize();

        // vec between circle and boid
        var difference = circle.position.subtract(this._position);
        var dotProd = difference.dotProduct(heading);

        // if circle in front of boid
        if(dotProd > 0) {
            // vec to represent 'feeler' arm
            //var feeler = heading.multiply(this._avoidDistance);
            var feeler = heading.clone().scaleBy(this._avoidDistance);
            // project differebce onto feeler
            //var projection = heading.multiply(dotProd);
            var projection = heading.clone().scaleBy(dotProd);
            // distance from circle to feeler
            var vecDistance = projection.subtract(difference);
            var distance = vecDistance.length;
            // if feeler intersects circle (plus buffer), and projection
            // less than feeler length, will collide
            if(distance < circle.radius + this._avoidBuffer && projection.length < feeler.length) {
                // calc a force +/- 90 deg from vec to circ
                //var force = heading.multiply(this._maxSpeed);
                var force = heading.clone().scaleBy(this._maxSpeed);
                force.angle += difference.sign(this._velocity) * Math.PI / 2;
                // scale force by distance (further = smaller force)
                //force = force.multiply(1 - projection.length / feeler.length, true);
                force.scaleBy(1 - projection.length / feeler.length);
                // add to steering force
                this._steeringForce = this._steeringForce.add(force, true);
                // braking force - slows boid down so it has time to turn (closer = harder)
                //this._velocity = this._velocity.multiply(projection.length / feeler.length, true);
                this._velocity.scaleBy(projection.length / feeler.length);

                force.dispose();
            }
            feeler.dispose();
            projection.dispose();
            vecDistance.dispose();
        }
        heading.dispose();
        difference.dispose();
    }
};

// for defining obstacles or areas to avoid
Boid.Circle = function(radius, x, y) {
    console.log(radius, x, y);
    this.radius = radius;
    this.position = Vec2.get(x, y);
};

// follow a path made up of an array or vectors
Boid.prototype.followPath = function(path, loop) {
    loop = loop === undefined ? false : loop;
    var wayPoint = path[this._pathIndex];
    //console.log(wayPoint);
    if(!wayPoint) { return; }
    if(this._position.distance(wayPoint) < this._pathThreshold) {
        if(this._pathIndex >= path.length-1) {
            if(loop) { this._pathIndex = 0; }   
        }
        else {
            this._pathIndex++;
        }
    }
    if(this._pathIndex >= path.length-1 && !loop) {
        this.arrive(wayPoint);
    }
    else {
        this.seek(wayPoint);
    }
};

// flock - group of boids loosely move together
Boid.prototype.flock = function(boids) {
    var averageVelocity = this._velocity.clone();
    var averagePosition = Vec2.get();
    var inSightCount = 0;
    var l = boids.length;
    for (var i = 0; i < l; i++) {
        var boid = boids[i];
        if(boid !== this && this._inSight(boid)) {
            averageVelocity = averageVelocity.add(boid._velocity, true);
            averagePosition = averagePosition.add(boid._position, true);
            if(this._tooClose(boid)) {
                this.flee(boid._position);
            }
            inSightCount++;
        }
    }
    if(inSightCount > 0) {
        //averageVelocity = averageVelocity.divide(inSightCount, true);
        //averagePosition = averagePosition.divide(inSightCount, true);
        averageVelocity.divideBy(inSightCount);
        averagePosition.divideBy(inSightCount);
        this.seek(averagePosition);
        this._steeringForce.add(averageVelocity.subtract(this._velocity, true), true);
    }
    averageVelocity.dispose();
    averagePosition.dispose();
};

// is boid close enough to be in sight? for use with flock
Boid.prototype._inSight = function(boid) {
    if(this._position.distance(boid._position) > this._inSightDistance) {
        return false;
    }
    var heading = this._velocity.clone().normalize();
    var difference = boid._position.subtract(this._position);
    var dotProd = difference.dotProduct(heading);

    heading.dispose();
    difference.dispose();

    if(dotProd < 0) {
        return false;
    }
    return true;
};

// is boid too close? for use with flock
Boid.prototype._tooClose = function(boid) {
    return this._position.distance(boid._position) < this._tooCloseDistance;
};

// getters / setters
Object.defineProperty(Boid.prototype, 'position', {
    get: function() {
        return this._position;
    }
});

Object.defineProperty(Boid.prototype, 'velocity', {
    get: function() {
        return this._velocity;
    }
});

Object.defineProperty(Boid.prototype, 'edgeBehavior', {
    get: function() {
        return this.__edgeBehavior;
    },
    set: function(value) {
        this._edgeBehavior = value;
    }
});

if (typeof module === 'object' && module.exports) {
    module.exports = Boid;
}
