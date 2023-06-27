import EventEmitter from "events";
import Experience from "./Experience.js";
import GSAP from "gsap";
import convert from "./utils/ConvertDivsToSpan.js";

export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.dimensions = this.experience.dimensions;

        this.resources = this.experience.resources;
        this.time = this.experience.time;

        this.camera = this.experience.cam;
        this.world = this.experience.world;

        this.device = this.dimensions.device;

        this.dimensions.on("switchdevice", (device) => {
            this.device = device;
        })

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        }

        )
    }

    setAssets() {
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-desc"));
        convert(document.querySelector(".hero-second-subhead"));
        convert(document.querySelector(".second-sub"));

        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
    }

    firstIntro() {
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatedis", { y: 0, yPercent: 100 });
            this.timeline.to(".preloader", {
                opacity: 0,
                delay: 2,
                onComplete: () => {
                    document
                        .querySelector(".preloader")
                        .classList.add("hidden");
                },
            });
            if (this.device === "desktop") {

            } else {
                this.timeline
                    .to(this.room.position, {
                        x: 0.5
                    }, "adapt")
                    .to(
                        this.room.scale,
                        {
                            x: 0.5, y: 0.5, z: 0.5,
                        }, "adapt")
            }
            this.timeline
                .to(this.roomChildren.rocks.position, {
                    y: this.roomChildren.rocks.position.y + 1.5,
                    delay: 1,
                    ease: "back.out(2.5)",
                    duration: 0.8,
                })
                .to(".intro-text .animatedis", {
                    yPercent: 0,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                })
                .to(
                    ".arrow-svg-wrapper",
                    {
                        opacity: 1,
                    },
                    "same"
                )
                .to(
                    ".toggle-bar",
                    {
                        opacity: 1,
                        onComplete: resolve,
                    },
                    "same"
                );
        });
    }

    secondaryIntro() {
        return new Promise((resolve) => {
            this.secondTimeline = new GSAP.timeline();

            this.secondTimeline
                .to(
                    ".intro-text .animatedis",
                    {
                        yPercent: 100,
                        stagger: 0.05,
                        ease: "back.in(1.7)",
                    },
                    "fadeout"
                )
                .to(
                    ".arrow-svg-wrapper",
                    {
                        opacity: 0,
                    },
                    "fadeout"
                )
                .to(this.roomChildren.cockpit.position, {
                    y: this.roomChildren.cockpit.position.y - 40,
                    ease: "back.out(0.5)",
                    duration: 3,
                }, "landing")
                .to(this.roomChildren.mainmesh.position, {
                    y: this.roomChildren.mainmesh.position.y - 40,
                    ease: "back.out(0.5)",
                    duration: 3,
                }, "landing")
                .to(this.roomChildren.bed.position, {
                    y: this.roomChildren.bed.position.y - 40,
                    ease: "back.out(0.5)",
                    duration: 3,
                }, "landing")
                .to(this.roomChildren.booster01.position, {
                    y: this.roomChildren.booster01.position.y - 40,
                    ease: "back.out(0.5)",
                    duration: 3,
                }, "landing")
                .to(this.roomChildren.booster02.position, {
                    y: this.roomChildren.booster02.position.y - 40,
                    ease: "back.out(0.5)",
                    duration: 3,
                }, "landing")
                .to(this.roomChildren.booster03.position, {
                    y: this.roomChildren.booster03.position.y - 40,
                    ease: "back.out(0.5)",
                    duration: 3,
                }, "landing")
                .to(this.roomChildren.booster04.position, {
                    y: this.roomChildren.booster04.position.y - 40,
                    ease: "back.out(0.5)",
                    duration: 3,
                }, "landing")
                .to(this.roomChildren.deskbase.position, {
                    y: this.roomChildren.deskbase.position.y - 40,
                    ease: "back.out(0.5)",
                    duration: 3,
                }, "landing")
                .to(this.roomChildren.frames.position, {
                    y: this.roomChildren.frames.position.y - 40,
                    ease: "back.out(0.5)",
                    duration: 3,
                }, "landing")
                .to(this.roomChildren.prop.position, {
                    y: this.roomChildren.prop.position.y - 40,
                    ease: "back.out(0.5)",
                    duration: 3,
                }, "landing")
                .to(this.roomChildren.rightpane.position, {
                    y: this.roomChildren.rightpane.position.y - 40,
                    ease: "back.out(0.5)",
                    duration: 3,
                }, "landing")
                .to(this.roomChildren.shelves.position, {
                    y: this.roomChildren.shelves.position.y - 40,
                    ease: "back.out(0.5)",
                    duration: 3,
                }, "landing")
                .to(this.roomChildren.toppane.position, {
                    y: this.roomChildren.toppane.position.y - 40,
                    ease: "back.out(0.5)",
                    duration: 3,
                }, "landing")
                .to(this.roomChildren.wingl.position, {
                    y: this.roomChildren.wingl.position.y - 40,
                    ease: "back.out(0.5)",
                    duration: 3,
                }, "landing")
                .to(this.roomChildren.wingr.position, {
                    y: this.roomChildren.wingr.position.y - 40,
                    ease: "back.out(0.5)",
                    duration: 3,
                }, "landing")
                .to(this.roomChildren.desk, {
                    visible: true,
                }, "appearing")
                .to(this.roomChildren.holoscreen, {
                    visible: true,
                }, "appearing")

            this.secondTimeline.to(this.roomChildren.booster01.scale, {
                x: 0,
                y: 0,
                z: 0,
                ease: "back.out(2)",
                duration: 0.3,
            }, "dismantling")
                .to(this.roomChildren.booster04.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "back.out(2)",
                    duration: 0.3,
                })
                .to(this.roomChildren.booster02.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "back.out(2)",
                    duration: 0.3,
                })
                .to(this.roomChildren.booster03.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "back.out(2)",
                    duration: 0.3,
                })
                .to(this.roomChildren.wingl.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "back.out(2)",
                    duration: 0.3,
                })
                .to(this.roomChildren.wingr.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "back.out(2)",
                    duration: 0.3,
                })
                .to(this.roomChildren.toppane.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "back.out(2)",
                    duration: 0.3,
                })
                .to(this.roomChildren.prop.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "back.out(2)",
                    duration: 0.3,
                })
                .to(this.roomChildren.rightpane.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "back.out(2)",
                    duration: 0.3,
                })
                .to(this.roomChildren.cockpit.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "back.out(2)",
                    duration: 0.3,
                })
                .to(this.roomChildren.back.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "back.out(2)",
                    duration: 0.3,
                })

                .to(
                    ".hero-main-title .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    ".hero-main-desc .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    ".first-sub .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                )
                .to(
                    ".second-sub .animatedis",
                    {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                    },
                    "introtext"
                ).to(
                    this.camera.perspectiveCam.position,
                    {
                        x: 9, y: 7, z: 9,
                        ease: "back.out(1.25)",
                        duration: 2,
                        onComplete: resolve,
                    }, "cam"
                ).to(this.roomChildren.rl1, {
                    intensity: 1,
                    ease: "back.out(1.25)",
                    duration: 2,
                }, "light")
                .to(this.roomChildren.rl2, {
                    intensity: 1,
                    ease: "back.out(1.25)",
                    duration: 2,
                }, "light")
                .to(this.roomChildren.rl3, {
                    intensity: 1,
                    ease: "back.out(1.25)",
                    duration: 2,
                }, "light");

        });
    }

    onScroll(e) {
        if (e.deltaY > 0) {
            window.removeEventListener("wheel", this.scrollOnceEvent);
            this.playSecondaryIntro();
        }
    }

    onTouch(e) {
        this.initalY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initalY - currentY;
        if (difference > 0) {
            //console.log("swipped up");
            this.removeEventListeners();
            this.playSecondaryIntro();
        }
        this.intialY = null;
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro() {
        await this.firstIntro();
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this)
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }

    async playSecondaryIntro() {
        await this.secondaryIntro();
        this.emit("enablecontrols");
    }

    update() {

    }
}