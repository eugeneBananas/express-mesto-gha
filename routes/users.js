const router = require('express').Router();
const {
  getUsers,
  getOneUser,
  getInfo,
  editUserData,
  editUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getOneUser);
router.get('/me', getInfo);
router.patch('/me', editUserData);
router.patch('/me/avatar', editUserAvatar);

module.exports = router;
