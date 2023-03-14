import './style.css'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//Starting a 3D Scene requires a scene, camera and renderer

// 1. Scene
const scene = new THREE.Scene();


// 2. Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.add(camera);


// 3. Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);


// 4. Geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347 } );
const torus = new THREE.Mesh(geometry, material);
scene.add(torus)


//5. Lighting
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(30, 30, 30);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight, pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)


//6. Controls
const controls = new OrbitControls(camera, renderer.domElement);


//7. Adding stars
function addStar() { //Declaring a new star function
  const  geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial( {color: 0xFFFFFF, roughenss: 1})
  const star = new THREE.Mesh(geometry, material); //Making the star mesh (a small white sphere)

  //Declaring an array that will store the X, Y, Z positions for the star, and randomly generate a number between 1-100 for each coordinate
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)); 
  star.position.set(x, y, z); //Setting the position from the RNG values above
  scene.add(star) //Adding stars to scene
}

Array(200).fill().forEach(addStar); //Calling 200 stars and for each star run the AddStar() function!

//8 Adding a Background!
const spaceTexture = new THREE.TextureLoader().load("./space.jpg")
scene.background = spaceTexture;

//X. Loop to keep calling the renderer recursively
function animate() {
  requestAnimationFrame(animate)
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update();
  renderer.render(scene, camera)
  
}


animate();