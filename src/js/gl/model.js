import { Plane, Mesh, Transform, RenderTarget } from "ogl";
import Material from "./mat/_model";

export class Model extends Transform {
  constructor(gl, { scene }) {
    super(gl);
    this.gl = gl;
    this.isActive = false;

    // console.log(scene[0].children[0]);

    this.program = new Material(this.gl);
    this.mesh = scene[0].children[0];
    this.mesh.program = this.program;

    this.mesh.scale.set(0.5, 0.5, 0.5);
    this.mesh.rotation.set(0, 0.5, 0.3);

    // target
    this.rt = new RenderTarget(this.gl, {});

    this.mesh.setParent(this);
  }

  resize() {
    this.rt = new RenderTarget(this.gl, {});
  }

  render(t) {
    if (!this.isActive) return;
    this.program.time = t;

    window.app.gl.renderer.render({
      scene: this,
      camera: window.app.gl.camera,
      target: this.rt,
    });

    // this.position.x = Math.sin(t) * 0.2;
  }
}
