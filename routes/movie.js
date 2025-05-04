const express = require('express');
const { createMovie, getAllMovies, getMovieById, addComment } = require('../controllers/movie');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const router = express.Router();

router.get('/', getAllMovies);
router.get('/:id', getMovieById);

router.use(verifyToken); // Protect below routes with authentication

router.post('/:movieId/comment', addComment);

router.use(verifyAdmin); // Protect with admin middleware for CRUD

router.post('/', createMovie);

module.exports = router;
