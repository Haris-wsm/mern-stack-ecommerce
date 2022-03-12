const jwt = require('jsonwebtoken');
const User = require('../user/User');

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.substring(7);
    try {
      const credentail = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(credentail.id);
      req.user = user;
    } catch (error) {}
  }
  next();
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized User' });
    }
    if (req.user.id !== req.params.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'forbidden user.' });
    }
    next();
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user?.isAdmin) {
      return res
        .status(403)
        .json({ message: 'You are not allow to this action.' });
    }

    next();
  });
};

module.exports = {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken
};
