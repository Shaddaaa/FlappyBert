class FlappyBird{
	constructor(cvs = document.getElementById("game-cvs"),
				update_speed = 25,
				tube_speed = 10,
				tube_count = 3, 
				background = {
					count: 7, 
					path: "res/img/background_<COUNT>.jpg"
				},
				player_img_paths = {normal:"res/img/flappy.png",jump:"res/img/flappy_jump.png"}, 
				tube_img_paths = {
					up: "res/img/tube_up.png", 
					down: "res/img/tube_down.png"
				}){

        this.cvs = cvs;
        this.ctx = cvs.getContext("2d");
		this.Cookie = new Cookie(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000));

		this.update_speed = update_speed;
		
        this.player_img_paths = player_img_paths;
        this.player_imgs = {normal: null, jump: null};
		this.tube_img_paths = tube_img_paths;
		this.tube_imgs = {up: null, down: null};

        this.under_tube = [false, 0];
        this.tube_count = tube_count;
        this.gap_height = 200;
        this.tube_width = 60;
        this.tube_speed = tube_speed;
		this.tube_spacing = cvs.width / 3;
		this.background = background;
		this.background['timeout'] = 10 * 1000;
        
		this.add_imgs();
		this.start();
	}

	//Initialisation of all dynamic objects
    async start(){
    	this.score = 0;
        this.running = true;
        this.tubes = new Array(this.tube_count);
        for(let i = 0; i < this.tube_count; i++){
            this.tubes[i] = new Tube(this.gap_height, this.cvs, this.cvs.width + this.tube_spacing * i, this.tube_imgs, this.ctx);
		}		
		this.player = new Player(40, 150, this.player_imgs, this.ctx);

		this.background["last"] = Date.now();
		this.background["current"] = 0;

		let lastTime = new Date().getTime();
        while (this.running) {
			await sleep(1);
            if (lastTime + this.update_speed - Math.sqrt(this.score*4) < new Date().getTime()) {
				lastTime = new Date().getTime();
				this.update();
			}
        }
	}

	/*
	*
	*
	*	Calling all the update methods
	*
	*
	*/
	update(){
		this.paint();
        this.move();
	}
    
    paint() {
        this.paint_background();
        this.paint_tubes();
		this.paint_player();
		this.update_score();
    }

    move() {
        this.move_tubes();
        this.move_player();
	}

	/*
	*
	*
	*	Everything related to painting the graphics
	*
	*
	*/
	paint_background(){
		if(Date.now() > this.background["last"] + this.background["timeout"]){
			if(this.background["current"] < this.background["imgs"].length - 1) 
				this.background["current"]++;
			else 
				this.background["current"] = 0;
			this.background["last"] = Date.now();
		}
		this.ctx.drawImage(this.background["imgs"][this.background["current"]], 0, 0);
	}

	paint_tubes() {
		for(let i = 0; i < this.tubes.length; i++){
			this.tubes[i].paint();
		}
	}

	paint_player() {
		this.player.paint();
	}

	update_score() {
		if (this.running) {
			this.ctx.fillStyle = "#FF0000";
			this.ctx.font = "30px Arial";
			this.ctx.fillText(Math.floor(this.score), 10, this.cvs.height-10);
		}
	}

	/*
	*
	*
	*	Everything related to movement, collision etc
	*
	*
	*/
	move_tubes(){
		for(let i = 0; i < this.tubes.length; i++){
			//move every tube
			this.tubes[i].move(this.tube_speed, this.update_speed);
			//move the tubes back to the right once they are on the left
			if(this.tubes[i].getX() <= 0 - this.tube_width){
				this.tubes[i].setX(this.cvs.width);
			}
			//collision with Flappy
       		let x_diff = this.player.getX() - this.tubes[i].getX();
        	if(x_diff > -1*this.player.getWidth() && x_diff < this.tube_width  && (this.player.getY() <= this.tubes[i].getGap() || this.player.getY() + this.player.getHeight() >= this.tubes[i].getGap() + this.gap_height)) {
        		this.game_over();
        		break;
        	}
        	//score system
        	if(x_diff > -1*this.player.getWidth() && x_diff < this.tube_width){
                if(!this.under_tube[0]){
                    this.under_tube = [true, i];
                    this.score++;
                }

            }else{
                if(this.under_tube[0] && i == this.under_tube[1])this.under_tube[0] = false;
            }
		}
	}

	move_player(){
		//move the player
		if(this.running)
			this.player.move(this.update_speed);
		//collision with game borders
		if(this.player.getY() + 40 >= this.cvs.height || this.player.getY() <= 0 )
			this.game_over();
	}

	game_over(){
		//stop the game loop
		clearInterval(this.update_interval);

		let hs_beaten = false;
		//set the new highscore
		let high_score = this.Cookie.get("high_score");
		if (!high_score || parseInt(high_score)  < this.score) {
			this.Cookie.set("high_score", this.score);
			high_score = "" + this.score;
			if(this.score > 0) {
				hs_beaten = true;
			}
		}
		this.hi = 0;
		//paint the game over screen or high score screen, depending on if hs_beaten
		this.ctx.font = "80px Arial";
		this.ctx.fillStyle = "#FF0000";
		if (hs_beaten) {
			this.ctx.fillText("New Highscore!", (this.cvs.width-550)/2, 210);
		} else {
			this.ctx.fillText("Game Over", (this.cvs.width-411)/2, 210);
		}
		this.ctx.fillStyle = "#FF0000";
		this.ctx.font = "60px Arial";
		this.ctx.fillText("Press [R] to restart!", (this.cvs.width-508)/2, 270);
		this.ctx.fillText("Score: " + this.score, (this.cvs.width-250)/2, 400);
		this.ctx.fillText("Highscore: " + high_score, (this.cvs.width-350)/2, 460);		
		this.running = false;	
	}	

	/*
	*
	*
	*	Getting all the images from their path into a html element
	*
	*
	*/
    add_imgs(){
		this.add_tube_imgs();
        this.add_background_imgs();
        this.add_player_imgs();
	}

    add_player_imgs() {
		for(let i = 0, dir = "normal"; i < 2; i++, dir = "jump"){
			this.player_imgs[dir] = document.createElement("img");
			this.player_imgs[dir].style.display = "none";
			this.player_imgs[dir].src = this.player_img_paths[dir];
            document.body.appendChild(this.player_imgs[dir]);
		}
    }

	add_tube_imgs(){
		for(let i = 0, dir = "up"; i < 2; i++, dir = "down"){
			this.tube_imgs[dir] = document.createElement("img");
			this.tube_imgs[dir].style.display = "none";
			this.tube_imgs[dir].src = this.tube_img_paths[dir];
			document.body.appendChild(this.tube_imgs[dir]);
		}
	}

	add_background_imgs(){
		this.background["imgs"] = new Array(this.background["count"]);
		for(let i = 0; i < this.background["count"]; i++){
			this.background["imgs"][i] = document.createElement("img");
			this.background["imgs"][i].style.display = "none";
			this.background["imgs"][i].src = this.background["path"].replace("<COUNT>", String(i));
			document.body.appendChild(this.background["imgs"][i]);
		}
	}
}