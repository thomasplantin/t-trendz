const express = require('express');
var path = require('path');
const morgan = require('morgan');
const ejs = require('ejs');

// Import constants from config.js
const {
  PORT,
} = require('./config.js');

const app = express();

// EJS
app.set('view engine', 'ejs');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  // Returns the root page of the project
  res.sendFile('index.html');
});

// Import my routes
const routerDB = require('./routes/database.js');
const routerMulter = require('./routes/multer.js');
app.use(routerDB);
app.use(routerMulter);

app.listen(PORT, () => {
    console.log('[INFO] Listening on port ' + PORT + '...');
});
