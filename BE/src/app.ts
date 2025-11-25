import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import letterRoutes from './routes/letterRoutes';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World! Backend is running with Express.');
});

app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/letters', letterRoutes);

export default app;