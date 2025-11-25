import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    lastChat: string;
    isAdmin: boolean;
}

const userSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastChat: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model<IUser>('User', userSchema);
