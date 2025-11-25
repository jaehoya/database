import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User, { IUser } from '../models/User';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

interface LoginResult {
    token: string;
    isAdmin: boolean;
    name: string;
}

const login = async (name: string, lastChat: string): Promise<LoginResult | null> => {
    const user = await User.findOne({ name, lastChat });

    if (user) {
        const token = jwt.sign({ id: user._id, name: user.name, isAdmin: user.isAdmin }, SECRET_KEY, { expiresIn: '1h' });
        return { token, isAdmin: user.isAdmin, name: user.name };
    }
    return null;
};

export default {
    login
};
