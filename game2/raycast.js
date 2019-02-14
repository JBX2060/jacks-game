function raycast(x, y, dx, dy, ls) {
    var distance = dist(dx, dy);
    dx *= 1000 / distance;
    dy *= 1000 / distance;
    var ray = {
        x: x,
        y: y,
        dx: dx,
        dy: dy
    };
    var ints = [];
    ls.forEach(function (e) {
        ints.push(e.intersect(ray));
    });
    var ints2 = undefined;
    var mindist = Infinity;
    ints.forEach(function (e) {
        if (e && dist(x - e.x, y - e.y) < mindist) {
            ints2 = e;
            mindist = dist(x - e.x, y - e.y);
        }
    });
    return ints2;
}

function shadowcast(ls) {
    var ints = [];
    ls.forEach(function (e) {
        var dir = Math.atan2(-player.y + e.sy, -player.x + e.sx);
        ints.push(raycast(player.x, player.y, Math.cos(dir - 0.001), Math.sin(dir - 0.001), ls));
        ints.push(raycast(player.x, player.y, Math.cos(dir + 0.001), Math.sin(dir + 0.001), ls));
        var dir = Math.atan2(-player.y + e.ey, -player.x + e.ex);
        ints.push(raycast(player.x, player.y, Math.cos(dir - 0.001), Math.sin(dir - 0.001), ls));
        ints.push(raycast(player.x, player.y, Math.cos(dir + 0.001), Math.sin(dir + 0.001), ls));
    });
    ints.sort(function (a, b) {
        return Math.atan2(player.y - a.y, player.x - a.x) - Math.atan2(player.y - b.y, player.x - b.x);
    })
    return ints;
}