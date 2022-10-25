import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import "./style.scss";
import MarsMap from "./assets/Mars.webp";
import MarsNormalMap from "./assets/Mars-Normal.webp";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const orbitControl = new OrbitControls(camera, renderer.domElement);

const pass = new RenderPass(scene, camera);
const composer = new EffectComposer(renderer);
composer.addPass(pass);

const bloom = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.2,
    10,
    0.1
);
composer.addPass(bloom);

const pLight = new THREE.PointLight({ color: 0x404040 });
scene.add(pLight);

const dLight = new THREE.DirectionalLight(0xffffff, 0.1);
scene.add(dLight);

const mars = new THREE.Mesh(
    new THREE.SphereGeometry(10, 64, 32),
    new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load(MarsMap),
        normalMap: new THREE.TextureLoader().load(MarsNormalMap),
    })
);
mars.position.setY(50);
scene.add(mars);

camera.position.set(-10, 30, 30);
orbitControl.update();

const clock = new THREE.Clock();
const radius = 75;

renderer.setAnimationLoop(() => {
    const time = clock.getElapsedTime() * 0.1 * Math.PI;
    pLight.position.set(
        Math.cos(time + Math.PI * 1) * radius,
        Math.sin(time + Math.PI * 1) * radius,
        0
    );
    renderer.render(scene, camera);
});

window.addEventListener("scroll", (e) => {
    const rotationForce = 0.04;

    mars.rotateY(-rotationForce);
});

const slideIn = (duration) => {
    const params = { y: 50, yRotation: 0 };

    gsap.to(params, {
        y: 0,
        yRotation: 0.1,
        onUpdate: () => {
            const { y, yRotation } = params;

            mars.rotateY(yRotation);
            mars.position.setY(y);
        },
        duration,
    });
};

slideIn(2);

const animate = () => {
    composer.render();
    requestAnimationFrame(animate);
};

animate();

document.body.appendChild(renderer.domElement);

const animObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".hidden").forEach((el) => animObserver.observe(el));
