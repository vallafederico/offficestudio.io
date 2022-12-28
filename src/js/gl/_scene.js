import { Transform } from "ogl";
import gsap from "gsap";

import { Post } from "./post/post.js";
import { Model } from "./model.js";
import { Spinner } from "./spinner.js";

export default class extends Transform {
  constructor(gl, data = {}) {
    super();
    this.gl = gl;

    this.create();
    this.isOn = true;
  }

  create() {
    this.txts = {
      val: 0,
    };

    this.spinner = new Spinner();

    this.post = new Post(this.gl);
    this.models = window.assets.mod.map(
      (item, i) => new Model(this.gl, item, window.assets.textures[i])
    );

    // initial setup
    // console.log("setup", window.app.store);
    // console.log(window.app.store.work); // start state
    this.txts.current = this.models[window.app.store.slider.current];
    this.models[window.app.store.slider.current].isActive = true;
    if (window.app.store.work) this.toTextured(1, { d: 0 });
  }

  render(t) {
    if (!this.isOn) return;
    this.spinner.render();

    this.models?.forEach((item) =>
      item.render(t, this.spinner.spin, this.spinner.mouse)
    );

    this.post?.render(t, this.txts);
  }

  resize(vp) {
    this.vp = vp;
    this.post?.resize(vp);
    this.models?.forEach((item) => item.resize(vp));
    this.spinner?.resize();
  }

  /* ----- Mouse */

  /* ----- Slider */
  slide(index, instant = false) {
    this.txts.next = this.models[index]; // set next
    this.txts.next.isActive = true;

    let d = 1;

    if (instant) d = 0;

    return new Promise((resolve) => {
      gsap.to(this.txts, {
        val: 1,
        ease: "expo.out",
        duration: d,
        onComplete: () => {
          this.txts.current = this.txts.next;
          this.txts.next = null; // set next
          this.txts.val = 0;
          resolve();
        },
      });
    });
  }

  /* ----- Global Events */
  toTextured(val, { d = 1.2, del = 0.2 }) {
    gsap.to(window.app.store.anim, {
      textured: val,
      ease: "expo.out",
      duration: d,
      delay: del,
    });

    /* TRIGGERS
    - dom
    */
  }
}
