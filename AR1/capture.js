import { renderer, modelName } from './main.js';

var strDownloadMime = "image/octet-stream";

const captureControlButton = document.querySelector('.CaptureButton');
captureControlButton.addEventListener("click", saveAsImage);
const canvasContainer = document.querySelector('.square');

// create the capture
function saveAsImage() {
	var imgData, imgNode;

	try {
		var strMime = "image/jpeg";
		//imgData = renderer.domElement.toDataURL(strMime);
		//imgData = document.getElementById('canvasContainer').toDataURL(strMime);
		imgData = canvasContainer.toDataURL(strMime);
		
		saveFile(imgData.replace(strMime, strDownloadMime), modelName + ".jpg");

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