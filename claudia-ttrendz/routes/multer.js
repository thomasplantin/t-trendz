const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const pbkdf2 = require('pbkdf2');

const router = express.Router();

// const options = {root: path.join(__dirname, '../views')};
const {
  ADMIN_USER,
  ADMIN_PASS
} = require('./../config.js');

router.use((req, res, next) => {
  const auth = {login: ADMIN_USER, password: ADMIN_PASS}; // change this
  // parse login and password from headers
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  var [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
  if (login && password && login === auth.login && password === auth.password) {
    // Access granted...
    return next();
  }
  // Access denied...
  res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
  res.status(401).send('Authentication required.'); // custom message
});

// Set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads',
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

router.get('/admin', (req, res) => {
  res.render('verify_admin.ejs');
});

router.post('/upload', (req, res)=> {
  upload(req, res, (err) => {
    if(err) {
      res.render('verify_admin.ejs', {
        msg: err
      });
    }
    else {
      if(req.file == undefined) {
        res.render('verify_admin.ejs', {
          msg: 'Error: No file selected!'
        });
      } else {
        res.render('verify_admin.ejs', {
          msg: 'File uploaded!',
          file: `uploads/${req.file.filename}`
        })
      }
    }
  });
});

module.exports = router;