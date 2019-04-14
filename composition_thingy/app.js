//canvas stuff
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

//player
var p = {
    x: 128,
    y: 128,
    dx: 0,
    dy: 0
};

//game object
class GameObj {
    constructor(x, y, hitbox, move, init) {
        this.hb = hitbox;
        this.m = move;
        this.x = x;
        this.y = y;
        this.kill = false;
        this.gameobj = true;
        init(this);
    }

    frame() {
        this.m(this);
        this.hb.forEach(e => {
            if (p.x > e.x + this.x && p.x < e.x + e.w + this.x && p.y > e.y + this.y && p.y < e.y + e.h + this.y) {
                t = -1;
                o = [];
                audio.currentTime = 0;
            }
        });
    }

    draw() {
        ctx.fillStyle = "#EEEEEE";
        this.hb.forEach(e => {
            ctx.fillRect(Math.round(e.x + this.x), Math.round(e.y + this.y), Math.round(e.w), Math.round(e.h));
        });
    }
}

//background details
class Detail {
    constructor(x, y, hb, move, init) {
        this.x = x;
        this.y = y;
        this.hb = hb;
        this.m = move;
        this.init = init;
        this.kill = false;
        this.init(this);
    }

    frame() {
        this.m(this);
    }

    draw() {
        ctx.fillStyle = "#555555";
        this.hb.forEach(e => {
            ctx.fillRect(Math.round(e.x + this.x), Math.round(e.y + this.y), Math.round(e.w), Math.round(e.h));
        });
    }

}

//global time
var t = 0;

//all in-game objects
var o = [];

//keyboard controls
var k = {};
document.addEventListener("keydown", e => {
    k[e.key] = true;
}, false);
document.addEventListener("keyup", e => {
    k[e.key] = false;
}, false);

function juliaRect(x, y, w, h, iterations, resx, resy, real, imag) {
    var mData = [];
    for (var i = 0; resy > i; i++) {
        mData.push([]);
        for (var i2 = 0; resx > i2; i2++) {
            mData[i].push({
                iterations: 0,
                path: [{
                    x: x + i2 * (w / resx),
                    y: y + i * (h / resy)
                }],
                in: true,
                pos: {
                    x: x + i2 * (w / resx),
                    y: y + i * (h / resy)
                }
            });
            for (var i3 = 0; iterations > i3 && Math.sqrt(Math.pow(mData[i][i2].path[mData[i][i2].path.length - 1].x, 2) + Math.pow(mData[i][i2].path[mData[i][i2].path.length - 1].y, 2)) < 2; i3++) {
                mData[i][i2].path.push({
                    x: Math.pow(mData[i][i2].path[i3].x, 2) - Math.pow(mData[i][i2].path[i3].y, 2) + real,
                    y: 2 * mData[i][i2].path[i3].x * mData[i][i2].path[i3].y + imag
                });
                if (Math.sqrt(Math.pow(mData[i][i2].path[i3 + 1].x, 2) + Math.pow(mData[i][i2].path[i3 + 1].y, 2)) > 2) {
                    mData[i][i2].in = false;
                } else if (mData[i][i2].in) {
                    mData[i][i2].iterations++;
                }
            }
        }
    }
    return mData;
}

function juliaSet(real, imag) {
    return new GameObj(0, 0, [], a => {
        a.index2 *= 1.05;
        a.addedBefore = 0;
        for (var i2 = 0; Math.floor(a.index2 - 1) > i2; i2++) {
            var fractal = juliaRect(-1.25 + a.index / (64 / 1.25), -1.25, 2.5, 2.5, 32, 1, 128, a.real, a.imag);
            for (var i = 0; fractal.length > i; i++) {
                if (fractal[i][0].iterations < 30) {
                    a.hb.push({
                        x: a.index * 2,
                        y: i * 2,
                        w: 2,
                        h: 2
                    });
                    a.addedBefore++;
                }
            }
            a.index++;
        }
        a.hb.splice(0, a.addedBefore2);
        a.addedBefore2 = a.addedBefore
        if (a.index > 150) {
            a.kill = true;
        }
    }, a => {
        a.index = 0;
        a.index2 = 1;
        a.real = real;
        a.imag = imag;
        a.addedBefore2 = 0;
    });
}

function bgJuliaSet(real, imag) {
    return new Detail(0, 0, [], a => {
        a.index2 *= 1.05;
        a.addedBefore = 0;
        for (var i2 = 0; Math.floor(a.index2 - 1) > i2; i2++) {
            var fractal = juliaRect(-1.25 + a.index / (64 / 1.25), -1.25, 2.5, 2.5, 32, 1, 128, a.real, a.imag);
            for (var i = 0; fractal.length > i; i++) {
                if (fractal[i][0].iterations < 30) {
                    a.hb.push({
                        x: a.index * 2,
                        y: i * 2,
                        w: 2,
                        h: 2
                    });
                    a.addedBefore++;
                }
            }
            a.index++;
        }
        a.hb.splice(0, a.addedBefore2);
        a.addedBefore2 = a.addedBefore
        if (a.index > 150) {
            a.kill = true;
        }
    }, a => {
        a.index = 0;
        a.index2 = 1;
        a.real = real;
        a.imag = imag;
        a.addedBefore2 = 0;
    });
}


function simpleParticle(x, y, dir, accel, r, l) {
    return new GameObj(x, y, [{
        x: -r,
        y: -r,
        w: 2 * r,
        h: 2 * r
    }], a => {
        a.d += a.accel;
        a.x += Math.cos(a.dir) * a.d;
        a.y += Math.sin(a.dir) * a.d;
        if (Math.random() > 0.5) {
            o.push(trail(a.x, a.y, a.dir + Math.PI + Math.random() * 1.5 - 0.75, a.d, Math.random() * 8 + 4));
        }
        a.life--;
        if (a.life < 0) {
            a.kill = true;
        }
    }, a => {
        a.dir = dir;
        a.accel = accel;
        a.d = 0;
        a.life = l;
        a.r = r;
    });
}

function eParticle(x, y, dir, accel, r, l) {
    return new GameObj(x, y, [{
        x: -r,
        y: -r,
        w: 2 * r,
        h: 2 * r
    }], a => {
        a.d *= a.accel;
        a.x += Math.cos(a.dir) * a.d;
        a.y += Math.sin(a.dir) * a.d;
        if (Math.random() > 0.5) {
            o.push(trail(a.x, a.y, a.dir + Math.PI + Math.random() * 1.5 - 0.75, a.d, Math.random() * 8 + 4));
        }
        a.life--;
        if (a.life < 0) {
            a.kill = true;
        }
    }, a => {
        a.dir = dir;
        a.accel = accel;
        a.d = 0.1;
        a.life = l;
        a.r = r;
    });
}

function trail(x, y, dir, d, l) {
    return new Detail(x, y, [{
        x: -1,
        y: -1,
        w: 2,
        h: 2
    }], a => {
        a.d *= 0.9;
        a.x += Math.cos(a.dir) * a.d;
        a.y += Math.sin(a.dir) * a.d;
        if (a.life < 0) {
            a.kill = true;
        }
        a.life--;
    }, a => {
        a.dir = dir;
        a.d = d;
        a.life = l;
    });
}

function particleLine(dir, count) {
    switch (dir) {
        case 0:
            for (var i = 0; count > i; i++) {
                o.push(simpleParticle(-3, i * 256 / count + 128 / count, 0, 0.05, 3, 140));
            }
            break;
        case 1:
            for (var i = 0; count > i; i++) {
                o.push(simpleParticle(i * 256 / count + 128 / count, -3, Math.PI / 2, 0.05, 3, 140));
            }
            break;
        case 2:
            for (var i = 0; count > i; i++) {
                o.push(simpleParticle(259, i * 256 / count + 128 / count, Math.PI, 0.05, 3, 140));
            }
            break;
        case 3:
            for (var i = 0; count > i; i++) {
                o.push(simpleParticle(i * 256 / count + 128 / count, 259, 3 * Math.PI / 2, 0.05, 3, 140));
            }
            break;
    }
}

function particleArc(dir, count) {
    switch (dir) {
        case 0:
            for (var i = 0; count > i; i++) {
                o.push(simpleParticle(0, 0, Math.PI / count / 2 * i + Math.PI / count / 4, 0.03, 3, 200));
            }
            break;
        case 1:
            for (var i = 0; count > i; i++) {
                o.push(simpleParticle(256, 0, Math.PI / count / 2 * i + Math.PI / count / 4 + Math.PI / 2, 0.03, 3, 200));
            }
            break;
        case 2:
            for (var i = 0; count > i; i++) {
                o.push(simpleParticle(256, 256, Math.PI / count / 2 * i + Math.PI / count / 4 + Math.PI, 0.03, 3, 200));
            }
            break;
        case 3:
            for (var i = 0; count > i; i++) {
                o.push(simpleParticle(0, 256, Math.PI / count / 2 * i + Math.PI / count / 4, 0.03 + Math.PI * 3 / 2, 3, 200));
            }
            break;
    }
}

function pTrail(x, y, dir, vel, time) {
    return new GameObj(x, y, [], a => {
        o.push(eParticle(a.x, a.y, a.life, 1.02, 4, 550));
        a.x += Math.cos(a.dir) * a.d;
        a.y += Math.sin(a.dir) * a.d;
        a.life++;
        if (a.life > a.time) {
            a.kill = true;
        }
    }, a => {
    	if (!time) {
        	a.time = 32;
        } else {
        	a.time = time;
        }
        a.life = 0;
        a.dir = dir;
        a.d = vel;
    });
}

// var pt = [{
//         time: 0,
//         f: a => {
//             for (var i = 0; 5 > i; i++) {
//                 o.push(simpleParticle(0, 0, Math.PI / 10 * i + Math.PI / 20, 0.03, 3, 200));
//             }
//         }
//     },
//     {
//         time: 20,
//         f: a => particleLine(0, 7)
//     },
//     {
//         time: 80,
//         f: a => {
//             for (var i = 0; 5 > i; i++) {
//                 o.push(simpleParticle(256, 256, Math.PI + Math.PI / 10 * i + Math.PI / 20, 0.03, 3, 200));
//             }
//         }
//     },
//     {
//         time: 100,
//         f: a => particleLine(2, 7)
//     },
//     {
//         start: 170,
//         end: 300,
//         f: a => {
//             if (t % 10 == 0) {
//                 o.push(simpleParticle(128 + Math.cos(t / 10) * 191, 128 + Math.sin(t / 10) * 191, Math.PI + t / 10, 0.04, 3, 300))
//             }
//         }
//     },
//     {
//         time: 360,
//         f: a => o.push(pTrail(0, 128, 0, 8))
//     },
//     {
//         time: 460,
//         f: a => o.push(pTrail(128, 0, Math.PI * 0.5, 8))
//     },
//     {
//     	time: 560,
//         f: a => o.push(pTrail(0, 0, Math.PI * 0.25, 8, 46))
//     },
//     {
//     	time: 660,
//         f: a => o.push(pTrail(256, 0, Math.PI * 0.75, 8, 46))
//     },
//     {
//     	start: 800,
//         end: 900,
//         f: a => {
//         	if (Math.round(Math.sqrt(100 - a)) == Math.sqrt(100 - a)) {
//             	o.push(bgJuliaSet(-0.8, 0.156));
//             }
//         }
//     },
//     {
//     	time: 901,
//         f: a => {
//         	o.push(juliaSet(-0.8, 0.156));
//             particleLine(1, 5);
//             particleLine(3, 6);
//         }
//     },
//     {
//     	start: 950,
//         end: 900,
//         f: a => {
//         	if (Math.round(Math.sqrt(100 - a)) == Math.sqrt(100 - a)) {
//             	o.push(bgJuliaSet(-0.8, 0.156));
//             }
//         }
//     },
//     {
//     	time: 901,
//         f: a => {
//         	o.push(juliaSet(-0.8, 0.156));
//             particleLine(1, 5);
//             particleLine(3, 6);
//         }
//     }
// ]

var pt = [];

function ae(measure, beat, event) {
    pt.push({
        time: measure * 120 + beat * 10,
        f: event
    });
}

// ae(0, 0, a => {
//     particleLine(1, 5);
//     particleLine(3, 6);
// });

// ae(0, 6, a => {
//     particleLine(0, 5);
//     particleLine(2, 6);
// });

ae(0, 0, a => particleLine(0, 6));

ae(0, 3, a => particleLine(1, 2));
ae(0, 4, a => particleLine(1, 3));
ae(0, 5, a => particleLine(1, 4));
ae(0, 6, a => particleLine(1, 5));

ae(0, 9, a => particleLine(2, 2));
ae(0, 10, a => particleLine(2, 3));
ae(0, 11, a => particleLine(2, 4));
ae(0, 12, a => particleLine(2, 5));

ae(1, 0, a => particleLine(3, 2));
ae(1, 1, a => particleLine(3, 3));
ae(1, 2, a => particleLine(3, 4));
ae(1, 3, a => particleLine(3, 5));

ae(1, 6, a => particleLine(0, 2));
ae(1, 7, a => particleLine(0, 3));
ae(1, 8, a => particleLine(0, 4));
ae(1, 9, a => particleLine(0, 5));

ae(2, 3, a => particleLine(1, 3));
ae(2, 4, a => particleLine(1, 4));
ae(2, 5, a => particleLine(1, 5));
ae(2, 6, a => particleLine(1, 6));

ae(2, 9, a => particleLine(2, 3));
ae(2, 10, a => particleLine(2, 4));
ae(2, 11, a => particleLine(2, 5));
ae(2, 12, a => particleLine(2, 6));

ae(3, 0, a => particleLine(3, 3));
ae(3, 1, a => particleLine(3, 4));
ae(3, 2, a => particleLine(3, 5));
ae(3, 3, a => particleLine(3, 6));
ae(3, 4, a => particleLine(3, 7));
ae(3, 5, a => particleLine(3, 8));
ae(3, 6, a => particleLine(3, 9));

ae(3, 9, a => particleLine(1, 5));
ae(3, 9, a => particleLine(3, 6));

ae(4, 0, a => o.push(pTrail(0, 128, 0, 8, 32)));

ae(4, 3, a => particleArc(1, 2));
ae(4, 4, a => particleArc(1, 3));
ae(4, 5, a => particleArc(1, 4));
ae(4, 6, a => particleArc(1, 5));

//looping function
function loop() {

    pt.forEach(function(e) {
        if ((t >= e.start && t <= e.end) || t == e.time) {
            e.f(t - e.start);
        }
    });

    o.forEach(function(e) {
        e.frame();
    });

    for (var i = 0; o.length > i; i++) {
        if (o[i].kill) {
            o.splice(i, 1);
            i--;
        }
    }

    if (k["w"] || k["ArrowUp"]) {
        p.dy--;
    }
    if (k["a"] || k["ArrowLeft"]) {
        p.dx--;
    }
    if (k["s"] || k["ArrowDown"]) {
        p.dy++;
    }
    if (k["d"] || k["ArrowRight"]) {
        p.dx++;
    }

    p.x += p.dx;
    p.y += p.dy;
    p.dx *= 0.5;
    p.dy *= 0.5;


    c.style.width = window.innerHeight + "px";
    c.style.height = window.innerHeight + "px";

    ctx.fillStyle = "#333333FF";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#EEEEEE";
    ctx.fillRect(p.x - 2, p.y - 2, 4, 4);

    o.forEach(function(e) {
        if (!e.gameobj) {
            e.draw();
        }
    });
    o.forEach(function(e) {
        if (e.gameobj) {
            e.draw();
        }
    });

    t++;

    requestAnimationFrame(loop);
}

var audio = new Audio("idk.mp3");

function preloop() {
    if (k["w"] || k["a"] || k["s"] || k["d"] || k["ArrowUp"] || k["ArrowDown"] || k["ArrowRight"] || k["ArrowLeft"]) {
        loop();
        audio.play();
    } else {
        console.log("test");
        setTimeout(preloop, 100);
    }
}

preloop();
