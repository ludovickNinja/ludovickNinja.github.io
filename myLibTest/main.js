import * as THREE from 'https://cdn.skypack.dev/three@0.132.0';

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/utils/RoughnessMipmapper.js';

import { logLog } from '../lib/myThreeJSlib.js';

let file = 'https://ludovickninja.github.io/Model.glb';

let camera, scene, renderer;
let canvasWidth, canvasHeight;
//let controls;

const clock = new THREE.Clock()

const canvas = document.querySelector('canvas.webgl')
const canvasContainer = document.querySelector('#canvasContainer')
const topViewButton = document.querySelector('#TopView');
const frontViewButton = document.querySelector('#FrontView');

topViewButton.addEventListener("click", TopView);
frontViewButton.addEventListener("click", FrontView);

//canvasHeight = canvas.clientHeight;
//canvasWidth = canvas.clientWidth;
canvasHeight = canvasContainer.offsetHeight;
canvasWidth = canvasContainer.offsetWidth;

logLog();

init();
render();

function init(file) {

	scene = new THREE.Scene();

    ///
	/// Set Object / Environment
	///
	new RGBELoader()
	//.setPath( 'textures/equirectangular/' )
	.load( 
        // resource URL
        'https://ludovickninja.github.io/Studio.hdr',

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
        //.setPath( 'models/gltf/DamagedHelmet/glTF/' );
		loader.load( 
        // model URL
        file, 

        // called when the model is loaded
        function ( gltf ) {

            gltf.scene.traverse( function ( child ) {

				if ( child.isMesh ) {

					roughnessMipmapper.generateMipmaps( child.material );

				}

			} );

			const box = new THREE.Box3().setFromObject( gltf.scene );
			const center = box.getCenter( new THREE.Vector3() );

			gltf.scene.position.x += ( gltf.scene.position.x - center.x );
			gltf.scene.position.y += ( gltf.scene.position.y - center.y );
			gltf.scene.position.z += ( gltf.scene.position.z - center.z );

            object = gltf.scene;
			
			console.log(object);
			console.log(object.position);

			scene.add( object );

            const tick = () =>
            {
            
                const elapsedTime = clock.getElapsedTime()
            
                // Update objects
                object.rotation.y = .5 * elapsedTime

                // Update Orbital Controls
                controls.update()
            
                // Render
                render();
            
                // Call tick again on the next frame
                window.requestAnimationFrame(tick)
            }
                        
			roughnessMipmapper.dispose();

            tick()
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
	camera.lookAt(0, 0, 0);
	//console.log(object);
	//console.log(object.center);
  	//camera.lookAt(object.getWorldPosition());
  	//camera.setFocalLength(canvasHeight + canvasWidth);
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
	controls.target.set( 0, 0, 0);
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

function TopView() {

	init();
	console.log('init');
	console.log(camera);

	camera.position.set( 0, -1, 0 );
  	camera.lookAt( 0, 0, 0 );
  	camera.updateProjectionMatrix;
	console.log(camera);

	// Render
	render();
	console.log('Render');
} 

function FrontView() {

	camera.position.set( 0, 0, 1 );
  	camera.lookAt( 0, 0, 0 );
  	camera.updateProjectionMatrix;
	console.log(camera);

	// Render
	render();
	console.log('Render');
} 