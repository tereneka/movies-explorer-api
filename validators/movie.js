const { Joi, celebrate } = require('celebrate');
const { urlReg } = require('../constants');

const movieValidator = celebrate({
  country: Joi.string().required(),
  director: Joi.string().required(),
  duration: Joi.number().required(),
  year: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required().pattern(urlReg),
  trailer: Joi.string().required().pattern(urlReg),
  thumbnail: Joi.string().required().pattern(urlReg),
  nameRU: Joi.string().required(),
  nameEN: Joi.string().required(),
  movieId: Joi.number().required(),
});

const movieIdValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  movieValidator,
  movieIdValidator,
};
