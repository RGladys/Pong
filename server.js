const express = require('express')
const app = express();
const socket = require('socket.io');
const port = process.env.PORT || 8080;

let userList = [];

//App setup
var server = app.listen(port, function(){
  console.log('Server on')
});

//Static files
app.use(express.static(__dirname));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
})

//Socket setup
var io = socket(server);


//When new user connects
function newUser(socket) {
	userList.push({
		id: socket.id,
		status: false,
		player: null
	});
	io.sockets.emit('list', userList)
};

//Server events
io.sockets.on('connection', function(socket) {
	newUser(socket);

	//When user disconnects
	function disconnected() {
    	for (let i in userList) {
    		if (userList[i].id == socket.id) {
    			socket.broadcast.to(userList[i].player).emit('enemy-disconnected');
    		}
    	};
    	for (let i in userList){
    	  if (userList[i].id == socket.id){
    	    userList.splice(i, 1);
    	  }
    	};
    	io.sockets.emit('list', userList);
	};
	socket.on('disconnect', disconnected);


	//Look for users online
	function check() {
		let number = 0;
		let interval;
		for (i in userList) {
			if (userList[i].status) {
				number++
			}
		};
		if (number >= 2) {
			for (let i in userList) {
				if (userList[i].id != socket.id) {
					if (userList[i].status) {
						userList[i].status = false;
						userList[i].player = socket.id;
						for (let j in userList) {
							if (userList[j].id == socket.id) {
								userList[j].status = false,
								userList[j].player = userList[i].id
							}
						}
						connect(userList[i].id);
						break;
					}
				}
			}
		} 
	};
	
	//Connect two users
	function connect(player) {
		let position = Math.random() < .5 ? true : false;
		socket.broadcast.to(player).emit('found', {
			enemy: socket.id,
			position: position
		});
		socket.emit('found', {
			enemy: player,
			position: !position
		});
	}

	//Change status to true
	function statusOnline() {
		for (i in userList) {
			if (userList[i].id == socket.id) {
				userList[i].status = true;
			}
		};
		check()
	}
	socket.on('go-online', statusOnline);

	//Change status to false
	function statusOffline(data) {
		for (i in userList) {
			if (userList[i].id == socket.id) {
				userList[i].status = false;
			}
		};
		socket.broadcast.to(data).emit('enemy-disconnected');
	};
	socket.on('go-offline', statusOffline);

	//User is moving
	function moving(data) {
		socket.broadcast.to(data.user).emit('moving', data.position);
	};
	socket.on('move', moving);

	//Ball position
	function ball(data) {
		socket.broadcast.to(data.user).emit('ball', data.position);
	};
	socket.on('ball', ball);

	//Ball start event
	function ballClick(data) {
		socket.broadcast.to(data).emit('ball-start');
	};
	socket.on('ball-click', ballClick)
});