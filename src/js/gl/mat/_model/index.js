import { gsap } from "gsap/gsap-core";
import { Program } from "ogl";
import vertex from "./vertex.vert";
import fragment from "./fragment.frag";

export default class extends Program {
  constructor(gl, { texture }) {
    super(gl, {
      vertex: vertex,
      fragment: fragment,
    });

    const { mtc_dark } = window.assets;
    texture.flipY = false;

    // console.log(this.uniforms);
    this.transparent = null;
    this.cullFace = null;

    this.uniforms = {
      u_time: { value: 0 },
      u_mtc: { value: mtc_dark },
      u_diffuse: { value: texture },
      // animation
      u_a_texture: { value: 0 },
      u_a_on: { value: 0 },
    };
  }

  set time(t) {
    this.uniforms.u_time.value = t;
    this.uniforms.u_a_texture.value = window.app.store.anim.textured;
  }

  set on(on) {
    gsap.to(this.uniforms.u_a_on, {
      value: on ? 1 : 0,
      duration: 0.3,
      ease: "bounce.out",
    });
  }
}
