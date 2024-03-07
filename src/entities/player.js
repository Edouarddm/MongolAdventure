import { gameState, playerState } from "../state/stateManager.js";
import { areAnyOfTheseKeysDown, playAnimIfNotPlaying } from "../utils.js";

export function generatePlayerComponents(k, pos) {
  return [
    k.sprite("assets", {
      anim: "player-idle-down",
    }),
    k.area({shape: new k.Rect(k.vec2(3, 4), 10, 12)}),
    k.body(),
    k.pos(pos),
    k.opacity(),
    {
      speed: 60,
      attackPower: 1,
      direction: "down",
      isAttacking: false,
    },
    "player",
  ];
}

export function setPlayerMovement(k, player) {
  k.onKeyDown((key) => {
    if (gameState.getFreezePlayer()) return;

   if (["left", "a"].includes(key) && !areAnyOfTheseKeysDown(k, ["up", "w", "down", "s"])) {
      player.flipX = true;
      playAnimIfNotPlaying(player, "player-side");
      player.move(-player.speed, 0);
      player.direction = "left";
      return;
   }
    if (["right", "d"].includes(key) && !areAnyOfTheseKeysDown(k, ["up", "w", "down", "s"])) {
        player.flipX = false;
        playAnimIfNotPlaying(player, "player-side");
        player.move(player.speed, 0);
        player.direction = "right";
        return;
    }

    if (["up", "w"].includes(key)) {
      playAnimIfNotPlaying(player, "player-up");
      player.move(0, -player.speed);
      player.direction = "up";
      return;
    }

    if (["down", "s"].includes(key)) {
      playAnimIfNotPlaying(player, "player-down");
      player.move(0, player.speed);
      player.direction = "down";
      return;
    }

  });

  k.onKeyPress((key) => {
    if (!["space"].includes(key)) return;
    if (gameState.getFreezePlayer()) return;
    if (!playerState.getIsSwordEquipped()) return;
    player.isAttacking = true;

    if (k.get("swordHitBox").length === 0) {
      const swordHitBoxPosX = {
        left: player.worldPos().x -2,
        right: player.worldPos().x + 10,
        up: player.worldPos().x + 5,
        down: player.worldPos().x + 2,
      };

      const swordHitBoxPosY = {
        left: player.worldPos().y + 5,
        right: player.worldPos().y + 5,
        up: player.worldPos().y,
        down: player.worldPos().y + 10,
      };

      k.add([
        k.area({ shape: new k.Rect(k.vec2(0), 8, 8)}),
        k.pos (
          swordHitBoxPosX[player.direction],
          swordHitBoxPosY[player.direction],
        ),
        "swordHitBox",
      ]);
      k.wait(0.1, () => {
        k.destroyAll("swordHitBox");
        if (
          player.direction === "left" || player.direction === "right"
        ) {
          playAnimIfNotPlaying(player, "player-side");
          player.stop();
          return;
        }
        playAnimIfNotPlaying(player, `player-${player.direction}`);
        player.stop();
      });
    }

    playAnimIfNotPlaying(player, `player-attack-${player.direction}`);
  });

  k.onKeyRelease(() => {
    player.isAttacking = false;
    player.stop();
  });
}
