
import * as multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },

  filename: function (req, file, cb) {
    console.log(file)
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  }
});

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("csv")) {
      cb(null, true);
    } else {
      cb(null, false);  
      return cb(new Error("Please upload only csv file."))
    }
  }
})



