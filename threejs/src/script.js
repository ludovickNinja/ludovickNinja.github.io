import * as THREE from 'https://cdn.skypack.dev/three';

import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from 'https://cdn.skypack.dev/three/examples/jsm/utils/RoughnessMipmapper.js';


let camera, scene, renderer;

const clock = new THREE.Clock()

init();
render();

const gui = new dat.GUI()

function init() {
    /*
	const container = document.createElement( 'div' );
	document.body.appendChild( container );
    */
    const canvas = document.querySelector('canvas.webgl')

	camera = new THREE.PerspectiveCamera( 1, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( -0.5, 0.75, 1 );

	scene = new THREE.Scene();

    //Loaders
	new RGBELoader()
	//.setPath( 'textures/equirectangular/' )
	.load( 
        // resource URL
        'https://ludovickninja.github.io/Studio.hdr', 
        // called when the resource is loaded
        function ( texture ) {
		texture.mapping = THREE.EquirectangularReflectionMapping;

		//scene.background = texture;
        scene.background = new THREE.Color( 0xf0f0f0 );
		scene.environment = texture;

		render();

		// use of RoughnessMipmapper is optional
		const roughnessMipmapper = new RoughnessMipmapper( renderer );

		const loader = new GLTFLoader()
        //.setPath( 'models/gltf/DamagedHelmet/glTF/' );
		loader.load( 
        // model URL
        'https://ludovickninja.github.io/MTL1.glb', 
        // called when the model is loaded
        function ( gltf ) {

            gltf.scene.traverse( function ( child ) {

				if ( child.isMesh ) {

					roughnessMipmapper.generateMipmaps( child.material );

				}

			} );

            var object = gltf.scene;
            object.position.set(0, 0, 0);

			scene.add( gltf.scene );

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

	renderer = new THREE.WebGLRenderer( { antialias: true,
        canvas: canvas } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1;
	renderer.outputEncoding = THREE.sRGBEncoding;
	//container.appendChild( renderer.domElement );

    
	const controls = new OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render ); // use if there is no animation loop
    controls.minDistance = 2;
	controls.maxDistance = 10;
    
	controls.target.set( 0, 0, 0);
	
    controls.enableDamping = true
    controls.update();
    
	window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	render();

}

function render() {

	renderer.render( scene, camera );

}