const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const User = require('../models/User');
const Balance = require('../models/Balance');

router.get('/users', auth, adminAuth, async (req, res) => {
  const users = await User.findAll({ include: Balance });
  res.json(users);
});

router.put('/user/:id/balance', auth, adminAuth, async (req, res) => {
  const { asset, amount } = req.body;
  let balance = await Balance.findOne({ where: { UserId: req.params.id, asset } });
  if (!balance) balance = await Balance.create({ UserId: req.params.id, asset, amount: 0 });
  balance.amount = parseFloat(amount);
  await balance.save();
  res.json({ msg: 'Balance updated' });
});

router.put('/user/:id/trading', auth, adminAuth, async (req, res) => {
  const { enabled } = req.body;
  const user = await User.findByPk(req.params.id);
  user.trading_enabled = enabled;
  await user.save();
  res.json({ msg: 'Trading toggled' });
});

module.exports = router;