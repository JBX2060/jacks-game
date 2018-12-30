function handle_upgrades() {
    // switch (select.selection.tank_type) {
    //     case "Basic_Tower":
    //         if (kd[81]) {
    //             upgrade(Twin_Tower(select.selection.x, select.selection.y));
    //         }
    //         break;
    //     case "Twin_Tower":
    //         if (kd[81]) {
    //             upgrade(Triple_Shot_Tower(select.selection.x, select.selection.y));
    //         }
    //         break;
    //     // case "relay":
    //     //     if (k[81]) {
    //     //         o.push(High_Bandwidth_Relay_Tower(select.selection.x, select.selection.y));
    //     //         o[o.length - 1].hp = select.selection.hp / select.selection.mhp * o[o.length - 1].mhp;
    //     //         o.splice(select.selection_index, 1);
    //     //         select.selection = o[o.length - 1];
    //     //         select.selection_index = o.length - 1;
    //     //     }
    // }
    if (k[88]) {
        pt += select.selection.cost;
        //o.splice(select.selection_index, 1);
        select.selection.hp = -1;
        select.selecting = false;
    }
}

var upgrades = [
    {
        source: "Basic_Tower",
        upgrades: [
            "Twin_Tower",
            "Machine_Gun_Tower",
            "Sniper_Tower"
        ]
    },
    {
        source: "Twin_Tower",
        upgrades: [
            "Triple_Shot_Tower"
        ]
    },
    {
        source: "Machine_Gun_Tower",
        upgrades: [
            "Destroyer_Tower"
        ]
    },
    {
        source: "Miner_Tower",
        upgrades: [
            "Triangle_Miner_Tower"
        ]
    },
    {
        source: "Triangle_Miner_Tower",
        upgrades: [
            "Pentagon_Miner_Tower"
        ]
    }
]