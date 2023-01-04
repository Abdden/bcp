import express from 'express';
import QueryController from '../controllers/queryController.js';
import validateContact from '../validation/contactVal.js';
import authenticateAdmin from '../middlewares/adminAuth.js';
import passport from 'passport';
import passGen from '../utils/passport.js';

passGen();
const router = express.Router();

router.post('/contact', validateContact, QueryController.queryOne);
router.get(
  '/contacts',
  authenticateAdmin,
  passport.authenticate('jwt', { session: false }),
  QueryController.viewQueries
);

export default router;
