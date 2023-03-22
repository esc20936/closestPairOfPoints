import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { generateRandomPositions } from '../Utils/utils';
import { useDispatch } from 'react-redux';
import { setDataArray } from '../store/dataSlice';

export class Experience{
    
    constructor(canvas){
        this.scene = new THREE.Scene();
        this.canvas = canvas;
        this.sizes = {
            width: window.innerWidth - (window.innerWidth * 0.55),
            height: window.innerHeight - (window.innerHeight * 0.25)
        };

        this.camera = new THREE.PerspectiveCamera(
            75,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        );

        this.setCameraPosition(0, 0, 5);
        this.scene.add(this.camera);
        this.arrayOfSpheres = [];
  
        
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true
        });
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(this.ambientLight);

        this.pointLight = new THREE.PointLight(0x0000ff, 0.9);
        this.pointLight.position.set(0, 0, 0);
        this.scene.add(this.pointLight);


        this.directionalLight = new THREE.DirectionalLight(0x3500ff0, 0.9);
        this.directionalLight.position.set(-5, 5, 0);
        this.scene.add(this.directionalLight);


        this.lineAxesHelper = new THREE.AxesHelper(5);
        this.scene.add(this.lineAxesHelper);

        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;

        window.addEventListener('resize', () => {
            this.sizes.width =window.innerWidth - (window.innerWidth * 0.55),
            this.sizes.height = window.innerHeight - (window.innerHeight * 0.25)

            this.camera.aspect = this.sizes.width / this.sizes.height;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(this.sizes.width, this.sizes.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });

        this.tick();


    }

    setCameraPosition(x, y, z){
        this.camera.position.x = x;
        this.camera.position.y = y;
        this.camera.position.z = z;
    }

    addSpheres(arrayOfCoords){
        if(this.arrayOfSpheres.length > 0){
            this.arrayOfSpheres.forEach(sphere => {
                this.scene.remove(sphere);
            });
        }

        for(let i = 0; i < 250; i++){
            const sphere = new THREE.Mesh(
                new THREE.SphereGeometry(0.05, 32, 32),
                new THREE.MeshPhongMaterial({ color: 0xffffff })
            );
            sphere.position.x = arrayOfCoords ? arrayOfCoords[i].x : (Math.random() - 0.5) * 10;
            sphere.position.y = arrayOfCoords ? arrayOfCoords[i].y : (Math.random() - 0.5) * 10;
            sphere.position.z = arrayOfCoords ? arrayOfCoords[i].z : (Math.random() - 0.5) * 10;
            this.arrayOfSpheres.push(sphere);
            this.scene.add(sphere);
        }

    }

    tick(){
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
        window.requestAnimationFrame(this.tick.bind(this));
    }
}