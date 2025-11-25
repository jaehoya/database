import User, { IUser } from '../models/User';

const createUser = async (name: string, lastChat: string): Promise<IUser> => {
    const newUser = new User({
        name,
        lastChat,
        isAdmin: false
    });
    await newUser.save();
    return newUser;
};

const getAllUsers = async (): Promise<IUser[]> => {
    return await User.find({ isAdmin: false });
};

export default {
    createUser,
    getAllUsers
};
