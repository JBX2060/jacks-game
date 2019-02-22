var k = {};
var kd = {};

//when a key is pressed
document.addEventListener("keydown", function(e) {
    k[e.key] = true;
    kd[e.key] = true;
}, false);
document.addEventListener("keyup", function(e) {
    k[e.key] = false;
    kd[e.key] = false;
}, false);

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

var c = document.getElementById("canvas");
var context = c.getContext("2d");
var c2 = document.getElementById("canvas2");
var context2 = c2.getContext("2d");
var c3 = document.getElementById("canvas3");
var context3 = c3.getContext("2d");


var ctx = context;

function r16(n) {
    return ~~(n * 16) / 16;
}

function bothCanvas(func) {
    ctx = context2;
    func();
    ctx = context;
    func();
}

function allCanvas(func) {
    ctx = context3;
    func();
    ctx = context2;
    func();
    ctx = context;
    func();
}



bothCanvas(() => {
    ctx.lineWidth = 1 / 16;
});

class Ray {
    constructor(x, y, dir, hue, ls) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.kill = false;
        this.hue = hue;
        if (!ls) {
            this.ls = lines2;
        } else {
            this.ls = ls;
        }
    }

    update() {
        this.cast = raycast(this.x, this.y, Math.cos(this.dir) * 1000, Math.sin(this.dir) * 1000, this.ls);
        if (this.cast) {
            o.push(new Spark(this.cast.x, this.cast.y));
        }
    }

    render() {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 0.0625;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        if (this.cast) {
            ctx.lineTo(this.cast.x, this.cast.y);
        }
        ctx.closePath();
        ctx.strokeStyle = "hsl(" + this.hue + ", 100%, 50%)";
        ctx.stroke();
        ctx.strokeStyle = "hsla(" + this.hue + ", 100%, 50%, 0.15)";
        for (var i = 1; 3 > i; i++) {
            ctx.lineWidth = i * 0.5;
            ctx.stroke();
        }
        this.kill = true;
    }

    shadow() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        if (this.cast) {
            ctx.lineTo(this.cast.x, this.cast.y);
        }
        ctx.strokeStyle = "#00000055";
        for (var i = 1; 3 > i; i++) {
            ctx.lineWidth = i * 0.75;
            ctx.stroke();
        }
    }
}

class RedLaser {
    constructor(x, y, dir, f) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.f = f;
    }

    update() {
        this.f(this);
        o.push(new Ray(this.x, this.y, this.dir, 0, lines3));
        this.cast = raycast(this.x, this.y, Math.cos(this.dir) * 1000, Math.sin(this.dir) * 1000, lines3);
        if (this.cast && this.cast.line.link && this.cast.line.link.player) {
            player.hp -= 15;
        }
    }

    render() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.dir);
        ctx.drawImage(imgs[3], -0.5, -0.5, 1, 1);
        ctx.restore();
    }

    shadow() {

    }
}

class Spark {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dx = Math.random() - 0.5;
        this.dy = Math.random() - 0.5;
        this.lifetime = 10;
        this.kill = false;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.dx *= 0.8;
        this.dy *= 0.8;
        this.dx += Math.random() * 0.1 - 0.05;
        this.dy += Math.random() * 0.1 - 0.05;
        lines2.forEach(e => {
            if (e.intersect(this)) {
                this.kill = true;
            }
        });
        this.lifetime--;
        if (this.lifetime < 0) {
            this.kill = true;
        }
    }

    render() {
        ctx.lineWidth = 0.0625;
        ctx.strokeStyle = "hsl(" + (Math.random() * 60) + ", 100%, 75%)";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.dx, this.y - this.dy);
        ctx.stroke();
    }

    shadow() {

    }
}


class MsgBox {
	constructor(x, y, contents, w, f) {
    	this.x = x;
        this.y = y;
        this.contents = contents;
        this.index = 0;
        this.index2 = 0;
        this.h = contents.length * 12;
        this.w = w;
        this.h = contents.length * 12 + 6;
        this.f = f;
        this.kill = false;
    }
    
    update() {
        ctx = context3;
        ctx.fillStyle = "#00000044";
        ctx.strokeStyle = "White";
        ctx.lineWidth = 1;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.strokeRect(this.x - 0.5, this.y - 0.5, this.w, this.h);
        ctx.font = "12px Courier New";
        ctx.fillStyle = "White";
    	if (this.index > 0) {
       		for (var i = 0; this.index > i; i++) {
            	ctx.fillText(this.contents[i], this.x + 4, this.y + i * 12 + 12);
            }
        }
    	if (this.contents.length > this.index && this.contents[this.index].length > this.index2) {
        	this.index2++;
            ctx.fillText(this.contents[this.index].substring(0, this.index2), this.x + 4, this.y + this.index * 12 + 12);
        } else if (this.contents.length > this.index) {
            ctx.fillText(this.contents[this.index].substring(0, this.index2), this.x + 4, this.y + this.index * 12 + 12);
        	this.index++;
            this.index2 = 0;
        } else {
            if (k["Enter"]) {
                this.f();
                this.kill = true;
            }
        }
        ctx.fillStyle = "Black";
        ctx = context;
    }
}

function healthbar(obj) {
    var x = r16(obj.x);
    var y = r16(obj.y);
    ctx.fillStyle = "#444444";
    ctx.fillRect(x - 0.5, y - 0.75, 1, 0.0625 * 3);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(x - 0.5 + 0.0625, y - 0.75 + 0.0625, obj.hp / obj.mhp * 0.875, 0.0625);
}

class CheckPoint {
    constructor(x, y, lvl) {
        this.x = x;
        this.y = y;
        this.lvl = lvl;
    }

    update() {
        if (~~player.x == this.x && ~~player.y == this.y && kd["s"]) {
            playerSpawn.x = this.x;
            playerSpawn.y = this.y - 0.125;
            playerSpawn.l = this.lvl;
        }
    }

    render() {
        if (this.x != playerSpawn.x || this.y - 0.125 != playerSpawn.y) {
            ctx.drawImage(imgs[4], this.x, this.y - 1, 1, 2);
        } else {
            ctx.drawImage(imgs[5], this.x, this.y - 1, 1, 2);
        }
    }

    shadow() {

    }
}