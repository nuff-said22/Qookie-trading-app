const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Balance = sequelize.define('Balance', {
  asset: { type: DataTypes.STRING, allowNull: false }, // ETH, USDT, SOL
  amount: { type: DataTypes.FLOAT, defaultValue: 0 },
});

Balance.belongsTo(User);
User.hasMany(Balance);

module.exports = Balance;