const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
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

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send({ data: card });
    })
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

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      res.status(200).send({ data: card });
    })
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

module.exports.getLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(200).send(card))
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

module.exports.removeLikeCard = (req, res, next) => {
    Card.findByIdAndUpdate(
        req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
      .then((card) => res.status(200).send(card))
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
  