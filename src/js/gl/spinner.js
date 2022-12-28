// import { m4 } from "twgl.js";
import gsap from "gsap";
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
      ww: window.innerWidth,
      wh: window.innerHeight,
    };

    this.coeff = 0.0005;

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
    // mouse
    // this.mouse.mx = lerp(this.mouse.mx, this.mouse.x, 0.005);
    // this.mouse.my = lerp(this.mouse.my, this.mouse.y, 0.005);

    // raf
    this.velocity.x *= 0.95;
    this.velocity.y *= 0.95;

    // console.log();

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
    gsap.to(window.app.store.anim, {
      spin: val,
      duration: d,
      ease: "power4.inOut",
      delay: del,
    });
  }
}
