const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch ((err) => {
      if (err.statusCode === 400) {
        // Обработка ошибки 400 (некорректные данные)
        console.error('Ошибка 400:', err.message);
      } else if (err.statusCode === 404) {
        // Обработка ошибки 404 (ресурс не найден)
        console.error('Ошибка 404:', err.message);
      } else {
        // Обработка других ошибок
        console.error('Ошибка:', err.message);
      }
    });
};

//исправить чтобы по айди
module.exports.getOneUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => res.status(200).send({ data: user }))
    .catch ((err) => {
      if (err.statusCode === 400) {
        // Обработка ошибки 400 (некорректные данные)
        console.error('Ошибка 400:', err.message);
      } else if (err.statusCode === 404) {
        // Обработка ошибки 404 (ресурс не найден)
        console.error('Ошибка 404:', err.message);
      } else {
        // Обработка других ошибок
        console.error('Ошибка:', err.message);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch ((err) => {
      if (err.statusCode === 400) {
        // Обработка ошибки 400 (некорректные данные)
        console.error('Ошибка 400:', err.message);
      } else if (err.statusCode === 404) {
        // Обработка ошибки 404 (ресурс не найден)
        console.error('Ошибка 404:', err.message);
      } else {
        // Обработка других ошибок
        console.error('Ошибка:', err.message);
      }
    });
};

module.exports.editUserData = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true }
  )
    .then((user) => res.status(200).send(user))
    .catch ((err) => {
      if (err.statusCode === 400) {
        // Обработка ошибки 400 (некорректные данные)
        console.error('Ошибка 400:', err.message);
      } else if (err.statusCode === 404) {
        // Обработка ошибки 404 (ресурс не найден)
        console.error('Ошибка 404:', err.message);
      } else {
        // Обработка других ошибок
        console.error('Ошибка:', err.message);
      }
    });
};

module.exports.editUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true }
  )
    .then((user) => res.status(200).send(user))
    .catch ((err) => {
      if (err.statusCode === 400) {
        // Обработка ошибки 400 (некорректные данные)
        console.error('Ошибка 400:', err.message);
      } else if (err.statusCode === 404) {
        // Обработка ошибки 404 (ресурс не найден)
        console.error('Ошибка 404:', err.message);
      } else {
        // Обработка других ошибок
        console.error('Ошибка:', err.message);
      }
    });
};
