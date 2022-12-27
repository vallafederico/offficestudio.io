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
    // clean pathname
    let { pathname } = window.location;
    if (
      pathname.length > 1 &&
      pathname.substring(pathname.length - 1) === "/"
    ) {
      pathname = pathname.substring(0, pathname.length - 1);
    }

    // find index of current page
    const startsAt = cont.findIndex((item) => item.url === pathname);

    // console.log(
    //   { startsAt },
    //   "current window location to match",
    //   window.location.pathname
    // );

    // cont.forEach((item, i) => {
    //   console.log(item.url);
    // });

    if (startsAt === -1) {
      window.app.store.slider.current = 0;
    } else {
      window.app.store.slider.current = startsAt;
    }
  }
}

function processModel() {}
