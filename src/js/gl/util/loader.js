// import { loadTexture } from "./texture-loader";
import { loadModel } from "./model-loader";

import { getGlPages } from "../../../components/content";

export class Loader {
  constructor(gl) {
    this.gl = gl;
  }

  async load() {
    this.assets = {};

    // get info from astro
    const cont = await getGlPages();
    this.computeInitialStore(cont); // add to window store

    this.items = cont.map((item) =>
      loadModel(this.gl, window.location.origin + "/" + item.modelurl)
    );

    console.time("load"); // ----

    // const [model] = await Promise.all([this.items[0]]);

    this.assets.mod = await Promise.all([...this.items]);

    console.timeEnd("load"); // ----

    // store in window
    window.assets = this.assets;
  }

  computeInitialStore(cont) {
    const startsAt = cont.findIndex(
      (item) => item.url === window.location.pathname
    );

    if (startsAt === -1) {
      window.app.store.slider.current = 0;
    } else {
      window.app.store.slider.current = startsAt;
    }

    console.log({ startsAt });
  }
}

function processModel() {}
