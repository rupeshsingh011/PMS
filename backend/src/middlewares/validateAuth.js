const validateLogin = (req, res, next) => {
  const { username, password } = req.body || {};

  if (typeof username !== 'string' || !username.trim()) {
    return res.status(400).json({ message: 'Username is required' });
  }

  if (typeof password !== 'string' || !password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  req.body.username = username.trim();
  return next();
};

module.exports = {
  validateLogin,
};

