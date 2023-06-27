import * as THREE from "three"
import Experience from "../Experience.js";
import GSAP from "gsap";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {}

        this.lerp = {
            current: 0, target: 0, ease: 0.02,
        }

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }

    setModel() {
        this.actualRoom.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach(groupChild => {
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;

                });
            }

            if (child.name === "MainMesh") {
                var sel = child.children[2];
                sel.material = new THREE.MeshPhysicalMaterial();
                sel.material.roughness = 0;
                sel.material.color.set(0xDAF0FF);
                sel.material.ior = 3;
                sel.material.transmission = 1;
                sel.material.opacity = 1;
                sel.castShadow = false;
            } else if (child.name === "HoloScreen") {
                child.material.map = new THREE.TextureLoader().load('/textures/holoscreenBLUE.png');
                child.material.map.flipY = false;
                child.material.transparent = true;
                child.material.opacity = .8;
                child.castShadow = false;
                child.material.emissive = new THREE.Color(0.05, 0.1, 1);
            }


            if (child.name === "Stack" || child.name === "Desk" || child.name === "HoloScreen") {
                child.visible = false;
            } else if (child.name !== "Rocks") {
                child.position.y += 40;
            } else {
                child.position.y -= 1.5;
            }

            this.roomChildren[child.name.toLowerCase()] = child;

        });

        //================================================================== LIGHT PLANES =================================================

        const defaultIntensity = 0;

        let rectLight = new THREE.RectAreaLight(0xffffff, defaultIntensity, .25, 1.4);
        rectLight.name = "RL1";
        rectLight.position.set(-4.697813034057617, 2.6443722248077393, 1.370779275894165);
        rectLight.lookAt(rectLight.position.x, 10, rectLight.position.z);
        this.actualRoom.add(rectLight);

        this.roomChildren[rectLight.name.toLowerCase()] = rectLight;

        let rectLight2 = new THREE.RectAreaLight(0xffffff, defaultIntensity, .25, 1.4);
        rectLight2.name = "RL2";
        rectLight2.position.set(-4.697813034057617, 2.2003721771240234, -1.129220724105835);
        rectLight2.lookAt(rectLight2.position.x, 10, rectLight2.position.z);
        this.actualRoom.add(rectLight2);

        this.roomChildren[rectLight2.name.toLowerCase()] = rectLight2;

        let rectLight3 = new THREE.RectAreaLight(0xffffff, defaultIntensity, 1.2, 3.75);
        rectLight3.name = "RL3";
        rectLight3.position.set(-3.9320573806762695, 0.1, -0.3038812577724457);
        rectLight3.lookAt(rectLight3.position.x, 10, rectLight3.position.z);
        this.actualRoom.add(rectLight3);

        this.roomChildren[rectLight3.name.toLowerCase()] = rectLight3;


        //================================================================== LIGHT PLANES =================================================

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.75, 0.75, 0.75);
        this.actualRoom.position.y = -1;

    }

    resize() {

    }

    update() {
        this.mixer.update(this.time.delta * 0.001);

        this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease,)

        this.actualRoom.rotation.y = this.lerp.current / 25;
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation;
        })
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        [0, 1].forEach(i => {
            this.levitate = this.mixer.clipAction(this.room.animations[i]);
            this.levitate.play();
        });
    }
}