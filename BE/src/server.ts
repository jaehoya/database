import dotenv from 'dotenv';
import app from './app';
import db from './config/db';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to Database
db.connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
