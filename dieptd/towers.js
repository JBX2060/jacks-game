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
    }, 300, 300, 400, 10);

    tank.tank_type = "basic";
    tank.cost = 40;

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
    }, 450, 300, 400, 10);

    tank.tank_type = "twin";
    tank.cost = 70;

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
    }, 600, 300, 400, 10);

    tank.tank_type = "tripleshot";
    tank.cost = 90;

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
        //diep_barrel(a.x, a.y, 16, 40, a.angle);
        diep_circle(a.x, a.y, 20, "#00e06c", "#00a851");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 20);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 20, "#8EFFFB");

    }, function (a) {

        a.hp = clamp(a.hp, 0, a.mhp);
        a.power = clamp(a.power, 0, a.power_cap);

        if (a.hp < a.mhp) {
            a.hp += 0.05;
        }
    }, 300, 400);

    tank.power = 0;
    tank.power_cap = 600;
    tank.discrim_2 = "relay";
    tank.cost = 10;
    tank.tank_type = "relay";

    return tank;
}

//energy generation tower
function Generator_Tower(x, y) {

    //create tank
    var tank = Simpler_Tower(x, y, function (a) {

        //draw base
        tank_base(a.x, a.y, 40);

        //draw tank
        //diep_barrel(a.x, a.y, 16, 50, a.angle);
        diep_circle(a.x, a.y, 30, "#00e06c", "#00a851");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 30);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 30, "#8EFFFB");

    }, function (a) {

        a.power += 4;

        a.hp = clamp(a.hp, 0, a.mhp);
        a.power = clamp(a.power, 0, a.power_cap);

        if (a.hp < a.mhp) {
            a.hp += 0.05;
        }
    }, 1500, 200);

    tank.power = 0
    tank.power_cap = 1000;
    tank.discrim_2 = "relay";
    tank.cost = 80;
    tank.tank_type = "generator";

    return tank;
}

//healer tower
function Healer_Tower(x, y) {

    //create tank
    var tank = Simpler_Tower(x, y, function (a) {

        //draw base
        tank_base(a.x, a.y, 30);

        //draw tank
        diep_barrel(a.x, a.y, 32, 35, a.angle);
        diep_circle(a.x, a.y, 20, "#00e06c", "#00a851");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 20);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 20, "#8EFFFB");

    }, function (a) {

        a.hp = clamp(a.hp, 0, a.mhp);
        a.power = clamp(a.power, 0, a.power_cap);

        var in_range = get_all_in_range(a, o, "p");

        var min_hp = 1;

        var min_hp_index = false;

        in_range.forEach(function (e) {
            if (o[e].hp / o[e].mhp < min_hp && a !== o[e]) {
                min_hp = o[e].hp / o[e].mhp;
                min_hp_index = e;
            }
        });

        var angle = false;

        if (min_hp_index !== false) {
            angle = point_towards(a, o[min_hp_index]);
        } else {
            angle = false;
        }

        if (angle !== false) {
            if (a.t % 15 == 0 && a.power >= 10) {
                a.angle = angle;
                o.push(Bullet(a.x, a.y, Math.cos(a.angle) * 50, Math.sin(a.angle) * 50, 16, "hpb", 6, 6));
                o[o.length - 1].sender = a;
                o[o.length - 1].intended_target = o[min_hp_index];
                a.power -= 10;
            }
        }

        request_power(a);

        if (a.hp < a.mhp) {
            a.hp += 0.05;
        }
    }, 300, 300);

    tank.power = 0;
    tank.power_cap = 400;
    tank.cost = 30;

    return tank;
}

//miner tower
function Miner_Tower(x, y) {

    //create tank
    var tank = Simpler_Tower(x, y, function (a) {

        //draw base
        tank_base(a.x, a.y, 30);

        //draw tank
        diep_barrel(a.x, a.y, 16, 40, a.angle);
        diep_circle(a.x, a.y, 20, "#999999", "#727272");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 20);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 20, "#8EFFFB");

    }, function (a) {

        a.hp = clamp(a.hp, 0, a.mhp);
        a.power = clamp(a.power, 0, a.power_cap);

        var in_range = get_all_in_range(a, o, "s");

        var min_hp = -1;

        var min_hp_index = false;

        in_range.forEach(function (e) {
            if (o[e].hp / o[e].mhp > min_hp && a !== o[e]) {
                min_hp = o[e].hp / o[e].mhp;
                min_hp_index = e;
            }
        });

        var angle = false;

        if (min_hp_index !== false) {
            angle = point_towards(a, o[min_hp_index]);
        } else {
            angle = false;
        }

        if (angle !== false) {
            if (a.t % 20 == 0 && a.power >= 10) {
                a.angle = angle;
                o.push(Bullet(a.x, a.y, Math.cos(a.angle) * 50, Math.sin(a.angle) * 50, 8, "mb", 5, 5));
                o[o.length - 1].sender = a;
                o[o.length - 1].intended_target = o[min_hp_index];
                a.power -= 10;
            }
        }

        if (a.hp < a.mhp) {
            a.hp += 0.05;
        }

        request_power(a);
    }, 300, 150);

    tank.power = 0;
    tank.power_cap = 200;
    tank.discrim_2 = "miner";
    tank.cost = 30;

    return tank;
}