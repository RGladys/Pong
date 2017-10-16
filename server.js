const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

let server = app.listen(port, function(){
  console.log('Server on')
});

app.use(express.static(__dirname));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
})