function getImg(url, callback, num) {
    var img = new Image();
    img.src = url;
    img.onload = function () {
        callback(img, num);
    }
}



class Level {
    constructor(map, texture, exits, init) {
        this.map = "levels/" + map;
        this.txtr = "levels/" + texture;
        this.init = init;
        this.exits = exits;
        this.plays = 0;
    }

    load(callback) {
        var a = [];
        dataFromImg(this.map, img1 => {
            this.mapimage = img1;
            this.lines = imgToMap_2(this.mapimage);
            this.clines = imgToMap(this.mapimage);
            getImg(this.txtr, img2 => {
                this.texture = img2;
                callback();
            });
        });
    }

    start() {
        o = [];
        icons = [];
        lines = this.clines;
        lines2 = this.lines;
        mapimage = this.texture;
        exits = this.exits;
        lvdims = {
            x: mapimage.width,
            y: mapimage.height
        };
        this.init(this);
        this.plays++;
    }
}


var loaded = 0;
var addload = function () {
    loaded++;
}

var levels = [
    new Level("1_map.png", "1_texture.png", [{ x: 59, y: 20, i: 1, destx: 4, desty: 10 }], (lvl) => {
        if (lvl.plays == 0) {
            icons.push(new MsgBox(3, 3, ["I see you have broken into their facility.", "That phase of the plan was a success.", "Press ENTER to continue."], 380, function () {
                icons.push(new MsgBox(3, 3, ["Now you're gonna need to know how the controls work.", "You can use WASD to move around.", "Try exploring. Find the door.", "Press S to enter the door."], 380, function () {}));
            }));        
        } else if (lvl.plays == 1) {
            icons.push(new MsgBox(3, 3, ["Why'd you go back here?", "Nothing really of interest to see."], 380, function () {}));
        }
    }),
    new Level("2_map.png", "2_texture.png", [{ x: 4, y: 10, i: 0, destx: 59, desty: 20 }, { x: 43, y: 39, i: 2, destx: 4, desty: 92 }], (lvl) => {
        if (lvl.plays == 0) {
            icons.push(new MsgBox(3, 3, ["Looks like they have some defenses up ahead.", "There's these red lasers they use.", "Avoid them."], 380, function () {
                icons.push(new MsgBox(3, 3, ["Luckily it appears that the person who designed", "this building layout is an idiot.", "The walls will sometimes block the lasers,", "allowing you to get past."], 380, function () {}));
            }));        
        }
        o.push(new RedLaser(24, 3.001, Math.PI * 0.5, laser => { laser.x = 24 + 11 * Math.sin(l / 100)}));
        o.push(new RedLaser(25.5, 17.001, Math.PI * 0.5, laser => { laser.x = 25.5 + 3 * Math.sin(l / 60)}));
        o.push(new RedLaser(25.5, 28.999, -Math.PI * 0.5, laser => { laser.x = 25.5 + 3 * Math.sin(l / 60 + Math.PI / 2)}));
        o.push(new RedLaser(23.5, 32.001, Math.PI * 0.5, laser => { laser.x = 25.5 + 15 * Math.sin(l / 200)}));
        o.push(new RedLaser(23.5, 32.001, Math.PI * 0.5, laser => { laser.x = 25.5 + 15 * Math.sin(l / 200 + Math.PI / 6)}));
        o.push(new RedLaser(23.5, 39.999, -Math.PI * 0.5, laser => { laser.x = 25.5 + 15 * Math.sin(l / 200 + Math.PI)}));
        o.push(new RedLaser(23.5, 39.999, -Math.PI * 0.5, laser => { laser.x = 25.5 + 15 * Math.sin(l / 200 + 7 * Math.PI / 6)}));
    }),
    new Level("3_map.png", "3_texture.png", [{ x: 4, y: 92, i: 1, destx: 43, desty: 39 },{ x: 5, y: 9, i: 3, destx: 4, desty: 12 }], lvl => {
        if (lvl.plays == 0) {
            icons.push(new MsgBox(3, 3, ["See that thing there? The thing with the '!'?", "That's called a checkpoint.", "Go over to it and press S."], 380, function () {
                icons.push(new MsgBox(3, 3, ["Once you've acquired a checkpoint,", "we effectively own it.", "That way, if you are destroyed,", "we can deploy a replacement at the checkpoint,", "and transfer your consciousness over to it."], 380, function () {
                    icons.push(new MsgBox(3, 3, ["Checkpoints are essentially access terminals", "for this factory's computer.", "Once we take over all of them,", "the whole place is ours!"], 380, function () {
                
                    }));
                }));
            }));
        }
        o.push(new RedLaser(3.001, 90, Math.PI * 0.5, laser => { laser.dir = -Math.PI * 0.25 + Math.PI * 0.20 * Math.sin(l / 100)}));
        o.push(new RedLaser(13.5, 62.001, Math.PI * 0.5, laser => { laser.dir = Math.PI * 0.5 + Math.PI * 0.4 * Math.sin(l / 150)}));
        o.push(new RedLaser(3.001, 64, Math.PI * 0.5, laser => { laser.dir = -Math.PI * 0.25 + Math.PI * 0.20 * Math.sin(l / 100)}));
        o.push(new RedLaser(19.999, 53, Math.PI * 0.5, laser => { laser.dir = -Math.PI * 0.75 + Math.PI * 0.18 * Math.sin(l / 100)}));
        o.push(new RedLaser(19.999, 30, Math.PI * 0.5, laser => { laser.dir = -Math.PI * 0.75 + Math.PI * 0.20 * Math.sin(l / 100)}));
        o.push(new CheckPoint(11, 92, 2));
    }),
    new Level("4_map.png", "4_texture.png", [{ x: 4, y: 12, i: 2, destx: 5, desty: 9 }, { x: 8, y: 12, i: 4, destx: 5, desty: 9 }, { x: 12, y: 12, i: 5, destx: 5, desty: 9 }, { x: 16, y: 12, i: 6, destx: 5, desty: 9 }, { x: 25, y: 12, i: 7, destx: 5, desty: 9 }], (lvl) => {
        if (lvl.plays == 0) {
            icons.push(new MsgBox(3, 3, ["I'm detecting something moving in the rooms ahead.", "No, it isn't a laser."], 380, function () {
                icons.push(new MsgBox(3, 3, ["Whatever it is, I assume it's trying to", "prevent us from reaching that last door."], 380, function () {
                    icons.push(new MsgBox(3, 3, ["You better get rid of it,", "and find out how to remove that laser.", "Use the left mouse button to fire your own laser.", "It might come in handy."], 380, function () {
                    
                    }));
                }));
            }));        
        }
    }),
];

levels.forEach(function (e) {
    e.load(addload);
});


var loadthese = ["playerbody.png", "playerhead.png", "door.png", "redlaser.png", "checkpoint.png", "checkpointsaved.png"];
var imgs = Array(loadthese.length);
var loadedAssets = 0;
for (var i = 0; loadthese.length > i; i++) {
    getImg(loadthese[i], function (image, i2) {
        imgs[i2] = image;
        loadedAssets++;
    }, i);
}

function dataFromImg(url, callback) {
    var img = new Image();
    img.src = url;
    img.onload = function() {
        var imagecanvas = document.createElement("canvas");
        var imagecontext = imagecanvas.getContext("2d");
        imagecanvas.width = img.width;
        imagecanvas.height = img.height;
        imagecontext.drawImage(img, 0, 0);
        callback(imagecontext.getImageData(0, 0, img.width, img.height));
    }
}


//level params
var lines;
var lines2;
var lines3;
var mapimage;
var lvdims = {
    x: 0,
    y: 0
};
var exits;

var icons = [];
var o = [];

function preloop() {
    if (loadedAssets == loadthese.length && loaded == levels.length) {
        levels[2].start();
        loop();
    } else {
        setTimeout(preloop, 0);
    }
}
preloop();