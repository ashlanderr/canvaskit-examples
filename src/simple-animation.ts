import {CanvasKit, SkCanvas, SkSurface} from "canvaskit-wasm";

export default async function (CanvasKit: CanvasKit, surface: SkSurface, canvas: SkCanvas) {
  const data = await (await fetch('drinks.json')).text();
  const animation = CanvasKit.MakeAnimation(data);

  const t1 = performance.now();

  function render() {
    requestAnimationFrame(render);

    canvas.clear(CanvasKit.TRANSPARENT);

    animation.render(canvas, CanvasKit.XYWHRect(
      0,
      0,
      animation.size().w,
      animation.size().h,
    ));

    surface.flush();

    const t2 = performance.now();
    const dt = (t2 - t1) / 1000;
    animation.seek(dt / animation.duration() % 1);
  }

  render();
}
