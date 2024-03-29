import { Observe } from "../../util/observe";
import { gsap } from "gsap/gsap-core";

// NEEDS CHECKING!

export class Alpha extends Observe {
  constructor({ element, anim }) {
    super({
      element,
      config: {
        root: null,
        margin: "10px",
        threshold: 0.3,
      },
    });

    this.anim = {
      d: window.isMobile ? 0.87 : 1.2,
      ease: "expo.out",
      delay: window.isMobile ? 0.05 : 0.1,
      each: 0.05,
      from: "start",
      once: false,
      ...anim,
    };

    this.element = element;
    this.animated = this.element;

    this.setOut();
  }

  isIn() {
    this.animateIn();
    if (this.anim.once) this.stop();
  }

  isOut() {
    this.setOut();
  }

  animateIn() {
    if (this.animation) this.animation.kill();
    this.animation = gsap.to(this.animated, {
      autoAlpha: 1,
      duration: this.anim.d,
      ease: this.anim.ease,
      delay: this.anim.delay,
    });
  }

  animateOut() {
    this.stop();
    if (this.animation) this.animation.kill();
    this.animation = gsap.to(this.animated, {
      autoAlpha: 0,
      duration: this.anim.d,
      ease: this.anim.ease,
      delay: 0,
    });
  }

  setIn() {
    if (this.animation) this.animation.kill();
    gsap.set(this.animated, { autoAlpha: 1 });
  }

  setOut() {
    if (this.animation) this.animation.kill();
    gsap.set(this.animated, { autoAlpha: 0 });
  }
}
