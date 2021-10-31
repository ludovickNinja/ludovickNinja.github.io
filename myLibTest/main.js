import * as THREE from 'https://cdn.skypack.dev/three@0.132.0';

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/utils/RoughnessMipmapper.js';

import { logLog } from '../lib/myThreeJSlib.js';

// variables
let camera, scene, renderer;
let canvasWidth, canvasHeight;
let controls, object;
let turnTable = true;
var strDownloadMime = "image/octet-stream";

const clock = new THREE.Clock()

// get canvas
const canvas = document.querySelector('canvas.webgl');
const canvasContainer = document.querySelector('#canvasContainer');
canvasHeight = canvasContainer.offsetHeight;
canvasWidth = canvasContainer.offsetWidth;

// old button query
/* 
const topViewButton = document.querySelector('#TopView');
const frontViewButton = document.querySelector('#FrontView');
const perspectiveViewButton = document.querySelector('#PerspectiveView');
const turntableControlButton = document.querySelector('#TurntableControl');

topViewButton.addEventListener("click", SetTopView);
frontViewButton.addEventListener("click", SetFrontView);
perspectiveViewButton.addEventListener("click", SetPerspectiveView);
turntableControlButton.addEventListener("click", ToggleTurnTable);
*/

///
/// new button query
///
const ctrls = document.querySelectorAll(".ctrl");
ctrls.forEach(function (btn) {
  	btn.addEventListener("click", function (e) {
		const styles = e.currentTarget.classList;
		if (styles.contains("topView")) {
			console.log("topView");
			SetTopView();
		} else if (styles.contains("frontView")) {
			console.log("frontView");
			SetFrontView();
		}  else if (styles.contains("perspectiveView")) {
			console.log("perspectiveView");
			SetPerspectiveView();
		} else {
			ToggleTurnTable(e.currentTarget);
			console.log("test function");
		}
		});
});

const captureControlButton = document.querySelector('.CaptureButton');
captureControlButton.addEventListener("click", saveAsImage);

///
/// Accordion
///
var acc = document.getElementsByClassName("accordion");

for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

// test log from lib
logLog();

// start
init();
render();

// initialize scene
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
        .setPath( '../assets/models/' );
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
	renderer = new THREE.WebGLRenderer( { antialias: true, canvas: canvas, preserveDrawingBuffer: true } );
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

// resize content
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

// render scene
function render() {

	renderer.render( scene, camera );

}

// change camera position to topView
function SetTopView() {

	console.log( 'OG Camera' );
	console.log( camera );

	camera.position.set( 0, -1.25, 0 );
  	camera.lookAt( 0, 0, 0 );
  	camera.updateProjectionMatrix;
	console.log( 'New Camera' );
	console.log( camera );
	
	// Render
	render();
	console.log( 'Render' );
} 

// change camera position to frontView
function SetFrontView() {

	console.log( 'OG Camera' );
	console.log( camera );

	camera.position.set( 0, 0, 1.25 );
  	camera.lookAt( 0, 0, 0 );
  	camera.updateProjectionMatrix;
	console.log( 'New Camera' );
	console.log( camera );

	// Render
	render();
	console.log( 'Render' );
} 

// change camera position to perspectiveView
function SetPerspectiveView() {

	console.log( 'OG Camera' );
	console.log( camera );

	camera.position.set( -0.5, 0.75, 1 );
  	camera.lookAt( 0, 0, 0 );
  	camera.updateProjectionMatrix;
	console.log( 'New Camera' );
	console.log( camera );

	// Render
	render();
	console.log( 'Render' );
} 
/*
function ToggleTurnTable() {

	if (turnTable){
		turnTable = false;
		turntableControlButton.innerHTML = 'Turn Table : Off'
	}
	else if (!turnTable){
		turnTable = true;
		turntableControlButton.innerHTML = 'Turn Table : On'
	}
} */
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

// create the capture
function saveAsImage() {
	var imgData, imgNode;

	try {
		var strMime = "image/jpeg";
		imgData = renderer.domElement.toDataURL(strMime);

		saveFile(imgData.replace(strMime, strDownloadMime), "test.jpg");

	} catch (e) {
		console.log(e);
		return;
	}

}

var saveFile = function (strData, filename) {
	var link = document.createElement('a');
	if (typeof link.download === 'string') {
		document.body.appendChild(link); //Firefox requires the link to be in the body
		link.download = filename;
		link.href = strData;
		link.click();
		document.body.removeChild(link); //remove the link when done
	} 
	else {
		location.replace(uri);
	}
}