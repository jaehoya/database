import { Request, Response } from 'express';
import userService from '../services/userService';

const createUser = async (req: Request, res: Response) => {
    const { name, lastChat } = req.body;
    if (!name || !lastChat) {
        return res.status(400).json({ message: 'Name and Last Chat are required' });
    }
    try {
        const newUser = await userService.createUser(name, lastChat);
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    createUser,
    getAllUsers
};
