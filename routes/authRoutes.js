const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  const { username } = req.body;

  if (!username) return res.status(400).json({ error: 'Falta username' });

  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ accessToken });
});

module.exports = router;
