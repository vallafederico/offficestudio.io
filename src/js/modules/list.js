import { Text } from "./animation/text";

export class List {
  constructor({ element }) {
    this.element = element;
    if (this.element) this.create();
  }

  create() {
    this.items = {
      li: [...this.element.children],
      trig: [...this.element.children].map((el) => {
        const item = el.querySelector('[data-a="trig"]');
        const tx = new Text({ element: item });
        tx.stop();
        tx.setOut();
        return tx;
      }),
      current: 0,
      prev: 0,
    };

    this.items.li.forEach((el, index) => {
      el.onclick = () => this.setActive(index);
    });

    // setInitial
    this.setActive(this.items.current);
  }

  setActive(index) {
    this.items.li[this.items.prev].classList.remove("active");
    this.items.trig[this.items.prev].animateOut();
    this.items.li[index].classList.add("active");
    this.items.trig[index].animateIn();
    this.items.prev = index;
  }

  destroy() {
    this.items.li.forEach((el) => (el.onclick = null));
    this.items.trig.forEach((el) => el.animateOut());
  }
}

class Item {
  constructor({ element }) {
    this.element = element;
  }
}
