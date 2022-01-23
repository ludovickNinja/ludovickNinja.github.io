import * as THREE from 'https://cdn.skypack.dev/three@0.132.0';

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/utils/RoughnessMipmapper.js';

let camera, scene, renderer;
let canvasWidth, canvasHeight;
let object, controls;
let turnTable = true;
let file = 'https://ludovickninja.github.io/assets/models/Bombe%20Mid%20W65%20T22%20S105.glb';

const clock = new THREE.Clock()
var rotation = 0;
var previousTime = 0;

const canvasContainer = document.querySelector('#canvasContainer')
const canvas = document.querySelector('canvas.webgl')

///
/// new button query
///
const ctrls = document.querySelectorAll(".ctrl");
ctrls.forEach(function (btn) {
  	btn.addEventListener("click", function (e) {
		const styles = e.currentTarget.classList;
		if (styles.contains("topView")) {
			SetTopView();
		} else if (styles.contains("frontView")) {
			SetFrontView();
		}  else if (styles.contains("perspectiveView")) {
			SetPerspectiveView();
		} else if (styles.contains("turntableControl")) {
			ToggleTurnTable(e.currentTarget);
		} else {
			ResetPosition();
		}
		});
});

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
        'https://ludovickninja.github.io/assets/environment/Studio.hdr',

        // called when the resource is loaded
        function ( texture ) {
		texture.mapping = THREE.EquirectangularReflectionMapping;

		var videobg = document.querySelector('video');

		var texturebg = new THREE.VideoTexture( videobg );
		texturebg.minFilter = THREE.LinearFilter;
		texturebg.magFilter = THREE.LinearFilter;
		texturebg.format = THREE.RGBFormat;
					
		scene.background = texturebg;
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

            const tick = () =>	{

                const elapsedTime = clock.getElapsedTime();
            
				rotation += 0.5 * ( elapsedTime - previousTime);

				previousTime = elapsedTime;

                // Update objects
                if(turnTable) object.rotation.y = rotation;

                // Update Orbital Controls
                controls.update();
            
                // Render
                render();
            
                // Call tick again on the next frame
                window.requestAnimationFrame(tick);
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
	camera.position.set( 0, -1.25, 0 );
  	camera.lookAt( 0, 0, 0 );
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

// change camera position to topView
function SetTopView() {

	//console.log( 'OG Camera' );
	//console.log( camera );

	camera.position.set( 0, -1.25, 0 );
  	camera.lookAt( 0, 0, 0 );
  	camera.updateProjectionMatrix;
	//console.log( 'New Camera' );
	//console.log( camera );
	
	// Render
	render();
	//console.log( 'Render' );
} 

// change camera position to frontView
function SetFrontView() {

	//console.log( 'OG Camera' );
	//console.log( camera );

	camera.position.set( 0, 0, 1.25 );
  	camera.lookAt( 0, 0, 0 );
  	camera.updateProjectionMatrix;
	//console.log( 'New Camera' );
	//console.log( camera );

	// Render
	render();
	//console.log( 'Render' );
} 

// change camera position to perspectiveView
function SetPerspectiveView() {

	//console.log( 'OG Camera' );
	//console.log( camera );

	camera.position.set( -0.5, 0.75, 1 );
  	camera.lookAt( 0, 0, 0 );
  	camera.updateProjectionMatrix;
	//console.log( 'New Camera' );
	//console.log( camera );

	// Render
	render();
	//console.log( 'Render' );
} 

function ToggleTurnTable(btn) {

	if (turnTable){
		turnTable = false;
		btn.innerHTML = 'Turn Table : Off'
	}
	else if (!turnTable){
		turnTable = true;
		btn.innerHTML = 'Turn Table : On'
	}
} 

function ResetPosition() {
	//startTime = clock.getElapsedTime();
	rotation = 0;
	object.rotation.y = 0;
	//render();
} 