const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
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
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        err.status(400);
        err.message('Введен некорректный ID');
        next(err);
      } else if (err.message === 'NotFound') {
        err.status(404);
        err.message('Ошибка при вводе данных пользователя');
        next(err);
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .orFail()
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        err.status(404);
        err.message('Введены некорректные данные');
        next(err);
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
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        err.status(400);
        err.message('Введены некорректные данные');
        next(err);
      } else if (err instanceof mongoose.Error.CastError) {
        err.status(400);
        err.message('Введен некорректный ID');
        next(err);
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
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        err.status(400);
        err.message('Введены некорректные данные');
        next(err);
      } else if (err instanceof mongoose.Error.CastError) {
        err.status(400);
        err.message('Введен некорректный ID');
        next(err);
      } else {
        next(err);
      }
    });
};
