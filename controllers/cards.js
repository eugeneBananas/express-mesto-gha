const { default: mongoose } = require('mongoose');
const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => {
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const error = new Error('Введены некорректные данные');
        error.statusCode = 400;
        next(error);
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => {
      res.status(200).send({ data: card });
    })
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

module.exports.getLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.status(200).send(card))
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

module.exports.removeLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.status(200).send(card))
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
