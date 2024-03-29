//define canvas
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

//player
var player = {
    x: 128,
    y: 128,
    dx: 0,
    dy: 0
};

//key events
var keys = [];
document.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
}, false);
document.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
}, false);

//kill the player
function death() {
    dead = true;
}

//reset everything
function death2() {
    player = {
        x: 128,
        y: 128,
        dx: 0,
        dy: 0
    };
    t = 4140;
    o = [];
    dead = false;
    loop();
}

//is player dead?
var dead = false;

//time variable
var t = 0;

var cookie = new String(document.cookie);

//high score
var hs = Number(cookie.slice(10));

//test for within rectangle
function inRect(x, y, w, h, px, py) {
	if (px >= x && py >= y && px <= x + w && py <= y + h) {
    	return true;
    }
    return false;
}

//clamp between two values
function clamp(value, min, max) {
    if (value > max) {
        return max;
    }
    if (value < min) {
        return min;
    }
    return value;
}

//test if between two values
function between(value, min, max) {
    if (clamp(value, min, max) == value) {
        return true;
    }
    return false;
}

//tests if time is between two values
function tbetween(min, max) {
    return between(t, min, max);
}

//once every x
function every(mod) {
    return t % mod == 0;
}

//distance function
function dist(x1, y1, x2, y2) {
    if (x2 == undefined) {
        return Math.sqrt(x1 * x1 + y1 * y1);
    } else {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }
}

//cycle through array, this is literally just forEach lol
function cycle(arr, f) {
    for (var i = 0; arr.length > i; i++) {
        f(arr[i], i);
    }
}

//entity made solely out of rectangular boxes
function rectEntity(x, y, rects, frameFunction2) {
    this.t = 0;
	this.x = x;
    this.y = y;
    this.rects = rects;
    this.frameFunction2 = frameFunction2;
    this.remove = false;
	this.frameFunction = function () {
		cycle(this.rects, e => {
        	if (inRect(e.x + this.x, e.y + this.y, e.w, e.h, player.x, player.y)) {
            	death();
            }
        });
        this.frameFunction2(this);
        this.t++;
    }
    this.drawFunction = function () {
    	ctx.fillStyle = "#333333";
        cycle(this.rects, e => {
        	ctx.fillRect(e.x + Math.round(this.x), e.y + Math.round(this.y), e.w, e.h);
        });
    }
}

//background entity
function rectBackground(x, y, rects, frameFunction2) {
    this.t = 0;
	this.x = x;
    this.y = y;
    this.rects = rects;
    this.frameFunction2 = frameFunction2;
    this.remove = false;
	this.frameFunction = function () {
        this.frameFunction2(this);
        this.t++;
    }
    this.drawFunction = function () {
    	ctx.fillStyle = "#888888";
        cycle(this.rects, e => {
        	ctx.fillRect(e.x + Math.round(this.x), e.y + Math.round(this.y), e.w, e.h);
        });
    }
}

//game objects
var o = [];

function loop() {
    c.style.height = window.innerHeight + "px";
    ctx.imageSmoothingEnabled = false;

    //load stuff from level
    level();

    //keyboard stuff
    if (keys[87] || keys[38]) {
        player.dy -= 2;
    }
    if (keys[83] || keys[40]) {
        player.dy += 2;
    }
    if (keys[65] || keys[37]) {
        player.dx -= 2;
    }
    if (keys[68] || keys[39]) {
        player.dx += 2;
    }
    player.x += player.dx;
    player.y += player.dy;
    player.dx *= 0;
    player.dy *= 0;

    //if player is outside of map, kill it
    if (!inRect(0, 0, 256, 256, player.x, player.y)) {
        death();
    }

    //move and do other things to game objects
    o.forEach(function (e, i) {
    	e.frameFunction();
    });

    //get rid of dead game objects
    for (var i = 0; o.length > i; i++) {
        if (o[i].remove) {
            o.splice(i, 1);
            i--;
        }
    }

    //draw background
    ctx.fillStyle = "#EEEEEE";
    ctx.fillRect(0, 0, c.width, c.height);

    //draw game objects
    o.forEach(function (e) {
    	e.drawFunction();
    });

    //draw player
    ctx.fillStyle = "#333333";
    ctx.fillRect(Math.round(player.x) - 1, Math.round(player.y) - 1, 2, 2);

    //increment time
    t++;

    //increase high score if time is greater
    if (t > hs) {
        hs = t;
        document.cookie = 'highscore=' + hs;
    }

    //repeat loop function
    if (!dead) {
        requestAnimationFrame(loop);
    } else {
        death2();
    }
}