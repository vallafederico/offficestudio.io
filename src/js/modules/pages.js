import { Core } from "@unseenco/taxi";

export default class extends Core {
  constructor() {
    super({
      links: "a:not([target]):not([href^=\\#]):not([data-taxi-ignore])",
      removeOldContent: true,
      allowInterruption: false,
      bypassCache: false,
      transitions: {
        default: Tra,
      },
    });

    this.prevPath = null;

    this.useProps();
    window.router = this;
  }

  useProps() {
    // setup props
    this.props = {
      from: getPath(window.location.href),
      to: null,
    };

    this.on("NAVIGATE_OUT", ({ trigger }) => {
      if (trigger === "popstate") {
        this.props.to = getPath(location.href);
      } else {
        this.props.to = getPath(trigger.href);
      }
    });
  }

  async transitionOut(page) {
    // console.log("props", this.props.from, this.props.to);

    await Promise.allSettled([
      window.app.dom.transitionOut(page, this.props),
      // window.app.gl.transitionOut(page, this.props),
    ]);

    return Promise.resolve();
  }

  async transitionIn(page) {
    await Promise.allSettled([
      window.app.dom.transitionIn(page, this.props),
      // window.app.gl.transitionIn(page),
    ]);

    this.props.from = this.props.to;
    return Promise.resolve();
  }
}

/* --- Utils */
function getPath(url) {
  const fullUrl = new URL(url);
  const splitPath = fullUrl.pathname.split("/");
  const [, second, third] = splitPath;
  return [second, third];
}

/* -- Transition */
class Tra {
  constructor({ wrapper }) {
    this.wrapper = wrapper;
  }

  leave(props) {
    return new Promise((resolve) => {
      this.onLeave({ ...props, done: resolve });
    });
  }

  enter(props) {
    return new Promise((resolve) => {
      this.onEnter({ ...props, done: resolve });
    });
  }

  onLeave({ from, trigger, done }) {
    window.app.pages.transitionOut(from).then(() => done());
  }

  onEnter({ to, trigger, done }) {
    window.app.pages.transitionIn(to).then(() => done());
  }
}
