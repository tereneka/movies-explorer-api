const { Joi, celebrate } = require('celebrate');
const { urlReg } = require('../constants');

const movieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlReg),
    trailerLink: Joi.string().required().pattern(urlReg),
    thumbnail: Joi.string().required().pattern(urlReg),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  movieValidator,
  movieIdValidator,
};
