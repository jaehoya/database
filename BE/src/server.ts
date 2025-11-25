import dotenv from 'dotenv';
import app from './app';
import db from './config/db';
import replyRoutes from './routes/replyRoutes'; // Added import for replyRoutes

dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to Database
db.connectDB();

// Use reply routes (assuming app is an Express app instance)
app.use('/replies', replyRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
