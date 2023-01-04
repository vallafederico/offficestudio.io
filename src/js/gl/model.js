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

    const sc = window.isMobile ? 0.3 : 0.5;
    this.mesh.scale.set(sc, sc, sc);

    this.rt = new RenderTarget(this.gl, {});
    this.mesh.setParent(this);
  }

  resize() {
    this.rt = new RenderTarget(this.gl, {});
  }

  render(t, { x, y }, { mx, my }) {
    if (!this.isActive) return;
    this.program.time = t;

    this.rotation.z = mx;
    this.rotation.x = mx;
    this.rotation.y = my;

    this.mesh.rotation.x = y;
    this.mesh.rotation.y = x;

    window.app.gl.renderer.render({
      scene: this,
      camera: window.app.gl.camera,
      target: this.rt,
    });
  }
}
