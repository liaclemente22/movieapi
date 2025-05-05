const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Importing cors
const userRoutes = require('./routes/user');
const workoutRoutes = require('./routes/workout');
const mealRoutes = require('./routes/meal');

dotenv.config();
const app = express();

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',               
    'https://csp2-fitnessapi.onrender.com' 
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true  
}));

app.use(express.json());

// Define routes
app.use('/users', userRoutes);
app.use('/workouts', workoutRoutes);
app.use('/meals', mealRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
  .catch(err => console.error(err));
