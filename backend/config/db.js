const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './demo.db', // File in backend folder
  logging: false,
});

module.exports = sequelize;