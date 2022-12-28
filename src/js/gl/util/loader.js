import { loadTexture } from "./texture-loader";
import { loadModel } from "./model-loader";
import { getGlPages } from "../../../components/content";
import { ASSETS } from "../../assets";

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

    this.itemTextures = cont.map((item) =>
      loadTexture(this.gl, window.location.origin + "/" + item.textureurl)
    );

    // --------------------------------------------------------------------------------
    console.time("load");
    this.assets.mod = await Promise.all([...this.items]); // 3d models
    this.assets.textures = await Promise.all([...this.itemTextures]); // 3d textures

    const [mtc_dark] = await Promise.all([
      loadTexture(this.gl, ASSETS.mtc_dark),
    ]);

    console.timeEnd("load");
    // --------------------------------------------------------------------------------

    this.assets.mtc_dark = mtc_dark;
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
      window.app.store.work = false;
    } else {
      window.app.store.slider.current = startsAt;
      window.app.store.work = true;
    }
  }
}

function processModel() {}
