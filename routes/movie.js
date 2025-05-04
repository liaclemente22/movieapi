const express = require('express');
const {
  createMovie,
  getAllMovies,
  getMovieById,
  addComment,
  deleteMovie,
  updateMovie
} = require('../controllers/movie');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const router = express.Router();

// Public routes
router.get('/getMovies', getAllMovies);
router.get('/getMovie/:id', getMovieById);

// Authenticated routes (commenting, etc.)
router.use(verifyToken);
router.post('/addMovieComment', addComment);

// Admin-only routes (CRUD)
router.use(verifyAdmin);
router.post('/addMovie', createMovie);
router.put('/updateMovie/:id', updateMovie);
router.delete('/deleteMovie/:id', deleteMovie);

module.exports = router;
