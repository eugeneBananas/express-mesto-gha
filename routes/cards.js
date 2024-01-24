const router = require('express').Router();
const { getCards, createCard, deleteCard, getLikeCard, removeLikeCard } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', getLikeCard);
router.delete('/:cardId/likes', removeLikeCard);

module.exports = router;
