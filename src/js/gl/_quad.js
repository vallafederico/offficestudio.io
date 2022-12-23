import { Plane, Mesh } from "ogl";
import Material from "./mat/_quad";

export default class extends Mesh {
  constructor(gl, diff = null) {
    super(gl);
    this.gl = gl;

    this.geometry = new Plane(this.gl);
    this.program = new Material(this.gl);
    // this.scale.set(2, 2, 1);
  }

  resize() {}

  render(t) {
    this.program.time = t;
  }
}
