import express from 'express';
import LogController from '../controllers/logController.js';
import validateLogin from '../validation/loginVal.js';
import authenticateAdmin from '../middlewares/adminAuth.js';
const router = express.Router();

router.post('/login',
validateLogin,
LogController.logOne, () => {
  // #swagger.tags = ['User']
  // #swagger.description = 'User Logs In'
  // #swagger.summary = 'Log In'
  /* #swagger.parameters['Login'] = {
               in: 'body',
               description: 'Login Details',
               required: true,
               schema: { $ref: "#/definitions/Login" }
 } */
});


router.get('/login',
authenticateAdmin,
LogController.viewUsers, () => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Admin Gets All The Logs'
  // #swagger.summary = 'View All The Logs'
  /* #swagger.security = [{
        "apiKeyAuth": []
  }] */
});

export default router;
