//simple tank type (x position, y position, draw function, action function)
function Game_Obj(x, y, draw, action, discrim, hp) {
    //sets discriminator (in order to discriminate between objects)
    this.discrim = discrim;

    //set x and y positions and velocities
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;

    //set angle
    this.angle = 0;

    //set hp
    this.hp = hp;
    this.mhp = hp;

    //set internal timer
    this.t = 0;

    //tank drawing function
    this.draw = function () {
        draw(this);
    }

    //tank action function, triggers every frame
    this.action = function () {

        //custom actions
        action(this);

        //increase by velocity
        this.x += this.dx;
        this.y += this.dy;

        //increase local time
        this.t++;
    }
}

//generic, simple tower
function Simple_Tower(x, y, draw, action, action_in_FOV, hp, fov, power_cap, min_power) {

    //create tower
    var tank = new Game_Obj(x, y, draw, function (a) {
        
        //clamp power and hp
        a.hp = clamp(a.hp, 0, a.mhp);
        a.power = clamp(a.power, 0, a.power_cap);

        request_power(a);

        //do simple action to do by default every frame
        a.action_2(a);

        //get the angle to nearest target
        var angle = get_angle_to_target(a, "e", a.fov);

        //do the FOV action (usually some kind of bullet firing)
        if (angle !== false && a.power >= a.min_power) {
            a.angle = angle;
            a.action_in_FOV(a);
        }

        a.t++;
    }, "p", hp);

    //set custom properties
    tank.action_2 = action;
    tank.action_in_FOV = action_in_FOV;
    tank.fov = fov;
    tank.power = 0;
    tank.power_cap = power_cap;
    tank.min_power = min_power;
    tank.t = 0;

    //return the tank
    return tank;
}

//even simpler tower, just with added properties
function Simpler_Tower(x, y, draw, action, hp, fov) {
    
    //create tower
    var tank = new Game_Obj(x, y, draw, action, "p", hp);

    tank.fov = fov;
    tank.power = 0;
    tank.t = 0;

    //return the tank
    return tank;
}