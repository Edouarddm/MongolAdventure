import { generatePlayerComponents, setPlayerMovement } from "../entities/player.js";
import { generateSlimeComponents, setSlimeAI } from "../entities/slime.js";
import { gameState } from "../state/stateManager.js";
import { healthBar } from "../uiComponents/healthBar.js";
import { colorizeBackground, drawBoundaries, drawTiles, fetchMapData, onAttacked, onCollideWithPlayer } from "../utils.js";

export default async function world(k) {
  colorizeBackground(k, 76, 170, 255);
  const mapData = await fetchMapData("./assets/maps/world.json");
  const map = k.add([k.pos(0, 0)]);
  const previousScene = gameState.getPreviousScene();

  const entities = {
    player: null,
    slimes: [],
  };

  const layers = mapData.layers;
  for (const layer of layers) {
    if (layer.name === "Boundaries") {
      drawBoundaries(k, map, layer);
      continue;
    }
    if (layer.name === "SpawnPoints") {
      for (const object of layer.objects) {
        if (object.name === "player-dungeon" && previousScene === "dungeon"
        ) {
          entities.player = map.add(
            generatePlayerComponents(
              k,
              k.vec2(object.x, object.y)
            )
          );
          continue;
        }
        if (object.name === "player") {
            entities.player = map.add(
              generatePlayerComponents(
                k,
                k.vec2(object.x, object.y)
              )
            );
            continue;
        }

        if (object.name === "slime") {
            entities.slimes.push(
              map.add(
                generateSlimeComponents(
                  k,
                  k.vec2(object.x, object.y)
                )
              )
            );
            continue;
        }
      }
        continue;
    }

    drawTiles(k, map, layer, mapData.tileheight, mapData.tilewidth);
  }

  k.camScale(4);
  k.camPos(entities.player.worldPos());
  k.onUpdate(() => {
    if (entities.player.pos.dist(k.camPos()) > 3) {
        k.tween(
        k.camPos(),
        entities.player.worldPos(),
        0.15,
        (newPos) => {
          k.camPos(newPos);
        },
        k.easings.linear,
      )
    }
  });

  setPlayerMovement(k, entities.player);

  for (const slime of entities.slimes) {
    setSlimeAI(k, slime);
    onAttacked(k, slime, entities.player);
    onCollideWithPlayer(k, slime,);
  }

  entities.player.onCollide("door-entrance", () => {
    k.go("house");
  });
  entities.player.onCollide("dungeon-door-entrance", () => k.go("dungeon"));
  healthBar(k);
}
