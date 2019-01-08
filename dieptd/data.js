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
        source: "Triple_Shot_Tower",
        upgrades: [
            "Triplet_Tower"
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
    },
    {
        source: "Healer_Tower",
        upgrades: [
            "Healer_II_Tower"
        ]
    },
    {
        source: "Healer_II_Tower",
        upgrades: [
            "Healer_III_Tower",
            "Bulk_Healer_Tower"
        ]
    },
    {
        source: "Generator_Tower",
        upgrades: [
            "Generator_II_Tower",
        ]
    },
    {
        source: "Generator_II_Tower",
        upgrades: [
            "Generator_III_Tower",
        ]
    },
    {
        source: "Generator_III_Tower",
        upgrades: [
            "Generator_IIII_Tower",
        ]
    },
    {
        source: "Sniper_Tower",
        upgrades: [
            "Assassin_Tower",
            "Overseer_Tower"
        ]
    },
    {
        source: "Assassin_Tower",
        upgrades: [
            "Ranger_Tower",
        ]
    },
    {
        source: "Overseer_Tower",
        upgrades: [
            "Overlord_Tower"
        ]
    }
]



var menu_icons = [
    {
        x: 0,
        y: 0,
        text: "Tutorial Level",
        complete: false,
        lvl: lvls[0],
        unlocked: true,
        unlocks: []
    },
    {
        x: 300,
        y: 0,
        text: "Level 1",
        complete: false,
        lvl: lvls[1],
        unlocked: true,
        unlocks: [2]
    },
    {
        x: 600,
        y: 0,
        text: "Alpha Pentagon",
        complete: false,
        lvl: lvls[2],
        unlocked: false,
        unlocks: [3]
    },
    {
        x: 900,
        y: 300,
        text: "Out of Time",
        complete: false,
        lvl: lvls[3],
        unlocked: false,
        unlocks: [4]
    }
]