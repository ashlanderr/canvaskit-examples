import {CanvasKit, SkCanvas, SkSurface} from "canvaskit-wasm";

export default async function (CanvasKit: CanvasKit, surface: SkSurface, canvas: SkCanvas) {
  const font = await (await fetch('NotoSerif-Regular.ttf')).arrayBuffer();
  const fontManager = CanvasKit.SkFontMgr.FromData([font]);

  const style = new CanvasKit.ParagraphStyle({
    textStyle: {
      fontFamilies: ['Noto Serif'],
      fontSize: 16,
    },
  });
  const builder = CanvasKit.ParagraphBuilder.Make(style, fontManager);

  builder.addText('Quod cum dixissent, ille contra. \n');
  builder.addText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quare attende, quaeso. ');
  builder.addText('Erit enim mecum, si tecum erit. ');
  builder.addText('Summae mihi videtur inscitiae. Duo Reges: constructio interrete. ');
  builder.addText('Teneo, inquit, finem illi videri nihil dolere. ');

  const paragraph = builder.build();
  paragraph.layout(500);

  canvas.clear(CanvasKit.TRANSPARENT);
  canvas.drawParagraph(paragraph, 0, 0);
  surface.flush();
}
