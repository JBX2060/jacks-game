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

    tank.tank_type = "Basic_Tower";
    tank.cost = 40;

    //return the tower
    return tank;
}

//machine gun tower
function Machine_Gun_Tower(x, y) {
    
    //create tank
    var tank = Simple_Tower(x, y, function (a) {
        
        //draw base
        tank_base(a.x, a.y, 35);

        //draw tank
        diep_trapezoid_barrel(a.x, a.y, 26, 40, 50, a.angle);
        diep_circle(a.x, a.y, 25, "#1db2df", "#1386a6");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 20);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 20, "#8EFFFB");

    }, function (a) {
        if (a.hp < a.mhp && a.power >= 0.4) {
            a.hp += 0.05;
            a.power -= 0.4;
        }
    }, function (a) {
        if (a.t % 8 == 0) {
            o.push(Bullet(a.x, a.y, Math.cos(a.angle + Math.sin(a.t / 10) * 0.3) * 12, Math.sin(a.angle + Math.sin(a.t / 10) * 0.3) * 12, 8, "pb", 5, 15));
            a.power -= 6;
        }
    }, 300, 300, 400, 6);

    tank.tank_type = "Machine_Gun_Tower";
    tank.cost = 65;

    //return the tower
    return tank;
}

//destroyer tower
function Destroyer_Tower(x, y) {
    
    //create tank
    var tank = Simple_Tower(x, y, function (a) {
        
        //draw base
        tank_base(a.x, a.y, 40);

        //draw tank
        diep_barrel(a.x, a.y, 48, 50, a.angle);
        diep_circle(a.x, a.y, 30, "#1db2df", "#1386a6");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 30);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 30, "#8EFFFB");

    }, function (a) {
        if (a.hp < a.mhp && a.power >= 0.4) {
            a.hp += 0.05;
            a.power -= 0.4;
        }
    }, function (a) {
        if (a.t % 90 == 0) {
            o.push(Bullet(a.x, a.y, Math.cos(a.angle) * 5, Math.sin(a.angle) * 5, 20, "pb", 20, 200));
            a.power -= 50;
        }
    }, 300, 300, 400, 50);

    tank.tank_type = "Destroyer_Tower";
    tank.cost = 115;

    //return the tower
    return tank;
}

//sniper tower
function Sniper_Tower(x, y) {
    
    //create tank
    var tank = Simple_Tower(x, y, function (a) {
        
        //draw base
        tank_base(a.x, a.y, 35);

        //draw tank
        diep_barrel(a.x, a.y, 20, 60, a.angle);
        diep_circle(a.x, a.y, 25, "#1db2df", "#1386a6");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 20);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 20, "#8EFFFB");

    }, function (a) {
        if (a.hp < a.mhp && a.power >= 0.4) {
            a.hp += 0.05;
            a.power -= 0.4;
        }
    }, function (a) {
        if (a.t % 30 == 0) {
            o.push(Bullet(a.x, a.y, Math.cos(a.angle) * 30, Math.sin(a.angle) * 30, 8, "pb", 20, 20));
            a.power -= 10;
        }
    }, 300, 600, 400, 10);

    tank.tank_type = "Sniper_Tower";
    tank.cost = 60;

    //return the tower
    return tank;
}

//assassin tower
function Assassin_Tower(x, y) {
    
    //create tank
    var tank = Simple_Tower(x, y, function (a) {
        
        //draw base
        tank_base(a.x, a.y, 40);

        //draw tank
        diep_barrel(a.x, a.y, 27, 70, a.angle);
        diep_circle(a.x, a.y, 30, "#1db2df", "#1386a6");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 30);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 30, "#8EFFFB");

    }, function (a) {
        if (a.hp < a.mhp && a.power >= 0.4) {
            a.hp += 0.05;
            a.power -= 0.4;
        }
    }, function (a) {
        if (a.t % 60 == 0) {
            o.push(Bullet(a.x, a.y, Math.cos(a.angle) * 30, Math.sin(a.angle) * 30, 10, "pb", 25, 25));
            a.power -= 10;
        }
    }, 300, 1200, 400, 10);

    tank.tank_type = "Assassin_Tower";
    tank.cost = 90;

    //return the tower
    return tank;
}

//ranger tower
function Ranger_Tower(x, y) {
    
    //create tank
    var tank = Simple_Tower(x, y, function (a) {
        
        //draw base
        tank_base(a.x, a.y, 45);

        //draw tank
        diep_barrel(a.x, a.y, 32, 80, a.angle);
        diep_trapezoid_barrel(a.x, a.y, 55, 32, 45, a.angle);
        diep_circle(a.x, a.y, 35, "#1db2df", "#1386a6");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 35);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 35, "#8EFFFB");

    }, function (a) {
        if (a.hp < a.mhp && a.power >= 0.4) {
            a.hp += 0.05;
            a.power -= 0.4;
        }
    }, function (a) {
        if (a.t % 60 == 0) {
            o.push(Bullet(a.x, a.y, Math.cos(a.angle) * 40, Math.sin(a.angle) * 40, 12, "pb", 32, 32));
            a.power -= 10;
        }
    }, 300, 2400, 400, 10);

    tank.tank_type = "Ranger_Tower";
    tank.cost = 150;

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

    tank.tank_type = "Twin_Tower";
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

    tank.tank_type = "Triple_Shot_Tower";
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
    tank.tank_type = "Relay_Tower";

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
    }, 1500, 100);

    tank.power = 0
    tank.power_cap = 1000;
    tank.discrim_2 = "generator";
    tank.cost = 80;
    tank.tank_type = "Generator_Tower";

    return tank;
}


//energy generation tower II
function Generator_II_Tower(x, y) {

    //create tank
    var tank = Simpler_Tower(x, y, function (a) {

        //draw base
        tank_base(a.x, a.y, 50);

        //draw tank
        //diep_barrel(a.x, a.y, 16, 50, a.angle);
        diep_circle(a.x, a.y, 40, "#00e06c", "#00a851");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 40);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 40, "#8EFFFB");

    }, function (a) {

        a.power += 10;

        a.hp = clamp(a.hp, 0, a.mhp);
        a.power = clamp(a.power, 0, a.power_cap);

        if (a.hp < a.mhp) {
            a.hp += 0.05;
        }
    }, 2500, 100);

    tank.power = 0
    tank.power_cap = 2000;
    tank.discrim_2 = "generator";
    tank.cost = 160;
    tank.tank_type = "Generator_II_Tower";

    return tank;
}


//energy generation tower III
function Generator_III_Tower(x, y) {

    //create tank
    var tank = Simpler_Tower(x, y, function (a) {

        //draw base
        tank_base(a.x, a.y, 60);

        //draw tank
        //diep_barrel(a.x, a.y, 16, 50, a.angle);
        diep_circle(a.x, a.y, 50, "#00e06c", "#00a851");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 50);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 50, "#8EFFFB");

    }, function (a) {

        a.power += 22;

        a.hp = clamp(a.hp, 0, a.mhp);
        a.power = clamp(a.power, 0, a.power_cap);

        if (a.hp < a.mhp) {
            a.hp += 0.05;
        }
    }, 4000, 100);

    tank.power = 0
    tank.power_cap = 4000;
    tank.discrim_2 = "generator";
    tank.cost = 320;
    tank.tank_type = "Generator_III_Tower";

    return tank;
}

//energy generation tower IIII
function Generator_IIII_Tower(x, y) {

    //create tank
    var tank = Simpler_Tower(x, y, function (a) {

        //draw base
        tank_base(a.x, a.y, 70);

        //draw tank
        //diep_barrel(a.x, a.y, 16, 50, a.angle);
        diep_circle(a.x, a.y, 60, "#00e06c", "#00a851");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 60);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 60, "#8EFFFB");

    }, function (a) {

        a.power += 50;

        a.hp = clamp(a.hp, 0, a.mhp);
        a.power = clamp(a.power, 0, a.power_cap);

        if (a.hp < a.mhp) {
            a.hp += 0.05;
        }
    }, 6000, 100);

    tank.power = 0
    tank.power_cap = 8000;
    tank.discrim_2 = "generator";
    tank.cost = 640;
    tank.tank_type = "Generator_IIII_Tower";

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
    tank.tank_type = "Healer_Tower";

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
    tank.discrim_2 = "Miner_Tower";
    tank.cost = 30;
    tank.tank_type = "Miner_Tower";

    return tank;
}

//triangle miner tower
function Triangle_Miner_Tower(x, y) {

    //create tank
    var tank = Simpler_Tower(x, y, function (a) {

        //draw base
        tank_base(a.x, a.y, 35);

        //draw tank
        diep_barrel(a.x, a.y, 24, 50, a.angle);
        diep_circle(a.x, a.y, 25, "#999999", "#727272");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 25);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 25, "#8EFFFB");

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
            if (a.t % 20 == 0 && a.power >= 30) {
                a.angle = angle;
                o.push(Bullet(a.x, a.y, Math.cos(a.angle) * 50, Math.sin(a.angle) * 50, 8, "mb", 12.5, 12.5));
                o[o.length - 1].sender = a;
                o[o.length - 1].intended_target = o[min_hp_index];
                a.power -= 30;
            }
        }

        if (a.hp < a.mhp) {
            a.hp += 0.05;
        }

        request_power(a);
    }, 750, 150);

    tank.power = 0;
    tank.power_cap = 300;
    tank.discrim_2 = "Miner_Tower";
    tank.cost = 75;
    tank.tank_type = "Triangle_Miner_Tower";

    return tank;
}


//pentagon miner tower
function Pentagon_Miner_Tower(x, y) {

    //create tank
    var tank = Simpler_Tower(x, y, function (a) {

        //draw base
        tank_base(a.x, a.y, 40);

        //draw tank
        diep_barrel(a.x, a.y, 32, 60, a.angle);
        diep_circle(a.x, a.y, 30, "#999999", "#727272");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 30);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 30, "#8EFFFB");

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
            if (a.t % 20 == 0 && a.power >= 130) {
                a.angle = angle;
                o.push(Bullet(a.x, a.y, Math.cos(a.angle) * 50, Math.sin(a.angle) * 50, 8, "mb", 65, 65));
                o[o.length - 1].sender = a;
                o[o.length - 1].intended_target = o[min_hp_index];
                a.power -= 130;
            }
        }

        if (a.hp < a.mhp) {
            a.hp += 0.05;
        }

        request_power(a);
    }, 3900, 150);

    tank.power = 0;
    tank.power_cap = 400;
    tank.discrim_2 = "Miner_Tower";
    tank.cost = 390;
    tank.tank_type = "Pentagon_Miner_Tower";

    return tank;
}

//healer II tower
function Healer_II_Tower(x, y) {

    //create tank
    var tank = Simpler_Tower(x, y, function (a) {

        //draw base
        tank_base(a.x, a.y, 35);

        //draw tank
        diep_barrel(a.x, a.y, 36, 40, a.angle);
        diep_circle(a.x, a.y, 25, "#00e06c", "#00a851");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 25);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 25, "#8EFFFB");

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
            if (a.t % 8 == 0 && a.power >= 8) {
                a.angle = angle;
                o.push(Bullet(a.x, a.y, Math.cos(a.angle) * 50, Math.sin(a.angle) * 50, 16, "hpb", 6, 6));
                o[o.length - 1].sender = a;
                o[o.length - 1].intended_target = o[min_hp_index];
                a.power -= 8;
            }
        }

        request_power(a);

        if (a.hp < a.mhp) {
            a.hp += 0.05;
        }
    }, 300, 400);

    tank.power = 0;
    tank.power_cap = 400;
    tank.cost = 55;
    tank.tank_type = "Healer_II_Tower";

    return tank;
}

//healer III tower
function Healer_III_Tower(x, y) {

    //create tank
    var tank = Simpler_Tower(x, y, function (a) {

        //draw base
        tank_base(a.x, a.y, 40);

        //draw tank
        diep_barrel(a.x, a.y, 40, 45, a.angle);
        diep_circle(a.x, a.y, 30, "#00e06c", "#00a851");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 30);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 30, "#8EFFFB");

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
            if (a.t % 3 == 0 && a.power >= 5) {
                a.angle = angle;
                o.push(Bullet(a.x, a.y, Math.cos(a.angle) * 50, Math.sin(a.angle) * 50, 16, "hpb", 6, 6));
                o[o.length - 1].sender = a;
                o[o.length - 1].intended_target = o[min_hp_index];
                a.power -= 5;
            }
        }

        request_power(a);

        if (a.hp < a.mhp) {
            a.hp += 0.05;
        }
    }, 300, 500);

    tank.power = 0;
    tank.power_cap = 400;
    tank.cost = 115;
    tank.tank_type = "Healer_III_Tower";

    return tank;
}

//bulk healer tower
function Bulk_Healer_Tower(x, y) {

    //create tank
    var tank = Simpler_Tower(x, y, function (a) {

        //draw base
        tank_base(a.x, a.y, 40);

        //draw tank
        diep_barrel(a.x, a.y, 60, 42, a.angle);
        diep_circle(a.x, a.y, 30, "#00e06c", "#00a851");
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 30);
        diep_healthbar(a.x, a.y + 10, a.power, a.power_cap, 30, "#8EFFFB");

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
            if (a.t % 2 == 0 && a.power >= 15) {
                a.angle = angle;
                o.push(Bullet(a.x, a.y, Math.cos(a.angle) * 50, Math.sin(a.angle) * 50, 16, "hpb", 6, 6));
                o[o.length - 1].sender = a;
                o[o.length - 1].intended_target = o[min_hp_index];
                a.power -= 15;
            }
        }

        request_power(a);

        if (a.hp < a.mhp) {
            a.hp += 0.05;
        }
    }, 300, 500);

    tank.power = 0;
    tank.power_cap = 400;
    tank.cost = 100;
    tank.tank_type = "Bulk_Healer_Tower";

    return tank;
}