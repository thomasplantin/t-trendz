const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

const router = express.Router();

// const options = {root: path.join(__dirname, '../views')};

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