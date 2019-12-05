import {CanvasKit, SkCanvas, SkSurface} from "canvaskit-wasm";

async function downloadFont(url: string) {
  return await (await fetch(url)).arrayBuffer();
}

export default async function (CanvasKit: CanvasKit, surface: SkSurface, canvas: SkCanvas) {
  const fonts = await Promise.all([
    downloadFont('NotoSerif-Regular.ttf'),
    downloadFont('NotoSerif-Bold.ttf'),
    downloadFont('NotoSerif-Italic.ttf'),
  ]);
  const fontManager = CanvasKit.SkFontMgr.FromData(fonts);

  const paragraphStyle = new CanvasKit.ParagraphStyle({
    textStyle: {
      fontFamilies: ['Noto Serif'],
      fontSize: 16,
    },
  });
  const builder = CanvasKit.ParagraphBuilder.Make(paragraphStyle, fontManager);

  // Header
  builder.pushStyle(new CanvasKit.TextStyle({
    fontFamilies: ['Noto Serif'],
    fontSize: 32,
  }));
  builder.addText('Quod cum dixissent.\n\n');
  builder.pop();

  // Simple text
  builder.addText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. ');
  builder.addText('Quare attende, quaeso. ');

  // Italic
  builder.pushStyle(new CanvasKit.TextStyle({
    fontFamilies: ['Noto Serif'],
    fontStyle: { slant: CanvasKit.FontSlant.Italic },
  }));
  builder.addText('Quam ob rem tandem, inquit, non satisfacit? ');
  builder.pop();

  // Bold
  builder.pushStyle(new CanvasKit.TextStyle({
    fontFamilies: ['Noto Serif'],
    fontStyle: { weight: CanvasKit.FontWeight.Bold },
  }));
  builder.addText('Teneo, inquit, finem illi videri nihil dolere. ');
  builder.pop();

  const paragraph = builder.build();
  paragraph.layout(500);

  canvas.clear(CanvasKit.TRANSPARENT);
  canvas.drawParagraph(paragraph, 0, 0);
  surface.flush();
}
