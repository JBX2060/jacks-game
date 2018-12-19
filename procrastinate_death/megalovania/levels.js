//x, y, width, height
function rect(x, y, w, h) {
    return {
        x: x,
        y: y,
        w: w,
        h: h
    };
}

function rect90(x, y, w, h) {
    return {
        x: y,
        y: x,
        w: h,
        h: w
    };
}

function rotateRects(rects, x, y, angle) {
    var returnRects = [];
    for (var i = 0; rects.length > i; i++) {
        returnRects.push({
            x: rects[i].x - x,
            y: rects[i].y - y,
            angle: Math.atan2(rects[i].h, rects[i].w) + angle,
            magnitude: dist(rects[i].w, rects[i].h)
        }); 
    }
    returnRects2 = [];
    for (var i = 0; returnRects.length > i; i++) {
        returnRects2.push({
            x: Math.cos(Math.atan2(returnRects[i].y, returnRects[i].x) + angle) + x,
            y: Math.sin(Math.atan2(returnRects[i].y, returnRects[i].x) + angle) + y,
            w: Math.cos(returnRects[i].angle) * returnRects[i].magnitude,
            h: Math.sin(returnRects[i].angle) * returnRects[i].magnitude
        });
    }
    return returnRects2;
}

function charRects(char) {
    switch (char) {
        case "A":
            return [
                rect(0, 0, 3, 21),
                rect(3, 0, 3, 3),
                rect(3, 9, 3, 3),
                rect(6, 0, 3, 21)
            ];
        case "B":
            return [
                rect(0, 0, 3, 21),
                rect(3, 0, 3, 3),
                rect(3, 18, 3, 3),
                rect(6, 3, 3, 15),
                rect(3, 9, 3, 3)
            ];
        case "C":
            return [
                rect(0, 0, 3, 21),
                rect(3, 0, 6, 3),
                rect(3, 18, 6, 3)
            ]
        case "D":
            return [
                rect(0, 0, 3, 21),
                rect(3, 0, 3, 3),
                rect(3, 18, 3, 3),
                rect(6, 3, 3, 15)
            ];
        case "E":
            return [
                rect(3, 0, 6, 3),
                rect(0, 0, 3, 21),
                rect(3, 9, 6, 3),
                rect(3, 18, 6, 3)
            ]
        case "F":
            return [];
        case "G":
            return [
                rect(0, 0, 3, 21),
                rect(3, 0, 6, 3),
                rect(3, 18, 6, 3),
                rect(6, 12, 3, 6)
            ];
        case "H":
            return [
                rect(0, 0, 3, 21),
                rect(6, 0, 3, 21),
                rect(3, 9, 3, 3),
            ];
        case "I":
            return [
                rect(0, 0, 9, 3),
                rect(3, 3, 3, 18),
                rect(0, 18, 9, 3)
            ];
        case "J":
            return [];
        case "K":
            return [];
        case "L":
            return [];
        case "M":
            return [
                rect(0, 0, 3, 21),
                rect(6, 0, 3, 21),
                rect(3, 9, 3, 9),];
        case "N":
            return [
                rect(0, 0, 3, 21),
                rect(6, 0, 3, 21),
                rect(3, 6, 3, 9),
            ];
        case "O":
            return [
                rect(0, 0, 3, 21),
                rect(3, 0, 3, 3),
                rect(3, 18, 3, 3),
                rect(6, 0, 3, 21)
            ];
        case "P":
            return [
                rect(0, 0, 3, 21),
                rect(3, 0, 3, 3),
                rect(3, 9, 3, 3),
                rect(6, 0, 3, 12)
            ];
        case "Q":
            return [];
        case "R":
            return [
                rect(0, 0, 3, 21),
                rect(3, 0, 3, 3),
                rect(3, 9, 3, 3),
                rect(6, 0, 3, 9),
                rect(6, 12, 3, 9)
            ];
        case "S":
            return [   
                rect(0, 0, 9, 3),
                rect(0, 3, 3, 6),
                rect(0, 9, 9, 3),
                rect(6, 12, 3, 6),
                rect(0, 18, 9, 3)
            ];
        case "T":
            return [
                rect(0, 0, 9, 3),
                rect(3, 3, 3, 18)
            ];
        case "U":
            return [];
        case "V":
            return [
                rect(0, 0, 3, 15),
                rect(3, 15, 3, 6),
                rect(6, 0, 3, 15)
            ];
        case "W":
            return [
                rect(0, 0, 3, 21),
                rect(6, 0, 3, 21),
                rect(3, 12, 3, 9),
            ];
        case "X":
            return [];
        case "Y":
            return [
                rect(0, 0, 3, 9),
                rect(3, 9, 3, 12),
                rect(6, 0, 3, 9)
            ];
        case "Z":
            return [];
        case " ":
            return [];
    }
}

function last() {
    return o[o.length - 1];
}

function simpleSquare(x, y, speed, decay, angle) {
    o.push(new rectEntity(x, y, [rect(0, 0, 8, 8)], (e) => {
        e.x += Math.cos(e.angle) * e.t / 25 * speed;
        e.y += Math.sin(e.angle) * e.t / 25 * speed;
        var mySize = Math.floor(decay * e.t / 45);
        e.rects[0] = rect(mySize, mySize, 8 - mySize * 2, 8 - mySize * 2);
        if (e.t > 180 / decay) {
            e.remove = true;
        }
    }));
    last().angle = angle
}

function bar(direction, speed, decay) {
    switch (direction) {
        case 0:
            o.push(new rectEntity(player.x, 256, [rect(-8, 0, 16, 256)], (e) => {
                e.y -= e.t;
                e.y = clamp(e.y, 0, 256);
                if (e.t > 22) {
                    e.remove = true;
                    for (var i = 0; 32 > i; i++) {
                        for (var i2 = 0; 2 > i2; i2++) {
                            simpleSquare(e.x + i2 * 8 - 8, e.y + i * 8, speed, decay, (i2 + 2 * i) / 7);
                        }
                    }
                }
            }));
            break;
        case 1:
            o.push(new rectEntity(256, player.y, [rect(0, -8, 256, 16)], (e) => {
                e.x -= e.t;
                e.x = clamp(e.x, 0, 256);
                if (e.t > 22) {
                    e.remove = true;
                    for (var i = 0; 32 > i; i++) {
                        for (var i2 = 0; 2 > i2; i2++) {
                            simpleSquare(e.x + i * 8, e.y + i2 * 8 - 8, speed, decay, (i2 + 2 * i) / 7);
                        }
                    }
                }
            }));
            break;
        case 2:
            o.push(new rectEntity(player.x, -256, [rect(-8, 0, 16, 256)], (e) => {
                e.y += e.t;
                e.y = clamp(e.y, -256, 0);
                if (e.t > 22) {
                    e.remove = true;
                    for (var i = 0; 32 > i; i++) {
                        for (var i2 = 0; 2 > i2; i2++) {
                            simpleSquare(e.x + i2 * 8 - 8, e.y + i * 8, speed, decay, (i2 + 2 * i) / 7);
                        }
                    }
                }
            }));
            break;
        case 3:
            o.push(new rectEntity(-256, player.y, [rect(0, -8, 256, 16)], (e) => {
                e.x += e.t;
                e.x = clamp(e.x, -256, 0);
                if (e.t > 22) {
                    e.remove = true;
                    for (var i = 0; 32 > i; i++) {
                        for (var i2 = 0; 2 > i2; i2++) {
                            simpleSquare(e.x + i * 8, e.y + i2 * 8 - 8, speed, decay, (i2 + 2 * i) / 7);
                        }
                    }
                }
            }));
            break;
    }
}

function bone(length, direction) {
    if (direction == "vertical") {
        return [
            rect(0, 0, 4, 4),
            rect(6, 0, 4, 4),
            rect(2, 2, 6, length),
            rect(0, length + 1, 4, 4),
            rect(6, length + 1, 4, 4)
        ]
    }
    if (direction == "horizontal") {
        return [
            rect(0, 0, 4, 4),
            rect(0, 6, 4, 4),
            rect(2, 2, length, 6),
            rect(length + 1, 0, 4, 4),
            rect(length + 1, 6, 4, 4)
        ]
    }
}

function b(dir) {
    if (dir == 0) {
        o.push(new rectEntity(player.x - 5, 256, bone(256, "vertical"), function (e) {
            e.y -= e.t / 0.8;
            if (e.y < 0) {
                e.y = 0;
            }
            if (e.t > 22) {
                e.remove = true;
                for (var i = 0; 32 > i; i++) {
                    simpleSquare(e.x, i * 8, 0.8, 15, Math.PI * (i % 2));
                }
            }
        }));
    } else if (dir == 1) {
        o.push(new rectEntity(256, player.y - 5, bone(256, "horizontal"), function (e) {
            e.x -= e.t / 0.8;
            if (e.x < 0) {
                e.x = 0;
            }
            if (e.t > 22) {
                e.remove = true;
                for (var i = 0; 32 > i; i++) {
                    simpleSquare(i * 8, e.y, 0.8, 15, Math.PI * (i % 2) + Math.PI / 2);
                }
            }
        }));
    } else if (dir == 2) {
        o.push(new rectEntity(player.x - 5, -256, bone(256, "vertical"), function (e) {
            e.y += e.t / 0.8;
            if (e.y > 0) {
                e.y = 0;
            }
            if (e.t > 22) {
                e.remove = true;
                for (var i = 0; 32 > i; i++) {
                    simpleSquare(e.x, i * 8, 0.8, 15, Math.PI * (i % 2));
                }
            }
        }));
    } else if (dir == 3) {
        o.push(new rectEntity(-256, player.y - 5, bone(256, "horizontal"), function (e) {
            e.x += e.t / 0.8;
            if (e.x > 0) {
                e.x = 0;
            }
            if (e.t > 22) {
                e.remove = true;
                for (var i = 0; 32 > i; i++) {
                    simpleSquare(i * 8, e.y, 0.8, 15, Math.PI * (i % 2) + Math.PI / 2);
                }
            }
        }));
    }
}

function bcomplex(dir, pos, spd, life) {
    if (dir == 0) {
        o.push(new rectEntity(pos - 5, 256, bone(256, "vertical"), function (e) {
            e.y -= e.t * spd;
            if (e.y < 0) {
                e.y = 0;
            }
            if (e.t > life) {
                e.remove = true;
                for (var i = 0; 32 > i; i++) {
                    simpleSquare(e.x, i * 8, 0.8, 15, Math.PI * (i % 2));
                }
            }
        }));
    } else if (dir == 1) {
        o.push(new rectEntity(256, pos - 5, bone(256, "horizontal"), function (e) {
            e.x -= e.t * spd;
            if (e.x < 0) {
                e.x = 0;
            }
            if (e.t > life) {
                e.remove = true;
                for (var i = 0; 32 > i; i++) {
                    simpleSquare(i * 8, e.y, 0.8, 15, Math.PI * (i % 2) + Math.PI / 2);
                }
            }
        }));
    } else if (dir == 2) {
        o.push(new rectEntity(pos - 5, -256, bone(256, "vertical"), function (e) {
            e.y += e.t * spd;
            if (e.y > 0) {
                e.y = 0;
            }
            if (e.t > life) {
                e.remove = true;
                for (var i = 0; 32 > i; i++) {
                    simpleSquare(e.x, i * 8, 0.8, 15, Math.PI * (i % 2));
                }
            }
        }));
    } else if (dir == 3) {
        o.push(new rectEntity(-256, pos - 5, bone(256, "horizontal"), function (e) {
            e.x += e.t * spd;
            if (e.x > 0) {
                e.x = 0;
            }
            if (e.t > life) {
                e.remove = true;
                for (var i = 0; 32 > i; i++) {
                    simpleSquare(i * 8, e.y, 0.8, 15, Math.PI * (i % 2) + Math.PI / 2);
                }
            }
        }));
    }
}

function imageFromUrl(url) {
    var img = new Image();
    img.src = url;
    return img;
}

var sans = imageFromUrl("sans.png");

function measure(num, fs) {
    for (var i = 0; 16 > i; i++) {
        if (t == num * 120 + Math.round(i * 7.5)) {
            if (fs[i]) {
                fs[i]();
            }
        }
    }
}

function tbetweenmeasure(min, max) {
    return tbetween(min * 120, max * 120);
}

function m(a) {
    return a * 120;
}

function level() {
    if (t == 0) {
        o.push({
            x: 0,
            y: 0,
            drawFunction: function () {
                ctx.globalAlpha = 1 - clamp(t - 100, 0, 100) / 100;
                ctx.drawImage(sans, 10, 10);
                ctx.globalAlpha = 1;
            },
            frameFunction: function () {
            }
        });

        var str = "WANNA HAVE A";

        for (var i = 0; str.length > i; i++) {
            o.push(new rectEntity(40 + i * 12, 10, charRects(str[i]), function (e) {
                if (e.t > 240) {
                    e.remove = true;
                }
                e.y -= 0.05 * clamp(e.t - 100, 0, 500);
            }));
        }
        
        var str = "BAD TIME";

        for (var i = 0; str.length > i; i++) {
            o.push(new rectEntity(40 + i * 12, 34, charRects(str[i]), function (e) {
                if (e.t > 240) {
                    e.remove = true;
                }
                e.y -= 0.05 * clamp(e.t - 100, 0, 500);
            }));
        }

    }
    if (tbetweenmeasure(4, 4.5) && every(8)) {
        bcomplex(1, 8 * (t - m(4)) / 8, 1.25, 420);
        bcomplex(3, 256 - 8 * (t - m(4)) / 8, 1.25, 420);
    }
    if (tbetweenmeasure(4, 4.5) && every(8)) {
        bcomplex(0, 8 * (t - m(4)) / 8, 1.25, 420);
        bcomplex(2, 256 - 8 * (t - m(4)) / 8, 1.25, 420);
    }
    for (var i = 0; 4 > i; i++) {
        measure(i * 2, [
            () => b(0),
            () => b(0),
            () => b(0),
            false,
            () => b(0),
            false,
            false,
            () => b(1),
            false,
            () => b(1),
            false,
            () => b(1),
            false,
            () => b(1),
            () => b(1),
            () => b(1),
        ]);
        measure(i * 2 + 1, [
            () => b(2),
            () => b(2),
            () => b(2),
            false,
            () => b(2),
            false,
            false,
            () => b(3),
            false,
            () => b(3),
            false,
            () => b(3),
            false,
            () => b(3),
            () => b(3),
            () => b(3),
        ]);
    }
    for (var i = 0; 4 > i; i++) {
        measure(8 + 2 * i, [
            () => {
                for (var i = 0; 4 > i; i++) {
                    bcomplex(0, 8 * i, 1.25, 30)
                    bcomplex(0, 256 - 8 * i, 1.25, 30)
                }
            },
            () => {
                for (var i = 4; 8 > i; i++) {
                    bcomplex(0, 8 * i, 1.25, 30)
                    bcomplex(0, 256 - 8 * i, 1.25, 30)
                }
            },
            () => {
                for (var i = 8; 12 > i; i++) {
                    bcomplex(0, 8 * i, 1.25, 30)
                    bcomplex(0, 256 - 8 * i, 1.25, 30)
                }
            },
            false,
            () => {
                for (var i = 0; 2 > i; i++) {
                    bcomplex(0, 104 + 48 * i, 1.25, 30)
                }
            },
            false,
            false,
            () => {
                for (var i = 0; 4 > i; i++) {
                    bcomplex(1, 8 * i, 1.25, 30)
                    bcomplex(1, 256 - 8 * i, 1.25, 30)
                }
            },
            false,
            () => {
                for (var i = 4; 8 > i; i++) {
                    bcomplex(1, 8 * i, 1.25, 30)
                    bcomplex(1, 256 - 8 * i, 1.25, 30)
                }
            },
            false,
            () => {
                for (var i = 8; 12 > i; i++) {
                    bcomplex(1, 8 * i, 1.25, 30)
                    bcomplex(1, 256 - 8 * i, 1.25, 30)
                }
            },
            false,
            () => {
                for (var i = 0; 2 > i; i++) {
                    bcomplex(1, 96 + 64 * i, 1.25, 30)
                }
            },
            () => {
                for (var i = 0; 2 > i; i++) {
                    bcomplex(1, 104 + 48 * i, 1.25, 30)
                }
            },
            () => {
                for (var i = 0; 2 > i; i++) {
                    bcomplex(1, 112 + 32 * i, 1.25, 30)
                }
            }
        ]);
    }
    for (var i = 0; 2 > i; i++) {
        measure(9 + 4 * i, [
            () => {
                for (var i = 0; 8 > i; i++) {
                    bcomplex(0, 8 * i, 1.25, 30)
                }
            },
            () => {
                for (var i = 8; 16 > i; i++) {
                    bcomplex(0, 8 * i, 1.25, 30)
                }
            },
            () => {
                for (var i = 16; 24 > i; i++) {
                    bcomplex(0, 8 * i, 1.25, 30)
                }
            },
            false,
            () => {
                for (var i = 0; 2 > i; i++) {
                    bcomplex(0, 208 + 48 * i, 1.25, 30)
                }
            },
            false,
            false,
            () => {
                for (var i = 0; 8 > i; i++) {
                    bcomplex(1, 8 * i, 1.25, 30)
                }
            },
            false,
            () => {
                for (var i = 8; 16 > i; i++) {
                    bcomplex(1, 8 * i, 1.25, 30)
                }
            },
            false,
            () => {
                for (var i = 16; 24 > i; i++) {
                    bcomplex(1, 8 * i, 1.25, 30)
                }
            },
            false,
            () => {
                for (var i = 0; 2 > i; i++) {
                    bcomplex(1, 200 + 64 * i, 1.25, 30)
                }
            },
            () => {
                for (var i = 0; 2 > i; i++) {
                    bcomplex(1, 208 + 48 * i, 1.25, 30)
                }
            },
            () => {
                for (var i = 0; 2 > i; i++) {
                    bcomplex(1, 216 + 32 * i, 1.25, 30)
                }
            }
        ]);
        measure(11 + 4 * i, [
            () => {
                for (var i = 0; 8 > i; i++) {
                    bcomplex(0, 256 - 8 * i, 1.25, 30)
                }
            },
            () => {
                for (var i = 8; 16 > i; i++) {
                    bcomplex(0, 256 - 8 * i, 1.25, 30)
                }
            },
            () => {
                for (var i = 16; 24 > i; i++) {
                    bcomplex(0, 256 - 8 * i, 1.25, 30)
                }
            },
            false,
            () => {
                for (var i = 0; 2 > i; i++) {
                    bcomplex(0, 48 * i, 1.25, 30)
                }
            },
            false,
            false,
            () => {
                for (var i = 0; 8 > i; i++) {
                    bcomplex(1, 256 - 8 * i, 1.25, 30)
                }
            },
            false,
            () => {
                for (var i = 8; 16 > i; i++) {
                    bcomplex(1, 256 - 8 * i, 1.25, 30)
                }
            },
            false,
            () => {
                for (var i = 16; 24 > i; i++) {
                    bcomplex(1, 256 - 8 * i, 1.25, 30)
                }
            },
            false,
            () => {
                for (var i = 0; 2 > i; i++) {
                    bcomplex(1, 64 * i, 1.25, 30)
                }
            },
            () => {
                for (var i = 0; 2 > i; i++) {
                    bcomplex(1, 8 + 48 * i, 1.25, 30)
                }
            },
            () => {
                for (var i = 0; 2 > i; i++) {
                    bcomplex(1, 16 + 32 * i, 1.25, 30)
                }
            }
        ]);
    }
    if (tbetweenmeasure(16, 16.5) && every(4)) {
        bcomplex(0, 8 * (t - m(16)) / 4, 1.25, 60);
    }
    if (tbetweenmeasure(17, 17.5) && every(4)) {
        bcomplex(1, 8 * (t - m(17)) / 4, 1.25, 60);
    }
    if (tbetweenmeasure(18, 18.5) && every(4)) {
        bcomplex(2, 8 * (t - m(18)) / 4, 1.25, 60);
    }
    if (tbetweenmeasure(19, 19.5) && every(8)) {
        bcomplex(1, 8 * (t - m(19)) / 8, 1.25, 60);
        bcomplex(3, 256 - 8 * (t - m(19)) / 8, 1.25, 60);
    }
    if (tbetweenmeasure(19, 19.5) && every(8)) {
        bcomplex(0, 8 * (t - m(19)) / 8, 1.25, 60);
        bcomplex(2, 256 - 8 * (t - m(19)) / 8, 1.25, 60);
    }
    measure(16, [
        () => b(0),
        false,
        () => b(0),
        () => b(0),
        false,
        () => b(0),
        false,
        () => b(0),
        false,
        () => b(0),
        false,
        () => b(0),
        false,
        false,
        false,
        false
    ]);
    measure(17, [
        () => b(0),
        false,
        () => b(0),
        () => b(0),
        false,
        () => b(0),
        false,
        false,
        () => b(0),
        () => b(0),
        () => b(0),
        () => b(0),
        () => b(0),
        () => b(0),
        () => b(0),
        false,
    ]);
    measure(18, [
        () => b(1),
        false,
        () => b(1),
        () => b(1),
        false,
        () => b(1),
        false,
        () => b(1),
        false,
        () => b(1),
        false,
        () => b(1),
        false,
        false,
        false,
        false
    ]);
    measure(19, [
        () => b(1),
        false,
        () => b(1),
        false,
        () => b(1),
        () => b(1),
        () => b(1),
        () => b(1),
        () => b(1),
        () => b(1),
        () => b(1),
        () => b(1),
        () => b(2),
        () => b(2),
        () => b(2),
        () => b(2),
    ]);
}

var audio = new Audio("megalovania.ogx");
var startTime = new Date().getTime();

function preLoop() {
    var keyPressed = false;
    for (var i = 0; keys.length > i; i++) {
        if (keys[i] == true) {
            keyPressed = true;
        }
    }
    if (keyPressed) {
        audio.play();

        loop();
    } else {
        requestAnimationFrame(preLoop);
    }
}

preLoop();