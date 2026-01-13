const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Withdrawal = sequelize.define('Withdrawal', {
  asset: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Withdrawal.belongsTo(User);
User.hasMany(Withdrawal);

module.exports = Withdrawal;
