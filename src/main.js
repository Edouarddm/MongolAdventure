import k from "./kaboomContext.js";
import world from "./scenes/world.js";

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

    "slime-idle-down": 858,
  },
});

const scenes = {
  world,
}

for (const sceneName in scenes) {
  k.scene(sceneName, () => scenes[sceneName](k));
}

k.go("world")
