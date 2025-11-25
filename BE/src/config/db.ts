import mongoose from 'mongoose';
import User from '../models/User';

const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/farewell-db');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const seedAdmin = async (): Promise<void> => {
    const admin = await User.findOne({ isAdmin: true });
    if (!admin) {
        await User.create({
            name: '이재호',
            lastChat: '수고했다',
            isAdmin: true
        });
        console.log('Admin user seeded');
    }
};

export default {
    connectDB
};
