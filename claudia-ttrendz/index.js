const express = require('express');
var path = require('path');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');

// Import constants from config.js
const {
  PORT,
} = require('./config.js');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  // Returns the root page of the project
  res.sendFile('index.html');
});

// Import my routes
const routerDB = require('./routes/database.js');
app.use(routerDB);
const routerMulter = require('./routes/multer.js');
app.use(routerMulter);

app.listen(PORT, () => {
    console.log('[INFO] Listening on port ' + PORT + '...');
});
