import {
    AmbientLight, DirectionalLight,
    HemisphereLight,
    PerspectiveCamera,
    PointLight,
    Scene, TextureLoader, Vector3,
    WebGLRenderer
} from "three";
import shapesArray3D from "./compoundShapes/shapesArray3D";

let scene = new Scene();
let ambientLight = new AmbientLight('red', 0.01);
scene.add(ambientLight);

let pointLight = new PointLight( 'red', 3, 150, 2 );
pointLight.position.set( 0,0,0 );
scene.add( pointLight );

let hemisphereLight = new HemisphereLight( 'white', 'red', 1 );
scene.add(hemisphereLight);

let fov = 75;
let aspect = window.innerWidth / window.innerHeight;
let near = 0.1;
let far = 1000;

let camera = new PerspectiveCamera(fov, aspect, near, far);
let renderer = new WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let rowSize = 7;
let colSize = 7;
let depthSize = 20;
let spacingFactor = 7;
let rearLightPaddingDistance = 10;

// const loader = new TextureLoader();
// const bgTexture = loader.load('http://localhost:8080/package-lock.jpg');
// scene.background = bgTexture;

const arrayOfShapes = new shapesArray3D(new Vector3(0, 0, 0),
    rowSize,
    colSize,
    depthSize, spacingFactor);

const sun = new DirectionalLight('0xa1cbd6', 0.0);

function getSunPositionZCoordinate() {
    return -(depthSize * spacingFactor + rearLightPaddingDistance);
}

sun.position.set(0, 0, getSunPositionZCoordinate());
sun.target.position.set(0, 0,0);
scene.add(sun);

arrayOfShapes.populate3DShapesGrid(scene);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    arrayOfShapes.rotateShapes();
    sun.intensity = (sun.intensity + 0.01) % 1;
    renderer.render(scene, camera);
}

animate();
