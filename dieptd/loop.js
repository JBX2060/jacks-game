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
    if (kd["f"]) {
        fov_toggle = !fov_toggle;
    }

    //handle scaling
    scale.factor = Math.pow(2, scale.log);

    if (k["="]) {
        scale.d += 0.02;
    }

    if (k["-"]) {
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

    if (kd["d"]) {
        drag_toggle = !drag_toggle;
    }

    if (kd["ArrowUp"]) {
        speed_index++;
    }

    if (kd["ArrowDown"]) {
        speed_index--;
    }

    speed_index = clamp(speed_index, 0, speeds.length - 1);

    //handle placing
    if (kd["1"]) {
        place.placing = true;
        place.place_id = "Basic_Tower";
    }

    if (kd["2"]) {
        place.placing = true;
        place.place_id = "Relay_Tower";
    }

    if (kd["3"]) {
        place.placing = true;
        place.place_id = "Generator_Tower";
    }

    if (kd["4"]) {
        place.placing = true;
        place.place_id = "Healer_Tower";
    }

    if (kd["5"]) {
        place.placing = true;
        place.place_id = "Miner_Tower";
    }

    if (!select.selecting) {
        if (click_in_rect(1920 - 550, 10, 100, 100)) {
            place.placing = true;
            place.place_id = "Basic_Tower";
        }

        if (click_in_rect(1920 - 440, 10, 100, 100)) {
            place.placing = true;
            place.place_id = "Relay_Tower";
        }

        if (click_in_rect(1920 - 330, 10, 100, 100)) {
            place.placing = true;
            place.place_id = "Generator_Tower";
        }

        if (click_in_rect(1920 - 220, 10, 100, 100)) {
            place.placing = true;
            place.place_id = "Healer_Tower";
        }

        if (click_in_rect(1920 - 110, 10, 100, 100)) {
            place.placing = true;
            place.place_id = "Miner_Tower";
        }
    }

    if (place.placing && m.m[2]) { 
        place.placing = false;
    }

    if (l % Math.floor(speeds[speed_index]) == 0 || speed_index < 2) {
        //translate by position
        ctx.save();
        ctx.translate(960, 540);
        ctx.scale(scale.factor, scale.factor);
        ctx.translate(-pos.x, -pos.y);

        //handle selection
        if (o.filter(e => { return e.discrim == "p"; }).length != 0) {
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
        }

        //do all drawing for all things

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = "#EEEEEE";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.restore();
    
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
        ctx.textAlign = "right";
        diep_text("Game Speed: " + speeds[speed_index] + "x", 1910, 140, 24);

    }
    //reset single-press keys
    kd = {};

    m.md = [false, false, false];

    ctx.lineDashOffset = l / 2;

    l++;

    m.w = 0;

    if (o.filter(e => { return e.discrim == "p" }).length == 0) {
        switch_to_menu = true;
    }

    if (!switch_to_menu) {
        if (speed_index == 2) {
            requestAnimationFrame(loop);
        } else {
            setTimeout(loop, (1000 / 60) / speeds[speed_index]);
        }
    } else {
        menu_loop();
    }
}

function menu_loop() {

    drag_toggle = true;

    //handle scaling
    scale.factor = Math.pow(2, scale.log);

    if (k["="]) {
        scale.d += 0.02;
    }

    if (k["-"]) {
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

    ctx.fillStyle = "#EEEEEE";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.save();
    ctx.translate(960, 540);
    ctx.scale(scale.factor, scale.factor);
    ctx.translate(-pos.x, -pos.y);

    ctx.textAlign = "center";
    diep_text("Controls:", 0, -400, 24);
    diep_text("Use buttons or hotkeys listed on buttons to place/upgrade towers.", 0, -400 + 24, 24);
    diep_text("Click to select or put down a tower.", 0, -400 + 48, 24);
    diep_text("Right click to deselect or cancel placement.", 0, -400 + 72, 24);
    diep_text("X to delete the selected tower.", 0, -400 + 96, 24);
    diep_text("Drag the mouse to move the view, and use the +- keys or the scroll wheel to zoom.", 0, -400 + 120, 24);

    menu_icons.forEach(function (e) {
        ctx.textAlign = "center";
        if (!e.unlocked) {
            diep_icon(e.x, e.y, 100, 100, 2);
        } else if (!e.complete) {
            diep_icon(e.x, e.y, 100, 100, 3);
        } else {
            diep_icon(e.x, e.y, 100, 100, 1);
        }
        diep_text(e.text, e.x + 50, e.y + 30, 12);
        if (e.unlocked) {
            diep_text("Unlocked", e.x + 50, e.y + 54, 12);
            if (transform_click_in_rect(e.x, e.y, 100, 100)) {
                load_level(e);
            }
        } else {
            diep_text("Locked", e.x + 50, e.y + 54, 12);
        }
        if (e.complete) {
            diep_text("Complete", e.x + 50, e.y + 78, 12);
        } else {
            diep_text("Not Complete", e.x + 50, e.y + 78, 12);
        }
    });

    ctx.restore();

    if (switch_to_menu) {
        requestAnimationFrame(menu_loop);
    } else {
        loop();
    }

    m.w = 0;

}



function load_level(level) {
    if (switch_to_menu) {
        pos.x = 0;
        pos.y = 0;
        scale.factor = 0;
        o = [];
        l = 0;
        lvi = 0;
        pt = 300;
        level.lvl.init();
        lv = level.lvl;
        lvicon = level
        switch_to_menu = false;
    }
}


function complete_level(level) {
    lvicon.complete = true;
    lvicon.unlocks.forEach(function (e) {
        menu_icons[e].unlocked = true;
    });
    switch_to_menu = true;
}


//load_level(lvls[0]);
menu_loop();