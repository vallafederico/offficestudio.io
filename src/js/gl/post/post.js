import { RenderTarget } from "ogl";
import Quad from "./quad.js";

export class Post {
  constructor(gl) {
    this.gl = gl;
    this.isActive = true;

    this.rt = new RenderTarget(this.gl, {});
    this.quad = new Quad(this.gl);
    this.quad.program.texture = this.rt.texture;
  }

  resize(vp) {
    this.vp = vp;

    this.rt = new RenderTarget(this.gl, {});
    this.quad.resize(vp);
  }

  render(t) {
    this.quad.program.texture = this.rt.texture;
    this.quad.render(t);
  }
}

/*
  
*/
