//basic tank
function Basic_Tank(x, y) {

    //create tank
    var tank = new Game_Obj(x, y, function (a) {

        //draw the tank
        diep_barrel(a.x, a.y, 16, 40, a.angle);
        diep_circle(a.x, a.y, 20, "#f04f54", "#b33b3f");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 20);
    }, function (a) {

        //movement
        simple_move_behavior(a, 1, "p", 200);

        //velocity falloff
        a.dx *= 0.8;
        a.dy *= 0.8;

        var closest = find_closest(a, o, "p");

        //produce bullets
        if (a.t % 30 == 0 && closest !== false && dist_to_obj(a, o[closest]) < 210) {
            o.push(Bullet(a.x, a.y, Math.cos(a.angle) * 15, Math.sin(a.angle) * 15, 8, "eb", 5, 15));
        }
    }, "e", 150);

    return tank;
}

//twin tank
function Twin_Tank(x, y) {

    //create tank
    var tank = new Game_Obj(x, y, function (a) {

        //draw the tank
        diep_barrel(a.x, a.y, 20, 40, a.angle, 14, 0);
        diep_barrel(a.x, a.y, 20, 40, a.angle, -14, 0);
        diep_circle(a.x, a.y, 25, "#f04f54", "#b33b3f");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 25);
    }, function (a) {

        //movement
        simple_move_behavior(a, 1, "p", 200);

        //velocity falloff
        a.dx *= 0.8;
        a.dy *= 0.8;

        var closest = find_closest(a, o, "p");

        //produce bullets
        if (closest !== false && dist_to_obj(a, o[closest]) < 210) {
            if (a.t % 30 == 0) {
                var off_p = offset_transform(a.x, a.y, 14, 0, a.angle);
                o.push(Bullet(off_p.x, off_p.y, Math.cos(a.angle) * 15, Math.sin(a.angle) * 15, 10, "eb", 5, 15));
            } else if (a.t % 30 == 15) {
                var off_p = offset_transform(a.x, a.y, -14, 0, a.angle);
                o.push(Bullet(off_p.x, off_p.y, Math.cos(a.angle) * 15, Math.sin(a.angle) * 15, 10, "eb", 5, 15));
            }
        }
    }, "e", 225);

    return tank;
}

//triple shot tank
function Triple_Shot_Tank(x, y) {

    //create tank
    var tank = new Game_Obj(x, y, function (a) {

        //draw the tank
        diep_barrel(a.x, a.y, 27, 60, a.angle);
        diep_barrel(a.x, a.y, 27, 60, a.angle + tau / 8);
        diep_barrel(a.x, a.y, 27, 60, a.angle - tau / 8);
        diep_circle(a.x, a.y, 30, "#f04f54", "#b33b3f");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 30);
    }, function (a) {

        //movement
        simple_move_behavior(a, 1, "p", 200);

        //velocity falloff
        a.dx *= 0.8;
        a.dy *= 0.8;

        var closest = find_closest(a, o, "p");

        //produce bullets
        if (a.t % 30 == 0 && closest !== false && dist_to_obj(a, o[closest]) < 210) {
            o.push(Bullet(a.x, a.y, Math.cos(a.angle) * 15, Math.sin(a.angle) * 15, 8, "eb", 5, 15));
            o.push(Bullet(a.x, a.y, Math.cos(a.angle + tau / 8) * 15, Math.sin(a.angle + tau / 8) * 15, 11, "eb", 5, 15));
            o.push(Bullet(a.x, a.y, Math.cos(a.angle - tau / 8) * 15, Math.sin(a.angle - tau / 8) * 15, 11, "eb", 5, 15));
        }
    }, "e", 300);

    return tank;
}

//triplet tank
function Triplet_Tank(x, y) {

    //create tank
    var tank = new Game_Obj(x, y, function (a) {

        //draw the tank
        diep_barrel(a.x, a.y, 27, 60, a.angle, 20, 0);
        diep_barrel(a.x, a.y, 27, 60, a.angle, -20, 0);
        diep_barrel(a.x, a.y, 27, 70, a.angle);
        diep_circle(a.x, a.y, 35, "#f04f54", "#b33b3f");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 35);
    }, function (a) {

        //movement
        simple_move_behavior(a, 1, "p", 200);

        //velocity falloff
        a.dx *= 0.8;
        a.dy *= 0.8;

        var closest = find_closest(a, o, "p");

        //produce bullets
        if (closest !== false && dist_to_obj(a, o[closest]) < 210) {
            if (a.t % 30 == 0) {
                var off_p = offset_transform(a.x, a.y, 20, 0, a.angle);
                o.push(Bullet(off_p.x, off_p.y, Math.cos(a.angle) * 15, Math.sin(a.angle) * 15, 12, "eb", 5, 15));
            } else if (a.t % 30 == 10) {
                var off_p = offset_transform(a.x, a.y, -20, 0, a.angle);
                o.push(Bullet(off_p.x, off_p.y, Math.cos(a.angle) * 15, Math.sin(a.angle) * 15, 12, "eb", 5, 15));
            } else if (a.t % 30 == 20) {
                o.push(Bullet(a.x, a.y, Math.cos(a.angle) * 15, Math.sin(a.angle) * 15, 12, "eb", 5, 15));
            }
        }
    }, "e", 375);

    return tank;
}


//auto 5 tank
function Auto_5_Tank(x, y) {

    //create tank
    var tank = new Game_Obj(x, y, function (a) {

        //draw the tank
        for (var i = 0; 5 > i; i++) {
            var ca = tau / 5 * i + a.t / 200;
            diep_barrel(a.x + Math.cos(ca) * 35, a.y + Math.sin(ca) * 35, 7, 20, barrel_angles[i]);
            diep_circle(a.x + Math.cos(ca) * 35, a.y + Math.sin(ca) * 35, 10, "#999999", "#727272");
        }
        diep_circle(a.x, a.y, 35, "#f04f54", "#b33b3f");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 35);
    }, function (a) {

        //movement
        simple_move_behavior(a, 1, "p", 200);

        //velocity falloff
        a.dx *= 0.8;
        a.dy *= 0.8;

        var closest = find_closest(a, o, "p");

        //produce bullets
        if (closest !== false && dist_to_obj(a, o[closest]) < 210) {
            for (var i = 0; 5 > i; i++) {
                var ca = tau / 5 * i + a.t / 200;

            }
        }
    }, "e", 375);

    var barrel_angles = [0, 0, 0, 0, 0];

    return tank;
}