//line segment class
class Segment {
    constructor(sx, sy, ex, ey) {
        this.sx = sx;
        this.sy = sy;
        this.ex = ex;
        this.ey = ey;
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
dataFromImg("test.png", test, function () {
    test = test[0]
});

function imgToMap(img) {
    return imgToMap4(imgToMap3(imgToMap2(imgToMap1(test), img.width, img.height), img.width, img.height));
}

/*
data for lines (so I can edit tomorrow)
[{"sx":3,"sy":3,"ex":29,"ey":3},{"sx":3,"sy":3,"ex":3,"ey":9},{"sx":29,"sy":3,"ex":29,"ey":18},{"sx":3,"sy":9,"ex":23,"ey":9},{"sx":23,"sy":9,"ex":23,"ey":12},{"sx":3,"sy":12,"ex":20,"ey":12},{"sx":23,"sy":12,"ex":26,"ey":12},{"sx":3,"sy":12,"ex":3,"ey":26},{"sx":20,"sy":12,"ex":20,"ey":15},{"sx":26,"sy":12,"ex":26,"ey":15},{"sx":20,"sy":15,"ex":26,"ey":15},{"sx":13,"sy":18,"ex":29,"ey":18},{"sx":13,"sy":18,"ex":13,"ey":20},{"sx":6,"sy":20,"ex":13,"ey":20},{"sx":6,"sy":20,"ex":6,"ey":23},{"sx":16,"sy":21,"ex":29,"ey":21},{"sx":16,"sy":21,"ex":16,"ey":23},{"sx":29,"sy":21,"ex":29,"ey":29},{"sx":6,"sy":23,"ex":16,"ey":23},{"sx":3,"sy":26,"ex":16,"ey":26},{"sx":16,"sy":26,"ex":16,"ey":29},{"sx":16,"sy":29,"ex":29,"ey":29}]
*/