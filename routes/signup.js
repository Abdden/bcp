import express from 'express';
import passport from 'passport';
import userController from '../controllers/userController.js';
import validateSignup from '../validation/signupVal.js';
import AdminController from '../controllers/adminController.js';
import authenticateAdmin from '../middlewares/adminAuth.js';
import passGen from '../utils/passport.js';
const router = express.Router();
passGen();

router.post('/signup/admin', authenticateAdmin, validateSignup, AdminController.userOne);
router.post('/signup', validateSignup, userController.userOne);
router.get(
  '/signup/',
  authenticateAdmin,
  passport.authenticate('jwt', { session: false }),
  userController.viewUsers
);

export default router;
