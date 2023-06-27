import * as THREE from "three"
import Experience from "./Experience.js";

export default class Renderer {
    constructor() {
        this.experience = new Experience();
        this.dim = this.experience.dimensions;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.cam = this.experience.cam;

        this.setRenderer();
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas, antialias: true,
        });

        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = .85;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.dim.width, this.dim.height);
        this.renderer.setPixelRatio(this.dim.pixelRatio);

    }

    resize() {
        this.renderer.setSize(this.dim.width, this.dim.height);
        this.renderer.setPixelRatio(this.dim.pixelRatio);
    }

    update() {
        this.renderer.render(this.scene, this.cam.perspectiveCam);
    }
}