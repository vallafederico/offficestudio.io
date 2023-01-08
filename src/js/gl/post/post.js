import { RenderTarget, Texture } from "ogl";
import Quad from "./quad.js";

export class Post {
  constructor(gl) {
    this.gl = gl;
    this.isActive = true;

    this.altTexture = new Texture(this.gl, {});

    this.rt = new RenderTarget(this.gl, {});
    this.quad = new Quad(this.gl);
    this.quad.program.texture = this.rt.texture;
  }

  resize(vp) {
    this.vp = vp;

    this.rt = new RenderTarget(this.gl, {});
    this.quad.resize(vp);
  }

  render(t, { current, next, val }) {
    this.quad.program.transition = val;
    this.quad.program.current = current?.rt.texture || this.altTexture;
    this.quad.program.next = next?.rt.texture || this.altTexture;

    this.quad.render(t);
  }
}
