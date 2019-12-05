import {CanvasKit, SkCanvas, SkSurface} from "canvaskit-wasm";

export default async function (CanvasKit: CanvasKit, surface: SkSurface, canvas: SkCanvas) {
  const context = CanvasKit.currentContext();

  const gifData = await (await fetch('/example.gif')).arrayBuffer();
  const gif = CanvasKit.MakeAnimatedImageFromEncoded(gifData);

  function render() {
    requestAnimationFrame(render);

    CanvasKit.setCurrentContext(context);
    canvas.clear(CanvasKit.TRANSPARENT);

    canvas.drawAnimatedImage(gif, 0, 0);

    surface.flush();

    gif.decodeNextFrame();
  }

  requestAnimationFrame(render);
}
