const router = require('express').Router();
const UserService = require('../user/UserService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    const user = await UserService.save(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ message: 'something went wrong.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await UserService.findByUsername(req.body.username);

    if (!user) {
      return res.status(400).send({ message: 'Wrong Credentail.' });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(400).send({ message: 'Wrong Credentail.' });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '3d' }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
