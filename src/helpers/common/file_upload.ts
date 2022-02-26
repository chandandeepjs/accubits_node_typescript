
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';

// import {
//   ICoinPayload
// } from '../../modules/admin/coin/coin.interface';


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


// export const uploadS3 = async (data: ICoinPayload): Promise<AWS.S3.ManagedUpload.SendData> => {
//   try {

//     let mimetype = data.file.originalname;
//     mimetype = mimetype.slice(mimetype.lastIndexOf('.'));

//     const imageUrl = path.join(__dirname, `../../../uploads/${data.symbol}${mimetype}`);
//     console.log("image url", imageUrl)
//     const fileStream = fs.readFileSync(imageUrl);

//     const params = {
//       Bucket: AWS_CONFIG.BUCKET_NAME,
//       Key: `${data.symbol}${mimetype}`,
//       Body: fileStream,
//       ACL: "public-read"
//     };
//     console.log("s3 Bucket -------: ",params.Bucket);

//     const result = await s3bucket.upload(params).promise();
//     await fs.promises.unlink(imageUrl);
//     console.log("Image removed from uploads dir")
//     console.log("File Uploaded successfully", result)
//     return result;
//   } catch (error) {
//     console.log("Error while uploading image to S3", error)
//     return error;

//   }


//}
