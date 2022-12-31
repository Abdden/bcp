//import cloudinary from 'cloudinary';
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

// cloudinary.config({
//   cloud_name: 'dhi21hgft',
//   api_key: '974238813244224',
//   api_secret: 'KnpyxXG7cxymnnHAVIk7s0ZNWM8'
// });
