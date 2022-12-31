import express from 'express';
import LogController from '../controllers/logController.js';
import validateLogin from '../validation/loginVal.js';
const router = express.Router();

router.post('/login', validateLogin, LogController.logOne);
router.get('/login', LogController.viewUsers);

export default router;
