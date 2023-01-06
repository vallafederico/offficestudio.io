import { Triangle, Mesh } from "ogl";
import Material from "./mat/index.js";

export default class extends Mesh {
  constructor(gl) {
    super(gl);
    this.gl = gl;
    this.geometry = new Triangle(this.gl);
    this.program = new Material(this.gl);
  }

  resize(vp) {}

  render(t) {
    this.program.time = t;
    this.program.vel = window.app.scroll.speed || 0;
    this.program.distort = window.app.store.anim.distort || 0;
  }
}
