const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const Balance = require('../models/Balance');
const Deposit = require('../models/Deposit');
const Portfolio = require('../models/Portfolio');

router.get('/balances', auth, async (req, res) => {
  const balances = await Balance.findAll({ where: { UserId: req.user.id } });
  res.json(balances);
});

router.get('/portfolio', auth, async (req, res) => {
  const portfolio = await Portfolio.findAll({ where: { UserId: req.user.id } });
  res.json(portfolio);
});

router.post('/deposit', auth, async (req, res) => {
  const { asset, amount } = req.body;
  if (!['ETH', 'USDT', 'SOL'].includes(asset)) return res.status(400).json({ msg: 'Invalid asset' });
  let balance = await Balance.findOne({ where: { UserId: req.user.id, asset } });
  if (!balance) balance = await Balance.create({ UserId: req.user.id, asset, amount: 0 });
  balance.amount += parseFloat(amount);
  await balance.save();
  await Deposit.create({ UserId: req.user.id, asset, amount });
  res.json({ msg: 'Deposited' });
});

router.get('/deposits', auth, async (req, res) => {
  const deposits = await Deposit.findAll({ where: { UserId: req.user.id } });
  res.json(deposits);
});

module.exports = router;