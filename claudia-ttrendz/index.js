const express = require('express');
var path = require('path');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');

app.use(morgan('tiny'));

const PORT = 8080;

app.use(express.static(path.join(__dirname, '/public')));

// Import private vars from JSON
let config = require('./private/config.json');

console.log(config.credentials.GOOGLE_DB_IP);

app.get('/', (req, res) => {
  // Returns the root page of the 
  res.sendFile('index.html');
});

app.get('/products/:category', (req, res) => {
  /*
  Fetches the products of the specified category from the DB 
  and renders them on an html page.
  */
  const productCategory = req.params.category;
  console.log('Fetching products from category: ' + productCategory);

  const connection = mysql.createConnection( {
    host: config.credentials.GOOGLE_DB_IP,
    user: config.credentials.GOOGLE_DB_USER,
    password: config.credentials.GOOGLE_DB_PASS,
    database: config.credentials.GOOGLE_DB_NAME
  });

  const queryString = 'SELECT * FROM products WHERE category = ?';
  connection.query(queryString, [productCategory], (err, rows, fields) => {
    if(err) {
      console.log('Failed to query product - ERROR: ' + err);
      res.sendStatus(500);
      return;
    }
    res.json(rows);
  });

});

// app.get('/bracelets', (req, res) => {
//   res.sendFile(__dirname + '/public/jewelry/bracelets.html');
// });

// app.get('/necklaces', (req, res) => {
//   res.sendFile(__dirname + '/public/jewelry/necklaces.html');
// });

// app.get('/earrings', (req, res) => {
//   res.sendFile(__dirname + '/public/jewelry/earrings.html');
// });

app.listen(PORT, () => {
    console.log('[INFO] Listening on port ' + PORT + '...');
});
