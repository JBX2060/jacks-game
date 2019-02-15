var c = document.getElementById("canvas");
var context = c.getContext("2d");
var c2 = document.getElementById("canvas2");
var context2 = c2.getContext("2d");

var ctx = context;

function r16(n) {
    return ~~(n * 16) / 16;
}
bothCanvas(() => {
    ctx.lineWidth = 1 / 8;
});

var player = {
    x: 4,
    y: 4,
    dx: 0,
    dy: 0
};

function loop() {
    ctx.imageSmoothingEnabled = false;
    bothCanvas(() => {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.save();
        ctx.scale(16, 16);
    });
    ctx.fillStyle = "#222222";
    ctx.fillRect(0, 0, 24, 13.5);
    ctx.fillStyle = "Black";
    context2.fillRect(0, 0, c.width / 16, c.height / 16);
    bothCanvas(() => {
        ctx.translate(-r16(player.x) + 12, -r16(player.y) + 6.75);
    });
    ctx.save();
    ctx.scale(0.0625, 0.0625)
    ctx.drawImage(mapimage, 0, 0);
    ctx.restore();

    var rects = [];
    for (var i = ~~player.y - 1; ~~player.y + 2 > i; i++) {
        for (var i2 = ~~player.x - 1; ~~player.x + 2 > i2; i2++) {
            if (squares[coord(i2, i, lvdims.x)] == 255) {
                rects.push(new Rect(i2, i, 1, 1));
            }
        }
    }
    collide(rects, player, 1, 1);
    player.dx *= 0.9;
    if (k["d"]) {
        player.dx += 0.05;
    }
    if (k["a"]) {
        player.dx -= 0.05;
    }
    var pangle = Math.atan2(m.y - 540, m.x - 960);
    player.dy += 0.02;
    ctx.drawImage(imgs[0], r16(player.x) - 0.5, r16(player.y) - 0.5 + 0.0625, 1, 1);
    ctx.save();
    ctx.translate(r16(player.x), r16(player.y) - 2 * 0.0625);
    ctx.rotate(pangle);
    ctx.drawImage(imgs[1], -0.125 * 1.5, -0.125 * 1.5, 0.25 * 1.5, 0.25 * 1.5);
    ctx.restore();
    var shadows = shadowcast(lines2);

    ctx = context2;
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    shadows.forEach(function (e) {
        ctx.lineTo(e.x, e.y);
    });
    ctx.globalCompositeOperation = "destination-out";
    ctx.closePath();
    ctx.fill();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#00000055";
    for (var i = 0; 2 > i; i++) {
        ctx.lineWidth = i * 1.5 + 1.5;
        ctx.stroke();
    }
    ctx.globalCompositeOperation = "normal";
    var grd = ctx.createRadialGradient(r16(player.x), r16(player.y), 2, r16(player.x), r16(player.y), 13);
    grd.addColorStop(0, "#00000000");
    grd.addColorStop(1, "#000000FF");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(r16(player.x), r16(player.y), 50, pangle - Math.PI / 9, pangle + Math.PI / 9, true);
    ctx.lineTo(r16(player.x), r16(player.y));
    ctx.fill();
    ctx = context;
    bothCanvas(() => {
        ctx.restore();
    });
    requestAnimationFrame(loop);
}
