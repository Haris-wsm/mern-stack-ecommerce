const router = require('express').Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken
} = require('../middleware/verifyToken');
const UserService = require('../user/UserService');

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await UserService.updateById(req.params.id, req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await UserService.deleteById(id);
    res.status(204).json({ message: 'User have been deleted' });
  } catch (error) {
    console.log(error);
  }
});

// GET USER STATISTIC

router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
  try {
    const statistic = await UserService.getUserStat();
    res.status(200).json(statistic);
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' });
  }
});

// GET USER

router.get('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await UserService.getUser(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL USERS

router.get('/', verifyTokenAndAdmin, async (req, res) => {
  const query = req.query;
  try {
    const users = await UserService.getAllUsers(query, req.user.id);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
