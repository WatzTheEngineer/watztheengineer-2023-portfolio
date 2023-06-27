import * as THREE from 'three'
import Dimensions from './utils/Dimensions.js';
import Resources from './utils/Resources.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import Preloader from './Preloader.js';
import Time from './utils/Time.js';
import World from './world/World.js';
import Controls from './world/Controls.js';
import assets from './utils/Assets.js';
import Theme from './Theme.js';

export default class Experience {
    static instance;
    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance;
        }
        Experience.instance = this;

        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.dimensions = new Dimensions();
        this.cam = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.theme = new Theme();
        this.world = new World();
        this.preloader = new Preloader();

        this.preloader.on("enablecontrols", () => {
            this.controls = new Controls();
        })

        //console.log(this.scene.children);

        this.time.on("update",()=>{
            this.update();
        })

        this.dimensions.on("resize",()=>{
            this.resize();
        })

    }

    resize(){
        this.cam.resize();
        this.world.resize();
        this.renderer.resize();
    }

    update(){
        this.cam.update();
        this.world.update();
        this.renderer.update();
        this.preloader.update();
    }


}