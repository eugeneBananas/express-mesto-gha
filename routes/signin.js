const router = require('express').Router();
const celebrate = require('celebrate');
const Joi = require('joi');
const {
  login,
} = require('../controllers/users');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(/^\S+@\S+\.\S+$/),
    password: Joi.string().required().min(6),
  }).unknown(true),
}), login);

module.exports = router;