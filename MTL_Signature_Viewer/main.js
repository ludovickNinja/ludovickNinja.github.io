import * as THREE from 'https://cdn.skypack.dev/three@0.132.0';

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/utils/RoughnessMipmapper.js';

// variables
let camera, scene, renderer;
let canvasWidth, canvasHeight;
let controls, object;
let turnTable = true;
var jsonModels;
var modelName = "Model";
let file = 'https://ludovickninja.github.io/assets/models/Model.glb';
var modelList = [];


const clock = new THREE.Clock();
var rotation = 0;
var previousTime = 0;

// get canvas
const canvas = document.querySelector('canvas.webgl');
const canvasContainer = document.querySelector('#canvasContainer');
canvasHeight = canvasContainer.offsetHeight;
canvasWidth = canvasContainer.offsetWidth;

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

const modelHeader = document.querySelector('h2');

///JSON
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		//console.log(xhttp.responseText);
		/*
		var response = JSON.parse(xhttp.responseText);
		console.log(response.collections)
		*/
		jsonModels = JSON.parse(xhttp.responseText);
		console.log(jsonModels.collections)

		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		if (urlParams.has('collection')) {
			for (let i = 0; i < jsonModels.collections.length; i++) {
				if (jsonModels.collections[i].collection == urlParams.get('collection')) {
					console.log("Success");
					if (urlParams.has('model')) {
						for (let j = 0; j < jsonModels.collections[i].models.length; j++) {
							if (jsonModels.collections[i].models[j].name == urlParams.get('model')) {
								console.log("Double Success");
								console.log(jsonModels.collections[i].models[j].file)
								console.log(jsonModels.collections[i].models[j].details)
							}
							else console.log("Success but Fail")
						}
					}
					else {
						for (let j = 0; j < jsonModels.collections[i].models.length; j++) {
							modelList.push(jsonModels.collections[i].models[j].name)
						}

					}
				}
				else console.log("Fail");
			}
		}
		else {
			file = "https://ludovickninja.github.io/assets/models/MTL%20WG.glb";
			modelName = "MTL Signature"
			console.log(file);
		}

		// start
		init(file);
		console.log(modelList);
	}
};
xhttp.open("GET", "https://ludovickninja.github.io/api/Models.json", true);
xhttp.send();


// initialize scene
function init(file) {

	scene = new THREE.Scene();

    ///
	/// Set Object / Environment
	///
	new RGBELoader()
	.setPath( 'https://ludovickninja.github.io/assets/environment/' )
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
        //.setPath( 'https://ludovickninja.github.io/assets/models/' );
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

			const box = new THREE.Box3().setFromObject( object );
			const center = box.getCenter( new THREE.Vector3() );
			const size = box.getSize( new THREE.Vector3() );
			const maxDim = Math.max( size.x, size.y, size.z );
			//console.log( size );
			//console.log( maxDim );

			object.position.x += ( object.position.x - center.x );
			object.position.y += ( object.position.y - center.y );
			object.position.z += ( object.position.z - center.z );
			
			console.log( object );
			console.log( object.position );

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
	camera = new THREE.PerspectiveCamera( 1.25, canvasWidth / canvasHeight, 0.1, 2000 );
	camera.position.set( -0.5, 0.75, 1 );
	camera.lookAt( 0, 0, 0 );  	
	camera.updateProjectionMatrix;

	///
	/// Set Renderer
	///
	renderer = new THREE.WebGLRenderer( { 
		antialias: true, 
		canvas: canvas, 
		preserveDrawingBuffer: true } );
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
  	controls.minDistance = 0.2;
	//controls.maxDistance = controls.minDistance;
  	controls.maxDistance = 10;  
	controls.target.set( 0, 0, 0 );
  	controls.enableDamping = true
  	controls.update();
    
	window.addEventListener( 'resize', onWindowResize );
}

// resize content
function onWindowResize() {

	canvasHeight = canvasContainer.offsetHeight;
	canvasWidth = canvasContainer.offsetWidth;

  	camera.aspect = canvasWidth / canvasHeight;
  	
	camera.updateProjectionMatrix();

	renderer.setSize( canvasWidth  , canvasHeight );
	
  	//console.log(camera.aspect)

	render();

}

// render scene
function render() {

	renderer.render( scene, camera );
	modelHeader.innerText = modelName;

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

export { renderer , modelName};