var level2 = {
    length: 12000,
    patterns: [
        {
            start: 0,
            end: 4000,
            func: function() {
                if (li % 7 == 0) {
                    o.push(new bullet(960 + 2000 * Math.cos(li / 32) + 700 * Math.cos(li / 73), 540 + 2000 * Math.sin(li / 32) + 700 * Math.cos(li / 73), li / 32 + tau * 0.5, 8, function() { rotateImg(ctx, smallBullet, this.x, this.y, 24, 24, 0); }, 600, "e", 12, 25, 5));
                }
            }
        }   
    ]
}