o.push(Generator_Tower(0, 0));

// for (var i = 1; 4 > i; i++) {
//     o.push(Relay_Tower(1920 - 250 * i, 1080 - 250 * i));
// }


// for (var i = 0; 12 > i; i++) {
//     o.push(Triple_Shot_Tower(Math.random() * c.width / 2 + c.width / 2, Math.random() * c.height));
// }

// for (var i = 0; 2 > i; i++ ) {
//     o.push(Basic_Tank(Math.random() * c.width / 2 - 5000, Math.random() * c.height));
//     o.push(Twin_Tank(Math.random() * c.width / 2 - 5000, Math.random() * c.height));
//     o.push(Triple_Shot_Tank(Math.random() * c.width / 2 - 5000, Math.random() * c.height));
//     o.push(Triplet_Tank(Math.random() * c.width / 2 - 5000, Math.random() * c.height));
// }

var clump_size = 2000;

for (var i = 0; 30 > i; i++) {
    o.push(Square_Polygon(Math.random() * clump_size - clump_size / 2, Math.random() * clump_size - clump_size / 2 ));
}


for (var i = 0; 20 > i; i++) {
    o.push(Triangle_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
}


for (var i = 0; 7 > i; i++) {
    o.push(Pentagon_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
}

// o.push(Green_Square_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));

// if (Math.random() > 0.75) {
//     o.push(Green_Triangle_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
// }
// if (Math.random() > 0.9) {
//     o.push(Green_Pentagon_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
// }

var max_poly_hp = get_shape_total_hp().mhp;

//loop function for the game
function loop() {

    gt = group_towers();

    var diff = 20 * (1 - get_shape_total_hp().hp / max_poly_hp);

    if (l % 300 == 0) {
        for (var i = 0; diff > i; i++ ) {
            var angle = tau * Math.random()
            switch (Math.floor(Math.random() * 4)) {
                case 0:
                    o.push(Basic_Tank(10000 * Math.cos(angle), 10000 * Math.sin(angle)));
                    break;
                case 1:
                    if (diff > 3) {
                        o.push(Twin_Tank(10000 * Math.cos(angle), 10000 * Math.sin(angle)));
                    } else {
                        o.push(Basic_Tank(10000 * Math.cos(angle), 10000 * Math.sin(angle)));
                    }
                    break;
                case 2:
                    if (diff > 6) {
                        o.push(Triple_Shot_Tank(10000 * Math.cos(angle), 10000 * Math.sin(angle)));
                    } else {
                        o.push(Basic_Tank(10000 * Math.cos(angle), 10000 * Math.sin(angle)));
                    }
                    break;
                case 3:
                    if (diff > 9) {
                        o.push(Triplet_Tank(10000 * Math.cos(angle), 10000 * Math.sin(angle)));
                    } else {
                        o.push(Basic_Tank(10000 * Math.cos(angle), 10000 * Math.sin(angle)));
                    }
                    break;
            }
            //o.push(Basic_Tank(Math.random() * c.width / 2, Math.random() * c.height - 8000));
            //o.push(Twin_Tank(Math.random() * c.width / 2 - 15000, Math.random() * c.height));
            //o.push(Triple_Shot_Tank(Math.random() * c.width / 2 - 15000, Math.random() * c.height));
            //o.push(Triplet_Tank(Math.random() * c.width / 2 - 15000, Math.random() * c.height));
        }
    }

    ctx.fillStyle = "#EEEEEE";
    ctx.fillRect(0, 0, c.width, c.height);

    //do all actions for all things
    // o.forEach(function (e) {
    //     e.action();
    // });
    for (var i = 0; o.length > i; i++) {
        o[i].action();
    }

    //remove those with no hp
    for (var i = 0; o.length > i; i++) {
        if (o[i].hp <= 0) {
            o.splice(i, 1);
            i--;
        }
    }

    //toggle fov rendering
    if (kd[70]) {
        fov_toggle = !fov_toggle;
    }

    //handle scaling
    scale.factor = Math.pow(2, scale.log);

    if (k[187]) {
        scale.d += 0.02;
    }

    if (k[189]) {
        scale.d -= 0.02;
    }

    scale.d -= Math.sign(m.w) / 60;

    scale.log += scale.d;
    scale.d *= 0.9;

    tmc.x = m.x;
    tmc.y = m.y;
    tmc.x -= 960;
    tmc.y -= 540;
    tmc.x /= scale.factor;
    tmc.y /= scale.factor;
    tmc.x += pos.x;
    tmc.y += pos.y;

    if (place.placing && m.md[0]) {
        switch (place.place_id) {
            case "Basic_Tower":
                if (pt >= 40) {
                    o.push(Basic_Tower(tmc.x, tmc.y));
                    pt -= 40;
                }
                break;
            case "Relay_Tower":
                if (pt >= 10) {
                    o.push(Relay_Tower(tmc.x, tmc.y));
                    pt -= 10;
                }
                break;
            case "Generator_Tower":
                if (pt >= 80) {
                    o.push(Generator_Tower(tmc.x, tmc.y));
                    pt -= 80;
                }
                break;
            case "Healer_Tower":
                if (pt >= 30) {
                    o.push(Healer_Tower(tmc.x, tmc.y));
                    pt -= 30;
                }
                break;
            case "Miner_Tower":
                if (pt >= 30) {
                    o.push(Miner_Tower(tmc.x, tmc.y));
                    pt -= 30;
                }
                break;
        }
        place.placing = false;
    }

    //handle placing
    if (kd[49] || click_in_rect(1920 - 550, 10, 100, 100)) {
        place.placing = true;
        place.place_id = "Basic_Tower";
    }

    if (kd[50] || click_in_rect(1920 - 440, 10, 100, 100)) {
        place.placing = true;
        place.place_id = "Relay_Tower";
    }

    if (kd[51] || click_in_rect(1920 - 330, 10, 100, 100)) {
        place.placing = true;
        place.place_id = "Generator_Tower";
    }

    if (kd[52] || click_in_rect(1920 + 220, 10, 100, 100)) {
        place.placing = true;
        place.place_id = "Healer_Tower";
    }

    if (kd[53] || click_in_rect(1920 + 110, 10, 100, 100)) {
        place.placing = true;
        place.place_id = "Miner_Tower";
    }

    if (place.placing && m.m[2]) { 
        place.placing = false;
    }

    //translate by position
    ctx.save();
    ctx.translate(960, 540);
    ctx.scale(scale.factor, scale.factor);
    ctx.translate(-pos.x, -pos.y);

    //handle selection
    var closest_to_mouse_index = find_closest({ x: tmc.x, y: tmc.y }, o, "p");

    var closest_to_mouse = o[closest_to_mouse_index];

    if (dist_to_obj({ x: tmc.x, y: tmc.y }, closest_to_mouse) < 50 || select.selecting) {
        ctx.setLineDash([20, 40]);
        ctx.lineCap = "round";
        ctx.strokeStyle = "#555555";
        ctx.lineWidth = 4;
        if (!select.selecting) {
            ctx.arc(closest_to_mouse.x, closest_to_mouse.y, 75, 0, tau);
        } else {
            ctx.arc(select.selection.x, select.selection.y, 75, 0, tau);
        }
        ctx.stroke();
        ctx.setLineDash([]);
    }

    if (m.m[0] && dist_to_obj({ x: tmc.x, y: tmc.y }, closest_to_mouse) < 50) {
        select.selecting = true;
        select.selection = closest_to_mouse;
        select.selection_index = closest_to_mouse_index;
    }

    if (m.m[2]) {
        select.selecting = false;
    }

    if (select.selecting) {
        handle_upgrades();
    }


    //do all drawing for all things
    o.forEach(function (e) {
        if (e.discrim == "p") {
            fov(e);
        }
    });
    o.forEach(function (e) {
        if (e.bullet) {
            e.draw();
        }
    });
    o.forEach(function (e) {
        if (!e.bullet) {
            e.draw();
        }
    });

    ctx.restore();

    if (place.placing) {
        draw_obj(place.place_id, m.x, m.y, 0);
    }

    var total_power = 0;
    var total_max_power = 0;

    o.forEach(function (e) {
        if (e.discrim == "p") {
            total_power += e.power;
            total_max_power += e.power_cap;
        }
    })

    ctx.textAlign = "left";
    diep_text("Total Power: " + Math.floor(total_power) + " / " + total_max_power, 10, 25, 24);
    diep_text("Points: " + Math.floor(pt), 10, 50, 24);
    diep_text("Remaining Points: " + Math.floor(get_shape_total_hp().hp / 20) + " / " + max_poly_hp / 20, 10, 75, 24);


    for (var i = 0; 5 > i; i++) {
        diep_icon(1920 - 550 + 110 * i, 10, 100, 100, i);
    }

    ctx.textAlign = "center";

    draw_obj("Basic_Tower", 1920 - 550 + 50, 60, l / 100, true, true);
    diep_text("1 - Tank", 1920 - 550 + 50, 100, 16);
    diep_text("40 Points", 1920 - 550 + 50, 35, 16);

    draw_obj("Relay_Tower", 1920 - 440 + 50, 60, l / 100, true, true);
    diep_text("2 - Relay", 1920 - 440 + 50, 100, 16);
    diep_text("10 Points", 1920 - 440 + 50, 35, 16);

    draw_obj("Generator_Tower", 1920 - 330 + 50, 60, l / 100, true, true);
    diep_text("3 - Generator", 1920 - 330 + 50, 100, 16);
    diep_text("80 Points", 1920 - 330 + 50, 35, 16);

    draw_obj("Healer_Tower", 1920 - 220 + 50, 60, l / 100, true, true);
    diep_text("4 - Healer", 1920 - 220 + 50, 100, 16);
    diep_text("30 Points", 1920 - 220 + 50, 35, 16);

    draw_obj("Miner_Tower", 1920 - 110 + 50, 60, l / 100, true, true);
    diep_text("5 - Miner", 1920 - 110 + 50, 100, 16);
    diep_text("30 Points", 1920 - 110 + 50, 35, 16);


    //reset single-press keys
    kd = new Array(256);

    m.md = [false, false, false];

    ctx.lineDashOffset = l / 2;

    l++;

    m.w = 0;

    requestAnimationFrame(loop);
}

loop();