import express from 'express';
import authController from '../controllers/authController';
import authValidate from '../middlewares/authValidate';

const router = express.Router();

router.post('/login', authValidate.validateLogin, authController.login);

export default router;
