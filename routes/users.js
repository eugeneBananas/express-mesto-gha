const router = require('express').Router();
const { getUsers, getOneUser, createUser, editUserData, editUserAvatar } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getOneUser);
router.post('/', createUser);
router.patch('/me', editUserData);
router.patch('/me/avatar', editUserAvatar);

module.exports = router;
