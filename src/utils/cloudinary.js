import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDIN_NAME,
  api_key: process.env.CLOUDIN_KEY,
  api_secret: process.env.CLOUDIN_SEC,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "My_Brand_Pics",
  },
});
export default storage;

// export default cloudinary;
