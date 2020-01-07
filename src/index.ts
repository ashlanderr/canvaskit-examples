import CanvasKitInit from "canvaskit-wasm/bin/canvaskit";
import images from "./images";
import helloWorld from './hello-world';
import simpleText from "./simple-text";
import formattedText from "./formatted-text";
import alignedText from "./aligned-text";
import animation from "./animation";
import gif from "./gif";
import interactiveAnimation from "./interactive-animation";

async function main() {
  const url = window.location.pathname;
  if (url === '/') return;

  const loadingEl = document.getElementById('loading')!;
  loadingEl.style.visibility = 'visible';

  const htmlCanvas = document.querySelector('canvas') as HTMLCanvasElement;
  const CanvasKit = await CanvasKitInit().ready();
  const surface = CanvasKit.MakeCanvasSurface(htmlCanvas);
  const canvas = surface.getCanvas();

  switch (url) {
    case '/hello-world':
      await helloWorld(CanvasKit, surface, canvas);
      break;
    case '/simple-text':
      await simpleText(CanvasKit, surface, canvas);
      break;
    case '/formatted-text':
      await formattedText(CanvasKit, surface, canvas);
      break;
    case '/aligned-text':
      await alignedText(CanvasKit, surface, canvas);
      break;
    case '/animation':
      await animation(CanvasKit, surface, canvas);
      break;
    case '/interactive-animation':
      await interactiveAnimation(CanvasKit, surface, canvas, htmlCanvas);
      break;
    case '/images':
      await images(CanvasKit, surface, canvas);
      break;
    case '/gif':
      await gif(CanvasKit, surface, canvas);
      break;
  }

  loadingEl.style.visibility = 'hidden';
}

// noinspection JSIgnoredPromiseFromCall
main();
