const movieRouter = require('express').Router();
const { getMovies, addMovie, deleteMovie } = require('../controllers/movie');
const { movieValidator, movieIdValidator } = require('../validators/movie');

movieRouter.get('/', getMovies);

movieRouter.post('/', movieValidator, addMovie);

movieRouter.delete('/:movieId', deleteMovie);

module.exports = movieRouter;
