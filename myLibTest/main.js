import * as THREE from 'https://cdn.skypack.dev/three@0.132.0';

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/utils/RoughnessMipmapper.js';

import { logLog } from '../lib/myThreeJSlib.js';

let camera, scene, renderer;
let canvasWidth, canvasHeight;
let controls, object;
let turnTable = true;

const clock = new THREE.Clock()

const canvas = document.querySelector('canvas.webgl')
const canvasContainer = document.querySelector('#canvasContainer')
const topViewButton = document.querySelector('#TopView');
const frontViewButton = document.querySelector('#FrontView');
const perspectiveViewButton = document.querySelector('#PerspectiveView');
const turntableControlButton = document.querySelector('#TurntableControl');

topViewButton.addEventListener("click", SetTopView);
frontViewButton.addEventListener("click", SetFrontView);
perspectiveViewButton.addEventListener("click", SetPerspectiveView);
turntableControlButton.addEventListener("click", SetPerspectiveView);

canvasHeight = canvasContainer.offsetHeight;
canvasWidth = canvasContainer.offsetWidth;

logLog();

init();
render();

function init() {

	scene = new THREE.Scene();

    ///
	/// Set Object / Environment
	///
	new RGBELoader()
	.setPath( '../assets/environment/' )
	.load( 
        // resource URL
        'Studio.hdr',

        // called when the resource is loaded
        function ( texture ) {
		texture.mapping = THREE.EquirectangularReflectionMapping;

		//scene.background = texture;
        scene.background = new THREE.Color( 0xffffff );
		scene.environment = texture;

		render();

		// use of RoughnessMipmapper is optional
		const roughnessMipmapper = new RoughnessMipmapper( renderer );

		const loader = new GLTFLoader()
        .setPath( '../models/' );
		loader.load( 
        // model URL
        'Model.glb', 

        // called when the model is loaded
        function ( gltf ) {

            gltf.scene.traverse( function ( child ) {

				if ( child.isMesh ) {

					roughnessMipmapper.generateMipmaps( child.material );

				}

			} );

            object = gltf.scene;

			const box = new THREE.Box3().setFromObject( object );
			const center = box.getCenter( new THREE.Vector3() );
			const size = box.getSize( new THREE.Vector3() );
			const maxDim = Math.max( size.x, size.y, size.z );
			console.log( size );
			console.log( maxDim );

			object.position.x += ( object.position.x - center.x );
			object.position.y += ( object.position.y - center.y );
			object.position.z += ( object.position.z - center.z );
			
			console.log( object );
			console.log( object.position );

			scene.add( object );

            const tick = () =>	{

                const elapsedTime = clock.getElapsedTime();
            
                // Update objects
                if(turnTable) object.rotation.y = .5 * elapsedTime;

                // Update Orbital Controls
                controls.update();
            
                // Render
                render();
            
                // Call tick again on the next frame
                window.requestAnimationFrame(tick);
            }
                        
			roughnessMipmapper.dispose();

            tick();
		},
        
        function ( xhr ) {
            // called while loading is progressing
            console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
        },

        function ( error ) {
            // called when loading has errors
            console.error( 'An error happened', error );
        },
        );

	} 
    );

	///
	/// Set Camera
	///
	camera = new THREE.PerspectiveCamera( 1.25, canvasWidth / canvasHeight, 1, 2000 );
	camera.position.set( -0.5, 0.75, 1 );
	camera.lookAt( 0, 0, 0 );  	
	camera.updateProjectionMatrix;

	///
	/// Set Renderer
	///
	renderer = new THREE.WebGLRenderer( { antialias: true, canvas: canvas } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( canvasWidth, canvasHeight );
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1;
	renderer.outputEncoding = THREE.sRGBEncoding;
	//container.appendChild( renderer.domElement );

	///
	/// Set Controls
	///
  	controls = new OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render ); // use if there is no animation loop
  	//controls.minDistance = 2;
	//controls.maxDistance = controls.minDistance;
  	controls.maxDistance = 10;  
	controls.target.set( 0, 0, 0 );
  	controls.enableDamping = true
  	controls.update();
    
	window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize() {

	//canvasHeight = canvas.clientHeight;
	//canvasWidth = canvas.clientWidth;
	canvasHeight = canvasContainer.offsetHeight;
	canvasWidth = canvasContainer.offsetWidth;

  	camera.aspect = canvasWidth / canvasHeight;
  	//camera.setFocalLength(canvasHeight + canvasWidth);
  
	camera.updateProjectionMatrix();

	renderer.setSize( canvasWidth  , canvasHeight );
	
  	console.log(camera.aspect)

	render();

}

function render() {

	renderer.render( scene, camera );

}

function SetTopView() {

	init();
	console.log('init');
	console.log( camera );

	camera.position.set( 0, -1.25, 0 );
  	camera.lookAt( 0, 0, 0 );
  	camera.updateProjectionMatrix;
	console.log( camera );

	// Render
	render();
	console.log( 'Render' );
} 

function SetFrontView() {

	init();
	console.log( 'init' );
	console.log( camera );

	camera.position.set( 0, 0, 1.25 );
  	camera.lookAt( 0, 0, 0 );
  	camera.updateProjectionMatrix;
	console.log( camera );

	// Render
	render();
	console.log( 'Render' );
} 

function SetPerspectiveView() {

	init();
	console.log( 'init' );
	console.log( camera );

	camera.position.set( -0.5, 0.75, 1 );
  	camera.lookAt( 0, 0, 0 );
  	camera.updateProjectionMatrix;
	console.log( camera );

	// Render
	render();
	console.log( 'Render' );
} 

function ToggleTurnTable() {

	if (turnTable){
		turnTable = false;
	}
	else if (!turnTable){
		turnTable = true;
	}
} 

function fitCameraToObject ( camera, object, offset, controls ) {

	offset = offset || 5;

	const boundingBox = new THREE.Box3();

	// get bounding box of object - this will be used to setup controls and camera
	boundingBox.setFromObject( object );

	const center = boundingBox.getCenter();

	const size = boundingBox.getSize();

	// get the max side of the bounding box (fits to width OR height as needed )
	const maxDim = Math.max( size.x, size.y, size.z );
	const fov = camera.fov * ( Math.PI / 180 );
	let cameraZ = Math.abs( maxDim / 2 * Math.tan( fov * 2 ) ); //Applied fifonik correction

	cameraZ *= offset; // zoom out a little so that objects don't fill the screen

	// <--- NEW CODE
	//Method 1 to get object's world position
	scene.updateMatrixWorld(); //Update world positions
	var objectWorldPosition = new THREE.Vector3();
	objectWorldPosition.setFromMatrixPosition( object.matrixWorld );
	
	//Method 2 to get object's world position
	//objectWorldPosition = object.getWorldPosition();

	const directionVector = camera.position.sub(objectWorldPosition); 	//Get vector from camera to object
	const unitDirectionVector = directionVector.normalize(); // Convert to unit vector
	camera.position = unitDirectionVector.multiplyScalar(cameraZ); //Multiply unit vector times cameraZ distance
	camera.lookAt(objectWorldPosition); //Look at object
	// --->

	const minZ = boundingBox.min.z;
	const cameraToFarEdge = ( minZ < 0 ) ? -minZ + cameraZ : cameraZ - minZ;

	camera.far = cameraToFarEdge * 4;
	camera.updateProjectionMatrix();

	if ( controls ) {

	  // set camera to rotate around center of loaded object
	  controls.target = center;

	  // prevent camera from zooming out far enough to create far plane cutoff
	  controls.maxDistance = cameraToFarEdge * 2;

	  controls.saveState();

	} else {

		camera.lookAt( center )

   }
}