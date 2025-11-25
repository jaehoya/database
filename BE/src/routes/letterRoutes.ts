import express from 'express';
import multer from 'multer';
import path from 'path';
import letterController from '../controllers/letterController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    }
});

const upload = multer({ storage: storage });

// Admin creates letter for a user
router.post('/', authMiddleware.verifyToken, authMiddleware.isAdmin, upload.array('media', 5), letterController.createLetter);

// User gets their own letters
router.get('/', authMiddleware.verifyToken, letterController.getMyLetters);
router.get('/:userId', authMiddleware.verifyToken, authMiddleware.isAdmin, letterController.getLettersByUser);
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, letterController.deleteLetter);
router.put('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, letterController.updateLetter);

export default router;
