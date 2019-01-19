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

    if (m.m[0] && drag_toggle) {
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
var k = {};
var kd = {};

//keyboard event listeners
document.addEventListener("keydown", function (e) {
    k[e.key] = true;
    kd[e.key] = true;
}, false);
document.addEventListener("keyup", function (e) {
    k[e.key] = false;
    kd[e.key] = false;
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

//determines whether a level should continue or whether there should be a switch to the menu
var switch_to_menu = true;

//toggle for dragging screen
var drag_toggle = true;

//gameplay speeds
var speeds = [0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
var speed_index = 2;

//entity list
var e_list = [
    "Basic_Tank",
    "Twin_Tank",
    "Triple_Shot_Tank",
    "Triplet_Tank",
    "Square_Polygon",
    "Triangle_Polygon",
    "Pentagon_Polygon",
    "Alpha_Pentagon_Polygon"
];

//team list
t_list = [
    "red",
    "orange",
    "purple",
    "yellow",
    "green"
];

var sbx_dropdown = document.getElementById("entities");

e_list.forEach(function (e) {
    var elem = document.createElement("option");
    elem.value = e;
    elem.innerHTML = e;
    sbx_dropdown.appendChild(elem);
});

var sbx_team_dropdown = document.getElementById("teams");

t_list.forEach(function (e) {
    var elem = document.createElement("option");
    elem.value = e;
    elem.innerHTML = e;
    sbx_team_dropdown.appendChild(elem);
});