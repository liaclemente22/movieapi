const Movie = require('../models/Movie');

exports.createMovie = async (req, res) => {
  const { title, director, year, description, genre } = req.body;
  try {
    const movie = new Movie({ title, director, year, description, genre });
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.addComment = async (req, res) => {
  const { movieId, text } = req.body;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const comment = { user: req.user.id, text };
    movie.comments.push(comment);
    await movie.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
