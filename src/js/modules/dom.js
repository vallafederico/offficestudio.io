import { Text } from "./animation/text";
import { Alpha } from "./animation/alpha";
import { List } from "./list";

export default class {
  constructor() {
    this.createAnimation();
  }

  resize() {}

  /* -- Text */

  createAnimation() {
    this.text = [
      ...document.querySelectorAll(
        '[data-a="char"], [data-a="word"], [data-a="line"]'
      ),
    ].map((el) => new Text({ element: el }));

    this.alpha = [...document.querySelectorAll('[data-a="alpha"]')].map(
      (el) => new Alpha({ element: el })
    );

    const listWrapper = document.querySelector('[data-dom="list"]');
    if (listWrapper) this.list = new List({ element: listWrapper });
  }

  destroyAnimation() {
    this.text?.forEach((char) => char.animateOut());
    this.alpha?.forEach((el) => el.animateOut());
    this.list?.destroy();
  }

  /* --  Pages */

  transitionOut(page, { from, to }) {
    this.destroyAnimation();
    // console.log("DOM•tranOut", page);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 800);
    });
  }

  transitionIn(page, { from, to }) {
    this.createAnimation();
    // console.log("TIN >", to);

    if (to[0] === "") {
      // transitioning to home

      // > scroll to active item
      setTimeout(() => {
        window.app.scroll.scrollToTarget(
          window.app.dom.list.items.li[window.app.store.slider.current]
        );
      }, 50);

      // > spinner can spin
      window.app.gl.scene.spinner.animateSpin(1, 0.2);
      window.app.gl.scene.toTextured(0, { d: 1.2, del: 0 });
    }

    if (to[0] === "work") {
      // trantisioning to work group
      if (to[1].length > 1) {
        // transitioning to work item
        console.log("T> item");
        // > spinner can NOT spin
        window.app.gl.scene.spinner.animateSpin(0, 3);
        window.app.gl.scene.toTextured(1, { d: 1.2, del: 0.2 });
      } else {
        // transitioning to work archive page
        console.log("T> work archive");
      }
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 800);
    });
  }
}
