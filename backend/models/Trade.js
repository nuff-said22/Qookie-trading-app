const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Trade = sequelize.define('Trade', {
  coin: { type: DataTypes.STRING, allowNull: false }, // e.g., MEME1
  type: { type: DataTypes.STRING, allowNull: false }, // buy or sell
  amount: { type: DataTypes.FLOAT, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Trade.belongsTo(User);
User.hasMany(Trade);

module.exports = Trade;