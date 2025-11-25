import express from 'express';
import { createReply, getReplies } from '../controllers/replyController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware.verifyToken, createReply);
router.get('/', authMiddleware.verifyToken, authMiddleware.isAdmin, getReplies);

export default router;
