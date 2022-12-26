import { Program, Texture } from "ogl";
import vertex from "./vertex.vert";
import fragment from "./fragment.frag";

export default class extends Program {
  constructor(gl, options = {}) {
    super(gl, {
      vertex: vertex,
      fragment: fragment,
    });

    // console.log(this.uniforms);
    this.transparent = null;
    this.cullFace = null;

    this.uniforms = {
      u_time: { value: 0 },
      // u_texture: { value: null },
      u_a_trans: { value: 0 },
      // RTs
      u_current: { value: null },
      u_next: { value: null },
    };
  }

  set time(t) {
    this.uniforms.u_time.value = t;
  }

  // set texture(texture) {
  //   this.uniforms.u_texture.value = texture;
  // }

  set current(texture) {
    this.uniforms.u_current.value = texture;
  }

  set next(texture) {
    this.uniforms.u_next.value = texture;
  }

  set transition(val) {
    this.uniforms.u_a_trans.value = val;
  }
}
