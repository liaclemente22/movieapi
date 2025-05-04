const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
}, { timestamps: true });

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String },
  genre: { type: String },
  comments: [commentSchema],
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;

