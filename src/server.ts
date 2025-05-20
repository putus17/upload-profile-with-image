import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import path from 'path'
import profileRouter from './routes/profile'
import connectDB from './config/db'

// Load environment variables from .env file
dotenv.config()

const app = express()

// Connect to the database
connectDB()

// Start the server
const PORT = process.env.PORT || 8000  

//// Middleware
app.use(cors());
app.use(express.json());

// serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/v1/profile', profileRouter)

// Root Route 
app.get('/', (req, res) => {
    res.send(`
        API is running...
        Status: Online
    `)
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});