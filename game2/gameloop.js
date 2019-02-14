var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function r16(n) {
    return ~~(n * 16) / 16;
}

ctx.lineWidth = 1 / 8;

var player = {
    x: 4,
    y: 4,
    dx: 0,
    dy: 0
};

function loop() {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.save();
    ctx.scale(16, 16);
    ctx.fillStyle = "#222222";
    ctx.fillRect(0, 0, 24, 13.5);
    ctx.fillStyle = "Black";
    ctx.translate(-r16(player.x) + 12, -r16(player.y) + 6.75);
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
    player.dy += 0.02;
    ctx.fillRect(r16(player.x) - 0.5625, r16(player.y) - 0.5625, 1.125, 1.125);
    var shadows = shadowcast(lines2);
    ctx.beginPath();
    shadows.forEach(function (e) {
        ctx.lineTo(e.x, e.y);
    });
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    requestAnimationFrame(loop);
}
