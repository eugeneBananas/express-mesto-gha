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
    .orFail()
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        err.status(400);
        err.message('Введены некорректные данные');
        next(err);
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
        err.status(400);
        err.message('Введен некорректный ID');
        next(err);
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        err.status(404);
        err.message('Ошибка при вводе данных пользователя');
        next(err);
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
        err.status(400);
        err.message('Введен некорректный ID');
        next(err);
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        err.status(404);
        err.message('Ошибка при вводе данных пользователя');
        next(err);
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
        err.status(400);
        err.message('Введен некорректный ID');
        next(err);
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        err.status(404);
        err.message('Ошибка при вводе данных пользователя');
        next(err);
      } else {
        next(err);
      }
    });
};
