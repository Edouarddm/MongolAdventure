import k from "./kaboomContext.js";
import world from "./scenes/world.js";
import house from "./scenes/house.js";

// k.loadFont("gameboy", "./assets/gb.ttf");
k.loadSprite("assets", "assets/topdownasset.png", {
  sliceX: 39,
  sliceY: 31,
  anims: {
    "player-idle-down": 948,
    "player-down": {
      from : 948,
      to: 951,
      loop: true,
    },

    "player-idle-side": 987,
    "player-side": {
      from : 987,
      to: 990,
      loop: true,
    },

    "player-idle-up": 1026,
    "player-up": {
      from : 1026,
      to: 1029,
      loop: true,
    },
    "player-attack-up": 1106,
    "player-attack-down": 1104,
    "player-attack-right": 1105,
    "player-attack-left": 1105,

    "slime-idle-down": 858,
    "slime-down": { from: 858, to: 859, loop: true },
    "slime-idle-side": 860,
    "slime-side": { from: 860, to: 861, loop: true },
    "slime-idle-up": 897,
    "slime-up": { from: 897, to: 898, loop: true },

    "oldman-down": 866,
    "oldman-side": 907,
    "oldman-up": 905,
  },
});

const scenes = {
  world,
  house,
};

for (const sceneName in scenes) {
  k.scene(sceneName, () => scenes[sceneName](k));
}

k.go("world")
