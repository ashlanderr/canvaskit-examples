import {CanvasKit, SkCanvas, SkSurface} from "canvaskit-wasm";

export default async function (CanvasKit: CanvasKit, surface: SkSurface, canvas: SkCanvas) {
  const context = CanvasKit.currentContext();
  const paint = new CanvasKit.SkPaint();

  const imageData = await (await fetch('/example.jpg')).arrayBuffer();
  const image = CanvasKit.MakeImageFromEncoded(imageData);

  CanvasKit.setCurrentContext(context);
  canvas.clear(CanvasKit.TRANSPARENT);

  // draw simple image
  canvas.drawImage(image, 0, 0, paint);

  // draw scaled image
  canvas.drawImageRect(
    image,
    CanvasKit.XYWHRect(0, 0, image.width(), image.height()),
    CanvasKit.XYWHRect(image.width() + 10, 0, image.width() / 2, image.height() / 2),
    paint,
    true,
  );

  // draw cropped image
  canvas.save();
  canvas.translate(image.width() * 1.5 + 20, 0);
  canvas.clipRRect(
    CanvasKit.RRectXY(
      CanvasKit.XYWHRect(0, 0, 100, 100),
      110,
      110,
    ),
    CanvasKit.ClipOp.Intersect,
    true
  );
  canvas.drawImage(image, -66, -110, paint);
  canvas.restore();

  surface.flush();
}
