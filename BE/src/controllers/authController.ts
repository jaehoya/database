import { Request, Response } from 'express';
import authService from '../services/authService';

const login = async (req: Request, res: Response) => {
    const { name, lastChat } = req.body;

    const result = await authService.login(name, lastChat);

    if (result) {
        return res.json(result);
    }

    res.status(401).json({ message: 'Invalid credentials' });
};

export default {
    login
};
