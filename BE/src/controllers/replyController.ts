import { Request, Response } from 'express';
import Reply from '../models/Reply';

export const createReply = async (req: Request, res: Response) => {
    try {
        console.log('User:', req.user);
        console.log('Body:', req.body);
        const { content } = req.body;
        const userId = req.user.id;
        const newReply = new Reply({ userId, content });
        await newReply.save();
        res.status(201).json(newReply);
    } catch (error) {
        console.error('Create Reply Error:', error);
        res.status(500).json({ message: 'Error creating reply', error });
    }
};

export const getReplies = async (req: Request, res: Response) => {
    try {
        const replies = await Reply.find().populate('userId', 'name').sort({ createdAt: -1 });
        res.status(200).json(replies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching replies', error });
    }
};
