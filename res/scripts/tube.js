class Tube{
	constructor(gap_height, cvs, x = -1) {
		//position the tube on the right side of the game
		this.x = x == -1 ? cvs.width : x;
		//make a gap at a random height
		this.gap = Math.floor(Math.random() * (cvs.height-gap_height));
	}
	//move the tube to the left
	move(speed) {
		this.x -= speed;
	}

	setX(x){this.x = x}

	getX(){return this.x;}

	getGap(){return this.gap;}

	getTubeImgs(){return this.tube_imgs;}

	getTubeImg(dir){return this.tube_imgs[dir];}
	
}