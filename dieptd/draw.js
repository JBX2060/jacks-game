//draw diep.io barrel (x position, y position, width, height, angle, offset x, offset y, fill color, border color)
function diep_barrel(x, y, w, h, a, ox, oy, c1, c2) {

    //set values to their defaults if not provided
    if (a == undefined) {
        a = 0;
    }
    if (ox == undefined) {
        ox = 0;
        oy = 0;
    }
    if (c1 == undefined) {
        c1 = "#999999";
        c2 = "#727272";
    }

    //translate and rotate
    cc.save();
    cc.translate(x, y);
    cc.rotate(a);

    //set fill and stroke colors
    cc.fillStyle = c1;
    cc.strokeStyle = c2;

    //set line width and line join
    cc.lineWidth = 4;
    cc.lineJoin = "round";

    //actually draw the barrel
    cc.beginPath();
    cc.rect(oy, -w / 2 + ox, h, w);
    cc.fill();
    cc.stroke();

    //restore translation and rotation to normal
    cc.restore();
}

//draws diep.io circle (x position, y position, radius, fill color, stroke color)
function diep_circle(x, y, r, c1, c2) {

    //set fill and stroke colors
    cc.fillStyle = c1;
    cc.strokeStyle = c2;

    //set line width
    cc.lineWidth = 4;

    //draw circle
    cc.beginPath();
    cc.arc(x, y, r, 0, tau);
    cc.fill();
    cc.stroke();
}

function diep_healthbar(x, y, hp, max, l, c1) {

    //set line cap
    cc.lineCap = "round";

    //draw path of border
    cc.beginPath();
    cc.moveTo(x - l / 0.8, y + l + 15);
    cc.lineTo(x + l / 0.8, y + l + 15);

    //set border parameters
    cc.lineWidth = 8;
    cc.strokeStyle = "#555555";

    //draw border
    cc.stroke();

    //draw path of border
    cc.beginPath();
    cc.moveTo(x - l / 0.8, y + l + 15);
    cc.lineTo(x - l / 0.8 + l / 0.4 * (hp / max), y + l + 15);

    //set fill parameters
    cc.lineWidth = 4;
    if (c1 == undefined) {
        cc.strokeStyle = "#85E37D";
    } else {
        cc.strokeStyle = c1;
    }

    //draw fill
    cc.stroke();
}

//draws a polygon (x position, y position, radius, sides)
function poly(x, y, r, s, angle_offset) {
    if (!angle_offset) {
        angle_offset = 0;
    }
    cc.beginPath();
    for (var i = 0; s > i; i++) {
        var a = tau / s * i + angle_offset;
        cc.lineTo(Math.cos(a) * r + x, Math.sin(a) * r + y);
    }
    cc.closePath();
}

//draws hexagonal bases for tanks
function tank_base(x, y, r) {
    cc.fillStyle = "#555555";
    poly(x, y, r, 6);
    cc.fill();
}

//draws field of view
function fov(a) {
    ctx.beginPath();
    ctx.arc(a.x, a.y, a.fov, 0, tau);
    ctx.strokeStyle = "#00000011";
    ctx.stroke();
    ctx.fillStyle = "rgba(0, 0, 0, " + clamp(1000 / Math.pow(dist(a.x, a.y, m.x, m.y), 2), 0, 0.1) + ")";
    ctx.fill();
}