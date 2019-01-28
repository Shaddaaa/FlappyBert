class Player {
	constructor(x, y, imgs, ctx, show_hitbox) {
		this.x = x;
		this.y = y;
		this.imgs = imgs;
		this.ctx = ctx;
		this.show_hitbox = show_hitbox;
		//negativ speed: go up, 
		//positiv speed: go down
		this.speed = 0;

		this.width = this.imgs["normal"].width;
		this.height = this.imgs["normal"].height;
	}
	//set the speed so that the player moves up
	jump() {
		this.speed = -20;
	}
	//move the player, make the player fall
	move(update_speed) {
		this.y += this.speed * update_speed / 50;
		this.speed += 2 * update_speed / 50;
	}

	paint() {
		if (this.show_hitbox) {
			this.ctx.fillStyle = "00FFFF";
			this.ctx.fillRect(this.x, this.y, this.width, this.height);
		}
		if (this.speed < 0)
			drawRotatedImage(this.imgs["jump"], this.x, this.y, this.speed, this.ctx);
		else
			drawRotatedImage(this.imgs["normal"], this.x, this.y, this.speed, this.ctx);
	}

	getSpeed() { return this.speed; }

	getHeight() { return this.height; }

	getWidth() { return this.width; }

	getImgs() { return this.imgs }

	getX() { return this.x; }

	getY() { return this.y; }
}