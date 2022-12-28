import { Text } from "./animation/text";

export class List {
  constructor({ element }) {
    this.element = element;

    if (this.element) this.create();
    // will need to save and store the values before page transition to get back there and not re-trigger the transition
  }

  create() {
    this.canSlide = true;

    this.items = {
      li: [...this.element.children],
      trig: [...this.element.children].map((el) => {
        const item = el.querySelector('[data-a="trig"]');
        const tx = new Text({ element: item });
        tx.stop();
        tx.setOut();
        return tx;
      }),
      current: window.app?.store?.slider?.current || 0,
      prev: 0,
    };

    this.items.li.forEach((el, index) => {
      el.onclick = () => this.setActive(index);
    });

    // setInitial
    this.setActive(this.items.current);
  }

  async setActive(index) {
    if (!this.canSlide) return;
    this.canSlide = false;

    setTimeout(() => (window.app.store.slider.current = index), 5);

    // dom
    this.items.li[this.items.prev].classList.remove("active");
    this.items.trig[this.items.prev].animateOut();
    this.items.li[index].classList.add("active");
    this.items.trig[index].animateIn();
    this.items.prev = index;

    // wait gl transition then reset
    await window.app?.gl.scene.slide(index);
    this.canSlide = true;
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
