function draw_obj(obj, x, y, angle, override_scale, override_fov) {
    ctx.save();
    ctx.translate(x, y);
    if (!override_scale) {
        ctx.scale(scale.factor, scale.factor);
    }
    switch (obj) {
        case "Basic_Tower":
            //draw base
            tank_base(0, 0, 30);

            //draw tank
            diep_barrel(0, 0, 16, 40, angle);
            diep_circle(0, 0, 20, "#1db2df", "#1386a6");

            //fov
            if (!override_fov) {
                fov(Basic_Tower(0, 0));
            }
            break;
        case "Relay_Tower":
            //draw base
            tank_base(0, 0, 30);

            //draw tank
            diep_circle(0, 0, 20, "#00e06c", "#00a851");

            if (!override_fov) {
                fov(Relay_Tower(0, 0));
            }
            break;
        case "Generator_Tower":
            //draw base
            tank_base(0, 0, 40);

            //draw tank
            diep_circle(0, 0, 30, "#00e06c", "#00a851");

            if (!override_fov) {
                fov(Generator_Tower(0, 0));
            }
            break;
        case "Healer_Tower":
            //draw base
            tank_base(0, 0, 30);

            //draw tank
            diep_barrel(0, 0, 32, 35, angle);
            diep_circle(0, 0, 20, "#00e06c", "#00a851");

            if (!override_fov) {
                fov(Healer_Tower(0, 0));
            }
            break;
        case "Miner_Tower":
            //draw base
            tank_base(0, 0, 30);

            //draw tank
            diep_barrel(0, 0, 16, 40, angle);
            diep_circle(0, 0, 20, "#999999", "#727272");

            if (!override_fov) {
                fov(Miner_Tower(0, 0));
            }
            break;
    }
    ctx.restore();
}