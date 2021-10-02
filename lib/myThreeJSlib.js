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

export { logLog, myThreeJSlib };