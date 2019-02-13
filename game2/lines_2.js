function r16(n) {
	return ~~(n * 16) / 16;
}

var k = {};

document.addEventListener("keydown", function (e) {
	k[e.key] = true;
});
document.addEventListener("keyup", function (e) {
	k[e.key] = false;
});

//clamp function
function clamp(value, min, max) {
	if (value > max) {
    	return max;
    } else if (value < min) {
    	return min;
    }
    return value;
}

//test if between
function between(value, min, max) {
	if (value >= min && value <= max) {
    	return true;
    }
    return false;
}

//line segment class
class Segment {
    constructor(sx, sy, ex, ey) {
        this.sx = sx;
        this.sy = sy;
        this.ex = ex;
        this.ey = ey;
    }

    horizontal() {
    	if (this.sy == this.ey) {
        	return true;
        }
        return false;
    }
    
    intersect(obj) {
    	if (this.horizontal()) {
            if (between(obj.x, this.sx, this.ex) || between(obj.x + obj.dx, this.sx, this.ex)) {
                //from bottom
                if (Math.sign(obj.y - this.sy) > Math.sign(obj.y + obj.dy - this.sy)) {

                //from top
                } else if (Math.sign(obj.y - this.sy) < Math.sign(obj.y + obj.dy - this.sy)) {
                    return {
                        y: this.sy + 0.00001,
                        x: (this.sy - obj.y) * ()
                    }
                }
            }
        } else {
            if (between(obj.y, this.sy, this.ey) || between(obj.y + obj.dy, this.sy, this.ey)) {
                //from right
                if (Math.sign(obj.x - this.sx) > Math.sign(obj.x + obj.dx - this.sx)) {

                //from left
                } else if (Math.sign(obj.y - this.sy) < Math.sign(obj.y + obj.dy - this.sy)) {

                }
            }
        }
    }
    
    /*intersectR(obj, x, y, w, h) {
    	this.intersect(obj, obj.x + x, obj.y + y, obj.dx, obj.dy, w / 2, h / 2);
        this.intersect(obj, obj.x + x + w, obj.y + y, obj.dx, obj.dy, -w / 2, h / 2);
        this.intersect(obj, obj.x + x, obj.y + y + h, obj.dx, obj.dy, w / 2, -h / 2);
        this.intersect(obj, obj.x + x + w, obj.y + y + h, obj.dx, obj.dy, -w / 2, -h / 2);
    }*/
    
    get dist() {
        return Math.sqrt(Math.pow(this.sx - this.ex, 2) + Math.pow(this.sy - this.ey, 2));
    }
}

//get coordinate from 2d array
function coord(x, y, w) {
    return x + w * y;
}

//get coordinate from imagedata array
function icoord(x, y, w) {
    return 4 * x + 4 * w * y;
}

//convert imagedata to 2d array
function imgToMap1(data) {
    var arr = new Uint8Array(data.width * data.height);
    for (var i = 0; data.height > i; i++) {
        for (var i2 = 0; data.width > i2; i2++) {
            if (data.data[icoord(i2, i, data.width)] == 0) {
                arr[coord(i2, i, data.width)] = 255;
            }
        }
    }
    return arr;
}

//flood fill a 2d array
function imgToMap2(arr, w, h) {
    arr[coord(6, 6, w)] = 127;
    var changed = true;
    while (changed) {
        changed = false;
        for (var i = 0; h > i; i++) {
            for (var i2 = 0; w > i2; i2++) {
                if (arr[coord(i2, i, w)] == 127) {
                    var coords = [
                        coord(i2 - 1, i - 1, w),
                        coord(i2, i - 1, w),
                        coord(i2 + 1, i - 1, w),
                        coord(i2 - 1, i, w),
                        coord(i2 + 1, i, w),
                        coord(i2 - 1, i + 1, w),
                        coord(i2, i + 1, w),
                        coord(i2 + 1, i + 1, w)
                    ];
                    for (var i3 = 0; 8 > i3; i3++) {
                        if (arr[coords[i3]] == 0) {
                            changed = true;
                            arr[coords[i3]] = 127;
                        }
                    }
                }
            }
        }
    }
    return arr;
}

//convert boundaries to segments
function imgToMap3(arr, w, h) {
    var ls = [];
    for (var i = 0; h - 1 > i; i++) {
        for (var i2 = 0; w - 1 > i2; i2++) {
            if (arr[coord(i2, i, w)] == 127) {
                if (arr[coord(i2 + 1, i, w)] == 255) {
                    ls.push(new Segment(i2 + 1, i, i2 + 1, i + 1));
                }
                if (arr[coord(i2, i + 1, w)] == 255) {
                    ls.push(new Segment(i2, i + 1, i2 + 1, i + 1));
                }
            } else if (arr[coord(i2, i, w)] == 255) {
                if (arr[coord(i2 + 1, i, w)] == 127) {
                    ls.push(new Segment(i2 + 1, i, i2 + 1, i + 1));
                }
                if (arr[coord(i2, i + 1, w)] == 127) {
                    ls.push(new Segment(i2, i + 1, i2 + 1, i + 1));
                }
            } 
        }
    }
    return ls;
}

//tests whether segments are colinear and how to connect them
function colinear(l1, l2) {
    if (l1.ex == l2.sx && l1.ey == l2.sy && ((l1.sx == l1.ex && l2.sx == l2.ex) || (l1.sy == l1.ey && l2.sy == l2.ey))) {
        return true;
    }
    return false
}

//combine all combine-able line segments
function imgToMap4(arr) {
    for (var i = 0; arr.length > i; i++) {
        var changed = true;
        while (changed) {
            changed = false;
            for (var i2 = 0; arr.length > i2; i2++) {
                if (i != i2 && colinear(arr[i], arr[i2])) {
                    arr[i].ex = arr[i2].ex;
                    arr[i].ey = arr[i2].ey;
                    arr.splice(i2, 1);
                    changed = true;
                }
            }
        }
    }
    return arr;
}

function dataFromImg(url, ref, callback) {
    var img = new Image();
    img.src = url;
    img.onload = function () {
        var imagecanvas = document.createElement("canvas");
        var imagecontext = imagecanvas.getContext("2d");
        imagecanvas.width = img.width;
        imagecanvas.height = img.height;
        imagecontext.drawImage(img, 0, 0);
        ref.push(imagecontext.getImageData(0, 0, img.width, img.height));
        callback();
    }
}

var test = [];
var lines;
dataFromImg("test.png", test, function () {
    test = test[0]
    lines = imgToMap(test);
    loop();
});

function imgToMap(img) {
    return imgToMap4(imgToMap3(imgToMap2(imgToMap1(test), img.width, img.height), img.width, img.height));
}

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

ctx.scale(16, 16);
ctx.lineWidth = 1 / 8;

var player = {
	x: 4,
    y: 4,
    dx: 0,
    dy: 0
};

function loop() {
	ctx.save();
    ctx.translate(-~~(player.x * 16) / 16 + 12, -~~(player.y * 16) / 16 + 6.75);
	ctx.clearRect(0, 0, c.width, c.height);
    lines.forEach(e => {
        ctx.beginPath();
        ctx.moveTo(e.sx, e.sy);
        ctx.lineTo(e.ex, e.ey);
        ctx.stroke();
    });
    lines.forEach(e => {
        if (!e.horizontal()) {
            e.intersect(player, player.x - 0.5, player.y - 0.5, player.dx, player.dy, 0.5, 0.5);
            e.intersect(player, player.x + 0.5, player.y - 0.5, player.dx, player.dy, -0.5, 0.5);
            e.intersect(player, player.x - 0.5, player.y + 0.5, player.dx, player.dy, 0.5, -0.5);
            e.intersect(player, player.x + 0.5, player.y + 0.5, player.dx, player.dy, -0.5, -0.5);
        }
    });
    lines.forEach(e => {
        if (e.horizontal()) {
            e.intersect(player, player.x - 0.5, player.y - 0.5, player.dx, player.dy, 0.5, 0.5);
            e.intersect(player, player.x + 0.5, player.y - 0.5, player.dx, player.dy, -0.5, 0.5);
            e.intersect(player, player.x - 0.5, player.y + 0.5, player.dx, player.dy, 0.5, -0.5);
            e.intersect(player, player.x + 0.5, player.y + 0.5, player.dx, player.dy, -0.5, -0.5);
        }
    });
    player.dx *= 0.9;
    player.x += player.dx;
    player.y += player.dy;
    if (k["d"]) {
    	player.dx += 0.05;
    }
    if (k["a"]) {
    	player.dx -= 0.05;
    }
	player.dy += 0.02;
    ctx.fillRect(r16(player.x) - 0.5, r16(player.y) - 0.5, 1, 1);
    ctx.restore();
    requestAnimationFrame(loop);
}