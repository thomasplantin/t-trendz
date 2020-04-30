const express = require('express');
var path = require('path');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');

app.use(morgan('tiny'));

const PORT = 8080;

app.use(express.static(path.join(__dirname, '/public')));

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
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 't_trendz_db'
  });

  const queryString = 'SELECT * FROM Products WHERE category = ?';
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
