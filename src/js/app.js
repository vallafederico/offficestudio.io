import Dom from "./modules/dom";
import Viewport from "./modules/viewport";
import Scroll from "./modules/scroll";
import Pages from "./modules/pages";
import Gl from "./gl/gl.js";
import { isTablet } from "./util/agents.js";

window.isMobile = isTablet();

class App {
  constructor() {
    this.body = document.querySelector("body");
    this.viewport = new Viewport();

    this.time = 0;

    this.store = {
      slider: {
        current: 0,
      },
      anim: {
        spin: 1,
        textured: 0,
      },
    };

    this.load();
  }

  async load() {
    this.pages = new Pages();
    this.scroll = new Scroll();

    this.gl = new Gl();

    await this.gl.load();

    this.dom = new Dom();

    // init DOM, SCROLL, PAGES after load

    this.init();
  }

  init() {
    this.initEvents();
    this.render();
  }

  initEvents() {
    // prettier-ignore
    new ResizeObserver((entry) => this.resize(entry[0])).observe(this.body);
  }

  resize({ contentRect }) {
    this.viewport?.resize();
    this.dom?.resize();
  }

  render() {
    this.scroll?.render();
    window.requestAnimationFrame(this.render.bind(this));
  }
}

window.app = new App();

(() => {
  console.log(
    "%c%s",
    "font-size:10px; color:#fff; background:#000; padding: 10px 10px; margin: 20px 0px;",
    "cc HTTPS://FEDERIC.OOO 👀"
  );
})();
