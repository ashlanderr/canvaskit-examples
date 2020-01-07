import {CanvasKit, SkAnimation, SkCanvas, SkSurface} from "canvaskit-wasm";

async function loadAnimation(CanvasKit: CanvasKit, src: string): Promise<SkAnimation> {
  const data = await (await fetch(src)).text();
  return CanvasKit.MakeAnimation(data);
}

export default async function (CanvasKit: CanvasKit, surface: SkSurface, canvas: SkCanvas, htmlCanvas: HTMLCanvasElement) {
  // https://lottiefiles.com/13587-toggle-switch
  const toggleAnimation = await loadAnimation(CanvasKit, 'toggle.json');

  let toggleState = 0;
  let toggleTime = 0;

  htmlCanvas.onclick = () => {
    toggleState = toggleState + toggleAnimation.duration() * 0.5;
  };

  let t1 = performance.now();

  const font = new CanvasKit.SkFont(null, 16);
  const paint = new CanvasKit.SkPaint();

  function render() {
    requestAnimationFrame(render);

    canvas.clear(CanvasKit.TRANSPARENT);

    canvas.drawText("Try clicking the switch", 0, 30, paint, font);

    toggleAnimation.render(canvas, CanvasKit.XYWHRect(
      0,
      60,
      toggleAnimation.size().w,
      toggleAnimation.size().h,
    ));

    surface.flush();

    const t2 = performance.now();
    const dt = (t2 - t1) / 1000;
    t1 = t2;

    toggleTime = toggleTime < toggleState ? toggleTime + dt : toggleTime;
    toggleAnimation.seek(toggleTime / toggleAnimation.duration() % 1);
  }

  render();
}
