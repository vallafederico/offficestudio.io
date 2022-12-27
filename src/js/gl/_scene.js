import { Transform } from "ogl";
import gsap from "gsap";

import { Post } from "./post/post.js";
import { Model } from "./model.js";

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

    this.post = new Post(this.gl);
    this.models = window.assets.mod.map((item) => new Model(this.gl, item));

    // initial setup
    console.log("setup", window.app.store);
    this.txts.current = this.models[window.app.store.slider.current];
    this.models[window.app.store.slider.current].isActive = true;
  }

  render(t) {
    if (!this.isOn) return;

    this.models?.forEach((item) => item.render(t));

    this.post?.render(t, this.txts);
  }

  resize(vp) {
    this.vp = vp;
    this.post?.resize(vp);
    this.models?.forEach((item) => item.resize(vp));
  }

  /* ----- Slider */
  slide(index, instant = false) {
    this.txts.next = this.models[index]; // set next
    this.txts.next.isActive = true;

    let d = 1.2;

    if (instant) d = 0;

    return new Promise((resolve) => {
      gsap.to(this.txts, {
        val: 1,
        ease: "expo.out",
        duration: 1.2,
        onComplete: () => {
          this.txts.current = this.txts.next;
          this.txts.next = null; // set next
          this.txts.val = 0;
          resolve();
        },
      });
    });
  }
}
