// server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRoutes= require('./routes/todoRoutes')
const app = express();

// Debug: Log the MONGO_URI to verify it’s being loaded
console.log('MONGO_URI:', process.env.MONGO_URI);

const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI=process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));




// Routes
app.use('/api/todos', todoRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});