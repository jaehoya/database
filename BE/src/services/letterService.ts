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
    return await Letter.find({ userId });
};

export default {
    createLetter,
    getLettersByUserId
};
