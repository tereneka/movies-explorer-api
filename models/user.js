const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthorizationErr = require('../errors/authorizationErr');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [2, 'должно быть минимум 2 символа'],
      maxlength: [30, 'должно быть максимум 30 символов'],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(v) {
          return validator.isEmail(v);
        },
        message: (props) => `${props.value} - некорректный email!`,
      },
    },
    password: {
      type: String,
      required: true,
      select: false, // запрет на отправку пароля при get запросах
    },
  },
  { toObject: { useProjection: true }, toJSON: { useProjection: true } },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password') // получение пароля
    .then((user) => {
      if (!user) {
        throw new AuthorizationErr('Неверные почта или пароль');
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new AuthorizationErr('Неверные почта или пароль');
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
