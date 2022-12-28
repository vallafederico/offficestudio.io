import { Transform, RenderTarget } from "ogl";
import Material from "./mat/_model";

export class Model extends Transform {
  constructor(gl, { scene }, texture) {
    super(gl);
    this.gl = gl;
    this.isActive = false;

    this.program = new Material(this.gl, { texture });
    this.mesh = scene[0].children[0];
    this.mesh.program = this.program;

    this.mesh.scale.set(0.5, 0.5, 0.5);

    this.rt = new RenderTarget(this.gl, {});
    this.mesh.setParent(this);
  }

  resize() {
    this.rt = new RenderTarget(this.gl, {});
  }

  render(t, { x, y }, { mx, my }) {
    if (!this.isActive) return;
    this.program.time = t;

    // console.log(mx, my);

    this.mesh.rotation.x = y;
    this.mesh.rotation.y = x;

    // this.mesh.rotation.z = mx * 0.2;

    window.app.gl.renderer.render({
      scene: this,
      camera: window.app.gl.camera,
      target: this.rt,
    });
  }
}
