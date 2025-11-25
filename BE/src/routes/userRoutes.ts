import express from 'express';
import userController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.createUser);
router.get('/', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.getAllUsers);
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.deleteUser);
router.put('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.updateUser);

export default router;
