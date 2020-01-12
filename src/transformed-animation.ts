import {CanvasKit, SkCanvas, SkSurface} from "canvaskit-wasm";

export default async function (CanvasKit: CanvasKit, surface: SkSurface, canvas: SkCanvas) {
  const data = await (await fetch('drinks.json')).text();
  const animation = CanvasKit.MakeAnimation(data);

  const t1 = performance.now();

  function renderAnimation() {
    animation.render(canvas, CanvasKit.XYWHRect(
      0,
      0,
      500,
      500,
    ));
  }

  function render() {
    requestAnimationFrame(render);

    canvas.save();
    canvas.clear(CanvasKit.TRANSPARENT);

    renderAnimation();

    canvas.translate(510, 0);
    canvas.scale(0.5, 0.5);
    renderAnimation();

    canvas.translate(350, 510);
    canvas.rotate(45, 0, 0);
    canvas.scale(0.5, 1.0);
    renderAnimation();

    surface.flush();
    canvas.restore();

    const t2 = performance.now();
    const dt = (t2 - t1) / 1000;
    animation.seek(dt / animation.duration() % 1);
  }

  render();
}
