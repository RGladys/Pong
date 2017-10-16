let stateMap = (function(){
let canvas = document.getElementById("canvas-offline");
getSize();
let ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.strokeStyle = "white";
let offset = canvas.offsetTop;
let game = true;
let msg;
let msg2 = "";
let messageStatus = true;
let body = document.getElementsByTagName("body")[0];

//Get the size of canvas element
function getSize() {
	if (window.innerWidth >= 900) {
		canvas.width = 900;
		canvas.height = 600
	} else {
		canvas.width = window.innerWidth;
		canvas.height = (window.innerHeight/100)*75
	}
};


//Player object
let player = {
	x: 0,
	y: canvas.height/2.4,
	width: (canvas.width/100)*2.77,
	height: (canvas.height/100)*17,
	score: 0,
	draw: function() {
		ctx.save();
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fill();
		ctx.restore()
	}
};

//Enemy object
let enemy = {
	x: canvas.width - ((canvas.width/100)*2.77),
	y: canvas.height/2.4,
	width: (canvas.width/100)*2.77,
	height: (canvas.height/100)*17,
	score: 0,
	speed: 3,
	draw: function(){
		ctx.save();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fill();
		ctx.restore();
	},
	move: function(){
		if (game) {
			if (ball.moving == false) {
			if (ball.y > this.y + enemy.height/2) this.y = this.y + this.speed*3;
			if (ball.y < this.y + enemy.height/2) this.y = this.y - this.speed*3;
				} else {
					if (ball.y > this.y + this.height/2 && ball.x>canvas.width/6) this.y = this.y + this.speed*2.5;
					if (ball.y < this.y + this.height/2 && ball.x>canvas.width/6) this.y = this.y - this.speed*2.5;
					if (ball.y > this.y + this.height/2 && ball.x<=canvas.width/6) this.y = this.y + this.speed*1.4;
					if (ball.y < this.y + this.height/2 && ball.x<=canvas.width/6) this.y = this.y - this.speed*1.4;
					if (this.y > canvas.height - offset - this.height) this.y = canvas.height - offset - this.height;
					if (this.y < 0) this.y = 0;
				}
		}
	}
};

//Ball object
let ball = {
	x: (canvas.width/100)*2.77 + (canvas.width/50),
	y: player.y,
	radius: (canvas.width/50),
	moving: false,
	direction: 'right',
	speed: canvas.width/50,
	speedY: 0,
	draw: function(){
		ctx.save();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		ctx.fill();
		ctx.restore();
	},
	physics: function(){
		if (game == true){
		if (this.moving == false) {this.y = player.y + player.height/2;};
		if (this.moving == true) this.y = this.y + this.speedY;
		if (this.moving == true && this.direction == 'right') this.x = this.x + this.speed;
		if (this.moving == true && this.direction == 'left') this.x = this.x - this.speed;
		
		//Enemy move
		if (this.x > canvas.width - enemy.width - 8 && this.y > enemy.y - ball.radius && this.y < enemy.y + ball.radius + enemy.height) {
			this.direction = 'left';
			if (this.y > enemy.y - ball.radius) this.speedY = -16;
			if (this.y > enemy.y + enemy.height/14) this.speedY = -14;
			if (this.y > enemy.y + (enemy.height/14)*2) this.speedY = -12;
			if (this.y > enemy.y + (enemy.height/14)*3) this.speedY = -10;
			if (this.y > enemy.y + (enemy.height/14)*4) this.speedY = -8;
			if (this.y > enemy.y + (enemy.height/14)*5) this.speedY = -6;
			if (this.y > enemy.y + (enemy.height/14)*6) this.speedY = -4;
			if (this.y > enemy.y + (enemy.height/14)*7) this.speedY = 0;
			if (this.y > enemy.y + (enemy.height/14)*8) this.speedY = 4;
			if (this.y > enemy.y + (enemy.height/14)*9) this.speedY = 6;
			if (this.y > enemy.y + (enemy.height/14)*10) this.speedY = 8;
			if (this.y > enemy.y + (enemy.height/14)*11) this.speedY = 10;
			if (this.y > enemy.y + (enemy.height/14)*12) this.speedY = 12;
			if (this.y > enemy.y + (enemy.height/14)*13) this.speedY = 14;
			if (this.y > enemy.y + enemy.height) this.speedY = 16;
		};

		//Player move
		if (this.x < player.width + 8 && this.y > player.y - ball.radius && this.y < player.y + ball.radius + player.height) {
			this.direction = 'right';
			if (this.y > player.y - ball.radius) this.speedY = -9;
			if (this.y > player.y + player.height/14) this.speedY = -8;
			if (this.y > player.y + (player.height/14)*2) this.speedY = -7;
			if (this.y > player.y + (player.height/14)*3) this.speedY = -6;
			if (this.y > player.y + (player.height/14)*4) this.speedY = -5;
			if (this.y > player.y + (player.height/14)*5) this.speedY = -4;
			if (this.y > player.y + (player.height/14)*6) this.speedY = -3;
			if (this.y > player.y + (player.height/14)*7) this.speedY = 0;
			if (this.y > player.y + (player.height/14)*8) this.speedY = 3;
			if (this.y > player.y + (player.height/14)*9) this.speedY = 4;
			if (this.y > player.y + (player.height/14)*10) this.speedY = 5;
			if (this.y > player.y + (player.height/14)*11) this.speedY = 6;
			if (this.y > player.y + (player.height/14)*12) this.speedY = 7;
			if (this.y > player.y + (player.height/14)*13) this.speedY = 8;
			if (this.y > player.y + player.height) this.speedY = 9;
		};
		//Win and loss
		if (this.x > canvas.width || this.x < 0) {
			this.moving = false; this.direction = 'right'; this.speedY = 0;
			if (this.x > canvas.width - 1) player.score++;
			if (this.x < 1) enemy.score++;
			this.x = (canvas.width/100)*2.77 + (canvas.width/50);
		};
		
		//Walls
		if (this.y < ball.radius || this.y > canvas.height - ball.radius) this.speedY = -this.speedY
		}
	}
};


//Captions
function score() {
	ctx.font = canvas.width/15 + "px VT323";
	ctx.textAlign = "center";
	ctx.fillText(msg, canvas.width/2, canvas.height/12);
	ctx.font = canvas.width/22.5 + "px VT323";
	ctx.fillText(msg2, canvas.width/2, canvas.height/7.5)
	if (messageStatus) {
		msg2 = "Click to start the game. Press esc to exit"
	} else {
		msg2 = ""
	}
	if (enemy.score < 3 && player.score <3) msg = player.score + " : " + enemy.score;
	if (enemy.score == 3) {
		msg = "YOU LOST";
		msg2 = "click to play again";
		game = false;
		ball.y = -1000
	};
	if (player.score == 3) {
		msg = "YOU WON";
		msg2 = "click to play again";
		game = false;
		ball.y = -1000
	}
};

//Exit game
document.addEventListener('keydown', function(e) {
	if (e.keyCode == 27) {
		if (containerGame.style.display == "block") {
			main.style.display = "block";
			containerGame.style.display = "none";
			player.score = 0;
			enemy.score = 0;
			msg2 = "";
			ball.moving = false;
			ball.direction = 'right';
			ball.x = (canvas.width/100)*2.77 + (canvas.width/50);
			offlineGameStatus = false;
			messageStatus = true;
			game = true
		}
	}
})


//Player mouse event
document.addEventListener('mousemove', function(e) {
	if (game) {player.y = e.pageY - player.height/2 - offset;
		if (player.y > canvas.height - player.height) {
			player.y = canvas.height - player.height
		};
		if (player.y < 0) {
			player.y = 0;
		};}
});

//Player click event
document.addEventListener('click', function() {
	if (offlineGameStatus) {
		if (game) ball.moving = true;
		if (!game && !messageStatus) {
			game = true;
			player.score = 0;
			enemy.score = 0;
			msg2 = "";
			ball.y = player.y
		};
		if (messageStatus) messageStatus = false;
	}
})


//Draw animation frames
function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	player.draw();
	enemy.draw();
	enemy.move();
	ball.draw();
	ball.physics();
	score();
};
animate();

return {
	setDiff: function(diff) {
		switch (diff) {
			case 'easy':
				ball.speed = canvas.width/57;
				enemy.speed = 2.5;
				break;
			case 'medium':
				ball.speed = canvas.width/50;
				enemy.speed = 3.5;
				break;
			case 'hard': 
				ball.speed = canvas.width/40;
				enemy.speed = 4;
				break;
		}
	},
	setColor: function(color) {
		switch (color) {
			case 'white':
				ctx.fillStyle = 'white';
				ctx.strokeStyle = 'white';
				body.style.color = 'white';
				break;
			case 'blue':
				ctx.fillStyle = 'lightblue';
				ctx.strokeStyle = 'lightblue';
				body.style.color = 'lightblue';
				break;
			case 'red':
				ctx.fillStyle = '#ff4c4c';
				ctx.strokeStyle = '#ff4c4c';
				body.style.color = '#ff4c4c';
				break;
			case 'green':
				ctx.fillStyle = '#44ffa1';
				ctx.strokeStyle = '#44ffa1';
				body.style.color = '#44ffa1';
				break;
		}
	}
}

})()


