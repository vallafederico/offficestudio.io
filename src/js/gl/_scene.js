import { Transform } from "ogl";
import { Post } from "./post/post.js";
import { Model } from "./model.js";

export default class extends Transform {
  constructor(gl, data = {}) {
    super();
    this.gl = gl;

    this.create();
    this.isOn = true;
  }

  create() {
    this.post = new Post(this.gl);

    this.model = new Model(this.gl);
    this.model.setParent(this);
  }

  render(t) {
    if (!this.isOn) return;
    // if (this.quad) this.quad.render(t);

    this.post?.render(t);
    // if (this.quads) this.quads.forEach((item) => item.render(t));
  }

  resize(vp) {
    this.vp = vp;
    // if (this.quad) this.quad.resize(vp);
  }
}
