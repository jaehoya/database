export interface User {
    _id: string;
    name: string;
    lastChat: string;
}

export interface Letter {
    _id: string;
    content: string;
    media: string[];
    receivedAt: string;
    createdAt: string;
}
