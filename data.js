const defaultCases = [
    {
        id: "neon",
        name: "Neon Case",
        price: 9.99,
        image: "[steamcdn-a.akamaihd.net](https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_gamma2.0.png)",
        skins: [
            {
                name: "AK-47 | Slate (Factory New)",
                image: "[steamcdn-a.akamaihd.net](https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_ak47_cu_ak47_slate_light_large.0.png)",
                value: 22.5,
                chance: 25
            },
            {
                name: "AWP | Lightning Strike",
                image: "[steamcdn-a.akamaihd.net](https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_awp_cu_awp_lightning_strike_light_large.0.png)",
                value: 580,
                chance: 1
            },
            {
                name: "Desert Eagle | Flame",
                image: "[steamcdn-a.akamaihd.net](https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_deagle_cu_deagle_kumicho_dragon_light_large.0.png)",
                value: 45,
                chance: 10
            },
            {
                name: "MP9 | Starlight",
                image: "[steamcdn-a.akamaihd.net](https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_mp9_cu_mp9_starlight_light_large.0.png)",
                value: 6.5,
                chance: 30
            }
        ]
    }
];

if (!localStorage.getItem("cases")) {
    localStorage.setItem("cases", JSON.stringify(defaultCases));
}
