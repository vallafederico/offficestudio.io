import { gsap } from "gsap/gsap-core";
import { loadTexture } from "./texture-loader";
import { loadModel } from "./model-loader";
import { ASSETS } from "../../assets";

export class Loader {
  constructor(gl) {
    this.gl = gl;
    this.content = document.querySelector("[data-data]").dataset.data;
    this.wrapper = document.querySelector('[data-loader="wrapper"]');
    this.line = document.querySelector('[data-loader="line"]');

    if (!this.wrapper) return;
    if (!this.line) this.wrapper.remove();
  }

  async load() {
    const cont = JSON.parse(this.content);
    setTimeout(() => this.computeInitialStore(cont), 1); // bad fix, rewrite pls

    this.full = cont.length * 2 + 1 - 1;
    this.count = 0;

    console.time("load");
    // --------------------------------------------------------------------------------

    const [mod, textures, mtc_dark] = await Promise.all([
      Promise.all([
        ...cont.map((item) =>
          loadModel(this.gl, window.location.origin + "/" + item.modelurl).then(
            (val) => {
              this.updateProgress();
              return val;
            }
          )
        ),
      ]),
      Promise.all([
        ...cont.map((item) =>
          loadTexture(
            this.gl,
            window.location.origin + "/" + item.textureurl
          ).then((val) => {
            this.updateProgress();
            return val;
          })
        ),
      ]),
      loadTexture(this.gl, ASSETS.mtc_dark),
    ]);

    window.assets = {
      mod,
      textures,
      mtc_dark,
    };

    // --------------------------------------------------------------------------------
    console.timeEnd("load");
  }

  updateProgress() {
    this.count++;

    this.perc = this.count / this.full;
    const perc = Math.floor(this.perc * 100);

    if (!this.line) return;
    gsap.to(this.line, {
      duration: 0.1,
      ease: "expo.out",
      scaleX: perc + "%",
    });

    if (perc === 100) {
      if (!this.wrapper) return;
      gsap.to(this.wrapper, {
        duration: 0.6,
        delay: 0.2,
        autoAlpha: 0,
        onComplete: () => {
          this.wrapper.remove();
        },
      });
    }
  }

  computeInitialStore(cont) {
    // clean pathname
    let { pathname } = window.location;

    if (
      pathname.length > 1 &&
      pathname.substring(pathname.length - 1) === "/"
    ) {
      pathname = pathname.substring(0, pathname.length - 1);
    }

    // find index of current page
    const startsAt = cont.findIndex((item) => item.url === pathname);

    if (startsAt === -1) {
      if (pathname === "/contact" || pathname === "/contact/") {
        // CONTACT PAGE INIT
        window.app.store.slider.current = 0;
        window.app.store.work = false;
        window.app.store.contact = true;
      } else {
        // home or general page
        window.app.store.slider.current = 0;
        window.app.store.work = false;
        window.app.store.contact = false;
      }
    } else {
      window.app.store.slider.current = startsAt;
      window.app.store.work = true;
      window.app.store.contact = false;
    }
  }
}

function processModel() {}
