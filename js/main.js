let playButton = document.getElementById('play');
let settingsButton = document.getElementById('settings');
let diffButton = document.getElementById('difficulty');
let colorButton = document.getElementById('color');
let backSettings = document.getElementById('back-settings');
let backColor = document.getElementById('back-color');
let backDiff = document.getElementById('back-difficulty');
let colorSettings = document.getElementById('color-settings');
let diffSettings = document.getElementById('difficulty-settings');
let main = document.getElementsByTagName('main')[0];
let containerGame = document.getElementById('container-game');
let containerSettings = document.getElementById('container-settings');
let colorButtons = document.getElementById('color-buttons');
let diffButtons = document.getElementById('difficulty-buttons');
let offlineGameStatus = false;
let gameStatus = false;

playButton.addEventListener('click', function() {
	main.style.display = "none";
	containerGame.style.display = "block";
	setTimeout(function() {
		offlineGameStatus = true
	}, 100)
});

settingsButton.addEventListener('click', function() {
	main.style.display = "none";
	containerSettings.style.display = "block";
});

diffButton.addEventListener('click', function() {
	containerSettings.style.display = "none";
});

colorButton.addEventListener('click', function() {
	containerSettings.style.display = "none";
	colorSettings.style.display = "block";
});

diffButton.addEventListener('click', function() {
	containerSettings.style.display = "none";
	diffSettings.style.display = "block";
});

backSettings.addEventListener('click', function() {
	containerSettings.style.display = "none";
	main.style.display = "block"
});

backColor.addEventListener('click', function() {
	colorSettings.style.display = "none";
	containerSettings.style.display = "block";
});

backDiff.addEventListener('click', function() {
	diffSettings.style.display = "none";
	containerSettings.style.display = "block";
});

colorButtons.addEventListener('click', function(e) {
	stateMap.setColor(e.target.id)
});

diffButtons.addEventListener('click', function(e) {
	stateMap.setDiff(e.target.id);
	switch (e.target.id) {
		case 'easy':
			document.getElementById('easy').classList.add('picked');
			document.getElementById('medium').classList.remove('picked');
			document.getElementById('hard').classList.remove('picked');
			break;
		case 'medium':
			document.getElementById('easy').classList.remove('picked');
			document.getElementById('medium').classList.add('picked');
			document.getElementById('hard').classList.remove('picked');
			break;
		case 'hard':
			document.getElementById('easy').classList.remove('picked');
			document.getElementById('medium').classList.remove('picked');
			document.getElementById('hard').classList.add('picked');
			break;
	}
});