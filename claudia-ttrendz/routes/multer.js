const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const pbkdf2 = require('pbkdf2');

const router = express.Router();

// const options = {root: path.join(__dirname, '../views')};
const {
  ADMIN_USER,
  ADMIN_PASS,
  ADMIN_SALT
} = require('./../config.js');

// Password protection
router.use((req, res, next) => {
  const auth = {login: ADMIN_USER, password: ADMIN_PASS}; // change this
  // parse login and password from headers
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  var [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
  // Get salt and hash the input attempt
  const salt = Buffer.from(ADMIN_SALT);
  password = String(password);
  const hashedInput = pbkdf2.pbkdf2Sync(password, salt, 1000000, 32, 'sha512').toString('hex');
  if (login && password && login === auth.login && hashedInput === auth.password) {
    // Access granted...
    return next();
  }
  // Access denied...
  res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
  res.status(401).send('Authentication required.'); // custom message
});

// Set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/images',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: {fileSize: Math.pow(10, 7)}, // 10MB image limit
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('myImage');

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if(mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}

// Admin panel GET and POST
router.get('/admin', (req, res) => {
  res.render('admin_panel.ejs');
});
router.post('/admin', (req, res) => {
  res.render('admin_panel.ejs');
});

// Admin upload product GET and POST
router.get('/admin/upload-product', (req, res) => {
  res.render('add_product.ejs');
});
router.post('/admin/upload-product', (req, res) => {
  res.render('add_product.ejs');
});

// Admin remove product GET and POST
router.get('/admin/remove-product', (req, res) => {
  res.render('remove_product.ejs');
});
router.post('/admin/remove-product', (req, res) => {
  res.render('remove_product.ejs');
});

router.post('/upload', (req, res)=> {
  upload(req, res, (err) => {
    if(err) {
      res.render('add_product.ejs', {
        msg: err
      });
    }
    else {
      if(req.file == undefined) {
        res.render('add_product.ejs', {
          msg: 'Error: No file selected!'
        });
      } else {
        res.render('add_product.ejs', {
          msg: 'File uploaded!',
          file: `uploads/images/${req.file.filename}`
        })
      }
    }
  });
});

module.exports = router;