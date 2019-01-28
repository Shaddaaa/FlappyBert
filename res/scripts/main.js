//key checks
window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;
   //jump if the pressed key is space
   if (key == 32) {
		if(game == null)
			game = new FlappyBird();
		else
			game.player.jump();
   //restart if the pressed key is r
   }else if(key == 82){
    	if(!game.running)
			game.start();
   }
}

//creation of the game
var game = null;
document.onreadystatechange = function(){ startMenu(); };

//bad code
function startMenu(cvs = document.getElementById("game-cvs")) {
	let ctx = cvs.getContext("2d");
	ctx.fillStyle = "#00FF00";
	ctx.font = "60px Gloria Hallelujah";
	ctx.fillText("Press [SPACE] to Start!", (cvs.width-690)/2, 290);
	ctx.font = "60px Gloria Hallelujah";
	ctx.fillText("Credits", (cvs.width-220)/2, 390);
}