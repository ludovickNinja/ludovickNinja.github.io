const canvas = document.querySelector('canvas.webgl');







function Capture() {
    /*
    var fullQuality = canvas.toDataURL('image/jpeg', 1.0);
    // data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...9oADAMBAAIRAxEAPwD/AD/6AP/Z"
    var mediumQuality = canvas.toDataURL('image/jpeg', 0.5);
    var lowQuality = canvas.toDataURL('image/jpeg', 0.1);
    */
	var img    = canvas.toDataURL("image/png");

    document.write('<img src="'+img+'"/>');
} 
