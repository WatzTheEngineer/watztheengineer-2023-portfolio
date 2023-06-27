import Experience from "../Experience.js";
import Room from "./Room.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import {EventEmitter} from "events";

export default class World extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.dim = this.experience.dimensions;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.cam = this.experience.cam;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;

        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.floor = new Floor();
            this.room = new Room();
            this.emit("worldready");
        });

        this.theme.on("switch", (theme) => {
            this.switchTheme(theme);
        })
    }

    switchTheme(theme) {
        if (this.environment) {
            this.environment.switchTheme(theme);
        }
    }

    resize() {
    }

    update() {
        if (this.room) {
            this.room.update();
        }
        if (this.controls) {
            this.controls.update();
        }

    }
}