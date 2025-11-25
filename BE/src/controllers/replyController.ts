import { Request, Response } from 'express';
import Reply from '../models/Reply';

export const createReply = async (req: Request, res: Response) => {
    try {
        const { userId, content } = req.body;
        const newReply = new Reply({ userId, content });
        await newReply.save();
        res.status(201).json(newReply);
    } catch (error) {
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
