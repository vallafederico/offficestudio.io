import Lenis from "@studio-freight/lenis";
import { easeOutExpo } from "../util/easings.js";

export default class extends Lenis {
  constructor() {
    super({
      duration: 1.8,
      smoothWheel: true,
      easing: easeOutExpo,
      orientation: "vertical",
      smoothTouch: false,
      touchMultiplier: 2,
    });

    this.isActive = true;
    // this.timeFactor = 8;
    this.time = 0;

    this.init();
  }

  scrollToTarget(target, center = true, duration = 2) {
    this.scrollTo(target, {
      offset: center ? -window.innerHeight / 2 : 0,
      duration,
      easing: easeOutExpo,
      // immediate,
    });
  }

  scrollZero() {
    setTimeout(() => this.scrollTo(0, { immediate: true }), 5);
  }

  init() {
    this.y = window.scrollY;
    this.max = window.innerHeight;
    this.speed = 0;
    this.percent = 0;

    this.on("scroll", ({ scroll, limit, velocity, progress }) => {
      this.y = scroll || 0;
      this.max = limit || window.innerHeight;
      this.speed = velocity || 0;
      this.percent = progress || 0;
    });
  }

  resize() {}

  render(t) {
    if (!this.isActive) return;

    this.raf(t);
  }

  /**
   * @param {boolean} value
   */
  set active(value) {
    this.isActive = value;
  }
}
