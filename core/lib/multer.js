import multer from 'multer';

/**
 * Multer Storage Config
 * Docs: https://github.com/expressjs/multer
 */
const storage =  multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads');
  },
  filename: function (req, file, callback) {
    const originalname = file.originalname;
    callback(null, originalname);
    // callback(null, file.fieldname + '-' + Date.now() + '-.jpg');
  }
});

export const upload = multer({storage });
