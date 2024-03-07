import { playerState, gameState } from "../state/stateManager.js";
import { colorizeBackground, drawTiles, fetchMapData, drawBoundaries, onAttacked, onCollideWithPlayer } from "../utils.js";
import { generatePlayerComponents, setPlayerMovement } from "../entities/player.js";

export default async function dungeon(k) {
  colorizeBackground(k, 76, 170, 255);
  const mapData = await fetchMapData("./assets/maps/dungeon.json");
  const map = k.add([k.pos(420, 95)]);

  const entities = {
    player: null,
    ghost: null,
  };

  const layers = mapData.layers;
  for (const layer of layers) {
    if (layer.name === "Boundaries") {
      drawBoundaries(k, map, layer);
      continue;
    }

    if (layer.name === "SpawnPoints") {
      for (const object of layer.objects) {
        if (object.name === "player") {
          entities.player = map.add(
            generatePlayerComponents(k, k.vec2(object.x, object.y))
          );
          continue;
        }

        // if (object.name === "ghost" && !gameState.getIsGhostDefeated()
        // ){
        //   entities.ghost = map.add(
        //     generateGhostComponents(k, k.vec2(object.x, object.y))
        //   );
        //   continue;
        // }

        if (object.name === "prison-door") {
          map.add([
            k.sprite("assets", {
              frame: playerState.getHasKey() ? 506 : 505,
            }),
            !playerState.getHasKey() && k.area(),
            !playerState.getHasKey() && k.body({ isStatic: true}),
            k.pos(object.x, object.y),
            "prison-door",
          ]);
          continue;
        }
      }
      continue;

    }
    drawTiles(k, map, layer, mapData.tileheight, mapData.tilewidth);

  }
  k.camScale(4);

  setPlayerMovement(k, entities.player);
  entities.player.onCollide("door-exit", () => {
    gameState.setPreviousScene("dungeon");
    k.go("world");
  });
}
