var level20 = {
    length: 8000,
    patterns: [
        {
            start: 0,
            end: 1500,
            func: function() {
                if (li % 5 == 0) {
                    o.push(new bullet(960 + 2000 * Math.cos(li / 30), 540 + 2000 * Math.sin(li / 30), li / 30 + tau * 0.5 + Math.sin(li / 15) * 0.2, 4, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 1200, "e", 12, 25, 5));
                }
            }
        },
        {
            start: 2000,
            end: 2064,
            func: function() {
                var m = 252 / 32;
                o.push(new bullet(960 + 2000 * Math.cos(tau / 64 * li * m), 540 + 2000 * Math.sin(tau / 64 * li * m), tau / 64 * li * m + tau * 0.5, 37, function() { 
                    rotateImg(ctx, smallTrap, this.x, this.y, 50, 50, this.dir);
                    this.v *= 0.98;
                }, 200, "e", 12, 75, 5));
            }
        },
        {
            start: 2000,
            end: 2200,
            func: function() {
                var m = 252 / 32;
                o.push(new bullet(960 + 2000 * Math.cos(tau / 64 * li * m), 540 + 2000 * Math.sin(tau / 64 * li * m), tau / 64 * li * m + tau * 0.5 + tau * 0.02, 12, function() { 
                    rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0);
                }, 400, "e", 12, 25, 5));
            }
        },
        {
            start: 2300,
            end: 2364,
            func: function() {
                var m = 252 / 32;
                o.push(new bullet(200 + 2000 * Math.cos(tau / 64 * li * m), 200 + 2000 * Math.sin(tau / 64 * li * m), tau / 64 * li * m + tau * 0.5, 37, function() { 
                    rotateImg(ctx, smallTrap, this.x, this.y, 50, 50, this.dir);
                    this.v *= 0.98;
                }, 200, "e", 12, 75, 5));
            }
        },
        {
            start: 2300,
            end: 2500,
            func: function() {
                var m = 252 / 32;
                o.push(new bullet(200 + 2000 * Math.cos(tau / 64 * li * m), 200 + 2000 * Math.sin(tau / 64 * li * m), tau / 64 * li * m + tau * 0.5 + tau * 0.02, 12, function() { 
                    rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0);
                }, 400, "e", 12, 25, 5));
            }
        },
        {
            start: 2600,
            end: 2664,
            func: function() {
                var m = 252 / 32;
                o.push(new bullet(200 + 2000 * Math.cos(tau / 64 * li * m), 880 + 2000 * Math.sin(tau / 64 * li * m), tau / 64 * li * m + tau * 0.5, 37, function() { 
                    rotateImg(ctx, smallTrap, this.x, this.y, 50, 50, this.dir);
                    this.v *= 0.98;
                }, 200, "e", 12, 75, 5));
            }
        },
        {
            start: 2600,
            end: 2800,
            func: function() {
                var m = 252 / 32;
                o.push(new bullet(200 + 2000 * Math.cos(tau / 64 * li * m), 880 + 2000 * Math.sin(tau / 64 * li * m), tau / 64 * li * m + tau * 0.5 + tau * 0.02, 12, function() { 
                    rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0);
                }, 400, "e", 12, 25, 5));
            }
        },
        {
            start: 3000,
            end: 3064,
            func: function() {
                var m = 252 / 32;
                o.push(new bullet(1720 + 2000 * Math.cos(tau / 64 * li * m), 880 + 2000 * Math.sin(tau / 64 * li * m), tau / 64 * li * m + tau * 0.5, 37, function() { 
                    rotateImg(ctx, smallTrap, this.x, this.y, 50, 50, this.dir);
                    this.v *= 0.98;
                }, 200, "e", 12, 75, 5));
            }
        },
        {
            start: 3000,
            end: 3200,
            func: function() {
                var m = 252 / 32;
                o.push(new bullet(1720 + 2000 * Math.cos(tau / 64 * li * m), 880 + 2000 * Math.sin(tau / 64 * li * m), tau / 64 * li * m + tau * 0.5 + tau * 0.02, 12, function() { 
                    rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0);
                }, 400, "e", 12, 25, 5));
            }
        },
        {
            start: 3300,
            end: 3364,
            func: function() {
                var m = 252 / 32;
                o.push(new bullet(1720 + 2000 * Math.cos(tau / 64 * li * m), 200 + 2000 * Math.sin(tau / 64 * li * m), tau / 64 * li * m + tau * 0.5, 37, function() { 
                    rotateImg(ctx, smallTrap, this.x, this.y, 50, 50, this.dir);
                    this.v *= 0.98;
                }, 200, "e", 12, 75, 5));
            }
        },
        {
            start: 3300,
            end: 3500,
            func: function() {
                var m = 252 / 32;
                o.push(new bullet(1720 + 2000 * Math.cos(tau / 64 * li * m), 200 + 2000 * Math.sin(tau / 64 * li * m), tau / 64 * li * m + tau * 0.5 + tau * 0.02, 12, function() { 
                    rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0);
                }, 400, "e", 12, 25, 5));
            }
        },
        {
            start: 2300,
            end: 2302,
            func: function() {
                if (li % 299 == 0) {

                } 
                if (li == 2301) {
                    o.push(new bullet(960, -100, tau / 4, 5, function() { 
                        dCircle(this.x, this.y, 30, diepRed); 
                        if (this.hp == 1) {
                            o.push(new tank(this.x, this.y, 50, function() { 
                                ctx.beginPath();
                                ctx.fillStyle = "#555555";
                                polygon(this.x, this.y, 6, 34, 0);
                                ctx.fill();
                                ctx.closePath();
                                dBarrel(this.x, this.y, 18, 60, 0, 0, this.dir, diepGrey);
                                dCircle(this.x, this.y, 24, diepRed);
                                hBar(this);
                            }, 3, function() {
                                this.timer++;
                                this.dir = Math.atan2(p.y - this.y, p.x - this.x);
                                if (this.timer % 70 == 0) {
                                    o.push(new bullet(this.x + offset(this, 0, 48).x, this.y + offset(this, 0, 48).y, this.dir, 16, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 100, "e", 12, 25, 5));
                                }
                            }, 24, "e"));
                        }
                    }, 80, "e", 12, 250, 5));
                    o.push(new bullet(960, 1180, 3 * tau / 4, 5, function() { 
                        dCircle(this.x, this.y, 30, diepRed); 
                        if (this.hp == 1) {
                            o.push(new tank(this.x, this.y, 50, function() { 
                                ctx.beginPath();
                                ctx.fillStyle = "#555555";
                                polygon(this.x, this.y, 6, 34, 0);
                                ctx.fill();
                                ctx.closePath();
                                dBarrel(this.x, this.y, 18, 60, 0, 0, this.dir, diepGrey);
                                dCircle(this.x, this.y, 24, diepRed);
                                hBar(this);
                            }, 3, function() {
                                this.timer++;
                                this.dir = Math.atan2(p.y - this.y, p.x - this.x);
                                if (this.timer % 70 == 0) {
                                    o.push(new bullet(this.x + offset(this, 0, 48).x, this.y + offset(this, 0, 48).y, this.dir, 16, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 100, "e", 12, 25, 5));
                                }
                            }, 24, "e"));
                        }
                    }, 80, "e", 12, 250, 5));
                }
            }
        },
        {
            start: 3700,
            end: 5500,
            func: function() {
                if (li % 13 == 0) {
                    o.push(new bullet(960 + 2000 * Math.cos(li / 30), 540 + 2000 * Math.sin(li / 30), li / 30 + tau * 0.5 + Math.sin(li / 15) * 0.2, 8, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 600, "e", 12, 25, 5));
                }
                if (li % 18 == 0) {
                    o.push(new bullet(p.x + 2000 * Math.cos(li / 50), p.y + 2000 * Math.sin(li / 50), li / 50 + tau / 2, 40, function() { 
                        rotateImg(ctx, smallTrap, this.x, this.y, 50, 50, this.dir);
                        this.v *= 0.98;
                    }, 500, "e", 12, 75, 5));
                }
            }
        },
        {
            start: 5300,
            end: 7000,
            func: function() {
                if (li % 250 == 0) {
                    o.push(new bullet(960 + 2000 * Math.cos(li / 50), 540 + 2000 * Math.sin(li / 50), li / 50 + tau / 2, 5, function() { 
                        dCircle(this.x, this.y, 30, diepRed); 
                        if (this.hp == 1) {
                            o.push(new tank(this.x, this.y, 50, function() { 
                                ctx.beginPath();
                                ctx.fillStyle = "#555555";
                                polygon(this.x, this.y, 6, 34, 0);
                                ctx.fill();
                                ctx.closePath();
                                dBarrel(this.x, this.y, 18, 60, 0, 0, this.dir, diepGrey);
                                dCircle(this.x, this.y, 24, diepRed);
                                hBar(this);
                            }, 3, function() {
                                this.timer++;
                                this.dir = Math.atan2(p.y - this.y, p.x - this.x);
                                if (this.timer % 70 == 0) {
                                    o.push(new bullet(this.x + offset(this, 0, 48).x, this.y + offset(this, 0, 48).y, this.dir, 16, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 100, "e", 12, 25, 5));
                                }
                            }, 24, "e"));
                        }
                    }, 300, "e", 12, 250, 5));
                }
            }
        },
        {
            start: 5300,
            end: 7100,
            func: function() {
                if (li % 16 == 0) {
                    o.push(new bullet(960 + 2000 * Math.cos(li / 30), 540 + 2000 * Math.sin(li / 30), li / 30 + tau * 0.5, 8, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 600, "e", 12, 25, 5));
                }
            }
        }
    ]
}