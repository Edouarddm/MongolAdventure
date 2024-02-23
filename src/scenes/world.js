import { generatePlayerComponents, setPlayerMovement } from "../entities/player.js";
import { generateSlimeComponents } from "../entities/slime.js";
import { colorizeBackground, drawBoundaries, drawTiles, fetchMapData } from "../utils.js";

export default async function world(k) {
  colorizeBackground(k, 76, 170, 255);
  const mapData = await fetchMapData("./assets/maps/world.json");
  console.log(mapData);

  const map = k.add([k.pos(0, 0)])

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

  k.camScale(3);
  k.camPos(entities.player.worldPos());
  k.onUpdate(async () => {
    if (entities.player.pos.dist(k.camPos())) {
      await k.tween(
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
}