import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
importr } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
import './style.css'

// Setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

//create a new renderer by instating the canvas element in our HTML file
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

// Creating an Object

const geometry = new THREE.BoxGeometry(10,10,10);
//set the color of the basic material
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const cube = new THREE.Mesh(geometry, material);

//changing the cube's position
cube.position.z= -15;
cube.position.x= -15;
//changing the rotation
cube.rotation.x= 2; //attaching the rotation to a specific axis of movement
cube.rotation.y= .5;

//new object with new materials
const ico = new THREE.IcosahedronGeometry(10);
const icoMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00, shininess: 100}); //phong materials require lighting to be visible
const icoMesh = new THREE.Mesh(ico, icoMaterial);

icoMesh.position.z= -15;
icoMesh.position.x= 15;

//background
const backgroundTexture = new THREE.TextureLoader().load('images/dark_hallway.jpg')

scene.background = backgroundTexture;

//Object Texture Mapping
const godzillaTexture = new THREE.TextureLoader().load('images/godzilla.png')

//sphere
const sphereGeometry = new THREE.SphereGeometry(10, 22, 10);
const godzillaMaterial = new THREE.MeshBasicMaterial({map: godzillaTexture});
const godzillaMesh = new THREE.Mesh(sphereGeometry, godzillaMaterial);

//bump mapping
const normalTexture = new THREE.TextureLoader().load('images/textureNormal.jpg')

const torusGeo = new THREE.TorusKnotGeometry(5, 1, 250, 5, 9, 15);
const torusMaterial = new THREE.MeshStandardMaterial({
    normalMap: normalTexture,
    roughness: 0,
    metalness: 0.8
})
const torusKnot = new THREE.Mesh(torusGeo, torusMaterial);
torusKnot.position.y= 20

//Lights

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, -10, 10);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
ambientLight.position.set(25, -15, -400);

//Helpers

const lightHelper= new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
//const controls = new OrbitControls({camera, renderer:domElement})

//adding objects to the scene
scene.add(cube);
scene.add(icoMesh);
scene.add(pointLight);
scene.add(ambientLight);
scene.add(lightHelper);
// scene.add(gridHelper);
scene.add(godzillaMesh);
scene.add(torusKnot);

//set render window
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);
camera.position.setX(-3);

//animate

function animate(){
    requestAnimationFrame(animate);
    //slowly rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    //rotate the icosahedron
    icoMesh.rotation.z += -0.03;
    icoMesh.rotation.y += -0.03;
    //rotate sphere
    godzillaMesh.rotation.y += 0.05;
    //allows orbit controls to update live
    //controls.update();

    renderer.render(scene, camera); //tell the renderer to actually render a scene
}

animate(); //call the animate function

//I'm not sure what I did, but the materials work now.
//the OrbitControls does not work for me. the line renderer.domElement is marked as incorrect syntax, and removing the period makes the scene render as a small viewport in the corner of the screen.