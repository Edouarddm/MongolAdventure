export function generateSlimeComponents(k, pos) {
  return [
    k.sprite("assets", {
      anim: "slime-idle-down",
    }),
    k.area({shape: new k.Rect(k.vec2(0, 6), 16, 10)}),
    k.body(),
    k.pos(pos),
    k.offscreen(),
    k.opacity(),
    {
      speed: 100,
      attackPower: 1,
      direction: "down",
      isAttacking: false,
    },
    "slime",
  ];
}
