import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDIN_NAME,
  api_key: process.env.CLOUDIN_KEY,
  api_secret: process.env.CLOUDIN_SEC,
  secure: true,
});

export default cloudinary;
