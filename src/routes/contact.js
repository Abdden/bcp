import express from 'express';
import QueryController from '../controllers/queryController.js';
import validateContact from '../validation/contactVal.js';
import authenticateAdmin from '../middlewares/adminAuth.js';
import passport from 'passport';
import passGen from '../utils/passport.js';

passGen();
const router = express.Router();

router.post('/contact',
validateContact,
QueryController.queryOne, () => {
  // #swagger.tags = ['Query']
  // #swagger.description = 'User Sends a Query'
  // #swagger.summary = 'Create/Post Query'
  /* #swagger.parameters['Contact'] = {
               in: 'body',
               description: 'Necessary Query Details',
               required: true,
               schema: { $ref: "#/definitions/Contact" }
  } */
});


router.delete('/contact/:id',
authenticateAdmin,
passport.authenticate('jwt', { session: false }),
QueryController.deleteQuery, () => {
  // #swagger.tags = ['Query']
  // #swagger.description = 'Admin Delets a User Query'
  // #swagger.summary = 'Delete a Query'
  /* #swagger.security = [{
        "apiKeyAuth": []
  }] */
});


router.get(
  '/contacts',
  authenticateAdmin,
  passport.authenticate('jwt', { session: false }),
  QueryController.viewQueries, () => {
  // #swagger.tags = ['Query']
  // #swagger.description = 'Admin Gets All User Queries'
  // #swagger.summary = 'View All The Queries'
  /* #swagger.security = [{
        "apiKeyAuth": []
  }] */
});

export default router;
