class Tube{
	constructor(gap_height, cvs, x = -1, imgs, ctx) {
		//position the tube on the right side of the game
		this.x = x == -1 ? cvs.width : x;
		//make a gap at a random height
		this.gap = Math.floor(Math.random() * (cvs.height-gap_height));
		this.gap_height = gap_height;
		this.imgs = imgs;
		this.ctx = ctx;
	}
	//move the tube to the left
	move(speed) {
		this.x -= speed;
	}

	paint() {
		this.ctx.fillStyle = "#00FF00";
		this.ctx.drawImage(this.imgs["down"], this.x, this.gap - this.imgs["down"].height);
		console.log(this.imgs["up"]);
		console.log(this.x);
		console.log(this.gap + this.gap_height);
		this.ctx.drawImage(this.imgs["up"], this.x, this.gap + this.gap_height);
	}

	setX(x){this.x = x}

	getX(){return this.x;}

	getGap(){return this.gap;}

	getTubeImgs(){return this.imgs;}

	getTubeImg(dir){return this.imgs[dir];}
	
}