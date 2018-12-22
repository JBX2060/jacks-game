//pythagorean distance function
function dist(x1, y1, x2, y2) {

    //do distance from origin if only one coordinate pair is provided
    if (x2 == undefined) {
        return Math.sqrt(x1 * x1 + y1 * y1);
    } else {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }
}

//shorter notation for distance between two game objects
function dist_to_obj(a, b) {
    return dist(a.x, a.y, b.x, b.y);
}

//simple point to and move towards function
function simple_move_behavior(a, v, discrim, minrange) {
    var closest = find_closest(a, o, discrim);
    if (closest !== false) {
        if (dist_to_obj(a, o[closest]) > minrange) {
            a.angle = point_towards(a, o[closest]);
            a.dx += Math.cos(a.angle) * v;
            a.dy += Math.sin(a.angle) * v;
        } else if (dist_to_obj(a, o[closest]) < minrange - 10) {
            a.angle = point_towards(a, o[closest]);
            a.dx -= Math.cos(a.angle) * v;
            a.dy -= Math.sin(a.angle) * v;
        }
    }
}

//set angle based on closest applicable target
function get_angle_to_target(a, discrim, range) {
    var closest = find_closest(a, o, discrim);
    if (closest !== false && dist_to_obj(a, o[closest]) <= range) {
        return point_towards(a, o[closest]);
    }
    return false;
}

//"offset" transformation for bullets fired from transformed barrels
function offset_transform(x, y, ox, oy, a) {
    x += Math.sin(a) * ox;
    y += Math.cos(a) * ox;
    x += Math.cos(a) * oy;
    y += Math.sin(a) * oy;
    return {
        x: x,
        y: y
    };
}

//tests if in an angle range (bypassing issue of angle "resetting" from 2pi to 0). Always choosest smallest option between the two given ranges
function in_smallest_angle_range(a, b) {

}


//find closest
function find_closest(me, arr, discrim) {

    //index of object with minimum distance
    var min_dist_index = false;

    //minimum distance
    var min_dist = Infinity;

    //cycle through array, find minimum distance
    arr.forEach(function (e, i) {
        if (dist(e.x, e.y, me.x, me.y) < min_dist && e.discrim == discrim) {
            min_dist_index = i;
            min_dist = dist(e.x, e.y, me.x, me.y);
        }
    });

    return min_dist_index;
}

//finds direction pointing towards a given object
function point_towards(a, b) {
    return Math.atan2(b.y - a.y, b.x - a.x);
}

//get all indexes of objects in range of a given tower
function get_all_in_range(a, arr, discrim) {
    
    //all in range
    var in_range = [];
    
    arr.forEach(function (e, i) {
        if (dist(e.x, e.y, a.x, a.y) <= a.fov && e.discrim == discrim) {
            in_range.push(i);
        }
    });

    return in_range;
}

//clamp between two values
function clamp(value, min, max) {
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    }
    return value;
}