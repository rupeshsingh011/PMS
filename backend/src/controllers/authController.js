const { authenticateUser } = require('../services/authService');

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await authenticateUser({ username, password });
    return res.status(result.statusCode).json(result.payload);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
};

