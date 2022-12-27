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

  transitionOut(page) {
    this.destroyAnimation();
    // console.log("DOM•tranOut", page);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 800);
    });
  }

  transitionIn(page) {
    this.createAnimation();
    // console.log("DOM•tranIn", page);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 800);
    });
  }
}
