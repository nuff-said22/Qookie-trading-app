const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Portfolio = sequelize.define('Portfolio', {
  coin: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.FLOAT, defaultValue: 0 },
});

Portfolio.belongsTo(User);
User.hasMany(Portfolio);

module.exports = Portfolio;