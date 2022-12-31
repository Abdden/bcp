import express from 'express';
import QueryController from '../controllers/queryController.js';
import validateContact from '../validation/contactVal.js';
import passport from 'passport';
import authentication from '../middlewares/auth.js';
import passGen from '../utils/passport.js';

passGen();
const router = express.Router();

router.post('/contact', validateContact, QueryController.queryOne);
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  QueryController.viewQueries
);

export default router;
