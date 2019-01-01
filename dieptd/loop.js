//o.push(Generator_Tower(0, 0));

// var clump_size = 2000;

// for (var i = 0; 30 > i; i++) {
//     o.push(Square_Polygon(Math.random() * clump_size - clump_size / 2, Math.random() * clump_size - clump_size / 2 ));
// }


// for (var i = 0; 20 > i; i++) {
//     o.push(Triangle_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
// }


// for (var i = 0; 7 > i; i++) {
//     o.push(Pentagon_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
// }

o.push(Upgrade_Menu());

var max_poly_hp = get_shape_total_hp().mhp;

//loop function for the game
function loop() {

    gt = group_towers();

    // var diff = 20 * (1 - get_shape_total_hp().hp / max_poly_hp);

    // if (l % 300 == 0) {
    //     for (var i = 0; diff > i; i++ ) {
    //         var angle = tau * Math.random()
    //         switch (Math.floor(Math.random() * 4)) {
    //             case 0:
    //                 o.push(Basic_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
    //                 break;
    //             case 1:
    //                 if (diff > 3) {
    //                     o.push(Twin_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
    //                 } else {
    //                     o.push(Basic_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
    //                 }
    //                 break;
    //             case 2:
    //                 if (diff > 6) {
    //                     o.push(Triple_Shot_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
    //                 } else {
    //                     o.push(Basic_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
    //                 }
    //                 break;
    //             case 3:
    //                 if (diff > 9) {
    //                     o.push(Triplet_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
    //                 } else {
    //                     o.push(Basic_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
    //                 }
    //                 break;
    //         }
    //     }
    // }

    ctx.fillStyle = "#EEEEEE";
    ctx.fillRect(0, 0, c.width, c.height);

    lv.frame();

    //remove those with no hp
    for (var i = 0; o.length > i; i++) {
        if (o[i].hp <= 0) {
            o.splice(i, 1);
            i--;
        }
    }
    
    for (var i = 0; o.length > i; i++) {
        o[i].action(o[i]);
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

    if (place.placing && m.md[0] && pt > tank_from_string(place.place_id, tmc.x, tmc.y)().cost) {
        pt -= tank_from_string(place.place_id, tmc.x, tmc.y)().cost;
        o.push(tank_from_string(place.place_id, tmc.x, tmc.y)());
        place.placing = false;
    }

    //handle placing
    if (kd[49]) {
        place.placing = true;
        place.place_id = "Basic_Tower";
    }

    if (kd[50]) {
        place.placing = true;
        place.place_id = "Relay_Tower";
    }

    if (kd[51]) {
        place.placing = true;
        place.place_id = "Generator_Tower";
    }

    if (kd[52]) {
        place.placing = true;
        place.place_id = "Healer_Tower";
    }

    if (kd[53]) {
        place.placing = true;
        place.place_id = "Miner_Tower";
    }

    if (!select.selecting) {
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

        if (kd[52] || click_in_rect(1920 - 220, 10, 100, 100)) {
            place.placing = true;
            place.place_id = "Healer_Tower";
        }

        if (kd[53] || click_in_rect(1920 - 110, 10, 100, 100)) {
            place.placing = true;
            place.place_id = "Miner_Tower";
        }
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

    if (m.md[0] && dist_to_obj({ x: tmc.x, y: tmc.y }, closest_to_mouse) < 50) {
        o.push(Upgrade_Menu(closest_to_mouse.tank_type));
        select.selecting = true;
        select.selection = closest_to_mouse;
        select.selection_index = closest_to_mouse_index;
    }

    if (m.m[2]) {
        select.selecting = false;
    }

    if (select.selecting) {
        upgrade_buttons(get_upgrades_for_tank(select.selection.tank_type));
        handle_upgrades();
    }

    if (!select.selecting) {
        o.push(Upgrade_Menu());
    }

    //do all drawing for all things
    o.forEach(function (e) {
        if (e.discrim == "p") {
            fov(e);
        }
    });
    o.forEach(function (e) {
        if (e.bullet) {
            e.draw(e);
        }
    });
    o.forEach(function (e) {
        if (!e.bullet) {
            e.draw(e);
        }
    });

    lv.draw();

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

    //reset single-press keys
    kd = new Array(256);

    m.md = [false, false, false];

    ctx.lineDashOffset = l / 2;

    l++;

    m.w = 0;

    requestAnimationFrame(loop);
}



function load_level(level) {
    l = 0;
    lvi = 0;
    level.init();
    lv = level;
    loop();
}


load_level(lvls[0]);
//loop();