const express = require('express');
var path = require('path');
const app = express();

const PORT = 8080;

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
  console.log(__dirname);
  res.sendFile('index.html');
});

app.get('/bracelets', function(req, res) {
  console.log(__dirname);
  res.sendFile(__dirname + '/public/jewelry/bracelets.html');
});

app.get('/necklaces', function(req, res) {
  console.log(__dirname);
  res.sendFile(__dirname + '/public/jewelry/necklaces.html');
});

app.get('/earrings', function(req, res) {
  console.log(__dirname);
  res.sendFile(__dirname + '/public/jewelry/earrings.html');
});

app.listen(PORT, function () {
    console.log('[INFO] Listening on port ' + PORT + '...');
});
