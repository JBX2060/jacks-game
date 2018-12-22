o.push(Generator_Tower(1820, 980));

o.push(Square_Polygon(500, 500));

for (var i = 1; 4 > i; i++) {
    o.push(Relay_Tower(1920 - 250 * i, 1080 - 250 * i));
}


for (var i = 0; 12 > i; i++) {
    o.push(Triple_Shot_Tower(Math.random() * c.width / 2 + c.width / 2, Math.random() * c.height));
}

for (var i = 0; 2 > i; i++ ) {
    o.push(Basic_Tank(Math.random() * c.width / 2, Math.random() * c.height));
    o.push(Twin_Tank(Math.random() * c.width / 2, Math.random() * c.height));
    o.push(Triple_Shot_Tank(Math.random() * c.width / 2, Math.random() * c.height));
    o.push(Triplet_Tank(Math.random() * c.width / 2, Math.random() * c.height));
}

//loop function for the game
function loop() {

    ctx.clearRect(0, 0, c.width, c.height);

    //do all actions for all things
    o.forEach(function (e) {
        e.action();
    });

    //remove those with no hp
    for (var i = 0; o.length > i; i++) {
        if (o[i].hp <= 0) {
            o.splice(i, 1);
            i--;
        }
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
    requestAnimationFrame(loop);
}

loop();