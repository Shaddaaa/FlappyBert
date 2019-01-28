function sleep (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function drawRotatedImage(img, x, y, deg, ctx) {
	// because we only deal with shitty radians (I had to learn about those before doing this lol)
	var rad = deg * Math.PI / 180;

	let width = img.width;
	let height = img.height;

	// absolute image center position
	var centerx = x + width / 2;
	var centery = y + height / 2;

	// set the canvas origin to the image (img) center
	ctx.translate(centerx, centery);

	// rotate the whole canvas
	ctx.rotate(rad);

	// draw our image, unrotated
	ctx.drawImage(img, width / -2, height / -2);

	// rotate back, the image is now out of place with the other things
	// --- rotated
	ctx.rotate(rad * -1);

	// we "move back" our canvas origin
	ctx.translate(centerx * -1, centery * -1);
}