//hey so lemme explain how all this level stuff works
//first of all you need to define an object with two parameters, length and patterns
//length is currently unused but i might make a use for it in the future so idk, just set it to the "length" of the level in ticks (which are 1/60th of a second)
//patterns contains every one of the "patterns" which will execute throughout the level

var level1 = {
    length: 8000,
    patterns: [
        {   
            //each pattern is an object with a start, an end, and a function.
            //between the start and the end, the function (func) will be called every frame
            start: 0,
            end: 1500,
            //this function is called every frame the loop counter (li) is between the "start" and the "end". The loop counter starts at zero and increments every frame (1/60th second)
            func: function() {
                //using modulo on the loop counter prevents events from occuring every frame. This one specifically causes the event to occur on every 25th frame.
                //everything within this if statement in particular creates a pattern of bullets which you can observe at the beginning of level 1.
                if (li % 25 == 0) {
                    //"o" is the array which contains all tanks, bullets, etc, and this adds stuff to it.
                    //bullets are being added to the array here as you can see.
                    //bullet(x, y, dir, v, draw, hp, side, r, dmg, dmgSpd) is the bullet function with all of its parameters.
                    //x and y are the initial positions (the game is 1920 x 1080)
                    //dir is the direction (radians), and v is the velocity (in pixels per tick)
                    //draw is the draw function, which is called every frame to draw the tank on the canvas
                    //hp is the length of time in ticks the bullet is active. After this time it disappears.
                    //side is what "side" the bullet is on, which can be "e" (enemy) or "p" (player)
                    //r is the radius of the bullet used to determine collisions.
                    //dmg is the total damage of the bullet.
                    //dmgSpd determines how fast the bullet deals damage while it is colliding with a player. The same amount is subtracted from the bullet's "damage" value
                    //once the damage value reaches zero or below, the bullet is removed.
                    o.push(new bullet(960 + 2000 * Math.cos(li / 75), 540 + 2000 * Math.sin(li / 75), li / 75 + tau * 0.5 + Math.sin(li / 100) * 0.3, 12, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 400, "e", 12, 25, 5));
                    o.push(new bullet(960 + 2000 * Math.cos(li / 75 + tau / 2), 540 + 2000 * Math.sin(li / 75 + tau / 2), li / 75 + Math.sin(li / 100) * 0.3, 12, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 400, "e", 12, 25, 5));
                    //to get a good idea of what the bullets are doing here, I'm initially starting off in the center of the screen, which is 960, 540.
                    //then, I'm using the cosine function for x, and the sine function for y, to move them 2000 units away in a certain direction 
                    //this direction is (li / 75) radians, so it gives the appearance of the bullets spinning.
                    //for the second one, I add tau / 2 (tau is a variable i made equal to 2 * Math.PI for easier calculations with angles).
                    //this makes it appear on the opposite side as the first one.
                    //for direction, I initially set it to (li / 75) radians, but then I added tau * 0.5 to make it move in the opposite direction, towards the center of the screen
                    //because the second one is moving in the opposite direction i had no need to add tau * 0.5 to it
                    //in order to create a slight offset changing the direction slightly added a sine function to the direction. This impacts the direction of the bullets greatly, even though i set its magnitude to 0.3
                    //12 is a reasonable speed for bullets
                    //for the draw function, I used the "smallbullet" texture. Bullets of that size appear frequently, so it is efficent to use an image texture instead of the canvas.
                    //This is the draw function: function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }
                    //bullets last a long time (400 ticks)
                    //they're on the "e" (enemy) team because these are obstacles
                    //hitbox is 12 despite the fact that the "radius" of the bullets is 10. The reason for this is that the border of the bullets is four pixels wide. Two of those pixels are located outside of the 10 pixel radius.
                    //in total, the bullets do 25 damage. This means the player can be taken out in four hits, though it may take more if bullets pass through.
                    //the bullets do five damage per tick, so contact with the player for five ticks will kill the bullet.
                }
                //you can probably tell that this part of the script is used far less frequently due to it only occuring on every 299th frame.
                //this script creates tanks from the top left corner.
                if (li % 299 == 0) {
                    //tank(x, y, hp, draw, dir, behavior, r, side)
                    //makes a tank
                    //x and y are positions
                    //hp describes how much damage the tank can take before dying
                    //draw is the draw function
                    //dir is the tank's direction
                    //behavior is the tank's behavior (movement, bullets, etc.). Basically anything that doesn't involve drawing on the screen.
                    //r is radius, the hitbox, just like the bullets.
                    //side is "p" or "e", determines what "side" the tank is on.
                    o.push(new tank(0, 0, 25, function() { 
                        //dBarrel(x, y, width, height, xOffset, yOffset, dir, scheme)
                        //"diep.io barrel"
                        //x and y are the position
                        //width is the width of the barrel
                        //height is the height of the barrel
                        //xOffset is the offset of the barrel to the side.
                        //yOffset is the offset of the barrel forwards or backwards
                        //dir is the barrel direction
                        //scheme is the color scheme. Some examples of this include diepBlue, diepRed, and diepGrey.
                        dBarrel(this.x, this.y, 20, 44, 0, 0, this.dir, diepGrey);
                        //dCircle(x, y, r, scheme)
                        //"diep.io circle"
                        //x and y are position
                        //r is radius
                        //scheme is the color scheme.
                        dCircle(this.x, this.y, 24, diepRed);
                        //hBar(obj)
                        //returns a health bar for a tank object
                        hBar(this);
                        //in this case starting direction is irrelevant (direction is controlled by behavior scripts), so I just have it set as "3" for no reason.
                    }, 3, function() {
                        //increases the tank's timer (which starts at zero)
                        this.timer++;
                        //simpleMoveBehavior1(obj, spd, friction)
                        //simple move behavior which makes the target chase the player
                        //obj is the object thats moving
                        //spd is the velocity added to the object's speed every tick
                        //friction is the speed falloff per tick (for example if its set to 0.98, every tick, the velocity will be decreased by 2%)
                        simpleMoveBehavior1(this, 0.15, 0.98);
                        //each tank has its own individual timer that increments every tick. Therefore, the code inside of here will be executed every tick.
                        if (this.timer % 50 == 0) {
                            //just your standard bullets spawned by the tank.
                            //one thing to note is the offset(obj, x, y, dir) function
                            //this function offsets bullets according to tank direction and barrel offset
                            //obj is the object to target
                            //x and y are the x offsets and y offsets respectively
                            //direction is the directional offset of the barrel compared to the object's direction.
                            //even though the barrel of the basic tank has no offset, I add to the y offset so the bullets originate at the end of the barrel rather than in the center of the tank.
                            o.push(new bullet(this.x + offset(this, 0, 22).x, this.y + offset(this, 0, 22).y, this.dir, 12, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 100, "e", 12, 25, 5));
                        }
                    }, 24, "e"));
                } 
            }
        },
        {
            start: 1400,
            end: 4000,
            func: function() {
                if (li % 6 == 0) {
                    o.push(new bullet(960 + 2000 * Math.cos(li / 50), 540 + 2000 * Math.sin(li / 50), li / 50 + tau / 2, 12, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 400, "e", 12, 25, 5));
                }
                if (li % 699 == 0) {
                    for (var ii = 0; 3 > ii; ii++) {
                        o.push(new tank(960 + Math.cos(tau / 3 * ii) * 2000, 540 + Math.sin(tau / 3 * ii) * 2000, 25, function() { 
                            dBarrel(this.x, this.y, 18, 44, 12, 0, this.dir, diepGrey);
                            dBarrel(this.x, this.y, 18, 44, -12, 0, this.dir, diepGrey);
                            dCircle(this.x, this.y, 24, diepRed);
                            hBar(this);
                        }, 3, function() {
                            this.timer++;
                            simpleMoveBehavior1(this, 0.15, 0.98);
                            if (this.timer % 50 == 0) {
                                o.push(new bullet(this.x + offset(this, 12, 22).x, this.y + offset(this, 12, 22).y, this.dir, 12, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 100, "e", 12, 25, 5));
                            }
                            if (this.timer % 50 == 25) {
                                o.push(new bullet(this.x + offset(this, -12, 22).x, this.y + offset(this, -12, 22).y, this.dir, 12, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 100, "e", 12, 25, 5));
                            }
                        }, 24, "e"));
                    }
                } 
            }
        },
        {
            start: 3700,
            end: 5000,
            func: function() {
                if (li % 200 == 0) {
                    o.push(new bullet(960 + 2000 * Math.cos(li / 50), 540 + 2000 * Math.sin(li / 50), li / 50 + tau / 2, 6, function() { 
                        dCircle(this.x, this.y, 30, diepRed); 
                        if (this.hp == 1) {
                            o.push(new tank(this.x, this.y, 100, function() { 
                                ctx.beginPath();
                                ctx.fillStyle = "#555555";
                                polygon(this.x, this.y, 6, 34, 0);
                                ctx.fill();
                                ctx.closePath();
                                dBarrel(this.x, this.y, 18, 44, 0, 0, this.dir - tau / 8, diepGrey);
                                dBarrel(this.x, this.y, 18, 44, 0, 0, this.dir, diepGrey);
                                dBarrel(this.x, this.y, 18, 44, 0, 0, this.dir + tau / 8, diepGrey);
                                dCircle(this.x, this.y, 24, diepRed);
                                hBar(this);
                            }, 3, function() {
                                this.dir = Math.atan2(p.y - this.y, p.x - this.x);
                                this.timer++;
                                this.hp -= 0.1;
                                if (this.timer % 75 == 0) {
                                    o.push(new bullet(this.x + offset(this, 0, 22, -tau / 8).x, this.y + offset(this, 0, 22, -tau / 8).y, this.dir - tau / 8, 12, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 100, "e", 12, 25, 5));
                                    o.push(new bullet(this.x + offset(this, 0, 22).x, this.y + offset(this, 0, 22).y, this.dir, 12, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 100, "e", 12, 25, 5));
                                    o.push(new bullet(this.x + offset(this, 0, 22, tau / 8).x, this.y + offset(this, 0, 22, tau / 8).y, this.dir + tau / 8, 12, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 100, "e", 12, 25, 5));
                                }
                            }, 24, "e"));
                        }
                    }, 400, "e", 12, 250, 5));
                }
            }
        },
        {
            start: 6001,
            end: 99999999,
            func: function() {
                if (li == 6002) {
                    o.push(new tank(960, -150, 1000, function() { 
                        dBarrel(this.x, this.y, 42, 100, 0, 0, this.dir - tau / 8, diepGrey);
                        dBarrel(this.x, this.y, 42, 100, 0, 0, this.dir + tau / 8, diepGrey);
                        dBarrel(this.x, this.y, 42, 110, 0, 0, this.dir - tau / 16, diepGrey);
                        dBarrel(this.x, this.y, 42, 110, 0, 0, this.dir + tau / 16, diepGrey);
                        dBarrel(this.x, this.y, 42, 120, 0, 0, this.dir, diepGrey);
                        dCircle(this.x, this.y, 48, diepRed);
                        hBar(this);
                        ctx3.textAlign = "center";
                        dText("[BP]BE1A", this.x, this.y - 63, 24);
                    }, 3, function() {
                        this.dir = Math.atan2(p.y - this.y, p.x - this.x);
                        this.timer++;
                        if (li < 6690) {
                            this.y++;
                            this.hp = 1000;
                            this.mhp = 1000;
                        } else {
                            b = { x: this.x, y: this.y, hp: this.hp };

                            if (dist(this.x, this.y, p.x, p.y) > 400) {
                                simpleMoveBehavior1(this, 0.25, 0.98);
                                this.dir += tau / 2;
                            } else {
                                simpleMoveBehavior1(this, 0.03, 0.98);
                            }
                            
                            if (this.timer % 36 == 0) {
                                o.push(new bullet(this.x + offset(this, 0, 96).x, this.y + offset(this, 0, 96).y, this.dir, 8, function() { dCircle(this.x, this.y, 22, diepRed); }, 75, "e", 24, 50, 5));
                            }
                            if (this.timer % 36 == 12) {
                                o.push(new bullet(this.x + offset(this, 0, 96, tau / 16).x, this.y + offset(this, 0, 96, tau / 16).y, this.dir + tau / 16, 8, function() { dCircle(this.x, this.y, 22, diepRed); }, 75, "e", 24, 50, 5));
                                o.push(new bullet(this.x + offset(this, 0, 96, -tau / 16).x, this.y + offset(this, 0, 96, -tau / 16).y, this.dir - tau / 16, 8, function() { dCircle(this.x, this.y, 22, diepRed); }, 75, "e", 24, 50, 5));
                            }
                            if (this.timer % 36 == 24) {
                                o.push(new bullet(this.x + offset(this, 0, 96, tau / 8).x, this.y + offset(this, 0, 96, tau / 8).y, this.dir + tau / 8, 8, function() { dCircle(this.x, this.y, 22, diepRed); }, 75, "e", 24, 50, 5));
                                o.push(new bullet(this.x + offset(this, 0, 96, -tau / 8).x, this.y + offset(this, 0, 96, -tau / 8).y, this.dir - tau / 8, 8, function() { dCircle(this.x, this.y, 22, diepRed); }, 75, "e", 24, 50, 5));
                            }
                        }
                    }, 48, "e"));
                }
            }
        },
        {
            start: 6050,
            end: 6300,
            func: function() {
                ctx3.textAlign = "center";
                dText("BUFF PENTA BUFF PENTA BUFF PENTA", 960, 540, 36);
            }
        },
        {
            start: 6301,
            end: 6550,
            func: function() {
                ctx3.textAlign = "center";
                dText("WAT???? YOU NO WANT PENTA BUFF?", 960, 540, 36);
            }
        },
        {
            start: 6551,
            end: 6690,
            func: function() {
                ctx3.textAlign = "center";
                dText("DIE!!!", 960, 540, 36);
            }
        },
        {
            start: 6700,
            end: 99999999,
            func: function() {
                if (li % 150 == 0 && b.hp < 666) {
                    o.push(new tank(p.x + (p.x - b.x) / dist(p.x, p.y, b.x, b.y) * 2400, p.y + (p.y - b.y) / dist(p.x, p.y, b.x, b.y) * 2400, 25, function() { 
                        dBarrel(this.x, this.y, 20, 44, 0, 0, this.dir, diepGrey);
                        dBarrel(this.x, this.y, 20, 39, 0, -5, this.dir + 3 * tau / 8, diepGrey);
                        dBarrel(this.x, this.y, 20, 39, 0, -5, this.dir - 3 * tau / 8, diepGrey);
                        dBarrel(this.x, this.y, 20, 39, 0, 0, this.dir + 5 * tau / 12, diepGrey);
                        dBarrel(this.x, this.y, 20, 39, 0, 0, this.dir - 5 * tau / 12, diepGrey);
                        dCircle(this.x, this.y, 24, diepRed);
                        hBar(this);
                        dText("[BP]BE1A BOT", this.x, this.y - 30, 18);
                    }, 3, function() {
                        this.timer++;
                        this.hp -= 0.05;
                        simpleMoveBehavior1(this, 0.15, 0.992);
                        if (this.timer % 40 == 0) {
                            o.push(new bullet(this.x, this.y, this.dir, 12, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 100, "e", 12, 25, 5));
                        }
                        if (this.timer % 16 == 0) {
                            o.push(new bullet(this.x, this.y, this.dir + 5 * tau / 12, 15, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 15, "e", 12, 5, 5));
                            o.push(new bullet(this.x, this.y, this.dir - 5 * tau / 12, 15, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 15, "e", 12, 5, 5));
                        }
                        if (this.timer % 16 == 8) {
                            o.push(new bullet(this.x, this.y, this.dir + 3 * tau / 8, 15, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 15, "e", 12, 5, 5));
                            o.push(new bullet(this.x, this.y, this.dir - 3 * tau / 8, 15, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 15, "e", 12, 5, 5));
                        }   
                    }, 24, "e"));
                }
                if (b.hp < 333) {
                    if (li % 12 == 0) {
                        o.push(new bullet(960 + 2000 * Math.cos(li / 75), 540 + 2000 * Math.sin(li / 75), li / 75 + tau * 0.5 + Math.sin(li / 100) * 0.3, 12, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 400, "e", 12, 25, 5));
                    }
                }
                if (b.hp <= 0) {
                    li = 0;
                    lvi++;
                }
            }
        }
    ]
}