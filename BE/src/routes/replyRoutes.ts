import express from 'express';
import { createReply, getReplies } from '../controllers/replyController';
import { isAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', createReply);
router.get('/', isAdmin, getReplies);

export default router;
