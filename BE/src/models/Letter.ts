import mongoose, { Document, Schema } from 'mongoose';

export interface ILetter extends Document {
    userId: mongoose.Types.ObjectId;
    content: string;
    media: string[];
    receivedAt: Date;
    createdAt: Date;
}

const letterSchema: Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    media: [String],
    receivedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<ILetter>('Letter', letterSchema);
