//create bullet
function Bullet(x, y, dx, dy, r, discrim, dmg, hp, c1, c2) {

    if (c1 == undefined) {
        if (discrim == "eb") {
            c1 = "#f04f54";
            c2 = "#b33b3f";
        } else if (discrim == "pb") {
            c1 = "#1db2df";
            c2 = "#1386a6";
        } else if (discrim == "powerb" || discrim == "hpb") {
            c1 = "#00e06c";
            c2 = "#00a851";
        } else if (discrim == "mb") {
            c1 = "#999999";
            c2 = "#727272";
        }
    }

    //create "tank"
    var tank = new Game_Obj(x, y, function (a) {
        if (a.discrim != "powerb" && a.discrim != "hpb") {
            diep_circle(a.x, a.y, a.r, c1, c2);
        } else {
            ctx.lineWidth = a.r;
            ctx.strokeStyle = c1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(a.intended_target.x, a.intended_target.y);
            ctx.stroke();
        }
    }, function (a) {
        if (a.discrim == "eb" || a.discrim == "powerb" || a.discrim == "hpb") {
            var closest = find_closest(a, o, "p");
        } else if (a.discrim != "mb") {
            var closest = find_closest(a, o, "e");
        } else {
            var closest = find_closest(a, o, "s");
        }

        if (closest !== false) {
            if (a.discrim != "powerb" && a.discrim != "hpb") {
                var distance = dist_to_obj(a, o[closest]);
                if (distance < 30) {
                    // o[closest].hp -= a.dmg;
                    // a.hp -= a.dmg;
                    handle_damage(a, o[closest]);
                    if (a.discrim == "mb") {
                        pt += a.dmg / 20;
                    }
                }
            } else {
                if (a.discrim == "powerb") {
                    //a.intended_target.power += a.dmg;
                    a.intended_target.last_sender = a;
                }
                if (a.discrim == "hpb") {
                    a.intended_target.hp += a.dmg;
                }
                a.hp = -1;
            }
        }

        if (a.t > 60) {
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
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 20);
    }, function (a) {
        a.t++;
    }, "s", 1000);

    tank.t = 0;

    return tank;
}

//triangle polygon
function Triangle_Polygon(x, y) {

    var tank = new Game_Obj(x, y, function (a) {
        ctx.lineJoin = "round";
        ctx.fillStyle = "#fc7676";
        ctx.strokeStyle = "#bd585a";
        ctx.beginPath();
        poly(a.x, a.y, 20, 3, a.t / 100);
        ctx.fill();
        ctx.stroke();
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 20);
    }, function (a) {
        a.t++;
    }, "s", 2500);

    tank.t = 0;

    return tank;
}

//pentagon polygon
function Pentagon_Polygon(x, y) {

    var tank = new Game_Obj(x, y, function (a) {
        ctx.lineJoin = "round";
        ctx.fillStyle = "#768cfc";
        ctx.strokeStyle = "#5869bd";
        ctx.beginPath();
        poly(a.x, a.y, 40, 5, a.t / 100);
        ctx.fill();
        ctx.stroke();
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 40);
    }, function (a) {
        a.t++;
    }, "s", 13000);

    tank.t = 0;

    return tank;
}


//alpha pentagon polygon
function Alpha_Pentagon_Polygon(x, y) {

    var tank = new Game_Obj(x, y, function (a) {
        ctx.lineJoin = "round";
        ctx.fillStyle = "#768cfc";
        ctx.strokeStyle = "#5869bd";
        ctx.beginPath();
        poly(a.x, a.y, 100, 5, a.t / 100);
        ctx.fill();
        ctx.stroke();
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 100);
    }, function (a) {
        a.t++;
    }, "s", 300000);

    tank.t = 0;

    return tank;
}

//square polygon
function Green_Square_Polygon(x, y) {

    var tank = new Game_Obj(x, y, function (a) {
        ctx.lineJoin = "round";
        ctx.fillStyle = "#8aff69";
        ctx.strokeStyle = "#6cbe55";
        ctx.beginPath();
        poly(a.x, a.y, 25, 4, a.t / 100);
        ctx.fill();
        ctx.stroke();
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 20);
    }, function (a) {
        a.t++;
    }, "s", 100000);

    tank.t = 0;

    return tank;
}

//triangle polygon
function Green_Triangle_Polygon(x, y) {

    var tank = new Game_Obj(x, y, function (a) {
        ctx.lineJoin = "round";
        ctx.fillStyle = "#8aff69";
        ctx.strokeStyle = "#6cbe55";
        ctx.beginPath();
        poly(a.x, a.y, 20, 3, a.t / 100);
        ctx.fill();
        ctx.stroke();
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 20);
    }, function (a) {
        a.t++;
    }, "s", 250000);

    tank.t = 0;

    return tank;
}

//pentagon polygon
function Green_Pentagon_Polygon(x, y) {

    var tank = new Game_Obj(x, y, function (a) {
        ctx.lineJoin = "round";
        ctx.fillStyle = "#8aff69";
        ctx.strokeStyle = "#6cbe55";
        ctx.beginPath();
        poly(a.x, a.y, 40, 5, a.t / 100);
        ctx.fill();
        ctx.stroke();
        diep_healthbar(a.x, a.y, a.hp, a.mhp, 40);
    }, function (a) {
        a.t++;
    }, "s", 1300000);

    tank.t = 0;

    return tank;
}

var id = 0;
function set_id() {
    id++;
    return id;
}

function Request_Signal(start, end, amount, source, id, path, age) {

    var tank = new Game_Obj(0, 0, function (a) {
        if (a.end && a.start && a.end.discrim_2 == "generator") {
            ctx.lineWidth = 8;
            ctx.strokeStyle = "#00e06c";
            ctx.beginPath();
            a.path.forEach(function (e) {
                ctx.lineTo(e.x, e.y);
            });
            ctx.stroke();
        }
        a.hp--;
    }, function (a) {
        if (a.hp == 2 && a.age < 128 && a.source.power < a.source.power_cap) {
            if (a.end && a.start) {
                if (a.end.discrim_2 == "generator") {
                    o.forEach(function (e) {
                        if (e.id == a.id) {
                            e.hp--;
                        }
                    });
                    distrib_power(a.source, a.end, a.amount);
                } else {

                    var connections = get_all_in_range(a.end, o, "p");

                    connections.forEach(function (e) {
                        e = o[e];
                        if (e !== a.start && e !== a.source && e !== a.end && index_of_obj(a.path, e) == -1) {
                            if (e.tank_type == "Relay_Tower") {
                                o.push(Request_Signal(a.end, e, a.amount, a.source, a.id, a.path.concat([e]), a.age + 1));
                                a.hp = -1;
                            } else if (e.discrim_2 == "generator") {
                                o.push(Request_Signal(a.end, e, a.amount, a.source, a.id, a.path.concat([e]), a.age + 1));
                            } else {
                                a.hp = -1;
                            }
                        }
                    });
                }
            }
        }
    }, "req", 2);

    tank.start = start;
    tank.end = end;
    tank.amount = amount;
    tank.source = source;

    if (!path) {
        path = [start, end];
    }
    tank.path = path;

    if (!id) {
        id = set_id();
    }
    tank.id = id;

    if (!age) {
        age = 0;
    }
    tank.age = age;

    return tank;
}

function Upgrade_Menu(source) {
    
    var tank = {};

    if (!source) {
        tank.draw = function (a) {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, a.y);
            icon_set([
                {
                    top: "40 Points",
                    center: "Basic_Tower",
                    bottom: "1 - Tank"
                },
                {
                    top: "10 Points",
                    center: "Relay_Tower",
                    bottom: "2 - Relay"
                },
                {
                    top: "80 Points",
                    center: "Generator_Tower",
                    bottom: "3 - Generator"
                },
                {
                    top: "30 Points",
                    center: "Healer_Tower",
                    bottom: "4 - Healer"
                },
                {
                    top: "30 Points",
                    center: "Miner_Tower",
                    bottom: "5 - Miner"
                },
            ]);
            ctx.restore();
        }
    } else {
        tank.draw = function (a) {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, a.y);
            if (a.source) {
                upgrade_menu(a.source);
            } else {
                a.hp = -1;
            }
            ctx.restore();
        }

        source = get_upgrades_for_tank(source);
        tank.source = source;

    }

    tank.action = function (a) {
        if (!a.source) {
            if (!select.selecting) {
                a.y *= 0.92;
            } else {
                if (a.y > -0.5) {
                    a.y = -0.5
                }
                a.y *= 1 / 0.92;
            }
        } else {
            if (select.selecting && select.selection.tank_type == a.source.source) {
                a.y *= 0.92;
            } else {
                if (a.y > -0.5) {
                    a.y = -0.5
                }
                a.y *= 1 / 0.92;
            }
        }

        if (!between(tank.y, -130, 1)) {
            a.hp = -1;
        }
    }

    tank.y = -120;

    tank.x = Infinity;

    tank.discrim = "upg";

    o.forEach(function (e) {
        if (e.source && tank.source && e.source.source == tank.source.source) {
            tank.hp = -1;
        }
        if (e.discrim == "upg" && !e.source && !tank.source) {
            tank.hp = -1;
        }
    });

    return tank;

}

function Drone(x, y, dx, dy, r, discrim, dmg, hp, c1, c2) {
    if (c1 == undefined) {
        if (discrim == "e") {
            c1 = "#f04f54";
            c2 = "#b33b3f";
        } else if (discrim == "p") {
            c1 = "#1db2df";
            c2 = "#1386a6";
        }
    }

     //create "tank"
     var tank = new Game_Obj(x, y, function (a) {
        ctx.beginPath();
        ctx.fillStyle = a.c1;
        ctx.strokeStyle = a.c2;
        poly(a.x, a.y, a.r, 3, Math.atan2(a.dy, a.dx));
        ctx.fill();
        ctx.stroke();
    }, function (a) {
        if (a.discrim == "e") {
            var closest = find_closest(a, o, "p");
        } else if (a.discrim == "p") {
            var closest = find_closest(a, o, "e");
        }

        if (closest !== false && o[closest]) {
            var distance = dist_to_obj(a, o[closest]);
            if (distance < 30) {
                o[closest].hp -= a.dmg;
                a.hp -= a.dmg;
            }
        }

        a.dx *= 0.9;
        a.dy *= 0.9;
        if (m.m[0]) {
            a.dx += Math.cos(point_towards(a, tmc));
            a.dy += Math.sin(point_towards(a, tmc));
        } else if (m.m[2]) {
            a.dx -= Math.cos(point_towards(a, tmc));
            a.dy -= Math.sin(point_towards(a, tmc));
        }

        o.forEach(function (e) {
            if (e !== a && e.discrim_2 == "drone" && dist_to_obj(e, a) < 30) {
                a.dx -= Math.cos(point_towards(a, e));
                a.dy -= Math.sin(point_towards(a, e));
            }
        });
    }, discrim);

    tank.r = r;
    tank.dx = dx;
    tank.dy = dy;
    tank.c1 = c1;
    tank.c2 = c2;
    tank.hp = hp;
    tank.dmg = dmg;
    tank.bullet = true;
    tank.discrim_2 = "drone";

    return tank;
}