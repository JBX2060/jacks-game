//define context
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

//"current context" variable, basically the context which is being used for drawing at the exact moment
var cc = ctx;

//tau constant
const tau = Math.PI * 2;

//ingame object array
var o = [];

//mouse info
var m = { m: [false, false, false], md: [false, false, false], x: 0, y: 0, px: 0, py: 0, w: 0 };

//transformed mouse coords
var tmc = { x: 0, y: 0 };

//current position
var pos = { x: 0, y: 0 };

//mouse move listener
document.addEventListener("mousemove", function (e) {
    m.px = m.x;
    m.py = m.y;
    m.x = e.clientX * (1920 / window.innerWidth);
    m.y = e.clientY * (1920 / window.innerWidth);

    if (m.m[0]) {
        pos.x += (m.px - m.x) / scale.factor;
        pos.y += (m.py - m.y) / scale.factor;
    }
}, false);

//mose down and up listeners
document.addEventListener("mousedown", function (e) {
    m.m[e.which - 1] = true;
    m.md[e.which - 1] = true;
}, false);
document.addEventListener("mouseup", function (e) {
    m.m[e.which - 1] = false;
    m.md[e.which - 1] = false;
}, false);

//mouse wheel listener
document.addEventListener("wheel", function (e) {
    m.w = e.deltaY / 100;
}, false);

//keyboard value storage
var k = new Array(256);
var kd = new Array(256);

//keyboard event listeners
document.addEventListener("keydown", function (e) {
    k[e.keyCode] = true;
    kd[e.keyCode] = true;
}, false);
document.addEventListener("keyup", function (e) {
    k[e.keyCode] = false;
    kd[e.keyCode] = false;
}, false);

//placing info
var place = { placing: false, place_id: false };

//selecting info
var select = { selecting: false, selection: false };

//global loop counter
var l = 0;

//points for spending on towers
var pt = 300;

//scale control
var scale = {
    factor: 1,
    log: 0,
    d: 0
}

//grouped towers
var gt = [];

//display fov toggle
var fov_toggle = true;