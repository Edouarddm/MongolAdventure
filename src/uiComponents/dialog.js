import { gameState } from "../state/stateManager.js";

async function displayLine(textContainer, line) {
  for (const char of line) {
    await new Promise((resolve) => {
      setTimeout(() => {
        textContainer.text += char;
        resolve();
      }, 15);
    })
  }
}

export async function dialog(k, pos, content) {
  gameState.setFreezePlayer(true);
  const dialogBox = k.add([
    k.rect(800, 180),
    k.pos(pos),
    k.fixed(),
  ]);

  const textContainer = dialogBox.add([
    k.text("", {
      width: 700,
      lineSpacing: 15,
      size: gameState.getFontSize(),
    }),
    k.color(40, 40, 40),
    k.pos(20, 40),
    k.fixed(),
  ]);

  let index = 0

  await displayLine(textContainer, content[index]);
  let lineFinishedDisplayed = true
  const dialogKey = k.onKeyPress("space", async () => {
    if (!lineFinishedDisplayed) return;
      index ++;
    if (!content[index]) {
      k.destroy(dialogBox);
      dialogKey.cancel();
      gameState.setFreezePlayer(false);
      return;
    }

    textContainer.text = "";
    lineFinishedDisplayed = false;
    await displayLine(textContainer, content[index]);
    lineFinishedDisplayed = true;
  })
}
