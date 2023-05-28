const { errStatus, errMessage } = require('../constants');
const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoundErr');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(errStatus.OK).send(movies))
    .catch(next);
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(errStatus.SUCCESS).send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errMessage.NOT_FOUND);
      }

      Movie.findByIdAndRemove(req.params.movieId)
        .then(() => res.send({ message: 'Фильм удалён' }))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
