//basic tower
function Basic_Tower(x, y) {
    
    //create tank
    var tank = Simple_Tower(x, y, function (a) {
        
        //draw base
        tank_base(a.x, a.y, 30);

        //draw tank
        diep_barrel(a.x, a.y, 16, 40, a.angle);
        diep_circle(a.x, a.y, 20, "#1db2df", "#1386a6");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 20);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 20, "#8EFFFB");

    }, function (a) {
        if (a.hp < a.mhp && a.power >= 0.4) {
            a.hp += 0.05;
            a.power -= 0.4;
        }
    }, function (a) {
        if (a.t % 15 == 0) {
            o.push(Bullet(a.x, a.y, Math.cos(a.angle) * 15, Math.sin(a.angle) * 15, 8, "pb", 5, 15));
            a.power -= 10;
        }
    }, 100, 300, 100, 10);

    //return the tower
    return tank;
}

//twin tower
function Twin_Tower(x, y) {
    
    //create tank
    var tank = Simple_Tower(x, y, function (a) {

        //draw base
        tank_base(a.x, a.y, 35);

        //draw tank
        diep_barrel(a.x, a.y, 20, 40, a.angle, 14, 0);
        diep_barrel(a.x, a.y, 20, 40, a.angle, -14, 0);
        diep_circle(a.x, a.y, 25, "#1db2df", "#1386a6");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 25);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 25, "#8EFFFB");

    }, function (a) {
        if (a.hp < a.mhp && a.power >= 0.4) {
            a.hp += 0.05;
            a.power -= 0.4;
        }
    }, function (a) {
        if (a.t % 15 == 0) {
            var off_p = offset_transform(a.x, a.y, 14, 0, a.angle);
            o.push(Bullet(off_p.x, off_p.y, Math.cos(a.angle) * 15, Math.sin(a.angle) * 15, 8, "pb", 5, 15));
            a.power -= 10;
        } else if (a.t % 15 == 7) {
            var off_p = offset_transform(a.x, a.y, -14, 0, a.angle);
            o.push(Bullet(off_p.x, off_p.y, Math.cos(a.angle) * 15, Math.sin(a.angle) * 15, 8, "pb", 5, 15));
            a.power -= 10;
        }
    }, 150, 300, 100, 10);

    //return the tower
    return tank;
}

//twin tower
function Triple_Shot_Tower(x, y) {
    
    //create tank
    var tank = Simple_Tower(x, y, function (a) {

        //draw base
        tank_base(a.x, a.y, 40);

        //draw tank
        diep_barrel(a.x, a.y, 27, 60, a.angle);
        diep_barrel(a.x, a.y, 27, 60, a.angle + tau / 8);
        diep_barrel(a.x, a.y, 27, 60, a.angle - tau / 8);
        diep_circle(a.x, a.y, 30, "#1db2df", "#1386a6");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 30);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 30, "#8EFFFB");

    }, function (a) {
        if (a.hp < a.mhp && a.power >= 0.4) {
            a.hp += 0.05;
            a.power -= 0.4;
        }
    }, function (a) {
        if (a.t % 15 == 0) {
            o.push(Bullet(a.x, a.y, Math.cos(a.angle) * 15, Math.sin(a.angle) * 15, 8, "pb", 5, 15));
            o.push(Bullet(a.x, a.y, Math.cos(a.angle + tau / 8) * 15, Math.sin(a.angle + tau / 8) * 15, 11, "pb", 5, 15));
            o.push(Bullet(a.x, a.y, Math.cos(a.angle - tau / 8) * 15, Math.sin(a.angle - tau / 8) * 15, 11, "pb", 5, 15));
            a.power -= 15;
        }
    }, 200, 300, 100, 10);

    //return the tower
    return tank;
}

//energy relay tower
function Relay_Tower(x, y) {

    //create tank
    var tank = Simpler_Tower(x, y, function (a) {

        //draw base
        tank_base(a.x, a.y, 30);

        //draw tank
        diep_barrel(a.x, a.y, 16, 40, a.angle);
        diep_circle(a.x, a.y, 20, "#00e06c", "#00a851");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 20);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 20, "#8EFFFB");

    }, function (a) {

        a.hp = clamp(a.hp, 0, a.mhp);
        a.power = clamp(a.power, 0, a.power_cap);

        var in_range = get_all_in_range(a, o, "p");

        var min_power = Infinity;

        var min_power_index = false;

        in_range.forEach(function (e) {
            if (o[e].power < min_power && a !== o[e]) {
                min_power = o[e].power;
                min_power_index = e;
            }
        });

        var angle = false;

        if (min_power_index !== false) {
            angle = point_towards(a, o[min_power_index]);
        } else {
            angle = false;
        }

        if (angle !== false) {
            if (a.t % 5 == 0 && a.power >= 10) {
                a.angle = angle;
                o.push(Bullet(a.x, a.y, Math.cos(a.angle) * 25, Math.sin(a.angle) * 25, 8, "powerb", 10, 10));
                o[o.length - 1].sender = a;
                o[o.length - 1].intended_target = o[min_power_index];
                a.power -= 10;
            }
        }

        if (a.hp < a.mhp) {
            a.hp += 0.05;
        }
    }, 100, 500);

    tank.power = 0;
    tank.power_cap = 200;
    tank.discrim_2 = "relay";

    return tank;
}

//energy generation tower
function Generator_Tower(x, y) {

    //create tank
    var tank = Simpler_Tower(x, y, function (a) {

        //draw base
        tank_base(a.x, a.y, 40);

        //draw tank
        diep_barrel(a.x, a.y, 16, 50, a.angle);
        diep_circle(a.x, a.y, 30, "#00e06c", "#00a851");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 30);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 30, "#8EFFFB");

    }, function (a) {

        a.power += 3;

        a.hp = clamp(a.hp, 0, a.mhp);
        a.power = clamp(a.power, 0, a.power_cap);

        var in_range = get_all_in_range(a, o, "p");

        var min_power = Infinity;

        var min_power_index = false;

        in_range.forEach(function (e) {
            if (o[e].power < min_power && a !== o[e] && o[e].power / o[e].power_cap < 0.85) {
                min_power = o[e].power;
                min_power_index = e;
            }
        });

        var angle = false;

        if (min_power_index !== false) {
            angle = point_towards(a, o[min_power_index]);
        } else {
            angle = false;
        }

        if (angle !== false) {
            if (a.t % 2 == 0 && a.power >= 10) {
                a.angle = angle;
                o.push(Bullet(a.x, a.y, Math.cos(a.angle) * 25, Math.sin(a.angle) * 25, 8, "powerb", 10, 10));
                o[o.length - 1].sender = a;
                o[o.length - 1].intended_target = o[min_power_index];
                a.power -= 10;
            }
        }

        if (a.hp < a.mhp) {
            a.hp += 0.05;
        }
    }, 100, 500);

    tank.power = 0
    tank.power_cap = 500;
    tank.discrim_2 = "relay";

    return tank;
}