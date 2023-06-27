import * as THREE from "three"
import Experience from "../Experience.js";
import GSAP from "gsap";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.obj = {
            colorObj: {r: 0, g: 0, b: 0}, intensity: 2.75,
        };

        this.setSun();
    }

    setSun() {
        this.sunlight = new THREE.DirectionalLight('#ffffff', 2.75);
        this.sunlight.castShadow = true;
        this.sunlight.shadow.camera.far = 20;
        this.sunlight.shadow.camera.left = -10;
        this.sunlight.shadow.camera.right = 10;
        this.sunlight.shadow.mapSize.set(4096, 4096);
        this.sunlight.shadow.normalBias = 0.05;
        this.sunlight.position.set(2.7, 14, 6);
        this.scene.add(this.sunlight);

        this.mainAmbiantLight = new THREE.AmbientLight('#ffffff', 1);
        this.scene.add(this.mainAmbiantLight);

    }

    switchTheme(theme) {
        if (theme === "dark") {
            GSAP.to(this.sunlight.color, {
                b: 0.6352941176470588, g: 0.3607843137254902, r: 0.2235294117647059,
            })
            GSAP.to(this.mainAmbiantLight.color, {
                b: 0.6352941176470588, g: 0.3607843137254902, r: 0.2235294117647059,
            })
        } else {
            GSAP.to(this.sunlight.color, {
                b: 1, g: 1, r: 1,
            })
            GSAP.to(this.mainAmbiantLight.color, {
                b: 1, g: 1, r: 1,
            })
        }
    }

    update() {
    }
}