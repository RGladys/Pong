let lookingForPlayers = true;
let position;
let enemyId;
let enemyPos = 30;
let disconnected = false;
let ballPosX;
let ballPosY;
let ballMoving = false;

(function(){
let canvas = document.getElementById("canvas-online");
getSize();
let ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.strokeStyle = "white";
let offset = canvas.offsetTop;
let msg = "";
let msg2 = "";
let msg3;

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
	x: null,
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
	x: null,
	y: canvas.height/2.4,
	width: (canvas.width/100)*2.77,
	height: (canvas.height/100)*17,
	score: 0,
	draw: function(){
		this.y = enemyPos*canvas.height,
		ctx.save();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fill();
		ctx.restore();
	}
};

//Ball object
let ball = {
	x: (canvas.width/100)*2.77 + (canvas.width/50),
	y: canvas.height/2,
	radius: (canvas.width/50),
	moving: false,
	direction: 'right',
	speed: canvas.width/50,
	speedY: 0,
	draw: function(){
		if (!position && !ballMoving) {
			this.x = ballPosX;
			this.y = ballPosY;
		}
		ctx.save();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		ctx.fill();
		ctx.restore();
		if (position && !this.moving) {
			socket.emit('ball', {
				user: enemyId,
				position: {
					x: this.x,
					y: this.y
				}
			})
		};
		if (!position && ballMoving) {
			this.moving = true;
		}
	},
	physics: function(){
		if (!lookingForPlayers){
		if (!this.moving) {
			if (position && !this.moving) {
				this.y = player.y + player.height/2;
			}
		};
		if (this.moving == true) this.y = this.y + this.speedY;
		if (this.moving == true && this.direction == 'right') this.x = this.x + this.speed;
		if (this.moving == true && this.direction == 'left') this.x = this.x - this.speed;
		
		//Enemy move
		if (position) {
			if (this.x > canvas.width - enemy.width - 8 && this.y > enemy.y - ball.radius && this.y < enemy.y + ball.radius + enemy.height) {
				this.direction = 'left';
				if (this.y > enemy.y - ball.radius) this.speedY = -7;
				if (this.y > enemy.y + enemy.height/14) this.speedY = -6;
				if (this.y > enemy.y + (enemy.height/14)*2) this.speedY = -5;
				if (this.y > enemy.y + (enemy.height/14)*3) this.speedY = -4;
				if (this.y > enemy.y + (enemy.height/14)*4) this.speedY = -3;
				if (this.y > enemy.y + (enemy.height/14)*5) this.speedY = -2;
				if (this.y > enemy.y + (enemy.height/14)*6) this.speedY = -1;
				if (this.y > enemy.y + (enemy.height/14)*7) this.speedY = 0;
				if (this.y > enemy.y + (enemy.height/14)*8) this.speedY = 1;
				if (this.y > enemy.y + (enemy.height/14)*9) this.speedY = 2;
				if (this.y > enemy.y + (enemy.height/14)*10) this.speedY = 3;
				if (this.y > enemy.y + (enemy.height/14)*11) this.speedY = 4;
				if (this.y > enemy.y + (enemy.height/14)*12) this.speedY = 5;
				if (this.y > enemy.y + (enemy.height/14)*13) this.speedY = 6;
				if (this.y > enemy.y + enemy.height) this.speedY = 7;
			};
	
			//Player move
			if (this.x < player.width + 8 && this.y > player.y - ball.radius && this.y < player.y + ball.radius + player.height) {
				this.direction = 'right';
				if (this.y > player.y - ball.radius) this.speedY = -7;
				if (this.y > player.y + player.height/14) this.speedY = -6;
				if (this.y > player.y + (player.height/14)*2) this.speedY = -5;
				if (this.y > player.y + (player.height/14)*3) this.speedY = -4;
				if (this.y > player.y + (player.height/14)*4) this.speedY = -3;
				if (this.y > player.y + (player.height/14)*5) this.speedY = -2;
				if (this.y > player.y + (player.height/14)*6) this.speedY = -1;
				if (this.y > player.y + (player.height/14)*7) this.speedY = 0;
				if (this.y > player.y + (player.height/14)*8) this.speedY = 1;
				if (this.y > player.y + (player.height/14)*9) this.speedY = 2;
				if (this.y > player.y + (player.height/14)*10) this.speedY = 3;
				if (this.y > player.y + (player.height/14)*11) this.speedY = 4;
				if (this.y > player.y + (player.height/14)*12) this.speedY = 5;
				if (this.y > player.y + (player.height/14)*13) this.speedY = 6;
				if (this.y > player.y + player.height) this.speedY = 7;
			};
		} else {
			if (this.x > canvas.width - player.width - 8 && this.y > player.y - ball.radius && this.y < player.y + ball.radius + player.height) {
				this.direction = 'left';
				if (this.y > player.y - ball.radius) this.speedY = -7;
				if (this.y > player.y + player.height/14) this.speedY = -6;
				if (this.y > player.y + (player.height/14)*2) this.speedY = -5;
				if (this.y > player.y + (player.height/14)*3) this.speedY = -4;
				if (this.y > player.y + (player.height/14)*4) this.speedY = -3;
				if (this.y > player.y + (player.height/14)*5) this.speedY = -2;
				if (this.y > player.y + (player.height/14)*6) this.speedY = -1;
				if (this.y > player.y + (player.height/14)*7) this.speedY = 0;
				if (this.y > player.y + (player.height/14)*8) this.speedY = 1;
				if (this.y > player.y + (player.height/14)*9) this.speedY = 2;
				if (this.y > player.y + (player.height/14)*10) this.speedY = 3;
				if (this.y > player.y + (player.height/14)*11) this.speedY = 4;
				if (this.y > player.y + (player.height/14)*12) this.speedY = 5;
				if (this.y > player.y + (player.height/14)*13) this.speedY = 6;
				if (this.y > player.y + player.height) this.speedY = 7;
			};
	
			//Player move
			if (this.x < enemy.width + 8 && this.y > enemy.y - ball.radius && this.y < enemy.y + ball.radius + enemy.height) {
				this.direction = 'right';
				if (this.y > enemy.y - ball.radius) this.speedY = -7;
				if (this.y > enemy.y + enemy.height/14) this.speedY = -6;
				if (this.y > enemy.y + (enemy.height/14)*2) this.speedY = -5;
				if (this.y > enemy.y + (enemy.height/14)*3) this.speedY = -4;
				if (this.y > enemy.y + (enemy.height/14)*4) this.speedY = -3;
				if (this.y > enemy.y + (enemy.height/14)*5) this.speedY = -2;
				if (this.y > enemy.y + (enemy.height/14)*6) this.speedY = -1;
				if (this.y > enemy.y + (enemy.height/14)*7) this.speedY = 0;
				if (this.y > enemy.y + (enemy.height/14)*8) this.speedY = 1;
				if (this.y > enemy.y + (enemy.height/14)*9) this.speedY = 2;
				if (this.y > enemy.y + (enemy.height/14)*10) this.speedY = 3;
				if (this.y > enemy.y + (enemy.height/14)*11) this.speedY = 4;
				if (this.y > enemy.y + (enemy.height/14)*12) this.speedY = 5;
				if (this.y > enemy.y + (enemy.height/14)*13) this.speedY = 6;
				if (this.y > enemy.y + enemy.height) this.speedY = 7;
			};
		}
		//Win and loss
		if (this.x > canvas.width || this.x < 0) {
			this.moving = false; 
			this.direction = 'right'; 
			this.speedY = 0;
			ballMoving = false;
			if (position && this.x > canvas.width - 1) player.score++;
			if (position && this.x < 1) enemy.score++;
			if (!position && this.x > canvas.width - 1) enemy.score++;
			if (!position && this.x < 1) player.score++;
			this.x = (canvas.width/100)*2.77 + (canvas.width/50);
		};
		
		//Walls
		if (this.y < ball.radius || this.y > canvas.height - ball.radius) this.speedY = -this.speedY
		}
	}
};

//Start game
function gameFn() {
	if (!lookingForPlayers) {
		if (position) {
			player.x = 0;
			enemy.x = canvas.width - ((canvas.width/100)*2.77)
		} else {
			player.x = canvas.width - ((canvas.width/100)*2.77);
			enemy.x = 0
		}
		enemy.draw();
		player.draw();
		ball.draw();
		ball.physics();
	}
}

//Player mouse event
document.addEventListener('mousemove', function(e) {
	if (!lookingForPlayers && !disconnected) {
		player.y = e.pageY - player.height/2 - offset;
		if (player.y > canvas.height - player.height) {
			player.y = canvas.height - player.height
		};
		if (player.y < 0) {
			player.y = 0;
		};
		socket.emit('move', {
			position: player.y/canvas.height,
			user: enemyId
		})
	}
});

//Player click event
document.addEventListener('click', function() {
		if (!lookingForPlayers && position) {
			ball.moving = true;
			socket.emit('ball-click', enemyId)
		}
})

//Captions
function captions() {
	ctx.textAlign = 'center';
	ctx.font = canvas.width/15 + 'px VT323';	
	ctx.fillText(msg, canvas.width/2, canvas.height/12);
	ctx.font = canvas.width/22.5 + 'px VT323';
	ctx.fillText(msg2, canvas.width/2, canvas.height/7.5);
	ctx.font = canvas.width/12 + 'px VT323';
	ctx.fillText(msg3, canvas.width/2, canvas.height/3)
	if (lookingForPlayers) {
		msg3 = 'Looking for players...';
		msg = '';
		msg2 = '';
	} else if (disconnected) {
		msg = 'Enemy disconnected';
		msg2 = 'Press esc to return to menu';
		msg3 = '';
	} else {
		if (position && enemy.score < 3 && player.score <3) msg = player.score + ' : ' + enemy.score;
		if (!position && enemy.score < 3 && player.score <3) msg = enemy.score + ' : ' + player.score;
		msg3 = '';
		if (enemy.score == 3) {
			msg = "YOU LOST";
			msg2 = "press esc to exit to menu";
			game = false;
			ball.y = -1000
		};
		if (player.score == 3) {
			msg = "YOU WON";
			msg2 = "press esc to exit to menu";
			game = false;
			ball.y = -1000
		}
	};

};


//Exit game
document.addEventListener('keydown', function(e) {
	if (e.keyCode == 27) {
		disconnected = false;
		lookingForPlayers = true;
		main.style.display = 'block';
		containerOnline.style.display = 'none';
		position = null;
		enemyPos = 30;
		ballPosX = null;
		ballPosY = null;
		ballMoving = false;
		enemy.score = 0;
		player.score = 0;
		socket.emit('go-offline', enemyId);
		enemyId = null;
	}
});

//Draw animation frames
function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	captions();
	gameFn();
};
animate()
})()