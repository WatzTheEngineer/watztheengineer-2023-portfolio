import * as THREE from "three"
import Experience from "./Experience.js";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.dim = this.experience.dimensions;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPerspectiveCam();

        this.setOrbitControls();
    }

    createPerspectiveCam() {
        this.perspectiveCam = new THREE.PerspectiveCamera(35, this.dim.aspectRatio, 0.1, 100);
        this.scene.add(this.perspectiveCam);
        this.perspectiveCam.position.x = 14;
        this.perspectiveCam.position.y = 12.5;
        this.perspectiveCam.position.z = 14;
    }

    resize() {
        this.perspectiveCam.aspect = this.dim.aspectRatio;
        this.perspectiveCam.updateProjectionMatrix()
    }

    update() {

    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCam, this.canvas);
        this.controls.enableDamping = false;
        this.controls.enableZoom = false;
    }
}