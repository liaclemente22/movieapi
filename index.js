const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movie');

dotenv.config();

const app = express();

// Enable CORS for both your local frontend (localhost:3000) and Render frontend URL
app.use(cors({
  origin: [
    'http://localhost:3000',                
    'https://movieapi-8la5.onrender.com' 
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true  
}));

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/movies', movieRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
