import Next from './terminal/next';
import Loader from './terminal/loader';
import Intro from './terminal/intro';
import Window from './window/window';

window.onload = function() {
  Next.init();
  Loader.init(0);
  Intro.init();
  Window.init();
};
