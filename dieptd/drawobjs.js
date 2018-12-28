function Draw_Obj(obj, x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale.factor, scale.factor);
    switch (obj) {
        case "Basic_Tower":
            //draw base
            tank_base(0, 0, 30);

            //draw tank
            diep_barrel(0, 0, 16, 40, angle);
            diep_circle(0, 0, 20, "#1db2df", "#1386a6");

            //fov
            fov(Basic_Tower(0, 0));
            break;
        case "Relay_Tower":
            //draw base
            tank_base(0, 0, 30);

            //draw tank
            diep_barrel(0, 0, 16, 40, angle);
            diep_circle(0, 0, 20, "#00e06c", "#00a851");
            fov(Relay_Tower(0, 0));
            break;
        case "Generator_Tower":
            //draw base
            tank_base(0, 0, 40);

            //draw tank
            diep_barrel(0, 0, 16, 50, angle);
            diep_circle(0, 0, 30, "#00e06c", "#00a851");
            fov(Generator_Tower(0, 0));
            break;
        case "Healer_Tower":
            //draw base
            tank_base(0, 0, 30);

            //draw tank
            diep_barrel(0, 0, 32, 35, angle);
            diep_circle(0, 0, 20, "#00e06c", "#00a851");
            fov(Healer_Tower(0, 0));
            break;
        case "Miner_Tower":
            //draw base
            tank_base(0, 0, 30);

            //draw tank
            diep_barrel(0, 0, 16, 40, angle);
            diep_circle(0, 0, 20, "#999999", "#727272");
            fov(Miner_Tower(0, 0));
            break;
    }
    ctx.restore();
}