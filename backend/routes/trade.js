const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const Balance = require('../models/Balance');
const Portfolio = require('../models/Portfolio');
const Trade = require('../models/Trade');

router.post('/buy', auth, async (req, res) => {
  const user = await User.findByPk(req.user.id);
  if (!user.trading_enabled) return res.status(403).json({ msg: 'Trading disabled' });
  const { coin, amount } = req.body;
  const coinData = global.memeCoins.find(c => c.symbol === coin);
  if (!coinData) return res.status(400).json({ msg: 'Invalid coin' });
  const cost = amount * coinData.price;
  let usdtBalance = await Balance.findOne({ where: { UserId: req.user.id, asset: 'USDT' } });
  if (!usdtBalance || usdtBalance.amount < cost) return res.status(400).json({ msg: 'Insufficient USDT' });
  usdtBalance.amount -= cost;
  await usdtBalance.save();
  let port = await Portfolio.findOne({ where: { UserId: req.user.id, coin } });
  if (!port) port = await Portfolio.create({ UserId: req.user.id, coin, amount: 0 });
  port.amount += amount;
  await port.save();
  await Trade.create({ UserId: req.user.id, coin, type: 'buy', amount, price: coinData.price });
  res.json({ msg: 'Bought' });
});

router.post('/sell', auth, async (req, res) => {
  const user = await User.findByPk(req.user.id);
  if (!user.trading_enabled) return res.status(403).json({ msg: 'Trading disabled' });
  const { coin, amount } = req.body;
  const coinData = global.memeCoins.find(c => c.symbol === coin);
  if (!coinData) return res.status(400).json({ msg: 'Invalid coin' });
  let port = await Portfolio.findOne({ where: { UserId: req.user.id, coin } });
  if (!port || port.amount < amount) return res.status(400).json({ msg: 'Insufficient holdings' });
  const revenue = amount * coinData.price;
  port.amount -= amount;
  await port.save();
  let usdtBalance = await Balance.findOne({ where: { UserId: req.user.id, asset: 'USDT' } });
  if (!usdtBalance) usdtBalance = await Balance.create({ UserId: req.user.id, asset: 'USDT', amount: 0 });
  usdtBalance.amount += revenue;
  await usdtBalance.save();
  await Trade.create({ UserId: req.user.id, coin, type: 'sell', amount, price: coinData.price });
  res.json({ msg: 'Sold' });
});

router.get('/trades', auth, async (req, res) => {
  const trades = await Trade.findAll({ where: { UserId: req.user.id } });
  res.json(trades);
});

router.get('/coins', auth, (req, res) => {
  res.json(global.memeCoins);
});

module.exports = router;