var k = {};

document.addEventListener("keydown", function(e) {
    k[e.key] = true;
});
document.addEventListener("keyup", function(e) {
    k[e.key] = false;
});

//mouse info
var m = { m: [false, false, false], md: [false, false, false], x: 0, y: 0, px: 0, py: 0, w: 0, dx: 0, dy: 0 };

//when the mouse moves
document.addEventListener("mousemove", function (e) {
    m.px = m.x;
    m.py = m.y;
    m.x = e.clientX * (1920 / window.innerWidth);
    m.y = e.clientY * (1920 / window.innerWidth);
    m.dx = e.movementX;
    m.dy = e.movementY;
}, false);

//when the mouse is clicked
document.addEventListener("mousedown", function (e) {
    m.m[e.which - 1] = true;
    m.md[e.which - 1] = true;
}, false);
document.addEventListener("mouseup", function (e) {
    m.m[e.which - 1] = false;
    m.md[e.which - 1] = false;
}, false);


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
    return clamp(value, min, max) == value;
}

function dist(x, y) {
    return Math.sqrt(x * x + y * y);
}

function collide(rects, obj, w, h) {
    var ls = [];
    // rects.forEach(function (e) {
    //     ls.push(new Segment(e.x - w / 2, e.y - h / 2, e.x + e.w + w / 2, e.y - h / 2));
    //     ls.push(new Segment(e.x - w / 2, e.y - h / 2 + 0.05, e.x - w / 2, e.y + e.h + h / 2 - 0.05));
    //     ls.push(new Segment(e.x + e.w + w / 2, e.y - h / 2 + 0.05, e.x + e.w + w / 2, e.y + e.h + w / 2 - 0.05));
    //     ls.push(new Segment(e.x - w / 2, e.y + e.h + h / 2, e.x + e.w + w / 2, e.y + e.h + w / 2));
    // });
    ls = lines;
    var mdist = dist(obj.dx, obj.dy);
    var mag = mdist;
    var dir = Math.atan2(obj.dy, obj.dx);

    var hcollides = false;
    var jumping = false;

    while (mdist > 0) {
        var ints = [];

        ls.forEach(function(e) {
            ints.push(e.intersect(obj));
        });
        var mindist = Infinity;
        var mdi = false;
        ints.forEach(function(e, i) {
            if (e !== undefined && dist(obj.x - e.x, obj.y - e.y) < mindist) {
                mdi = i;
                mindist = dist(obj.x - e.x, obj.y - e.y);
            }
        });

        if (mindist != Infinity) {
            if (ints[mdi].h) {
                hcollides = true;
                if (ints[mdi].j && k["w"]) {
                    jumping = true;
                }
            }
            mdist -= mindist;
            obj.x = ints[mdi].x;
            obj.y = ints[mdi].y;
            obj.dx = ints[mdi].dx / dist(ints[mdi].dx, ints[mdi].dy) * mdist;
            obj.dy = ints[mdi].dy / dist(ints[mdi].dx, ints[mdi].dy) * mdist;
            dir = Math.atan2(obj.dy, obj.dx);
        } else {
            mdist = -1;
            obj.x += obj.dx;
            obj.y += obj.dy;
            dir = Math.atan2(obj.dy, obj.dx);
        }
    }
    obj.dx = Math.cos(dir) * mag;
    if (!hcollides) {
        obj.dy = Math.sin(dir) * mag;
    } else {
        obj.dy = 0;
    }
    if (jumping) {
        obj.dy = -0.55;
    }
}

class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
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
            if (between(obj.x + (this.sy - obj.y) * (obj.dx / obj.dy), this.sx, this.ex)) {
                //from bottom
                if (Math.sign(obj.y - this.sy) > Math.sign(obj.y + obj.dy - this.sy)) {
                    return {
                        y: this.sy + 0.001,
                        x: obj.x + (this.sy - obj.y) * (obj.dx / obj.dy),
                        dx: obj.dx,
                        dy: -obj.dy,
                        h: true
                    }
                    //from top
                } else if (Math.sign(obj.y - this.sy) < Math.sign(obj.y + obj.dy - this.sy)) {
                    return {
                        y: this.sy - 0.001,
                        x: obj.x + (this.sy - obj.y) * (obj.dx / obj.dy),
                        dx: obj.dx,
                        dy: -obj.dy,
                        h: true,
                        j: true
                    }
                }
            }
        } else {
            if (between(obj.y +  (this.sx - obj.x) * (obj.dy / obj.dx), this.sy, this.ey)) {
                //from right
                if (Math.sign(obj.x - this.sx) > Math.sign(obj.x + obj.dx - this.sx)) {
                    return {
                        x: this.sx + 0.001,
                        y: obj.y +  (this.sx - obj.x) * (obj.dy / obj.dx),
                        dx: -obj.dx,
                        dy: obj.dy
                    }
                    //from left
                } else if (Math.sign(obj.x - this.sx) < Math.sign(obj.x + obj.dx - this.sx)) {
                    return {
                        x: this.sx - 0.001,
                        y: obj.y +  (this.sx - obj.x) * (obj.dy / obj.dx),
                        dx: -obj.dx,
                        dy: obj.dy
                    }
                }
            }
        }
        return false;
    }

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
    var arr2 = new Uint8Array(w * h * 4);
    for (var i = 0; h > i; i++) {
        for (var i2 = 0; w > i2; i2++) {
            arr2[coord(i2 * 2, i * 2, w * 2)] = arr[coord(i2, i, w)];
            arr2[coord(i2 * 2 + 1, i * 2, w * 2)] = arr[coord(i2, i, w)];
            arr2[coord(i2 * 2, i * 2 + 1, w * 2)] = arr[coord(i2, i, w)];
            arr2[coord(i2 * 2 + 1, i * 2 + 1, w * 2)] = arr[coord(i2, i, w)];
        }
    }
    arr = arr2;
    var changeto255 = [];
    for (var i = 0; h * 2 > i; i++) {
        for (var i2 = 0; w * 2 > i2; i2++) {
            if (arr[coord(i2, i, w * 2)] == 127) {
                var coords = [
                    coord(i2 - 1, i - 1, w * 2),
                    coord(i2, i - 1, w * 2),
                    coord(i2 + 1, i - 1, w * 2),
                    coord(i2 - 1, i, w * 2),
                    coord(i2 + 1, i, w * 2),
                    coord(i2 - 1, i + 1, w * 2),
                    coord(i2, i + 1, w * 2),
                    coord(i2 + 1, i + 1, w * 2)
                ];
                var change = false;
                for (var i3 = 0; 8 > i3; i3++) {
                    if (arr[coords[i3]] == 255) {
                        change = true;
                    }
                }
                if (change) {
                    changeto255.push({ x: i2, y: i });
                }
            }
        }
    }
    w *= 2;
    h *= 2;
    changeto255.forEach(function (e) {
        arr[coord(e.x, e.y, w)] = 255;
    });
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
    ls.forEach(function(e) {
        e.sx *= 0.5;
        e.sy *= 0.5;
        e.ex *= 0.5;
        e.ey *= 0.5;
    })
    return ls;
}

function imgToMap3Simple(arr, w, h) {
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
    img.onload = function() {
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
var lines2;
var squares;
var mapimage;
var lvdims = {
    x: 0,
    y: 0
}


function imgToMap(img) {
    return imgToMap4(imgToMap3(imgToMap2(imgToMap1(test), img.width, img.height), img.width, img.height));
}

function imgToMap_2(img) {
    return imgToMap4(imgToMap3Simple(imgToMap2(imgToMap1(test), img.width, img.height), img.width, img.height));
}

function getImg(url, callback, num) {
    var img = new Image();
    img.src = url;
    img.onload = function () {
        callback(img, num);
    }
}

function bothCanvas(func) {
    ctx = context2;
    func();
    ctx = context;
    func();
}

var loadthese = ["playerbody.png", "playerhead.png"];
var imgs = Array(loadthese.length);
var loadedAssets = 0;
for (var i = 0; loadthese.length > i; i++) {
    getImg(loadthese[i], function (image, i2) {
        imgs[i2] = image;
        loadedAssets++;
    }, i);
}

function preloop() {
    if (loadedAssets == loadthese.length) {
        getImg("test2.png", function(image) {
            mapimage = image;
            lvdims = {
                x: image.width,
                y: image.height
            };
            dataFromImg("test.png", test, function () {
                test = test[0]
                lines = imgToMap(test);
                lines2 = imgToMap_2(test);
                squares = imgToMap1(test);
                loop();
            });
        });
    } else {
        setTimeout(preloop, 0);
    }
}
preloop();