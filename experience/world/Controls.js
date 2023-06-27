import Experience from "../Experience.js";
import GSAP from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.dimensions = this.experience.dimensions;

        this.resources = this.experience.resources;
        this.time = this.experience.time;

        this.camera = this.experience.cam;
        this.room = this.experience.world.room.actualRoom;

        this.room.children.forEach(child => {
            if (child.name === "RL1") {
                this.light1 = child;
            } else if (child.name === "RL2") {
                this.light2 = child;
            } else if (child.name === "RL3") {
                this.light3 = child;
            }
        });

        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible";

        this.setSmoothScroll();
        this.setScrollTrigger();
    }

    setScrollTrigger() {
        ScrollTrigger.matchMedia({

            "(min-width: 969px)": () => {

                this.room.scale.set(0.75, 0.75, 0.75);
                this.room.position.set(0, -1, 0);

                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: .75,
                        invalidateOnRefresh: true
                    }
                }).to(this.room.position, {
                    x: () => {
                        return this.dimensions.width * 0.005;
                    },
                    z: () => {
                        return this.dimensions.width * 0.002;
                    },
                }, "same").to(this.room.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4
                }, "same");

                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: .75,
                        invalidateOnRefresh: true
                    }
                }).to(this.room.position, {
                    x: () => {
                        return this.dimensions.width * -0.002;
                    },
                    z: () => {
                        return this.dimensions.width * 0.0025;
                    }
                }, "same").to(this.room.scale, {
                    x: 1.6,
                    y: 1.6,
                    z: 1.6
                }, "same");

                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: .75,
                        invalidateOnRefresh: true
                    }
                }).to(this.room.position, {
                    x: () => {
                        return this.dimensions.width * 0.00175;
                    },
                    z: () => {
                        return this.dimensions.width * -0.00175;
                    }
                }, "same").to(this.room.scale, {
                    x: 0.75,
                    y: 0.75,
                    z: 0.75
                }, "same");

                [this.light1, this.light2, this.light3].forEach(light => {
                    this.firstMoveTimeline.to(light, {
                        width: light.width * (1.4 / 0.75),
                        height: light.height * (1.4 / 0.75)
                    }, "same");

                    this.secondMoveTimeline.to(light, {
                        width: light.width * (1.6 / 0.75),
                        height: light.height * (1.6 / 0.75)
                    }, "same");

                    this.thirdMoveTimeline.to(light, {
                        width: light.width,
                        height: light.height
                    }, "same");
                });

            },

            "(max-width: 968px)": () => {


                this.room.scale.set(0.5, 0.5, 0.5);
                this.room.position.set(.5, -1, 0);

                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: .75,
                        invalidateOnRefresh: true
                    }
                }).to(this.room.scale, {
                    x: 0.75,
                    y: 0.75,
                    z: 0.75
                }, "same");

                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: .75,
                        invalidateOnRefresh: true
                    }
                }).to(this.room.scale, {
                    x: 1,
                    y: 1,
                    z: 1
                }, "same");

                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: .75,
                        invalidateOnRefresh: true
                    }
                }).to(this.room.scale, {
                    x: 1.25,
                    y: 1.25,
                    z: 1.25
                }, "same");

                [this.light1, this.light2, this.light3].forEach(light => {

                    light.width = light.width * (0.5 / 0.75);
                    light.height = light.height * (0.5 / 0.75);

                    this.firstMoveTimeline.to(light, {
                        width: light.width * (0.75 / 0.5),
                        height: light.height * (0.75 / 0.5)
                    }, "same");

                    this.secondMoveTimeline.to(light, {
                        width: light.width * (1 / 0.5),
                        height: light.height * (1 / 0.5)
                    }, "same");

                    this.thirdMoveTimeline.to(light, {
                        width: light.width * (1.25 / 0.5),
                        height: light.height * (1.25 / 0.5)
                    }, "same");
                });
            },

            all: () => {
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach(section => {
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        }
                    })
                });
            }

        });
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.1,
            disableRaf: true,
        });

        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
        });
        return asscroll;
    }

    setSmoothScroll() {
        this.asscroll = this.setupASScroll();
    }

    resize() {
    }

    update() {
    }
}