const { default: mongoose } = require('mongoose');
const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      next(err);
    });
};

// исправить чтобы по айд
module.exports.getOneUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        const error = new Error('Введен некорректный ID');
        error.statusCode = 400;
        next(error);
      } else if (err.message === 'NotFound') {
        const error = new Error('Ошибка при вводе данных пользователя');
        error.statusCode = 404;
        next(error);
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        // res.status(400).send({ message: 'Введены некорректные данные' });
        const error = new Error('Введены некорректные данные');
        error.statusCode = 400;
        next(error);
      } else {
        next(err);
      }
    });
};

module.exports.editUserData = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const error = new Error('Введены некорректные данные');
        error.statusCode = 400;
        next(error);
      } else if (err instanceof mongoose.Error.CastError) {
        const error = new Error('Введен некорректный ID');
        error.statusCode = 400;
        next(error);
      } else {
        next(err);
      }
    });
};

module.exports.editUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const error = new Error('Введены некорректные данные');
        error.statusCode = 400;
        next(error);
      } else if (err instanceof mongoose.Error.CastError) {
        const error = new Error('Введен некорректный ID');
        error.statusCode = 400;
        next(error);
      } else {
        next(err);
      }
    });
};
