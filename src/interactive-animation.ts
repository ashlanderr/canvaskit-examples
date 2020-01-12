import {CanvasKit, SkAnimation, SkCanvas, SkSurface} from "canvaskit-wasm";

async function loadAnimation(CanvasKit: CanvasKit, src: string): Promise<SkAnimation> {
  const data = await (await fetch(src)).text();
  return CanvasKit.MakeAnimation(data);
}

export default async function (CanvasKit: CanvasKit, surface: SkSurface, canvas: SkCanvas, htmlCanvas: HTMLCanvasElement) {
  // https://lottiefiles.com/1978-lightdark
  const toggleAnimation = await loadAnimation(CanvasKit, 'lightdark.json');

  let toggleState = 0;
  let toggleTime = 0;

  htmlCanvas.onclick = () => {
    toggleState = 1 - toggleState;
  };

  let t1 = performance.now();

  const font = new CanvasKit.SkFont(null, 16);
  const paint = new CanvasKit.SkPaint();

  function render() {
    requestAnimationFrame(render);

    canvas.clear(CanvasKit.TRANSPARENT);

    canvas.drawText("Try clicking the canvas", 0, 30, paint, font);

    toggleAnimation.render(canvas, CanvasKit.XYWHRect(
      0,
      60,
      500,
      500,
    ));

    surface.flush();

    const t2 = performance.now();
    const dt = (t2 - t1) / 1000;
    t1 = t2;

    if (toggleTime != toggleState) {
      const dir = Math.sign(toggleState - toggleTime);
      toggleTime = Math.max(0, Math.min(toggleTime + dt * dir, 1));
    }
    toggleAnimation.seek(toggleTime);
  }

  render();
}
