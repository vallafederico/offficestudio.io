// import { loadTexture } from "./texture-loader";
import { loadModel } from "./model-loader";

export class Loader {
  constructor(gl) {
    this.gl = gl;

    this.items = [...document.querySelectorAll("[data-model]")].map((item) => {
      return loadModel(this.gl, item.dataset.model);
    });

    console.log(this.items);
  }

  async load() {
    const [model] = await Promise.all([this.items[0]]);
    console.log(model);
  }
}
