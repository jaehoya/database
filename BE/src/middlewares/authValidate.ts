import { Request, Response, NextFunction } from 'express';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { name, lastChat } = req.body;

    if (!name || !lastChat) {
        return res.status(400).json({ message: 'Name and Last Chat are required' });
    }

    next();
};

export default {
    validateLogin
};
