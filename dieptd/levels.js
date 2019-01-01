//level counter, used for events within levels
var lvi = 0;

//current level
var lv = undefined;
var lvicon = undefined;

var max_poly_hp;

//all levels
var lvls = [
    {
        init: function () {
            o.push(Generator_Tower(0, 0));

            var clump_size = 1200;

            for (var i = 0; 10 > i; i++) {
                o.push(Square_Polygon(Math.random() * clump_size - clump_size / 2, Math.random() * clump_size - clump_size / 2 ));
            }


            for (var i = 0; 8 > i; i++) {
                o.push(Triangle_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
            }


            for (var i = 0; 2 > i; i++) {
                o.push(Pentagon_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
            }
            max_poly_hp = get_shape_total_hp().mhp / 2;
            lvi = 0;
        },
        frame: function () {
            if (between(lvi, 0, 21)) {
                if (kd[39]) {
                    lvi++;
                    if (lvi == 5) {
                        lvi = 4;
                    }
                    if (lvi == 8) {
                        lvi = 7;
                    }
                    if (lvi == 12) {
                        lvi = 11;
                    }
                    if (lvi == 13) {
                        lvi = 14;
                    }
                }
                if (kd[37]) {
                    lvi--;
                    if (lvi == -1) {
                        lvi = 0;
                    }
                }
            }
            if (lvi == 4 && discriminate_by_tank_type("Relay_Tower").length > 0) {
                lvi = 5;
            }
            if (lvi == 7 && discriminate_by_tank_type("Miner_Tower").length > 0) {
                lvi = 8;
            }
            if (lvi == 11 && discriminate_by_tank_type("Basic_Tower").length > 0) {
                lvi = 12;
            }
            if (lvi == 12) {
                o.push(Basic_Tank(2000, 0));
                lvi = 13;
            }
            if (lvi == 13) {
                lvi = 14;
            }



            var diff = 30 * (1 - (get_shape_total_hp().hp / 2) / max_poly_hp);

            if (l % 300 == 0 && diff > 3) {
                for (var i = 0; diff / 3 > i; i++) {
                    o.push(Basic_Tank(1000 * Math.random() + 3000, 1000 * Math.random()));
                }
            }


        },
        draw: function () {
            var texts = [
                "Welcome to DiepTD, the real-time strategy game based on diep.io! Use the right arrow key to continue (left to go back).",
                "Your goal is to build a base which can collect resources, and fight off enemy tanks.",
                "The tower you currently have is called a generator. It generates power for your other towers.",
                "However, while it can generate power, it cannot move it from one tower to another.",
                "Select a relay (using the button or the '2' key). Place it by clicking. Make sure the generator is inside of its range.",//4
                "Now that you have a relay, you can power other tanks. Deselect the relay by right-clicking anyhwere.",
                "What other tanks, you may ask? Get a miner, using either the rightmost button, or the '5' key.",
                "Place it inside of the relay's radius, but also make sure one of the squares, triangles, or pentagons is in its radius.",
                "Miners convert these shapes into points which can be spent on more towers.",//8
                "If you placed the miner wrong, press the 'X' key to remove it. All of your points will be refunded.",
                "Eventually, enemy tanks will begin to attack. You're going to need some defenses.",
                "Place a tank (hotkey 1) to the right of your other towers. That is where the first enemy will be approaching from.",
                "",//12
                "",
                "The enemy tank is approaching now. To see it more easily, move your view by dragging your mouse, or zoom using the +- keys or the mouse wheel.",
                "More enemies will arrive soon. You may want to upgrade your tower to deal with the enemy tanks you will encounter later.",
                "Click the tank to select it. You can upgrade your tower to a twin, a machine gun, or a sniper using the Q, W, or E keys, or the buttons.",//16
                "Your goal is now to mine half of the shapes on the map. Enemy tanks will begin to appear more and more frequently as you mine shapes.",
                "They will appear from a single direction, but you will encounter many of them.",
                "You'll need to get lots of tanks, healers (which heal your tanks), and even generators, in case your power runs out.",
                "Remember: Your goal is to mine HALF of the points on the map! You can see the remaining points you need in the top left corner.",
                "Good luck!",
                ""
            ]
            ctx.textAlign = "center";
            diep_text(texts[lvi], 0, -200, 24);
        

            ctx.textAlign = "left";
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            diep_text("Remaining Points: " + Math.floor((get_shape_total_hp().hp - max_poly_hp) / 20) + " / " + max_poly_hp / 20, 10, 75, 24);
            if (get_shape_total_hp().hp - max_poly_hp < 0) {
                ctx.textAlign = "center";
                diep_text("Level Complete! Press ENTER to continue!", 960, 270, 48);
                if (k[13]) {
                    complete_level(lvicon);
                }
            }
            ctx.restore();
        }
    }, {
        init: function () {
            o.push(Generator_Tower(0, 0));

            var clump_size = 3600;

            for (var i = 0; 60 > i; i++) {
                o.push(Square_Polygon(Math.random() * clump_size - clump_size / 2, Math.random() * clump_size - clump_size / 2 ));
            }


            for (var i = 0; 48 > i; i++) {
                o.push(Triangle_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
            }


            for (var i = 0; 16 > i; i++) {
                o.push(Pentagon_Polygon(Math.random() * clump_size - clump_size / 2 , Math.random() * clump_size - clump_size / 2 ));
            }
            max_poly_hp = get_shape_total_hp().mhp / 2;
            lvi = 0;
        },
        frame: function () {
            if (between(lvi, 0, 3)) {
                if (kd[39]) {
                    lvi++;
                }
                if (kd[37]) {
                    lvi--;
                }
            }


            var diff = 50 * (1 - (get_shape_total_hp().hp / 2) / max_poly_hp);

            if (l % 300 == 0) {
                for (var i = 0; diff > i; i++ ) {
                    var angle = tau * Math.random()
                    switch (Math.floor(Math.random() * 4)) {
                        case 0:
                            o.push(Basic_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
                            break;
                        case 1:
                            if (diff > 3) {
                                o.push(Twin_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
                            } else {
                                o.push(Basic_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
                            }
                            break;
                        case 2:
                            if (diff > 6) {
                                o.push(Triple_Shot_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
                            } else {
                                o.push(Basic_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
                            }
                            break;
                        case 3:
                            if (diff > 9) {
                                o.push(Triplet_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
                            } else {
                                o.push(Basic_Tank(4000 * Math.cos(angle), 4000 * Math.sin(angle)));
                            }
                            break;
                    }
                }
            }



        },
        draw: function () {
            var texts = [
                "This is the first level of Diep TD. Use the right arrow key to continue (left to go back).",
                "Like in the tutorial, your goal here is to mine half of the shapes.",
                "Tanks will attack you from all directions, and many types of powerful tanks will show up as well.",
                "Good luck!",
                ""
            ]
            ctx.textAlign = "center";
            diep_text(texts[lvi], 0, -200, 24);
        

            ctx.textAlign = "left";
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            diep_text("Remaining Points: " + Math.floor((get_shape_total_hp().hp - max_poly_hp) / 20) + " / " + max_poly_hp / 20, 10, 75, 24);
            if (get_shape_total_hp().hp - max_poly_hp < 0) {
                ctx.textAlign = "center";
                diep_text("Level Complete! Press ENTER to continue!", 960, 270, 48);
                if (k[13]) {
                    complete_level(lvicon);
                }
            }
            ctx.restore();
        }
    }
]

lv = lvls[0];