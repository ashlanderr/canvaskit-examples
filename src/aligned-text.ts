import {CanvasKit, SkCanvas, SkFontManager, SkParagraph, SkSurface, SkTextAlign} from "canvaskit-wasm";

async function downloadFont(url: string) {
  return await (await fetch(url)).arrayBuffer();
}

function paragraphAligned(CanvasKit: CanvasKit, fontManager: SkFontManager, textAlign: SkTextAlign): SkParagraph {
  const paragraphStyle = new CanvasKit.ParagraphStyle({
    textStyle: {
      fontFamilies: ['Noto Serif'],
      fontSize: 16,
    },
    textAlign,
  });
  const builder = CanvasKit.ParagraphBuilder.Make(paragraphStyle, fontManager);

  builder.pushStyle(new CanvasKit.TextStyle({
    fontFamilies: ['Noto Serif'],
    fontSize: 32,
  }));
  builder.addText('Quod cum dixissent.\n\n');
  builder.pop();

  builder.addText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. ');
  builder.addText('Quare attende, quaeso. ');

  const paragraph = builder.build();
  builder.delete();
  paragraph.layout(500);

  return paragraph;
}

export default async function (CanvasKit: CanvasKit, surface: SkSurface, canvas: SkCanvas) {
  const fonts = await Promise.all([
    downloadFont('NotoSerif-Regular.ttf'),
    downloadFont('NotoSerif-Bold.ttf'),
    downloadFont('NotoSerif-Italic.ttf'),
  ]);
  const fontManager = CanvasKit.SkFontMgr.FromData(fonts);

  const pLeft = paragraphAligned(CanvasKit, fontManager, CanvasKit.TextAlign.Left);
  const pRight = paragraphAligned(CanvasKit, fontManager, CanvasKit.TextAlign.Right);
  const pCenter = paragraphAligned(CanvasKit, fontManager, CanvasKit.TextAlign.Center);

  canvas.clear(CanvasKit.TRANSPARENT);
  canvas.drawParagraph(pLeft, 0, 0);
  canvas.drawParagraph(pRight, 0, pLeft.getHeight() + 100);
  canvas.drawParagraph(pCenter, 0, pLeft.getHeight() + pRight.getHeight() + 200);
  surface.flush();
}
