import {CanvasKit, SkCanvas, SkSurface} from "canvaskit-wasm";

export default async function (CanvasKit: CanvasKit, surface: SkSurface, canvas: SkCanvas) {
  const paint = new CanvasKit.SkPaint();
  const font = new CanvasKit.SkFont(null, 20);

  canvas.clear(CanvasKit.TRANSPARENT);
  canvas.drawText('Hello, World!', 325, 300, paint, font);
  surface.flush();

  paint.delete();
  font.delete();
}
