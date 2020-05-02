const express = require('express');
var path = require('path');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');

// Import constants from config.js
const {
  PORT,
  GOOGLE_DB_HOST,
  GOOGLE_DB_USER,
  GOOGLE_DB_PASS,
  GOOGLE_DB_NAME,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = require('./config.js');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));

const myDB = mysql.createConnection( {
  host: GOOGLE_DB_HOST,
  user: GOOGLE_DB_USER,
  password: GOOGLE_DB_PASS,
  database: GOOGLE_DB_NAME
});

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

  const queryString = 'SELECT * FROM products WHERE category = ?';
  myDB.query(queryString, [productCategory], (err, rows, fields) => {
    if(err) {
      console.log('Failed to query product - ERROR: ' + err);
      res.sendStatus(500);
      return;
    }
    res.json(rows);
  });

});

app.listen(PORT, () => {
    console.log('[INFO] Listening on port ' + PORT + '...');
});
