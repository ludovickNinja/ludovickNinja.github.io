import * as THREE from 'https://cdn.skypack.dev/three@0.132.0';

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/utils/RoughnessMipmapper.js';

console.log('Loaded');

function logLog(){
    console.log('logLog');
}

var myThreeJSlib = {

    logTest: function(){
        console.log('Lib Test');
    }

}

var threeJS_Init = {

    init: function (){
        
    }
}

function getObjCenter ( object ) {

	const boundingBox = new THREE.Box3();

	// get bounding box of object - this will be used to setup controls and camera
	boundingBox.setFromObject( object );

	const center = boundingBox.getCenter();

	return center;

} 

function getObjsCenter ( object ) {

	for (let i = 0; i < object.children.count; i++)
	{
		const boundingBox = new THREE.Box3();

		// get bounding box of object - this will be used to setup controls and camera
		boundingBox.setFromObject( object.children[i] );

		const center = boundingBox.getCenter();

		console.log(i);
		console.log(center);

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

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

  	var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  	return { width: srcWidth*ratio, height: srcHeight*ratio, ratioValue: ratio };

}

export { logLog, myThreeJSlib };