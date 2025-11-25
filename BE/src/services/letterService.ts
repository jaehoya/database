import Letter, { ILetter } from '../models/Letter';

const createLetter = async (userId: string, content: string, media: string[], receivedAt?: string): Promise<ILetter> => {
    const newLetter = new Letter({
        userId,
        content,
        media,
        receivedAt: receivedAt ? new Date(receivedAt) : new Date()
    });
    await newLetter.save();
    return newLetter;
};

const getLettersByUserId = async (userId: string): Promise<ILetter[]> => {
    return await Letter.find({ userId }).sort({ receivedAt: -1, createdAt: -1 });
};

const deleteLetter = async (id: string): Promise<ILetter | null> => {
    return await Letter.findByIdAndDelete(id);
};

const updateLetter = async (id: string, content: string): Promise<ILetter | null> => {
    return await Letter.findByIdAndUpdate(id, { content }, { new: true });
};

export default {
    createLetter,
    getLettersByUserId,
    deleteLetter,
    updateLetter
};
