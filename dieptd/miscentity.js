//create bullet
function Bullet(x, y, dx, dy, r, discrim, dmg, hp, c1, c2) {

    if (c1 == undefined) {
        if (discrim == "eb") {
            c1 = "#f04f54";
            c2 = "#b33b3f";
        } else if (discrim == "pb") {
            c1 = "#1db2df";
            c2 = "#1386a6";
        } else if (discrim == "powerb") {
            c1 = "#00e06c";
            c2 = "#00a851";
        }
    }

    //create "tank"
    var tank = new Game_Obj(x, y, function (a) {
        diep_circle(a.x, a.y, a.r, c1, c2);
    }, function (a) {
        if (a.discrim == "eb" || a.discrim == "powerb") {
            var closest = find_closest(a, o, "p");
        } else {
            var closest = find_closest(a, o, "e");
        }

        if (closest !== false) {
            var distance = dist_to_obj(a, o[closest]);
            if (distance < 30) {
                if (a.discrim != "powerb") {
                    o[closest].hp -= a.dmg;
                    a.hp -= a.dmg;
                } else if (a.intended_target === o[closest]) {
                    o[closest].power += a.dmg;
                    a.hp -= a.dmg;
                }
            }
        }

        if (a.t > 500) {
            a.hp = -1;
        }
    }, discrim);

    tank.r = r;
    tank.dx = dx;
    tank.dy = dy;
    tank.c1 = c1;
    tank.c2 = c2;
    tank.hp = hp;
    tank.dmg = dmg;
    tank.bullet = true;

    return tank;
}

//square polygon
function Square_Polygon(x, y) {

    var tank = new Game_Obj(x, y, function (a) {
        ctx.lineJoin = "round";
        ctx.fillStyle = "#ffe46b";
        ctx.strokeStyle = "#bfae4e";
        ctx.beginPath();
        poly(a.x, a.y, 25, 4, a.t / 100);
        ctx.fill();
        ctx.stroke();
    }, function (a) {
        a.t++;
    }, "s", 1000);

    tank.t = 0;

    return tank;
}