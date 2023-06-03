const { errStatus, errMessage } = require('../constants');
const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoundErr');
const ForbiddenError = require('../errors/forbiddenErr');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(errStatus.OK).send(movies))
    .catch(next);
};

const addMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((newMovie) => res.status(errStatus.SUCCESS).send(newMovie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errMessage.NOT_FOUND);
      }

      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(errMessage.FORBIDDEN);
      }

      movie.deleteOne();
      res.send({ message: 'Фильм удалён' });
    })
    .catch(next);
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
