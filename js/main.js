let onlineNumber = document.getElementById('online');
let playOffline = document.getElementById('play-offline');
let playOnline = document.getElementById('play-online');
let main = document.getElementsByTagName('main')[0];
let containerOffline = document.getElementById('container-offline');
let containerOnline = document.getElementById('container-online');
let offlineGameStatus = false;
let gameStatus = false;

playOffline.addEventListener('click', function() {
	main.style.display = "none";
	containerOffline.style.display = "block";
	setTimeout(function() {
		offlineGameStatus = true
	}, 100)
});

playOnline.addEventListener('click', function() {
	socket.emit('go-online');
	main.style.display = "none";
	containerOnline.style.display = "block";
})




//Check the number of users online
function getNumberOnline(data) {
	onlineNumber.textContent = data.length - 1;
}