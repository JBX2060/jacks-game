var player = {
    x: 4,
    y: 4,
    dx: 0,
    dy: 0,
    player: true,
    hp: 100,
    mhp: 100
};

var playerSpawn = {
    x: 4,
    y: 4,
    dx: 0,
    dy: 0,
    player: true,
    hp: 100,
    mhp: 100,
    l: 0
};










var l = 0;

function loop() {
    lines3 = lines2.concat();
    lines3.push(new Segment(player.x - 0.5, player.y - 0.5, player.x + 0.5, player.y - 0.5, player));
    lines3.push(new Segment(player.x + 0.5, player.y - 0.5, player.x + 0.5, player.y + 0.5, player));
    lines3.push(new Segment(player.x - 0.5, player.y - 0.5, player.x - 0.5, player.y + 0.5, player));
    lines3.push(new Segment(player.x - 0.5, player.y + 0.5, player.x + 0.5, player.y + 0.5, player));
    l++;
    collide(undefined, player, 1, 1);
    player.dx *= 0.9;
    if (k["d"]) {
        player.dx += 0.03;
    }
    if (k["a"]) {
        player.dx -= 0.03;
    }
    player.dy += 0.02;

    exits.forEach(function (e) {
        if (~~player.x == e.x && ~~player.y == e.y && kd["s"]) {
            player.x = e.destx;
            player.y = e.desty;
            icons = [];
            levels[e.i].start();
        }
    });

    if (m.m[0]) {
        o.push(new Ray(player.x, player.y - 5 / 32, Math.atan2(m.y - 540, m.x - 960), 270));
    }



    for (var i = 0; o.length > i; i++) {
        o[i].update();
    }
    
    for (var i = 0; icons.length > i; i++) {
        if (icons[i].kill) {
            icons.splice(i, 1);
        }
    }

    for (var i = 0; o.length > i; i++) {
        if (o[i].kill) {
            o.splice(i, 1);
            i--;
        }
    }

    if (player.hp < 0) {
        player = JSON.parse(JSON.stringify(playerSpawn));
        levels[playerSpawn.l].start();
    }

    kd = {};
    draw();
    requestAnimationFrame(loop);
}

function draw() {
    var pangle = Math.atan2(m.y - 540, m.x - 960);
    ctx.imageSmoothingEnabled = false;
    allCanvas(() => {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.save();
    });
    icons.forEach(function (e) {
        e.update();
    });
    bothCanvas(() => {
        ctx.scale(16, 16);
    });
    ctx.fillStyle = "#222222";
    ctx.fillRect(0, 0, 24, 13.5);
    ctx.fillStyle = "Black";
    context2.fillRect(0, 0, c.width / 16, c.height / 16);
    bothCanvas(() => {
        ctx.translate(-r16(player.x) + 12, -r16(player.y) + 6.75);
    });
    ctx = context;
    o.forEach(function (e) {
        e.render();
    });

    exits.forEach(function (e) {
        ctx.drawImage(imgs[2], e.x, e.y - 2, 1, 3);
    });

    ctx.drawImage(imgs[0], r16(player.x) - 0.5, r16(player.y) - 0.5 + 0.0625, 1, 1);
    ctx.save();
    ctx.translate(r16(player.x), r16(player.y) - 2 * 0.0625);
    ctx.rotate(pangle);
    ctx.drawImage(imgs[1], -0.125 * 1.5, -0.125 * 1.5, 0.25 * 1.5, 0.25 * 1.5);
    ctx.restore();
    healthbar(player);
    var shadows = shadowcast(lines2);

    ctx = context2;
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    shadows.forEach(function (e) {
        if (e) {
            ctx.lineTo(e.x, e.y);
        }
    });
    ctx.globalCompositeOperation = "destination-out";
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#00000055";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (var i = 0; 2 > i; i++) {
        ctx.lineWidth = i * 1.5 + 1.5;
        ctx.stroke();
    }
    o.forEach(function (e) {
        e.shadow();
    });
    ctx.globalCompositeOperation = "normal";
    var grd = ctx.createRadialGradient(r16(player.x), r16(player.y), 2, r16(player.x), r16(player.y), 13);
    grd.addColorStop(0, "#00000000");
    grd.addColorStop(1, "#000000FF");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(r16(player.x), r16(player.y), 50, pangle - Math.PI / 9, pangle + Math.PI / 9, true);
    ctx.lineTo(r16(player.x), r16(player.y));
    ctx.closePath();
    ctx.fill();
    ctx = context;
    ctx.save();
    ctx.scale(0.0625, 0.0625)
    ctx.drawImage(mapimage, 0, 0);
    ctx.restore();
    bothCanvas(() => {
        ctx.restore();
    });
}