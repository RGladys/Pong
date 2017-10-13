let socket = io.connect('http://localhost:3000');

socket.on('list', function(data) {
	getNumberOnline(data)
});

socket.on('found', function(data) {
	enemyId = data.enemy;
	lookingForPlayers = false;
	position = data.position
});

socket.on('moving', function(data) {
	enemyPos = data
});

socket.on('enemy-disconnected', function() {
	disconnected = true;
	enemyId = null;
});

socket.on('ball', function(data) {
	ballPosX = data.x;
	ballPosY = data.y
});

socket.on('ball-start', function() {
	ballMoving = true;
})