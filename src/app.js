require('dotenv').config();
const connectDB = require('./config/db');

// Connect to database
connectDB();

const express = require('express');
const cors = require('cors');
const tripRoutes = require('./routes/tripRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors()); // Allows your HTML files to talk to this server
app.use(express.json()); // Allows server to read JSON data from your forms

// Routes
app.use('/api/trips', tripRoutes);
app.use('/api/users', userRoutes);

// Base Status Check
app.get('/', (req, res) => res.send('WanderAI Engine: ONLINE 🚀'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));