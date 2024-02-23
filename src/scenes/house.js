import { colorizeBackground, drawBoundaries, drawTiles, fetchMapData } from "../utils.js";
import { generatePlayerComponents, setPlayerMovement } from "../entities/player.js";

export default async function house(k) {
  colorizeBackground(k, 40, 40, 40);
  const mapData = await fetchMapData("./assets/maps/house.json");
  const map = k.add([k.pos(520, 200)]);

  const entities = {
    oldnman: null,
    player: null,
  }

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
      }
        continue;
    }

    drawTiles(k, map, layer, mapData.tileheight, mapData.tilewidth);
  }

   k.camScale(4);

   setPlayerMovement(k, entities.player);

   entities.player.onCollide("door-exit", () => {
     k.go("world");
   })
}
