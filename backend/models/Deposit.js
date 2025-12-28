const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Deposit = sequelize.define('Deposit', {
  asset: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Deposit.belongsTo(User);
User.hasMany(Deposit);

module.exports = Deposit;