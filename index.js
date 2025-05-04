const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movie');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/movies', movieRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
