class Player{
	constructor(x, y, imgs) {
		this.x = x;
		this.y = y;
		//negativ speed: go up, 
		//positiv speed: go down
		this.speed = 0;
        this.imgs = imgs;
		this.width = this.imgs["normal"].width;
		this.height = this.imgs["normal"].height;
	}
	//set the speed so that the player moves up
	jump() {
		this.speed = -20;
	}
	//move the player, make the player fall
	move() {
		this.y += this.speed;
		this.speed += 2;
	}

    getSpeed() {return this.speed;}

	getHeight(){return this.height;}

	getWidth(){return this.width;}

	getImgs(){return this.imgs}

	getX(){return this.x;}

	getY(){return this.y;}
}