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
    return await User.find({ isAdmin: false }).sort({ createdAt: -1 });
};

const deleteUser = async (id: string): Promise<IUser | null> => {
    return await User.findByIdAndDelete(id);
};

const updateUser = async (id: string, updateData: Partial<IUser>): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
};

export default {
    createUser,
    getAllUsers,
    deleteUser,
    updateUser
};
