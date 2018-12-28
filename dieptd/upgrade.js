function handle_upgrades() {
    if (k[88]) {
        pt += select.selection.cost;
        o.splice(select.selection_index, 1);
        select.selecting = false;
    }
    switch (select.selection.tank_type) {
        case "basic":
            if (k[81]) {
                o.push(Twin_Tower(select.selection.x, select.selection.y));
                o[o.length - 1].hp = select.selection.hp / select.selection.mhp * o[o.length - 1].mhp;
                o.splice(select.selection_index, 1);
                select.selection = o[o.length - 1];
                select.selection_index = o.length - 1;
            }
            break;
        // case "relay":
        //     if (k[81]) {
        //         o.push(High_Bandwidth_Relay_Tower(select.selection.x, select.selection.y));
        //         o[o.length - 1].hp = select.selection.hp / select.selection.mhp * o[o.length - 1].mhp;
        //         o.splice(select.selection_index, 1);
        //         select.selection = o[o.length - 1];
        //         select.selection_index = o.length - 1;
        //     }
    }
}