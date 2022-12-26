// import { loadTexture } from "./texture-loader";
import { loadModel } from "./model-loader";

export class Loader {
  constructor(gl) {
    this.gl = gl;

    this.items = [...document.querySelectorAll("[data-model]")].map((item) => {
      return loadModel(this.gl, item.dataset.model);
    });

    // console.log(this.items);
  }

  async load() {
    this.assets = {};

    console.time("load"); // ----

    // const [model] = await Promise.all([this.items[0]]);

    this.assets.mod = await Promise.all([...this.items]);

    console.timeEnd("load"); // ----

    // store in window
    window.assets = this.assets;
  }

  async loadRest() {
    console.time("loadRest"); // ----
    this.assets.models = await Promise.all([...this.items]);
    console.log(this.assets.models);
    // console.log(model);
    console.timeEnd("loadRest"); // ----
  }
}

function processModel() {}
