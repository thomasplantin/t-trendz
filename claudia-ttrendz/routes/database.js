const express = require('express');
const mysql = require('mysql');

const router = express.Router();

const {
  GOOGLE_DB_HOST,
  GOOGLE_DB_USER,
  GOOGLE_DB_PASS,
  GOOGLE_DB_NAME,
} = require('./../config.js');

const myDB = mysql.createConnection( {
  host: GOOGLE_DB_HOST,
  user: GOOGLE_DB_USER,
  password: GOOGLE_DB_PASS,
  database: GOOGLE_DB_NAME
});


router.get('/products/:category', (req, res) => {
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

module.exports = router;