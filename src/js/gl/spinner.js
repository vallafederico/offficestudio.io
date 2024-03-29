import { gsap } from "gsap/gsap-core";
import { lerp } from "../util/math.js";

export class Spinner {
  constructor() {
    this.spin = { x: 0, y: 0 };

    // main
    this.velocity = { x: 0.005, y: 0.005 };
    this.pointerDown = false;
    this.pointer = {
      x: 0,
      y: 0,
    };

    this.mouse = {
      x: 0,
      y: 0,
      mx: 0,
      my: 0,
      mvmtX: 0,
      mvmtY: 0,
      ww: window.innerWidth,
      wh: window.innerHeight,
    };

    this.coeff = window.isMobile ? 0.0015 : 0.0005;

    // set initial
    if (window.app.store.work) this.animateSpin(0, 0, 0);

    this.addEvents();
  }

  addEvents() {
    if ("ontouchmove" in window) {
      window.addEventListener("touchstart", this.mouseDown.bind(this));
      window.addEventListener("touchmove", this.mouseMove.bind(this));
      window.addEventListener("touchend", this.mouseUp.bind(this));
    } else {
      window.addEventListener("mousedown", this.mouseDown.bind(this));
      window.addEventListener("mousemove", this.mouseMove.bind(this));
      window.addEventListener("mouseup", this.mouseUp.bind(this));
    }
  }

  mouseDown(e) {
    this.pointerDown = true;
    this.pointer.x = e.touches ? e.touches[0].clientX : e.clientX;
    this.pointer.y = e.touches ? e.touches[0].clientY : e.clientY;
  }

  mouseMove(e) {
    this.mouse.x = (e.clientX / this.mouse.ww) * 2 - 1;
    this.mouse.y = -(e.clientY / this.mouse.wh) * 2 + 1;

    if (!this.pointerDown) return;

    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    this.velocity.x += (x - this.pointer.x) * this.coeff;
    this.velocity.y += (y - this.pointer.y) * this.coeff;

    this.pointer.x = x;
    this.pointer.y = y;
  }

  mouseUp() {
    this.pointerDown = false;
  }

  resize() {
    this.mouse.ww = window.innerWidth;
    this.mouse.wh = window.innerHeight;
  }

  render() {
    // raf
    this.velocity.x *= 0.95;
    this.velocity.y *= 0.95;

    // mouse
    this.mouse.mx = lerp(this.mouse.mx, this.velocity.x, 0.1);
    this.mouse.my = lerp(this.mouse.my, this.velocity.y, 0.1);

    // spin
    this.spin.x +=
      this.velocity.x +
      Math.sign(this.velocity.x) * this.coeff * (1 - Number(this.pointerDown));
    this.spin.y +=
      this.velocity.y +
      Math.sign(this.velocity.y) * this.coeff * (1 - Number(this.pointerDown));

    // spin with scroll
    this.spin.y += window.app.scroll.speed * 0.001;
    this.spin.x += window.app.scroll.speed * 0.001;

    // reset with controller
    // this.spin.x *= window.app.store.anim.spin || 0;
    this.spin.y *= window.app.store.anim.spin || 0;
  }

  /* --- Animation */
  animateSpin(val = 0, d = 3, del = 0) {
    if (this.a_spin) this.a_spin.kill();
    this.a_spin = gsap.to(window.app.store.anim, {
      spin: val,
      duration: d,
      ease: "power4.inOut",
      delay: del,
    });
  }
}
