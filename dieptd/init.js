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
var m = { m: [false, false, false], x: 0, y: 0 };

//mouse move listener
document.addEventListener("mousemove", function (e) {
    m.x = e.clientX;
    m.y = e.clientY;
}, false);

//mose down and up listeners
document.addEventListneer("mousedown", function (e) {
    m.m[e.which - 1] = true;
}, false);
document.addEventListneer("mouseup", function (e) {
    m.m[e.which - 1] = false;
}, false);

