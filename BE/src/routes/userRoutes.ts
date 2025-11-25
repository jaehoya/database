import express from 'express';
import userController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.createUser);
router.get('/', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.getAllUsers);

export default router;
