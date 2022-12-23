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
  }

  /* --  Pages */

  transitionOut(page) {
    // console.log("DOM•tranOut", page);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }

  transitionIn(page) {
    // console.log("DOM•tranIn", page);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }
}
