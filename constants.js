const errStatus = {
  OK: 200,
  SUCCESS: 201,
  BAD_REQUEST_ERROR: 400,
  NOT_FOUND_ERROR: 404,
  DEFAULT_ERROR: 500,
};

const errMessage = {
  BAD_REQUEST: 'Переданы некорректные данные.',
  NOT_FOUND: 'Данные не найдены.',
  AUTH: 'Неверные почта или пароль',
  NEED_AUTH: 'Необходимо авторизоваться',
  FORBIDDEN: 'У Вас нет прав для этого действия',
  CONFLICT: 'Пользователь с таким email уже существует',
  DEFAULT: 'Что-то пошло не так...',
  MOVIE_DUPLICATE: 'Фильм уже есть в избранном',
};

const urlReg = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = { errStatus, errMessage, urlReg };
