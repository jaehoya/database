import { Request, Response } from 'express';
import letterService from '../services/letterService';

const createLetter = async (req: Request, res: Response) => {
    const { userId, content, receivedAt } = req.body;
    const files = req.files as Express.Multer.File[]; // Type assertion for multer files

    if (!userId || !content) {
        return res.status(400).json({ message: 'User ID and Content are required' });
    }

    const media = files ? files.map(file => `/uploads/${file.filename}`) : [];

    try {
        const newLetter = await letterService.createLetter(userId, content, media, receivedAt);
        res.status(201).json(newLetter);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const getMyLetters = async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user.id;
    try {
        const letters = await letterService.getLettersByUserId(userId);
        res.json(letters);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const getLettersByUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const letters = await letterService.getLettersByUserId(userId);
        res.json(letters);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const deleteLetter = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await letterService.deleteLetter(id);
        res.status(200).json({ message: 'Letter deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const updateLetter = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const updatedLetter = await letterService.updateLetter(id, content);
        res.status(200).json(updatedLetter);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    createLetter,
    getMyLetters,
    getLettersByUser,
    deleteLetter,
    updateLetter
};
