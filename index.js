const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movie');

dotenv.config();

const app = express();

// Enable CORS for your frontend URL (localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only the frontend from localhost:3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true  // Allows cookies to be sent with requests
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
