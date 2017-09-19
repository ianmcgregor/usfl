function triangle(ctx, x, y, width, height, angle = 0) {
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
}

function triangleABC(ctx, x1, y1, x2, y2, x3, y3) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

function cross(ctx, radius) {
    ctx.beginPath();
    ctx.moveTo(-radius, -radius);
    ctx.lineTo(radius, radius);
    ctx.moveTo(-radius, radius);
    ctx.lineTo(radius, -radius);
    ctx.stroke();
}

export default {
    triangle,
    triangleABC,
    cross
};
