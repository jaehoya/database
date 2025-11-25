import mongoose, { Schema, Document } from 'mongoose';

export interface IReply extends Document {
    userId: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
}

const ReplySchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IReply>('Reply', ReplySchema);
