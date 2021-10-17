import * as THREE from 'https://cdn.skypack.dev/three@0.132.0';

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/utils/RoughnessMipmapper.js';

let camera, scene, renderer;
let canvasWidth, canvasHeight;
let object, controls;
let file = 'https://ludovickninja.github.io/MTL1.glb';

const clock = new THREE.Clock()

const canvasContainer = document.querySelector('#canvasContainer')
const canvas = document.querySelector('canvas.webgl')

canvasHeight = canvas.offsetHeight;
canvasWidth = canvas.offsetWidth;

init(file);
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

		scene.background = null;
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

            object = gltf.scene;
            object.position.set(0, 0, 0);

			console.log(object);

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
  	camera.updateProjectionMatrix;

	///
	/// Set Renderer
	///
	renderer = new THREE.WebGLRenderer( { antialias: true, canvas: canvas, alpha: true } );
	renderer.setClearColor( 0x000000, 0 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( canvasWidth, canvasHeight );
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1;
	renderer.outputEncoding = THREE.sRGBEncoding;

	///
	/// Set Controls
	///
  	controls = new OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render ); // use if there is no animation loop
  	controls.minDistance = 2;
  	controls.maxDistance = 10;  
	controls.target.set( 0, 0, 0);
  	controls.enableDamping = true
  	controls.update();
    
	window.addEventListener( 'resize', onWindowResize );
  
}

function onWindowResize() {

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