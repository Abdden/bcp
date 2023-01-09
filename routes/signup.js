import express from 'express';
import passport from 'passport';
import userController from '../controllers/userController.js';
import validateSignup from '../validation/signupVal.js';
import AdminController from '../controllers/adminController.js';
import authenticateAdmin from '../middlewares/adminAuth.js';
import passGen from '../utils/passport.js';
const router = express.Router();
passGen();

router.post('/signup/admin',
authenticateAdmin,
validateSignup,
AdminController.userOne, () => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Admin Signs Up'
  // #swagger.summary = 'Signup Admin'
  /* #swagger.parameters['Signup'] = {
               in: 'body',
               description: 'Signup Details',
               required: true,
               schema: { $ref: "#/definitions/Signup" }
 } */
});


router.post('/signup',
validateSignup,
userController.userOne, () => {
  // #swagger.tags = ['User']
  // #swagger.description = 'User Signs Up'
  // #swagger.summary = 'Signup User'
  /* #swagger.parameters['Signup'] = {
               in: 'body',
               description: 'Signup Details',
               required: true,
               schema: { $ref: "#/definitions/Signup" }
 } */
});


router.get(
  '/signup/',
  authenticateAdmin,
  passport.authenticate('jwt', { session: false }),
  userController.viewUsers, () => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Admin Gets All The User Sign Ups'
  /* #swagger.security = [{
        "apiKeyAuth": []
  }] */
});

export default router;
