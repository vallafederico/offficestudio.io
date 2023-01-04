import { Text } from "./animation/text";

export class List {
  constructor({ element }) {
    this.element = element;

    if (this.element) this.create();
  }

  create() {
    this.canSlide = true;

    this.items = {
      li: [...this.element.children],
      trig: [...this.element.children].map((el) => {
        const item = el.querySelector('[data-a="trig"]');
        if (!item) return;
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
    this.items?.trig[this.items.prev]?.animateOut();
    this.items.li[index].classList.add("active");
    this.items?.trig[index]?.animateIn();
    this.items.prev = index;

    await window.app?.gl.scene.slide(index, false);
    this.canSlide = true;
  }

  destroy() {
    this.items.li.forEach((el) => (el.onclick = el.onmouseenter = null));
    this.items?.trig?.forEach((el) => el?.animateOut());
  }
}
