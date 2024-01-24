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
    });
  if (err instanceof mongoose.Error.ValidationError) {
    next(new BadRequestError(err.message));
  } else {
    next(err);
  }
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(
          new BadRequestError(`ID ${req.params.cardId} является некорректным`)
        );
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFounderError(`ID карточки ${req.params.cardId} не найден`));
      } else {
        next(err);
      }
    });
};

module.exports.getLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(
          new BadRequestError(`ID ${req.params.cardId} является некорректным`)
        );
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(
          new NotFounderError(`ID карточки ${req.params.cardId} не найден`)
        );
      } else {
        next(err);
      }
    });
};

module.exports.removeLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(
          new BadRequestError(`ID ${req.params.cardId} является некорректным`)
        );
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(
          new NotFounderError(`ID карточки ${req.params.cardId} не найден`)
        );
      } else {
        next(err);
      }
    });
};
