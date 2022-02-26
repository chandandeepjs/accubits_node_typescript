//import * as fs from "fs";
import * as AWS from "aws-sdk";
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as path from 'path';
import * as fs from 'fs';
import { AWS_CONFIG,ENV_VARIABLE } from '../../constant/response';
import {
  ICoinPayload
} from '../../modules/admin/coin/coin.interface';

const s3bucket = new AWS.S3({
  accessKeyId: ENV_VARIABLE.AWS_USER_KEY,
  secretAccessKey: ENV_VARIABLE.AWS_USER_SECRET
});
 console.log("s3 details ===>> : ",s3bucket);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },

  filename: function (req, file, cb) {
    cb(null, req.body.symbol + path.extname(file.originalname));
  }
});

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
})

export const oldUploadS3 = multer({
  storage: multerS3({
    s3: s3bucket,
    bucket: AWS_CONFIG.BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      console.log("file uploaded to s3", file)
      cb(null, Date.now().toString())
    }
  })
})

export const uploadS3 = async (data: ICoinPayload): Promise<AWS.S3.ManagedUpload.SendData> => {
  try {

    let mimetype = data.file.originalname;
    mimetype = mimetype.slice(mimetype.lastIndexOf('.'));

    const imageUrl = path.join(__dirname, `../../../uploads/${data.symbol}${mimetype}`);
    console.log("image url", imageUrl)
    const fileStream = fs.readFileSync(imageUrl);

    const params = {
      Bucket: AWS_CONFIG.BUCKET_NAME,
      Key: `${data.symbol}${mimetype}`,
      Body: fileStream,
      ACL: "public-read"
    };
    console.log("s3 Bucket -------: ",params.Bucket);

    const result = await s3bucket.upload(params).promise();
    await fs.promises.unlink(imageUrl);
    console.log("Image removed from uploads dir")
    console.log("File Uploaded successfully", result)
    return result;
  } catch (error) {
    console.log("Error while uploading image to S3", error)
    return error;

  }


}
